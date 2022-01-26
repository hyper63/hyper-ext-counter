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
