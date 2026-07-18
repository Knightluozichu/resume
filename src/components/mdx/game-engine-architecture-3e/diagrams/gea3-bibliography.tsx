import { OfficialGea3Lab } from "./official-gea3-lab";

const props = {
  unitId: "gea3-bibliography",
  title: "参考文献（Bibliography）",
  nodes: [
    "定位主张",
    "找到原始引用",
    "核对适用条件",
    "复现实验",
    "记录版本差异",
  ],
  focuses: ["来源层级", "适用条件", "实验复现", "版本变化", "引用闭环"],
};

export function Gea3BibliographyMapLab() {
  return <OfficialGea3Lab {...props} initialView="map" />;
}

export function Gea3BibliographyExperimentLab() {
  return <OfficialGea3Lab {...props} initialView="experiment" />;
}

export function Gea3BibliographyEvidenceLab() {
  return <OfficialGea3Lab {...props} initialView="evidence" />;
}
