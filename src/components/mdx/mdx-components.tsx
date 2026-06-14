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
import { CoordinatePipelineDiagram } from "./diagrams/coordinate-pipeline-diagram";
import { FrustumDiagram } from "./diagrams/frustum-diagram";
import { LookAtDiagram } from "./diagrams/lookat-diagram";
import { EulerAnglesDiagram } from "./diagrams/euler-angles-diagram";
import { CameraMovementDiagram } from "./diagrams/camera-movement-diagram";
import { DiffuseNormalDiagram } from "./diagrams/diffuse-normal-diagram";
import { SpecularReflectDiagram } from "./diagrams/specular-reflect-diagram";
import { DiffuseMapDiagram } from "./diagrams/diffuse-map-diagram";
import { SpecularMapDiagram } from "./diagrams/specular-map-diagram";
import { LightCastersDiagram } from "./diagrams/light-casters-diagram";
import { AttenuationCurveDiagram } from "./diagrams/attenuation-curve-diagram";
import { MultipleLightsDiagram } from "./diagrams/multiple-lights-diagram";
import { TransformOrderDiagram } from "./diagrams/transform-order-diagram";
import { VectorOpsDiagram } from "./diagrams/vector-ops-diagram";
import { VertexPipelineDiagram } from "./diagrams/vertex-pipeline-diagram";
import { AssimpSceneGraphDiagram } from "./diagrams/assimp-scene-graph-diagram";
import { AssimpImportFlowDiagram } from "./diagrams/assimp-import-flow-diagram";
import { MeshDataLayoutDiagram } from "./diagrams/mesh-data-layout-diagram";
import { MeshTextureBindingDiagram } from "./diagrams/mesh-texture-binding-diagram";
import { NodeRecursionDiagram } from "./diagrams/node-recursion-diagram";
import { ModelCompositionDiagram } from "./diagrams/model-composition-diagram";
import { DepthBufferDiagram } from "./diagrams/depth-buffer-diagram";
import { DepthTestStepDiagram } from "./diagrams/depth-test-step-diagram";
import { DepthPrecisionDiagram } from "./diagrams/depth-precision-diagram";
import { ZFightingDiagram } from "./diagrams/z-fighting-diagram";
import { StencilBufferDiagram } from "./diagrams/stencil-buffer-diagram";
import { StencilTestFlowDiagram } from "./diagrams/stencil-test-flow-diagram";
import { StencilOutlineStepDiagram } from "./diagrams/stencil-outline-step-diagram";
import { BlendEquationDiagram } from "./diagrams/blend-equation-diagram";
import { DiscardVsBlendDiagram } from "./diagrams/discard-vs-blend-diagram";
import { AlphaSortDiagram } from "./diagrams/alpha-sort-diagram";
import { BlendSortStepDiagram } from "./diagrams/blend-sort-step-diagram";
import { WindingOrderDiagram } from "./diagrams/winding-order-diagram";
import { WindingCullStepDiagram } from "./diagrams/winding-cull-step-diagram";
import { FaceCullingDiagram } from "./diagrams/face-culling-diagram";
import { FramebufferAttachmentDiagram } from "./diagrams/framebuffer-attachment-diagram";
import { TwoPassDiagram } from "./diagrams/two-pass-diagram";
import { KernelDiagram } from "./diagrams/kernel-diagram";
import { Cubemap6FacesDiagram } from "./diagrams/cubemap-6faces-diagram";
import { SkyboxDiagram } from "./diagrams/skybox-diagram";
import { ReflectionRefractionDiagram } from "./diagrams/reflection-refraction-diagram";
import { BufferLayoutDiagram } from "./diagrams/buffer-layout-diagram";
import { BufferSubDataDiagram } from "./diagrams/buffer-subdata-diagram";
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
import { CameraDemo } from "./camera-demo";
import { LightingDemo } from "./lighting-demo";
import { LightingMapsDemo } from "./lighting/lighting-maps-demo";
import { MultiLightDemo } from "./lighting/multi-light-demo";
import { ModelDemo } from "./model-demo";
import { FramebufferDemo } from "./framebuffer-demo";
import { CubemapDemo } from "./cubemap-demo";

