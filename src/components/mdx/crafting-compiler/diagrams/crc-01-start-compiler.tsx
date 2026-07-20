import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const props = {
  unitId: "crc-01-start-compiler",
  title: "第1章 开始制作编译器",
  concepts: [
    "第1章 开始制作编译器",
    "1.1 本书的概要",
    "1.2 编译过程",
    "1.3 使用C♭编译器进行编译",
  ],
  chain: ["冻结输入", "产出结构", "断言不变量", "触发首错", "清理重建"],
  model: {
    studio: "最小编译流水线台",
    boundary: "source → analyze → emit assembly → assemble → link → run",
    axisA: {
      label: "流水线阶段",
      levels: ["分析", "代码生成", "链接执行"],
    },
    axisB: {
      label: "程序规模",
      levels: ["return常量", "表达式", "函数调用"],
    },
    fault: "旧目标文件让失败编译仍返回正确结果",
    invariant: "每一步消费本次输入并产出带哈希的唯一工件",
    probe:
      "rm -rf build && ./cbc -S sample.cb && as --32 -o sample.o sample.s && ld -m elf_i386 -o sample sample.o",
    signal: "退出码、工件哈希与返回值",
    artifact: "最小工具链重建包",
    trap: "运行成功不代表扫描、语义和链接层都正确",
    practiceMode: "code",
    task: "第1章 开始制作编译器固定源码、cbc提交、JDK/JavaCC、GNU工具与IA-32目标，只改变流水线阶段或程序规模。",
  },
} as const;

export function Crc01StartCompilerMapLab() {
  return <OfficialCraftingCompilerLab {...props} view="structure" />;
}
export function Crc01StartCompilerExperimentLab() {
  return <OfficialCraftingCompilerLab {...props} view="execution" />;
}
export function Crc01StartCompilerEvidenceLab() {
  return <OfficialCraftingCompilerLab {...props} view="evidence" />;
}
