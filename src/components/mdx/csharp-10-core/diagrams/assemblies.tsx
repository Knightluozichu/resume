"use client";

import { CtcOfficialLab } from "./official-lab";

const anatomyCases = [
  { label: "manifest", fields: [["contains", "Identity, files, references, resources"], ["evidence", "Assembly metadata and entry point"]] },
  { label: "metadata", fields: [["contains", "Types, members, signatures, attributes"], ["evidence", "Tokens and tables consumed by runtime"]] },
  { label: "IL", fields: [["contains", "Managed method bodies"], ["evidence", "JIT/AOT input with exception regions"]] },
  { label: "resources", fields: [["contains", "Embedded or linked payload"], ["evidence", "Manifest names and culture fallback"]] },
] as const;

const loadCases = [
  { label: "default ALC", fields: [["identity", "Application shared dependency graph"], ["gate", "One compatible assembly per simple name"]] },
  { label: "custom ALC", fields: [["identity", "Explicit plugin dependency universe"], ["gate", "Share contract, isolate implementation"]] },
  { label: "collectible", fields: [["identity", "Unloadable custom context"], ["gate", "No roots from threads, events, statics, types"]] },
  { label: "resolver", fields: [["identity", "AssemblyDependencyResolver paths"], ["gate", "Approved root, native libraries, version policy"]] },
] as const;

const pluginCases = [
  { label: "discover", fields: [["phase", "Read manifest and contract version"], ["gate", "Allowlist, path, compatibility"]] },
  { label: "load", fields: [["phase", "Create isolated context and entry type"], ["gate", "Share host contract identity"]] },
  { label: "run", fields: [["phase", "Invoke bounded plugin capability"], ["gate", "Cancellation, errors, resource quota"]] },
  { label: "unload", fields: [["phase", "Stop, detach, unload, collect"], ["gate", "WeakReference proves context is reclaimable"]] },
] as const;

export function CtcAssemblyAnatomyLab() { return <CtcOfficialLab cases={anatomyCases} caption="An assembly combines a manifest, metadata, IL, and resources whose identities are visible to the runtime." tone="cyan" />; }
export function CtcAssemblyLoadLab() { return <CtcOfficialLab cases={loadCases} caption="Assembly load contexts define dependency identity, sharing, isolation, resolution, and unload boundaries." tone="violet" />; }
export function CtcPluginLifecycleLab() { return <CtcOfficialLab cases={pluginCases} caption="A plugin lifecycle needs compatibility checks, isolated loading, bounded execution, and evidence-based unload." tone="amber" />; }
