"use client";

import {
  OfficialCg4Lab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-cg4-lab";

const unitTitle =
  "Texturing and Surface-Detail Methods × Color Models and Color Applications";
const nodes = [
  {
    label: "texture mapping",
    unit: "Texturing and Surface-Detail Methods",
    mechanism:
      "texture mapping 用UV等参数从图像或过程纹理取样，surface detail 可通过法线、位移或微表面参数改变外观。过滤模式和mipmap决定缩小纹理时是否走样。",
    probe: "UV、导数、mipmap层、过滤模式和接缝像素",
  },
  {
    label: "surface detail",
    unit: "Texturing and Surface-Detail Methods",
    mechanism:
      "texture mapping 用UV等参数从图像或过程纹理取样，surface detail 可通过法线、位移或微表面参数改变外观。过滤模式和mipmap决定缩小纹理时是否走样。",
    probe: "UV、导数、mipmap层、过滤模式和接缝像素",
  },
  {
    label: "color model",
    unit: "Color Models and Color Applications",
    mechanism:
      "color model 定义RGB、HSV、XYZ等分量如何表达颜色，color application 决定选择、插值、比较或显示的目标。编码值不等于线性光强，混合和光照通常应在线性空间完成。",
    probe: "白点、变换矩阵、线性/编码状态和色域裁剪",
  },
  {
    label: "color application",
    unit: "Color Models and Color Applications",
    mechanism:
      "color model 定义RGB、HSV、XYZ等分量如何表达颜色，color application 决定选择、插值、比较或显示的目标。编码值不等于线性光强，混合和光照通常应在线性空间完成。",
    probe: "白点、变换矩阵、线性/编码状态和色域裁剪",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus:
    "把表面参数映射到纹理并控制采样与细节频率，并区分颜色编码、显示转换与任务相关颜色应用",
  formula:
    "C_f=sample(T,uv,\\partial uv/\\partial x,\\partial uv/\\partial y) ; C_{display}=OETF(M_{xyz\\to rgb}C_{XYZ})",
  invariant:
    "Texturing and Surface-Detail Methods的输入、公式中间量、输出与恢复结果可用同一基线复算，且Color Models and Color Applications的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault:
    "接缝两侧共享错误UV，或远处仍使用最高频纹理层；直接对gamma编码值求平均，或忽略色域外颜色的映射策略",
  evidence:
    "UV、导数、mipmap层、过滤模式和接缝像素、白点、变换矩阵、线性/编码状态和色域裁剪",
  sourceLabel:
    "Donald Hearn、M. Pauline Baker、Warren Carithers《Computer Graphics with OpenGL》第4版",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Cg411TextureColorPipelineLab() {
  return <OfficialCg4Lab mode="pipeline" {...props} />;
}

export function Cg411TextureColorAlgorithmLab() {
  return <OfficialCg4Lab mode="algorithm" {...props} />;
}

export function Cg411TextureColorEvidenceLab() {
  return <OfficialCg4Lab mode="evidence" {...props} />;
}
