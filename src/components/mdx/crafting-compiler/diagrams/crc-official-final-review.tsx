import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const props = {
  unitId: "crc-official-final-review",
  title: "《自制编译器》全书总复习",
  concepts: [
    "第1章 开始制作编译器",
    "第2章 C♭和cbc",
    "第3章 语法分析的概要",
    "第4章 词法分析",
    "第5章 基于JavaCC的解析器描述",
    "第6章 语法分析",
    "第7章 JavaCC的action和抽象语法树",
    "第8章 抽象语法树的生成",
    "第9章 语义分析（1）引用的消解",
    "第10章 语义分析（2）静态类型检查",
    "第11章 中间代码的转换",
    "第12章 x86架构的概要",
    "第13章 x86汇编器编程",
    "第14章 函数和变量",
    "第15章 编译表达式和语句",
    "第16章 分配栈帧",
    "第17章 优化的方法",
    "第18章 生成目标文件",
    "第19章 链接和库",
    "第20章 加载程序",
    "第21章 生成地址无关代码",
    "第22章 扩展阅读",
    "附录",
  ],
  chain: ["冻结输入", "产出结构", "断言不变量", "触发首错", "清理重建"],
  model: {
    studio: "C♭端到端故障答辩台",
    boundary: "source → token → AST/binding/type → IR → IA-32 → ELF/load",
    axisA: {
      label: "故障域",
      levels: ["前端", "语义/IR", "机器/装载"],
    },
    axisB: {
      label: "发布决定",
      levels: ["通过", "条件通过", "回滚"],
    },
    fault: "拼接不同构建的AST、汇编和ELF形成假证据",
    invariant: "116层级以同一源码与工具链指纹重建，首处分叉和回滚条件明确",
    probe:
      "bundle: tokens+ast+bindings+ir+asm+elf\nidentity: source+toolchain+target\ndecision: pass-or-rollback",
    signal: "全链哈希、首处分叉与回归",
    artifact: "全书发布证据包",
    trap: "最终输出正确不能平均掉任何中间层失败",
    practiceMode: "diagnosis",
    task: "《自制编译器》全书总复习固定源码、cbc提交、JDK/JavaCC、GNU工具与IA-32目标，只改变故障域或发布决定。",
  },
} as const;

export function CrcOfficialFinalReviewMapLab() {
  return <OfficialCraftingCompilerLab {...props} view="structure" />;
}
export function CrcOfficialFinalReviewExperimentLab() {
  return <OfficialCraftingCompilerLab {...props} view="execution" />;
}
export function CrcOfficialFinalReviewEvidenceLab() {
  return <OfficialCraftingCompilerLab {...props} view="evidence" />;
}
