"use client";

import { CvcOfficialLab } from "./official-lab";

const constructorCases = [
  { label: "Class .ctor", fields: [["Input state", "Allocated zeroed object after base allocation"], ["Responsibility", "Establish every instance invariant"], ["Failure", "Reference is not returned; acquired resources need cleanup"]] },
  { label: "Struct .ctor", fields: [["Input state", "Value storage requiring definite assignment"], ["Responsibility", "Initialize complete value"], ["Failure", "No partially returned value"]] },
  { label: "Type .cctor", fields: [["Input state", "Per runtime type/context uninitialized state"], ["Responsibility", "Initialize static invariants once"], ["Failure", "TypeInitializationException can poison later access"]] },
  { label: "Factory", fields: [["Input state", "Validated inputs and external dependencies"], ["Responsibility", "Choose subtype/cache/async creation"], ["Failure", "Can expose explicit result and cleanup"]] },
] as const;

const operatorCases = [
  { label: "Operator", fields: [["Selection", "Compile-time overload resolution"], ["Contract", "Expected algebraic meaning for the type"], ["Risk", "Surprising side effects or asymmetry"]] },
  { label: "Conversion", fields: [["Selection", "Source/target user-defined operators"], ["Contract", "Implicit must not lose information or throw unexpectedly"], ["Risk", "Ambiguity and hidden cost"]] },
  { label: "Virtual method", fields: [["Selection", "Runtime receiver slot"], ["Contract", "Subtype behavior under base invariant"], ["Risk", "Versioning and reentrancy"]] },
  { label: "Static abstract", fields: [["Selection", "Generic constraint and compile-time type"], ["Contract", "Operator-like capability for generic math"], ["Risk", "Target/runtime/language support"]] },
] as const;

const extensionCases = [
  { label: "Instance member", fields: [["Precedence", "Wins over extension candidates"], ["Dispatch", "Normal static/virtual rules"], ["Version risk", "New instance member can change source binding"]] },
  { label: "Extension", fields: [["Precedence", "Considered after instance lookup fails"], ["Dispatch", "Static method call"], ["Version risk", "Namespace imports and overload additions"]] },
  { label: "Partial method", fields: [["Precedence", "Compile-time declaration/implementation pairing"], ["Dispatch", "Ordinary generated method/call or elision under old rules"], ["Version risk", "Generator/user contract"]] },
  { label: "Reflection", fields: [["Precedence", "ExtensionAttribute is metadata, not instance membership"], ["Dispatch", "Tool must discover static methods"], ["Version risk", "Trimming and metadata preservation"]], alert: "Extension syntax does not modify the extended type or grant access to its private state." },
] as const;

export function CvcConstructorLifecycleLab() { return <CvcOfficialLab cases={constructorCases} caption="Class, struct, and type constructors establish different invariants; factories handle creation that constructors cannot express cleanly." tone="cyan" />; }
export function CvcOperatorConversionLab() { return <CvcOfficialLab cases={operatorCases} caption="Operators and conversions bind statically and must preserve familiar mathematical and loss contracts." tone="amber" />; }
export function CvcExtensionPartialLab() { return <CvcOfficialLab cases={extensionCases} caption="Instance, extension, partial, and reflection views resolve members through distinct mechanisms." tone="violet" />; }
