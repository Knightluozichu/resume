"use client";

import { LuaOfficialLab } from "./official-lab";

const downloadCases = [
  { label: "Resolve", fields: [["Operation", "Turn a host name into a network endpoint"], ["Blocking risk", "Resolver calls may wait outside Lua scheduling"], ["Ownership", "The task owns a deadline, not an infinite lookup"]] },
  { label: "Connect", fields: [["Operation", "Create a TCP connection"], ["Blocking risk", "Connect may remain in progress"], ["Ownership", "Track writable readiness and connect failure"]] },
  { label: "Send", fields: [["Operation", "Write an HTTP request"], ["Blocking risk", "The socket may accept only a prefix"], ["Ownership", "Retain the unsent offset across yields"]] },
  { label: "Receive", fields: [["Operation", "Read response chunks"], ["Blocking risk", "No bytes are currently ready"], ["Ownership", "Consume partial data before handling timeout/close"]] },
  { label: "Close", fields: [["Operation", "Release socket and publish result"], ["Blocking risk", "Errors and cancellation can bypass happy-path code"], ["Ownership", "Close exactly once on every terminal path"]], alert: "A coroutine only makes progress cooperative. Every resolver, connect, send, and receive operation must obey the non-blocking protocol." },
] as const;

const dispatcherCases = [
  { label: "Spawn", fields: [["Task state", "Suspended before first resume"], ["Dispatcher", "Assign identity, owner, and deadline"], ["Invariant", "No detached task owns an untracked socket"]] },
  { label: "Ready", fields: [["Task state", "Eligible for a bounded resume"], ["Dispatcher", "Pop from a FIFO ready queue"], ["Invariant", "One task cannot monopolize the Lua thread"]] },
  { label: "Waiting", fields: [["Task state", "Yielded a typed I/O request"], ["Dispatcher", "Register socket and desired direction"], ["Invariant", "A task is in one wait set at a time"]] },
  { label: "Terminal", fields: [["Task state", "Returned, failed, timed out, or cancelled"], ["Dispatcher", "Remove registrations and close resources"], ["Invariant", "Result and traceback reach the owner"]], alert: "Round-robin polling can demonstrate interleaving, but it burns CPU scanning sockets that are not ready." },
] as const;

const selectCases = [
  { label: "Read set", fields: [["Input", "Sockets blocked on receive"], ["select result", "Only readable sockets"], ["Resume data", "Task retries receive and handles partial bytes"]] },
  { label: "Write set", fields: [["Input", "Sockets connecting or blocked on send"], ["select result", "Only writable sockets"], ["Resume data", "Task checks connect status or advances send offset"]] },
  { label: "Timeout", fields: [["Input", "Nearest task deadline"], ["select result", "No ready socket before timeout"], ["Resume data", "Expire timers and inject typed timeout"]] },
  { label: "Batch", fields: [["Input", "Many sockets become ready together"], ["select result", "A readiness batch, not completed operations"], ["Resume data", "Queue bounded work fairly and re-register waits"]], alert: "Readiness means an operation may make progress. It does not promise a full message, a complete send, or application-level success." },
] as const;

export function PilSocketDownloadLab() {
  return <LuaOfficialLab cases={downloadCases} caption="A web download crosses resolver, connect, send, receive, and close boundaries that each need explicit ownership." tone="cyan" />;
}

export function PilCoroutineDispatcherLab() {
  return <LuaOfficialLab cases={dispatcherCases} caption="The dispatcher moves owned tasks between spawn, ready, waiting, and terminal states." tone="violet" />;
}

export function PilSelectMultiplexerLab() {
  return <LuaOfficialLab cases={selectCases} caption="select converts read, write, and timer wait sets into bounded readiness batches." tone="emerald" />;
}
