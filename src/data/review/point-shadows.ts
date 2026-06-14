/** 复习题库 · 点阴影（point-shadows）。HEL-90 高级光照篇。 */

import type { ReviewQuestion } from "./types";

export const pointShadowsQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / API / 数值约定） ──
  {
    id: "ps-1",
    chapter: "point-shadows",
    level: 1,
    question: "什么是「全向阴影」？",
    answer:
      "点光源（向四面八方 360° 发光的光源，如灯泡）产生的阴影。和方向光只朝一个方向不同，点光的光线射向所有方向，所以遮挡必须在所有方向上都被记录下来。",
    tags: ["全向阴影", "定义"],
  },
  {
    id: "ps-2",
    chapter: "point-shadows",
    level: 1,
    question: "点光源为什么不能用一张 2D 深度图？要用什么？",
    answer:
      "点光向 360° 发光，一张 2D 深度图只罩得住一个方向。要用 **6 个面**各渲一张距离图拼成的**深度立方体贴图**（depth cubemap）把光源全包住。",
    tags: ["全向阴影", "cubemap"],
  },
  {
    id: "ps-3",
    chapter: "point-shadows",
    level: 1,
    question: "什么是「深度立方体贴图」？6 个面分别朝哪？",
    answer:
      "把点光源周围 6 个方向（+X/−X/+Y/−Y/+Z/−Z，即上下左右前后）各渲一张深度图拼成的立方体贴图。每面存「沿这个方向望出去离光源最近的遮挡距离」，6 面合起来把光源 360° 全包住。",
    tags: ["深度立方体贴图", "定义"],
  },
  {
    id: "ps-4",
    chapter: "point-shadows",
    level: 1,
    question: "点阴影第一遍每个面存的是什么？和方向光有何不同？",
    answer:
      "存「这个方向上离光源最近的遮挡物到光源的**真实直线距离**」（`length(fragPos − lightPos)`），而不是方向光那种被投影压过的裁剪空间深度。",
    tags: ["到光源的距离", "定义"],
  },
  {
    id: "ps-5",
    chapter: "point-shadows",
    level: 1,
    question: "什么是「方向向量采样」？点阴影里那根方向向量是什么？",
    answer:
      "从立方体贴图取值的方式：不用 2D uv，而是用一根方向向量，方向指向哪个面的哪个点就取那点的值。点阴影里这根向量是 `fragToLight = fragPos − lightPos`（从光源指向片元）。",
    tags: ["方向向量采样", "定义"],
  },
  {
    id: "ps-6",
    chapter: "point-shadows",
    level: 1,
    question: "存进 cubemap 前距离要怎么处理？采样回来又要做什么？",
    answer:
      "存前**除以 `far_plane`** 归一化到 `[0,1]`（深度纹理只存 `[0,1]`）；采样回来**乘回 `far_plane`** 还原成真实距离。这两步必须成对出现。",
    tags: ["到光源的距离", "归一化"],
  },
  {
    id: "ps-7",
    chapter: "point-shadows",
    level: 1,
    question: "点光阴影相机用什么投影？视场角和宽高比设多少？",
    answer:
      "用**透视投影**，视场角 **90°**、宽高比 **1**（`perspective(90°, 1, near, far)`）——正好一格一面无缝拼接成立方体。",
    tags: ["透视投影", "90°"],
  },
  {
    id: "ps-8",
    chapter: "point-shadows",
    level: 1,
    question: "第二遍判阴影的核心三步是什么？",
    answer:
      "① 算方向 `fragToLight = fragPos − lightPos`；② 用它去 cubemap 采样取存的最近距离、乘回 `far_plane` 还原；③ 和片元到光的实际距离 `length(fragToLight)` 比 + bias。",
    tags: ["判阴影", "三步"],
  },
  {
    id: "ps-9",
    chapter: "point-shadows",
    level: 1,
    question: "第一遍片段着色器怎么算并写「到光源距离」（桌面 OpenGL）？",
    answer:
      "`float lightDistance = length(FragPos.xyz - lightPos);` 然后 `gl_FragDepth = lightDistance / far_plane;`——手动算距离、除以 far_plane 归一化后写深度。",
    tags: ["第一遍", "代码"],
  },
  {
    id: "ps-10",
    chapter: "point-shadows",
    level: 1,
    question: "桌面 OpenGL 渲深度立方图能一遍渲完 6 面吗？靠什么？",
    answer:
      "能。用**几何着色器**一次 draw call 渲完：循环 `gl_Layer = 0..5`、对每个面用对应矩阵把三角形发到立方体贴图的第 i 层，一遍搞定。",
    tags: ["几何着色器", "API差异"],
  },
  {
    id: "ps-11",
    chapter: "point-shadows",
    level: 1,
    question: "WebGL2 渲深度立方图怎么处理 6 个面？",
    answer:
      "WebGL2 **没有几何着色器**，只能**循环 6 次**：每次把 cubemap 一个面绑到 FBO 颜色附件（`framebufferTexture2D(..., TEXTURE_CUBE_MAP_POSITIVE_X + i, ...)`），用第 i 个矩阵渲一遍，6 次填满 6 面。",
    tags: ["几何着色器", "WebGL2"],
  },
  {
    id: "ps-12",
    chapter: "point-shadows",
    level: 1,
    question: "第二遍采样 cubemap 时方向向量需要归一化吗？",
    answer:
      "不需要。cubemap 采样只看**方向**，`texture(depthCubemap, fragToLight)` 直接传 `fragToLight` 即可，不必归一化、也不用 2D 坐标。",
    tags: ["方向向量采样", "API"],
  },
  {
    id: "ps-13",
    chapter: "point-shadows",
    level: 1,
    question: "点阴影第二遍判阴影的代码大概怎么写？",
    answer:
      "`vec3 fragToLight = fragPos - lightPos; float closestDepth = texture(depthCubemap, fragToLight).r * far_plane; float currentDepth = length(fragToLight); return currentDepth - bias > closestDepth ? 1.0 : 0.0;`",
    tags: ["判阴影", "代码"],
  },
  {
    id: "ps-14",
    chapter: "point-shadows",
    level: 1,
    question: "点阴影的 PCF 和方向光的有什么不同？",
    answer:
      "点阴影的 PCF 沿**多个三维方向**偏移采样 cubemap（在 fragToLight 周围的小立方体邻域里取一圈样），而不再是方向光那样在 2D 平面上偏一圈。",
    tags: ["PCF", "三维方向"],
  },
  {
    id: "ps-15",
    chapter: "point-shadows",
    level: 1,
    question: "深度立方体贴图和天空盒那种立方体贴图是同一种结构吗？",
    answer:
      "是同一种结构——6 张面图贴在立方体的 6 个内壁上，只不过这里每面存的不是颜色，而是「到光源的最近距离」。",
    tags: ["深度立方体贴图", "结构"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "ps-16",
    chapter: "point-shadows",
    level: 2,
    question: "为什么一张深度图罩不住点光源？举个例子。",
    answer:
      "想象灯泡在屋子正中：朝右拍的那张只记得住右墙方向的遮挡，左墙、天花板、地板方向它一概看不见。点光向所有方向发光，单张 2D 图只覆盖一个方向，其余全是盲区。",
    tags: ["全向阴影", "为什么"],
  },
  {
    id: "ps-17",
    chapter: "point-shadows",
    level: 2,
    question: "点阴影为什么用「到光源的距离」而不是裁剪空间深度？",
    answer:
      "点光向所有方向对称地发光，用「直线距离」描述遮挡比某个方向的投影深度更自然、更对称。每个面存的是真实距离，第二遍直接和 `length(fragToLight)` 比，逻辑统一。",
    tags: ["到光源的距离", "为什么"],
  },
  {
    id: "ps-18",
    chapter: "point-shadows",
    level: 2,
    question: "点阴影和上一章阴影映射是什么关系？改了哪一处？",
    answer:
      "点阴影 = 阴影映射的**全向版**。两遍法、深度比较的内核没变，只把「一张深度图」换成「6 张拼成的深度立方图」，并把「比投影深度 / 2D 坐标采样」换成「比到光源距离 / 方向向量采样」。",
    tags: ["全向阴影", "对比"],
  },
  {
    id: "ps-19",
    chapter: "point-shadows",
    level: 2,
    question: "第二遍深度比较的判定逻辑和上一章一样吗？变的是什么？",
    answer:
      "判定逻辑一模一样（实际更远 ⇒ 被挡 ⇒ 在阴影）。只是「比的量」从「投影深度」换成「到光源距离」、「取数据方式」从「2D 坐标」换成「方向向量」。",
    tags: ["深度比较", "对比"],
  },
  {
    id: "ps-20",
    chapter: "point-shadows",
    level: 2,
    question: "归一化为什么必须成对（÷far_plane 和 ×far_plane）？",
    answer:
      "存的时候 `÷far_plane` 把几米的真实距离压进 `[0,1]`；采样回来 `×far_plane` 还原成真实距离，才能和 `length(fragToLight)` 这个真实距离比。少了任一步，就拿一个 `[0,1]` 的小数和几米比，怎么比都错。",
    tags: ["到光源的距离", "成对"],
  },
  {
    id: "ps-21",
    chapter: "point-shadows",
    level: 2,
    question: "为什么 6 个面的 lookAt「up 向量」要选对？",
    answer:
      "否则相邻面会扭转、拼不上——每个面是立方体贴图的一面，up 选错会让这一面的内容相对邻面旋转 / 翻转，6 面接缝处对不齐，采样过去就错位。",
    tags: ["6 个面", "up"],
  },
  {
    id: "ps-22",
    chapter: "point-shadows",
    level: 2,
    question: "为什么点光阴影相机的视场角必须是 90°、宽高比 1？",
    answer:
      "因为要用 6 个相机正好拼成一个完整立方体把光源包住。90° 视场 + 宽高比 1 时，每个相机正好覆盖立方体的一个面，6 个无缝拼接、不重叠不漏缝。",
    tags: ["透视投影", "为什么"],
  },
  {
    id: "ps-23",
    chapter: "point-shadows",
    level: 2,
    question: "为什么点光的 bias 比方向光更娇气、更难调？",
    answer:
      "点阴影存的是**线性距离**、量级比方向光的非线性裁剪深度大，bias 的「合适范围」也不同。所以同样的 acne / peter panning 双刃剑在点阴影里需要更细地调 bias。",
    tags: ["bias", "对比"],
  },
  {
    id: "ps-24",
    chapter: "point-shadows",
    level: 2,
    question: "上一章的 shadow acne / peter panning / PCF 在点阴影里还在吗？",
    answer:
      "全都还在。bias 仍是双刃剑（点光更需细调），PCF 改为沿多个三维方向偏移采样 cubemap 软化边缘。本章没推翻它们，只是扩展到全向。",
    tags: ["复用概念", "对比"],
  },
  {
    id: "ps-25",
    chapter: "point-shadows",
    level: 2,
    question: "为什么 WebGL2 渲 6 面比桌面多 5 趟绘制？",
    answer:
      "桌面有几何着色器 + layered rendering，能一遍把三角形分发到 6 个面层。WebGL2 没有这套，只能每面绑一次 FBO、渲一遍，6 个面就是 6 趟 draw call——逻辑等价，只是多 5 趟。",
    tags: ["几何着色器", "WebGL2"],
  },
  {
    id: "ps-26",
    chapter: "point-shadows",
    level: 2,
    question: "为什么房间盒子要设 side = BackSide 才能从里面看到四壁并收影子？",
    answer:
      "默认正面法线朝外，从房间内部看到的是被剔除 / 背对的面，既不正常显示也收不到阴影。设 `BackSide`（只渲朝内的背面）让法线朝内，站在房间里既能看到四壁、四壁也能正常 `receiveShadow`。",
    tags: ["BackSide", "为什么"],
  },
  {
    id: "ps-27",
    chapter: "point-shadows",
    level: 2,
    question: "WebGL2 里第一遍为什么用颜色附件存距离，而不是 gl_FragDepth？",
    answer:
      "WebGL2 没有几何着色器、要循环渲 6 面到 cubemap 的颜色附件，所以用一张浮点 cubemap 当距离图：第一遍片段着色器把 `lightDistance / far_plane` 写进**颜色**（如 `R16F`/`RGBA16F`），第二遍用 `.r` 读回。",
    tags: ["WebGL2", "距离图"],
  },
  {
    id: "ps-28",
    chapter: "point-shadows",
    level: 2,
    question: "cubemap 采样器在两端的 precision 声明有什么要注意？",
    answer:
      "WebGL2 片段着色器开头必须加 `precision highp float;`、采样器建议 `precision highp samplerCube;`；`texture()` 对 `samplerCube` 两端同名、都用方向向量采样。桌面无此精度声明要求。",
    tags: ["precision", "WebGL2"],
  },
  {
    id: "ps-29",
    chapter: "point-shadows",
    level: 2,
    question: "把 shadow 值合进点光光照时怎么写？和方向光一样吗？",
    answer:
      "一样：`(ambient + (1.0 - shadow) * (diffuse + specular)) * color`。shadow 是 0 受光 ~ 1 全影，阴影里只留环境光。",
    tags: ["合成", "对比"],
  },

  // ── L3 应用（给参数判结果 / 改法 / 读代码） ──
  {
    id: "ps-30",
    chapter: "point-shadows",
    level: 3,
    question:
      "采样回来的最近距离要和片元实际距离比之前，必须先做什么？漏了会怎样？",
    answer:
      "必须先**乘回 `far_plane`** 还原成真实距离。漏了就拿一个 `[0,1]` 的小数去和几米的真实距离比，深度比较全错——满屏全亮或全黑、影子对不上。",
    tags: ["到光源的距离", "应用"],
  },
  {
    id: "ps-31",
    chapter: "point-shadows",
    level: 3,
    question: "在 demo 里把光源移到房间一角，哪面墙影子最长？为什么？",
    answer:
      "**离光最远的那面墙**影子最长。光从角落斜斜照过去，物体投在远墙上的影子被拉得又细又长（像傍晚太阳低垂、影子拖得老远）。",
    tags: ["Demo", "应用"],
  },
  {
    id: "ps-32",
    chapter: "point-shadows",
    level: 3,
    question: "拖「光源方位」转一圈、盯四面墙，会看到什么？这验证了什么？",
    answer:
      "每面墙上的影子方向、长短都在**同时**变化，没有哪个方向是盲区。这验证了 6 面深度立方图把光源 360° 全包住——任何方向上的遮挡都有记录，这正是点阴影 vs 方向光单向阴影的核心差异。",
    tags: ["Demo", "应用"],
  },
  {
    id: "ps-33",
    chapter: "point-shadows",
    level: 3,
    question: "影子像镜像翻转、背光面亮向光面黑，方向向量可能怎么写错了？",
    answer:
      "方向向量取**反**了——写成了 `lightPos − fragPos`（从片元指向光），而采样要的是 `fragToLight = fragPos − lightPos`（从光源指向片元）。方向一反就采到对面那个面的距离。修法：牢记 `fragToLight = fragPos − lightPos`。",
    tags: ["方向向量采样", "排错"],
  },
  {
    id: "ps-34",
    chapter: "point-shadows",
    level: 3,
    question: "点阴影的 PCF 多方向偏移采样大致怎么写？",
    answer:
      "预备一组三维偏移方向（如 20 个），`for` 循环 `texture(depthCubemap, fragToLight + sampleOffsets[i] * diskRadius).r * far_plane`，各比一次累加，最后 `shadow /= 20.0` 取平均得软边。",
    tags: ["PCF", "代码"],
  },
  {
    id: "ps-35",
    chapter: "point-shadows",
    level: 3,
    question: "影子全错、满屏全亮或全黑，far_plane 可能哪没配对？",
    answer:
      "第一遍存的时候除了 `far_plane`，第二遍采样回来却忘了乘回 `far_plane`（或反过来）。修法：存「`距离 / far_plane`」、采样回来「`closestDepth * far_plane`」必须成对、用同一个 far_plane。",
    tags: ["到光源的距离", "排错"],
  },
  {
    id: "ps-36",
    chapter: "point-shadows",
    level: 3,
    question:
      "demo 里把阴影图分辨率从 2048 切到 256，阴影边缘怎么变？为什么点光更明显？",
    answer:
      "边缘从平滑变成粗粗的阶梯锯齿。点光的距离图是 6 面 cubemap、每面只有 256×256，单位面积分到的像素少，边缘量化得更粗，所以锯齿比方向光单张图更明显。",
    tags: ["分辨率", "Demo"],
  },
  {
    id: "ps-37",
    chapter: "point-shadows",
    level: 3,
    question: "裸 WebGL2 渲点光深度立方图，怎么补几何着色器的缺？",
    answer:
      "`for i in 0..5` 循环 6 次：每次把 cubemap 第 i 面绑到 FBO 颜色附件（`framebufferTexture2D(FRAMEBUFFER, COLOR_ATTACHMENT0, TEXTURE_CUBE_MAP_POSITIVE_X + i, cubemap, 0)`），设阴影 viewport、清缓冲，用第 i 个矩阵渲一遍。",
    tags: ["独立实现", "WebGL2"],
  },
  {
    id: "ps-38",
    chapter: "point-shadows",
    level: 3,
    question: "建距离 cubemap 时，6 个面的纹理格式和采样参数怎么设（WebGL2）？",
    answer:
      "用 `texImage2D` 给 6 个面各分配纹理，建议用 `R16F`/`RGBA16F` 浮点格式存 `[0,1]` 距离；采样设三轴（S/T/R）`CLAMP_TO_EDGE` + `LINEAR`，避免接缝处采样越界。",
    tags: ["独立实现", "格式"],
  },
  {
    id: "ps-39",
    chapter: "point-shadows",
    level: 3,
    question: "物体明明 castShadow，墙上却没影子、房间像实心盒子，怎么修？",
    answer:
      "房间盒子用了默认正面（法线朝外），从内部看是被剔除 / 背对的面，收不到阴影。修法：盒子材质设 `side = BackSide`（只渲朝内的背面），让法线朝内、四壁能正常 `receiveShadow`。",
    tags: ["BackSide", "排错"],
  },
  {
    id: "ps-40",
    chapter: "point-shadows",
    level: 3,
    question:
      "demo 里把 bias 拖到最大，会出现什么？这是哪个术语，为什么点光更易触发？",
    answer:
      "影子和物体脚下脱节、往后缩、物体像飘起来——这是 **peter panning**。点阴影存线性距离、量级大，bias 的合适范围不同，加过头就把贴地接触处影子也判受光；点光 bias 更娇气，所以更易拖出。",
    tags: ["peter panning", "Demo"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 边界） ──
  {
    id: "ps-41",
    chapter: "point-shadows",
    level: 4,
    question:
      "为什么点阴影既要 6 个面、又要存距离、还要方向向量采样？三者怎么环环相扣？",
    answer:
      "点光全向发光 → 需 6 个面把所有方向遮挡都覆盖（深度立方图）；全向对称 → 用「到光源距离」描述遮挡最自然；cubemap 取值天生用方向 → 用 `fragToLight` 方向向量采样。三者都是「点光向 360° 发光」这一前提的自然推论。",
    tags: ["综合", "全向阴影"],
  },
  {
    id: "ps-42",
    chapter: "point-shadows",
    level: 4,
    question:
      "完整描述点阴影第一遍：从建 cubemap 到写距离的关键步骤（裸 WebGL2）。",
    answer:
      "①建距离 cubemap（6 面浮点纹理）+ FBO + 深度 renderbuffer；②算 6 个面矩阵（`perspective(90°,1,near,far)` × 各方向 lookAt，up 选对）；③循环渲 6 次，每次绑一面到颜色附件、用对应矩阵渲场景；④片段着色器写 `length(FragPos − lightPos) / far_plane`；⑤cubemap 三轴 CLAMP_TO_EDGE。",
    tags: ["独立实现", "综合"],
  },
  {
    id: "ps-43",
    chapter: "point-shadows",
    level: 4,
    question:
      "一个点阴影：影子方向反了 + 满屏全亮 + 墙上无影，分别是哪三个坑？",
    answer:
      "①方向反：`fragToLight` 写成了 `lightPos − fragPos`，改回 `fragPos − lightPos`。②满屏全亮：`far_plane` 归一化没配对（存除了、采样忘乘），两步成对。③墙无影：房间盒子没设 `BackSide`，法线朝外收不到影。三个坑独立、分别修。",
    tags: ["陷阱", "综合"],
  },
  {
    id: "ps-44",
    chapter: "point-shadows",
    level: 4,
    question:
      "为什么点阴影最大的跨端差异落在第一遍，而第二遍判阴影两端几乎一致？",
    answer:
      "第一遍渲 6 面：桌面用几何着色器一遍渲完、WebGL2 无几何着色器要循环 6 次——这是结构性差异。第二遍只是采样 cubemap + 比距离，纯计算，两端 GLSL 一字不差（仅版本声明 / precision 不同）。",
    tags: ["跨端", "综合"],
  },
  {
    id: "ps-45",
    chapter: "point-shadows",
    level: 4,
    question:
      "点阴影和方向光阴影映射，逐项对比：图、存的量、采样方式、第一遍渲法。",
    answer:
      "图：方向光 1 张 2D / 点光 6 面 cubemap；存的量：投影深度 / 到光源距离（需 ÷×far_plane）；采样：2D 坐标 `proj.xy` / 方向向量 `fragToLight`；第一遍：一遍渲 / 桌面几何着色器一遍·WebGL2 循环 6 次。深度比较内核两者完全一致。",
    tags: ["综合", "对比"],
  },
  {
    id: "ps-46",
    chapter: "point-shadows",
    level: 4,
    question:
      "为什么 demo 里「拖光源方位看四壁同时变」是点阴影最有说服力的演示？",
    answer:
      "它直观证明了 6 面深度立方图真把光源 360° 全包住：四面墙和地面的影子方向、长短同时变、没有盲区。对比方向光只能照顾一个方向的单向阴影，这正是点阴影的全部价值所在。",
    tags: ["Demo", "综合"],
  },
  {
    id: "ps-47",
    chapter: "point-shadows",
    level: 4,
    question:
      "若把点阴影的 cubemap 接缝处采样设成 REPEAT 而非 CLAMP_TO_EDGE，会怎样？",
    answer:
      "接缝处的方向向量可能采到错误的边界外值，导致面与面交界处出现错误的距离、阴影在棱边附近闪烁或错位。所以 cubemap 三轴都要 `CLAMP_TO_EDGE`，避免越界采样。",
    tags: ["综合", "采样"],
  },
  {
    id: "ps-48",
    chapter: "point-shadows",
    level: 4,
    question:
      "为什么点阴影把方向光的 PCF「2D 偏一圈」改成「三维方向偏一圈」是必然的？",
    answer:
      "因为采样从 2D 坐标变成了三维方向向量。要软化边缘就得在采样向量周围取邻域——而向量是三维的，邻域自然是在 `fragToLight` 周围的一小块立方体方向集合里偏移，不再是 2D 平面上偏。",
    tags: ["PCF", "综合"],
  },
  {
    id: "ps-49",
    chapter: "point-shadows",
    level: 4,
    question:
      "点阴影里 far_plane 同时出现在第一遍和第二遍，分别起什么作用？为什么必须同值？",
    answer:
      "第一遍：把真实距离 `÷far_plane` 压进 `[0,1]` 存进 cubemap。第二遍：采样回来 `×far_plane` 还原成真实距离再比较。两处必须用同一个 far_plane，否则编码 / 解码尺度不一致、还原出的距离全错。",
    tags: ["到光源的距离", "综合"],
  },
  {
    id: "ps-50",
    chapter: "point-shadows",
    level: 4,
    question: "把整条点阴影流程讲清：从一盏屋里灯泡到四壁都有正确影子。",
    answer:
      "①第一遍：在灯泡位置放 6 个朝 +X/−X/+Y/−Y/+Z/−Z 的相机（90° 视场），各渲一张「到光源距离 ÷far_plane」的图，拼成深度立方图把灯包住。②第二遍：相机正常渲场景，每个片元算 `fragToLight = fragPos − lightPos`、用它采 cubemap 取最近距离 ×far_plane、和 `length(fragToLight)` 比 + bias 判阴影（软边用多方向 PCF）。③房间盒子 `BackSide` 才能从里面收影。这样四面墙 360° 都有正确影子。",
    tags: ["综合", "全流程"],
  },
];
