import { OfficialGchBookLab } from "./official-gch-book-lab";

const nodes = [
  "术语表"
];

export function GchObjectGraphLab() { return <OfficialGchBookLab mode="graph" unitTitle="术语表" focus="把全书算法、对象图、屏障、并发、调度与度量术语绑定到可检验定义和反例" nodes={nodes} />; }
export function GchScheduleLab() { return <OfficialGchBookLab mode="schedule" unitTitle="术语表" focus="随机抽取术语，要求从对象图、伪代码和观测证据三种形式重述并给出反例" nodes={nodes} />; }
export function GchEvidenceLab() { return <OfficialGchBookLab mode="evidence" unitTitle="术语表" focus="中英术语对照、定义-反例卡、同名异义表、章节回链" nodes={nodes} />; }
