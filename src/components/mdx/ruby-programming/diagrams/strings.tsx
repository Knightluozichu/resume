"use client";

import { RubyOfficialLab } from "./official-lab";

const creationCases = [
  { label: "%Q / %q", fields: [["%Q", "Double-quoted interpolation/escapes"], ["%q", "Single-quoted limited escapes"], ["Use", "Choose alternate delimiters for embedded quotes"]] },
  { label: "Here document", fields: [["Code", "<<TEXT ... TEXT"], ["Use", "Multiline templates/data"], ["Boundary", "Indentation, interpolation, terminator rules"]] },
  { label: "sprintf", fields: [["Code", "format('%04d', value)"], ["Use", "Width, precision, numeric/text formatting"], ["Boundary", "Format string is a protocol"]] },
  { label: "Backticks", fields: [["Code", "`command`"], ["Result", "Captured stdout String"], ["Risk", "Shell injection, status loss, unbounded output"]], alert: "Never interpolate untrusted text into a shell command; prefer argument-vector process APIs." },
] as const;

const operationCases = [
  { label: "Length/index", fields: [["Methods", "length/size/bytesize, [], slice"], ["Unit", "Characters/codepoints vs bytes depends on API/encoding"], ["Boundary", "Missing index returns nil"]] },
  { label: "Connect", fields: [["Methods", "+, <<, concat, interpolation, join"], ["Mutation", "+ new String; << mutates receiver"], ["Cost", "Repeated + can allocate many Strings"]] },
  { label: "Compare", fields: [["Methods", "==, <=>, casecmp"], ["Basis", "Codepoint/encoding and method semantics"], ["Boundary", "Locale collation is a separate problem"]] },
  { label: "Split", fields: [["Methods", "split, lines, each_line"], ["Shape", "Separator, limit, trailing empty fields"], ["Boundary", "Use CSV/parser for structured formats"]] },
] as const;

const transformCases = [
  { label: "Search", fields: [["Methods", "include?, index, match"], ["Result", "Boolean/index/MatchData"], ["Boundary", "Choose evidence required by caller"]] },
  { label: "Replace", fields: [["Methods", "sub/gsub, tr, delete"], ["Mutation", "Bang variants may mutate and return nil if unchanged"], ["Boundary", "Regexp replacement and backreferences"]] },
  { label: "Enumerator", fields: [["Methods", "each_line, each_char, each_byte"], ["Unit", "Records, characters, or bytes"], ["Use", "Stream/compose without immediate Array"]] },
  { label: "Encoding", fields: [["Methods", "encoding, valid_encoding?, encode"], ["Boundary", "External bytes decoded once; internal UTF-8 policy"], ["Failure", "Invalid/undefined conversion options"]] },
] as const;

export function RubyStringCreationLab() {
  return <RubyOfficialLab cases={creationCases} caption="Percent literals, here documents, formatted strings, and command capture have distinct parsing and security boundaries." tone="cyan" />;
}

export function RubyStringOperationsLab() {
  return <RubyOfficialLab cases={operationCases} caption="Length, index, connection, comparison, and splitting depend on units, mutation, and parser shape." tone="violet" />;
}

export function RubyStringTransformLab() {
  return <RubyOfficialLab cases={transformCases} caption="Search, replacement, enumeration, and transcoding must expose evidence, mutation, iteration unit, and encoding failures." tone="amber" />;
}
