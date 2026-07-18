import { OfficialEngineeringCompilerLab } from "./official-engineering-compiler-lab";

const data = {
  title: "附录B 数据结构",
  label: "附录B 数据结构",
  color: "#5b21b6",
  soft: "#ede9fe",
  chain: [
    "选择集合表示",
    "实现IR节点",
    "维护图边",
    "设计散列表",
    "压入词法作用域",
    "测量时间空间",
  ],
  concepts: [
    "附录B 数据结构",
    "B.1 简介",
    "B.2 集合的表示",
    "B.2.1 将集合表示为有序列表",
    "B.2.2 将集合表示为位向量",
    "B.2.3 表示稀疏集合",
    "B.3 中间表示的实现",
    "B.3.1 图形中间表示",
    "B.3.2 线性中间形式",
    "B.4 散列表的实现",
    "B.4.1 选择散列函数",
    "B.4.2 开放散列",
    "B.4.3 开放寻址",
    "B.4.4 存储符号记录",
    "B.4.5 添加嵌套词法作用域",
    "B.5 灵活的符号表设计",
  ],
} as const;

export function EacAppendixBDataStructuresMapLab() {
  return <OfficialEngineeringCompilerLab {...data} view="map" />;
}

export function EacAppendixBDataStructuresExperimentLab() {
  return <OfficialEngineeringCompilerLab {...data} view="experiment" />;
}

export function EacAppendixBDataStructuresEvidenceLab() {
  return <OfficialEngineeringCompilerLab {...data} view="evidence" />;
}
