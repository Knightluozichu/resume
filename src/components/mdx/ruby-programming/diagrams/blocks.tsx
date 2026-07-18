"use client";

import { RubyOfficialLab } from "./official-lab";

const roleCases = [
  { label: "Iteration", fields: [["Method owns", "Traversal order and termination"], ["Block owns", "Per-element operation"], ["Example", "items.each { |item| ... }"]] },
  { label: "Lifecycle", fields: [["Method owns", "Open/close or lock/unlock"], ["Block owns", "Work while resource is valid"], ["Example", "File.open(path) { |file| ... }"]] },
  { label: "Algorithm slot", fields: [["Method owns", "Overall algorithm"], ["Block owns", "Comparison, projection, predicate"], ["Example", "items.sort_by { |item| item.key }"]] },
  { label: "Callback", fields: [["Method owns", "When/how often to notify"], ["Block owns", "Reaction"], ["Example", "on_event { |event| ... }"]] },
] as const;

const yieldCases = [
  { label: "yield", fields: [["Action", "Invoke the current implicit block"], ["Input", "Values become block parameters"], ["Result", "Block's final expression returns to the method"]] },
  { label: "block_given?", fields: [["Action", "Check whether a block exists"], ["Use", "Choose a documented no-block behavior"], ["Risk", "Optional blocks can create two unrelated APIs"]] },
  { label: "&block", fields: [["Action", "Capture the block as a Proc"], ["Use", "Store, forward, inspect, call later"], ["Cost", "Adds object/control semantics; capture only when needed"]] },
  { label: "ensure", fields: [["Action", "Run cleanup after block exits"], ["Covers", "Normal, exception, break/return semantics"], ["Rule", "Do not mask the primary result/error"]] },
] as const;

const scopeCases = [
  { label: "Outer local", fields: [["Before", "total = 0"], ["Inside", "Block can read and rebind total"], ["After", "Updated binding remains visible"]] },
  { label: "Block param", fields: [["Form", "|item|"], ["Scope", "Local to the block"], ["Shadow", "Can hide an outer name; warning/style concern"]] },
  { label: "Block local", fields: [["Form", "|item; scratch|"], ["Scope", "Forced local even if outer scratch exists"], ["Use", "Prevent accidental outer mutation"]] },
  { label: "Control", fields: [["break", "Leaves the yielding iterator"], ["next", "Returns a value for this invocation"], ["return", "Semantics differ for block, Proc, and lambda"]], alert: "A block closes over locals, but def does not; control flow also depends on how the callable was created." },
] as const;

export function RubyBlockRolesLab() {
  return <RubyOfficialLab cases={roleCases} caption="Blocks invert control by letting a method own traversal or lifecycle while the caller supplies a focused policy." tone="cyan" />;
}

export function RubyYieldLifecycleLab() {
  return <RubyOfficialLab cases={yieldCases} caption="yield, block_given?, capture, and ensure define invocation count, values, result, and cleanup." tone="violet" />;
}

export function RubyBlockScopeLab() {
  return <RubyOfficialLab cases={scopeCases} caption="Blocks close over outer locals, introduce parameters and block-locals, and carry context-sensitive control flow." tone="amber" />;
}
