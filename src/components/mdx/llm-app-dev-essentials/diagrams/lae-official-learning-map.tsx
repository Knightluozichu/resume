import { OfficialLaeLab } from "./official-lae-lab";

const concepts = ["目录分母","版本合同","模型机制","API合同","应用边界","工具增强"] as const;

export function LaeOfficialLearningMapPipelineLab() { return <OfficialLaeLab title="《大模型应用开发极简入门》权威学习地图" concepts={concepts} accent="#0f766e" view="pipeline" />; }
export function LaeOfficialLearningMapRequestLab() { return <OfficialLaeLab title="《大模型应用开发极简入门》权威学习地图" concepts={concepts} accent="#0f766e" view="request" />; }
export function LaeOfficialLearningMapRiskLab() { return <OfficialLaeLab title="《大模型应用开发极简入门》权威学习地图" concepts={concepts} accent="#0f766e" view="risk" />; }
