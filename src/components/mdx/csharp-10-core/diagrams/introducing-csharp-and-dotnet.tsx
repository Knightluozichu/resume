"use client";

import { CtcOfficialLab } from "./official-lab";

const guaranteeCases = [
  { label: "object", fields: [["model", "State plus virtual/interface behavior"], ["evidence", "Runtime dispatch follows actual type"]] },
  { label: "type-safe", fields: [["model", "Compiler and CLR verify operations"], ["evidence", "Invalid conversions fail at defined boundary"]] },
  { label: "managed", fields: [["model", "GC tracks reachable managed objects"], ["evidence", "Memory lifetime differs from resource lifetime"]] },
  { label: "portable", fields: [["model", "IL plus runtime-specific execution"], ["evidence", "TFM and native dependencies still constrain deployment"]] },
] as const;

const platformCases = [
  { label: "language", fields: [["owner", "C# syntax and semantics"], ["version gate", "LangVersion/compiler"]] },
  { label: "runtime", fields: [["owner", "CLR, JIT, GC, loader"], ["version gate", "Installed/runtime host"]] },
  { label: "library", fields: [["owner", "BCL APIs and contracts"], ["version gate", "Target framework/reference assemblies"]] },
  { label: "app model", fields: [["owner", "ASP.NET, desktop, mobile, tools"], ["version gate", "Workload and platform support"]] },
] as const;

const versionCases = [
  { label: "C# 10", fields: [["signal", "Global/file-scoped using, record structs"], ["proof", "Compile with explicit LangVersion"]] },
  { label: ".NET 6", fields: [["signal", "Runtime/BCL target for this edition"], ["proof", "TFM and runtime roll-forward matrix"]] },
  { label: "older app", fields: [["signal", "New compiler may target older framework"], ["proof", "Check every API separately"]] },
  { label: "deployment", fields: [["signal", "Framework-dependent or self-contained"], ["proof", "Publish and run on target RID"]], alert: "Language support, API availability, and runtime availability are three different questions." },
] as const;

export function CtcLanguageGuaranteesLab() { return <CtcOfficialLab cases={guaranteeCases} caption="C# combines object orientation, type safety, managed memory, and platform reach without making every deployment identical." tone="violet" />; }
export function CtcPlatformLayersLab() { return <CtcOfficialLab cases={platformCases} caption="Language, CLR, BCL, and application model have separate owners and version gates." tone="cyan" />; }
export function CtcVersionMatrixLab() { return <CtcOfficialLab cases={versionCases} caption="A feature is usable only when compiler, target framework, runtime, and deployment all agree." tone="amber" />; }
