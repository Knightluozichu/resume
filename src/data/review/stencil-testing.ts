/** 复习题库 · 模板测试（stencil-testing）。HEL-78 高级OpenGL篇。 */

import type { ReviewQuestion } from "./types";

export const stencilTestingQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / 数值约定 / 调用原型） ──
  {
    id: "st-1",
    chapter: "stencil-testing",
    level: 1,
    question: "什么是「模板缓冲」（stencil buffer）？每像素存什么？",
    answer:
      "显存里一块和颜色缓冲一样大的内存，为每个像素额外存一个**整数**（通常 8 位，0~255）。它像一张盖在画布上的镂空模板，只在幕后记账，供模板测试拿这个整数做比较、决定片段去留。",
    tags: ["模板缓冲", "定义"],
  },
  {
    id: "st-2",
    chapter: "stencil-testing",
    level: 1,
    question: "什么是「模板值」（stencil value）？它有固定的物理含义吗？",
    answer:
      "模板缓冲里每个像素存的那个整数（0~255）。它**没有固定物理含义**，含义由你自己规定——本章最常用的约定是「物体覆盖到的像素记 1、其余记 0」。",
    tags: ["模板值", "定义"],
  },
  {
    id: "st-3",
    chapter: "stencil-testing",
    level: 1,
    question: "模板缓冲通常是多少位？一个像素能有多少种模板值？",
    answer:
      "通常是 8 位，所以一个像素能有 0~255 共 256 种模板值。",
    tags: ["模板缓冲", "精度"],
  },
  {
    id: "st-4",
    chapter: "stencil-testing",
    level: 1,
    question: "什么是「模板测试」（stencil test）？一句话说清它做的事。",
    answer:
      "一个片段要继续往下走之前，先拿一个你指定的「参考值 ref」和模板缓冲里该像素已存的模板值按比较函数比一比，通过才放行、不通过就直接丢弃。它让你按一张自定义形状的「镂空模板」逐片段放行或拦截。",
    tags: ["模板测试", "定义"],
  },
  {
    id: "st-5",
    chapter: "stencil-testing",
    level: 1,
    question: "模板测试在渲染管线里处在什么位置？",
    answer:
      "发生在**片段着色器之后**（要先算出片段才能测），并且排在**深度测试之前**——先过模板这一关，活下来的片段再去过深度那一关。主干顺序：模板测试 → 深度测试 → 写颜色。",
    tags: ["模板测试", "管线位置"],
  },
  {
    id: "st-6",
    chapter: "stencil-testing",
    level: 1,
    question: "用哪个调用启用模板测试？默认是开还是关？",
    answer:
      "用 `glEnable(GL_STENCIL_TEST)` 启用。默认是**关**的，和深度测试一个套路。",
    tags: ["glEnable", "GL_STENCIL_TEST"],
  },
  {
    id: "st-7",
    chapter: "stencil-testing",
    level: 1,
    question: "每帧清模板缓冲用哪个标志位？",
    answer:
      "用 `GL_STENCIL_BUFFER_BIT`，通常和颜色、深度一起 `glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT | GL_STENCIL_BUFFER_BIT)`。",
    tags: ["glClear", "GL_STENCIL_BUFFER_BIT"],
  },
  {
    id: "st-8",
    chapter: "stencil-testing",
    level: 1,
    question: "`glStencilFunc` 的原型是什么？三个参数各叫什么？",
    answer:
      "原型 `glStencilFunc(func, ref, mask)`：`func` 是比较算子、`ref` 是你给的参考值、`mask` 是比较掩码（比较前先和 ref、模板值做按位与，默认 0xFF）。",
    tags: ["glStencilFunc", "原型"],
  },
  {
    id: "st-9",
    chapter: "stencil-testing",
    level: 1,
    question: "`glStencilFunc` 的 `mask` 参数默认值是多少？表示什么？",
    answer:
      "默认 `0xFF`（全 1）。比较前会把 `ref` 和模板值都和它做按位与，0xFF 相当于让整数原样参与比较。",
    tags: ["glStencilFunc", "mask"],
  },
  {
    id: "st-10",
    chapter: "stencil-testing",
    level: 1,
    question: "什么是「模板函数」（glStencilFunc）？它负责写模板缓冲吗？",
    answer:
      "设置模板测试比较规则的函数，决定「ref 和已存的模板值满足什么关系算通过」。它只管「这个片段过不过」，**不负责往模板缓冲里写东西**——写东西是 `glStencilOp` 的活。",
    tags: ["模板函数", "glStencilFunc"],
  },
  {
    id: "st-11",
    chapter: "stencil-testing",
    level: 1,
    question: "`glStencilOp` 的原型是什么？三个参数各对应什么情形？",
    answer:
      "原型 `glStencilOp(sfail, dpfail, dppass)`：`sfail` = 模板测试失败时怎么更新模板值；`dpfail` = 模板通过但深度失败时；`dppass` = 两个测试都通过时。",
    tags: ["glStencilOp", "原型"],
  },
  {
    id: "st-12",
    chapter: "stencil-testing",
    level: 1,
    question: "`glStencilOp` 常用的几个动作（如 GL_KEEP / GL_REPLACE / GL_ZERO）各是什么？",
    answer:
      "`GL_KEEP` 保持原值不变（默认）；`GL_REPLACE` 替换成 `glStencilFunc` 里那个 `ref`；`GL_ZERO` 清 0；还有 `GL_INCR`/`GL_DECR`（加一/减一）等。",
    tags: ["glStencilOp", "动作"],
  },
  {
    id: "st-13",
    chapter: "stencil-testing",
    level: 1,
    question: "`glStencilOp` 的默认值是什么？意味着什么？",
    answer:
      "默认是 `glStencilOp(GL_KEEP, GL_KEEP, GL_KEEP)`——三种情形都「保持不变」，也就是默认根本不动模板缓冲。",
    tags: ["glStencilOp", "默认"],
  },
  {
    id: "st-14",
    chapter: "stencil-testing",
    level: 1,
    question: "什么是「模板写入掩码」（glStencilMask）？它怎么作用？",
    answer:
      "一个写入掩码：任何要写进模板缓冲的值都会先和它做按位与（AND）再写入。`glStencilMask(0xFF)` 全 1，模板值原样写入；`glStencilMask(0x00)` 全 0，等于把模板缓冲设成**只读**。",
    tags: ["模板写入掩码", "glStencilMask"],
  },
  {
    id: "st-15",
    chapter: "stencil-testing",
    level: 1,
    question: "`glStencilMask(0x00)` 是什么效果？",
    answer:
      "掩码全 0，任何要写的值都被与成 0、一个 bit 都写不进去，等于把模板缓冲设成**只读**（但仍可参与比较）。",
    tags: ["glStencilMask", "只读"],
  },
  {
    id: "st-16",
    chapter: "stencil-testing",
    level: 1,
    question: "什么是「物体描边」（object outlining）？它分几遍？",
    answer:
      "用模板缓冲给物体画一圈轮廓边的经典技法（游戏里高亮选中单位那种边框），分两遍：第一遍正常画物体、把它覆盖的像素模板值写成 1；第二遍画放大一圈的同物体、用 `GL_NOTEQUAL` 只在模板值≠1 的外圈上画边框色。",
    tags: ["物体描边", "定义"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "st-17",
    chapter: "stencil-testing",
    level: 2,
    question: "模板缓冲和深度缓冲都在幕后记账，本质区别是什么？",
    answer:
      "深度缓冲存的是「多远」（有固定物理含义的 0~1 深度值），由 GPU 自动按深度规则比较；模板缓冲存的是「一个没有固定含义、由你自己定义用途的整数」，比较规则和写入时机也都由你用 `glStencilFunc`/`glStencilOp` 自己定。",
    tags: ["模板缓冲", "深度缓冲", "对比"],
  },
  {
    id: "st-18",
    chapter: "stencil-testing",
    level: 2,
    question: "为什么说模板测试能画「任意形状」的区域，而不只是矩形？",
    answer:
      "因为模板缓冲是逐像素的整数，你可以先用某个物体把它覆盖的像素「刻」成特定值，这个形状不必规整——可以正好是上一个物体占的那一圈、某个不规则窗口的内部。之后拿这个形状当镂空模板放行/拦截即可。",
    tags: ["模板测试", "为什么"],
  },
  {
    id: "st-19",
    chapter: "stencil-testing",
    level: 2,
    question: "`glStencilFunc` 和 `glStencilOp` 的分工是什么？别搞混。",
    answer:
      "`glStencilFunc` 决定「片段过不过」（比较规则，只读模板值）；`glStencilOp` 决定「在三种结局下模板缓冲这个像素要不要变、变成什么」（写模板）。一个管去留、一个管更新。",
    tags: ["glStencilFunc", "glStencilOp", "对比"],
  },
  {
    id: "st-20",
    chapter: "stencil-testing",
    level: 2,
    question: "`glStencilOp` 为什么要分成 sfail / dpfail / dppass 三种情形？",
    answer:
      "因为一个片段先过模板测试、再过深度测试。`sfail` 是模板就没过（此时压根没走到深度测试）；只有模板过了才会进深度测试，于是才有 `dpfail`（模板过、深度没过）和 `dppass`（两个都过）。`dpfail`/`dppass` 的前提都是「模板已通过」。",
    tags: ["glStencilOp", "机制"],
  },
  {
    id: "st-21",
    chapter: "stencil-testing",
    level: 2,
    question: "一个片段没通过模板测试，它还会去做深度测试吗？为什么？",
    answer:
      "不会。模板测试在前、深度测试在后，没通过模板测试的片段直接被丢弃，根本不会再去做深度测试。这正是 `glStencilOp` 里 `sfail` 单独一档的原因。",
    tags: ["模板测试", "深度测试", "先后"],
  },
  {
    id: "st-22",
    chapter: "stencil-testing",
    level: 2,
    question: "`glStencilOp` 让 `GL_REPLACE`，但 `glStencilMask` 是 `0x00`，模板会被改吗？",
    answer:
      "不会。`glStencilOp` 说「想写什么」，`glStencilMask` 说「准不准写」。哪怕 `GL_REPLACE` 想把模板替换成 ref，只要 `glStencilMask` 是 0x00（只读），这个值也被与成 0、写不进去。",
    tags: ["glStencilOp", "glStencilMask", "机制"],
  },
  {
    id: "st-23",
    chapter: "stencil-testing",
    level: 2,
    question: "描边第一遍为什么用 `glStencilOp(GL_KEEP, GL_KEEP, GL_REPLACE)`？",
    answer:
      "因为第一遍要把物体覆盖的像素「盖章成 1」。只在「两关都过」（`dppass`）时把模板值替换成 ref（也就是 1），其余两种情形保持不变（`GL_KEEP`），于是物体区域被标成 1、别处不动。",
    tags: ["物体描边", "glStencilOp"],
  },
  {
    id: "st-24",
    chapter: "stencil-testing",
    level: 2,
    question: "描边第一遍为什么用 `glStencilFunc(GL_ALWAYS, 1, 0xFF)`？",
    answer:
      "`GL_ALWAYS` 让物体的每个片段都通过模板测试（不管模板值是几），配合 `GL_REPLACE` 把这些像素的模板值统统替换成 ref（=1）。这样才能把整个物体的形状「刻」进模板缓冲。",
    tags: ["物体描边", "glStencilFunc"],
  },
  {
    id: "st-25",
    chapter: "stencil-testing",
    level: 2,
    question: "描边第二遍为什么用 `GL_NOTEQUAL`、而不是 `GL_EQUAL`？",
    answer:
      "因为描边要的是物体**外侧**的一圈，而模板里被标成 1 的是原物体覆盖区。`GL_NOTEQUAL, 1` 只在「模板值≠1」处通过，也就是只在原物体范围之外上色；`GL_EQUAL` 反而只会在物体内部画。",
    tags: ["物体描边", "GL_NOTEQUAL"],
  },
  {
    id: "st-26",
    chapter: "stencil-testing",
    level: 2,
    question: "描边第二遍为什么要画「放大一圈」的物体，而不是原尺寸？",
    answer:
      "因为只有放大物体比原物体大出来的那一环，才落在「模板=0（≠1）」的可上色区域，被画成边框；中心与原物体重叠的部分模板=1、不画。若画原尺寸物体，它覆盖像素模板全是 1，处处不满足≠1，一个片段都画不出来，没有描边。",
    tags: ["物体描边", "为什么"],
  },
  {
    id: "st-27",
    chapter: "stencil-testing",
    level: 2,
    question: "描边第二遍为什么要「关掉深度测试」？",
    answer:
      "为了让这圈边框不被场景里别的物体挡住。放大物体的边框片段深度可能比别的物体大，开着深度测试会被丢掉，于是描边被遮住或残缺。关掉它，描边总能完整显示。",
    tags: ["物体描边", "深度测试"],
  },
  {
    id: "st-28",
    chapter: "stencil-testing",
    level: 2,
    question: "描边第二遍为什么要把模板设为只读（glStencilMask(0x00)）？",
    answer:
      "为了别让放大物体又去改模板缓冲。第二遍只需要「读」模板形状来决定哪里上色，不该再往模板里写东西污染它——所以把写入掩码设成 0x00 让模板只读。",
    tags: ["物体描边", "glStencilMask"],
  },
  {
    id: "st-29",
    chapter: "stencil-testing",
    level: 2,
    question: "两遍法做完，为什么要把 `glStencilMask` 和深度测试「恢复」回来？",
    answer:
      "因为第二遍把模板设成了只读、关掉了深度测试，这些是临时状态。若不恢复，后面画其他物体时模板写不进去、又没有深度遮挡，会污染整个场景的绘制。所以画完要 `glStencilMask(0xFF)` + `glEnable(GL_DEPTH_TEST)` 复原。",
    tags: ["物体描边", "恢复状态"],
  },
  {
    id: "st-30",
    chapter: "stencil-testing",
    level: 2,
    question: "两遍法的精髓一句话怎么概括？",
    answer:
      "用第一遍在模板缓冲里「刻」出物体的形状（标成 1），第二遍再用这个形状当模板，靠 `GL_NOTEQUAL` 把放大物体里「与原物体重叠的部分」全挡掉，只留下外圈那一环。",
    tags: ["物体描边", "综合"],
  },

  // ── L3 应用（读代码 / 给参数判结果 / API差异） ──
  {
    id: "st-31",
    chapter: "stencil-testing",
    level: 3,
    question:
      "`glStencilFunc(GL_EQUAL, 1, 0xFF)` 表示什么条件下片段通过？",
    answer:
      "模板值**等于** 1 才通过。`func=GL_EQUAL`、`ref=1`、`mask=0xFF`（原样比较）：拿 ref(1) 和该像素已存的模板值比，相等就放行、否则丢弃。",
    tags: ["glStencilFunc", "判结果"],
  },
  {
    id: "st-32",
    chapter: "stencil-testing",
    level: 3,
    question:
      "`glStencilFunc(GL_NOTEQUAL, 1, 0xFF)` 在描边第二遍里让哪些片段通过？",
    answer:
      "让模板值**不等于** 1 的像素处的片段通过，也就是原物体范围之外（模板还是 0）的地方。放大物体只在这些地方被涂上边框色，于是只剩外圈一环上色。",
    tags: ["glStencilFunc", "GL_NOTEQUAL"],
  },
  {
    id: "st-33",
    chapter: "stencil-testing",
    level: 3,
    question:
      "桌面 `glEnable(GL_STENCIL_TEST)` 在 WebGL2 里怎么写？",
    answer:
      "写成 `gl.enable(gl.STENCIL_TEST)`。WebGL2 是上下文方法 + 上下文上的常量，去掉 `GL_` 前缀挂到 `gl` 上。",
    tags: ["WebGL2", "API差异"],
  },
  {
    id: "st-34",
    chapter: "stencil-testing",
    level: 3,
    question:
      "WebGL2 里使用模板测试，相比桌面有一道额外的「前置手续」，是什么？",
    answer:
      "WebGL2 默认画布**不带模板缓冲**，必须在创建上下文时显式申请：`canvas.getContext(\"webgl2\", { stencil: true })`（模板通常和深度合在 depth-stencil 缓冲里）。漏了这一步，模板测试静悄悄不起作用、还不报错。",
    tags: ["WebGL2", "getContext"],
  },
  {
    id: "st-35",
    chapter: "stencil-testing",
    level: 3,
    question:
      "把描边两遍法翻成代码，第一遍画物体前要设哪几行（C++）？",
    answer:
      "`glStencilOp(GL_KEEP, GL_KEEP, GL_REPLACE)`（通过就把模板写成 ref）、`glStencilFunc(GL_ALWAYS, 1, 0xFF)`（永远通过、ref=1）、`glStencilMask(0xFF)`（开模板写入），然后正常画物体——物体所在像素模板值变成 1。",
    tags: ["物体描边", "代码"],
  },
  {
    id: "st-36",
    chapter: "stencil-testing",
    level: 3,
    question:
      "描边第二遍画放大物体前要设哪几行（C++）？",
    answer:
      "`glStencilFunc(GL_NOTEQUAL, 1, 0xFF)`（只在模板≠1 处通过）、`glStencilMask(0x00)`（模板只读）、`glDisable(GL_DEPTH_TEST)`（关深度，边框不被遮挡），再画放大物体。画完 `glStencilMask(0xFF)` + `glEnable(GL_DEPTH_TEST)` 恢复。",
    tags: ["物体描边", "代码"],
  },
  {
    id: "st-37",
    chapter: "stencil-testing",
    level: 3,
    question:
      "WebGL2 里 `glStencilOp(GL_KEEP, GL_KEEP, GL_REPLACE)` 怎么写？",
    answer:
      "写成 `gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE)`。常量去掉 `GL_` 前缀挂到 `gl` 上，含义完全一致——纯状态设置，描边逻辑两端一字不差。",
    tags: ["WebGL2", "glStencilOp"],
  },
  {
    id: "st-38",
    chapter: "stencil-testing",
    level: 3,
    question:
      "第一遍画物体后，模板缓冲里物体区域和其余区域的模板值各是多少？",
    answer:
      "物体覆盖到的像素被 `GL_REPLACE` 写成 ref（=1）；其余像素仍是清屏后的 0。于是模板缓冲里「物体形状=1、背景=0」，正好当镂空模板用。",
    tags: ["物体描边", "判结果"],
  },
  {
    id: "st-39",
    chapter: "stencil-testing",
    level: 3,
    question:
      "某人描边时整个画面糊满边框色。最可能是哪一步写错了？",
    answer:
      "最可能是第一遍画物体前 `glStencilMask` 还停在 `0x00`（只读），导致一个 1 都没写进模板，模板全是 0；第二遍 `GL_NOTEQUAL, 1` 一比满屏都满足「≠1」，放大物体处处通过、边框铺满全屏。修法：第一遍前 `glStencilMask(0xFF)` 打开写入。",
    tags: ["物体描边", "排错"],
  },
  {
    id: "st-40",
    chapter: "stencil-testing",
    level: 3,
    question:
      "某人描边只露出零星几小块、或物体把自己边框挡住了，最可能是哪步漏了？",
    answer:
      "最可能是第二遍画放大物体时没关深度测试——放大物体的边框片段深度比别的物体大、被深度测试丢掉。修法：第二遍画放大物体前 `glDisable(GL_DEPTH_TEST)`，画完 `glEnable(GL_DEPTH_TEST)` 恢复。",
    tags: ["物体描边", "排错"],
  },
  {
    id: "st-41",
    chapter: "stencil-testing",
    level: 3,
    question:
      "描边两遍的 `ref` 一个写 1、一个写 0，会出什么问题？",
    answer:
      "两遍的 ref 对不上：第一遍把模板写成 1，第二遍却拿 0 去比，比较结果完全错位，描边要么内部被涂色、要么外圈没出现。两遍的 ref 必须是同一个值（这里都用 1）。",
    tags: ["物体描边", "ref"],
  },
  {
    id: "st-42",
    chapter: "stencil-testing",
    level: 3,
    question:
      "想让模板测试只在某像素模板值等于 2 时通过，`glStencilFunc` 怎么调？",
    answer:
      "`glStencilFunc(GL_EQUAL, 2, 0xFF)`：`func=GL_EQUAL`、`ref=2`、`mask=0xFF` 原样比较。拿 ref(2) 和模板值比，相等才放行。",
    tags: ["glStencilFunc", "应用"],
  },
  {
    id: "st-43",
    chapter: "stencil-testing",
    level: 3,
    question:
      "看到一段代码三个缓冲一起清 `glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT | GL_STENCIL_BUFFER_BIT)`，说明用到了什么？",
    answer:
      "说明同时用到了颜色、深度、模板三块缓冲，且每帧都把模板缓冲一起清零（重置成 0），这是用模板测试时的标准做法——不清的话上一帧的模板值会残留、污染本帧。",
    tags: ["glClear", "GL_STENCIL_BUFFER_BIT"],
  },
  {
    id: "st-44",
    chapter: "stencil-testing",
    level: 3,
    question:
      "描边代码里 `glStencilMask(0xFF)` 和 `glStencilMask(0x00)` 分别出现在两遍法的哪一遍？",
    answer:
      "`glStencilMask(0xFF)`（开写入）在第一遍画物体前，好让物体像素被 `GL_REPLACE` 写成 1；`glStencilMask(0x00)`（只读）在第二遍画放大物体前，别让它再改模板。第二遍后再 `glStencilMask(0xFF)` 恢复。",
    tags: ["物体描边", "glStencilMask"],
  },
  {
    id: "st-45",
    chapter: "stencil-testing",
    level: 3,
    question:
      "描边代码里两遍的状态设置（glStencilFunc/Op/Mask）在 C++ 和 WebGL2 间需要改逻辑吗？",
    answer:
      "不用改逻辑。这段是纯状态设置，无 API 差异：桌面写 `glStencilFunc/glStencilOp/glStencilMask` + 大写常量，WebGL2 写 `gl.stencilFunc/...` + 去 `GL_` 前缀的常量，参数和顺序一字对应。",
    tags: ["WebGL2", "物体描边"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 边界） ──
  {
    id: "st-46",
    chapter: "stencil-testing",
    level: 4,
    question:
      "描边后整个画面糊满边框色、物体看不见。检查发现第一遍画物体前是 `glStencilMask(0x00)`。指出错因、为什么满屏、怎么改。",
    answer:
      "错在第一遍画物体前的 `glStencilMask(0x00)`（只读），导致第一遍一个 1 都没写进模板，模板缓冲还是清屏后的 0。第二遍 `GL_NOTEQUAL, 1` 比「模板值≠1」——处处是 0、处处满足≠1，放大物体边框铺满全屏。修法：第一遍画物体**前**打开写入 `glStencilMask(0xFF)`，第二遍才设 0x00 只读。",
    tags: ["物体描边", "陷阱"],
  },
  {
    id: "st-47",
    chapter: "stencil-testing",
    level: 4,
    question:
      "模板测试和深度测试谁先谁后？片段没过模板测试还做深度测试吗？这对 `glStencilOp` 三参数意味着什么？",
    answer:
      "模板测试在前、深度测试在后（都在片段着色器之后）。片段没过模板测试就直接丢弃、根本不做深度测试。所以 `glStencilOp(sfail, dpfail, dppass)` 这样分：`sfail` 是模板没过（没走到深度）；只有模板过了才有 `dpfail`（深度没过）和 `dppass`（都过）——后两者前提都是「模板已通过」。",
    tags: ["模板测试", "深度测试", "综合"],
  },
  {
    id: "st-48",
    chapter: "stencil-testing",
    level: 4,
    question:
      "描边第二遍若画原尺寸物体（仍用 `GL_NOTEQUAL, 1`），画面会怎样？为什么没有描边？",
    answer:
      "什么也画不出来。原尺寸物体覆盖的像素和第一遍完全一样、模板值全是 1，处处不满足「≠1」，于是一个片段都通不过——没有描边。必须放大一圈，才能在外圈制造出「模板还是 0」的可上色区域。",
    tags: ["物体描边", "陷阱"],
  },
  {
    id: "st-49",
    chapter: "stencil-testing",
    level: 4,
    question:
      "描边第二遍把 `GL_NOTEQUAL` 误写成 `GL_EQUAL`，画面会出什么？根因是什么？",
    answer:
      "边框色画到了物体**内部**而不是外圈。根因：`GL_EQUAL, 1` 只在「模板值=1」处通过，而模板里=1 的恰是原物体覆盖区，于是放大物体只在与原物体重叠的中心部分上色、外环（模板=0）反而不画。修法：用 `GL_NOTEQUAL`（只在模板≠ref 的外圈画）。",
    tags: ["物体描边", "陷阱"],
  },
  {
    id: "st-50",
    chapter: "stencil-testing",
    level: 4,
    question:
      "WebGL2 里写好了模板测试代码却完全不起作用、也不报错。最可能漏了什么？",
    answer:
      "最可能漏了在创建上下文时请求模板缓冲：`canvas.getContext(\"webgl2\", { stencil: true })`。WebGL2 默认画布不带模板缓冲，没显式申请就根本没有模板可比，测试静悄悄失效、还不报错。",
    tags: ["WebGL2", "陷阱"],
  },
  {
    id: "st-51",
    chapter: "stencil-testing",
    level: 4,
    question:
      "把 `glStencilFunc`（管去留）和 `glStencilOp`（管更新）搞混，会写出什么样的 bug？",
    answer:
      "典型 bug：以为设了 `glStencilFunc(GL_ALWAYS, 1, ...)` 就能把模板写成 1——其实 func 只判去留、不写模板，结果模板里一直是 0，后续比较全错。要把模板写成 1 得靠 `glStencilOp(..., GL_REPLACE)` + 打开 `glStencilMask`。一个管「过不过」、一个管「写不写」，分工别混。",
    tags: ["glStencilFunc", "glStencilOp", "陷阱"],
  },
  {
    id: "st-52",
    chapter: "stencil-testing",
    level: 4,
    question:
      "描边做完没恢复 `glStencilMask` 和深度测试，会对后续物体绘制造成什么连锁影响？",
    answer:
      "第二遍把模板设成了只读、关掉了深度测试且没恢复：后面画的所有物体模板都写不进去（若还要用模板就全错），且没有深度遮挡、前后关系乱套（远的盖近的、互相穿）。所以两遍法收尾必须 `glStencilMask(0xFF)` + `glEnable(GL_DEPTH_TEST)` 复原。",
    tags: ["物体描边", "恢复状态", "陷阱"],
  },
  {
    id: "st-53",
    chapter: "stencil-testing",
    level: 4,
    question:
      "为什么物体描边偏偏要用模板缓冲，而不能只靠深度缓冲实现？",
    answer:
      "因为描边需要「按上一个物体的任意形状」精确地只在它外圈一环上色——深度缓冲只能比远近、表达不了「这块像素属于哪个物体/是不是边界」这种自定义标记。模板缓冲存的是由你定义含义的整数，能把物体形状「刻」下来当镂空模板，正好胜任。",
    tags: ["物体描边", "模板缓冲", "综合"],
  },
  {
    id: "st-54",
    chapter: "stencil-testing",
    level: 4,
    question:
      "把整套两遍法按管线顺序串一遍：从第一遍盖章到第二遍只画外环，模板缓冲和颜色缓冲各经历了什么？",
    answer:
      "第一遍：`GL_ALWAYS` 让物体每片段都过模板、`GL_REPLACE` 把物体区模板值写成 1，颜色缓冲正常画出物体。第二遍：模板设只读、关深度，画放大物体，`GL_NOTEQUAL, 1` 让中心（模板=1）的片段不过、被丢弃，只有外环（模板=0）的片段通过、在颜色缓冲上涂边框色。叠起来：物体 + 外圈一环描边。",
    tags: ["物体描边", "综合"],
  },
  {
    id: "st-55",
    chapter: "stencil-testing",
    level: 4,
    question:
      "学习目标自测：描边第一遍若忘了开模板写入（`glStencilMask` 还是 `0x00`），第二遍画出来的边框会变成什么样？为什么？",
    answer:
      "第二遍的边框色会**铺满整个屏幕**。因为第一遍没写入，模板缓冲处处是 0；第二遍 `GL_NOTEQUAL, 1` 比「≠1」，全屏都满足，放大物体处处通过、处处上色，于是满屏都是边框色、根本不是一圈轮廓。",
    tags: ["物体描边", "glStencilMask", "综合"],
  },
];
