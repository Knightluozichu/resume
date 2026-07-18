"use client";

import { LuaOfficialLab } from "./official-lab";

const trainingCases = [
  { label: "Prefix", fields: [["State", "The previous N tokens"], ["Action", "Encode without collisions"], ["Invariant", "One canonical key per token tuple"]] },
  { label: "Suffix list", fields: [["State", "All observed next tokens for a prefix"], ["Action", "Append every occurrence, including duplicates"], ["Invariant", "Multiplicity preserves empirical probability"]] },
  { label: "Shift", fields: [["State", "Drop oldest token, append current token"], ["Action", "Create the next prefix"], ["Invariant", "Window size remains N"]] },
  { label: "Sentinel", fields: [["State", "NOWORD pads start and marks end"], ["Action", "Insert terminal transition after the final token"], ["Invariant", "Sentinel cannot collide with a real token"]], alert: "Deduplicating each suffix list changes a frequency model into a uniform-choice model and produces different text." },
] as const;

const generationCases = [
  { label: "Lookup", fields: [["Input", "Current prefix"], ["Action", "Fetch its observed suffix list"], ["Failure", "Missing prefix means corrupt/incompatible model"]] },
  { label: "Sample", fields: [["Input", "Suffix-list length"], ["Action", "Choose one occurrence with the RNG"], ["Failure", "Empty list and invalid RNG range are rejected"]] },
  { label: "Emit/shift", fields: [["Input", "Sampled real token"], ["Action", "Write token and shift prefix"], ["Failure", "Output size and step budget remain bounded"]] },
  { label: "Stop", fields: [["Input", "Sampled NOWORD or max steps"], ["Action", "Finish with a reason"], ["Failure", "Never rely on training data alone for termination"]], alert: "A fixed seed is useful only with a recorded Lua/runtime and call sequence; random algorithms can change across versions." },
] as const;

const programCases = [
  { label: "Input", fields: [["Contract", "Streaming bytes and a versioned tokenizer"], ["Budget", "Bytes, tokens, token length"], ["Evidence", "Training corpus fingerprint"]] },
  { label: "Model", fields: [["Contract", "Order N, prefix codec, suffix multiplicity"], ["Budget", "Unique prefixes and transitions"], ["Evidence", "Counts and terminal transitions"]] },
  { label: "RNG", fields: [["Contract", "Injected sampler or recorded seed"], ["Budget", "One bounded choice per generated token"], ["Evidence", "Seed/runtime/call count"]] },
  { label: "Output", fields: [["Contract", "Max tokens, escaping, termination reason"], ["Budget", "Bytes and steps"], ["Evidence", "Generated tokens plus model version"]], alert: "Generated text is derived from the training corpus. Privacy, licensing, and unsafe-content policy remain application responsibilities." },
] as const;

export function PilMarkovTrainingLab() {
  return <LuaOfficialLab cases={trainingCases} caption="Training maps each canonical N-token prefix to a multiplicity-preserving list of observed suffixes." tone="cyan" />;
}

export function PilMarkovGenerationLab() {
  return <LuaOfficialLab cases={generationCases} caption="Generation repeatedly looks up, samples, emits, shifts, and stops on sentinel or a hard budget." tone="violet" />;
}

export function PilMarkovProgramLab() {
  return <LuaOfficialLab cases={programCases} caption="A complete Markov program versions input, model, RNG, and output contracts with evidence and resource limits." tone="amber" />;
}
