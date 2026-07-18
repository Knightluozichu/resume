import { VueJsPracticeEvidenceLab } from "./official-vuejs-practice-lab";

const nodes = [
  "转换坐标",
  "创建图元",
  "绑定属性",
  "选择编辑",
  "应用渐变",
  "序列化导出",
] as const;

export function Vjp11SvgDrawingBoardMapLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="第 11 章 SVG画图板"
      label="Vue.js从入门到项目实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vjp11SvgDrawingBoardExperimentLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第 11 章 SVG画图板"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vjp11SvgDrawingBoardEvidenceLab() {
  return (
    <VueJsPracticeEvidenceLab
      title="状态、事件与资源证据"
      label="第 11 章 SVG画图板"
      nodes={nodes}
      mode="evidence"
    />
  );
}
