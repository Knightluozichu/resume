import { OfficialUnixAdvancedProgrammingLab } from "./official-unix-advanced-programming-lab";

const data = {
  title: "附录B 其他源代码",
  label: "附录",
  color: "#be123c",
  soft: "#ffe4e6",
  chain: [
    "定义公共头",
    "声明错误API",
    "格式化上下文",
    "保留errno",
    "链接示例",
    "运行失败样本",
  ],
  concepts: ["附录B 其他源代码", "B.1 公共头文件 apue.h", "B.2 标准出错例程"],
} as const;

export function UapAppendixBSourceCodeMapLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="map" />;
}

export function UapAppendixBSourceCodeExperimentLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="experiment" />;
}

export function UapAppendixBSourceCodeEvidenceLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="evidence" />;
}
