import type { CollectionConfig } from 'payload'

export const BatchReports: CollectionConfig = {
  slug: 'batch-reports',
  admin: {
    useAsTitle: 'batchCode',
    defaultColumns: ['batchCode', 'productName', 'testDate', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'batchCode',
      type: 'text',
      required: true,
      unique: true,
      label: 'Batch Code',
    },
    {
      name: 'productName',
      type: 'text',
      required: true,
      label: 'Product Name',
    },
    {
      name: 'productHandle',
      type: 'text',
      required: true,
      label: 'Product Handle (Medusa)',
    },
    {
      name: 'testDate',
      type: 'date',
      required: true,
      label: 'Test Date',
    },
    {
      name: 'laboratory',
      type: 'text',
      label: 'Testing Laboratory',
    },
    {
      name: 'reportPdf',
      type: 'upload',
      relationTo: 'media',
      label: 'Lab Report PDF',
    },
    {
      name: 'results',
      type: 'group',
      fields: [
        {
          name: 'purity',
          type: 'text',
          label: 'Purity Result',
        },
        {
          name: 'heavyMetals',
          type: 'select',
          options: [
            { label: 'Pass', value: 'pass' },
            { label: 'Fail', value: 'fail' },
          ],
          label: 'Heavy Metals',
        },
        {
          name: 'bannedSubstances',
          type: 'select',
          options: [
            { label: 'Pass', value: 'pass' },
            { label: 'Fail', value: 'fail' },
          ],
          label: 'Banned Substances',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
