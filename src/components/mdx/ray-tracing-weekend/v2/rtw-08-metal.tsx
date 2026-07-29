"use client";

import {
  OfficialRtwLab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-rtw-lab";

const unitTitle = "Metal";
const nodes = [
  {
    label: "金属",
    unit: "Metal",
    mechanism:
      "金属材质先计算镜面反射，再用 fuzz 缩放单位球内扰动；镜面反射保持入射角等于反射角；只有扰动后的方向仍指向表面外侧才接受散射。",
    probe: "理想反射方向、fuzz边界、半球测试和吞吐颜色",
  },
  {
    label: "镜面反射",
    unit: "Metal",
    mechanism:
      "金属材质先计算镜面反射，再用 fuzz 缩放单位球内扰动；镜面反射保持入射角等于反射角；只有扰动后的方向仍指向表面外侧才接受散射。",
    probe: "理想反射方向、fuzz边界、半球测试和吞吐颜色",
  },
  {
    label: "fuzz",
    unit: "Metal",
    mechanism:
      "金属材质先计算镜面反射，再用 fuzz 缩放单位球内扰动；镜面反射保持入射角等于反射角；只有扰动后的方向仍指向表面外侧才接受散射。",
    probe: "理想反射方向、fuzz边界、半球测试和吞吐颜色",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "让镜面反射方向与粗糙扰动保持在可见半球",
  formula: "r=v-2(v\\cdot n)n,\\qquad d=r+f\\,u",
  invariant: "Metal的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "允许fuzz无限增大，或接受与法线点积非正的反射方向",
  evidence: "理想反射方向、fuzz边界、半球测试和吞吐颜色",
  sourceLabel:
    "Peter Shirley、Trevor David Black、Steve Hollasch《Ray Tracing in One Weekend》4.0.2",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Rtw08MetalGeometryLab() {
  return <OfficialRtwLab mode="geometry" {...props} />;
}

export function Rtw08MetalSamplingLab() {
  return <OfficialRtwLab mode="sampling" {...props} />;
}

export function Rtw08MetalEvidenceLab() {
  return <OfficialRtwLab mode="evidence" {...props} />;
}
