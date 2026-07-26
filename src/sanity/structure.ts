import type { StructureResolver } from 'sanity/structure';

const byDateDesc = [{ field: 'date', direction: 'desc' as const }];

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = S =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .id('all-work')
        .title('All work')
        .child(
          S.documentTypeList('work')
            .title('All work')
            .defaultOrdering(byDateDesc)
        ),
      S.listItem()
        .id('projects')
        .title('Projects')
        .child(
          S.documentTypeList('work')
            .title('Projects')
            .filter('_type == "work" && kind == "project"')
            .defaultOrdering(byDateDesc)
            .initialValueTemplates([S.initialValueTemplateItem('work-project')])
        ),
      S.listItem()
        .id('research')
        .title('Research')
        .child(
          S.documentTypeList('work')
            .title('Research')
            .filter('_type == "work" && kind == "research"')
            .defaultOrdering(byDateDesc)
            .initialValueTemplates([
              S.initialValueTemplateItem('work-research'),
            ])
        ),
    ]);
