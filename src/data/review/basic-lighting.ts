/** 复习题库 · 基础光照（basic-lighting）。Phase B 各章独立文件，避免并行写冲突。 */

import type { ReviewQuestion } from "./types";

export const basicLightingQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / 公式形状 / 数值约定） ──
  {
    id: "bl-1",
    chapter: "basic-lighting",
    level: 1,
    question: "冯氏光照模型（Phong）把物体受光拆成哪三块？",
    answer:
      "环境光（ambient）、漫反射（diffuse）、镜面（specular）。三块各自算出一个值，相加后再乘物体颜色，就是这个像素的最终颜色。",
    tags: ["冯氏光照", "定义"],
  },
  {
    id: "bl-2",
    chapter: "basic-lighting",
    level: 1,
    question: "冯氏光照模型的名字来自哪里？它追求物理上完全真实吗？",
    answer:
      "名字来自提出者 Bui Tuong Phong。它不追求物理百分百真实，而是用三块好算的近似拼出「够像」的效果——便宜、好懂、效果够用，是实时图形的入门基石。",
    tags: ["冯氏光照", "术语"],
  },
  {
    id: "bl-3",
    chapter: "basic-lighting",
    level: 1,
    question: "冯氏光照三块算出来之后，怎么得到最终颜色？",
    answer:
      "三块相加，再整体乘上物体颜色：`(ambient + diffuse + specular) * objectColor`。这正是上一章「光色 × 物色」的细化——括号里是「到达表面的光」，乘 `objectColor` 才是看到的颜色。",
    tags: ["冯氏光照", "总装"],
  },
  {
    id: "bl-4",
    chapter: "basic-lighting",
    level: 1,
    question: "冯氏光照的计算发生在渲染管线的哪个着色器里？",
    answer:
      "主要在片段着色器里。片段着色器负责给每个像素定颜色，本章把这个颜色从「光色 × 物色」升级成「(环境 + 漫反射 + 镜面) × 物色」。顶点着色器只负责备料（传世界位置和变换后的法线）。",
    tags: ["管线", "片段着色器"],
  },
  {
    id: "bl-5",
    chapter: "basic-lighting",
    level: 1,
    question: "环境光（ambient）模拟现实中的什么？怎么算？",
    answer:
      "模拟四面八方反复弹来弹去的间接光，让背光处也不全黑。算法最简单：拿一个很小的常量系数（如 0.1）乘上光的颜色。它和方向、法线都无关，每个像素加同样多。",
    tags: ["环境光", "定义"],
  },
  {
    id: "bl-6",
    chapter: "basic-lighting",
    level: 1,
    question: "环境光在冯氏模型里的唯一作用是什么？",
    answer:
      "托底——给物体各处一点保底亮度，让背光面不至于死黑一片。它不提供立体感、不随光源方向变化，只是一份恒定的底光。",
    tags: ["环境光", "作用"],
  },
  {
    id: "bl-7",
    chapter: "basic-lighting",
    level: 1,
    question: "漫反射（diffuse）描述的是什么现象？它是物体哪种视觉特征的来源？",
    answer:
      "描述「表面越正对光源越亮、越偏越暗」。墙正对手电的那一圈最亮、斜着的地方暗就是它。漫反射是物体立体明暗（立体感）的主要来源。",
    tags: ["漫反射", "定义"],
  },
  {
    id: "bl-8",
    chapter: "basic-lighting",
    level: 1,
    question:
      "判断一个表面「有多正对光源」靠哪两个向量的夹角？它们各记作什么？",
    answer:
      "靠表面法线 N（这块面朝哪个方向）和从表面指向光源的方向 L 的夹角。夹角越小越正对、越亮；到 90° 甚至更大（背光）就该是黑的。",
    tags: ["漫反射", "法线", "光源方向"],
  },
  {
    id: "bl-9",
    chapter: "basic-lighting",
    level: 1,
    question: "写出漫反射强度的公式（用归一化后的 $\\hat{N}$、$\\hat{L}$）。",
    answer:
      "$\\text{diff} = \\max(\\hat{N} \\cdot \\hat{L},\\ 0)$。即法线与指向光源方向的点乘，再用 `max` 把负数截成 0。",
    tags: ["漫反射", "公式"],
  },
  {
    id: "bl-10",
    chapter: "basic-lighting",
    level: 1,
    question: "什么是法线（normal）？约定取多长？",
    answer:
      "法线是一个垂直于物体表面、指向外侧的方向向量，代表「这块面朝哪儿」。约定取长度为 1 的单位向量。它是判断表面正不正对光源、算反射的关键依据。",
    tags: ["法线", "定义"],
  },
  {
    id: "bl-11",
    chapter: "basic-lighting",
    level: 1,
    question: "什么是法线归一化（normalize）？GLSL 里用哪个函数？",
    answer:
      "把一个向量按比例缩放到长度为 1（方向不变）的操作，GLSL 里是 `normalize()`。法线、光线方向用前都要归一化，否则点乘结果会被向量长短污染。",
    tags: ["法线归一化", "normalize"],
  },
  {
    id: "bl-12",
    chapter: "basic-lighting",
    level: 1,
    question: "什么是法线矩阵（normal matrix）？它的表达式是什么？",
    answer:
      "专门用来变换法线的矩阵，等于模型矩阵左上角 3×3 部分「求逆再转置」——`mat3(transpose(inverse(model)))`。用它替代直接乘 model 来变换法线。",
    tags: ["法线矩阵", "定义"],
  },
  {
    id: "bl-13",
    chapter: "basic-lighting",
    level: 1,
    question: "镜面光照（specular）模拟现实中的什么？它和视角有关吗？",
    answer:
      "模拟光滑表面上那块刺眼的反光点（高光），给出金属、塑料那种光泽感。它和视角强相关——换个角度看，高光会挪位甚至消失，这点和漫反射不同。",
    tags: ["镜面光照", "定义"],
  },
  {
    id: "bl-14",
    chapter: "basic-lighting",
    level: 1,
    question:
      "写出镜面强度的公式（用归一化后的 $\\hat{R}$、$\\hat{V}$ 和反光度 $s$）。",
    answer:
      "$\\text{spec} = \\max(\\hat{R} \\cdot \\hat{V},\\ 0)^{\\,s}$。先看反射方向与观察方向有多同向（点乘、max 截负），再乘方 $s$ 次。",
    tags: ["镜面光照", "公式"],
  },
  {
    id: "bl-15",
    chapter: "basic-lighting",
    level: 1,
    question: "镜面公式里的 $\\hat{R}$ 和 $\\hat{V}$ 各代表什么方向？",
    answer:
      "$\\hat{V}$ 是从表面指向观察者（眼睛）的方向，归一化后；$\\hat{R}$ 是入射光关于法线的反射方向（入射角 = 反射角），归一化后。观察方向越贴近反射方向，高光越强。",
    tags: ["镜面光照", "符号"],
  },
  {
    id: "bl-16",
    chapter: "basic-lighting",
    level: 1,
    question: "什么是反光度（shininess，又叫高光指数）？它在公式里是哪一项？",
    answer:
      "反光度是镜面高光的「锐度」参数，就是镜面公式里 `pow` 的指数 $s$。值越大，高光斑越小越锐、越像抛光金属；值越小，斑越大越钝、越像哑光塑料。",
    tags: ["反光度", "定义"],
  },
  {
    id: "bl-17",
    chapter: "basic-lighting",
    level: 1,
    question: "本章在哪个坐标空间里做光照计算？",
    answer:
      "世界空间——物体被模型矩阵摆进场景后所在的统一坐标空间（还没经过观察/投影变换）。把光源位置、表面位置、观察者位置都换算到这个空间里比较，光照计算才一致。",
    tags: ["世界空间", "定义"],
  },
  {
    id: "bl-18",
    chapter: "basic-lighting",
    level: 1,
    question: "`FragPos` 是什么？它在哪个着色器里算出、由谁递给谁？",
    answer:
      "`FragPos` 是这个片段对应表面在世界空间里的位置。它在顶点着色器里用 `vec3(model * vec4(aPos, 1.0))` 算出，递给片段着色器，让片段知道「这块表面在世界的哪个点」。",
    tags: ["世界空间", "FragPos"],
  },
  {
    id: "bl-19",
    chapter: "basic-lighting",
    level: 1,
    question: "GLSL 内建函数 `reflect(I, N)` 是干什么的？两个参数各是什么？",
    answer:
      "算入射向量 I 关于法线 N 的镜像反射方向。本章用它求镜面的反射方向 R。注意入射要传 `-lightDir`：`lightDir` 指向光源，取负才是「光打过来」的方向。",
    tags: ["reflect", "镜面光照"],
  },
  {
    id: "bl-20",
    chapter: "basic-lighting",
    level: 1,
    question: "环境光强度通常取多大的量级？为什么不取大？",
    answer:
      "通常取很小的值（如 0.1）。因为它只是模拟到处乱弹的微弱间接光、起托底作用；取大了会让整个物体泛白、淹没漫反射和镜面带来的明暗与高光，立体感全失。",
    tags: ["环境光", "数值"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "bl-21",
    chapter: "basic-lighting",
    level: 2,
    question:
      "漫反射里为什么用点乘 $\\hat{N}\\cdot\\hat{L}$ 来量「有多正对光源」？",
    answer:
      "因为两个单位向量的点乘正好等于它们夹角的余弦 $\\cos\\theta$。正对光源（θ=0）时为 1（最亮）、侧着（θ=90°）时为 0、背着光（θ>90°）时为负。所以点乘天然就是「有多正对」的度量，且计算便宜。",
    tags: ["漫反射", "点乘", "为什么"],
  },
  {
    id: "bl-22",
    chapter: "basic-lighting",
    level: 2,
    question: "漫反射为什么要套一层 $\\max(\\cdot, 0)$？不套会出什么问题？",
    answer:
      "因为夹角超过 90°（背光面）时点乘是负数，而「负的亮度」没有意义。不截负的话，背光面会算出负的漫反射，叠加时把别处的颜色往下减、画面发脏。`max(…, 0)` 把负值压成 0，等于宣布「背光面不被这盏灯照亮」。",
    tags: ["漫反射", "max", "为什么"],
  },
  {
    id: "bl-23",
    chapter: "basic-lighting",
    level: 2,
    question: "为什么法线用前必须归一化？从点乘公式说清楚。",
    answer:
      "点乘的完整式子是 $\\hat{N}\\cdot\\hat{L} = |N|\\,|L|\\cos\\theta$。只有当 $|N|=|L|=1$，它才正好等于 $\\cos\\theta$；否则结果还混进了两个向量的长度，算出的「亮度」被向量长短污染，明暗就乱了。",
    tags: ["法线归一化", "点乘", "为什么"],
  },
  {
    id: "bl-24",
    chapter: "basic-lighting",
    level: 2,
    question: "法线为什么不能像顶点位置那样直接乘模型矩阵？",
    answer:
      "法线是个「方向」而非位置。一旦模型矩阵含不等比缩放（比如把立方体某个轴拉长），直接用 model 变换法线会让它不再垂直于表面，N·L 就全算错。位置乘 model 没问题，法线必须用法线矩阵。",
    tags: ["法线矩阵", "为什么"],
  },
  {
    id: "bl-25",
    chapter: "basic-lighting",
    level: 2,
    question:
      "镜面公式里那一步「乘方 $s$ 次」起什么作用？$s$ 大小如何影响高光？",
    answer:
      "$\\hat{R}\\cdot\\hat{V}$ 是个 0~1 的小数，取越高的次方衰减得越快。$s$ 越大，只有 $\\hat{R}\\cdot\\hat{V}$ 极其接近 1（几乎正对反射方向）时才亮，高光斑就越小越锐；$s$ 小则衰减慢，高光散成一大片。",
    tags: ["镜面光照", "反光度", "为什么"],
  },
  {
    id: "bl-26",
    chapter: "basic-lighting",
    level: 2,
    question: "漫反射和镜面在「是否随视角变化」上有什么本质区别？",
    answer:
      "漫反射只取决于法线 N 与指向光源 L 的夹角，和观察者在哪无关——你绕着看，某个面的漫反射明暗不变。镜面取决于反射方向 R 与观察方向 V 的贴合度，强烈依赖视角——换个角度看，高光会挪位甚至消失。",
    tags: ["漫反射", "镜面光照", "对比"],
  },
  {
    id: "bl-27",
    chapter: "basic-lighting",
    level: 2,
    question: "为什么光照计算非要把三方都换算到同一个空间（世界空间）？",
    answer:
      "漫反射要算 N 与 L 的夹角、镜面要算光反射后是否射向眼睛，这些都涉及位置和方向的相互关系。光源在哪、表面在哪、眼睛在哪，只有用同一套坐标描述，比较夹角、求反射才有意义；混用不同空间的坐标，算出的方向就是错的。",
    tags: ["世界空间", "为什么"],
  },
  {
    id: "bl-28",
    chapter: "basic-lighting",
    level: 2,
    question:
      "为什么顶点着色器要额外算并递出 `FragPos`，光算 `gl_Position` 不够吗？",
    answer:
      "`gl_Position` 是裁剪空间的屏幕位置，用于光栅化，不能拿来做世界空间的光照。片段着色器要算表面到光源、到眼睛的方向，需要知道这块表面在世界的具体落点，所以顶点着色器要额外把世界位置 `FragPos` 算出来递下去。",
    tags: ["世界空间", "FragPos", "为什么"],
  },
  {
    id: "bl-29",
    chapter: "basic-lighting",
    level: 2,
    question:
      "为什么 `reflect` 的第一个参数要传 `-lightDir` 而不是 `lightDir`？",
    answer:
      "`lightDir = normalize(lightPos - FragPos)` 是从表面指向光源的方向，而 `reflect(I, N)` 要的 I 是「入射光的传播方向」，也就是从光源打向表面。两者正好相反，所以传 `-lightDir`。",
    tags: ["reflect", "镜面光照", "为什么"],
  },
  {
    id: "bl-30",
    chapter: "basic-lighting",
    level: 2,
    question: "环境光为什么不需要法线、不需要 `max`、不分朝向？",
    answer:
      "因为它模拟的是四面八方乱弹的间接光，本来就没有方向性——冯氏模型干脆用一个恒定常量近似它，每个像素加同样多。既然和方向无关，自然用不到法线，也不会出现「背光面负值」的问题，无需 `max`。",
    tags: ["环境光", "为什么"],
  },
  {
    id: "bl-31",
    chapter: "basic-lighting",
    level: 2,
    question: "把环境光强度拉到 0，背光面会变成什么样？为什么？",
    answer:
      "背光面会变成纯黑。因为背光面 N·L ≤ 0、漫反射被 `max` 截成 0，镜面通常也接近 0；唯一的托底就是环境光，环境光归零后这些面没有任何光照贡献，于是死黑一片。",
    tags: ["环境光", "为什么"],
  },
  {
    id: "bl-32",
    chapter: "basic-lighting",
    level: 2,
    question:
      "为什么三块光照都先各自乘 `lightColor`，最后才一起乘 `objectColor`？",
    answer:
      "因为 `lightColor` 描述「这盏灯发什么色、到达表面的光有多少」，三块都是对到达光的不同近似，所以各自乘光色；把三块加起来得到「这块表面总共被多少、什么色的光照到」，再乘物体自身颜色 `objectColor`，正是「光色 × 物色」。",
    tags: ["冯氏光照", "总装", "为什么"],
  },
  {
    id: "bl-33",
    chapter: "basic-lighting",
    level: 2,
    question:
      "把代码里的 `transpose(inverse(model))` 直接写在着色器里有什么性能问题？实战怎么做？",
    answer:
      "矩阵求逆在 GPU 上很贵，且每个顶点都会重算一遍，纯属浪费。实战中应在 CPU 侧每帧算好这个法线矩阵，当成一个 `mat3` uniform 传进着色器，里面直接用。着色器里写它只为演示直观。",
    tags: ["法线矩阵", "性能", "为什么"],
  },
  {
    id: "bl-34",
    chapter: "basic-lighting",
    level: 2,
    question:
      "为什么 WebGL2 的片段着色器一定要写 `precision highp float;`？桌面要写吗？",
    answer:
      "因为 WebGL2（GLSL ES 300）规定片段着色器没有默认的 float 精度，必须显式声明，否则编译失败。桌面 OpenGL（`#version 330 core`）有默认精度，不需要这一行。这是两端 GLSL 唯一的实质差异之一。",
    tags: ["GLSL", "precision", "API差异"],
  },
  {
    id: "bl-35",
    chapter: "basic-lighting",
    level: 2,
    question: "本章里漫反射和镜面那几段 GLSL，C++ 和 WebGL2 两端写法一样吗？",
    answer:
      "一字不差。漫反射 `max(dot(norm, lightDir), 0.0)`、镜面 `reflect`+`pow` 都是纯计算，没有任何 API 差异。两端的差别只在版本声明（330 core / 300 es）和片段着色器的 `precision` 行。",
    tags: ["GLSL", "API差异"],
  },
  {
    id: "bl-36",
    chapter: "basic-lighting",
    level: 2,
    question: "为什么说漫反射给立体感、镜面给「光泽」，而环境光两者都不给？",
    answer:
      "漫反射随各面朝向产生连续明暗，眼睛靠这种明暗梯度读出物体的立体形状；镜面是局部一小块高光，给出表面是否光滑（金属/塑料）的质感。环境光是恒定底光、各处一样，既无明暗梯度也无高光，只防全黑。",
    tags: ["冯氏光照", "对比"],
  },
  {
    id: "bl-37",
    chapter: "basic-lighting",
    level: 2,
    question:
      "`lightDir = normalize(lightPos - FragPos)` 为什么是「减」、谁减谁？",
    answer:
      "要的是从表面指向光源的向量 L。向量「从 A 指向 B」= B − A，这里终点是光源、起点是表面，所以是 `lightPos - FragPos`，再归一化成单位向量。写反了（`FragPos - lightPos`）方向就掉头，明暗全反。",
    tags: ["漫反射", "光源方向", "机制"],
  },
  {
    id: "bl-38",
    chapter: "basic-lighting",
    level: 2,
    question: "镜面公式里也有 `max(…, 0)`，它截掉的是什么情况？",
    answer:
      "截掉 $\\hat{R}\\cdot\\hat{V}$ 为负的情况——即观察方向偏离反射方向超过 90°（你在反射方向的「背面」看）。这时本不该有高光，负值经 `pow` 还可能出乱子（如偶数次方变正），所以先截成 0。",
    tags: ["镜面光照", "max", "机制"],
  },
  {
    id: "bl-39",
    chapter: "basic-lighting",
    level: 2,
    question: "本章的「光色 × 物色」相比上一章有什么进步？",
    answer:
      "上一章「光色」是一口价给的常量，整个物体被均匀光泡着、平平一片。本章把那个抽象的「光色」拆成环境 + 漫反射 + 镜面三块按真实几何关系算出来，于是物体有了底光、立体明暗和会动的高光。",
    tags: ["冯氏光照", "对比"],
  },
  {
    id: "bl-40",
    chapter: "basic-lighting",
    level: 2,
    question:
      "为什么算出的 `Normal` 在片段着色器里还要再 `normalize` 一次（顶点已传法线）？",
    answer:
      "因为顶点法线递给片段时会经过逐片段插值，几个单位向量插值（加权平均）出来的结果一般不再是单位长度。所以片段着色器拿到 `Normal` 后、点乘前要再 `normalize(Normal)` 一遍，保证它是单位向量。",
    tags: ["法线归一化", "插值", "机制"],
  },

  // ── L3 应用（读代码 / 给参数判结果 / 小计算 / 改 Demo） ──
  {
    id: "bl-41",
    chapter: "basic-lighting",
    level: 3,
    question:
      "片段着色器写 `float diff = max(dot(norm, lightDir), 0.0);`，当某面 `dot(norm, lightDir) = -0.4` 时 `diff` 是多少？画面什么效果？",
    answer:
      "`diff = max(-0.4, 0.0) = 0`。这是背光面，漫反射贡献为 0，该面只剩环境光（和可能的镜面）托底，呈现暗色——这正是 `max` 把背光面负值截成 0 的效果。",
    tags: ["漫反射", "max", "计算"],
  },
  {
    id: "bl-42",
    chapter: "basic-lighting",
    level: 3,
    question:
      "$\\hat{N}=(0,1,0)$，$\\hat{L}=(0,1,0)$（光从正上方直射、面朝上）。漫反射强度 `diff` 是多少？说明什么？",
    answer:
      "$\\text{diff} = \\max((0)(0)+(1)(1)+(0)(0),\\,0) = \\max(1, 0) = 1$。两向量完全同向、夹角 0°，余弦为 1，是漫反射的最亮情形（表面正对光源）。",
    tags: ["漫反射", "点乘", "计算"],
  },
  {
    id: "bl-43",
    chapter: "basic-lighting",
    level: 3,
    question:
      "$\\hat{N}=(1,0,0)$，$\\hat{L}=(0,1,0)$（法线与光向垂直）。漫反射强度是多少？对应哪种朝向？",
    answer:
      "$\\text{diff} = \\max((1)(0)+(0)(1)+(0)(0),\\,0) = \\max(0,0)=0$。夹角 90°、余弦 0，表面侧对光源、刚好不被照亮，漫反射为 0。",
    tags: ["漫反射", "点乘", "计算"],
  },
  {
    id: "bl-44",
    chapter: "basic-lighting",
    level: 3,
    question:
      "镜面里 `dot(viewDir, reflectDir) = 0.5`、反光度为 2，`spec = pow(0.5, 2.0)` 是多少？换成反光度 32 大致变大还是变小？",
    answer:
      "`pow(0.5, 2.0) = 0.25`。换成 32：`pow(0.5, 32)` 是个极小的数（约 $2.3\\times10^{-10}$，几乎为 0）。可见反光度越大，同样的 `R·V=0.5` 衰减得越狠，高光只在极正对反射方向时才亮——斑更小更锐。",
    tags: ["镜面光照", "反光度", "计算"],
  },
  {
    id: "bl-45",
    chapter: "basic-lighting",
    level: 3,
    question:
      "代码 `pow(max(dot(viewDir, reflectDir), 0.0), 32.0)` 里的 `32.0` 改成 `8.0`，Demo 里高光会怎么变？",
    answer:
      "高光会变大、变糊（更钝）。指数变小 → 0~1 的 `R·V` 衰减变慢 → 更大范围的视角都能接到可观高光 → 高光斑铺得更开。对应 Demo「高光指数」滑块往小拨，质感偏哑光。",
    tags: ["镜面光照", "反光度", "改Demo"],
  },
  {
    id: "bl-46",
    chapter: "basic-lighting",
    level: 3,
    question:
      "顶点着色器里 `Normal = mat3(transpose(inverse(model))) * aNormal;`，这里为什么取 `mat3`（而非 mat4）？",
    answer:
      "因为法线是纯方向，只受旋转和缩放影响，不受平移影响。模型矩阵左上 3×3 部分正好只含旋转+缩放、不含平移；取 `mat3` 丢掉第四行/列的平移分量，避免方向被平移污染。",
    tags: ["法线矩阵", "读代码"],
  },
  {
    id: "bl-47",
    chapter: "basic-lighting",
    level: 3,
    question:
      "`FragPos = vec3(model * vec4(aPos, 1.0));` 里，`vec4(aPos, 1.0)` 的 `1.0` 和外层 `vec3(...)` 各起什么作用？",
    answer:
      "`1.0` 是齐次坐标的 w 分量，取 1 表示这是个「位置点」（会受平移影响），区别于方向（w=0）。外层 `vec3(...)` 取前三个分量、丢掉齐次的 w，得到世界空间的 xyz 坐标。",
    tags: ["世界空间", "FragPos", "读代码"],
  },
  {
    id: "bl-48",
    chapter: "basic-lighting",
    level: 3,
    question:
      "片段着色器里要算「从表面指向眼睛」的观察方向 `viewDir`，已知 `viewPos`、`FragPos`，怎么写？",
    answer:
      "`vec3 viewDir = normalize(viewPos - FragPos);`。终点是眼睛（相机）、起点是表面，所以用相机位置减表面位置，再归一化成单位向量。",
    tags: ["镜面光照", "viewDir", "读代码"],
  },
  {
    id: "bl-49",
    chapter: "basic-lighting",
    level: 3,
    question:
      "想在 Demo 里把立方体调成「哑光」质感，该动哪两个控件、各往哪个方向？",
    answer:
      "把「镜面强度」调小（高光本身变暗甚至看不见）、「高光指数」也调小（就算有高光也散成钝钝一大片）。镜面贡献几乎归零，表面只剩环境 + 漫反射的明暗，看起来发钝，像哑光塑料。",
    tags: ["反光度", "镜面光照", "改Demo"],
  },
  {
    id: "bl-50",
    chapter: "basic-lighting",
    level: 3,
    question:
      "想在 Demo 里把立方体调成「高反光金属感」，该动哪两个控件、各往哪个方向？",
    answer:
      "把「镜面强度」调大（高光更亮）、「高光指数」调大（`pow` 指数大 → 衰减快 → 高光缩成一小块）。于是出现又小又亮的刺眼亮斑，像抛光金属；转「光源方位」时这块高光会跟着挪。",
    tags: ["反光度", "镜面光照", "改Demo"],
  },
  {
    id: "bl-51",
    chapter: "basic-lighting",
    level: 3,
    question:
      "片段着色器写 `vec3 ambient = 0.1 * lightColor;`，把 `0.1` 改成 `0.5` 画面会怎样？",
    answer:
      "整个物体（含背光面）整体变亮、底光更足，但立体感和高光会被「冲淡」——因为环境光是恒定加到各处的，加多了会压低漫反射明暗和镜面高光的相对对比，物体看起来更平、发灰白。",
    tags: ["环境光", "数值", "改Demo"],
  },
  {
    id: "bl-52",
    chapter: "basic-lighting",
    level: 3,
    question:
      "把 Demo 里「光源方位」转到立方体背面，朝你这面的漫反射会怎样？为什么？",
    answer:
      "朝你这面的漫反射趋于 0、变暗。因为光源转到背面后，这面法线 N 与指向光源方向 L 夹角大于 90°，`dot(N,L)` 为负、被 `max` 截成 0，没有漫反射贡献，只剩环境光托底。",
    tags: ["漫反射", "改Demo"],
  },
  {
    id: "bl-53",
    chapter: "basic-lighting",
    level: 3,
    question:
      "已知 `Normal`、`FragPos`、`lightPos`，写出片段着色器里漫反射那块的关键三行。",
    answer:
      "`vec3 norm = normalize(Normal);` `vec3 lightDir = normalize(lightPos - FragPos);` `float diff = max(dot(norm, lightDir), 0.0);` 再 `vec3 diffuse = diff * lightColor;`。先归一化两个向量，点乘并截负，最后乘光色。",
    tags: ["漫反射", "写代码", "应用"],
  },
  {
    id: "bl-54",
    chapter: "basic-lighting",
    level: 3,
    question:
      "已知 `norm`、`lightDir`、`viewDir` 都备好了，写出镜面那块的关键几行（反光度取 32、镜面强度 0.5）。",
    answer:
      "`vec3 reflectDir = reflect(-lightDir, norm);` `float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);` `vec3 specular = 0.5 * spec * lightColor;`。注意 `reflect` 入射传 `-lightDir`。",
    tags: ["镜面光照", "reflect", "写代码"],
  },
  {
    id: "bl-55",
    chapter: "basic-lighting",
    level: 3,
    question:
      "片段着色器最后一行 `vec3 result = (ambient + diffuse + specular) * objectColor;`，若把括号去掉写成 `ambient + diffuse + specular * objectColor` 会怎样？",
    answer:
      "运算优先级变了：只有 `specular` 乘了 `objectColor`，环境光和漫反射没乘物体颜色。结果是漫反射/环境光不带物体本色（呈光色本身），整体偏色、不符合「(三块之和) × 物色」。必须保留括号让三块先相加。",
    tags: ["冯氏光照", "总装", "读代码"],
  },
  {
    id: "bl-56",
    chapter: "basic-lighting",
    level: 3,
    question:
      "顶点着色器里 `layout (location = 1) in vec3 aNormal;`，CPU 侧配置这个法线属性，`glVertexAttribPointer` 第一个参数和分量数各填几？",
    answer:
      "第一个参数（属性位置编号）填 `1`，要和 `location = 1` 对应；分量数填 `3`（法线是 vec3，含 x、y、z）。别忘了 `glEnableVertexAttribArray(1)` 启用它。",
    tags: ["法线", "vertexAttribPointer", "读代码"],
  },
  {
    id: "bl-57",
    chapter: "basic-lighting",
    level: 3,
    question:
      "把镜面公式里 `pow(..., 32.0)` 的 `32.0` 调到极小（如 1.0），同时镜面强度不变，高光会怎样？",
    answer:
      "高光会散开成一大片、几乎和漫反射区分不开。指数为 1 时几乎不衰减，`R·V` 从 1 到 0 平滑过渡，整个朝光半球都泛起一层弱高光——失去「集中亮斑」的特征，看起来像没有镜面光泽。",
    tags: ["反光度", "镜面光照", "应用"],
  },
  {
    id: "bl-58",
    chapter: "basic-lighting",
    level: 3,
    question:
      "Demo 里拖「光源方位」时，立方体各面的明暗在滑动，本质上改变的是哪个量？",
    answer:
      "改变的是各面法线 N 与「指向光源方向」L 的夹角，进而改变 `dot(N, L)`（漫反射强度）。光源挪动 → L 方向变 → 各面 N·L 重新分布 → 明暗在立方体上滑动。这正是 §3 漫反射那张图在立方体上的实况。",
    tags: ["漫反射", "改Demo"],
  },
  {
    id: "bl-59",
    chapter: "basic-lighting",
    level: 3,
    question:
      "在 Demo 里把「环境强度」拉到 0、「光源方位」转到背面，背光面正确应呈现什么？若呈现别的暗色说明什么？",
    answer:
      "正确应是纯黑（环境归零、漫反射被 max 截成 0、无托底）。若背光面呈现诡异暗色/串色而非纯黑，说明漫反射可能漏了 `max`，背光面的负值把颜色往下减了——这是一个可在 Demo 里亲手触发的自检。",
    tags: ["漫反射", "max", "改Demo"],
  },
  {
    id: "bl-60",
    chapter: "basic-lighting",
    level: 3,
    question:
      "CPU 侧每帧要把哪些量作为 uniform 传给片段着色器，才能算完整冯氏光照？",
    answer:
      "至少要传 `lightPos`（光源世界位置）、`viewPos`（相机世界位置）、`lightColor`（光色）、`objectColor`（物体色）。若把法线矩阵在 CPU 预算，还要传那个 `mat3`；顶点着色器另需 `model/view/projection`。",
    tags: ["uniform", "流程", "应用"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 边界） ──
  {
    id: "bl-61",
    chapter: "basic-lighting",
    level: 4,
    question:
      "立方体被拉长/压扁（不等比缩放）后明暗变得不对劲——本该亮的面发暗、阴阳怪气。原因和修法是什么？",
    answer:
      "原因：直接用模型矩阵变换了法线，不等比缩放会让法线不再垂直于表面，N·L 全算错。修法：法线一律用法线矩阵 `mat3(transpose(inverse(model)))` 变换，别直接乘 `model`；实战中在 CPU 预算好当 uniform 传入。",
    tags: ["法线矩阵", "陷阱"],
  },
  {
    id: "bl-62",
    chapter: "basic-lighting",
    level: 4,
    question:
      "光源没动，转一下物体明暗却乱跳、深浅整体不对。最可能的原因是什么？怎么修？",
    answer:
      "最可能是法线（或光线方向）没归一化就拿去点乘了——点乘里混进了向量长度，结果不再是纯粹的夹角余弦，物体一转、插值后的法线长度一变，明暗就乱跳。修法：法线、`lightDir`、`viewDir` 用前都 `normalize` 一遍。",
    tags: ["法线归一化", "陷阱"],
  },
  {
    id: "bl-63",
    chapter: "basic-lighting",
    level: 4,
    question:
      "物体背光面不是变黑，反而出现诡异的发暗/串色/比环境光还暗。原因和修法？",
    answer:
      "原因：漫反射漏了 `max(…, 0.0)`——背光面 N·L 是负数，负的漫反射叠进 `(ambient + diffuse + specular)` 把颜色往下减，画面发脏。修法：漫反射一律写 `max(dot(norm, lightDir), 0.0)` 把负值截成 0。",
    tags: ["漫反射", "max", "陷阱"],
  },
  {
    id: "bl-64",
    chapter: "basic-lighting",
    level: 4,
    question:
      "高光那块亮斑位置不对、乱漂，或随你转视角该动时不动。原因和修法？",
    answer:
      "原因：镜面在错误的空间里算，或 `viewPos` 填错（不是相机的世界空间位置，比如误填 `(0,0,0)`），`viewDir` 一错 R·V 就全错。修法：保证 `FragPos`、`lightPos`、`viewPos` 同在世界空间且 `viewPos` 是相机真实位置；`reflect` 入射记得传 `-lightDir`。",
    tags: ["镜面光照", "世界空间", "陷阱"],
  },
  {
    id: "bl-65",
    chapter: "basic-lighting",
    level: 4,
    question:
      "把光照算在「观察空间」（相机为原点）也能行，但若混着用——`FragPos` 在世界空间、`viewPos` 却填 `(0,0,0)`——会怎样？这说明什么原则？",
    answer:
      "会算错：`(0,0,0)` 是观察空间的相机位置，拿去和世界空间的 `FragPos` 相减，`viewDir` 方向全错、高光乱漂。说明的原则是：光照里所有参与比较的位置/方向必须在同一空间，可以选世界空间也可以选观察空间，但绝不能混用。",
    tags: ["世界空间", "镜面光照", "综合"],
  },
  {
    id: "bl-66",
    chapter: "basic-lighting",
    level: 4,
    question: "完整串一遍：从顶点数据到屏幕上一个像素的冯氏颜色，经过哪几环？",
    answer:
      "顶点着色器算 `gl_Position`、并把世界位置 `FragPos` 和法线矩阵变换后的 `Normal` 递出 → 光栅化把 `FragPos`/`Normal` 逐片段插值 → 片段着色器 `normalize` 法线、求 `lightDir`/`viewDir`，算 ambient（常量×光色）、diffuse（max(N·L,0)×光色）、specular（pow(max(R·V,0),s)×强度×光色）→ 三块相加 × `objectColor` 写入 `FragColor`。",
    tags: ["冯氏光照", "流程", "综合"],
  },
  {
    id: "bl-67",
    chapter: "basic-lighting",
    level: 4,
    question:
      "若只实现环境光 + 漫反射、完全去掉镜面，画面会缺什么？什么物体看起来会「最不对劲」？",
    answer:
      "会缺光泽/高光——物体看起来像哑光、粉笔或橡皮泥，有立体明暗但没有任何反光点。最不对劲的是本该光滑反光的物体：金属、抛光塑料、湿润表面，少了那块刺眼高光会显得「假、没材质感」。",
    tags: ["镜面光照", "冯氏光照", "综合"],
  },
  {
    id: "bl-68",
    chapter: "basic-lighting",
    level: 4,
    question:
      "把漫反射写成 `diff = dot(norm, lightDir)`（漏 max），在背光面会算出什么？为什么让画面发脏？正确写法？",
    answer:
      "背光面 N 与 L 夹角大于 90°，`dot(norm, lightDir)` 为负（余弦在 90°~180° 为负）。负的 `diff` 乘光色后是「负的漫反射」，叠进 `(ambient + diffuse + specular)` 把环境底色往下减，于是背光面比纯环境光还暗、出现不该有的暗色/串色。正确写 `max(dot(norm, lightDir), 0.0)`。",
    tags: ["漫反射", "max", "综合"],
  },
  {
    id: "bl-69",
    chapter: "basic-lighting",
    level: 4,
    question:
      "镜面公式里若漏掉 `max`、直接 `pow(dot(viewDir, reflectDir), 16.0)`（偶数指数），背离反射方向的面可能出什么诡异现象？",
    answer:
      "`dot` 为负时，偶数次方会把负值变成正值，于是本该没有高光的「背反射方向」一侧也冒出虚假高光（甚至和正面对称地亮起来）。所以镜面也要先 `max(…, 0.0)` 截掉负值，再 `pow`。",
    tags: ["镜面光照", "max", "陷阱"],
  },
  {
    id: "bl-70",
    chapter: "basic-lighting",
    level: 4,
    question:
      "镜面强度和高光指数都调到很大，立方体上却看不到明显高光，可能是什么原因？",
    answer:
      "常见原因：①光源方位让反射方向 R 没朝向相机，当前视角接不到高光——转一转「光源方位」或视角试试；②`viewPos`/`FragPos` 不在同一空间或 `viewPos` 填错，R·V 算错；③法线没归一化或没用法线矩阵，反射方向本身就偏了。先排查空间一致与归一化，再调视角。",
    tags: ["镜面光照", "陷阱", "综合"],
  },
  {
    id: "bl-71",
    chapter: "basic-lighting",
    level: 4,
    question:
      "为什么说漫反射只用 `max(N·L, 0)`、镜面却要在 `max(R·V, 0)` 外再套一层 `pow`？两层「截负 / 乘方」的分工是什么？",
    answer:
      "`max(…, 0)` 是两者共用的「防负保护」，处理背光/背反射方向的负值。漫反射的明暗本就随 `cosθ` 线性铺开，不需额外塑形，所以到此为止。镜面要的是「集中的小亮斑」，必须用 `pow` 把 0~1 的 `R·V` 往 1 端猛压、其余迅速衰减，才挤出锐利高光——这是镜面独有的塑形步骤。",
    tags: ["漫反射", "镜面光照", "综合"],
  },
  {
    id: "bl-72",
    chapter: "basic-lighting",
    level: 4,
    question:
      "Demo 里同一个立方体，光源方位不变，你绕着它走一圈观察。漫反射明暗和镜面高光各会怎样变化？为什么？",
    answer:
      "漫反射明暗不变——它只取决于各面 N 与 L 的夹角，与观察者位置无关。镜面高光会移动甚至消失——它取决于反射方向 R 与观察方向 V 的贴合度，你走动时 V 在变，只有走到「正对某面反射方向」时才在那面看到高光。这正是两块「是否随视角变」的本质区别。",
    tags: ["漫反射", "镜面光照", "综合"],
  },
  {
    id: "bl-73",
    chapter: "basic-lighting",
    level: 4,
    question:
      "整个物体（含正对光的面）都偏暗、像隔了层灰，光源明明很近。把镜面/漫反射代码排除后，最可能是哪个量出了问题？",
    answer:
      "最可能是 `objectColor` 或 `lightColor` 给得偏暗——三块光照之和会整体乘 `objectColor`，物体色本身暗、或光色暗，再正对光也亮不起来。也可能环境光占比相对偏高把对比压平。先核对这两个 uniform 的取值，再看是否各面 N·L 都偏小（光源虽近但方位偏）。",
    tags: ["冯氏光照", "总装", "综合"],
  },
  {
    id: "bl-74",
    chapter: "basic-lighting",
    level: 4,
    question:
      "有人把 `viewDir` 写成从眼睛指向表面 `normalize(FragPos - viewPos)`（方向反了），其余不变。镜面高光会怎样？",
    answer:
      "`viewDir` 整体掉头，`dot(viewDir, reflectDir)` 在本该出高光（V 贴近 R）的地方反而变负、被 `max` 截成 0，于是该亮的视角看不到高光；而在背面某些角度可能凑出正值，冒出位置错误的高光。修法：`viewDir` 必须是从表面指向眼睛 `normalize(viewPos - FragPos)`。",
    tags: ["镜面光照", "viewDir", "陷阱"],
  },
  {
    id: "bl-75",
    chapter: "basic-lighting",
    level: 4,
    question:
      "一个面正对光源、漫反射应当很亮，实际却几乎全黑（环境光正常）。从法线角度排查，可能是哪两类问题？",
    answer:
      "一是法线方向反了（指向内侧而非外侧），正对光时 N·L 反而为负、被 max 截成 0；二是法线没传对/没归一化或没用法线矩阵，导致 N 方向偏离表面真实朝向，N·L 算小。排查：检查法线数据朝向、顶点着色器是否用 `mat3(transpose(inverse(model)))` 变换、片段里是否 `normalize(Normal)`。",
    tags: ["漫反射", "法线", "陷阱"],
  },
  {
    id: "bl-76",
    chapter: "basic-lighting",
    level: 4,
    question:
      "若把片段着色器里的 `ambient`、`diffuse`、`specular` 三块都不乘 `lightColor`、只在最后整体乘一次 `lightColor`，结果和原来一样吗？",
    answer:
      "一样。三块都线性地乘同一个 `lightColor`，由乘法分配律，`(a·Lc + d·Lc + s·Lc) = (a + d + s)·Lc`，提到括号外一次乘等价。原代码逐块乘只是表达「每块都是对到达光的近似」更直观；真正不能合并的是 `objectColor`——它和 `lightColor` 是两层不同的乘，对应「光色 × 物色」。",
    tags: ["冯氏光照", "总装", "综合"],
  },
];
