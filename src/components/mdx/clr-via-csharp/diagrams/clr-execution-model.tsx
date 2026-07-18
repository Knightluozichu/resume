"use client";

import { CvcOfficialLab } from "./official-lab";

const compilationCases = [
  { label: "C# source", fields: [["Owner", "C# compiler"], ["Output", "PE/COFF managed module"], ["Evidence", "IL, metadata tables, assembly references"]] },
  { label: "Managed module", fields: [["Owner", "Assembly linker or SDK build"], ["Output", "Assembly manifest plus modules/resources"], ["Evidence", "Assembly identity, files, exported types"]] },
  { label: "Assembly load", fields: [["Owner", ".NET host and CLR loader"], ["Output", "Resolved dependency and type universe"], ["Evidence", "runtimeconfig/deps, load context, bind trace"]] },
  { label: "Method call", fields: [["Owner", "JIT or ahead-of-time compiler"], ["Output", "Native instructions for the current target"], ["Evidence", "tier, code address, disassembly, profile"]], alert: "IL portability does not mean a method executes without target-specific native code generation." },
] as const;

const verificationCases = [
  { label: "Metadata", fields: [["Question", "Are types, members, signatures, and references structurally valid?"], ["Failure", "Invalid token, signature, or unresolved identity"], ["Boundary", "Loader and metadata reader"]] },
  { label: "Verifiable IL", fields: [["Question", "Can stack and type safety be proven without trusting the producer?"], ["Failure", "Stack merge or unsafe pointer rule violation"], ["Boundary", "Verification/type-safety model"]] },
  { label: "Unsafe IL", fields: [["Question", "Does code use pointers, unmanaged layout, or unverifiable transitions?"], ["Failure", "Memory corruption or ABI mismatch"], ["Boundary", "Trust, deployment, and interop policy"]] },
  { label: "Runtime guards", fields: [["Question", "Which checks remain at execution time?"], ["Failure", "Null, bounds, cast, overflow, or security exception"], ["Boundary", "Generated native code and runtime helpers"]] },
] as const;

const runtimeCases = [
  { label: "CLR", fields: [["Contract", "Execution engine, loader, GC, JIT, exception and thread services"], ["Portable", "Managed semantics"], ["Variable", "Runtime implementation and target architecture"]] },
  { label: "CTS", fields: [["Contract", "Common type/member semantics across CLR languages"], ["Portable", "Type identity and assignment rules"], ["Variable", "Language surface syntax"]] },
  { label: "CLS", fields: [["Contract", "Public interoperability subset for language-neutral APIs"], ["Portable", "Consumer-visible signatures"], ["Variable", "Private implementation may use wider CTS"]] },
  { label: "FCL", fields: [["Contract", "Reusable libraries layered over runtime services"], ["Portable", "API behavior for a target framework"], ["Variable", "OS-specific support and package version"]], alert: "CLR, CTS, CLS, and FCL solve different problems; treating them as synonyms hides the failing layer." },
] as const;

export function CvcCompilationPipelineLab() { return <CvcOfficialLab cases={compilationCases} caption="Source becomes a managed module, assemblies establish identity, and execution finally produces target-specific native code." tone="cyan" />; }
export function CvcIlVerificationLab() { return <CvcOfficialLab cases={verificationCases} caption="Metadata validity, IL verifiability, unsafe operations, and runtime guards are separate evidence gates." tone="rose" />; }
export function CvcRuntimeContractLab() { return <CvcOfficialLab cases={runtimeCases} caption="CLR, CTS, CLS, and FCL form related but independently versioned contracts." tone="violet" />; }
