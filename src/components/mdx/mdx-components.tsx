import type { MDXRemoteProps } from "next-mdx-remote/rsc";

import { Attribution } from "./attribution";
import { Callout } from "./callout";
import { CodeTabs, Tab } from "./code-tabs";
import { CompareSlider } from "./compare-slider";
import { DemoStage, Slider, Toggle } from "./controls";
import { RgbMixerDemo } from "./demos/rgb-mixer-demo";
import { FrameStageDiagram } from "./diagrams/frame-stage-diagram";
import { HomogeneousTranslateDiagram } from "./diagrams/homogeneous-translate-diagram";
import { InterpolationDiagram } from "./diagrams/interpolation-diagram";
import { MipmapPyramidDiagram } from "./diagrams/mipmap-pyramid-diagram";
import { SetupPipelineDiagram } from "./diagrams/setup-pipeline-diagram";
import { ShaderIODiagram } from "./diagrams/shader-io-diagram";
import { TextureCoordDiagram } from "./diagrams/texture-coord-diagram";
import { TransformOrderDiagram } from "./diagrams/transform-order-diagram";
import { VectorOpsDiagram } from "./diagrams/vector-ops-diagram";
import { VertexPipelineDiagram } from "./diagrams/vertex-pipeline-diagram";
import { Answer, Exercises } from "./exercises";
import { Figure } from "./figure";
import { Glossary, GlossaryItem } from "./glossary";
import { MathViz } from "./math-viz";
import { Objectives } from "./objectives";
import { PipelineViz } from "./pipeline-viz";
import { ShaderDemo } from "./shader-demo";
import { Step, Stepper } from "./stepper";
import { Term } from "./term";
import { TextureDemo } from "./texture-demo";

/**
 * MDX 结构教学组件 map（HEL-20）。
 *
 * 经 page.tsx 的 compileMDX(... components ...) 注入，使 content/learn/*.mdx 可直接用
 * <Objectives> / <CodeTabs><Tab> / <Exercises><Answer> / <Attribution> / <Callout> /
 * <ShaderDemo> 等标签。
 *
 * Server / Client 划分：
 *  - Server（纯展示）：Objectives / Callout / Attribution
 *  - Client（真交互）：CodeTabs+Tab（Tab 切换）、Exercises 区的 Answer（折叠披露）
 * client 组件被注入后仍是叶子交互壳，不会把整页变成 client（RSC 边界保持）。
 *
 * 轻量交互/动画/图示组件（HEL-23，非 WebGL，立即可用）：
 *  - Server（纯展示）：Figure（图片比喻 + 百分比标注）
 *  - Client（真交互）：CompareSlider（左右拖动对比）、Stepper+Step（分步动画：
 *    可暂停/单步/拖进度）、Slider/Toggle（内联控件）、DemoStage（Demo 容器卡片）
 *
 * WebGL 片段着色器实时渲染（HEL-25，M4 基座）：
 *  - Client（dynamic 边界）：ShaderDemo —— WebGL2 能力检测 + next/dynamic(ssr:false)
 *    懒加载含 WebGL 代码的 ShaderCanvas（独立 chunk，不进首屏/公共 layout，硬规则 2/6）。
 *    标准 uniforms：uTime / uResolution / uMouse。HEL-26 加 uniform 控件、HEL-27 加在线改 GLSL。
 *
 * WebGL 纹理交互演示（HEL-45，HEL-34「纹理」章核心 viz）：
 *  - Client（dynamic 边界）：TextureDemo —— WebGL2 能力检测 + next/dynamic(ssr:false)
 *    懒加载含 WebGL 代码的 TextureCanvas（独立 chunk，硬规则 2/6）。贴满纹理的 quad +
 *    环绕(REPEAT/MIRRORED/CLAMP) / 过滤(NEAREST/LINEAR) 分段按钮 + UV 缩放 / 放大观察滑块；
 *    默认程序化「UV 测试图」（无外部资源），按需重绘不挂 rAF 常转（reduced-motion 友好）。
 *
 * 术语高亮 + 名词解释（HEL-24）：
 *  - Client（真交互）：Term（行内术语高亮 + hover/focus tooltip + Esc + 锚点跳词条）
 *  - Server（纯展示）：Glossary / GlossaryItem（章末「人话词典」，词条 id 与 Term 锚点对齐）
 *
 * 概念型(A)章节主 Demo（HEL-29，非 WebGL）：
 *  - Client（叶子壳）：PipelineViz —— 渲染管线五阶段数据流 SVG 可视化（点→三角形→
 *    像素格→上色→帧缓冲），可暂停/单步/拖进度，reduced-motion 默认暂停。自带默认五阶段，
 *    无 WebGL 故不需 dynamic 切分；作者如需进一步延后可在用例里 dynamic(ssr:false)。
 *
 * 数学型(B)章节主 Demo（HEL-28，非 WebGL）：
 *  - Client（dynamic 边界）：MathViz —— 2D 向量/矩阵/坐标变换 SVG 交互可视化（拖动输入
 *    向量、调 2×2 矩阵 Slider、实时看 M·v 与变换后网格/基向量、预设/重置/键盘可调）。
 *    虽非 WebGL 但属重交互组件，按硬规则 2 经 next/dynamic(ssr:false) 懒加载独立 chunk。
 *
 * 章节专用静态示意图（Server，纯展示 SVG，无 three / 无交互 / reduced-motion 无关）：
 *  - SetupPipelineDiagram / FrameStageDiagram（你好窗口）、VertexPipelineDiagram（你好三角形）
 *  - ShaderIODiagram / InterpolationDiagram（着色器，HEL-33）：in/out + uniform 数据流、
 *    顶点→片段插值。一律 token 色、无内联多行 SVG 进 mdx（规避 hydration mismatch）。
 *  - TextureCoordDiagram / MipmapPyramidDiagram（纹理，HEL-34）：UV 四角如何对应纹理四角 +
 *    逐顶点带 UV / 片段插值采样、mipmap「纹理金字塔」逐级减半按远近取级。同款 Server SVG。
 *  - VectorOpsDiagram / HomogeneousTranslateDiagram / TransformOrderDiagram（变换，HEL-35）：
 *    向量加法首尾相接 + 取负 / 数乘 / 点乘叉乘、齐次坐标 w=1 让平移量住进矩阵末列、
 *    组合顺序不交换（T·S vs S·T 终点不同）。同款 Server SVG，配 §4 数学一起读。
 */
export const mdxComponents: NonNullable<MDXRemoteProps["components"]> = {
  Objectives,
  CodeTabs,
  Tab,
  Exercises,
  Answer,
  Attribution,
  Callout,
  ShaderDemo,
  TextureDemo,
  PipelineViz,
  MathViz,
  CompareSlider,
  Figure,
  SetupPipelineDiagram,
  FrameStageDiagram,
  VertexPipelineDiagram,
  ShaderIODiagram,
  InterpolationDiagram,
  TextureCoordDiagram,
  MipmapPyramidDiagram,
  VectorOpsDiagram,
  HomogeneousTranslateDiagram,
  TransformOrderDiagram,
  Stepper,
  Step,
  Slider,
  Toggle,
  DemoStage,
  RgbMixerDemo,
  Term,
  Glossary,
  GlossaryItem,
};
