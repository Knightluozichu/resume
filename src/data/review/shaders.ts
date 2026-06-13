/** 复习题库 · 着色器（shaders）。Phase B 各章独立文件，避免并行写冲突。 */

import type { ReviewQuestion } from "./types";

export const shadersQuestions: ReviewQuestion[] = [
  {
    id: "sh-1",
    chapter: "shaders",
    level: 1,
    question: "GLSL 是什么？为什么图形要专门用一门语言？",
    answer:
      "GLSL（OpenGL Shading Language）是写着色器的小语言，语法很像 C。专设一门语言是因为 GPU 会用同一段代码对成千上万个顶点/像素并行跑，GLSL 为这种「一份代码、海量并行」设计，还自带 vec/mat 等图形类型。",
    tags: ["GLSL"],
  },
  {
    id: "sh-2",
    chapter: "shaders",
    level: 2,
    question: "in/out 和 uniform 各自传的是什么数据？从哪来到哪去？",
    answer:
      "in/out 在两段着色器之间传逐顶点/逐片段的数据：上一段用 `out` 递出、下一段用同名同类型的 `in` 接收。uniform 是从你的程序（CPU）传进着色器的全局只读变量，一次绘制里所有顶点/片段读到的值都相同（如时间、颜色、变换矩阵），着色器里只能读不能改。",
    tags: ["in/out", "uniform"],
  },
  {
    id: "sh-3",
    chapter: "shaders",
    level: 2,
    question: "顶点只有 3 个角，片段着色器里那片连续渐变的颜色是哪来的？",
    answer:
      "来自片段插值。光栅化把三角形切成片段时，会把三个顶点的 out 值按每个片段离三个角的远近自动混合算出——顶点只定了角上的值，中间是「混」出来的，于是得到连续渐变。",
    tags: ["片段插值"],
  },
  {
    id: "sh-4",
    chapter: "shaders",
    level: 3,
    question:
      "从程序里给一个 uniform 写值的两个步骤是什么？写值前有一条铁律是什么？",
    answer:
      "两步：先用 `getUniformLocation(program, 名字)` 问出 uniform 的位置（句柄），再用 `gl.uniform*`（如 `uniform1f`/`uniform3f`）把值写进那个位置。铁律：写值前必须先 `useProgram` 启用目标程序，否则值写不进去。",
    tags: ["uniform", "useProgram"],
  },
  {
    id: "sh-5",
    chapter: "shaders",
    level: 3,
    question:
      "顶点着色器写 `out vec3 vColor;`，片段着色器写 `in vec4 vColor;`，会发生什么？",
    answer:
      "会编译/链接失败（或行为未定义）。名字虽都叫 `vColor`，但类型一边 `vec3` 一边 `vec4` 对不上。in/out 是同一根管子的两头，名字和类型都必须一字不差，应把片段着色器那行改成 `in vec3 vColor;`。",
    tags: ["in/out", "误区"],
  },
  {
    id: "sh-6",
    chapter: "shaders",
    level: 4,
    question:
      "Demo 里「随时间脉动」的动画是怎么实现的？它有没有重新编译着色器？",
    answer:
      "靠一个名叫 `uTime` 的 uniform，在渲染循环里每帧用 `gl.uniform1f` 把新的时间值写进去，片段着色器里 `sin(uTime)` 跟着变，颜色就动了。没有重新编译着色器——调控件/做动画只是每帧上传新的 uniform 值，这正是 uniform 的用法。",
    tags: ["uniform", "动画"],
  },

  // ── L1 认记 ──
  {
    id: "sh-7",
    chapter: "shaders",
    level: 1,
    question: "GLSL 的全称是什么？",
    answer: "OpenGL Shading Language，即 OpenGL 着色器语言。",
    tags: ["GLSL"],
  },
  {
    id: "sh-8",
    chapter: "shaders",
    level: 1,
    question: "GLSL 语法长得最像哪门常见语言？",
    answer:
      "像 C。它同样有 `float`、`if`、`for`、函数和 `main()`，只是另外内置了 `vec`、`mat` 等图形类型。",
    tags: ["GLSL"],
  },
  {
    id: "sh-9",
    chapter: "shaders",
    level: 1,
    question: "`vec2`、`vec3`、`vec4` 各装几个 `float`？",
    answer: "分别装 2、3、4 个 `float`。",
    tags: ["向量类型"],
  },
  {
    id: "sh-10",
    chapter: "shaders",
    level: 1,
    question: "颜色一般用哪个向量类型表示？四个分量分别是什么？",
    answer:
      "用 `vec4`，写成 `vec4(r, g, b, a)`，四个分量是红、绿、蓝、透明度（都在 0~1）。",
    tags: ["向量类型", "颜色"],
  },
  {
    id: "sh-11",
    chapter: "shaders",
    level: 1,
    question: "顶点着色器里那个「顶点最终位置」的内建变量叫什么？",
    answer: "`gl_Position`，顶点着色器必须给它赋值。",
    tags: ["内建变量", "gl_Position"],
  },
  {
    id: "sh-12",
    chapter: "shaders",
    level: 1,
    question: "片段着色器里读「当前片段屏幕坐标」的内建变量叫什么？它能写吗？",
    answer: "`gl_FragCoord`，它是只读的（片段的屏幕坐标）。",
    tags: ["内建变量", "gl_FragCoord"],
  },
  {
    id: "sh-13",
    chapter: "shaders",
    level: 1,
    question: "GLSL 里声明「输出给下一段」和「从上一段接收」分别用哪个关键字？",
    answer: "输出用 `out`，接收用 `in`。",
    tags: ["in/out"],
  },
  {
    id: "sh-14",
    chapter: "shaders",
    level: 1,
    question: "桌面 OpenGL 3.3 的版本声明怎么写？",
    answer: "`#version 330 core`，写在着色器源码第一行。",
    tags: ["#version"],
  },
  {
    id: "sh-15",
    chapter: "shaders",
    level: 1,
    question: "WebGL2 的着色器版本声明怎么写？",
    answer: "`#version 300 es`，写在着色器源码第一行。",
    tags: ["#version", "WebGL2"],
  },
  {
    id: "sh-16",
    chapter: "shaders",
    level: 1,
    question: "uniform 这个词的字面含义是什么？它暗示了什么特性？",
    answer:
      "uniform 意为「统一的」，暗示一次绘制中每个顶点、每个片段读到的这个值都完全相同。",
    tags: ["uniform"],
  },
  {
    id: "sh-17",
    chapter: "shaders",
    level: 1,
    question: "swizzle 是指什么？举两个例子。",
    answer:
      "swizzle 是取向量分量的简写，如 `color.r` 取红分量、`color.rgb` 一次取前三个。",
    tags: ["swizzle"],
  },
  {
    id: "sh-18",
    chapter: "shaders",
    level: 1,
    question: "向量分量除了 `.x/.y/.z/.w`，还能用哪两套字母？",
    answer: "颜色用 `.r/.g/.b/.a`；另有一套纹理坐标常用的 `.s/.t/.p/.q`。",
    tags: ["swizzle"],
  },
  {
    id: "sh-19",
    chapter: "shaders",
    level: 1,
    question: "做坐标变换的矩阵类型一般是哪两个？",
    answer:
      "`mat3`（3×3）和 `mat4`（4×4），本章只点名，留给后面「变换」章展开。",
    tags: ["矩阵"],
  },
  {
    id: "sh-20",
    chapter: "shaders",
    level: 1,
    question: "片段着色器最终输出的颜色是用什么声明的？",
    answer:
      "用一个 `out vec4`（如 `out vec4 FragColor;`），把它当作这个片段的最终颜色输出。",
    tags: ["内建变量", "FragColor"],
  },
  {
    id: "sh-21",
    chapter: "shaders",
    level: 1,
    question: "WebGL2 片段着色器里那行声明浮点精度的语句怎么写？",
    answer:
      "`precision highp float;`（高精度），写在 `#version 300 es` 下一行。",
    tags: ["precision", "WebGL2"],
  },
  {
    id: "sh-22",
    chapter: "shaders",
    level: 1,
    question: "本章把着色器比喻成什么？",
    answer:
      "比喻成给 GPU 的两张「食谱」——一张管「每个角摆在哪」（顶点），一张管「每个点染成什么色」（片段）。",
    tags: ["GLSL", "比喻"],
  },
  {
    id: "sh-23",
    chapter: "shaders",
    level: 1,
    question: "把值从 CPU 写进 uniform 用的是哪一族函数？",
    answer:
      "`glUniform*` 族（WebGL2 是 `gl.uniform*`），如 `uniform1f`、`uniform3f`。",
    tags: ["uniform", "glUniform"],
  },

  // ── L2 理解 ──
  {
    id: "sh-24",
    chapter: "shaders",
    level: 2,
    question: "为什么图形要专门设计 GLSL，而不直接用 C++/JS？",
    answer:
      "因为 GPU 的活法和 CPU 不同：同一段代码会被几千个核心同时拿去，各自处理一个顶点或像素。GLSL 为这种「一份代码、海量并行」量身设计，还内置了图形最常用的向量、矩阵类型。",
    tags: ["GLSL"],
  },
  {
    id: "sh-25",
    chapter: "shaders",
    level: 2,
    question: "`in/out` 传的数据和 `uniform` 传的数据有什么本质区别？",
    answer:
      "`in/out` 传逐顶点 / 逐片段「各不相同」的数据，顺着流水线一段段往下流；`uniform` 传「对整次绘制都一样」的全局值，从流水线侧面横插进来，两段着色器都够得着。",
    tags: ["in/out", "uniform"],
  },
  {
    id: "sh-26",
    chapter: "shaders",
    level: 2,
    question: "为什么说着色器里 uniform 是「只读」的？",
    answer:
      "uniform 的值由 CPU 端一次性写定，在一次绘制中所有顶点 / 片段共享同一份；着色器里只能读取它参与计算，不能改写它的值。",
    tags: ["uniform"],
  },
  {
    id: "sh-27",
    chapter: "shaders",
    level: 2,
    question: "`in/out` 的「同一根管子两头」是什么意思？配对要满足什么？",
    answer:
      "意思是上一段的 `out` 和下一段的 `in` 是同一通道的两端。配对要求名字和类型一字不差，否则两根管子对不上、接不起来。",
    tags: ["in/out"],
  },
  {
    id: "sh-28",
    chapter: "shaders",
    level: 2,
    question:
      "顶点着色器只对 3 个顶点跑，片段着色器为什么能拿到铺满三角形的颜色？",
    answer:
      "因为光栅化把三角形切成片段时，会把三个顶点的 `out` 值按每个片段离三个角的远近自动混合，算出每个片段的 `in` 值——中间的值是插值「混」出来的，顶点只定了角上的值。",
    tags: ["片段插值"],
  },
  {
    id: "sh-29",
    chapter: "shaders",
    level: 2,
    question: "`color.r`、`color.rgb`、`pos.xy` 分别取到什么？",
    answer:
      "`color.r` 取红分量（1 个 float），`color.rgb` 取前三个分量（一个 vec3），`pos.xy` 取前两个分量（一个 vec2）。",
    tags: ["swizzle"],
  },
  {
    id: "sh-30",
    chapter: "shaders",
    level: 2,
    question: "颜色用 `.rgba`、坐标用 `.xyzw`，它们指的是不同的东西吗？",
    answer:
      "不是。对同一个向量来说，`.rgba` 和 `.xyzw` 指的是同一批分量，只是叫法不同——颜色场景习惯用 `rgba`，坐标场景习惯用 `xyzw`。",
    tags: ["swizzle"],
  },
  {
    id: "sh-31",
    chapter: "shaders",
    level: 2,
    question: "上传 uniform 为什么要先 `useProgram`？",
    answer:
      "因为 uniform 是写进「当前启用的程序」里的。不先 `useProgram` 启用目标程序，显卡不知道该把值写进哪个程序，值就写不进去。",
    tags: ["uniform", "useProgram"],
  },
  {
    id: "sh-32",
    chapter: "shaders",
    level: 2,
    question: "`glGetUniformLocation` 返回的「位置」是什么？拿它来干嘛？",
    answer:
      "返回的是这个 uniform 在程序里的「地址」（一个句柄）。拿到它后，再用 `glUniform*` 把值写进这个地址。",
    tags: ["glGetUniformLocation", "uniform"],
  },
  {
    id: "sh-33",
    chapter: "shaders",
    level: 2,
    question: "动画为什么要「每帧」重新上传 uTime，而不是上传一次就够？",
    answer:
      "因为 uniform 只是「写进去那一刻」的值，写进去后不会自己变。要让画面动，就得在渲染循环里每帧把新的时间值写一遍，片段着色器里 `sin(uTime)` 才会跟着变。",
    tags: ["uniform", "动画"],
  },
  {
    id: "sh-34",
    chapter: "shaders",
    level: 2,
    question: "为什么 `gl_Position` 和 `FragColor` 不用我们自己声明类型来源？",
    answer:
      "`gl_Position` 是 GLSL 规定的内建变量，含义固定（顶点最终位置）；`FragColor` 是我们声明的 `out vec4`，但片段着色器把这个输出当作最终颜色是 GLSL 的约定。它们都不是从 VBO/uniform 来的普通数据。",
    tags: ["内建变量"],
  },
  {
    id: "sh-35",
    chapter: "shaders",
    level: 2,
    question:
      "顶点着色器里 `layout (location = 0) in vec3 aPos;` 这个 `in` 和阶段间传值的 `in` 是一回事吗？",
    answer:
      "不完全是。它是「顶点属性」输入，数据来自 VBO（每个顶点一份），用 `location` 指定槽位；而阶段间传值的 `in` 是接上一段着色器 `out` 递来的、已被插值的数据。两者都用 `in`，但数据来源不同。",
    tags: ["in/out", "顶点属性"],
  },
  {
    id: "sh-36",
    chapter: "shaders",
    level: 2,
    question: "为什么向量能整组直接相加、相乘，还能和 `float` 混算？",
    answer:
      "这是 GLSL 为图形定制的便利：向量运算逐分量进行，和 `float` 混算时把 `float` 广播到每个分量。这样写颜色 / 坐标的批量运算非常省事，也是 GLSL「图形味」浓的原因。",
    tags: ["向量类型"],
  },
  {
    id: "sh-37",
    chapter: "shaders",
    level: 2,
    question: "uniform 的声明可以写在哪段着色器里？",
    answer:
      "哪段要用就在哪段声明。声明本身两端都是 GLSL、写法完全一样；常把只在片段着色器用的（如颜色、时间）声明在片段着色器顶部。",
    tags: ["uniform"],
  },
  {
    id: "sh-38",
    chapter: "shaders",
    level: 2,
    question: "本章 Demo 里改控件，到底改的是什么？需要重新编译着色器吗？",
    answer:
      "改的是对应的 uniform 值（如基色改 `uColor`、速度改 `uSpeed`）。不需要重新编译着色器——只是每帧把新值通过 `gl.uniform*` 上传进去。",
    tags: ["uniform", "动画"],
  },
  {
    id: "sh-39",
    chapter: "shaders",
    level: 2,
    question:
      "为什么说 `uColor * pulse` 能做出「整块同色的呼吸灯」而不是渐变？",
    answer:
      "因为去掉了 `uv`（位置）的参与后，每个片段的颜色只剩 `uColor * pulse`，与片段位置无关，所以整块画面同色；`pulse` 随 `uTime` 在 0~1 起伏，于是整面一起明暗呼吸。",
    tags: ["片段插值", "动画"],
  },
  {
    id: "sh-40",
    chapter: "shaders",
    level: 2,
    question:
      "两段着色器逻辑相同时，C++ 与 WebGL2 的 GLSL 源码主要差在哪两处？",
    answer:
      "差在版本声明（`#version 330 core` vs `#version 300 es`），以及 WebGL2 的片段着色器要多写一行 `precision highp float;`（桌面 OpenGL 不需要）。其余 GLSL 逻辑两端通用。",
    tags: ["#version", "precision"],
  },

  // ── L3 应用 ──
  {
    id: "sh-41",
    chapter: "shaders",
    level: 3,
    question:
      "想从程序里给片段着色器传一个 `float uTime`，完整三步怎么写（WebGL2）？",
    answer:
      '①着色器里声明 `uniform float uTime;`；②`gl.useProgram(program)` 后 `const loc = gl.getUniformLocation(program, "uTime");`；③`gl.uniform1f(loc, t);`。先启用程序、名字两边一致、`float` 用 `1f`。',
    tags: ["uniform", "应用"],
  },
  {
    id: "sh-42",
    chapter: "shaders",
    level: 3,
    question:
      "要传一个 `vec3` 颜色给 uniform，应该用哪个上传函数？示例怎么写？",
    answer:
      "用 `uniform3f`（三个 float 分量）。例如 `gl.uniform3f(locColor, 1.0, 0.5, 0.0);` 传一个橙色；C++ 同理 `glUniform3f(locColor, 1.0f, 0.5f, 1.0f);`。",
    tags: ["uniform", "应用"],
  },
  {
    id: "sh-43",
    chapter: "shaders",
    level: 3,
    question: "顶点着色器写 `out vec3 vColor;`，片段着色器要怎么写才能接住？",
    answer:
      "片段着色器要写 `in vec3 vColor;`——名字 `vColor`、类型 `vec3` 都和顶点着色器的 `out` 一字不差。",
    tags: ["in/out", "应用"],
  },
  {
    id: "sh-44",
    chapter: "shaders",
    level: 3,
    question: "想把片段颜色直接由它的归一化屏幕位置决定，main 里大致怎么写？",
    answer:
      "先 `vec2 uv = gl_FragCoord.xy / uResolution;` 把片段屏幕坐标归一化到 0~1，再 `FragColor = vec4(uv.x, uv.y, 0.5, 1.0);` 之类，让 x、y 位置直接当颜色分量。",
    tags: ["gl_FragCoord", "应用"],
  },
  {
    id: "sh-45",
    chapter: "shaders",
    level: 3,
    question: "C++ 里调 `glUniform1f` 前的「位置」是怎么拿到的？写出这两行。",
    answer:
      '用 `glGetUniformLocation` 按名字问出：`int locTime = glGetUniformLocation(program, "uTime");` 然后 `glUniform1f(locTime, currentTime);`。',
    tags: ["glGetUniformLocation", "应用"],
  },
  {
    id: "sh-46",
    chapter: "shaders",
    level: 3,
    question:
      "想做一个「随时间脉动的亮度」`pulse`（0~1 起伏），用 `uTime` 和 `uSpeed` 怎么写？",
    answer:
      "`float pulse = 0.5 + 0.5 * sin(uTime * uSpeed);`。`sin` 输出 -1~1，乘 0.5 加 0.5 映射到 0~1；`uSpeed` 控制快慢，调到 0 则 `sin` 恒为定值、画面静止。",
    tags: ["动画", "应用"],
  },
  {
    id: "sh-47",
    chapter: "shaders",
    level: 3,
    question: "WebGL2 渲染循环里每帧更新 uTime 的几行核心代码怎么写？",
    answer:
      "在每帧回调里：`gl.useProgram(program); gl.uniform1f(locTime, tMs / 1000); gl.bindVertexArray(vao); gl.drawArrays(gl.TRIANGLES, 0, 3); requestAnimationFrame(frame);`。注意毫秒要转秒。",
    tags: ["动画", "应用"],
  },
  {
    id: "sh-48",
    chapter: "shaders",
    level: 3,
    question: "想用 swizzle 把一个 `vec3 c`（rgb）反序成 bgr，怎么写？",
    answer: "`c.bgr`，即按 `.b`、`.g`、`.r` 的顺序重排取出一个新的 vec3。",
    tags: ["swizzle", "应用"],
  },
  {
    id: "sh-49",
    chapter: "shaders",
    level: 3,
    question:
      "顶点着色器只有位置属性 `aPos`，想给每个顶点算个颜色递给片段着色器，怎么做？",
    answer:
      "在顶点着色器声明 `out vec3 vColor;`，main 里用位置算颜色（如 `vColor = aPos * 0.5 + 0.5;`）；片段着色器声明同名同类型的 `in vec3 vColor;` 接收，再 `FragColor = vec4(vColor, 1.0);`。",
    tags: ["in/out", "应用"],
  },
  {
    id: "sh-50",
    chapter: "shaders",
    level: 3,
    question:
      "在 WebGL2 里拿到 uniform location 后，使用前该做什么判断？为什么？",
    answer:
      "应判 `null`。因为 `gl.getUniformLocation` 找不到（名字拼错或该 uniform 被优化掉）时返回 `null`，对 `null` 调 `uniform*` 是无效的。",
    tags: ["glGetUniformLocation", "应用"],
  },
  {
    id: "sh-51",
    chapter: "shaders",
    level: 3,
    question: "想让基色和「位置+脉动」按 6:4 混合，用哪个内建函数？怎么写？",
    answer:
      "用 `mix`：`vec3 col = mix(uColor, vec3(uv.x, uv.y, pulse), 0.6);`。第三个参数 0.6 表示结果偏向第二个参数 60%（即基色占 40%）。",
    tags: ["应用", "mix"],
  },
  {
    id: "sh-52",
    chapter: "shaders",
    level: 3,
    question: "把 Demo 改成「速度调到 0 就完全静止」，原理上要保证什么？",
    answer:
      "保证时间项写成 `uTime * uSpeed`（或类似乘了 `uSpeed` 的形式）。这样 `uSpeed = 0` 时时间项恒为 0，`sin` 不再随时间变，`pulse` 定住、画面静止。",
    tags: ["动画", "应用"],
  },
  {
    id: "sh-53",
    chapter: "shaders",
    level: 3,
    question:
      "C++ 里 `glGetUniformLocation` 找不到 uniform 返回什么？用前怎么判？",
    answer: "返回 `-1`。用前应判 `if (loc != -1)`，避免对无效位置写值。",
    tags: ["glGetUniformLocation", "应用"],
  },
  {
    id: "sh-54",
    chapter: "shaders",
    level: 3,
    question:
      "想把一个 `vec2 uv`（0~1）当作前两个颜色分量、第三个固定 0.5 输出，怎么写 `FragColor`？",
    answer:
      "`FragColor = vec4(uv, 0.5, 1.0);` 或 `FragColor = vec4(uv.x, uv.y, 0.5, 1.0);`——`vec4` 可以直接拿 `vec2` 拼接补齐分量。",
    tags: ["向量类型", "应用"],
  },

  // ── L4 综合·陷阱 ──
  {
    id: "sh-55",
    chapter: "shaders",
    level: 4,
    question:
      "一边 `out vColor`、一边 `in color`，名字不同会怎样？只改名字够吗？",
    answer:
      "接不上：编译 / 链接失败或片段收到的颜色全是 0。`in/out` 配对要求名字和类型都一致，所以名字要改一致；还要顺带确认类型也对得上，否则仍然接不起来。",
    tags: ["in/out", "陷阱"],
  },
  {
    id: "sh-56",
    chapter: "shaders",
    level: 4,
    question: "`glUniform*` 调了、没报错，画面却毫无反应。最可能漏了哪一步？",
    answer:
      "最可能漏了上传前的 `glUseProgram(program)`。uniform 写进的是「当前启用的程序」，没启用就等于写了个寂寞。修法：每次 `uniform*` 前先 `useProgram`。",
    tags: ["uniform", "useProgram", "陷阱"],
  },
  {
    id: "sh-57",
    chapter: "shaders",
    level: 4,
    question:
      "uniform 名字拼对了、也 useProgram 了，改它画面还是不变，可能是什么原因？",
    answer:
      "可能这个 uniform 在 GLSL 里没被实际用到（没参与 `main` 输出），被编译器优化掉了，于是 `getUniformLocation` 返回 `-1`/`null`。修法：确认它真的参与了输出，拿到 location 后先判 `-1`/`null`。",
    tags: ["glGetUniformLocation", "陷阱"],
  },
  {
    id: "sh-58",
    chapter: "shaders",
    level: 4,
    question:
      "同一份 GLSL 在桌面 OpenGL 跑得好好的，搬到 WebGL2 片段着色器却编译失败报 `No precision specified`，为什么？怎么修？",
    answer:
      "因为 WebGL2（GLSL ES）的片段着色器必须显式声明浮点精度，而桌面 OpenGL 不需要。修法：在 `#version 300 es` 下一行加 `precision highp float;`。",
    tags: ["precision", "WebGL2", "陷阱"],
  },
  {
    id: "sh-59",
    chapter: "shaders",
    level: 4,
    question:
      "为什么动画不能靠「改 uniform 时重新编译着色器」来实现？正确做法是什么？",
    answer:
      "重新编译着色器很贵、也没必要——着色器逻辑没变，变的只是输入值。正确做法是每帧只用 `gl.uniform*` 上传新的 uniform 值（如 `uTime`），着色器照旧跑，画面就动了。",
    tags: ["uniform", "动画", "陷阱"],
  },
  {
    id: "sh-60",
    chapter: "shaders",
    level: 4,
    question: "若顶点着色器忘了给 `gl_Position` 赋值，会有什么后果？",
    answer:
      "`gl_Position` 是顶点着色器必须赋值的内建变量（顶点最终位置）。不赋值则顶点位置未定义，光栅化拿不到正确的裁剪空间坐标，三角形画不出来或位置全错。",
    tags: ["内建变量", "gl_Position", "陷阱"],
  },
  {
    id: "sh-61",
    chapter: "shaders",
    level: 4,
    question: "「顶点着色器对每个像素跑一遍、所以能算出渐变」这个说法错在哪？",
    answer:
      "错在主体。顶点着色器只对几个顶点跑（三角形就 3 个角），渐变是光栅化把顶点 `out` 值按远近插值「混」出来的，到片段着色器已是现成的 `in`。是插值在铺满中间的像素，不是顶点着色器逐像素跑。",
    tags: ["片段插值", "陷阱"],
  },
  {
    id: "sh-62",
    chapter: "shaders",
    level: 4,
    question:
      "把 Demo 里 `mix(uColor, vec3(uv.x, uv.y, pulse), 0.6)` 的第三个参数从 0.6 改成 0，画面会怎样？",
    answer:
      "会变成纯由 `uColor` 决定的画面：`mix(a, b, 0.0)` 结果等于 `a`，第二项（位置 + 脉动）完全不参与，于是整块就是基色，位置渐变和脉动都消失。",
    tags: ["mix", "陷阱"],
  },
  {
    id: "sh-63",
    chapter: "shaders",
    level: 4,
    question:
      "把可编辑 Demo 里 `precision highp float;` 整行删掉，会发生什么？这印证了什么？",
    answer:
      "编辑器停手后会标红报错、画面停更——因为 WebGL2 片段着色器漏写精度声明就编译失败。这正是「WebGL2 片段着色器必写 precision」这个坑的真身，改回来即恢复。",
    tags: ["precision", "WebGL2", "陷阱"],
  },
  {
    id: "sh-64",
    chapter: "shaders",
    level: 4,
    question:
      "为什么时间、整体色调、变换矩阵适合用 uniform，而顶点颜色更适合用 in/out？",
    answer:
      "时间 / 色调 / 矩阵对整次绘制都一样，符合 uniform「所有顶点片段同值」的语义；顶点颜色逐顶点不同、且要插值铺满三角形内部，正是 `in/out` + 片段插值要传的「逐顶点 / 逐片段各异」数据。",
    tags: ["uniform", "in/out", "综合"],
  },
  {
    id: "sh-65",
    chapter: "shaders",
    level: 4,
    question:
      "C++ 的 `glGetUniformLocation` 和 WebGL2 的 `gl.getUniformLocation` 返回值有何不同？各自怎么判失败？",
    answer:
      "C++ 返回 `int`，找不到返回 `-1`，判 `loc != -1`；WebGL2 返回 `WebGLUniformLocation` 对象或 `null`，找不到 / 被优化掉时为 `null`，判 `loc !== null`。",
    tags: ["glGetUniformLocation", "综合", "API 差异"],
  },
  {
    id: "sh-66",
    chapter: "shaders",
    level: 4,
    question:
      "顶点 `out vec3 vColor`、片段 `in vec4 vColor`，名字一致但类型不同，能跑通吗？怎么改？",
    answer:
      "不能，会编译 / 链接失败或行为未定义。`in/out` 名字和类型都必须一字不差，类型 `vec3` 与 `vec4` 对不上。把片段那行改成 `in vec3 vColor;` 即可。",
    tags: ["in/out", "陷阱"],
  },
  {
    id: "sh-67",
    chapter: "shaders",
    level: 4,
    question: "为什么 `uTime` 写一次后画面会动，但不再调用上传就停住了？",
    answer:
      "因为 uniform 在着色器里只读、不会自己随时间变。`sin(uTime)` 之所以变，是 CPU 每帧给 `uTime` 喂了新值。一旦停止每帧上传，`uTime` 就停在最后写入的那个值，画面随之定住。",
    tags: ["uniform", "动画", "综合"],
  },
  {
    id: "sh-68",
    chapter: "shaders",
    level: 4,
    question:
      "想让两个不同的着色器程序各自的同名 uniform `uTime` 都更新，为什么不能只 useProgram 一次？",
    answer:
      "因为 uniform 写进的是「当前启用的那个程序」。两个程序各有独立的 uniform 存储，要分别给两个程序的 `uTime` 写值，就得分别 `useProgram` 后各自上传，不能只启用一个就指望两个都被更新。",
    tags: ["uniform", "useProgram", "综合"],
  },
  {
    id: "sh-69",
    chapter: "shaders",
    level: 4,
    question:
      "片段着色器把 `gl_FragCoord.xy` 直接当颜色分量（不除以分辨率）会有什么问题？",
    answer:
      "`gl_FragCoord.xy` 是以像素为单位的屏幕坐标，值远超 0~1（可达几百上千），直接当颜色会被钳到 1（几乎全白）。要先除以 `uResolution` 归一化到 0~1 再当颜色，才有连续渐变。",
    tags: ["gl_FragCoord", "陷阱"],
  },
  {
    id: "sh-70",
    chapter: "shaders",
    level: 4,
    question:
      "用一句话串起本章数据流：从 CPU 到屏幕上一个片段的颜色，数据经过了哪几道关卡？",
    answer:
      "CPU 通过 `uniform`（先 `useProgram` + `getUniformLocation` + `uniform*`）和顶点属性（VBO）喂入数据 → 顶点着色器算 `gl_Position` 并用 `out` 递出逐顶点值 → 光栅化把这些 `out` 值插值成每个片段的 `in` → 片段着色器结合 uniform 算出 `FragColor` 输出到屏幕。",
    tags: ["综合", "数据流"],
  },
];
