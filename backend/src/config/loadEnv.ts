import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

const cwd = process.cwd()
const dotEnvPath = path.resolve(cwd, '.env')
const legacyEnvPath = path.resolve(cwd, 'env')

// Load .env first, then complete missing keys from legacy env file if present.
dotenv.config({ path: dotEnvPath })
if (fs.existsSync(legacyEnvPath)) {
  dotenv.config({ path: legacyEnvPath, override: false })
}
