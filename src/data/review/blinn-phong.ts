/** 复习题库 · 高级光照 / Blinn-Phong（blinn-phong）。HEL-90 高级光照篇。 */

import type { ReviewQuestion } from "./types";

export const blinnPhongQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / API / 数值约定） ──
  {
    id: "bp-1",
    chapter: "blinn-phong",
    level: 1,
    question: "什么是「Phong 镜面断裂」？它在什么条件下最明显？",
    answer:
      "冯氏（Phong）镜面光在「光很掠射 + 反光度很低」时出现的**硬边 / 突然截断**：本该平滑淡出的高光被一道生硬的直边截断。条件越是掠射、反光度越低，这道断边越明显。",
    tags: ["Phong 镜面断裂", "定义"],
  },
  {
    id: "bp-2",
    chapter: "blinn-phong",
    level: 1,
    question: "Phong 镜面光是用哪两个向量的点乘来量高光的？公式怎么写？",
    answer:
      "用反射向量 `R` 和观察方向 `V` 的点乘 `R·V`。高光强度 = `pow(max(R·V, 0), 反光度)`——R 是光线关于法线反射出的方向，V 越贴近 R 越亮。",
    tags: ["Phong 镜面", "R·V"],
  },
  {
    id: "bp-3",
    chapter: "blinn-phong",
    level: 1,
    question: "什么是「半程向量」H？它怎么算？",
    answer:
      "光线方向 L 和视线方向 V 的「中分线」方向，等于两者相加再归一化：`H = normalize(L + V)`。它永远落在 L 和 V 之间。",
    tags: ["半程向量", "定义"],
  },
  {
    id: "bp-4",
    chapter: "blinn-phong",
    level: 1,
    question: "半程向量 H 和法线 N 重合时，意味着什么？",
    answer:
      "当 H 正好和表面法线 N 重合时，你的视线恰好处在**镜面反射最强的方位**上——这一刻高光最亮。",
    tags: ["半程向量", "几何含义"],
  },
  {
    id: "bp-5",
    chapter: "blinn-phong",
    level: 1,
    question: "什么是「Blinn-Phong 镜面」？它用什么代替了 Phong 的 R·V？",
    answer:
      "冯氏镜面项的改进版。不求反射向量 R，而是先算半程向量 `H = normalize(L+V)`，再用 `N·H` 代替 Phong 的 `R·V` 算高光：`spec = pow(max(N·H, 0), 反光度)`。",
    tags: ["Blinn-Phong 镜面", "定义"],
  },
  {
    id: "bp-6",
    chapter: "blinn-phong",
    level: 1,
    question: "什么是「反光度指数」？它在 GLSL 里对应哪个运算的什么部分？",
    answer:
      "镜面高光的「锐度」指数，对应 GLSL 里 `pow` 的指数（上一篇叫反光度 shininess）。指数越大高光越小越锐、越小高光越大越糊。",
    tags: ["反光度指数", "定义"],
  },
  {
    id: "bp-7",
    chapter: "blinn-phong",
    level: 1,
    question: "从 Phong 换到 Blinn-Phong，反光度指数大概要调成原来的几倍？",
    answer:
      "约 **2~4 倍**（经验值，不是精确换算）。比如 Phong 用 32，换 Blinn 大概要用 64~128，才能得到同样大小的高光斑。",
    tags: ["反光度指数", "经验值"],
  },
  {
    id: "bp-8",
    chapter: "blinn-phong",
    level: 1,
    question: "什么是「能量守恒」（在本章语境下）？",
    answer:
      "一个物理直觉约束：一个表面反射出去的光，总量**不该超过照进来的光**（不能凭空变亮）。Blinn-Phong 比原始 Phong 更容易满足它。",
    tags: ["能量守恒", "定义"],
  },
  {
    id: "bp-9",
    chapter: "blinn-phong",
    level: 1,
    question: "Phong 里 `R·V` 越过哪个角度后会变负、被截成 0？",
    answer:
      "当反射方向 R 和观察方向 V 的夹角**超过 90°** 时，`R·V` 变成负数，被 `max(…, 0)` 一刀切成 0。",
    tags: ["Phong 镜面断裂", "90°"],
  },
  {
    id: "bp-10",
    chapter: "blinn-phong",
    level: 1,
    question:
      "GLSL 里求 Phong 的反射向量 R 用哪个内置函数？喂给它的光方向是哪个？",
    answer:
      "用 `reflect(-lightDir, norm)`。注意喂给 `reflect` 的是 `-lightDir`（「光打过来」的方向），而不是指向光源的 `lightDir`。",
    tags: ["reflect", "API"],
  },
  {
    id: "bp-11",
    chapter: "blinn-phong",
    level: 1,
    question: "算半程向量时，相加的两个方向 L、V 分别指向哪里？",
    answer:
      "两个都是**从表面指向外**的方向：`L`（lightDir）指向光源、`V`（viewDir）指向眼睛。`H = normalize(L + V)`。",
    tags: ["半程向量", "方向约定"],
  },
  {
    id: "bp-12",
    chapter: "blinn-phong",
    level: 1,
    question: "从 Phong 换成 Blinn-Phong，代码上一共改哪几处？",
    answer:
      "只动镜面那 2~3 行：① 求 R 改成求 H（`reflect(-lightDir,norm)` → `normalize(lightDir+viewDir)`）；② `R·V` 改成 `N·H`（`dot(viewDir,reflectDir)` → `dot(norm,halfwayDir)`）；③ 指数调大约 2~4 倍。漫反射、环境光、总装全不变。",
    tags: ["代码对照", "diff"],
  },
  {
    id: "bp-13",
    chapter: "blinn-phong",
    level: 1,
    question: "Blinn-Phong 的镜面计算在桌面 OpenGL 和 WebGL2 上有 API 差异吗？",
    answer:
      "没有。这段纯计算两端 GLSL 一字不差。唯一跨端差异是老几样：桌面写 `#version 330 core`、WebGL2 写 `#version 300 es`，且 WebGL2 片段着色器必须加 `precision highp float;`。",
    tags: ["跨端", "无差异"],
  },
  {
    id: "bp-14",
    chapter: "blinn-phong",
    level: 1,
    question: "Blinn-Phong 在离线渲染里长期扮演什么角色？",
    answer:
      "Blinn-Phong 长期是**离线渲染的默认镜面项**，因为它更贴近真实微表面、更容易满足能量守恒，还启发了后来的基于物理渲染（PBR）。",
    tags: ["Blinn-Phong", "离线渲染"],
  },
  {
    id: "bp-15",
    chapter: "blinn-phong",
    level: 1,
    question: "为什么低反光度时 Phong 的断裂特别明显？",
    answer:
      "反光度低 → 高光本来就铺得很大、淡出得很缓，会一路铺到 `R·V` 接近 0 的边缘地带；这片边缘地带最容易越过 90° 那道坎，于是断口正好落在高光还挺亮的地方，格外扎眼。",
    tags: ["Phong 镜面断裂", "低反光度"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "bp-16",
    chapter: "blinn-phong",
    level: 2,
    question: "Phong 高光为什么会断裂出硬边？从哪一步分析？",
    answer:
      "问题在「`R·V` 再 `max(…, 0)`」这一步。当光掠射、从某些角度看时，R 与 V 夹角超过 90°，`R·V` 变负被 `max` 截成 0——高光强度在那个角度**啪一下掉到 0**，留下一道生硬直边而非平滑淡出。",
    tags: ["Phong 镜面断裂", "机制"],
  },
  {
    id: "bp-17",
    chapter: "blinn-phong",
    level: 2,
    question: "为什么 Blinn-Phong 的 N·H 几乎不会被截负、不会断裂？",
    answer:
      "因为 H 永远落在 L 和 V 之间。只要表面被这盏灯照得到（`N·L > 0`），N 与 L 夹角小于 90°；H 夹在 L、V 中间，N 与 H 的夹角自然也跨不过 90°。所以 `N·H` 几乎不会变负，高光只会平滑连续地淡到 0。",
    tags: ["Blinn-Phong 镜面", "机制"],
  },
  {
    id: "bp-18",
    chapter: "blinn-phong",
    level: 2,
    question: "Blinn 修法的核心思路和 Phong 有什么本质区别？",
    answer:
      "Blinn **根本不去求反射向量 R**。他换了个更稳的量法：与其问「R 和视线 V 有多贴」，不如问「光线方向和视线方向的正中间（半程向量 H），和法线 N 有多贴」——绕开了 R 越界这道坎。",
    tags: ["Blinn-Phong 镜面", "思路对比"],
  },
  {
    id: "bp-19",
    chapter: "blinn-phong",
    level: 2,
    question: "为什么换到 Blinn 后，同样的指数下高光会变得又大又糊？",
    answer:
      "`N·H` 和 `R·V` 对角度的**敏感度不同**：在同样偏离最佳方位的角度上，`N·H` 衰减得比 `R·V` 慢。结果同一个反光度指数，Blinn 算出来的高光比 Phong 更大、更糊。",
    tags: ["反光度指数", "为什么"],
  },
  {
    id: "bp-20",
    chapter: "blinn-phong",
    level: 2,
    question: "半程向量为什么更「物理对路」？",
    answer:
      "现实里光滑表面是无数朝向略有差异的「微小镜面」组成的，能反光到你眼里的，正是那些**法线恰好对齐半程向量 H** 的微表面——Blinn 的 `N·H` 直接对应了这个图景，更贴近真实物理。",
    tags: ["半程向量", "物理"],
  },
  {
    id: "bp-21",
    chapter: "blinn-phong",
    level: 2,
    question: "「N·L > 0」这个漫反射条件，和 Blinn 不断裂有什么关系？",
    answer:
      "只要表面被灯照到（`N·L > 0`，即 N 和 L 夹角 < 90°），而 H 又夹在 L、V 之间，那么 N 和 H 的夹角也必然 < 90°、`N·H` 不会变负——这正是 Blinn 高光不会被 clamp 截断的根源。",
    tags: ["Blinn-Phong 镜面", "N·L"],
  },
  {
    id: "bp-22",
    chapter: "blinn-phong",
    level: 2,
    question: "Phong 不想让高光淡出吗？那它为什么会出硬边？",
    answer:
      "Phong 不是不想让高光淡出，而是 `R·V` 撞上了 90° 那道坎、被强行截成 0，淡出被「咔」地打断。Blinn 换了量法绕开这道坎，高光才能自然淡到底。",
    tags: ["Phong 镜面断裂", "对比"],
  },
  {
    id: "bp-23",
    chapter: "blinn-phong",
    level: 2,
    question: "为什么高反光度（小高光）下 Phong 几乎看不出断裂？",
    answer:
      "反光度高时高光缩成一小撮、远离 `R·V` 接近 0 的边界，断口落不到亮处，所以基本看不出断裂。断裂是「低反光度 + 掠射」才暴露的毛病。",
    tags: ["Phong 镜面断裂", "高反光度"],
  },
  {
    id: "bp-24",
    chapter: "blinn-phong",
    level: 2,
    question: "Blinn-Phong 既然更好，为什么有时 Phong 也够用？",
    answer:
      "只在**高反光度小高光、不掠射**的场合，Phong 几乎不会断裂，效果够用，而且还省一次 `reflect`（不必求反射向量）。只有需要平滑高光 / 真实感 / 掠射光场景才必须换 Blinn。",
    tags: ["选型", "对比"],
  },
  {
    id: "bp-25",
    chapter: "blinn-phong",
    level: 2,
    question: "为什么换 Blinn 后必须重新校准反光度，不能照搬 Phong 的数值？",
    answer:
      "因为 `N·H` 衰减比 `R·V` 慢，同指数下高光更大。直接照搬 Phong 的指数，高光会变得又大又糊。要得到同样大小的高光，必须把指数调大约 2~4 倍重新校准。",
    tags: ["反光度指数", "校准"],
  },
  {
    id: "bp-26",
    chapter: "blinn-phong",
    level: 2,
    question:
      "为什么半程向量相加用的是 lightDir + viewDir，而不是 -lightDir + viewDir？",
    answer:
      "因为半程向量是「指向光源」和「指向眼睛」两个**朝外**方向的中分线，所以用 `lightDir`（指向光源）。`-lightDir` 是 Phong 里喂给 `reflect` 的「光打过来」方向，两处方向相反，别搞混。",
    tags: ["半程向量", "方向"],
  },
  {
    id: "bp-27",
    chapter: "blinn-phong",
    level: 2,
    question: "为什么改 Phong→Blinn 只动镜面几行、漫反射和环境光都不变？",
    answer:
      "因为 Blinn 改的只是「怎么量你多正对反光方位」这件事，纯属镜面项内部的事。漫反射靠 `N·L`、环境光是常量，跟用 R·V 还是 N·H 无关，所以一概不动。",
    tags: ["代码对照", "范围"],
  },
  {
    id: "bp-28",
    chapter: "blinn-phong",
    level: 2,
    question: "Blinn-Phong 和能量守恒、PBR 是什么关系？",
    answer:
      "Blinn-Phong 的半程向量模型更贴近真实微表面、更容易满足能量守恒（反射光不超过入射光），因此长期作为离线渲染默认镜面项，并**启发了后来的基于物理渲染 PBR**。本章只取它「修断裂 + 更平滑」这层好处。",
    tags: ["能量守恒", "PBR"],
  },
  {
    id: "bp-29",
    chapter: "blinn-phong",
    level: 2,
    question:
      "把 Phong 和 Blinn 的高光强度沿表面铺成「强度带」，两者形状差在哪？",
    answer:
      "Phong 那条强度带走到中途会**突然竖直跌断**（撞 90° 被截成 0），右边 Blinn 是一条**全程圆润滑到 0** 的曲线，没有任何断口。两侧是同一束光、同一反光度，只差用哪个点乘量高光。",
    tags: ["对比", "强度带"],
  },

  // ── L3 应用（给参数判结果 / 改法 / 读代码） ──
  {
    id: "bp-30",
    chapter: "blinn-phong",
    level: 3,
    question: "想在球的 Demo 里把 Phong 的断裂调到最扎眼，三个控件各往哪调？",
    answer:
      "① 光照模型切到 **Phong**（断裂是 Phong 才有的）；② 光源角度拖到**最掠射**（光几乎贴球面，R 与 V 才容易越 90°）；③ 反光度调**很低**（如 8，高光铺得大、淡出缓，断口落在亮处）。三者合起来最易现断裂。",
    tags: ["应用", "Demo"],
  },
  {
    id: "bp-31",
    chapter: "blinn-phong",
    level: 3,
    question:
      "从 Phong 换 Blinn 后高光「又大又肉」，最可能漏了哪一步？怎么修？",
    answer:
      "漏了**把反光度指数调大**。`N·H` 衰减比 `R·V` 慢，同指数下 Blinn 高光天生更大。修法：换 Blinn 后把 `pow` 指数调大到原来的约 2~4 倍（如 32→64~128）。",
    tags: ["反光度指数", "排错"],
  },
  {
    id: "bp-32",
    chapter: "blinn-phong",
    level: 3,
    question:
      "把 Phong 镜面那行 `pow(max(dot(viewDir, reflectDir), 0.0), 32.0)` 改成 Blinn，怎么写？",
    answer:
      "先求半程向量 `vec3 halfwayDir = normalize(lightDir + viewDir);`，再写 `float spec = pow(max(dot(norm, halfwayDir), 0.0), 64.0);`——把 `reflectDir` 换成 `halfwayDir`、`viewDir·reflectDir` 换成 `norm·halfwayDir`、指数 32 调到约 64。",
    tags: ["代码", "改写"],
  },
  {
    id: "bp-33",
    chapter: "blinn-phong",
    level: 3,
    question:
      "高光位置或亮度明显不对、甚至比 Phong 还糟，半程向量可能怎么写错了？",
    answer:
      "两种常见写错：① 写成了 `normalize(-lightDir + viewDir)`（用错了光线方向）；② `lightDir + viewDir` 之后**忘了 `normalize`**。修法：`H = normalize(lightDir + viewDir)`，两个都用朝外方向、相加后必须归一化。",
    tags: ["半程向量", "排错"],
  },
  {
    id: "bp-34",
    chapter: "blinn-phong",
    level: 3,
    question:
      "一束很掠射的光照一个低反光度平面，Phong 高光边缘会怎样、Blinn 为什么没事？",
    answer:
      "Phong 会沿高光边缘截出一道硬边（`R·V` 越 90° 被 max 截 0）；Blinn 用 `N·H`、H 夹在 L、V 之间夹角不越界，所以高光平滑淡出、没有硬边。",
    tags: ["应用", "对比"],
  },
  {
    id: "bp-35",
    chapter: "blinn-phong",
    level: 3,
    question:
      "Phong 用指数 32，想换 Blinn 得到差不多大小的高光，指数大概设多少？",
    answer:
      "大概设 **64~128**（约 2~4 倍）。具体取哪个值靠在 Demo 里一边切 Phong/Blinn、一边拖反光度亲眼校准——目标是两者高光斑大小看起来一致。",
    tags: ["反光度指数", "应用"],
  },
  {
    id: "bp-36",
    chapter: "blinn-phong",
    level: 3,
    question:
      "在 Demo 里先记住 Phong 下高光斑大小，切到 Blinn 高光「胖」了一圈，怎么缩回去？",
    answer:
      "把反光度往上调 2~4 倍（如 16→48）。`N·H` 衰减慢导致 Blinn 高光更大，调大指数让它锐回去，高光斑就缩回差不多大小——这就是「换 Blinn 要调大指数」的实感。",
    tags: ["反光度指数", "Demo"],
  },
  {
    id: "bp-37",
    chapter: "blinn-phong",
    level: 3,
    question:
      "一块潮湿地砖被夕阳几乎水平掠射、有长反光带，该用 Phong 还是 Blinn？为什么？",
    answer:
      "用 **Blinn-Phong**。这是 Phong 断裂的重灾区：光极掠射、反光带铺得长，Phong 会沿反光带边缘截出硬边；Blinn 的 `N·H` 不越界，反光带平滑淡出。",
    tags: ["选型", "应用"],
  },
  {
    id: "bp-38",
    chapter: "blinn-phong",
    level: 3,
    question: "一颗抛光金属珠、高反光度、光在正上方，该用 Phong 还是 Blinn？",
    answer:
      "**Phong 也行**。高反光度高光缩成一小点、远离 90° 边界几乎不会断裂；光在正上方非掠射。这种场景 Phong 够用还省一次 `reflect`。当然用 Blinn 也没问题（把指数调大即可）。",
    tags: ["选型", "应用"],
  },
  {
    id: "bp-39",
    chapter: "blinn-phong",
    level: 3,
    question:
      "Demo 里把光压掠射、反光度压到 8~16、切到 Phong，盯哪里能看到那道硬边？",
    answer:
      "盯**高光朝向背光那侧的边缘**——会出现一道偏硬的截断；同样参数切到 Blinn，那道边立刻变平滑。",
    tags: ["Demo", "应用"],
  },
  {
    id: "bp-40",
    chapter: "blinn-phong",
    level: 3,
    question:
      "在 Phong 球 Demo 里把光源角度拖回正上方、反光度调高，断裂还会出现吗？为什么？",
    answer:
      "基本不会。光在正上方非掠射、R 与 V 夹角不易越 90°；高反光度高光缩成小点、远离边界。断裂需要「掠射 + 低反光度」同时具备，缺一就难以触发。",
    tags: ["Demo", "应用"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 选型） ──
  {
    id: "bp-41",
    chapter: "blinn-phong",
    level: 4,
    question:
      "在做了 gamma 校正 / 走线性空间的管线里，直接套用 sRGB 老教程的 Phong 反光度，会怎样？为什么？",
    answer:
      "高光要么过曝一片、要么贼小看不见。因为**反光度参数和它所处的颜色空间强绑定**——线性空间下高光的视觉表现和 sRGB 空间差很多，老参数照搬必然失真。修法：明确自己在线性还是 sRGB 空间调参，换 Blinn 时重新校准反光度，gamma 校正放最后统一做。",
    tags: ["陷阱", "颜色空间", "选型"],
  },
  {
    id: "bp-42",
    chapter: "blinn-phong",
    level: 4,
    question:
      "一个追求真实感、做了 gamma 校正的离线渲染场景，镜面项该怎么选？还要注意什么？",
    answer:
      "选 **Blinn-Phong**：它更贴近真实微表面、更容易满足能量守恒，是离线渲染长期默认的镜面项。注意线性空间记得**重新校准反光度**，别从 sRGB 老教程照搬数值。",
    tags: ["选型", "综合"],
  },
  {
    id: "bp-43",
    chapter: "blinn-phong",
    level: 4,
    question:
      "一句话原则：怕掠射断裂 / 要平滑 / 要真实 vs 只在高反光度小高光、不掠射，分别选什么？",
    answer:
      "**怕掠射断裂、要平滑、要真实 → Blinn**（也更贴近能量守恒、离线渲染默认）；**只在高反光度小高光、不掠射的场合 → Phong 也够**（且省一个 `reflect`）。",
    tags: ["选型", "综合"],
  },
  {
    id: "bp-44",
    chapter: "blinn-phong",
    level: 4,
    question:
      "把「掠射、低反光度、Phong」三者拆开看，各自在断裂里扮演什么角色？",
    answer:
      "掠射制造「R 与 V 越界」；低反光度让高光一路铺到越界处（断口落亮处）；Phong 提供那把会截负的「剪刀」(`R·V` + max)。三者合起来才出最扎眼的硬边，缺一就难现。",
    tags: ["Phong 镜面断裂", "综合"],
  },
  {
    id: "bp-45",
    chapter: "blinn-phong",
    level: 4,
    question: "为什么说 Blinn 换法是「绕开问题」而不是「修反射向量」？",
    answer:
      "Phong 的病根在反射向量 R 会越界。Blinn 不去修 R，而是**根本不求 R**，改用半程向量 H 和 `N·H` 来量高光——H 永远夹在 L、V 之间、不越界，于是从源头绕开了「R·V 被 clamp」这回事。",
    tags: ["Blinn-Phong 镜面", "综合"],
  },
  {
    id: "bp-46",
    chapter: "blinn-phong",
    level: 4,
    question:
      "有人换了 Blinn、指数也调大了，但高光位置整个偏了。最可能哪里错？",
    answer:
      "半程向量方向算错了——多半是把 `H` 写成了 `normalize(-lightDir + viewDir)`（用了「光打过来」的方向），或忘了 `normalize`。指数调大解决的是「大小」，方向错了是「位置」错，两者是两码事，要分开排查。",
    tags: ["半程向量", "排错", "综合"],
  },
  {
    id: "bp-47",
    chapter: "blinn-phong",
    level: 4,
    question:
      "为什么「能量守恒」让 Blinn 成为离线渲染的长期默认，而不只是修了个 bug？",
    answer:
      "修断裂只是最直接的好处。半程向量模型更贴近真实微表面反光机制、更容易让镜面项不「凭空变亮」（满足能量守恒），所以在追求真实感的离线渲染里长期作默认，还启发了 PBR——它的价值远超「修硬边」。",
    tags: ["能量守恒", "综合"],
  },
  {
    id: "bp-48",
    chapter: "blinn-phong",
    level: 4,
    question: "Blinn 比 Phong 多算了什么、又省了什么？综合看开销如何？",
    answer:
      "Blinn 省掉了 `reflect`（不求反射向量 R），改成一次 `normalize(L+V)` 求半程向量。两者都做一次点乘 + 一次 `pow`，开销基本相当；Blinn 还顺带去掉了掠射断裂、更平滑，性价比通常更高。",
    tags: ["开销", "综合"],
  },
  {
    id: "bp-49",
    chapter: "blinn-phong",
    level: 4,
    question:
      "三个场景：①夕阳掠射湿地砖 ②正上方光照抛光金属珠 ③gamma 校正的真实感离线渲染，分别选 Phong 还是 Blinn？",
    answer:
      "①湿地砖掠射 → **Blinn**（Phong 会沿反光带截硬边）；②金属珠高反光度 + 正上方 → **Phong 也够**（小高光远离边界、还省 reflect）；③真实感 + gamma 离线 → **Blinn**（更贴近能量守恒、记得线性空间重校反光度）。",
    tags: ["选型", "综合"],
  },
  {
    id: "bp-50",
    chapter: "blinn-phong",
    level: 4,
    question: "把整条「Phong 为什么断、Blinn 为什么不断」的因果链讲清。",
    answer:
      "①Phong 用 `R·V` 量高光 → ②掠射时 R 与 V 夹角越 90°、`R·V` 变负 → ③`max(…,0)` 把它截成 0、高光骤降出硬边（低反光度让断口落在亮处更扎眼）。Blinn 改用 `H=normalize(L+V)` 和 `N·H` → H 总夹在 L、V 之间、N·H 几乎不越界 → 高光平滑连续淡到 0，绕开了那道坎。",
    tags: ["综合", "因果链"],
  },
];
