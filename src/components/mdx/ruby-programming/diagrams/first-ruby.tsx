"use client";

import { RubyOfficialLab } from "./official-lab";

const executionCases = [
  { label: "ruby file.rb", fields: [["Input", "A complete source file"], ["Lifecycle", "Parse, evaluate top level, then exit"], ["Best for", "Repeatable programs and tests"]] },
  { label: "ruby -e", fields: [["Input", "Source passed on the command line"], ["Lifecycle", "Evaluate one short program"], ["Best for", "Small probes and shell pipelines"]] },
  { label: "irb", fields: [["Input", "Expressions entered interactively"], ["Lifecycle", "Read, evaluate, print, repeat"], ["Best for", "Inspecting values and methods"]] },
  { label: "require", fields: [["Input", "A feature name on the load path"], ["Lifecycle", "Load once and record the feature"], ["Best for", "Composing programs from libraries"]], alert: "IRB prints expression values automatically; a Ruby file does not. Use puts or p when output is part of the program." },
] as const;

const objectCases = [
  { label: "String", fields: [["Receiver", "\"Ruby\""], ["Message", "length"], ["Result", "4, an Integer object"]] },
  { label: "Integer", fields: [["Receiver", "12"], ["Message", "even?"], ["Result", "true, a boolean object"]] },
  { label: "Array", fields: [["Receiver", "[1, 2, 3]"], ["Message", "first"], ["Result", "1; the array remains available"]] },
  { label: "Variable", fields: [["Binding", "name = \"Ruby\""], ["Meaning", "name refers to an object"], ["Rebind", "name = 23 changes the reference"]] },
] as const;

const controlCases = [
  { label: "if", fields: [["Condition", "score >= 60"], ["Body", "Runs only when the condition is truthy"], ["Value", "The selected branch result"]] },
  { label: "while", fields: [["Condition", "Checked before each iteration"], ["State", "The body must make progress"], ["Stop", "Condition becomes false or break runs"]] },
  { label: "times", fields: [["Receiver", "3"], ["Block", "Runs with indices 0, 1, 2"], ["Intent", "Repeat a known number of times"]] },
  { label: "falsey", fields: [["False", "false"], ["Absent", "nil"], ["Everything else", "Truthy, including 0 and empty strings"]], alert: "Do not import C-style truth rules: 0 is truthy in Ruby." },
] as const;

export function RubyExecutionModeLab() {
  return <RubyOfficialLab cases={executionCases} caption="File execution, command-line probes, IRB, and require have different output and loading contracts." tone="cyan" />;
}

export function RubyObjectMessageLab() {
  return <RubyOfficialLab cases={objectCases} caption="Ruby evaluates programs as objects receiving messages; variables hold references and can be rebound." tone="violet" />;
}

export function RubyFirstControlLab() {
  return <RubyOfficialLab cases={controlCases} caption="if, while, and times express three different control intents and all obey Ruby truth semantics." tone="amber" />;
}
