import { OfficialKia1BookLab } from "./official-kia1-book-lab";

const nodes = [
  "第11章 DSL构建",
  "11.1 从API到DSL",
  "11.1.1 领域特定语言的概念",
  "11.1.2 内部DSL",
  "11.1.3 DSL的结构",
  "11.1.4 使用内部DSL构建HTML",
  "11.2 构建结构化的API：DSL中带接收者的lambda",
  "11.2.1 带接收者的lambda和扩展函数类型",
  "11.2.2 在HTML构建器中使用带接收者的lambda",
  "11.2.3 Kotlin构建器：促成抽象和重用",
  "11.3 使用invoke约定构建更灵活的代码块嵌套",
  "11.3.1 invoke约定：像函数一样可以调用的对象",
  "11.3.2 invoke约定和函数式类型",
  "11.3.3 DSL中的invoke约定：在Gradle中声明依赖",
  "11.4 实践中的Kotlin DSL",
  "11.4.1 把中缀调用链接起来：测试框架中的should",
  "11.4.2 在基本数据类型上定义扩展：处理日期",
  "11.4.3 成员扩展函数：为SQL设计的内部DSL",
  "11.4.4 Anko：动态创建Android UI",
  "11.5 小结"
];

export function Kia1StructureLab() { return <OfficialKia1BookLab mode="structure" unitTitle="第11章 DSL构建" focus="从内部DSL、带接收者lambda、HTML构建器、invoke约定、测试、日期、SQL与Anko案例设计受约束语言" nodes={nodes} />; }
export function Kia1ExecutionLab() { return <OfficialKia1BookLab mode="execution" unitTitle="第11章 DSL构建" focus="追求自然语言外观却隐藏接收者、求值顺序和副作用，使DSL比普通API更难调试" nodes={nodes} />; }
export function Kia1EvidenceLab() { return <OfficialKia1BookLab mode="evidence" unitTitle="第11章 DSL构建" focus="调用点语法树、接收者作用域、HTML结构测试、invoke解析和DSL误用反例" nodes={nodes} />; }
