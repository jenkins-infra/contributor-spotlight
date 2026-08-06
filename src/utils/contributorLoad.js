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

const slugs = Object.keys(contributorFiles)
  .map((file) => file.match(/([^/]+)\.adoc$/)[1])
  .sort();

export { slugs };

function getContent(slug) {
  const entry = Object.entries(contributorFiles).find(([file]) =>
    file.endsWith(`/${slug}.adoc`)
  );
  return entry?.[1] ?? null;
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

async function getNeighbor(slug) {
  if (!slug) return null;

  const content = getContent(slug);
  const doc = await asciidoctor.load(content);

  return {
    slug: `/contributors/${slug}`,
    title: doc.getDocumentTitle(),
    image: getAvatar(doc.getAttribute('page-image', '')),
  };
}

export async function loadContributor(slug) {
  const index = slugs.indexOf(slug);

  if (index === -1) {
    throw new Error(`Contributor "${slug}" not found.`);
  }

  const content = getContent(slug);
  const doc = await asciidoctor.load(content);

  return {
    html: await doc.convert(),
    title: doc.getDocumentTitle(),
    pageAttributes: getPageAttributes(doc),
    previous: index > 0 ? await getNeighbor(slugs[index - 1]) : null,
    next: index < slugs.length - 1 ? await getNeighbor(slugs[index + 1]) : null,
  };
}
