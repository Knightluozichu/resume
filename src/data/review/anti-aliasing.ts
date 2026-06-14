/** 复习题库 · 抗锯齿（anti-aliasing）。HEL-78 高级OpenGL篇。 */

import type { ReviewQuestion } from "./types";

export const antiAliasingQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / 函数 / 数值约定） ──
  {
    id: "aa-1",
    chapter: "anti-aliasing",
    level: 1,
    question: "什么是「锯齿」（aliasing）？它另一个名字叫什么？",
    answer:
      "锯齿是光栅化时平滑的边被画成一级一级硬阶梯状毛刺的现象。它另一个名字叫「走样」。本质是采样点太少、采样不足造成的。",
    tags: ["锯齿", "定义"],
  },
  {
    id: "aa-2",
    chapter: "anti-aliasing",
    level: 1,
    question:
      "光栅化时，每个像素用几个采样点判断自己有没有被图元盖住？通常在哪？",
    answer:
      "通常只用**一个**采样点，且通常就是像素中心。用这一个点判断「这个像素到底有没有被三角形盖住」——盖住就整格涂、没盖住就整格不涂。",
    tags: ["锯齿", "采样点"],
  },
  {
    id: "aa-3",
    chapter: "anti-aliasing",
    level: 1,
    question: "锯齿诞生在渲染管线的哪一步？",
    answer:
      "诞生在**光栅化**这一步——三角形被切成像素、逐像素判覆盖的时候。根子是采样不足：一个像素只采一个点，信息不够，还原不出平滑的边。",
    tags: ["锯齿", "管线位置"],
  },
  {
    id: "aa-4",
    chapter: "anti-aliasing",
    level: 1,
    question: "什么是「抗锯齿」（anti-aliasing）？常见缩写是什么？",
    answer:
      "抗锯齿是让图元边缘看起来平滑、消除锯齿阶梯的技术统称，常缩写 AA。核心是不再对边缘像素「非涂即不涂」地硬选，而是按它被图元盖住的程度涂上过渡色。",
    tags: ["抗锯齿", "定义"],
  },
  {
    id: "aa-5",
    chapter: "anti-aliasing",
    level: 1,
    question: "抗锯齿给边缘像素涂的是什么颜色？",
    answer:
      "涂介于图元色和背景色之间的**过渡色**（中间色）：被盖一半就涂一半深、盖三成就涂三成深。远看这些深浅不一的过渡色把硬台阶抹顺滑了。",
    tags: ["抗锯齿", "过渡色"],
  },
  {
    id: "aa-6",
    chapter: "anti-aliasing",
    level: 1,
    question: "本章讲了哪三种主流抗锯齿方法？",
    answer:
      "超采样 SSAA（先画大再缩小）、多重采样 MSAA（每像素多采样点判覆盖度）、FXAA（后处理找边模糊）。",
    tags: ["抗锯齿", "三种方法"],
  },
  {
    id: "aa-7",
    chapter: "anti-aliasing",
    level: 1,
    question: "SSAA 的全称是什么？它的核心做法是什么？",
    answer:
      "SSAA 是超采样抗锯齿（Super Sample Anti-Aliasing）。核心做法：按**远高于屏幕的分辨率**渲染整个场景（每个子像素都完整着色），再把这张大图**缩小**回屏幕分辨率。",
    tags: ["SSAA", "定义"],
  },
  {
    id: "aa-8",
    chapter: "anti-aliasing",
    level: 1,
    question: "SSAA 每边放大 2 倍，像素数和着色开销大约变成几倍？",
    answer:
      "像素数变成约 **4 倍**（每边 2 倍 = 2×2），因为每个子像素都要完整跑一遍片段着色，着色开销也跟着约 4 倍。这就是 SSAA 太贵的原因。",
    tags: ["SSAA", "开销"],
  },
  {
    id: "aa-9",
    chapter: "anti-aliasing",
    level: 1,
    question: "MSAA 的全称是什么？它给每个像素放几个采样点（典型值）？",
    answer:
      "MSAA 是多重采样抗锯齿（Multisample Anti-Aliasing）。它给每个像素放**多个采样点**，典型是 4 个。",
    tags: ["MSAA", "定义"],
  },
  {
    id: "aa-10",
    chapter: "anti-aliasing",
    level: 1,
    question: "MSAA 里这些采样点是用来干什么的？片段着色器跑几次？",
    answer:
      "采样点**只用来判覆盖**——数有几个落在三角形里，知道这个像素被盖住了多少。而片段着色器**仍然每个像素只跑一次**（用插值到像素中心的数据算一次颜色），不像 SSAA 每个子像素都着色。",
    tags: ["MSAA", "采样点", "着色"],
  },
  {
    id: "aa-11",
    chapter: "anti-aliasing",
    level: 1,
    question: "什么是「覆盖度」（coverage）？",
    answer:
      "覆盖度是一个像素里落在图元（三角形）内部的采样点占总采样点的比例。如 4 个采样点中 2 个在三角形内，覆盖度就是 2/4 = 50%。",
    tags: ["覆盖度", "定义"],
  },
  {
    id: "aa-12",
    chapter: "anti-aliasing",
    level: 1,
    question: "覆盖度 100% / 0% / 50% 分别让 MSAA 给像素涂什么色？",
    answer:
      "覆盖度 100%（采样点全在图元内）涂纯图元色，0%（全在外）涂纯背景色，50% 涂图元色和背景色各半。覆盖度直接决定混多少图元色。",
    tags: ["覆盖度", "混色"],
  },
  {
    id: "aa-13",
    chapter: "anti-aliasing",
    level: 1,
    question:
      "MSAA 里覆盖度只有在哪种像素上才是中间值？图元内部和外部各是多少？",
    answer:
      "只有在**几何边缘**的像素上才是中间值。图元**内部**像素覆盖度恒为满（采样点全被盖住）、**外部**像素恒为 0（全没盖住）——它们根本不需要混色。",
    tags: ["覆盖度", "几何边缘"],
  },
  {
    id: "aa-14",
    chapter: "anti-aliasing",
    level: 1,
    question: "桌面 OpenGL 给默认帧缓冲开 MSAA 的两步是什么？",
    answer:
      "①创建窗口前 `glfwWindowHint(GLFW_SAMPLES, 4)` 要求每像素 4 个采样点；②创建窗口、初始化后 `glEnable(GL_MULTISAMPLE)` 启用多重采样（默认是关的）。",
    tags: ["GLFW_SAMPLES", "GL_MULTISAMPLE"],
  },
  {
    id: "aa-15",
    chapter: "anti-aliasing",
    level: 1,
    question: "WebGL2 给默认帧缓冲开抗锯齿怎么写？",
    answer:
      '在拿上下文时传一个标志：`canvas.getContext("webgl2", { antialias: true })`，浏览器就自动给默认帧缓冲配好多重采样。开了就生效，无需再 enable。',
    tags: ["WebGL2", "antialias"],
  },
  {
    id: "aa-16",
    chapter: "anti-aliasing",
    level: 1,
    question:
      "离屏 MSAA 帧缓冲，要给它挂什么样的附件？画完要做什么操作才能上屏？",
    answer:
      "要挂一个**多重采样 renderbuffer**（用 `glRenderbufferStorageMultisample` 造）当附件渲染；画完要把它**解析（blit）**——用 `glBlitFramebuffer` 合成到一张普通缓冲，才能采样 / 上屏。",
    tags: ["离屏MSAA", "blit"],
  },
  {
    id: "aa-17",
    chapter: "anti-aliasing",
    level: 1,
    question: "FXAA 的全称是什么？它属于哪一类抗锯齿？",
    answer:
      "FXAA 是快速近似抗锯齿（Fast Approximate Anti-Aliasing）。它属于**后处理**抗锯齿——在场景整个渲染完之后，把成品图当普通图片来处理。",
    tags: ["FXAA", "定义"],
  },
  {
    id: "aa-18",
    chapter: "anti-aliasing",
    level: 1,
    question: "FXAA 的基本做法是什么？",
    answer:
      "在成品图上分析相邻像素的颜色 / 亮度差异，**猜**出哪里像是边缘，然后沿着边缘做有方向的模糊，把锯齿抹平。",
    tags: ["FXAA", "做法"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "aa-19",
    chapter: "anti-aliasing",
    level: 2,
    question:
      "为什么一个像素只取一个采样点会产生锯齿？用「斜边穿过像素」说清。",
    answer:
      "斜边穿过一个像素时，可能盖住它一大半面积，但只要像素中心那个采样点没落在三角形里，这格就被判「没盖住」、整格留白；反之中心被盖住、哪怕只盖一点点也整格涂满。这种「非涂即不涂」的二选一，把本该平滑的边逼成了阶梯。",
    tags: ["锯齿", "采样不足", "为什么"],
  },
  {
    id: "aa-20",
    chapter: "anti-aliasing",
    level: 2,
    question: "为什么抗锯齿给边缘涂过渡色，远看就顺滑了？",
    answer:
      "因为人眼在正常观看距离下会自动把这些深浅不一的过渡色「平均」掉，台阶的硬棱被柔化，远看就成了一条顺滑的斜边。抗锯齿没改边缘的形状，只是把硬棱用中间色柔化了。",
    tags: ["抗锯齿", "过渡色", "为什么"],
  },
  {
    id: "aa-21",
    chapter: "anti-aliasing",
    level: 2,
    question: "三种抗锯齿方法的「共同终点」是什么？它们的分歧只在哪里？",
    answer:
      "共同终点都是给边缘像素涂上**按覆盖程度的过渡色**。分歧只在「怎么估出每格被盖住的覆盖比例、估得多准、花多大代价」——SSAA、MSAA、FXAA 估的方式各不相同。",
    tags: ["抗锯齿", "对比"],
  },
  {
    id: "aa-22",
    chapter: "anti-aliasing",
    level: 2,
    question: "SSAA 为什么能抗锯齿？为什么它对一切边缘都生效？",
    answer:
      "因为缩小时屏幕一个像素对应大图里好几个子像素，把这几个子像素的颜色一**平均**，边缘处「一半子像素是图元色、一半是背景色」就自然平均出过渡色。它对一切边缘生效，是因为整张图就是更精细地画了一遍，纹理边、着色硬边一并受益。",
    tags: ["SSAA", "为什么"],
  },
  {
    id: "aa-23",
    chapter: "anti-aliasing",
    level: 2,
    question: "SSAA 的代价为什么这么大？它贵在哪一步？",
    answer:
      "贵在**每个子像素都得完整跑一遍片段着色**。多画了好几倍的像素，最贵的着色开销跟着翻几倍（每边 2 倍 ≈ 4 倍着色量）。所以 SSAA 今天很少直接用——太贵了。",
    tags: ["SSAA", "开销", "为什么"],
  },
  {
    id: "aa-24",
    chapter: "anti-aliasing",
    level: 2,
    question: "MSAA 为什么被称为 SSAA 的「精打细算版」？它省在哪里？",
    answer:
      "因为它也给每像素多个采样点，但采样点**只用来判覆盖**、**片段着色仍每像素只跑一次**，不像 SSAA 每子像素都着色。最贵的着色没翻倍，只多花了「数采样点判覆盖度」这点轻活，所以省。",
    tags: ["MSAA", "SSAA", "对比"],
  },
  {
    id: "aa-25",
    chapter: "anti-aliasing",
    level: 2,
    question: "MSAA 省钱的真正命门是什么？为什么不是「采样点比 SSAA 少」？",
    answer:
      "命门是**片段着色跑几次**：MSAA 每像素着色只跑一次、SSAA 每子像素都跑一次。两者采样点数量可以一样多，差别不在采样点数，而在最贵的着色有没有翻倍——MSAA 没翻倍，这才是它便宜的真正原因。",
    tags: ["MSAA", "命门", "为什么"],
  },
  {
    id: "aa-26",
    chapter: "anti-aliasing",
    level: 2,
    question: "为什么 MSAA 实际只在「几何边缘」多花了钱？",
    answer:
      "因为图元内部像素 4 个采样点全被盖住（覆盖度满）、外部全没盖住（覆盖度 0），它们根本不需要混色；只有几何边缘那一圈像素的覆盖度才介于中间、才要按覆盖度混色。所以多采样点的活只在边缘真正起作用。",
    tags: ["MSAA", "几何边缘", "为什么"],
  },
  {
    id: "aa-27",
    chapter: "anti-aliasing",
    level: 2,
    question: "MSAA 里深度和模板是怎么存的？为什么这样存？",
    answer:
      "深度和模板按**子采样点分别存**（而不是每像素一个），以保证遮挡判定也精细。虽然存储多了，但最贵的片段着色没翻倍，整体仍比 SSAA 便宜得多。",
    tags: ["MSAA", "深度模板"],
  },
  {
    id: "aa-28",
    chapter: "anti-aliasing",
    level: 2,
    question: "覆盖度为什么是 MSAA 高效的来源？",
    answer:
      "因为覆盖度只有在**几何边缘**像素上才是中间值（内部恒满、外部恒为 0），所以 MSAA 的过渡色只出现在边缘那一圈——内部 / 外部像素根本不混色。只在少数边缘像素花功夫，正是它高效的来源。",
    tags: ["覆盖度", "MSAA", "为什么"],
  },
  {
    id: "aa-29",
    chapter: "anti-aliasing",
    level: 2,
    question: "FXAA 和 MSAA 的优缺点为什么几乎互补？",
    answer:
      "FXAA 只对最终图像操作、和几何无关，所以**极便宜**、对纹理边和着色硬边也有效（MSAA 管不了的它能管）；但它**基于图像猜测**，会让画面**偏糊**、误伤细节。MSAA 抗几何边精准但管不了非几何边、且要走光栅化采样点。两者长短正好相反。",
    tags: ["FXAA", "MSAA", "对比"],
  },
  {
    id: "aa-30",
    chapter: "anti-aliasing",
    level: 2,
    question: "FXAA 在管线里发生在哪个阶段？和 MSAA 发生的位置有何不同？",
    answer:
      "FXAA 在场景**整个渲染完之后**的后处理阶段操作成品图、完全不在光栅化里折腾采样点；MSAA 发生在**光栅化附近**（靠采样点判覆盖度）。一个事后补救图像，一个事中精细采样。",
    tags: ["FXAA", "管线位置", "对比"],
  },
  {
    id: "aa-31",
    chapter: "anti-aliasing",
    level: 2,
    question:
      "为什么 MSAA 抹的只是「三角形轮廓」的锯齿，纹理内部和 `discard` 硬边它管不了？",
    answer:
      "因为 MSAA 只在**几何边缘**判覆盖度、抹的是三角形轮廓的锯齿。纹理内部的花纹边、着色器里 `if`/`discard` 切出来的边都不是几何边，MSAA 的覆盖度根本不覆盖它们，自然抹不到。",
    tags: ["MSAA", "几何边缘", "为什么"],
  },
  {
    id: "aa-32",
    chapter: "anti-aliasing",
    level: 2,
    question: "桌面开 MSAA 是两步、WebGL2 是一步，这个 API 差异的根源是什么？",
    answer:
      "桌面分两步：`GLFW_SAMPLES` 建窗口前定采样点数 + `glEnable(GL_MULTISAMPLE)` 启用开关。WebGL2 **没有 `GL_MULTISAMPLE` 这个 enable 开关**，默认帧缓冲的 MSAA 只能在创建上下文那一刻用 `antialias: true` 决定，建好就改不了、采样点数也由浏览器 / 驱动定。",
    tags: ["WebGL2", "API差异", "对比"],
  },
  {
    id: "aa-33",
    chapter: "anti-aliasing",
    level: 2,
    question:
      "为什么渲到自建离屏 FBO 后，默认帧缓冲的 `antialias` / `GL_MULTISAMPLE` 就管不着它了？",
    answer:
      "因为 `antialias` / `GL_MULTISAMPLE` 只管**默认**帧缓冲。离屏 FBO 是你自己建的另一条管线，它的多重采样得自己配——用多重采样 renderbuffer 当附件、渲完用 `blitFramebuffer` 解析，否则离屏那条管线的 MSAA 压根没生效。",
    tags: ["离屏MSAA", "默认帧缓冲", "为什么"],
  },

  // ── L3 应用（读代码 / 给参数判结果 / 选型） ──
  {
    id: "aa-34",
    chapter: "anti-aliasing",
    level: 3,
    question:
      "一个边缘像素放 4 个采样点，3 个落在三角形内、1 个在外，覆盖度是多少？MSAA 给它涂什么色？",
    answer:
      "覆盖度 = 3/4 = **75%**。MSAA 给它涂「图元色和背景色按 75:25 混合」的过渡色——更偏图元色、但还掺了四分之一背景色。",
    tags: ["覆盖度", "计算", "应用"],
  },
  {
    id: "aa-35",
    chapter: "anti-aliasing",
    level: 3,
    question:
      "一个像素 4 个采样点全落在三角形内部，这是边缘像素吗？MSAA 会给它混色吗？",
    answer:
      "不是边缘像素，是图元**内部**像素（覆盖度 100%）。MSAA **不给它混色**，直接涂纯图元色。只有覆盖度介于中间的几何边缘像素才混色。",
    tags: ["覆盖度", "内部", "应用"],
  },
  {
    id: "aa-36",
    chapter: "anti-aliasing",
    level: 3,
    question:
      "实时 3D 游戏要在普通显卡跑满 60fps，主要烦恼是物体**外轮廓**锯齿。选哪种抗锯齿？为什么？",
    answer:
      "选 **MSAA**。外轮廓是几何边缘，正是 MSAA 的主场；它只在边缘多采、片段着色不翻倍，能在 60fps 预算内把轮廓抹顺，性价比最高。",
    tags: ["选型", "MSAA", "应用"],
  },
  {
    id: "aa-37",
    chapter: "anti-aliasing",
    level: 3,
    question:
      "场景大量用 `discard` 做镂空草叶、草叶边缘锯齿严重。MSAA 行吗？该选什么？",
    answer:
      "MSAA **不行**——草叶边是着色器 `discard` 切出来的、不是几何边缘，MSAA 覆盖度不覆盖它。该上 **FXAA**（后处理找边模糊，对这种硬边也有效、还便宜），或专门的 **alpha-to-coverage**。",
    tags: ["选型", "FXAA", "应用"],
  },
  {
    id: "aa-38",
    chapter: "anti-aliasing",
    level: 3,
    question:
      "离线渲染产品效果图、不在乎渲染时间、只求画质拉满。选哪种抗锯齿？为什么这场景适合它？",
    answer:
      "选 **SSAA**。它对一切边缘都生效、质量最好，唯一缺点是贵——而离线渲染恰恰不在乎慢，正好让它发挥。",
    tags: ["选型", "SSAA", "应用"],
  },
  {
    id: "aa-39",
    chapter: "anti-aliasing",
    level: 3,
    question:
      "看到 C++ 代码 `glRenderbufferStorageMultisample(GL_RENDERBUFFER, 4, GL_RGB, w, h)`，这在做什么？`4` 是什么？",
    answer:
      "在给离屏 FBO 造一个**多重采样 renderbuffer** 当颜色附件。`4` 是每像素的采样点数（4 个采样点的 MSAA）。这是离屏 MSAA 管线的第一步——渲染目标得用它造，而不是普通 renderbuffer。",
    tags: ["离屏MSAA", "读代码", "应用"],
  },
  {
    id: "aa-40",
    chapter: "anti-aliasing",
    level: 3,
    question:
      "看到代码 `glBlitFramebuffer(0,0,w,h, 0,0,w,h, GL_COLOR_BUFFER_BIT, GL_NEAREST)`，它在 MSAA 流程里干什么？省了它会怎样？",
    answer:
      "它把多重采样 FBO **解析（blit）**到普通 FBO——多个采样点合成一个像素、得到过渡色，之后才能把这张普通图当纹理采样 / 上屏。省了它：多重采样缓冲不能直接当普通纹理采样，结果 MSAA 没被合成出来、边缘照样锯齿。",
    tags: ["blit", "读代码", "应用"],
  },
  {
    id: "aa-41",
    chapter: "anti-aliasing",
    level: 3,
    question:
      "WebGL2 离屏 MSAA：对应 C++ 的 `glRenderbufferStorageMultisample` 和 `glBlitFramebuffer` 各写哪一句？",
    answer:
      "`gl.renderbufferStorageMultisample(gl.RENDERBUFFER, 4, gl.RGBA8, w, h)` 和 `gl.blitFramebuffer(0,0,w,h, 0,0,w,h, gl.COLOR_BUFFER_BIT, gl.NEAREST)`。WebGL2 把 GL 全局函数搬成 `gl.` 上下文方法，名字基本同名。",
    tags: ["WebGL2", "离屏MSAA", "应用"],
  },
  {
    id: "aa-42",
    chapter: "anti-aliasing",
    level: 3,
    question:
      "嫌 MSAA 不够干净，把渲染分辨率从 1 倍猛调到 4 倍想用 SSAA 暴力抹平，结果帧率断崖下跌。算一下像素数和着色开销涨了几倍？",
    answer:
      "每边 4 倍，像素数涨到 **16 倍**（4×4），每个子像素都完整着色，着色开销也约 **16 倍**，直接拖垮 GPU。这就是盲堆 SSAA 分辨率的坑——别这么干，几何边缘交给 MSAA。",
    tags: ["SSAA", "开销", "应用"],
  },
  {
    id: "aa-43",
    chapter: "anti-aliasing",
    level: 3,
    question:
      "把渲染从默认帧缓冲改成「渲到自建离屏 FBO 再上屏」后，MSAA 像没开一样、边缘又是硬阶梯。最可能漏了哪两步？",
    answer:
      "①没给离屏 FBO 挂多重采样附件（该用 `renderbufferStorageMultisample` 造的 renderbuffer，不是普通 renderbuffer / 纹理）；②渲完没做解析（该用 `blitFramebuffer` 把多重采样缓冲合成成普通缓冲再采样上屏）。两步都补上 MSAA 才生效。",
    tags: ["离屏MSAA", "排错", "应用"],
  },
  {
    id: "aa-44",
    chapter: "anti-aliasing",
    level: 3,
    question:
      'WebGL2 里 `getContext("webgl2", { antialias: true })` 开了 MSAA，但场景改成渲到自建 FBO 后又锯齿了。为什么？怎么修？',
    answer:
      "因为 `antialias` 只管**默认**帧缓冲，管不到自建离屏 FBO。修法：离屏附件用 `gl.renderbufferStorageMultisample` 造、渲完用 `gl.blitFramebuffer` 解析成普通缓冲再采样上屏——给离屏那条管线单独配 MSAA。",
    tags: ["WebGL2", "离屏MSAA", "应用"],
  },
  {
    id: "aa-45",
    chapter: "anti-aliasing",
    level: 3,
    question:
      "MSAA 开了，物体外轮廓顺滑了，但贴在它身上的纹理花纹边还是锯齿。这正常吗？该怎么补？",
    answer:
      "正常——纹理内部不是几何边缘，MSAA 抹不到。该让纹理走 **mipmap / 各向异性过滤**，或对全画面加一道 **FXAA** 这类后处理来兜，而不是指望 MSAA。",
    tags: ["MSAA", "纹理", "应用"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 边界） ──
  {
    id: "aa-46",
    chapter: "anti-aliasing",
    level: 4,
    question:
      "把「锯齿成因」一条链讲清：从屏幕是方格纸，到斜边变阶梯，经过哪几环？",
    answer:
      "①屏幕由像素方格组成，每格只能整涂或整不涂 → ②光栅化时每像素只取一个采样点（通常像素中心）判覆盖 → ③斜边穿过像素只要中心没被盖住就整格留白、盖住就整格涂满（非涂即不涂）→ ④这种二选一把平滑斜边逼成一级级硬阶梯，即锯齿。根子是采样不足。",
    tags: ["锯齿", "采样不足", "综合"],
  },
  {
    id: "aa-47",
    chapter: "anti-aliasing",
    level: 4,
    question:
      "有人说「MSAA 比 SSAA 便宜是因为 MSAA 采样点更少」。这准确吗？真正关键是什么？各自在哪花 / 省了开销？",
    answer:
      "不准确，便宜的关键**不在采样点数量、而在片段着色跑几次**。SSAA 每个子像素都完整跑一遍着色——最贵的着色跟着像素数翻几倍；MSAA 采样点**只判覆盖度**、片段着色**仍每像素一次**，再按覆盖度混色。MSAA 多花的只是「数采样点」这点轻活、着色没翻倍，加上只有边缘才混色，所以便宜。",
    tags: ["MSAA", "SSAA", "综合"],
  },
  {
    id: "aa-48",
    chapter: "anti-aliasing",
    level: 4,
    question:
      "开了 MSAA，物体外轮廓顺滑了，可纹理内部花纹边、`discard` 切的镂空硬边、高光锐边却照样锯齿。原因和修法？",
    answer:
      "原因：MSAA 只在**几何边缘**判覆盖度、抹的是三角形轮廓锯齿；纹理内部和 `discard` 产生的边不是几何边，MSAA 的覆盖度不覆盖它们。修法：纹理走 mipmap / 各向异性过滤，镂空硬边用 alpha-to-coverage，或对全画面加一道 FXAA 后处理来兜。",
    tags: ["MSAA", "几何边缘", "陷阱"],
  },
  {
    id: "aa-49",
    chapter: "anti-aliasing",
    level: 4,
    question:
      "给默认帧缓冲开 MSAA 一切正常，改成渲到自建离屏 FBO 做后处理后画面又全锯齿。原因和修法？",
    answer:
      "原因：`antialias` / `GL_MULTISAMPLE` 只管默认帧缓冲；离屏 FBO 是自建的，要么忘了挂多重采样 renderbuffer、要么渲完忘了 `blitFramebuffer` 解析——这条离屏管线的 MSAA 压根没生效。修法：离屏附件用 `renderbufferStorageMultisample` 造、渲完务必 `blitFramebuffer` 解析成普通缓冲再采样上屏。",
    tags: ["离屏MSAA", "blit", "陷阱"],
  },
  {
    id: "aa-50",
    chapter: "anti-aliasing",
    level: 4,
    question:
      "嫌 MSAA 不够干净，把渲染分辨率往上猛调想用 SSAA 暴力抹平，结果帧率断崖暴跌。原因和正确做法？",
    answer:
      "原因：SSAA 下每个子像素都要完整跑一遍片段着色，分辨率每边乘 2、像素数乘 4，着色开销也乘 4，调很高直接拖垮 GPU。做法：别盲目堆分辨率——几何边缘锯齿交给 MSAA（只在边缘多采、着色不翻倍），它才是性价比之选；SSAA 留给离线渲染或截图。",
    tags: ["SSAA", "盲堆", "陷阱"],
  },
  {
    id: "aa-51",
    chapter: "anti-aliasing",
    level: 4,
    question:
      "给三个场景各选抗锯齿：①60fps 实时游戏、烦恼外轮廓；②大量 `discard` 镂空草叶；③离线不在乎时间、画质拉满。各选什么、为什么？",
    answer:
      "①选 **MSAA**：外轮廓是几何边缘、MSAA 主场，着色不翻倍、能在 60fps 内抹顺；②选 **FXAA**（或 alpha-to-coverage）：草叶边是 `discard` 切的非几何边、MSAA 管不了，FXAA 后处理对硬边有效又便宜；③选 **SSAA**：对一切边缘生效、质量最好，唯一缺点是贵、而离线不在乎慢。",
    tags: ["选型", "综合"],
  },
  {
    id: "aa-52",
    chapter: "anti-aliasing",
    level: 4,
    question:
      "把 MSAA「多采样点 → 覆盖度 → 混色」在一个边缘像素上走一遍：4 个采样点 2 内 2 外，最终怎么定色？着色跑了几次？",
    answer:
      "①斜边压过像素，把它切成内外两片；②放 4 个采样点判定，2 个在图元内、2 个在外，覆盖度 = 2/4 = 50%；③按覆盖度 50% 取图元色和背景色的中间色（五五开）填进去，边缘柔和。整个过程**片段着色只跑一次**（算出一个图元色备用），采样点只管数覆盖度。",
    tags: ["MSAA", "覆盖度", "综合"],
  },
  {
    id: "aa-53",
    chapter: "anti-aliasing",
    level: 4,
    question:
      "为什么 SSAA 能抗纹理内部锯齿、MSAA 不能？从「着色跑几次 / 在哪估覆盖」的根本差异说清。",
    answer:
      "SSAA 是**整张图更高分辨率画一遍、每个子像素都着色**，连纹理采样都在子像素粒度做，缩小平均时纹理内部的高频细节也被抹平，所以对一切边缘（含纹理内部）都生效。MSAA 只在**几何边缘判覆盖度、着色每像素一次**，纹理内部的色变发生在像素内部、不是几何边、覆盖度也是满的，MSAA 根本不在那儿多采样，自然抗不了纹理内部锯齿。",
    tags: ["SSAA", "MSAA", "综合"],
  },
  {
    id: "aa-54",
    chapter: "anti-aliasing",
    level: 4,
    question:
      "把 SSAA、MSAA、FXAA 三者沿「在哪估覆盖 / 着色开销 / 抗哪种锯齿」三维对比一句话各自定位。",
    answer:
      "SSAA：在更高分辨率整图估、着色翻几倍最贵、抗一切边缘质量最好（离线用）；MSAA：在光栅化几何边缘用采样点估覆盖度、着色不翻倍、只抗几何边缘（实时默认）；FXAA：在成品图上靠颜色差猜边、极便宜、对纹理 / 着色硬边也有效但整体偏糊（便宜兜底）。",
    tags: ["选型", "对比", "综合"],
  },
];
