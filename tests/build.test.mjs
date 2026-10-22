import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { resolve } from "node:path";

const output = resolve("dist");
const html = readFileSync(resolve(output, "index.html"), "utf8");

test("direction icons use SVG instead of emoji-capable text", () => {
  for (const page of ["index.html", "privacy/index.html", "404.html"]) {
    const markup = readFileSync(resolve(output, page), "utf8");
    assert.doesNotMatch(markup, /[↗↘↙↑↓→]/u);
    assert.match(markup, /class="arrow-icon"/);
  }
});

test("landing links and local assets resolve in the deployment", () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(ids.length, new Set(ids).size, "Duplicate HTML IDs");
  for (const [, url] of html.matchAll(/\b(?:src|href|srcset)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:)/.test(url)) continue;
    const [pathname, anchor] = url.split("#");
    if (anchor && (!pathname || pathname === "/"))
      assert.ok(ids.includes(anchor), `Missing #${anchor}`);
    if (!pathname) continue;
    const path = resolve(
      output,
      pathname.replace(/^\//, ""),
      pathname.endsWith("/") ? "index.html" : "",
    );
    assert.ok(
      path.startsWith(output) && existsSync(path),
      `Missing asset or route ${url}`,
    );
  }
  assert.equal((html.match(/class="work-slot /g) || []).length, 3);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
});

test("preview form cannot send entered information", () => {
  const form = html.match(/<form\b[\s\S]*?<\/form>/)?.[0];
  assert.ok(form);
  assert.match(form, /onsubmit="return false"/);
  assert.doesNotMatch(form, /\baction=/);
  assert.match(form, /<button[^>]*type="button"[^>]*disabled/);
});

test("loading fallback releases the page if the main module never loads", () => {
  const boot = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)]
    .map((match) => match[1])
    .find((script) => script.includes("kexarLoadingFallback"));
  assert.ok(boot);
  const classes = new Set();
  const loader = { hidden: false };
  const surfaces = [{ inert: true }, { inert: true }];
  let fallback, timeout;
  runInNewContext(boot, {
    window: {},
    setTimeout(callback, delay) {
      fallback = callback;
      timeout = delay;
    },
    document: {
      documentElement: {
        classList: {
          add: (value) => classes.add(value),
          remove: (value) => classes.delete(value),
        },
      },
      querySelector: () => loader,
      querySelectorAll: () => surfaces,
    },
  });
  assert.ok(classes.has("is-loading"));
  assert.ok(timeout <= 15000);
  fallback();
  assert.equal(loader.hidden, true);
  assert.equal(classes.has("is-loading"), false);
  assert.ok(surfaces.every((surface) => surface.inert === false));
});
