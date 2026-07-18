import { OfficialKia1BookLab } from "./official-kia1-book-lab";

const nodes = [
  "第10章 注解与反射",
  "10.1 声明并应用注解",
  "10.1.1 应用注解",
  "10.1.2 注解目标",
  "10.1.3 使用注解定制JSON序列化",
  "10.1.4 声明注解",
  "10.1.5 元注解：控制如何处理一个注解",
  "10.1.6 使用类做注解参数",
  "10.1.7 使用泛型类做注解参数",
  "10.2 反射：在运行时对Kotlin对象进行自省",
  "10.2.1 Kotlin反射API：KClass、KCallable、KFunction和KProperty",
  "10.2.2 用反射实现对象序列化",
  "10.2.3 用注解定制序列化",
  "10.2.4 JSON解析和对象反序列化",
  "10.2.5 反序列化的最后一步：callBy()和使用反射创建对象",
  "10.3 小结"
];

export function Kia1StructureLab() { return <OfficialKia1BookLab mode="structure" unitTitle="第10章 注解与反射" focus="以JKid序列化链连接注解目标、元注解、类参数、KClass、KCallable、对象序列化和反序列化" nodes={nodes} />; }
export function Kia1ExecutionLab() { return <OfficialKia1BookLab mode="execution" unitTitle="第10章 注解与反射" focus="只验证序列化的正常输出，忽略注解use-site目标、缺失参数、类型不匹配和反射可见性" nodes={nodes} />; }
export function Kia1EvidenceLab() { return <OfficialKia1BookLab mode="evidence" unitTitle="第10章 注解与反射" focus="注解落点表、反射成员清单、JSON往返测试、构造参数映射和失败输入记录" nodes={nodes} />; }
