"use client";

import { RubyOfficialLab } from "./official-lab";

const classCases = [
  { label: "new", fields: [["Dispatch", "Class#new allocates then calls initialize"], ["Result", "A new instance"], ["Boundary", "Constructor validates initial invariants"]] },
  { label: "instance", fields: [["State", "@variables belong to one receiver"], ["Behavior", "Instance methods read/write that state"], ["Exposure", "Accessors are API, not automatic fields"]] },
  { label: "self", fields: [["Meaning", "Current receiver"], ["Class body", "The class object"], ["Method body", "The object receiving the call"]] },
  { label: "visibility", fields: [["public", "Normal external API"], ["protected", "Restricted receiver-style collaboration"], ["private", "Implicit-receiver implementation detail"]] },
] as const;

const lookupCases = [
  { label: "prepend", fields: [["Position", "Before the class in lookup"], ["Use", "Wrappers/instrumentation with super"], ["Risk", "Implicit behavior interception"]] },
  { label: "class", fields: [["Position", "Class's own methods"], ["Use", "Primary behavior"], ["Change", "Reopening replaces/adds methods globally"]] },
  { label: "include", fields: [["Position", "Modules after the class"], ["Use", "Instance-method mixin"], ["State", "Methods operate on receiver state"]] },
  { label: "superclass", fields: [["Position", "After included modules"], ["Use", "Inherited behavior"], ["Rule", "super continues lookup with current arguments unless changed"]] },
] as const;

const moduleCases = [
  { label: "Namespace", fields: [["Code", "Billing::Invoice"], ["Role", "Group constants and avoid collisions"], ["Load", "File/loading convention must match names"]] },
  { label: "include", fields: [["Target", "Instances of the receiving class"], ["Effect", "Adds module to instance lookup chain"], ["Inspect", "Class#ancestors"]] },
  { label: "extend", fields: [["Target", "One object"], ["Effect", "Adds module methods to its singleton class"], ["Class use", "Extending a class creates class-level methods"]] },
  { label: "Duck type", fields: [["Question", "Does it support the required messages?"], ["Contract", "Behavior, results, errors, and side effects"], ["Test", "Use multiple independent implementations"]], alert: "respond_to? is only a shallow hint; the real protocol includes semantics, not merely method names." },
] as const;

export function RubyClassConstructionLab() {
  return <RubyOfficialLab cases={classCases} caption="Construction establishes invariants; instance state, self, accessors, and visibility define the object's public boundary." tone="cyan" />;
}

export function RubyMethodLookupLab() {
  return <RubyOfficialLab cases={lookupCases} caption="Method lookup walks prepend, class, included modules, and superclasses; reopen and super modify this chain deliberately." tone="violet" />;
}

export function RubyModuleProtocolLab() {
  return <RubyOfficialLab cases={moduleCases} caption="Modules provide namespaces and reusable behavior; include, extend, and duck-typed protocols solve different composition problems." tone="emerald" />;
}
