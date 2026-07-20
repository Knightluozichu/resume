import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const props = {
  unitId: "crc-21-position-independent-code",
  title: "第21章 生成地址无关代码",
  concepts: [
    "第21章 生成地址无关代码",
    "21.1 地址无关代码",
    "21.2 全局变量引用的实现",
    "21.3 链接器调用的实现",
    "21.4 从程序解析到执行",
  ],
  chain: ["冻结输入", "产出结构", "断言不变量", "触发首错", "清理重建"],
  model: {
    studio: "GOT/PLT与PIC台",
    boundary: "PIC reference → GOT/PLT → relocation → runtime address",
    axisA: {
      label: "引用对象",
      levels: ["局部", "全局数据", "外部函数"],
    },
    axisB: {
      label: "装载地址",
      levels: ["基线", "随机化", "重定位压力"],
    },
    fault: "在代码段写绝对地址或把某次装载地址固化进结果",
    invariant: "不同装载地址下代码段保持可共享，数据/函数引用经正确重定位解析",
    probe:
      "readelf -r -d pic.so\nobjdump -drwC pic.so\nLD_DEBUG=bindings ./pic-app",
    signal: "重定位类型、GOT/PLT项与绑定轨迹",
    artifact: "PIC地址解析表",
    trap: "PIE、PIC和共享库不是同一发布形态",
    practiceMode: "code",
    task: "第21章 生成地址无关代码固定源码、cbc提交、JDK/JavaCC、GNU工具与IA-32目标，只改变引用对象或装载地址。",
  },
} as const;

export function Crc21PositionIndependentCodeMapLab() {
  return <OfficialCraftingCompilerLab {...props} view="structure" />;
}
export function Crc21PositionIndependentCodeExperimentLab() {
  return <OfficialCraftingCompilerLab {...props} view="execution" />;
}
export function Crc21PositionIndependentCodeEvidenceLab() {
  return <OfficialCraftingCompilerLab {...props} view="evidence" />;
}
