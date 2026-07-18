import { OfficialKia1BookLab } from "./official-kia1-book-lab";

const nodes = [
  "第3章 函数的定义与调用",
  "3.1 在Kotlin中创建集合",
  "3.2 让函数更好调用",
  "3.2.1 命名参数",
  "3.2.2 默认参数值",
  "3.2.3 消除静态工具类：顶层函数和属性",
  "3.3 给别人的类添加方法：扩展函数和属性",
  "3.3.1 导入和扩展函数",
  "3.3.2 从Java中调用扩展函数",
  "3.3.3 作为扩展函数的工具函数",
  "3.3.4 不可重写的扩展函数",
  "3.3.5 扩展属性",
  "3.4 处理集合：可变参数、中缀调用和库的支持",
  "3.4.1 扩展Java集合的API",
  "3.4.2 可变参数：让函数支持任意数量的参数",
  "3.4.3 键值对的处理：中缀调用和解构声明",
  "3.5 字符串和正则表达式的处理",
  "3.5.1 分割字符串",
  "3.5.2 正则表达式和三重引号的字符串",
  "3.5.3 多行三重引号的字符串",
  "3.6 让你的代码更整洁：局部函数和扩展",
  "3.7 小结"
];

export function Kia1StructureLab() { return <OfficialKia1BookLab mode="structure" unitTitle="第3章 函数的定义与调用" focus="用命名参数、默认值、顶层声明、扩展、可变参数、中缀调用和局部函数设计可读API" nodes={nodes} />; }
export function Kia1ExecutionLab() { return <OfficialKia1BookLab mode="execution" unitTitle="第3章 函数的定义与调用" focus="认为扩展函数能真正修改或覆盖接收者类的方法，忽略它按声明类型静态解析" nodes={nodes} />; }
export function Kia1EvidenceLab() { return <OfficialKia1BookLab mode="evidence" unitTitle="第3章 函数的定义与调用" focus="调用点对照、Java静态入口、扩展解析实验、字符串解析测试和局部校验函数" nodes={nodes} />; }
