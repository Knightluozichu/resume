import { OfficialKia1BookLab } from "./official-kia1-book-lab";

const nodes = [
  "索引",
  "插图清单",
  "表格清单",
  "代码清单"
];

export function Kia1StructureLab() { return <OfficialKia1BookLab mode="structure" unitTitle="索引与图表代码清单" focus="把索引、插图、表格和代码清单作为反向检索入口，验证概念是否能定位到定义、调用点和证据" nodes={nodes} />; }
export function Kia1ExecutionLab() { return <OfficialKia1BookLab mode="execution" unitTitle="索引与图表代码清单" focus="把参考清单视为可忽略附属物，导致只能顺序阅读而无法从问题反查机制与示例" nodes={nodes} />; }
export function Kia1EvidenceLab() { return <OfficialKia1BookLab mode="evidence" unitTitle="索引与图表代码清单" focus="术语索引、插图定位、表格定位、代码清单定位和跨章检索任务" nodes={nodes} />; }
