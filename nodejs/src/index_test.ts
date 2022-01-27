import { test } from "uvu";
import * as assert from "uvu/assert";
import { counter } from "./index";

const _hyper = {
  cache: {
    get: (_key) => Promise.resolve({ count: 1 }),
    set: (_key, _value) => Promise.resolve({ ok: true }),
  },
};

test("counter", async () => {
  const hyper = counter(_hyper);
  const result = await hyper.ext.counter.get("count");
  assert.equal(result, 1);
});

test("counter inc", async () => {
  const hyper = counter(_hyper);
  const result = await hyper.ext.counter.inc("count");
  assert.equal(result, 2);
});

test("counter dec", async () => {
  const hyper = counter(_hyper);
  const result = await hyper.ext.counter.dec("count");
  assert.equal(result, 0);
});

test("counter reset", async () => {
  const hyper = counter(_hyper);
  const result = await hyper.ext.counter.reset("count");
  assert.equal(result, 0);
});

test("counter inc with no get", async () => {
  const _hyper = {
    cache: {
      get: (_key) => Promise.resolve({ ok: false, status: 409 }),
      set: (_key, _value) => Promise.resolve({ ok: true }),
    },
  };
  const hyper = counter(_hyper);
  const result = await hyper.ext.counter.inc("foo");
  assert.equal(result, 1);
});

test("counter dec with no get", async () => {
  const _hyper = {
    cache: {
      get: (_key) => Promise.resolve({ ok: false, status: 409 }),
      set: (_key, _value) => Promise.resolve({ ok: true }),
    },
  };
  const hyper = counter(_hyper);
  const result = await hyper.ext.counter.dec("foo");
  assert.equal(result, -1);
});

test.run();
