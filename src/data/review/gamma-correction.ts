/** 复习题库 · Gamma 校正（gamma-correction）。HEL-90 高级光照篇。 */

import type { ReviewQuestion } from "./types";

export const gammaCorrectionQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / 公式 / 数值约定） ──
  {
    id: "gm-1",
    chapter: "gamma-correction",
    level: 1,
    question: "什么是「显示器 gamma」？它的响应大致是什么关系？",
    answer:
      "显示器把输入数字转成实际亮度时的**非线性**响应：实际亮度 ≈ `输入^2.2`。同样的数字点不出成比例的亮度——输入 `0.5` 实际只亮到约 `0.22`，中间调被压得最暗。",
    tags: ["显示器 gamma", "定义"],
  },
  {
    id: "gm-2",
    chapter: "gamma-correction",
    level: 1,
    question: "gamma 值通常取多少？这个 2.2 是怎么来的？",
    answer:
      "通常取 **2.2**。它源于早年 **CRT 显像管**的物理特性（电压翻倍亮度按幂律涨），后来被 **sRGB** 标准写进规范固定下来，几乎每块屏幕都沿用。",
    tags: ["显示器 gamma", "2.2"],
  },
  {
    id: "gm-3",
    chapter: "gamma-correction",
    level: 1,
    question: "什么是「线性空间」？",
    answer:
      "数值和真实亮度**成正比**的颜色空间：值翻倍亮度就翻倍，`0.5` 就是货真价实的一半亮。物理上正确的光照计算（相加、相乘、衰减、混合）都必须在这个空间里做。",
    tags: ["线性空间", "定义"],
  },
  {
    id: "gm-4",
    chapter: "gamma-correction",
    level: 1,
    question: "什么是「sRGB 空间」？什么东西的值通常是 sRGB 的？",
    answer:
      "给屏幕看的「显示用」颜色空间，值被预先提亮过（约等于 `线性值^(1/2.2)`）以抵消屏幕的压暗。**屏幕接收的、图片文件存的、美术在屏幕上看到的颜色，几乎都是 sRGB 值**。",
    tags: ["sRGB 空间", "定义"],
  },
  {
    id: "gm-5",
    chapter: "gamma-correction",
    level: 1,
    question: "什么是「gamma 校正」？它在哪一步做、做什么运算？",
    answer:
      "在光照算完、把颜色写进屏幕**之前**，对最终颜色做 `pow(color, vec3(1.0/2.2))`，把线性结果**提亮**、编码回 sRGB 空间。它是整条渲染管线的**最后一步**，每个像素只做一次。",
    tags: ["gamma 校正", "定义"],
  },
  {
    id: "gm-6",
    chapter: "gamma-correction",
    level: 1,
    question: "什么是「双重 gamma 校正」？它的画面表现是什么？",
    answer:
      "把颜色 gamma 校正了**两次**导致画面**发白、过曝、对比度变低**的错误。常见于已用 sRGB 帧缓冲（硬件自动校正）又在着色器手动再 `pow(c,1/2.2)` 一遍。",
    tags: ["双重 gamma 校正", "定义"],
  },
  {
    id: "gm-7",
    chapter: "gamma-correction",
    level: 1,
    question: "显示器的脾气公式（第一式）怎么写？说明什么？",
    answer:
      "$c_{display} = c_{srgb}^{\\ \\gamma}$。屏幕会把输入**压暗**：代入 `0.5`、`γ=2.2`，得 `0.5^2.2 ≈ 0.22`——你以为半亮，屏幕只给两成。",
    tags: ["数学", "压暗"],
  },
  {
    id: "gm-8",
    chapter: "gamma-correction",
    level: 1,
    question: "gamma 校正公式（第二式）怎么写？做什么用？",
    answer:
      "$c_{srgb} = c_{linear}^{\\ 1/\\gamma}$。把线性算出的值**提亮**成 sRGB 值再上屏。代入 `0.5` 得 `0.5^(1/2.2) ≈ 0.73`——GLSL 里就是 `pow(color, vec3(1.0/2.2))`。",
    tags: ["数学", "提亮"],
  },
  {
    id: "gm-9",
    chapter: "gamma-correction",
    level: 1,
    question: "「一提一压正好抵消」（第三式）怎么写？结果是什么？",
    answer:
      "$c_{display} = (c_{linear}^{\\ 1/\\gamma})^{\\gamma} = c_{linear}$。你提亮 `1/γ`、屏幕压暗 `γ`，两个指数相乘等于 1，屏幕点出来的正好等于你线性算出的值。",
    tags: ["数学", "抵消"],
  },
  {
    id: "gm-10",
    chapter: "gamma-correction",
    level: 1,
    question: "纹理入口解码公式（第四式）怎么写？方向和校正一样吗？",
    answer:
      "$c_{linear} = c_{srgb}^{\\ \\gamma}$，GLSL 里 `pow(texColor, vec3(2.2))`。注意是 `γ` 不是 `1/γ`，方向和出口校正**相反**——一个管入口解码、一个管出口编码。",
    tags: ["数学", "纹理解码"],
  },
  {
    id: "gm-11",
    chapter: "gamma-correction",
    level: 1,
    question: "sRGB 颜色纹理参与光照前要做什么？两种做法是？",
    answer:
      "要先**解码回线性**：① 手动 `pow(采样色, vec3(2.2))`；② 或用 **sRGB 纹理格式**（WebGL2 里 `gl.SRGB8` 等）让硬件采样时自动解码。",
    tags: ["sRGB 纹理", "解码"],
  },
  {
    id: "gm-12",
    chapter: "gamma-correction",
    level: 1,
    question: "完整的 gamma 流水线是哪三步？",
    answer:
      "**入口处把 sRGB 颜色纹理解码进线性 → 全程在线性空间算光照 → 出口处 gamma 校正回 sRGB**。入口压暗、出口提亮，方向相反。",
    tags: ["流水线", "三步"],
  },
  {
    id: "gm-13",
    chapter: "gamma-correction",
    level: 1,
    question: "哪些贴图要解码、哪些绝不能解码？",
    answer:
      "只有**颜色 / 漫反射**贴图是 sRGB、要解码；**法线贴图、镜面遮罩、粗糙度**这类「存数据而非颜色」的贴图本来就是线性的，**千万别解码**（解码了反而毁掉数据）。",
    tags: ["sRGB 纹理", "数据贴图"],
  },
  {
    id: "gm-14",
    chapter: "gamma-correction",
    level: 1,
    question: "桌面 OpenGL 有没有让硬件自动做 gamma 校正的开关？WebGL2 呢？",
    answer:
      "桌面 OpenGL 可以 `glEnable(GL_FRAMEBUFFER_SRGB)` 让硬件自动校正、连 `pow` 都省。**WebGL2 没有这个开关**，得老老实实在着色器里写 `pow(color, vec3(1.0/2.2))`。",
    tags: ["API差异", "FRAMEBUFFER_SRGB"],
  },
  {
    id: "gm-15",
    chapter: "gamma-correction",
    level: 1,
    question: "输入 0.5、不做 gamma 校正直接送屏，屏幕实际点出多少亮度？",
    answer:
      "约 `0.22`（`0.5^2.2 ≈ 0.22`）——只有两成亮，明显偏暗。这就是「同样的数字点不出对应亮度」。",
    tags: ["数值", "压暗"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "gm-16",
    chapter: "gamma-correction",
    level: 2,
    question: "为什么两盏一样亮的灯叠加，在 sRGB 空间里硬加会出问题？",
    answer:
      "线性空间里 `0.5 + 0.5 = 1.0` 才对。可 sRGB 空间每盏约 `0.73`，两个一加 `1.46` 被截到 `1.0`——要么顶白、要么整体偏暗偏脏，过渡全没了。光的加法只在线性空间成立。",
    tags: ["线性空间", "叠加"],
  },
  {
    id: "gm-17",
    chapter: "gamma-correction",
    level: 2,
    question: "为什么光照的加减乘除非在线性空间做不可？",
    answer:
      "因为**光的物理就是线性的**：两束光相加、随距离衰减、和材质相乘，这些乘法和加法都假设自己活在线性空间。数值若其实是 sRGB 的，每一步都带着 `^(1/2.2)` 扭曲在算，越算越偏。",
    tags: ["线性空间", "为什么"],
  },
  {
    id: "gm-18",
    chapter: "gamma-correction",
    level: 2,
    question: "为什么 gamma 校正一下就「对」了？",
    answer:
      "因为它和屏幕脾气**正好互为反函数**：你用 `^(1/2.2)` 提亮、屏幕用 `^2.2` 压暗，`(c^(1/2.2))^2.2 = c`，线性算出的 c 原原本本显出来。",
    tags: ["gamma 校正", "互逆"],
  },
  {
    id: "gm-19",
    chapter: "gamma-correction",
    level: 2,
    question: "为什么 gamma 校正必须放在整条管线的最末端？",
    answer:
      "它是专门补偿显示器的，只在「上屏」这一刻、对最终颜色、每像素做一次。放早了，后面的相加相乘又在 sRGB 空间里跑，前功尽弃。",
    tags: ["gamma 校正", "位置"],
  },
  {
    id: "gm-20",
    chapter: "gamma-correction",
    level: 2,
    question: "为什么 sRGB 纹理直接拿去参与光照就错了？",
    answer:
      "因为采样得到的 sRGB 值已经被提亮过（约 `线性^(1/2.2)`），光照要的是线性值。直接拿去相加相乘，等于在错误的空间里算，结果偏亮、发灰、明暗层次发闷。",
    tags: ["sRGB 纹理", "为什么"],
  },
  {
    id: "gm-21",
    chapter: "gamma-correction",
    level: 2,
    question: "为什么入口解码用 ^2.2、出口校正用 ^(1/2.2)，方向相反？",
    answer:
      "入口是把已提亮的 sRGB 值**压回**线性（做 `γ` 次幂）；出口是把线性结果**提亮**成 sRGB（做 `1/γ` 次幂）。一个解码、一个编码，互逆，方向千万别搞反。",
    tags: ["流水线", "方向"],
  },
  {
    id: "gm-22",
    chapter: "gamma-correction",
    level: 2,
    question: "为什么显示器的曲线把中间调压得最狠、两端反而不动？",
    answer:
      "`^2.2` 这条幂曲线在 `0` 和 `1` 处不变（`0^2.2=0`、`1^2.2=1`），在中段远低于线性对角线——所以纯黑纯白不动，中间调（如 `0.5→0.22`）被压得最暗。",
    tags: ["显示器 gamma", "曲线"],
  },
  {
    id: "gm-23",
    chapter: "gamma-correction",
    level: 2,
    question: "校正后那条曲线和屏幕响应曲线在图上是什么关系？",
    answer:
      "紫线（校正 `^(1/2.2)`）和红线（屏幕 `^2.2`）关于对角线**对称**，串起来正好回到那条线性基准——这就是一提一压相抵的几何直观。",
    tags: ["数学", "对称"],
  },
  {
    id: "gm-24",
    chapter: "gamma-correction",
    level: 2,
    question: "为什么对法线贴图做 gamma 解码反而毁数据？",
    answer:
      "法线图存的是**数据不是颜色**、本就是线性的。错误地对它 `pow(…,2.2)`，法线分量被压扭，凹凸方向乱掉、镜面遮罩失效，比不做 gamma 还糟。",
    tags: ["数据贴图", "为什么"],
  },
  {
    id: "gm-25",
    chapter: "gamma-correction",
    level: 2,
    question: "渐变条 Demo 里，未校正时正中间（线性 0.5）那块为什么偏黑？",
    answer:
      "因为线性 `0.5` 被屏幕 `^2.2` 压成约 `0.22` 的亮度，所以偏黑，整条渐变看着挤在右半边亮端。校正后提到约 `0.73` 送屏、被压回约 `0.5`，才成干净中灰。",
    tags: ["Demo", "中间调"],
  },
  {
    id: "gm-26",
    chapter: "gamma-correction",
    level: 2,
    question: "双重 gamma 校正为什么会让画面发白、对比度变低？",
    answer:
      "每次 `pow(c, 1/2.2)` 都把中间调往上提一截，连提两次推得过高；再被屏幕只压一次 `^2.2`，远不够压回去，于是整体发白、对比度变低。校正只该做一次。",
    tags: ["双重 gamma 校正", "机制"],
  },
  {
    id: "gm-27",
    chapter: "gamma-correction",
    level: 2,
    question: "为什么说「线性空间是你写光照公式时脑子里默认的那个空间」？",
    answer:
      "因为你写「两盏灯叠加就该两倍亮」「光减半就该暗一半」时，脑子里默认数值正比亮度——这正是线性空间。物理光照的加减乘除全都默认在这个老实空间里成立。",
    tags: ["线性空间", "直觉"],
  },
  {
    id: "gm-28",
    chapter: "gamma-correction",
    level: 2,
    question: "gamma 校正这一行在桌面和 WebGL2 上是同一行代码吗？",
    answer:
      "是，这行纯计算一字不差。区别只在版本声明（`#version 330 core` vs `#version 300 es` + `precision highp float;`），以及桌面可用 `GL_FRAMEBUFFER_SRGB` 让硬件代劳、WebGL2 必须手写 `pow`。",
    tags: ["跨端", "对比"],
  },
  {
    id: "gm-29",
    chapter: "gamma-correction",
    level: 2,
    question: "「衰减得比预想的快、暗得发脏」和 gamma 有什么关系？",
    answer:
      "衰减是乘法、假设活在线性空间。若数值其实是 sRGB 的，衰减这步在带扭曲的数值上算，结果偏暗偏脏、比预想衰得快。把流程改成线性空间算光照、出口才校正，衰减就正常了。",
    tags: ["线性空间", "衰减"],
  },

  // ── L3 应用（给参数判结果 / 改法 / 读代码） ──
  {
    id: "gm-30",
    chapter: "gamma-correction",
    level: 3,
    question:
      "一盏灯照到线性亮度 0.5，不校正直接送屏 vs 校正后送屏，屏幕各点出多少？",
    answer:
      "不校正：直接送 `0.5`，屏幕 `^2.2` 压成 `0.5^2.2 ≈ 0.22`（偏暗）。校正后：先 `0.5^(1/2.2) ≈ 0.73` 送屏，屏幕再 `0.73^2.2 ≈ 0.5`——正好点出 `0.5`。一提一压相抵。",
    tags: ["数值", "应用"],
  },
  {
    id: "gm-31",
    chapter: "gamma-correction",
    level: 3,
    question:
      "在渐变 Demo 里怎么亲手造出双重 gamma 校正（发白过曝）？为什么发白？",
    answer:
      "把校正那行连做两次：`outColor = pow(linear, 1/uGamma);` 后再 `outColor = pow(outColor, 1/uGamma);`。连提两次中间调被推得过高、屏幕只压一次压不回，整条渐变发白、对比度低。",
    tags: ["双重 gamma 校正", "Demo"],
  },
  {
    id: "gm-32",
    chapter: "gamma-correction",
    level: 3,
    question:
      "一张 sRGB 木箱贴图采样后没解码就做光照，最后又校正了一次，画面偏亮还是偏暗？问题在哪？",
    answer:
      "偏**亮、发灰**。出口校正没错（该做）；问题在**入口**：sRGB 采样值本就提亮过，没解码就参与光照，相当于颜色多带一层 `^(1/2.2)` 去算，整体偏亮、层次发闷。修法：入口先 `pow(texColor, 2.2)` 解码。",
    tags: ["sRGB 纹理", "排错"],
  },
  {
    id: "gm-33",
    chapter: "gamma-correction",
    level: 3,
    question: "片段着色器算完线性 color，gamma 校正那一行该写在哪、怎么写？",
    answer:
      "写在**所有相加相乘衰减都算完、写 `FragColor` 之前**的最后一步：`color = pow(color, vec3(1.0 / 2.2));`，再 `FragColor = vec4(color, 1.0);`。放早了后面计算又跑回 sRGB 空间。",
    tags: ["代码", "应用"],
  },
  {
    id: "gm-34",
    chapter: "gamma-correction",
    level: 3,
    question: "入口处给 sRGB 漫反射贴图解码，那一行怎么写？",
    answer:
      "采样后立刻 `vec3 albedo = pow(texture(diffuse, uv).rgb, vec3(2.2));`，把 sRGB 压回线性再参与光照；或用 `gl.SRGB8` 纹理格式让硬件自动解码。",
    tags: ["sRGB 纹理", "代码"],
  },
  {
    id: "gm-35",
    chapter: "gamma-correction",
    level: 3,
    question:
      "开了 gamma 流程后，法线贴图照亮的表面凹凸乱掉、镜面遮罩失效，最可能哪错了？",
    answer:
      "把**法线贴图 / 镜面遮罩**这类数据贴图也当 sRGB 解码了，`pow(…,2.2)` 一下数据被毁。修法：只对颜色 / 漫反射贴图解码，法线、粗糙度、镜面遮罩等**保持线性、不解码**。",
    tags: ["数据贴图", "排错"],
  },
  {
    id: "gm-36",
    chapter: "gamma-correction",
    level: 3,
    question: "在 WebGL2 里没有 GL_FRAMEBUFFER_SRGB，怎么实现 gamma 校正？",
    answer:
      "在片段着色器输出前手写 `pow(color, vec3(1.0/2.2))`。WebGL2 默认帧缓冲会按 sRGB 呈现，所以手动校正一次即可——别再额外硬件校正，否则双重 gamma。",
    tags: ["API差异", "WebGL2"],
  },
  {
    id: "gm-37",
    chapter: "gamma-correction",
    level: 3,
    question: "画面整体发白、像蒙了层灰、对比度低，最可能是哪个坑？怎么排查？",
    answer:
      "最可能是**双重 gamma 校正**。排查：检查是不是既用了 sRGB 帧缓冲（硬件自动校正）又在着色器手动 `pow` 了一遍，或把已是 sRGB 的值反复处理。修法：校正只做一次，硬件 sRGB 与手动 `pow` 二选一。",
    tags: ["双重 gamma 校正", "排错"],
  },
  {
    id: "gm-38",
    chapter: "gamma-correction",
    level: 3,
    question: "渐变 Demo 里 uCorrect 从 0 切到 1，正中间那块会怎样变？",
    answer:
      "`uCorrect=0` 时线性 `0.5` 被屏幕压成约 `0.22`、偏黑；切到 `1` 校正把它提到约 `0.73` 送屏、被压回约 `0.5`，那块就成了**干净的中灰**，整条过渡顺滑。",
    tags: ["Demo", "应用"],
  },
  {
    id: "gm-39",
    chapter: "gamma-correction",
    level: 3,
    question:
      "把灰度后处理改成「只看当前像素」的反相，核心那行怎么改？这和 gamma 是一回事吗？",
    answer:
      "灰度 `lum = dot(c, vec3(0.2126,0.7152,0.0722)); c = vec3(lum);` 改成反相 `c = vec3(1.0) - c;`。这是后处理、和 gamma 校正无关——但都该在 gamma 校正**之前**做，校正永远是最后一步。",
    tags: ["后处理", "应用"],
  },
  {
    id: "gm-40",
    chapter: "gamma-correction",
    level: 3,
    question:
      "调一个走线性空间的管线，颜色贴图、法线贴图、最终输出各该怎么处理？",
    answer:
      "颜色贴图：入口 `pow(c, 2.2)` 解码到线性（或 sRGB 格式）。法线贴图：**不解码**、保持线性。最终输出：所有光照算完后 `pow(color, 1/2.2)` 校正一次上屏。",
    tags: ["流水线", "应用"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 边界） ──
  {
    id: "gm-41",
    chapter: "gamma-correction",
    level: 4,
    question:
      "为什么「双重 gamma」和「sRGB 没解码」这两个坑，一个偏亮一个也偏亮，却出在不同地方？",
    answer:
      "双重 gamma 出在**出口**（校正做了两次，发白过曝）；sRGB 没解码出在**入口**（采样值带多一层提亮去算光照，偏亮发灰）。一个是末端重复编码、一个是开头漏了解码，方向都让画面更亮，但修法分别是「校正只做一次」和「入口先解码」。",
    tags: ["陷阱", "综合"],
  },
  {
    id: "gm-42",
    chapter: "gamma-correction",
    level: 4,
    question:
      "完整描述：从一张 sRGB 木箱贴图到屏幕上正确的像素，要经过哪几道空间转换？",
    answer:
      "①入口：sRGB 采样色 `pow(c, 2.2)` 解码到线性 → ②线性空间里做完整光照（相加、相乘、衰减都正确）→ ③出口：`pow(color, 1/2.2)` 编码回 sRGB → ④屏幕 `^2.2` 压暗，正好显出线性算出的真实亮度。",
    tags: ["流水线", "综合"],
  },
  {
    id: "gm-43",
    chapter: "gamma-correction",
    level: 4,
    question:
      "有人既开了 sRGB 帧缓冲、又在着色器手动 pow(c,1/2.2)，还把法线图也解码了。会出现什么、各怎么修？",
    answer:
      "①双重 gamma（硬件 + 手动校正叠加）→ 画面发白：二选一，留一处校正。②法线图被 `^2.2` 毁掉 → 凹凸乱、镜面遮罩失效：法线图保持线性、不解码。两个坑独立、分别修。",
    tags: ["陷阱", "综合"],
  },
  {
    id: "gm-44",
    chapter: "gamma-correction",
    level: 4,
    question: "为什么说「入口压暗、出口提亮」，方向恰好相反？把数学讲清。",
    answer:
      "入口解码 `c_linear = c_srgb^γ`（γ=2.2，把提亮过的 sRGB 压回线性）；出口校正 `c_srgb = c_linear^(1/γ)`（把线性提亮成 sRGB）。两式互逆：一个用 `γ`、一个用 `1/γ`，所以一个压暗一个提亮，方向相反。",
    tags: ["数学", "综合"],
  },
  {
    id: "gm-45",
    chapter: "gamma-correction",
    level: 4,
    question:
      "为什么 gamma 校正能放在管线最后，sRGB 解码却必须放在最前？两者位置为何不能换？",
    answer:
      "解码是为了让纹理颜色在**进入光照计算前**就是线性的，必须最前；校正是为了让**最终结果**抵消屏幕、上屏前提亮，必须最后。中间的全部光照都靠「数据都在线性空间」这个前提，所以两端各守一头、不能换。",
    tags: ["流水线", "综合"],
  },
  {
    id: "gm-46",
    chapter: "gamma-correction",
    level: 4,
    question:
      "渐变 Demo 里把 uGamma 调到比 2.2 大很多，校正后画面会偏亮还是偏暗？为什么？",
    answer:
      "偏**亮**。校正做 `pow(c, 1/uGamma)`，`uGamma` 越大、`1/uGamma` 越小，提亮越狠；可屏幕仍按固定 `^2.2` 压暗，提得过头压不回，所以整体偏亮——相当于校正强度和屏幕脾气不匹配。",
    tags: ["Demo", "综合"],
  },
  {
    id: "gm-47",
    chapter: "gamma-correction",
    level: 4,
    question:
      "Blinn-Phong 那章「别从 sRGB 老教程照搬反光度」的坑，和本章 gamma 是什么关系？",
    answer:
      "因为反光度参数和颜色空间强绑定：sRGB 空间和线性空间下高光视觉表现差很多。做了 gamma 校正走线性空间后，必须**重新校准**反光度，照搬 sRGB 教程的数值会过曝或看不见——这正是本章「线性 vs sRGB 不能混用」的延续。",
    tags: ["颜色空间", "综合"],
  },
  {
    id: "gm-48",
    chapter: "gamma-correction",
    level: 4,
    question:
      "后处理（如反相、灰度、模糊）和 gamma 校正的先后顺序该怎样？为什么？",
    answer:
      "后处理在**前**、gamma 校正在**最后**。因为后处理是对线性光照结果的加工、也假设线性空间；gamma 校正是补偿屏幕的最末一步。顺序反了，后处理会作用在已编码的非线性值上、结果失真。",
    tags: ["后处理", "综合"],
  },
  {
    id: "gm-49",
    chapter: "gamma-correction",
    level: 4,
    question:
      "为什么纯黑、纯白做不做 gamma 校正看起来都一样，只有中间调差别大？",
    answer:
      "因为 `0^任意=0`、`1^任意=1`，gamma 校正和屏幕响应对两端都没影响。曲线只在中段大幅偏离线性，所以中间调（如 0.5）校正前后差异最大、两端几乎不变。",
    tags: ["数学", "综合"],
  },
  {
    id: "gm-50",
    chapter: "gamma-correction",
    level: 4,
    question:
      "把整条「为什么算对了光照一上屏却发暗、gamma 校正怎么救回来」讲清。",
    answer:
      "①屏幕非线性 `^2.2`，把线性算出的颜色压暗（中间调最狠）→ ②你在线性空间辛苦算对的亮度，过屏这关全被压暗压脏 → ③出口前做 `pow(color, 1/2.2)` 提亮，正好和屏幕 `^2.2` 互逆抵消 → ④屏幕点出来等于线性算出的真实亮度。再配上入口处 sRGB 颜色纹理先 `pow(c,2.2)` 解码（数据贴图不解码），整条线就对了。",
    tags: ["综合", "因果链"],
  },
];
