import { OfficialEngineeringCompilerLab } from "./official-engineering-compiler-lab";

const data = {
  title: "第4章 上下文相关分析",
  label: "第4章 上下文相关分析",
  color: "#be123c",
  soft: "#ffe4e6",
  chain: [
    "建立作用域",
    "绑定声明",
    "构建属性依赖",
    "执行类型规则",
    "检测依赖环",
    "输出带注解IR",
  ],
  concepts: [
    "第4章 上下文相关分析",
    "4.1 简介",
    "4.2 类型系统简介",
    "4.2.1 类型系统的目标",
    "4.2.2 类型系统的组件",
    "4.3 属性语法框架",
    "4.3.1 求值的方法",
    "4.3.2 环",
    "4.3.3 扩展实例",
    "4.3.4 属性语法方法的问题",
    "4.4 特设语法制导转换",
    "4.4.1 特设语法制导转换的实现",
    "4.4.2 例子",
    "4.5 高级主题",
    "4.5.1 类型推断中更困难的问题",
    "4.5.2 改变结合性",
    "4.6 小结和展望",
  ],
} as const;

export function Eac04ContextSensitiveAnalysisMapLab() {
  return <OfficialEngineeringCompilerLab {...data} view="map" />;
}

export function Eac04ContextSensitiveAnalysisExperimentLab() {
  return <OfficialEngineeringCompilerLab {...data} view="experiment" />;
}

export function Eac04ContextSensitiveAnalysisEvidenceLab() {
  return <OfficialEngineeringCompilerLab {...data} view="evidence" />;
}
