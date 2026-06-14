/** 复习题库 · 实例化（instancing）。HEL-78 高级OpenGL篇。 */

import type { ReviewQuestion } from "./types";

export const instancingQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / 函数 / 数值约定） ──
  {
    id: "is-1",
    chapter: "instancing",
    level: 1,
    question: "什么是「实例化」（instancing）？它解决的核心问题是什么？",
    answer:
      "实例化是用一次绘制调用（一次 draw call）画出很多个相同网格（同一份几何）的技术，而不是循环调用很多次。它解决的是「要画大量一模一样的物体时，怎么只吩咐 GPU 一次、而不是一个个吩咐上万遍」。",
    tags: ["实例化", "定义"],
  },
  {
    id: "is-2",
    chapter: "instancing",
    level: 1,
    question: "实例化的前提是什么？每个实例可以不一样的是哪些方面？",
    answer:
      "前提是要画的这一大片东西**几何完全相同**——同一个网格、同一份顶点数据。每个实例可以不同的只是各自的变换（位置 / 缩放 / 朝向）或某些属性，几何本身不能换。",
    tags: ["实例化", "前提"],
  },
  {
    id: "is-3",
    chapter: "instancing",
    level: 1,
    question: "什么是「draw call」？一次 draw call 背后发生了什么？",
    answer:
      "一次 draw call（绘制调用，如 `glDrawArrays` / `glDrawElements`）背后是一趟「CPU 把绘制命令和状态打包、发给 GPU」的通信。这趟通信本身有固定开销（驱动校验、状态切换、命令提交）。",
    tags: ["draw call", "定义"],
  },
  {
    id: "is-4",
    chapter: "instancing",
    level: 1,
    question: "实例化绘制的两个函数叫什么？分别对应非实例化的哪个函数？",
    answer:
      "`glDrawArraysInstanced` 对应 `glDrawArrays`；`glDrawElementsInstanced` 对应 `glDrawElements`（带索引）。两个实例化版本都在末尾多一个 `instanceCount` 参数。",
    tags: ["glDrawArraysInstanced", "glDrawElementsInstanced"],
  },
  {
    id: "is-5",
    chapter: "instancing",
    level: 1,
    question:
      "`glDrawArraysInstanced(GL_TRIANGLES, 0, 36, amount)` 最后那个 `amount` 参数是什么意思？",
    answer:
      "`amount` 是 `instanceCount`，即「画多少个实例」。GPU 会把同一份几何（这里 36 个顶点的立方体）重复画 `amount` 遍，而这只算一次 draw call。",
    tags: ["glDrawArraysInstanced", "instanceCount"],
  },
  {
    id: "is-6",
    chapter: "instancing",
    level: 1,
    question: "`gl_InstanceID` 是什么？它的值从几开始？",
    answer:
      "`gl_InstanceID` 是顶点着色器里的一个内置整数变量，表示「当前正在画的是第几个实例」。它从 `0` 开始递增：第 0 个实例时是 `0`、第 1 个实例时是 `1`……只在实例化绘制时有意义。",
    tags: ["gl_InstanceID", "定义"],
  },
  {
    id: "is-7",
    chapter: "instancing",
    level: 1,
    question: "`gl_InstanceID` 最常见的用法是什么？写一个例子。",
    answer:
      "拿它当下标去一个 uniform 数组里取「每实例数据」，给每个实例一个不同的值。例如 `vec2 offset = offsets[gl_InstanceID];`，于是第 `i` 个实例读到 `offsets[i]`、摆到不同位置。",
    tags: ["gl_InstanceID", "用法"],
  },
  {
    id: "is-8",
    chapter: "instancing",
    level: 1,
    question: "用 `gl_InstanceID` + uniform 数组取偏移的做法，有什么硬上限？",
    answer:
      "uniform 数组不能太大——受 GPU 的 uniform 容量限制（`GL_MAX_VERTEX_UNIFORM_COMPONENTS`）。塞一百个偏移还行，要塞一万个就超容量，会编译失败或读到越界。",
    tags: ["gl_InstanceID", "uniform数组", "上限"],
  },
  {
    id: "is-9",
    chapter: "instancing",
    level: 1,
    question: "什么是「实例化数组」（instanced array）？",
    answer:
      "一种「每个实例一份」的顶点属性：把每实例的数据（偏移向量、或整个变换矩阵）放进一个 VBO，像普通顶点属性那样用 `glVertexAttribPointer` 设好，再用 `glVertexAttribDivisor(loc, 1)` 告诉 GPU「这个属性每个实例才读一条」。",
    tags: ["实例化数组", "定义"],
  },
  {
    id: "is-10",
    chapter: "instancing",
    level: 1,
    question: "`glVertexAttribDivisor` 这个函数是干什么的？它有几个参数？",
    answer:
      "`glVertexAttribDivisor(location, divisor)` 给某个顶点属性设一个「步进频率」，即「多久往下读一条数据」。两个参数：第一个是属性的 location，第二个是 divisor 步进值。",
    tags: ["glVertexAttribDivisor", "定义"],
  },
  {
    id: "is-11",
    chapter: "instancing",
    level: 1,
    question: "`glVertexAttribDivisor` 里 `divisor = 0` 表示什么步进方式？",
    answer:
      "`divisor = 0`（默认值）表示**逐顶点**步进：着色器每处理一个顶点，就往下读这个属性的下一条。普通的位置、法线、纹理坐标都是这样——每个顶点各有各的。",
    tags: ["glVertexAttribDivisor", "divisor0"],
  },
  {
    id: "is-12",
    chapter: "instancing",
    level: 1,
    question: "`glVertexAttribDivisor` 里 `divisor = 1` 表示什么步进方式？",
    answer:
      "`divisor = 1` 表示**每实例**步进：着色器只有每开始画一个新实例时才往下读一条；同一个实例内部的所有顶点，共用同一条。实例化数组要的正是 `divisor = 1`。",
    tags: ["glVertexAttribDivisor", "divisor1"],
  },
  {
    id: "is-13",
    chapter: "instancing",
    level: 1,
    question: "实例化数组属性应该设成 `divisor` 等于几？一句话口诀是什么？",
    answer:
      "设成 `divisor = 1`（每实例读一条）。口诀：**普通属性逐顶点读（divisor=0），实例化数组逐实例读（divisor=1）**。",
    tags: ["实例化数组", "divisor1", "口诀"],
  },
  {
    id: "is-14",
    chapter: "instancing",
    level: 1,
    question: "什么是「行星带」（asteroid field）案例？它是实例化的什么例子？",
    answer:
      "行星带是实例化的经典案例：上千上万颗小行星绕一颗行星排成一圈飞。每颗是同一个网格，但位置 / 缩放 / 朝向各异，一次 draw call 画完整条带。",
    tags: ["行星带", "案例"],
  },
  {
    id: "is-15",
    chapter: "instancing",
    level: 1,
    question: "行星带里每个实例用什么数据结构描述它的变换？放在哪？",
    answer:
      "每个实例用一个 `mat4`（4×4 变换矩阵）描述位置 / 缩放 / 朝向，作为**实例化数组**属性，放进一个 VBO，用 `glDrawElementsInstanced(..., amount)` 一次画完。",
    tags: ["行星带", "mat4"],
  },
  {
    id: "is-16",
    chapter: "instancing",
    level: 1,
    question:
      "一个 `mat4` 实例化属性在顶点属性里占几个属性位置（location）？为什么？",
    answer:
      "占 **4 个连续的属性位置**。因为一个属性位置最多装一个 `vec4`，而 `mat4` 是 4 列 `vec4`，所以要拆成 4 个 `vec4` 占 4 个连续 location（如 3、4、5、6）。",
    tags: ["mat4", "属性位置"],
  },
  {
    id: "is-17",
    chapter: "instancing",
    level: 1,
    question: "WebGL2 原生支持实例化吗？对应的函数名和 OpenGL 一样吗？",
    answer:
      "WebGL2 **原生支持**实例化，无需扩展。函数名和 OpenGL 一致，只是去掉 `gl` 前缀小驼峰化：`gl.drawArraysInstanced` / `gl.drawElementsInstanced` / `gl.vertexAttribDivisor`。",
    tags: ["WebGL2", "API"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "is-18",
    chapter: "instancing",
    level: 2,
    question:
      "为什么画大量小物体时，瓶颈往往不是 GPU 画三角形，而是 draw call？",
    answer:
      "因为每次 draw call 的「CPU 打包命令发给 GPU」通信有固定开销，和这次画 3 个还是 3000 个顶点关系不大。画一千个小物体若逐个绘制，CPU 要发起一千次这样的通信，反复「吩咐」就成了瓶颈，而单个小物体的三角形 GPU 画得飞快。",
    tags: ["draw call", "瓶颈", "为什么"],
  },
  {
    id: "is-19",
    chapter: "instancing",
    level: 2,
    question: "实例化到底省的是什么开销？省的是 GPU 画三角形的活吗？",
    answer:
      "省的是 **CPU 反复发起 draw call 的通信开销**，不是 GPU 画三角形的活。实例化把 N 次 draw call 压成 1 次：GPU 内部照样画 N 遍几何，但 CPU 只「喊」了一次，几乎没负担。",
    tags: ["实例化", "省开销", "为什么"],
  },
  {
    id: "is-20",
    chapter: "instancing",
    level: 2,
    question: "为什么实例化要求所有实例几何完全相同？不同网格能一起实例化吗？",
    answer:
      "因为实例化是「同一份几何重复画 N 遍」——GPU 复用的就是那一份顶点数据，只换每实例的变换 / 属性。不同网格不能一起实例化；想混画不同几何要用别的技术（如 `glMultiDrawElements`）。",
    tags: ["实例化", "几何相同", "为什么"],
  },
  {
    id: "is-21",
    chapter: "instancing",
    level: 2,
    question:
      "如果 N 个实例都不给不同的变换、全摆同一位置，画出来会是什么样？为什么必须让每个实例不一样？",
    answer:
      "会**完全重叠成一个**——看起来像只画了一个，毫无意义。所以必须让每个实例读到「属于自己那一份」的变换（位置 / 缩放 / 朝向），它们才会分散到不同地方排成阵列。",
    tags: ["实例化", "重叠", "为什么"],
  },
  {
    id: "is-22",
    chapter: "instancing",
    level: 2,
    question: "让每个实例不一样的两条路是什么？各自的适用场景？",
    answer:
      "①`gl_InstanceID` 当下标取 uniform 数组偏移——简单直接，适合**少量**实例（受 uniform 容量上限）；②**实例化数组** + `divisor=1`——不受 uniform 上限，适合**海量**实例，是标准做法。",
    tags: ["实例化", "两条路", "对比"],
  },
  {
    id: "is-23",
    chapter: "instancing",
    level: 2,
    question: "`gl_InstanceID` 取偏移和实例化数组，本质区别在哪里？",
    answer:
      "`gl_InstanceID` 把每实例数据塞进 uniform 数组（容量有限），靠内置下标取；实例化数组把每实例数据放进 VBO 当顶点属性传（容量大得多），靠 `divisor=1` 让 GPU 逐实例读。后者没有大小上限，能画海量实例。",
    tags: ["gl_InstanceID", "实例化数组", "对比"],
  },
  {
    id: "is-24",
    chapter: "instancing",
    level: 2,
    question: "为什么实例化数组属性必须设 `divisor=1`？设成默认的 `0` 会怎样？",
    answer:
      "因为一个实例的所有顶点应该**共享同一份**「这个实例的偏移 / 矩阵」，这正是逐实例（`divisor=1`）。若用默认 `0`，它被当成逐顶点属性、每个顶点都往下读一条，「每实例一份」的对应关系全乱，实例会叠在一起或错位。",
    tags: ["实例化数组", "divisor1", "为什么"],
  },
  {
    id: "is-25",
    chapter: "instancing",
    level: 2,
    question: "`divisor` 这个数字到底决定了哪一件事？",
    answer:
      "只决定一件事——**这个属性多久往下读一条数据**。`0` 是每个顶点读一条（逐顶点），`1` 是每个实例读一条（逐实例），`n` 是每 `n` 个实例读一条。它不改变属性本身的含义，只改读取频率。",
    tags: ["divisor", "机制"],
  },
  {
    id: "is-26",
    chapter: "instancing",
    level: 2,
    question:
      "普通顶点属性（位置、法线、uv）的 `divisor` 是几？为什么是这个值？",
    answer:
      "是 `0`（逐顶点，默认值）。因为每个顶点各有各的位置 / 法线 / uv，着色器处理每个顶点都该读下一条——这正是逐顶点步进。",
    tags: ["divisor0", "普通属性", "为什么"],
  },
  {
    id: "is-27",
    chapter: "instancing",
    level: 2,
    question:
      "为什么 `mat4` 实例化属性在着色器里只写一个 `layout(location=3)`，CPU 端却要设 4 次？",
    answer:
      "因为 GLSL 里 `mat4 instanceMatrix` 当一个属性声明，但它实际占用 location 3、4、5、6 四个属性位（一个属性位最多 `vec4`）。CPU 端要对这 4 个位置各调一遍 `vertexAttribPointer` + `vertexAttribDivisor(., 1)`，把 4 列分别喂进去。",
    tags: ["mat4", "属性位置", "机制"],
  },
  {
    id: "is-28",
    chapter: "instancing",
    level: 2,
    question: "行星带为什么用 `mat4` 当实例化属性，而不是只用 `vec3` 偏移？",
    answer:
      "因为每颗小行星不仅位置不同，**缩放、朝向也各异**。一个 `mat4` 能把平移 + 缩放 + 旋转打包成一份数据，着色器里 `instanceMatrix * vec4(aPos,1.0)` 一气呵成；只用 `vec3` 偏移就只能表达位置、表达不了缩放和旋转。",
    tags: ["行星带", "mat4", "为什么"],
  },
  {
    id: "is-29",
    chapter: "instancing",
    level: 2,
    question:
      "为什么说「画 1 个 vs 画 10000 个，实例化的 draw call 次数都是 1」？",
    answer:
      "因为实例化把「画多少个」交给一个 `instanceCount` 参数，GPU 内部循环画 N 遍，对 CPU 而言始终只发起一次绘制命令。所以无论 100 还是 10000，draw call 计数恒为 1，CPU 负担几乎不随实例数增长。",
    tags: ["实例化", "draw call", "为什么"],
  },
  {
    id: "is-30",
    chapter: "instancing",
    level: 2,
    question:
      "为什么逐个循环绘制（每个物体调一次 `drawElements`）画几千个会卡，实例化不会？",
    answer:
      "逐个绘制 = 几千趟 CPU→GPU 通信，每趟有固定开销，CPU 光发 draw call 就忙不过来、成为瓶颈、帧率暴跌；实例化只发 1 次 draw call，通信只有 1 趟，GPU 内部重复画，CPU 几乎没负担，所以拖到上万也流畅。",
    tags: ["实例化", "循环绘制", "对比"],
  },
  {
    id: "is-31",
    chapter: "instancing",
    level: 2,
    question:
      "three.js 的 `<instancedMesh>` 底层对应实例化里的什么？它把多少个网格画成几次 draw call？",
    answer:
      "`<instancedMesh>` 底层就是 `gl.drawElementsInstanced` 一次 draw call。它把成百上千个相同网格（共享一份几何，每个一份变换矩阵）画成 **1 次** draw call，正是实例化的封装。",
    tags: ["instancedMesh", "WebGL2"],
  },
  {
    id: "is-32",
    chapter: "instancing",
    level: 2,
    question: "uniform 数组传偏移的方式，为什么实例一多就不行？根因是什么？",
    answer:
      "根因是 uniform 数组有大小上限（受 `GL_MAX_VERTEX_UNIFORM_COMPONENTS` 限制）。`offsets[100]` 还能塞下，`offsets[10000]` 远超 GPU 的 uniform 容量，会编译失败或读到越界，所以海量实例必须改用实例化数组。",
    tags: ["uniform数组", "上限", "为什么"],
  },

  // ── L3 应用（读代码 / 给参数判结果 / 小计算） ──
  {
    id: "is-33",
    chapter: "instancing",
    level: 3,
    question:
      "用循环逐个绘制 5000 颗小行星（每颗调一次 `drawElements`），会发起多少次 draw call？换成实例化呢？",
    answer:
      "逐个绘制发起 **5000 次** draw call（循环每次调一次）。换成实例化只发起 **1 次**（`drawElementsInstanced(..., 5000)`），GPU 内部重复画 5000 遍。",
    tags: ["draw call", "计算", "应用"],
  },
  {
    id: "is-34",
    chapter: "instancing",
    level: 3,
    question:
      "看到代码 `glDrawArraysInstanced(GL_TRIANGLES, 0, 36, 1000)`，这是在画几个网格、多少次 draw call、每个网格几个顶点？",
    answer:
      "画 **1000 个**网格、只算 **1 次** draw call、每个网格 **36 个**顶点（一个立方体）。`36` 是单个网格的顶点数，`1000` 是 `instanceCount`。",
    tags: ["glDrawArraysInstanced", "读代码", "应用"],
  },
  {
    id: "is-35",
    chapter: "instancing",
    level: 3,
    question:
      "顶点着色器里写 `vec2 offset = offsets[gl_InstanceID];`，第 7 个实例（从 0 数）读到的是哪一条？",
    answer:
      "读到 `offsets[6]`——`gl_InstanceID` 对第 7 个实例（下标从 0 起，0,1,2,3,4,5,6）是 `6`。它拿这个下标去 uniform 数组取自己那份偏移。",
    tags: ["gl_InstanceID", "读代码", "应用"],
  },
  {
    id: "is-36",
    chapter: "instancing",
    level: 3,
    question:
      "某人设好实例化偏移 VBO 和 `glVertexAttribPointer(2, ...)`、着色器也写了 `in vec2 aOffset`，但 100 个实例全叠在一起。漏了哪一句？",
    answer:
      "漏了 `glVertexAttribDivisor(2, 1)`。没设步进频率，`aOffset` 默认 `divisor=0`、被当逐顶点读，每个顶点都往下取一条偏移，对应关系全乱，所有实例挤在一处。补上 `divisor=1` 即每实例读一条，100 个实例就摆到 100 个位置。",
    tags: ["glVertexAttribDivisor", "排错", "应用"],
  },
  {
    id: "is-37",
    chapter: "instancing",
    level: 3,
    question:
      "要给每实例传一个 `mat4` 矩阵，从 `location=3` 起，CPU 端 `for` 循环大致怎么写（设几个位置、各设什么）？",
    answer:
      "`for (i=0;i<4;i++)`：对 location `3+i` 各调 `glEnableVertexAttribArray(3+i)`、`glVertexAttribPointer(3+i, 4, GL_FLOAT, GL_FALSE, 4*vec4Size, (void*)(i*vec4Size))`、`glVertexAttribDivisor(3+i, 1)`。即 4 个位置全 enable + pointer（偏移 `i*vec4Size`）+ divisor=1。",
    tags: ["mat4", "读代码", "应用"],
  },
  {
    id: "is-38",
    chapter: "instancing",
    level: 3,
    question:
      "一片 1000 棵草，每棵位置不同、绕 Y 轴随机朝向不同。每棵草该用什么当实例化属性最合适？",
    answer:
      "用一个 **`mat4` 变换矩阵**（把「平移到这棵草的位置」和「绕 Y 轴转随机角度」组合进一个矩阵），位置和朝向打包成一份数据。着色器里 `gl_Position = projection * view * instanceMatrix * vec4(aPos,1.0)`。",
    tags: ["mat4", "实例化数组", "应用"],
  },
  {
    id: "is-39",
    chapter: "instancing",
    level: 3,
    question:
      "WebGL2 里把每实例 `vec2` 偏移设成实例化数组，对应 OpenGL 的 `glVertexAttribDivisor(2, 1)` 应该写哪一句？",
    answer:
      "写 `gl.vertexAttribDivisor(2, 1)`。WebGL2 函数同名、去 `gl` 前缀小驼峰化，参数一致：location 是 `2`、divisor 是 `1`（每实例读一条）。",
    tags: ["WebGL2", "glVertexAttribDivisor", "应用"],
  },
  {
    id: "is-40",
    chapter: "instancing",
    level: 3,
    question:
      "在 InstancingDemo 里把实例数从 100 拖到 10000，画面始终流畅、右上角 draw call 计数恒为多少？为什么？",
    answer:
      "恒为 **1**。因为无论多少颗小行星都由一个 `<instancedMesh>` 一次 draw call 画出，拖滑块改的只是 `mesh.count`（画多少个），不重建几何、不增加 draw call 次数，所以 CPU 负担几乎不变、始终流畅。",
    tags: ["InstancingDemo", "draw call", "应用"],
  },
  {
    id: "is-41",
    chapter: "instancing",
    level: 3,
    question:
      "顶点着色器写 `layout(location=3) in mat4 instanceMatrix;`，它实际占用了哪几个 location？CPU 端要设几次属性指针？",
    answer:
      "实际占用 location **3、4、5、6**（4 列 `vec4`）。CPU 端要设 **4 次** `vertexAttribPointer` + 4 次 `vertexAttribDivisor`，一列一个位置，漏一个那一列就乱。",
    tags: ["mat4", "读代码", "应用"],
  },
  {
    id: "is-42",
    chapter: "instancing",
    level: 3,
    question:
      "代码里把实例化数组的 `divisor` 误设成了 `2`（`glVertexAttribDivisor(loc, 2)`），效果会怎样？",
    answer:
      "每 **2 个**实例才往下读一条偏移——相邻两个实例共用同一份变换，于是实例两两重叠（成对叠在一起），只摆出一半数量的不同位置。要每实例一份必须用 `divisor=1`。",
    tags: ["divisor", "读代码", "应用"],
  },
  {
    id: "is-43",
    chapter: "instancing",
    level: 3,
    question:
      "想画 50000 个实例，用 `uniform vec2 offsets[50000]` 传偏移，编译会怎样？该怎么改？",
    answer:
      "几乎一定**编译失败**——`offsets[50000]` 远超 uniform 数组容量上限（`GL_MAX_VERTEX_UNIFORM_COMPONENTS`）。改用**实例化数组**：把 50000 个偏移放进 VBO，`vertexAttribPointer` + `vertexAttribDivisor(loc, 1)`，不受 uniform 容量限制。",
    tags: ["uniform数组", "上限", "应用"],
  },
  {
    id: "is-44",
    chapter: "instancing",
    level: 3,
    question:
      "看到一段代码用 `glDrawElementsInstanced(GL_TRIANGLES, indexCount, GL_UNSIGNED_INT, 0, amount)`，怎么判断它画的是带索引还是不带索引的几何？",
    answer:
      "带索引。函数名是 `Elements` 版（对应 `glDrawElements`），用的是索引缓冲（EBO），第二个参数 `indexCount` 是索引数、第四个 `0` 是索引偏移；`Arrays` 版才是不带索引、直接按顶点数组画。",
    tags: ["glDrawElementsInstanced", "读代码", "应用"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 边界） ──
  {
    id: "is-45",
    chapter: "instancing",
    level: 4,
    question:
      "实例化数组画出来全叠在一起、排不成阵列，最常见的根因是什么？怎么修？若是 `mat4` 要注意什么？",
    answer:
      "根因：实例化数组属性**忘了设 `glVertexAttribDivisor(loc, 1)`**，默认 `divisor=0` 被当逐顶点读，「每实例一份」全错。修法：给每个实例化数组属性显式调 `glVertexAttribDivisor(loc, 1)`。若是 `mat4` 占 4 个属性位，**4 个位置都要单独设**，漏一个那一列就乱。",
    tags: ["实例化数组", "divisor1", "陷阱"],
  },
  {
    id: "is-46",
    chapter: "instancing",
    level: 4,
    question:
      "少量实例用 `gl_InstanceID` + `uniform vec2 offsets[N]` 正常，实例一调大就编译失败 / 错乱。原因和修法？",
    answer:
      "原因：uniform 数组有大小上限（受 `GL_MAX_VERTEX_UNIFORM_COMPONENTS` 限制），`offsets[10000]` 远超容量。修法：大量实例别用 uniform 数组，改用**实例化数组**（每实例数据放进 VBO + `divisor=1`），想画多少就准备多少条，不受 uniform 容量限制。",
    tags: ["uniform数组", "上限", "陷阱"],
  },
  {
    id: "is-47",
    chapter: "instancing",
    level: 4,
    question:
      "有人想用实例化「一次画一片各不相同的物体」（树、石头、房子混着画），发现做不到。原因和正确做法？",
    answer:
      "原因：实例化画的是**同一个网格的多份**——所有实例几何完全相同，只能换变换 / 属性、不能换几何。做法：不同网格分别用各自的实例化绘制（每种网格一次 `glDrawElementsInstanced`）；想真正混画不同几何要用别的技术（如 `glMultiDrawElements`），不在实例化范畴。",
    tags: ["实例化", "几何相同", "陷阱"],
  },
  {
    id: "is-48",
    chapter: "instancing",
    level: 4,
    question:
      "用 `mat4` 实例化矩阵，画出来的实例只有一部分变换生效 / 整片扭曲。原因和修法？",
    answer:
      "原因：`mat4` 占 4 个连续属性位（如 location 3/4/5/6），CPU 端只设了第一个（location 3）、漏设了其余三列的 `vertexAttribPointer` / `enableVertexAttribArray` / `divisor`。修法：用 `for(i=0;i<4;i++)` 把 location `3+i` 四个位置全部 enable + pointer（偏移 `i*vec4Size`）+ `divisor(3+i, 1)` 设齐。",
    tags: ["mat4", "属性位置", "陷阱"],
  },
  {
    id: "is-49",
    chapter: "instancing",
    level: 4,
    question:
      "把一条「draw call 开销→实例化省钱」的链路讲清：为什么画 1000 个小物体逐个画会卡、实例化不会？",
    answer:
      "①逐个画 = 调 1000 次 `drawElements` → ②每次 CPU 都打包绘制命令发给 GPU、有固定通信开销 → ③1000 趟通信 CPU 反复「吩咐」成为瓶颈、帧率暴跌。实例化把这 1000 次压成 1 次 `drawElementsInstanced(..., 1000)`：CPU 只喊 1 遍，GPU 内部重复画，通信开销几乎为零，所以不卡。省的是 CPU 喊话的开销，不是 GPU 画三角形的活。",
    tags: ["draw call", "实例化", "综合"],
  },
  {
    id: "is-50",
    chapter: "instancing",
    level: 4,
    question:
      "把一段「`gl_InstanceID` + uniform 数组」的实例化代码改造成「实例化数组」，至少要动哪几处？为什么这样改能突破上限？",
    answer:
      "①把 `uniform vec2 offsets[N]` 删掉，改成 `layout(location=k) in vec2 aOffset;`；②CPU 端把偏移从 `uniform2fv` 改成放进 VBO，用 `glVertexAttribPointer(k,...)` + `glEnableVertexAttribArray(k)`；③加 `glVertexAttribDivisor(k, 1)`。能突破上限是因为数据从容量有限的 uniform 搬到了容量大得多的 VBO（顶点属性），想画多少准备多少条。",
    tags: ["实例化数组", "gl_InstanceID", "综合"],
  },
  {
    id: "is-51",
    chapter: "instancing",
    level: 4,
    question:
      "实例化数组属性默认 `divisor` 是几？这个默认值为什么对实例化数组是个「坑」？",
    answer:
      "默认是 `0`（逐顶点）。坑在于：实例化数组要的是 `1`（逐实例），但它和普通顶点属性共用同一个默认值 `0`，若不显式改，GPU 就把它当普通逐顶点属性读，每个顶点取一条偏移、「每实例一份」全错——这是实例化头号大坑，必须显式 `divisor=1`。",
    tags: ["divisor", "默认值", "陷阱"],
  },
  {
    id: "is-52",
    chapter: "instancing",
    level: 4,
    question:
      "为什么 three.js `<instancedMesh>` 改 `mesh.count` 从 100 到 10000 不卡、不重建几何？背后是哪几个实例化机制在起作用？",
    answer:
      "因为几何只存一份（共享 BufferGeometry），每实例的变换矩阵存在一个实例化数组（`InstancedBufferAttribute`，`divisor=1`），改 `count` 只是告诉 `drawElementsInstanced` 画前几个、不动几何和缓冲。draw call 始终 1 次、CPU 负担几乎不随 count 增长，所以拖到 10000 也流畅。",
    tags: ["instancedMesh", "实例化数组", "综合"],
  },
  {
    id: "is-53",
    chapter: "instancing",
    level: 4,
    question:
      "同样画 10000 个相同立方体，「逐个 draw」和「实例化」在 CPU 开销、GPU 画三角形工作量上分别差多少？",
    answer:
      "CPU 开销：逐个 draw 要 10000 次 draw call 通信，实例化只 1 次，CPU 端差约 10000 倍；GPU 画三角形的工作量：两者**几乎一样**（都要画 10000 个立方体的三角形）。区别全在 CPU 喊话次数，不在 GPU 画三角形——这正是实例化省的地方。",
    tags: ["实例化", "draw call", "综合"],
  },
];
