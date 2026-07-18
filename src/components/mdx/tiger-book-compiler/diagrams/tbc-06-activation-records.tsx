import { OfficialTigerCompilerLab } from "./official-tiger-compiler-lab";

const data = {
  title: "第6章 活动记录",
  label: "第6章 活动记录",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "冻结调用约定",
    "计算逃逸",
    "分配形式参数",
    "建立静态链",
    "分配局部变量",
    "核对过程入口出口",
  ],
  concepts: [
    "第6章 活动记录",
    "6.1 栈帧",
    "6.1.1 帧指针",
    "6.1.2 寄存器",
    "6.1.3 参数传递",
    "6.1.4 返回地址",
    "6.1.5 栈帧内的变量",
    "6.1.6 静态链",
    "6.2 Tiger编译器的栈帧",
    "6.2.1 栈帧描述的表示",
    "6.2.2 局部变量",
    "6.2.3 计算逃逸变量",
    "6.2.4 临时变量和标号",
    "6.2.5 两层抽象",
    "6.2.6 管理静态链",
    "6.2.7 追踪层次信息",
    "程序设计：栈帧",
  ],
} as const;

export function Tbc06ActivationRecordsMapLab() {
  return <OfficialTigerCompilerLab {...data} view="map" />;
}

export function Tbc06ActivationRecordsExperimentLab() {
  return <OfficialTigerCompilerLab {...data} view="experiment" />;
}

export function Tbc06ActivationRecordsEvidenceLab() {
  return <OfficialTigerCompilerLab {...data} view="evidence" />;
}
