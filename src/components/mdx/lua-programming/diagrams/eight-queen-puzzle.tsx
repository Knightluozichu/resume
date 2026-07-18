"use client";

import { LuaOfficialLab } from "./official-lab";

const conflictCases = [
  { label: "Same column", fields: [["Prior queen", "board[r] == candidateColumn"], ["Conflict", "Two queens share one file"], ["Reject", "Do not recurse to the next row"]] },
  { label: "Down diagonal", fields: [["Prior queen", "board[r] - r == candidateColumn - row"], ["Conflict", "Equal column-minus-row"], ["Reject", "Diagonal attack"]] },
  { label: "Up diagonal", fields: [["Prior queen", "board[r] + r == candidateColumn + row"], ["Conflict", "Equal column-plus-row"], ["Reject", "Diagonal attack"]] },
  { label: "Safe prefix", fields: [["Prior queen", "No equality for every prior row"], ["Invariant", "Rows 1..row-1 are pairwise non-attacking"], ["Next", "Assign and recurse"]] },
] as const;

const searchCases = [
  { label: "Choose", fields: [["State", "A safe prefix through row-1"], ["Action", "Try one candidate column"], ["Owner", "Current recursive activation"]] },
  { label: "Validate", fields: [["State", "Candidate plus existing prefix"], ["Action", "Check column and both diagonals"], ["Owner", "Pure isPlaceOk predicate"]] },
  { label: "Explore", fields: [["State", "board[row] temporarily assigned"], ["Action", "Search row+1"], ["Owner", "Depth-first recursion"]] },
  { label: "Undo", fields: [["State", "Child returned"], ["Action", "Clear or overwrite board[row]"], ["Owner", "Same activation before next candidate"]], alert: "Every mutation belongs to one recursion level; emitting a solution must copy or consume it synchronously." },
] as const;

const evidenceCases = [
  { label: "N=1", fields: [["Solutions", "1"], ["Purpose", "Base case emits exactly once"], ["Failure caught", "Off-by-one termination"]] },
  { label: "N=2/3", fields: [["Solutions", "0"], ["Purpose", "Conflict law rejects all boards"], ["Failure caught", "Missing diagonal check"]] },
  { label: "N=4", fields: [["Solutions", "2"], ["Purpose", "Small complete trace"], ["Failure caught", "State restoration or duplicate emission"]] },
  { label: "N=8", fields: [["Solutions", "92"], ["Purpose", "Official puzzle acceptance"], ["Failure caught", "Incomplete search or accidental pruning"]] },
] as const;

export function PilQueenConflictLab() {
  return <LuaOfficialLab cases={conflictCases} caption="A candidate is safe only when its column-minus-row and column-plus-row diagonals are unique." tone="rose" />;
}

export function PilQueenSearchLab() {
  return <LuaOfficialLab cases={searchCases} caption="Each recursive level owns one row: choose, validate, explore, then restore before the next choice." tone="violet" />;
}

export function PilQueenEvidenceLab() {
  return <LuaOfficialLab cases={evidenceCases} caption="Known solution counts turn the puzzle into a deterministic regression suite." tone="emerald" />;
}
