/** 复习题库 · 帧缓冲（framebuffers）。HEL-78 高级OpenGL篇。 */

import type { ReviewQuestion } from "./types";

export const framebuffersQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / API / 数值约定） ──
  {
    id: "fb-1",
    chapter: "framebuffers",
    level: 1,
    question: "什么是「帧缓冲」（framebuffer，FBO）？它和默认帧缓冲有什么区别？",
    answer:
      "帧缓冲是一块可以画进去、但不一定显示到屏幕的「离屏画板」。你可以自己创建多块，把场景渲到某一块上当成离屏的图。和默认帧缓冲（窗口那块、显示到屏幕）唯一区别是：画进自建帧缓冲的东西默认不上屏，而是先存着供后续取用。",
    tags: ["帧缓冲", "定义"],
  },
  {
    id: "fb-2",
    chapter: "framebuffers",
    level: 1,
    question: "什么是「默认帧缓冲」？它在桌面 OpenGL 和 WebGL 里分别怎么表示？",
    answer:
      "默认帧缓冲是窗口系统替你建好的那块帧缓冲，渲染结果最终显示到屏幕的就是它。桌面 OpenGL 里编号是 `0`，WebGL 里用 `null` 表示。平时不绑别的帧缓冲时，画的内容都落在它上面。",
    tags: ["默认帧缓冲", "定义"],
  },
  {
    id: "fb-3",
    chapter: "framebuffers",
    level: 1,
    question: "帧缓冲本身存像素吗？真正存数据的是什么？",
    answer:
      "帧缓冲本身**不存像素**，它只是个「框 / 容器」。真正存数据的是往这个框上挂的**附件**（attachment）——一块帧缓冲想用，至少得挂一个能存颜色的附件。",
    tags: ["帧缓冲", "附件"],
  },
  {
    id: "fb-4",
    chapter: "framebuffers",
    level: 1,
    question: "什么是帧缓冲的「附件」（attachment）？常见有哪两种实现？",
    answer:
      "附件是挂到帧缓冲上、真正用来存像素数据的存储槽。常见两种实现：**纹理**（渲完能被采样）和**渲染缓冲对象**（renderbuffer，只写不采、更省更快）。",
    tags: ["附件", "定义"],
  },
  {
    id: "fb-5",
    chapter: "framebuffers",
    level: 1,
    question: "什么是「颜色纹理附件」？它挂在帧缓冲哪个附件点上？",
    answer:
      "它是一张纹理：渲染时画面的颜色写进这张纹理，渲完之后它就能像普通纹理一样被采样。这正是「把场景渲成一张图」的关键。它挂在帧缓冲的 `COLOR_ATTACHMENT0`（颜色附件 0 号位）上。",
    tags: ["颜色纹理附件", "定义"],
  },
  {
    id: "fb-6",
    chapter: "framebuffers",
    level: 1,
    question: "深度（和模板）用什么类型的附件存？为什么不用纹理？",
    answer:
      "用 `renderbuffer`（渲染缓冲对象）附件存。因为深度数据**只需要写、不需要采样**，而 renderbuffer 是只写不采、更省更快的存储，比用纹理划算。",
    tags: ["渲染缓冲附件", "定义"],
  },
  {
    id: "fb-7",
    chapter: "framebuffers",
    level: 1,
    question: "什么是「帧缓冲完整性」？要满足哪些条件？",
    answer:
      "帧缓冲是否「可以拿来渲染」的状态。要满足：至少挂了一个附件、至少有一个颜色附件、各附件尺寸一致等。满足才算 `COMPLETE`、能往里渲染。",
    tags: ["帧缓冲完整性", "定义"],
  },
  {
    id: "fb-8",
    chapter: "framebuffers",
    level: 1,
    question: "用哪个 API 检查帧缓冲完整性？它该返回什么值才算可用？",
    answer:
      "用 `glCheckFramebufferStatus(GL_FRAMEBUFFER)`（WebGL2 是 `gl.checkFramebufferStatus`）。它返回 `GL_FRAMEBUFFER_COMPLETE` 才算完整、可以往里渲染。",
    tags: ["帧缓冲完整性", "checkFramebufferStatus"],
  },
  {
    id: "fb-9",
    chapter: "framebuffers",
    level: 1,
    question: "什么是「渲染到纹理」（render-to-texture）？",
    answer:
      "不把场景画到屏幕，而是绑上自建帧缓冲、把整个场景画进它的颜色纹理附件。渲完这张纹理就存着整个场景的画面，可以当普通纹理拿去贴、采样、做后处理。",
    tags: ["渲染到纹理", "定义"],
  },
  {
    id: "fb-10",
    chapter: "framebuffers",
    level: 1,
    question: "什么是「全屏四边形」（screen quad）？它由几个三角形拼成？",
    answer:
      "一个顶点正好落在屏幕四角（NDC 的 −1 到 1）的矩形，由**两个三角形**拼成、铺满整个屏幕。它的作用是「把一张纹理贴满屏幕」：片段着色器逐像素采样那张离屏纹理、顺便做后处理。",
    tags: ["全屏四边形", "定义"],
  },
  {
    id: "fb-11",
    chapter: "framebuffers",
    level: 1,
    question: "什么是「后处理」（post-processing）？举几个常见效果。",
    answer:
      "拿一张已经渲好的完整画面（离屏纹理），对它整体做加工再显示。常见效果：反相、转灰度、模糊、边缘检测（描边）等。是游戏里各种屏幕滤镜的基础。",
    tags: ["后处理", "定义"],
  },
  {
    id: "fb-12",
    chapter: "framebuffers",
    level: 1,
    question: "反相和灰度这两种后处理，分别怎么算？",
    answer:
      "反相：`1 − 颜色`（每个通道用 1 减）。灰度：按人眼亮度权重把 RGB 压成一个灰度值，如 `dot(c, vec3(0.2126, 0.7152, 0.0722))`，再把这个值填到三个通道。两者都只看当前一个像素。",
    tags: ["后处理", "反相", "灰度"],
  },
  {
    id: "fb-13",
    chapter: "framebuffers",
    level: 1,
    question: "什么是「3×3 卷积核」（kernel）？换核会得到什么？",
    answer:
      "一个 3×3 的小权重表，对当前像素及其周围 8 个邻居采样，分别乘上表里对应位置的权重再相加，得到这个像素的新颜色。换不同的权重表就得到不同效果——每格 1/9 是模糊，中心大、四周负是边缘检测。",
    tags: ["卷积核", "定义"],
  },
  {
    id: "fb-14",
    chapter: "framebuffers",
    level: 1,
    question: "本章的两遍渲染分别在哪一遍做什么？",
    answer:
      "第一遍：绑自建帧缓冲、开深度测试、把场景画进颜色纹理附件（渲到纹理、不上屏）。第二遍：绑回默认帧缓冲、画全屏四边形采样那张纹理、套后处理后上屏。",
    tags: ["两遍渲染", "流程"],
  },
  {
    id: "fb-15",
    chapter: "framebuffers",
    level: 1,
    question: "模糊核（均值版）和边缘检测核的权重各填什么？权重和各是多少？",
    answer:
      "均值模糊核：9 格全填 `1/9`，权重和 = 1。边缘检测核：中心填 `8`、四周填 `−1`（或类似），权重和 = 0。权重和 1 保持亮度，权重和 0 突出突变处。",
    tags: ["卷积核", "权重和"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "fb-16",
    chapter: "framebuffers",
    level: 2,
    question: "为什么有些效果（如整屏黑白、整体反相、描边）必须用帧缓冲先渲到纹理？",
    answer:
      "因为这些是对**整张完成图**动手的「后期」，得先有一张完整的图才能整体加工。一笔一笔往屏幕上画时拿不到完整的图，做不到这种全屏滤镜。先把场景渲进一张离屏纹理、再对这张图整体处理，才行。",
    tags: ["帧缓冲", "后处理", "为什么"],
  },
  {
    id: "fb-17",
    chapter: "framebuffers",
    level: 2,
    question: "颜色为什么用纹理附件、深度却用 renderbuffer 附件？",
    answer:
      "颜色第二遍**要被采样**（贴到全屏四边形上），所以必须用能采样的纹理。深度只在第一遍渲染时被写、被读来做深度测试，渲完不需要采样，用只写不采、更省更快的 renderbuffer 更划算。一句话：要回头采样的用纹理，纯内部用的用 renderbuffer。",
    tags: ["颜色纹理附件", "渲染缓冲附件", "对比"],
  },
  {
    id: "fb-18",
    chapter: "framebuffers",
    level: 2,
    question: "离屏渲染一个立方体时，为什么自建帧缓冲也必须挂深度附件？",
    answer:
      "因为立方体的前后面也要靠深度测试判遮挡。深度测试得有地方写深度值，自建帧缓冲若不挂深度附件，深度测试无处可写、等于没做，立方体前后面会互相穿插、深度乱套。",
    tags: ["渲染缓冲附件", "深度测试", "为什么"],
  },
  {
    id: "fb-19",
    chapter: "framebuffers",
    level: 2,
    question: "为什么挂完附件「一定要」调 checkFramebufferStatus？不调会怎样？",
    answer:
      "因为附件挂好不等于帧缓冲完整。若恰好不完整（如忘了颜色附件、附件尺寸不一致），往这块帧缓冲渲染会失败或得到一片空白，而且不报错——对着白屏一头雾水。先检查返回 `COMPLETE` 才往里渲，能及早发现问题。",
    tags: ["帧缓冲完整性", "为什么"],
  },
  {
    id: "fb-20",
    chapter: "framebuffers",
    level: 2,
    question: "帧缓冲在渲染管线的什么位置起作用？",
    answer:
      "在管线最末端——所有测试、混合都过完、颜色要落地时，落在「当前绑定的帧缓冲」上。绑默认帧缓冲就落到屏幕，绑自建帧缓冲就落到那块离屏画板。",
    tags: ["帧缓冲", "管线位置"],
  },
  {
    id: "fb-21",
    chapter: "framebuffers",
    level: 2,
    question: "第二遍画全屏四边形时为什么通常关掉深度测试？",
    answer:
      "因为全屏四边形只是一块平面贴图，铺满屏幕、没有谁挡谁的问题，不需要深度比较。关掉深度测试既省事又避免它和清空状态打架。第一遍渲场景时才需要深度测试判遮挡。",
    tags: ["全屏四边形", "深度测试", "为什么"],
  },
  {
    id: "fb-22",
    chapter: "framebuffers",
    level: 2,
    question: "为什么换一张卷积核权重表就能换一种滤镜，骨架却不用改？",
    answer:
      "因为核效果的骨架是固定的：算 9 个邻域偏移、对每个偏移采样、乘对应权重、累加。变的只有那张 3×3 权重表填什么。模糊、边缘检测、锐化都用同一套采样累加骨架，只是权重表不同——换核 = 换权重表。",
    tags: ["卷积核", "机制"],
  },
  {
    id: "fb-23",
    chapter: "framebuffers",
    level: 2,
    question: "为什么模糊核的权重和必须 = 1，边缘检测核却 = 0？",
    answer:
      "模糊「不该改变亮度」：权重和 = 1 时平坦区（邻域都一样）加权后还原成原色、不变亮变暗。边缘检测「只要突变」：权重和 = 0 时平坦区采样都一样、加权后归零变黑，只有颜色突变的棱边被留下。权重和决定整体明暗走向。",
    tags: ["卷积核", "权重和", "为什么"],
  },
  {
    id: "fb-24",
    chapter: "framebuffers",
    level: 2,
    question: "边缘检测后为什么平坦的面变黑、只剩轮廓线？",
    answer:
      "因为边缘检测核权重和 = 0，平坦区域邻域颜色都一样、加权求和接近 0（黑）；只有颜色突变处（棱边）邻域差异大、加权后留下明显值。于是整个立方体被描成线框轮廓、平坦面变黑。",
    tags: ["卷积核", "边缘检测", "机制"],
  },
  {
    id: "fb-25",
    chapter: "framebuffers",
    level: 2,
    question: "全屏四边形的邻域偏移 `offset = 1 / 纹理边长` 是什么意思？",
    answer:
      "它是「在纹理坐标上挪一个像素」对应的步长——纹理 UV 是 0~1 范围，除以边长就得到一个纹素的宽度。给当前 UV 加 / 减这个 offset，正好采到上下左右及对角的邻居像素，凑齐 3×3 邻域。",
    tags: ["卷积核", "offset", "机制"],
  },
  {
    id: "fb-26",
    chapter: "framebuffers",
    level: 2,
    question: "为什么两遍各自要 clear 一次？两块帧缓冲的内容会互相影响吗？",
    answer:
      "两块帧缓冲（自建 FBO 和默认帧缓冲）是各自独立的存储，互不影响。所以第一遍绑 FBO 后要 clear 它的颜色 / 深度，第二遍绑回默认帧缓冲后再 clear 它一次。各清各的，互不干扰。",
    tags: ["两遍渲染", "clear"],
  },
  {
    id: "fb-27",
    chapter: "framebuffers",
    level: 2,
    question: "用工厂流水线的比喻，默认帧缓冲和自建帧缓冲各是什么？",
    answer:
      "默认帧缓冲是「成品出货口」（画上去直接显示到屏幕）；自建帧缓冲是车间里一块「中转画板」——先把半成品画上去，下一道工序（第二遍 + 后处理）再加工，加工完才送到出货口上屏。",
    tags: ["帧缓冲", "比喻"],
  },
  {
    id: "fb-28",
    chapter: "framebuffers",
    level: 2,
    question:
      "桌面 OpenGL 和 WebGL2 在「创建帧缓冲 / 渲染缓冲」「解绑回默认」上各有什么 API 差异？",
    answer:
      "创建：桌面用 `glGenFramebuffers` / `glGenRenderbuffers`（先生成 id 再绑定）；WebGL2 用 `gl.createFramebuffer()` / `gl.createRenderbuffer()`（直接返回对象）。解绑回默认：桌面 `glBindFramebuffer(GL_FRAMEBUFFER, 0)`（编号 0），WebGL2 `gl.bindFramebuffer(gl.FRAMEBUFFER, null)`（用 null）。",
    tags: ["API差异", "WebGL2"],
  },
  {
    id: "fb-29",
    chapter: "framebuffers",
    level: 2,
    question:
      "帧缓冲渲出来的纹理，和把图片当普通纹理加载，在 flipY 上为什么处理不一样？",
    answer:
      "WebGL 纹理原点（v=0）在左下角，帧缓冲渲出来的纹理本就左下原点，全屏四边形 NDC 左下 `(-1,-1)` 配 UV `(0,0)` 不需要翻转就正。而图片加载常因行序「自上而下」要 `flipY`——但**别**对帧缓冲纹理再翻一次，否则画面上下颠倒。",
    tags: ["全屏四边形", "flipY", "对比"],
  },

  // ── L3 应用（读代码 / 给参数判结果 / 算权重） ──
  {
    id: "fb-30",
    chapter: "framebuffers",
    level: 3,
    question:
      "某人建了 FBO、只挂了颜色纹理附件就开画立方体，结果前后面互相穿插。漏了什么？怎么修？",
    answer:
      "漏了**深度附件**——只挂颜色纹理、没挂深度，深度测试无处可写，等于没做深度测试，前后面遮挡乱套。修法：给帧缓冲挂一个深度 renderbuffer 附件（`renderbufferStorage` 用深度格式 + `DEPTH_ATTACHMENT`），挂完 `checkFramebufferStatus` 确认 `COMPLETE`。",
    tags: ["渲染缓冲附件", "读代码"],
  },
  {
    id: "fb-31",
    chapter: "framebuffers",
    level: 3,
    question:
      "模糊核 9 格本想各填 `1/9`，结果都写成了 `1`（忘了除以 9），画面会怎样？",
    answer:
      "整张图过曝、亮了 9 倍——9 个 `1` 加起来权重和 = 9，邻域加权求和把亮度放大了 9 倍。修法：让权重和 = 1（每格除以 9）。要保持亮度的核权重和必须 = 1。",
    tags: ["卷积核", "权重和", "读代码"],
  },
  {
    id: "fb-32",
    chapter: "framebuffers",
    level: 3,
    question:
      "后处理一切正常，但画面整个上下颠倒。最可能是哪里错了？怎么修？",
    answer:
      "全屏四边形的 UV 和 NDC 方向没对齐——要么 UV 上下写反了，要么把帧缓冲渲出来的纹理又当普通图片 `flipY` 翻了一次。修法：帧缓冲纹理是左下原点，NDC 左下 `(-1,-1)` 配 UV `(0,0)`、右上配 `(1,1)`，不翻转；别对帧缓冲纹理再做 `flipY`。",
    tags: ["全屏四边形", "UV", "读代码"],
  },
  {
    id: "fb-33",
    chapter: "framebuffers",
    level: 3,
    question:
      "想给后处理新增一个「锐化」核（更清晰、边缘更硬），写出它的 9 个权重，权重和该是几？",
    answer:
      "锐化核：四周全 `−1`、中心 `9`，即 `[-1,-1,-1, -1,9,-1, -1,-1,-1]`。权重和 = `9 + 8×(−1) = 1`，应该是 1：锐化增强当前像素、压低邻居以突出细节，但不该改变整体亮度，平坦区还原原色，只放大差异处。",
    tags: ["卷积核", "权重和", "应用"],
  },
  {
    id: "fb-34",
    chapter: "framebuffers",
    level: 3,
    question:
      "在 3×3 卷积核片段着色器里加一个新核，最少要改哪个量？`offsets`、采样循环要动吗？",
    answer:
      "只要把 `kernel[9]` 这张**权重表**换成新核的 9 个数即可。`offsets`（邻域偏移）、采样循环、求和那套骨架完全不用动。换核 = 换权重表，这正是卷积核框架的妙处。",
    tags: ["卷积核", "应用"],
  },
  {
    id: "fb-35",
    chapter: "framebuffers",
    level: 3,
    question:
      "按顺序写出「建一个能用的帧缓冲」的步骤（WebGL2 函数名即可），从建 FBO 到解绑。",
    answer:
      "`createFramebuffer` → `bindFramebuffer` 绑定 → 建纹理 + `texImage2D`（data=null）+ `framebufferTexture2D` 挂 `COLOR_ATTACHMENT0` → 建 renderbuffer + `renderbufferStorage`（深度格式）+ `framebufferRenderbuffer` 挂 `DEPTH_ATTACHMENT` → `checkFramebufferStatus` 须 === `FRAMEBUFFER_COMPLETE` → `bindFramebuffer(FRAMEBUFFER, null)` 解绑。",
    tags: ["帧缓冲", "应用"],
  },
  {
    id: "fb-36",
    chapter: "framebuffers",
    level: 3,
    question:
      "两遍渲染里，第一遍绑什么、第二遍绑什么？关键的两句对绑怎么写（WebGL2）？",
    answer:
      "第一遍绑自建 FBO：`gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)`；第二遍绑回默认帧缓冲：`gl.bindFramebuffer(gl.FRAMEBUFFER, null)`。前者把场景渲进颜色纹理，后者切回屏幕画全屏四边形采样那张纹理。",
    tags: ["两遍渲染", "应用"],
  },
  {
    id: "fb-37",
    chapter: "framebuffers",
    level: 3,
    question:
      "帧缓冲后处理渲出来一片纯黑、不报错。列出至少两个最可能的原因。",
    answer:
      "①帧缓冲不完整又没检查（忘挂深度附件 / 附件尺寸不一致），第一遍其实没渲进去。②第二遍没把颜色纹理绑上、或采样器 uniform 没指对纹理单元，采到全黑。③全屏四边形 UV/NDC 写错没真正铺满 / 采到边界外。④第二遍忘了绑回默认帧缓冲或没切屏幕着色器。",
    tags: ["帧缓冲", "排错"],
  },
  {
    id: "fb-38",
    chapter: "framebuffers",
    level: 3,
    question:
      "切到边缘检测核，自转彩色立方体会变成什么样？为什么？",
    answer:
      "只剩立方体的轮廓线、平坦的面变黑。因为边缘检测核权重和 = 0：平坦面邻域都一样、加权求和接近 0 变黑，只有颜色突变的棱边被留下，整个立方体被描成线框轮廓。",
    tags: ["卷积核", "边缘检测", "应用"],
  },
  {
    id: "fb-39",
    chapter: "framebuffers",
    level: 3,
    question:
      "WebGL2 里给帧缓冲挂深度附件，`renderbufferStorage` 用什么格式、挂到哪个附件点？",
    answer:
      "用 `gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, w, h)`（纯深度，WebGL2 都支持），再 `gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, rbo)` 挂到 `DEPTH_ATTACHMENT`。深度+模板则用 `DEPTH24_STENCIL8` + `DEPTH_STENCIL_ATTACHMENT`。",
    tags: ["渲染缓冲附件", "应用"],
  },
  {
    id: "fb-40",
    chapter: "framebuffers",
    level: 3,
    question:
      "想把灰度后处理改成「只看当前像素」的反相，片段着色器里那行核心怎么改？",
    answer:
      "灰度是 `lum = dot(c, vec3(0.2126,0.7152,0.0722)); c = vec3(lum);`。反相改成 `c = vec3(1.0) - c;`——用 1 减去每个通道。两者都只采样当前像素一次，不需要邻域。",
    tags: ["后处理", "反相", "应用"],
  },
  {
    id: "fb-41",
    chapter: "framebuffers",
    level: 3,
    question:
      "全屏四边形的顶点和 UV 该怎么布置才能正确铺满屏幕、正向贴出帧缓冲纹理？",
    answer:
      "顶点落在 NDC 四角 `(±1, ±1)`，UV 落在 `(0/1)` 四角，一一对应：NDC 左下 `(-1,-1)` 配 UV `(0,0)`、右上 `(1,1)` 配 `(1,1)`，不翻转。顶点着色器把 UV 原样透传给片段着色器去采样。",
    tags: ["全屏四边形", "应用"],
  },
  {
    id: "fb-42",
    chapter: "framebuffers",
    level: 3,
    question:
      "第二遍画全屏四边形前，要把哪张纹理绑上去、采样器 uniform 怎么设？",
    answer:
      "把第一遍渲好的颜色纹理 `texColor` 绑上：`gl.bindTexture(gl.TEXTURE_2D, texColor)`，并把屏幕着色器里的采样器 uniform 设到对应纹理单元（如 `gl.uniform1i(uScene, 0)`）。否则采样的不是那张离屏纹理，会一片黑。",
    tags: ["渲染到纹理", "应用"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 边界） ──
  {
    id: "fb-43",
    chapter: "framebuffers",
    level: 4,
    question:
      "把场景渲到自建帧缓冲后立方体深度乱套、前后面穿插，最可能漏了哪一步？",
    answer:
      "最可能漏了**给自建帧缓冲挂深度附件**——只挂了颜色纹理就开画，深度测试无处可写、等于没做。修法：挂一个深度 renderbuffer 附件（深度格式 + `DEPTH_ATTACHMENT`），并在挂完后 `checkFramebufferStatus` 确认 `COMPLETE` 再渲染。",
    tags: ["渲染缓冲附件", "陷阱", "综合"],
  },
  {
    id: "fb-44",
    chapter: "framebuffers",
    level: 4,
    question:
      "往自建帧缓冲渲染却一片空白 / 黑屏、也不报错。根因是什么？怎么排查？",
    answer:
      "根因：挂完附件**没调 checkFramebufferStatus**，恰好帧缓冲不完整（如忘了颜色附件、附件尺寸不一致），渲了个寂寞。排查：挂完附件必须 `checkFramebufferStatus(GL_FRAMEBUFFER)` 确认返回 `GL_FRAMEBUFFER_COMPLETE` 才渲染；不完整时按返回的错误码查缺了哪类附件。",
    tags: ["帧缓冲完整性", "陷阱", "综合"],
  },
  {
    id: "fb-45",
    chapter: "framebuffers",
    level: 4,
    question:
      "套上模糊核后画面莫名整体变亮 / 变暗、颜色不对。原因和修法？再说边缘检测为何另当别论。",
    answer:
      "原因：核的 9 个权重加起来不等于 1（如模糊核忘了除以 9，9 个 `1` 加起来是 9，整张图亮 9 倍过曝）。修法：要保持亮度的核（模糊、锐化）权重和 = 1。边缘检测是故意权重和 = 0（平坦区归零变黑、只留突变），属有意为之；别让核「既不是 1 也不是 0 又没意图」。",
    tags: ["卷积核", "权重和", "陷阱"],
  },
  {
    id: "fb-46",
    chapter: "framebuffers",
    level: 4,
    question:
      "后处理描边 / 模糊像采错了位置、糊到旁边去，或画面上下颠倒。是同一类问题吗？根因和修法？",
    answer:
      "是同一类——全屏四边形的 UV 与 NDC 方向没对齐。要么 UV 上下写反、要么把帧缓冲纹理又 `flipY` 翻了一次，导致采样位置整体偏移或上下颠倒。修法：帧缓冲纹理左下原点，NDC 左下 `(-1,-1)` 配 UV `(0,0)`、右上配 `(1,1)`，不翻转；别对帧缓冲纹理 `flipY`。",
    tags: ["全屏四边形", "UV", "陷阱"],
  },
  {
    id: "fb-47",
    chapter: "framebuffers",
    level: 4,
    question:
      "为什么「先渲成图、再后期」必须分两遍、且中间隔一块离屏帧缓冲？把这条因果链讲清。",
    answer:
      "①后处理要对整张完成图动手，必须先有一张完整的图 → ②第一遍绑离屏 FBO 把整个场景渲进颜色纹理，得到这张完整的图 → ③第二遍绑回默认帧缓冲，画全屏四边形逐像素采样那张图、套核加工 → ④结果上屏。少了离屏帧缓冲这一道，就拿不到「整张图」，做不出全屏滤镜。",
    tags: ["两遍渲染", "后处理", "综合"],
  },
  {
    id: "fb-48",
    chapter: "framebuffers",
    level: 4,
    question:
      "颜色和深度都用纹理附件行不行？为什么本章颜色用纹理、深度偏用 renderbuffer？把取舍讲清。",
    answer:
      "技术上深度也能用纹理（需要采样深度时才这么做），但本章不需要采样深度。颜色第二遍要被全屏四边形采样、必须是能采样的纹理；深度只在第一遍内部被写 / 读做测试、渲完不采样，用只写不采、更省更快的 renderbuffer 更划算。原则：要回头采样的用纹理，纯内部用的用 renderbuffer。",
    tags: ["颜色纹理附件", "渲染缓冲附件", "综合"],
  },
  {
    id: "fb-49",
    chapter: "framebuffers",
    level: 4,
    question:
      "第二遍画全屏四边形，结果还是画进了离屏纹理、没上屏。哪两步没做对？",
    answer:
      "①没绑回默认帧缓冲就画——还绑着 FBO，全屏四边形又被画进离屏纹理。②没切到屏幕着色器。修法：第二遍前 `bindFramebuffer(FRAMEBUFFER, null)` 绑回默认帧缓冲、`useProgram` 切到屏幕着色器，再画全屏四边形采样 `texColor`。",
    tags: ["两遍渲染", "陷阱", "综合"],
  },
  {
    id: "fb-50",
    chapter: "framebuffers",
    level: 4,
    question:
      "完整描述：屏幕上看到的画面，到底是哪一遍的结果？为什么必须经过离屏那一遍？",
    answer:
      "屏幕上看到的是**第二遍**「全屏四边形采样离屏纹理 + 后处理」的结果。第一遍只在离屏帧缓冲上忙活、不上屏，作用是把整个场景存成一张图。正因为中间多了「存成一张图」这道，才有机会对整张图做后处理；否则只能一笔笔往屏幕画，摸不到全屏滤镜。",
    tags: ["两遍渲染", "渲染到纹理", "综合"],
  },
  {
    id: "fb-51",
    chapter: "framebuffers",
    level: 4,
    question:
      "想做一个「锐化」滤镜却发现画面发灰、对比反而下降。结合权重和与核结构，可能哪里写错了？",
    answer:
      "可能把锐化核的中心权重写小了或四周没用负值，导致权重和 ≠ 1 或没真正「增强中心、压低邻居」。正确锐化核中心 `9`、四周 `−1`，权重和 = 1：平坦区还原原色、差异处被放大才会更清晰。权重和偏离 1 会整体变亮 / 变暗、对比失真。",
    tags: ["卷积核", "权重和", "综合"],
  },
  {
    id: "fb-52",
    chapter: "framebuffers",
    level: 4,
    question:
      "把帧缓冲后处理从「整屏一种核」改成「画面左半反相、右半灰度」，思路上要在哪一遍、改哪里？",
    answer:
      "改在**第二遍**全屏四边形的片段着色器里：第一遍渲到纹理、两遍绑定切换都不动。在片段着色器中按当前像素的 UV（或屏幕坐标）的 x 分一支：x < 0.5 走反相 `1−c`，否则走灰度。后处理是逐像素加工，分区只是按坐标选不同处理。",
    tags: ["后处理", "综合"],
  },
];
