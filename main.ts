import { writeFileSync, mkdirSync } from "node:fs";

// One line of horror for make.fun's "One Line, One Chill".
// A phone call, a body on a table, and a heartbeat that should not
// be there: the scare is what the line withholds (whose body, how it
// still beats) and the last word lands the blow.
const LINE =
  "The coroner called to say the body on his table had my name, my scar, and my heartbeat.";

// The gate only accepts UTF-8 text of 1 to 200 characters that is not
// whitespace-only, so verify the line meets the gate before writing it.
const chars = [...LINE].length;
if (chars < 1 || chars > 200 || LINE.trim().length === 0) {
  throw new Error(`line is ${chars} characters, outside the 1-200 gate`);
}

// The brief demands one sentence on one line: a second sentence or a
// line break would hand the judge a paragraph instead of a single
// breath, so count the sentence terminators and refuse anything but
// one period at the very end, and refuse any newline outright.
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}
const terminators = (LINE.match(/[.!?]/g) ?? []).length;
if (terminators !== 1 || !LINE.endsWith(".")) {
  throw new Error(
    `line must be exactly one sentence, found ${terminators} terminators`,
  );
}

// A dash would break the clean one-breath read the judge weighs, so
// refuse any em or en dash in the line.
if (LINE.includes("\u2014") || LINE.includes("\u2013")) {
  throw new Error("line must not contain a dash");
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
