const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SIZES = [
  { suffix: '3200w', width: 3200, quality: 90 },
  { suffix: '1600w', width: 1600, quality: 85 },
  { suffix: '800w', width: 800, quality: 82 },
];

const PROJECTS = [
  {
    title: "BelAir",
    images: [
      "BelAir/A7401660.jpg",
      "BelAir/A7401661.jpg",
      "BelAir/A7401662.jpg",
      "BelAir/A7401663.jpg",
      "BelAir/A7401665.jpg",
      "BelAir/A7401666.jpg",
    ],
  },
  {
    title: "Eruption Green EcoBoost",
    images: [
      "Eruption Green EcoBoost/A7401604.jpg",
      "Eruption Green EcoBoost/A7401605.jpg",
      "Eruption Green EcoBoost/A7401606.jpg",
      "Eruption Green EcoBoost/A7401607.jpg",
      "Eruption Green EcoBoost/A7401610.jpg",
      "Eruption Green EcoBoost/A7401614.jpg",
      "Eruption Green EcoBoost/A7401621.jpg",
    ],
  },
  {
    title: "Pontiac GTO",
    images: [
      "Pontiac GTO/A7401645.jpg",
      "Pontiac GTO/A7401647.jpg",
      "Pontiac GTO/A7401648.jpg",
      "Pontiac GTO/A7401649.jpg",
      "Pontiac GTO/A7401650.jpg",
      "Pontiac GTO/A7401651.jpg",
      "Pontiac GTO/A7401652.jpg",
      "Pontiac GTO/A7401653.jpg",
      "Pontiac GTO/A7401655.jpg",
      "Pontiac GTO/A7401656.jpg",
    ],
  },
  {
    title: "Pontiac Le Mans",
    images: [
      "Pontiac Le Mans/A7401622.jpg",
      "Pontiac Le Mans/A7401623.jpg",
      "Pontiac Le Mans/A7401624.jpg",
      "Pontiac Le Mans/A7401625.jpg",
      "Pontiac Le Mans/A7401626.jpg",
      "Pontiac Le Mans/A7401627.jpg",
      "Pontiac Le Mans/A7401628.jpg",
      "Pontiac Le Mans/A7401630.jpg",
      "Pontiac Le Mans/A7401631.jpg",
      "Pontiac Le Mans/A7401632.jpg",
      "Pontiac Le Mans/A7401634.jpg",
      "Pontiac Le Mans/A7401636.jpg",
      "Pontiac Le Mans/A7401637.jpg",
      "Pontiac Le Mans/A7401639.jpg",
      "Pontiac Le Mans/A7401640.jpg",
    ],
  },
  {
    title: "Detroit Institute of Art",
    images: [
      "Detroit Institute of Art/DIA (1 of 13).jpg",
      "Detroit Institute of Art/DIA (2 of 13).jpg",
      "Detroit Institute of Art/DIA (3 of 13).jpg",
      "Detroit Institute of Art/DIA (4 of 13).jpg",
      "Detroit Institute of Art/DIA (5 of 13).jpg",
      "Detroit Institute of Art/DIA (6 of 13).jpg",
      "Detroit Institute of Art/DIA (7 of 13).jpg",
      "Detroit Institute of Art/DIA (8 of 13).jpg",
      "Detroit Institute of Art/DIA (9 of 13).jpg",
      "Detroit Institute of Art/DIA (10 of 13).jpg",
      "Detroit Institute of Art/DIA (11 of 13).jpg",
      "Detroit Institute of Art/DIA (12 of 13).jpg",
      "Detroit Institute of Art/DIA (13 of 13).jpg",
    ],
  },
  {
    title: "Michigan Central Station",
    images: [
      "Michigan Central Station/MCS (1 of 1).jpg",
      "Michigan Central Station/MCS (1 of 8).jpg",
      "Michigan Central Station/MCS (2 of 8).jpg",
      "Michigan Central Station/MCS (3 of 8).jpg",
      "Michigan Central Station/MCS (4 of 8).jpg",
      "Michigan Central Station/MCS (5 of 8).jpg",
      "Michigan Central Station/MCS (6 of 8).jpg",
      "Michigan Central Station/MCS (7 of 8).jpg",
      "Michigan Central Station/MCS (8 of 8).jpg",
    ],
  },
];

async function optimizeImage(src) {
  const inputPath = path.resolve(__dirname, src);
  const dir = path.dirname(src);
  const ext = path.extname(src);
  const name = path.basename(src, ext);

  const outDir = path.resolve(__dirname, 'optimized', dir);
  fs.mkdirSync(outDir, { recursive: true });

  const metadata = await sharp(inputPath).metadata();
  const originalSize = fs.statSync(inputPath).size;

  for (const size of SIZES) {
    const outPath = path.resolve(outDir, `${name}-${size.suffix}.webp`);
    const resizeWidth = Math.min(size.width, metadata.width);

    await sharp(inputPath)
      .resize(resizeWidth, null, { withoutEnlargement: true })
      .webp({ quality: size.quality })
      .toFile(outPath);

    const newSize = fs.statSync(outPath).size;
    const ratio = ((1 - newSize / originalSize) * 100).toFixed(1);
    console.log(`  ${name}-${size.suffix}.webp: ${(newSize / 1024).toFixed(0)}KB (${ratio}% smaller)`);
  }
}

async function main() {
  const allImages = PROJECTS.flatMap(p => p.images);
  console.log(`Optimizing ${allImages.length} images into 3 responsive sizes each...\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const src of allImages) {
    const originalSize = fs.statSync(path.resolve(__dirname, src)).size;
    totalOriginal += originalSize;
    console.log(`${src} (${(originalSize / 1024 / 1024).toFixed(1)}MB)`);
    await optimizeImage(src);

    for (const size of SIZES) {
      const dir = path.dirname(src);
      const ext = path.extname(src);
      const name = path.basename(src, ext);
      const outPath = path.resolve(__dirname, 'optimized', dir, `${name}-${size.suffix}.webp`);
      totalOptimized += fs.statSync(outPath).size;
    }
    console.log('');
  }

  console.log('='.repeat(60));
  console.log(`Original total: ${(totalOriginal / 1024 / 1024).toFixed(1)}MB`);
  console.log(`Optimized total (all sizes): ${(totalOptimized / 1024 / 1024).toFixed(1)}MB`);
  console.log(`Overall reduction: ${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%`);
}

main().catch(console.error);
