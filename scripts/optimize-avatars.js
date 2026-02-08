const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const avatarDir = path.join(__dirname, '../static/avatar');
const outputDir = path.join(__dirname, '../static/generated/avatar');

async function optimizeAvatars() {
    if (!fs.existsSync(avatarDir)) {
        console.warn(`Avatar directory not found at: ${avatarDir}`);
        return;
    }

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
        console.log(`Created output directory: ${outputDir}`);
    }

    const files = fs.readdirSync(avatarDir);
    const imageFiles = files.filter((file) => /\.(jpg|jpeg|png)$/i.test(file));

    for (const file of imageFiles) {
        const filePath = path.join(avatarDir, file);
        const fileNameNoExt = path.parse(file).name;

        try {
            const webpPath = path.join(outputDir, `${fileNameNoExt}.webp`);

            // Skip if optimized image exists and is newer than source
            if (fs.existsSync(webpPath)) {
                const sourceStats = fs.statSync(filePath);
                const outputStats = fs.statSync(webpPath);
                if (outputStats.mtime > sourceStats.mtime) {
                    continue;
                }
            }

            const image = sharp(filePath);

            // Standardize size to 400x400 (square)
            const resizedImage = image.resize({
                width: 400,
                height: 400,
                fit: 'cover',
                position: 'center',
            });

            await resizedImage.webp({ quality: 80 }).toFile(webpPath);
        } catch (error) {
            console.error(`Error processing ${file}:`, error.message);
        }
    }

    console.log('Image optimization complete!');
}

optimizeAvatars().catch((err) => {
    console.error('Error during optimization:', err);
    process.exit(1);
});
