import { OfficialKia1BookLab } from "./official-kia1-book-lab";

const nodes = [
  "附录A 构建Kotlin项目",
  "A.1 使用Gradle构建Kotlin代码",
  "A.2 使用Maven构建Kotlin项目",
  "A.3 使用Ant构建Kotlin代码"
];

export function Kia1StructureLab() { return <OfficialKia1BookLab mode="structure" unitTitle="附录A 构建Kotlin项目" focus="按2017年工具链比较Gradle、Maven和Ant如何编译Kotlin源码、测试与Android目标" nodes={nodes} />; }
export function Kia1ExecutionLab() { return <OfficialKia1BookLab mode="execution" unitTitle="附录A 构建Kotlin项目" focus="把现代Gradle Kotlin DSL配置倒填为原书内容，或不锁插件版本就比较构建结果" nodes={nodes} />; }
export function Kia1EvidenceLab() { return <OfficialKia1BookLab mode="evidence" unitTitle="附录A 构建Kotlin项目" focus="源码目录、依赖配置、三套构建命令、产物清单和版本锁定记录" nodes={nodes} />; }
