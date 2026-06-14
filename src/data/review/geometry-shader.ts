/** 复习题库 · 几何着色器（geometry-shader）。HEL-78 高级OpenGL篇。 */

import type { ReviewQuestion } from "./types";

export const geometryShaderQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / 管线位置 / 内建函数） ──
  {
    id: "gs-1",
    chapter: "geometry-shader",
    level: 1,
    question: "什么是「几何着色器」（geometry shader）？",
    answer:
      "渲染管线里一道**可选**的着色阶段，夹在顶点着色器和光栅化之间。它一次收下一个完整图元（点/线/三角形），可以对它**增、删、改**，输出零个、一个或多个新图元再送往光栅化。",
    tags: ["几何着色器", "定义"],
  },
  {
    id: "gs-2",
    chapter: "geometry-shader",
    level: 1,
    question: "几何着色器在渲染管线里处在什么位置？",
    answer:
      "夹在**顶点着色器之后、光栅化之前**（也即图元装配之后、光栅化之前）。顶点着色器逐顶点处理完后，把一整个图元交给它，它处理完再送往光栅化拆成片段。",
    tags: ["几何着色器", "管线位置"],
  },
  {
    id: "gs-3",
    chapter: "geometry-shader",
    level: 1,
    question: "几何着色器最独特的本事是什么（顶点/片段着色器做不到的）？",
    answer:
      "**凭空增删改图元**：输入 1 个图元 → 输出 0 个、1 个或多个图元。它是管线里**唯一**能在运行时凭空生成/丢弃图元的阶段。顶点着色器一进一出、片段着色器逐片段涂，都不能增删。",
    tags: ["几何着色器", "增删图元"],
  },
  {
    id: "gs-4",
    chapter: "geometry-shader",
    level: 1,
    question: "什么是「图元」（primitive）？",
    answer:
      "渲染管线里最小的可绘制单元：一个**点**（point）、一根**线段**（line）、或一片**三角形**（triangle）。几何着色器一次收下一整个图元——即组成它的那一组顶点。",
    tags: ["图元", "定义"],
  },
  {
    id: "gs-5",
    chapter: "geometry-shader",
    level: 1,
    question: "几何着色器用哪行 `layout` 声明输入图元类型？有哪几种？",
    answer:
      "用 `layout(points) in;` / `layout(lines) in;` / `layout(triangles) in;`——告诉它每次收到的是 1 个点、2 个顶点的线、还是 3 个顶点的三角形。",
    tags: ["layout", "输入类型"],
  },
  {
    id: "gs-6",
    chapter: "geometry-shader",
    level: 1,
    question:
      "几何着色器输出声明 `layout(triangle_strip, max_vertices = 3) out;` 里两部分各是什么？",
    answer:
      "前半是**输出图元类型**（点 `points` / 线带 `line_strip` / 三角形带 `triangle_strip`）；后半 `max_vertices = N` 是**最多发多少个顶点**的上限。",
    tags: ["layout", "输出类型", "max_vertices"],
  },
  {
    id: "gs-7",
    chapter: "geometry-shader",
    level: 1,
    question: "收进来的那组顶点放在哪个内建数组里？怎么取它们的位置？",
    answer:
      "放在内建数组 `gl_in[]` 里。`gl_in[0].gl_Position`、`gl_in[1].gl_Position` …… 就是它们各自的位置（顶点着色器送来的）。",
    tags: ["gl_in", "gl_Position"],
  },
  {
    id: "gs-8",
    chapter: "geometry-shader",
    level: 1,
    question: "`EmitVertex()` 是干什么的？",
    answer:
      "几何着色器里「**发出一个顶点**」的动作：把你当前赋给 `gl_Position`（及其它输出变量）的值，作为输出图元的一个顶点提交出去。每调一次就多发一个顶点。",
    tags: ["EmitVertex", "定义"],
  },
  {
    id: "gs-9",
    chapter: "geometry-shader",
    level: 1,
    question: "`EndPrimitive()` 是干什么的？",
    answer:
      "几何着色器里「**结束当前图元**」的动作：告诉 GPU 到此为止发出的这一串顶点凑成一个完整图元，下一次 `EmitVertex` 将开始一个全新图元。",
    tags: ["EndPrimitive", "定义"],
  },
  {
    id: "gs-10",
    chapter: "geometry-shader",
    level: 1,
    question: "几何着色器发顶点、收尾的标准节奏是什么？",
    answer:
      "**赋 `gl_Position` → `EmitVertex()`，重复 N 次，最后 `EndPrimitive()` 收尾**。想要几个顶点就 `EmitVertex` 几次，一个图元发完调一次 `EndPrimitive`。",
    tags: ["EmitVertex", "EndPrimitive", "节奏"],
  },
  {
    id: "gs-11",
    chapter: "geometry-shader",
    level: 1,
    question: "`max_vertices` 是什么？设小了会怎样？",
    answer:
      "输出声明里的**上限**：单次 `main` 里最多能发多少个顶点。`EmitVertex` 调用次数**超过它**，超出的顶点会被 GPU **悄悄丢弃**（不报错），几何就残缺。把它设成 ≥ 实际最大发顶点数即可。",
    tags: ["max_vertices", "定义"],
  },
  {
    id: "gs-12",
    chapter: "geometry-shader",
    level: 1,
    question: "什么是「面法线」（face normal）？怎么算？",
    answer:
      "一个三角形所在平面的**垂直朝外**方向。几何着色器用三角形的**两条边叉乘**再归一化得到它：`normalize(cross(边1, 边2))`。",
    tags: ["面法线", "定义"],
  },
  {
    id: "gs-13",
    chapter: "geometry-shader",
    level: 1,
    question: "「explode 爆破」效果是怎么做的？",
    answer:
      "把模型的每个三角形**沿它自己的面法线整体推开**一段距离 `magnitude`，三个顶点都沿法线平移同样距离，三角形整体被推离原位、又不变形，模型像被炸成飞溅碎片。",
    tags: ["explode", "爆破", "定义"],
  },
  {
    id: "gs-14",
    chapter: "geometry-shader",
    level: 1,
    question: "⚠ WebGL2（GLSL ES 3.0）有几何着色器阶段吗？",
    answer:
      "**没有**。WebGL2 根本没有几何着色器这个阶段——`GEOMETRY_SHADER` 常量、`EmitVertex`、几何阶段的 `layout` 全不存在。本站所有 Demo 跑在 WebGL2 上，几何着色器只能用顶点着色器近似。",
    tags: ["WebGL2", "无几何着色器"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "gs-15",
    chapter: "geometry-shader",
    level: 2,
    question:
      "几何着色器和顶点着色器、片段着色器在「能否改变零件数量」上有什么本质不同？",
    answer:
      "顶点着色器**一进一出**（一个顶点进、一个顶点出），片段着色器**逐片段涂**，谁都不能凭空增删；而几何着色器**一进多出**——这是它独一份的本事，也是它能做爆破、长毛刺、点造广告牌的根。",
    tags: ["几何着色器", "对比"],
  },
  {
    id: "gs-16",
    chapter: "geometry-shader",
    level: 2,
    question:
      "为什么几何着色器输入一个「点」、却能输出一片「四边形」？这「无中生有」的真相是什么？",
    answer:
      "真相就是**多发了几个顶点**：输入只有一个点（`gl_in[0]`），几何着色器在它周围用 `EmitVertex()` 依次发出 4 个顶点，`triangle_strip` 把这 4 个顶点连成一个四边形。0 维的点凭空长成一片面，靠的就是「自己决定发几个顶点」。",
    tags: ["几何着色器", "机制"],
  },
  {
    id: "gs-17",
    chapter: "geometry-shader",
    level: 2,
    question:
      "几何着色器的输入图元类型和输出图元类型必须一样吗？这有什么意义？",
    answer:
      "**完全可以不一样**——这正是它的魔力：输入一个点、输出一片三角形带（点造广告牌）；输入一片三角形、输出还是三角形但顶点被推开了（爆破）。输入输出类型解耦，才能做各种增删改。",
    tags: ["layout", "输入输出类型"],
  },
  {
    id: "gs-18",
    chapter: "geometry-shader",
    level: 2,
    question: "几何着色器「造、删、改」三种操作分别对应什么？",
    answer:
      "发的顶点**比收的多** = 「造」（点造四边形、长毛刺）；发的顶点**比收的少**（甚至不发）= 「删」（丢弃图元）；顶点**位置变了**但数量不变 = 「改」（爆破、推开）。归根结底就是在 main 里自己决定赋什么 `gl_Position`、`EmitVertex` 发几次。",
    tags: ["几何着色器", "增删改"],
  },
  {
    id: "gs-19",
    chapter: "geometry-shader",
    level: 2,
    question: "忘了调 `EndPrimitive()` 会发生什么？为什么？",
    answer:
      "前后 `EmitVertex` 发出的所有顶点会被 GPU 当成**同一条 `triangle_strip`** 连成一长条、糊在一起，相邻图元之间多出根本没想要的三角形。因为不收尾，GPU 不知道一个图元到哪结束，就一直往后连。",
    tags: ["EndPrimitive", "机制"],
  },
  {
    id: "gs-20",
    chapter: "geometry-shader",
    level: 2,
    question:
      "`max_vertices` 设得比实际 `EmitVertex` 次数小，几何为什么会残缺？",
    answer:
      "因为超出 `max_vertices` 的那些 `EmitVertex` 发出的顶点会被 GPU **悄悄丢弃、不报错**。比如调了 5 次但 `max_vertices=3`，后 2 个顶点没了，四边形缺一角、碎片只剩半片。",
    tags: ["max_vertices", "机制"],
  },
  {
    id: "gs-21",
    chapter: "geometry-shader",
    level: 2,
    question:
      "爆破用的「面法线」和光照用的「顶点法线」有什么区别？爆破为什么用面法线？",
    answer:
      "**面法线**整片三角形共一个、朝外，用三角形两条边叉乘算；**顶点法线**每个顶点各一个、用于光照。爆破用面法线是因为几何着色器手里正好攥着一个三角形的三个顶点，当场叉乘算面法线最方便，让整片沿同一方向推开。",
    tags: ["面法线", "顶点法线", "对比"],
  },
  {
    id: "gs-22",
    chapter: "geometry-shader",
    level: 2,
    question: "爆破时让 `magnitude` 随时间变化，会有什么效果？",
    answer:
      "模型就有了「**逐渐炸开**」的动画。比如用 `(sin(time)+1.0)/2.0` 把 magnitude 系数在 0~1 间来回拉，模型就一张一合地呼吸式爆破；换成单调递增的量则一次性炸开后保持。",
    tags: ["explode", "magnitude", "动画"],
  },
  {
    id: "gs-23",
    chapter: "geometry-shader",
    level: 2,
    question: "爆破效果会改变三角形的数量吗？它属于几何着色器的哪类用法？",
    answer:
      "**不改变**——爆破只是把每片三角形沿面法线整体平移，三角形一个没多也没少。它是几何着色器「**改图元**」的典型用法（位置变、数量不变）。",
    tags: ["explode", "改图元"],
  },
  {
    id: "gs-24",
    chapter: "geometry-shader",
    level: 2,
    question: "⚠ 为什么本站讲几何着色器时必须诚实标注「WebGL2 没有这个阶段」？",
    answer:
      "因为本站所有 Demo 跑在浏览器的 WebGL2（GLSL ES 3.0）上，而 WebGL2 根本没有几何着色器阶段——写 `layout(triangles) in;`、调 `EmitVertex()` 都是非法的、编译直接报错。不说清就会误导读者照搬桌面代码、白屏。所以桌面代码是真几何着色器，本站爆破是顶点着色器近似，绝不能搞混。",
    tags: ["WebGL2", "无几何着色器", "红线"],
  },
  {
    id: "gs-25",
    chapter: "geometry-shader",
    level: 2,
    question:
      "本站在 WebGL2 上用什么近似爆破？它和真几何着色器在「工作粒度」上差在哪？",
    answer:
      "用**顶点着色器做顶点位移近似**：每个顶点用自带的顶点法线 `aNormal`，按 `aPos + aNormal * uExplode` 自己往外位移。差别：真几何着色器在**图元级**工作（手里有整片三角形、算面法线、能增删图元）；近似是**逐顶点**的（只能沿自己的顶点法线位移、一进一出、不能增删图元）。",
    tags: ["顶点位移近似", "WebGL2", "对比"],
  },
  {
    id: "gs-26",
    chapter: "geometry-shader",
    level: 2,
    question: "几何着色器有哪些典型用途？",
    answer:
      "**法线可视化**（给每个面/顶点长出一根法线毛刺）、**explode 爆破**（沿面法线把三角形推开）、**造 billboard 广告牌**（一个点造一片永远朝向相机的四边形）——核心都是「凭空增删改图元」。",
    tags: ["几何着色器", "用途"],
  },
  {
    id: "gs-27",
    chapter: "geometry-shader",
    level: 2,
    question:
      "为什么说没有几何着色器，「想让模型炸开/给点云批量长方块/可视化每根法线」要么 CPU 累死要么做不到？",
    answer:
      "因为这些都要在**运行时**凭空生成新几何。没有几何着色器，形状只能在建模时定死、运行时动不了；要在运行时造几何只能在 CPU 上算好再上传（量大就累死 CPU），或干脆做不到。几何着色器把「运行时造几何」搬到 GPU 上，一次绘制就做完。",
    tags: ["几何着色器", "为什么"],
  },

  // ── L3 应用（读代码 / 给参数判结果 / WebGL2 近似） ──
  {
    id: "gs-28",
    chapter: "geometry-shader",
    level: 3,
    question:
      "写一个「原样直通三角形」的最简几何着色器骨架，顶上两行 `layout` 怎么写？",
    answer:
      "`layout (triangles) in;`（收一片三角形、3 个顶点）和 `layout (triangle_strip, max_vertices = 3) out;`（出一条三角形带、最多发 3 个顶点）。",
    tags: ["layout", "骨架", "代码"],
  },
  {
    id: "gs-29",
    chapter: "geometry-shader",
    level: 3,
    question: "原样直通骨架的 `main` 怎么写（循环发 3 个顶点）？",
    answer:
      "`for (int i = 0; i < 3; i++) { gl_Position = gl_in[i].gl_Position; EmitVertex(); } EndPrimitive();`——取第 i 个输入顶点位置原样赋给 `gl_Position` 再 `EmitVertex` 发出，3 个发完 `EndPrimitive` 收尾。",
    tags: ["EmitVertex", "EndPrimitive", "代码"],
  },
  {
    id: "gs-30",
    chapter: "geometry-shader",
    level: 3,
    question: "`GetNormal()` 用 `gl_in` 的三个位置算面法线，怎么写？",
    answer:
      "`vec3 a = vec3(gl_in[0].gl_Position) - vec3(gl_in[1].gl_Position); vec3 b = vec3(gl_in[2].gl_Position) - vec3(gl_in[1].gl_Position); return normalize(cross(a, b));`——两条边相减得边向量，叉乘再归一化得面法线。",
    tags: ["面法线", "GetNormal", "代码"],
  },
  {
    id: "gs-31",
    chapter: "geometry-shader",
    level: 3,
    question: "explode 几何着色器和原样直通骨架，代码上唯一的区别是什么？",
    answer:
      "唯一区别：`EmitVertex` 之前把 `gl_in[i].gl_Position` 换成 `explode(gl_in[i].gl_Position, normal)`——三个顶点都加上同一个「面法线 × magnitude」的位移，整片三角形被推离原位、形状不变。",
    tags: ["explode", "代码", "对比"],
  },
  {
    id: "gs-32",
    chapter: "geometry-shader",
    level: 3,
    question:
      "`explode(pos, normal)` 函数体怎么写（让 magnitude 随 time 起伏）？",
    answer:
      "`float magnitude = 2.0; vec3 dir = normal * ((sin(time) + 1.0) / 2.0) * magnitude; return pos + vec4(dir, 0.0);`——`(sin(time)+1.0)/2.0` 把系数在 0~1 间来回拉，沿法线推开。",
    tags: ["explode", "magnitude", "代码"],
  },
  {
    id: "gs-33",
    chapter: "geometry-shader",
    level: 3,
    question: "本站 WebGL2 顶点着色器近似爆破，位移那行怎么写？",
    answer:
      "`vec3 pos = aPos + aNormal * uExplode;` 再 `gl_Position = uMVP * vec4(pos, 1.0);`——每个顶点沿自己的顶点法线 `aNormal` 往外推 `uExplode`（0=原样、越大越炸开）。",
    tags: ["顶点位移近似", "WebGL2", "代码"],
  },
  {
    id: "gs-34",
    chapter: "geometry-shader",
    level: 3,
    question: "桌面端怎么编译并接入几何着色器？WebGL2 能照做吗？",
    answer:
      "桌面端用 `glCreateShader(GL_GEOMETRY_SHADER)` 单独编译这段，再和顶点/片段着色器一起 link 进同一个 program。**WebGL2 不能照做**——没有 `GEOMETRY_SHADER` 这个常量、也没有这个阶段，那段代码在浏览器里根本无法编译。",
    tags: ["GL_GEOMETRY_SHADER", "WebGL2", "编译"],
  },
  {
    id: "gs-35",
    chapter: "geometry-shader",
    level: 3,
    question:
      "explode 里把 `(sin(time)+1.0)/2.0` 改成 `min(time, magnitude)`，效果会怎样变？",
    answer:
      "从「呼吸式反复一张一合」变成「**炸开后保持、不再合回去**」（一次性爆破）。因为 `min(time, magnitude)` 是**单调不减、最终封顶**的量，去掉了 `sin` 的周期性，magnitude 涨到位就停住、不回落。",
    tags: ["explode", "改效果", "判结果"],
  },
  {
    id: "gs-36",
    chapter: "geometry-shader",
    level: 3,
    question:
      "一个几何着色器调了 4 次 `EmitVertex()`、但 `max_vertices = 3`，画出来会怎样？",
    answer:
      "第 4 个顶点被 GPU **悄悄丢弃**（不报错），于是想造的四边形**缺一角**——只发出去了前 3 个顶点连成的一个三角形。修法：把 `max_vertices` 改成 `4`。",
    tags: ["max_vertices", "判结果"],
  },
  {
    id: "gs-37",
    chapter: "geometry-shader",
    level: 3,
    question:
      "几何着色器收一个点想造四边形（4 个顶点），输出 `layout` 该怎么写？",
    answer:
      "`layout (points) in;` 和 `layout (triangle_strip, max_vertices = 4) out;`——`max_vertices` 必须 ≥ 4（实际要发 4 个顶点），输出类型 `triangle_strip` 把 4 个顶点连成四边形。",
    tags: ["layout", "max_vertices", "代码"],
  },
  {
    id: "gs-38",
    chapter: "geometry-shader",
    level: 3,
    question:
      "桌面 explode 用「面法线」、WebGL2 近似用「顶点法线」，代码里这个差异具体体现在哪？",
    answer:
      "桌面端：`vec3 normal = GetNormal();` 当场叉乘算**整片三角形共一个的面法线**，三顶点共用。WebGL2 端：直接用顶点自带的 `in vec3 aNormal;`（**每顶点各一个的顶点法线**），各顶点沿各自的法线位移。前者图元级、后者逐顶点。",
    tags: ["面法线", "顶点法线", "对比", "代码"],
  },
  {
    id: "gs-39",
    chapter: "geometry-shader",
    level: 3,
    question:
      "几何着色器输入类型 `layout(lines) in;` 时，`gl_in[]` 数组有几个元素？",
    answer:
      "**2 个**（`gl_in[0]`、`gl_in[1]`）——线段由 2 个顶点组成。点是 1 个、三角形是 3 个、线是 2 个，`gl_in[]` 的长度由输入图元类型决定。",
    tags: ["gl_in", "输入类型", "判结果"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 边界） ──
  {
    id: "gs-40",
    chapter: "geometry-shader",
    level: 4,
    question:
      "本想发几个独立的三角形/四边形，结果它们糊成一长条、连成奇怪的带状。原因和修法？",
    answer:
      "原因：忘了在每个图元发完后调 `EndPrimitive()`——不收尾，GPU 就把前后 `EmitVertex` 发出的所有顶点当成**同一条 triangle_strip** 连下去，相邻图元间多出没想要的三角形。修法：每发完一个完整图元就调一次 `EndPrimitive()` 分段，下一个图元的顶点才会被当成新图元。",
    tags: ["EndPrimitive", "陷阱"],
  },
  {
    id: "gs-41",
    chapter: "geometry-shader",
    level: 4,
    question:
      "几何只画出来一部分——四边形缺一角、爆破碎片只剩半片，越往后越残缺。原因和修法？",
    answer:
      "原因：`max_vertices` 设小了。你 `EmitVertex()` 调了 5 次、`max_vertices` 却写成 3，超出的 2 个顶点被 GPU 悄悄丢弃、不报错。修法：把 `max_vertices` 设成 ≥ 单次 main 里实际 `EmitVertex` 的**最大次数**（造 5 顶点的房子就写 `max_vertices = 5`）；它只是上限，写大点不影响正确性。",
    tags: ["max_vertices", "陷阱"],
  },
  {
    id: "gs-42",
    chapter: "geometry-shader",
    level: 4,
    question:
      "⚠ 照桌面教程在浏览器/WebGL2 里写几何着色器，`layout (triangles) in;` 一编译就报错、Demo 白屏。原因和修法？",
    answer:
      "原因：**WebGL2（GLSL ES 3.0）根本没有几何着色器这个阶段**——`GEOMETRY_SHADER` 常量、`EmitVertex`、几何阶段的 `layout` 全不存在。修法：WebGL2 里别指望几何着色器。要近似爆破/膨胀，挪到**顶点着色器**做顶点位移（`aPos + aNormal * uExplode`）；要真增删几何，改用 **transform feedback**、**实例化** 或 CPU 端预生成。",
    tags: ["WebGL2", "无几何着色器", "陷阱", "红线"],
  },
  {
    id: "gs-43",
    chapter: "geometry-shader",
    level: 4,
    question:
      "「既然原书用几何着色器做爆破，直接把那段几何着色器搬进本站不就行了？」请回答会发生什么、本站怎么近似、能力差在哪。",
    answer:
      "① 直接搬会**编译失败、Demo 白屏**——WebGL2 没有几何着色器阶段，那段 `#version 330 core` 的几何着色器在浏览器里一编译就报错。② 本站把爆破挪到**顶点着色器**做顶点位移：每顶点沿自己的顶点法线 `aPos + aNormal * uExplode`。③ 能力差在「能不能增删图元」：真几何着色器图元级、能算面法线、能凭空增删图元；顶点近似逐顶点、一进一出、只能沿顶点法线位移、绝不能增删。要真造几何得换 transform feedback / 实例化 / CPU 预生成。",
    tags: ["WebGL2", "顶点位移近似", "综合", "红线"],
  },
  {
    id: "gs-44",
    chapter: "geometry-shader",
    level: 4,
    question:
      "几何着色器收一个点造四边形，代码写成 `max_vertices = 3` 且 main 末尾没有 `EndPrimitive()`，会出哪两个问题？怎么改？",
    answer:
      "两个问题正好对应两个常见坑：① `max_vertices = 3` 太小——实际调 4 次 `EmitVertex` 凑四边形，第 4 个顶点被丢弃，四边形**缺一角**，改成 `max_vertices = 4`；② 忘 `EndPrimitive()`——这个四边形发完没分段，会和下一个点造的四边形顶点连成同一条 triangle_strip、**糊在一起**，在末尾补 `EndPrimitive();`。",
    tags: ["max_vertices", "EndPrimitive", "排错", "综合"],
  },
  {
    id: "gs-45",
    chapter: "geometry-shader",
    level: 4,
    question:
      "爆破推的为什么是「面法线」而不是「顶点法线」？换成顶点法线会有什么观感差异？",
    answer:
      "几何着色器手里攥着整片三角形的三个顶点，当场叉乘算**面法线**（整片共一个、朝外）最方便，三顶点沿同一方向推开、整片刚性平移、形状不变、像真的碎片飞出。若改用每顶点各自的顶点法线（如 WebGL2 近似），各顶点沿不同方向位移，更像「膨胀」而非刚性平移，相邻面接缝处还可能裂开——这正是近似与真几何着色器的观感差异之一。",
    tags: ["面法线", "顶点法线", "综合", "边界"],
  },
  {
    id: "gs-46",
    chapter: "geometry-shader",
    level: 4,
    question:
      "几何着色器「造、删、改」三类操作，分别举一个典型例子，并说明它和顶点着色器的根本分界。",
    answer:
      "**造**：一个点 `EmitVertex` 4 次造一片四边形广告牌（发的比收的多）；**删**：某些条件下不 `EmitVertex` 直接丢弃图元（发的比收的少）；**改**：explode 把三顶点沿面法线推开但数量不变。根本分界：几何着色器能改变图元数量（一进多出/一进零出），顶点着色器只能一进一出、永远不能增删——这是几何着色器独一份的能力。",
    tags: ["几何着色器", "增删改", "综合"],
  },
  {
    id: "gs-47",
    chapter: "geometry-shader",
    level: 4,
    question:
      "explode 里 magnitude 用 `(sin(time)+1.0)/2.0` 是「呼吸式反复爆破」，想改成「炸开后保持」该怎么改？关键是什么？",
    answer:
      "把这个**周期性**系数换成**单调不减、最终饱和**的量即可：如 `vec3 dir = normal * min(time, magnitude);`（渐渐炸开、到位停住），或直接 `normal * magnitude`（瞬间炸到底）。关键是**去掉 `sin` 这种周期函数**——`sin(time)` 在 −1~1 反复、映射到 0~1 反复，magnitude 才会涨落；换成单调量或常量，炸开后就不回落、定格。",
    tags: ["explode", "改效果", "综合"],
  },
  {
    id: "gs-48",
    chapter: "geometry-shader",
    level: 4,
    question:
      "要在 WebGL2 里真正「凭空造新几何」（不只是近似膨胀），有哪几条替代路线？为什么顶点位移近似做不到？",
    answer:
      "替代路线：**transform feedback**（把顶点着色器输出捕获回缓冲，可生成新顶点数据）、**实例化（instancing）**（一次绘制画大量副本）、或 **CPU 端预生成**几何再上传。顶点位移近似做不到是因为它是顶点着色器、**一进一出**——只能挪动已有顶点的位置，无法增加或删除顶点，所以造不出新几何。",
    tags: ["WebGL2", "transform feedback", "实例化", "综合"],
  },
  {
    id: "gs-49",
    chapter: "geometry-shader",
    level: 4,
    question:
      "把「几何着色器输入一个点、输出一片四边形」整条链路串一遍：从 layout 到屏幕上的面，经过哪几环？",
    answer:
      "① `layout(points) in;` 收一个点（`gl_in[0]`）、`layout(triangle_strip, max_vertices=4) out;` 声明出四边形带、上限 4；② main 里围绕这个点 4 次「赋 `gl_Position` → `EmitVertex()`」发出 4 个顶点；③ `EndPrimitive()` 收尾，`triangle_strip` 把 4 个顶点连成一个四边形；④ 这片四边形送往光栅化拆成片段、上色显示。0 维的点凭空长成一片有面积的面，靠的就是「多发了几个顶点」。",
    tags: ["几何着色器", "EmitVertex", "综合"],
  },
];
