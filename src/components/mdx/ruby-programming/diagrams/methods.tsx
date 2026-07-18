"use client";

import { RubyOfficialLab } from "./official-lab";

const callCases = [
  { label: "Simple", fields: [["Code", "receiver.method(arg)"], ["Lookup", "Starts from the receiver's class/ancestors"], ["Result", "Method's final expression or explicit return"]] },
  { label: "Implicit self", fields: [["Code", "method(arg)"], ["Receiver", "Current self"], ["Risk", "A local variable with the same name changes parsing"]] },
  { label: "With block", fields: [["Code", "items.map { |item| ... }"], ["Transfer", "Method may yield values to the block"], ["Result", "Defined by the called method"]] },
  { label: "Operator", fields: [["Code", "left + right"], ["Dispatch", "Equivalent in spirit to left.+(right)"], ["Rule", "Precedence still belongs to Ruby syntax"]] },
] as const;

const kindCases = [
  { label: "Instance", fields: [["Definition", "def process"], ["Receiver", "An instance"], ["State", "Can access that receiver's instance variables"]] },
  { label: "Class", fields: [["Definition", "def self.build"], ["Receiver", "The class object"], ["State", "Class object's instance variables"]] },
  { label: "Functional", fields: [["Call", "puts value"], ["Receiver", "Implicit self"], ["Visibility", "Often private methods from Kernel"]] },
  { label: "Singleton", fields: [["Definition", "def object.label"], ["Receiver", "Only that one object"], ["Use", "Narrow adaptation; avoid hidden per-object complexity"]] },
] as const;

const parameterCases = [
  { label: "Required", fields: [["Form", "def run(input)"], ["Missing", "ArgumentError"], ["Use", "Essential dependency"]] },
  { label: "Optional", fields: [["Form", "def run(limit = 10)"], ["Evaluation", "Default evaluated at call time"], ["Use", "One stable default"]] },
  { label: "Rest", fields: [["Form", "def run(*inputs)"], ["Value", "Array of remaining positional arguments"], ["Risk", "Can hide accidental arity changes"]] },
  { label: "Keyword", fields: [["Form", "def run(limit: 10, strict: false)"], ["Meaning", "Named policy inputs"], ["Boundary", "Ruby version affects Hash/keyword conversion"]], alert: "Method signatures are executable contracts: reject unknown shape early instead of accepting every argument form." },
] as const;

export function RubyMethodCallLab() {
  return <RubyOfficialLab cases={callCases} caption="Simple, implicit, block, and operator calls all perform method dispatch but expose different syntax and control transfer." tone="cyan" />;
}

export function RubyMethodKindsLab() {
  return <RubyOfficialLab cases={kindCases} caption="Instance, class, functional-style, and singleton methods differ primarily in receiver ownership and visibility." tone="violet" />;
}

export function RubyMethodParametersLab() {
  return <RubyOfficialLab cases={parameterCases} caption="Required, optional, rest, and keyword parameters communicate different input-shape guarantees." tone="amber" />;
}
