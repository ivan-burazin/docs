import node from '@astrojs/node'
import react from '@astrojs/react'
import starlight from '@astrojs/starlight'
import { ExpressiveCodeTheme } from '@astrojs/starlight/expressive-code'
import { defineConfig } from 'astro/config'
import fs from 'node:fs'
import { loadEnv } from 'vite'

const { PUBLIC_WEB_URL } = loadEnv(import.meta.env.MODE, process.cwd(), '')

const jsonDarkString = fs.readFileSync(
  new URL(`src/assets/themes/daytona-code-dark.json`, import.meta.url),
  'utf-8'
)
const jsonLightString = fs.readFileSync(
  new URL(`src/assets/themes/daytona-code-light.json`, import.meta.url),
  'utf-8'
)
const myThemeDark = ExpressiveCodeTheme.fromJSONString(jsonDarkString)
const myThemeLight = ExpressiveCodeTheme.fromJSONString(jsonLightString)

export default defineConfig({
  site: PUBLIC_WEB_URL,
  integrations: [
    react(),
    starlight({
      title: 'Daytona API',
      description: 'Complete API reference for Daytona',
      base: '/api',
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'English',
          lang: 'en',
        },
      },
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', link: '/' },
            { label: 'Authentication', link: '/authentication' },
            { label: 'Errors', link: '/errors' },
            { label: 'Pagination', link: '/pagination' },
            { label: 'Versioning', link: '/versioning' }
          ]
        },
        {
          label: 'API Reference',
          items: [
            {
              label: 'Authentication',
              items: [
                { label: 'Overview', link: '/endpoints/authentication' },
                { label: 'API Keys', link: '/endpoints/authentication/apikeys' }
              ]
            },
            {
              label: 'Git',
              items: [
                { label: 'Overview', link: '/endpoints/git' },
                { label: 'Operations', link: '/endpoints/git/git' }
              ]
            },
            { label: 'Container Registry', link: '/endpoints/container-registry' },
            { label: 'Health', link: '/endpoints/health' },
            { label: 'Project Config', link: '/endpoints/project-config' },
            { label: 'Provider', link: '/endpoints/provider' },
            { label: 'Server', link: '/endpoints/server' },
            { label: 'Target', link: '/endpoints/target' },
            { label: 'Workspace', link: '/endpoints/workspace' }
          ]
        }
      ],
      customCss: ['./src/fonts/font-face.css', './src/styles/style.scss'],
      favicon: '/favicon.ico',
      social: {
        github: 'https://github.com/daytonaio/daytona',
      },
      editLink: {
        baseUrl: 'https://github.com/daytonaio/docs/blob/main/',
      },
      components: {
        Footer: './src/components/Footer.astro',
        MarkdownContent: './src/components/MarkdownContent.astro',
        Pagination: './src/components/Pagination.astro',
        Header: './src/components/Header.astro',
        PageSidebar: './src/components/PageSidebar.astro',
        PageFrame: './src/components/PageFrame.astro',
        Sidebar: './src/components/Sidebar.astro',
        TwoColumnContent: './src/components/TwoColumnContent.astro',
        TableOfContents: './src/components/TableOfContents.astro',
        MobileMenuToggle: './src/components/MobileMenuToggle.astro',
        ContentPanel: './src/components/ContentPanel.astro',
        PageTitle: './src/components/PageTitle.astro',
        Hero: './src/components/Hero.astro',
        ThemeProvider: './src/components/ThemeProvider.astro',
        ThemeSelect: './src/components/ThemeSelect.astro',
        Head: './src/components/Head.astro',
        EditLink: './src/components/EditLink.astro',
      },
      expressiveCode: {
        minSyntaxHighlightingColorContrast: 0,
        themes: [myThemeDark, myThemeLight],
      },
    }),
  ],
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  vite: {
    ssr: {
      noExternal: ['path-to-regexp'],
    },
  },
})
