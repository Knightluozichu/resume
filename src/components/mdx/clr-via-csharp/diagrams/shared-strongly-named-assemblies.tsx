"use client";

import { CvcOfficialLab } from "./official-lab";

const identityCases = [
  { label: "Simple name", fields: [["Identity", "Assembly name"], ["Deployment", "Usually application-local"], ["Collision", "Resolver/load-context policy decides"]] },
  { label: "Strong name", fields: [["Identity", "Name, version, culture, public key token"], ["Deployment", "Private directory or GAC on .NET Framework"], ["Collision", "Exact identity and policy matter"]] },
  { label: "Authenticode", fields: [["Identity", "Publisher certificate over a file"], ["Deployment", "OS/package trust workflow"], ["Collision", "Does not define CLR type identity"]] },
  { label: "Package", fields: [["Identity", "Package id/version plus content hash/signature"], ["Deployment", "Restore cache then app output"], ["Collision", "Dependency resolver selects graph"]], alert: "A strong name is an identity and integrity mechanism, not proof that code is benevolent or authorized." },
] as const;

const resolutionCases = [
  { label: "Reference", fields: [["Input", "AssemblyRef identity in consumer metadata"], ["Policy", "App/framework configuration and publisher policy"], ["Evidence", "Reference metadata and effective config"]] },
  { label: "Probe", fields: [["Input", "Requested identity and application base"], ["Policy", "GAC, codebase, private paths in Framework-era loader"], ["Evidence", "Fusion/bind log and candidate paths"]] },
  { label: "Load", fields: [["Input", "Selected file"], ["Policy", "Identity/hash/signature checks"], ["Evidence", "Loaded Assembly.FullName and Location"]] },
  { label: "Type use", fields: [["Input", "TypeDef/TypeRef/TypeSpec tokens"], ["Policy", "Resolved defining assembly"], ["Evidence", "Assembly-qualified type and context"]] },
] as const;

const policyCases = [
  { label: "Exact", fields: [["Decision", "Run the referenced version"], ["Owner", "Application and deployed graph"], ["Test", "Cold start with clean machine/cache"]] },
  { label: "Redirect", fields: [["Decision", "Map a version range to one assembly"], ["Owner", "Application configuration"], ["Test", "API/behavior compatibility suite"]] },
  { label: "Publisher", fields: [["Decision", "Vendor-supplied version policy"], ["Owner", "Publisher/admin, Framework-era GAC"], ["Test", "Effective policy plus rollback"]] },
  { label: "Bypass", fields: [["Decision", "Ignore publisher policy when necessary"], ["Owner", "Application/admin"], ["Test", "Incident-specific compatibility proof"]], alert: "Binding policy can make an assembly load; only compatibility testing can show that the application remains correct." },
] as const;

export function CvcAssemblyIdentityLab() { return <CvcOfficialLab cases={identityCases} caption="Simple names, strong names, publisher signatures, and package identities answer different questions." tone="violet" />; }
export function CvcBindingResolutionLab() { return <CvcOfficialLab cases={resolutionCases} caption="Resolution moves from metadata reference through policy and probing to one loaded identity." tone="cyan" />; }
export function CvcPublisherPolicyLab() { return <CvcOfficialLab cases={policyCases} caption="Exact binding, redirects, publisher policy, and bypass all require explicit compatibility evidence." tone="amber" />; }
