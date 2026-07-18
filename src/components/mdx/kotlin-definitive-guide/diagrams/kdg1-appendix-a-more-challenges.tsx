import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "A. More Challenges",
  "Leveling Up with Exercism"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="A. More Challenges" focus="把附加挑战拆成可判定输入、约束、实现、反例与回归测试，并连接Exercism练习" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="A. More Challenges" focus="只提交能通过一个样例的代码，没有边界和反例" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="A. More Challenges" focus="挑战清单、约束表、失败测试、复杂度说明和复盘记录" nodes={nodes} />; }
