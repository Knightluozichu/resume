"use client";

import { RubyOfficialLab } from "./official-lab";

const loopCases = [
  { label: "times", fields: [["Driver", "Integer receiver"], ["Yield", "Indices from 0 to n-1"], ["Best for", "Known repeat count"]] },
  { label: "each", fields: [["Driver", "Enumerable/collection"], ["Yield", "Each element"], ["Best for", "Data-driven traversal"]] },
  { label: "while", fields: [["Driver", "Pre-checked condition"], ["State", "Body must move toward termination"], ["Best for", "State-machine progress"]] },
  { label: "until", fields: [["Driver", "Runs while condition is falsey"], ["State", "Positive terminal condition"], ["Best for", "Wait until a simple event"]] },
] as const;

const forCases = [
  { label: "for", fields: [["Code", "for item in items"], ["Dispatch", "Calls items.each internally"], ["Scope", "Loop variable remains in surrounding scope"]] },
  { label: "each block", fields: [["Code", "items.each do |item|"], ["Dispatch", "Calls each directly"], ["Scope", "Block parameter is block-local"]] },
  { label: "loop", fields: [["Code", "loop do ... break end"], ["Driver", "Intentional unbounded repetition"], ["Stop", "Explicit break or exception"]] },
  { label: "Enumerator", fields: [["Code", "items.each without a block"], ["Result", "Enumerator object"], ["Use", "Compose lazy or external iteration"]] },
] as const;

const controlCases = [
  { label: "break", fields: [["Effect", "Exit the nearest loop"], ["Value", "Can provide the loop expression result"], ["Use", "Terminal event found"]] },
  { label: "next", fields: [["Effect", "Skip to the next iteration"], ["Value", "Can provide a block result"], ["Use", "Reject one item early"]] },
  { label: "redo", fields: [["Effect", "Repeat current iteration without rechecking/yielding"], ["Risk", "Easy infinite retry"], ["Use", "Rare, tightly bounded recovery"]] },
  { label: "return", fields: [["Effect", "Leave the enclosing method"], ["Scope", "Stronger than leaving a loop"], ["Use", "Method result is already decided"]], alert: "Choose control by the boundary you intend to leave: iteration, loop, or method." },
] as const;

export function RubyLoopChoiceLab() {
  return <RubyOfficialLab cases={loopCases} caption="Choose a loop from the source of repetition: count, collection, ongoing condition, or terminal event." tone="cyan" />;
}

export function RubyForEachScopeLab() {
  return <RubyOfficialLab cases={forCases} caption="for delegates to each but differs in variable scope; loop and Enumerator make unbounded and deferred traversal explicit." tone="violet" />;
}

export function RubyLoopControlLab() {
  return <RubyOfficialLab cases={controlCases} caption="break, next, redo, and return leave different control boundaries and therefore carry different risks." tone="amber" />;
}
