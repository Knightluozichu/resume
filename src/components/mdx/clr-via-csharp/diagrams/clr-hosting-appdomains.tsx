"use client";

import { CvcOfficialLab } from "./official-lab";

const hostCases = [
  { label: "Process host", fields: [["Chooses", "Runtime version/configuration and entrypoint"], ["Controls", "Process lifetime, environment, diagnostics"], ["Modern", "apphost/dotnet/native hosting APIs"]] },
  { label: "CLR", fields: [["Chooses", "Loader, GC, JIT, threading services"], ["Controls", "Managed execution"], ["Modern", "One modern CoreCLR per process in normal hosting"]] },
  { label: "AppDomain", fields: [["Chooses", "Framework-era managed isolation/loading domain"], ["Controls", "Assembly universe, config, unload boundary"], ["Modern", "Not available as full isolation on .NET Core/5+"]] },
  { label: "Load context", fields: [["Chooses", "Managed dependency universe"], ["Controls", "Version isolation and cooperative unload"], ["Modern", "AssemblyLoadContext; not security/fault sandbox"]] },
] as const;

const crossingCases = [
  { label: "Marshal-by-reference", fields: [["Crossing", "Proxy calls object in source AppDomain"], ["Identity", "Remote object stays in owner domain"], ["Failure", "Lifetime lease/domain unload/remoting exception"]] },
  { label: "Marshal-by-value", fields: [["Crossing", "Serialize graph and reconstruct copy"], ["Identity", "Independent destination object"], ["Failure", "Serialization/version/security"]] },
  { label: "Non-marshalable", fields: [["Crossing", "Cannot cross boundary"], ["Identity", "Remains owner-domain only"], ["Failure", "Serialization/remoting error"]] },
  { label: "Message DTO", fields: [["Crossing", "Explicit data protocol"], ["Identity", "No shared object identity"], ["Failure", "Schema/transport errors"]], alert: "Modern isolation should prefer explicit DTO/messages across process or load-context boundaries rather than legacy transparent remoting." },
] as const;

const lifecycleCases = [
  { label: "Create", fields: [["Framework", "AppDomain.CreateDomain/config"], ["Modern", "AssemblyLoadContext or worker process"], ["Evidence", "Identity/config/dependency ledger"]] },
  { label: "Monitor", fields: [["Framework", "AppDomain events and monitoring counters"], ["Modern", "EventPipe/metrics/process telemetry"], ["Evidence", "CPU, allocations, exceptions, loaded assemblies"]] },
  { label: "Unload", fields: [["Framework", "AppDomain.Unload aborts domain threads"], ["Modern", "ALC cooperative GC unload or process termination"], ["Evidence", "WeakReference/process exit and resources released"]] },
  { label: "Recover", fields: [["Framework", "Host recreates domain"], ["Modern", "Restart worker/process from durable state"], ["Evidence", "No leaked handles, callbacks, corrupted shared state"]] },
] as const;

export function CvcHostingLayersLab() { return <CvcOfficialLab cases={hostCases} caption="Process host, CLR, Framework AppDomain, and modern AssemblyLoadContext own different configuration and isolation layers." tone="cyan" />; }
export function CvcDomainCrossingLab() { return <CvcOfficialLab cases={crossingCases} caption="Marshal-by-reference, marshal-by-value, non-marshalable objects, and explicit messages preserve different identity semantics." tone="violet" />; }
export function CvcIsolationLifecycleLab() { return <CvcOfficialLab cases={lifecycleCases} caption="Creation, monitoring, unload, and recovery require version-appropriate evidence and ownership." tone="amber" />; }
