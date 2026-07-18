"use client";

import { CtcOfficialLab } from "./official-lab";

const compatibilityCases = [
  { label: ".NET Standard", fields: [["meaning", "API contract for library compatibility"], ["proof", "Reference assembly compile matrix"]] },
  { label: ".NET 6", fields: [["meaning", "Concrete runtime and BCL implementation"], ["proof", "Run on supported host/RID"]] },
  { label: ".NET Framework", fields: [["meaning", "Windows-only legacy runtime line"], ["proof", "API and behavior compatibility tests"]] },
  { label: "multi-target", fields: [["meaning", "One package ships per-TFM assets"], ["proof", "Compile and test every target"]] },
] as const;

const runtimeCases = [
  { label: "C# type", fields: [["surface", "string, int, object keywords"], ["runtime", "Aliases for System.String, Int32, Object"]] },
  { label: "CLR", fields: [["surface", "IL execution, JIT, GC, loader"], ["runtime", "Common type and execution system"]] },
  { label: "BCL", fields: [["surface", "Collections, IO, networking, text"], ["runtime", "Versioned managed API contracts"]] },
  { label: "package", fields: [["surface", "Libraries outside shared framework"], ["runtime", "Restore and dependency resolution"]] },
] as const;

const layerCases = [
  { label: "web", fields: [["model", "ASP.NET Core request pipeline"], ["boundary", "HTTP, DI scopes, hosting"]] },
  { label: "desktop", fields: [["model", "WPF/Windows Forms/WinUI"], ["boundary", "UI thread and OS support"]] },
  { label: "mobile", fields: [["model", "MAUI platform workloads"], ["boundary", "Native packaging and lifecycle"]] },
  { label: "library/tool", fields: [["model", "Class library, console, worker"], ["boundary", "Host, TFM, deployment owner"]] },
] as const;

export function CtcCompatibilitySurfaceLab() { return <CtcOfficialLab cases={compatibilityCases} caption=".NET Standard, .NET 6, .NET Framework, and multi-targeting solve different compatibility problems." tone="cyan" />; }
export function CtcClrBclTypesLab() { return <CtcOfficialLab cases={runtimeCases} caption="C# aliases, CLR execution, BCL APIs, and packages are related but independently versioned layers." tone="violet" />; }
export function CtcApplicationLayerLab() { return <CtcOfficialLab cases={layerCases} caption="Application models add host, lifecycle, platform, and deployment contracts above the runtime." tone="emerald" />; }
