import { OfficialTwoWeekScriptingLab } from "./official-two-week-scripting-lab";

const data = {
  title: "第19天 抽象语法树与设计模式",
  label: "解说篇 · 理论与实现机制",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "识别变化轴",
    "保留纯AST",
    "选择访问机制",
    "分离操作",
    "测量扩展成本",
    "回归全部语言特性",
  ],
  concepts: [
    "第19天 抽象语法树与设计模式",
    "19.1 理想的设计",
    "19.2 Interpreter模式",
    "19.3 Visitor模式",
    "19.4 使用反射",
    "19.5 面向切面语言",
  ],
} as const;

export function Tws19AstDesignPatternsMapLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="map" />;
}

export function Tws19AstDesignPatternsExperimentLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="experiment" />;
}

export function Tws19AstDesignPatternsEvidenceLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="evidence" />;
}
