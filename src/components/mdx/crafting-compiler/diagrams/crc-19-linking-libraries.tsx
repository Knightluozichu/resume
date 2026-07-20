import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const props = {
  unitId: "crc-19-linking-libraries",
  title: "第19章 链接和库",
  concepts: [
    "第19章 链接和库",
    "19.1 链接的概要",
    "19.2 什么是链接",
    "19.3 动态链接和静态链接",
    "19.4 生成库",
  ],
  chain: ["冻结输入", "产出结构", "断言不变量", "触发首错", "清理重建"],
  model: {
    studio: "符号解析与库选择台",
    boundary:
      "objects/archives/shared objects → symbol resolution → relocations",
    axisA: {
      label: "链接方式",
      levels: ["目标文件", "静态库", "共享库"],
    },
    axisB: {
      label: "符号状态",
      levels: ["定义", "未定义", "重复/弱符号"],
    },
    fault: "库顺序或宿主缓存让错误依赖偶然解析",
    invariant: "符号来源、库选择、重定位和最终依赖在干净环境可重现",
    probe:
      "ld -m elf_i386 -Map=link.map -o app *.o\nreadelf -s -r app\nldd app",
    signal: "link map、符号来源与动态依赖",
    artifact: "链接决策地图",
    trap: "链接成功不等于选择了预期符号版本",
    practiceMode: "code",
    task: "第19章 链接和库固定源码、cbc提交、JDK/JavaCC、GNU工具与IA-32目标，只改变链接方式或符号状态。",
  },
} as const;

export function Crc19LinkingLibrariesMapLab() {
  return <OfficialCraftingCompilerLab {...props} view="structure" />;
}
export function Crc19LinkingLibrariesExperimentLab() {
  return <OfficialCraftingCompilerLab {...props} view="execution" />;
}
export function Crc19LinkingLibrariesEvidenceLab() {
  return <OfficialCraftingCompilerLab {...props} view="evidence" />;
}
