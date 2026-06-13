/** 复习题库 · 你好，三角形（hello-triangle）。Phase B 各章独立文件，避免并行写冲突。 */

import type { ReviewQuestion } from "./types";

export const helloTriangleQuestions: ReviewQuestion[] = [
  {
    id: "ht-1",
    chapter: "hello-triangle",
    level: 1,
    question: "VBO 和 VAO 各自负责什么？一句话说清它们的关系。",
    answer:
      "VBO（顶点缓冲对象）是显存里存顶点数据的「料仓」；VAO（顶点数组对象）是「怎么解读这堆字节」的说明书（不存数据）。一句话：VBO 是料，属性指针是切料的规则，VAO 是把规则记下来的说明书。",
    tags: ["VBO", "VAO"],
  },
  {
    id: "ht-2",
    chapter: "hello-triangle",
    level: 1,
    question: "什么是 NDC（标准化设备坐标）？它的范围是多少？",
    answer:
      "NDC 是一套统一的标准坐标尺：x/y/z 都落在 [-1, 1]，正中间是原点。不管屏幕多大都用这套范围写顶点，落在框外的会被裁掉。",
    tags: ["NDC"],
  },
  {
    id: "ht-3",
    chapter: "hello-triangle",
    level: 2,
    question: "渲染管线把顶点变成像素，固定的五道工位依次是哪几道？",
    answer:
      "顶点 → 图元装配（输入装配）→ 光栅化 → 片段（着色）→ 测试与混合。其中光栅化把矢量三角形切成一个个屏幕像素格、每个被覆盖的像素产生一个片段。",
    tags: ["渲染管线", "光栅化", "片段"],
  },
  {
    id: "ht-4",
    chapter: "hello-triangle",
    level: 3,
    question:
      "`gl.vertexAttribPointer(0, 3, gl.FLOAT, false, stride, offset)` 里，对每顶点只有 3 个 float 的位置属性，stride 和 offset 该填多少？",
    answer:
      "stride（步长）= 单个顶点的字节数 = 3 个 float = `3 * 4` = 12 字节；offset（偏移）= 位置在最前，填 `0`。第一个参数 `0` 是 location，对应着色器里 `layout(location = 0)`。",
    tags: ["属性指针", "stride", "offset"],
  },
  {
    id: "ht-5",
    chapter: "hello-triangle",
    level: 3,
    question: "为什么要先绑定 VAO 再配置顶点属性，反过来会怎样？",
    answer:
      "`vertexAttribPointer` / `enableVertexAttribArray` 的状态会被「当前绑定的 VAO」记录。没绑 VAO 就配置，这些状态无处归属（WebGL2 下甚至直接报错）。先绑 VAO，配置才被它捕获，绘制时绑回这张说明书即可。",
    tags: ["VAO", "误区"],
  },
  {
    id: "ht-6",
    chapter: "hello-triangle",
    level: 4,
    question:
      "一段顶点数据从内存到屏幕像素，经过了哪几个阶段？编译运行后屏幕全黑、什么都没有，最常见的原因是什么？",
    answer:
      "阶段：CPU 内存里的顶点数组 → 上传进 VBO（显存）→ VAO 记录属性布局 → 绘制调用走管线（顶点 → 图元装配 → 光栅化 → 片段着色 → 测试混合）→ 屏幕。全黑最常见原因：忘了绑定 VAO 就调 `vertexAttribPointer`，属性配置没被任何对象记录；或着色器编译/链接失败却没查日志（用 `getShaderInfoLog`/`getProgramInfoLog`）。",
    tags: ["渲染管线", "VAO", "误区"],
  },

  // ---- L1 认记 ----
  {
    id: "ht-7",
    chapter: "hello-triangle",
    level: 1,
    question: "VBO 的全称是什么？它存在哪里、装什么？",
    answer:
      "VBO = 顶点缓冲对象（Vertex Buffer Object）。它是显存（GPU）里一块专门存顶点数据的缓冲区，把顶点一次性搬进去，绘制时显卡就近取料。",
    tags: ["VBO"],
  },
  {
    id: "ht-8",
    chapter: "hello-triangle",
    level: 1,
    question: "VAO 的全称是什么？它存数据吗？",
    answer:
      "VAO = 顶点数组对象（Vertex Array Object）。它不存顶点数据（数据在 VBO 里），只记录「怎么解读这堆字节」——哪些属性开了、各自的步长/偏移/类型。",
    tags: ["VAO"],
  },
  {
    id: "ht-9",
    chapter: "hello-triangle",
    level: 1,
    question: "什么是顶点（Vertex）？一个三角形由几个顶点定义？",
    answer:
      "顶点是渲染里最小的数据单元——一个点，至少携带位置，还可附带颜色、法线、纹理坐标等。一个三角形由 3 个顶点定义。",
    tags: ["顶点"],
  },
  {
    id: "ht-10",
    chapter: "hello-triangle",
    level: 1,
    question: "什么是顶点属性（attribute）？举两个例子。",
    answer:
      "顶点属性是挂在一个顶点身上的某一项数据，比如位置、颜色、法线、纹理坐标。一个顶点可同时带多个属性，着色器按编号（location）读取。",
    tags: ["顶点属性"],
  },
  {
    id: "ht-11",
    chapter: "hello-triangle",
    level: 1,
    question: "本章把顶点画到屏幕，用的是什么类比来理解显卡的工作方式？",
    answer:
      "工厂流水线：原料（顶点）从一头进去，经过一道道工位加工，成品（像素）从另一头出来。你做的不是「画」，而是备料 + 排产。",
    tags: ["渲染管线", "直觉"],
  },
  {
    id: "ht-12",
    chapter: "hello-triangle",
    level: 1,
    question:
      "渲染管线里有哪两段着色器是你必须自己写的？它们各跑一次的对象是什么？",
    answer:
      "顶点着色器（对每个顶点跑一次，主要输出 `gl_Position`）和片段着色器（光栅化后对每个片段跑一次，输出 `FragColor` 决定颜色）。",
    tags: ["顶点着色器", "片段着色器"],
  },
  {
    id: "ht-13",
    chapter: "hello-triangle",
    level: 1,
    question: "什么是着色器程序（shader program）？绘制前用什么命令启用它？",
    answer:
      "着色器程序是把编译好的顶点着色器和片段着色器链接到一起、可被显卡执行的整体。绘制前用 `glUseProgram` / `gl.useProgram` 启用它。",
    tags: ["着色器程序"],
  },
  {
    id: "ht-14",
    chapter: "hello-triangle",
    level: 1,
    question: "什么是光栅化（rasterization）？它产出的是什么？",
    answer:
      "光栅化是把矢量图元（如三角形）切成一个个屏幕像素格子的过程，决定它盖住了哪些像素。每个被覆盖的像素产生一个片段。",
    tags: ["光栅化", "片段"],
  },
  {
    id: "ht-15",
    chapter: "hello-triangle",
    level: 1,
    question: "什么是片段（fragment）？它就是最终像素吗？",
    answer:
      "片段是光栅化后产生的、对应一个像素的「待着色数据点」（可理解成准像素）。它还不是最终像素——要经片段着色器算色、再过深度/混合测试后才真正写进屏幕。",
    tags: ["片段"],
  },
  {
    id: "ht-16",
    chapter: "hello-triangle",
    level: 1,
    question: "什么是绘制调用（draw call）？本章用的是哪一条？",
    answer:
      "绘制调用是按 VAO 说明书从 VBO 取顶点、走完整条管线画出图元的那条命令。本章用 `glDrawArrays(GL_TRIANGLES, 0, 3)` / `gl.drawArrays(gl.TRIANGLES, 0, 3)`。",
    tags: ["绘制调用", "glDrawArrays"],
  },
  {
    id: "ht-17",
    chapter: "hello-triangle",
    level: 1,
    question: "属性指针通过哪个函数配置？它告诉显卡的核心是什么？",
    answer:
      "通过 `glVertexAttribPointer` / `gl.vertexAttribPointer` 配置。它告诉显卡怎么从 VBO 里切出顶点：第几号属性、每次读几个值、什么类型、步长、偏移。",
    tags: ["属性指针", "glVertexAttribPointer"],
  },
  {
    id: "ht-18",
    chapter: "hello-triangle",
    level: 1,
    question: "本章三角形的三个 NDC 顶点坐标（x, y）分别是什么？",
    answer:
      "`(0, 0.5)`、`(-0.5, -0.5)`、`(0.5, -0.5)`。这是 NDC 范围 $[-1,1]$ 里的一个三角形。",
    tags: ["NDC", "顶点"],
  },
  {
    id: "ht-19",
    chapter: "hello-triangle",
    level: 1,
    question: "渲染管线的第一道工位叫什么？它做什么？",
    answer:
      "输入装配（图元装配）。它按 VAO 说明书把顶点数据取出、组织好，再交给后面的工位，相当于流水线的上料口。",
    tags: ["输入装配", "渲染管线"],
  },
  {
    id: "ht-20",
    chapter: "hello-triangle",
    level: 1,
    question: "什么是视口变换（viewport transform）？谁来做它？",
    answer:
      "视口变换是把 $[-1,1]$ 的 NDC 坐标按视口大小映射成屏幕像素坐标的那一步。由显卡按你设的视口自动完成，代码里通常只调一次 `glViewport` / `gl.viewport`。",
    tags: ["视口变换", "NDC"],
  },
  {
    id: "ht-21",
    chapter: "hello-triangle",
    level: 1,
    question:
      "WebGL2 的片段着色器在 `#version 300 es` 之后必须多写哪一行，否则编译失败？",
    answer: "必须写一行 `precision highp float;`（或 `mediump`）声明浮点精度。",
    tags: ["片段着色器", "API差异", "WebGL2"],
  },
  {
    id: "ht-22",
    chapter: "hello-triangle",
    level: 1,
    question:
      "本章最简单情形下，每个顶点只带一个属性——位置，它用几个 `float` 表示？三个顶点共几个 `float`？",
    answer:
      "位置用 3 个 `float`（x、y、z）。三个顶点共 9 个 `float`，在内存里连续排列。",
    tags: ["顶点属性", "VBO"],
  },

  // ---- L2 理解 ----
  {
    id: "ht-23",
    chapter: "hello-triangle",
    level: 2,
    question: "为什么要把顶点数据搬进 VBO，而不是每帧从内存现送给显卡？",
    answer:
      "绘制发生在 GPU 那边，每帧从内存现搬数据既慢又浪费带宽。VBO 把数据一次性搬进显存，之后每帧绘制时显卡就近取料，省去重复上传。",
    tags: ["VBO"],
  },
  {
    id: "ht-24",
    chapter: "hello-triangle",
    level: 2,
    question: "一句话说清 VBO、属性指针、VAO 三者的关系。",
    answer:
      "VBO 是料（一串字节），属性指针是「怎么切这串字节」的规则，VAO 是把这套规则记下来的说明书。",
    tags: ["VBO", "VAO", "属性指针"],
  },
  {
    id: "ht-24b",
    chapter: "hello-triangle",
    level: 2,
    question: "显卡拿到 VBO 里那一串裸字节，为什么不能直接画？还缺什么？",
    answer:
      "显卡看到的只是连续字节，不知道每个顶点占几个字节、位置从第几字节起读、一次读几个 `float`。缺的是属性指针（由 VAO 记录）来交代「怎么解读这堆字节」。",
    tags: ["VAO", "属性指针"],
  },
  {
    id: "ht-25",
    chapter: "hello-triangle",
    level: 2,
    question: "为什么顶点坐标要写在 NDC 而不是直接写屏幕像素坐标？",
    answer:
      "NDC 是 $[-1,1]$ 的统一标准尺，不管屏幕多大都用这套范围写顶点，与具体分辨率解耦；再由视口变换按实际宽高映射成像素，框外的会被裁掉。",
    tags: ["NDC", "视口变换"],
  },
  {
    id: "ht-26",
    chapter: "hello-triangle",
    level: 2,
    question: "为什么改片段着色器只换颜色，改顶点（着色器/数据）才换形状？",
    answer:
      "片段着色器只决定「每个被覆盖的片段是什么颜色」，不决定覆盖了哪些片段；形状由顶点位置决定，要改形状得改顶点。",
    tags: ["片段着色器", "顶点着色器"],
  },
  {
    id: "ht-27",
    chapter: "hello-triangle",
    level: 2,
    question: "画一个三角形的完整代码分哪五步？",
    answer:
      "①写两段着色器源码 → ②编译链接成程序 → ③把顶点搬进 VBO → ④用 VAO 记录怎么读（属性指针）→ ⑤下达绘制命令。",
    tags: ["渲染管线", "流程"],
  },
  {
    id: "ht-28",
    chapter: "hello-triangle",
    level: 2,
    question: "光栅化判定「哪些像素属于三角形」的具体依据是什么？",
    answer:
      "把三角形盖在像素网格上，逐格判断「这个格子的中心点落在三角形内部吗」，落在内部的格子被选中，每个产出一个片段。",
    tags: ["光栅化", "片段"],
  },
  {
    id: "ht-29",
    chapter: "hello-triangle",
    level: 2,
    question:
      "视口变换的 $y$ 公式里为什么用 $1 - y_{\\text{ndc}}$ 而不是 $1 + y_{\\text{ndc}}$？",
    answer:
      "因为屏幕的 $y$ 轴朝下、NDC 的 $y$ 轴朝上，需要翻转。用 $1 - y_{\\text{ndc}}$ 把朝上的坐标映射到朝下的屏幕，图形上下才不颠倒。",
    tags: ["视口变换", "NDC"],
  },
  {
    id: "ht-30",
    chapter: "hello-triangle",
    level: 2,
    question:
      "`layout(location = 0)` 写在顶点着色器里有什么作用？它和属性指针怎么对上？",
    answer:
      "它把顶点着色器的输入变量（如 `aPos`）绑到 0 号属性。属性指针 `vertexAttribPointer` 第一个参数填同样的 location 0，二者对上，显卡才知道这个属性的数据喂给哪个变量。",
    tags: ["layout", "属性指针"],
  },
  {
    id: "ht-31",
    chapter: "hello-triangle",
    level: 2,
    question: "为什么编译/链接着色器后一定要查日志？",
    answer:
      "源码只是字符串，编译/链接可能失败（如拼错内置变量名）。失败却不查日志，后面只会得到一片黑、且控制台只有模糊报错；查日志能直接看到错误行和原因。",
    tags: ["着色器程序", "调试"],
  },
  {
    id: "ht-32",
    chapter: "hello-triangle",
    level: 2,
    question: "C++/OpenGL 与 WebGL2 的着色器代码，本章里逻辑差异主要体现在哪？",
    answer:
      "逻辑完全相同，差异在版本声明：桌面写 `#version 330 core`，WebGL2 写 `#version 300 es`；且 WebGL2 片段着色器必须多写 `precision highp float;`。",
    tags: ["API差异", "着色器"],
  },
  {
    id: "ht-33",
    chapter: "hello-triangle",
    level: 2,
    question: "VAO 不存顶点数据，那它到底「捕获」了什么？什么时候捕获？",
    answer:
      "绑定 VAO 之后调用的 `vertexAttribPointer` / `enableVertexAttribArray` 配置（哪些属性开了、各自的步长/偏移/类型）会被当前 VAO 捕获。绘制时绑回它即可。",
    tags: ["VAO", "属性指针"],
  },
  {
    id: "ht-34",
    chapter: "hello-triangle",
    level: 2,
    question: "为什么说 VBO 处在「流水线最前端」？",
    answer:
      "VBO 是顶点数据进显卡的第一站——数据先一次性搬进显存的料仓，之后输入装配再按 VAO 说明书从它取料，组织好交给后续阶段。",
    tags: ["VBO", "渲染管线"],
  },
  {
    id: "ht-35",
    chapter: "hello-triangle",
    level: 2,
    question: "`drawArrays(TRIANGLES, 0, 3)` 这条命令一发，会触发什么？",
    answer:
      "触发整条流水线跑一遍：从第 0 个顶点起取 3 个组成一个三角形，走完「顶点 → 图元装配 → 光栅化 → 片段着色 → 测试混合」直到屏幕出现三角形。",
    tags: ["glDrawArrays", "渲染管线"],
  },
  {
    id: "ht-36",
    chapter: "hello-triangle",
    level: 2,
    question:
      "为什么 C++ 里要用 `glGenBuffers(1, &VBO)` 先生成 id，而 WebGL2 直接 `gl.createBuffer()`？",
    answer:
      "API 风格差异：C++ 用 `glGenBuffers` 先生成一个整数句柄（id）再绑定使用；WebGL2 的 `gl.createBuffer()` 直接返回一个 `WebGLBuffer` 对象。创建 VAO 同理（`glGenVertexArrays` vs `gl.createVertexArray()`）。",
    tags: ["API差异", "VBO"],
  },
  {
    id: "ht-37",
    chapter: "hello-triangle",
    level: 2,
    question: "如果着色器里没写 `layout(location=...)`，属性编号怎么确定？",
    answer:
      '得先用 `glGetAttribLocation(program, "aPos")` / `gl.getAttribLocation(program, "aPos")` 按变量名问出编号，再把它填进 `vertexAttribPointer` 的第一个参数。',
    tags: ["属性指针", "layout"],
  },
  {
    id: "ht-38",
    chapter: "hello-triangle",
    level: 2,
    question:
      "为什么本章主 Demo 改片段着色器能实时看到颜色变化，是「片段着色器」的什么特性决定的？",
    answer:
      "片段着色器光栅化后对每个被覆盖的片段各跑一次、算出该片段颜色。改它的计算（如基色、随位置/时间渐变）就改了所有片段的颜色，所以整块三角形的颜色实时变。",
    tags: ["片段着色器"],
  },

  // ---- L3 应用（读代码 / 给参数 / 计算）----
  {
    id: "ht-39",
    chapter: "hello-triangle",
    level: 3,
    question:
      "顶点格式为「位置 3 个 float + 颜色 3 个 float」交错存放。配置颜色属性（1 号）时，`gl.vertexAttribPointer` 的 size / stride / offset 各填多少？",
    answer:
      "size = 3；stride = 单顶点字节数 = 6 个 float = `6 * 4` = 24 字节；offset = 颜色在位置之后，跳过 3 个 float = `3 * 4` = 12 字节。location 填 1。",
    tags: ["属性指针", "stride", "offset"],
  },
  {
    id: "ht-40",
    chapter: "hello-triangle",
    level: 3,
    question:
      "下面这段顶点着色器为什么编译/运行后画不出东西？\n`#version 300 es`\n`layout(location=0) in vec3 aPos;`\n`void main(){ gl_position = vec4(aPos,1.0); }`",
    answer:
      "内置变量名拼错了：应是 `gl_Position`（大写 P），写成了 `gl_position`。编译会失败，没赋值的 `gl_Position` 让顶点位置无效，屏幕一片黑。用 `getShaderInfoLog` 能看到这行错误。",
    tags: ["顶点着色器", "调试", "误区"],
  },
  {
    id: "ht-41",
    chapter: "hello-triangle",
    level: 3,
    question:
      "要画一个矩形（中央正方形），最省顶点的做法是什么？给出顶点数、索引数组和绘制命令。",
    answer:
      "用 4 个顶点 + 一个 EBO（`ELEMENT_ARRAY_BUFFER`），索引 `[0,1,2, 0,2,3]` 拼两个三角形，避免重复顶点；绘制改用 `gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)`。",
    tags: ["EBO", "glDrawElements"],
  },
  {
    id: "ht-42",
    chapter: "hello-triangle",
    level: 3,
    question:
      "NDC 里 $x_{\\text{ndc}} = 0$、视口宽 $w = 800$，按视口变换公式算出的 $x_{\\text{screen}}$ 是多少？",
    answer:
      "$x_{\\text{screen}} = \\frac{0 + 1}{2} \\cdot 800 = 400$。即 NDC 的正中（x=0）落在屏幕宽度的一半处。",
    tags: ["视口变换", "计算"],
  },
  {
    id: "ht-43",
    chapter: "hello-triangle",
    level: 3,
    question:
      "把本章可编辑 Demo 顶点着色器里的 `vec2(0.0, 0.5)` 改成 `vec2(0.0, 0.9)`，画面会怎么变？为什么？",
    answer:
      "顶部顶点被抬高，三角形被拉高变尖。因为形状由顶点位置决定，改顶点着色器里的坐标就改了形状。",
    tags: ["顶点着色器", "读代码"],
  },
  {
    id: "ht-44",
    chapter: "hello-triangle",
    level: 3,
    question:
      "在本章可编辑 Demo 里把 `FragColor` 那行改成 `vec4(1.0, 0.0, 0.0, 1.0)`，画面会怎样？三角形形状变吗？",
    answer:
      "整块三角形变纯红，形状纹丝不动。片段着色器只决定颜色不决定覆盖范围，所以只换色不换形。",
    tags: ["片段着色器", "读代码"],
  },
  {
    id: "ht-45",
    chapter: "hello-triangle",
    level: 3,
    question:
      "读这条命令 `gl.drawArrays(gl.TRIANGLES, 0, 3)`，三个参数分别表示什么？",
    answer:
      "`gl.TRIANGLES` = 图元类型（每 3 个顶点组成一个三角形）；`0` = 从第 0 个顶点开始；`3` = 取 3 个顶点。合起来：从头取 3 个顶点画一个三角形。",
    tags: ["glDrawArrays", "读代码"],
  },
  {
    id: "ht-46",
    chapter: "hello-triangle",
    level: 3,
    question:
      "顶点只有位置（每顶点 3 个 float、紧密排列）时，`vertexAttribPointer` 的 normalize 参数填什么？为什么？",
    answer:
      "填 `false`（GL_FALSE）。normalize 控制是否把整数型数据归一化到 $[0,1]$ 或 $[-1,1]$；位置是 `float` 已是真实数值，不需要归一化。",
    tags: ["属性指针", "normalize"],
  },
  {
    id: "ht-47",
    chapter: "hello-triangle",
    level: 3,
    question: "本章第四步代码绘制前的固定三连是哪三句？顺序能颠倒吗？",
    answer:
      "`gl.useProgram(program)` 启用程序 → `gl.bindVertexArray(vao)` 绑回说明书 → `gl.drawArrays(gl.TRIANGLES, 0, 3)` 绘制。前两句是绘制前的状态准备，必须在 draw 之前。",
    tags: ["绘制调用", "读代码"],
  },
  {
    id: "ht-48",
    chapter: "hello-triangle",
    level: 3,
    question:
      "三角形顶点位置乱跳或只画出一部分，最可能是 `vertexAttribPointer` 哪两个参数算错？只有位置属性时它们该是多少？",
    answer:
      "步长（stride）或偏移（offset）算错，显卡按错误字节数读取。只有位置属性时：stride = `3 * 4` = 12 字节，offset = 0。",
    tags: ["属性指针", "stride", "offset", "误区"],
  },
  {
    id: "ht-49",
    chapter: "hello-triangle",
    level: 3,
    question:
      "WebGL2 里在 `#version 300 es` 之后删掉 `precision highp float;`，会发生什么？怎么修？",
    answer:
      "片段着色器报错（如 `No precision specified`）、片段不显示或画面停更。修法：把 `precision highp float;`（或 `mediump`）那行加回来。",
    tags: ["片段着色器", "WebGL2", "误区"],
  },
  {
    id: "ht-50",
    chapter: "hello-triangle",
    level: 3,
    question:
      "把 9 个 float 的三角形数据从 CPU 上传进 VBO，WebGL2 里这三句的作用各是什么？\n`gl.createBuffer()` / `gl.bindBuffer(gl.ARRAY_BUFFER, vbo)` / `gl.bufferData(...)`",
    answer:
      "`createBuffer` 创建一块缓冲对象；`bindBuffer(ARRAY_BUFFER, vbo)` 把它绑为当前顶点缓冲；`bufferData(ARRAY_BUFFER, vertices, gl.STATIC_DRAW)` 把数据上传进显存。",
    tags: ["VBO", "读代码"],
  },
  {
    id: "ht-51",
    chapter: "hello-triangle",
    level: 3,
    question:
      "C++ 里 `glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3*sizeof(float), (void*)0)` 与 WebGL2 等价写法是什么？逐参数对一下。",
    answer:
      "`gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 3 * 4, 0)`。location 0 对 0；size 3 对 3；`GL_FLOAT` 对 `gl.FLOAT`；`GL_FALSE` 对 `false`；步长 `3*sizeof(float)` 对 `3*4`；偏移 `(void*)0` 对 `0`。",
    tags: ["属性指针", "API差异", "读代码"],
  },
  {
    id: "ht-52",
    chapter: "hello-triangle",
    level: 3,
    question:
      "配置完属性指针后，还差哪一句这个属性才真正生效？只写 `vertexAttribPointer` 够吗？",
    answer:
      "不够，还要 `gl.enableVertexAttribArray(0)` / `glEnableVertexAttribArray(0)` 启用 0 号属性。光配置不启用，该属性不会被读取。",
    tags: ["属性指针", "enableVertexAttribArray"],
  },
  {
    id: "ht-53",
    chapter: "hello-triangle",
    level: 3,
    question:
      "一个顶点有位置（3 个 float）和纹理坐标（2 个 float）交错存放，单顶点占多少字节？纹理坐标属性的 offset 填多少？",
    answer:
      "单顶点 5 个 float = `5 * 4` = 20 字节（这是 stride）。纹理坐标在位置之后，offset = `3 * 4` = 12 字节。",
    tags: ["属性指针", "stride", "offset", "计算"],
  },

  // ---- L4 综合 · 陷阱 ----
  {
    id: "ht-54",
    chapter: "hello-triangle",
    level: 4,
    question: "「VAO 存顶点数据，VBO 存属性布局」——这句对吗？说出正确的分工。",
    answer:
      "反了。VBO 存顶点数据（一串字节），VAO 不存数据、只记录属性布局（哪些属性开了、各自的步长/偏移/类型）。绑回 VAO，显卡才知道怎么读 VBO。",
    tags: ["VBO", "VAO", "陷阱"],
  },
  {
    id: "ht-55",
    chapter: "hello-triangle",
    level: 4,
    question:
      "代码没绑 VAO 就直接 `vertexAttribPointer` + `enableVertexAttribArray`，再绘制——会怎样？为什么？",
    answer:
      "这些状态会被「当前绑定的 VAO」记录，没绑 VAO 就配置则状态无处归属（WebGL2 下甚至直接报错），结果属性配置丢失、屏幕全黑。修法：先绑 VAO 再配置。",
    tags: ["VAO", "陷阱", "误区"],
  },
  {
    id: "ht-56",
    chapter: "hello-triangle",
    level: 4,
    question:
      "屏幕全黑可能源自完全不同的两类原因，分别是什么？各用什么手段定位？",
    answer:
      "①属性配置没被记录（忘绑 VAO 就 `vertexAttribPointer`）——检查 VAO 绑定顺序；②着色器编译/链接失败却没查日志——用 `getShaderInfoLog`/`getProgramInfoLog` 把错误打出来。两类要分别排查，别只盯一个。",
    tags: ["调试", "VAO", "着色器程序", "陷阱"],
  },
  {
    id: "ht-57",
    chapter: "hello-triangle",
    level: 4,
    question:
      "若画矩形仍用 `glDrawArrays` 而非 `glDrawElements`，需要提供几个顶点？为什么 EBO 更省？",
    answer:
      "`glDrawArrays` 画两个三角形需 6 个顶点（对角线上两个顶点各重复一次）。EBO 用索引 `[0,1,2, 0,2,3]` 复用 4 个不重复顶点，省下重复数据，所以更省显存。",
    tags: ["glDrawArrays", "glDrawElements", "EBO", "综合"],
  },
  {
    id: "ht-58",
    chapter: "hello-triangle",
    level: 4,
    question:
      "「把顶点坐标改大到 `(2.0, 2.0)` 就能让三角形铺满更大屏幕」——这个想法有什么问题？",
    answer:
      "坐标是 NDC，范围 $[-1,1]$，超出部分会被裁掉。写 `(2.0, 2.0)` 那个顶点落在框外被裁，三角形不会变大反而被切掉一角。要适配屏幕靠视口变换/分辨率，不是把 NDC 写到框外。",
    tags: ["NDC", "陷阱"],
  },
  {
    id: "ht-59",
    chapter: "hello-triangle",
    level: 4,
    question:
      "有人说「想让三角形变成渐变彩色，就去改顶点着色器」。对吗？正确做法是什么？",
    answer:
      "不对。颜色由片段着色器决定，改它（如按 `gl_FragCoord` 位置算色）才得到渐变。顶点着色器管的是位置/形状。要换形状才改顶点着色器。",
    tags: ["片段着色器", "顶点着色器", "陷阱"],
  },
  {
    id: "ht-60",
    chapter: "hello-triangle",
    level: 4,
    question:
      "为什么说「VAO 是给多物体复用、提效」的设计？一个场景画很多不同物体时它怎么省事？",
    answer:
      "每个物体的属性布局一旦在它的 VAO 里配好，之后画该物体只需绑回它的 VAO，不必每次重配所有属性指针。多物体只需在各自 VAO 间切换绑定，省去反复配置。",
    tags: ["VAO", "综合"],
  },
  {
    id: "ht-61",
    chapter: "hello-triangle",
    level: 4,
    question:
      "着色器代码逻辑明明正确，从桌面 OpenGL 原样搬到 WebGL2 却编译失败，最可能踩了哪两个差异？",
    answer:
      "①版本声明没改：桌面 `#version 330 core` vs WebGL2 `#version 300 es`；②WebGL2 片段着色器漏写 `precision highp float;`。两处都是 API 差异，逻辑没错也会编译失败。",
    tags: ["API差异", "WebGL2", "陷阱"],
  },
  {
    id: "ht-62",
    chapter: "hello-triangle",
    level: 4,
    question:
      "把整条链路串起来：CPU 内存里的 9 个 float，到屏幕上的彩色三角形，依次经过哪些对象与阶段？",
    answer:
      "内存顶点数组 → 上传进 VBO（显存）→ VAO 记录属性指针 → `useProgram` + 绑 VAO + `drawArrays` 触发管线（顶点着色器 → 图元装配 → 光栅化生成片段 → 片段着色器算色 → 测试与混合）→ 视口变换映射到像素 → 屏幕。",
    tags: ["渲染管线", "综合", "VBO", "VAO"],
  },
  {
    id: "ht-63",
    chapter: "hello-triangle",
    level: 4,
    question:
      "光栅化在「图元装配」之后、「片段着色器」之前——它若不存在，管线会缺什么、画不出像素的根因是什么？",
    answer:
      "缺把矢量三角形切成像素格、生成片段这一步。没有光栅化就没有片段，片段着色器无对象可跑，屏幕得不到任何上色像素。它是「矢量描述 → 离散像素」的桥。",
    tags: ["光栅化", "片段", "渲染管线", "综合"],
  },
  {
    id: "ht-64",
    chapter: "hello-triangle",
    level: 4,
    question: "stride 填成 0 会怎样？什么情况下填 0 反而是对的？",
    answer:
      "stride = 0 是「让显卡按紧密排列自动推算步长」的特例：当该缓冲里只有这一个属性、数据紧密相邻时，填 0 等价于填这个属性自身的字节数。但若顶点里有多个交错属性，填 0 会读错位置。本章只有位置时也可填 `3*4` 明确写出，更稳妥。",
    tags: ["属性指针", "stride", "陷阱"],
  },
  {
    id: "ht-65",
    chapter: "hello-triangle",
    level: 4,
    question:
      "为什么说「你不是在画三角形，而是在备料 + 排产」？这句话点出了 GPU 编程的什么本质？",
    answer:
      "你不直接在屏幕上落笔，而是准备数据（顶点 → VBO）、配置规则（属性指针 → VAO、着色器程序），最后下一条绘制命令让流水线自己跑。本质是「声明数据与规则、由可编程管线执行」，而非命令式逐像素绘制。",
    tags: ["渲染管线", "直觉", "综合"],
  },
  {
    id: "ht-66",
    chapter: "hello-triangle",
    level: 4,
    question:
      "片段（fragment）和像素（pixel）有什么区别？为什么不能把二者划等号？",
    answer:
      "片段是光栅化产出的「待着色数据点」，还要经片段着色器算色、再过深度/混合测试才写进屏幕。多个片段可能竞争同一像素位置（如重叠三角形），最终只有通过测试/混合的结果成为屏幕像素。所以片段是准像素，不等于最终像素。",
    tags: ["片段", "陷阱", "综合"],
  },
  {
    id: "ht-67",
    chapter: "hello-triangle",
    level: 4,
    question:
      "本章 Demo 不用 VBO，靠顶点着色器里 `gl_VertexID` 取常量数组吐顶点——这说明「画三角形必须有 VBO」吗？",
    answer:
      "不必须。VBO 是把顶点数据放进显存的常规做法；但顶点也可由着色器内常量数组按 `gl_VertexID` 现造（如 Demo）。VBO 是高效供数的手段，不是画三角形的硬性前提；引擎照样按 `drawArrays` 画 3 个顶点。",
    tags: ["VBO", "gl_VertexID", "综合"],
  },
  {
    id: "ht-68",
    chapter: "hello-triangle",
    level: 4,
    question:
      "`useProgram` 与绑定 VAO，少做哪一个会出问题？两者各负责管线的什么？",
    answer:
      "两个都不能少。`useProgram` 指定用哪两段着色器（顶点/片段逻辑）；绑 VAO 指定怎么从 VBO 取顶点（属性布局）。缺 `useProgram` 没有可执行的着色器，缺绑 VAO 取不到正确顶点——都会画不出三角形。",
    tags: ["着色器程序", "VAO", "绘制调用", "综合"],
  },
  {
    id: "ht-69",
    chapter: "hello-triangle",
    level: 4,
    question:
      "管线分「可编程」与「固定功能」两类工位。本章里哪些是你写代码控制的，哪些是显卡固定做的？",
    answer:
      "可编程：顶点着色器、片段着色器（你写 GLSL）。固定功能：图元装配、光栅化、深度/混合测试，以及视口变换——这些由显卡按你设的状态（如视口、图元类型）自动完成，你不写每像素逻辑。",
    tags: ["渲染管线", "综合"],
  },
  {
    id: "ht-70",
    chapter: "hello-triangle",
    level: 4,
    question:
      "把着色器版本、VAO 绑定顺序、片段精度、stride/offset 四类坑放在一起：一段从教程抄来的代码黑屏，你会按什么顺序排查？",
    answer:
      "①先查着色器编译/链接日志（`getShaderInfoLog`/`getProgramInfoLog`）——版本声明、片段精度、`gl_Position` 拼写都在这暴露；②再查 VAO 是否先绑再配属性；③最后核对 `vertexAttribPointer` 的 stride/offset 是否与顶点格式匹配。日志能一次排掉多类坑，应最先看。",
    tags: ["调试", "误区", "综合"],
  },
];
