import { OfficialKia1BookLab } from "./official-kia1-book-lab";

const nodes = [
  "第5章 Lambda编程",
  "5.1 Lambda表达式和成员引用",
  "5.1.1 Lambda简介：作为函数参数的代码块",
  "5.1.2 Lambda和集合",
  "5.1.3 Lambda表达式的语法",
  "5.1.4 在作用域中访问变量",
  "5.1.5 成员引用",
  "5.2 集合的函数式API",
  "5.2.1 基础：filter和map",
  "5.2.2 all、any、count和find：对集合应用判断式",
  "5.2.3 groupBy：把列表转换成分组的map",
  "5.2.4 flatMap和flatten：处理嵌套集合中的元素",
  "5.3 惰性集合操作：序列",
  "5.3.1 执行序列操作：中间和末端操作",
  "5.3.2 创建序列",
  "5.4 使用Java函数式接口",
  "5.4.1 把lambda当作参数传递给Java方法",
  "5.4.2 SAM构造方法：显式地把lambda转换成函数式接口",
  "5.5 带接收者的lambda：with与apply",
  "5.5.1 with函数",
  "5.5.2 apply函数",
  "5.6 小结"
];

export function Kia1StructureLab() { return <OfficialKia1BookLab mode="structure" unitTitle="第5章 Lambda编程" focus="用lambda、成员引用、集合函数式API、序列、SAM转换和带接收者lambda控制数据流与求值时机" nodes={nodes} />; }
export function Kia1ExecutionLab() { return <OfficialKia1BookLab mode="execution" unitTitle="第5章 Lambda编程" focus="把序列视为总会更快，或忽略lambda捕获、非局部返回和Java SAM对象创建的边界" nodes={nodes} />; }
export function Kia1EvidenceLab() { return <OfficialKia1BookLab mode="evidence" unitTitle="第5章 Lambda编程" focus="集合变换轨迹、捕获变量记录、序列求值计数、SAM边界和with/apply接收者表" nodes={nodes} />; }
