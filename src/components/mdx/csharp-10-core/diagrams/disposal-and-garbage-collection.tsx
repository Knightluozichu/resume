"use client";

import { CtcOfficialLab } from "./official-lab";

const ownershipCases = [
  { label: "using", fields: [["owner", "Lexical scope"], ["guarantee", "Dispose runs on normal and exceptional exit"]] },
  { label: "await using", fields: [["owner", "Async lexical scope"], ["guarantee", "DisposeAsync can await resource shutdown"]] },
  { label: "owner type", fields: [["owner", "Containing object"], ["guarantee", "Idempotent cascade to owned resources"]] },
  { label: "SafeHandle", fields: [["owner", "Runtime critical-handle wrapper"], ["guarantee", "Final fallback for native handle release"]] },
] as const;

const gcCases = [
  { label: "reachable", fields: [["root", "Stack, static, handle, finalizer queue"], ["result", "Object survives and may promote"]] },
  { label: "gen 0", fields: [["root", "No reachable path"], ["result", "Short-lived object reclaimed cheaply"]] },
  { label: "finalizable", fields: [["root", "Finalization queue transition"], ["result", "Collection delayed until later cycle"]] },
  { label: "large object", fields: [["root", "LOH allocation pressure"], ["result", "Measure fragmentation and full-GC cost"]] },
] as const;

const retentionCases = [
  { label: "event", fields: [["retainer", "Long-lived publisher delegate"], ["repair", "Unsubscribe or scoped weak pattern"]] },
  { label: "timer", fields: [["retainer", "Callback captures service graph"], ["repair", "Dispose timer and cancel callback"]] },
  { label: "cache", fields: [["retainer", "Unbounded key/value policy"], ["repair", "Size, expiry, eviction, ownership"]] },
  { label: "ArrayPool", fields: [["retainer", "Rented buffer not returned"], ["repair", "try/finally, clear sensitive data"]] },
] as const;

export function CtcDisposalOwnershipLab() { return <CtcOfficialLab cases={ownershipCases} caption="Deterministic cleanup starts with an explicit resource owner and an idempotent release path." tone="cyan" />; }
export function CtcGcReachabilityLab() { return <CtcOfficialLab cases={gcCases} caption="Garbage collection follows reachability, generations, finalization, and allocation pressure rather than lexical scope." tone="violet" />; }
export function CtcRetentionAndPoolingLab() { return <CtcOfficialLab cases={retentionCases} caption="Managed leaks are unintended retention paths; pooling changes ownership and security obligations." tone="amber" />; }
