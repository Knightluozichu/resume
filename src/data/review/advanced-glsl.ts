/** 复习题库 · 高级 GLSL（advanced-glsl）。HEL-78 高级OpenGL篇。 */

import type { ReviewQuestion } from "./types";

export const advancedGlslQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / 内建变量含义 / 对齐数值） ──
  {
    id: "ag-1",
    chapter: "advanced-glsl",
    level: 1,
    question: "什么是「内建变量」（built-in variable）？名字有什么特征？",
    answer:
      "GLSL 预先定义好、有固定含义、**不用你声明就能直接读写**的特殊变量，名字都以 `gl_` 开头。它们由渲染流水线在对应阶段自动填好，读对应「工牌」就能拿到流水线算好的信息。",
    tags: ["内建变量", "定义"],
  },
  {
    id: "ag-2",
    chapter: "advanced-glsl",
    level: 1,
    question: "`gl_Position` 是什么内建变量？输入还是输出？",
    answer:
      "顶点着色器里的**输出**内建变量，写的是顶点的**最终位置（裁剪坐标）**。「你好三角形」「坐标系统」章一直在用它。",
    tags: ["gl_Position", "内建变量"],
  },
  {
    id: "ag-3",
    chapter: "advanced-glsl",
    level: 1,
    question: "`gl_PointSize` 是干什么的？",
    answer:
      "顶点着色器里的**输出**内建变量：用 `GL_POINTS` 画点时，控制每个点画**多大**。",
    tags: ["gl_PointSize", "内建变量"],
  },
  {
    id: "ag-4",
    chapter: "advanced-glsl",
    level: 1,
    question: "`gl_VertexID` 装的是什么？",
    answer:
      "顶点着色器里的**输入**内建变量：当前正在处理的是**第几个顶点**（一个整数索引）。",
    tags: ["gl_VertexID", "内建变量"],
  },
  {
    id: "ag-5",
    chapter: "advanced-glsl",
    level: 1,
    question: "`gl_FragCoord` 在哪个着色器里、装的是什么？",
    answer:
      "片段着色器里的**只读**内建变量，装当前片段在画布上的**窗口像素坐标**：`xy` 是像素位置（原点在画布**左下角**，向右是 `x`、向上是 `y`），`z` 是这个片段的深度值。",
    tags: ["gl_FragCoord", "内建变量"],
  },
  {
    id: "ag-6",
    chapter: "advanced-glsl",
    level: 1,
    question: "`gl_FragCoord.xy` 是 NDC（-1..1）还是像素值？",
    answer:
      "是**像素值**——`x` 从 0 到画布宽、`y` 从 0 到画布高，**不是** -1 到 1 的 NDC。想归一化到 0..1 得**除以画布分辨率**。",
    tags: ["gl_FragCoord", "NDC"],
  },
  {
    id: "ag-7",
    chapter: "advanced-glsl",
    level: 1,
    question: "`gl_FrontFacing` 是什么类型、表示什么？",
    answer:
      "片段着色器里的只读**布尔**内建变量：当前片段在物体**正面**就是 `true`、在**背面**就是 `false`。常用来给正反两面上不同的颜色或纹理。",
    tags: ["gl_FrontFacing", "内建变量"],
  },
  {
    id: "ag-8",
    chapter: "advanced-glsl",
    level: 1,
    question: "`gl_FragDepth` 是干什么的？输入还是输出？",
    answer:
      "片段着色器里的**可写**内建变量，让你**手动指定这个片段的深度值**（覆盖流水线自动算的那个 `gl_FragCoord.z`）。",
    tags: ["gl_FragDepth", "内建变量"],
  },
  {
    id: "ag-9",
    chapter: "advanced-glsl",
    level: 1,
    question: "在着色器里写 `gl_FragDepth` 有什么代价？",
    answer:
      "一旦写了它，GPU 就**没法在跑片段着色器之前提前做深度测试**（提前深度测试 / early depth test）——因为它不知道你要把深度改成多少，只能等着色器跑完才测，性能下降。所以非必要别写。",
    tags: ["gl_FragDepth", "提前深度测试"],
  },
  {
    id: "ag-10",
    chapter: "advanced-glsl",
    level: 1,
    question: "什么是「接口块」（interface block）？",
    answer:
      "把一组要在着色器之间传递的 `in` 或 `out` 变量，用一个**有名字的块**打包起来**整组传**，而不是一个个零散声明。传一大组数据时命名整洁、不易写错。",
    tags: ["接口块", "定义"],
  },
  {
    id: "ag-11",
    chapter: "advanced-glsl",
    level: 1,
    question: "接口块的「块名」和「实例名」哪个两端必须一致、哪个可以不同？",
    answer:
      "**块名**（如 `VS_OUT`）两端**必须一致**（靠它配对）；**实例名**（如 `vs_out` / `fs_in`，块在本段里的代号）两端**可以不同**。",
    tags: ["接口块", "块名", "实例名"],
  },
  {
    id: "ag-12",
    chapter: "advanced-glsl",
    level: 1,
    question: "什么是「Uniform 缓冲对象」（UBO）？",
    answer:
      "一块能被**多个着色器程序共享**的 uniform 数据缓冲（Uniform Buffer Object）。把一组常用 uniform（如投影、视图矩阵）放进这块缓冲，经一个「绑定点」同时接到多个程序；改一次缓冲，所有连着它的程序立刻读到新值。",
    tags: ["Uniform 缓冲对象", "UBO", "定义"],
  },
  {
    id: "ag-13",
    chapter: "advanced-glsl",
    level: 1,
    question: "什么是「绑定点」（binding point）？",
    answer:
      "一个带编号的「插座」。UBO 缓冲插在某个编号上，多个着色器程序也都声明连到同一个编号，于是它们就共享了这块缓冲。编号对齐，连接才成立。",
    tags: ["绑定点", "定义"],
  },
  {
    id: "ag-14",
    chapter: "advanced-glsl",
    level: 1,
    question: "什么是「std140 布局」？它解决什么问题？",
    answer:
      "UBO 缓冲里成员怎么摆放（每个成员从第几字节开始）的一套**对齐规则**。它让 CPU 和 GPU 对「数据怎么摆」达成一致，CPU 照这套偏移写、GPU 才能读对，跨平台可预测。",
    tags: ["std140 布局", "定义"],
  },
  {
    id: "ag-15",
    chapter: "advanced-glsl",
    level: 1,
    question:
      "std140 里 `float`、`vec2`、`vec3`、`vec4` 的对齐量各是多少字节？",
    answer:
      "标量 `float`/`int` 对齐 **4** 字节、`vec2` 对齐 **8** 字节、`vec3` 和 `vec4` **都对齐 16** 字节。所以 `vec3` 虽只有 3 个数，也要吃满 16 字节（后面补 padding）。",
    tags: ["std140 布局", "对齐"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "ag-16",
    chapter: "advanced-glsl",
    level: 2,
    question: "为什么说内建变量像「流水线发的免费工牌」？读它有什么好处？",
    answer:
      "因为流水线在每个工位自动把这些信息算好填进内建变量，你不用自己费劲算——比如「这个像素在画布哪个格子」`gl_FragCoord`、「这一面是正还是背」`gl_FrontFacing`，低头看一眼工牌就知道，省掉本该流水线告诉你的计算。",
    tags: ["内建变量", "为什么"],
  },
  {
    id: "ag-17",
    chapter: "advanced-glsl",
    level: 2,
    question: "内建变量分「输入」和「输出」两类，怎么区分？各举一例。",
    answer:
      "**输出**是你往上写、告诉流水线结果（如 `gl_Position` 写顶点位置、`gl_FragDepth` 写深度）；**输入**是流水线填好给你读（如 `gl_FragCoord` 读像素坐标、`gl_FrontFacing` 读正反面、`gl_VertexID` 读顶点序号）。",
    tags: ["内建变量", "对比"],
  },
  {
    id: "ag-18",
    chapter: "advanced-glsl",
    level: 2,
    question: "片段着色器对每个像素各跑一遍，它怎么知道自己在画哪个像素？",
    answer:
      "读 `gl_FragCoord` 这块工牌：它的 `xy` 就是这个片段的屏幕像素坐标（原点左下角）。流水线在光栅化后自动把每个片段的位置填进去，片段着色器一读就知道「我是哪个像素」。",
    tags: ["gl_FragCoord", "机制"],
  },
  {
    id: "ag-19",
    chapter: "advanced-glsl",
    level: 2,
    question: "为什么想用 `gl_FragCoord` 做屏幕分屏，要先除以分辨率？",
    answer:
      "因为 `gl_FragCoord.x` 是 0..画布宽的像素值，直接和 0.5、1.0 这种小数比几乎处处不成立。除以 `uResolution.x` 把它归一化到 0..1 的比例，才能和「分界线位置」这种 0..1 的数比较，分屏才对得上直觉。",
    tags: ["gl_FragCoord", "分屏"],
  },
  {
    id: "ag-20",
    chapter: "advanced-glsl",
    level: 2,
    question: "想用 `gl_FrontFacing` 看到背面，为什么通常得先关掉面剔除？",
    answer:
      "因为面剔除会在更早的阶段就把背面剔掉、根本不进片段着色器，那 `gl_FrontFacing` 也就永远读不到 `false`。要给背面单独上色，得先 `glDisable(GL_CULL_FACE)` 让背面进到片段着色器。",
    tags: ["gl_FrontFacing", "面剔除"],
  },
  {
    id: "ag-21",
    chapter: "advanced-glsl",
    level: 2,
    question: "写 `gl_FragDepth` 为什么会让「提前深度测试」失效？",
    answer:
      "正常时 GPU 在跑片段着色器**之前**就能用 `gl_FragCoord.z` 提前测深度、剔掉被挡的片段省得白算颜色。但你一旦在着色器里写 `gl_FragDepth`，GPU 没法预知你要写成多少，只能**等片段着色器跑完**才能测——提前优化就泡汤了。",
    tags: ["gl_FragDepth", "提前深度测试", "为什么"],
  },
  {
    id: "ag-22",
    chapter: "advanced-glsl",
    level: 2,
    question: "接口块解决了普通 `in/out` 的什么痛点？它改变数据怎么流吗？",
    answer:
      "痛点：要传的东西一多（纹理坐标、法线、世界坐标……），一根根 `out` 再一根根 `in`，又长又乱、容易把名字写岔对不上。接口块把它们打包成一个有名字的块整组传，命名整洁。它**不改变数据怎么流**（还是顶点→片段、照样插值），只是组织方式更整洁。",
    tags: ["接口块", "为什么"],
  },
  {
    id: "ag-23",
    chapter: "advanced-glsl",
    level: 2,
    question: "不用 UBO 时，多个着色器程序共享投影/视图矩阵有什么麻烦？",
    answer:
      "每个程序都各存一份 uniform，改一次相机 CPU 就得**挨个程序各上传一遍**——三个程序传三遍、五个传五遍，既冗余又容易漏掉某一个，漏了那个画面就和别人对不上。",
    tags: ["UBO", "为什么"],
  },
  {
    id: "ag-24",
    chapter: "advanced-glsl",
    level: 2,
    question: "UBO 怎么做到「改一次、全体生效」？",
    answer:
      "把共享数据放进一块缓冲、让它插在某个绑定点上，每个程序也都声明连同一个绑定点。于是 CPU 只往这块缓冲**写一次**，所有连着它的程序立刻全读到新值，不必逐个程序各传一遍。",
    tags: ["UBO", "机制"],
  },
  {
    id: "ag-25",
    chapter: "advanced-glsl",
    level: 2,
    question: "为什么 UBO 必须约定 std140 这套对齐规则？不约定会怎样？",
    answer:
      "因为 CPU 写数据和 GPU 读数据必须对「每个成员从第几字节开始」**达成一致**。不约定（或算错）就会 CPU 写在这、GPU 读在那，全部错位——矩阵乱、物体扭曲。std140 是显式、可预测、跨平台一致的约定。",
    tags: ["std140 布局", "为什么"],
  },
  {
    id: "ag-26",
    chapter: "advanced-glsl",
    level: 2,
    question:
      "std140 里 `vec3` 为什么会「吃满 16 字节」？这条规则的直觉口诀是什么？",
    answer:
      "因为 std140 规定 `vec3` 的对齐量是 16，所以它虽只有 3 个数（12 字节），后面也要补一段空白 padding 凑满 16。直觉口诀：**std140 里万物向 16 字节对齐看齐**。",
    tags: ["std140 布局", "vec3", "padding"],
  },
  {
    id: "ag-27",
    chapter: "advanced-glsl",
    level: 2,
    question: "std140 里 `mat4` 是怎么算字节的？",
    answer:
      "`mat4` 当成 **4 个 `vec4`** 算，每个 `vec4` 占 16 字节，所以一个 `mat4` 占 `4×16 = 64` 字节。两个 `mat4`（如 projection + view）总共 128 字节，view 紧跟在偏移 64。",
    tags: ["std140 布局", "mat4"],
  },
  {
    id: "ag-28",
    chapter: "advanced-glsl",
    level: 2,
    question:
      "在 GLSL 的 UBO 块里，成员是用「实例名.成员」访问还是直接当全局变量？",
    answer:
      "`layout(std140) uniform Matrices { ... }` 这种**无实例名**的 uniform 块，块里成员**直接当全局变量用**（如直接写 `projection`、`view`），不用写实例名前缀。这和接口块（要写 `vs_out.成员`）不同。",
    tags: ["UBO", "uniform 块"],
  },
  {
    id: "ag-29",
    chapter: "advanced-glsl",
    level: 2,
    question: "UBO 这套机制里，哪些数据该放进 UBO 共享、哪些仍走普通 uniform？",
    answer:
      "**多个着色器都要用同一份**的数据（如投影、视图矩阵）放进 UBO 共享；**各物体各不相同**的数据（如每个物体自己的 model 模型矩阵）仍走普通 `uniform`、逐个程序各传。",
    tags: ["UBO", "uniform"],
  },

  // ── L3 应用（读代码 / 给参数算偏移 / WebGL2 写法） ──
  {
    id: "ag-30",
    chapter: "advanced-glsl",
    level: 3,
    question: "片段着色器里读 `gl_FragCoord.x` 做左右分屏，归一化那行怎么写？",
    answer:
      "`float norm = gl_FragCoord.x / uResolution.x;`——把窗口像素 x 坐标除以画布宽，得到 0..1 的水平比例，再拿 norm 和分界线位置比较（小的涂左色、大的涂右色）。",
    tags: ["gl_FragCoord", "分屏", "代码"],
  },
  {
    id: "ag-31",
    chapter: "advanced-glsl",
    level: 3,
    question:
      "分屏 Demo 里把 `uSplit` 滑到最右（1），画面会变成什么样？为什么？",
    answer:
      "几乎被**左色铺满**。因为 `uSplit=1` 时，几乎每个像素的 `norm`（0..1）都比 1 小、都判进「左边」（`norm < uSplit` 处处成立），所以基本全是左色。",
    tags: ["gl_FragCoord", "分屏", "判结果"],
  },
  {
    id: "ag-32",
    chapter: "advanced-glsl",
    level: 3,
    question:
      "想把左右分屏改成上下分屏，`norm` 那行怎么改？为什么 norm 小的是下半？",
    answer:
      "改成 `float norm = gl_FragCoord.y / uResolution.y;`（换分量 + 换对应分辨率）。因为 `gl_FragCoord` 原点在画布**左下角**、`y` 向上增大，所以 norm 小的是**下半**、大的是**上半**，分界线成了水平线。",
    tags: ["gl_FragCoord", "分屏", "改代码"],
  },
  {
    id: "ag-33",
    chapter: "advanced-glsl",
    level: 3,
    question: "片段着色器里用 `gl_FrontFacing` 把背面压暗一句怎么写？",
    answer:
      "`if (!gl_FrontFacing) col = col * 0.3;`——`gl_FrontFacing` 为 `false`（背面）时把颜色乘 0.3 压暗。或用三元 `gl_FrontFacing ? frontColor : backColor` 给正反不同色。",
    tags: ["gl_FrontFacing", "代码"],
  },
  {
    id: "ag-34",
    chapter: "advanced-glsl",
    level: 3,
    question:
      "顶点端接口块 `out VS_OUT { vec2 TexCoords; } vs_out;`，片段端怎么接住？",
    answer:
      "片段端写同名块 `in VS_OUT { vec2 TexCoords; } fs_in;`——块名 `VS_OUT` **必须一致**，实例名 `fs_in` 可和顶点端的 `vs_out` 不同。块内成员用 `fs_in.TexCoords` 点号访问。",
    tags: ["接口块", "代码"],
  },
  {
    id: "ag-35",
    chapter: "advanced-glsl",
    level: 3,
    question:
      "GLSL 里声明一个 std140 的 UBO 块（含 projection、view 两个 mat4）怎么写？view 的偏移是多少？",
    answer:
      "`layout (std140) uniform Matrices { mat4 projection; mat4 view; };`。`projection` 在偏移 **0**，`mat4` 占 64 字节，所以 `view` 紧跟在偏移 **64**。块内成员直接当全局变量用。",
    tags: ["UBO", "std140 布局", "代码"],
  },
  {
    id: "ag-36",
    chapter: "advanced-glsl",
    level: 3,
    question:
      "WebGL2 里建 UBO（2 个 mat4 的空间）、接到 0 号绑定点，两行怎么写？",
    answer:
      "`const ubo = gl.createBuffer(); gl.bindBuffer(gl.UNIFORM_BUFFER, ubo); gl.bufferData(gl.UNIFORM_BUFFER, 2*64, gl.STATIC_DRAW);` 开 128 字节空间；再 `gl.bindBufferBase(gl.UNIFORM_BUFFER, 0, ubo)` 把缓冲接到 0 号绑定点。",
    tags: ["WebGL2", "UBO", "代码"],
  },
  {
    id: "ag-37",
    chapter: "advanced-glsl",
    level: 3,
    question:
      "WebGL2 里把某程序的 `Matrices` 块也指到 0 号绑定点，两行怎么写？",
    answer:
      '`const idx = gl.getUniformBlockIndex(program, "Matrices");` 拿到块在该程序里的索引，再 `gl.uniformBlockBinding(program, idx, 0);` 把它指到 0 号绑定点。每个要共享的程序都来一遍。',
    tags: ["WebGL2", "UBO", "绑定点"],
  },
  {
    id: "ag-38",
    chapter: "advanced-glsl",
    level: 3,
    question:
      "WebGL2 里按 std140 偏移往 UBO 填 projection、view 两个矩阵，怎么写？",
    answer:
      "`gl.bindBuffer(gl.UNIFORM_BUFFER, ubo);` 后：`gl.bufferSubData(gl.UNIFORM_BUFFER, 0, projection);`（偏移 0）和 `gl.bufferSubData(gl.UNIFORM_BUFFER, 64, view);`（偏移 64）。两个矩阵都是 `Float32Array(16)`。",
    tags: ["WebGL2", "UBO", "bufferSubData"],
  },
  {
    id: "ag-39",
    chapter: "advanced-glsl",
    level: 3,
    question:
      "一个 std140 块依次是 `float a; vec3 b; vec2 c;`，三者起始字节偏移各是多少？",
    answer:
      "`a`（float）偏移 **0**，占 4 字节；`b`（vec3）偏移 **16**（不是 4！vec3 对齐 16，a 后面 4~15 是 padding），吃满到 32；`c`（vec2）偏移 **32**（vec2 对齐 8，32 已是 8 的倍数，紧接 b）。",
    tags: ["std140 布局", "计算"],
  },
  {
    id: "ag-40",
    chapter: "advanced-glsl",
    level: 3,
    question:
      "一个 std140 块依次是 `vec2 a; float b; vec4 c;`，三者起始偏移各多少？",
    answer:
      "`a`（vec2）偏移 **0**，占 8 字节；`b`（float）偏移 **8**（float 对齐 4，8 是 4 的倍数），占 4 字节、到 12；`c`（vec4）偏移 **16**（vec4 对齐 16，12 不是 16 的倍数，跳到 16，12~15 是 padding）。",
    tags: ["std140 布局", "计算"],
  },
  {
    id: "ag-41",
    chapter: "advanced-glsl",
    level: 3,
    question: "桌面 `glDisable(GL_CULL_FACE)`（为看背面）在 WebGL2 里怎么写？",
    answer:
      "写成 `gl.disable(gl.CULL_FACE)`。关掉面剔除后背面才进片段着色器，`gl_FrontFacing` 才能读到 `false`、给背面单独上色。",
    tags: ["WebGL2", "面剔除", "gl_FrontFacing"],
  },
  {
    id: "ag-42",
    chapter: "advanced-glsl",
    level: 3,
    question:
      "内建变量那段片段着色器代码，桌面 GLSL 330 和 WebGL2 GLSL 300 es 有哪两处差异？",
    answer:
      "只有版本声明和精度声明两处不同：桌面写 `#version 330 core`；WebGL2 写 `#version 300 es` 且片段着色器多一行 `precision highp float;`。读 `gl_FragCoord`/`gl_FrontFacing` 的逻辑两端**一字不差**——内建变量是 GLSL 语言本身的东西。",
    tags: ["WebGL2", "API差异", "内建变量"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 边界） ──
  {
    id: "ag-43",
    chapter: "advanced-glsl",
    level: 4,
    question:
      "本想用 `gl_FragCoord` 做屏幕分屏/渐变，画面要么全一色、要么花得没规律。原因和修法？",
    answer:
      "原因：把 `gl_FragCoord.xy` 当成 NDC（-1..1）用了——它其实是**窗口像素坐标**（x 从 0 到画布宽、y 从 0 到画布高），直接和 0.5、1.0 比几乎处处不成立。修法：先**除以 `uResolution`** 归一化到 0..1 再比较（`gl_FragCoord.x / uResolution.x`），就和直觉对上了。",
    tags: ["gl_FragCoord", "NDC", "陷阱"],
  },
  {
    id: "ag-44",
    chapter: "advanced-glsl",
    level: 4,
    question:
      "UBO 里的矩阵全乱、物体扭曲，或某个成员读出来是垃圾值。最可能的原因和修法？",
    answer:
      "原因多半是 **std140 对齐 / padding 算错**：最常见是以为 `vec3` 占 12 字节，于是把下一个成员偏移算少了 4——可 std140 里 `vec3` 要**吃满 16 字节**（后面有 padding）。修法：照 std140 规则重算偏移（vec3/vec4/mat4 列都对齐 16），`bufferSubData` 的 offset 按这套来；拿不准就把每个成员当 `vec4` 倍数对齐，最稳。",
    tags: ["std140 布局", "陷阱", "padding"],
  },
  {
    id: "ag-45",
    chapter: "advanced-glsl",
    level: 4,
    question:
      "用了 UBO，但着色器读到的矩阵根本不对（像没更新、或读到另一组数据）。怎么排？",
    answer:
      "重点查**绑定点编号对不对齐**：CPU 侧 `bindBufferBase` 把缓冲接到的编号（如 0），必须和 `uniformBlockBinding` 给每个程序块设的编号相同。若一个设 0、另一个设 1，程序就去错插座读、读到错数据。修法：让缓冲接的绑定点、每个程序块绑的绑定点用**同一个数字**，逐处核对。",
    tags: ["UBO", "绑定点", "陷阱"],
  },
  {
    id: "ag-46",
    chapter: "advanced-glsl",
    level: 4,
    question:
      "在片段着色器里写了 `gl_FragDepth` 后，画面没变、帧率却掉了一截。为什么？怎么办？",
    answer:
      "因为一旦写 `gl_FragDepth`，GPU 没法在跑片段着色器**之前**提前做深度测试（不知道你要把深度改成多少），只能等着色器跑完再测，**提前深度测试**优化失效，所以帧率掉。修法：**非必要别写** `gl_FragDepth`，正常深度用流水线自动算的就好。",
    tags: ["gl_FragDepth", "提前深度测试", "陷阱"],
  },
  {
    id: "ag-47",
    chapter: "advanced-glsl",
    level: 4,
    question:
      "某人 `glBindBufferBase(..., 0, ubo)` 但 `glUniformBlockBinding(shader, idx, 1)`，物体位置完全不对。问题和改法？",
    answer:
      "问题在**绑定点编号对不上**：缓冲接到了 **0** 号绑定点，着色器的 `Matrices` 块却绑到了 **1** 号——两者不是同一个插座，着色器去 1 号读、那里没有缓冲，于是矩阵全错、物体位置不对。改法：让两处编号**完全一致**——把 `1` 改成 `0`（或反过来），只要缓冲接的和程序块绑的是同一个数字就行。",
    tags: ["UBO", "绑定点", "排错", "综合"],
  },
  {
    id: "ag-48",
    chapter: "advanced-glsl",
    level: 4,
    question:
      "「UBO 块成员要用实例名前缀、接口块成员直接当全局变量」——这说法对吗？纠正一下。",
    answer:
      "说反了。**无实例名的 uniform 块**（UBO，如 `uniform Matrices { mat4 projection; }`）成员**直接当全局变量用**（写 `projection`）；而**接口块**（如 `out VS_OUT { ... } vs_out;`）有实例名，成员要用**实例名前缀**（写 `vs_out.TexCoords`）。两者访问方式正好相反，别混。",
    tags: ["UBO", "接口块", "综合", "边界"],
  },
  {
    id: "ag-49",
    chapter: "advanced-glsl",
    level: 4,
    question:
      "把 UBO 共享投影/视图矩阵这条链路从「CPU 写缓冲」到「多个着色器读到新值」串一遍，关键三步是什么？",
    answer:
      "① 建缓冲并按 std140 开好空间，用 `bindBufferBase` 把缓冲接到某绑定点（如 0）；② 用 `getUniformBlockIndex` + `uniformBlockBinding` 把每个程序的块也指到同一绑定点；③ 相机一变就 `bufferSubData` 按 std140 偏移往缓冲写一次 projection/view——连着该绑定点的所有程序立刻全更新。两个对齐（绑定点编号、std140 偏移）必须扣死。",
    tags: ["UBO", "绑定点", "std140 布局", "综合"],
  },
  {
    id: "ag-50",
    chapter: "advanced-glsl",
    level: 4,
    question:
      "std140 块 `float a; vec3 b; vec2 c;`，若按「紧密排列」CPU 把 b 写在偏移 4、c 写在偏移 16，GPU 读出来会怎样？",
    answer:
      "全错位。GPU 按 std140 认为 `b` 在偏移 16（不是 4）、`c` 在 32（不是 16）。CPU 写在 4 的 b，GPU 在 16 处读到的是 CPU 本意写给别处的字节，b、c 全读成垃圾值。修法：CPU 必须照 std140（b@16、c@32）摆，不能用 C 结构体那种紧密排列，否则全乱。",
    tags: ["std140 布局", "陷阱", "边界", "综合"],
  },
  {
    id: "ag-51",
    chapter: "advanced-glsl",
    level: 4,
    question:
      "`gl_FragCoord`（输入只读）和 `gl_FragDepth`（输出可写）都涉及片段深度，三句话说清它们的分工和取舍。",
    answer:
      "`gl_FragCoord.z` 是流水线**自动算好、只读**的当前片段深度，平时读它就够；`gl_FragDepth` 是让你**主动覆盖**深度的可写口，写它能做特效但会关掉提前深度测试、掉性能。取舍：默认全用流水线自动算的深度（读 `gl_FragCoord.z`），只有真要改深度才碰 `gl_FragDepth`，且知道代价。",
    tags: ["gl_FragCoord", "gl_FragDepth", "综合"],
  },
];
