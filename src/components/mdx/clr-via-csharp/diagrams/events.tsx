"use client";

import { CvcOfficialLab } from "./official-lab";

const exposureCases = [
  { label: "EventArgs", fields: [["Owner", "Publisher defines notification data"], ["Contract", "Immutable snapshot or explicit mutable negotiation"], ["Versioning", "Additive data and serialization policy"]] },
  { label: "Event member", fields: [["Owner", "Publisher controls add/remove"], ["Contract", "Delegate type and subscription lifetime"], ["Versioning", "Handler signature and accessibility"]] },
  { label: "OnEvent", fields: [["Owner", "Publisher/derived hook raises"], ["Contract", "Ordering, exceptions, synchronization"], ["Versioning", "Protected virtual hook cost"]] },
  { label: "Translation", fields: [["Owner", "Input method/state transition"], ["Contract", "Exactly when event represents a committed fact"], ["Versioning", "Duplicate/coalesced notification semantics"]] },
] as const;

const invocationCases = [
  { label: "Subscribe", fields: [["State", "Add delegate to invocation list"], ["Race", "Concurrent add/remove requires accessor semantics"], ["Lifetime", "Publisher roots subscriber through delegate target"]] },
  { label: "Snapshot", fields: [["State", "Copy current multicast delegate"], ["Race", "Handler set may change after snapshot"], ["Lifetime", "Snapshot remains callable for this raise"]] },
  { label: "Invoke", fields: [["State", "Call handlers in list order"], ["Race", "Handlers may reenter publisher"], ["Lifetime", "One exception normally stops later handlers"]] },
  { label: "Unsubscribe", fields: [["State", "Remove matching delegate"], ["Race", "Does not cancel in-flight snapshot"], ["Lifetime", "Required to release long-lived publisher root"]], alert: "Null-conditional invocation avoids one race shape, but it does not define handler exception, reentrancy, or shutdown policy." },
] as const;

const listenerCases = [
  { label: "Short-lived", fields: [["Relation", "Subscriber dies before publisher"], ["Risk", "Publisher keeps subscriber alive"], ["Control", "IDisposable subscription scope"]] },
  { label: "UI thread", fields: [["Relation", "Handler requires dispatcher/context"], ["Risk", "Raise from worker thread"], ["Control", "Marshal explicitly at boundary"]] },
  { label: "Async work", fields: [["Relation", "Event delegate is usually void"], ["Risk", "async void failure and uncontrolled concurrency"], ["Control", "Queue/message or explicit Task-returning abstraction"]] },
  { label: "Explicit event", fields: [["Relation", "Custom add/remove storage"], ["Risk", "Locking, duplicate and identity behavior"], ["Control", "Document accessor and disposal semantics"]] },
] as const;

export function CvcEventExposureLab() { return <CvcOfficialLab cases={exposureCases} caption="EventArgs, event member, raiser, and translating state change form one publisher contract." tone="cyan" />; }
export function CvcEventInvocationLab() { return <CvcOfficialLab cases={invocationCases} caption="Subscription, snapshot, invocation, and removal expose independent race, exception, and lifetime decisions." tone="amber" />; }
export function CvcEventListenerLab() { return <CvcOfficialLab cases={listenerCases} caption="Subscriber lifetime, thread affinity, asynchronous work, and explicit storage require deliberate ownership." tone="violet" />; }
