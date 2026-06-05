import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: { label: 'Title' },
        }),
        client: fields.text({ label: 'Client' }),
        year: fields.integer({
          label: 'Year',
          validation: { isRequired: false },
        }),
        category: fields.text({
          label: 'Category',
          validation: { isRequired: false },
        }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Archive', value: 'archive' },
            { label: 'Draft', value: 'draft' },
          ],
          defaultValue: 'active',
        }),
        featured: fields.checkbox({
          label: 'Featured',
          defaultValue: false,
        }),
        url: fields.url({
          label: 'URL',
          validation: { isRequired: false },
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
          validation: { isRequired: false },
        }),
        thumbnail: fields.image({
          label: 'Thumbnail',
          directory: 'src/assets/projects',
          publicPath: '/src/assets/projects/',
        }),
        slides: fields.array(
          fields.object({
            type: fields.select({
              label: 'Type',
              options: [
                { label: 'Image', value: 'image' },
                { label: 'Video', value: 'video' },
              ],
              defaultValue: 'image',
            }),
            src: fields.text({ label: 'Source (filename or URL)' }),
            caption: fields.text({
              label: 'Caption',
              validation: { isRequired: false },
            }),
            alt: fields.text({
              label: 'Alt text',
              validation: { isRequired: false },
            }),
            poster: fields.text({
              label: 'Video poster (filename)',
              validation: { isRequired: false },
            }),
            autoplay: fields.checkbox({
              label: 'Autoplay',
              defaultValue: false,
            }),
          }),
          {
            label: 'Slides',
            itemLabel: (props) => props.fields.caption.value || props.fields.src.value || 'Slide',
          }
        ),
        content: fields.markdoc({
          label: 'Project description / body',
        }),
      },
    }),
  },
});
