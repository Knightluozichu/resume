/** 复习题库 · 坐标系统（coordinate-systems）。Phase B 各章独立文件，避免并行写冲突。 */

import type { ReviewQuestion } from "./types";

export const coordinateSystemsQuestions: ReviewQuestion[] = [
  {
    id: "cs-1",
    chapter: "coordinate-systems",
    level: 1,
    question: "顶点从模型到屏幕要经过哪五个空间？串起它们的那条线段是什么？",
    answer:
      "五个空间：局部空间 → 世界空间 → 观察空间 → 裁剪空间 → 屏幕空间。串起它们的是 MVP：`gl_Position = projection * view * model * vec4(aPos, 1.0)`，乘的顺序从右往左——Model 把模型摆到世界、View 把世界拉到摄像机面前、Projection 把可见范围压进 NDC 立方体。",
    tags: ["MVP", "坐标空间"],
  },
  {
    id: "cs-2",
    chapter: "coordinate-systems",
    level: 1,
    question: "观察空间里，摄像机处在哪、面朝哪个轴（OpenGL 约定）？",
    answer:
      "观察空间以摄像机为原点：摄像机处在 (0,0,0)，面朝 -z 轴（OpenGL 约定），右方是 +x、上方是 +y。这个空间靠 View（LookAt）矩阵把世界整体挪动旋转得到。",
    tags: ["观察空间", "View 矩阵"],
  },
  {
    id: "cs-3",
    chapter: "coordinate-systems",
    level: 2,
    question:
      "正交投影和透视投影的核心差别是什么？为什么三维世界必须用透视才有「近大远小」？",
    answer:
      "正交投影直接把一个长方体视野映射到 NDC，远近物体大小不变，没有近大远小（常用于 2D/UI/工程制图）。透视投影把金字塔形视锥体压进 NDC 立方体，离摄像机越远被压得越小——这正是近大远小的数学来源，靠透视除法（除以 w）实现，是三维真实感的关键。",
    tags: ["正交投影", "透视投影", "视锥体"],
  },
  {
    id: "cs-4",
    chapter: "coordinate-systems",
    level: 2,
    question: "深度缓冲是干什么的？它如何决定「谁挡住谁」？",
    answer:
      "深度缓冲和颜色缓冲一样大，每个像素存着已画过的最浅深度值（最靠近摄像机）。新来的片段如果深度更大（更远）就被丢弃不画；如果更小（更近）就覆盖颜色缓冲并更新深度。这就是「后面的东西被前面的挡住」的机制。",
    tags: ["深度缓冲"],
  },
  {
    id: "cs-5",
    chapter: "coordinate-systems",
    level: 3,
    question:
      "透视投影矩阵里那个 w 分量起什么作用？投影做完后是不是就到 NDC 了？",
    answer:
      "透视投影矩阵把观察空间点的 -z（点到摄像机的距离）写进 w 分量。投影做完后还不是 NDC——要再做一次透视除法（x/y/z 都除以 w）才落到 [-1,1]³ 的 NDC。正因为 x/w、y/w，离摄像机越远除数越大、越缩越小，自动实现近大远小。",
    tags: ["透视投影", "透视除法", "NDC"],
  },
  {
    id: "cs-6",
    chapter: "coordinate-systems",
    level: 4,
    question:
      "LookAt（View）矩阵的三根正交轴 front / right / up 大致怎么算出来？它需要哪三个输入？",
    answer:
      "三个输入：摄像机位置（eye）、看向的目标点（center）、世界上方向（up）。front = normalize(center - eye)（看向哪）；right = normalize(cross(front, worldUp))（与 front、worldUp 都垂直、水平于地面）；真正的 up = cross(right, front)。三根轴互相垂直，再拼成 View 矩阵把世界拉到摄像机面前。",
    tags: ["LookAt", "View 矩阵", "叉乘"],
  },

  // ===== L1 认记 =====
  {
    id: "cs-7",
    chapter: "coordinate-systems",
    level: 1,
    question: "MVP 是哪三个矩阵的缩写？各自把顶点从哪个空间送到哪个空间？",
    answer:
      "M = Model（模型矩阵）：局部空间 → 世界空间；V = View（观察/LookAt 矩阵）：世界空间 → 观察空间；P = Projection（投影矩阵）：观察空间 → 裁剪空间。三者串成 `gl_Position = projection * view * model * vec4(aPos, 1.0)`。",
    tags: ["MVP", "三矩阵"],
  },
  {
    id: "cs-8",
    chapter: "coordinate-systems",
    level: 1,
    question: "顶点着色器里写 MVP 的标准一行是什么？",
    answer:
      "`gl_Position = projection * view * model * vec4(aPos, 1.0)`。三个矩阵作为 uniform 传入，把局部坐标 `aPos` 一路变换到裁剪空间。",
    tags: ["MVP", "顶点着色器"],
  },
  {
    id: "cs-9",
    chapter: "coordinate-systems",
    level: 1,
    question: "投影做完后顶点落在什么坐标空间？它的取值范围是多少？",
    answer:
      "落在 NDC（归一化设备坐标）——但要先经过透视除法。NDC 是一个 $[-1,1]^3$ 的立方体：$x\\in[-1,1]$、$y\\in[-1,1]$、$z\\in[-1,1]$，落在立方体外的部分被 GPU 自动裁掉。",
    tags: ["NDC", "裁剪空间"],
  },
  {
    id: "cs-10",
    chapter: "coordinate-systems",
    level: 1,
    question: "NDC 是哪几个英文单词的缩写？中文叫什么？",
    answer:
      "NDC = Normalized Device Coordinates，中文叫「归一化设备坐标」。顶点经投影矩阵和透视除法后落入 $[-1,1]^3$ 的标准立方体。",
    tags: ["NDC"],
  },
  {
    id: "cs-11",
    chapter: "coordinate-systems",
    level: 1,
    question: "构建 LookAt（View）矩阵需要哪三个输入？",
    answer:
      "三个输入：摄像机位置 $\\vec{p}$（eye）、看向的目标点 $\\vec{t}$（center）、世界的「上」方向（world up，通常 $(0,1,0)$）。",
    tags: ["LookAt", "View 矩阵"],
  },
  {
    id: "cs-12",
    chapter: "coordinate-systems",
    level: 1,
    question: "透视投影用哪个 API 构建？需要哪几个参数？",
    answer:
      "C++ 用 `glm::perspective(fov, aspect, near, far)`，TS 用 `mat4.perspective(out, fov, aspect, near, far)`。参数：fov（视角，弧度）、aspect（宽高比 = 宽/高）、near（近裁面距离）、far（远裁面距离）。",
    tags: ["透视投影", "API"],
  },
  {
    id: "cs-13",
    chapter: "coordinate-systems",
    level: 1,
    question: "开启深度测试的代码是什么？每帧要清哪些缓冲？",
    answer:
      "初始化时 `gl.enable(gl.DEPTH_TEST)`；每帧 `gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)`，颜色缓冲和深度缓冲都要清。创建 WebGL 上下文时还要 `depth: true`。",
    tags: ["深度测试", "深度缓冲"],
  },
  {
    id: "cs-14",
    chapter: "coordinate-systems",
    level: 1,
    question: "正交投影和透视投影分别适合什么场景？",
    answer:
      "正交投影远近物体一样大、没有近大远小，适合 2D 渲染、UI、工程制图。透视投影模拟人眼/相机镜头、有近大远小，适合真实感三维渲染。",
    tags: ["正交投影", "透视投影"],
  },
  {
    id: "cs-15",
    chapter: "coordinate-systems",
    level: 1,
    question: "视锥体（frustum）是什么形状？它的两个底面叫什么？",
    answer:
      "透视投影的视锥体是一个金字塔形的四棱台：靠摄像机的小平顶是近裁面（near），远处的大底是远裁面（far）。落在视锥体内的物体被渲染，之外被裁剪；fov 决定金字塔张开程度。",
    tags: ["视锥体", "near/far"],
  },
  {
    id: "cs-16",
    chapter: "coordinate-systems",
    level: 1,
    question: "透视除法具体是哪个运算？由谁来做？",
    answer:
      "把裁剪坐标的 $x, y, z$ 都除以 $w$ 分量。由 GPU 在顶点着色器之后、光栅化之前自动完成，你不需要手写。除完才真正落到 NDC。",
    tags: ["透视除法"],
  },
  {
    id: "cs-17",
    chapter: "coordinate-systems",
    level: 1,
    question: "OpenGL 约定观察空间里摄像机面朝哪个轴？这是左手还是右手坐标系？",
    answer:
      "摄像机面朝 $-z$ 轴（右方 $+x$、上方 $+y$）。OpenGL 用右手坐标系：$+x$ 向右、$+y$ 向上、$+z$ 指向屏幕外朝向观察者，所以「看向场景」就是朝 $-z$。",
    tags: ["观察空间", "右手坐标系"],
  },
  {
    id: "cs-18",
    chapter: "coordinate-systems",
    level: 1,
    question: "NDC → 屏幕像素这一步叫什么？由哪个 API 负责？",
    answer:
      "叫视口变换（viewport transform）。由 `gl.viewport` 设定的视口自动把 $[-1,1]$ 的 NDC 坐标按屏幕分辨率缩放成实际像素坐标。",
    tags: ["屏幕空间", "视口变换"],
  },
  {
    id: "cs-19",
    chapter: "coordinate-systems",
    level: 1,
    question: "局部空间的作用是什么？为什么模型师在这个空间里建模？",
    answer:
      "局部空间是每个模型自己定义的坐标系，原点通常在模型中心或脚底。模型师只关心模型自身形状、不管它最终摆在世界哪里——让「模型定义」和「摆在哪」彻底解耦，同一个文件顶点坐标永远不变。",
    tags: ["局部空间"],
  },
  {
    id: "cs-20",
    chapter: "coordinate-systems",
    level: 1,
    question: "Model 矩阵由哪些基本变换组合而成？它和变换章学的有什么关系？",
    answer:
      "Model 矩阵是缩放 + 旋转 + 平移的组合（$T\\cdot R\\cdot S$），和变换章 §4 推导的组合矩阵完全一样。它决定模型被摆在世界的什么位置、朝什么方向、多大。",
    tags: ["Model 矩阵", "世界空间"],
  },
  {
    id: "cs-21",
    chapter: "coordinate-systems",
    level: 1,
    question: "正交投影用哪个 API 构建？参数顺序是怎样的？",
    answer:
      "C++ `glm::ortho(l, r, b, t, n, f)`，TS `mat4.ortho(out, l, r, b, t, n, f)`，参数顺序完全一致：左、右、下、上、近、远，定义一个长方体视野。",
    tags: ["正交投影", "API"],
  },
  {
    id: "cs-22",
    chapter: "coordinate-systems",
    level: 1,
    question: "near 和 far 参数表示什么？取正数还是负数？",
    answer:
      "near 和 far 都是「离摄像机的距离」，取正数。near=0.1 意思是「离摄像机 0.1 个单位以内看不见」。虽然 OpenGL 看的是 $-z$ 方向，但矩阵内部会自动处理负号，参数本身写正值。",
    tags: ["near/far"],
  },

  // ===== L2 理解 =====
  {
    id: "cs-23",
    chapter: "coordinate-systems",
    level: 2,
    question: "为什么 MVP 乘的顺序是「从右往左」作用？",
    answer:
      "矩阵乘向量满足结合律：`P*(V*(M*v))`。最靠近向量 `v` 的矩阵先生效，所以 Model 先把顶点送到世界、再 View 拉到摄像机前、最后 Projection 压进 NDC。书写顺序 `P*V*M` 是从左读，但作用顺序从右往左。",
    tags: ["MVP", "乘序"],
  },
  {
    id: "cs-24",
    chapter: "coordinate-systems",
    level: 2,
    question: "透视投影矩阵把观察空间的什么量塞进了 w 分量？这有什么用？",
    answer:
      "把观察空间点的 $-z_e$（点到摄像机的垂直距离）塞进 w。这样透视除法时 $x/w$、$y/w$ 的除数就等于距离——离摄像机越远除数越大、结果越小，自动产生近大远小。靠的是投影矩阵第四行的 $-1$。",
    tags: ["透视投影", "w 分量"],
  },
  {
    id: "cs-25",
    chapter: "coordinate-systems",
    level: 2,
    question: "为什么投影做完还不是 NDC？中间缺了哪一步？",
    answer:
      "投影矩阵输出的是 4 维裁剪坐标 $(x_c, y_c, z_c, w_c)$，其中 $w_c \\neq 1$。还要做透视除法（$x/y/z$ 都除以 $w_c$）才把它压成 3 维、落进 $[-1,1]^3$ 的 NDC。正交投影下 $w_c=1$，除不除一样。",
    tags: ["透视除法", "NDC", "裁剪空间"],
  },
  {
    id: "cs-26",
    chapter: "coordinate-systems",
    level: 2,
    question: "为什么需要 NDC 这个「标准中间格式」，而不直接映射到屏幕像素？",
    answer:
      "不管屏幕是 1920×1080 还是 4K、不管摄像机看多远，GPU 都需要一套统一坐标来做裁剪和深度判断。NDC 就是这个与分辨率无关的中间格式——裁剪、深度测试都在 NDC 里做，最后一步视口变换才映射到实际像素。",
    tags: ["NDC"],
  },
  {
    id: "cs-27",
    chapter: "coordinate-systems",
    level: 2,
    question:
      "LookAt 矩阵里的 front、right、up 三根轴是按什么顺序、用什么运算算出来的？",
    answer:
      "①$\\vec{f} = \\text{normalize}(\\vec{t} - \\vec{p})$（目标减位置，得前向）；②$\\vec{r} = \\text{normalize}(\\vec{f} \\times \\text{worldUp})$（叉乘得右向）；③$\\vec{u} = \\vec{r} \\times \\vec{f}$（再叉乘得精确上向）。三轴互相垂直。",
    tags: ["LookAt", "叉乘"],
  },
  {
    id: "cs-28",
    chapter: "coordinate-systems",
    level: 2,
    question:
      "为什么算 right 轴要用 front 和「世界 up」叉乘，而不直接用世界 up 当上轴？",
    answer:
      "世界 up（如 $(0,1,0)$）一般不垂直于摄像机的 front。直接当上轴会让三轴不正交、画面歪斜。所以先用 $\\vec{f}\\times\\text{worldUp}$ 求出严格垂直的 right，再 $\\vec{r}\\times\\vec{f}$ 求出真正与 front、right 都垂直的 up。",
    tags: ["LookAt", "叉乘", "正交"],
  },
  {
    id: "cs-29",
    chapter: "coordinate-systems",
    level: 2,
    question:
      "深度缓冲里每个像素存的是什么？新片段什么时候被画、什么时候被丢？",
    answer:
      "存的是该像素上已画过的最浅深度值（最靠近摄像机）。新片段若深度更大（更远）就被丢弃不画；若更小（更近）就覆盖颜色缓冲并更新深度。这就是「前面的挡住后面的」机制。",
    tags: ["深度缓冲", "深度测试"],
  },
  {
    id: "cs-30",
    chapter: "coordinate-systems",
    level: 2,
    question: "为什么 z-fighting（两个面来回闪）发生在远处而不是近处？",
    answer:
      "透视除法后 NDC 的 z 与 $1/z_e$ 成正比、是非线性的：离 near 近的点 z 精度极高，离 far 近的点精度极低。远处大量不同深度被挤进很窄的 z 值区间，两个紧贴的面深度几乎相同、判不清谁前谁后，就来回闪。",
    tags: ["z 精度", "z-fighting", "深度缓冲"],
  },
  {
    id: "cs-31",
    chapter: "coordinate-systems",
    level: 2,
    question: "把 near 平面设得太小（如 0.0001）为什么反而坏事？",
    answer:
      "z 缓冲精度非线性、总量有限。near 设太小会把绝大部分精度「蛋糕」分给紧贴摄像机的超近处，远处几乎没有精度可用，于是远处物体深度判断不清、出现 z-fighting。修法是把 near 设得尽可能大（如 0.1 甚至 1.0）。",
    tags: ["near/far", "z 精度", "z-fighting"],
  },
  {
    id: "cs-32",
    chapter: "coordinate-systems",
    level: 2,
    question: "正交投影矩阵和透视投影矩阵在结构上的核心差别是什么？",
    answer:
      "正交矩阵第四行是 $(0,0,0,1)$，输出的 $w$ 恒为 1，不做透视除法、远近一样大。透视矩阵第四行是 $(0,0,-1,0)$，把 $-z_e$ 塞进 $w$，透视除法时 $x/w$、$y/w$ 随距离缩小，产生近大远小。",
    tags: ["正交投影", "透视投影", "w 分量"],
  },
  {
    id: "cs-33",
    chapter: "coordinate-systems",
    level: 2,
    question:
      "为什么把模型摆在世界里要靠矩阵，而不是直接改模型文件的顶点坐标？",
    answer:
      "改顶点文件意味着每换一个位置/朝向/大小就要重新导出模型，无法复用。用 Model 矩阵把同一份局部坐标变换到世界，模型只需定义一次，后面靠矩阵随便摆、还能同一模型摆多份。",
    tags: ["局部空间", "Model 矩阵", "世界空间"],
  },
  {
    id: "cs-34",
    chapter: "coordinate-systems",
    level: 2,
    question: "View 矩阵本质上对世界做了什么操作，才让摄像机变成原点？",
    answer:
      "把整个世界做「平移 + 旋转」：先平移让摄像机位置坐进原点，再旋转让摄像机的右/上/前三轴对齐世界坐标轴。摄像机本身不动，是世界被反向挪到摄像机眼前，所以观察空间是「从摄像机眼里看」。",
    tags: ["View 矩阵", "观察空间"],
  },
  {
    id: "cs-35",
    chapter: "coordinate-systems",
    level: 2,
    question:
      "GLM 写 `glm::radians(45.0f)`，gl-matrix 怎么写等价的 fov？为什么要转？",
    answer:
      "gl-matrix 直接写 `45 * Math.PI / 180`。因为透视投影 API 的 fov 参数单位是弧度，不是角度。GLM 提供 `glm::radians` 帮你转，gl-matrix 没有就得手动乘 $\\pi/180$。",
    tags: ["API", "透视投影", "fov"],
  },
  {
    id: "cs-36",
    chapter: "coordinate-systems",
    level: 2,
    question:
      "正交投影矩阵对角线上为什么是 $\\frac{2}{r-l}$ 之类的值，最后一列又是什么？",
    answer:
      "对角线放缩放倍数：把长方体的宽 $(r-l)$、高 $(t-b)$、深 $(f-n)$ 各缩成 2（即 $[-1,1]$ 的长度），所以是 $\\frac{2}{r-l}$ 等。最后一列放平移量（如 $-\\frac{r+l}{r-l}$），把长方体中心挪到原点。",
    tags: ["正交投影", "投影矩阵"],
  },
  {
    id: "cs-37",
    chapter: "coordinate-systems",
    level: 2,
    question: "为什么说透视投影的「近大远小」是除法、不是矩阵乘法本身产生的？",
    answer:
      "矩阵乘法只是把 $-z_e$ 填进 $w$，此时还没有缩小效果。真正的近大远小发生在之后的透视除法：$x/w$、$y/w$ 里远处除以更大的 $w(=-z_e)$，结果才变小。乘法负责「准备」，除法负责「实现」。",
    tags: ["透视投影", "透视除法"],
  },
  {
    id: "cs-38",
    chapter: "coordinate-systems",
    level: 2,
    question: "为什么裁剪发生在裁剪空间（除以 w 之前），而不是等到 NDC？",
    answer:
      "在齐次裁剪坐标里判断 $-w \\le x,y,z \\le w$ 即可裁剪，避免对 $w \\le 0$（在摄像机后面）的点做除法导致符号翻转、坐标错乱。所以 GPU 先在裁剪空间裁剪，再对存活的顶点做透视除法落到 NDC。",
    tags: ["裁剪空间", "透视除法", "NDC"],
  },

  // ===== L3 应用 =====
  {
    id: "cs-39",
    chapter: "coordinate-systems",
    level: 3,
    question:
      "摄像机在 $(0,0,3)$、看向原点、world up $(0,1,0)$。手算 front、right、up 三根轴。",
    answer:
      "$\\vec{f} = \\text{normalize}((0,0,0)-(0,0,3)) = (0,0,-1)$；$\\vec{r} = \\text{normalize}(\\vec{f}\\times\\text{up}) = \\text{normalize}((0,0,-1)\\times(0,1,0)) = (1,0,0)$；$\\vec{u} = \\vec{r}\\times\\vec{f} = (1,0,0)\\times(0,0,-1) = (0,1,0)$。",
    tags: ["LookAt", "叉乘", "手算"],
  },
  {
    id: "cs-40",
    chapter: "coordinate-systems",
    level: 3,
    question:
      "接上题（摄像机在 $(0,0,3)$ 面朝 $-z$、三轴正好对齐世界轴），写出完整 4×4 View 矩阵。",
    answer:
      "三轴对齐世界轴，只剩沿 z 平移。$-\\vec{r}\\cdot\\vec{p}=0$、$-\\vec{u}\\cdot\\vec{p}=0$、$\\vec{f}\\cdot\\vec{p}=-3$，第三行取 $-\\vec{f}$ 得 $(0,0,1)$、平移项 $-3$：$V$ 的第四列是 $(0,0,-3,1)$，左上 3×3 为单位阵。效果是世界沿 z 平移 $-3$，摄像机坐进原点。",
    tags: ["LookAt", "View 矩阵", "手算"],
  },
  {
    id: "cs-41",
    chapter: "coordinate-systems",
    level: 3,
    question:
      "一个点观察坐标是 $(2, 1, -4)$，透视矩阵填 $w_c = -z_e$。透视除法后它的 x、y 的分母是多少？比它远一倍的点（$z_e=-8$）呢？",
    answer:
      "$w_c = -z_e = 4$，所以 $x_{ndc}=x_c/4$、$y_{ndc}=y_c/4$，分母是 4。远一倍的点 $w_c=8$、分母是 8——同样的横向偏移被除以更大的数、投影后更靠近画面中心，这就是近大远小。",
    tags: ["透视除法", "w 分量", "手算"],
  },
  {
    id: "cs-42",
    chapter: "coordinate-systems",
    level: 3,
    question:
      "NDC 坐标 $(0.3, -0.2)$，屏幕 1920×1080。视口变换后落在哪个像素？",
    answer:
      "$x$：$(0.3+1)/2 \\times 1920 = 0.65 \\times 1920 = 1248$；$y$：$(-0.2+1)/2 \\times 1080 = 0.4 \\times 1080 = 432$（若 y 朝下则 $648$）。把 $[-1,1]$ 线性映射到「0 到宽」「0 到高」即可。",
    tags: ["NDC", "视口变换", "手算"],
  },
  {
    id: "cs-43",
    chapter: "coordinate-systems",
    level: 3,
    question:
      "物体摆在世界 z=-3（离摄像机 3 单位）。把正交投影 near 从 0.1 改成 5，它会怎样？为什么？",
    answer:
      "物体消失。near=5 意味着只渲染离摄像机 5 单位以外的东西，z=-3 的物体落在近裁面「里面」、不在 $[n,f]=[5,\\dots]$ 范围内，被裁掉。修法是让 near 小于物体距离，或把物体挪远。",
    tags: ["near/far", "正交投影", "应用"],
  },
  {
    id: "cs-44",
    chapter: "coordinate-systems",
    level: 3,
    question:
      "渲染出来「后面的物体盖在前面」，半透明物遮挡也乱。最可能漏了哪一步？怎么改？",
    answer:
      "漏了开深度测试——GPU 默认不比较深度，谁后画谁盖在上面。修法：`gl.enable(gl.DEPTH_TEST)`，每帧 `gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)`，上下文创建时 `depth: true`。",
    tags: ["深度测试", "深度缓冲", "排错"],
  },
  {
    id: "cs-45",
    chapter: "coordinate-systems",
    level: 3,
    question:
      "把透视投影的 fov 从 45° 调到 120°，画面里物体会变多还是变少、变大还是变小？",
    answer:
      "fov 越大、视锥体张开越宽，能装进画框的东西越多（视野更广），但每个物体被压进同样的 NDC 立方体后显得更小、还会有广角畸变。120° 时物体变多变小，像鱼眼镜头。",
    tags: ["fov", "视锥体", "透视投影"],
  },
  {
    id: "cs-46",
    chapter: "coordinate-systems",
    level: 3,
    question:
      "用了透视投影，画面却和正交一样、所有物体一样大没有近大远小。排查哪几处？",
    answer:
      "①投影矩阵可能在上传前被覆盖成单位阵；②`perspective` 的 fov 没转弧度、或 aspect 写错（应为宽/高）；③`glUniformMatrix4fv` 的转置参数应为 `false`。逐项核对透视矩阵确实被正确构建并传入。",
    tags: ["透视投影", "排错", "API"],
  },
  {
    id: "cs-47",
    chapter: "coordinate-systems",
    level: 3,
    question:
      "窗口从 800×600 拉成 1600×600，没改投影矩阵，画面里的圆被拉成椭圆。原因和修法？",
    answer:
      "透视/正交矩阵里的 aspect（宽/高）还停留在旧值，与新窗口比例不符，x 方向被错误缩放。修法：在窗口尺寸变化（resize）回调里用新的 `width/height` 重新构建投影矩阵并上传。",
    tags: ["aspect", "透视投影", "排错"],
  },
  {
    id: "cs-48",
    chapter: "coordinate-systems",
    level: 3,
    question:
      "正交投影下要让屏幕上左右对称、上下对称且不变形，$l,r,b,t$ 该怎么取？",
    answer:
      "取 $l=-r$、$b=-t$（左右对称、上下对称）。为不变形，让 $r/t$ 等于宽高比 aspect，比如 $r=\\text{aspect}$、$t=1$（或 $l,r=\\pm\\text{aspect}$、$b,t=\\pm 1$）。此时对角线退化为 $1/r$ 和 $1/t$。",
    tags: ["正交投影", "aspect", "应用"],
  },
  {
    id: "cs-49",
    chapter: "coordinate-systems",
    level: 3,
    question:
      "Stepper 里一个耳尖局部坐标 $(0.5, 2.0, 0)$，Model 把模型平移到 $(5,0,-10)$ 并缩到 0.8 倍。耳尖世界坐标约是多少（先缩放后平移）？",
    answer:
      "先缩放 0.8：$(0.4, 1.6, 0)$；再平移 $(5,0,-10)$：$(5.4, 1.6, -10.0)$。注意 Model 组合是 $T\\cdot R\\cdot S$，顶点先被 $S$ 缩放、最后 $T$ 平移，所以结果是缩放后的偏移加上平移量。",
    tags: ["Model 矩阵", "世界空间", "手算"],
  },
  {
    id: "cs-50",
    chapter: "coordinate-systems",
    level: 3,
    question:
      "要做一个 2D 的血条 UI 贴在屏幕上、不随距离缩放，该用哪种投影？为什么不用透视？",
    answer:
      "用正交投影。UI 元素需要「在哪就显多大」、不能近大远小，正交保证远近一样大。透视会让 UI 随深度缩放、位置漂移，不适合贴屏的 HUD/血条/菜单。",
    tags: ["正交投影", "应用"],
  },
  {
    id: "cs-51",
    chapter: "coordinate-systems",
    level: 3,
    question:
      "近裁面 near=1、远裁面 far=100。在 z-fighting 上，把物体集中在 z=-2~-5 和集中在 z=-90~-95，哪种更容易闪？",
    answer:
      "z=-90~-95 更容易闪。透视 z 精度非线性、靠近 near 处精度高、靠近 far 处精度极低。远处那段落在 z 精度最稀疏的区间，相邻深度几乎无法区分，更易 z-fighting。",
    tags: ["z 精度", "z-fighting", "应用"],
  },
  {
    id: "cs-52",
    chapter: "coordinate-systems",
    level: 3,
    question:
      "同一只猫要在场景里出现 3 次、位置朝向各不同。怎么用 MVP 高效实现？哪个矩阵变、哪些不变？",
    answer:
      "局部顶点数据复用同一份，只换 Model 矩阵——每次画前传不同的 model（不同平移/旋转/缩放），View 和 Projection 三次都不变（同一摄像机、同一投影）。这正是局部空间解耦的价值。",
    tags: ["Model 矩阵", "MVP", "应用"],
  },
  {
    id: "cs-53",
    chapter: "coordinate-systems",
    level: 3,
    question:
      "摄像机在 $(0,0,3)$ 看向原点。要让它绕物体「向右平移看」改成站在 $(3,0,3)$ 仍看原点，需要重算哪个矩阵？front 轴还指向 $-z$ 吗？",
    answer:
      "重算 View（LookAt）矩阵。新 front = $\\text{normalize}((0,0,0)-(3,0,3)) = \\text{normalize}((-3,0,-3))$，不再是纯 $-z$ 而是斜向 $(-\\frac{1}{\\sqrt2},0,-\\frac{1}{\\sqrt2})$。Model 和 Projection 不变。",
    tags: ["LookAt", "View 矩阵", "应用"],
  },
  {
    id: "cs-54",
    chapter: "coordinate-systems",
    level: 3,
    question:
      "调试时想验证「透视除法前 w 等于 $-z_e$」。给观察坐标 $(1, 0, -10, 1)$，乘透视矩阵后 $w_c$ 应是多少？",
    answer:
      "$w_c = -z_e = -(-10) = 10$。透视矩阵第四行是 $(0,0,-1,0)$，$w_c = -1\\times z_e = -(-10) = 10$。所以透视除法分母为 10，正是该点到摄像机的距离。",
    tags: ["透视投影", "w 分量", "手算"],
  },
  {
    id: "cs-55",
    chapter: "coordinate-systems",
    level: 3,
    question:
      "顶点全部被画到了屏幕外或角落里，怀疑 MVP。怎样快速定位是乘序写反？",
    answer:
      "把着色器里乘序临时改回标准 `projection * view * model * vec4(aPos,1.0)`，若物体回到正中即确认之前写成了 `model * view * projection`。也可只用 `model`（无 V/P）看物体是否在世界原点附近，逐个矩阵排除。",
    tags: ["MVP", "乘序", "排错"],
  },
  {
    id: "cs-56",
    chapter: "coordinate-systems",
    level: 3,
    question:
      "正交投影 $l=-2,r=2$。一个世界（=观察，无相机变换）x 坐标为 1 的点，正交投影到 NDC 的 x 是多少？",
    answer:
      "对称情形对角线为 $\\frac{2}{r-l}=\\frac{2}{4}=0.5$，平移项 $-\\frac{r+l}{r-l}=0$。$x_{ndc}=0.5\\times 1 + 0 = 0.5$。即 x=2 映射到 NDC 边界 1、x=1 映射到 0.5，线性无缩放畸变。",
    tags: ["正交投影", "NDC", "手算"],
  },

  // ===== L4 综合·陷阱 =====
  {
    id: "cs-57",
    chapter: "coordinate-systems",
    level: 4,
    question: "有人说「正交投影也要做透视除法、除以 w」。对吗？为什么？",
    answer:
      "技术上 GPU 对所有顶点都执行除以 $w$ 这一步，但正交矩阵第四行是 $(0,0,0,1)$，输出 $w_c$ 恒为 1，除以 1 不改变任何坐标。所以正交「实质上」没有透视效果——说它「做了除法但没影响」更准确，近大远小完全来自透视矩阵把 $-z_e$ 写进 $w$。",
    tags: ["透视除法", "正交投影", "陷阱"],
  },
  {
    id: "cs-58",
    chapter: "coordinate-systems",
    level: 4,
    question:
      "有人把 MVP 写成 `model * view * projection` 还坚称「反正都是相乘、顺序无所谓」。哪里错？",
    answer:
      "矩阵乘法不满足交换律，$PVM \\neq MVP$。乘向量从右往左作用，必须 `projection * view * model * v`：让 Model 最先作用（局部→世界），P 最后（→裁剪）。写反会把投影当成最先施加在局部坐标上，物体跑飞或消失。",
    tags: ["MVP", "乘序", "陷阱"],
  },
  {
    id: "cs-59",
    chapter: "coordinate-systems",
    level: 4,
    question:
      "「z-fighting 是因为深度缓冲位数不够，换 32 位就彻底解决」——这个说法的盲点是什么？",
    answer:
      "位数增多有帮助但治标不治本。根因是透视 z 与 $1/z_e$ 成正比、精度非线性，远处精度本就被极度压缩。更有效的是把 near 设大、far 设小、物体别堆在远处；要看极远还得用对数深度或分段渲染。单纯加位数仍会在足够远处闪。",
    tags: ["z-fighting", "z 精度", "陷阱"],
  },
  {
    id: "cs-60",
    chapter: "coordinate-systems",
    level: 4,
    question:
      "摄像机原地不动，只把世界里所有物体反向平移。和移动摄像机相比，画面有区别吗？这揭示了 View 矩阵的什么本质？",
    answer:
      "没有区别——画面完全相同。这正是 View 矩阵的本质：摄像机其实不能「动」，所谓移动摄像机就是把整个世界做反向的平移和旋转，让摄像机始终坐在原点面朝 $-z$。观察空间是相对的。",
    tags: ["View 矩阵", "观察空间", "综合"],
  },
  {
    id: "cs-61",
    chapter: "coordinate-systems",
    level: 4,
    question:
      "LookAt 里如果 front 恰好和 world up 平行（摄像机直直朝上/下看），会出什么问题？为什么？",
    answer:
      "$\\vec{f}\\times\\text{worldUp}$ 退化为零向量（平行向量叉乘为 0），right 轴算不出来、归一化时除零，矩阵崩坏（万向锁式问题）。所以正俯视/仰视的相机需要换一个不平行的 up 参考，或用四元数等方式规避。",
    tags: ["LookAt", "叉乘", "陷阱"],
  },
  {
    id: "cs-62",
    chapter: "coordinate-systems",
    level: 4,
    question:
      "一个点观察坐标 $z_e = 0.5$（在摄像机后面，OpenGL 中应为负才可见）。直接做透视除法会发生什么诡异现象？",
    answer:
      "$w_c = -z_e = -0.5 < 0$。除以负 $w$ 会让 $x/w$、$y/w$ 符号翻转，点被「翻」到画面另一侧、深度也错乱。这正是为什么裁剪要在除以 w 之前的裁剪空间做：先把 $w \\le 0$ 的点裁掉，避免对摄像机后方的点做除法。",
    tags: ["透视除法", "裁剪空间", "陷阱"],
  },
  {
    id: "cs-63",
    chapter: "coordinate-systems",
    level: 4,
    question:
      "把 fov 调到接近 0°（极长焦），透视投影会越来越像哪种投影？从矩阵角度解释。",
    answer:
      "越来越像正交投影。fov→0 时 $\\tan(\\theta/2)\\to 0$，x/y 缩放系数 $\\frac{1}{\\tan(\\theta/2)}$ 趋于无穷大，相当于只截取视锥体极窄的一小段、近大远小的差异被极度拉平——望远镜里远近物体几乎一样大，逼近正交的「平行投影」。",
    tags: ["fov", "透视投影", "正交投影", "综合"],
  },
  {
    id: "cs-64",
    chapter: "coordinate-systems",
    level: 4,
    question:
      "为什么透视投影必须用 4×4 矩阵 + 齐次坐标，而不能用 3×3 矩阵搞定？",
    answer:
      "近大远小需要「除以深度」这种非线性操作，3×3 线性矩阵做不到除法。齐次坐标把除法外包给透视除法：4×4 矩阵先把 $-z_e$ 塞进第 4 个分量 $w$，再统一除以 $w$。平移同理也需要齐次的第 4 维。所以透视和平移都依赖 4 维齐次坐标。",
    tags: ["透视投影", "齐次坐标", "综合"],
  },
  {
    id: "cs-65",
    chapter: "coordinate-systems",
    level: 4,
    question:
      "深度测试默认通过条件是「更近才画」。如果把深度函数设成「更远才画」，对一个不透明实心球会看到什么？",
    answer:
      "会看到球的背面而非正面——因为每个像素保留的是最远的片段。正常 `LESS`（更近覆盖）显示朝向摄像机的表面；改成 `GREATER` 后远处的背面片段反而胜出，呈现「看穿到背面」的内翻效果。说明深度比较方向直接决定遮挡关系。",
    tags: ["深度测试", "深度缓冲", "综合"],
  },
  {
    id: "cs-66",
    chapter: "coordinate-systems",
    level: 4,
    question:
      "「Projection 矩阵把 3D 压成 2D，所以 NDC 是二维的」——错在哪？z 留着干什么？",
    answer:
      "NDC 是三维 $[-1,1]^3$，z 没被丢。投影没有压成 2D，只是把视锥体装进立方体。NDC 的 z 被保留下来送进深度缓冲做深度测试——没有它就无法判断遮挡。真正变 2D 是更晚的光栅化/视口阶段，但深度始终伴随。",
    tags: ["NDC", "深度缓冲", "陷阱"],
  },
  {
    id: "cs-67",
    chapter: "coordinate-systems",
    level: 4,
    question:
      "Model 矩阵组合常写成 $T\\cdot R\\cdot S$。若误写成 $S\\cdot R\\cdot T$，一个被平移到远处又缩放 0.5 的物体会出什么乱子？",
    answer:
      "$T\\cdot R\\cdot S$ 是「先缩放再旋转最后平移」（对顶点从右往左作用），物体在原地缩放后被搬走，行为符合直觉。写成 $S\\cdot R\\cdot T$ 则先平移再缩放，缩放会同时缩小那段平移位移，物体被拉向原点、位置全错。顺序错 = 位置与大小耦合出错。",
    tags: ["Model 矩阵", "乘序", "陷阱"],
  },
  {
    id: "cs-68",
    chapter: "coordinate-systems",
    level: 4,
    question:
      "综合：说清一个顶点从局部空间到屏幕像素，依次经过哪些矩阵/操作，每步坐标维度和范围怎么变。",
    answer:
      "局部 $(x,y,z,1)$ →×Model→ 世界 →×View→ 观察 →×Projection→ 裁剪 $(x_c,y_c,z_c,w_c)$（4 维，$w_c=-z_e$）→透视除法→ NDC $[-1,1]^3$（除以 $w$，3 维）→视口变换→ 屏幕像素（按分辨率缩放，含深度送深度缓冲）。三次乘矩阵 + 一次除法 + 一次缩放。",
    tags: ["MVP", "坐标空间", "综合"],
  },
  {
    id: "cs-69",
    chapter: "coordinate-systems",
    level: 4,
    question:
      "正交投影矩阵 z 项写成 $-\\frac{2}{f-n}$ 带负号、透视也带一堆负号。这些负号统一在补偿什么？",
    answer:
      "补偿 OpenGL 右手观察空间「看向 $-z$」与左手 NDC「深度 $+z$ 朝里」的方向不一致。观察空间里近处 $z_e$ 代数值大（更接近 0）、远处更负，而 NDC 要求近处 z 小、远处 z 大，所以矩阵用负号翻转 z 轴方向，让深度装盒正确、near/far 不会前后颠倒。",
    tags: ["正交投影", "透视投影", "右手坐标系", "综合"],
  },
  {
    id: "cs-70",
    chapter: "coordinate-systems",
    level: 4,
    question:
      "两个完全重合的共面三角形（如贴花叠在墙面上），即使深度位数很高也常闪。这属于 z-fighting 吗？根因和常用修法？",
    answer:
      "属于 z-fighting——两面深度数值几乎完全相同、精度无法区分谁前谁后。根因是它们本就共面。修法不是加精度，而是用 polygon offset（深度偏移）把贴花往摄像机方向轻推一点，或干脆在渲染顺序/模板缓冲上区分，让二者不再争同一深度。",
    tags: ["z-fighting", "深度缓冲", "陷阱"],
  },
  {
    id: "cs-71",
    chapter: "coordinate-systems",
    level: 4,
    question: "把 View 矩阵设成单位阵会怎样？这等价于摄像机处在哪、看向哪？",
    answer:
      "等价于摄像机站在世界原点 $(0,0,0)$、面朝 $-z$、上方 $+y$、无旋转——观察空间和世界空间重合。此时只有摆在 $-z$ 方向且在 near/far 之间的物体才看得见；摆在 $+z$（摄像机背后）的物体看不到。",
    tags: ["View 矩阵", "观察空间", "综合"],
  },
  {
    id: "cs-72",
    chapter: "coordinate-systems",
    level: 4,
    question:
      "为什么透视投影里 z 的精度分布是「近密远疏」，而正交投影里 z 精度是均匀的？从两者矩阵差异说。",
    answer:
      "正交矩阵 $z_{ndc}$ 是 $z_e$ 的线性函数（无除法），精度均匀。透视下 $z_{ndc} = \\frac{f+n}{f-n} + \\frac{2fn}{(f-n)z_e}$ 含 $1/z_e$ 项，是非线性的——$z_e$ 在近处微小变化引起 $z_{ndc}$ 大变（精度高），远处变化被 $1/z_e$ 压扁（精度低）。除以 w 是非线性的来源。",
    tags: ["z 精度", "透视投影", "正交投影", "综合"],
  },
  {
    id: "cs-73",
    chapter: "coordinate-systems",
    level: 4,
    question:
      "`glUniformMatrix4fv` 的转置参数本应填 `false`，若误填 `true` 且其他都对，画面会怎样？为什么和乘序有关联但不同？",
    answer:
      "转置参数 `true` 会让 GPU 把上传的矩阵转置后使用，相当于每个矩阵都变成它的转置，整套 MVP 全乱、物体扭曲或消失。它和乘序错都会让物体跑飞，但根因不同：乘序错是矩阵组合顺序错，转置错是单个矩阵的行列被交换（列主序 ↔ 行主序混淆）。",
    tags: ["API", "MVP", "陷阱"],
  },
  {
    id: "cs-74",
    chapter: "coordinate-systems",
    level: 4,
    question:
      "综合判断：透视投影下，离摄像机 1 米和 100 米处各放一根同样长的标尺，投影到屏幕上长度比大约是多少？说明依据。",
    answer:
      "约 100:1。屏幕投影尺寸与「1/距离」成正比（透视除法除以 $w=-z_e$，即点到摄像机的距离），所以 1 米处的标尺约是 100 米处的 100 倍长。这就是近大远小的定量形式：表观大小反比于深度。",
    tags: ["透视投影", "透视除法", "近大远小", "综合"],
  },
];
