"use client";

import { CvcOfficialLab } from "./official-lab";

const loadCases = [
  { label: "Identity load", fields: [["Input", "AssemblyName"], ["Resolver", "Context policy"], ["Risk", "Unexpected version/context"]] },
  { label: "Path load", fields: [["Input", "Canonical absolute path"], ["Resolver", "Specific AssemblyLoadContext"], ["Risk", "Traversal and dependency universe"]] },
  { label: "Metadata inspect", fields: [["Input", "PE bytes/path"], ["Resolver", "No execution required"], ["Risk", "Malformed/untrusted metadata limits"]] },
  { label: "Collectible", fields: [["Input", "Plugin assembly and resolver"], ["Resolver", "Custom ALC"], ["Risk", "Host roots prevent cooperative unload"]] },
] as const;

const reflectionCases = [
  { label: "Discover type", fields: [["API", "Assembly.DefinedTypes/GetTypes"], ["Question", "Which definitions satisfy contract?"], ["Risk", "Type load/dependency exceptions"]] },
  { label: "Discover member", fields: [["API", "GetMembers/GetMethod plus BindingFlags"], ["Question", "Exact signature/visibility?"], ["Risk", "Inherited, overload, generic ambiguity"]] },
  { label: "Construct", fields: [["API", "Activator/ConstructorInfo/delegate factory"], ["Question", "Which constructor and dependencies?"], ["Risk", "Executes type initializer/user code"]] },
  { label: "Invoke", fields: [["API", "MethodInfo.Invoke or compiled delegate"], ["Question", "Binding/conversion/exception?"], ["Risk", "TargetInvocationException, trimming/AOT"]] },
] as const;

const pluginCases = [
  { label: "Discover", fields: [["Gate", "Static manifest/metadata allowlist"], ["Output", "Candidate id/version/capabilities"], ["Failure", "Reject without execution"]] },
  { label: "Load", fields: [["Gate", "Dependency and contract compatibility"], ["Output", "Isolated runtime type universe"], ["Failure", "Unload context/process"]] },
  { label: "Run", fields: [["Gate", "Lifecycle and health contract"], ["Output", "Typed DTO/message results"], ["Failure", "Cancel, drain, isolate"]] },
  { label: "Unload", fields: [["Gate", "No tasks/events/types/delegates/handles rooted"], ["Output", "WeakReference dead or process exited"], ["Failure", "Escalate to process boundary"]], alert: "AssemblyLoadContext isolates dependency identity, not permissions, crashes, CPU, or native global state." },
] as const;

export function CvcAssemblyLoadLab() { return <CvcOfficialLab cases={loadCases} caption="Identity, path, metadata-only, and collectible loading choose different resolver and execution boundaries." tone="cyan" />; }
export function CvcReflectionBindingLab() { return <CvcOfficialLab cases={reflectionCases} caption="Type/member discovery, construction, and invocation progressively increase execution and compatibility risk." tone="violet" />; }
export function CvcAddinLifecycleLab() { return <CvcOfficialLab cases={pluginCases} caption="A reflective add-in system separates discovery, loading, execution, and evidenced unload." tone="amber" />; }