/**
 * MDX 结构教学组件 map（HEL-20）。
 *
 * 经 page.tsx 的 compileMDX(... components ...) 注入，使 content 下各书的 .mdx 可直接用
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
 *  - CoordinatePipelineDiagram / FrustumDiagram / LookAtDiagram（坐标系统）：
 *    五空间流水线 / 透视投影视锥体压进 NDC 立方体 / LookAt 矩阵三轴构造。同款 Server SVG。
 *  - EulerAnglesDiagram / CameraMovementDiagram（摄像机）：
 *    Pitch/Yaw/Roll 三角度示意 / WASD 沿 front·right 移动示意。同款 Server SVG。
 *  - DiffuseNormalDiagram / SpecularReflectDiagram（基础光照，HEL-51）：
 *    漫反射看法线 N 与指向光源 L 的夹角（N·L，正对最亮、背光 max 截 0）/ 镜面看反射方向 R
 *    与观察 V 的贴合度 + 反光度 shininess 是 pow(R·V,n) 的指数（n 越大斑越小越锐）。同款 Server SVG。
 *  - DiffuseMapDiagram / SpecularMapDiagram（光照贴图，HEL-53）：
 *    漫反射贴图把常量 diffuse 换成逐片段采样的底色（整块一色 → 各处各色）/ 镜面光贴图是灰度遮罩
 *    （白=反光强、黑=不反光，木箱钢边亮、木头哑），采样灰度值直接当镜面强度乘数。同款 Server SVG。
 *  - LightCastersDiagram / AttenuationCurveDiagram（投光物，HEL-54）：
 *    三类投光物对照（平行光一组平行箭头·只方向不衰减 / 点光源放射 + 同心圆越远越淡·随距离衰减 /
 *    聚光锥形 + 内外圆锥 + 切光角）/ 衰减曲线（亮度随 d 先陡后缓掉、二次项 Kq·d² 比线性下跌更狠）。同款 Server SVG。
 *  - MultipleLightsDiagram（多光源，HEL-55，光照篇收官）：
 *    每类光封成独立函数（CalcDirLight/CalcPointLight/CalcSpotLight）各算各的贡献，三份贡献
 *    汇入 ∑ 相加 = 这块表面最终色；强调「每个光独立算、结果累加」（漏加 = 只显其中一盏）。同款 Server SVG。
 *  - 模型加载篇：AssimpSceneGraph/AssimpImportFlow（Assimp）、MeshDataLayout/MeshTextureBinding（网格）、NodeRecursion/ModelComposition（模型）。同款 Server SVG。
 *  - 高级OpenGL篇·深度测试（HEL-67）：DepthBufferDiagram（每像素颜色+深度、近物盖远物）、
 *    DepthTestStepDiagram（§5 Stepper 逐片段测试每步图示：①两深度并列待比→②0.3<0.7 通过→
 *    ③写色 + 深度 0.7→0.3→④更远 0.5 丢弃、那格不变）、
 *    DepthPrecisionDiagram（非线性深度：near 刻度密 far 稀、精度堆近处）、
 *    ZFightingDiagram（两面几乎共面争夺同深度 → 撕裂条纹）。同款 Server SVG。
 *  - 高级OpenGL篇·模板测试（HEL-68）：StencilBufferDiagram（模板缓冲＝喷漆模板：每像素存整数，
 *    只在镂空/满足比较的格子让漆透到画布）、StencilTestFlowDiagram（一个片段流转：模板测试→深度测试→
 *    写颜色，标 glStencilOp 的 sfail/dpfail/dppass 三情形；模板测试在深度测试之前）、
 *    StencilOutlineStepDiagram（§5 Stepper 物体描边两遍法每步图示：①画物体 + 模板写 1→
 *    ②画放大物体 + GL_NOTEQUAL 只取外环上描边色→③留下一圈描边）。同款 Server SVG。
 *  - 高级OpenGL篇·混合（HEL-69）：BlendEquationDiagram（混合方程 C=Csrc·Fsrc+Cdst·Fdst
 *    图解：源色×源因子 + 目标色×目标因子 = 混出色，over 取 Fsrc=αsrc / Fdst=1−αsrc）、
 *    DiscardVsBlendDiagram（discard 硬边镂空·草/铁丝网 vs blend 半透明渐变·玻璃，何时用哪个）、
 *    AlphaSortDiagram（半透明排序：乱序穿帮 vs 从远到近 + 关深度写入 正确透叠）、
 *    BlendSortStepDiagram（§5 Stepper 半透明排序每步图示：①乱序穿帮→②先画不透明物→
 *    ③半透明从远到近 + 关深度写入 透叠正确）。同款 Server SVG。
 *  - 高级OpenGL篇·面剔除（HEL-70）：WindingOrderDiagram（环绕顺序判正背：v0→v1→v2 逆时针 CCW=正面
 *    保留 vs 顺时针 CW=背面剔除，并排对照）、WindingCullStepDiagram（§5 Stepper 环绕判正背每步图示：
 *    ①模型里顶点统一逆时针定义→②投影到屏幕后朝你的仍 CCW=正面 / 背对你的反转成 CW=背面→
 *    ③背面被剔除不画、省片段开销）、FaceCullingDiagram（剔除关 vs 开 同构同框：culled=false 背面也画、
 *    透视看到内壁穿帮 / culled=true 只画正面、干净省一半，供 CompareSlider 两侧分别传）。同款 Server SVG。
 *  - 高级OpenGL篇·帧缓冲（HEL-71）：FramebufferAttachmentDiagram（帧缓冲 FBO = 只是个「框」+
 *    挂在上面的颜色纹理附件 / 深度 renderbuffer 附件，旁标 checkFramebufferStatus 完整性检查）、
 *    TwoPassDiagram（§5 Stepper 两遍渲染每步图示：①第一遍绑自建 FBO 把场景渲进颜色纹理→
 *    ②绑回默认帧缓冲取出离屏纹理→③第二遍全屏四边形采样纹理 + 后处理核 上屏）、
 *    KernelDiagram（3×3 卷积核怎么对邻域 9 格加权求和：邻域 ⊗ 权重核 = 新色，权重和 1 不变亮暗 / 0 突出边缘）。同款 Server SVG。
 *  - 高级OpenGL篇·立方体贴图（HEL-72）：Cubemap6FacesDiagram（立方体贴图＝6 张面图 +X/−X/+Y/−Y/+Z/−Z
 *    十字展开 + 一根从中心射出的方向向量命中某面某点示意「用方向向量采样、不是 uv」）、
 *    SkyboxDiagram（天空盒去平移对照：没去平移则盒子跟相机位移糊脸 vs 去平移 mat3(view) 盒永以相机为中心在最远处）、
 *    ReflectionRefractionDiagram（反射 R=reflect(I,N) 关于法线对称弹出 vs 折射 R=refract(I,N,ratio)
 *    穿界面弯折、弯折量由 ratio=n₁/n₂ 定）。同款 Server SVG。
 *  - 高级OpenGL篇·高级数据（HEL-73）：BufferLayoutDiagram（mode=interleaved/batched/compare：交错布局
 *    一个顶点 P|N|U 挨着重复·stride=32 共用·offset 0/12/24 vs 分批布局 所有 P 一段|所有 N 一段|所有 U 一段·
 *    各属性独立 stride=12/12/8·offset=各段起点；compare 两条并列「同一 VAO 只是 stride/offset 填法不同」，
 *    兼作 §5 Stepper 三步配图）、BufferSubDataDiagram（glBufferData 整块重建 vs glBufferSubData(offset,size,data)
 *    只覆盖中间一段·标 offset 起点 + size 长度）。同款 Server SVG。
 *
 * WebGL 摄像机视角交互演示（摄像机章 CameraDemo）：
 *  - Client（dynamic 边界）：CameraDemo —— WebGL2 能力检测 + next/dynamic(ssr:false)
 *    懒加载 CameraCanvas（独立 chunk，硬规则 2/6）。网格 + 彩色立方体场景，
 *    pitch/yaw/distance/fov 滑块驱动 lookAt 视角，按需重绘。
 *
 * WebGL Phong 光照交互演示（「光照篇」2–6 章共享主 viz LightingDemo，HEL-49）：
 *  - Client（dynamic 边界）：LightingDemo —— WebGL2 能力检测 + next/dynamic(ssr:false)
 *    懒加载 LightingCanvas（独立 chunk，硬规则 2/6）。带法线立方体 + 可公转点光源
 *    （小自发光标记），片元做 ambient+diffuse+specular Phong；光源方位/环境强度/
 *    镜面强度/高光指数滑块 + 重置，uniform 驱动按需重绘（不重编译、不挂常驻 rAF）。
 *    复用 camera-math 矩阵基座（新增 mat3 法线矩阵 / 归一化 / 叉乘 / 带法线立方体）。
 *
 * WebGL 光照贴图渐进演示（lighting-maps 章 LightingMapsDemo，HEL-65）：
 *  - Client（dynamic 边界）：LightingMapsDemo —— WebGL2 能力检测 + next/dynamic(ssr:false)
 *    懒加载 LightingMapsCanvas（独立 chunk，硬规则 2/6）。贴图立方体（程序化木箱风 diffuse +
 *    配套灰度 specular 遮罩，零外部资源，UV 严格对齐）+ 公转点光源（小亮块标记）。
 *    三步推进：常量材质 → +漫反射贴图（texture(diffuseMap).rgb）→ +镜面光贴图遮罩
 *    （×texture(specularMap).r）；第 3 步只有钢边/铆钉随光高光、木面哑光。
 *    自带「位置+法线+UV」立方体常量（不改 camera-math 共享常量）；光源方位滑块 + 自转开关
 *    （reduced-motion 默认关、离屏停转）+ 重置；切步/改参仅改 uniform 按需重绘，不重编译。
 *
 * WebGL 多光源交互演示（multiple-lights 章 MultiLightDemo，HEL-66）：
 *  - Client（dynamic 边界）：MultiLightDemo —— WebGL2 能力检测 + next/dynamic(ssr:false)
 *    懒加载 MultiLightCanvas（独立 chunk，硬规则 2/6）。一个立方体同时叠加 1 平行光 +
 *    至多 4 点光源（可增删，GLSL 固定大小数组 + uActivePointCount 循环防越界）+ 1 聚光；
 *    片元对每类光各算一份 ambient+diffuse+specular Phong 后相加，**不 clamp**，被多盏同照处
 *    可顶白过曝（本章核心现象）。主从控件（≤5）：顶部灯管理（选灯/开关/点光源 ＋－）+
 *    下方只显示选中那盏的颜色/方位/强度/衰减或切光角 + 重置；默认布灯开箱即「多盏叠加亮处过曝」。
 *    uniform 驱动按需重绘（不重编译、不挂常驻 rAF），离屏暂停，卸载释放 GL 资源。
 *
 * R3F 交互式模型查看器（「模型加载篇·模型 Model 章」ModelDemo，HEL-58）：
 *  - Client（dynamic 边界）：ModelDemo —— WebGL2 能力检测 + next/dynamic(ssr:false)
 *    懒加载 ModelCanvas（独立 chunk，硬规则 2/6）。复用 Hero 的 ferrari.glb（drei useGLTF
 *    + 本地 Draco decoder，不新增资源、不跑 gltf-transform，硬规则 3）。
 *    教学核心「模型 = 一堆有名字的 mesh」：运行时 scene.traverse 收集所有 isMesh 节点生成
 *    下拉，选某 mesh = 高亮该件 + 压暗其余；线框开关 + 自转开关（reduced-motion 默认关）+ 重置。
 *    frameloop="demand" + IntersectionObserver 离屏停转（不空转 rAF）。
 *
 * WebGL 帧缓冲「渲到纹理 + 后处理核」交互演示（「高级OpenGL篇·帧缓冲」FramebufferDemo，HEL-71）：
 *  - Client（dynamic 边界）：FramebufferDemo —— WebGL2 能力检测 + next/dynamic(ssr:false)
 *    懒加载 FramebufferCanvas（独立 chunk，硬规则 2/6）。真两遍渲染：第一遍把自转彩色立方体
 *    （复用 camera-math 带法线立方体 + 矩阵，开深度测试）渲进自建 FBO 的颜色纹理附件 + 深度
 *    renderbuffer 附件（checkFramebufferStatus 验完整）；第二遍绑回默认帧缓冲、关深度测试，
 *    画铺满 NDC 的全屏四边形采样离屏纹理，按 uKernel 0..4 输出 原图/反相/灰度/模糊(3×3 均值核)/
 *    边缘检测(3×3 边缘核)。控件：5 核分段选择器（默认原图）+ 重置；reduced-motion 默认不自转、
 *    IntersectionObserver 离屏停转、resize 重建附件、卸载释放全部 GL 资源。
 *
 * R3F 立方体贴图「天空盒 + 反射/折射/漫反射」交互演示（「高级OpenGL篇·立方体贴图」CubemapDemo，HEL-72）：
 *  - Client（dynamic 边界）：CubemapDemo —— WebGL2 能力检测 + next/dynamic(ssr:false)
 *    懒加载 CubemapCanvas（独立 chunk，硬规则 2/6）。R3F + drei 实现，避开手写裸 WebGL2 两遍管线。
 *    程序化环境（禁外部资源，硬规则 3）：6 面用 canvas 代码画「黄昏天空盒」（上紫天/下近黑地/
 *    四周地平线渐变 + 网格 + 方位字 RIGHT/LEFT/…）拼成 CubeTexture，设为 scene.background（天空盒
 *    去平移由 three background 机制自动完成）+ 一个 BackSide 大球作冗余背景。中央球三材质切换：
 *    反射（MeshStandardMaterial metalness=1/roughness=0 + envMap 全镜面）/ 折射（drei
 *    MeshTransmissionMaterial 玻璃 ior 1.5）/ 漫反射（哑光中性、不挂 envMap 对照）。控件：材质
 *    分段选择器（默认反射）+ OrbitControls 拖拽转视角/滚轮缩放 + 重置；frameloop="demand"、
 *    OrbitControls onChange/切材质/离屏恢复时 invalidate，无自转动画（天然 reduced-motion 友好），
 *    卸载 dispose 立方体贴图。
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
  CameraDemo,
  LightingDemo,
  LightingMapsDemo,
  MultiLightDemo,
  ModelDemo,
  FramebufferDemo,
  CubemapDemo,
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
  CoordinatePipelineDiagram,
  FrustumDiagram,
  LookAtDiagram,
  EulerAnglesDiagram,
  CameraMovementDiagram,
  DiffuseNormalDiagram,
  SpecularReflectDiagram,
  DiffuseMapDiagram,
  SpecularMapDiagram,
  LightCastersDiagram,
  AttenuationCurveDiagram,
  MultipleLightsDiagram,
  AssimpSceneGraphDiagram,
  AssimpImportFlowDiagram,
  MeshDataLayoutDiagram,
  MeshTextureBindingDiagram,
  NodeRecursionDiagram,
  ModelCompositionDiagram,
  DepthBufferDiagram,
  DepthTestStepDiagram,
  DepthPrecisionDiagram,
  ZFightingDiagram,
  StencilBufferDiagram,
  StencilTestFlowDiagram,
  StencilOutlineStepDiagram,
  BlendEquationDiagram,
  DiscardVsBlendDiagram,
  AlphaSortDiagram,
  BlendSortStepDiagram,
  WindingOrderDiagram,
  WindingCullStepDiagram,
  FaceCullingDiagram,
  FramebufferAttachmentDiagram,
  TwoPassDiagram,
  KernelDiagram,
  Cubemap6FacesDiagram,
  SkyboxDiagram,
  ReflectionRefractionDiagram,
  BufferLayoutDiagram,
  BufferSubDataDiagram,
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
