import { OfficialTcgLab } from "./official-tcg-lab";

const concepts = ["来源","代码资源","GPT-2示例","版本记录","引用","独立复现"] as const;

export function TcgThanksAdditionalResourcesMapLab() { return <OfficialTcgLab title="致谢与补充资源" concepts={concepts} accent="#be123c" view="map" />; }
export function TcgThanksAdditionalResourcesProbabilityLab() { return <OfficialTcgLab title="致谢与补充资源" concepts={concepts} accent="#be123c" view="probability" />; }
export function TcgThanksAdditionalResourcesEvidenceLab() { return <OfficialTcgLab title="致谢与补充资源" concepts={concepts} accent="#be123c" view="evidence" />; }
