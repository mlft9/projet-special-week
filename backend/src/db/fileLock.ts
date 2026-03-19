import { Mutex } from 'async-mutex'

// Un mutex par fichier pour éviter les race conditions read→modify→write
const locks = new Map<string, Mutex>()

export function getLock(key: string): Mutex {
  if (!locks.has(key)) locks.set(key, new Mutex())
  return locks.get(key)!
}
