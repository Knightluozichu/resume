import { CssSecretsOfficialLab } from "./official-css-secrets-lab";

const chain = [
  "标出尺寸所有者",
  "测量内在尺寸",
  "选择布局算法",
  "分离背景与内容",
  "分配剩余空间",
  "注入长短内容",
] as const;
const concepts = [
  "第7章 结构与布局",
  "36 自适应内部元素",
  "37 精确控制表格列宽",
  "38 根据兄弟元素的数量来设置样式",
  "39 满幅的背景，定宽的内容",
  "40 垂直居中",
  "41 紧贴底部的页脚",
] as const;

export function Csec07StructureLayoutMapLab() {
  return (
    <CssSecretsOfficialLab
      title="第 7 章 结构与布局 · 问题地图"
      label="CSS Secrets / Map"
      color="#7c3aed"
      soft="#ede9fe"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}

export function Csec07StructureLayoutExperimentLab() {
  return (
    <CssSecretsOfficialLab
      title="第 7 章 结构与布局 · 技巧实验"
      label="CSS Secrets / Experiment"
      color="#7c3aed"
      soft="#ede9fe"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}

export function Csec07StructureLayoutEvidenceLab() {
  return (
    <CssSecretsOfficialLab
      title="第 7 章 结构与布局 · 回退证据"
      label="CSS Secrets / Evidence"
      color="#7c3aed"
      soft="#ede9fe"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
