import { OfficialTcgLab } from "./official-tcg-lab";

const concepts = ["意义空间","特征轨迹","类比","局部方向","语义运动","表示选择"] as const;

export function TcgMain14MeaningSpaceMapLab() { return <OfficialTcgLab title="意义空间与语义运动定律" concepts={concepts} accent="#0f766e" view="map" />; }
export function TcgMain14MeaningSpaceProbabilityLab() { return <OfficialTcgLab title="意义空间与语义运动定律" concepts={concepts} accent="#0f766e" view="probability" />; }
export function TcgMain14MeaningSpaceEvidenceLab() { return <OfficialTcgLab title="意义空间与语义运动定律" concepts={concepts} accent="#0f766e" view="evidence" />; }
