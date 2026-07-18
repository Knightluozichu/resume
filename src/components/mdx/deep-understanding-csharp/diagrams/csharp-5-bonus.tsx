"use client";

import { DcsOfficialLab, type OfficialLabCase } from "./official-lab";

const captureCases: OfficialLabCase[] = [
  { label: "old foreach", fields: [["storage", "one iteration variable outside logical loop body"], ["closures", "all delegates capture same storage"], ["result", "after loop they observe final value"], ["repair", "copy into body-local variable"]] },
  { label: "C# 5 foreach", fields: [["storage", "fresh iteration variable per iteration"], ["closures", "each delegate captures distinct storage"], ["result", "values match iterations"], ["repair", "still review captured object mutability"]] },
  { label: "for loop", fields: [["storage", "one loop variable for the loop"], ["closures", "delegates capture same variable"], ["result", "often final index"], ["repair", "make body-local copy"]] },
  { label: "mutable item", fields: [["storage", "iteration variable distinct, referenced object shared"], ["closures", "each captures reference value"], ["result", "later object mutation remains visible"], ["repair", "capture immutable snapshot if required"]] },
];

export function DcsForeachCaptureLab() {
  return <DcsOfficialLab cases={captureCases} tone="violet" initial={1} caption="C# 5改变foreach iteration-variable storage；for loop和captured object mutability仍需单独推导。" />;
}

const callerCases: OfficialLabCase[] = [
  { label: "member", fields: [["attribute", "CallerMemberName"], ["compiler input", "calling member name"], ["emitted", "optional string argument"], ["limit", "caller can pass another value explicitly"]] },
  { label: "file", fields: [["attribute", "CallerFilePath"], ["compiler input", "source file path"], ["emitted", "string in caller binary"], ["limit", "privacy/path normalization concerns"]] },
  { label: "line", fields: [["attribute", "CallerLineNumber"], ["compiler input", "source line"], ["emitted", "integer argument"], ["limit", "rebuild changes line; not runtime stack"]] },
  { label: "expression", fields: [["attribute", "CallerArgumentExpression (modern update)"], ["compiler input", "source expression text"], ["emitted", "string argument"], ["limit", "not part of original C# 5 feature"]] },
];

export function DcsCallerInfoLab() {
  return <DcsOfficialLab cases={callerCases} tone="cyan" caption="Caller information由caller compiler填入optional arguments，不是callee在runtime读取stack。" />;
}

const diagnosticCases: OfficialLabCase[] = [
  { label: "property notify", fields: [["use", "avoid repeating property-name string"], ["trust", "compiler-provided convenience"], ["test", "rename and explicit override"], ["risk", "wrong forwarding helper member name"]] },
  { label: "logging", fields: [["use", "add source context to diagnostic event"], ["trust", "supplement, not identity/authentication"], ["test", "release build and path redaction"], ["risk", "high-cardinality or secret file paths"]] },
  { label: "guard", fields: [["use", "modern argument expression for message"], ["trust", "display-only source text"], ["test", "complex expression and explicit value"], ["risk", "treating expression string as stable schema"]] },
  { label: "forwarding", fields: [["use", "helper passes original caller context"], ["trust", "must expose optional caller-info parameters"], ["test", "one and two wrapper layers"], ["risk", "callee records wrapper instead of origin"]] },
];

export function DcsDiagnosticProvenanceLab() {
  return <DcsOfficialLab cases={diagnosticCases} tone="emerald" caption="Caller info适合diagnostic provenance，不适合作为security identity、stable schema或runtime stack替代。" />;
}
