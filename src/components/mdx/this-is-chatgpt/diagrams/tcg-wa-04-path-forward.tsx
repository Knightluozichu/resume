import { OfficialTcgLab } from "./official-tcg-lab";

const concepts = ["神经生成","符号计算","工具协议","验证","知识更新","组合系统"] as const;

export function TcgWa04PathForwardMapLab() { return <OfficialTcgLab title="前进之路" concepts={concepts} accent="#1d4ed8" view="map" />; }
export function TcgWa04PathForwardProbabilityLab() { return <OfficialTcgLab title="前进之路" concepts={concepts} accent="#1d4ed8" view="probability" />; }
export function TcgWa04PathForwardEvidenceLab() { return <OfficialTcgLab title="前进之路" concepts={concepts} accent="#1d4ed8" view="evidence" />; }
