"use client";

import { CvcOfficialLab } from "./official-lab";

const delegateCases = [
  { label: "Static target", fields: [["Target", "Usually null"], ["Method", "Static method entry"], ["Lifetime", "No receiver object rooted"]] },
  { label: "Instance target", fields: [["Target", "Receiver object"], ["Method", "Instance method entry"], ["Lifetime", "Delegate roots receiver"]] },
  { label: "Open instance", fields: [["Target", "Receiver supplied as argument"], ["Method", "Instance method entry"], ["Lifetime", "Delegate itself need not root receiver"]] },
  { label: "Closure", fields: [["Target", "Compiler-generated display object"], ["Method", "Lambda body method"], ["Lifetime", "Captured variables live with delegate"]] },
] as const;

const chainCases = [
  { label: "Combine", fields: [["Action", "Create delegate with ordered invocation list"], ["Mutation", "Delegates are immutable; returns new value"], ["Failure", "Compatible delegate type required"]] },
  { label: "Invoke", fields: [["Action", "Call each entry synchronously in order"], ["Mutation", "Targets may mutate/reenter"], ["Failure", "First unhandled exception stops chain"]] },
  { label: "Remove", fields: [["Action", "Remove last matching sub-list"], ["Mutation", "Returns new delegate or null"], ["Failure", "New lambda may not equal original"]] },
  { label: "Inspect", fields: [["Action", "GetInvocationList and invoke individually"], ["Mutation", "Policy is now caller-owned"], ["Failure", "Must define result and exception aggregation"]] },
] as const;

const syntaxCases = [
  { label: "Method group", fields: [["Compiler", "Infers delegate conversion"], ["Capture", "Receiver may be target"], ["Risk", "Overload resolution at compile time"]] },
  { label: "Lambda", fields: [["Compiler", "Generates method/expression conversion"], ["Capture", "None, value variable cell, or this"], ["Risk", "Loop capture and allocation"]] },
  { label: "Generic delegate", fields: [["Compiler", "Func/Action or named generic delegate"], ["Capture", "Same target rules"], ["Risk", "Variance and async-void shape"]] },
  { label: "Reflection", fields: [["Compiler", "Delegate.CreateDelegate binds MethodInfo"], ["Capture", "Open/closed target choice"], ["Risk", "Signature, visibility, trimming/AOT"]], alert: "A lambda captures variables, not frozen values; later mutation is observed unless a separate local is captured." },
] as const;

export function CvcDelegateAnatomyLab() { return <CvcOfficialLab cases={delegateCases} caption="Static, closed instance, open instance, and closure delegates differ in targets and lifetime roots." tone="cyan" />; }
export function CvcDelegateChainLab() { return <CvcOfficialLab cases={chainCases} caption="Combining, invoking, removing, and inspecting immutable delegate chains require explicit failure policy." tone="amber" />; }
export function CvcDelegateSyntaxLab() { return <CvcOfficialLab cases={syntaxCases} caption="Method groups, lambdas, generic delegates, and reflection all produce delegates with distinct binding evidence." tone="violet" />; }
