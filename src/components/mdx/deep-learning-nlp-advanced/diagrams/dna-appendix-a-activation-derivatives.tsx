"use client";

import { OfficialNlpLab } from "./official-nlp-lab";

const concepts = [
  "附录A sigmoid函数和tanh函数的导数",
  "A.1 sigmoid函数",
  "A.2 tanh函数",
  "A.3 小结",
] as const;

export function DnaAppendixAActivationDerivativesMapLab() {
  return (
    <OfficialNlpLab
      title="附录A sigmoid函数和tanh函数的导数"
      concepts={concepts}
      accent="#15803d"
      view="map"
    />
  );
}

export function DnaAppendixAActivationDerivativesExperimentLab() {
  return (
    <OfficialNlpLab
      title="附录A sigmoid函数和tanh函数的导数"
      concepts={concepts}
      accent="#15803d"
      view="experiment"
    />
  );
}

export function DnaAppendixAActivationDerivativesEvidenceLab() {
  return (
    <OfficialNlpLab
      title="附录A sigmoid函数和tanh函数的导数"
      concepts={concepts}
      accent="#15803d"
      view="evidence"
    />
  );
}
