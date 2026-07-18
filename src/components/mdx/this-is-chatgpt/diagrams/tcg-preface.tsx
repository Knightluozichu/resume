import { OfficialTcgLab } from "./official-tcg-lab";

const concepts = ["大语言模型","合理续写","解释尺度","2023年语境","可运行示例","论证边界"] as const;

export function TcgPrefaceMapLab() { return <OfficialTcgLab title="前言" concepts={concepts} accent="#b45309" view="map" />; }
export function TcgPrefaceProbabilityLab() { return <OfficialTcgLab title="前言" concepts={concepts} accent="#b45309" view="probability" />; }
export function TcgPrefaceEvidenceLab() { return <OfficialTcgLab title="前言" concepts={concepts} accent="#b45309" view="evidence" />; }
