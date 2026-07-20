import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const props = {
  unitId: "crc-official-learning-map",
  title: "《自制编译器》权威学习地图",
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
    studio: "116层级编译证据路线台",
    boundary: "C♭源文件 → token → AST/绑定 → IR → IA-32 → ELF → 进程",
    axisA: {
      label: "观察层",
      levels: ["前端", "中端", "机器/装载"],
    },
    axisB: {
      label: "样本族",
      levels: ["合法", "边界", "故障"],
    },
    fault: "最终程序碰巧运行却有更早中间产物错误",
    invariant: "23个正式单元都能回到唯一输入、第一处分叉和可重建下游证据",
    probe:
      "sample.cb -> tokens.json -> ast.json -> ir.txt -> sample.s -> sample.o -> sample",
    signal: "116节点覆盖与首处分叉",
    artifact: "全链产物与回归索引",
    trap: "只保存最终可执行文件",
    practiceMode: "design",
    task: "《自制编译器》权威学习地图固定源码、cbc提交、JDK/JavaCC、GNU工具与IA-32目标，只改变观察层或样本族。",
  },
} as const;

export function CrcOfficialLearningMapMapLab() {
  return <OfficialCraftingCompilerLab {...props} view="structure" />;
}
export function CrcOfficialLearningMapExperimentLab() {
  return <OfficialCraftingCompilerLab {...props} view="execution" />;
}
export function CrcOfficialLearningMapEvidenceLab() {
  return <OfficialCraftingCompilerLab {...props} view="evidence" />;
}
