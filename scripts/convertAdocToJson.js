const fs = require('fs');
const path = require('path');
const asciidoctor = require('asciidoctor')();

const contributorsDir = path.join(__dirname, '../src/pages/contributors');
const outputFile = path.join(__dirname, '../data/contributors.json');

const files = fs.readdirSync(contributorsDir);

const contributors = [];

files.forEach((file) => {
    if (file.endsWith('.adoc')) {
        const filePath = path.join(contributorsDir, file);
        const content = fs.readFileSync(filePath, 'utf8');

        const doc = asciidoctor.load(content);
        const attrs = doc.getAttributes();

        contributors.push({
            name: attrs['page-name'],
            github: attrs['page-github'],
            twitter: attrs['page-twitter'],
            location: attrs['page-location'],
            firstcommit: attrs['page-firstcommit'],
            intro: attrs['page-intro'],
        });
    }
});

fs.writeFileSync(outputFile, JSON.stringify(contributors, null, 2));

console.log('Contributors JSON generated!');
