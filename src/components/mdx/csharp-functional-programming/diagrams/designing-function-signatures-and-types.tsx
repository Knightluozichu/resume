"use client";

import { CfpOfficialLab } from "./official-lab";

const signatureCases = [
  { label: "bool + out", fields: [["signature", "bool TryParse(string, out T)"], ["information", "Success and value are split across control flow and mutation"]] },
  { label: "nullable", fields: [["signature", "T? Find(...)"], ["information", "Absence may be confused with a valid null/default"]] },
  { label: "Option", fields: [["signature", "Option<T> Find(...)"], ["information", "Some/None is explicit and composable"]] },
  { label: "Either", fields: [["signature", "Either<Error,T> Validate(...)"], ["information", "Failure reason is part of the return type"]] },
] as const;

const unitCases = [
  { label: "void", fields: [["composition", "No value can flow to the next generic function"], ["meaning", "C# statement-style completion"]] },
  { label: "Unit", fields: [["composition", "One explicit value represents successful completion"], ["meaning", "Fits generic pipelines without inventing business data"]] },
  { label: "Action", fields: [["composition", "Delegate returns void"], ["meaning", "Effectful callback shape"]] },
  { label: "Func<Unit>", fields: [["composition", "Delegate returns a value-level completion"], ["meaning", "Can be mapped/bound by generic helpers"]] },
] as const;

const optionCases = [
  { label: "Some", fields: [["state", "A value is present"], ["consumer", "Map/Bind applies without null dereference"]] },
  { label: "None", fields: [["state", "Value is absent by contract"], ["consumer", "Pipeline short-circuits or uses an explicit fallback"]] },
  { label: "null input", fields: [["state", "External nullable representation"], ["consumer", "Adapter decides whether it becomes None or invalid input"]] },
  { label: "fallback", fields: [["state", "Consumer chooses default/error"], ["consumer", "Absence policy is delayed to the owning boundary"]] },
] as const;

export function CfpSignatureInformationLab() {
  return <CfpOfficialLab cases={signatureCases} caption="A function signature should expose success, absence, and failure information instead of leaking it through hidden channels." tone="cyan" />;
}

export function CfpUnitCompositionLab() {
  return <CfpOfficialLab cases={unitCases} caption="Unit turns successful no-data completion into a value that generic composition can carry." tone="violet" />;
}

export function CfpOptionFlowLab() {
  return <CfpOfficialLab cases={optionCases} caption="Option keeps absence explicit until a consumer boundary owns fallback or error policy." tone="emerald" />;
}
