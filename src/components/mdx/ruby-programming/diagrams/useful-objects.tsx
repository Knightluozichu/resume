"use client";

import { RubyOfficialLab } from "./official-lab";

const arrayCases = [
  { label: "Create", fields: [["Expression", "items = [\"red\", \"green\"]"], ["Shape", "Ordered, zero-based, mutable"], ["Result", "One Array containing two references"]] },
  { label: "Read", fields: [["Expression", "items[0]"], ["Result", "\"red\""], ["Missing", "items[99] returns nil"]] },
  { label: "Store", fields: [["Expression", "items[1] = \"blue\""], ["Mutation", "Replaces the element at index 1"], ["Result", "[\"red\", \"blue\"]"]] },
  { label: "Iterate", fields: [["Expression", "items.each { |item| ... }"], ["Order", "Current array order"], ["Rule", "Avoid structural mutation during traversal"]] },
] as const;

const hashCases = [
  { label: "Symbol", fields: [["Literal", ":status"], ["Role", "Stable name-like value"], ["Use", "Common Hash key and API label"]] },
  { label: "Hash", fields: [["Literal", "{ status: \"ready\" }"], ["Lookup", "record[:status]"], ["Missing", "nil unless a default is configured"]] },
  { label: "Key type", fields: [["Symbol key", ":status"], ["String key", "\"status\""], ["Identity", "They are different keys"]], alert: "Hash lookups do not automatically convert String keys to Symbols." },
  { label: "each", fields: [["Block", "|key, value|"], ["Output", "One key-value pair per iteration"], ["Contract", "Do not rely on order as a sorting rule"]] },
] as const;

const regexpCases = [
  { label: "Match", fields: [["Pattern", "/ruby/i"], ["Input", "\"I like Ruby\""], ["Result", "A MatchData object"]] },
  { label: "No match", fields: [["Pattern", "/python/"], ["Input", "\"Ruby\""], ["Result", "nil"]] },
  { label: "Capture", fields: [["Pattern", "/(\\w+)@(\\w+)/"], ["Groups", "Local part and host fragment"], ["Rule", "Validate the full grammar, not one substring"]] },
  { label: "Scan", fields: [["Pattern", "/\\d+/"], ["Input", "\"A12 B7\""], ["Result", "[\"12\", \"7\"]"]], alert: "A successful substring match is not proof that the whole input is valid." },
] as const;

export function RubyArrayShapeLab() {
  return <RubyOfficialLab cases={arrayCases} caption="Array creation, indexed access, mutation, and traversal expose one ordered mutable collection contract." tone="cyan" />;
}

export function RubyHashSymbolLab() {
  return <RubyOfficialLab cases={hashCases} caption="Symbols are name-like values; Hash keeps Symbol and String keys distinct and iterates key-value pairs." tone="violet" />;
}

export function RubyRegexpMatchLab() {
  return <RubyOfficialLab cases={regexpCases} caption="Regexp matching yields MatchData or nil; anchors and captures determine what the success actually proves." tone="amber" />;
}
