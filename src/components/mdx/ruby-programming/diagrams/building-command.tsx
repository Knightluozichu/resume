"use client";

import { RubyOfficialLab } from "./official-lab";

const argvCases = [
  { label: "No args", fields: [["ARGV", "[]"], ["Decision", "Show usage or use an explicit default"], ["Status", "0 for help, nonzero for invalid invocation"]] },
  { label: "One file", fields: [["ARGV", "[\"notes.txt\"]"], ["Owner", "CLI validates and opens the path"], ["Status", "Reflect read/processing success"]] },
  { label: "Pattern + file", fields: [["ARGV", "[\"error\", \"app.log\"]"], ["Parse", "Assign pattern before path"], ["Risk", "A missing position must not become nil silently"]] },
  { label: "stdin", fields: [["ARGV", "[\"-\"]"], ["Input", "Read standard input instead of a path"], ["Pipeline", "Keep data on stdout and diagnostics on stderr"]] },
] as const;

const readCases = [
  { label: "File.read", fields: [["Memory", "Entire file as one String"], ["Best for", "Small bounded inputs"], ["Cleanup", "Open/read/close managed by the call"]] },
  { label: "File.foreach", fields: [["Memory", "One line at a time"], ["Best for", "Large text and filters"], ["Cleanup", "Enumerator/block closes the file"]] },
  { label: "File.open block", fields: [["Memory", "Controlled by reads inside the block"], ["Best for", "Several operations on one handle"], ["Cleanup", "Ensure close when block exits"]] },
  { label: "STDIN.each_line", fields: [["Memory", "Streaming lines"], ["Best for", "Shell pipelines"], ["Cleanup", "Process owns stdin but normally does not close it"]] },
] as const;

const boundaryCases = [
  { label: "Method", fields: [["Input", "Explicit pattern and enumerable lines"], ["Output", "Matches or an Enumerator"], ["Test", "No dependency on global ARGV"]] },
  { label: "require", fields: [["Input", "Feature name"], ["Behavior", "Load once through $LOAD_PATH"], ["Output", "true when loaded, false when already loaded"]] },
  { label: "require_relative", fields: [["Input", "Path relative to the current source file"], ["Behavior", "Stable across working directories"], ["Use", "Small same-project file composition"]] },
  { label: "CLI adapter", fields: [["Input", "ARGV, stdin, stdout, stderr"], ["Behavior", "Parse, call domain method, map errors"], ["Output", "Exit status"]], alert: "Keep command-line state at the edge so the text-processing method can be tested without spawning a process." },
] as const;

export function RubyArgvContractLab() {
  return <RubyOfficialLab cases={argvCases} caption="A command contract maps argument shapes to input ownership, output channels, and exit status." tone="cyan" />;
}

export function RubyFileReadLab() {
  return <RubyOfficialLab cases={readCases} caption="Whole-file, line-stream, explicit-handle, and stdin reads have different memory and cleanup behavior." tone="emerald" />;
}

export function RubyCommandBoundaryLab() {
  return <RubyOfficialLab cases={boundaryCases} caption="A narrow CLI adapter calls testable methods and loads dependencies from source-relative or configured paths." tone="violet" />;
}
