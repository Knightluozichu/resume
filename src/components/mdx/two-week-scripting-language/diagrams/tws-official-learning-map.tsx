import { OfficialTwoWeekScriptingLab } from "./official-two-week-scripting-lab";

const data = {
  title: "《两周自制脚本语言》权威学习地图",
  label: "导读 · 3部分19天路线",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "核对3部分",
    "完成基础解释器",
    "加入对象函数",
    "验证性能优化",
    "进入VM与类型",
    "回做理论自习",
  ],
  concepts: [
    "第1部分 基础篇",
    "第1天 来，我们一起做些什么吧",
    "第2天 设计程序设计语言",
    "第3天 分割单词",
    "第4天 用于表示程序的对象",
    "第5天 设计语法分析器",
    "第6天 通过解释器执行程序",
    "第7天 添加函数功能",
    "第8天 关联Java语言",
    "第9天 设计面向对象语言",
    "第10天 无法割舍的数组",
    "第2部分 性能优化篇",
    "第11天 优化变量读写性能",
    "第12天 优化对象操作性能",
    "第13天 设计中间代码解释器",
    "第14天 为Stone语言添加静态类型支持以优化性能",
    "第3部分 解说篇（自习时间）",
    "第15天 手工设计词法分析器",
    "第16天 语法分析方式",
    "第17天 Parser库的内部结构",
    "第18天 GluonJ的使用方法",
    "第19天 抽象语法树与设计模式",
  ],
} as const;

export function TwsOfficialLearningMapMapLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="map" />;
}

export function TwsOfficialLearningMapExperimentLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="experiment" />;
}

export function TwsOfficialLearningMapEvidenceLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="evidence" />;
}
