/** 复习题库 · PBR 理论（pbr-theory）。HEL-166 PBR 篇复习。 */

import type { ReviewQuestion } from "./types";

export const pbrTheoryQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / API / 数值约定） ──
  {
    id: "pbrt-1",
    chapter: "pbr-theory",
    level: 1,
    question: "什么是「微表面模型」？",
    answer:
      "PBR 的核心几何假设：任何表面在微观层面由无数朝向各异的微小完美镜面（microfacet）组成。每个微面只做镜面反射。宏观看到的漫反射或模糊高光，是无数微面反射的统计叠加结果。",
    tags: ["微表面模型", "定义"],
  },
  {
    id: "pbrt-2",
    chapter: "pbr-theory",
    level: 1,
    question: "什么是「粗糙度」（roughness）？取值范围是多少？",
    answer:
      "粗糙度描述微表面朝向有多混乱的参数，取值 `0~1`。`0` = 完美光滑，所有微面对齐，镜面反射集中；`1` = 极粗糙，微面朝向完全随机，反射分散到各方向。",
    tags: ["粗糙度", "定义"],
  },
  {
    id: "pbrt-3",
    chapter: "pbr-theory",
    level: 1,
    question: "什么是「能量守恒」在 PBR 中的含义？",
    answer:
      "一个表面反射出去的光能量总和不超过照进来的光。PBR 中体现为镜面反射系数 $k_s$ 与漫反射系数 $k_d$ 之和等于 1：$k_s + k_d = 1$。反射越强，漫反射必须越弱，反之亦然。",
    tags: ["能量守恒", "定义"],
  },
  {
    id: "pbrt-4",
    chapter: "pbr-theory",
    level: 1,
    question: "什么是 BRDF？全称是什么？",
    answer:
      "BRDF = 双向反射分布函数（Bidirectional Reflective Distribution Function）。给定入射方向 $\\omega_i$ 和出射方向 $\\omega_o$，BRDF 返回一个比例值——表示 $\\omega_i$ 方向的入射光有多少份量沿 $\\omega_o$ 方向反射出去。Cook-Torrance 是常用的 PBR BRDF 实现。",
    tags: ["BRDF", "定义"],
  },
  {
    id: "pbrt-5",
    chapter: "pbr-theory",
    level: 1,
    question: "写出反射率方程（the reflectance equation）。",
    answer:
      "$$L_o(p,\\omega_o) = \\int_\\Omega f_r(p,\\omega_i,\\omega_o) \\; L_i(p,\\omega_i) \\; (n \\cdot \\omega_i) \\; d\\omega_i$$\n其中 $L_o$ 是出射辐射度，$f_r$ 是 BRDF，$L_i$ 是入射辐射度，$n \\cdot \\omega_i$ 是余弦权重（朗伯余弦律）。",
    tags: ["反射率方程", "公式"],
  },
  {
    id: "pbrt-6",
    chapter: "pbr-theory",
    level: 1,
    question: "Cook-Torrance BRDF 由哪两项组成？",
    answer:
      "Cook-Torrance BRDF 拆成两部分：漫反射项 $k_d \\cdot c/\\pi$（Lambertian 漫反射，$c$ 是 albedo，除以 $\\pi$ 归一化）和镜面反射项 $k_s \\cdot DFG / 4(\\omega_o \\cdot n)(\\omega_i \\cdot n)$（Cook-Torrance 镜面）。",
    tags: ["Cook-Torrance", "BRDF"],
  },
  {
    id: "pbrt-7",
    chapter: "pbr-theory",
    level: 1,
    question: "Cook-Torrance 镜面项中，D / G / F 三项分别代表什么？",
    answer:
      "$D$（NDF，法线分布函数）：统计有多少微面法线对齐了半程向量 $h$，决定高光的形状。$G$（几何函数）：估算有多少微面既没被遮住观察方向也没被遮住光线方向，即自遮蔽。$F$（菲涅尔方程）：当前角度反射占多大比例——掠射角时趋近全反射。",
    tags: ["D", "G", "F", "定义"],
  },
  {
    id: "pbrt-8",
    chapter: "pbr-theory",
    level: 1,
    question: "GGX 法线分布函数 D 的公式是什么？",
    answer:
      "$$D(n,h,\\alpha) = \\frac{\\alpha^2}{\\pi\\big((n \\cdot h)^2(\\alpha^2 - 1) + 1\\big)^2}$$\n其中 $\\alpha$ 是粗糙度，$n \\cdot h$ 是法线与半程向量的点积。$\\alpha$ 越小，峰越尖（高光小而亮）；$\\alpha$ 越大，峰越宽矮（高光大而暗）。",
    tags: ["NDF", "GGX", "公式"],
  },
  {
    id: "pbrt-9",
    chapter: "pbr-theory",
    level: 1,
    question: "Fresnel-Schlick 近似公式是什么？",
    answer:
      "$$F(h,v,F_0) = F_0 + (1 - F_0)(1 - (h \\cdot v))^5$$\n正看时 $h \\cdot v \\approx 1$，$(1-h \\cdot v)^5 \\approx 0$，$F \\approx F_0$；掠射时 $h \\cdot v \\to 0$，$(1-h \\cdot v)^5 \\to 1$，$F \\to 1$（全反射）。五次方让急升集中在最后那段掠射角。",
    tags: ["菲涅尔", "Schlick", "公式"],
  },
  {
    id: "pbrt-10",
    chapter: "pbr-theory",
    level: 1,
    question: "什么是 $F_0$？非金属和金属的典型值各是多少？",
    answer:
      "$F_0$ 是材质在 0°（正看）时的基础反射率。非金属（电介质）的 $F_0$ 普遍很低，约 `0.04`（通用值）；金属的 $F_0$ 很高且有颜色，等于 albedo 颜色（如金 ≈ `vec3(1.0, 0.86, 0.57)`）。",
    tags: ["F0", "金属", "非金属"],
  },
  {
    id: "pbrt-11",
    chapter: "pbr-theory",
    level: 1,
    question: "GLSL 中 F0 如何根据 metallic 参数计算？",
    answer:
      "`vec3 F0 = mix(vec3(0.04), albedo, metallic);`\n当 `metallic=0` 时 F0=0.04（非金属通用值）；`metallic=1` 时 F0=albedo 颜色（金属的基础反射率就是它的颜色）。中间值做线性插值。",
    tags: ["F0", "metallic", "代码"],
  },
  {
    id: "pbrt-12",
    chapter: "pbr-theory",
    level: 1,
    question: "什么是 Smith 几何函数？怎么把两个方向合起来？",
    answer:
      "Smith 方法把几何遮蔽分开两个方向各算一遍：$G(n,v,l,k) = G_{sub}(n,v,k) \\cdot G_{sub}(n,l,k)$。两个方向分别对应「观察方向被遮挡（masking）」和「光线方向被遮挡（shadowing）」，结果相乘。",
    tags: ["几何函数", "Smith"],
  },
  {
    id: "pbrt-13",
    chapter: "pbr-theory",
    level: 1,
    question: "直接光照中 Schlick-GGX 几何函数的 k 值怎么计算？",
    answer:
      "直接光照用 $k = (\\text{roughness}+1)^2 / 8$。代码写作 `float r = roughness + 1.0; float k = (r * r) / 8.0;`。IBL 使用不同的重映射（$k = \\alpha^2 / 2$），两者不要搞混。",
    tags: ["几何函数", "k-remapping"],
  },
  {
    id: "pbrt-14",
    chapter: "pbr-theory",
    level: 1,
    question: "metallic=1（金属）和 metallic=0（非金属）时漫反射分别是多少？",
    answer:
      "metallic=1（金属）时漫反射为 0——折射光全被金属内部自由电子吸收，$k_d = 0$。metallic=0（非金属）时有着色漫反射——你看到的球本身的颜色（albedo）。代码中 `kD = (1.0 - kS) * (1.0 - metallic)` 保证金属时 kD 归零。",
    tags: ["金属", "漫反射"],
  },
  {
    id: "pbrt-15",
    chapter: "pbr-theory",
    level: 1,
    question: "GGX D 函数 GLSL 实现里为什么对 roughness 平方两次？",
    answer:
      "业界约定：`a = roughness * roughness`（alpha = roughness²），再 `a2 = a * a`（alpha⁴ 代入公式）。先平方一次是为了让美术调参数时手感更线性——roughness 从 0 到 1 的视觉变化更均匀，不至于集中在某一段。",
    tags: ["NDF", "roughness平方", "约定"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "pbrt-16",
    chapter: "pbr-theory",
    level: 2,
    question: "为什么粗糙度低的表面高光小而亮、粗糙度高的高光大而暗？",
    answer:
      "粗糙度低 → 微面朝向集中对齐 → NDF 是窄而高的尖峰 → 只有法线精确对齐半程向量 $h$ 的微面才有贡献 → 高光面积小、能量集中、看起来亮。粗糙度高 → 微面朝向分散 → NDF 是宽而矮的丘 → 许多不对齐的微面都有小贡献 → 高光面积大、能量分散、看起来暗。",
    tags: ["粗糙度", "NDF", "高光"],
  },
  {
    id: "pbrt-17",
    chapter: "pbr-theory",
    level: 2,
    question: "为什么菲涅尔效应让所有材质在掠射角时反射都会增强？",
    answer:
      "掠射角时光线几乎平行于表面，与微面的有效交互方式导致物理上反射比例趋向 1。Schlick 近似中 $(1-h \\cdot v)^5$ 在掠射角 $h \\cdot v \\to 0$ 时趋近 1，即 $F = F_0 + (1-F_0) \\cdot 1 = 1$，不管 $F_0$ 初始值多低（哪怕是 0.04 的非金属），最终都趋近全反射。",
    tags: ["菲涅尔", "掠射角"],
  },
  {
    id: "pbrt-18",
    chapter: "pbr-theory",
    level: 2,
    question: "为什么金属表面几乎看不到自身颜色（albedo 颜色），而高光有颜色？",
    answer:
      "金属的 $F_0$ = albedo 颜色（高且有色），`metallic=1` 时 $k_d = 0$，漫反射为零，折射进去的光被自由电子吸收不散射回来。所有出去的光都是镜面反射，而镜面 Fresnel 返回 $F_0$（albedo 颜色）作为反射率——高光带颜色正是这里来的。",
    tags: ["金属", "漫反射", "菲涅尔"],
  },
  {
    id: "pbrt-19",
    chapter: "pbr-theory",
    level: 2,
    question: "为什么 Lambertian 漫反射 BRDF 里要除以 $\\pi$？",
    answer:
      "Lambertian 假设光打进表面后被均匀散射到所有方向。对上半球积分 $\\int_\\Omega c/\\pi \\cdot \\cos\\theta \\, d\\omega = c$，除以 $\\pi$ 正是让积分结果等于 albedo $c$（能量守恒：漫反射总量等于 albedo，不能超过入射）。不除会过亮，违反能量守恒。",
    tags: ["Lambertian", "漫反射", "归一化"],
  },
  {
    id: "pbrt-20",
    chapter: "pbr-theory",
    level: 2,
    question: "Cook-Torrance 分母 $4(\\omega_o \\cdot n)(\\omega_i \\cdot n)$ 的物理含义是什么？",
    answer:
      "分母是微面 BRDF 从微面空间变换到宏观表面空间的归一化修正项（雅可比行列式）。它确保整个 BRDF 在半球积分后满足能量守恒——反射总量不超过入射总量。去掉分母，镜面 BRDF 在掠射角偏大，违反能量守恒，球边缘会过亮。",
    tags: ["Cook-Torrance", "分母", "归一化"],
  },
  {
    id: "pbrt-21",
    chapter: "pbr-theory",
    level: 2,
    question: "几何函数 G 的「遮蔽」和「阴影」分别是什么？为什么要两个方向各算一遍？",
    answer:
      "遮蔽（Masking）：反射光朝观察方向飞去，但被旁边凸起的微面挡住，你看不到。阴影（Shadowing）：入射光朝微面飞来，但被旁边微面挡住，光照不到。两个方向独立发生，Smith 各算一遍 $G_{sub}(n,v,k)$ 和 $G_{sub}(n,l,k)$ 再相乘，同时考虑入射和出射两侧的遮蔽。",
    tags: ["几何函数", "遮蔽", "阴影"],
  },
  {
    id: "pbrt-22",
    chapter: "pbr-theory",
    level: 2,
    question: "为什么 $n \\cdot \\omega_i$（余弦项）需要出现在反射率方程里？",
    answer:
      "余弦项来自朗伯余弦律：光线越正对表面（夹角小，$n \\cdot \\omega_i$ 接近 1），单位面积接收到的光越多；光线越斜（$n \\cdot \\omega_i$ 接近 0），有效照射面积越大但每单位面积光越少。不乘余弦项，背光面和正光面接收到的光一样多，物理上不对。",
    tags: ["余弦项", "朗伯"],
  },
  {
    id: "pbrt-23",
    chapter: "pbr-theory",
    level: 2,
    question: "粗糙度和金属度是「正交」的两个参数——这是什么意思？",
    answer:
      "正交是指两个参数各自独立控制不同的视觉属性，互不干扰。粗糙度控制高光的**形状**（锐利还是弥散）；金属度控制**颜色来源和漫反射有无**。调一个参数不影响另一个的效果——粗糙的金属有大而暗的有色高光但无漫反射；光滑的塑料有小而亮的白色高光且有着色漫反射。",
    tags: ["粗糙度", "金属度", "正交"],
  },
  {
    id: "pbrt-24",
    chapter: "pbr-theory",
    level: 2,
    question: "GGX NDF 相比 Phong NDF（cosine power）有什么优势？",
    answer:
      "GGX 在高光中心（对齐处）的尖峰后有更长的「拖尾」——即在对齐方向之外还有明显的贡献，这让 GGX 的高光边缘更柔和、过渡更自然，类似真实金属的高光。Phong 的高光边缘跌落更陡，看起来更像塑料。GGX 也更容易以闭合形式积分，数学上更方便做预滤波。",
    tags: ["GGX", "NDF", "对比"],
  },
  {
    id: "pbrt-25",
    chapter: "pbr-theory",
    level: 2,
    question: "为什么直接光照和 IBL 用不同的 k 重映射值？",
    answer:
      "直接光照用 $k = (r+1)^2/8$：在 roughness→0 时仍保留少量几何衰减，避免完美镜面时出现数值奇点。IBL 对整个半球积分，roughness=0 时 G 应趋近 1（完全没有自遮蔽），用 $k = \\alpha^2/2$ 在 roughness=0 时让 G 退化成 1。两种情况物理边界条件不同，必须用不同公式。",
    tags: ["几何函数", "k-remapping", "IBL"],
  },
  {
    id: "pbrt-26",
    chapter: "pbr-theory",
    level: 2,
    question: "半程向量 $h$ 是如何定义的？它在 PBR 中的物理意义是什么？",
    answer:
      "$h = \\text{normalize}(\\omega_i + \\omega_o)$，即入射方向和出射方向的归一化中间向量。物理意义：在微表面模型中，只有法线恰好等于 $h$ 的微面才能把 $\\omega_i$ 方向的光精确反射到 $\\omega_o$ 方向。所以 NDF 输入 $h$ 来统计有多少微面能参与反射。",
    tags: ["半程向量", "定义"],
  },
  {
    id: "pbrt-27",
    chapter: "pbr-theory",
    level: 2,
    question: "为什么非金属的镜面高光接近白色，而金属高光有颜色？",
    answer:
      "非金属 $F_0 \\approx 0.04$（极低），镜面 Fresnel 在大多数角度返回接近 0.04 的低值，只在掠射角才升高，且 $F_0$ 本身接近白色（三通道一致）。金属 $F_0$ = albedo（高且有色），镜面 Fresnel 正看时就已经返回有色的 $F_0$，高光带颜色。",
    tags: ["金属", "非金属", "高光颜色"],
  },
  {
    id: "pbrt-28",
    chapter: "pbr-theory",
    level: 2,
    question: "反射率方程是一个「半球积分」——在实际渲染里为什么不用真的积分？",
    answer:
      "对半球所有方向做真积分，相当于把无数个方向的入射光全部采样，计算量无穷大。实际渲染中光源数量有限（如 4 盏点光源），积分退化成有限项的求和——每盏灯是一个冲激函数，积分变成循环叠加。IBL 章节再用预计算替代对环境的积分。",
    tags: ["反射率方程", "积分", "离散化"],
  },
  {
    id: "pbrt-29",
    chapter: "pbr-theory",
    level: 2,
    question: "「忘记能量守恒」写出 kD = 1.0 而不是 kD = 1 - kS 会有什么问题？",
    answer:
      "如果把 `kD` 写死成 1.0，漫反射和镜面反射各自按满量来——出去的光 = 漫反射 + 镜面 > 进来的光，违反能量守恒。场景会整体过亮发白，尤其掠射角时菲涅尔拉高 `kS` 后，`kD` 也还是 1.0，两者都满量，亮度接近 2 倍。正确做法：`kS = F`，`kD = 1 - kS`。",
    tags: ["能量守恒", "误区"],
  },
  {
    id: "pbrt-30",
    chapter: "pbr-theory",
    level: 2,
    question: "辐射度（Radiance）这个物理量代表什么？在着色器里通常对应什么变量？",
    answer:
      "辐射度（Radiance）是沿某方向单位立体角、单位投影面积上的辐射功率——通俗说就是「这个方向上光有多亮」。在着色器里，`Lo` 是出射辐射度（出射光总亮度），`Li` 是每个方向的入射辐射度，`radiance = lightColor * attenuation` 是点光源的辐射度贡献。",
    tags: ["辐射度", "物理量"],
  },

  // ── L3 应用（给参数判结果 / 改法 / 读代码） ──
  {
    id: "pbrt-31",
    chapter: "pbr-theory",
    level: 3,
    question: "一块粗糙度 0.1 的金球（metallic=1）和一块粗糙度 0.8 的红色塑料球（metallic=0）：谁有漫反射？谁的 F0 是 albedo 颜色？谁的 NDF 更尖？",
    answer:
      "漫反射：红色塑料球有（metallic=0，$k_d > 0$，显红色）；金球无（metallic=1，$k_d=0$，折射光被吸收）。\nF0 = albedo 颜色：金球（$F_0$ = 金色 albedo）；塑料球 $F_0$ 固定约 0.04。\nNDF 更尖：金球（roughness=0.1，微面集中，高光小而亮）；塑料球 roughness=0.8，NDF 宽矮，高光大而暗。",
    tags: ["应用", "综合"],
  },
  {
    id: "pbrt-32",
    chapter: "pbr-theory",
    level: 3,
    question: "把 `kD = (1.0 - kS) * (1.0 - metallic)` 中的 `(1.0 - metallic)` 去掉，金属球会出现什么问题？",
    answer:
      "去掉 `(1.0 - metallic)` 后，即使 metallic=1，`kD = 1.0 - kS` 不为零，金属球上会出现不应存在的漫反射颜色——球面呈现 albedo 颜色的漫反射（像塑料涂了一层金漆，而不是真正的金属外观）。真实金属折射光被内部自由电子吸收，漫反射应该为零。",
    tags: ["金属", "漫反射", "排错"],
  },
  {
    id: "pbrt-33",
    chapter: "pbr-theory",
    level: 3,
    question: "在 Fresnel-Schlick 公式中，当 $\\cos\\theta = 0.5$ 且 $F_0 = 0.04$ 时，F 约等于多少？",
    answer:
      "$(1 - 0.5)^5 = 0.03125$，所以 $F = 0.04 + (1 - 0.04) \\times 0.03125 = 0.04 + 0.96 \\times 0.03125 \\approx 0.04 + 0.03 = 0.07$。正看时只有 4% 反射，45° 左右也才约 7%——菲涅尔的急升集中在最后那段掠射角（接近 90°）。",
    tags: ["菲涅尔", "计算"],
  },
  {
    id: "pbrt-34",
    chapter: "pbr-theory",
    level: 3,
    question: "GGX D 函数中，当 $n \\cdot h = 1$（法线完美对齐 $h$）时，$D$ 化简结果是什么？说明什么？",
    answer:
      "代入 $n \\cdot h = 1$：分母 $= \\pi(1 \\cdot (\\alpha^2-1)+1)^2 = \\pi \\alpha^4$，所以 $D = \\alpha^2/(\\pi\\alpha^4) = 1/(\\pi\\alpha^2)$。$\\alpha$ 越小，$D$ 越大——光滑表面（$\\alpha$ 小）在完美对齐处密度极高（尖峰），符合直觉。粗糙表面（$\\alpha$ 大）即使完全对齐，$D$ 值也较低。",
    tags: ["NDF", "推导"],
  },
  {
    id: "pbrt-35",
    chapter: "pbr-theory",
    level: 3,
    question: "下面 GLSL 代码有一处错误：`vec3 kS = F; vec3 kD = 1.0 - kS;`，用在金属球上会出什么问题？怎么修？",
    answer:
      "漏了乘 `(1.0 - metallic)`。当 `metallic=1.0` 时，`kD` 仍等于 `1.0 - kS`，不为零，金属球出现漫反射颜色。修法：`vec3 kD = (1.0 - kS) * (1.0 - metallic);`，确保金属时 kD 归零。",
    tags: ["代码", "排错", "metallic"],
  },
  {
    id: "pbrt-36",
    chapter: "pbr-theory",
    level: 3,
    question: "如果把 D 函数的 `denom = PI * denom * denom` 里的 `PI` 去掉会怎样？",
    answer:
      "去掉 $\\pi$ 后，NDF 的积分不再归一化——对半球积分结果大于 1，违反能量守恒。镜面反射的亮度会整体偏高约 3.14 倍（$\\pi$ 倍），高光区域过亮、画面偏白，尤其光滑表面的高光中心会爆白。正确的 GGX NDF 分母必须有 $\\pi$ 以保证积分归一化。",
    tags: ["NDF", "归一化", "排错"],
  },
  {
    id: "pbrt-37",
    chapter: "pbr-theory",
    level: 3,
    question: "直接光照里分母加 `+ 0.0001` 的作用是什么？不加会怎样？",
    answer:
      "`4.0 * max(dot(N,V),0.0) * max(dot(N,L),0.0) + 0.0001` 中的 `+ 0.0001` 是防止分母为零。在掠射角时 `NdotV` 或 `NdotL` 可能为 0（光线或视线几乎平行于表面），GPU 做除法得到 `Inf` 或 `NaN`，在球的边缘出现一圈黑点或闪烁。这是最容易漏掉的一行。",
    tags: ["分母", "防除零", "排错"],
  },
  {
    id: "pbrt-38",
    chapter: "pbr-theory",
    level: 3,
    question: "把 `fresnelSchlick` 的输入 `cosTheta` 从 `dot(H, V)` 误写成 `dot(N, V)` 会有什么影响？",
    answer:
      "两者物理含义不同：`dot(H,V)` 是基于半程向量的微面级别菲涅尔输入，正确描述微面与观察方向的角度；`dot(N,V)` 是宏观法线与观察方向的角度。用 `dot(N,V)` 时，菲涅尔效果会随观察角而非半程向量而变，高光边缘的 Fresnel 过渡变得不自然，掠射角时 `kS` 被过度拉高，漫反射 `kD` 被压得过低。",
    tags: ["菲涅尔", "cosTheta", "排错"],
  },
  {
    id: "pbrt-39",
    chapter: "pbr-theory",
    level: 3,
    question: "如何从 Schlick-GGX 单方向几何函数推出完整的 Smith 几何函数（写出代码）？",
    answer:
      "单方向：`float GeometrySchlickGGX(float NdotV, float k) { return NdotV / (NdotV * (1.0 - k) + k); }`\nSmith：`float GeometrySmith(vec3 N, vec3 V, vec3 L, float roughness) { float r = roughness + 1.0; float k = (r*r)/8.0; return GeometrySchlickGGX(max(dot(N,V),0.0), k) * GeometrySchlickGGX(max(dot(N,L),0.0), k); }`\n观察方向和光线方向各算一遍再相乘。",
    tags: ["几何函数", "代码"],
  },
  {
    id: "pbrt-40",
    chapter: "pbr-theory",
    level: 3,
    question: "BRDFCurveExplorer 里，把粗糙度从 0.1 拉到 0.8，D 曲线（蓝色）形状如何变化？G 曲线（绿色）整体如何变化？",
    answer:
      "D 曲线（蓝色）从窄而高的尖峰变成宽而矮的丘——高光从「小而亮」到「大而暗」的数学原因，此时 $\\alpha$ 变大，NDF 在峰值处的密度降低、分散到更大角度范围。G 曲线（绿色）整体下移——粗糙度升高，微面凸起更多，遮蔽更严重，有效贡献的微面比例降低。",
    tags: ["NDF", "几何函数", "Demo"],
  },
  {
    id: "pbrt-41",
    chapter: "pbr-theory",
    level: 3,
    question: "已知 Schlick-GGX $G_{sub}(n,v,k) = \\frac{n \\cdot v}{(n \\cdot v)(1-k)+k}$，当 $k=0$ 时 $G_{sub}$ 等于多少？说明什么？",
    answer:
      "代入 $k=0$：$G_{sub} = (n \\cdot v) / (n \\cdot v) = 1$。$k=0$ 对应完美光滑表面（roughness=0），此时没有任何自遮蔽，$G=1$，所有微面都对反射有贡献，符合物理直觉。",
    tags: ["几何函数", "推导"],
  },
  {
    id: "pbrt-42",
    chapter: "pbr-theory",
    level: 3,
    question: "Cook-Torrance BRDF 整体乘以余弦权重 $n \\cdot \\omega_i$，为什么对 specular 项也要乘这个余弦？",
    answer:
      "余弦项 $n \\cdot \\omega_i$ 来自反射率方程的积分形式，与 BRDF 无关——它描述的是入射光线的有效投影面积（光越斜，单位面积接受到的光越少）。无论是漫反射还是镜面反射项，都是该点接受的入射光经 BRDF 变换后的出射，所以都需要乘这个余弦权重。不乘镜面项，背光面也会按全额光强算镜面反射，导致背面出现不物理的高光。",
    tags: ["余弦项", "反射率方程"],
  },

  // ── L4 综合（跨概念 / 设计决策 / 对比） ──
  {
    id: "pbrt-43",
    chapter: "pbr-theory",
    level: 4,
    question: "微表面模型、能量守恒、反射率方程、Cook-Torrance BRDF 四者如何串联成完整的 PBR 理论框架？",
    answer:
      "微表面模型是出发点——任何表面由无数微小镜面组成，宏观光照是统计叠加。能量守恒是约束——出射光 ≤ 入射光，$k_s+k_d=1$。反射率方程是数学框架——把半球所有入射方向的 BRDF×辐射度×余弦积分起来，得到出射辐射度。Cook-Torrance BRDF 是 $f_r$ 的具体实现——用 D（微面对齐统计）、G（遮蔽）、F（菲涅尔）描述镜面反射，加上 Lambertian 漫反射，合起来就是完整的物理渲染模型。",
    tags: ["综合", "框架"],
  },
  {
    id: "pbrt-44",
    chapter: "pbr-theory",
    level: 4,
    question: "为什么「只靠 roughness 调参」能让 PBR 自动产生物理正确的高光变化，而 Blinn-Phong 的「反光度」需要手调才大概像？",
    answer:
      "Blinn-Phong 的反光度只是 $\\cos^n\\theta$ 幂次，没有物理约束——能量不守恒（粗糙面高光变大但亮度不降），也无法区分金属和非金属。PBR 中 roughness 通过 GGX NDF 数学上控制微面分布，G 函数保证遮蔽正确，能量守恒由 $k_s+k_d=1$ 保证——所有物理约束都编码进了公式，参数变化自动产生正确的光照行为，无需手调。",
    tags: ["PBR", "Blinn-Phong", "对比"],
  },
  {
    id: "pbrt-45",
    chapter: "pbr-theory",
    level: 4,
    question: "PBR 里三大常见误区（能量守恒破坏 / 粗糙度金属度混淆 / Fresnel 理解错误），各自的根因和症状是什么？",
    answer:
      "①能量守恒破坏：忘了 `kD = 1-kS` 写成 `kD = 1.0`，或漏了 `(1-metallic)`，导致漫反射+镜面 > 入射，画面整体过亮发白。②参数混淆：把 roughness 当做金属度或反过来，导致高光形状和颜色来源都不对——粗糙度控制形状、金属度控制颜色来源，两者正交。③Fresnel 误解：认为菲涅尔只在掠射角才有用，但 $F_0$ 在所有角度都起效——对金属来说正看时 $F_0$ 就很高，反射已经很强。",
    tags: ["误区", "综合"],
  },
  {
    id: "pbrt-46",
    chapter: "pbr-theory",
    level: 4,
    question: "如果要为一种「半透明材质」（如磨砂玻璃）设计 PBR 参数，roughness、metallic、F0 应该如何设置？会遇到什么 Cook-Torrance 理论边界？",
    answer:
      "磨砂玻璃：metallic=0（非金属），roughness 中到高（0.3~0.7，表面磨砂）。$F_0$ 约 0.04~0.08（玻璃的基础反射率）。Cook-Torrance 理论边界：该框架描述的是不透明表面，折射进去的光按 Lambertian 漫反射处理（$k_d$）。半透明材质的透射光（穿过去的光）需要额外的透射模型（BTDF），单用 Cook-Torrance 只能近似做法：把 `kD` 理解为「折射散射」贡献，但无法模拟真实的透射和次表面散射。",
    tags: ["综合", "设计"],
  },
  {
    id: "pbrt-47",
    chapter: "pbr-theory",
    level: 4,
    question: "GGX、Blinn-Phong NDF 和 Beckmann NDF 三者的关键区别是什么？为什么 PBR 工业界偏好 GGX？",
    answer:
      "Phong（cosine power）：高光中心衰减快，边缘锐利，无物理归一化，高光能量不守恒。Beckmann：有物理归一化，但高光边缘衰减比真实材质快，缺少「拖尾」（物理上真实材质有较长的高光过渡）。GGX（Trowbridge-Reitz）：有物理归一化，且拖尾更长（分子 $\\alpha^2$、分母平方），高光边缘更柔和真实。GGX 还可以推导出解析的 BRDF LUT 积分，IBL 预计算更高效，是 Epic、Disney 等工业标准。",
    tags: ["NDF", "GGX", "对比"],
  },
  {
    id: "pbrt-48",
    chapter: "pbr-theory",
    level: 4,
    question: "从「塑料杯 vs 不锈钢杯」这个直觉例子出发，用 PBR 的 D/G/F/metallic/roughness 全部解释两者视觉差异。",
    answer:
      "不锈钢杯：metallic=1，$F_0$=albedo（金属色），漫反射为零（不见杯子颜色），roughness 低（0.1~0.2），NDF 尖峰→高光小而亮，G 遮蔽小，Fresnel 在各角度都高。塑料杯：metallic=0，$F_0$=0.04，有漫反射（你看到杯子颜色），roughness 中等（0.3~0.5），NDF 较宽→高光面积大，Fresnel 只在掠射角才明显，正看时反射几乎没有。结合 $k_s+k_d=1$，金属全是 kS，塑料主要 kD。",
    tags: ["综合", "物理直觉"],
  },
  {
    id: "pbrt-49",
    chapter: "pbr-theory",
    level: 4,
    question: "为什么「把 k_s 直接写成常量 0.5」而不用 Fresnel 结果是个严重错误？",
    answer:
      "首先破坏了能量守恒：固定 $k_s = 0.5$ 时无论入射角度如何，反射比例固定，不满足菲涅尔效应（掠射角应趋向 1、正看角应趋向 $F_0$）。其次忽略了金属/非金属的核心区别：非金属 $F_0 \\approx 0.04$ 正看几乎不反射，金属 $F_0$ 很高正看也强反射；写死 0.5 两种材质无从区分。Fresnel $F$ 的核心作用正是根据角度和材质动态给出物理正确的 $k_s$。",
    tags: ["菲涅尔", "能量守恒", "误区"],
  },
  {
    id: "pbrt-50",
    chapter: "pbr-theory",
    level: 4,
    question: "从 PBR 理论到实现，哪两步离散化让「半球积分」变成「可实时计算的着色器」？",
    answer:
      "第一步：光源离散化。真实环境的光来自半球所有方向（无穷次积分），但直接光照场景里光源有限（如 4 盏灯），积分退化成有限次求和——for 循环每盏灯各算一次 BRDF 贡献，线性累加。第二步：BRDF 解析化。把 GGX/Smith/Schlick 这些有解析公式的近似代入，让每盏灯的 BRDF 计算变成一次浮点运算，而不需要数值积分。IBL 章节进一步用预计算解决环境光的积分。",
    tags: ["综合", "离散化"],
  },
];
