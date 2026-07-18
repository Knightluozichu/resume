import { OfficialTcgLab } from "./official-tcg-lab";

const concepts = ["数学","事实知识","数据查询","可视化","多步工具","失败分类"] as const;

export function TcgWa03MoreExamplesMapLab() { return <OfficialTcgLab title="更多示例" concepts={concepts} accent="#b45309" view="map" />; }
export function TcgWa03MoreExamplesProbabilityLab() { return <OfficialTcgLab title="更多示例" concepts={concepts} accent="#b45309" view="probability" />; }
export function TcgWa03MoreExamplesEvidenceLab() { return <OfficialTcgLab title="更多示例" concepts={concepts} accent="#b45309" view="evidence" />; }
