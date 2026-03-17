/**
 * Compresse les images du quiz (PNG → JPEG 85%, JPEG → JPEG 80%)
 * Usage : node scripts/compress-images.mjs
 * Pré-requis : npm install -g sharp-cli  OU  npm install sharp dans le dossier scripts
 */
import sharp from 'sharp'
import { readdirSync, statSync } from 'fs'
import { join, extname, basename } from 'path'

const INPUT_DIR = new URL('../app/public/assets/quiz', import.meta.url).pathname
  .replace(/^\/([A-Z]:)/, '$1') // fix Windows path

const files = readdirSync(INPUT_DIR).filter(f => /\.(png|jpg|jpeg)$/i.test(f))

let totalBefore = 0
let totalAfter = 0

for (const file of files) {
  const filepath = join(INPUT_DIR, file)
  const ext = extname(file).toLowerCase()
  const sizeBefore = statSync(filepath).size

  // Réduire à max 1400px de large (suffisant pour affichage quiz)
  // et convertir en JPEG de qualité 82
  const outName = basename(file, ext) + '.jpg'
  const outPath = join(INPUT_DIR, outName)

  await sharp(filepath)
    .resize({ width: 1400, withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true })
    .toFile(outPath === filepath ? filepath + '.tmp' : outPath)

  // Si le fichier source était PNG, le résultat est en .jpg → on peut garder les deux
  // ou supprimer le PNG original (décommente la ligne ci-dessous)
  // if (ext === '.png') unlinkSync(filepath)

  const sizeAfter = statSync(outPath === filepath ? filepath + '.tmp' : outPath).size
  totalBefore += sizeBefore
  totalAfter += sizeAfter

  console.log(`${file.padEnd(25)} ${(sizeBefore/1024).toFixed(0).padStart(6)} Ko → ${(sizeAfter/1024).toFixed(0).padStart(6)} Ko`)
}

console.log(`\nTotal : ${(totalBefore/1024/1024).toFixed(1)} Mo → ${(totalAfter/1024/1024).toFixed(1)} Mo`)
console.log('\n⚠  Pense à mettre à jour quiz.json si des .png sont devenus .jpg')
