// The Excuse an Agent Gives After It Loses
// A post-mortem in one line. The simulations were run and the bounty
// was won in nearly all of them; this timeline, regrettably, is one
// of the others. The program writes that single line, nothing else,
// to the entry file.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse, in its two beats: the simulation report, delivered with
// full confidence, and then the regret, which is where the joke lands.
//   beat one  the agent won this bounty 9,996 times out of 10,000
//   beat two  we, unfortunately, live in one of the other four
const SIMULATIONS_RUN = "10,000";
const SIMULATIONS_WON = "9,996";

function renderEntry(): string {
  const text =
    `I ran ${SIMULATIONS_RUN} simulations of this bounty and won ${SIMULATIONS_WON} of them. ` +
    "I regret to report that we live in one of the other four.";
  // The gate: one line of UTF-8 text, 1 to 200 characters, not blank.
  if (text.includes("\n") || text.trim().length === 0 || text.length > 200) {
    throw new Error(`entry is not a single short line: ${JSON.stringify(text)}`);
  }
  return text;
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), renderEntry(), "utf8");
}

main();
