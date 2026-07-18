"use client";

import { LuaOfficialLab } from "./official-lab";

const reviewCases = [
  { label: "Basics", fields: [["Recall", "Values, tables, functions, I/O, scope, and control"], ["Derive", "Representation and truth/sequence invariants"], ["Demonstrate", "Eight Queens with 92 solutions for N=8"]] },
  { label: "Real programs", fields: [["Recall", "Closures, patterns, structures, serialization, modules, iterators"], ["Derive", "State, grammar, graph, and module protocols"], ["Demonstrate", "Frequency and Markov pipelines with deterministic tests"]] },
  { label: "Lua-isms", fields: [["Recall", "Metamethods, OOP, environments, GC, coroutines, reflection"], ["Derive", "Dispatch, reachability, and scheduling ownership"], ["Demonstrate", "A bounded event scheduler and sandbox capability map"]] },
  { label: "C API", fields: [["Recall", "Stacks, C functions, userdata, resources, states"], ["Derive", "Top deltas, continuation, and cleanup contracts"], ["Demonstrate", "A module that passes fault-injected lifecycle tests"]], alert: "Review by reconstructing contracts and evidence, not by re-reading summaries. Each part has a concrete proof of mastery." },
] as const;

const failureCases = [
  { label: "Representation", fields: [["Symptom", "Length, alias, encoding, or numeric meaning is wrong"], ["Trace", "Value type, identity, keys, bytes, and conversion"], ["Fix", "State a representation invariant and test boundaries"]] },
  { label: "Control", fields: [["Symptom", "Wrong return, resume, error, or tail behavior"], ["Trace", "Frames, owner, yielded/results, and protected status"], ["Fix", "Draw the control transfer and result protocol"]] },
  { label: "Lifetime", fields: [["Symptom", "Leak, stale pointer, premature GC, or double close"], ["Trace", "Reachability roots, resource owner, and terminal paths"], ["Fix", "Use explicit state transitions and idempotent cleanup"]] },
  { label: "Isolation", fields: [["Symptom", "Unexpected authority, race, or cross-state corruption"], ["Trace", "Environment, registry, state, OS owner, and messages"], ["Fix", "Minimize capabilities and serialize/copy at boundaries"]], alert: "Most hard Lua bugs fit one of four models: representation, control, lifetime, or isolation. Classify before changing code." },
] as const;

const capstoneCases = [
  { label: "Config", fields: [["Lua side", "Tables, environments, modules, validation"], ["C side", "Balanced lookup and checked conversion"], ["Gate", "No partial commit or ambient host capability"]] },
  { label: "Pipeline", fields: [["Lua side", "Patterns, iterators, closures, serialization"], ["C side", "Optional bounded native acceleration"], ["Gate", "Streaming, backpressure, and deterministic output"]] },
  { label: "Scheduler", fields: [["Lua side", "Coroutines and typed wait requests"], ["C side", "Non-blocking poller and continuation owner"], ["Gate", "Fairness, timeout, cancellation, and traceback"]] },
  { label: "Extension", fields: [["Lua side", "Metatable/userdata API and module contract"], ["C side", "Stack, registry, resource, and state isolation"], ["Gate", "ABI matrix plus every-edge failure injection"]], alert: "The final capstone should cross Lua and C only through explicit data, call, ownership, and failure contracts." },
] as const;

export function PilFinalPartReviewLab() {
  return <LuaOfficialLab cases={reviewCases} caption="Each book part is reviewed through recall, derivation, and a concrete demonstration." tone="cyan" />;
}

export function PilFailureModelLab() {
  return <LuaOfficialLab cases={failureCases} caption="Representation, control, lifetime, and isolation classify the book's hardest failure modes." tone="rose" />;
}

export function PilCapstoneGateLab() {
  return <LuaOfficialLab cases={capstoneCases} caption="Config, pipeline, scheduler, and native extension capstones integrate Lua and C contracts." tone="emerald" />;
}

export const LupFinalReviewDiagram = PilFinalPartReviewLab;
