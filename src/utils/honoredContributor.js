import Papa from 'papaparse';

// The file quotes every field and puts a space after each comma, so the column
// names and the values both need the quotes and the spacing taken off.
const clean = (value) =>
    String(value ?? '')
        .trim()
        .replace(/^"|"$/g, '')
        .trim();

export const REQUIRED_COLUMNS = [
    'MONTH',
    'GH_HANDLE',
    'GH_HANDLE_URL',
    'GH_HANDLE_AVATAR',
    'NBR_PR',
    'REPOSITORIES',
];

/**
 * Reads the first usable row of honored_contributor.csv by column name.
 * Returns null when the file can't be parsed, is missing a column this
 * component relies on, or has no row with all of them filled in.
 */
export function parseHonoredContributor(csv) {
    const parsed = Papa.parse(csv ?? '', {
        header: true,
        skipEmptyLines: true,
        transformHeader: clean,
        transform: clean,
    });

    if (parsed.errors.length > 0) {
        return null;
    }

    const columns = parsed.meta.fields ?? [];
    if (REQUIRED_COLUMNS.some((column) => !columns.includes(column))) {
        return null;
    }

    const row = parsed.data.find((entry) =>
        REQUIRED_COLUMNS.every((column) => entry[column])
    );

    return row ?? null;
}

export function formatMonth(month) {
    const date = new Date(`${month}-01T00:00:00Z`);

    if (Number.isNaN(date.valueOf())) {
        return null;
    }

    return new Intl.DateTimeFormat('en', {
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(date);
}
