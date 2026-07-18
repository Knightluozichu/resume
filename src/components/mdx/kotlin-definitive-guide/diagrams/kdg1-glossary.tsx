import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "Glossary"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="Glossary" focus="建立Kotlin 1.2术语到定义、反例、代码位置和相关章节的双向索引" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="Glossary" focus="背诵名词却不能用代码区分相邻概念" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="Glossary" focus="术语卡、定义来源、反例、章节链接和歧义清单" nodes={nodes} />; }
