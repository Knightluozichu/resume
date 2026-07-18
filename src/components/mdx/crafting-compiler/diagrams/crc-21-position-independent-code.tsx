import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const data = {
  title: "第21章 生成地址无关代码",
  label: "第4部分 · 链接和加载",
  color: "#a16207",
  soft: "#fef9c3",
  chain: [
    "识别地址依赖",
    "建立GOT基址",
    "生成全局引用",
    "生成PLT调用",
    "链接共享对象",
    "核对加载重定位",
  ],
  concepts: [
    "第21章 生成地址无关代码",
    "21.1 地址无关代码",
    "21.2 全局变量引用的实现",
    "21.3 链接器调用的实现",
    "21.4 从程序解析到执行",
  ],
} as const;

export function Crc21PositionIndependentCodeMapLab() {
  return <OfficialCraftingCompilerLab {...data} view="map" />;
}

export function Crc21PositionIndependentCodeExperimentLab() {
  return <OfficialCraftingCompilerLab {...data} view="experiment" />;
}

export function Crc21PositionIndependentCodeEvidenceLab() {
  return <OfficialCraftingCompilerLab {...data} view="evidence" />;
}
