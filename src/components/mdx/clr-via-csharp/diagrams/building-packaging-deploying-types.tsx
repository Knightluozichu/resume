"use client";

import { CvcOfficialLab } from "./official-lab";

const artifactCases = [
  { label: "Module", fields: [["Contains", "PE header, CLR header, metadata, IL"], ["Identity", "Module name and MVID"], ["Inspect", "Metadata tables and method bodies"]] },
  { label: "Manifest", fields: [["Contains", "Assembly definition, files, references, resources"], ["Identity", "Name, version, culture, public key"], ["Inspect", "AssemblyRef, File, ManifestResource"]] },
  { label: "Resource", fields: [["Contains", "Embedded or linked non-code payload"], ["Identity", "Manifest resource name and culture policy"], ["Inspect", "Build action and resource stream"]] },
  { label: "Deployment", fields: [["Contains", "Assemblies, config, native assets, data"], ["Identity", "Application-local dependency set"], ["Inspect", "Output tree, deps/runtimeconfig, hashes"]], alert: "A source project is not the deployable contract; the output artifact graph is." },
] as const;

const versionCases = [
  { label: "AssemblyVersion", fields: [["Purpose", "Runtime identity in .NET Framework binding"], ["Change", "Compatibility/binding decision"], ["Risk", "Consumers may need redirect or rebuild"]] },
  { label: "FileVersion", fields: [["Purpose", "File diagnostics and servicing inventory"], ["Change", "Can track every build"], ["Risk", "Not the managed reference identity"]] },
  { label: "Informational", fields: [["Purpose", "Product/SemVer/commit display"], ["Change", "Release metadata"], ["Risk", "Do not use as loader policy"]] },
  { label: "Culture", fields: [["Purpose", "Localized resource identity"], ["Change", "Culture-specific satellite"], ["Risk", "Fallback/base-name mismatch"]] },
] as const;

const deploymentCases = [
  { label: "Build", fields: [["Gate", "Compiler and linker succeed reproducibly"], ["Evidence", "Inputs, options, references, deterministic hash"], ["Rollback", "Rebuild previous immutable source"]] },
  { label: "Package", fields: [["Gate", "Manifest matches every file/resource"], ["Evidence", "Artifact inventory, signatures, SBOM"], ["Rollback", "Select previous immutable package"]] },
  { label: "Configure", fields: [["Gate", "Environment values are valid and scoped"], ["Evidence", "Schema validation, effective configuration"], ["Rollback", "Restore versioned config"]] },
  { label: "Activate", fields: [["Gate", "Health and compatibility checks pass"], ["Evidence", "Startup, dependency, and smoke traces"], ["Rollback", "Atomic switch to previous release"]], alert: "Private deployment simplifies copying, but it does not remove version, configuration, or rollback design." },
] as const;

export function CvcArtifactAnatomyLab() { return <CvcOfficialLab cases={artifactCases} caption="Modules, manifests, resources, and deployment output expose different identities and inspection points." tone="cyan" />; }
export function CvcVersionIdentityLab() { return <CvcOfficialLab cases={versionCases} caption="Assembly, file, informational, and culture versions serve different consumers." tone="amber" />; }
export function CvcPrivateDeploymentLab() { return <CvcOfficialLab cases={deploymentCases} caption="A private deployment is trustworthy only when build, package, configuration, activation, and rollback are evidenced." tone="emerald" />; }
