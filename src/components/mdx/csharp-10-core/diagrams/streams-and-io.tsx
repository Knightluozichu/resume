"use client";

import { CtcOfficialLab } from "./official-lab";

const streamCases = [
  { label: "FileStream", fields: [["capability", "Read/write/seek depends on open mode"], ["owner", "File handle and optional async I/O"]] },
  { label: "MemoryStream", fields: [["capability", "Seekable in-memory byte store"], ["owner", "Expandable or caller-provided buffer"]] },
  { label: "NetworkStream", fields: [["capability", "Duplex, usually non-seekable"], ["owner", "Socket ownership is constructor policy"]] },
  { label: "Pipe-like", fields: [["capability", "Sequential partial reads/writes"], ["owner", "Producer-consumer backpressure"]] },
] as const;

const adapterCases = [
  { label: "Buffered", fields: [["layer", "Batch small byte operations"], ["gate", "Flush order and duplicate buffering"]] },
  { label: "Text", fields: [["layer", "Encoding bytes to chars"], ["gate", "BOM, fallback, newline, leaveOpen"]] },
  { label: "Binary", fields: [["layer", "Typed primitive representation"], ["gate", "Endian, length, version, validation"]] },
  { label: "Compression", fields: [["layer", "Transform compressed byte stream"], ["gate", "Finish footer before publishing output"]] },
] as const;

const fileCases = [
  { label: "atomic write", fields: [["boundary", "Temp file in target volume"], ["gate", "Flush, close, replace, cleanup"]] },
  { label: "directory walk", fields: [["boundary", "Untrusted changing namespace"], ["gate", "Errors, symlinks, depth, cancellation"]] },
  { label: "OS security", fields: [["boundary", "Identity + ACL/mode + sharing"], ["gate", "Least privilege and race-resistant open"]] },
  { label: "memory map", fields: [["boundary", "Mapped view over file/page range"], ["gate", "Offset, lifetime, coherence, bounds"]] },
] as const;

export function CtcStreamCapabilityLab() { return <CtcOfficialLab cases={streamCases} caption="A stream contract is defined by capabilities, partial transfer behavior, position, and ownership." tone="cyan" />; }
export function CtcStreamAdapterLab() { return <CtcOfficialLab cases={adapterCases} caption="Adapters add buffering, text, binary, or compression semantics and must be disposed in dependency order." tone="violet" />; }
export function CtcFileBoundaryLab() { return <CtcOfficialLab cases={fileCases} caption="Reliable file I/O treats publication, namespaces, permissions, and mapped views as explicit OS boundaries." tone="amber" />; }
