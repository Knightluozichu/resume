"use client";

import { CtcOfficialLab } from "./official-lab";

const abiCases = [
  { label: "library", fields: [["boundary", "Exact native binary and export"], ["gate", "Trusted search path, architecture, version"]] },
  { label: "call ABI", fields: [["boundary", "Calling convention and symbol"], ["gate", "Parameter order, width, return, error"]] },
  { label: "layout", fields: [["boundary", "Struct size, pack, alignment, union"], ["gate", "Native sizeof/offsetof parity"]] },
  { label: "ownership", fields: [["boundary", "Allocated buffer or handle"], ["gate", "Allocator pair and release exactly once"]] },
] as const;

const marshalCases = [
  { label: "blittable", fields: [["transfer", "Compatible representation can pin/pass"], ["gate", "Lifetime and architecture still matter"]] },
  { label: "copied", fields: [["transfer", "Marshaller converts managed/native forms"], ["gate", "Direction, encoding, capacity, cleanup"]] },
  { label: "callback", fields: [["transfer", "Native stores managed function pointer"], ["gate", "Root delegate, thread, exception, unregister"]] },
  { label: "SafeHandle", fields: [["transfer", "Managed owner wraps native handle"], ["gate", "Invalid values and reliable release"]] },
] as const;

const comCases = [
  { label: "shared memory", fields: [["model", "Versioned bytes shared by processes"], ["gate", "Atomic publish, synchronization, bounds"]] },
  { label: "RCW", fields: [["model", "Managed proxy over COM identity"], ["gate", "Apartment, lifetime, HRESULT, callbacks"]] },
  { label: "CCW", fields: [["model", "COM view of managed object"], ["gate", "Stable GUID/interface and threading"]] },
  { label: "process boundary", fields: [["model", "IPC outside shared address space"], ["gate", "Crash, security, version isolation"]] },
] as const;

export function CtcNativeAbiLab() { return <CtcOfficialLab cases={abiCases} caption="Native calls are ABI contracts over binary identity, calling convention, data layout, and allocator ownership." tone="cyan" />; }
export function CtcMarshalingCallbackLab() { return <CtcOfficialLab cases={marshalCases} caption="Marshaling may pin, copy, transform, or wrap resources; callbacks reverse the lifetime and threading direction." tone="violet" />; }
export function CtcComBoundaryLab() { return <CtcOfficialLab cases={comCases} caption="Shared memory and COM require explicit version, synchronization, apartment, identity, and process-isolation decisions." tone="amber" />; }
