import { OfficialGep1Lab } from "./official-gep1-lab";

const props = {
  unitId: "gep1-chapter-12-models-textures",
  title: "第12章 模型与贴图",
  nodes: [
    "校验源模型",
    "生成几何属性",
    "创建GPU缓冲",
    "绑定纹理材质",
    "验证运行时绘制",
  ],
  focuses: ["切线正确", "顶点布局", "导入压缩", "颜色空间", "资产追踪"],
};

export function Gep1Chapter12ModelsTexturesMapLab() {
  return <OfficialGep1Lab {...props} initialView="map" />;
}
export function Gep1Chapter12ModelsTexturesExperimentLab() {
  return <OfficialGep1Lab {...props} initialView="experiment" />;
}
export function Gep1Chapter12ModelsTexturesEvidenceLab() {
  return <OfficialGep1Lab {...props} initialView="evidence" />;
}
