"use client";

import { CvcOfficialLab } from "./official-lab";

const valueCases = [
  { label: "const", fields: [["Storage", "No runtime field read required by consumers"], ["Initialization", "Compile-time constant expression"], ["Versioning", "Value can be embedded in consumer IL"]] },
  { label: "static readonly", fields: [["Storage", "One field per runtime closed type/context"], ["Initialization", "Declaration or type constructor"], ["Versioning", "Consumer reads current deployed field"]] },
  { label: "readonly", fields: [["Storage", "One field inside each instance"], ["Initialization", "Declaration or instance constructor"], ["Versioning", "Reference readonly does not make object immutable"]] },
  { label: "property", fields: [["Storage", "Defined by implementation, often backing field"], ["Initialization", "Accessor logic"], ["Versioning", "Method contract can validate or compute"]], alert: "Use public const only for values that can remain baked into old consumers indefinitely." },
] as const;

const storageCases = [
  { label: "Instance", fields: [["Owner", "Each object/value"], ["Lifetime", "Containing value/object"], ["Concurrency", "Aliases may race on mutable objects"]] },
  { label: "Static", fields: [["Owner", "Runtime type and load context"], ["Lifetime", "Usually context lifetime"], ["Concurrency", "Shared by threads using that type"]] },
  { label: "ThreadStatic", fields: [["Owner", "Physical thread"], ["Lifetime", "Thread lifetime"], ["Concurrency", "Async continuation may move threads"]] },
  { label: "AsyncLocal", fields: [["Owner", "Logical ExecutionContext flow"], ["Lifetime", "Async flow and captured contexts"], ["Concurrency", "Child flows may inherit values"]] },
] as const;

const layoutCases = [
  { label: "Reference field", fields: [["GC", "Reported as managed reference"], ["Layout", "Runtime-managed by default"], ["Risk", "Retention and aliasing"]] },
  { label: "Value field", fields: [["GC", "Embedded references recursively reported"], ["Layout", "Inline inside owner"], ["Risk", "Copy size and mutable value semantics"]] },
  { label: "Explicit layout", fields: [["GC", "Overlapping managed references heavily restricted"], ["Layout", "FieldOffset controls ABI positions"], ["Risk", "Architecture, packing, and union safety"]] },
  { label: "Volatile field", fields: [["GC", "Normal storage"], ["Layout", "No layout change"], ["Risk", "Ordering/visibility is not an atomic transaction"]], alert: "Field layout and volatile semantics solve different problems: one is representation, the other is memory ordering." },
] as const;

export function CvcConstantReadonlyLab() { return <CvcOfficialLab cases={valueCases} caption="Constants, readonly fields, and properties differ in storage, initialization, and consumer version behavior." tone="amber" />; }
export function CvcFieldOwnerLab() { return <CvcOfficialLab cases={storageCases} caption="Instance, static, thread-local, and logical-flow state need explicit owners and lifetimes." tone="cyan" />; }
export function CvcFieldLayoutLab() { return <CvcOfficialLab cases={layoutCases} caption="Managed references, inline values, explicit layout, and volatile access impose separate runtime constraints." tone="violet" />; }
