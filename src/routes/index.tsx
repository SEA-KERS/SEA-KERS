import { createFileRoute } from '@tanstack/react-router'
import HomePage from '../components/HomePage'

const title = 'Team SEA-KERS | Open Innovation & Hackathon Victories'
const description =
  'Team SEA-KERS is a high-performance collegiate engineering collective with 20+ global hackathon victories across Web3, AI, and DePIN infrastructure.'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title },
      { name: 'description', content: description },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Team SEA-KERS',
          description,
          areaServed: 'Worldwide',
          knowsAbout: [
            'Artificial intelligence',
            'Decentralized physical infrastructure networks',
            'Open-source software',
            'Web3',
          ],
        }),
      },
    ],
  }),
  component: HomePage,
})
