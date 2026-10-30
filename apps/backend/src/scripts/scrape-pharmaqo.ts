/**
 * ──────────────────────────────────────────────────────
 *  Pharmaqo Labs Product Scraper
 *  Scrapes all products from the brand listing pages,
 *  then deep-fetches each product page for full details.
 *
 *  Run:  npx tsx apps/backend/src/scripts/scrape-pharmaqo.ts
 *
 *  Output: apps/backend/src/data/pharmaqo_catalog.json
 * ──────────────────────────────────────────────────────
 */

import * as cheerio from 'cheerio'
import * as fs from 'node:fs'
import * as path from 'node:path'

const BASE_URL = 'https://supremesteroids.co.uk'
const BRAND_PATH = '/product-brand/pharmaqo-labs'
const TOTAL_PAGES = 4
const CONCURRENT_BATCH = 5
const DELAY_MS = 400

// ── Types ───────────────────────────────────────────
interface ListingProduct {
  slug: string
  url: string
  title: string
  price_raw: string
  thumbnail: string
  source_id: string
}

interface SpecRow {
  key: string
  value: string
}

interface ScrapedProduct {
  slug: string
  url: string
  title: string
  price_gbp: number // pence
  price_raw: string
  thumbnail: string
  images: string[]
  source_id: string
  category_breadcrumb: string[]
  short_description: string
  description_html: string
  specs: SpecRow[]
  related_product_slugs: string[]
  scraped_at: string
}

// ── Helpers ─────────────────────────────────────────
function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}

async function fetchPage(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml',
      'Accept-Language': 'en-GB,en;q=0.9',
    },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return res.text()
}

function parsePriceToPence(raw: string): number {
  const cleaned = raw.replace(/[^0-9.]/g, '')
  const num = parseFloat(cleaned)
  return isNaN(num) ? 0 : Math.round(num * 100)
}

