import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "11. Maps",
  "Creating a Map",
  "Accessing Map Values",
  "Adding Entries to a Map",
  "Modifying Map Values",
  "Challenge: Tavern Bouncer"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="11. Maps" focus="用键值合同创建、读取、添加和修改Map，并区分缺键与可空值" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="11. Maps" focus="用get返回null同时表示缺键和实际空值，掩盖数据状态" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="11. Maps" focus="键空间说明、缺键样例、更新前后快照、守卫规则与断言" nodes={nodes} />; }
