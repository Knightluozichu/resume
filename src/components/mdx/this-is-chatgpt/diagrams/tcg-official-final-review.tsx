import { OfficialTcgLab } from "./official-tcg-lab";

const concepts = ["语料","token","分布","网络权重","意义空间","工具证据"] as const;

export function TcgOfficialFinalReviewMapLab() { return <OfficialTcgLab title="《这就是ChatGPT》全书总复习" concepts={concepts} accent="#be123c" view="map" />; }
export function TcgOfficialFinalReviewProbabilityLab() { return <OfficialTcgLab title="《这就是ChatGPT》全书总复习" concepts={concepts} accent="#be123c" view="probability" />; }
export function TcgOfficialFinalReviewEvidenceLab() { return <OfficialTcgLab title="《这就是ChatGPT》全书总复习" concepts={concepts} accent="#be123c" view="evidence" />; }
