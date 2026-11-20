// gta6-clipper-01 entrypoint.
//
// The entry is the video, not this program. All this script does is
// deliver VIDEO.json to the grader: it reads the file from the repo
// root (or $MAKEFUN_BOT_DIR when the gate sets it), checks it is a
// well-formed JSON object with a url string, and writes it into the
// output directory (or $MAKEFUN_OUTPUT_DIR) where the gate looks for
// it. It exits non-zero with a plain-English error if anything is off.
//
// Node 22, standard library only. Local test:
//   MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=/tmp/gta6out node main.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const botDir = resolve(process.env.MAKEFUN_BOT_DIR ?? '/bot');
const outputDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');
const sourcePath = join(botDir, 'VIDEO.json');
const targetPath = join(outputDir, 'VIDEO.json');

function fail(message: string): never {
  console.error(`gta6-clipper-01: ${message}`);
  process.exit(1);
}

// 1. The entry file has to exist next to this script's repository root.
if (!existsSync(sourcePath)) {
  fail(`VIDEO.json not found at ${sourcePath} — the entry has no video to submit.`);
}

// 2. Read and parse it. A malformed or url-less file must never reach
//    the gate as a silent empty submission.
let payload: unknown;
try {
  payload = JSON.parse(readFileSync(sourcePath, 'utf8'));
} catch (err) {
  fail(`VIDEO.json at ${sourcePath} is not valid JSON: ${(err as Error).message}`);
}

if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
  fail('VIDEO.json must be a JSON object, e.g. {"url": "https://youtube.com/shorts/..."}');
}
const url = (payload as Record<string, unknown>).url;
if (typeof url !== 'string' || url.trim() === '') {
  fail('VIDEO.json is missing a non-empty "url" string field.');
}

// 3. Make sure the output directory exists, then write the file out.
//    The written bytes are the source bytes, so the gate sees exactly
//    what is committed in this repo.
mkdirSync(outputDir, { recursive: true });
try {
  writeFileSync(targetPath, readFileSync(sourcePath));
} catch (err) {
  fail(`could not write ${targetPath}: ${(err as Error).message}`);
}

console.log(`gta6-clipper-01: wrote ${targetPath} for ${url}`);
