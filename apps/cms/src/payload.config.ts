import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Posts } from './collections/posts'
import { BatchReports } from './collections/batch-reports'
import { Media } from './collections/media'
import { brand } from '@pharmaqo/config/brand'

export default buildConfig({
  admin: {
    meta: {
      titleSuffix: ` — ${brand.name} CMS`,
    },
  },

  collections: [Posts, BatchReports, Media],

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),

  typescript: {
    outputFile: './src/payload-types.ts',
  },

  secret: process.env.PAYLOAD_SECRET || 'change-me-in-production',
})
