import contributorsData from '../data/contributors.json';

const avatarFiles = import.meta.glob('/static/avatar/**/*', {
    query: '?url',
    import: 'default',
    eager: true,
});

function getAvatar(path) {
    if (!path) return '';

    const match = Object.entries(avatarFiles).find(([key]) =>
        key.endsWith(path)
    );

    return match?.[1] ?? '';
}

const slugs = Object.keys(contributorsData).sort();

export { slugs };

export function loadContributor(slug) {
    const entry = contributorsData[slug];

    if (!entry) {
        throw new Error(`Contributor "${slug}" not found.`);
    }

    return {
        html: entry.html,
        title: entry.title,
        pageAttributes: {
            ...entry.pageAttributes,
            image: getAvatar(entry.pageAttributes.image),
        },
        sourcePath: `src/contributors/${slug}.adoc`,
    };
}
