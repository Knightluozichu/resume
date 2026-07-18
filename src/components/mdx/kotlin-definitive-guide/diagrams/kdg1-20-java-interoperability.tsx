import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "20. Java Interoperability",
  "Interoperating with a Java Class",
  "Interoperability and Nullity",
  "Type Mapping",
  "Getters, Setters, and Interoperability",
  "Beyond Classes",
  "Exceptions and Interoperability",
  "Function Types in Java"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="20. Java Interoperability" focus="控制Java类、平台类型、类型映射、访问器、顶层声明、异常与函数类型的互操作边界" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="20. Java Interoperability" focus="让平台类型扩散到业务层，令空值风险失去编译期保护" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="20. Java Interoperability" focus="Java/Kotlin签名对照、平台类型隔离、异常合同、生成字节码和跨语言测试" nodes={nodes} />; }
