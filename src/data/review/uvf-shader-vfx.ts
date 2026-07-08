import type { ReviewQuestion } from "./types";

export const uvfShaderVfxQuestions: ReviewQuestion[] = [
  {
    id: "uvf-shader-vfx-1",
    chapter: "uvf-shader-vfx",
    level: 1,
    question: "Shader 特效中「溶解」（Dissolve）效果的核心原理是什么？需要什么贴图？",
    answer: "溶解原理是用噪声贴图（Noise Texture）的值与阈值比较，用 clip() 函数丢弃低于阈值的像素。需要一张噪声贴图（如 Perlin Noise）和一个随时间递增的阈值参数 _Threshold。当 noise.r - _Threshold 小于0时 clip 丢弃像素，物体逐渐消失。边缘可加 Burn 光：在阈值附近用 step 函数叠加发光颜色。",
    tags: ["溶解", "Dissolve", "clip", "噪声贴图"],
  },
  {
    id: "uvf-shader-vfx-2",
    chapter: "uvf-shader-vfx",
    level: 2,
    question: "Shader 中的屏幕扭曲（Distortion）效果是如何实现的？GrabPass 和 RenderTexture 有什么区别？",
    answer: "扭曲原理是采样屏幕颜色时偏移 UV 坐标：`uv += noise.r * _DistortStrength`，让画面产生折射/热浪效果。GrabPass 在 Built-in 管线中直接抓取当前屏幕到纹理，简单但性能差（每帧抓全屏）。RenderTexture 是手动将相机渲染到纹理再采样，URP/HDRP 中用此方式，可控制分辨率和时机，性能更好。移动端推荐用降分辨率的 RenderTexture 做扭曲。",
    tags: ["扭曲", "Distortion", "GrabPass", "RenderTexture"],
  },
  {
    id: "uvf-shader-vfx-3",
    chapter: "uvf-shader-vfx",
    level: 3,
    question: "如何用 Fresnel 效果实现物体边缘发光？写出核心 Shader 代码片段。",
    answer: "Fresnel 效应：视角越平行于表面（边缘），反射越强。核心公式 `fresnel = pow(1 - dot(N, V), _Power)`，N 是法线，V 是视线方向。代码：`float3 viewDir = normalize(_WorldSpaceCameraPos - worldPos); float fresnel = pow(1.0 - saturate(dot(normal, viewDir)), _Power); float3 glow = fresnel * _GlowColor.rgb; finalColor += glow;`。配合 Emission 输出到 HDR 通道，再经 Bloom 后处理产生光晕扩散。",
    tags: ["Fresnel", "边缘发光", "Shader代码", "Bloom"],
  },
  {
    id: "uvf-shader-vfx-4",
    chapter: "uvf-shader-vfx",
    level: 4,
    question: "设计一个「角色传送消失」特效，如何组合溶解+发光+扭曲三种 Shader 技术？",
    answer: "1）溶解：角色材质用噪声贴图 clip，阈值随时间从0递增到1，角色从脚到头逐渐消失；2）边缘发光：在溶解阈值附近用 step 叠加蓝色 Burn 光，随阈值推进边缘越来越亮；3）扭曲：在角色位置放一个扭曲粒子，用 GrabPass/RenderTexture 对周围画面做 UV 偏移，模拟空间撕裂感；4）配合 Emission+HDR+Bloom 让光晕扩散到周围环境。时间线：扭曲先出现（空间扰动0.2s）→溶解开始（0.5s消散）→扭曲收尾（0.3s恢复）。三者同步递进，配合音效形成完整传送特效。",
    tags: ["综合设计", "传送特效", "溶解", "发光", "扭曲"],
  },
];
