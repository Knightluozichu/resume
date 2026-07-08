import type { ReviewQuestion } from "./types";

export const RtrGlobalIlluminationQuestions: ReviewQuestion[] = [
  {
    id: "rtr-global-illumination-1",
    chapter: "rtr-global-illumination",
    level: 1,
    question: "全局光照（GI）解决的是什么问题？直接光照为什么不够？",
    answer: "GI 解决间接光照——光线弹射多次后照亮直接光照不到的区域。直接光照只算光源到表面的直射，角落、缝隙、阴影区会全黑不真实。GI 模拟光弹射让这些区域有柔和的环境光。",
    tags: ["GI", "间接光照"],
  },
  {
    id: "rtr-global-illumination-2",
    chapter: "rtr-global-illumination",
    level: 2,
    question: "球谐函数（SH）在实时 GI 中的作用是什么？为什么用低阶 SH？",
    answer: "SH 把球面方向的光照分布用一组正交基函数近似。用低阶（2阶或3阶）SH 存储预计算的环境光或探针光照，在运行时用 SH 系数重建低频光照。低阶只能表达低频（平滑）光照，但足以模拟柔和的间接光，且系数少（9-16个）存储和计算高效。",
    tags: ["球谐函数", "SH", "探针"],
  },
  {
    id: "rtr-global-illumination-3",
    chapter: "rtr-global-illumination",
    level: 3,
    question: "光照贴图（Lightmap）和光照探针（Light Probe）分别适用于什么场景？",
    answer: "光照贴图预计算静态几何的间接光到纹理，适合不动的物体（墙壁地面），质量高但只能静态。光照探针在场景中布置采样点存 SH 系数，动态物体根据位置插值附近探针获取间接光，适合动态物体但精度低。两者常结合：静态用贴图、动态用探针。",
    tags: ["Lightmap", "Light Probe", "静态动态"],
  },
  {
    id: "rtr-global-illumination-4",
    chapter: "rtr-global-illumination",
    level: 4,
    question: "VXGI、SSAO、SSRT 三种实时 GI 技术的原理和局限分别是什么？",
    answer: "VXGI：把场景体素化存层级树，从光源追踪体素求间接光，质量好但体素化开销大。SSAO：屏幕空间环境光遮蔽，只算接触阴影不真正算 GI，简单但只是近似遮蔽。SSRT（屏幕空间光线追踪）：从 G-Buffer 做屏幕空间光线弹射求反射/间接光，质量不错但屏幕外信息缺失穿帮。三者都在速度和质量间权衡，现代偏向硬件光追。",
    tags: ["VXGI", "SSAO", "SSRT", "实时GI"],
  },
];
