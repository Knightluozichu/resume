"use client";

import { RubyOfficialLab } from "./official-lab";

const stringCases = [
  { label: "Bytes", fields: [["Value", "Raw octets"], ["API", "bytes, bytesize, getbyte"], ["Meaning", "No characters without an encoding"]] },
  { label: "Encoding tag", fields: [["Value", "String#encoding"], ["API", "force_encoding changes tag only"], ["Rule", "Tag must describe actual bytes"]] },
  { label: "Validity", fields: [["Value", "valid_encoding?"], ["Evidence", "Bytes are valid under current tag"], ["Limit", "Does not prove text is the intended language/data"]] },
  { label: "Transcode", fields: [["Value", "encode(target, source)"], ["Effect", "Converts byte representation"], ["Failure", "InvalidByteSequence/UndefinedConversion"]] },
] as const;

const sourceCases = [
  { label: "Source", fields: [["Owner", "Parser reads script bytes"], ["Setting", "Magic comment / default UTF-8"], ["Scope", "String literals and identifiers in that file"]] },
  { label: "Regexp", fields: [["Owner", "Pattern and target String encodings"], ["Setting", "Literal/options/runtime compatibility"], ["Failure", "Encoding::CompatibilityError"]] },
  { label: "IO external", fields: [["Owner", "Encoding of bytes at file/socket boundary"], ["Setting", "Mode or set_encoding"], ["Use", "Decode incoming / encode outgoing"]] },
  { label: "IO internal", fields: [["Owner", "Optional transcoded String representation"], ["Setting", "external:internal"], ["Use", "Normalize text entering application"]] },
] as const;

const failureCases = [
  { label: "Invalid bytes", fields: [["Meaning", "Byte sequence illegal in source encoding"], ["Default", "Raise"], ["Policy", "Reject, quarantine, or explicit replacement"]] },
  { label: "Undefined char", fields: [["Meaning", "Character cannot exist in target encoding"], ["Default", "Raise"], ["Policy", "Choose another target or explicit fallback"]] },
  { label: "Compatibility", fields: [["Meaning", "Two Strings cannot combine under current encodings"], ["Default", "Raise compatibility error"], ["Policy", "Normalize at boundary, not ad hoc"]] },
  { label: "Replacement", fields: [["Meaning", "Invalid/undefined data replaced"], ["Risk", "Silent information loss and identifier collision"], ["Policy", "Count, mark, and preserve raw evidence"]], alert: "Replacement is a data-loss policy, not a repair; default to strict decoding at trust boundaries." },
] as const;

export function RubyEncodingStringLab() {
  return <RubyOfficialLab cases={stringCases} caption="Bytes, encoding tags, validity, and transcoding are separate facts; force_encoding never changes bytes." tone="cyan" />;
}

export function RubyEncodingBoundaryLab() {
  return <RubyOfficialLab cases={sourceCases} caption="Source, regexp, IO external, and IO internal encodings belong to different owners and phases." tone="violet" />;
}

export function RubyEncodingFailuresLab() {
  return <RubyOfficialLab cases={failureCases} caption="Invalid bytes, undefined targets, incompatibility, and replacement require distinct evidence and loss policy." tone="amber" />;
}
