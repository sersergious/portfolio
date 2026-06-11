import { defineQuery } from 'next-sanity'

const projectFields = /* groq */ `
  _id,
  "slug": slug.current,
  title,
  description,
  date,
  tags,
  category,
  featured,
  status,
  github,
  demo,
  youtubeUrl,
  "image": image.asset->url,
  content
`

const researchFields = /* groq */ `
  _id,
  "slug": slug.current,
  title,
  abstract,
  authors,
  date,
  tags,
  featured,
  status,
  journal,
  conference,
  volume,
  pages,
  doi,
  arxiv,
  pdf,
  youtubeUrl,
  citations,
  awards,
  "image": image.asset->url,
  content
`

export const ALL_PROJECTS_QUERY = defineQuery(
  `*[_type == "project"] | order(date desc) { ${projectFields} }`
)

export const PROJECT_BY_SLUG_QUERY = defineQuery(
  `*[_type == "project" && slug.current == $slug][0] { ${projectFields} }`
)

export const FEATURED_PROJECTS_QUERY = defineQuery(
  `*[_type == "project" && featured == true] | order(date desc) [0...$limit] { ${projectFields} }`
)

export const ALL_RESEARCH_QUERY = defineQuery(
  `*[_type == "researchPaper"] | order(date desc) { ${researchFields} }`
)

export const RESEARCH_BY_SLUG_QUERY = defineQuery(
  `*[_type == "researchPaper" && slug.current == $slug][0] { ${researchFields} }`
)

export const FEATURED_RESEARCH_QUERY = defineQuery(
  `*[_type == "researchPaper" && featured == true] | order(date desc) [0...$limit] { ${researchFields} }`
)

export const ALL_PROJECT_SLUGS_QUERY = defineQuery(
  `*[_type == "project" && defined(slug.current)] { "slug": slug.current }`
)

export const ALL_RESEARCH_SLUGS_QUERY = defineQuery(
  `*[_type == "researchPaper" && defined(slug.current)] { "slug": slug.current }`
)
