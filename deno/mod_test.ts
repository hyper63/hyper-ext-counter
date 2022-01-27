import { assertEquals } from "https://deno.land/std@0.122.0/testing/asserts.ts";
import { counter } from "./mod.ts";

const test = Deno.test;

const _hyper = {
  cache: {
    get: () => Promise.resolve({ count: 1 }),
    set: () => Promise.resolve({ ok: true }),
  },
};

test("reset counter", async () => {
  const hyper = counter(_hyper);
  const result = await hyper.ext.counter.reset("count");
  assertEquals(result, 0);
});

test("inc counter", async () => {
  const hyper = counter(_hyper);
  const result = await hyper.ext.counter.inc("count");
  assertEquals(result, 2);
});

test("dec counter", async () => {
  const hyper = counter(_hyper);
  const result = await hyper.ext.counter.dec("count");
  assertEquals(result, 0);
});

test("get counter", async () => {
  const hyper = counter(_hyper);
  const result = await hyper.ext.counter.get("count");
  assertEquals(result, 1);
});

test("counter inc with no get", async () => {
  const _hyper = {
    cache: {
      get: () => Promise.resolve({ ok: false, status: 409 }),
      set: () => Promise.resolve({ ok: true }),
    },
  };
  // @ts-ignore: the Hyper type can return either a Count Object or Result Object, but when this is specified on type it errors every thing else!
  const hyper = counter(_hyper);
  const result = await hyper.ext.counter.inc("foo");
  assertEquals(result, 1);
});

test("counter dec with no get", async () => {
  const _hyper = {
    cache: {
      get: () => Promise.resolve({ ok: false, status: 409 }),
      set: () => Promise.resolve({ ok: true }),
    },
  };
  // @ts-ignore: the Hyper type can return either a Count Object or Result Object, but when this is specified on type it errors every thing else!
  const hyper = counter(_hyper);
  const result = await hyper.ext.counter.dec("foo");
  assertEquals(result, -1);
});