// ── Phase 1: Scrape listing pages ───────────────────
async function scrapeListingPage(page: number): Promise<ListingProduct[]> {
  const url = page === 1 ? `${BASE_URL}${BRAND_PATH}` : `${BASE_URL}${BRAND_PATH}?page=${page}`

  console.log(`📄 Fetching listing page ${page}: ${url}`)
  const html = await fetchPage(url)
  const $ = cheerio.load(html)
  const products: ListingProduct[] = []

  // Each product card is a div with class "space-y-2 group text-left"
  $('div.space-y-2.group.text-left').each((_i, el) => {
    const linkEl = $(el).find('a[href*="/product/"]').first()
    const href = linkEl.attr('href') || ''
    const imgEl = $(el).find('img[alt]:not([alt="Lab Tested"])').first()
    const title = imgEl.attr('alt') || $(el).find('h2 a').text().trim()
    const priceText = $(el).find('p.text-blue-600').text().trim()
    const productIdInput = $(el).find('input[name="product_id"]')
    const sourceId = productIdInput.attr('value') || ''

    // Resolve URL
    const fullUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`
    const slug = href.replace('/product/', '').replace(/\/$/, '')

    // Image src
    const imgSrc = imgEl.attr('src') || ''

    if (slug && title) {
      products.push({
        slug,
        url: fullUrl,
        title,
        price_raw: priceText,
        thumbnail: imgSrc,
        source_id: sourceId,
      })
    }
  })

  console.log(`   Found ${products.length} products on page ${page}`)
  return products
}

async function scrapeAllListings(): Promise<ListingProduct[]> {
  const all: ListingProduct[] = []
  for (let page = 1; page <= TOTAL_PAGES; page++) {
    const items = await scrapeListingPage(page)
    all.push(...items)
    if (page < TOTAL_PAGES) await sleep(DELAY_MS)
  }
  // Deduplicate by slug
  const seen = new Set<string>()
  return all.filter((p) => {
    if (seen.has(p.slug)) return false
    seen.add(p.slug)
    return true
  })
}

// ── Phase 2: Deep scrape each product page ──────────
async function scrapeProductDetail(listing: ListingProduct): Promise<ScrapedProduct> {
  console.log(`   🔍 Scraping: ${listing.title}`)

  let html: string
  try {
    html = await fetchPage(listing.url)
  } catch (err) {
    console.warn(`   ⚠️  Failed to fetch ${listing.url}: ${err}`)
    return {
      slug: listing.slug,
      url: listing.url,
      title: listing.title,
      price_gbp: parsePriceToPence(listing.price_raw),
      price_raw: listing.price_raw,
      thumbnail: listing.thumbnail,
      images: [listing.thumbnail].filter(Boolean),
      source_id: listing.source_id,
      category_breadcrumb: [],
      short_description: '',
      description_html: '',
      specs: [],
      related_product_slugs: [],
      scraped_at: new Date().toISOString(),
    }
  }

  const $ = cheerio.load(html)

  // ── Breadcrumb / Categories ──
  const breadcrumbs: string[] = []
  $('nav a.hover\\:text-black').each((_i, el) => {
    const text = $(el).text().trim()
    if (text && text !== 'Home' && text !== 'Shop') {
      breadcrumbs.push(text)
    }
  })

  // ── Images ──
  const images: string[] = []
  // Main image
  const mainImg = $('#mainProductImage').attr('src')
  if (mainImg) images.push(mainImg)

  // Thumbnail strip (gallery)
  $('img[data-full], .product-thumbnails img, .gallery img').each((_i, el) => {
    const src = $(el).attr('data-full') || $(el).attr('src') || ''
    if (src && !images.includes(src) && !src.includes('lab_tested')) {
      images.push(src)
    }
  })

  // If we still only have the listing thumbnail, include it
  if (images.length === 0 && listing.thumbnail) {
    images.push(listing.thumbnail)
  }

  // ── Price (from product page, may differ from listing) ──
  const priceEl = $('p.text-\\[\\#2E65F3\\].font-semibold').first()
  const priceRaw = priceEl.text().trim() || listing.price_raw

  // ── Specs table ──
  const specs: SpecRow[] = []
  // The product pages use an HTML table inside .prose
  $('div.prose table tr').each((_i, el) => {
    const cells = $(el).find('td')
    if (cells.length >= 2) {
      const key = $(cells[0]).text().trim()
      const value = $(cells[1]).text().trim()
      if (key && value && key !== 'Category' && key !== 'Details') {
        specs.push({ key, value })
      }
    }
  })

  // ── Description HTML ──
  // Get the rich description content (the store-rich-content div from product page body)
  let descriptionHtml = ''
  let shortDescription = ''

  // Short description (first prose section)
  const proseEl = $('div.prose.prose-sm.max-w-none').first()
  if (proseEl.length) {
    descriptionHtml = proseEl.html()?.trim() || ''
    // Extract a plain-text short description (first paragraph)
    shortDescription = proseEl.find('p').first().text().trim()
  }

  // Also check the store-rich-content below
  const richContent = $('div.store-rich-content')
  if (richContent.length && !descriptionHtml) {
    descriptionHtml = richContent.html()?.trim() || ''
    shortDescription = richContent.find('p').first().text().trim()
  }

  // ── Related products ──
  const relatedSlugs: string[] = []
  $('a[href*="/product/"]').each((_i, el) => {
    const href = $(el).attr('href') || ''
    const slug = href.replace(/.*\/product\//, '').replace(/\/$/, '')
    if (slug && slug !== listing.slug && !relatedSlugs.includes(slug)) {
      relatedSlugs.push(slug)
    }
  })

  return {
    slug: listing.slug,
    url: listing.url,
    title: listing.title,
    price_gbp: parsePriceToPence(priceRaw),
    price_raw: priceRaw,
    thumbnail: listing.thumbnail || images[0] || '',
    images,
    source_id: listing.source_id,
    category_breadcrumb: breadcrumbs,
    short_description: shortDescription.slice(0, 500),
    description_html: descriptionHtml,
    specs,
    related_product_slugs: relatedSlugs.slice(0, 10),
    scraped_at: new Date().toISOString(),
  }
}

async function deepScrapeAll(listings: ListingProduct[]): Promise<ScrapedProduct[]> {
  const results: ScrapedProduct[] = []

  for (let i = 0; i < listings.length; i += CONCURRENT_BATCH) {
    const batch = listings.slice(i, i + CONCURRENT_BATCH)
    console.log(
      `\n📦 Batch ${Math.floor(i / CONCURRENT_BATCH) + 1}/${Math.ceil(listings.length / CONCURRENT_BATCH)} (${batch.length} products)`,
    )

    const batchResults = await Promise.all(batch.map((listing) => scrapeProductDetail(listing)))
    results.push(...batchResults)

    if (i + CONCURRENT_BATCH < listings.length) {
      await sleep(DELAY_MS * 2) // Polite delay between batches
    }
  }

  return results
}

// ── Phase 3: Extract categories & save ──────────────
interface CatalogOutput {
  meta: {
    source: string
    brand: string
    total_products: number
    scraped_at: string
    categories: { name: string; slug: string; count: number }[]
  }
  products: ScrapedProduct[]
}

function buildCatalog(products: ScrapedProduct[]): CatalogOutput {
  // Extract unique categories from breadcrumbs
  const catCount = new Map<string, number>()
  for (const p of products) {
    for (const cat of p.category_breadcrumb) {
      catCount.set(cat, (catCount.get(cat) || 0) + 1)
    }
  }

  const categories = Array.from(catCount.entries())
    .map(([name, count]) => ({
      name,
      slug: name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
      count,
    }))
    .sort((a, b) => b.count - a.count)

  return {
    meta: {
      source: `${BASE_URL}${BRAND_PATH}`,
      brand: 'Pharmaqo Labs',
      total_products: products.length,
      scraped_at: new Date().toISOString(),
      categories,
    },
    products,
  }
}

// ── Main ────────────────────────────────────────────
async function main() {
  console.log('═══════════════════════════════════════════')
  console.log('  Pharmaqo Labs Product Scraper')
  console.log('═══════════════════════════════════════════\n')

  // Phase 1
  console.log('── Phase 1: Scraping listing pages ────────')
  const listings = await scrapeAllListings()
  console.log(`\n✅ Found ${listings.length} unique products across ${TOTAL_PAGES} pages\n`)

  // Phase 2
  console.log('── Phase 2: Deep scraping product pages ───')
  const products = await deepScrapeAll(listings)
  console.log(`\n✅ Deep-scraped ${products.length} products\n`)

  // Phase 3
  console.log('── Phase 3: Building catalog ───────────────')
  const catalog = buildCatalog(products)

  // Write output
  const outDir = path.join(__dirname, '..', 'data')
  fs.mkdirSync(outDir, { recursive: true })
  const outFile = path.join(outDir, 'pharmaqo_catalog.json')
  fs.writeFileSync(outFile, JSON.stringify(catalog, null, 2), 'utf-8')
  console.log(`\n📁 Catalog saved to: ${outFile}`)

  // Summary
  console.log('\n═══════════════════════════════════════════')
  console.log(`  Total products: ${catalog.meta.total_products}`)
  console.log(`  Categories found:`)
  for (const cat of catalog.meta.categories) {
    console.log(`    • ${cat.name} (${cat.count} products)`)
  }
  console.log('═══════════════════════════════════════════\n')
}

main().catch((err) => {
  console.error('❌ Scraper failed:', err)
  process.exit(1)
})
