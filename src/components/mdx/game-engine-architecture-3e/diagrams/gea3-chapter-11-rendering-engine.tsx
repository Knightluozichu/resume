import { OfficialGea3Lab } from "./official-gea3-lab";

const props = {
  unitId: "gea3-chapter-11-rendering-engine",
  title: "第11章 The Rendering Engine",
  nodes: [
    "提取渲染世界",
    "剔除并排序",
    "绑定材质资源",
    "构建GPU命令",
    "呈现并画像",
  ],
  focuses: ["空间正确", "可见性", "状态切换", "GPU预算", "画质伸缩"],
};

export function Gea3Chapter11RenderingEngineMapLab() {
  return <OfficialGea3Lab {...props} initialView="map" />;
}

export function Gea3Chapter11RenderingEngineExperimentLab() {
  return <OfficialGea3Lab {...props} initialView="experiment" />;
}

export function Gea3Chapter11RenderingEngineEvidenceLab() {
  return <OfficialGea3Lab {...props} initialView="evidence" />;
}
