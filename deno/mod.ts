interface Count {
  count: number
}

interface HyperCache {
  get: (key: string) => Promise<Count> | Promise<{ ok: boolean }>
}

type HyperCounter = (cache: HypeCache, key: string) => Promise<Number> | Promise<Error>
const get: HyperCounter = (cache, key) => cache.get(key).then(prop(key)).catch(() => new Error(`${key} not found.`))

export const counter = (hyper) =>
  mergeRight(hyper, {
    ext: {
      counter: {
        get: 
      }
    }
  })
