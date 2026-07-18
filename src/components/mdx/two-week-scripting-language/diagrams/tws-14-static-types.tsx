import { OfficialTwoWeekScriptingLab } from "./official-two-week-scripting-lab";

const data = {
  title: "第14天 为Stone语言添加静态类型支持以优化性能",
  label: "性能优化 · 虚拟机与类型",
  color: "#047857",
  soft: "#d1fae5",
  chain: [
    "标注类型语法",
    "建立类型环境",
    "生成约束",
    "统一类型变量",
    "拒绝不一致",
    "生成Java字节码",
  ],
  concepts: [
    "第14天 为Stone语言添加静态类型支持以优化性能",
    "14.1 指定变量类型",
    "14.2 通过数据类型检查发现错误",
    "14.3 运行程序时执行类型检查",
    "14.4 对类型省略的变量进行类型推论",
    "14.5 Java二进制代码转换",
    "14.6 综合所有修改再次运行程序",
    "专栏第5话 Twitter",
  ],
} as const;

export function Tws14StaticTypesMapLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="map" />;
}

export function Tws14StaticTypesExperimentLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="experiment" />;
}

export function Tws14StaticTypesEvidenceLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="evidence" />;
}
