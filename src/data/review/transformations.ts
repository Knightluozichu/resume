/** 复习题库 · 变换（transformations）。Phase B 各章独立文件，避免并行写冲突。 */

import type { ReviewQuestion } from "./types";

export const transformationsQuestions: ReviewQuestion[] = [
  {
    id: "tr-1",
    chapter: "transformations",
    level: 1,
    question: "缩放矩阵长什么样？平移矩阵的平移量住在矩阵的哪里？",
    answer:
      "缩放矩阵把各轴缩放倍数 Sx、Sy、Sz 放在对角线上、其余为 0。平移矩阵左上 3×3 是单位阵，平移量 Tx、Ty、Tz 住在 4×4 矩阵的最后一列，右下角为 1。",
    tags: ["缩放矩阵", "平移矩阵"],
  },
  {
    id: "tr-2",
    chapter: "transformations",
    level: 2,
    question: "齐次坐标里的 w 分量是干嘛的？为什么平移非要把点写成四维不可？",
    answer:
      "把三维点补成四维 (x, y, z, w) 就是齐次坐标，点取 w=1。平移是「每个分量加上一个常量」，2×2/3×3 纯线性矩阵做不到「凭空加一个数」；补上 w=1 后，平移量住在 4×4 矩阵最后一列，乘点时被「乘 1 加进来」，平移才生效。方向向量取 w=0，平移对它无效。",
    tags: ["齐次坐标", "平移矩阵"],
  },
  {
    id: "tr-3",
    chapter: "transformations",
    level: 2,
    question:
      "先平移再缩放、和先缩放再平移，结果一样吗？为什么矩阵相乘的顺序不能随便换？",
    answer:
      "不一样。矩阵乘法不满足交换律（A·B 通常不等于 B·A）。常用安全顺序是 T·R·S（先缩放、再旋转、最后平移），作用时从右往左、最靠近向量的先生效。若先平移再缩放，连平移走的那段距离也会被缩放放大，物体就飞到离谱的地方。",
    tags: ["矩阵乘法", "组合矩阵", "顺序"],
  },
  {
    id: "tr-4",
    chapter: "transformations",
    level: 3,
    question:
      "二维向量 v=(2,1) 经缩放矩阵 [[1.5,0],[0,1.5]] 作用后落在哪？手算。",
    answer:
      "按 [[a,b],[c,d]]·[x,y] = [ax+by, cx+dy] 代入：x' = 1.5·2 + 0·1 = 3，y' = 0·2 + 1.5·1 = 1.5。结果是 (3, 1.5)——每个分量各放大 1.5 倍，方向不变。",
    tags: ["缩放矩阵", "手算"],
  },
  {
    id: "tr-5",
    chapter: "transformations",
    level: 3,
    question:
      "二维向量 v=(2,1) 经绕原点旋转 90° 的矩阵 [[0,-1],[1,0]] 作用后落在哪？它在几何上转到了哪？",
    answer:
      "代入：x' = 0·2 + (-1)·1 = -1，y' = 1·2 + 0·1 = 2，结果 (-1, 2)。原来朝右偏上的箭头被逆时针转 90° 到朝上偏左。（验证：该矩阵就是绕 z 轴旋转 Rz 取 θ=90°，cos90°=0、sin90°=1。）",
    tags: ["旋转矩阵", "手算"],
  },
  {
    id: "tr-6",
    chapter: "transformations",
    level: 4,
    question:
      "在着色器里应用变换的核心一句是什么？上传矩阵时 `uniformMatrix4fv` 的转置参数填什么、角度用什么单位？",
    answer:
      "核心一句：`gl_Position = transform * vec4(aPos, 1.0)`——补出的 1.0 就是齐次坐标 w=1，让平移生效。上传时转置参数填 `false`（GL_FALSE），因为 GLM/gl-matrix 内部都是列主序、和 GLSL 约定一致，无需转置。角度一律用弧度（如 `Math.PI/4`），不要直接传 45。",
    tags: ["列主序", "uniformMatrix4fv", "组合矩阵"],
  },

  // ── L1 认记 ──────────────────────────────────────────────
  {
    id: "tr-7",
    chapter: "transformations",
    level: 1,
    question: "图形学里的「向量」是什么？二维、三维各写成几个数？",
    answer:
      "向量是一截既有长度又有方向的量，写成一组数：二维 $(x, y)$、三维 $(x, y, z)$。画出来就是一截从原点指向那个坐标的箭头，可用来表示位置、朝向、颜色、速度等。",
    tags: ["向量"],
  },
  {
    id: "tr-8",
    chapter: "transformations",
    level: 1,
    question: "什么是单位向量？怎么把一个向量变成单位向量？",
    answer:
      "单位向量是长度恰好为 1 的向量，只表示方向、不含大小。把任意非零向量除以它自己的长度（归一化 normalize）就得到单位向量，常用来表示朝向、法线、光线方向。",
    tags: ["单位向量"],
  },
  {
    id: "tr-9",
    chapter: "transformations",
    level: 1,
    question: "点乘的结果是什么类型？叉乘的结果又是什么类型？",
    answer:
      "点乘（dot）结果是一个数（标量），跟两向量的夹角有关。叉乘（cross）结果是一个新向量，方向同时垂直于两个输入向量，且只在三维有定义。",
    tags: ["点乘", "叉乘"],
  },
  {
    id: "tr-10",
    chapter: "transformations",
    level: 1,
    question: "什么是矩阵？在图形里一个矩阵代表什么？",
    answer:
      "矩阵是一个按行和列排好的数字方阵（如 2×2、3×3、4×4）。在图形里，一个矩阵代表对整个坐标空间的一次变换（缩放 / 旋转 / 平移）；用它去乘一个向量，就把那个向量掰到新位置。",
    tags: ["矩阵"],
  },
  {
    id: "tr-11",
    chapter: "transformations",
    level: 1,
    question: "单位矩阵长什么样？任何向量乘以它会怎样？",
    answer:
      "单位矩阵对角线全是 1、其余全是 0，二维是 $\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$。任何向量乘以它都原样不变，相当于「什么都不掰」，是矩阵世界的「1」，常作为搭建组合变换的起点。",
    tags: ["单位矩阵"],
  },
  {
    id: "tr-12",
    chapter: "transformations",
    level: 1,
    question: "本站和 GLSL 采用哪种矩阵存储约定？向量写在矩阵哪一边？",
    answer:
      "采用列主序（一列一列存进内存：先第 1 列、再第 2 列……），与之相对的是行主序。用它乘向量时，把向量当成竖着的一列写在矩阵右边（右乘列向量）。",
    tags: ["列主序"],
  },
  {
    id: "tr-13",
    chapter: "transformations",
    level: 1,
    question: "「掰」空间主要有哪三种基本变换？",
    answer:
      "三种：缩放（沿各轴拉伸或压扁）、平移（把空间整体挪一段、形状不变）、旋转（绕某个轴转一个角度）。组合多个变换常用顺序是先缩放、再旋转、最后平移。",
    tags: ["缩放矩阵", "平移矩阵", "旋转矩阵"],
  },
  {
    id: "tr-14",
    chapter: "transformations",
    level: 1,
    question: "矩阵乘法满足交换律吗？",
    answer:
      "不满足。矩阵乘法不遵守交换律——$A \\cdot B$ 通常不等于 $B \\cdot A$，所以相乘的顺序很重要，组合变换时顺序一换结果就变。",
    tags: ["矩阵乘法"],
  },
  {
    id: "tr-15",
    chapter: "transformations",
    level: 1,
    question: "组合变换常用的安全顺序是什么？写成右乘列向量的式子。",
    answer:
      "常用安全顺序是先缩放、再旋转、最后平移，写成 $\\vec{v}_{new} = T \\cdot R \\cdot S \\cdot \\vec{v}$。其中 $S$ 缩放、$R$ 旋转、$T$ 平移。",
    tags: ["组合矩阵", "顺序"],
  },
  {
    id: "tr-16",
    chapter: "transformations",
    level: 1,
    question: "什么是齐次坐标？点和方向向量的 w 分量分别取多少？",
    answer:
      "齐次坐标是给三维点补上第四个分量凑成四维 $(x, y, z, w)$ 的写法。点取 $w = 1$（能被平移），方向向量取 $w = 0$（平移对它无效）。正是这个 $w$ 让平移能写进 4×4 矩阵。",
    tags: ["齐次坐标"],
  },
  {
    id: "tr-17",
    chapter: "transformations",
    level: 1,
    question: "着色器里应用变换的核心一句代码是什么？",
    answer:
      "顶点着色器里写 `gl_Position = transform * vec4(aPos, 1.0)`：把顶点补成齐次坐标（那个 1.0 就是 $w = 1$），左乘组合矩阵 `transform`，就把每个顶点掰到新位置。",
    tags: ["GLSL", "组合矩阵"],
  },
  {
    id: "tr-18",
    chapter: "transformations",
    level: 1,
    question: "向量取负在几何上意味着什么？",
    answer:
      "对一个向量取负（每个分量乘 $-1$）会把它的方向逆转——箭头长度不变，但指向相反的方向。",
    tags: ["向量"],
  },
  {
    id: "tr-19",
    chapter: "transformations",
    level: 1,
    question: "用 GLM 构建变换时，三个核心函数分别叫什么？角度用什么单位？",
    answer:
      "三个函数是 `glm::translate`（平移）、`glm::rotate`（旋转）、`glm::scale`（缩放）。旋转角度要用弧度，常借 `glm::radians(45.0f)` 把角度换算成弧度。",
    tags: ["GLM", "弧度"],
  },
  {
    id: "tr-20",
    chapter: "transformations",
    level: 1,
    question:
      "GLM 0.9.9 起，`glm::mat4 m;` 默认初始化成什么？要得到单位矩阵该怎么写？",
    answer:
      "GLM 0.9.9 起默认初始化成零矩阵（全是 0），而非单位矩阵。要得到单位矩阵必须显式写 `glm::mat4(1.0f)`，让对角线为 1，作为组合变换的起点。",
    tags: ["GLM", "单位矩阵"],
  },
  {
    id: "tr-21",
    chapter: "transformations",
    level: 1,
    question: "缩放倍数取大于 1、0 到 1 之间、负数，分别会让物体怎样？",
    answer:
      "倍数大于 1 把物体沿该轴放大；0 到 1 之间缩小；负数会沿该轴翻转（镜像翻面）。倍数取 0 则会把那个维度压扁。",
    tags: ["缩放矩阵"],
  },
  {
    id: "tr-22",
    chapter: "transformations",
    level: 1,
    question: "三维旋转矩阵一共有几种基本形式？分别绕哪根轴？",
    answer:
      "三种基本形式，分别绕 x 轴、y 轴、z 轴旋转。三者形式相似，都用一组 $\\cos\\theta$、$\\sin\\theta$ 排成，只是把 $\\cos/\\sin$ 放进对应的两行两列。",
    tags: ["旋转矩阵"],
  },
  {
    id: "tr-23",
    chapter: "transformations",
    level: 1,
    question:
      "上传矩阵的 `glUniformMatrix4fv` 里那个「是否转置」参数填什么？为什么？",
    answer:
      "填 `GL_FALSE`（gl-matrix 这边填 `false`）。因为 GLM 与 gl-matrix 内部都已经是列主序、和 GLSL 约定一致，无需转置。",
    tags: ["列主序", "uniformMatrix4fv"],
  },
  {
    id: "tr-24",
    chapter: "transformations",
    level: 1,
    question: "为什么要用矩阵变换，而不是逐个去改每个顶点的坐标？",
    answer:
      "因为对整张坐标空间「掰」一下，一次矩阵乘法就能把成千上万个顶点一起变换到位；逐顶点死改坐标几个还行，几万个顶点就算不动也写不出动画了。",
    tags: ["矩阵", "向量"],
  },

  // ── L2 理解 ──────────────────────────────────────────────
  {
    id: "tr-25",
    chapter: "transformations",
    level: 2,
    question:
      "点乘公式 $\\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta$ 为什么能用来判断两向量是否垂直？",
    answer:
      "两向量垂直时夹角 $\\theta = 90°$，而 $\\cos 90° = 0$，于是点乘结果为 0。所以「点乘为 0」就是判断两个非零向量是否垂直的常用招。",
    tags: ["点乘"],
  },
  {
    id: "tr-26",
    chapter: "transformations",
    level: 2,
    question: "向量加法在几何上是怎么做的？「首尾相接」指什么？",
    answer:
      "向量加法是对应分量相加。几何上是「首尾相接」：把第二个向量 $\\vec{b}$ 的尾巴接到第一个向量 $\\vec{a}$ 的头上，从 $\\vec{a}$ 的尾连到 $\\vec{b}$ 的头那一截就是 $\\vec{a} + \\vec{b}$。",
    tags: ["向量"],
  },
  {
    id: "tr-26b",
    chapter: "transformations",
    level: 2,
    question: "数乘（标量乘向量）在几何上做了什么？它会改变向量的方向吗？",
    answer:
      "数乘是把向量每个分量都乘那个数，几何上是「沿原方向伸缩」长度。乘正数方向不变只改长度；乘负数会把方向逆转；乘 0 得到零向量。",
    tags: ["向量"],
  },
  {
    id: "tr-27",
    chapter: "transformations",
    level: 2,
    question: "为什么纯线性的 2×2 / 3×3 矩阵做不到平移？",
    answer:
      "缩放、旋转都能写成「每个新分量是旧分量的线性组合」，但平移是「每个分量加上一个常量」，纯线性矩阵做不到「凭空加一个数」。所以要补上 $w = 1$ 用齐次坐标 + 4×4 矩阵，平移量住在最后一列，被「乘 1 加进来」才生效。",
    tags: ["平移矩阵", "齐次坐标"],
  },
  {
    id: "tr-28",
    chapter: "transformations",
    level: 2,
    question: "为什么平移矩阵对方向向量（$w = 0$）不起作用？这反而合理吗？",
    answer:
      "平移量住在矩阵最后一列，乘点时是「平移量乘 $w$」。$w = 0$ 时平移量乘 0、被抵消，所以平移对方向向量无效。这恰恰合理——方向只表示朝哪儿，把它整体挪一段并不改变方向，本就不该被平移。",
    tags: ["齐次坐标", "平移矩阵"],
  },
  {
    id: "tr-29",
    chapter: "transformations",
    level: 2,
    question:
      "组合矩阵 $T \\cdot R \\cdot S \\cdot \\vec{v}$ 作用时为什么是「从右往左」生效？",
    answer:
      "因为最靠近向量 $\\vec{v}$ 的矩阵先和它相乘。$S$ 紧贴 $\\vec{v}$，先缩放；结果再被 $R$ 旋转；最后被 $T$ 平移。所以书写顺序 $T \\cdot R \\cdot S$ 与生效顺序（缩放→旋转→平移）正好相反。",
    tags: ["组合矩阵", "顺序"],
  },
  {
    id: "tr-30",
    chapter: "transformations",
    level: 2,
    question: "为什么「先缩放后平移」比「先平移后缩放」安全？",
    answer:
      "先缩放再平移时，缩放只作用在原点附近的形状上，平移量保持原样。若先平移再缩放，连平移走的那段距离也会被缩放一起放大，物体就被甩到离谱的位置。所以安全顺序是 $T \\cdot R \\cdot S$（缩放先生效、平移最后）。",
    tags: ["组合矩阵", "顺序"],
  },
  {
    id: "tr-31",
    chapter: "transformations",
    level: 2,
    question:
      "2×2 矩阵 $\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$ 的两列各代表什么几何含义？",
    answer:
      "第一列 $(a, c)$ 是基向量 î（原指向右边）被掰到的新位置，第二列 $(b, d)$ 是基向量 ĵ（原指向上方）被掰到的新位置。矩阵把单位网格掰成什么样，向量就被带到哪。",
    tags: ["矩阵", "矩阵乘法"],
  },
  {
    id: "tr-32",
    chapter: "transformations",
    level: 2,
    question:
      "可视化里 `det(M)` 这个读数代表什么？变成负数、变成 0 各意味着什么？",
    answer:
      "det(M) 是变换的面积缩放比。det 变负意味着空间被翻面（镜像翻转），det 变 0 意味着整片二维空间被压扁成一条线、失去一个维度。",
    tags: ["矩阵", "缩放矩阵"],
  },
  {
    id: "tr-33",
    chapter: "transformations",
    level: 2,
    question: "顶点着色器里 `vec4(aPos, 1.0)` 那个补出来的 `1.0` 起什么作用？",
    answer:
      "它就是齐次坐标的 $w = 1$。正因为 $w = 1$，组合矩阵 `transform` 最后一列的平移量才会被「乘 1 加进来」、平移才生效；若漏掉它（或 $w$ 不为 1），平移就失效。",
    tags: ["GLSL", "齐次坐标"],
  },
  {
    id: "tr-34",
    chapter: "transformations",
    level: 2,
    question:
      "桌面 GLSL（330 core）和 WebGL2（300 es）在写变换时主要差在哪？矩阵乘法的写法一样吗？",
    answer:
      "主要差在版本头：桌面写 `#version 330 core`、WebGL2 写 `#version 300 es`（片段着色器还要补 `precision highp float;`）。`mat4`、`vec4`、矩阵乘向量的写法两端完全一样，GLSL 源码本身通用。",
    tags: ["GLSL", "版本差异"],
  },
  {
    id: "tr-35",
    chapter: "transformations",
    level: 2,
    question:
      "缩放矩阵和旋转矩阵能在 §5 那个 2×2 可视化里亲手拖，平移却不能，为什么？",
    answer:
      "因为那个可视化只能演示能写成 2×2 的线性变换（缩放 / 旋转 / 切变 / 扭曲空间），而平移不是线性变换，做不到挪动二维线性网格——平移得靠带 $w$ 的齐次坐标 + 4×4 矩阵才行。",
    tags: ["平移矩阵", "缩放矩阵", "旋转矩阵"],
  },
  {
    id: "tr-36",
    chapter: "transformations",
    level: 2,
    question: "为什么旋转角度要用弧度而不是直接传度数（如 45）？",
    answer:
      "因为旋转矩阵里的 $\\cos\\theta$、$\\sin\\theta$ 按弧度定义，GLM/gl-matrix 的旋转 API 也都吃弧度。直接传 45 会被当成 45 弧度（约 2578 度），转得面目全非。要先换算成弧度，如 `glm::radians(45.0f)` 或 `Math.PI / 4`。",
    tags: ["旋转矩阵", "弧度"],
  },
  {
    id: "tr-37",
    chapter: "transformations",
    level: 2,
    question: "单位矩阵在搭建组合变换时通常扮演什么角色？",
    answer:
      "它是「什么都不掰」的起点：从单位矩阵起步（`glm::mat4(1.0f)` / `mat4.create()`），再依次乘上平移、旋转、缩放，逐步搭出想要的组合矩阵。任何矩阵乘它都不变，所以拿它当起点最安全。",
    tags: ["单位矩阵", "组合矩阵"],
  },
  {
    id: "tr-38",
    chapter: "transformations",
    level: 2,
    question: "叉乘的结果向量在几何上有什么含义？图形里常拿它做什么？",
    answer:
      "叉乘 $\\vec{a} \\times \\vec{b}$ 得到一个新向量，方向同时垂直于这两个向量（按右手定则），大小等于它们张成的平行四边形面积。图形里常用它来求一个面的法线方向。",
    tags: ["叉乘"],
  },
  {
    id: "tr-39",
    chapter: "transformations",
    level: 2,
    question: "「先平移再旋转」会让一个本想原地转身的物体出现什么现象？",
    answer:
      "物体会绕着屏幕外某个奇怪的点转、或飞到老远。因为先平移把物体挪走了，旋转就变成绕「挪走后的位置」转。修法是按 $T \\cdot R \\cdot S$ 组合，让缩放旋转先在原点附近做完，最后才平移。",
    tags: ["组合矩阵", "顺序"],
  },
  {
    id: "tr-40",
    chapter: "transformations",
    level: 2,
    question:
      "为什么说一个 2×2 矩阵就「定义了整片网格被掰成什么样」，单看一个向量不够？",
    answer:
      "因为矩阵的两列就是基向量 î、ĵ 被掰到的新位置，整片网格上每个点都是 î、ĵ 的线性组合。基向量定了，网格上所有点的去向就都定了——所以矩阵掰的是整个空间，不只是某一个向量。",
    tags: ["矩阵", "矩阵乘法"],
  },
  {
    id: "tr-41",
    chapter: "transformations",
    level: 2,
    question: "连续绕多根轴旋转可能撞上什么问题？工程里常用什么替代？",
    answer:
      "可能撞上「万向节死锁」（gimbal lock），丢失一个旋转自由度。工程里常改用四元数来表示旋转，避开这个问题（本章只点到为止，摄像机章再展开）。",
    tags: ["旋转矩阵"],
  },

  // ── L3 应用（手算 / 读代码） ──────────────────────────────
  {
    id: "tr-42",
    chapter: "transformations",
    level: 3,
    question: "手算 $\\vec{a} = (1, 2, 3)$ 与 $\\vec{b} = (4, 5, 6)$ 的和。",
    answer:
      "对应分量相加：$\\vec{a} + \\vec{b} = (1+4,\\ 2+5,\\ 3+6) = (5, 7, 9)$。",
    tags: ["向量", "手算"],
  },
  {
    id: "tr-43",
    chapter: "transformations",
    level: 3,
    question: "手算向量 $(3, 4)$ 的长度，并写出它的单位向量。",
    answer:
      "长度 $|\\vec{a}| = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$。单位向量是每个分量除以长度：$(3/5,\\ 4/5) = (0.6,\\ 0.8)$。",
    tags: ["单位向量", "手算"],
  },
  {
    id: "tr-44",
    chapter: "transformations",
    level: 3,
    question: "手算 $\\vec{a} = (1, 2, 3)$ 与 $\\vec{b} = (4, -5, 6)$ 的点乘。",
    answer:
      "对应分量相乘再求和：$\\vec{a} \\cdot \\vec{b} = 1\\cdot 4 + 2\\cdot(-5) + 3\\cdot 6 = 4 - 10 + 18 = 12$。",
    tags: ["点乘", "手算"],
  },
  {
    id: "tr-45",
    chapter: "transformations",
    level: 3,
    question:
      "向量 $(1, 0)$ 与 $(0, 1)$ 的点乘是多少？由此能判断它们什么关系？",
    answer:
      "点乘 $= 1\\cdot 0 + 0\\cdot 1 = 0$。点乘为 0 说明这两个向量互相垂直（夹角 90°）——î 和 ĵ 本就互相垂直，结果吻合。",
    tags: ["点乘", "手算"],
  },
  {
    id: "tr-46",
    chapter: "transformations",
    level: 3,
    question:
      "手算 $\\vec{v} = (4, -2)$ 经缩放矩阵 $\\begin{bmatrix} 0.5 & 0 \\\\ 0 & 2 \\end{bmatrix}$ 作用后的结果。",
    answer:
      "按 $\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}\\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} ax+by \\\\ cx+dy \\end{bmatrix}$ 代入：$x' = 0.5\\cdot 4 + 0 = 2$，$y' = 0 + 2\\cdot(-2) = -4$。结果 $(2, -4)$——横向压一半、纵向拉两倍。",
    tags: ["缩放矩阵", "手算"],
  },
  {
    id: "tr-47",
    chapter: "transformations",
    level: 3,
    question:
      "手算 $\\vec{v} = (1, 0)$ 经旋转矩阵 $\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$（绕原点转 90°）作用后的结果。",
    answer:
      "代入：$x' = 0\\cdot 1 + (-1)\\cdot 0 = 0$，$y' = 1\\cdot 1 + 0\\cdot 0 = 1$。结果 $(0, 1)$——原本指向右边的 î 被逆时针转 90° 到了正上方。",
    tags: ["旋转矩阵", "手算"],
  },
  {
    id: "tr-48",
    chapter: "transformations",
    level: 3,
    question:
      "手算 $\\vec{v} = (3, 5)$ 经单位矩阵 $\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$ 作用后的结果。",
    answer:
      "代入：$x' = 1\\cdot 3 + 0\\cdot 5 = 3$，$y' = 0\\cdot 3 + 1\\cdot 5 = 5$。结果 $(3, 5)$，原样不变——这正是单位矩阵「什么都不掰」的体现。",
    tags: ["单位矩阵", "手算"],
  },
  {
    id: "tr-49",
    chapter: "transformations",
    level: 3,
    question:
      "用平移矩阵 $T$（$T_x = 2, T_y = -1, T_z = 0$）作用于点 $(3, 4, 0, 1)$，手算结果。",
    answer:
      "平移矩阵给每个坐标加上对应平移量：$(3 + 2,\\ 4 + (-1),\\ 0 + 0,\\ 1) = (5, 3, 0, 1)$。$w$ 仍为 1，点被整体挪了一段。",
    tags: ["平移矩阵", "齐次坐标", "手算"],
  },
  {
    id: "tr-50",
    chapter: "transformations",
    level: 3,
    question:
      "把同样的平移矩阵（$T_x = 2, T_y = -1, T_z = 0$）作用于方向向量 $(3, 4, 0, 0)$，手算结果说明什么？",
    answer:
      "因为 $w = 0$，平移量乘 0 被抵消：$(3 + 2\\cdot 0,\\ 4 + (-1)\\cdot 0,\\ 0,\\ 0) = (3, 4, 0, 0)$，原样不变。说明平移对方向向量无效——方向本就不该被平移。",
    tags: ["平移矩阵", "齐次坐标", "手算"],
  },
  {
    id: "tr-51",
    chapter: "transformations",
    level: 3,
    question:
      "手算切变矩阵 $\\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$ 作用于 $\\vec{v} = (2, 3)$ 的结果。",
    answer:
      "代入：$x' = 1\\cdot 2 + 1\\cdot 3 = 5$，$y' = 0\\cdot 2 + 1\\cdot 3 = 3$。结果 $(5, 3)$——$y$ 不变，$x$ 被按 $y$ 的大小推了一把，这就是横向切变。",
    tags: ["矩阵乘法", "手算"],
  },
  {
    id: "tr-52",
    chapter: "transformations",
    level: 3,
    question:
      "手算缩放矩阵 $\\begin{bmatrix} -1 & 0 \\\\ 0 & 1 \\end{bmatrix}$ 作用于 $\\vec{v} = (2, 3)$ 的结果，几何上发生了什么？",
    answer:
      "代入：$x' = -1\\cdot 2 + 0 = -2$，$y' = 0 + 1\\cdot 3 = 3$。结果 $(-2, 3)$——沿 x 轴翻转（关于 y 轴镜像），负缩放倍数造成翻面。",
    tags: ["缩放矩阵", "手算"],
  },
  {
    id: "tr-53",
    chapter: "transformations",
    level: 3,
    question:
      "下面这句 GLM 会先生效哪个变换？\n```cpp\nglm::translate(...);\nglm::rotate(...);\nglm::scale(...);\n```",
    answer:
      "从单位矩阵起步、依次右乘 translate → rotate → scale，得到的就是 $T \\cdot R \\cdot S$。作用时从最靠近向量的开始，所以 `scale`（缩放）先生效，然后旋转，最后平移。",
    tags: ["GLM", "组合矩阵", "顺序"],
  },
  {
    id: "tr-54",
    chapter: "transformations",
    level: 3,
    question:
      "手算 $R_z$ 取 $\\theta = 90°$ 时的具体矩阵（左上 2×2 块即可），用 $\\cos 90° = 0$、$\\sin 90° = 1$。",
    answer:
      "$R_z$ 左上块是 $\\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}$，代入得 $\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$——正是绕原点逆时针转 90° 的矩阵。",
    tags: ["旋转矩阵", "手算"],
  },
  {
    id: "tr-55",
    chapter: "transformations",
    level: 3,
    question:
      "下面这句 gl-matrix 想让 45° 旋转，写得对吗？\n```ts\nmat4.rotateZ(out, m, 45);\n```",
    answer:
      "不对。旋转 API 吃的是弧度，传 45 会被当成 45 弧度。应写 `mat4.rotateZ(out, m, Math.PI / 4)`，把 45° 换算成弧度。",
    tags: ["gl-matrix", "弧度"],
  },
  {
    id: "tr-56",
    chapter: "transformations",
    level: 3,
    question:
      "手算 $\\vec{v} = (1, 1)$ 经缩放 $\\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}$，再把结果经平移 $T_x = 1, T_y = 0$（补 $w=1$）作用后落在哪？",
    answer:
      "先缩放：$(2\\cdot 1,\\ 2\\cdot 1) = (2, 2)$，补成 $(2, 2, 1)$。再平移 $T_x = 1$：$(2 + 1,\\ 2 + 0) = (3, 2)$。最终 $(3, 2)$。（注意先缩放后平移，平移量本身没被放大。）",
    tags: ["缩放矩阵", "平移矩阵", "顺序", "手算"],
  },
  {
    id: "tr-57",
    chapter: "transformations",
    level: 3,
    question:
      "手算 $\\vec{v} = (1, 1)$ 反过来「先平移 $T_x = 1$ 再缩放 ×2」落在哪？与先缩放后平移对比。",
    answer:
      "先平移：$(1 + 1,\\ 1 + 0) = (2, 1)$。再缩放 ×2：$(2\\cdot 2,\\ 2\\cdot 1) = (4, 2)$。结果 $(4, 2)$，和先缩放后平移的 $(3, 2)$ 不同——平移走的那 1 段也被放大成了 2，印证顺序不可交换。",
    tags: ["缩放矩阵", "平移矩阵", "顺序", "手算"],
  },
  {
    id: "tr-58",
    chapter: "transformations",
    level: 3,
    question:
      "手算矩阵 $\\begin{bmatrix} 2 & 0 \\\\ 0 & 0 \\end{bmatrix}$ 作用于 $\\vec{v} = (3, 5)$ 的结果；它的 det 是多少？",
    answer:
      "代入：$x' = 2\\cdot 3 + 0 = 6$，$y' = 0\\cdot 3 + 0\\cdot 5 = 0$。结果 $(6, 0)$。$\\det = 2\\cdot 0 - 0\\cdot 0 = 0$——整片空间被压扁到横轴上，所有点的 $y$ 都成 0。",
    tags: ["矩阵乘法", "缩放矩阵", "手算"],
  },
  {
    id: "tr-59",
    chapter: "transformations",
    level: 3,
    question:
      "已知一个 2×2 矩阵把基向量 î 映到 $(0, 1)$、ĵ 映到 $(-1, 0)$，写出这个矩阵，它是什么变换？",
    answer:
      "矩阵的两列就是 î、ĵ 的去向：第一列 $(0, 1)$、第二列 $(-1, 0)$，即 $\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$。这就是绕原点逆时针旋转 90° 的矩阵。",
    tags: ["矩阵", "旋转矩阵", "手算"],
  },
  {
    id: "tr-60",
    chapter: "transformations",
    level: 3,
    question: "数乘：手算 $2.5 \\cdot (2, -4, 6)$ 的结果。",
    answer:
      "每个分量都乘 2.5：$2.5 \\cdot (2, -4, 6) = (5, -10, 15)$。方向不变（正标量），长度变成原来的 2.5 倍。",
    tags: ["向量", "手算"],
  },

  // ── L4 综合 · 陷阱 ────────────────────────────────────────
  {
    id: "tr-61",
    chapter: "transformations",
    level: 4,
    question:
      "缩放、旋转都正常，唯独平移完全没反应、物体纹丝不动。最可能哪里错了？怎么修？",
    answer:
      "多半是把点当成三维 `vec3` 去乘 4×4 矩阵，或齐次坐标的 $w$ 没设成 1。平移量住在矩阵最后一列，只有 $w = 1$ 时才被加进来。修法：顶点一律补成 `vec4(aPos, 1.0)` 再乘矩阵；方向向量才用 $w = 0$。",
    tags: ["齐次坐标", "GLSL", "平移矩阵"],
  },
  {
    id: "tr-62",
    chapter: "transformations",
    level: 4,
    question:
      "变换结果整个像「转置」了——本该横向拉伸的变成纵向、旋转方向反了。根因和修法是什么？",
    answer:
      "根因是行主序 / 列主序搞混：把按行主序排的数据当列主序上传，或 `uniformMatrix4fv` 的转置参数填错。修法：本站统一列主序，上传转置参数填 `false`（GLM / gl-matrix 已是列主序）；若数据真按行主序排，才需要转置。",
    tags: ["列主序", "uniformMatrix4fv"],
  },
  {
    id: "tr-63",
    chapter: "transformations",
    level: 4,
    question:
      "物体被「压扁成一条线」甚至整个消失。最可能的原因？怎样在 §5 Demo 里亲手复现这个翻车？",
    answer:
      "原因是某个轴的缩放倍数用了 0、或组合后 $\\det = 0$，整片空间被压扁、失去一个维度。复现：到 §5 Demo 把 `a`、`c` 都调成 0（或 `b`、`d` 都调成 0），盯着 `det(M)` 变成 0，网格塌成一条线。修法：缩放倍数别用 0。",
    tags: ["缩放矩阵", "矩阵"],
  },
  {
    id: "tr-64",
    chapter: "transformations",
    level: 4,
    question:
      "组合矩阵写成了 $S \\cdot R \\cdot T$（缩放在最左），和正确的 $T \\cdot R \\cdot S$ 会有什么差别？",
    answer:
      "$S \\cdot R \\cdot T$ 作用时最右的 $T$ 先生效（先平移），然后旋转、最后缩放——既绕着挪走后的位置旋转，又把平移距离一起缩放，物体跑偏。正确的 $T \\cdot R \\cdot S$ 让 $S$ 先在原点附近缩放、再旋转、最后才平移。",
    tags: ["组合矩阵", "顺序", "矩阵乘法"],
  },
  {
    id: "tr-65",
    chapter: "transformations",
    level: 4,
    question:
      "代码里写 `transform = transform * scaleMatrix` 还是 `scaleMatrix * transform`，会影响 scale 在组合里的先后吗？",
    answer:
      "会。右乘（`transform * scaleMatrix`）把 scale 放到组合的最右侧，作用时它更靠近向量、更早生效；左乘则相反。要 $T \\cdot R \\cdot S$ 的效果（scale 先生效），就从单位矩阵起依次右乘 translate、rotate、scale。",
    tags: ["矩阵乘法", "组合矩阵", "顺序"],
  },
  {
    id: "tr-66",
    chapter: "transformations",
    level: 4,
    question:
      "一个法线方向向量被随物体平移后指错了方向——根因在哪？正确做法是什么？",
    answer:
      "根因是把方向向量当成点（$w = 1$）去乘含平移的矩阵，平移量被加进了方向里。方向向量应取 $w = 0$，这样平移对它无效、只剩缩放旋转作用，方向才正确。（这正是齐次坐标区分点与方向的意义。）",
    tags: ["齐次坐标", "平移矩阵", "向量"],
  },
  {
    id: "tr-67",
    chapter: "transformations",
    level: 4,
    question:
      "若把 $S_x = 2, S_y = 2$ 的缩放和 $T_x = 3$ 的平移组合，要让物体「先在原地放大 2 倍、再整体右移 3」，组合该怎么写？右移距离会被放大吗？",
    answer:
      "写成 $T \\cdot S \\cdot \\vec{v}$（先缩放后平移）。此时平移在缩放之后施加，那 3 的右移距离不会被放大；若写成 $S \\cdot T$，3 会被乘 2 变成右移 6。",
    tags: ["组合矩阵", "缩放矩阵", "平移矩阵", "顺序"],
  },
  {
    id: "tr-68",
    chapter: "transformations",
    level: 4,
    question:
      "为什么 `gl_Position = transform * vec4(aPos, 1.0)` 里矩阵必须写在左、向量写在右，不能反过来？",
    answer:
      "因为本站和 GLSL 用列主序、右乘列向量的约定：把向量当成竖着的一列写在矩阵右边，`矩阵 * 向量` 才是合法且语义正确的「用变换作用于向量」。写成 `向量 * 矩阵` 维度/语义都不对（那是行向量左乘，约定不同）。",
    tags: ["列主序", "GLSL", "矩阵乘法"],
  },
  {
    id: "tr-69",
    chapter: "transformations",
    level: 4,
    question:
      "一个 2×2 矩阵的 det 算出来是负数，物体看起来「翻了个面」（如文字变镜像）。这是 bug 吗？怎么造成的？",
    answer:
      "不一定是 bug——det 为负就代表空间被翻面（镜像翻转），是负缩放或某些切变的正常结果，比如 $\\begin{bmatrix} -1 & 0 \\\\ 0 & 1 \\end{bmatrix}$。若并不想要镜像，检查是不是某个缩放倍数误用了负值。",
    tags: ["缩放矩阵", "矩阵"],
  },
  {
    id: "tr-70",
    chapter: "transformations",
    level: 4,
    question:
      "在 §5 Demo 里把矩阵调成 `a=1, b=2, c=0, d=1`，网格会怎样？det 是多少？这属于哪种「掰」法？",
    answer:
      "$\\det = 1\\cdot 1 - 2\\cdot 0 = 1$，面积不变。网格被「斜过去」：每个点的 $x$ 按其 $y$ 大小被推一把（$x' = x + 2y$），$y$ 不变——这是横向切变（shear），既非纯缩放也非旋转。",
    tags: ["矩阵乘法", "矩阵"],
  },
  {
    id: "tr-71",
    chapter: "transformations",
    level: 4,
    question:
      "为什么 §5 那个 2×2 可视化没法演示平移，而 §4 却能用 4×4 矩阵把平移写出来？根本区别在哪？",
    answer:
      "根本区别是维度与线性性：平移不是 2×2 能表达的线性变换（线性变换必把原点映到原点，平移会挪动原点）。升到 4×4 + 齐次坐标后，给点补 $w = 1$，平移量塞进最后一列被「乘 1 加进来」，于是平移就能写成一次矩阵乘法。",
    tags: ["平移矩阵", "齐次坐标", "矩阵"],
  },
  {
    id: "tr-72",
    chapter: "transformations",
    level: 4,
    question:
      "同样是「绕物体自身中心旋转」，若物体不在原点，直接乘旋转矩阵会怎样？该怎么补救（用本章三种变换的组合思路）？",
    answer:
      "旋转矩阵绕的是原点，物体不在原点时会绕原点公转、跑偏。补救思路：先把物体平移回原点、旋转、再平移回去——即 $T \\cdot R \\cdot T^{-1}$ 这种组合。本质还是「组合多个变换、顺序从右往左生效」。",
    tags: ["旋转矩阵", "平移矩阵", "组合矩阵", "顺序"],
  },
  {
    id: "tr-73",
    chapter: "transformations",
    level: 4,
    question:
      "有人说「点乘和叉乘都是向量乘法，结果应该都是向量」，这话错在哪？",
    answer:
      "错在结果类型不同：点乘结果是一个数（标量，$|\\vec{a}||\\vec{b}|\\cos\\theta$），用来看夹角 / 是否垂直；叉乘结果才是新向量（垂直于两者、大小为平行四边形面积），且叉乘只在三维有定义。二者用途也不同。",
    tags: ["点乘", "叉乘"],
  },
  {
    id: "tr-74",
    chapter: "transformations",
    level: 4,
    question:
      "片段着色器里漏写 `precision highp float;`（WebGL2 300 es）会怎样？这和顶点变换矩阵的列主序是同一类问题吗？",
    answer:
      "WebGL2 的片段着色器没有默认 float 精度，漏写 `precision highp float;` 会编译报错。这和列主序是两类不同问题：前者是 GLSL 版本 / 平台 API 差异（300 es 的要求），后者是矩阵存储约定。别把编译报错误判成变换写错。",
    tags: ["GLSL", "版本差异"],
  },
];
