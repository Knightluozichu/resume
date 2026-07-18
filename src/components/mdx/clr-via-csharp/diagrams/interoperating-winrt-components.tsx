"use client";

import { CvcOfficialLab } from "./official-lab";

const projectionCases = [
  { label: "WinRT type", fields: [["Source", "Windows Runtime metadata/type system"], ["Projection", "Language-friendly .NET view"], ["Risk", "Projected name/shape differs from ABI"]] },
  { label: "Collection", fields: [["Source", "WinRT vector/map/iterable"], ["Projection", "Familiar generic interfaces where supported"], ["Risk", "Mutation/events/performance differ"]] },
  { label: "Date/URI", fields: [["Source", "WinRT foundational value"], ["Projection", "Mapped .NET type"], ["Risk", "Range, null, timezone, identity"]] },
  { label: "Event/token", fields: [["Source", "Add returns registration token"], ["Projection", "+=/ -= event syntax"], ["Risk", "Lifetime and apartment/thread affinity"]] },
] as const;

const asyncCases = [
  { label: "IAsyncAction", fields: [["Result", "Completion only"], ["Projection", "Awaitable/Task-like adapter"], ["Control", "Cancellation/progress where interface supports"]] },
  { label: "IAsyncOperation<T>", fields: [["Result", "Typed result"], ["Projection", "await returns projected T"], ["Control", "Translate HRESULT/cancellation"]] },
  { label: "Stream", fields: [["Result", "IRandomAccessStream/IInputStream"], ["Projection", ".NET Stream adapters"], ["Control", "Position, capability, disposal"]] },
  { label: "Buffer", fields: [["Result", "IBuffer/array data"], ["Projection", "Copy or shared view depending API"], ["Control", "Capacity, length, lifetime, thread"]] },
] as const;

const componentCases = [
  { label: "Public surface", fields: [["Rule", "WinRT-legal public types only"], ["Evidence", "winmd validation and projection tests"], ["Risk", "Generic/overload/type restrictions"]] },
  { label: "Async", fields: [["Rule", "Expose WinRT async interfaces"], ["Evidence", "C#, C++/WinRT, JS consumer behavior"], ["Risk", "Cancellation/progress/error mapping"]] },
  { label: "Data transfer", fields: [["Rule", "Use arrays/buffers/streams with explicit ownership"], ["Evidence", "Copy count, bounds, lifetime"], ["Risk", "Large copies and use-after-dispose"]] },
  { label: "Activation", fields: [["Rule", "Runtime class/activation factory metadata"], ["Evidence", "Registration/package and apartment"], ["Risk", "Deployment and threading model"]], alert: "A WinRT component is an ABI and projection contract for multiple languages, not a normal C# library with a different extension." },
] as const;

export function CvcWinrtProjectionLab() { return <CvcOfficialLab cases={projectionCases} caption="WinRT types, collections, foundational values, and events are projected into language-specific surfaces over one ABI." tone="cyan" />; }
export function CvcWinrtAsyncDataLab() { return <CvcOfficialLab cases={asyncCases} caption="Async actions/operations, stream adapters, and buffers must preserve completion, error, ownership, and length semantics." tone="violet" />; }
export function CvcWinrtComponentLab() { return <CvcOfficialLab cases={componentCases} caption="Public types, asynchronous operations, data transfer, and activation define a cross-language WinRT component contract." tone="amber" />; }
