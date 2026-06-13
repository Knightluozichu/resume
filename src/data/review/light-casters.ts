/** 复习题库 · 投光物（light-casters）。Phase B 各章独立文件，避免并行写冲突。 */

import type { ReviewQuestion } from "./types";

export const lightCastersQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / 数值约定 / 公式形状） ──
  {
    id: "lc-1",
    chapter: "light-casters",
    level: 1,
    question: "什么是「投光物」（light caster）？本章讲哪三种？",
    answer:
      "投光物是「光怎么投射到物体上」的统称。同一套 Phong（环境光 + 漫反射 + 镜面）可以接上不同投光物来模拟不同的灯。本章三种：平行光（太阳）、点光源（灯泡）、聚光（手电筒）。",
    tags: ["投光物", "定义"],
  },
  {
    id: "lc-2",
    chapter: "light-casters",
    level: 1,
    question: "平行光（directional light）模拟现实里的哪种光源？它有位置吗？",
    answer:
      "模拟太阳那样无限远处的光源。它只有一个「方向」、没有具体位置——因为离得无穷远，所有光线几乎完全平行。",
    tags: ["平行光", "定义"],
  },
  {
    id: "lc-3",
    chapter: "light-casters",
    level: 1,
    question:
      "平行光的所有光线有什么共同特征？场景里不同片段收到的光方向一样吗？",
    answer:
      "所有光线几乎完全平行、朝向一致。场景里每个片段收到的光方向都一样（用同一个 `lightDir`），强度也不随距离衰减——太阳照院子，这头那头一样亮。",
    tags: ["平行光", "方向"],
  },
  {
    id: "lc-4",
    chapter: "light-casters",
    level: 1,
    question: "平行光着色器里求指向光源方向 `lightDir` 的那一行怎么写？",
    answer:
      "`lightDir = normalize(-light.direction)`。`light.direction` 是光「射出去」的方向，取负得到「指向光源」的方向，再归一化。",
    tags: ["平行光", "lightDir"],
  },
  {
    id: "lc-5",
    chapter: "light-casters",
    level: 1,
    question:
      "「光线方向」（light.direction）指的是什么方向？和漫反射要的方向是同一个吗？",
    answer:
      "指光「射出去」的朝向（比如太阳光斜着往下打就是一个朝下偏的向量）。它和漫反射要的「指向光源」的方向正好相反，所以用前要取负。",
    tags: ["光线方向", "定义"],
  },
  {
    id: "lc-6",
    chapter: "light-casters",
    level: 1,
    question: "点光源（point light）模拟现实里的哪种光源？它有位置吗？",
    answer:
      "模拟灯泡、火把这类有限光源。它在场景里有一个具体位置，向四面八方发光，光的强度随片段到它的距离增大而减弱（衰减）。",
    tags: ["点光源", "定义"],
  },
  {
    id: "lc-7",
    chapter: "light-casters",
    level: 1,
    question: "点光源着色器里求 `lightDir` 的那一行怎么写？",
    answer:
      "`lightDir = normalize(light.position - FragPos)`——「光源位置减表面位置」再归一化，得到从表面指向光源的方向。",
    tags: ["点光源", "lightDir"],
  },
  {
    id: "lc-8",
    chapter: "light-casters",
    level: 1,
    question: "什么是「衰减」（attenuation）？它影响 Phong 哪几块？",
    answer:
      "衰减是点光源（和聚光）的强度随距离减弱的现象，离光源越远越暗。算出一个系数后乘到漫反射和镜面上（环境光通常也乘），让灯有「近处刺眼、远处昏暗」的真实感。",
    tags: ["衰减", "定义"],
  },
  {
    id: "lc-9",
    chapter: "light-casters",
    level: 1,
    question: "写出点光源的衰减公式（用 $K_c$、$K_l$、$K_q$、$d$）。",
    answer:
      "衰减系数为 $\\frac{1}{K_c + K_l \\cdot d + K_q \\cdot d^2}$，其中 $d$ 是片段到光源的距离，$K_c$ 是常数项、$K_l$ 是一次项系数、$K_q$ 是二次项系数。",
    tags: ["衰减", "公式"],
  },
  {
    id: "lc-10",
    chapter: "light-casters",
    level: 1,
    question: "衰减公式里 $K_c$、$K_l$、$K_q$ 三个常数分别叫什么？",
    answer:
      "$K_c$ 是常数项（constant），$K_l$ 是一次项 / 线性项系数（linear），$K_q$ 是二次项 / 平方项系数（quadratic）。",
    tags: ["衰减", "Kc", "Kl", "Kq"],
  },
  {
    id: "lc-11",
    chapter: "light-casters",
    level: 1,
    question: "衰减公式里的距离 $d$ 在着色器里怎么算出来？",
    answer:
      "用 `length(light.position - FragPos)`——光源位置减片段位置得到向量，取它的长度就是片段到光源的距离 $d$。",
    tags: ["衰减", "距离"],
  },
  {
    id: "lc-12",
    chapter: "light-casters",
    level: 1,
    question: "聚光（spotlight）模拟现实里的哪种光源？它的光是什么形状？",
    answer:
      "模拟手电筒、舞台追光灯。它既有位置、又有一个照射方向，光被收束成一个锥形——只有落在锥内的片段才被照亮，锥外一片黑。",
    tags: ["聚光", "定义"],
  },
  {
    id: "lc-13",
    chapter: "light-casters",
    level: 1,
    question: "什么是「切光角」（cutoff）？代码里通常存的是角度本身吗？",
    answer:
      "切光角是聚光锥的「半张角」，决定光锥有多宽。代码里通常不存角度本身，而是存这个角的余弦值，方便和点乘（也是个余弦）直接比较。",
    tags: ["切光角", "定义"],
  },
  {
    id: "lc-14",
    chapter: "light-casters",
    level: 1,
    question: "聚光里 `theta`（即 $\\cos\\theta$）是怎么算出来的？",
    answer:
      "`theta = dot(lightDir, normalize(-light.direction))`——是「从光源指向片段的方向」与「聚光朝向（取负转成望向锥顶）」两个单位向量的点乘，正好等于它们夹角的余弦 $\\cos\\theta$。",
    tags: ["聚光", "theta", "点乘"],
  },
  {
    id: "lc-15",
    chapter: "light-casters",
    level: 1,
    question: "什么是「内外圆锥」？两个切光角各叫什么？",
    answer:
      "聚光的两个切光角：内圆锥（`cutOff`）以内全亮、外圆锥（`outerCutOff`）以外全黑，两者之间的环带里亮度从 1 平滑降到 0，用来消除生硬的光圈硬边。",
    tags: ["内外圆锥", "定义"],
  },
  {
    id: "lc-19",
    chapter: "light-casters",
    level: 1,
    question: "聚光内外锥平滑用的是哪个内建函数把强度夹在 0~1？",
    answer:
      "用 `clamp`：`intensity = clamp((theta - light.outerCutOff) / epsilon, 0.0, 1.0)`，把内锥里超过 1 的、外锥外低于 0 的都夹住。",
    tags: ["内外圆锥", "clamp"],
  },
  {
    id: "lc-20",
    chapter: "light-casters",
    level: 1,
    question: "平行光的 `Light` 结构体里有没有 `position` 字段？",
    answer:
      "没有。平行光只有 `direction`（光线方向）加上 `ambient / diffuse / specular`。它没有位置，所以不能用「位置减位置」求 `lightDir`。",
    tags: ["平行光", "结构体"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "lc-16",
    chapter: "light-casters",
    level: 2,
    question: "聚光内外锥平滑里 `epsilon` 是什么？怎么算？它必须为正吗？",
    answer:
      "`epsilon = light.cutOff - light.outerCutOff`——内锥余弦减外锥余弦，是过渡环带在余弦上的宽度，用作 `clamp` 的分母。它必须为正：外锥角大于内锥角时外锥余弦更小，相减才得正值，否则会除零或反向。",
    tags: ["内外圆锥", "epsilon"],
  },
  {
    id: "lc-17",
    chapter: "light-casters",
    level: 2,
    question: "三种投光物里，哪几种带衰减、哪种不带？为什么这样分？",
    answer:
      "点光源和聚光带距离衰减；平行光不衰减。因为点光源、聚光是有限光源、有具体位置，离它越远越暗才真实；平行光模拟无穷远的太阳，远近一个样，没有衰减一说。聚光还额外有切光角带来的锥形强度。",
    tags: ["投光物", "衰减", "对比"],
  },
  {
    id: "lc-18",
    chapter: "light-casters",
    level: 2,
    question: "三种投光物共用什么、各自只换什么？",
    answer:
      "三种共用同一套 Phong 三块（环境光、漫反射 `N·L`、镜面 `pow(R·V, n)`），算法原封不动。各自只换「怎么得到 `lightDir`」、以及「要不要再乘一个随距离 / 随角度变化的系数」。",
    tags: ["投光物", "Phong", "对比"],
  },
  {
    id: "lc-21",
    chapter: "light-casters",
    level: 2,
    question: "为什么平行光可以「没有位置、只有方向」？这个简化从哪来？",
    answer:
      "因为太阳那样的光源离得无穷远，打到地面的所有光线几乎完全平行、朝向一致。既然方向处处相同、远近一个样，再单独给它一个「位置」就没有意义了，所以只保留一个方向向量。",
    tags: ["平行光", "为什么"],
  },
  {
    id: "lc-22",
    chapter: "light-casters",
    level: 2,
    question: "为什么平行光求 `lightDir` 要给方向「取负」？",
    answer:
      "因为 `light.direction` 存的是光「射出去」的方向，而漫反射要的是从表面「望向光源」的方向，两者正好相反。取负 `-light.direction` 把「射出」翻成「指向光源」，再归一化即得 `lightDir`。",
    tags: ["平行光", "取负", "为什么"],
  },
  {
    id: "lc-23",
    chapter: "light-casters",
    level: 2,
    question: "点光源和平行光在求 `lightDir` 上有什么本质区别？",
    answer:
      "平行光没位置，`lightDir = normalize(-light.direction)`，对所有片段是同一个常量方向；点光源有位置，`lightDir = normalize(light.position - FragPos)`，每个片段方向都不同（取决于它和光源的相对位置）。",
    tags: ["点光源", "平行光", "对比"],
  },
  {
    id: "lc-24",
    chapter: "light-casters",
    level: 2,
    question: "衰减公式里为什么距离 $d$ 越大、整体越暗？",
    answer:
      "因为公式是 $\\frac{1}{K_c + K_l d + K_q d^2}$，$d$ 越大分母越大，整个分数越小。这个系数乘到漫反射和镜面上，系数越小那块表面就越暗——这就是「越远越暗」。",
    tags: ["衰减", "为什么"],
  },
  {
    id: "lc-25",
    chapter: "light-casters",
    level: 2,
    question:
      "衰减三项里，二次项 $K_q \\cdot d^2$ 起什么作用？为什么它管远处？",
    answer:
      "$K_q \\cdot d^2$ 随距离平方增长，涨得最快，在远处对分母贡献最大，让远处衰减得又快又狠。这正是真实灯光「先慢后陡」那种落法的来源——近处变化温和，远处迅速暗下去。",
    tags: ["衰减", "Kq", "为什么"],
  },
  {
    id: "lc-26",
    chapter: "light-casters",
    level: 2,
    question: "衰减里 $K_c$（常数项）为什么通常取 1？设成 0 会怎样？",
    answer:
      "$K_c$ 保证 $d=0$ 时分母不为 0、系数不会爆掉，取 1 使近处约等于满亮。设成 0 时，近处分母趋近 0，衰减系数爆成超大值，画面过曝全白。",
    tags: ["衰减", "Kc", "为什么"],
  },
  {
    id: "lc-28",
    chapter: "light-casters",
    level: 2,
    question: "「夹角更小」为什么等价于「余弦更大」？在什么角度范围内成立？",
    answer:
      "因为余弦在 $[0°, 90°]$ 这段里单调递减——角度越大、余弦越小。所以 $\\theta < \\phi \\iff \\cos\\theta > \\cos\\phi$，即「夹角更小（更靠锥中心）」完全等价于「余弦更大」。这个等价只在该区间成立。",
    tags: ["聚光", "比余弦", "单调"],
  },
  {
    id: "lc-29",
    chapter: "light-casters",
    level: 2,
    question:
      "聚光里 `theta > cutOff` 为什么表示「在内锥里」（而不是反过来）？",
    answer:
      "因为 `cutOff` 存的是切光角的余弦，且越靠锥中心、夹角越小、余弦越大。所以 `theta`（即 $\\cos\\theta$）大于 `cutOff` 这个余弦值，就说明夹角比切光角更小，片段落在内锥里。",
    tags: ["聚光", "切光角", "比余弦"],
  },
  {
    id: "lc-30",
    chapter: "light-casters",
    level: 2,
    question: "只用一个切光角「一刀切」，画面会出什么毛病？为什么？",
    answer:
      "锥内全亮、锥外全黑，边缘是一道生硬刺眼的圆边，像被剪刀剪出来，很假。原因是 `theta` 一越过 `cutOff` 这条线，亮度就从满值瞬间跳到 0，中间没有任何渐变。",
    tags: ["内外圆锥", "硬边", "为什么"],
  },
  {
    id: "lc-31",
    chapter: "light-casters",
    level: 2,
    question:
      "内外圆锥的 `clamp((theta - outerCutOff) / epsilon, 0, 1)` 是怎么做到平滑过渡的？",
    answer:
      "`(theta - outerCutOff) / epsilon` 把过渡环带上的余弦线性映射到 0~1：越靠内锥越接近 1、越靠外锥越接近 0。`clamp` 再把内锥里超过 1 的截成 1（全亮）、外锥外低于 0 的截成 0（全黑），于是中间环带亮度平滑渐变。",
    tags: ["内外圆锥", "clamp", "机制"],
  },
  {
    id: "lc-33",
    chapter: "light-casters",
    level: 2,
    question: "聚光的 `cutOff` / `outerCutOff` 为什么要在 CPU 侧预先算成余弦？",
    answer:
      "为了让着色器里只做一次点乘比较、不必现算反三角函数。CPU 侧用 `cos(radians(角度))` 把切光角一次性转成余弦传进来（属每帧只算一次或不变），着色器对每个片段都省掉昂贵的 `acos`。",
    tags: ["聚光", "切光角", "CPU侧"],
  },
  {
    id: "lc-34",
    chapter: "light-casters",
    level: 2,
    question: "三种投光物里，为什么说「Phong 三块原封不动」？变的到底是什么？",
    answer:
      "因为环境光、漫反射 `N·L`、镜面 `pow(R·V, n)` 的算法在三种灯里完全一样。变的只有两处：怎么得到 `lightDir`（方向取负 / 位置减位置），以及要不要再乘一个系数（衰减 / 锥形强度）。",
    tags: ["投光物", "Phong", "机制"],
  },
  {
    id: "lc-36",
    chapter: "light-casters",
    level: 2,
    question:
      "聚光取 `normalize(-light.direction)` 时为什么要对 `light.direction` 取负？",
    answer:
      "`light.direction` 是聚光「射出」的朝向，而 `theta` 要比较的是「从光源指向片段的方向（lightDir）」与「望向锥顶的方向」的夹角。取负把「射出朝向」翻成「望向锥顶」，两者都从锥顶方向看，点乘才是想要的 $\\cos\\theta$。",
    tags: ["聚光", "取负", "为什么"],
  },
  {
    id: "lc-38",
    chapter: "light-casters",
    level: 2,
    question: "为什么平行光的方向像 `(-0.2, -1.0, -0.3)` 这样带负的 Y 分量？",
    answer:
      "因为这是光「射出去」的方向，太阳在天上斜着往下照，方向自然朝下偏（Y 为负）。着色器用前再取负 `-light.direction` 得到从地面「指向太阳」（朝上偏）的 `lightDir`。",
    tags: ["平行光", "光线方向"],
  },

  // ── L3 应用（读代码 / 给参数判结果 / 小计算） ──
  {
    id: "lc-27",
    chapter: "light-casters",
    level: 3,
    question:
      "为什么聚光判断锥内外用「比余弦」而不是「比角度」？这样省了什么开销？",
    answer:
      "因为 $\\cos\\theta$ 不用反三角函数现算——它正是 `lightDir` 与 `normalize(-light.direction)` 两个单位向量的点乘（单位向量点乘 = 夹角余弦）；而 $\\cos\\phi$ 在 CPU 侧预先算好传进来即可。于是着色器里只要一句 `dot` 加一次比较，省掉每片段昂贵的 `acos`。",
    tags: ["聚光", "比余弦", "应用"],
  },
  {
    id: "lc-32",
    chapter: "light-casters",
    level: 3,
    question:
      "在主 Demo 里把灯转远后立方体变暗，平行光为什么不会这样？用公式说清差别。",
    answer:
      "平行光不乘任何衰减、方向处处相同，受光只取决于法线朝向、与距离无关，所以远近一个样。点光源额外乘了 $\\frac{1}{K_c + K_l d + K_q d^2}$，距离 $d$ 越大系数越小，于是近亮远暗——区别就在这个乘数有没有。",
    tags: ["平行光", "点光源", "应用"],
  },
  {
    id: "lc-37",
    chapter: "light-casters",
    level: 3,
    question:
      "想让点光源「照得更远」，按经验取值表该选哪一行？对应 $K_l$ / $K_q$ 怎么变？",
    answer:
      "选覆盖距离更大的那一行，它的 $K_l$、$K_q$ 更小（$K_c$ 一直保持 1）。系数越小，分母随距离增长得越慢，衰减越温和，灯就照得越远。",
    tags: ["衰减", "取值表", "应用"],
  },
  {
    id: "lc-39",
    chapter: "light-casters",
    level: 3,
    question:
      "聚光把 `intensity` 乘到漫反射 / 镜面上，若也乘到环境光上，锥外会怎样？通常怎么取舍？",
    answer:
      "若环境光也乘 `intensity`，锥外环境光被压到 0，物体完全死黑、过于生硬。通常环境光不乘，给锥外留一点底光，让锥外物体仍隐约可见；漫反射、镜面随锥形强度衰减出柔和光圈。",
    tags: ["聚光", "环境光", "intensity"],
  },
  {
    id: "lc-40",
    chapter: "light-casters",
    level: 3,
    question:
      "聚光把外锥角设得比内锥角还小，运行时 `epsilon` 和边缘会怎样？怎么避免？",
    answer:
      "外锥角更小则外锥余弦更大，`epsilon = cutOff - outerCutOff` 变为 0（除零）或负（过渡反向、外亮内暗），边缘整个乱掉。避免：确保外锥角 > 内锥角（余弦则外 < 内），`epsilon` 才为正。",
    tags: ["内外圆锥", "epsilon", "应用"],
  },
  {
    id: "lc-41",
    chapter: "light-casters",
    level: 3,
    question:
      "点光源距离 $d = 2$，$K_c = 1.0$、$K_l = 0.09$、$K_q = 0.032$，衰减系数约是多少？",
    answer:
      "代入 $\\frac{1}{1.0 + 0.09 \\times 2 + 0.032 \\times 4} = \\frac{1}{1 + 0.18 + 0.128} = \\frac{1}{1.308} \\approx 0.76$。即漫反射 / 镜面被乘上约 0.76。",
    tags: ["衰减", "计算"],
  },
  {
    id: "lc-42",
    chapter: "light-casters",
    level: 3,
    question:
      "同一盏点光源（$K_c=1$、$K_l=0.09$、$K_q=0.032$），$d=0$ 和 $d=10$ 的衰减系数各约多少？",
    answer:
      "$d=0$：$\\frac{1}{1+0+0} = 1$（满亮）。$d=10$：$\\frac{1}{1 + 0.9 + 3.2} = \\frac{1}{5.1} \\approx 0.196$。距离从 0 到 10，亮度掉到约两成，可见远处明显变暗。",
    tags: ["衰减", "计算"],
  },
  {
    id: "lc-43",
    chapter: "light-casters",
    level: 3,
    question:
      "把 `light.constant` 设成 `0.0`，其余正常，点光源近处会怎样？为什么？",
    answer:
      "近处过曝全白。因为 $d$ 小时分母 $0 + K_l d + K_q d^2$ 趋近 0，衰减系数 $\\frac{1}{\\text{很小的数}}$ 爆成超大值，乘到光照上严重过曝。修法：`constant` 保持 `1.0`。",
    tags: ["衰减", "Kc", "读代码"],
  },
  {
    id: "lc-44",
    chapter: "light-casters",
    level: 3,
    question:
      "把 `light.linear` 和 `light.quadratic` 都设成 `0.0`（`constant=1`），点光源还会随距离变暗吗？",
    answer:
      "不会。分母恒为 `constant`（=1），衰减系数恒等于 1，与 $d$ 无关——离多远都一样亮，等于没有衰减。想看衰减，必须给 `linear` / `quadratic` 一对非零值。",
    tags: ["衰减", "读代码"],
  },
  {
    id: "lc-45",
    chapter: "light-casters",
    level: 3,
    question:
      "聚光内锥余弦 `cutOff = 0.98`、外锥余弦 `outerCutOff = 0.95`，某片段 `theta = 0.99`，`intensity` 是多少？",
    answer:
      "`epsilon = 0.98 - 0.95 = 0.03`；`(0.99 - 0.95) / 0.03 = 0.04 / 0.03 ≈ 1.33`，`clamp` 到 0~1 后为 `1.0`。`theta` 比内锥余弦还大，落在内锥里，全亮。",
    tags: ["内外圆锥", "clamp", "计算"],
  },
  {
    id: "lc-46",
    chapter: "light-casters",
    level: 3,
    question:
      "同上（`cutOff=0.98`、`outerCutOff=0.95`），某片段 `theta = 0.965`，`intensity` 约是多少？",
    answer:
      "`epsilon = 0.03`；`(0.965 - 0.95) / 0.03 = 0.015 / 0.03 = 0.5`，在 0~1 内不被夹。即落在过渡环带正中、亮度约 50%。",
    tags: ["内外圆锥", "clamp", "计算"],
  },
  {
    id: "lc-47",
    chapter: "light-casters",
    level: 3,
    question:
      "同上聚光，某片段 `theta = 0.90`，`intensity` 是多少？这个片段在锥的哪里？",
    answer:
      "`(0.90 - 0.95) / 0.03 = -0.05 / 0.03 ≈ -1.67`，`clamp` 到 0~1 后为 `0.0`。`theta` 比外锥余弦还小、夹角比外锥还大，落在外锥之外，全黑。",
    tags: ["内外圆锥", "clamp", "计算"],
  },
  {
    id: "lc-48",
    chapter: "light-casters",
    level: 3,
    question:
      "想让聚光内锥 12.5°、外锥 17.5°，CPU 侧传给着色器的 `cutOff` / `outerCutOff` 怎么算？",
    answer:
      "传余弦值：`cutOff = cos(radians(12.5))`、`outerCutOff = cos(radians(17.5))`。注意角度小的内锥余弦更大（约 0.976），角度大的外锥余弦更小（约 0.953），符合 `cutOff > outerCutOff`。",
    tags: ["聚光", "切光角", "CPU侧"],
  },
  {
    id: "lc-49",
    chapter: "light-casters",
    level: 3,
    question:
      "看到着色器算完 Phong 后写 `diffuse *= attenuation; specular *= attenuation;`，这是哪种投光物？平行光会有这两行吗？",
    answer:
      "是点光源（或聚光），因为乘了距离衰减 `attenuation`。平行光不衰减，不会有这两行——它算完 Phong 三块直接结束。",
    tags: ["点光源", "衰减", "读代码"],
  },
  {
    id: "lc-50",
    chapter: "light-casters",
    level: 3,
    question:
      "着色器里 `lightDir` 写成 `normalize(-light.direction)`，且没有任何 `attenuation`，这是哪种投光物？",
    answer:
      "是平行光。标志是：用 `-light.direction` 取负求方向（无 `position`），且完全不乘衰减——远近一个样。",
    tags: ["平行光", "读代码"],
  },
  {
    id: "lc-53",
    chapter: "light-casters",
    level: 3,
    question:
      "想让点光源照得更远（衰减更慢），按取值表该把 `linear` / `quadratic` 调大还是调小？",
    answer:
      "调小。$K_l$、$K_q$ 越小，分母随距离涨得越慢，衰减越温和，灯照得越远。取值表里覆盖距离更大的行，对应的就是更小的 `linear` / `quadratic`（`constant` 一直保持 1.0）。",
    tags: ["衰减", "取值表", "应用"],
  },
  {
    id: "lc-54",
    chapter: "light-casters",
    level: 3,
    question:
      "在主 Demo 里把点光源转到立方体最远的一侧，朝你这面会变亮还是变暗？哪个量在起作用？",
    answer:
      "变暗。起作用的是衰减系数 `attenuation = 1/(Kc + Kl·d + Kq·d²)`：距离 $d$ 变大，分母变大，系数变小，乘到漫反射 / 镜面上，朝你这面就暗了。",
    tags: ["点光源", "衰减", "Demo"],
  },
  {
    id: "lc-55",
    chapter: "light-casters",
    level: 3,
    question:
      "想在同样距离下让点光源衰减得更狠（更暗），调大哪个常数最有效？为什么？",
    answer:
      "调大 $K_q$（二次项系数）最有效。因为 $K_q \\cdot d^2$ 随距离平方增长，在中远距离对分母贡献涨得最快，调大它能让远处衰减又快又狠。调 $K_l$ 也更暗但更温和（线性）。",
    tags: ["衰减", "Kq", "应用"],
  },
  {
    id: "lc-58",
    chapter: "light-casters",
    level: 3,
    question:
      "聚光 `theta = 0.99`，内锥余弦 `cutOff = 0.91`、外锥余弦 `outerCutOff = 0.82`，`intensity` 是多少？",
    answer:
      "`epsilon = 0.91 - 0.82 = 0.09`；`(0.99 - 0.82) / 0.09 = 0.17 / 0.09 ≈ 1.89`，`clamp` 到 1.0。`theta` 远大于内锥余弦，落在内锥深处，全亮。",
    tags: ["内外圆锥", "clamp", "计算"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 边界） ──
  {
    id: "lc-35",
    chapter: "light-casters",
    level: 4,
    question:
      "为什么点光源、聚光那几段计算在 C++/OpenGL 和 WebGL2 两端「一字不差」？着色器头部又差在哪？",
    answer:
      "因为这几段全是纯数学计算（`normalize`、`length`、衰减分式、`dot`、`clamp`），没有用到任何有 API 差异的特性，所以两端逐字相同。差异只在着色器头部：桌面写 `#version 330 core`，WebGL2 写 `#version 300 es` 且片段着色器必须多一行 `precision highp float;`（GLSL ES 300 无默认 float 精度）。",
    tags: ["投光物", "API差异", "综合"],
  },
  {
    id: "lc-51",
    chapter: "light-casters",
    level: 4,
    question: "现有一段点光源着色器，要把它改成平行光，至少要动哪几处？",
    answer:
      "①结构体把 `position` 换成 `direction`（去掉衰减三常数）；② `lightDir` 从 `normalize(light.position - FragPos)` 改成 `normalize(-light.direction)`；③删掉 `dist` / `attenuation` 计算以及 `*= attenuation` 那几行——平行光不衰减。",
    tags: ["平行光", "点光源", "综合"],
  },
  {
    id: "lc-52",
    chapter: "light-casters",
    level: 4,
    question:
      "聚光代码里把 `theta` 写成 `dot(lightDir, normalize(light.direction))`（忘了取负），效果会怎样？为什么？",
    answer:
      "方向反了：`theta` 此时比的是 `lightDir` 与「射出方向」的夹角余弦，正好和正确值反号。结果锥内外判反——本该照亮的锥前方变黑，光跑到了光源背后那一侧。修法：补上取负 `normalize(-light.direction)`，让两向量都从锥顶方向看。",
    tags: ["聚光", "取负", "陷阱"],
  },
  {
    id: "lc-56",
    chapter: "light-casters",
    level: 4,
    question:
      "聚光结构体里 `cutOff` 误存成了 12.5（角度本身，不是余弦），运行时会怎样？根因是什么？",
    answer:
      "几乎整片全黑（或锥形大小完全不对）。根因：`theta` 是 $\\cos\\theta \\in [-1, 1]$，去和 12.5 比永远小于它，于是 `intensity` 恒为 0。着色器是拿余弦比的，必须 CPU 侧用 `cos(radians(12.5))` 把角度转成余弦再传。",
    tags: ["聚光", "切光角", "陷阱"],
  },
  {
    id: "lc-57",
    chapter: "light-casters",
    level: 4,
    question:
      "平行光着色器里写漏了取负，写成 `lightDir = normalize(light.direction)`，会出什么？为什么？",
    answer:
      "`lightDir` 指向了「光射出去」的方向（背离光源），漫反射 `N·L` 算反——本该亮的面变暗、本该暗的背面反而亮，光照整个反了。因为漫反射要的是「指向光源」的方向，漏取负就指反了。修法：加回 `normalize(-light.direction)`。",
    tags: ["平行光", "取负", "陷阱"],
  },
  {
    id: "lc-59",
    chapter: "light-casters",
    level: 4,
    question:
      "点光源代码里把 `attenuation` 只乘到了 `diffuse` 上、没乘 `specular`，会看到什么不自然？",
    answer:
      "漫反射随距离变暗了，但镜面高光不衰减——远处物体漫反射已经很暗，高光却仍刺眼，显得高光「浮」在暗面上、不协调。修法：把 `attenuation` 也乘到 `specular`（通常环境光也一起乘）。",
    tags: ["点光源", "衰减", "陷阱"],
  },
  {
    id: "lc-60",
    chapter: "light-casters",
    level: 4,
    question:
      "WebGL2 里写聚光片段着色器，相比 C++ 版那段计算需要额外补哪一行？计算逻辑要改吗？",
    answer:
      "头部要补 `precision highp float;`（GLSL ES 300 片段着色器没有默认 float 精度），版本声明用 `#version 300 es`。聚光的计算逻辑（`dot`、`epsilon`、`clamp`）两端一字不差，不用改。",
    tags: ["聚光", "API差异", "WebGL2"],
  },
  {
    id: "lc-61",
    chapter: "light-casters",
    level: 4,
    question:
      "本想做太阳那样的平行光，却发现物体走远会变暗、明暗还乱跳。原因和修法？",
    answer:
      "原因：平行光误用了「位置」——还在用 `normalize(light.position - FragPos)` 求 `lightDir`，等于把它当成了点光源，方向随片段位置变、还可能误带了衰减。修法：平行光没有位置，`lightDir` 应直接由方向取负 `normalize(-light.direction)`，且不乘任何衰减。",
    tags: ["平行光", "陷阱"],
  },
  {
    id: "lc-62",
    chapter: "light-casters",
    level: 4,
    question:
      "点光源要么整个画面过曝全白、要么离多远都一样亮，分别是哪里设错了？怎么修？",
    answer:
      "全白：`constant` 设成了 0（分母趋近 0、系数爆炸）。不衰减：`linear` 和 `quadratic` 都设成 0（分母恒为 `constant`、系数恒定）。修法：`constant` 保持 1.0，按取值表给 `linear` / `quadratic` 一对非零值。",
    tags: ["衰减", "陷阱", "边界"],
  },
  {
    id: "lc-63",
    chapter: "light-casters",
    level: 4,
    question: "聚光光圈边缘是一道生硬刺眼的圆边，像被剪刀剪出来。原因和修法？",
    answer:
      "原因：只用内圆锥 `cutOff` 一刀切（`theta > cutOff` 全亮、否则全黑），没做平滑过渡。修法：加一个更大的外圆锥 `outerCutOff`，用 `intensity = clamp((theta - outerCutOff) / epsilon, 0, 1)` 让边缘从 1 平滑降到 0，光圈就柔和了。",
    tags: ["内外圆锥", "硬边", "陷阱"],
  },
  {
    id: "lc-64",
    chapter: "light-casters",
    level: 4,
    question:
      "聚光的锥形大小不对、或过渡反着来（外面亮里面暗），可能是哪两类错误？怎么修？",
    answer:
      "①把切光「角度」直接传进了着色器（着色器却拿它当余弦比）——CPU 侧统一用 `cos(radians(角度))` 转成余弦再传；②外锥角设得比内锥角还小，导致 `epsilon` 为负、过渡反向——确保外锥角 > 内锥角（余弦则外 < 内），`epsilon` 才为正。",
    tags: ["聚光", "epsilon", "陷阱"],
  },
  {
    id: "lc-65",
    chapter: "light-casters",
    level: 4,
    question:
      "把同一套着色器里三种灯都实现，靠什么在运行时选用某一种？三者最小差异点是哪几处？",
    answer:
      "通常按光源类型在着色器里分支选用（或对每种灯写独立计算函数）。最小差异只有两处：`lightDir` 怎么来（平行光 `-direction` / 点光源、聚光 `position - FragPos`），以及乘不乘系数（点光源乘衰减、聚光乘衰减 + 锥形 `intensity`、平行光都不乘）。Phong 三块共用。下一章「多光源」正是把三者写进一个着色器。",
    tags: ["投光物", "综合"],
  },
  {
    id: "lc-66",
    chapter: "light-casters",
    level: 4,
    question:
      "聚光既有位置又有方向，它和点光源、平行光分别共享了什么、又各多了什么？",
    answer:
      "和点光源共享「有位置 + `lightDir = position - FragPos` + 距离衰减」；它多出的是方向 `direction` 和两个切光角（`cutOff` / `outerCutOff`）带来的锥形强度。和平行光只共享「有一个朝向 `direction`」这个概念，但平行光无位置、不衰减、无锥形，差别最大。",
    tags: ["聚光", "点光源", "平行光", "综合"],
  },
  {
    id: "lc-67",
    chapter: "light-casters",
    level: 4,
    question:
      "为什么聚光只需一句点乘和一次比较就判出锥内外，而不必对每个片段算 `acos`？把这条优化链讲清。",
    answer:
      "因为 `lightDir` 与 `normalize(-light.direction)` 都是单位向量，它们的点乘 `dot` 直接给出 $\\cos\\theta$（无需反三角）；而切光角的余弦 $\\cos\\phi$ 由 CPU 用 `cos(radians(角度))` 预算好传入。再利用「$[0°,90°]$ 内余弦单调递减 ⇒ $\\theta<\\phi \\iff \\cos\\theta>\\cos\\phi$」，于是片段着色器只要 `theta > cutOff` 一次比较即可，省掉每片段昂贵的 `acos`。",
    tags: ["聚光", "比余弦", "综合"],
  },
  {
    id: "lc-68",
    chapter: "light-casters",
    level: 4,
    question:
      "点光源把灯转远后变暗的整条链路：从距离到屏幕上的暗，经过哪几环？",
    answer:
      "①`length(light.position - FragPos)` 算出距离 $d$ 变大 → ②衰减分式 $\\frac{1}{K_c + K_l d + K_q d^2}$ 的分母变大、系数变小 → ③这个 0~1 系数乘到 `ambient/diffuse/specular` 上 → ④该片段最终颜色整体变暗，落到屏幕像素上就是「远侧变暗」。这正是 §4 衰减曲线在立方体上的实况。",
    tags: ["点光源", "衰减", "综合"],
  },
  {
    id: "lc-69",
    chapter: "light-casters",
    level: 4,
    question: "有人想给平行光也加距离衰减「更真实」，这合理吗？为什么？",
    answer:
      "不合理。平行光模拟无限远光源（太阳），到场景的距离可视为无穷且处处相等，本就不存在「近 / 远」之分——加距离衰减没有物理依据，还会引入它根本没有的「位置」概念。太阳照院子就是远近一个样，平行光保持不衰减才对。",
    tags: ["平行光", "衰减", "综合"],
  },
  {
    id: "lc-70",
    chapter: "light-casters",
    level: 4,
    question:
      "聚光实现中既有距离衰减又有锥形 `intensity`，两者各管什么、怎么共同作用到最终亮度？",
    answer:
      "距离衰减管「沿锥轴方向、离手电越远越暗」（同点光源那条分式）；锥形 `intensity` 管「偏离锥中心轴越多越暗，到外锥外为 0」（内外锥 `clamp`）。两者都是 0~1 系数，相乘后再乘到漫反射 / 镜面上：既体现远近、又体现是否在光圈内及边缘柔化。",
    tags: ["聚光", "衰减", "内外圆锥", "综合"],
  },
];
