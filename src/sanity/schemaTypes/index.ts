import { type SchemaTypeDefinition, type Template } from 'sanity';
import { work } from './work';

// Templates back the Create button in the filtered Studio panes, so creating
// from "Projects" or "Research" pre-fills `kind` and a matching status.
export const schema: {
  types: SchemaTypeDefinition[];
  templates: (prev: Template[]) => Template[];
} = {
  types: [work],
  templates: prev => [
    ...prev,
    {
      id: 'work-project',
      title: 'Project',
      schemaType: 'work',
      value: { kind: 'project', status: 'completed' },
    },
    {
      id: 'work-research',
      title: 'Research',
      schemaType: 'work',
      value: { kind: 'research', status: 'draft' },
    },
  ],
};
