import { OfficialTcgLab } from "./official-tcg-lab";

const concepts = ["语言规律","压缩","统计结构","可计算性","涌现","科学发现"] as const;

export function TcgMain13WhatLetsItWorkMapLab() { return <OfficialTcgLab title="真正让ChatGPT工作的是什么" concepts={concepts} accent="#4d7c0f" view="map" />; }
export function TcgMain13WhatLetsItWorkProbabilityLab() { return <OfficialTcgLab title="真正让ChatGPT工作的是什么" concepts={concepts} accent="#4d7c0f" view="probability" />; }
export function TcgMain13WhatLetsItWorkEvidenceLab() { return <OfficialTcgLab title="真正让ChatGPT工作的是什么" concepts={concepts} accent="#4d7c0f" view="evidence" />; }
