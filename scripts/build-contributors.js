import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import * as asciidoctorModule from '@asciidoctor/core';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const asciidoctor = asciidoctorModule; 
const contributorsDir = path.resolve('src/contributors');
const outDir = path.resolve('src/data');
const outFile = path.join(outDir, 'contributors.json');

// AsciiDoc passthrough blocks can carry raw HTML, so the converted output is
// sanitized before it reaches the page.
const DOMPurify = createDOMPurify(new JSDOM('').window);

function getPageAttributes(doc, avatarPath) {
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
        image: avatarPath,
        featured: doc.getAttribute('page-featured', ''),
        intro: doc.getAttribute('page-intro', ''),
    };
}

async function build() {
    const files = readdirSync(contributorsDir).filter((f) => f.endsWith('.adoc'));
    const data = {};

    for (const file of files) {
        const slug = file.replace(/\.adoc$/, '');
        const raw = readFileSync(path.join(contributorsDir, file), 'utf-8');

        const doc = await asciidoctor.load(raw);
        const html = DOMPurify.sanitize(await doc.convert());

        data[slug] = {
            html,
            title: doc.getDocumentTitle(),
            pageAttributes: getPageAttributes(doc, doc.getAttribute('page-image', '')),
        };
    }

    mkdirSync(outDir, { recursive: true });
    writeFileSync(outFile, JSON.stringify(data, null, 2));
    console.log(`✓ Wrote ${Object.keys(data).length} contributors to ${path.relative(process.cwd(), outFile)}`);
}

build();
