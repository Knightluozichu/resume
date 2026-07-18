import { OfficialTwoWeekScriptingLab } from "./official-two-week-scripting-lab";

const data = {
  title: "第12天 优化对象操作性能",
  label: "性能优化 · 环境与对象",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "冻结语义基线",
    "测量查找成本",
    "分配槽位",
    "改写访问节点",
    "加入缓存",
    "差分执行结果",
  ],
  concepts: [
    "第12天 优化对象操作性能",
    "12.1 减少内存占用",
    "12.2 能否通过事先查找变量的保存位置来优化性能",
    "12.3 定义lookup方法",
    "12.4 整合所有修改并执行",
    "12.5 内联缓存",
  ],
} as const;

export function Tws12FastObjectAccessMapLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="map" />;
}

export function Tws12FastObjectAccessExperimentLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="experiment" />;
}

export function Tws12FastObjectAccessEvidenceLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="evidence" />;
}
