import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const props = {
  unitId: "crc-18-object-files",
  title: "第18章 生成目标文件",
  concepts: [
    "第4部分 链接和加载",
    "第18章 生成目标文件",
    "18.1 ELF文件的结构",
    "18.2 全局变量及其在ELF文件中的表示",
    "18.3 编译全局变量",
    "18.4 生成目标文件",
  ],
  chain: ["冻结输入", "产出结构", "断言不变量", "触发首错", "清理重建"],
  model: {
    studio: "ELF可重定位对象台",
    boundary: "sections → symbols → relocations → object file",
    axisA: {
      label: "ELF视图",
      levels: ["节", "符号", "重定位"],
    },
    axisB: {
      label: "全局对象",
      levels: [".data", ".bss", "未定义"],
    },
    fault: "把节文件偏移当成运行地址或提前写死未解析地址",
    invariant: "节、符号绑定、大小和重定位引用相互一致并可由工具交叉解析",
    probe:
      "readelf -h -S -s -r sample.o\nobjdump -drwC sample.o\nnm -n sample.o",
    signal: "节/符号/重定位交叉引用",
    artifact: "ELF对象证据包",
    trap: "目标文件节与可执行文件段不是同一概念",
    practiceMode: "code",
    task: "第18章 生成目标文件固定源码、cbc提交、JDK/JavaCC、GNU工具与IA-32目标，只改变ELF视图或全局对象。",
  },
} as const;

export function Crc18ObjectFilesMapLab() {
  return <OfficialCraftingCompilerLab {...props} view="structure" />;
}
export function Crc18ObjectFilesExperimentLab() {
  return <OfficialCraftingCompilerLab {...props} view="execution" />;
}
export function Crc18ObjectFilesEvidenceLab() {
  return <OfficialCraftingCompilerLab {...props} view="evidence" />;
}
