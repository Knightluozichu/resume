"use client";

import { RubyOfficialLab } from "./official-lab";

const objectCases = [
  { label: "Object", fields: [["Has", "Identity, state, and a class"], ["Receives", "Method messages"], ["Inspect", "object.class and object.object_id"]] },
  { label: "Class", fields: [["Role", "Constructs instances and owns instance methods"], ["Relation", "A Class object itself"], ["Inspect", "klass.superclass and klass.ancestors"]] },
  { label: "Reference", fields: [["Assignment", "Copies an object reference"], ["Mutation", "Visible through every shared reference"], ["Rebinding", "Changes only one variable binding"]] },
  { label: "Equality", fields: [["==", "Value-level equality chosen by the class"], ["eql?", "Hash-key-oriented equality"], ["equal?", "Object identity"]] },
] as const;

const variableCases = [
  { label: "local", fields: [["Form", "name"], ["Scope", "Lexical local scope"], ["Uninitialized", "May parse as a method call rather than a local"]] },
  { label: "@instance", fields: [["Owner", "One object"], ["Access", "Instance methods of that object"], ["Uninitialized", "nil with a warning in verbose mode"]] },
  { label: "@@class", fields: [["Owner", "Shared through a class hierarchy"], ["Risk", "Surprising cross-subclass coupling"], ["Alternative", "Class-instance variable"]] },
  { label: "$global", fields: [["Owner", "Process-wide global namespace"], ["Risk", "Hidden dependency and shared mutation"], ["Alternative", "Explicit argument or object"]] },
] as const;

const assignmentCases = [
  { label: "Parallel", fields: [["Code", "a, b = 1, 2"], ["Evaluation", "Right-hand values first"], ["Result", "a=1, b=2"]] },
  { label: "Swap", fields: [["Code", "left, right = right, left"], ["Temporary", "No manual variable needed"], ["Result", "References exchanged"]] },
  { label: "Splat", fields: [["Code", "head, *rest = values"], ["Result", "First value plus an Array remainder"], ["Missing", "head=nil when values is empty"]] },
  { label: "Ignore", fields: [["Code", "first, = values"], ["Intent", "Take one value without retaining the tail"], ["Rule", "Document shape assumptions"]], alert: "Destructuring is convenient, but missing positions become nil and extra positions may be discarded." },
] as const;

export function RubyObjectClassLab() {
  return <RubyOfficialLab cases={objectCases} caption="Objects carry identity and class; assignments copy references, while equality methods answer different questions." tone="cyan" />;
}

export function RubyVariableScopeLab() {
  return <RubyOfficialLab cases={variableCases} caption="Variable prefixes reveal owner and scope; class and global variables widen coupling dramatically." tone="violet" />;
}

export function RubyMultipleAssignmentLab() {
  return <RubyOfficialLab cases={assignmentCases} caption="Multiple assignment evaluates the right side, then distributes values with explicit missing and extra-value behavior." tone="amber" />;
}
