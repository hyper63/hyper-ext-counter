import * as R from "ramda";

const { assoc, __, dec, inc, prop, mergeDeepRight, always } = R;

interface Count {
  count: number;
}

interface Result {
  ok: boolean;
}

interface Cache {
  cache: {
    get: (key: string) => Promise<Count>;
    set: (key: string, v: Count) => Promise<Result>;
  };
}

export interface HyperExtCounter {
  ext: {
    counter: {
      reset: (key: string) => Promise<number>;
      get: (key: string) => Promise<number>;
      inc: (key: string) => Promise<number>;
      dec: (key: string) => Promise<number>;
    };
  };
}

const set = (hyper: Cache, key: string) =>
  (count: number) =>
    hyper.cache.set(key, assoc("count", count, {})).then(() => count);

const exists = (result) => result?.ok === false ? ({ count: 0 }) : result;

export const counter = <H extends Cache>(hyper: H): H & HyperExtCounter =>
  mergeDeepRight(hyper, {
    ext: {
      counter: {
        get: (key: string) =>
          hyper.cache
            .get(key)
            .then(exists)
            .then(prop("count"))
            .catch(always(0)),
        inc: (key: string) =>
          hyper.cache
            .get(key)
            .then(exists)
            .then(prop("count"))
            .catch(always(0))
            .then(inc)
            .then(set(hyper, key))
            .catch(always(0)),
        dec: (key: string) =>
          hyper.cache
            .get(key)
            .then(exists)
            .then(prop("count"))
            .catch(always(0))
            .then(dec)
            .then(set(hyper, key))
            .catch(always(0)),
        reset: (key: string) =>
          hyper.cache
            .set(key, { count: 0 })
            .then(always(0))
            .catch(always(0)),
      },
    },
  });
