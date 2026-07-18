import { OfficialTigerCompilerLab } from "./official-tiger-compiler-lab";

const data = {
  title: "《现代编译原理：C语言描述（修订版）》权威学习地图",
  label: "《现代编译原理：C语言描述（修订版）》权威学习地图",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "确认C修订版",
    "建立目录分母",
    "连接模块接口",
    "实现Tiger前后端",
    "扩展高级主题",
    "执行端到端回归",
  ],
  concepts: [
    "第1章 绪论",
    "第2章 词法分析",
    "第3章 语法分析",
    "第4章 抽象语法",
    "第5章 语义分析",
    "第6章 活动记录",
    "第7章 翻译成中间代码",
    "第8章 基本块和轨迹",
    "第9章 指令选择",
    "第10章 活跃分析",
    "第11章 寄存器分配",
    "第12章 整合为一体",
    "第13章 垃圾收集",
    "第14章 面向对象的语言",
    "第15章 函数式程序设计语言",
    "第16章 多态类型",
    "第17章 数据流分析",
    "第18章 循环优化",
    "第19章 静态单赋值形式",
    "第20章 流水和调度",
    "第21章 存储层次",
    "附录 Tiger语言参考手册",
  ],
} as const;

export function TbcOfficialLearningMapMapLab() {
  return <OfficialTigerCompilerLab {...data} view="map" />;
}

export function TbcOfficialLearningMapExperimentLab() {
  return <OfficialTigerCompilerLab {...data} view="experiment" />;
}

export function TbcOfficialLearningMapEvidenceLab() {
  return <OfficialTigerCompilerLab {...data} view="evidence" />;
}
