"use client";

import { CtcOfficialLab } from "./official-lab";

const reflectionCases = [
  { label: "Type", fields: [["inspect", "Identity, base, interfaces, generics"], ["gate", "Exact assembly and load-context identity"]] },
  { label: "Constructor", fields: [["inspect", "Activation signature and visibility"], ["gate", "Validate contract before executing code"]] },
  { label: "Method", fields: [["inspect", "Parameters, generic args, return"], ["gate", "Binding flags and wrapped invocation errors"]] },
  { label: "Property", fields: [["inspect", "Accessor methods and index args"], ["gate", "Getter/setter can execute arbitrary code"]] },
] as const;

const metadataCases = [
  { label: "assembly", fields: [["read", "Manifest, references, types, resources"], ["gate", "Reflection load versus metadata-only inspection"]] },
  { label: "attribute data", fields: [["read", "Constructor and named arguments"], ["gate", "No attribute constructor execution"]] },
  { label: "attribute instance", fields: [["read", "Instantiated custom attribute"], ["gate", "Constructor side effects and dependencies"]] },
  { label: "trim/AOT", fields: [["read", "Statically preserved metadata surface"], ["gate", "Annotations, source generation, fallback"]] },
] as const;

const emitCases = [
  { label: "expression", fields: [["produce", "Typed expression tree or delegate"], ["gate", "Interpreter fallback when dynamic code unavailable"]] },
  { label: "DynamicMethod", fields: [["produce", "Runtime method IL"], ["gate", "Stack balance, signatures, dynamic-code support"]] },
  { label: "TypeBuilder", fields: [["produce", "Runtime assembly/type/members"], ["gate", "Bake order and generic constraints"]] },
  { label: "IL parser", fields: [["produce", "Decoded opcodes and operands"], ["gate", "Module token resolution and branch bounds"]] },
] as const;

export function CtcReflectionBindingLab() { return <CtcOfficialLab cases={reflectionCases} caption="Reflection is a binding operation over exact type identity, signatures, visibility, and executable members." tone="cyan" />; }
export function CtcMetadataInspectionLab() { return <CtcOfficialLab cases={metadataCases} caption="Assembly and attribute inspection must separate metadata reads from code execution and deployment preservation." tone="violet" />; }
export function CtcDynamicEmissionLab() { return <CtcOfficialLab cases={emitCases} caption="Dynamic code ranges from typed expressions to emitted types and raw IL, each with validation and runtime constraints." tone="amber" />; }
