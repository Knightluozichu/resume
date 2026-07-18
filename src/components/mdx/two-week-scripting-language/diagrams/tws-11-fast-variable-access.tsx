import { OfficialTwoWeekScriptingLab } from "./official-two-week-scripting-lab";

const data = {
  title: "第11天 优化变量读写性能",
  label: "性能优化 · 环境与对象",
  color: "#7c3aed",
  soft: "#ede9fe",
  chain: [
    "冻结语义基线",
    "测量查找成本",
    "分配槽位",
    "改写访问节点",
    "加入缓存",
    "差分执行结果",
  ],
  concepts: [
    "第2部分 性能优化篇",
    "第11天 优化变量读写性能",
    "11.1 通过简单数组来实现环境",
    "11.2 用于记录全局变量的环境",
    "11.3 事先确定变量值的存放位置",
    "11.4 修正eval方法并最终完成性能优化",
  ],
} as const;

export function Tws11FastVariableAccessMapLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="map" />;
}

export function Tws11FastVariableAccessExperimentLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="experiment" />;
}

export function Tws11FastVariableAccessEvidenceLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="evidence" />;
}
