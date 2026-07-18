"use client";

import { LuaOfficialLab } from "./official-lab";

const simpleIoCases = [
  { label: "Current input", fields: [["Operation", "io.input(file or path)"], ["State", "Replace the process-global current input"], ["Risk", "Later io.read calls depend on hidden mutable state"]] },
  { label: "Read line", fields: [["Operation", "io.read(\"l\")"], ["Result", "Line without its line ending, or nil at EOF"], ["Risk", "Empty line and EOF are different results"]] },
  { label: "Read number", fields: [["Operation", "io.read(\"n\")"], ["Result", "Parsed number or nil without consuming invalid text as expected"], ["Risk", "Malformed token can stall a careless loop"]] },
  { label: "Current output", fields: [["Operation", "io.output(file or path); io.write(...)"], ["State", "Replace the current output destination"], ["Risk", "Library code can redirect unrelated output"]], alert: "The simple I/O model is concise for scripts, but current input/output are hidden shared state and must not leak across library boundaries." },
] as const;

const fileHandleCases = [
  { label: "Open modes", fields: [["Choice", "r, w, a with optional + and b"], ["Ownership", "Successful io.open returns an owned file handle"], ["Failure", "nil plus an error message and code"]] },
  { label: "Lines iterator", fields: [["Choice", "io.lines(path) versus file:lines()"], ["Ownership", "io.lines owns and closes its opened file at EOF"], ["Failure", "file:lines leaves caller-owned handles open"]] },
  { label: "Seek", fields: [["Choice", "file:seek(set|cur|end, offset)"], ["Ownership", "Position belongs to this handle"], ["Failure", "Text offsets and sparse writes are platform-sensitive"]] },
  { label: "Buffering", fields: [["Choice", "file:setvbuf(no|full|line, size)"], ["Ownership", "Flush and close establish visibility"], ["Failure", "A write call succeeding does not imply durable storage"]], alert: "A handle API needs an explicit owner, close path, error check, and byte/text policy; lexical scope alone does not close ordinary Lua 5.3 handles." },
] as const;

const systemCases = [
  { label: "Rename/remove", fields: [["Capability", "os.rename and os.remove mutate filesystem names"], ["Result", "Success or nil plus diagnostic information"], ["Boundary", "Constrain paths and handle platform replacement rules"]] },
  { label: "Temporary file", fields: [["Capability", "io.tmpfile returns an already-open temporary handle"], ["Result", "Handle lifecycle controls cleanup"], ["Boundary", "Prefer it over name-then-open races"]] },
  { label: "os.execute", fields: [["Capability", "Run a command through the host command processor"], ["Result", "Status tuple must be decoded by platform/runtime contract"], ["Boundary", "Never concatenate untrusted text into a shell command"]] },
  { label: "io.popen", fields: [["Capability", "Open a one-way pipe to a process"], ["Result", "Read stdout or write stdin, then inspect close status"], ["Boundary", "Shell quoting, stderr, timeout, and cancellation remain external concerns"]], alert: "Shell execution is a capability boundary, not a string-formatting convenience; portable argument-vector process spawning requires a host library or native adapter." },
] as const;

export function PilSimpleIoLab() {
  return <LuaOfficialLab cases={simpleIoCases} caption="The simple model routes io.read and io.write through mutable current input and output handles." tone="cyan" />;
}

export function PilFileHandleLab() {
  return <LuaOfficialLab cases={fileHandleCases} caption="The complete model makes file identity visible, but ownership, positioning, buffering, and errors still need explicit contracts." tone="violet" />;
}

export function PilSystemCommandLab() {
  return <LuaOfficialLab cases={systemCases} caption="Filesystem mutation and command execution cross authority boundaries and require constrained inputs plus decoded outcomes." tone="rose" />;
}
