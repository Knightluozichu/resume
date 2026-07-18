import { OfficialKia1BookLab } from "./official-kia1-book-lab";

const nodes = [
  "附录B Kotlin代码的文档化",
  "B.1 编写Kotlin文档注释",
  "B.2 生成API文档"
];

export function Kia1StructureLab() { return <OfficialKia1BookLab mode="structure" unitTitle="附录B Kotlin代码的文档化" focus="用KDoc的Markdown、链接与标签描述公开合同，并生成可核查的模块API文档" nodes={nodes} />; }
export function Kia1ExecutionLab() { return <OfficialKia1BookLab mode="execution" unitTitle="附录B Kotlin代码的文档化" focus="把注释当作实现复述，或生成文档后不检查链接、公开边界和版本对应关系" nodes={nodes} />; }
export function Kia1EvidenceLab() { return <OfficialKia1BookLab mode="evidence" unitTitle="附录B Kotlin代码的文档化" focus="KDoc样例、参数与返回标签、链接解析、文档生成命令和缺失合同清单" nodes={nodes} />; }
