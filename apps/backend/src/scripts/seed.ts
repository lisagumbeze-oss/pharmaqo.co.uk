/**
 * ──────────────────────────────────────────────────────
 *  Seed script — Medusa v2
 *  Creates: store defaults, regions (UK + EU), shipping,
 *  tax, 5 categories, and 20 supplement products.
 *
 *  Run:  pnpm --filter backend seed
 *  (or)  cd apps/backend && npx medusa exec ./src/scripts/seed.ts
 *
 *  ⚠️  No prescription, controlled, or hormonal products.
 * ──────────────────────────────────────────────────────
 */

import {
  ExecArgs,
  IProductModuleService,
  IRegionModuleService,
  ISalesChannelModuleService,
  IStoreModuleService,
  ITaxModuleService,
} from '@medusajs/framework/types'
import {
  ContainerRegistrationKeys,
  Modules,
} from '@medusajs/framework/utils'

export default async function seed({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const storeService: IStoreModuleService = container.resolve(Modules.STORE)
  const regionService: IRegionModuleService = container.resolve(Modules.REGION)
  const salesChannelService: ISalesChannelModuleService = container.resolve(Modules.SALES_CHANNEL)
  const productService: IProductModuleService = container.resolve(Modules.PRODUCT)
  const taxService: ITaxModuleService = container.resolve(Modules.TAX)

  logger.info('🌱 Starting seed...')

  // ── 1. Store defaults ────────────────────────────
  const stores = await storeService.listStores()
  const store = stores[0]
  if (store) {
    await storeService.updateStores(store.id, {
      name: 'Pharmaqo',
      supported_currencies: [
        { currency_code: 'gbp', is_default: true },
        { currency_code: 'eur' },
      ],
    })
    logger.info('✅ Store updated — GBP default')
  }

  // ── 2. Sales channel ─────────────────────────────
  let defaultChannel = (await salesChannelService.listSalesChannels({ name: 'Default Sales Channel' }))?.[0]
  if (!defaultChannel) {
    defaultChannel = await salesChannelService.createSalesChannels({
      name: 'Default Sales Channel',
      description: 'Main web storefront',
    })
  }
  logger.info(`✅ Sales channel: ${defaultChannel.id}`)

  // ── 3. Tax regions ───────────────────────────────
  const existingTaxRegions = await taxService.listTaxRegions()
  let ukTaxRegion = existingTaxRegions.find((r) => r.country_code === 'gb')
  if (!ukTaxRegion) {
    ukTaxRegion = await taxService.createTaxRegions({
      country_code: 'gb',
    })
  }

  // Ensure a default tax rate exists
  const existingRates = await taxService.listTaxRates({ tax_region_id: ukTaxRegion.id })
  if (existingRates.length === 0) {
    await taxService.createTaxRates({
      tax_region_id: ukTaxRegion.id,
      name: 'UK VAT',
      rate: 20,
      code: 'uk-vat-20',
      is_default: true,
    })
  }
  logger.info('✅ UK tax region + 20% VAT')

  // ── 4. Regions (UK + EU) ─────────────────────────
  const existingRegions = await regionService.listRegions()

  let ukRegion = existingRegions.find((r) => r.name === 'United Kingdom')
  if (!ukRegion) {
    ukRegion = await regionService.createRegions({
      name: 'United Kingdom',
      currency_code: 'gbp',
      countries: ['gb'],
      automatic_taxes: true,
    })
  }

  let euRegion = existingRegions.find((r) => r.name === 'European Union')
  if (!euRegion) {
    euRegion = await regionService.createRegions({
      name: 'European Union',
      currency_code: 'eur',
      countries: ['ie', 'fr', 'de', 'nl', 'es', 'it', 'be', 'at', 'pt'],
      automatic_taxes: true,
    })
  }
  logger.info('✅ Regions: UK (GBP), EU (EUR)')

  // ── 5. Product categories ────────────────────────
  const categoryData = [
    { name: 'Protein', handle: 'protein', description: 'High-quality whey, casein, and plant-based protein.' },
    { name: 'Creatine', handle: 'creatine', description: 'Pure creatine monohydrate and advanced blends.' },
    { name: 'Vitamins', handle: 'vitamins', description: 'Essential vitamins and minerals.' },
    { name: 'Pre-Workout', handle: 'pre-workout', description: 'Energy, focus, and pump formulas.' },
    { name: 'Recovery', handle: 'recovery', description: 'Amino acids, electrolytes, and recovery blends.' },
  ]

  const categoryMap: Record<string, string> = {}

  for (const cat of categoryData) {
    const existing = await productService.listProductCategories({ handle: cat.handle })
    if (existing.length > 0) {
      categoryMap[cat.handle] = existing[0].id
    } else {
      const created = await productService.createProductCategories(cat)
      categoryMap[cat.handle] = created.id
    }
  }
  logger.info('✅ 5 categories created')

  // ── 6. Products (20 total) ───────────────────────
  interface SeedProduct {
    title: string
    handle: string
    category: string
    description: string
    price_gbp: number // pence
    price_eur: number // cents
    serving_size: string
    ingredients: string
    tags: { value: string }[]
  }

  const seedProducts: SeedProduct[] = [
    // Protein
    { title: 'Whey Isolate 90', handle: 'whey-isolate-90', category: 'protein', description: 'Ultra-filtered whey isolate with 27 g protein per scoop and less than 1 g fat.', price_gbp: 3499, price_eur: 3999, serving_size: '30 g (1 scoop)', ingredients: 'Whey Protein Isolate, Sunflower Lecithin, Natural Flavouring, Sucralose', tags: [{ value: 'muscle-growth' }, { value: 'stimulant-free' }] },
    { title: 'Casein Slow Release', handle: 'casein-slow-release', category: 'protein', description: 'Slow-digesting micellar casein ideal for overnight recovery.', price_gbp: 3199, price_eur: 3699, serving_size: '35 g (1 scoop)', ingredients: 'Micellar Casein, Cocoa Powder, Natural Flavouring, Xanthan Gum, Sucralose', tags: [{ value: 'muscle-growth' }, { value: 'stimulant-free' }] },
    { title: 'Plant Protein Blend', handle: 'plant-protein-blend', category: 'protein', description: 'Vegan-friendly tri-blend delivering 22 g complete protein.', price_gbp: 2899, price_eur: 3299, serving_size: '32 g (1 scoop)', ingredients: 'Pea Protein Isolate, Brown Rice Protein, Hemp Protein, Natural Flavouring, Stevia', tags: [{ value: 'muscle-growth' }, { value: 'stimulant-free' }] },
    { title: 'Clear Whey Isolate', handle: 'clear-whey-isolate', category: 'protein', description: 'Light, refreshing juice-style whey with 20 g protein.', price_gbp: 3299, price_eur: 3799, serving_size: '25 g (1 scoop)', ingredients: 'Hydrolysed Whey Protein Isolate, Citric Acid, Natural Flavouring, Sucralose, Beta Carotene', tags: [{ value: 'lean-muscle' }, { value: 'stimulant-free' }] },

    // Creatine
    { title: 'Creatine Monohydrate Pure', handle: 'creatine-monohydrate-pure', category: 'creatine', description: 'Pharmaceutical-grade Creapure® creatine monohydrate. 100 servings.', price_gbp: 1499, price_eur: 1799, serving_size: '5 g (1 scoop)', ingredients: 'Creatine Monohydrate (Creapure®)', tags: [{ value: 'strength' }, { value: 'stimulant-free' }] },
    { title: 'Creatine HCl', handle: 'creatine-hcl', category: 'creatine', description: 'Highly soluble creatine HCl in convenient capsules.', price_gbp: 1999, price_eur: 2299, serving_size: '2 g (1 capsule serving)', ingredients: 'Creatine Hydrochloride, Vegetable Capsule Shell (HPMC)', tags: [{ value: 'strength' }, { value: 'stimulant-free' }] },
    { title: 'Creatine Gummies', handle: 'creatine-gummies', category: 'creatine', description: 'Tasty mixed-berry gummies delivering a full 5 g creatine dose.', price_gbp: 2199, price_eur: 2499, serving_size: '5 g (4 gummies)', ingredients: 'Creatine Monohydrate, Tapioca Syrup, Sugar, Pectin, Citric Acid, Natural Flavouring', tags: [{ value: 'strength' }, { value: 'stimulant-free' }] },
    { title: 'Creatine Transport Matrix', handle: 'creatine-transport-matrix', category: 'creatine', description: 'Creatine paired with a dextrose shuttle and ALA for enhanced absorption.', price_gbp: 2499, price_eur: 2899, serving_size: '12 g (1 scoop)', ingredients: 'Creatine Monohydrate, Dextrose, Alpha-Lipoic Acid, Taurine, Natural Flavouring, Sucralose', tags: [{ value: 'performance' }, { value: 'stimulant-free' }] },

    // Vitamins
    { title: 'Daily Multivitamin', handle: 'daily-multivitamin', category: 'vitamins', description: 'Comprehensive A–Z multivitamin covering 100% of 13 essential micronutrient RDAs.', price_gbp: 1299, price_eur: 1499, serving_size: '1 tablet', ingredients: 'Vitamin C, Vitamin D3, Vitamin B12, Zinc, Iron, Magnesium, Selenium', tags: [{ value: 'general-health' }, { value: 'stimulant-free' }] },
    { title: 'Vitamin D3 + K2', handle: 'vitamin-d3-k2', category: 'vitamins', description: 'High-strength D3 paired with K2 MK-7 for optimal calcium absorption.', price_gbp: 999, price_eur: 1199, serving_size: '1 softgel', ingredients: 'Cholecalciferol (D3 4000 IU), Menaquinone-7 (K2 100 µg), Olive Oil, Softgel Shell', tags: [{ value: 'bone-health' }, { value: 'stimulant-free' }] },
    { title: 'Omega-3 Ultra', handle: 'omega-3-ultra', category: 'vitamins', description: 'Molecularly distilled, high-EPA omega-3 fish oil.', price_gbp: 1599, price_eur: 1799, serving_size: '2 softgels', ingredients: 'Fish Oil Concentrate, EPA 500 mg, DHA 250 mg, Vitamin E (Antioxidant), Softgel Shell', tags: [{ value: 'heart-health' }, { value: 'stimulant-free' }] },
    { title: 'Magnesium Bisglycinate', handle: 'magnesium-bisglycinate', category: 'vitamins', description: 'Highly bioavailable chelated magnesium for sleep quality and muscle relaxation.', price_gbp: 1199, price_eur: 1399, serving_size: '2 capsules', ingredients: 'Magnesium Bisglycinate 500 mg, Vegetable Capsule Shell (HPMC)', tags: [{ value: 'recovery' }, { value: 'stimulant-free' }] },

    // Pre-Workout
    { title: 'Ignite Pre-Workout', handle: 'ignite-pre-workout', category: 'pre-workout', description: 'Full-dose pre-workout with clinical amounts of citrulline and beta-alanine.', price_gbp: 2799, price_eur: 3199, serving_size: '15 g (1 scoop)', ingredients: 'Citrulline Malate 6 g, Beta-Alanine 3.2 g, Caffeine Anhydrous 200 mg, L-Tyrosine 1 g, Natural Flavouring, Sucralose', tags: [{ value: 'energy' }, { value: 'contains-caffeine' }] },
    { title: 'Stim-Free Pump', handle: 'stim-free-pump', category: 'pre-workout', description: 'Caffeine-free pump formula for evening training.', price_gbp: 2499, price_eur: 2899, serving_size: '14 g (1 scoop)', ingredients: 'L-Citrulline 8 g, Glycerol Powder 3 g, Betaine Anhydrous 2.5 g, Sodium Chloride 500 mg, Natural Flavouring', tags: [{ value: 'pump' }, { value: 'stimulant-free' }] },
    { title: 'Focus Nootropic Pre', handle: 'focus-nootropic-pre', category: 'pre-workout', description: 'Nootropic-stacked pre-workout for razor-sharp mental clarity.', price_gbp: 2999, price_eur: 3499, serving_size: '12 g (1 scoop)', ingredients: 'Alpha-GPC 300 mg, Caffeine Anhydrous 150 mg, L-Theanine 200 mg, Huperzine A 100 µg, B-Vitamin Complex', tags: [{ value: 'focus' }, { value: 'contains-caffeine' }] },
    { title: 'Endurance Fuel', handle: 'endurance-fuel', category: 'pre-workout', description: 'Carb-loaded intra/pre-workout designed for long sessions.', price_gbp: 2299, price_eur: 2699, serving_size: '40 g (1 scoop)', ingredients: 'Cluster Dextrin 30 g, Electrolyte Blend (Sodium, Potassium, Magnesium), Beta-Alanine 2 g, Caffeine 100 mg', tags: [{ value: 'endurance' }, { value: 'contains-caffeine' }] },

    // Recovery
    { title: 'BCAA + Electrolyte', handle: 'bcaa-electrolyte', category: 'recovery', description: 'Fermented 2:1:1 BCAAs with natural coconut water electrolytes.', price_gbp: 2199, price_eur: 2499, serving_size: '10 g (1 scoop)', ingredients: 'L-Leucine 3 g, L-Isoleucine 1.5 g, L-Valine 1.5 g, Coconut Water Powder, Sodium, Potassium, Natural Flavouring', tags: [{ value: 'recovery' }, { value: 'stimulant-free' }] },
    { title: 'EAA Complete', handle: 'eaa-complete', category: 'recovery', description: 'All nine essential amino acids in clinical doses.', price_gbp: 2399, price_eur: 2799, serving_size: '12 g (1 scoop)', ingredients: 'Full EAA Spectrum (9 Essential Amino Acids), Taurine 1 g, Coconut Water Powder, Natural Flavouring, Stevia', tags: [{ value: 'recovery' }, { value: 'stimulant-free' }] },
    { title: 'Tart Cherry Extract', handle: 'tart-cherry-extract', category: 'recovery', description: 'Concentrated 10:1 tart cherry extract rich in anthocyanins.', price_gbp: 1499, price_eur: 1799, serving_size: '1 capsule', ingredients: 'Montmorency Tart Cherry Extract 3000 mg (10:1), Vegetable Capsule Shell (HPMC)', tags: [{ value: 'inflammation' }, { value: 'stimulant-free' }] },
    { title: 'Glutamine Pure', handle: 'glutamine-pure', category: 'recovery', description: 'Pharmaceutical-grade fermented L-glutamine for gut and immune support.', price_gbp: 1299, price_eur: 1499, serving_size: '5 g (1 scoop)', ingredients: 'L-Glutamine (Fermented)', tags: [{ value: 'gut-health' }, { value: 'stimulant-free' }] },
  ]

  let created = 0
  for (const sp of seedProducts) {
    // Check if product already exists
    const existing = await productService.listProducts({ handle: sp.handle })
    if (existing.length > 0) {
      logger.info(`⏭️  Skipping existing product: ${sp.title}`)
      continue
    }

    await productService.createProducts({
      title: sp.title,
      handle: sp.handle,
      description: sp.description,
      status: 'published',
      category_ids: [categoryMap[sp.category]],
      tags: sp.tags,
      metadata: {
        serving_size: sp.serving_size,
        ingredients: sp.ingredients,
      },
      options: [
        {
          title: 'Size',
          values: ['Standard'],
        },
      ],
      variants: [
        {
          title: 'Standard',
          sku: sp.handle,
          manage_inventory: false,
          prices: [
            { amount: sp.price_gbp, currency_code: 'gbp' },
            { amount: sp.price_eur, currency_code: 'eur' },
          ],
          options: {
            Size: 'Standard',
          },
        },
      ],
    })
    created++
    logger.info(`  📦 ${sp.title} — £${(sp.price_gbp / 100).toFixed(2)}`)
  }

  logger.info(`✅ ${created} products seeded (${seedProducts.length - created} skipped)`)
  logger.info('🌱 Seed complete!')
}
