import { OfficialDragonCompilerLab } from "./official-dragon-compiler-lab";

const data = {
  title: "第7章 运行时刻环境",
  label: "第7章 运行时刻环境",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "绘制活动树",
    "布局活动记录",
    "解析非局部名字",
    "分配堆对象",
    "标记可达对象",
    "测量停顿与碎片",
  ],
  concepts: [
    "第7章 运行时刻环境",
    "7.1 存储组织",
    "7.1.1 静态存储分配和动态存储分配",
    "7.2 栈式存储分配",
    "7.2.1 活动树",
    "7.2.2 活动记录",
    "7.2.3 调用序列",
    "7.2.4 栈中的变长数据",
    "7.3 栈中非局部数据的访问",
    "7.3.1 没有嵌套过程时的数据访问",
    "7.3.2 和嵌套过程相关的问题",
    "7.3.3 一个支持嵌套过程声明的语言",
    "7.3.4 嵌套深度",
    "7.3.5 访问链",
    "7.3.6 访问链的维护",
    "7.3.7 过程参数的访问链",
    "7.3.8 display表",
    "7.4 堆管理",
    "7.4.1 存储管理器",
    "7.4.2 计算机的存储层次结构",
    "7.4.3 程序中的局部性",
    "7.4.4 减少碎片",
    "7.4.5 手工回收请求",
    "7.5 垃圾回收概述",
    "7.5.1 垃圾回收器的设计目标",
    "7.5.2 可达性",
    "7.5.3 引用计数垃圾回收器",
    "7.6 基于跟踪的回收技术介绍",
    "7.6.1 一个基本的标记-清扫式回收器",
    "7.6.2 基本抽象",
    "7.6.3 标记-清扫算法的优化",
    "7.6.4 标记-压缩式垃圾回收器",
    "7.6.5 拷贝式垃圾回收器",
    "7.6.6 代价的比较",
    "7.7 短停顿垃圾回收",
    "7.7.1 增量式垃圾回收",
    "7.7.2 增量式可达性分析",
    "7.7.3 部分回收基础",
    "7.7.4 分代垃圾回收",
    "7.7.5 火车算法",
    "7.8 垃圾回收高级主题",
    "7.8.1 并行和并发垃圾回收",
    "7.8.2 对象的部分迁移",
    "7.8.3 不安全语言的保守式垃圾回收",
    "7.8.4 弱引用",
  ],
} as const;

export function Dbc07RuntimeEnvironmentsMapLab() {
  return <OfficialDragonCompilerLab {...data} view="map" />;
}

export function Dbc07RuntimeEnvironmentsExperimentLab() {
  return <OfficialDragonCompilerLab {...data} view="experiment" />;
}

export function Dbc07RuntimeEnvironmentsEvidenceLab() {
  return <OfficialDragonCompilerLab {...data} view="evidence" />;
}
