/** 复习题库 · 面剔除（face-culling）。HEL-78 高级OpenGL篇。 */

import type { ReviewQuestion } from "./types";

export const faceCullingQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / 数值约定 / API） ──
  {
    id: "fc-1",
    chapter: "face-culling",
    level: 1,
    question: "什么是「面剔除」（face culling）？它在渲染管线的哪一步发生？",
    answer:
      "面剔除是渲染管线在**光栅化之前**的一道优化：GPU 检查每个三角形是朝向镜头还是背对镜头，把背对镜头、你根本看不见的面直接丢弃，不再为它们做光栅化和片段着色。对封闭物体能省下约一半片段开销，画面却完全不变。",
    tags: ["面剔除", "定义"],
  },
  {
    id: "fc-2",
    chapter: "face-culling",
    level: 1,
    question: "什么是「环绕顺序」（winding order）？它由什么决定？",
    answer:
      "把一个三角形的三个顶点按定义的先后（`v0 → v1 → v2`）连起来走一圈，要么是逆时针（CCW），要么是顺时针（CW）——这个绕行方向就叫环绕顺序。它完全由你**定义顶点的顺序**决定。",
    tags: ["环绕顺序", "定义"],
  },
  {
    id: "fc-3",
    chapter: "face-culling",
    level: 1,
    question: "CCW 和 CW 各是什么的缩写？分别表示哪种绕法？",
    answer:
      "CCW 是 counter-clockwise（逆时针），CW 是 clockwise（顺时针）。它们描述三角形三个顶点连成一圈时的绕行方向。",
    tags: ["环绕顺序", "CCW", "CW"],
  },
  {
    id: "fc-4",
    chapter: "face-culling",
    level: 1,
    question: "建模时一般约定所有三角形按哪种环绕顺序定义顶点？",
    answer:
      "一般约定按**逆时针**（CCW）定义所有三角形的顶点。这也正是 `glFrontFace` 的默认值 `GL_CCW`（逆时针算正面）所对应的约定。",
    tags: ["环绕顺序", "约定"],
  },
  {
    id: "fc-5",
    chapter: "face-culling",
    level: 1,
    question: "什么是「正面」（front face）？默认它会被剔除还是保留？",
    answer:
      "投影到屏幕后，三个顶点的环绕方向和你约定的方向（默认逆时针 CCW）**一致**的三角形面，就是正面。它朝向镜头、是你看得见的那一面，面剔除默认**保留**它、照常画出来。",
    tags: ["正面", "定义"],
  },
  {
    id: "fc-6",
    chapter: "face-culling",
    level: 1,
    question: "什么是「背面」（back face）？默认它会被剔除还是保留？",
    answer:
      "投影到屏幕后，三个顶点的环绕方向和你约定的方向**相反**的三角形面，就是背面。它背对镜头、被正面挡住看不见，面剔除默认就是把它**丢弃**。",
    tags: ["背面", "定义"],
  },
  {
    id: "fc-7",
    chapter: "face-culling",
    level: 1,
    question: "启用面剔除的那行 API 怎么写？面剔除默认是开还是关？",
    answer:
      "`glEnable(GL_CULL_FACE)`（WebGL2 是 `gl.enable(gl.CULL_FACE)`）。面剔除**默认是关着的**，不手动启用就不会剔任何面。",
    tags: ["glEnable", "API"],
  },
  {
    id: "fc-8",
    chapter: "face-culling",
    level: 1,
    question: "`glCullFace` 这个函数管什么？它的默认值是什么？",
    answer:
      "`glCullFace(mode)` 设置面剔除「**剔掉哪一面**」。默认值是 `GL_BACK`（只剔背面），这也是绝大多数情况要的。",
    tags: ["glCullFace", "API"],
  },
  {
    id: "fc-9",
    chapter: "face-culling",
    level: 1,
    question: "`glCullFace` 能填哪三个值？分别剔掉哪一面？",
    answer:
      "`GL_BACK` 只剔背面（默认）；`GL_FRONT` 只剔正面（反过来，留背面）；`GL_FRONT_AND_BACK` 正背都剔（这个面什么都不画）。",
    tags: ["glCullFace", "取值"],
  },
  {
    id: "fc-10",
    chapter: "face-culling",
    level: 1,
    question: "`glFrontFace` 这个函数管什么？它的默认值是什么？",
    answer:
      "`glFrontFace(mode)` 设置「**哪种环绕方向算正面**」。默认值是 `GL_CCW`（逆时针环绕为正面）；另一个可选值是 `GL_CW`（顺时针为正面）。",
    tags: ["glFrontFace", "API"],
  },
  {
    id: "fc-11",
    chapter: "face-culling",
    level: 1,
    question: "面剔除三件套是哪三个 API？各管什么？",
    answer:
      "`glEnable(GL_CULL_FACE)` 总开关（开 / 关）；`glCullFace` 剔哪一面（默认 `GL_BACK`）；`glFrontFace` 哪种环绕算正面（默认 `GL_CCW`）。",
    tags: ["面剔除", "API"],
  },
  {
    id: "fc-12",
    chapter: "face-culling",
    level: 1,
    question: "面剔除对哪类物体才能安全省料？为什么有这个前提？",
    answer:
      "只对**封闭物体**（像立方体、球这种把内部裹严实的形状）才安全省料。因为只有封闭物体的背面才**总是被正面挡住**、注定看不见，剔了不影响画面。",
    tags: ["面剔除", "封闭物体"],
  },
  {
    id: "fc-13",
    chapter: "face-culling",
    level: 1,
    question: "GPU 判定一个三角形是正面还是背面，依据的是什么信息？",
    answer:
      "依据是三个顶点投影到屏幕后的**环绕方向**（逆时针还是顺时针）。它不需要任何额外标记，单看屏幕上的绕向就判得出正背。",
    tags: ["正面", "背面", "环绕顺序"],
  },
  {
    id: "fc-14",
    chapter: "face-culling",
    level: 1,
    question: "对一个封闭立方体开了面剔除（剔背面），大致能省下多少片段开销？",
    answer:
      "约一半。封闭凸体每个朝你的正面背后总有一个背对你的背面被挡着看不见，剔掉这些背面，省下的就是它们那约一半的片段着色开销。",
    tags: ["面剔除", "省一半"],
  },
  {
    id: "fc-15",
    chapter: "face-culling",
    level: 1,
    question: "WebGL2 里启用面剔除、剔背面、设逆时针为正面分别怎么写？",
    answer:
      "`gl.enable(gl.CULL_FACE)`（启用）、`gl.cullFace(gl.BACK)`（剔背面）、`gl.frontFace(gl.CCW)`（逆时针为正面）。后两行都是默认值。",
    tags: ["WebGL2", "API"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "fc-16",
    chapter: "face-culling",
    level: 2,
    question: "没有面剔除时，渲染一个实心盒子会浪费在哪里？",
    answer:
      "盒子背对你的那几个面最后总会被前面的面整个挡住、看不见，可流水线还老老实实地为它们铺色块、跑片段着色器算颜色——这些计算等于白算，性能凭空浪费。",
    tags: ["面剔除", "为什么"],
  },
  {
    id: "fc-17",
    chapter: "face-culling",
    level: 2,
    question: "为什么「同一个三角形，从正面看是逆时针、从背面看就变成顺时针」？",
    answer:
      "就像你正面看墙上一个顺时针画的钟，绕到墙背后透过去看，它就成了逆时针——同一组顶点从相反方向看，绕行方向自然反转。GPU 利用的正是这一点：朝你的面保持约定绕向，背你的面绕向自动反转。",
    tags: ["环绕顺序", "为什么"],
  },
  {
    id: "fc-18",
    chapter: "face-culling",
    level: 2,
    question:
      "为什么 GPU 不需要任何额外标记，单看屏幕环绕方向就能分清正背面？",
    answer:
      "因为封闭物体上朝你的面投影后保持约定的逆时针（正面），而背对你的面是「从背后看」的、环绕自动反转成顺时针（背面）。这条几何事实把朝你的和背你的天然分开了，无需额外信息。",
    tags: ["正面", "背面", "机制"],
  },
  {
    id: "fc-19",
    chapter: "face-culling",
    level: 2,
    question:
      "正背面是建模时就标死的，还是渲染时现判的？这对理解面剔除有什么意义？",
    answer:
      "是**投影到屏幕后现判的**——建模时只是定下顶点顺序，还没判谁正谁背；正背是顶点经投影、按当时看到的环绕方向才分出来的。意义在于：同一个面随相机绕到背后，会从正面变成背面。",
    tags: ["正面", "背面", "机制"],
  },
  {
    id: "fc-20",
    chapter: "face-culling",
    level: 2,
    question: "为什么被剔掉的面能省开销，省的具体是哪部分？",
    answer:
      "因为剔除发生在**光栅化之前**，被剔的面连片段都不会生成。省下的正是这些片段的光栅化和片段着色器开销——不生成片段，就没有后续的着色、纹理采样、光照计算。",
    tags: ["面剔除", "省一半", "机制"],
  },
  {
    id: "fc-21",
    chapter: "face-culling",
    level: 2,
    question: "`glCullFace` 和 `glFrontFace` 这两个开关为什么是相互独立的两件事？",
    answer:
      "`glCullFace` 决定「剔正面还是背面」，`glFrontFace` 决定「哪种环绕算正面」——前者选剔谁，后者定正背的判据。两者职责不同、互不替代，必须各自设对，面剔除才会按预期工作。",
    tags: ["glCullFace", "glFrontFace", "对比"],
  },
  {
    id: "fc-22",
    chapter: "face-culling",
    level: 2,
    question: "为什么 `glFrontFace` 的约定必须和顶点数据实际的绕向一致？",
    answer:
      "因为 GPU 拿 `glFrontFace` 指定的环绕当「正面」的判据。要是顶点其实是顺时针定义的，却把 `glFrontFace` 留成默认 `GL_CCW`，GPU 就会把你的正面全判成背面剔掉，物体直接消失或像内外翻。",
    tags: ["glFrontFace", "为什么"],
  },
  {
    id: "fc-23",
    chapter: "face-culling",
    level: 2,
    question: "面剔除和深度测试是同一回事吗？两者各管什么？",
    answer:
      "不是。面剔除在**光栅化之前**、靠**环绕方向**整面丢弃单个封闭物体自己背对镜头的面，是省开销的优化；深度测试在**片段着色器之后**、靠**比深度值**逐片段决定任意物体间谁挡谁。两者各管一段、互不替代。",
    tags: ["面剔除", "深度测试", "对比"],
  },
  {
    id: "fc-24",
    chapter: "face-culling",
    level: 2,
    question: "「面剔除靠比较深度、把更远的面扔掉」这个说法对吗？为什么？",
    answer:
      "不对。面剔除**不比较深度**，靠的是三角形顶点投影到屏幕后的环绕方向判正背面、把背面剔掉，发生在光栅化之前、被剔的面连片段都不生成。比深度是深度测试干的事，两者不是一回事。",
    tags: ["面剔除", "误区", "深度测试"],
  },
  {
    id: "fc-25",
    chapter: "face-culling",
    level: 2,
    question: "为什么单面网格（如草、纸片）开面剔除会出破洞，而封闭立方体不会？",
    answer:
      "面剔除假设「背面看不见」，对封闭立方体成立（背面被正面裹住）。但单面网格没有把内部裹住，它的「背面」其实是要给你看的另一面——被剔掉就破了。绕到这类网格背后看，剔的正好是你要看的那面。",
    tags: ["单面网格", "破洞", "对比"],
  },
  {
    id: "fc-26",
    chapter: "face-culling",
    level: 2,
    question: "为什么开了面剔除后画面观感不但不变差，反而可能更对？",
    answer:
      "面剔除关着时背面也照画，你会透过前面看到立方体的内壁、画面像内外翻穿帮。开了之后这些本就看不见的背面被丢弃，不再透出内壁，画面更干净更对，同时还白省了它们的片段开销。",
    tags: ["面剔除", "观感"],
  },
  {
    id: "fc-27",
    chapter: "face-culling",
    level: 2,
    question: "面剔除三件套里，绝大多数普通场景应该怎么配？",
    answer:
      "开总开关 `glEnable(GL_CULL_FACE)`，`glCullFace` 和 `glFrontFace` 都用默认值（`GL_BACK` + `GL_CCW`）即可——只要顶点确实是逆时针定义的，开个总开关立刻就能省料。",
    tags: ["面剔除", "默认值"],
  },
  {
    id: "fc-28",
    chapter: "face-culling",
    level: 2,
    question: "想从物体内部观察（比如站在房间盒子里看内壁），面剔除该怎么调？",
    answer:
      "把 `glCullFace` 设成 `GL_FRONT` 改剔正面（保留朝向房间内的背面），或干脆 `glDisable(GL_CULL_FACE)` 关掉。这样朝外、你看不到的正面被剔，朝内的内壁干净显示。",
    tags: ["glCullFace", "内部观察"],
  },
  {
    id: "fc-29",
    chapter: "face-culling",
    level: 2,
    question: "桌面 OpenGL 和 WebGL2 在面剔除 API 上有哪些写法差异？",
    answer:
      "桌面是全局函数 + 大写常量：`glEnable(GL_CULL_FACE)`、`glCullFace(GL_BACK)`、`glFrontFace(GL_CCW)`；WebGL2 是上下文方法 + 上下文常量：`gl.enable(gl.CULL_FACE)`、`gl.cullFace(gl.BACK)`、`gl.frontFace(gl.CCW)`。逻辑一一对应。",
    tags: ["API差异", "WebGL2"],
  },

  // ── L3 应用（读代码 / 给参数判结果 / 判正背面） ──
  {
    id: "fc-30",
    chapter: "face-culling",
    level: 3,
    question:
      "顶点是逆时针定义的，却把 `glFrontFace` 设成了 `GL_CW`，立方体会怎样？",
    answer:
      "正背判反：GPU 把朝你的逆时针正面当成了背面剔掉，留下本该看不见的内壁。立方体看起来整个消失或像内外翻。修法：改回 `glFrontFace(GL_CCW)` 与逆时针数据一致。",
    tags: ["glFrontFace", "读代码"],
  },
  {
    id: "fc-31",
    chapter: "face-culling",
    level: 3,
    question:
      "代码里设了 `glCullFace(GL_BACK)` 和 `glFrontFace(GL_CCW)`，但忘了 `glEnable(GL_CULL_FACE)`，运行结果如何？",
    answer:
      "面剔除根本没生效——背面照样在画，性能一点没省，还不报错。`glCullFace` / `glFrontFace` 只是配置，总开关默认是关的。修法：初始化时务必 `glEnable(GL_CULL_FACE)`。",
    tags: ["glEnable", "读代码"],
  },
  {
    id: "fc-32",
    chapter: "face-culling",
    level: 3,
    question:
      "把对着实心立方体的 `glCullFace(GL_BACK)` 改成 `glCullFace(GL_FRONT)`，画面变成什么样？",
    answer:
      "朝你的正面全被剔掉，留下背对你的背面——你会透过物体看到它的内壁，像把立方体翻过来从里面看。对普通实心立方体这通常是穿帮的。",
    tags: ["glCullFace", "应用"],
  },
  {
    id: "fc-33",
    chapter: "face-culling",
    level: 3,
    question:
      "什么场景下 `glCullFace(GL_FRONT)`（剔正面）反而正好有用？",
    answer:
      "从物体内部观察时，比如做一个房间 / 天空盒，把相机放在大盒子内部，想看到的恰是朝向房间内的内壁（背面）。这时剔掉朝外的正面、保留朝内的背面，正好干净显示内壁，又省掉朝外那些看不到的面。",
    tags: ["glCullFace", "应用"],
  },
  {
    id: "fc-34",
    chapter: "face-culling",
    level: 3,
    question:
      "给一片随风摆的草（单面纸片网格）开了 `glEnable(GL_CULL_FACE)`，绕到草背后看会怎样？怎么改？",
    answer:
      "草从背面看整个没了。因为草是单面网格、两面都要看见，面剔除把「背对你」那面当背面剔了，绕到背后正好剔的是你要看的那面。改法：对这类网格别开面剔除，单独 `glDisable(GL_CULL_FACE)`，画完再开回来。",
    tags: ["单面网格", "应用"],
  },
  {
    id: "fc-35",
    chapter: "face-culling",
    level: 3,
    question:
      "代码里设了 `glCullFace(GL_FRONT_AND_BACK)`，开了面剔除，这个物体会怎样？",
    answer:
      "正面背面都被剔掉，这个物体什么都不画、整个消失。`GL_FRONT_AND_BACK` 一般不用于实际渲染物体，这通常是误设。修法：改成 `GL_BACK`（剔背面）。",
    tags: ["glCullFace", "读代码"],
  },
  {
    id: "fc-36",
    chapter: "face-culling",
    level: 3,
    question:
      "顶点数据其实是顺时针（CW）定义的，要正确剔背面，`glFrontFace` 该怎么设？",
    answer:
      "设成 `glFrontFace(GL_CW)`，告诉 GPU 顺时针环绕才算正面，与你的数据一致。这样朝你的顺时针正面被保留、背面被正确剔除。保持默认 `GL_CCW` 会把正面误判成背面剔掉。",
    tags: ["glFrontFace", "应用"],
  },
  {
    id: "fc-37",
    chapter: "face-culling",
    level: 3,
    question:
      "一个三角形三顶点投影到屏幕后是顺时针排列，`glFrontFace(GL_CCW)`、`glCullFace(GL_BACK)`，它会被画出来吗？",
    answer:
      "不会。约定逆时针为正面，这个三角形屏幕上是顺时针 → 判为背面 → `GL_BACK` 把它剔掉。它连片段都不生成，不会被画。",
    tags: ["正面", "背面", "判定"],
  },
  {
    id: "fc-38",
    chapter: "face-culling",
    level: 3,
    question:
      "一个三角形投影到屏幕后是逆时针排列，`glFrontFace(GL_CCW)`、`glCullFace(GL_BACK)`，它会被画出来吗？",
    answer:
      "会。约定逆时针为正面，这个三角形屏幕上是逆时针 → 判为正面 → 只剔背面的设置保留正面，它照常光栅化、着色、画出来。",
    tags: ["正面", "背面", "判定"],
  },
  {
    id: "fc-39",
    chapter: "face-culling",
    level: 3,
    question:
      "想临时只对某个物体关掉面剔除、画完再恢复，应该怎么写？",
    answer:
      "画那个物体前 `glDisable(GL_CULL_FACE)`，画完立刻 `glEnable(GL_CULL_FACE)` 恢复。常用于在开着面剔除的场景里插入草、布等单面 / 双面要看的物体。",
    tags: ["glDisable", "应用"],
  },
  {
    id: "fc-40",
    chapter: "face-culling",
    level: 3,
    question:
      "开了面剔除后帧率没明显提升，被怀疑没省到，怎么快速判断面剔除是否真的在工作？",
    answer:
      "先确认 `glEnable(GL_CULL_FACE)` 确实调了（默认关、不报错）；再确认 `glFrontFace` 与顶点绕向一致、`glCullFace` 是 `GL_BACK`。若设错约定，正面被剔、物体消失也是「在工作但配错」；若忘启用，则压根没工作。",
    tags: ["面剔除", "排查"],
  },
  {
    id: "fc-41",
    chapter: "face-culling",
    level: 3,
    question:
      "一面双面要看的布（如旗帜），开了 `glCullFace(GL_BACK)`，从背面看会怎样？该怎么处理？",
    answer:
      "从背面看布会消失或缺一半——它的背面正是你要看的另一面，却被剔了。处理：对双面要看的物体别开面剔除（`glDisable(GL_CULL_FACE)`），或为它单独临时关闭、画完再开。",
    tags: ["双面物体", "应用"],
  },
  {
    id: "fc-42",
    chapter: "face-culling",
    level: 3,
    question:
      "立方体的正面和背面顶点都按同一逆时针顺序定义，投影到屏幕后两面的环绕方向会一样还是相反？",
    answer:
      "相反。朝你的正面投影后仍是逆时针（判为正面、保留），背对你的背面相当于从背后透过去看同样的顶点，环绕自动反转成顺时针（判为背面、被剔）。同一套约定，正背就这么分开。",
    tags: ["环绕顺序", "判定"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 边界） ──
  {
    id: "fc-43",
    chapter: "face-culling",
    level: 4,
    question:
      "开了面剔除后物体整个消失或像内外翻。列出两种可能的原因，并各给修法。",
    answer:
      "①环绕约定对不上：顶点其实是顺时针定义的，`glFrontFace` 却还是默认 `GL_CCW`，正面被当背面剔掉——修法：`glFrontFace(GL_CW)` 与数据一致。②误把 `glCullFace` 设成了 `GL_FRONT`（剔正面）——修法：改回 `GL_BACK`。两者都导致正面被剔。",
    tags: ["面剔除", "陷阱"],
  },
  {
    id: "fc-44",
    chapter: "face-culling",
    level: 4,
    question:
      "立方体开剔除后消失、草开同样设置后从背面没了，两个翻车原因分别是什么？",
    answer:
      "立方体：环绕约定对不上（顶点其实顺时针、`glFrontFace` 还是 `GL_CCW`），正面被判成背面剔掉——修法让 `glFrontFace` 与真实绕向一致。草：单面网格压根不该开面剔除（两面都要看，背面正是要看的另一面）——给它 `glDisable(GL_CULL_FACE)`。一个是「该开却设错」，一个是「压根不该开」。",
    tags: ["面剔除", "单面网格", "陷阱"],
  },
  {
    id: "fc-45",
    chapter: "face-culling",
    level: 4,
    question:
      "面剔除和深度测试常被混为一谈。从「管线位置、依据信息、处理对象」三方面把它们彻底区分开。",
    answer:
      "管线位置：面剔除在光栅化之前，深度测试在片段着色器之后。依据信息：面剔除看屏幕上的环绕方向，深度测试比深度值。处理对象：面剔除整面丢弃单个封闭物体自己背对镜头的面，深度测试逐片段处理任意物体间谁挡谁。面剔除省下背面片段，深度测试再处理剩下面之间的遮挡，两者互补不替代。",
    tags: ["面剔除", "深度测试", "综合"],
  },
  {
    id: "fc-46",
    chapter: "face-culling",
    level: 4,
    question:
      "有人想给一座开放的拱门模型（敞口、内外都能看到）开面剔除省性能，合理吗？为什么？",
    answer:
      "不合理。开放 / 敞口模型没有把内部裹住，它「背对你」的面往往正是从另一角度要给你看的面，开剔除会缺一半、出现破洞。面剔除只对封闭物体安全（背面注定看不见）。对开放或内外都要看的模型，要么别开、要么为它临时关闭。",
    tags: ["开放网格", "陷阱", "综合"],
  },
  {
    id: "fc-47",
    chapter: "face-culling",
    level: 4,
    question:
      "为什么说面剔除对封闭物体是「白捡的优化」，而对单面 / 开放网格却是「定时炸弹」？",
    answer:
      "封闭物体的背面总被正面挡住、注定看不见，剔了画面不变、还省一半片段——白捡。单面 / 开放网格没把内部裹住，它的「背面」其实是要给你看的另一面，剔了就破洞、缺面——同样的开关在这类物体上直接毁掉画面。安全前提全在「物体是否封闭」。",
    tags: ["面剔除", "封闭物体", "综合"],
  },
  {
    id: "fc-48",
    chapter: "face-culling",
    level: 4,
    question:
      "把一个用「剔背面」省料的场景，改成「站在大盒子内部看内壁」，面剔除设置要怎么联动改？为什么？",
    answer:
      "把 `glCullFace` 从 `GL_BACK` 改成 `GL_FRONT`（剔正面）。因为从内部看，盒子朝外的面是正面、你看不到，朝内的内壁是背面、正是要看的。改剔正面就把看不到的朝外面省掉、保留内壁。`glEnable`、`glFrontFace` 不用动。",
    tags: ["glCullFace", "内部观察", "综合"],
  },
  {
    id: "fc-49",
    chapter: "face-culling",
    level: 4,
    question:
      "把一个原本逆时针建模的物体的所有三角形顶点顺序整体反转成顺时针，其它不变，画面会怎样？怎么补救？",
    answer:
      "投影后正背全反了：原本朝你的正面变成顺时针、被默认 `GL_CCW` + `GL_BACK` 判成背面剔掉，物体消失或内外翻。补救二选一：把 `glFrontFace` 改成 `GL_CW` 与新数据一致，或把顶点顺序改回逆时针。",
    tags: ["环绕顺序", "陷阱", "综合"],
  },
  {
    id: "fc-50",
    chapter: "face-culling",
    level: 4,
    question:
      "完整描述：从「定义顶点顺序」到「背面被剔」整条链路经过哪几环？",
    answer:
      "①建模时按统一约定（如逆时针）写顶点 → ②顶点经顶点着色器投影到屏幕，朝你的面保持逆时针 = 正面、背你的面反转成顺时针 = 背面 → ③光栅化之前，`glCullFace(GL_BACK)` 把判成顺时针的背面直接丢弃 → ④背面连片段都不生成，只有正面留下照常画。封闭物体画面不变、省一半片段。",
    tags: ["面剔除", "链路", "综合"],
  },
  {
    id: "fc-51",
    chapter: "face-culling",
    level: 4,
    question:
      "照着教程设了 `glCullFace` / `glFrontFace`，性能却一点没省、背面照画。最可能漏了哪一步？这反映面剔除的什么特性？",
    answer:
      "最可能漏了 `glEnable(GL_CULL_FACE)` 这个总开关——它默认是关的，光设 `glCullFace` / `glFrontFace` 而不启用，面剔除根本没开工，还不报错。这反映：面剔除默认关闭、且配置与启用是分开的两步，少了启用一切配置都不生效。",
    tags: ["glEnable", "陷阱", "综合"],
  },
  {
    id: "fc-52",
    chapter: "face-culling",
    level: 4,
    question:
      "一个场景里既有封闭立方体、又有单面草，想全程开着面剔除又不让草破洞，怎么组织渲染？",
    answer:
      "全局 `glEnable(GL_CULL_FACE)`、`glCullFace(GL_BACK)` 让立方体省料；画到草这类单面 / 双面要看的物体前，临时 `glDisable(GL_CULL_FACE)`，画完立刻 `glEnable(GL_CULL_FACE)` 恢复。即「按物体类型局部开关」，封闭物体享受省料、单面网格不被剔破。",
    tags: ["面剔除", "单面网格", "综合"],
  },
];
