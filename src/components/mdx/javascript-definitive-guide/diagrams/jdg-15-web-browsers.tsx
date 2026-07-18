import { Jdg7MechanismLab } from "./official-jdg7-lab";

const nodes = [
  "加载脚本并建立全局环境",
  "读取输入与分派事件",
  "查询和更新 DOM/CSS",
  "调用图形、音频或网络能力",
  "持久化或跨线程传递数据",
  "处理错误、安全与性能"
] as const;

export function Jdg15WebBrowsersMapLab() {
  return <Jdg7MechanismLab title="第 15 章 浏览器中的 JavaScript · 机制地图" label="JavaScript in Web Browsers" nodes={nodes} mode="map" />;
}

export function Jdg15WebBrowsersExperimentLab() {
  return <Jdg7MechanismLab title="第 15 章 浏览器中的 JavaScript · 运行时实验" label="JavaScript in Web Browsers" nodes={nodes} mode="experiment" />;
}

export function Jdg15WebBrowsersEvidenceLab() {
  return <Jdg7MechanismLab title="第 15 章 浏览器中的 JavaScript · 恢复证据" label="JavaScript in Web Browsers" nodes={nodes} mode="evidence" />;
}
