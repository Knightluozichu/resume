"use client";

import {
  OfficialRtwLab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-rtw-lab";

const unitTitle = "Overview × Output an Image";
const nodes = [
  {
    label: "path tracer",
    unit: "Overview",
    mechanism:
      "Overview明确本书实现的是一个小型C++路径追踪器：像素生成相机射线，射线查询场景并递归散射，最终写出图像。它不是完整生产渲染器，也不依赖图形API；先固定这条边界，后续每一步才有可比较的基线。",
    probe: "程序入口、射线到颜色的数据流、固定输入和首张输出哈希",
  },
  {
    label: "implementation order",
    unit: "Overview",
    mechanism:
      "Overview明确本书实现的是一个小型C++路径追踪器：像素生成相机射线，射线查询场景并递归散射，最终写出图像。它不是完整生产渲染器，也不依赖图形API；先固定这条边界，后续每一步才有可比较的基线。",
    probe: "程序入口、射线到颜色的数据流、固定输入和首张输出哈希",
  },
  {
    label: "debugging baseline",
    unit: "Overview",
    mechanism:
      "Overview明确本书实现的是一个小型C++路径追踪器：像素生成相机射线，射线查询场景并递归散射，最终写出图像。它不是完整生产渲染器，也不依赖图形API；先固定这条边界，后续每一步才有可比较的基线。",
    probe: "程序入口、射线到颜色的数据流、固定输入和首张输出哈希",
  },
  {
    label: "ppm",
    unit: "Output an Image",
    mechanism:
      "ppm 是本书选择的最小图像容器，std::cout 负责把头部与逐像素整数写入标准输出，write_color 则集中完成颜色分量缩放与钳制。三者分开后，几何错误不会和文件编码错误混在一起。",
    probe: "PPM头、像素数量、通道范围与stderr日志彼此独立",
  },
  {
    label: "write_color",
    unit: "Output an Image",
    mechanism:
      "ppm 是本书选择的最小图像容器，std::cout 负责把头部与逐像素整数写入标准输出，write_color 则集中完成颜色分量缩放与钳制。三者分开后，几何错误不会和文件编码错误混在一起。",
    probe: "PPM头、像素数量、通道范围与stderr日志彼此独立",
  },
  {
    label: "std::cout",
    unit: "Output an Image",
    mechanism:
      "ppm 是本书选择的最小图像容器，std::cout 负责把头部与逐像素整数写入标准输出，write_color 则集中完成颜色分量缩放与钳制。三者分开后，几何错误不会和文件编码错误混在一起。",
    probe: "PPM头、像素数量、通道范围与stderr日志彼此独立",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus:
    "界定周末路径追踪器的目标、实现顺序与调试基线，并把浮点RGB样本稳定编码成可检查的PPM图像",
  formula:
    "C=trace(ray(scene,camera)) ; c_8 = \\left\\lfloor 256\\,\\operatorname{clamp}(c,0,0.999)\\right\\rfloor",
  invariant:
    "Overview的输入、公式中间量、输出与恢复结果可用同一基线复算，且Output an Image的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault:
    "把本书误称为光栅化或Vulkan教程，或没有保存首张PPM基线；把进度日志也写进std::cout，或在量化前不限制颜色范围",
  evidence:
    "程序入口、射线到颜色的数据流、固定输入和首张输出哈希、PPM头、像素数量、通道范围与stderr日志彼此独立",
  sourceLabel:
    "Peter Shirley、Trevor David Black、Steve Hollasch《Ray Tracing in One Weekend》4.0.2",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Rtw01OutputImageGeometryLab() {
  return <OfficialRtwLab mode="geometry" {...props} />;
}

export function Rtw01OutputImageSamplingLab() {
  return <OfficialRtwLab mode="sampling" {...props} />;
}

export function Rtw01OutputImageEvidenceLab() {
  return <OfficialRtwLab mode="evidence" {...props} />;
}
