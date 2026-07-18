"use client";

import { CvcOfficialLab } from "./official-lab";

const memberCases = [
  { label: "Constant/field", fields: [["Role", "Named compile-time value or stored state"], ["Dispatch", "Constants are substituted; fields are accessed"], ["Version risk", "Public const value can be baked into consumers"]] },
  { label: "Method", fields: [["Role", "Behavior and transitions"], ["Dispatch", "Static, nonvirtual, virtual, interface"], ["Version risk", "Signature and virtual-slot changes"]] },
  { label: "Property/event", fields: [["Role", "Accessor protocol or notification subscription"], ["Dispatch", "Accessor methods"], ["Version risk", "Adding behavior/raising semantics"]] },
  { label: "Nested type", fields: [["Role", "Type scoped by another type"], ["Dispatch", "Own runtime type identity"], ["Version risk", "Visibility and generic nesting"]] },
] as const;

const accessCases = [
  { label: "public", fields: [["Audience", "Every referencing assembly"], ["Promise", "Long-lived compatibility surface"], ["Test", "External consumer binary/source tests"]] },
  { label: "internal", fields: [["Audience", "Defining assembly"], ["Promise", "Assembly implementation boundary"], ["Test", "Internal architecture tests"]] },
  { label: "protected", fields: [["Audience", "Derived-type implementations"], ["Promise", "Subclassing/versioning contract"], ["Test", "External derived-type tests"]] },
  { label: "friend", fields: [["Audience", "Named assembly via InternalsVisibleTo"], ["Promise", "Privileged coupling"], ["Test", "Exact strong-name identity and abuse review"]], alert: "Protected often creates a larger long-term contract than public consumption because derived code can depend on implementation sequencing." },
] as const;

const dispatchCases = [
  { label: "Static", fields: [["Selected by", "Compile-time declaring type/signature"], ["Slot", "No instance virtual slot"], ["Versioning", "Adding overloads can affect source rebinding"]] },
  { label: "Nonvirtual", fields: [["Selected by", "Compile-time member reference"], ["Slot", "Direct call to declaring implementation"], ["Versioning", "Hiding is not overriding"]] },
  { label: "Virtual", fields: [["Selected by", "Runtime type and virtual slot"], ["Slot", "Base declaration defines contract"], ["Versioning", "New virtual calls may reach old derived code"]] },
  { label: "Interface", fields: [["Selected by", "Runtime interface implementation mapping"], ["Slot", "Interface contract/member map"], ["Versioning", "Implementation and default member rules"]], alert: "Changing a nonvirtual member to virtual is a semantic and binary design change, not a harmless optimization." },
] as const;

export function CvcMemberKindsLab() { return <CvcOfficialLab cases={memberCases} caption="Stored state, behavior, access protocols, notifications, and nested types create different compatibility obligations." tone="cyan" />; }
export function CvcAccessibilityLab() { return <CvcOfficialLab cases={accessCases} caption="Visibility selects an audience; every wider audience creates a longer-lived contract." tone="emerald" />; }
export function CvcVirtualDispatchLab() { return <CvcOfficialLab cases={dispatchCases} caption="Static, nonvirtual, virtual, and interface calls bind at different phases and version differently." tone="violet" />; }
