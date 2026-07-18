import { OfficialAes23BookLab } from "./official-aes23-book-lab";

const props = {
  unitId: "aes23-references",
  title: "参考文献：规范、协议与版本裁决",
  nodes: ["教材坐标", "标准版本", "协议规范", "工具芯片", "项目证据"],
  focuses: ["来源层级", "版本冻结", "冲突裁决", "适用范围", "证据归档"],
} as const;

export function Aes23ReferencesTopologyLab() {
  return <OfficialAes23BookLab {...props} mode="topology" />;
}

export function Aes23ReferencesProtocolLab() {
  return <OfficialAes23BookLab {...props} mode="protocol" />;
}

export function Aes23ReferencesEvidenceLab() {
  return <OfficialAes23BookLab {...props} mode="evidence" />;
}
