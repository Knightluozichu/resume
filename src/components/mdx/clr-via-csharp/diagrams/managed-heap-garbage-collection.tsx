"use client";

import { CvcOfficialLab } from "./official-lab";

const gcCases = [
  { label: "Allocate", fields: [["Action", "Bump allocation pointer in managed segment"], ["Evidence", "Allocation type/size/rate"], ["Risk", "Hidden boxing, closure, arrays, strings"]] },
  { label: "Mark", fields: [["Action", "Trace references from roots"], ["Evidence", "GC roots and object graph"], ["Risk", "Static/event/cache retention"]] },
  { label: "Sweep/compact", fields: [["Action", "Reclaim dead space and possibly move survivors"], ["Evidence", "Pause, promoted bytes, fragmentation"], ["Risk", "Pinned objects and large-object behavior"]] },
  { label: "Promote", fields: [["Action", "Survivors move to older generation"], ["Evidence", "Survival by generation"], ["Risk", "Temporary objects rooted too long"]] },
] as const;

const resourceCases = [
  { label: "IDisposable", fields: [["Owner", "Deterministic caller/lifetime scope"], ["Cleanup", "Release native/managed owned resources"], ["Timing", "using/finally/DisposeAsync"]] },
  { label: "SafeHandle", fields: [["Owner", "Runtime-backed critical native handle wrapper"], ["Cleanup", "Reliable release path"], ["Timing", "Dispose plus finalization safety net"]] },
  { label: "Finalizer", fields: [["Owner", "GC finalization queue"], ["Cleanup", "Only direct unmanaged resource safety net"], ["Timing", "Nondeterministic, possibly never before exit"]] },
  { label: "Resurrection", fields: [["Owner", "Finalizer republishes object"], ["Cleanup", "Extremely complex"], ["Timing", "Requires re-registration for another finalization"]], alert: "A finalizer is not a delayed Dispose and should not touch arbitrary managed collaborators." },
] as const;

const lifetimeCases = [
  { label: "WeakReference", fields: [["Control", "Observe object without strong rooting"], ["Use", "Optional cache/association"], ["Risk", "Target may disappear between checks"]] },
  { label: "ConditionalWeakTable", fields: [["Control", "Value lifetime follows weak key"], ["Use", "Attach metadata without extending key lifetime"], ["Risk", "Not general enumerable cache"]] },
  { label: "GCHandle", fields: [["Control", "Strong, weak, or pinned handle"], ["Use", "Interop callback/address"], ["Risk", "Must Free; pin fragmentation"]] },
  { label: "Memory pressure", fields: [["Control", "Inform GC of significant unmanaged allocation"], ["Use", "Native memory wrappers"], ["Risk", "Incorrect reporting distorts GC frequency"]] },
] as const;

export function CvcGcAlgorithmLab() { return <CvcOfficialLab cases={gcCases} caption="Allocation, tracing, reclamation, compaction, and promotion are driven by reachability and measured pressure." tone="cyan" />; }
export function CvcResourceCleanupLab() { return <CvcOfficialLab cases={resourceCases} caption="Dispose, SafeHandle, finalization, and resurrection carry very different timing and reliability guarantees." tone="amber" />; }
export function CvcLifetimeControlLab() { return <CvcOfficialLab cases={lifetimeCases} caption="Weak references, weak tables, handles, and unmanaged pressure are specialized lifetime controls." tone="violet" />; }
