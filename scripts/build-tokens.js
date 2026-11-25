#!/usr/bin/env node
// Compiles every JSON file in /tokens into a single CSS file of custom properties.
// Usage: node scripts/build-tokens.js > dist/tokens.css

const fs = require("fs");
const path = require("path");

const TOKENS_DIR = path.join(__dirname, "..", "tokens");

function flatten(obj, prefix = []) {
  const out = [];
  for (const [key, value] of Object.entries(obj)) {
    const name = [...prefix, key];
    if (value !== null && typeof value === "object") {
      out.push(...flatten(value, name));
    } else {
      out.push([name.join("-"), value]);
    }
  }
  return out;
}

function toCss(vars) {
  const lines = vars.map(([name, value]) => `  --${name}: ${value};`);
  return `:root {\n${lines.join("\n")}\n}\n`;
}

function build() {
  const files = fs.readdirSync(TOKENS_DIR).filter((f) => f.endsWith(".json")).sort();
  const vars = [];
  for (const file of files) {
    const json = JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, file), "utf8"));
    vars.push(...flatten(json));
  }
  return toCss(vars);
}

if (require.main === module) {
  process.stdout.write(build());
}

module.exports = { flatten, toCss, build };
