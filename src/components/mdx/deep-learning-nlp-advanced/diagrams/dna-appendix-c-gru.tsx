"use client";

import { OfficialNlpLab } from "./official-nlp-lab";

const concepts = ["附录C GRU", "C.1 GRU的接口", "C.2 GRU的计算图"] as const;

export function DnaAppendixCGruMapLab() {
  return (
    <OfficialNlpLab
      title="附录C GRU"
      concepts={concepts}
      accent="#4338ca"
      view="map"
    />
  );
}

export function DnaAppendixCGruExperimentLab() {
  return (
    <OfficialNlpLab
      title="附录C GRU"
      concepts={concepts}
      accent="#4338ca"
      view="experiment"
    />
  );
}

export function DnaAppendixCGruEvidenceLab() {
  return (
    <OfficialNlpLab
      title="附录C GRU"
      concepts={concepts}
      accent="#4338ca"
      view="evidence"
    />
  );
}
