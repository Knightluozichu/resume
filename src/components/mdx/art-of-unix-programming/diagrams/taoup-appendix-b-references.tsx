import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-appendix-b-references",
  title: "附录B 参考文献",
  question: "为一条关于协议兼容性的结论建立可复核来源链",
  nodes: ["识别主张", "选择来源", "记录版本", "定位证据", "复核可达"],
  concepts: ["B. References"],
  actions: [
    {
      label: "收窄一手来源",
      detail: "只改变一手来源，保留版本与定位的原始基线。",
    },
    {
      label: "显式化定位",
      detail: "把定位的输入、输出和失败状态写入可检查记录。",
    },
    {
      label: "绕过访问状态",
      detail: "跳过访问状态直接追求主张映射，用来观察局部捷径的系统代价。",
    },
  ],
  boundaryNote: "来源不可访问或无法支持主张时，应降低结论强度而不是补全想象。",
  faultNote: "拒绝原因：引用二手摘要支持精确标准要求，却没有核对规范正文。",
} as const;

export function TaoupAppendixBReferencesTopologyLab() {
  return <UnixDecisionLab {...shared} view="topology" />;
}

export function TaoupAppendixBReferencesRepresentationLab() {
  return <UnixDecisionLab {...shared} view="representation" />;
}

export function TaoupAppendixBReferencesEvidenceLab() {
  return <UnixDecisionLab {...shared} view="evidence" />;
}
