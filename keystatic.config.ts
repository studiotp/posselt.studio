import { config, fields, collection } from '@keystatic/core';
import categories from './src/data/categories.json';
import clients from './src/data/clients.json';

const currentYear = String(new Date().getFullYear());
const yearOptions = Array.from({ length: 41 }, (_, i) => {
  const year = 2010 + i;
  return { label: String(year), value: String(year) };
});

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*/',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: { label: 'Title', validation: { isRequired: true } },
        }),
        client: fields.select({
          label: 'Client',
          options: clients.length > 0 ? clients : [{ label: 'No clients yet', value: '' }],
          defaultValue: clients.length > 0 ? clients[0].value : '',
        }),
        year: fields.select({
          label: 'Year',
          options: yearOptions,
          defaultValue: currentYear,
        }),
        category: fields.select({
          label: 'Category',
          options: categories,
          defaultValue: 'music',
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
          directory: 'src/content/projects',
          publicPath: '/src/content/projects/',
        }),
        slides: fields.array(
          fields.object({
            type: fields.select({
              label: 'Slide type',
              options: [
                { label: 'Image', value: 'image' },
                { label: 'Video', value: 'video' },
              ],
              defaultValue: 'image',
            }),
            imageFile: fields.image({
              label: 'Image file',
              directory: 'src/content/projects',
              publicPath: '/src/content/projects/',
              validation: { isRequired: false },
            }),
            videoUrl: fields.url({
              label: 'Video URL (Vimeo MP4)',
              validation: { isRequired: false },
            }),
            poster: fields.image({
              label: 'Video poster image',
              directory: 'src/content/projects',
              publicPath: '/src/content/projects/',
              validation: { isRequired: false },
            }),
            caption: fields.text({
              label: 'Caption',
              validation: { isRequired: false },
            }),
            alt: fields.text({
              label: 'Alt text',
              validation: { isRequired: false },
            }),
            autoplay: fields.checkbox({
              label: 'Autoplay',
              defaultValue: false,
            }),
          }),
          {
            label: 'Slides',
            itemLabel: (props) => {
              const type = props.fields.type.value;
              const caption = props.fields.caption.value;
              if (caption) return `${type}: ${caption}`;

              if (type === 'image') {
                const path = props.fields.imageFile.value;
                const filename = path ? path.split('/').pop() : '';
                return filename ? `image: ${filename}` : 'image slide';
              }

              return `${type} slide`;
            },
          }
        ),
        content: fields.markdoc({
          label: 'Project description / body',
        }),
      },
    }),
  },
});
