"use client";

import { LuaOfficialLab } from "./official-lab";

const bitCases = [
  { label: "Mask", fields: [["Operation", "value & mask"], ["Meaning", "Keep selected bit positions"], ["Boundary", "Define the logical width before interpreting the result"]] },
  { label: "Set/XOR", fields: [["Operation", "value | flag and value ~ flag"], ["Meaning", "Set bits or toggle differing bits"], ["Boundary", "Binary ~ is XOR; unary ~ complements every integer bit"]] },
  { label: "Left shift", fields: [["Operation", "value << count"], ["Meaning", "Logical shift with zero fill"], ["Boundary", "Bits shifted beyond Lua integer width are discarded"]] },
  { label: "Right shift", fields: [["Operation", "value >> count"], ["Meaning", "Logical shift with zero fill, even for negative values"], ["Boundary", "Not signed arithmetic division; negative count reverses direction"]], alert: "Lua bitwise operators work on the full lua_Integer width. Protocol fields still need an explicit narrower mask before and after mutation." },
] as const;

const formatCases = [
  { label: "Endian", fields: [["Directive", "< little, > big, = native"], ["Decision", "Wire/file protocols choose one explicit byte order"], ["Risk", "Native order makes artifacts host-dependent"]] },
  { label: "Integers", fields: [["Directive", "i[n]/I[n], b/B, h/H, j/J"], ["Decision", "Signedness and exact byte width"], ["Risk", "Value outside the selected representation is rejected"]] },
  { label: "Strings", fields: [["Directive", "c[n], z, s[n]"], ["Decision", "Fixed, zero-terminated, or length-prefixed"], ["Risk", "NUL, encoding, maximum length, and variable-size packsize"]] },
  { label: "Alignment", fields: [["Directive", "!n, x, Xop and native-size items"], ["Decision", "Use padding only when the format contract requires it"], ["Risk", "ABI-like alignment is not a portable network schema"]], alert: "A format string is executable schema. Endianness, width, alignment, and string length must be constants or validated against an allowlist." },
] as const;

const frameCases = [
  { label: "Header", fields: [["Field", "Magic, version, flags, payload length"], ["Check", "Exact bytes and supported values"], ["Failure", "Reject before allocation or payload parsing"]] },
  { label: "Payload", fields: [["Field", "Length-delimited bytes"], ["Check", "Maximum size and exact-read loop"], ["Failure", "Truncation is not normal EOF for an announced frame"]] },
  { label: "Cursor", fields: [["Field", "Next position returned by string.unpack"], ["Check", "Monotonic cursor within the input"], ["Failure", "Trailing bytes require an explicit extension policy"]] },
  { label: "Integrity", fields: [["Field", "Checksum/MAC when the protocol requires one"], ["Check", "Cover canonical header and payload"], ["Failure", "Checksum detects accidents; authentication needs a cryptographic MAC"]], alert: "Parsing must validate lengths before slicing or allocation. A syntactically unpackable header does not make the announced payload trustworthy." },
] as const;

export function PilBitwiseOperatorLab() {
  return <LuaOfficialLab cases={bitCases} caption="Bitwise masks, set/toggle operations, and logical shifts act on lua_Integer bit patterns with an application-defined field width." tone="cyan" />;
}

export function PilBinaryFormatLab() {
  return <LuaOfficialLab cases={formatCases} caption="Pack formats make byte order, numeric width, string framing, and alignment part of an executable binary schema." tone="violet" />;
}

export function PilBinaryFrameLab() {
  return <LuaOfficialLab cases={frameCases} caption="A binary frame parser validates header, bounded payload, unpack cursor, and integrity before accepting data." tone="rose" />;
}
