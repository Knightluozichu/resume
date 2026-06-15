/** 复习题库 · PBR 光照（pbr-lighting）。HEL-166 PBR 篇复习。 */

import type { ReviewQuestion } from "./types";

export const pbrLightingQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / API / 数值约定） ──
  {
    id: "pbrl-1",
    chapter: "pbr-lighting",
    level: 1,
    question: "什么是「直接光照」（direct lighting）？与 IBL 有什么区别？",
    answer:
      "直接光照是光源直接照到表面的光照方式——每盏离散光源（点光、方向光等）单独计算辐射度和 BRDF 贡献，循环求和。与 IBL（基于图像的光照）相对：IBL 把环境图每个像素都当一个方向的入射光；直接光照只有有限几盏灯。",
    tags: ["直接光照", "定义"],
  },
  {
    id: "pbrl-2",
    chapter: "pbr-lighting",
    level: 1,
    question: "点光源的辐射度（radiance）怎么计算？为什么距离要用平方反比？",
    answer:
      "`vec3 radiance = lightColor * (1.0 / (distance * distance));`\n平方反比来自物理定律：点光源向所有方向均匀发光，距离翻倍时光照面积扩大 4 倍，单位面积能量降到 1/4。PBR 采用物理正确的平方反比，而非旧式线性/二次多项式衰减。",
    tags: ["点光源", "平方反比衰减"],
  },
  {
    id: "pbrl-3",
    chapter: "pbr-lighting",
    level: 1,
    question: "PBR 着色器中逐光源循环的完整流程是什么（6 步）？",
    answer:
      "①计算光线方向 L 和半程向量 H；②算点光源辐射度（光色 × 平方反比衰减）；③调用 D/G/F 三函数；④组合镜面项 specular = DGF / 分母；⑤能量守恒：`kS=F`，`kD=(1-kS)*(1-metallic)`；⑥累加：`Lo += (kD*albedo/PI + specular) * radiance * NdotL`。",
    tags: ["直接光照", "循环", "流程"],
  },
  {
    id: "pbrl-4",
    chapter: "pbr-lighting",
    level: 1,
    question: "什么是 HDR（High Dynamic Range）？PBR 为什么需要 HDR？",
    answer:
      "HDR 是高动态范围——颜色值允许超过 1.0 的渲染方式。PBR 场景中光源辐射度通常很大（如 150.0），累积后 `Lo` 可能远超 1.0。必须用浮点缓冲（HDR）保存中间结果，最后通过色调映射压缩到 0~1 才能在显示器上正确显示。",
    tags: ["HDR", "定义"],
  },
  {
    id: "pbrl-5",
    chapter: "pbr-lighting",
    level: 1,
    question: "什么是 Reinhard 色调映射？公式是什么？",
    answer:
      "Reinhard 色调映射把 HDR 高动态范围压缩到 0~1：`color = color / (color + vec3(1.0));`（对应公式 $c/(c+1)$）。值越大越接近 1 但永远到不了——保留了亮部细节又不会爆白。简单有效，还有 ACES、Uncharted 2 等更高级的映射曲线。",
    tags: ["色调映射", "Reinhard"],
  },
  {
    id: "pbrl-6",
    chapter: "pbr-lighting",
    level: 1,
    question: "什么是 Gamma 校正？在 PBR 着色器里怎么做？",
    answer:
      "Gamma 校正：光照在线性空间计算完成后，通过 `pow(color, vec3(1.0/2.2))` 将值转换到 sRGB 显示空间。显示器硬件会做一个 2.2 次方的「反转」，两次抵消后你看到的才是物理正确的亮度。必须在最后一步做，不能在光照计算中间做。",
    tags: ["Gamma校正", "sRGB"],
  },
  {
    id: "pbrl-7",
    chapter: "pbr-lighting",
    level: 1,
    question: "PBR 着色器里简易环境光（ambient）怎么写？为什么是 `vec3(0.03)`？",
    answer:
      "`vec3 ambient = vec3(0.03) * albedo;`\n`0.03` 是一个极简近似，让球的暗面不至于纯黑——代替真实的环境光（IBL）。`0.03` 是个人为设定的低常量，表示暗面只收到约 3% 强度的白色环境光。后续 IBL 章节会换成真正的基于图像的环境光。",
    tags: ["环境光", "ambient"],
  },
  {
    id: "pbrl-8",
    chapter: "pbr-lighting",
    level: 1,
    question: "Cook-Torrance 分母的完整写法是什么？为什么要加 `0.0001`？",
    answer:
      "`float denominator = 4.0 * max(dot(N, V), 0.0) * max(dot(N, L), 0.0) + 0.0001;`\n`+ 0.0001` 防止分母为零：在掠射角时 `NdotV` 或 `NdotL` 可能为 0，GPU 做除法得到 `Inf` 或 `NaN`，球的边缘出现黑点或闪烁。这是最容易漏掉的一行。",
    tags: ["分母", "防除零"],
  },
  {
    id: "pbrl-9",
    chapter: "pbr-lighting",
    level: 1,
    question: "PBR 着色器为什么必须在线性空间中做光照计算？",
    answer:
      "线性空间意味着数值翻倍 = 亮度翻倍，加法满足叠加原理——物理上才算对。sRGB 是显示器用的非线性编码，中间灰实际只有 0.18 而不是 0.5。如果在 sRGB 空间直接做光照运算，所有乘法和加法在错误的数值刻度上，暗部过暗、亮部过亮、颜色偏色。",
    tags: ["线性空间", "sRGB"],
  },
  {
    id: "pbrl-10",
    chapter: "pbr-lighting",
    level: 1,
    question: "漫反射 Lambertian 项在着色器里怎么写？为什么要除以 PI？",
    answer:
      "`kD * albedo / PI`，其中 `PI = 3.14159265359`。除以 $\\pi$ 是 Lambertian 归一化——假设光均匀散射到所有方向，对上半球积分后结果等于 albedo（能量守恒，散射总量 = 吸收量）。不除 $\\pi$ 时漫反射约 3.14 倍过亮。",
    tags: ["Lambertian", "PI", "归一化"],
  },
  {
    id: "pbrl-11",
    chapter: "pbr-lighting",
    level: 1,
    question: "在 demo 里把 metallic 从 0 拖到 1，会看到什么变化？背后代码哪一行导致的？",
    answer:
      "metallic=0：球是红色（albedo 颜色的漫反射），高光接近白色（F0=0.04）。metallic=1：红色消失，高光变成红色（F0=albedo）。背后关键行：`vec3 F0 = mix(vec3(0.04), albedo, metallic);`——metallic=1 时 F0=albedo 颜色，菲涅尔和镜面反射都带上 albedo 的颜色；同时 `kD = (1-kS)*(1-metallic) = 0`，漫反射消失。",
    tags: ["metallic", "Demo"],
  },
  {
    id: "pbrl-12",
    chapter: "pbr-lighting",
    level: 1,
    question: "在着色器里 NdotL（`max(dot(N, L), 0.0)`）是哪条物理原理？不乘会怎样？",
    answer:
      "NdotL 是朗伯余弦律——入射光线越正对表面（`N·L` 接近 1），单位面积有效光照越多；越斜（趋近 0），越少。不乘 NdotL，背光面（`N·L < 0`）也会按满额光照计算，球的暗面和亮面一样亮，整个场景偏白偏亮，完全不物理正确。",
    tags: ["NdotL", "余弦律"],
  },
  {
    id: "pbrl-13",
    chapter: "pbr-lighting",
    level: 1,
    question: "后处理管线的顺序是什么？为什么这个顺序不能颠倒？",
    answer:
      "正确顺序：①光照计算（线性空间）→ ②加环境光 → ③Reinhard 色调映射（HDR→0~1）→ ④Gamma 校正（线性→sRGB）。不能颠倒：先 gamma 再做光照，光照在非线性空间做，暗部加法不正确；先色调映射但还有光照计算未完成，中间 HDR 值被截断丢失信息。",
    tags: ["后处理", "顺序"],
  },
  {
    id: "pbrl-14",
    chapter: "pbr-lighting",
    level: 1,
    question: "光源颜色设成 `vec3(150.0)` 的物理意义是什么？",
    answer:
      "点光源颜色值大于 1.0 表示 HDR 辐射度——真实光源亮度远超显示器能直接显示的范围。`150.0` 是光源的物理辐射度值（相对单位），经过平方反比衰减后，2 单位距离处约 `150/4 ≈ 37.5`，仍远超 1.0。这些 HDR 值最终通过色调映射压缩到 0~1 输出。",
    tags: ["HDR", "光源辐射度"],
  },
  {
    id: "pbrl-15",
    chapter: "pbr-lighting",
    level: 1,
    question: "PBR 光照循环最后 `Lo` 初始化为什么？循环体里怎么累加？",
    answer:
      "`vec3 Lo = vec3(0.0);`（初始化为零，没有光照贡献）。循环体末尾：`Lo += (kD * albedo / PI + specular) * radiance * NdotL;`——每盏灯的漫反射 + 镜面反射，乘以辐射度和余弦权重，线性叠加到 `Lo` 上。",
    tags: ["Lo", "循环", "代码"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "pbrl-16",
    chapter: "pbr-lighting",
    level: 2,
    question: "为什么 PBR 的多光源混色是「自然的」，而 Phong 模型手动混色需要特殊处理？",
    answer:
      "PBR 光照循环对每盏灯独立计算辐射度和 BRDF 贡献，然后**线性累加** `Lo +=`。线性空间中加法满足叠加原理——红光和绿光重叠自然产生黄色，不需要任何特殊处理，这正是在线性空间做光照计算的好处。Phong 模型常在 sRGB 空间累加，混色结果偏亮偏不自然，因为非线性空间的加法不等于物理叠加。",
    tags: ["线性空间", "混色", "对比"],
  },
  {
    id: "pbrl-17",
    chapter: "pbr-lighting",
    level: 2,
    question: "为什么 Reinhard 色调映射不会「爆白」？它是如何保留亮部细节的？",
    answer:
      "$c/(c+1)$ 是单调递增的有界函数：无论 $c$ 有多大，结果永远严格小于 1（趋近但到不了 1）。这意味着极亮区域被压缩到接近 1 但不截断——亮度比仍然保留（极亮比次亮更接近 1），高光内部的细节（如高光中心更亮、边缘渐暗）不会因为统一截断到 1.0 而丢失。",
    tags: ["色调映射", "Reinhard"],
  },
  {
    id: "pbrl-18",
    chapter: "pbr-lighting",
    level: 2,
    question: "为什么在 sRGB 空间做光照计算，暗部会「过暗」？",
    answer:
      "sRGB 的中间灰（值=0.5）在线性空间实际只有 0.18 的亮度（0.5^2.2 ≈ 0.22，显示器再做 2.2 次方处理）。如果在 sRGB 空间计算光照，相当于把「暗灰色」当「中间灰」来做加法——暗部的光照贡献被过度压低，看起来暗到不自然。光照必须在线性空间（亮度 = 数值）才能物理正确。",
    tags: ["线性空间", "sRGB", "暗部"],
  },
  {
    id: "pbrl-19",
    chapter: "pbr-lighting",
    level: 2,
    question: "为什么 `kD = (1.0 - kS) * (1.0 - metallic)` 而不能只写 `kD = 1.0 - kS`？",
    answer:
      "单独 `kD = 1.0 - kS` 在金属上仍有漫反射：metallic=1 时 kS 可能 < 1，`kD = 1-kS > 0`，金属球出现不物理的漫反射颜色（金属折射光被内部自由电子吸收，不应有漫反射）。乘以 `(1.0 - metallic)` 确保 metallic=1 时 kD=0，物理上正确。",
    tags: ["能量守恒", "metallic", "漫反射"],
  },
  {
    id: "pbrl-20",
    chapter: "pbr-lighting",
    level: 2,
    question: "Cook-Torrance 镜面项分母为什么需要同时有 NdotV 和 NdotL 两项？",
    answer:
      "分母中的 `NdotV` 和 `NdotL` 来自微面 BRDF 推导的雅可比变换——把微面坐标系的反射率转换到宏观表面空间。两项分别对应出射方向（NdotV）和入射方向（NdotL）的投影校正。缺任意一个，BRDF 在对应掠射角方向偏大，能量不守恒，球的对应边缘出现过亮光环。",
    tags: ["Cook-Torrance", "分母"],
  },
  {
    id: "pbrl-21",
    chapter: "pbr-lighting",
    level: 2,
    question: "把 Gamma 校正从 `pow(c, 1/2.2)` 改成 `pow(c, 1/1.0)`（不做校正）会看到什么？",
    answer:
      "不做 Gamma 校正，输出线性空间值给显示器。显示器硬件会做 2.2 次方处理（以为输入是 sRGB），实际渲染结果被「额外压暗」——中间调偏暗，对比度极高，暗部几乎看不见细节，颜色也偏深。因为显示器把本该线性的值当作 sRGB 来解释，导致 gamma 没有抵消。",
    tags: ["Gamma校正", "显示器"],
  },
  {
    id: "pbrl-22",
    chapter: "pbr-lighting",
    level: 2,
    question: "为什么在 demo 里 4 盏灯从各方向照球，但 PBR 的能量守恒仍然成立？",
    answer:
      "每盏灯独立计算 BRDF 贡献，每次 `kS = F`，`kD = (1-kS)*(1-metallic)`，单次贡献满足能量守恒（kS+kD≤1）。累加多盏灯的 `Lo` 是叠加而非对同一入射量重复计算——每盏灯各自有独立的辐射度，叠加是物理上正确的多光源叠加（总出射 = 各光源贡献之和）。",
    tags: ["能量守恒", "多光源"],
  },
  {
    id: "pbrl-23",
    chapter: "pbr-lighting",
    level: 2,
    question: "为什么 Demo 里去掉色调映射后亮部「爆白」，而不是只是「稍亮」？",
    answer:
      "HDR 值（如 Lo 累积后某通道=5.0）经 Gamma 校正（`pow(5, 1/2.2)≈2.8`）仍远超 1.0。显示器和 GPU 的 framebuffer 对超过 1.0 的值直接截断（clamp 到 1.0）——任何 ≥ 1 的值都变成全白。不是稍亮，是整片高光区域的所有细节（高光中心比边缘亮多少）全部丢失，变成一片死白。",
    tags: ["HDR", "色调映射", "截断"],
  },
  {
    id: "pbrl-24",
    chapter: "pbr-lighting",
    level: 2,
    question: "为什么 roughness 拖到 1.0 时球面看起来像「粉笔」？与低 roughness 的区别是什么？",
    answer:
      "roughness=1.0 时 NDF（GGX）变成极宽极矮的分布，所有方向的微面都有微弱贡献，高光散布满整个球面。加上 G 遮蔽严重（粗糙面自遮蔽多），镜面反射总量大幅减少，漫反射 kD 较大，整体看起来像均匀散射的粉笔。低 roughness 时 NDF 集中、高光小而亮，对比强烈。",
    tags: ["粗糙度", "NDF", "高光"],
  },
  {
    id: "pbrl-25",
    chapter: "pbr-lighting",
    level: 2,
    question: "为什么纹理采样后需要先做 `pow(texture, 2.2)` 转线性，而不能直接用 sRGB 纹理值？",
    answer:
      "美术资产（albedo 贴图）通常是在 sRGB 色彩空间中创建和存储的（值 0.5 ≈ 人眼感知的中间灰）。如果直接拿来做光照计算，在非线性空间做乘法——albedo × 光照强度，结果不正确，暗部过暗。先 `pow(texture, 2.2)` 转到线性空间，使数值翻倍 = 物理亮度翻倍，光照计算才正确。",
    tags: ["纹理", "sRGB", "线性空间"],
  },
  {
    id: "pbrl-26",
    chapter: "pbr-lighting",
    level: 2,
    question: "为什么 Demo 里点光源颜色用 `vec3(150.0)` 而不是 `vec3(1.0)`？",
    answer:
      "物理正确性：真实点光源（如灯泡）的辐射度远超显示器范围。用 1.0 的话，光源辐射度就是「显示器最亮」，经平方反比衰减后很快趋近 0，照明效果极弱。用 150.0 更接近真实光照强度比（如太阳比环境高出几个数量级），色调映射后能产生自然的明暗对比。",
    tags: ["点光源", "HDR", "物理正确性"],
  },
  {
    id: "pbrl-27",
    chapter: "pbr-lighting",
    level: 2,
    question: "「简易环境光 `vec3(0.03) * albedo`」是对物理中哪个概念的近似？有什么缺陷？",
    answer:
      "近似的是环境光照（ambient lighting）——来自四面八方的漫射背景光，让暗面不至于纯黑。缺陷：①不随法线方向变化（真实环境光从天空向下照，朝上的面比朝下的面接收更多）；②不区分材质（金属和非金属都用同一个 0.03）；③不随环境变化。IBL 章节替换成真实的辐照度贴图解决这些缺陷。",
    tags: ["环境光", "IBL", "对比"],
  },
  {
    id: "pbrl-28",
    chapter: "pbr-lighting",
    level: 2,
    question: "PBR 和 Blinn-Phong 在「多光源叠加」上的本质区别是什么？",
    answer:
      "Blinn-Phong：漫反射和镜面是相加模型，能量不守恒——多光源叠加时越来越亮、没有物理上限。PBR：每盏灯的 `kS+kD=1` 保证单次贡献不超过输入，多光源线性叠加是物理正确的（来自不同光源的光是独立的）。PBR 在强多光源下仍然准确，只是 HDR 值增大，需要色调映射；Blinn-Phong 单纯会越来越过亮。",
    tags: ["多光源", "能量守恒", "对比"],
  },
  {
    id: "pbrl-29",
    chapter: "pbr-lighting",
    level: 2,
    question: "PBR 光照循环里 specular 项没有额外乘以 `kS`，为什么还能满足 `kS + kD ≤ 1`？",
    answer:
      "注意代码写法：`Lo += (kD * albedo / PI + specular) * radiance * NdotL;`，其中 specular = DGF / 分母。F（菲涅尔）本身已经是 kS 的值——specular 项里的 F 充当了 kS 乘数。DG/分母 是归一化的微面 BRDF，乘上 F 后就是 `kS * (DG/分母)`，能量守恒由 D/G/F 三项的物理归一化共同保证，不需要再额外写 `kS * specular`。",
    tags: ["specular", "kS", "能量守恒"],
  },
  {
    id: "pbrl-30",
    chapter: "pbr-lighting",
    level: 2,
    question: "把 4 盏灯的颜色改成各种颜色（红绿蓝黄），在 PBR 球上为什么高光颜色会按物理正确地混合？",
    answer:
      "每盏灯独立循环，`radiance = lightColor * attenuation`，每盏灯的颜色分别进入 Cook-Torrance 计算。`Lo` 是线性叠加——红色灯和绿色灯的贡献在线性空间相加，物理上红光 + 绿光 = 黄光，无需额外处理。这正是在线性空间操作的好处：叠加原理自动成立，混色结果正确。",
    tags: ["线性空间", "混色", "物理正确"],
  },

  // ── L3 应用（给参数判结果 / 改法 / 读代码） ──
  {
    id: "pbrl-31",
    chapter: "pbr-lighting",
    level: 3,
    question: "PBR 着色器里加了 `kD * albedo / PI` 但忘了加 specular，会看到什么效果？",
    answer:
      "只有漫反射、没有镜面反射：球面颜色取决于 albedo（漫反射颜色），法线朝光源处最亮，背面最暗，但完全没有高光亮点。金属球（metallic=1 时 kD=0）会变成纯黑球，因为漫反射没有、镜面反射也没加。粗糙度拖动无效果（NDF/G/F 都没参与）。",
    tags: ["漫反射", "specular", "排错"],
  },
  {
    id: "pbrl-32",
    chapter: "pbr-lighting",
    level: 3,
    question: "把 `attenuation = 1.0 / (dist * dist)` 改成 `attenuation = 1.0 / dist`（线性衰减），球面光照会有什么变化？",
    answer:
      "线性衰减比平方反比衰减慢——距离翻倍时亮度只减半，而物理上应该减到 1/4。球面整体比物理正确时更亮，光线覆盖范围更广，暗部提亮。同样光源强度 150.0 下，同样距离处线性衰减亮度约是平方反比的 `dist` 倍（dist=2 则亮约 2 倍）。这是早期游戏常用的非物理近似，PBR 要用平方反比才物理正确。",
    tags: ["平方反比衰减", "排错"],
  },
  {
    id: "pbrl-33",
    chapter: "pbr-lighting",
    level: 3,
    question: "循环里漏掉了最后的 `* NdotL`，球面会有什么问题？",
    answer:
      "背光面也会接收到等同于正面的光照贡献，球的所有区域（包括背光面）都叠加上全额光照，背光面不再是暗的，整个球变得过亮、立体感消失。`NdotL = max(dot(N,L), 0.0)` 的 `max` 本来还挡住了背面（负值截到 0），漏掉之后如果又没有 max，背面贡献可能为负（取决于点积），出现负 Lo，颜色异常。",
    tags: ["NdotL", "排错"],
  },
  {
    id: "pbrl-34",
    chapter: "pbr-lighting",
    level: 3,
    question: "把 Gamma 校正改成 `pow(color, vec3(2.2))`（指数反向），输出会怎样？",
    answer:
      "本来 `pow(c, 1/2.2)` 是提亮（线性→sRGB），改成 `pow(c, 2.2)` 是压暗（反向）。输出已经在线性空间的值再做一次 2.2 次方压暗，然后显示器又做 2.2 次方压暗，合计做了两次 2.2 次方（相当于 gamma=4.84），画面极暗，亮度几乎压没，只剩非常暗的轮廓。",
    tags: ["Gamma校正", "排错"],
  },
  {
    id: "pbrl-35",
    chapter: "pbr-lighting",
    level: 3,
    question: "如果把 `fresnelSchlick(max(dot(H, V), 0.0), F0)` 的参数误写成 `fresnelSchlick(max(dot(N, L), 0.0), F0)`，高光会有什么变化？",
    answer:
      "Fresnel 输入应该是 `dot(H,V)`（半程向量与观察方向），改成 `dot(N,L)` 是光线和法线的余弦（相当于 NdotL）。这样 Fresnel 不再随观察角变化，而是随光照方向变化——菲涅尔效果绑定到光源而不是视角，掠射角的 Fresnel 增强消失，高光边缘的 kS 不再随观察角增加，整体 kS 偏低，漫反射 kD 偏高，画面偏向漫反射，高光颜色异常。",
    tags: ["菲涅尔", "半程向量", "排错"],
  },
  {
    id: "pbrl-36",
    chapter: "pbr-lighting",
    level: 3,
    question: "把 albedo 改为 `vec3(1.0, 0.86, 0.57)`（金色）且 metallic=1.0，金属球高光为什么是金色而不是白色？定位到代码哪一行。",
    answer:
      "关键行：`vec3 F0 = mix(vec3(0.04), albedo, metallic);`——`metallic=1.0` 时 `F0 = albedo = vec3(1.0, 0.86, 0.57)`（金色）。`fresnelSchlick(cosTheta, F0)` 正看时返回 F0 本身（金色），掠射时趋近 `vec3(1.0, 0.86, 0.57)`。镜面反射由 Fresnel 加权，整个高光都带金色。同时 `kD=0`，没有漫反射。",
    tags: ["金属", "F0", "代码"],
  },
  {
    id: "pbrl-37",
    chapter: "pbr-lighting",
    level: 3,
    question: "完整写出直接光照循环中，一盏灯的镜面项 specular 的计算步骤（6 个变量/操作）。",
    answer:
      "①`vec3 H = normalize(V + L);`\n②`float D = DistributionGGX(N, H, roughness);`\n③`float G = GeometrySmith(N, V, L, roughness);`\n④`vec3 F = fresnelSchlick(max(dot(H,V), 0.0), F0);`\n⑤`vec3 numerator = D * G * F;`\n⑥`float denominator = 4.0 * max(dot(N,V),0.0) * max(dot(N,L),0.0) + 0.0001; vec3 specular = numerator / denominator;`",
    tags: ["specular", "代码", "步骤"],
  },
  {
    id: "pbrl-38",
    chapter: "pbr-lighting",
    level: 3,
    question: "PBR 球面出现一圈沿边缘的黑色像素点（而不是逐渐暗下去），最可能是哪行代码漏掉了？",
    answer:
      "漏掉了分母的 `+ 0.0001`：`float denominator = 4.0 * max(dot(N,V),0.0) * max(dot(N,L),0.0);`（没有 `+ 0.0001`）。在球的边缘（掠射角），`NdotV ≈ 0`，分母趋近 0，GPU 做除法得 `Inf` 或 `NaN`，显示为黑色或闪烁点。修法：加上 `+ 0.0001` 防除零。",
    tags: ["分母", "黑点", "排错"],
  },
  {
    id: "pbrl-39",
    chapter: "pbr-lighting",
    level: 3,
    question: "如何把上面 demo 里的 4 盏白光改成 1 盏非常强的白光（lightColor=300.0）？说明会看到什么变化及原因。",
    answer:
      "将 `lightColors[0] = vec3(300.0, 300.0, 300.0)`，其余 3 盏注释掉（或乘以 0）。结果：只有一个方向的直接光照，球面有明显明暗交界，没有 4 盏灯时柔和的光照包围感。`Lo` 峰值更高（300/4 = 75 vs 150/4 = 37.5），HDR 范围更大，色调映射把高光压得更厉害（接近 1 的位置压缩更多），高光中心感觉不如 4 盏灯时「多细节」。",
    tags: ["多光源", "HDR", "实验"],
  },
  {
    id: "pbrl-40",
    chapter: "pbr-lighting",
    level: 3,
    question: "把 roughness 从代码里直接写死成 0.0（不用滑块），着色器运行时会出现什么问题？",
    answer:
      "roughness=0 时 `D = DistributionGGX` 分母 `NdotH2 * (0 - 1) + 1 = 1 - NdotH2`，当 `NdotH=1`（完美对齐）时分母为 0，D 爆到无穷大，高光中心出现 `Inf/NaN`，显示为黑点或白点。实际实现通常用 `roughness = max(roughness, 0.05)` 做 clamp，或在 D 的分母加 epsilon 防止除零。",
    tags: ["roughness", "除零", "排错"],
  },
  {
    id: "pbrl-41",
    chapter: "pbr-lighting",
    level: 3,
    question: "在 PBR 循环里调用 D/G/F 的顺序可以颠倒吗？F 的结果会被 G 用到吗？",
    answer:
      "D/G/F 三个函数互不依赖（各自只用 N/H/V/L/roughness/F0），调用顺序对结果没影响。F 的结果（kS）不被 G 函数内部用到，G 只用 roughness、NdotV、NdotL。F 的结果在循环体里用于推导 kS 和 kD，与 D/G 独立。镜面项 numerator = D*G*F（三者相乘），顺序无所谓，只要都算出来。",
    tags: ["D", "G", "F", "顺序"],
  },
  {
    id: "pbrl-42",
    chapter: "pbr-lighting",
    level: 3,
    question: "为什么 PBR 着色器里 `vec3 ambient = vec3(0.03) * albedo` 不乘以 `(1.0 - metallic)`？这有没有物理上的问题？",
    answer:
      "这是一个简化——没有区分金属和非金属的环境光。物理上金属没有漫反射（kD=0），理论上环境光的漫反射项也应该为零。但这里的常量 `0.03` 极小，对金属的影响微弱，实际视觉差异不明显，所以简化省略。精确实现（IBL 章节）会用 `kD_ibl * irradiance * albedo`，正确引入 `(1-metallic)` 的能量守恒。",
    tags: ["环境光", "metallic", "简化"],
  },

  // ── L4 综合（跨概念 / 设计决策 / 对比） ──
  {
    id: "pbrl-43",
    chapter: "pbr-lighting",
    level: 4,
    question: "从「反射率方程是积分」到「GLSL for 循环」，这条离散化路径的每一步依赖什么物理前提？",
    answer:
      "①反射率方程是连续积分，依赖「半球上可能有任意分布的光」。②直接光照场景，每盏灯是一个 delta 函数（冲激）——只在特定方向有光，积分变成有限求和。③每盏灯的辐射度是常数（lightColor × attenuation），不随积分变量 ωi 在灯的方向内变化。④BRDF 在每个方向点计算一次，不是积分的函数值。这三个前提让积分退化成 for 循环。",
    tags: ["离散化", "积分", "综合"],
  },
  {
    id: "pbrl-44",
    chapter: "pbr-lighting",
    level: 4,
    question: "PBR 光照管线 4 大常见误区（sRGB 空间计算 / 漏 kS 乘法 / 漏 NdotL / 漏 0.0001）各有什么症状？",
    answer:
      "①sRGB 空间计算：暗部过暗、亮部过亮、颜色偏色——整体对比度不自然。\n②漏掉 `(1-metallic)` 导致金属有漫反射：金属球呈现不该有的漫反射颜色。\n③漏掉 `NdotL`：球的暗面和亮面一样亮，整个球偏白偏平。\n④漏掉 `+ 0.0001`：球边缘出现一圈黑点或闪烁（NaN/Inf）。\n四个症状各不同，可按症状定位代码行。",
    tags: ["误区", "综合"],
  },
  {
    id: "pbrl-45",
    chapter: "pbr-lighting",
    level: 4,
    question: "如果要把这套直接光照 PBR 迁移到延迟渲染（deferred shading），哪些部分需要改变？哪些可以完全复用？",
    answer:
      "需要改变：①从单 pass 改成 G-buffer pass（存 albedo、法线、roughness、metallic、位置）+ 光照 pass（读 G-buffer 做 PBR）。②每盏灯对应一个全屏或屏幕 quad 绘制调用，而非 for 循环。\n可以完全复用：D/G/F 三个子函数完全不变；逐光源的辐射度、specular、kS/kD 计算逻辑完全相同；后处理（色调映射、Gamma 校正）不变。延迟渲染只改光照循环的结构，PBR 核心数学不变。",
    tags: ["综合", "延迟渲染"],
  },
  {
    id: "pbrl-46",
    chapter: "pbr-lighting",
    level: 4,
    question: "如果场景有 100 盏点光源，直接光照 for 循环 100 次，性能瓶颈在哪里？有哪些优化思路？",
    answer:
      "瓶颈：片段着色器 100 次循环，每次执行 D/G/F 三个函数（多次乘法和幂运算），大量光源中大多数对当前片段贡献为零（距离太远，衰减后几乎不可见）。优化思路：①延迟渲染（deferred shading）：只在受光范围内的像素执行光照计算，用 stencil 剔除无关区域。②分簇渲染（clustered shading）：把视锥分成 3D 格子，每格只算覆盖它的灯。③光源剔除：先按距离判断每盏灯能否影响当前片段，提前 break。",
    tags: ["性能", "多光源", "综合"],
  },
  {
    id: "pbrl-47",
    chapter: "pbr-lighting",
    level: 4,
    question: "PBR + 直接光照的完整流程是什么？从顶点到最终像素颜色，逐步列出所有步骤。",
    answer:
      "①顶点着色器：输出 world 空间位置、法线、UV。\n②片段着色器准备：N=normalize(法线)，V=normalize(相机-片段)，F0=mix(0.04, albedo, metallic)，Lo=vec3(0)。\n③逐光源循环：L=方向，H=normalize(V+L)，radiance=lightColor/dist²，D=DistributionGGX，G=GeometrySmith，F=fresnelSchlick(dot(H,V),F0)，specular=DGF/(4·NdotV·NdotL+0.0001)，kS=F，kD=(1-kS)*(1-metallic)，Lo+=(kD·albedo/PI+specular)*radiance*NdotL。\n④环境光：ambient=0.03*albedo。\n⑤合并：color=ambient+Lo。\n⑥色调映射：color=color/(color+1)。\n⑦Gamma：color=pow(color,1/2.2)。\n⑧FragColor=vec4(color,1)。",
    tags: ["综合", "全流程"],
  },
  {
    id: "pbrl-48",
    chapter: "pbr-lighting",
    level: 4,
    question: "下一章 IBL 会把「`vec3(0.03) * albedo`」替换成什么？替换后 PBR 球的哪个视觉区域会有最明显变化？",
    answer:
      "IBL 章节会把常量环境光替换成从辐照度贴图采样的真实漫反射 IBL：`kD_ibl * texture(irradianceMap, N).rgb * albedo`（加上镜面 IBL）。最明显变化在球的**暗面**（背向直接光源的区域）：原来死黑，换成 IBL 后从环境中收到真实的漫反射光（天空颜色、地面颜色），暗面带上环境色彩，不再是平坦死黑。直接光照区域变化不大（直接光照 Lo 不变）。",
    tags: ["IBL", "综合", "预告"],
  },
  {
    id: "pbrl-49",
    chapter: "pbr-lighting",
    level: 4,
    question: "如果把 Cook-Torrance 换成 Lambert 漫反射 + Blinn-Phong 镜面反射会有什么问题？",
    answer:
      "能量守恒：Blinn-Phong 不保证 kS+kD=1，强高光时漫反射不随之减少，违反能量守恒，场景过亮。金属/非金属区分：没有 metallic 参数和 F0 的概念，无法正确模拟金属的无漫反射特性，金属只能靠手调。菲涅尔效应：Blinn-Phong 没有真实的 Fresnel 效果，掠射角高光增强无法自动计算。总体：在光照复杂（多光源、IBL）时视觉差异明显，PBR 远比 Blinn-Phong 更接近真实材质外观。",
    tags: ["对比", "Blinn-Phong", "PBR"],
  },
  {
    id: "pbrl-50",
    chapter: "pbr-lighting",
    level: 4,
    question: "PBR 直接光照的三步后处理（环境光 + 色调映射 + Gamma）缺少任意一步，各会产生什么视觉问题？",
    answer:
      "缺环境光（`ambient = 0`）：球的暗面纯黑，没有任何底光，过于极端不自然（除非这就是艺术意图）。\n缺色调映射：HDR 值超过 1.0 被截断，亮部大面积爆白、高光细节全丢，画面像曝光过度的照片。\n缺 Gamma 校正：输出线性值给显示器，显示器硬件做 2.2 次方压暗，画面极暗，中间调偏暗，颜色不正——与加了 Gamma 相比视觉对比极大。",
    tags: ["后处理", "综合"],
  },
];
