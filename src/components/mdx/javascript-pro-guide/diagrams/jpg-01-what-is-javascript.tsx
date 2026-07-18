import { JavaScriptProGuideEvidenceLab } from "./official-javascript-pro-guide-lab";

const nodes = [
  "识别运行环境",
  "区分语言与宿主",
  "查询标准版本",
  "检测实际能力",
  "构造降级路径",
  "跨浏览器签发",
] as const;

export function Jpg01WhatIsJavascriptMapLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="第 1 章 什么是JavaScript"
      label="JavaScript高级程序设计（第4版）"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Jpg01WhatIsJavascriptExperimentLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 1 章 什么是JavaScript"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Jpg01WhatIsJavascriptEvidenceLab() {
  return (
    <JavaScriptProGuideEvidenceLab
      title="执行、状态与恢复证据"
      label="第 1 章 什么是JavaScript"
      nodes={nodes}
      mode="evidence"
    />
  );
}
