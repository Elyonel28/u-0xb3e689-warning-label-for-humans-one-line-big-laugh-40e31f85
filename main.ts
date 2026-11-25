// Warning Label for Humans: One Line, Big Laugh
// make.fun bounty u-0xb3e689-warning-label-for-humans-one-line-big-laugh-40e31f85
//
// Writes exactly one single-line safety warning label for human beings to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set locally).
// Gate: UTF-8 text, 1 to 160 characters, not only white space.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The label. One idea, one sentence, label voice all the way through:
// the joke is the rule of three (read / ignored / blame) and the turn
// lands in the last few words, exactly where a warning label's sting sits.
// It is funny because it is true about people in general: everyone has
// watched a human do this, and most of us have done it ourselves.
const LABEL =
  "WARNING: This human has read the instructions, ignored the instructions, and will now blame the instructions.";

const MAX_CHARS = 160;

function main(): void {
  const label = LABEL;
  // Count code points, not UTF-16 units: the gate counts characters.
  const charCount = [...label].length;

  if (charCount === 0 || charCount > MAX_CHARS) {
    throw new Error(
      `label must be 1-${MAX_CHARS} characters, got ${charCount}`,
    );
  }
  if (label.trim().length === 0) {
    throw new Error("label must not be only white space");
  }
  if (label.includes("\n") || label.includes("\r")) {
    throw new Error("label must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  // No trailing newline: the file is the label, byte for byte.
  writeFileSync(outPath, label, "utf8");
  console.log(`wrote ${outPath} (${charCount} chars)`);
  console.log(label);
}

main();
