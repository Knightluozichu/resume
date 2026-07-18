import { OfficialTcgLab } from "./official-tcg-lab";

const concepts = ["感知任务","特征","手写数字","决策边界","类人表现","经验规律"] as const;

export function TcgMain04HumanLikeTasksMapLab() { return <OfficialTcgLab title="面向类人任务的模型" concepts={concepts} accent="#0f766e" view="map" />; }
export function TcgMain04HumanLikeTasksProbabilityLab() { return <OfficialTcgLab title="面向类人任务的模型" concepts={concepts} accent="#0f766e" view="probability" />; }
export function TcgMain04HumanLikeTasksEvidenceLab() { return <OfficialTcgLab title="面向类人任务的模型" concepts={concepts} accent="#0f766e" view="evidence" />; }
