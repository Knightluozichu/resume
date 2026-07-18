"use client";
import { ProgramExecutionLab } from "./official-program-execution-lab";
const chain = [
  "定义判断目标",
  "编码思考步骤",
  "读取当前观察",
  "加入随机或记忆",
  "执行规则选择",
  "解释结果边界",
] as const;
const concepts = [
  "第12章 让计算机“思考”",
  "12.1 作为“工具”的程序和为了“思考”的程序",
  "12.2 用程序来表示人类的思考方式",
  "12.3 用程序来表示人类的思考习惯",
  "12.4 程序生成随机数的方法",
  "12.5 活用记忆功能以达到更接近人类的判断",
  "12.6 用程序来表示人类的思考方式",
  "COLUMN 如果是你，你会怎样介绍？——向常光临的酒馆老板讲解计算机的思考机制",
] as const;
const common = {
  title: "第 12 章 让计算机“思考”",
  label: "程序怎样运行 · 思考与C语言",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain,
  concepts,
} as const;
export function Hpw12ThinkingMapLab() {
  return <ProgramExecutionLab {...common} view="map" />;
}
export function Hpw12ThinkingExperimentLab() {
  return <ProgramExecutionLab {...common} view="experiment" />;
}
export function Hpw12ThinkingEvidenceLab() {
  return <ProgramExecutionLab {...common} view="evidence" />;
}
