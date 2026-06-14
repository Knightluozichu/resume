/** 复习题库 · 混合（blending）。HEL-78 高级OpenGL篇。 */

import type { ReviewQuestion } from "./types";

export const blendingQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / 公式形状 / 调用） ──
  {
    id: "bd-1",
    chapter: "blending",
    level: 1,
    question: "什么是「混合」（blending）？一句话说清它做的事。",
    answer:
      "把正在画的「新颜色」（源色）按它的不透明度 alpha，和画布上「已有的颜色」（目标色）按比例相加，得到一个介于两者之间的颜色写回画布。这就是半透明物体能透出背景的原理。",
    tags: ["混合", "定义"],
  },
  {
    id: "bd-2",
    chapter: "blending",
    level: 1,
    question: "什么是「alpha 通道」？取值范围和含义？",
    answer:
      "颜色除红绿蓝（RGB）之外的第四个分量，记作 `a`，范围 0~1，表示这块颜色的**不透明度**：1 = 完全不透明（完全盖住背后）、0 = 完全透明（背后完全透出）、0.6 = 盖六成透四成。",
    tags: ["alpha通道", "定义"],
  },
  {
    id: "bd-3",
    chapter: "blending",
    level: 1,
    question: "用哪个调用启用混合？默认是开还是关？",
    answer:
      "用 `glEnable(GL_BLEND)` 启用。默认是**关**的——关着时新颜色直接覆盖旧颜色，没有「透」这回事。",
    tags: ["glEnable", "GL_BLEND"],
  },
  {
    id: "bd-4",
    chapter: "blending",
    level: 1,
    question: "写出混合方程（用 Csrc、Cdst、Fsrc、Fdst）。",
    answer:
      "混合方程：`C = Csrc·Fsrc + Cdst·Fdst`——源色乘源因子 + 目标色乘目标因子。因子是 0~1 的权重，由 `glBlendFunc` 指定，挑不同因子得到不同混合效果。",
    tags: ["混合方程", "公式"],
  },
  {
    id: "bd-5",
    chapter: "blending",
    level: 1,
    question: "什么是「源色」（Csrc）和「目标色」（Cdst）？",
    answer:
      "源色 `Csrc` 是正在画的这个片段算出来的颜色（前景）；目标色 `Cdst` 是画布（颜色缓冲）上该像素当前已经存着的颜色（背景）。混合就是把这两者按比例相加。",
    tags: ["源色", "目标色"],
  },
  {
    id: "bd-6",
    chapter: "blending",
    level: 1,
    question: "混合方程里「源因子 Fsrc」和「目标因子 Fdst」各控制什么？",
    answer:
      "`Fsrc`（源因子）控制「新颜色占多少」，`Fdst`（目标因子）控制「旧颜色透出多少」。这两个 0~1 的权重由你用 `glBlendFunc` 指定。",
    tags: ["源因子", "目标因子"],
  },
  {
    id: "bd-7",
    chapter: "blending",
    level: 1,
    question: "什么是「over 混合」？它的源因子、目标因子各取什么？",
    answer:
      "最常用的一种混合配法：源因子取源色的 alpha、目标因子取 1 减源色 alpha，于是结果 = `αsrc·Csrc + (1−αsrc)·Cdst`——前景占 αsrc、背景占剩下的，像把半透明颜料盖到画上。",
    tags: ["over混合", "定义"],
  },
  {
    id: "bd-8",
    chapter: "blending",
    level: 1,
    question: "over 混合用哪个 `glBlendFunc` 调用设定？",
    answer:
      "用 `glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA)`：第一个参数给源因子（= 源 alpha），第二个给目标因子（= 1 − 源 alpha）。",
    tags: ["glBlendFunc", "over混合"],
  },
  {
    id: "bd-9",
    chapter: "blending",
    level: 1,
    question: "`glBlendEquation` 是干什么的？默认是什么运算？",
    answer:
      "控制混合方程里源、目标两份是「相加」还是「相减」等。默认是相加 `GL_FUNC_ADD`（就是混合方程里那个加号），绝大多数场景不用动。",
    tags: ["glBlendEquation", "GL_FUNC_ADD"],
  },
  {
    id: "bd-10",
    chapter: "blending",
    level: 1,
    question: "片段着色器里的 `discard` 是什么？做什么用？",
    answer:
      "一条命令：一旦执行，当前片段就被立即丢弃，不再往后走、不进颜色缓冲（也不写深度）。常用来做**镂空**——纹理里 alpha 很小（接近全透明）的片段直接 `discard`，于是草、铁丝网的空隙被「抠掉」露出背后，得到清晰硬边。",
    tags: ["discard", "定义"],
  },
  {
    id: "bd-11",
    chapter: "blending",
    level: 1,
    question: "片段着色器里做镂空的那一行（或几行）怎么写？",
    answer:
      "采样纹理拿到 alpha，小于阈值就丢弃：\n`vec4 texColor = texture(texture1, TexCoords);`\n`if (texColor.a < 0.1) discard;`\n`FragColor = texColor;`",
    tags: ["discard", "代码"],
  },
  {
    id: "bd-12",
    chapter: "blending",
    level: 1,
    question: "什么是「半透明排序」问题？",
    answer:
      "画多个半透明物体时必须注意的绘制顺序问题。因为深度缓冲不区分透明：半透明物写颜色时也写下自己的深度，挡在它后面、之后才画的半透明物会被深度测试当成「更远」整片丢弃，于是透不出来、穿帮。",
    tags: ["半透明排序", "定义"],
  },
  {
    id: "bd-13",
    chapter: "blending",
    level: 1,
    question: "半透明物体正确的绘制顺序是什么？",
    answer:
      "先把所有**不透明物体**正常画完；再把**半透明物体从远到近排序**后逐块叠画（画半透明物时关掉深度写入）。",
    tags: ["半透明排序", "绘制顺序"],
  },
  {
    id: "bd-14",
    chapter: "blending",
    level: 1,
    question: "什么是「深度写入」？画半透明物时用哪个调用关掉它？",
    answer:
      "片段通过深度测试后，把自己的深度值写回深度缓冲的动作（默认开启）。画半透明物时用 `glDepthMask(GL_FALSE)` 把它关掉：让半透明物仍参与深度比较，但不把自己的深度写回去。画完记得恢复。",
    tags: ["深度写入", "glDepthMask"],
  },
  {
    id: "bd-15",
    chapter: "blending",
    level: 1,
    question: "混合在渲染管线里处在什么位置？",
    answer:
      "在最末端：一个片段先过深度测试、模板测试（前两章），通过了、轮到把颜色写进画布的那一刻——若开了混合，就不直接覆盖，而是把它和已有颜色按比例相加。混合发生在那些「测试工序」之后、写颜色那一刻。",
    tags: ["混合", "管线位置"],
  },
  {
    id: "bd-16",
    chapter: "blending",
    level: 1,
    question: "镂空贴图（草、铁丝网）该用 discard 还是 blend？",
    answer:
      "用 `discard`。草、铁丝网是「非透即不透」的二元透明，没有中间档，直接把全透明片段丢掉即可。连续半透明（玻璃、水）才用 blend。",
    tags: ["discard", "blend", "对比"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "bd-17",
    chapter: "blending",
    level: 2,
    question: "为什么前面几章那套画法画不出玻璃、薄纱这类半透明物？",
    answer:
      "因为每个片段要么把那个位置整个盖掉、要么因为更远被深度测试丢掉，没有「半盖半透」这个中间档。所有东西都硬邦邦地互相遮挡，没有「按比例透出背后」的能力——这正是混合要补上的。",
    tags: ["混合", "为什么"],
  },
  {
    id: "bd-18",
    chapter: "blending",
    level: 2,
    question: "over 混合里为什么两个因子取 αsrc 和 1−αsrc，而不是别的？",
    answer:
      "因为这俩权重加起来正好是 1（`αsrc + (1−αsrc) = 1`），前景占多少、背景就补上剩下的，总量守恒、不会越加越亮。这正好对应「颜料按浓度盖、背景按剩下的比例透出」的物理直觉。",
    tags: ["over混合", "为什么"],
  },
  {
    id: "bd-19",
    chapter: "blending",
    level: 2,
    question: "over 混合中，αsrc 越接近 1 和越接近 0，画面分别什么样？",
    answer:
      "αsrc 越接近 1，前景权重越大、越实、越盖住背景；越接近 0，前景越淡、背景透出越多。αsrc = 0.6 就是 0.6 份前景 + 0.4 份背景，前景盖六成、背景透四成。",
    tags: ["over混合", "alpha通道"],
  },
  {
    id: "bd-20",
    chapter: "blending",
    level: 2,
    question: "discard 和 blend 各适合什么？为什么不能混用错？",
    answer:
      "二元透明（草、铁丝网这类非透即不透）用 `discard` 抠硬边镂空；连续半透明（玻璃、水）用 `blend`。草用混合会把边缘半透明过渡像素也叠进去（常带贴图压缩白边），还平白多出排序烦恼；玻璃用 discard 则失去渐变、变成硬边。",
    tags: ["discard", "blend", "对比"],
  },
  {
    id: "bd-21",
    chapter: "blending",
    level: 2,
    question: "被 discard 的片段，会写颜色缓冲和深度缓冲吗？",
    answer:
      "都不写。被 `discard` 的片段直接被丢弃，相当于「这里什么都没画」——既不进颜色缓冲、也不写深度。于是空隙处露出背后，且不会用一个全透明片段的深度去挡住后面的东西。",
    tags: ["discard", "机制"],
  },
  {
    id: "bd-22",
    chapter: "blending",
    level: 2,
    question: "半透明物体为什么会互相穿帮？根子在哪？",
    answer:
      "根子是深度缓冲只记「多远」、不管透不透明。半透明物写颜色时也把自己的深度写进去，于是先画的近半透明物会把后画的远半透明物按「更远」整片丢弃——可它本该透过近的看到才对。结果后面的透不出来、穿帮。",
    tags: ["半透明排序", "成因"],
  },
  {
    id: "bd-23",
    chapter: "blending",
    level: 2,
    question: "为什么半透明物要「从远到近」画，而不是从近到远？",
    answer:
      "因为 over 混合是把前景叠在「已经画好的背景」上，要让远的先成为背景、近的后叠上去层层透出。从远到近逐块画，每块都叠在已画好的更远色之上，混合才正确；反过来先画近的，远的会被丢弃或叠错。",
    tags: ["半透明排序", "绘制顺序"],
  },
  {
    id: "bd-24",
    chapter: "blending",
    level: 2,
    question: "「关深度写入」和「关深度测试」有什么区别？画半透明物该用哪个？",
    answer:
      "`glDepthMask(false)` 关深度**写入**：让半透明物仍参与深度比较（被不透明物正确遮挡），只是不把自己深度写回去、免得互相挡掉。`glDisable(GL_DEPTH_TEST)` 关深度**测试**：连比较都不做，会让半透明物穿过不透明物。画半透明物该用前者。",
    tags: ["深度写入", "深度测试", "对比"],
  },
  {
    id: "bd-25",
    chapter: "blending",
    level: 2,
    question: "画半透明物时为什么要关深度写入、却不能关深度测试？",
    answer:
      "关深度写入是为了别让半透明物把自己的深度写回去挡掉后面的半透明物；但仍要保留深度测试（读深度比较），这样半透明物才能被前面的不透明物正确遮挡。两者都做到，才既不互相挡、又能被实体挡。",
    tags: ["深度写入", "深度测试"],
  },
  {
    id: "bd-26",
    chapter: "blending",
    level: 2,
    question: "镂空贴图（草）用 discard 时，需不需要排序？为什么？",
    answer:
      "不需要。`discard` 丢弃的片段既不写颜色也不写深度，保留下来的草叶片段是完全不透明的、正常写深度，所以草和普通不透明物一样靠深度测试自动遮挡——无需从远到近排序。这正是镂空相比半透明混合省事的地方。",
    tags: ["discard", "半透明排序"],
  },
  {
    id: "bd-27",
    chapter: "blending",
    level: 2,
    question: "over 混合为什么「不会越叠越亮」？",
    answer:
      "因为源因子 αsrc 和目标因子 1−αsrc 两份权重之和恒为 1，前景和背景的贡献此消彼长、总量守恒。换成别的因子（比如目标因子也设成 1），两份和就超过 1，叠出来会越来越亮甚至过曝。",
    tags: ["over混合", "机制"],
  },
  {
    id: "bd-28",
    chapter: "blending",
    level: 2,
    question: "为什么混合发生在管线最末端（写颜色那一刻），而不是更早？",
    answer:
      "因为混合要拿「正在画的源色」和「画布上已有的目标色」相加，必须等片段过完深度、模板等所有测试、确定要写进颜色缓冲的那一刻，才有「已有颜色」可混。放更早既没有确定的目标色、又可能混了又被后面的测试丢弃。",
    tags: ["混合", "管线位置"],
  },
  {
    id: "bd-29",
    chapter: "blending",
    level: 2,
    question: "为什么镂空 / 半透明纹理必须用带 alpha 的格式加载？",
    answer:
      "因为 `discard` 判定靠 `texColor.a`、混合靠源色 alpha。若用不带 alpha 的格式（如 GL_RGB）加载，片段着色器里根本拿不到真实 alpha，discard 和混合都失效——透明部分会显示成纯黑或纯白块。",
    tags: ["alpha通道", "纹理格式"],
  },
  {
    id: "bd-30",
    chapter: "blending",
    level: 2,
    question: "在混合方程 `C = Csrc·Fsrc + Cdst·Fdst` 里，glBlendFunc 的两个参数分别给谁？",
    answer:
      "`glBlendFunc(sfactor, dfactor)` 第一个参数给源因子 `Fsrc`（乘在源色 Csrc 上），第二个给目标因子 `Fdst`（乘在目标色 Cdst 上）。over 就是 `glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA)`。",
    tags: ["glBlendFunc", "混合方程"],
  },

  // ── L3 应用（读代码 / 给参数判结果 / 小计算） ──
  {
    id: "bd-31",
    chapter: "blending",
    level: 3,
    question:
      "over 混合，源色紫 Csrc、背景黄 Cdst，αsrc = 1 时重叠区是什么颜色？",
    answer:
      "几乎全是前景的紫。代入 `Csrc·1 + Cdst·(1−1) = Csrc`，前景权重为 1、背景权重为 0，前景完全盖住背景。",
    tags: ["over混合", "判结果"],
  },
  {
    id: "bd-32",
    chapter: "blending",
    level: 3,
    question:
      "over 混合，αsrc = 0 时重叠区是什么颜色？αsrc = 0.5 呢？",
    answer:
      "αsrc = 0：`Csrc·0 + Cdst·1 = Cdst`，几乎全是背景色（前景透没了）。αsrc = 0.5：`0.5·Csrc + 0.5·Cdst`，前景和背景各占一半的中间色。",
    tags: ["over混合", "判结果"],
  },
  {
    id: "bd-33",
    chapter: "blending",
    level: 3,
    question:
      "over 混合，源色 Csrc = (0.486, 0.361, 1)、背景 Cdst = (0.9, 0.7, 0.4)、αsrc = 0.6，结果颜色约是多少？",
    answer:
      "按 `0.6·Csrc + 0.4·Cdst` 逐分量算：R = 0.6×0.486 + 0.4×0.9 ≈ 0.652；G = 0.6×0.361 + 0.4×0.7 ≈ 0.497；B = 0.6×1 + 0.4×0.4 = 0.76。即约 (0.65, 0.50, 0.76)，偏前景紫但带点背景黄。",
    tags: ["over混合", "计算"],
  },
  {
    id: "bd-34",
    chapter: "blending",
    level: 3,
    question:
      "桌面 `glEnable(GL_BLEND)` + `glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA)` 在 WebGL2 里怎么写？",
    answer:
      "`gl.enable(gl.BLEND)` + `gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)`。常量去掉 `GL_` 前缀、挂到 `gl` 上即可，含义完全一致。",
    tags: ["WebGL2", "glBlendFunc"],
  },
  {
    id: "bd-35",
    chapter: "blending",
    level: 3,
    question:
      "镂空片段着色器在 C++（#version 330 core）和 WebGL2（#version 300 es）间差在哪？discard 那行要改吗？",
    answer:
      "只差版本声明和精度：桌面 `#version 330 core`，WebGL2 `#version 300 es` 且片段着色器必须多一行 `precision highp float;`。`discard`、`texture(...)` 采样、`if` 判定两端写法一字不差，不用改。",
    tags: ["WebGL2", "discard"],
  },
  {
    id: "bd-36",
    chapter: "blending",
    level: 3,
    question:
      "C++ 用 `std::map<float, vec3>` 按距离存半透明物，为什么用 `rbegin()` 反向遍历？",
    answer:
      "因为 `std::map` 按 key（距离）自动升序排列，正向是「近→远」。要从远到近画，得用 `rbegin()`/`rend()` 反向遍历，从最远的开始画。",
    tags: ["半透明排序", "代码"],
  },
  {
    id: "bd-37",
    chapter: "blending",
    level: 3,
    question:
      "TS/WebGL2 里把半透明物按距离排序，`Array.sort` 该升序还是降序？为什么？",
    answer:
      "按距离**降序**排（`(a, b) => dist(cam, b) − dist(cam, a)`），得到「远→近」，然后顺序遍历逐块画。和 C++ `std::map` + `rbegin()` 殊途同归，都是从最远的先画。",
    tags: ["半透明排序", "代码"],
  },
  {
    id: "bd-38",
    chapter: "blending",
    level: 3,
    question:
      "半透明排序代码里 `glDepthMask(GL_FALSE)` 放在哪一步？画完要做什么？",
    answer:
      "先画完所有不透明物（正常写深度），再 `glDepthMask(GL_FALSE)` 关深度写入，然后从远到近逐块画半透明物。画完必须 `glDepthMask(GL_TRUE)` 恢复，别污染下一帧。",
    tags: ["深度写入", "代码"],
  },
  {
    id: "bd-39",
    chapter: "blending",
    level: 3,
    question:
      "把目标因子从 `GL_ONE_MINUS_SRC_ALPHA` 改成 `GL_ONE`，αsrc=0.6 时会怎样？还算 over 吗？",
    answer:
      "背景全额保留（权重 1）+ 前景按 0.6 叠加，两份和超过 1，叠出来更亮、甚至过曝。这已**不是 over 混合**了——over 的定义就是 Fdst = 1−αsrc、两份权重和为 1。这更接近「加法混合」。",
    tags: ["glBlendFunc", "判结果"],
  },
  {
    id: "bd-40",
    chapter: "blending",
    level: 3,
    question:
      "看到 `glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA)` 这一行，能判断这是哪种混合？两个参数分别是谁？",
    answer:
      "这是 over 混合（«source over»）。第一个参数 `GL_SRC_ALPHA` 是源因子（= 源 alpha），第二个 `GL_ONE_MINUS_SRC_ALPHA` 是目标因子（= 1 − 源 alpha）。前景占 αsrc、背景占剩下的。",
    tags: ["glBlendFunc", "over混合"],
  },
  {
    id: "bd-41",
    chapter: "blending",
    level: 3,
    question:
      "镂空着色器里把阈值判断写成 `if (texColor.a < 0.1) discard;`，0.1 这个阈值起什么作用？",
    answer:
      "它是「多透明算全透明」的界线：alpha 小于 0.1（接近全透明）的片段被丢弃、抠空；alpha 大于等于 0.1 的保留、正常上色。阈值用来区分草叶（不透明）和空隙（透明），太高会啃掉边缘、太低会留下杂边。",
    tags: ["discard", "阈值"],
  },
  {
    id: "bd-42",
    chapter: "blending",
    level: 3,
    question:
      "想在不改 alpha 的前提下让背景透出更多，该把混合方程哪个因子改大？这还算 over 吗？",
    answer:
      "把**目标因子 Fdst**（乘在背景色上的权重）改大，比如从 `1−αsrc` 改成 `GL_ONE`。但这样就**不再是 over 混合**了——over 要求两份权重和为 1，把 Fdst 设成 1 会让总和超过 1、叠得更亮，是另一种混合。",
    tags: ["glBlendFunc", "应用"],
  },
  {
    id: "bd-43",
    chapter: "blending",
    level: 3,
    question:
      "草 / 窗户纹理贴上去，透明部分显示成纯黑或纯白块，怎么排查？",
    answer:
      "八成是纹理用了不带 alpha 的格式（如 GL_RGB）加载，`texColor.a` 拿不到真实 alpha，discard 和混合都失效。修法：镂空 / 半透明纹理改用带 alpha 的格式（`GL_RGBA` / `gl.RGBA`）加载，保证 a 通道有效。",
    tags: ["alpha通道", "排错"],
  },
  {
    id: "bd-44",
    chapter: "blending",
    level: 3,
    question:
      "WebGL2 里关 / 开深度写入分别怎么写？",
    answer:
      "关：`gl.depthMask(false)`；开（恢复）：`gl.depthMask(true)`。对应桌面的 `glDepthMask(GL_FALSE)` / `glDepthMask(GL_TRUE)`，画半透明物时关、画完恢复。",
    tags: ["WebGL2", "深度写入"],
  },
  {
    id: "bd-45",
    chapter: "blending",
    level: 3,
    question:
      "半透明排序 Demo 里「乱序随便画」时，先画最近那块、再画后面两块，后面两块会怎样？",
    answer:
      "后面两块会「消失」。最近那块把自己的深度写进了缓冲，之后画的更远两块被深度测试当成「更远」整片丢弃——可它们是半透明的本该透出来，结果穿帮。这就是没排序 + 没关深度写入的后果。",
    tags: ["半透明排序", "Demo"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 边界） ──
  {
    id: "bd-46",
    chapter: "blending",
    level: 4,
    question:
      "几块半透明玻璃画出来互相穿帮、后面的透不出来。有人怀疑 `glBlendFunc` 设错，对吗？真正原因和修法？",
    answer:
      "多半不是 `glBlendFunc`（over 因子若是对的）。真正原因是半透明物**没排序 / 没关深度写入**：玻璃写颜色时也写了深度，先画近的会把后画的远的整片丢弃。修法：先画不透明物；再把半透明物**从远到近**排序、`glDepthMask(GL_FALSE)` 关深度写入后逐块画，画完 `glDepthMask(GL_TRUE)` 恢复。注意别去关深度测试本身。",
    tags: ["半透明排序", "陷阱", "综合"],
  },
  {
    id: "bd-47",
    chapter: "blending",
    level: 4,
    question:
      "半透明穿帮的两招修法分别解决什么子问题？为什么缺一不可？",
    answer:
      "①「先画所有不透明物」保证半透明物之后能被实体正确遮挡（深度缓冲已记下实体）；②「半透明物从远到近 + 关深度写入」保证它们彼此能层层透出、不互相挡。少了①半透明物可能穿过实体，少了②半透明物之间仍互相丢弃，所以两招配合才完整。",
    tags: ["半透明排序", "综合"],
  },
  {
    id: "bd-48",
    chapter: "blending",
    level: 4,
    question:
      "开了混合后画面过曝发白、或该半透却完全盖死。可能是哪里设错？怎么修回 over？",
    answer:
      "多半是 `glBlendFunc` 因子设错：把目标因子写成 `GL_ONE`（背景全额 + 前景全额 → 越叠越亮、过曝），或源 / 目标因子写反、漏了 `GL_ONE_MINUS_SRC_ALPHA`。修法：over 就用 `glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA)` 这一对，源 alpha 配「1 − 源 alpha」、两份权重和为 1，才不会越叠越亮。",
    tags: ["glBlendFunc", "陷阱"],
  },
  {
    id: "bd-49",
    chapter: "blending",
    level: 4,
    question:
      "本该用 discard 的草贴图改用了混合，会出什么毛病？为什么 discard 更合适？",
    answer:
      "草叶边缘出现一圈奇怪的半透明白边（混合把边缘半透明过渡像素也叠进去，常带贴图压缩白边），还平白多出排序烦恼。草是「非透即不透」的二元透明，用 discard 直接把全透明片段扔掉，得到干净硬边、还**不必排序**（不写半透明深度）。",
    tags: ["discard", "blend", "陷阱"],
  },
  {
    id: "bd-50",
    chapter: "blending",
    level: 4,
    question:
      "把半透明物的深度写入关了、又顺手关了深度测试，会出什么新问题？",
    answer:
      "关深度测试后半透明物连深度比较都不做，会直接**穿过不透明物**显示出来（本该被墙挡住的玻璃跑到墙前面）。正解只关深度写入 `glDepthMask(GL_FALSE)`、保留深度测试——半透明物仍被不透明物正确遮挡，只是不互相写深度挡掉。",
    tags: ["深度写入", "深度测试", "陷阱"],
  },
  {
    id: "bd-51",
    chapter: "blending",
    level: 4,
    question:
      "把半透明穿帮从「深度缓冲不分透明」这个根源讲到屏幕上的消失，串一条完整链路。",
    answer:
      "① 深度缓冲只记多远、不管透明 → ② 先画的近半透明物把自己的深度写进缓冲 → ③ 后画的远半透明物被深度测试判为「更远」整片丢弃 → ④ 可它本是半透明、本该透过近的看到 → ⑤ 屏幕上后面那块「消失」、穿帮。修法对症在②③：关深度写入（不写自己深度）+ 从远到近排序（让叠加顺序正确）。",
    tags: ["半透明排序", "综合"],
  },
  {
    id: "bd-52",
    chapter: "blending",
    level: 4,
    question:
      "为什么 discard 镂空不用排序、半透明混合却必须排序？把两者机制对照清楚。",
    answer:
      "discard 把全透明片段彻底丢弃、保留的都是完全不透明片段，正常写深度、靠深度测试自动遮挡，和普通实体一样无需排序。半透明混合保留的是「半透明片段」，它要叠在「已画好的更远背景」上，叠加顺序影响结果，且写深度会互相挡——所以必须先画远的、关深度写入。一个是「非黑即白靠测试」、一个是「连续叠加靠顺序」。",
    tags: ["discard", "半透明排序", "综合"],
  },
  {
    id: "bd-53",
    chapter: "blending",
    level: 4,
    question:
      "学习目标自测：场景里几块半透明玻璃互相穿帮、后面透不出来，是什么原因？该怎么画才对？",
    answer:
      "原因是半透明排序问题：深度缓冲不分透明，先画的近玻璃写了深度，把后画的远玻璃按「更远」丢弃，于是后面透不出来。正确画法：先画所有不透明物；再把半透明玻璃**从远到近**排序、`glDepthMask(GL_FALSE)` 关深度写入后逐块画，画完 `glDepthMask(GL_TRUE)` 恢复（别关深度测试）。",
    tags: ["半透明排序", "综合"],
  },
  {
    id: "bd-54",
    chapter: "blending",
    level: 4,
    question:
      "over 混合公式 `αsrc·Csrc + (1−αsrc)·Cdst` 里，为什么 `glDepthMask` 不影响这条公式本身、却影响最终画面？",
    answer:
      "`glDepthMask` 不在混合公式里、不改 Csrc/Cdst/αsrc 任何一项，所以单块的混合结果一样。但它决定半透明物写不写深度——关系到「画到这块像素时背景 Cdst 是哪一层颜色」。没关深度写入会让后面的半透明物被丢弃，根本走不到混合这步，于是 Cdst 错、最终画面穿帮。它影响的是「谁能参与混合」，而非混合算式。",
    tags: ["深度写入", "over混合", "综合"],
  },
  {
    id: "bd-55",
    chapter: "blending",
    level: 4,
    question:
      "把本章三块代码（开混合设因子 / discard 镂空 / 半透明排序+关深度写入）按一帧的实际渲染流程串起来，顺序是什么？",
    answer:
      "一帧里：① 初始化阶段（或画半透明前）`glEnable(GL_BLEND)` + `glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA)` 设好 over；② 先画所有不透明物（含草这类用 discard 镂空的，正常写深度、不必排序）；③ 再把半透明物从远到近排序，`glDepthMask(GL_FALSE)` 关深度写入后逐块 over 叠画；④ `glDepthMask(GL_TRUE)` 恢复。镂空走 discard 归在不透明那批、连续半透明走 blend 归在最后那批。",
    tags: ["混合", "discard", "半透明排序", "综合"],
  },
];
