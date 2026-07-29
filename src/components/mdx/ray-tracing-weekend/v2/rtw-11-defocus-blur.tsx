"use client";

import {
  OfficialRtwLab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-rtw-lab";

const unitTitle = "Defocus Blur";
const nodes = [
  {
    label: "散焦",
    unit: "Defocus Blur",
    mechanism:
      "散焦通过在镜头圆盘上随机改变射线起点实现，景深来自不同起点仍指向同一焦平面样本，focus_dist 决定视口所在的对焦距离。孔径为零时必须退化为针孔相机。",
    probe: "镜头样本半径、焦平面交点一致性和零孔径退化",
  },
  {
    label: "景深",
    unit: "Defocus Blur",
    mechanism:
      "散焦通过在镜头圆盘上随机改变射线起点实现，景深来自不同起点仍指向同一焦平面样本，focus_dist 决定视口所在的对焦距离。孔径为零时必须退化为针孔相机。",
    probe: "镜头样本半径、焦平面交点一致性和零孔径退化",
  },
  {
    label: "focus_dist",
    unit: "Defocus Blur",
    mechanism:
      "散焦通过在镜头圆盘上随机改变射线起点实现，景深来自不同起点仍指向同一焦平面样本，focus_dist 决定视口所在的对焦距离。孔径为零时必须退化为针孔相机。",
    probe: "镜头样本半径、焦平面交点一致性和零孔径退化",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "从有限孔径采样产生与焦平面一致的散焦",
  formula: "Q=lookfrom+p_{disk},\\qquad d=P_{focus}-Q",
  invariant: "Defocus Blur的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "在单位方形而非圆盘采样，或改变起点后仍沿用旧射线方向",
  evidence: "镜头样本半径、焦平面交点一致性和零孔径退化",
  sourceLabel:
    "Peter Shirley、Trevor David Black、Steve Hollasch《Ray Tracing in One Weekend》4.0.2",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Rtw11DefocusBlurGeometryLab() {
  return <OfficialRtwLab mode="geometry" {...props} />;
}

export function Rtw11DefocusBlurSamplingLab() {
  return <OfficialRtwLab mode="sampling" {...props} />;
}

export function Rtw11DefocusBlurEvidenceLab() {
  return <OfficialRtwLab mode="evidence" {...props} />;
}
