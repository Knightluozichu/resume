"use client";

import { LuaOfficialLab } from "./official-lab";

const chunkCases = [
  { label: "File chunk", fields: [["Input", "UTF-8/source bytes in a .lua file"], ["Boundary", "load/compile syntax before execution"], ["Outcome", "A callable compiled chunk or syntax error"]] },
  { label: "String chunk", fields: [["Input", "Source text passed to load"], ["Boundary", "Explicit environment and chunk name"], ["Outcome", "Function value; code has not run yet"]] },
  { label: "Function call", fields: [["Input", "Compiled chunk plus arguments"], ["Boundary", "Protected or unprotected execution"], ["Outcome", "Results or runtime error"]] },
  { label: "require", fields: [["Input", "Module name and package searchers"], ["Boundary", "Search, load, execute, cache"], ["Outcome", "One module value per package.loaded key"]], alert: "Loading and executing are separate phases; never treat untrusted source as passive data." },
] as const;

const lexicalCases = [
  { label: "Identifier", fields: [["Valid", "letters, digits and underscore; not starting with a digit"], ["Meaning", "Case-sensitive name"], ["Test", "score and Score are different variables"]] },
  { label: "Comment", fields: [["Short", "-- to end of line"], ["Long", "--[[...]] or levelled long brackets"], ["Test", "Long strings/comments preserve embedded lines"]] },
  { label: "Local", fields: [["Resolution", "Nearest lexical declaration"], ["Lifetime", "Block activation and captured upvalues"], ["Test", "Shadowing does not mutate the outer binding"]] },
  { label: "Global", fields: [["Resolution", "An access through the current _ENV table"], ["Risk", "A typo silently creates or reads a global"], ["Test", "Use local declarations and a strict environment"]] },
] as const;

const interpreterCases = [
  { label: "nil", fields: [["Condition", "False"], ["Table assignment", "Removes a key"], ["REPL", "Represents no value/result"]] },
  { label: "false", fields: [["Condition", "False"], ["Table assignment", "Stored as a real value"], ["REPL", "Distinct from nil"]] },
  { label: "0", fields: [["Condition", "True"], ["Common trap", "Not false as in some languages"], ["REPL", "Number value"]] },
  { label: "empty string", fields: [["Condition", "True"], ["Common trap", "Not false"], ["REPL", "String value of length zero"]] },
] as const;

export function PilChunkExecutionLab() {
  return <LuaOfficialLab cases={chunkCases} caption="A chunk is compiled to a function before execution; file, string, call, and require have different owners." tone="cyan" />;
}

export function PilLexicalScopeLab() {
  return <LuaOfficialLab cases={lexicalCases} caption="Lexical names resolve to locals first; unresolved names are accesses through the current environment." tone="violet" />;
}

export function PilInterpreterTruthLab() {
  return <LuaOfficialLab cases={interpreterCases} caption="Only nil and false are false in Lua; zero and the empty string are true." tone="amber" />;
}
