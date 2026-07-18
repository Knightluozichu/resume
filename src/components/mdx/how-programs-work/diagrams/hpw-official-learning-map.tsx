"use client";
import { ProgramExecutionLab } from "./official-program-execution-lab";
const chain = [
  "核验2015版身份",
  "追踪CPU与位",
  "组织内存存储",
  "构建加载程序",
  "调用系统硬件",
  "用C语言重放",
] as const;
const concepts = [
  "前言",
  "程序是怎样跑起来的——本书中涉及的主要关键词",
  "本书的结构",
  "第1章 对程序员来说CPU是什么",
  "第2章 数据是用二进制数表示的",
  "第3章 计算机进行小数运算时出错的原因",
  "第4章 熟练使用有棱有角的内存",
  "第5章 内存和磁盘的亲密关系",
  "第6章 亲自尝试压缩数据",
  "第7章 程序是在何种环境中运行的",
  "第8章 从源文件到可执行文件",
  "第9章 操作系统和应用的关系",
  "第10章 通过汇编语言了解程序的实际构成",
  "第11章 硬件控制方法",
  "第12章 让计算机“思考”",
  "附录 让我们开始C语言之旅",
] as const;
const common = {
  title: "《程序是怎样跑起来的》权威学习地图",
  label: "程序怎样运行 · 导学",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain,
  concepts,
} as const;
export function HpwOfficialLearningMapMapLab() {
  return <ProgramExecutionLab {...common} view="map" />;
}
export function HpwOfficialLearningMapExperimentLab() {
  return <ProgramExecutionLab {...common} view="experiment" />;
}
export function HpwOfficialLearningMapEvidenceLab() {
  return <ProgramExecutionLab {...common} view="evidence" />;
}
