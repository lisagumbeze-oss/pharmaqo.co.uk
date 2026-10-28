/**
 * Placeholder supplement data for the storefront.
 * In production these come from the Medusa API;
 * this file drives the static UI until the backend is wired up.
 *
 * ⚠️  No prescription, controlled, or hormonal products.
 */

export interface Product {
  id: string
  handle: string
  name: string
  category: string
  categorySlug: string
  price: number // pence
  servingSize: string
  ingredients: string[]
  tags: {
    goal: string
    stimulant: 'stimulant-free' | 'contains-caffeine'
  }
  description: string
}

export interface Category {
  name: string
  slug: string
  description: string
  productCount: number
}

export const categories: Category[] = [
  {
    name: 'Protein',
    slug: 'protein',
    description: 'High-quality whey, casein, and plant-based protein to support lean muscle growth and recovery.',
    productCount: 4,
  },
  {
    name: 'Creatine',
    slug: 'creatine',
    description: 'Pure creatine monohydrate and advanced blends for strength, power, and endurance.',
    productCount: 4,
  },
  {
    name: 'Vitamins',
    slug: 'vitamins',
    description: 'Essential vitamins and minerals to fill nutritional gaps and optimise daily performance.',
    productCount: 4,
  },
  {
    name: 'Pre-Workout',
    slug: 'pre-workout',
    description: 'Energy, focus, and pump formulas to maximise every training session.',
    productCount: 4,
  },
  {
    name: 'Recovery',
    slug: 'recovery',
    description: 'Amino acids, electrolytes, and anti-inflammatory blends for faster recovery between sessions.',
    productCount: 4,
  },
]

