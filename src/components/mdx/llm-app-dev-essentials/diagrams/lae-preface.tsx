import { OfficialLaeLab } from "./official-lae-lab";

const concepts = ["适用读者","Python前提","代码示例","版本语境","责任边界","学习证据"] as const;

export function LaePrefacePipelineLab() { return <OfficialLaeLab title="前言" concepts={concepts} accent="#b45309" view="pipeline" />; }
export function LaePrefaceRequestLab() { return <OfficialLaeLab title="前言" concepts={concepts} accent="#b45309" view="request" />; }
export function LaePrefaceRiskLab() { return <OfficialLaeLab title="前言" concepts={concepts} accent="#b45309" view="risk" />; }
