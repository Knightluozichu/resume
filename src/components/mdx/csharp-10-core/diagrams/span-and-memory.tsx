"use client";

import { CtcOfficialLab } from "./official-lab";

const lifetimeCases = [
  { label: "Span<T>", fields: [["storage", "View over contiguous memory"], ["lifetime", "Ref-struct; cannot escape stack frame"]] },
  { label: "ReadOnlySpan<T>", fields: [["storage", "Read-only contiguous view"], ["lifetime", "May point at array, string, stack, native"]] },
  { label: "Memory<T>", fields: [["storage", "Heap-storable memory descriptor"], ["lifetime", "Can cross await; owner must remain alive"]] },
  { label: "IMemoryOwner<T>", fields: [["storage", "Pool/native-backed lease"], ["lifetime", "Dispose ends every derived view"]] },
] as const;

const sliceCases = [
  { label: "Slice", fields: [["operation", "Create subview without copying"], ["gate", "Offset + length bounds and source lifetime"]] },
  { label: "CopyTo", fields: [["operation", "Copy and throw if destination too short"], ["gate", "Overlap handled, destination mutated"]] },
  { label: "TryCopyTo", fields: [["operation", "Copy or return false"], ["gate", "No partial copy on short destination"]] },
  { label: "Text span", fields: [["operation", "Parse/search without substring"], ["gate", "Ordinal/culture and temporary lifetime"]] },
] as const;

const lowLevelCases = [
  { label: "enumerator", fields: [["cursor", "Forward-only ref-struct iteration"], ["gate", "No boxing/escape or structural mutation"]] },
  { label: "stackalloc", fields: [["cursor", "Stack-backed temporary span"], ["gate", "Small bounded size and no escape"]] },
  { label: "pinned", fields: [["cursor", "Managed object fixed for native call"], ["gate", "Shortest possible pin lifetime"]] },
  { label: "unmanaged", fields: [["cursor", "Explicit native allocation"], ["gate", "Size math, alignment, free exactly once"]] },
] as const;

export function CtcSpanLifetimeLab() { return <CtcOfficialLab cases={lifetimeCases} caption="Span and Memory are views; their legal lifetime is bounded by stack rules and the owner of the underlying storage." tone="cyan" />; }
export function CtcSpanSliceCopyLab() { return <CtcOfficialLab cases={sliceCases} caption="Slicing changes a view, copying changes storage, and text spans remove allocations without changing comparison semantics." tone="violet" />; }
export function CtcLowLevelMemoryLab() { return <CtcOfficialLab cases={lowLevelCases} caption="Forward-only cursors, stack allocation, pinning, and unmanaged memory each impose distinct escape and cleanup rules." tone="amber" />; }
