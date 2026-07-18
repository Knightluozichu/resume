import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "16. Interfaces and Abstract Classes",
  "Defining an Interface",
  "Implementing an Interface",
  "Default Implementations",
  "Abstract Classes",
  "Combat in NyetHack"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="16. Interfaces and Abstract Classes" focus="用接口表达能力合同，用抽象类共享受控状态，并通过默认实现组合战斗行为" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="16. Interfaces and Abstract Classes" focus="把接口当数据容器或用抽象基类强迫无关类型共享状态" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="16. Interfaces and Abstract Classes" focus="能力关系图、默认实现、抽象状态说明、替身实现与战斗测试" nodes={nodes} />; }
