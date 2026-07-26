import { defineQuery } from 'next-sanity';

/** What a card and the sitemap need. */
const cardFields = /* groq */ `
  kind,
  "slug": slug.current,
  title,
  description,
  date,
  tags,
  status,
  youtubeUrl,
  github,
  demo,
  authors,
  journal,
  conference
`;

/** Adds what only a detail page renders — including the full markdown body. */
const detailFields = /* groq */ `
  ${cardFields},
  abstract,
  doi,
  arxiv,
  pdf,
  content
`;

export const ALL_WORK_QUERY = defineQuery(
  `*[_type == "work" && defined(slug.current)] | order(date desc) { ${cardFields} }`
);

export const WORK_BY_SLUG_QUERY = defineQuery(
  `*[_type == "work" && slug.current == $slug][0] { ${detailFields} }`
);

export const ALL_WORK_SLUGS_QUERY = defineQuery(
  `*[_type == "work" && defined(slug.current)] { "slug": slug.current }`
);
