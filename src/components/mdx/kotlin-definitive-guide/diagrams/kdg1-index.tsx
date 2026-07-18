import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "Index"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="Index" focus="用问题、符号、概念关系和章节定位来检索全书，而不是线性翻找关键词" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="Index" focus="把同名API命中当成语义答案，忽略版本和上下文" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="Index" focus="问题索引、符号索引、关系图、章节反向链接和检索测试" nodes={nodes} />; }
