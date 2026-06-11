import { type SchemaTypeDefinition } from 'sanity'
import { project } from './project'
import { researchPaper } from './researchPaper'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, researchPaper],
}
