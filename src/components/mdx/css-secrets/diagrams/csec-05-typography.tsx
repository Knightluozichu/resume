import { CssSecretsOfficialLab } from "./official-css-secrets-lab";

const chain = [
  "声明语言与字体",
  "稳定行框节奏",
  "控制断行空白",
  "启用字形特性",
  "叠加文本装饰",
  "验证复制与缩放",
] as const;
const concepts = [
  "第5章 字体排印",
  "20 连字符断行",
  "21 插入换行",
  "22 文本行的斑马条纹",
  "23 调整 tab 的宽度",
  "24 连字",
  "25 华丽的 & 符号",
  "26 自定义下划线",
  "27 现实中的文字效果",
  "28 环形文字",
] as const;

export function Csec05TypographyMapLab() {
  return (
    <CssSecretsOfficialLab
      title="第 5 章 字体排印 · 问题地图"
      label="CSS Secrets / Map"
      color="#0369a1"
      soft="#e0f2fe"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}

export function Csec05TypographyExperimentLab() {
  return (
    <CssSecretsOfficialLab
      title="第 5 章 字体排印 · 技巧实验"
      label="CSS Secrets / Experiment"
      color="#0369a1"
      soft="#e0f2fe"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}

export function Csec05TypographyEvidenceLab() {
  return (
    <CssSecretsOfficialLab
      title="第 5 章 字体排印 · 回退证据"
      label="CSS Secrets / Evidence"
      color="#0369a1"
      soft="#e0f2fe"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
