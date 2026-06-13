/** 复习题库 · 你好，窗口（hello-window）。Phase B 各章独立文件，避免并行写冲突。 */

import type { ReviewQuestion } from "./types";

export const helloWindowQuestions: ReviewQuestion[] = [
  {
    id: "hw-1",
    chapter: "hello-window",
    level: 1,
    question:
      "网页里用来画图的那块方块元素叫什么？怎么从它身上拿到画图的「画笔」？",
    answer:
      "那块元素是 `<canvas>` 画布。调用 `canvas.getContext('webgl2')` 就能拿到 WebGL2 上下文（习惯命名 `gl`），它就是连通 GPU 的画笔。",
    tags: ["canvas", "WebGL2 上下文"],
  },
  {
    id: "hw-2",
    chapter: "hello-window",
    level: 1,
    question: "「渲染循环」是什么？通常用什么 API 驱动它？",
    answer:
      "渲染循环是一段「画一帧 → 等屏幕下次刷新 → 再画一帧」不停重复的代码，是网页里的「放映机」。通常用 `requestAnimationFrame` 驱动——它在屏幕下次刷新前回调你登记的画帧函数。",
    tags: ["渲染循环", "requestAnimationFrame"],
  },
  {
    id: "hw-3",
    chapter: "hello-window",
    level: 2,
    question:
      "「清屏」具体做哪两步？为什么每一帧开头都要清屏，而不是程序启动时清一次？",
    answer:
      "两步配套：先 `gl.clearColor(r,g,b,a)` 定好用哪种颜色，再 `gl.clear(...)` 真正把整块颜色缓冲刷成那个色。每帧都要清，是因为上一帧的画面不会自己消失；只清一次的话新内容会叠在旧画面上，物体一动就拖出残影。",
    tags: ["清屏", "颜色缓冲"],
  },
  {
    id: "hw-4",
    chapter: "hello-window",
    level: 2,
    question: "只调了 `gl.clearColor` 换了颜色值，画面却纹丝不动，为什么？",
    answer:
      "`clearColor` 只是「定好待会儿用哪种颜料」，并没有真正动手刷。必须再调 `gl.clear(gl.COLOR_BUFFER_BIT)` 才会把颜色缓冲填成该色。两步缺一不可。",
    tags: ["清屏", "误区"],
  },
  {
    id: "hw-5",
    chapter: "hello-window",
    level: 3,
    question:
      "WebGL2 里 `canvas.getContext('webgl2')` 的返回值，使用前必须做什么处理？不做会怎样？",
    answer:
      "必须判空（`if (!gl) {...}`）。浏览器太旧或 WebGL2 被禁用时它会返回 `null`，不判空就拿去调命令会报「Cannot read properties of null」、画面一片空白。",
    tags: ["WebGL2 上下文", "误区"],
  },

  // ── L1 认记：定义 / 术语 ──
  {
    id: "hw-6",
    chapter: "hello-window",
    level: 1,
    question: "什么是一「帧」？屏幕上的动画和帧是什么关系？",
    answer:
      "一帧就是一整张完成的画面。屏幕上的动画本质是一帧接一帧飞快地播放（一秒通常几十帧），快到眼睛把它看成了连续的动作，就像电影放胶片。",
    tags: ["帧", "动画"],
  },
  {
    id: "hw-7",
    chapter: "hello-window",
    level: 1,
    question: "`<canvas>` 这个元素本身能画出东西吗？它规定了什么？",
    answer:
      "不能。`<canvas>` 本身只是一块钉在网页上的空白画板，规定了「能画的范围有多大」；要往上画，还得再配一支「画笔」——即从它身上拿到的 WebGL2 上下文。",
    tags: ["canvas", "画布"],
  },
  {
    id: "hw-8",
    chapter: "hello-window",
    level: 1,
    question: "WebGL2 上下文（`gl`）在整个画图过程里扮演什么角色？",
    answer:
      "它是连通显卡（GPU）的「总开关」兼「画笔」。清屏、上传数据、画三角形等所有命令，都是对这个 `gl` 对象下达，再由它转交给 GPU 去真正执行。",
    tags: ["WebGL2 上下文", "GPU"],
  },
  {
    id: "hw-9",
    chapter: "hello-window",
    level: 1,
    question: "什么是「颜色缓冲（color buffer）」？屏幕显示的是什么？",
    answer:
      "颜色缓冲是显存里存放「当前这一帧每个像素是什么颜色」的一块内存。屏幕显示的就是它的内容；清屏做的事，就是把这块内存整体重置成一种颜色。",
    tags: ["颜色缓冲", "显存"],
  },
  {
    id: "hw-10",
    chapter: "hello-window",
    level: 1,
    question:
      "在浏览器里要拿到 WebGL2 上下文，调用哪个方法？返回的对象习惯叫什么名字？",
    answer:
      "调用 `canvas.getContext('webgl2')`。它返回一个 WebGL2 上下文对象，习惯上命名为 `gl`，之后所有画图命令都对它下达。",
    tags: ["WebGL2 上下文", "getContext"],
  },
  {
    id: "hw-11",
    chapter: "hello-window",
    level: 1,
    question: "清屏分哪两步、各调用什么函数？",
    answer:
      "两步配套：先 `gl.clearColor(r, g, b, a)` 定好「用哪种颜色来抹」，再 `gl.clear(...)` 真正动手把整块颜色缓冲填成那个颜色。",
    tags: ["清屏", "clearColor", "clear"],
  },
  {
    id: "hw-12",
    chapter: "hello-window",
    level: 1,
    question:
      "原书 C++ 端用什么库开桌面窗口、用什么库加载 OpenGL 函数？网页端这两件事谁替你做了？",
    answer:
      "原书用 GLFW 开窗口、用 GLAD 加载 OpenGL 函数指针。网页端不用开窗口——`<canvas>` 已经在页面上，浏览器也把上下文和函数都准备好了，直接 `canvas.getContext('webgl2')` 拿来用即可。",
    tags: ["GLFW", "GLAD", "C++ 对照"],
  },
  {
    id: "hw-13",
    chapter: "hello-window",
    level: 1,
    question: "网页端的渲染循环通常用哪个浏览器 API 驱动？",
    answer:
      "用 `requestAnimationFrame`：把「画一帧」的函数交给它，它会在屏幕下一次刷新之前回头调你一次；在函数末尾再登记一次，循环就一直转下去。",
    tags: ["渲染循环", "requestAnimationFrame"],
  },
  {
    id: "hw-14",
    chapter: "hello-window",
    level: 1,
    question:
      "`gl.clear(gl.COLOR_BUFFER_BIT)` 里的 `gl.COLOR_BUFFER_BIT` 指明了什么？",
    answer:
      "它指明这次清的是「颜色缓冲」这一块。除颜色缓冲外，OpenGL 还有 `GL_DEPTH_BUFFER_BIT`（深度缓冲，3D 用）和 `GL_STENCIL_BUFFER_BIT`（模板缓冲，高级技巧用），本章只清颜色缓冲。",
    tags: ["clear", "COLOR_BUFFER_BIT"],
  },

  // ── L2 理解：为什么 / 机制 ──
  {
    id: "hw-15",
    chapter: "hello-window",
    level: 2,
    question: "为什么画面要一帧一帧地反复重画，而不是画一次就完？",
    answer:
      "因为画面要变——物体在动、颜色在渐变、鼠标在交互。只有反复重画、每次用最新的状态画，眼睛才会看到「动」。画一次就停，画面就永远是那张静止的图。",
    tags: ["渲染循环", "动画"],
  },
  {
    id: "hw-16",
    chapter: "hello-window",
    level: 2,
    question: "为什么从 `<canvas>` 身上拿上下文，而不是凭空创建一个？",
    answer:
      "因为这支「画笔」天生和那块板子绑定：你对 `gl` 下的每条命令，最终都画在它所属的那块 `<canvas>` 上。先有板子、再从板子上握住笔，命令才知道画到哪。",
    tags: ["WebGL2 上下文", "canvas"],
  },
  {
    id: "hw-17",
    chapter: "hello-window",
    level: 2,
    question:
      "`requestAnimationFrame` 相比自己用 `setInterval` 不停画，有什么好处？",
    answer:
      "它在屏幕「下一次刷新之前」才回调，节奏跟着屏幕的刷新走，不会画了白画；而且切到后台标签页时会自动暂停、省电。`setInterval` 既对不准刷新、后台也照样空耗。",
    tags: ["requestAnimationFrame", "渲染循环"],
  },
  {
    id: "hw-18",
    chapter: "hello-window",
    level: 2,
    question: "桌面端为什么需要 GLAD 这样的库来「加载函数」，而网页端不用？",
    answer:
      "桌面端 OpenGL 函数的实际地址由显卡驱动在运行时提供，必须用 GLAD（配合 `glfwGetProcAddress`）在调用前把这些函数指针取出来。网页端浏览器已把 WebGL2 的所有方法直接挂在 `gl` 对象上，拿到上下文即可调用，无需这一步。",
    tags: ["GLAD", "C++ 对照"],
  },
  {
    id: "hw-19",
    chapter: "hello-window",
    level: 2,
    question:
      "桌面渲染循环用 `while (!glfwWindowShouldClose(window))`，网页端却没有这样一个 `while`，为什么也能「一直转」？",
    answer:
      "网页端把「画一帧」的函数交给 `requestAnimationFrame` 回调，并在函数末尾再登记一次自己，靠这种「每帧自我重新排队」实现持续循环；浏览器负责按屏幕刷新节奏一次次回调，所以不需要显式的 `while`。",
    tags: ["渲染循环", "requestAnimationFrame", "C++ 对照"],
  },
  {
    id: "hw-20",
    chapter: "hello-window",
    level: 2,
    question:
      "`gl.clearColor` 是「设置状态」、`gl.clear` 是「使用状态」，这种区分意味着什么？",
    answer:
      "`clearColor` 只把「待会儿用哪种颜色」这个状态记下来，本身不动画面；`clear` 才读取这个已设好的状态、真正动手刷。所以只要不再改色，`clearColor` 设一次就够，每帧 `clear` 都会沿用它。",
    tags: ["clearColor", "clear", "状态机"],
  },
  {
    id: "hw-21",
    chapter: "hello-window",
    level: 2,
    question:
      "把 `<canvas>`、WebGL2 上下文、渲染循环按在「从数据到屏幕」管线里的位置排序，并说出各自的角色。",
    answer:
      "`<canvas>` 在最前端，是「画到哪」的那块板子；WebGL2 上下文紧跟其后，是「用什么笔」、所有命令都经它下达给 GPU；渲染循环在最外层，每一帧把「清屏 → 绘制」整套流程从头驱动一遍。",
    tags: ["渲染管线", "综合定位"],
  },
  {
    id: "hw-22",
    chapter: "hello-window",
    level: 2,
    question:
      "本章的清屏 Demo 里片段着色器没画任何形状，为什么整块画布还是变了颜色？",
    answer:
      "因为它让每个像素都直接输出同一种颜色，等价于「整块画布被刷成清屏色」。这正是 `gl.clearColor` + `gl.clear` 的效果：没有形状，整面就是一整块纯色。",
    tags: ["清屏", "Demo"],
  },
  {
    id: "hw-23",
    chapter: "hello-window",
    level: 2,
    question: "为什么「清屏」要清「整块」画布，而不是只清画过东西的那部分？",
    answer:
      "清屏的目的是得到一张干净的底，盖掉上一帧任意位置留下的内容；上一帧的痕迹可能遍布画布各处，只清局部就会漏掉别处的旧画面、留下残影，所以整块一起刷最简单也最可靠。",
    tags: ["清屏", "颜色缓冲"],
  },
  {
    id: "hw-24",
    chapter: "hello-window",
    level: 2,
    question:
      "把渲染循环类比成电影放映机，「放映机」「胶片」「重画」分别对应什么？",
    answer:
      "放映机 = 渲染循环（`requestAnimationFrame` 驱动）；一张胶片 = 一帧画面；飞快地一张张重画/放映 = 每帧重新执行「清屏 → 绘制」，快到眼睛看成连续动作。",
    tags: ["渲染循环", "帧", "类比"],
  },

  // ── L3 应用：读代码 / 给参数 ──
  {
    id: "hw-25",
    chapter: "hello-window",
    level: 3,
    question:
      "原书经典的清屏色 `glClearColor(0.2, 0.3, 0.3, 1.0)` 是一抹偏暗的青绿。`clearColor` 的四个参数分别是什么、取值范围多少？",
    answer:
      "四个参数是红、绿、蓝、alpha（不透明度），取值范围都是 `0.0`～`1.0`。`(0.2, 0.3, 0.3, 1.0)` 即低红、中等绿蓝、完全不透明，混出那抹偏暗青绿。",
    tags: ["clearColor", "参数"],
  },
  {
    id: "hw-26",
    chapter: "hello-window",
    level: 3,
    question:
      "想把清屏色从青色换成纯紫 `[0.49, 0.36, 1.0]`，在本章 Demo 里改哪个控件字段？它最终对应改了哪个 OpenGL 函数的什么？",
    answer:
      "改 `controls` 里清屏色那条的 `default`，写成 `[0.49, 0.36, 1.0]`。它最终对应改了 `gl.clearColor(r, g, b, a)` 的前三个参数——也就是「清屏时用哪种颜色」。",
    tags: ["Demo", "clearColor", "参数"],
  },
  {
    id: "hw-27",
    chapter: "hello-window",
    level: 3,
    question:
      "下面这段 WebGL2 渲染循环里，缺了哪一行就不会一直转？\n`function frame() { gl.clearColor(0.2,0.3,0.3,1.0); gl.clear(gl.COLOR_BUFFER_BIT); }`",
    answer:
      "缺了在函数末尾「登记下一帧」的那一行 `requestAnimationFrame(frame)`，以及首次启动的 `requestAnimationFrame(frame)`。没有自我重新排队，`frame` 只会被调一次就停。",
    tags: ["渲染循环", "requestAnimationFrame", "读代码"],
  },
  {
    id: "hw-28",
    chapter: "hello-window",
    level: 3,
    question:
      "读这段：`const gl = canvas.getContext('webgl2'); if (!gl) throw new Error('此浏览器不支持 WebGL2');`。第二行在防什么？",
    answer:
      "在防 `getContext('webgl2')` 返回 `null` 的情况——浏览器太旧或 WebGL2 被禁用时它就返回 `null`。这一行判空后及时报错/兜底，避免后面拿 `null` 调命令直接崩。",
    tags: ["WebGL2 上下文", "读代码", "判空"],
  },
  {
    id: "hw-29",
    chapter: "hello-window",
    level: 3,
    question:
      "把 C++ 渲染循环 `while (!glfwWindowShouldClose(window)) { glClearColor(...); glClear(GL_COLOR_BUFFER_BIT); glfwSwapBuffers(window); glfwPollEvents(); }` 翻成网页端，哪几句不用写、为什么？",
    answer:
      "`glfwSwapBuffers` 和 `glfwPollEvents` 都不用写：浏览器自动做缓冲交换和事件分发；`while` 也换成 `requestAnimationFrame(frame)`。只剩 `gl.clearColor` + `gl.clear` 与末尾的 `requestAnimationFrame(frame)`。",
    tags: ["渲染循环", "C++ 对照", "读代码"],
  },
  {
    id: "hw-30",
    chapter: "hello-window",
    level: 3,
    question:
      "若想清屏色随时间在两种颜色间渐变，应在每帧 `frame()` 里怎么调 `clearColor`？",
    answer:
      "在每帧 `frame()` 内、`gl.clear` 之前，先按当前时间算出新的 rgb（如用 `Math.sin` 在两色间插值），调一次 `gl.clearColor(r, g, b, 1.0)`，再 `gl.clear(gl.COLOR_BUFFER_BIT)`。因为 `clearColor` 是状态，每帧重设即可让颜色逐帧变化。",
    tags: ["clearColor", "clear", "渲染循环"],
  },

  // ── L4 综合 / 陷阱 ──
  {
    id: "hw-31",
    chapter: "hello-window",
    level: 4,
    question:
      "画面里物体一移动就拖出越积越糊的残影。最可能的原因是什么？怎么修？",
    answer:
      "最可能是每帧绘制前忘了 `gl.clear`，上一帧的画面没被擦掉，新一帧直接叠在旧的上面。修法：在每帧绘制最开头先 `gl.clearColor(...)` 定色、再 `gl.clear(gl.COLOR_BUFFER_BIT)` 擦干净，然后才画新内容。",
    tags: ["清屏", "残影", "陷阱"],
  },
  {
    id: "hw-32",
    chapter: "hello-window",
    level: 4,
    question:
      "有人说「`clearColor` 既然在循环外只调一次就够，那 `clear` 也挪到循环外调一次得了」。这话错在哪？",
    answer:
      "错。`clearColor` 是设状态，颜色不变时设一次确实够；但 `clear` 是「真正动手擦」，必须每帧都做——上一帧的画面不会自己消失，只擦一次后续每帧的新内容都会叠在旧画面上糊成残影。两者性质不同，不能一概而论。",
    tags: ["clearColor", "clear", "状态机", "陷阱"],
  },
  {
    id: "hw-33",
    chapter: "hello-window",
    level: 4,
    question:
      "桌面端单缓冲渲染会闪烁/出现撕裂，原书用「双缓冲」解决。双缓冲为什么能避免这个问题？网页端要不要自己写交换缓冲？",
    answer:
      "因为一张图是逐像素从左到右、自上而下慢慢画出来的，单缓冲会让没画完的中间状态直接显示出来，造成闪烁。双缓冲让所有绘制都画在看不见的「后缓冲」上，画完再整体与「前缓冲」交换、一次性显示完整帧。网页端无需自己写——浏览器自动做缓冲交换（相当于桌面端的 `glfwSwapBuffers`）。",
    tags: ["双缓冲", "闪烁", "C++ 对照"],
  },
  {
    id: "hw-34",
    chapter: "hello-window",
    level: 4,
    question:
      "原书桌面程序按 ESC 能关窗口（`glfwGetKey` + `glfwSetWindowShouldClose`），还要 `glfwPollEvents` 处理事件。这些在网页端去哪了？",
    answer:
      "网页端不需要这套：`<canvas>` 没有「自己的窗口」要关，键盘等输入由浏览器的事件系统（`addEventListener`）分发，事件轮询也由浏览器在每帧回调前自动完成。所以 `glfwPollEvents`、`glfwGetKey`、`glfwSetWindowShouldClose` 在网页端都没有直接对应物。",
    tags: ["输入", "事件", "C++ 对照", "陷阱"],
  },
  {
    id: "hw-35",
    chapter: "hello-window",
    level: 4,
    question:
      "本章 Demo 用片段着色器把每个像素都输出同一颜色来「冒充」清屏。它和真正的 `gl.clear` 在效果上看不出差别，但本质上有什么不同？",
    answer:
      "真正的 `gl.clear` 是用一条命令把整块颜色缓冲直接重置成一种颜色，不经过绘制管线；Demo 则是真的「画了一帧纯色」——靠片段着色器对每个像素逐个输出同色。两者画面结果相同（整面纯色），但前者是「擦」、后者是「画满」，机制不同。",
    tags: ["清屏", "Demo", "颜色缓冲", "陷阱"],
  },

  // ── 补充 L1 ──
  {
    id: "hw-36",
    chapter: "hello-window",
    level: 1,
    question: "「渲染循环」处在整条管线的哪一层？它每帧把哪套流程跑一遍？",
    answer:
      "它在最外层。每一帧，循环都会把「清屏 → 绘制」整套流程从头驱动一遍——清掉上一帧，再画这一帧的新内容。",
    tags: ["渲染循环", "渲染管线"],
  },
  {
    id: "hw-37",
    chapter: "hello-window",
    level: 1,
    question:
      "原书把这一章的清屏一步对应成把窗口涂成什么颜色？窗口里此时有没有模型？",
    answer:
      "对应「把窗口涂成青色」。此时窗口里还没有任何模型，整个画面就是清屏色铺满——和本章 Demo 的整面纯色一致。",
    tags: ["清屏", "C++ 对照"],
  },
  {
    id: "hw-38",
    chapter: "hello-window",
    level: 1,
    question: "`requestAnimationFrame` 一秒钟通常回调多少次？",
    answer:
      "通常 60 次左右（跟着屏幕刷新率走）。也就是放映机每秒喊大约 60 次「该画下一帧了」，对应约 60 帧每秒的动画。",
    tags: ["requestAnimationFrame", "帧率"],
  },

  // ── 补充 L2 ──
  {
    id: "hw-39",
    chapter: "hello-window",
    level: 2,
    question:
      "在 `requestAnimationFrame` 驱动下，「一帧是怎么来的」可拆成哪四步？",
    answer:
      "① 放映机（rAF）在屏幕即将刷新前回调你的「画一帧」函数；② 先清屏，擦掉上一帧得到干净的底；③ 在干净的底上画这一帧的新内容；④ 在函数末尾再登记一次 rAF，把自己排进下一帧，回到 ①。",
    tags: ["渲染循环", "requestAnimationFrame"],
  },
  {
    id: "hw-40",
    chapter: "hello-window",
    level: 2,
    question:
      "本章把 canvas、上下文、循环都备齐后，画面也只是一整块纯色，为什么说这一步仍然关键？",
    answer:
      "因为它把「画布从哪来、画笔怎么拿、重画怎么一直转」这套最底层的机制搭好了——这是画三角形、打光、贴纹理之前必须先立起来的地基。没有它，连「往哪画、用什么画」都没有，屏幕只会是一片空白。",
    tags: ["渲染管线", "综合定位"],
  },
  {
    id: "hw-41",
    chapter: "hello-window",
    level: 2,
    question:
      "为什么说 `<canvas>` 处在「从数据到屏幕」流水线的最前端，是「后面一切的落脚点」？",
    answer:
      "因为浏览器得先知道画往哪儿放、画多大，`<canvas>` 就是这块预留好的地盘；上下文、清屏、绘制等后续每一步的结果，最终都落在这块画布上，所以它是整条流程的起点和落脚点。",
    tags: ["canvas", "渲染管线"],
  },

  // ── 补充 L3 ──
  {
    id: "hw-42",
    chapter: "hello-window",
    level: 3,
    question:
      "若 `frame()` 里写了 `gl.clearColor(0.2,0.3,0.3,1.0)` 却漏写 `gl.clear(...)`，每帧画面会是什么样？",
    answer:
      "画面不会被刷成青绿色——`clearColor` 只设了「待会儿用哪种颜色」这个状态，没有 `clear` 就没人真正去刷。颜色缓冲保持原样（多半还是上一帧/初始内容），看起来「纹丝不动」。",
    tags: ["clearColor", "clear", "读代码"],
  },
  {
    id: "hw-43",
    chapter: "hello-window",
    level: 3,
    question:
      '本章 Demo 控件 `{ name: "uClearColor", label: "清屏颜色", type: "color", default: [0.2, 0.3, 0.3] }` 里，`type: "color"` 和 `default` 各起什么作用？',
    answer:
      '`type: "color"` 让这个 uniform 渲染成一个颜色选择器控件，拖动即可改色；`default: [0.2, 0.3, 0.3]` 是该控件的初始 rgb（0..1），也就是 Demo 一打开铺满画布的那抹原书青绿，点重置会回到它。',
    tags: ["Demo", "控件", "读代码"],
  },

  // ── 补充 L4 ──
  {
    id: "hw-44",
    chapter: "hello-window",
    level: 4,
    question:
      "同事报错「Cannot read properties of null」、画布一片空白，他确认代码逻辑没问题、在自己机器上也跑得好。最该让他先查什么？",
    answer:
      "先查 `canvas.getContext('webgl2')` 是不是返回了 `null`——他那台机器可能浏览器太旧或 WebGL2 被禁用，于是后续拿 `null` 调命令就报这个错。修法是拿到上下文后先 `if (!gl) {...}` 判空并给兜底提示。这是环境差异，不一定是逻辑 bug。",
    tags: ["WebGL2 上下文", "判空", "陷阱"],
  },
];