export const products: Product[] = [
  // ── Protein (4) ──────────────────────────────────
  {
    id: 'prod_protein_01',
    handle: 'whey-isolate-90',
    name: 'Whey Isolate 90',
    category: 'Protein',
    categorySlug: 'protein',
    price: 3499,
    servingSize: '30 g (1 scoop)',
    ingredients: ['Whey Protein Isolate', 'Sunflower Lecithin', 'Natural Flavouring', 'Sucralose'],
    tags: { goal: 'muscle-growth', stimulant: 'stimulant-free' },
    description: 'Ultra-filtered whey isolate with 27 g protein per scoop and less than 1 g fat. Fast-absorbing and perfect post-workout.',
  },
  {
    id: 'prod_protein_02',
    handle: 'casein-slow-release',
    name: 'Casein Slow Release',
    category: 'Protein',
    categorySlug: 'protein',
    price: 3199,
    servingSize: '35 g (1 scoop)',
    ingredients: ['Micellar Casein', 'Cocoa Powder', 'Natural Flavouring', 'Xanthan Gum', 'Sucralose'],
    tags: { goal: 'muscle-growth', stimulant: 'stimulant-free' },
    description: 'Slow-digesting micellar casein ideal for overnight recovery. Thick, creamy shake with 24 g protein.',
  },
  {
    id: 'prod_protein_03',
    handle: 'plant-protein-blend',
    name: 'Plant Protein Blend',
    category: 'Protein',
    categorySlug: 'protein',
    price: 2899,
    servingSize: '32 g (1 scoop)',
    ingredients: ['Pea Protein Isolate', 'Brown Rice Protein', 'Hemp Protein', 'Natural Flavouring', 'Stevia'],
    tags: { goal: 'muscle-growth', stimulant: 'stimulant-free' },
    description: 'Vegan-friendly tri-blend delivering 22 g complete protein. Naturally sweetened with stevia.',
  },
  {
    id: 'prod_protein_04',
    handle: 'clear-whey-isolate',
    name: 'Clear Whey Isolate',
    category: 'Protein',
    categorySlug: 'protein',
    price: 3299,
    servingSize: '25 g (1 scoop)',
    ingredients: ['Hydrolysed Whey Protein Isolate', 'Citric Acid', 'Natural Flavouring', 'Sucralose', 'Beta Carotene'],
    tags: { goal: 'lean-muscle', stimulant: 'stimulant-free' },
    description: 'Light, refreshing juice-style whey with 20 g protein. Zero milky texture — perfect for summer training.',
  },

  // ── Creatine (4) ─────────────────────────────────
  {
    id: 'prod_creatine_01',
    handle: 'creatine-monohydrate-pure',
    name: 'Creatine Monohydrate Pure',
    category: 'Creatine',
    categorySlug: 'creatine',
    price: 1499,
    servingSize: '5 g (1 scoop)',
    ingredients: ['Creatine Monohydrate (Creapure®)'],
    tags: { goal: 'strength', stimulant: 'stimulant-free' },
    description: 'Pharmaceutical-grade Creapure® creatine monohydrate. 100 servings per tub. Unflavoured, mixes clear.',
  },
  {
    id: 'prod_creatine_02',
    handle: 'creatine-hcl',
    name: 'Creatine HCl',
    category: 'Creatine',
    categorySlug: 'creatine',
    price: 1999,
    servingSize: '2 g (1 capsule serving)',
    ingredients: ['Creatine Hydrochloride', 'Vegetable Capsule Shell (HPMC)'],
    tags: { goal: 'strength', stimulant: 'stimulant-free' },
    description: 'Highly soluble creatine HCl in convenient capsules. No bloating, no loading phase required.',
  },
  {
    id: 'prod_creatine_03',
    handle: 'creatine-gummies',
    name: 'Creatine Gummies',
    category: 'Creatine',
    categorySlug: 'creatine',
    price: 2199,
    servingSize: '5 g (4 gummies)',
    ingredients: ['Creatine Monohydrate', 'Tapioca Syrup', 'Sugar', 'Pectin', 'Citric Acid', 'Natural Flavouring'],
    tags: { goal: 'strength', stimulant: 'stimulant-free' },
    description: 'Tasty mixed-berry gummies delivering a full 5 g creatine dose. Great for people who dislike powders.',
  },
  {
    id: 'prod_creatine_04',
    handle: 'creatine-transport-matrix',
    name: 'Creatine Transport Matrix',
    category: 'Creatine',
    categorySlug: 'creatine',
    price: 2499,
    servingSize: '12 g (1 scoop)',
    ingredients: ['Creatine Monohydrate', 'Dextrose', 'Alpha-Lipoic Acid', 'Taurine', 'Natural Flavouring', 'Sucralose'],
    tags: { goal: 'performance', stimulant: 'stimulant-free' },
    description: 'Creatine paired with a dextrose shuttle and ALA for enhanced absorption. Tropical mango flavour.',
  },

  // ── Vitamins (4) ─────────────────────────────────
  {
    id: 'prod_vitamins_01',
    handle: 'daily-multivitamin',
    name: 'Daily Multivitamin',
    category: 'Vitamins',
    categorySlug: 'vitamins',
    price: 1299,
    servingSize: '1 tablet',
    ingredients: ['Vitamin C', 'Vitamin D3', 'Vitamin B12', 'Zinc', 'Iron', 'Magnesium', 'Selenium'],
    tags: { goal: 'general-health', stimulant: 'stimulant-free' },
    description: 'Comprehensive A–Z multivitamin covering 100% of 13 essential micronutrient RDAs. One tablet daily.',
  },
  {
    id: 'prod_vitamins_02',
    handle: 'vitamin-d3-k2',
    name: 'Vitamin D3 + K2',
    category: 'Vitamins',
    categorySlug: 'vitamins',
    price: 999,
    servingSize: '1 softgel',
    ingredients: ['Cholecalciferol (D3 4000 IU)', 'Menaquinone-7 (K2 100 µg)', 'Olive Oil', 'Softgel Shell'],
    tags: { goal: 'bone-health', stimulant: 'stimulant-free' },
    description: 'High-strength D3 paired with K2 MK-7 for optimal calcium absorption. Especially important in UK winters.',
  },
  {
    id: 'prod_vitamins_03',
    handle: 'omega-3-ultra',
    name: 'Omega-3 Ultra',
    category: 'Vitamins',
    categorySlug: 'vitamins',
    price: 1599,
    servingSize: '2 softgels',
    ingredients: ['Fish Oil Concentrate', 'EPA 500 mg', 'DHA 250 mg', 'Vitamin E (Antioxidant)', 'Softgel Shell'],
    tags: { goal: 'heart-health', stimulant: 'stimulant-free' },
    description: 'Molecularly distilled, high-EPA omega-3 fish oil. Supports cardiovascular function and joint health.',
  },
  {
    id: 'prod_vitamins_04',
    handle: 'magnesium-bisglycinate',
    name: 'Magnesium Bisglycinate',
    category: 'Vitamins',
    categorySlug: 'vitamins',
    price: 1199,
    servingSize: '2 capsules',
    ingredients: ['Magnesium Bisglycinate 500 mg (providing 100 mg elemental Mg)', 'Vegetable Capsule Shell (HPMC)'],
    tags: { goal: 'recovery', stimulant: 'stimulant-free' },
    description: 'Highly bioavailable chelated magnesium for sleep quality, muscle relaxation, and nervous system support.',
  },

  // ── Pre-Workout (4) ──────────────────────────────
  {
    id: 'prod_preworkout_01',
    handle: 'ignite-pre-workout',
    name: 'Ignite Pre-Workout',
    category: 'Pre-Workout',
    categorySlug: 'pre-workout',
    price: 2799,
    servingSize: '15 g (1 scoop)',
    ingredients: ['Citrulline Malate 6 g', 'Beta-Alanine 3.2 g', 'Caffeine Anhydrous 200 mg', 'L-Tyrosine 1 g', 'Natural Flavouring', 'Sucralose'],
    tags: { goal: 'energy', stimulant: 'contains-caffeine' },
    description: 'Full-dose pre-workout with clinical amounts of citrulline and beta-alanine. 200 mg caffeine for sharp focus.',
  },
  {
    id: 'prod_preworkout_02',
    handle: 'stim-free-pump',
    name: 'Stim-Free Pump',
    category: 'Pre-Workout',
    categorySlug: 'pre-workout',
    price: 2499,
    servingSize: '14 g (1 scoop)',
    ingredients: ['L-Citrulline 8 g', 'Glycerol Powder 3 g', 'Betaine Anhydrous 2.5 g', 'Sodium Chloride 500 mg', 'Natural Flavouring'],
    tags: { goal: 'pump', stimulant: 'stimulant-free' },
    description: 'Caffeine-free pump formula for evening training. Massive vasodilation from 8 g pure citrulline.',
  },
  {
    id: 'prod_preworkout_03',
    handle: 'focus-nootropic-pre',
    name: 'Focus Nootropic Pre',
    category: 'Pre-Workout',
    categorySlug: 'pre-workout',
    price: 2999,
    servingSize: '12 g (1 scoop)',
    ingredients: ['Alpha-GPC 300 mg', 'Caffeine Anhydrous 150 mg', 'L-Theanine 200 mg', 'Huperzine A 100 µg', 'B-Vitamin Complex'],
    tags: { goal: 'focus', stimulant: 'contains-caffeine' },
    description: 'Nootropic-stacked pre-workout for razor-sharp mental clarity. L-theanine balances the caffeine for smooth energy.',
  },
  {
    id: 'prod_preworkout_04',
    handle: 'endurance-fuel',
    name: 'Endurance Fuel',
    category: 'Pre-Workout',
    categorySlug: 'pre-workout',
    price: 2299,
    servingSize: '40 g (1 scoop)',
    ingredients: ['Cluster Dextrin 30 g', 'Electrolyte Blend (Sodium, Potassium, Magnesium)', 'Beta-Alanine 2 g', 'Caffeine 100 mg'],
    tags: { goal: 'endurance', stimulant: 'contains-caffeine' },
    description: 'Carb-loaded intra/pre-workout designed for long sessions, runs, and hybrid training. Gentle 100 mg caffeine.',
  },

  // ── Recovery (4) ─────────────────────────────────
  {
    id: 'prod_recovery_01',
    handle: 'bcaa-electrolyte',
    name: 'BCAA + Electrolyte',
    category: 'Recovery',
    categorySlug: 'recovery',
    price: 2199,
    servingSize: '10 g (1 scoop)',
    ingredients: ['L-Leucine 3 g', 'L-Isoleucine 1.5 g', 'L-Valine 1.5 g', 'Coconut Water Powder', 'Sodium', 'Potassium', 'Natural Flavouring'],
    tags: { goal: 'recovery', stimulant: 'stimulant-free' },
    description: 'Fermented 2:1:1 BCAAs with natural coconut water electrolytes. Sip intra-workout to reduce soreness.',
  },
  {
    id: 'prod_recovery_02',
    handle: 'eaa-complete',
    name: 'EAA Complete',
    category: 'Recovery',
    categorySlug: 'recovery',
    price: 2399,
    servingSize: '12 g (1 scoop)',
    ingredients: ['Full EAA Spectrum (9 Essential Amino Acids)', 'Taurine 1 g', 'Coconut Water Powder', 'Natural Flavouring', 'Stevia'],
    tags: { goal: 'recovery', stimulant: 'stimulant-free' },
    description: 'All nine essential amino acids in clinical doses. Superior to BCAAs for triggering muscle protein synthesis.',
  },
  {
    id: 'prod_recovery_03',
    handle: 'tart-cherry-extract',
    name: 'Tart Cherry Extract',
    category: 'Recovery',
    categorySlug: 'recovery',
    price: 1499,
    servingSize: '1 capsule',
    ingredients: ['Montmorency Tart Cherry Extract 3000 mg (10:1)', 'Vegetable Capsule Shell (HPMC)'],
    tags: { goal: 'inflammation', stimulant: 'stimulant-free' },
    description: 'Concentrated 10:1 tart cherry extract rich in anthocyanins. Supports healthy inflammation response and sleep.',
  },
  {
    id: 'prod_recovery_04',
    handle: 'glutamine-pure',
    name: 'Glutamine Pure',
    category: 'Recovery',
    categorySlug: 'recovery',
    price: 1299,
    servingSize: '5 g (1 scoop)',
    ingredients: ['L-Glutamine (Fermented)'],
    tags: { goal: 'gut-health', stimulant: 'stimulant-free' },
    description: 'Pharmaceutical-grade fermented L-glutamine. Supports gut lining integrity and immune function post-training.',
  },
]

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.categorySlug === slug)
}

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}
