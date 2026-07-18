import { JfsBookLab } from "./official-jfs-lab";

const nodes = [
  "核验原书身份",
  "建立语言与宿主边界",
  "掌握函数对象与异步",
  "进入浏览器文档和事件",
  "贯通 AJAX 与 HTTP",
  "完成 Node 数据闭环",
] as const;

export function JfsOfficialLearningMapMapLab() {
  return (
    <JfsBookLab
      title="《JavaScript 全栈开发》权威学习地图 · 机制地图"
      label="JavaScript 全栈开发 · 导学"
      nodes={nodes}
      mode="map"
    />
  );
}

export function JfsOfficialLearningMapExperimentLab() {
  return (
    <JfsBookLab
      title="《JavaScript 全栈开发》权威学习地图 · 边界实验"
      label="JavaScript 全栈开发 · 导学"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function JfsOfficialLearningMapEvidenceLab() {
  return (
    <JfsBookLab
      title="《JavaScript 全栈开发》权威学习地图 · 恢复证据"
      label="JavaScript 全栈开发 · 导学"
      nodes={nodes}
      mode="evidence"
    />
  );
}
