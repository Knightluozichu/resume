import { OfficialEngineeringCompilerLab } from "./official-engineering-compiler-lab";

const data = {
  title: "附录A ILOC",
  label: "附录A ILOC",
  color: "#be123c",
  soft: "#ffe4e6",
  chain: [
    "规范寄存器命名",
    "编码算术操作",
    "验证内存地址",
    "形成控制流",
    "表示SSA",
    "用模拟器复验",
  ],
  concepts: [
    "附录A ILOC",
    "A.1 简介",
    "A.2 命名约定",
    "A.3 单条操作",
    "A.3.1 算术操作",
    "A.3.2 移位操作",
    "A.3.3 内存操作",
    "A.3.4 寄存器间复制操作",
    "A.4 控制流操作",
    "A.4.1 比较和分支的另一种语法",
    "A.4.2 跳转",
    "A.5 表示SSA形式",
  ],
} as const;

export function EacAppendixAIlocMapLab() {
  return <OfficialEngineeringCompilerLab {...data} view="map" />;
}

export function EacAppendixAIlocExperimentLab() {
  return <OfficialEngineeringCompilerLab {...data} view="experiment" />;
}

export function EacAppendixAIlocEvidenceLab() {
  return <OfficialEngineeringCompilerLab {...data} view="evidence" />;
}
