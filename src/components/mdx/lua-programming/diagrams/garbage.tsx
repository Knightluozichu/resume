"use client";

import { LuaOfficialLab } from "./official-lab";

const weakCases = [
  { label: "Weak keys", fields: [["Mode", "__mode = \"k\""], ["Reachability", "The table does not keep collectable keys alive"], ["Use", "Object metadata and identity caches"]] },
  { label: "Weak values", fields: [["Mode", "__mode = \"v\""], ["Reachability", "The table does not keep collectable values alive"], ["Use", "Canonical objects that may be recreated"]] },
  { label: "Weak both", fields: [["Mode", "__mode = \"kv\""], ["Reachability", "Neither side alone is a root"], ["Use", "Transient associations with no ownership"]] },
  { label: "Ephemeron", fields: [["Mode", "Weak-key semantics"], ["Reachability", "A value is retained only after its key is proven reachable elsewhere"], ["Use", "Value may refer back to key without leaking it"]], alert: "Weakness changes ownership, not lookup syntax. Entries may disappear after collection, so callers must tolerate misses and recreation." },
] as const;

const finalizerCases = [
  { label: "Register", fields: [["State", "Attach a metatable that already contains __gc"], ["Guarantee", "Object becomes eligible for finalization tracking"], ["Risk", "Adding __gc too late may not register the object"]] },
  { label: "Unreachable", fields: [["State", "No strong path remains"], ["Guarantee", "Collector may schedule the finalizer"], ["Risk", "Timing and order are not application deadlines"]] },
  { label: "Finalize", fields: [["State", "__gc runs under collector constraints"], ["Guarantee", "Best-effort last-chance cleanup/notification"], ["Risk", "Cannot safely rely on yielding, complex allocation, or error propagation"]] },
  { label: "Resurrect", fields: [["State", "Finalizer stores the object in a reachable place"], ["Guarantee", "Identity can become reachable again"], ["Risk", "Finalization is not a repeatable close protocol"]], alert: "Finalizers are nondeterministic fallback. Files, locks, sockets, and transactions require explicit owner-driven close on every normal and error path." },
] as const;

const paceCases = [
  { label: "Pause", fields: [["Control", "collectgarbage(\"setpause\", value)"], ["Tradeoff", "How much memory grows before a new cycle"], ["Evidence", "Peak live/allocated memory and cycle frequency"]] },
  { label: "Step multiplier", fields: [["Control", "collectgarbage(\"setstepmul\", value)"], ["Tradeoff", "Collector work relative to allocation"], ["Evidence", "Frame/request latency and throughput"]] },
  { label: "Manual step", fields: [["Control", "collectgarbage(\"step\", budget)"], ["Tradeoff", "Place bounded work at chosen scheduling points"], ["Evidence", "Step duration and whether a cycle completed"]] },
  { label: "Full collect", fields: [["Control", "collectgarbage(\"collect\")"], ["Tradeoff", "Maximum reclamation opportunity with a latency spike"], ["Evidence", "Before/after memory, pause time, retained roots"]], alert: "Collector tuning cannot reclaim reachable objects. A rising retained heap first requires a reachability/ownership audit, not more aggressive collection." },
] as const;

export function PilWeakReachabilityLab() {
  return <LuaOfficialLab cases={weakCases} caption="Weak keys, weak values, weak pairs, and ephemerons express different non-owning reachability relationships." tone="cyan" />;
}

export function PilFinalizerLifecycleLab() {
  return <LuaOfficialLab cases={finalizerCases} caption="Finalization moves from registration to unreachable scheduling and possible resurrection without deterministic timing." tone="violet" />;
}

export function PilGarbageCollectorPaceLab() {
  return <LuaOfficialLab cases={paceCases} caption="Pause, step multiplier, manual steps, and full collections trade memory growth, throughput, and latency." tone="amber" />;
}
