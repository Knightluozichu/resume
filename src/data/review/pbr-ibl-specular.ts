/** 复习题库 · IBL 镜面反射（pbr-ibl-specular）。HEL-166 PBR 篇复习。 */

import type { ReviewQuestion } from "./types";

export const pbrIblSpecularQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / API / 数值约定） ──
  {
    id: "ibls-1",
    chapter: "pbr-ibl-specular",
    level: 1,
    question: "什么是 Split-Sum 近似？谁提出的？",
    answer:
      "Split-Sum 近似把镜面积分拆成两个独立部分相乘：预滤波环境颜色（只依赖反射方向 R 和 roughness）× BRDF 积分（只依赖 NdotV 和 roughness）。每部分可独立离线预计算成贴图，运行时各查一次表即可还原积分。出自 Epic Games Brian Karis 2013「Real Shading in Unreal Engine 4」。",
    tags: ["Split-Sum", "定义"],
  },
  {
    id: "ibls-2",
    chapter: "pbr-ibl-specular",
    level: 1,
    question: "什么是「预滤波环境贴图」（Pre-filtered Environment Map）？",
    answer:
      "对原始环境贴图按不同粗糙度做 GGX 卷积（重要性采样），把结果存成 cubemap mipmap 的各级：roughness=0 存 mip 0（清晰原图），roughness=1 存最高 mip（接近环境平均色）。运行时用反射方向 R 和 `roughness * MAX_LOD` 用 `textureLod` 采样对应层级。",
    tags: ["预滤波环境贴图", "定义"],
  },
  {
    id: "ibls-3",
    chapter: "pbr-ibl-specular",
    level: 1,
    question: "什么是「BRDF 积分 LUT」？它的两个轴是什么？",
    answer:
      "BRDF 积分 LUT 是一张 2D 查找纹理（通常 512×512）：横轴是 NdotV（0~1），纵轴是 roughness（0~1）。R 通道存 F0 的缩放系数 A（scale），G 通道存偏移量 B（bias）。运行时用 `F0 * A + B` 重建镜面 Fresnel 积分，与 F0 的具体值解耦，同一张 LUT 服务所有材质。",
    tags: ["BRDF积分LUT", "定义"],
  },
  {
    id: "ibls-4",
    chapter: "pbr-ibl-specular",
    level: 1,
    question: "什么是 Hammersley 序列？它和伪随机采样有什么区别？",
    answer:
      "Hammersley 序列是 Van der Corput 序列（二进制位翻转）× 均匀递增序列组合成的二维低差异序列（Low-Discrepancy Sequence）。比伪随机采样更均匀地覆盖积分域，相同样本数下方差更小、收敛更快——1024 个 Hammersley 点的积分质量接近随机采样数千次的结果。",
    tags: ["Hammersley", "低差异序列"],
  },
  {
    id: "ibls-5",
    chapter: "pbr-ibl-specular",
    level: 1,
    question: "什么是「重要性采样」（Importance Sampling）？IBL 预计算里为什么用它？",
    answer:
      "重要性采样是蒙特卡洛积分的优化策略：不均匀采样，而是集中在对结果贡献大的区域（GGX 镜面波瓣的中心附近）。IBL 预计算里，均匀采样半球需要数万次才收敛，而 GGX 重要性采样（Hammersley + GGX CDF 逆变换）用 1024 个偏向波瓣中心的样本就能获得高质量预计算结果，速度约快 10 倍。",
    tags: ["重要性采样", "定义"],
  },
  {
    id: "ibls-6",
    chapter: "pbr-ibl-specular",
    level: 1,
    question: "BRDF LUT 预计算里，IBL 版几何函数的 k 值是什么？与直接光照版的区别？",
    answer:
      "IBL 版：$k = \\alpha^2 / 2$，其中 $\\alpha = \\text{roughness}^2$。\n直接光照版：$k = (\\text{roughness}+1)^2 / 8$。\n区别：IBL 版在 roughness=0 时 k=0，$G_{sub}(NdotV, 0) = 1$（无遮蔽），符合完美镜面的物理要求；直接光照版保留少量衰减防止奇点。两者不能互换，用错会导致 BRDF LUT 能量偏高或偏低。",
    tags: ["BRDF积分LUT", "k-remapping", "IBL"],
  },
  {
    id: "ibls-7",
    chapter: "pbr-ibl-specular",
    level: 1,
    question: "预滤波卷积核心循环里用了「V=R=N」近似，这是什么意思？",
    answer:
      "预计算预滤波环境贴图时，无法知道运行时实际的视角方向 V，所以近似地假设 V = R = N（视角方向 = 反射方向 = 法线方向）。这样预计算可以独立于视角进行，只依赖法线方向 R。代价是失去视角相关的各向异性拉伸（掠射角时高光形状偏圆），但对大多数材质视觉上可接受。",
    tags: ["V=R=N", "近似"],
  },
  {
    id: "ibls-8",
    chapter: "pbr-ibl-specular",
    level: 1,
    question: "最终合并时，specularIBL 的公式是什么？为什么不额外乘以 kS？",
    answer:
      "`specularIBL = prefilteredColor * (F_ibl * envBRDF.x + envBRDF.y)`\n不额外乘 kS 是因为：BRDF LUT 里已经把 Fresnel 积分进了 (A, B) 系数——`F_ibl * A + B` 本身就是经 Fresnel 加权的镜面贡献。再乘 kS = F_ibl 相当于把 Fresnel 效果施加两次，能量偏高 10~30%，出现物理上不存在的白边。",
    tags: ["specularIBL", "kS"],
  },
  {
    id: "ibls-9",
    chapter: "pbr-ibl-specular",
    level: 1,
    question: "完整的 IBL ambient 最终公式是什么（包含漫反射和镜面）？",
    answer:
      "`vec3 ambient = kD_ibl * irradiance * albedo + specularIBL;`\n其中 `specularIBL = prefilteredColor * (F_ibl * envBRDF.x + envBRDF.y)`。加上直接光照 Lo，最终 `color = ambient + Lo`，然后色调映射 + Gamma 校正。",
    tags: ["ambient", "完整公式"],
  },
  {
    id: "ibls-10",
    chapter: "pbr-ibl-specular",
    level: 1,
    question: "预滤波环境贴图运行时如何采样？用什么函数而不是普通 `texture`？",
    answer:
      "`vec3 prefilteredColor = textureLod(prefilterMap, R, roughness * float(MAX_LOD)).rgb;`\n使用 `textureLod`（而不是 `texture`）手动指定 LOD 层级：roughness=0 采 mip 0（清晰），roughness=1 采最高 mip（最模糊）。反射方向 `R = reflect(-V, N)` 是采样方向索引。",
    tags: ["textureLod", "预滤波"],
  },
  {
    id: "ibls-11",
    chapter: "pbr-ibl-specular",
    level: 1,
    question: "BRDF LUT 运行时采样代码是什么？",
    answer:
      "`vec2 envBRDF = texture(brdfLUT, vec2(max(dot(N,V), 0.0), roughness)).rg;`\nUV 坐标：横轴是 NdotV（0~1），纵轴是 roughness（0~1）。取 `.rg` 两通道（R=scale=A，G=bias=B）。",
    tags: ["BRDF LUT", "代码"],
  },
  {
    id: "ibls-12",
    chapter: "pbr-ibl-specular",
    level: 1,
    question: "Hammersley 序列的 `RadicalInverse_VdC` 函数做什么操作？",
    answer:
      "把无符号整数 `bits` 的二进制表示左右翻转（按位反转），再乘以 $2^{-32}$（归一化到 0~1）。如 bits=1（二进制 00...001）翻转后变成 10...000 = $2^{31}$，归一化后 = 0.5。这让相邻索引产生的值尽量分散（不像 0,1,2... 那样集中在一端），比随机数更均匀覆盖 (0,1)。",
    tags: ["Hammersley", "位操作"],
  },
  {
    id: "ibls-13",
    chapter: "pbr-ibl-specular",
    level: 1,
    question: "为什么开启 `GL_TEXTURE_CUBE_MAP_SEAMLESS` 对预滤波环境贴图很重要？",
    answer:
      "预滤波环境贴图在高粗糙度时 mip 分辨率很低（如 mip 4 = 4×4）。Cubemap 面与面之间的接缝在 GPU 默认采样时不做混合，低分辨率 mip 采样时接缝处出现十字形伪影。开启 `GL_TEXTURE_CUBE_MAP_SEAMLESS` 让 GPU 在跨面边界采样时做线性混合，消除接缝。OpenGL 3.2+ 核心特性，预滤波环境贴图必须开启。",
    tags: ["GL_TEXTURE_CUBE_MAP_SEAMLESS", "接缝"],
  },
  {
    id: "ibls-14",
    chapter: "pbr-ibl-specular",
    level: 1,
    question: "预滤波卷积里 `NdotL > 0.0` 的判断是干什么的？",
    answer:
      "过滤掉对反射方向贡献为零或负的样本：重要性采样的 H 方向推导出 L 后，某些 L 可能在表面法线下方（`dot(R,L) < 0`，即 NdotL ≤ 0），这些方向实际上对该面没有光照贡献。只累加 `NdotL > 0` 的样本，并用 `NdotL` 作为权重（减少接缝伪影），最后除以 `totalWeight`（累加的 NdotL 之和）取加权平均。",
    tags: ["预滤波", "NdotL"],
  },
  {
    id: "ibls-15",
    chapter: "pbr-ibl-specular",
    level: 1,
    question: "Split-Sum 近似把积分拆成两部分，分别有什么变量？",
    answer:
      "第一部分（预滤波环境颜色）：依赖反射方向 R 和 roughness，独立于 F0 和 NdotV，可以存成 Cubemap mipmap。\n第二部分（BRDF 积分）：依赖 NdotV 和 roughness，独立于反射方向，可以存成 2D LUT。\n两部分拆开的关键：原始积分有三个变量（R/roughness/NdotV），Split-Sum 通过 V=R=N 近似和 Fresnel 因子分离消掉了 F0 的依赖，把三变量降到两个各自独立的二变量。",
    tags: ["Split-Sum", "变量分离"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "ibls-16",
    chapter: "pbr-ibl-specular",
    level: 2,
    question: "为什么预滤波环境贴图用 mipmap level 对应 roughness？mip 0 和最高 mip 分别代表什么？",
    answer:
      "粗糙度越高，GGX 镜面波瓣越宽——需要对更大范围的方向做积分，等效于对环境贴图做更大半径的「模糊」。把不同模糊程度的卷积结果存成 mip 链：mip 0（roughness=0）= 原始清晰环境图（波瓣极窄，几乎不模糊）；最高 mip（roughness=1）= 环境贴图高度模糊的平均色（波瓣极宽，接近均匀半球积分）。运行时根据材质粗糙度直接查对应模糊程度的 mip。",
    tags: ["预滤波", "mipmap", "粗糙度"],
  },
  {
    id: "ibls-17",
    chapter: "pbr-ibl-specular",
    level: 2,
    question: "为什么 BRDF LUT 与 F0 无关？怎么在运行时代入具体 F0？",
    answer:
      "IntegrateBRDF 预计算时把 Fresnel $F = F_0(1-Fc) + Fc$（其中 $Fc = (1-VdotH)^5$）按 F0 因式分解，分别累加 `(1-Fc)*G_Vis`（= A）和 `Fc*G_Vis`（= B）。这样 A 和 B 只依赖 NdotV 和 roughness，与 F0 完全无关。运行时：$\\int F \\, d\\omega_i = F_0 \\cdot A + B$，用具体材质的 F0 代入公式，一张 LUT 服务所有 F0 值。",
    tags: ["BRDF LUT", "F0", "因式分解"],
  },
  {
    id: "ibls-18",
    chapter: "pbr-ibl-specular",
    level: 2,
    question: "为什么 `specularIBL` 不额外乘以 kS 就能保证能量守恒？BRDF LUT 的 Fresnel 贡献在哪里？",
    answer:
      "BRDF LUT 预计算时把 Fresnel 积分进了 (A, B)——A 是 F0 的缩放系数（非掠射角的 Fresnel 贡献），B 是偏移量（掠射角的额外 Fresnel 增强）。`prefilteredColor * (F_ibl * A + B)` 本身就是「经 Fresnel 加权的环境镜面反射」，其中 `F_ibl * A + B` 就是 kS 对应的 Fresnel 积分值。额外再乘 kS = F_ibl 就是「二次乘 Fresnel」，能量翻倍，不守恒。",
    tags: ["specularIBL", "能量守恒", "Fresnel"],
  },
  {
    id: "ibls-19",
    chapter: "pbr-ibl-specular",
    level: 2,
    question: "V=R=N 近似在哪类材质和视角下误差最明显？为什么？",
    answer:
      "在**光滑金属球的边缘**（掠射角 + roughness<0.2）时误差最明显。真实情况：视角 V 与法线 N 成大角度时，镜面波瓣在切线方向被拉伸成椭圆；近似后一律用 V=N，高光形状偏圆（缺少拉伸）。对 roughness>0.4 的材质，mip 已经模糊，拉伸形状看不出来，误差不明显。低粗糙度金属球边缘的「应有拉伸亮带」会消失，边缘偏暗。",
    tags: ["V=R=N", "误差", "掠射角"],
  },
  {
    id: "ibls-20",
    chapter: "pbr-ibl-specular",
    level: 2,
    question: "预滤波卷积里的 NdotL 权重为什么能减少接缝伪影？",
    answer:
      "均匀平均（不用 NdotL 加权）时，刚好位于 Cubemap 面接缝附近的采样方向会引入不连续的采样偏差——接缝两侧面的像素密度和 mip 层级略有不同，平均后接缝处颜色突变。用 `NdotL` 加权后，越接近反射主方向的样本权重越高，边缘 grazing 方向（接缝附近）的权重自动降低，减少了接缝不连续性对平均值的影响，最终接缝处更平滑。",
    tags: ["预滤波", "NdotL权重", "接缝"],
  },
  {
    id: "ibls-21",
    chapter: "pbr-ibl-specular",
    level: 2,
    question: "为什么预计算预滤波环境贴图时 roughness=0 用 1024 次重要性采样「几乎等于」直接用原贴图？",
    answer:
      "roughness=0 时 GGX NDF 是极窄的 delta 函数，ImportanceSampleGGX 的 CDF 逆变换生成的 H 几乎全在 N 方向（方差极小）。1024 个样本全集中在 N 附近，L ≈ reflect(-V, N)，所有样本采样的都是同一个方向附近的环境，平均结果约等于直接采样 `textureLod(env, R, 0)`（原始贴图）。roughness=0 的预滤波没有实质性模糊效果。",
    tags: ["预滤波", "roughness=0"],
  },
  {
    id: "ibls-22",
    chapter: "pbr-ibl-specular",
    level: 2,
    question: "为什么源 cubemap 需要生成 mipmap（`glGenerateMipmap`）才能减少预滤波高亮点噪点？",
    answer:
      "预滤波高 roughness 时，1024 次重要性采样的方向分散到半球较大范围内。对源 cubemap 用 `textureLod(env, L, 0)` 采样时，某些方向可能刚好命中太阳/灯光等极亮像素（高方差），极少数采样的权重极大，导致预滤波结果出现闪烁的亮点噪点。源 cubemap 有 mipmap 后，用适当 LOD 采样（如 `textureLod(env, L, mipBias)`），极亮单像素被相邻像素平滑，方差降低，亮点噪点消失。",
    tags: ["预滤波", "mipmap", "噪点"],
  },
  {
    id: "ibls-23",
    chapter: "pbr-ibl-specular",
    level: 2,
    question: "IBL 镜面反射 vs 漫反射，哪个对粗糙度更敏感？为什么？",
    answer:
      "镜面反射对粗糙度更敏感：roughness 从 0.05 到 0.3 时，预滤波环境贴图从清晰的环境倒影变成明显模糊；roughness=1.0 时镜面完全弥散为环境平均色。漫反射辐照度对粗糙度几乎不敏感——漫反射 BRDF 是各向同性低频，粗糙度只影响 kD 通过 `fresnelSchlickRoughness` 的微小变化，对辐照度本身没有影响（辐照度贴图不含 roughness 维度）。",
    tags: ["镜面IBL", "粗糙度"],
  },
  {
    id: "ibls-24",
    chapter: "pbr-ibl-specular",
    level: 2,
    question: "为什么 BRDF LUT 的 A（scale）和 B（bias）要分开存，而不是直接存 F0·A+B？",
    answer:
      "A 和 B 只与 NdotV 和 roughness 有关，完全与 F0 无关。如果直接存 F0·A+B，就必须为每种 F0 值预计算一张 LUT，完全失去了与材质解耦的优势。分开存 A 和 B，运行时用任意 F0（如 0.04 的非金属、金属的有色 F0）代入 `F0*A + B`，一张 LUT 服务所有材质——这是 Split-Sum 近似能实用的核心优势。",
    tags: ["BRDF LUT", "设计", "F0"],
  },
  {
    id: "ibls-25",
    chapter: "pbr-ibl-specular",
    level: 2,
    question: "完整 IBL（漫反射 + 镜面）开启后，对光滑金属球（metallic=0.9, roughness=0.1）最大的视觉变化是什么？",
    answer:
      "最大变化：球面出现清晰的**环境倒影**（蓝色天空和棕色地面在球面上的反射），高光不再只是四个点光源的亮点。IBL=0 时球面只有四个孤立高光点，IBL=1 时整个环境（天空渐变色、地面色）都映在球上，光滑金属球真正像镜子一样反映周围环境。粗糙度低使预滤波 mip 0 被采样，清晰倒影；金属度高使 kD≈0，几乎全是镜面 IBL 贡献。",
    tags: ["镜面IBL", "金属球", "效果"],
  },
  {
    id: "ibls-26",
    chapter: "pbr-ibl-specular",
    level: 2,
    question: "为什么最终合并公式 `ambient = kD_ibl * diffuseIBL + specularIBL` 不需要再乘任何额外系数？",
    answer:
      "三个部分各自已经承担了完整的能量计算：①`kD_ibl * diffuseIBL`：kD_ibl 已经是经 Fresnel 归一化后的漫反射系数，diffuseIBL 是辐照度（完整漫反射光量），两者直接相乘是正确的漫反射 IBL 贡献。②`specularIBL = prefilteredColor * (F*A+B)`：F*A+B 是 Fresnel 加权的 BRDF 积分结果（即 kS 的有效贡献），prefilteredColor 是对应方向的环境颜色，两者直接相乘是正确的镜面 IBL 贡献。两项加起来满足能量守恒，不需要额外系数。",
    tags: ["ambient", "能量守恒"],
  },
  {
    id: "ibls-27",
    chapter: "pbr-ibl-specular",
    level: 2,
    question: "GGX ImportanceSampleGGX 里 `cosTheta` 的计算 `sqrt((1-u2)/(1+(a⁴-1)*u2))` 是什么来的？",
    answer:
      "这是 GGX NDF 的累积分布函数（CDF）的逆函数（Inverse CDF）推导结果。蒙特卡洛重要性采样要求：采样概率密度函数（PDF）= 目标函数（GGX NDF）。通过对 GGX NDF 在半球积分并求 CDF，再对均匀随机变量 u2 ∈ [0,1] 求逆函数，得到这个公式，使采样方向的分布与 GGX 波瓣形状匹配。$a^2 = (\\text{roughness}^2)^2 = \\text{roughness}^4$，分子和分母的结构来自 GGX 的 $(n\\cdot h)^2(\\alpha^2-1)+1)^2$ 分母展开。",
    tags: ["ImportanceSampleGGX", "CDF逆变换"],
  },
  {
    id: "ibls-28",
    chapter: "pbr-ibl-specular",
    level: 2,
    question: "预滤波卷积预计算时需要多少次 GPU 渲染调用？运行时需要多少次纹理采样？",
    answer:
      "预计算：Cubemap 6 面 × 5 个 mip 级别 = 30 次渲染调用（每次对应一个面/mip），每次着色器里执行 1024 次重要性采样。运行时：**一次** `textureLod(prefilterMap, R, roughness*MAX_LOD)` 采样，GPU 硬件做 bilinear + trilinear 插值返回结果。把 30×6×1024 次离线采样压缩成运行时一次采样——这就是预计算的核心价值。",
    tags: ["预滤波", "预计算次数", "性能"],
  },
  {
    id: "ibls-29",
    chapter: "pbr-ibl-specular",
    level: 2,
    question: "BRDF LUT 里 `G_Vis = G * VdotH / (NdotH * NdotV)` 这个 G_Vis 项是什么？",
    answer:
      "`G_Vis` 是几何遮蔽 G 乘以可见性修正项 `VdotH / (NdotH * NdotV)`——这是把微面级别的几何遮蔽从微面坐标系变换到宏观观察坐标系的雅可比修正（与 Cook-Torrance 分母的含义类似）。积分时把 G 和这个可见性因子合并成 G_Vis，一起按 `(1-Fc)` 和 `Fc` 拆分累加，得到 A（scale）和 B（bias）。",
    tags: ["BRDF LUT", "G_Vis"],
  },
  {
    id: "ibls-30",
    chapter: "pbr-ibl-specular",
    level: 2,
    question: "为什么把 `envBRDF = vec2(1.0, 0.0)` 代入 specularIBL 公式，相当于假设「完美导体 F0=1」？",
    answer:
      "`specularIBL = prefilteredColor * (F_ibl * 1.0 + 0.0) = prefilteredColor * F_ibl`。等效于 LUT 只保留 F_ibl 的贡献（A=1，B=0）——忽略了 B（掠射角额外增强的偏移量）。对于 F0=1 的完美导体（黄金、铝等），B 接近 0，误差较小；对 F0=0.04 的非金属，丢失 B 导致非金属的掠射角镜面反射偏低，中等角度的镜面 IBL 整体偏弱。",
    tags: ["BRDF LUT", "F0=1"],
  },

  // ── L3 应用（给参数判结果 / 改法 / 读代码） ──
  {
    id: "ibls-31",
    chapter: "pbr-ibl-specular",
    level: 3,
    question: "把 BRDF LUT 预计算里的 `k = a / 2.0`（IBL 版）误写成 `k = (roughness+1)*(roughness+1)/8`（直接光照版），BRDF LUT 会有什么偏差？",
    answer:
      "直接光照版 k 在 roughness=0 时不为 0（$k = 1/8$），$G_{sub}(NdotV, 1/8) < 1$，即使完美镜面也有几何衰减。这使 BRDF LUT 的 A 系数偏高（G_Vis 偏大，因为 k 更大导致分母更大，但 G_Vis 是 G 乘以可见性修正，具体大小方向取决于推导）。运行时结果：镜面 IBL 整体能量偏离正确值（偏亮或偏暗），不符合 IBL 预滤波的物理假设，破坏能量守恒。",
    tags: ["BRDF LUT", "k-remapping", "排错"],
  },
  {
    id: "ibls-32",
    chapter: "pbr-ibl-specular",
    level: 3,
    question: "把最终合并公式改为 `ambient = kD_ibl * diffuseIBL + kS_ibl * specularIBL`（额外乘 kS），金属球边缘会出现什么？",
    answer:
      "额外乘 `kS_ibl = F_ibl` 相当于 Fresnel 效果施加两次。在掠射角（球边缘），`F_ibl→1`，`kS_ibl ≈ 1`，`specularIBL` 被放大约 1 倍（×1 两次）；在正看角，`F_ibl ≈ F0`（如 0.56 铜），`kS_ibl = 0.56`，specularIBL 减少 44%。结果：边缘镜面反射过亮 10~30%，出现物理上不存在的白边光环；正面镜面反射偏弱，整体 IBL 亮度失真。",
    tags: ["specularIBL", "kS", "排错"],
  },
  {
    id: "ibls-33",
    chapter: "pbr-ibl-specular",
    level: 3,
    question: "在 Demo 里把 roughness 从 0.05 慢慢拉到 1.0，预滤波环境贴图的视觉效果如何变化？什么代码行控制这个？",
    answer:
      "随着 roughness 升高，球面的环境倒影越来越模糊：roughness=0.05 时清晰的天空/地面边界清晰；roughness=1.0 时完全变成模糊的平均环境色。控制这个的代码：`vec3 prefilteredColor = textureLod(prefilterMap, R, roughness * float(MAX_LOD)).rgb;` 或 Demo 中的 `proceduralSpecular(R, roughness)`——roughness 越高，采样越高层 mip（越模糊），最终混向平均色 `avg`。",
    tags: ["预滤波", "粗糙度", "Demo"],
  },
  {
    id: "ibls-34",
    chapter: "pbr-ibl-specular",
    level: 3,
    question: "IBL 开启时，为什么非金属球（metallic=0）的镜面反射边缘也比关闭 IBL 时更亮？",
    answer:
      "即使 metallic=0，F0=0.04（非金属低基础反射率），菲涅尔效应在掠射角（边缘）时仍然把 kS 拉高（`F_ibl = fresnelSchlickRoughness(dot(N,V), F0, roughness)`，掠射角趋近 `max(1-roughness, F0)`）。IBL 开启后，`specularIBL = prefilteredColor * (F_ibl * A + B)` 在边缘也有 Fresnel 增强的环境镜面反射，边缘因此出现一圈来自环境的菲涅尔高光（如蓝天色的边缘亮带），而关闭 IBL 时这些只有点光源的 Fresnel 高光，相对弱很多。",
    tags: ["非金属", "Fresnel", "边缘"],
  },
  {
    id: "ibls-35",
    chapter: "pbr-ibl-specular",
    level: 3,
    question: "写出完整的镜面 IBL 运行时着色器代码（从 F_ibl 到 specularIBL，不含漫反射部分）。",
    answer:
      "```glsl\nvec3 F_ibl = fresnelSchlickRoughness(max(dot(N, V), 0.0), F0, roughness);\nvec3 kS_ibl = F_ibl;\nvec3 kD_ibl = (1.0 - kS_ibl) * (1.0 - metallic);\nvec3 R = reflect(-V, N);\nfloat lod = roughness * float(MAX_LOD);\nvec3 prefilteredColor = textureLod(prefilterMap, R, lod).rgb;\nvec2 envBRDF = texture(brdfLUT, vec2(max(dot(N,V), 0.0), roughness)).rg;\nvec3 specularIBL = prefilteredColor * (F_ibl * envBRDF.x + envBRDF.y);\n```",
    tags: ["代码", "镜面IBL"],
  },
  {
    id: "ibls-36",
    chapter: "pbr-ibl-specular",
    level: 3,
    question: "把 `approxBrdfLUT` 改为返回 `vec2(0.0, 0.0)`（A=0, B=0），specularIBL 会变成什么？",
    answer:
      "`specularIBL = prefilteredColor * (F_ibl * 0.0 + 0.0) = vec3(0.0)`。镜面 IBL 完全消失——只剩下漫反射 IBL 和直接光照的四个点光源高光。球面无论多光滑，都不会出现任何来自环境的镜面反射，光滑金属球变成纯黑，只有四个点光源高光，视觉上退回到没有 IBL 的状态。",
    tags: ["BRDF LUT", "specularIBL", "排错"],
  },
  {
    id: "ibls-37",
    chapter: "pbr-ibl-specular",
    level: 3,
    question: "预滤波卷积里的样本数 `SAMPLE_COUNT = 1024u` 减少到 `16u` 会出现什么问题？",
    answer:
      "样本数太少，蒙特卡洛估计方差大：预滤波环境贴图出现明显噪点（随机闪烁的亮点），特别是在包含高亮光源（太阳）的方向。因为 16 个样本中，命中太阳极亮像素的概率很低，绝大多数样本采样到暗处，只有少数样本亮度极高，平均结果波动极大。1024 样本时这种方差被充分平均，结果平滑。",
    tags: ["预滤波", "采样数", "方差"],
  },
  {
    id: "ibls-38",
    chapter: "pbr-ibl-specular",
    level: 3,
    question: "把 Demo 的天空颜色改为红橙色日落，metallic=0.9、roughness=0.1 时，球面倒影颜色如何变化？roughness=0.8 时呢？",
    answer:
      "roughness=0.1：`proceduralSpecular` 几乎不混入平均色（roughness²≈0.01），球面清晰地反射橙红色天空，高光倒影整体变橙红，环境感强。roughness=0.8：roughness²=0.64，颜色大量混入 avg（灰紫平均色），橙色调明显减弱，球面变成模糊的灰紫色——模拟高 roughness 采样高 mip，趋向环境平均色的效果。",
    tags: ["预滤波", "Demo", "颜色"],
  },
  {
    id: "ibls-39",
    chapter: "pbr-ibl-specular",
    level: 3,
    question: "IntegrateBRDF 积分出 (A, B)，物理含义各是什么？运行时 F0·A + B 表示什么？",
    answer:
      "A（scale）= 对 `(1-Fc)*G_Vis` 的积分，描述「F0 贡献的那部分 Fresnel」的 BRDF 积分（非掠射角的基础反射）。B（bias）= 对 `Fc*G_Vis` 的积分，描述「掠射角额外 Fresnel 增强」的 BRDF 积分。运行时 `F0*A + B` = 用具体 F0 重建的总 Fresnel·BRDF 积分，即这个材质在当前 (NdotV, roughness) 参数下的总镜面反射量，乘以预滤波颜色得到环境镜面贡献。",
    tags: ["BRDF LUT", "A", "B", "物理含义"],
  },
  {
    id: "ibls-40",
    chapter: "pbr-ibl-specular",
    level: 3,
    question: "镜面 IBL 完整流程里，预滤波环境贴图和 BRDF LUT 分别是什么时候生成的？运行时各用几次？",
    answer:
      "预滤波环境贴图：加载场景时离线预计算，对 6 面 × 多 mip 级别渲染一次，每次 1024 次重要性采样。BRDF LUT：一次性离线预计算（一次全屏渲染），对每个 (NdotV, roughness) 点 1024 次积分。运行时：预滤波环境贴图每片段一次 `textureLod` 采样，BRDF LUT 每片段一次 `texture` 采样——各一次，总共两次贴图采样还原完整镜面积分。",
    tags: ["预计算", "运行时", "性能"],
  },
  {
    id: "ibls-41",
    chapter: "pbr-ibl-specular",
    level: 3,
    question: "如果场景里用了法线贴图，IBL 镜面反射的反射方向 R 应该用哪个法线？",
    answer:
      "`R = reflect(-V, N)` 里的 N 应该用**法线贴图扰动后的世界空间法线**（经过 TBN 矩阵变换的法线贴图方向）。法线贴图就是为了给表面添加微观法线细节，IBL 镜面的反射方向依赖法线，用扰动后的 N 才能看到法线贴图对反射的影响（表面凹凸引起不同方向的环境反射）。如果只用几何体的光滑法线，法线贴图对 IBL 镜面没有效果。",
    tags: ["法线贴图", "IBL", "反射方向"],
  },
  {
    id: "ibls-42",
    chapter: "pbr-ibl-specular",
    level: 3,
    question: "预滤波卷积的 `ImportanceSampleGGX` 输出 H（半程向量），再用 `L = normalize(2*dot(V,H)*H - V)` 推导 L，这个公式的几何含义是什么？",
    answer:
      "这是镜面反射公式：已知半程向量 H 和观察方向 V（这里用 R=N 近似为法线），推导出入射光方向 L。`L = 2*(V·H)*H - V` 是将 V 关于 H 做镜像反射的向量——正好是如果从 L 方向来的光被法线为 H 的微面反射到 V 方向的入射方向。GGX 重要性采样产生 H（偏向波瓣中心），再用反射公式推出对应的入射 L，从环境贴图方向 L 采样颜色，累加得到预滤波结果。",
    tags: ["ImportanceSampleGGX", "反射公式"],
  },

  // ── L4 综合（跨概念 / 设计决策 / 对比） ──
  {
    id: "ibls-43",
    chapter: "pbr-ibl-specular",
    level: 4,
    question: "从「镜面积分有两个未知量」到「Split-Sum 拆成两张贴图」，这条推导路径的关键假设是什么？没有这些假设是否还能实时？",
    answer:
      "关键假设：①V=R=N 近似（独立于视角，预滤波只依赖 R 和 roughness）；②Fresnel 因子可以因式分解出 F0（BRDF LUT 独立于 F0）；③镜面 BRDF 乘以预滤波颜色可以近似为两个独立积分相乘（Split-Sum 近似本身是近似，真实值有轻微误差）。没有这些假设：积分有 F0/R/NdotV/roughness 四个变量，4D 预计算贴图不可行；每帧在线积分（蒙特卡洛，1024 次采样/像素）在实时渲染中完全不可行（>1000 倍开销）。这三个近似是 PBR IBL 能实时的关键工程近似。",
    tags: ["Split-Sum", "假设", "综合"],
  },
  {
    id: "ibls-44",
    chapter: "pbr-ibl-specular",
    level: 4,
    question: "完整的 PBR + IBL（漫反射 + 镜面）着色器 ambient 部分，和只有直接光照的 `vec3(0.03)*albedo` 相比，视觉提升主要体现在哪三个方面？",
    answer:
      "①**暗面真实感**：球的背光面不再是死黑或单调灰，从环境中收到来自各方向（天空、地面）的漫反射光，暗面有颜色变化（朝天偏蓝、朝地偏棕）。②**镜面环境反射**：光滑金属球出现环境倒影，高光不只是四个点，整个环境（天空、地面渐变）映在球面上，真正像金属镜子。③**方向性光照**：同一个球朝上的面和朝下的面收到不同颜色的环境光，立体感和空间感大幅增强——整个场景感觉球「属于」这个环境，而不是「放在」这个环境里。",
    tags: ["IBL", "视觉提升", "综合"],
  },
  {
    id: "ibls-45",
    chapter: "pbr-ibl-specular",
    level: 4,
    question: "PBR + IBL 四大常见误区（直接光照 k 用错 / 接缝伪影 / 高亮噪点 / 重复乘 kS）各有什么症状，如何定位和修复？",
    answer:
      "①**IBL k 用成直接光照版**：BRDF LUT 严重偏亮，镜面 IBL 整体过亮，能量不守恒。修法：IntegrateBRDF 里用 `k = alpha²/2`，不用 `(r+1)²/8`。\n②**接缝伪影**：粗糙球面 mip 4 处出现十字形接缝。修法：开启 `glEnable(GL_TEXTURE_CUBE_MAP_SEAMLESS)`。\n③**高亮噪点**：预滤波结果出现闪烁亮点。修法：源 Cubemap 调用 `glGenerateMipmap`，用适当 LOD bias 采样。\n④**重复乘 kS**：镜面 IBL 过亮 10~30%，边缘白边。修法：ambient = `kD*diffuse + specularIBL`（不加 `kS * specularIBL`）。",
    tags: ["误区", "综合"],
  },
  {
    id: "ibls-46",
    chapter: "pbr-ibl-specular",
    level: 4,
    question: "Split-Sum 近似和「预计算辐射度传输」（PRT）有什么本质区别？各适用什么场景？",
    answer:
      "Split-Sum 近似：把镜面积分近似拆成两个独立预计算贴图，基于 V=R=N 工程近似，支持动态相机，预滤波贴图与场景几何无关，适合动态物体实时渲染，精度中等（V=R=N 的近似误差）。PRT（Precomputed Radiance Transfer）：把整个「光照→表面→眼睛」的传输函数预计算成球谐系数或其他基函数，可以处理阴影/遮蔽/互反射，但预计算与场景几何绑定，不支持动态几何（动物体无效），适合静态场景高质量 GI。Split-Sum 是实时动态 IBL 的实用方案，PRT 是高精度离线/准实时方案。",
    tags: ["Split-Sum", "PRT", "对比"],
  },
  {
    id: "ibls-47",
    chapter: "pbr-ibl-specular",
    level: 4,
    question: "IBL 镜面反射的完整预计算流程是什么？列出每一步的输入、处理和输出。",
    answer:
      "①**加载 HDR**：`.hdr` 文件 → GPU `GL_RGB16F` 等距柱状 2D 纹理。\n②**转 Cubemap**：渲染 6 面，`SampleSphericalMap` 从 HDR 采样 → 环境 Cubemap。\n③**生成 mipmap**：`glGenerateMipmap(cubemap)` 为源 Cubemap 生成 mipmap（防止高亮噪点）。\n④**预滤波卷积**：对每个 mip 级别（对应 roughness）渲染 6 面，每片段 1024 次 `ImportanceSampleGGX` + 加权平均 → 预滤波 Cubemap（各 mip 对应模糊程度）。\n⑤**BRDF LUT 预计算**：全屏渲染，每像素对应 (NdotV, roughness)，1024 次积分 `IntegrateBRDF` → 512×512 BRDF LUT（R=A，G=B）。\n⑥**运行时**：`textureLod(prefilterMap, R, roughness*LOD)` + `texture(brdfLUT, NdotV, roughness).rg` → `specularIBL = prefilteredColor * (F*A+B)`。",
    tags: ["综合", "全流程"],
  },
  {
    id: "ibls-48",
    chapter: "pbr-ibl-specular",
    level: 4,
    question: "为什么镜面 IBL 不能像漫反射 IBL 那样只用 32×32 的贴图？预滤波贴图的分辨率应该怎么选？",
    answer:
      "漫反射是低频，32×32 足矣。镜面 IBL 在低 roughness 时对应极窄的 GGX 波瓣——需要能分辨环境贴图中的高频细节（如太阳光斑、窗帘高光），分辨率不足会使清晰反射变成块状。实践中 mip 0（roughness=0）分辨率应与源 Cubemap 一致（如 512×512），随 mip 降低分辨率（mip 1 = 256×256，...，mip 4 = 32×32，对应 roughness=1 低频已够）。通常设 5 级 mip（MAX_LOD=4），mip 0 面尺寸 512 或 128 根据需要。",
    tags: ["预滤波", "分辨率", "mipmap"],
  },
  {
    id: "ibls-49",
    chapter: "pbr-ibl-specular",
    level: 4,
    question: "如何验证自己实现的完整 IBL（漫反射 + 镜面）是物理正确的？有哪些可观测的「能量守恒校验点」？",
    answer:
      "①**完全黑色环境测试**：把环境贴图换成全黑（所有像素=0），IBL ambient 应接近 0，球只剩直接点光源高光——如果还有 IBL 漏光，说明实现有误。\n②**白色镜面球能量检验**：metallic=1，F0=1（完美导体），roughness=0，光滑金属球的 ambient+Lo 不应超过环境最亮像素值——如果有额外乘 kS，能量偏高可检测。\n③**关掉直接光照，只看 IBL**：non-metallic 球（metallic=0，roughness=0.5）在均匀白色环境（irradiance=1，prefiltered=1）下，ambient 约等于 `albedo`（因为 kD·1·albedo + specularIBL ≤ 1·albedo + kS_ibl，总量 ≤ 1）。\n④**粗糙度扫描**：roughness 从 0 到 1 变化时，镜面 IBL 平滑从清晰到模糊，无突变或噪点——验证 mip 采样和 LUT 的连续性。",
    tags: ["验证", "能量守恒", "综合"],
  },
  {
    id: "ibls-50",
    chapter: "pbr-ibl-specular",
    level: 4,
    question: "PBR 篇四章的「公式 → 着色器 → IBL」学习路径是什么？每章解决的核心问题是什么？",
    answer:
      "PBR 理论（第1章）：建立物理数学框架——微表面模型 + 能量守恒 + 反射率方程，推导 Cook-Torrance BRDF（D/G/F 三项），明确每个参数的物理含义。\nPBR 光照（第2章）：把公式搬进着色器——积分离散化为循环，实现 D/G/F GLSL 函数，直接光照跑出可交互的 PBR 球，解决「公式→渲染」的工程问题。\nIBL 漫反射（第3章）：替换硬编码环境光——HDR+辐照度卷积+fresnelSchlickRoughness，让暗面有来自真实环境的漫反射光，解决「环境光照」。\nIBL 镜面反射（第4章）：完成镜面 IBL——Split-Sum 拆成两张预计算贴图，重要性采样，BRDF LUT，让高光也从环境取光，解决「实时完整 IBL」。四章合起来 = 完整的实时 PBR 渲染器。",
    tags: ["综合", "学习路径", "收官"],
  },
];
