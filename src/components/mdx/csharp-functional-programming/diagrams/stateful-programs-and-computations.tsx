"use client";

import { CfpOfficialLab } from "./official-lab";

const stateCases = [
  { label: "hidden", fields: [["signature", "A -> B"], ["actual input", "Clock, cache, and mutable field"]], alert: "The signature hides ordering and interference." },
  { label: "explicit", fields: [["signature", "(S, A) -> (S, B)"], ["actual input", "State is passed and returned"]] },
  { label: "command", fields: [["signature", "S -> Either<E, S>"], ["actual input", "Validation and transition are pure"]] },
  { label: "shell", fields: [["signature", "Load -> decide -> save"], ["actual input", "I/O and concurrency stay at boundary"]] },
] as const;

const randomCases = [
  { label: "seed", fields: [["state", "Known PRNG seed"], ["result", "Reproducible sequence"]] },
  { label: "next", fields: [["state", "Current RNG state"], ["result", "Value plus next RNG state"]] },
  { label: "compose", fields: [["state", "Threaded automatically"], ["result", "Tuple, list, or domain sample"]] },
  { label: "shrink", fields: [["state", "Recorded seed and smaller inputs"], ["result", "Minimal reproducible failure"]] },
] as const;

const stateMonadCases = [
  { label: "map", fields: [["operation", "Transform result A to B"], ["state", "Pass state through unchanged"]] },
  { label: "bind", fields: [["operation", "Choose next computation from A"], ["state", "Feed first output state into second"]] },
  { label: "get/put", fields: [["operation", "Read or replace state"], ["state", "State access becomes explicit program data"]] },
  { label: "run", fields: [["operation", "Supply initial state once"], ["state", "Observe final value and state"]] },
] as const;

export function CfpExplicitStateLab() { return <CfpOfficialLab cases={stateCases} caption="Explicit state transitions reveal the dependency that hidden mutable fields conceal." tone="violet" />; }
export function CfpRandomStateLab() { return <CfpOfficialLab cases={randomCases} caption="A random generator is a deterministic state transition once its seed is explicit." tone="amber" />; }
export function CfpStateComputationLab() { return <CfpOfficialLab cases={stateMonadCases} caption="State computations compose result dependencies while threading state in exactly one direction." tone="cyan" />; }
