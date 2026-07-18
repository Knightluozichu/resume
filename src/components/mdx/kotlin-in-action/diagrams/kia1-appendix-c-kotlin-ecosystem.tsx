import { OfficialKia1BookLab } from "./official-kia1-book-lab";

const nodes = [
  "附录C Kotlin生态系统",
  "C.1 测试",
  "C.2 依赖注入",
  "C.3 JSON序列化",
  "C.4 HTTP客户端",
  "C.5 Web应用",
  "C.6 数据库访问",
  "C.7 工具和数据结构",
  "C.8 桌面编程"
];

export function Kia1StructureLab() { return <OfficialKia1BookLab mode="structure" unitTitle="附录C Kotlin生态系统" focus="按2017年快照考察测试、依赖注入、JSON、HTTP、Web、数据库、工具与桌面库，并与Java生态互操作" nodes={nodes} />; }
export function Kia1ExecutionLab() { return <OfficialKia1BookLab mode="execution" unitTitle="附录C Kotlin生态系统" focus="把2017年库清单当作当前推荐，或因使用Kotlin就排除成熟Java库与互操作扩展" nodes={nodes} />; }
export function Kia1EvidenceLab() { return <OfficialKia1BookLab mode="evidence" unitTitle="附录C Kotlin生态系统" focus="类别矩阵、维护状态、Java兼容性试验、替代方案和时间边界说明" nodes={nodes} />; }
