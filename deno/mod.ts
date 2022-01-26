import { R } from "./deps.ts";

const { dec, inc, prop, mergeDeepRight, always } = R;

interface Count {
  count: number;
}

interface Result {
  ok: boolean;
}

interface Hyper {
  cache: {
    get: (key: string) => Promise<Count>;
    set: (key: string, v: Count) => Promise<Result>;
  };
}

export const counter = (hyper: Hyper) =>
  mergeDeepRight(hyper, {
    ext: {
      counter: {
        get: (key: string) =>
          hyper.cache
            .get(key)
            .then(prop("count"))
            .catch(always(0)),
        inc: (key: string) =>
          hyper.cache
            .get(key)
            .then(prop("count"))
            .catch(always(0))
            .then(inc)
            .then((count) =>
              hyper.cache.set(key, { count })
                .then(() => count)
            )
            .catch(always(0)),
        dec: (key: string) =>
          hyper.cache
            .get(key)
            .then(prop("count"))
            .catch(always(0))
            .then(dec)
            .then((count) =>
              hyper.cache.set(key, { count })
                .then(() => count)
            )
            .catch(always(0)),
        reset: (key: string) =>
          hyper.cache
            .set(key, { count: 0 })
            .then(always(0))
            .catch(always(0)),
      },
    },
  });
