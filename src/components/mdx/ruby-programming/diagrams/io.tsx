"use client";

import { RubyOfficialLab } from "./official-lab";

const channelCases = [
  { label: "STDIN", fields: [["Direction", "Process input"], ["Typical API", "gets, each_line, read"], ["Owner", "Usually the process; library code should not close it"]] },
  { label: "STDOUT", fields: [["Direction", "Normal process output"], ["Typical API", "write, print, puts"], ["Contract", "Data/protocol, separate from diagnostics"]] },
  { label: "STDERR", fields: [["Direction", "Diagnostics"], ["Typical API", "warn, puts"], ["Contract", "Does not corrupt stdout pipelines"]] },
  { label: "File", fields: [["Direction", "Opened with explicit read/write/append mode"], ["Typical API", "File.open block"], ["Owner", "Creator closes it on every exit path"]] },
] as const;

const streamCases = [
  { label: "Line", fields: [["API", "gets / each_line"], ["Memory", "One record at a time"], ["Boundary", "Separator and maximum line length"]] },
  { label: "Chunk", fields: [["API", "read(length), readpartial"], ["Memory", "Bounded buffer"], ["Boundary", "EOF and short reads"]] },
  { label: "Position", fields: [["API", "pos, seek, rewind"], ["Unit", "Byte offset"], ["Boundary", "Only seekable streams; buffered state matters"]] },
  { label: "Buffer", fields: [["API", "flush, sync="], ["Meaning", "User-space buffering before OS/device"], ["Boundary", "Flush is not durable fsync"]] },
] as const;

const adapterCases = [
  { label: "Text", fields: [["Mode", "External/internal encoding conversion"], ["API", "each_line, write String"], ["Risk", "Invalid byte sequence and newline translation"]] },
  { label: "Binary", fields: [["Mode", "ASCII-8BIT bytes"], ["API", "binmode, read/write bytes"], ["Risk", "Do not apply text regex/encoding assumptions"]] },
  { label: "StringIO", fields: [["Role", "In-memory IO-shaped test double"], ["Use", "Inject input/output into methods"], ["Boundary", "Not proof of file/socket timing semantics"]] },
  { label: "Process/URI", fields: [["Role", "Subprocess or network-backed stream"], ["Use", "Open3/open-uri under explicit policy"], ["Boundary", "Timeout, status, redirects, size, SSRF"]], alert: "An IO-shaped object does not erase transport-specific timeout, durability, security, or ownership rules." },
] as const;

export function RubyIoChannelsLab() {
  return <RubyOfficialLab cases={channelCases} caption="Standard input, normal output, diagnostics, and files have distinct directions, protocols, and close owners." tone="cyan" />;
}

export function RubyIoStreamLab() {
  return <RubyOfficialLab cases={streamCases} caption="Line, chunk, position, and buffer operations expose record, EOF, seekability, and flush semantics." tone="violet" />;
}

export function RubyIoAdaptersLab() {
  return <RubyOfficialLab cases={adapterCases} caption="Text, binary, StringIO, and process/network streams share methods but retain transport-specific guarantees." tone="amber" />;
}
