"use client";

import { DcsOfficialLab, type OfficialLabCase } from "./official-lab";

const formattingCases: OfficialLabCase[] = [
  { label: "concatenation", fields: [["source", "label + value"], ["typing", "values become strings immediately"], ["culture", "implicit/current formatting"], ["risk", "template/value relation hard to localize"]] },
  { label: "composite", fields: [["source", "string.Format(format, args)"], ["typing", "object arguments and numeric indexes"], ["culture", "provider overload available"], ["risk", "index mismatch and boxing"]] },
  { label: "interpolation", fields: [["source", "$\"{value:N2}\""], ["typing", "compiler preserves expressions during lowering"], ["culture", "target/default decides final formatting"], ["risk", "ordinary string loses typed arguments"]] },
  { label: "structured log", fields: [["source", "named message template plus values"], ["typing", "logging API retains fields"], ["culture", "sink policy"], ["risk", "pre-interpolation destroys structure"]] },
];

export function DcsFormattingEvolutionLab() {
  return <DcsOfficialLab cases={formattingCases} tone="cyan" initial={2} caption="Concatenation、composite、interpolation和structured logging保留的template/type信息逐级不同。" />;
}

const formattableCases: OfficialLabCase[] = [
  { label: "string target", fields: [["target", "string"], ["retained", "final text only"], ["sink", "display now"], ["test", "current culture snapshot"]] },
  { label: "FormattableString", fields: [["target", "FormattableString"], ["retained", "composite format plus object args"], ["sink", "chooses provider later"], ["test", "invariant and two user cultures"]] },
  { label: "IFormattable", fields: [["target", "value formatting contract"], ["retained", "format specifier and provider"], ["sink", "value implements representation"], ["test", "round-trip/machine vs display"]] },
  { label: "handler modern", fields: [["target", "custom interpolated string handler"], ["retained", "target controls append/evaluation"], ["sink", "logging/perf API"], ["test", "disabled path and side-effect expressions"]] },
];

export function DcsFormattableBoundaryLab() {
  return <DcsOfficialLab cases={formattableCases} tone="violet" initial={1} caption="Interpolation的target type决定何时格式化、谁拥有culture，以及是否保留typed arguments。" />;
}

const nameCases: OfficialLabCase[] = [
  { label: "argument", fields: [["old", "\"value\" literal"], ["new", "nameof(value)"], ["rename", "compiler updates symbol reference"], ["limit", "returns simple name, not expression path"]] },
  { label: "property", fields: [["old", "notification name string"], ["new", "nameof(Customer.Name)"], ["rename", "refactor-safe compile reference"], ["limit", "still not a runtime member accessor"]] },
  { label: "type/member", fields: [["old", "manual diagnostic label"], ["new", "nameof(Order.Calculate)"], ["rename", "symbol binding checked"], ["limit", "overload identity/signature omitted"]] },
  { label: "schema", fields: [["old", "external JSON/SQL field"], ["new", "explicit stable protocol name"], ["rename", "must be versioned deliberately"], ["limit", "nameof is wrong for external contract"]] },
];

export function DcsNameofContractLab() {
  return <DcsOfficialLab cases={nameCases} tone="emerald" caption="nameof适合source symbol diagnostics；external schema必须独立version，不能跟随code rename。" />;
}
