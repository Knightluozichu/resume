"use client";
import { OfficialRlLab } from "./official-rl-lab";
const concepts = ["附录B n-step TD方法"] as const;
export function DlrAppendixBNstepTdMapLab() {
  return (
    <OfficialRlLab
      title="附录B n-step TD方法"
      concepts={concepts}
      accent="#d97706"
      view="map"
    />
  );
}
export function DlrAppendixBNstepTdExperimentLab() {
  return (
    <OfficialRlLab
      title="附录B n-step TD方法"
      concepts={concepts}
      accent="#d97706"
      view="experiment"
    />
  );
}
export function DlrAppendixBNstepTdEvidenceLab() {
  return (
    <OfficialRlLab
      title="附录B n-step TD方法"
      concepts={concepts}
      accent="#d97706"
      view="evidence"
    />
  );
}
