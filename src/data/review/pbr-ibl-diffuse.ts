/** 复习题库 · IBL 漫反射辐照（pbr-ibl-diffuse）。HEL-166 PBR 篇复习。 */

import type { ReviewQuestion } from "./types";

export const pbrIblDiffuseQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / API / 数值约定） ──
  {
    id: "ibld-1",
    chapter: "pbr-ibl-diffuse",
    level: 1,
    question: "什么是 IBL？全称是什么？",
    answer:
      "IBL = Image-Based Lighting（基于图像的光照）。核心思想：用一张（或多张）图像代替离散光源，把图像上每个像素都当作一个方向的入射光，从而捕捉真实世界的复杂光照环境。分漫反射 IBL（辐照度贴图）和镜面 IBL（预滤波环境贴图 + BRDF LUT）两部分。",
    tags: ["IBL", "定义"],
  },
  {
    id: "ibld-2",
    chapter: "pbr-ibl-diffuse",
    level: 1,
    question: "什么是 HDR 环境贴图？为什么漫反射 IBL 必须用 HDR 格式？",
    answer:
      "HDR 环境贴图使用浮点数（如 RGBE 或 float16）存储颜色值，允许超过 1.0 的亮度，真实保留高光与阴影的亮度差。普通 8bit JPG 把高光截断为 1.0，卷积出的辐照度整体偏低、高光区域失真。文件格式通常是 `.hdr`（RGBE）或 `.exr`（OpenEXR），上传 GPU 需用 `GL_RGB16F` 格式。",
    tags: ["HDR", "环境贴图"],
  },
  {
    id: "ibld-3",
    chapter: "pbr-ibl-diffuse",
    level: 1,
    question: "什么是「等距柱状投影」（Equirectangular Projection）？宽高比是多少？",
    answer:
      "等距柱状投影把球面展开成矩形：横轴是经度（0°~360°，方位角），纵轴是纬度（-90°~90°，仰角）。宽高比为 **2:1**（常见如 4096×2048）。优点简单直观，缺点是极点区域严重拉伸。常见于 `.hdr` 全景贴图格式。",
    tags: ["等距柱状投影", "定义"],
  },
  {
    id: "ibld-4",
    chapter: "pbr-ibl-diffuse",
    level: 1,
    question: "什么是「辐照度」（Irradiance）？为什么漫反射 IBL 只需要辐照度贴图？",
    answer:
      "辐照度是单位面积上从所有方向接收到的辐射通量总和（单位 W/m²）。漫反射 BRDF（Lambertian）只依赖**法线方向**的辐照度，与入射方向细节无关——因为漫反射是均匀散射，不区分光从哪个方向来，只关心总量。因此可以预计算：对每个法线方向积分出辐照度，存成辐照度贴图。",
    tags: ["辐照度", "定义"],
  },
  {
    id: "ibld-5",
    chapter: "pbr-ibl-diffuse",
    level: 1,
    question: "辐照度贴图的分辨率通常是多少？为什么这么低的分辨率就够用？",
    answer:
      "通常只需 **32×32**（或 64×64）。漫反射是低频信号——辐照度是半球方向的积分，相邻法线方向的辐照度值变化平缓，不含高频边缘细节。高分辨率只会浪费显存和采样带宽，32×32 对漫反射已经足够精确。",
    tags: ["辐照度贴图", "分辨率"],
  },
  {
    id: "ibld-6",
    chapter: "pbr-ibl-diffuse",
    level: 1,
    question: "`SampleSphericalMap` 函数的作用是什么？两个反三角函数分别对应什么？",
    answer:
      "把归一化方向向量转成等距柱状贴图 UV（0~1 范围）。`atan(v.z, v.x)` 算方位角（对应横轴经度）；`asin(v.y)` 算仰角（对应纵轴纬度）。乘以 `invAtan = vec2(1/2π, 1/π)` 把范围归一化到 (-0.5, 0.5)，再 +0.5 移到 (0, 1)。",
    tags: ["SampleSphericalMap", "等距柱状"],
  },
  {
    id: "ibld-7",
    chapter: "pbr-ibl-diffuse",
    level: 1,
    question: "辐照度卷积公式里，`cos(theta)` 和 `sin(theta)` 权重分别补偿什么？",
    answer:
      "`cos(theta)` 是朗伯余弦律——正对法线（theta=0，顶部）的方向对辐照度贡献最大；`sin(theta)` 是球面面积雅可比补偿——越靠近赤道（theta=90°），同样角度增量对应的球面面积越大，需要更高权重。两者合起来构成球坐标积分 $d\\Omega = \\sin\\theta \\, d\\theta \\, d\\phi$ 的加权。",
    tags: ["辐照度卷积", "权重"],
  },
  {
    id: "ibld-8",
    chapter: "pbr-ibl-diffuse",
    level: 1,
    question: "什么是 `fresnelSchlickRoughness`？它与直接光照用的 `fresnelSchlick` 的区别是什么？",
    answer:
      "`fresnelSchlickRoughness(cosTheta, F0, roughness)` 是 IBL 专用 Fresnel 变体。区别：把 `(1.0 - F0)` 替换成 `(max(vec3(1.0-roughness), F0) - F0)`，用 roughness 压低掠射角时的最大反射率。粗糙面掠射角不应达到全反射（1.0），用 roughness 压下上限，防止 kS→1 导致漫反射 IBL 消失。",
    tags: ["fresnelSchlickRoughness", "IBL"],
  },
  {
    id: "ibld-9",
    chapter: "pbr-ibl-diffuse",
    level: 1,
    question: "漫反射 IBL 最终替换掉直接光照着色器里哪一行？改成什么？",
    answer:
      "替换掉：`vec3 ambient = vec3(0.03) * albedo;`\n改成：`vec3 kS_ibl = fresnelSchlickRoughness(max(dot(N,V),0.0), F0, roughness); vec3 kD_ibl = (1.0-kS_ibl)*(1.0-metallic); vec3 irradiance = texture(irradianceMap, N).rgb; vec3 ambient = kD_ibl * irradiance * albedo;`",
    tags: ["漫反射IBL", "代码"],
  },
  {
    id: "ibld-10",
    chapter: "pbr-ibl-diffuse",
    level: 1,
    question: "辐照度卷积最后为什么要乘以 $\\pi$，即 `irradiance = PI * irradiance / nrSamples`？",
    answer:
      "球面漫反射积分的归一化因子：把均匀采样的黎曼和近似换算成真正的半球积分，需要乘以积分域的「面积因子」$\\pi$（半球立体角 = $2\\pi$，再除以 Lambertian 归一化的 $1/\\pi$，合起来是 $\\pi$）。最终积分结果才与 PBR 漫反射 BRDF 的 $c/\\pi$ 相乘后能量正确守恒。",
    tags: ["辐照度卷积", "PI", "归一化"],
  },
  {
    id: "ibld-11",
    chapter: "pbr-ibl-diffuse",
    level: 1,
    question: "把等距柱状 HDR 转成 Cubemap 需要渲染几次？每次渲染什么？",
    answer:
      "渲染 **6 次**，对应立方体贴图的 6 个面（+X/-X/+Y/-Y/+Z/-Z）。每次渲染朝向对应面方向的场景，片段着色器用面内的方向向量调用 `SampleSphericalMap` 从 HDR 贴图采样颜色，将结果写入该面的 framebuffer。6 次渲染完成后，Cubemap 包含了完整的 360° 环境贴图。",
    tags: ["Cubemap", "转换"],
  },
  {
    id: "ibld-12",
    chapter: "pbr-ibl-diffuse",
    level: 1,
    question: "辐照度卷积的双重循环分别是什么变量？步长 `sampleDelta = 0.025` 对应约多少次采样？",
    answer:
      "外层循环 `phi ∈ [0, 2π]`（方位角），内层循环 `theta ∈ [0, π/2]`（仰角，只到半球顶部）。步长 0.025 rad，外层 $2\\pi / 0.025 \\approx 251$ 步，内层 $\\pi/2 / 0.025 \\approx 63$ 步，合计约 **$251 \\times 63 \\approx 15813$ 次采样**（原文说约 5000，取决于实现细节）。",
    tags: ["辐照度卷积", "采样"],
  },
  {
    id: "ibld-13",
    chapter: "pbr-ibl-diffuse",
    level: 1,
    question: "等距柱状转 Cubemap 时，为什么必须对 `localPos` 先做 `normalize`？",
    answer:
      "渲染立方体六面时，`localPos` 是立方体顶点插值得到的本地坐标，不一定是单位向量（立方体顶点距原点长度不等于 1）。直接传给 `SampleSphericalMap` 而不先 normalize，`atan` 和 `asin` 的输入不在单位球面上，UV 映射出错，接缝处出现黑线或拉伸变形。必须先 `vec3 N = normalize(localPos)`。",
    tags: ["Cubemap", "normalize", "排错"],
  },
  {
    id: "ibld-14",
    chapter: "pbr-ibl-diffuse",
    level: 1,
    question: "辐照度卷积产生的贴图要用什么 GPU 纹理格式存储？为什么？",
    answer:
      "必须用浮点格式，如 `GL_RGB16F`（half float）或 `GL_RGB32F`。因为辐照度值是从 HDR 环境贴图积分得到的，保留了超过 1.0 的亮度值；用 `GL_RGB8` 会截断，高光区域的辐照度被压缩到 1.0，IBL 整体偏暗且失真。",
    tags: ["辐照度贴图", "格式"],
  },
  {
    id: "ibld-15",
    chapter: "pbr-ibl-diffuse",
    level: 1,
    question: "IBL 的漫反射贡献怎样采样辐照度贴图？输入什么？",
    answer:
      "`vec3 irradiance = texture(irradianceMap, N).rgb;`\n输入是片段的世界空间法线向量 N。辐照度贴图以方向向量为索引，返回该法线方向上半球积分出的漫反射光总量。法线指向天空方向时得到天空颜色，指向地面时得到地面反光颜色。",
    tags: ["辐照度贴图", "采样"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "ibld-16",
    chapter: "pbr-ibl-diffuse",
    level: 2,
    question: "为什么开启 IBL 后球的暗面不再是死黑？IBL 给了暗面什么？",
    answer:
      "直接光照只有 4 盏点光源，球背对光源的一面没有直接光照，`Lo ≈ 0`，常量 `0.03 * albedo` 几乎黑。IBL 把整个环境（天空、地面等）都当光源——球的暗面虽然背对点光源，但仍面朝某个方向（天空或地面），辐照度贴图以法线采样，返回该方向来的环境光，暗面因此收到来自天空/地面的漫反射光，不再死黑。",
    tags: ["IBL", "暗面"],
  },
  {
    id: "ibld-17",
    chapter: "pbr-ibl-diffuse",
    level: 2,
    question: "为什么 IBL 里 Fresnel 要用 `fresnelSchlickRoughness` 而不用普通 `fresnelSchlick`？",
    answer:
      "IBL 的输入 `cosTheta = dot(N, V)`（法线与观察方向），不是 `dot(H, V)`（半程向量与观察方向）。当观察方向与法线成大角度（掠射角），`dot(N,V)→0`，普通 `fresnelSchlick` 结果趋近 1.0，把 kS 推到 1，kD = 0，漫反射 IBL 全消失——粗糙非金属边缘变成一圈暗带，不物理正确。`fresnelSchlickRoughness` 用 roughness 压低上限，粗糙面掠射角不达到全反射。",
    tags: ["fresnelSchlickRoughness", "IBL", "为什么"],
  },
  {
    id: "ibld-18",
    chapter: "pbr-ibl-diffuse",
    level: 2,
    question: "为什么辐照度贴图可以用 32×32 这么低的分辨率？什么情况下 32×32 会不够用？",
    answer:
      "漫反射 BRDF 是低通滤波器：来自所有方向的光被积分加权（余弦权重），输出结果是平滑的低频函数——邻近法线方向的辐照度差异极小。高频环境细节（太阳亮点、窗帘透光）在积分后被平滑掉，32×32 已足够。32×32 不够用的情况：极端高对比度环境（如只有一个极小强光源）或需要各向异性材质时辐照度会有高频分量，但在实践中极少见。",
    tags: ["辐照度贴图", "分辨率", "低频"],
  },
  {
    id: "ibld-19",
    chapter: "pbr-ibl-diffuse",
    level: 2,
    question: "辐照度卷积里，如果去掉 `sin(theta)` 权重，会出现什么偏差？",
    answer:
      "去掉 `sin(theta)` 后，各方向的采样贡献一视同仁——但球面上越靠近极点（theta→0），每个角度增量对应的球面面积越小；越靠近赤道（theta→90°），面积越大。不加 sin 权重，极点附近被严重过度计数，辐照度贴图偏向极点方向的环境色（法线朝上或朝下的颜色被过度放大），结果偏亮偏色。",
    tags: ["辐照度卷积", "sin权重"],
  },
  {
    id: "ibld-20",
    chapter: "pbr-ibl-diffuse",
    level: 2,
    question: "为什么 IBL 的漫反射贡献要乘以 `kD_ibl` 而不能直接用 `irradiance * albedo`？",
    answer:
      "`kD_ibl = (1.0-kS_ibl)*(1.0-metallic)` 是能量守恒因子：`kS_ibl` 是 Fresnel 反射占比（反射出去的），剩下的 `(1-kS_ibl)` 才是能折射进去变成漫反射的部分；再乘 `(1-metallic)` 确保金属没有漫反射。不乘 kD_ibl，漫反射 + 镜面反射的能量之和超过入射，破坏能量守恒，画面整体偏亮。",
    tags: ["kD_ibl", "能量守恒"],
  },
  {
    id: "ibld-21",
    chapter: "pbr-ibl-diffuse",
    level: 2,
    question: "IBL 开关对非金属球的影响 vs 对金属球的影响有什么区别？",
    answer:
      "非金属（metallic=0）：kD_ibl > 0，漫反射 IBL 有贡献，开 IBL 后暗面明显变亮，颜色受环境方向影响（朝上偏蓝天色，朝下偏地面色）。金属（metallic=1）：kD_ibl = 0，漫反射 IBL = 0，开 IBL 对暗面漫反射没有影响（金属无漫反射）。镜面 IBL（下一章）才是金属的主要 IBL 贡献。",
    tags: ["IBL", "金属", "非金属"],
  },
  {
    id: "ibld-22",
    chapter: "pbr-ibl-diffuse",
    level: 2,
    question: "为什么立方体贴图（Cubemap）比等距柱状投影更适合作为 GPU 环境贴图采样的格式？",
    answer:
      "GPU 硬件支持 Cubemap 的各向同性 bilinear 滤波——用 3D 方向向量直接索引，硬件自动确定命中哪个面并做滤波，效率极高。等距柱状投影需要每次在着色器里做反三角函数计算（`atan`/`asin`），较慢；极点附近纹素密度极高（拉伸），采样质量不均；且不支持 mipmap 的方向均匀分布。Cubemap 这些都优于等距柱状。",
    tags: ["Cubemap", "等距柱状投影", "对比"],
  },
  {
    id: "ibld-23",
    chapter: "pbr-ibl-diffuse",
    level: 2,
    question: "辐照度预计算是「离线」的——这意味着什么？运行时开销如何？",
    answer:
      "离线预计算：在加载场景时（或美术工具中）计算一次，把结果存成纹理，运行时不再重算。运行时开销极低：片段着色器里只需一次纹理采样 `texture(irradianceMap, N)`，成本等同于普通贴图采样。如果不预计算而是每帧积分，每像素需数千次环境贴图采样，完全不可实时。",
    tags: ["预计算", "开销"],
  },
  {
    id: "ibld-24",
    chapter: "pbr-ibl-diffuse",
    level: 2,
    question: "辐照度贴图里，法线朝上（N.y≈1）和法线朝下（N.y≈-1）采样到的颜色分别是什么？物理直觉是什么？",
    answer:
      "法线朝上（面朝天空方向）：采样到天空颜色（蓝色、阳光方向的明亮区域），物理上这块面接收来自天空的漫反射光，应偏蓝。法线朝下（面朝地面方向）：采样到地面颜色（棕色、草地绿等），物理上这块面被地面反光照亮。这正是辐照度贴图的工作原理——用法线方向采样，每个方向返回该方向聚集的环境漫反射光。",
    tags: ["辐照度贴图", "方向"],
  },
  {
    id: "ibld-25",
    chapter: "pbr-ibl-diffuse",
    level: 2,
    question: "为什么去掉 `kD_ibl` 中的 `(1.0-kS_ibl)` 能量守恒因子，高光边缘会出现「不物理的亮晕」？",
    answer:
      "在掠射角（球边缘），`kS_ibl` 被 Fresnel 拉高（接近 1.0），镜面反射占用了大部分能量。去掉 `(1-kS_ibl)` 后，`kD_ibl = 1.0-metallic`，不管镜面已经消耗了多少能量，漫反射仍按满量来。边缘区域漫反射 + 镜面之和超过 1（能量不守恒），出现亮晕——漫反射 IBL 没有被镜面反射的增强对应压低。",
    tags: ["能量守恒", "kS_ibl", "掠射角"],
  },
  {
    id: "ibld-26",
    chapter: "pbr-ibl-diffuse",
    level: 2,
    question: "HDR 环境贴图加载时用 `GL_RGB8` 和 `GL_RGB16F` 的区别是什么？IBL 计算哪个更准确？",
    answer:
      "`GL_RGB8`：每通道 8 位无符号整数，值域 0~255 归一化到 0~1，超过 1.0 的亮度被截断。`GL_RGB16F`：每通道 16 位半精度浮点，可存储超过 1.0 的 HDR 亮度值。IBL 计算必须用 `GL_RGB16F`（或 `GL_RGB32F`）：高光区域（太阳直射）辐射度远超 1.0，用 8 位截断后辐照度卷积低估高光方向的贡献，IBL 整体偏暗失真。",
    tags: ["HDR", "GL_RGB16F", "格式"],
  },
  {
    id: "ibld-27",
    chapter: "pbr-ibl-diffuse",
    level: 2,
    question: "辐照度卷积步长 `sampleDelta` 调大（如 0.2）和调小（如 0.005）各有什么影响？",
    answer:
      "步长太大（0.2）：采样方向稀疏，积分精度低，辐照度贴图出现规则条纹或走样（phi/theta 网格的走样伪影），不平滑。步长太小（0.005）：每个法线方向需要更多采样点，预计算时间急剧增长（步长减半，时间 × 4）。实践选择 0.025 平衡精度与速度，也可用重要性采样（蒙特卡洛）替代均匀格点。",
    tags: ["辐照度卷积", "步长"],
  },
  {
    id: "ibld-28",
    chapter: "pbr-ibl-diffuse",
    level: 2,
    question: "IBL 的漫反射贡献为什么不需要法线贴图（normal map）参与？",
    answer:
      "漫反射 IBL 用的是宏观法线 N（来自几何体或法线贴图），辐照度贴图以 N 采样。如果用法线贴图的扰动法线，辐照度贴图采样到的方向也随法线变化，确实需要法线贴图参与。实际上法线贴图影响的是 N 的方向，IBL 漫反射会随之变化——法线贴图是参与的，只是它的贡献体现在法线 N 本身已经被扰动了，不需要额外处理。",
    tags: ["法线贴图", "IBL"],
  },
  {
    id: "ibld-29",
    chapter: "pbr-ibl-diffuse",
    level: 2,
    question: "漫反射 IBL 只替换了「环境光」那一行，为什么直接光照（Lo 的 for 循环）不需要改？",
    answer:
      "直接光照（Lo）计算的是来自离散光源（点光源等）的直接贡献，与环境光照完全独立。IBL 漫反射替换的是「来自环境的漫反射背景光」（ambient），对应反射率方程里的环境积分部分。两者叠加（`color = ambient + Lo`）是物理正确的——直接光 + 间接环境光，不需要相互修改。",
    tags: ["IBL", "直接光照", "独立性"],
  },
  {
    id: "ibld-30",
    chapter: "pbr-ibl-diffuse",
    level: 2,
    question: "Demo 里 IBL 滑块在 0~1 之间，这个 `mix(vec3(0.03)*albedo, kD_ibl*diffuseIBL, uIBL)` 是什么作用？",
    answer:
      "用 `mix` 在「常量环境光（IBL=0）」和「真实漫反射 IBL（IBL=1）」之间线性插值，方便用户对比两种效果。物理上这只是演示用的过渡，真实实现选其中一种（不会混合两种环境光模型）。通过滑块可以直观感受 IBL 对暗面和颜色的影响。",
    tags: ["IBL", "Demo", "mix"],
  },

  // ── L3 应用（给参数判结果 / 改法 / 读代码） ──
  {
    id: "ibld-31",
    chapter: "pbr-ibl-diffuse",
    level: 3,
    question: "把 `fresnelSchlickRoughness` 误用了普通 `fresnelSchlick`（直接光照版），粗糙非金属球边缘会出什么问题？",
    answer:
      "用 `dot(N,V)` 作为 cosTheta：掠射角时 `dot(N,V)→0`，普通 `fresnelSchlick` 返回接近 1.0，`kS→1`，`kD = 1-kS→0`，漫反射 IBL 消失。非金属球（kD 应该大）的边缘出现一圈暗带（漫反射被压没了），视觉上边缘看起来像黑边，与粗糙表面应有的散射特性矛盾。修法：换用 `fresnelSchlickRoughness`，roughness 压低掠射角上限。",
    tags: ["fresnelSchlickRoughness", "排错"],
  },
  {
    id: "ibld-32",
    chapter: "pbr-ibl-diffuse",
    level: 3,
    question: "辐照度卷积着色器里把 `cos(theta) * sin(theta)` 改成只有 `cos(theta)`，辐照度贴图会偏向什么方向？",
    answer:
      "去掉 `sin(theta)` 后，极点附近（theta≈0，法线朝正上方）每个角度增量被错误地赋予与赤道同等的球面面积权重，但极点实际面积极小，被过度计数。辐照度偏向极点方向（朝正上方/正下方）的环境色，天顶和地底的颜色被放大，中间方向被低估。球面朝上的区域 IBL 偏亮，朝斜面的 IBL 偏暗。",
    tags: ["辐照度卷积", "排错"],
  },
  {
    id: "ibld-33",
    chapter: "pbr-ibl-diffuse",
    level: 3,
    question: "在 Demo 中把 `proceduralIrradiance` 的天空颜色从蓝色改成红橙色日落，观察结果并解释原因。",
    answer:
      "球面法线朝上（N.y≈1）的暗面区域，`skyFactor≈1`，辐照度返回红橙色，暗面偏红橙。法线朝下（N.y≈-1）的区域，辐照度返回地面颜色（不变），暗面偏地面色。中间的赤道区域渐变。物理解释：朝上的面被天空照亮，天空颜色变了，这些面收到的环境光颜色也变了，IBL 正确地按法线方向分配不同方向的环境色。",
    tags: ["IBL", "Demo", "颜色"],
  },
  {
    id: "ibld-34",
    chapter: "pbr-ibl-diffuse",
    level: 3,
    question: "把辐照度贴图分辨率从 32×32 提升到 512×512，会对视觉效果和性能各有什么影响？",
    answer:
      "视觉效果：几乎没有肉眼可见的改变——漫反射是低频信号，32×32 已经捕捉了所有有意义的方向变化。性能：预计算时间增加 $(512/32)^2 = 256$ 倍（但只做一次），每帧运行时采样开销几乎不变（GPU 纹理采样速度与分辨率无关，只要不超出缓存）。结论：提升分辨率浪费预计算时间和显存，视觉收益微乎其微，32×32 是经验最优。",
    tags: ["辐照度贴图", "分辨率", "性能"],
  },
  {
    id: "ibld-35",
    chapter: "pbr-ibl-diffuse",
    level: 3,
    question: "IBL = 1 时，粗糙度拉到最高（roughness=1）与拉到最低（roughness=0.05）时暗面的 IBL 亮度有什么区别？原因是什么？",
    answer:
      "roughness=1：`fresnelSchlickRoughness` 的掠射角上限被压低，kS_ibl 较小，kD_ibl 较大（更多能量给漫反射），暗面从 IBL 收到的漫反射贡献更多，暗面更亮更饱满。roughness=0.05：kS_ibl 较高（低粗糙度意味着更强的镜面反射），kD_ibl 较小，漫反射 IBL 贡献较少，暗面相对偏暗。高粗糙度的暗面「饱满感」更强。",
    tags: ["粗糙度", "IBL", "暗面"],
  },
  {
    id: "ibld-36",
    chapter: "pbr-ibl-diffuse",
    level: 3,
    question: "写出漫反射 IBL 的完整 GLSL 代码片段（从 kS_ibl 到最终 ambient，不含直接光照部分）。",
    answer:
      "```glsl\nvec3 kS_ibl = fresnelSchlickRoughness(max(dot(N, V), 0.0), F0, roughness);\nvec3 kD_ibl = (1.0 - kS_ibl) * (1.0 - metallic);\nvec3 irradiance = texture(irradianceMap, N).rgb;\nvec3 diffuseIBL = irradiance * albedo;\nvec3 ambient = kD_ibl * diffuseIBL;\nvec3 color = ambient + Lo;\n```",
    tags: ["代码", "漫反射IBL"],
  },
  {
    id: "ibld-37",
    chapter: "pbr-ibl-diffuse",
    level: 3,
    question: "如果把辐照度卷积的最终乘法 `irradiance = PI * irradiance / nrSamples` 写成 `irradiance = irradiance / nrSamples`（漏掉 PI），会对 IBL 亮度有什么影响？",
    answer:
      "漏掉 $\\pi$ 后辐照度贴图存储的值比正确值低约 3.14 倍。在着色器里 `kD_ibl * irradiance * albedo` 的漫反射 IBL 贡献减少约 $\\pi$ 倍，暗面整体偏暗约 3 倍。直接光照部分不受影响（Lo 的 Lambertian 漫反射有自己的 `/ PI`）。对比 Demo 开关 IBL，漏掉 PI 的版本暗面比正确版本暗很多，接近关掉 IBL 的效果。",
    tags: ["辐照度卷积", "PI", "亮度"],
  },
  {
    id: "ibld-38",
    chapter: "pbr-ibl-diffuse",
    level: 3,
    question: "在辐照度卷积切线空间构建时，为什么要对 `up` 向量做特殊处理（`abs(N.y) < 0.999`）？",
    answer:
      "切线空间用 `up = vec3(0,1,0)` 和 N 做叉积得到 `right = normalize(cross(up, N))`。当 N 接近 (0,1,0)（法线几乎朝正上方）时，叉积结果接近零向量（两向量接近平行），normalize 会产生 NaN。特殊处理：当 `abs(N.y) >= 0.999` 时切换到 `up = vec3(1,0,0)`，确保叉积不退化。这是构建任意法线切线空间的标准稳健做法。",
    tags: ["切线空间", "稳健性"],
  },
  {
    id: "ibld-39",
    chapter: "pbr-ibl-diffuse",
    level: 3,
    question: "IBL 漫反射在运行时为什么比直接光照「更便宜」（即使 IBL 处理的是无限多个光源）？",
    answer:
      "漫反射 IBL 的所有计算都被预移到离线阶段：半球积分（大量采样）在辐照度贴图预计算时一次性做完，32×32 的结果存成贴图。运行时只需：一次 `fresnelSchlickRoughness` 计算 + 一次 `texture(irradianceMap, N)` 采样 + 几次乘法，远比直接光照的 for 循环（每盏灯 D/G/F 函数调用）还简单。「无限多光源」的积分成本被摊到了预计算阶段。",
    tags: ["IBL", "性能", "预计算"],
  },
  {
    id: "ibld-40",
    chapter: "pbr-ibl-diffuse",
    level: 3,
    question: "把 Demo 中球面渲染换成一个凹凸不平的地形网格，IBL 漫反射需要做什么调整才能在每个片段正确显示？",
    answer:
      "不需要改 IBL 漫反射的着色器代码——IBL 漫反射只依赖每个片段的法线 N（通过 `texture(irradianceMap, N)` 采样）。对地形网格，每个片段的 N 来自顶点法线（或法线贴图扰动后的法线）。只要片段着色器中 N 是世界空间的正确法线，IBL 漫反射就自动为每个片段采样正确方向的辐照度，无需额外调整。",
    tags: ["IBL", "法线", "应用"],
  },
  {
    id: "ibld-41",
    chapter: "pbr-ibl-diffuse",
    level: 3,
    question: "辐照度卷积着色器里 `nrSamples` 是干什么用的？为什么最后除以它而不是除以总步数？",
    answer:
      "`nrSamples` 是实际参与累加的样本计数。双重循环每步都 `nrSamples++`，最后 `irradiance / nrSamples` 是取平均（蒙特卡洛估计的期望值）。用实际计数而非理论步数，是为了应对可能跳过无效方向（如 theta 或 phi 边界处）的情况——确保平均值基于真实参与的样本数。",
    tags: ["辐照度卷积", "nrSamples"],
  },
  {
    id: "ibld-42",
    chapter: "pbr-ibl-diffuse",
    level: 3,
    question: "如果动态场景里环境光照会随时间变化（如日出日落），每帧重新预计算辐照度贴图是否可行？有没有替代方案？",
    answer:
      "每帧重算 32×32 辐照度贴图，每像素需数千次环境贴图采样，32×32 = 1024 像素 × 数千次 = 数百万次采样，取决于平台可能不可行或帧率很低。替代方案：①降低卷积精度（减少步长采样点数）换速度；②用球谐函数（SH）近似辐照度（一次 SH 系数更新极快）；③预计算多套辐照度贴图（如日出/中午/日落）在运行时插值，一次 mix 操作极廉价。",
    tags: ["动态IBL", "性能"],
  },

  // ── L4 综合（跨概念 / 设计决策 / 对比） ──
  {
    id: "ibld-43",
    chapter: "pbr-ibl-diffuse",
    level: 4,
    question: "从「加载 HDR 文件」到「球面从环境中收到漫反射光」，完整流程有几个步骤？每步的输入和输出是什么？",
    answer:
      "①加载 HDR：`.hdr` 文件（RGBE 编码）→ GPU `GL_RGB16F` 等距柱状 2D 纹理。\n②等距柱状→Cubemap：渲染立方体 6 面，每面用方向向量采样 2D 纹理，输出 Cubemap 纹理。\n③辐照度卷积：对 Cubemap 每个方向做半球积分，输出 32×32 辐照度 Cubemap。\n④运行时着色器：`texture(irradianceMap, N)` 采样法线方向辐照度，乘以 `kD_ibl * albedo`，得到漫反射 IBL 贡献。\n⑤合并输出：`ambient = kD_ibl * irradiance * albedo`，叠加到 `Lo` 后色调映射 + Gamma 输出。",
    tags: ["综合", "全流程"],
  },
  {
    id: "ibld-44",
    chapter: "pbr-ibl-diffuse",
    level: 4,
    question: "漫反射 IBL 和镜面 IBL（下一章）的本质差异在哪里？为什么漫反射只需辐照度贴图而镜面需要两张贴图？",
    answer:
      "本质差异在 BRDF 的频率特性：漫反射 BRDF（Lambertian）是低频各向同性，只依赖法线方向 N——可以直接把半球积分结果存成一张只有方向索引的辐照度贴图。镜面 BRDF（Cook-Torrance）是高频各向异性，同时依赖反射方向 R（随粗糙度变模糊）和 Fresnel 项（随 NdotV 和 roughness 变化），有两个独立变量，需要拆成预滤波环境贴图（R + roughness）和 BRDF LUT（NdotV + roughness）两张贴图。",
    tags: ["综合", "漫反射IBL vs 镜面IBL"],
  },
  {
    id: "ibld-45",
    chapter: "pbr-ibl-diffuse",
    level: 4,
    question: "IBL 引入后，直接光照 + IBL 漫反射 + IBL 镜面反射三者的能量守恒如何共同保证？",
    answer:
      "每一项各自通过 kS/kD 保证能量守恒：直接光照里 `kS=F`，`kD=(1-kS)*(1-metallic)`，单次贡献 ≤ 入射；IBL 漫反射里 `kD_ibl = (1-kS_ibl)*(1-metallic)`，同样约束；IBL 镜面里 BRDF LUT 积分本身是归一化的（预计算时 IntegrateBRDF 的 G/Vis 归一化），加上不额外乘 kS（避免双重计算）。总体 ambient = kD·漫反射 + 镜面（已含 Fresnel），合起来 ≤ 入射，整体守恒。",
    tags: ["能量守恒", "综合"],
  },
  {
    id: "ibld-46",
    chapter: "pbr-ibl-diffuse",
    level: 4,
    question: "「IBL 把图像每个像素当作光源」——用「4 盏点光 vs IBL」对比解释为什么 IBL 更真实。",
    answer:
      "4 盏点光：光从固定的 4 个方向来，暗面完全无光，高光只有 4 个亮点，背景不对球面产生任何反射。IBL：环境图的每个像素（约 4K×2K = 800 万像素）都是一个方向的入射光。天空的每块区域都向球面的对应法线区域贡献漫反射；地面的反光也参与；太阳方向的超亮像素产生额外的高光（镜面 IBL）。暗面有来自各方向的弥漫光，颜色随方向变化，整个球感觉「浸泡在环境中」，而不是「被几盏灯照」。",
    tags: ["IBL", "真实感", "对比"],
  },
  {
    id: "ibld-47",
    chapter: "pbr-ibl-diffuse",
    level: 4,
    question: "如果把辐照度卷积的半球范围扩大到整球（theta 从 0 到 π），会有什么问题？",
    answer:
      "整球包含了法线下方的半球（theta > π/2），但朗伯余弦律让下方贡献为负（`cos(theta) < 0`）——来自背面的光对该面没有物理贡献（光从背面照不到表面）。如果不加 `cos(theta)` 截断，负贡献会削减辐照度，辐照度贴图整体偏低、偏暗。正确做法是只积分上半球（theta ∈ [0, π/2]，`cos(theta) ≥ 0`），背面光线对该面无贡献。",
    tags: ["辐照度卷积", "半球", "物理"],
  },
  {
    id: "ibld-48",
    chapter: "pbr-ibl-diffuse",
    level: 4,
    question: "IBL 漫反射的三大常见误区（fresnelSchlick误用 / 步长太大 / 漏normalize）各自的症状和修法？",
    answer:
      "①IBL 用普通 `fresnelSchlick`：粗糙非金属边缘变暗带（kS 被推到 1，kD→0，漫反射 IBL 消失）。修法：换 `fresnelSchlickRoughness`，roughness 压低掠射角上限。\n②步长太大（0.2+）：辐照度贴图出现规则条纹/走样。修法：减小步长（0.025）或用重要性采样。\n③漏 `normalize(localPos)`：等距柱状转 Cubemap 接缝出现黑线/拉伸变形。修法：渲染立方体各面时先 `N = normalize(localPos)` 再传给 `SampleSphericalMap`。",
    tags: ["误区", "综合"],
  },
  {
    id: "ibld-49",
    chapter: "pbr-ibl-diffuse",
    level: 4,
    question: "为什么「`fresnelSchlickRoughness` 中的 roughness 压低掠射角上限」在物理上是合理的？",
    answer:
      "真实粗糙表面在掠射角时，微面朝向杂乱，整体有效反射率不会达到完美镜面的 1.0——实际上粗糙表面在掠射角也有大量散射，不是「全反射」。压低 Fresnel 上限 `max(vec3(1-roughness), F0)` 让高粗糙度材质在掠射角的反射率上限等于 `1-roughness`（粗糙度 1 时最大反射率 ≈ F0，不再飙到 1），这与真实粗糙表面的掠射角行为更接近，保留了一定的漫反射分量。",
    tags: ["fresnelSchlickRoughness", "物理合理性"],
  },
  {
    id: "ibld-50",
    chapter: "pbr-ibl-diffuse",
    level: 4,
    question: "把这章和上一章（PBR 光照）的内容合起来，在 PBR 着色器里漫反射 IBL 替换掉了什么，加入了什么？最终 ambient 公式的演变路径是什么？",
    answer:
      "演变路径：\n①PBR 光照章节：`ambient = vec3(0.03) * albedo`（常量，无方向感，无物理基础）\n②漫反射 IBL 章节：`kS_ibl = fresnelSchlickRoughness(...); kD_ibl = (1-kS_ibl)*(1-metallic); irradiance = texture(irradianceMap, N).rgb; ambient = kD_ibl * irradiance * albedo`（方向性、物理 Fresnel 加权、能量守恒）\n③下一章（镜面 IBL）：在 ambient 基础上加入 `specularIBL = prefilteredColor * (F*A+B)`，完整为 `ambient = kD_ibl*irradiance*albedo + specularIBL`\n每步都让环境光照更接近真实物理。",
    tags: ["综合", "演变"],
  },
];
