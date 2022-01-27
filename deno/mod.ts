import { R } from "./deps.ts";

const {
  dec,
  inc,
  prop,
  mergeDeepRight,
  always,
  compose,
  is,
  ifElse,
  identity,
} = R;

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

const exists = (c: Count): Count =>
  ifElse(
    (c: Count): boolean => compose(is(Number), prop("count"))(c),
    (c: Count): Count => identity(c),
    (c: Count): Count => always({ count: 0 } as Count)(c),
  )(c);

const set = (hyper: Hyper, key: string) =>
  (count: number) => hyper.cache.set(key, { count }).then(always(count));

export const counter = (hyper: Hyper) =>
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
