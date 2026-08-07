import * as asciidoctorModule from '@asciidoctor/core';

const asciidoctor = asciidoctorModule;

const contributorFiles = import.meta.glob('/src/contributors/*.adoc', {
    query: '?raw',
    import: 'default',
    eager: true,
});

const avatarFiles = import.meta.glob('/static/avatar/**/*', {
    query: '?url',
    import: 'default',
    eager: true,
});

const contentBySlug = new Map(
    Object.entries(contributorFiles).map(([file, content]) => [
        file.match(/([^/]+)\.adoc$/)[1],
        content,
    ])
);

const slugs = [...contentBySlug.keys()].sort();

export { slugs };

function getContent(slug) {
    return contentBySlug.get(slug) ?? null;
}

function getAvatar(path) {
    if (!path) return '';

    const match = Object.entries(avatarFiles).find(([key]) =>
        key.endsWith(path)
    );

    return match?.[1] ?? '';
}

function getPageAttributes(doc) {
    const imagePath = doc.getAttribute('page-image', '');

    return {
        name: doc.getAttribute('page-name', ''),
        pronouns: doc.getAttribute('page-pronouns', 'They/them'),
        location: doc.getAttribute('page-location', 'World'),
        firstcommit: doc.getAttribute('page-firstcommit', ''),
        datepublished: doc.getAttribute('page-datepublished', ''),
        linkedin: doc.getAttribute('page-linkedin', ''),
        twitter: doc.getAttribute('page-twitter', ''),
        github: doc.getAttribute('page-github', ''),
        threads: doc.getAttribute('page-threads', ''),
        email: doc.getAttribute('page-email', ''),
        image: getAvatar(imagePath),
        featured: doc.getAttribute('page-featured', ''),
        intro: doc.getAttribute('page-intro', ''),
    };
}

export async function loadContributor(slug) {
    if (!slugs.includes(slug)) {
        throw new Error(`Contributor "${slug}" not found.`);
    }

    const content = getContent(slug);
    const doc = await asciidoctor.load(content);

    return {
        html: await doc.convert(),
        title: doc.getDocumentTitle(),
        pageAttributes: getPageAttributes(doc),
    };
}
