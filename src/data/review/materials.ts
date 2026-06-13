/** 复习题库 · 材质（materials）。Phase B 各章独立文件，避免并行写冲突。 */

import type { ReviewQuestion } from "./types";

export const materialsQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / 结构 / 数值约定） ──
  {
    id: "mt-1",
    chapter: "materials",
    level: 1,
    question: "什么是「材质」？它描述的是物体的哪一面？",
    answer:
      "材质是描述一个物体表面「怎么反光」的一组属性，是物体的「反光说明书」。它不管物体的形状，只管表面在环境/漫反射/镜面三项上反射什么颜色、反射多少。换一套材质数值，同一束光下物体就从金属变成塑料、橡胶。",
    tags: ["材质", "定义"],
  },
  {
    id: "mt-2",
    chapter: "materials",
    level: 1,
    question: "一份材质由哪四样东西组成？",
    answer:
      "环境色（ambient）、漫反射色（diffuse）、镜面色（specular）三种颜色，外加一个反光度（shininess）。前三样都是颜色（红绿蓝三个数），最后一样是单个数。",
    tags: ["材质", "Material 结构体"],
  },
  {
    id: "mt-3",
    chapter: "materials",
    level: 1,
    question:
      "GLSL 里 `Material` 结构体的四个成员分别是什么类型（`vec3` 还是 `float`）？",
    answer:
      "`ambient`、`diffuse`、`specular` 三个都是 `vec3`（各是一种颜色，含 RGB 三个分量）；`shininess` 是一个 `float`（单个数）。",
    tags: ["Material 结构体", "GLSL"],
  },
  {
    id: "mt-4",
    chapter: "materials",
    level: 1,
    question: "材质里的 `diffuse`（漫反射色）大致决定了物体的什么？",
    answer:
      "决定物体的主色调，也就是「它看起来是什么颜色的」。漫反射是正对光源那一面的主要颜色，所以它最贴近我们说一个物体「是红的、是绿的」时指的那个颜色。",
    tags: ["Material 结构体", "diffuse"],
  },
  {
    id: "mt-5",
    chapter: "materials",
    level: 1,
    question: "材质里的 `ambient`（环境色）是什么意思？",
    answer:
      "是物体在底光（四面八方的环境光）下显出的基色。它对应 Phong 三项里的环境项，给物体一个不至于全黑的最低亮度。通常它和 `diffuse` 取相近的颜色。",
    tags: ["Material 结构体", "ambient"],
  },
  {
    id: "mt-6",
    chapter: "materials",
    level: 1,
    question: "材质里的 `specular`（镜面色）影响的是哪一块？",
    answer:
      "影响高光那一小块反射出的颜色。塑料的高光多是白色，金属的高光常带本色（如金子的高光偏暖）。它和反光度一起决定高光看起来什么样。",
    tags: ["Material 结构体", "specular"],
  },
  {
    id: "mt-7",
    chapter: "materials",
    level: 1,
    question: "什么是「反光度」（`shininess`）？它管的是高光的什么？",
    answer:
      "反光度是一个数，控制镜面高光的大小和锐利程度。数值越高，高光越小越集中越锐利（像光滑金属的小亮点）；数值越低，高光越大越散越柔（像哑光橡胶上糊开的一片）。在着色器里它是 `pow(..., shininess)` 的指数。",
    tags: ["反光度", "shininess", "定义"],
  },
  {
    id: "mt-8",
    chapter: "materials",
    level: 1,
    question: "什么是 `Light` 结构体？它装的是哪几样东西？",
    answer:
      "`Light` 结构体描述「光本身」的属性，和材质一一对应：`ambient`（环境强度）、`diffuse`（漫反射强度）、`specular`（镜面强度）三项强度，外加 `position`（光源位置）。三项强度也都是 `vec3`。",
    tags: ["Light 结构体", "定义"],
  },
  {
    id: "mt-9",
    chapter: "materials",
    level: 1,
    question: "材质的三种色和光的三项强度是怎么对应的？",
    answer:
      "一一对应：材质有环境色/漫反射色/镜面色，光就有环境强度/漫反射强度/镜面强度。计算时同名的两项相乘——环境配环境、漫反射配漫反射、镜面配镜面。",
    tags: ["Material 结构体", "Light 结构体"],
  },
  {
    id: "mt-10",
    chapter: "materials",
    level: 1,
    question: "GLSL 里怎么把一个 `Material` 结构体作为 uniform 声明出来？",
    answer:
      "先定义 `struct Material { vec3 ambient; vec3 diffuse; vec3 specular; float shininess; };`，再写一句 `uniform Material material;`。之后着色器里就能用 `material.diffuse`、`material.shininess` 取各成员。",
    tags: ["Material 结构体", "uniform"],
  },
  {
    id: "mt-12",
    chapter: "materials",
    level: 1,
    question: "材质三种颜色每个分量的合法取值范围是多少？",
    answer:
      "本该在 0~1 之间（红绿蓝各一个 0~1 的数）。超过 1 会让那块直接顶到过曝、惨白，所以照抄预设表时别把数值加倍。",
    tags: ["材质", "数值范围"],
  },
  {
    id: "mt-13",
    chapter: "materials",
    level: 1,
    question: "什么是「材质预设」？它解决了什么麻烦？",
    answer:
      "材质预设是前人测好的一批现成材质数值，每一行给出一种真实材料（翡翠、金、橡胶等）的 ambient/diffuse/specular 三色和 shininess 反光度。照抄整行灌进 uniform，物体立刻有了对应质感，不必自己一个个试数。",
    tags: ["材质预设", "定义"],
  },
  {
    id: "mt-14",
    chapter: "materials",
    level: 1,
    question: "在着色器里取材质的镜面色和反光度，分别写成什么？",
    answer:
      "镜面色写 `material.specular`（一个 `vec3`），反光度写 `material.shininess`（一个 `float`）。都是用「结构体名.成员名」的点号写法访问。",
    tags: ["Material 结构体", "GLSL"],
  },
  {
    id: "mt-15",
    chapter: "materials",
    level: 1,
    question: "材质这一章承接的是上一章的哪个光照模型？",
    answer:
      "承接 Phong 光照模型。Phong 把光分成环境（ambient）、漫反射（diffuse）、镜面（specular）三项；材质这一章给这三项各配一个「表面反射什么颜色」，并把每项的固定颜色升级成「材质色 × 光强」。",
    tags: ["材质", "Phong"],
  },
  {
    id: "mt-16",
    chapter: "materials",
    level: 1,
    question: "光的 `position` 成员放在哪个结构体里？它是新东西吗？",
    answer:
      "放在 `Light` 结构体里（`vec3 position`）。它不是新东西，上一章基础光照里就用过——表示光源在世界空间的位置，用来算从片段指向光源的方向 `lightDir`。",
    tags: ["Light 结构体", "position"],
  },
  {
    id: "mt-17",
    chapter: "materials",
    level: 1,
    question:
      "GLSL 的 `struct` 写法在桌面 OpenGL（`#version 330 core`）和 WebGL2（`#version 300 es`）之间一样吗？",
    answer:
      "`struct` 的写法两端完全一样，是 GLSL 语言本身的特性、不分平台。平台差异只在版本声明那行，以及 WebGL2 片段着色器必须多写一行 `precision highp float;`。",
    tags: ["GLSL", "API差异"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "mt-18",
    chapter: "materials",
    level: 2,
    question: "为什么同一束光打在金戒指和黑橡胶上，看起来天差地别？",
    answer:
      "因为变的是表面「怎么反光」，不是光。金属几乎把光原样弹回、且集中在很小角度，于是又亮又有锐利高光；橡胶吸掉大半、只散散反射，高光摊成一大片、显得哑。要画出这种差别，得给每个物体配一套材质来描述它各自怎么反光。",
    tags: ["材质", "为什么"],
  },
  {
    id: "mt-19",
    chapter: "materials",
    level: 2,
    question:
      "为什么 Phong 三项每一项都要写成「材质色 × 光强」，而不是直接写一个颜色？",
    answer:
      "这是「颜色」那一章规则「你看到的 = 光色 × 物色」用到三项上各乘一遍。拆成两个因子后，光和材质能各调各的：调光只动 Light 三项，调质感只动 Material 四样，互不打架。两者相乘才是真正反射进眼睛的颜色。",
    tags: ["材质", "Light 结构体", "为什么"],
  },
  {
    id: "mt-20",
    chapter: "materials",
    level: 2,
    question: "反光度 `shininess` 是怎么通过 `pow` 控制高光大小的？",
    answer:
      "镜面项里有一句 `pow(max(dot(viewDir, reflectDir), 0.0), shininess)`。指数 `shininess` 越大，只有反射方向几乎正对视线时这个幂才接近 1、高光才亮，于是高光被压成一个小锐点；指数小时，稍微偏一点幂也不小，高光就铺开成一大片。",
    tags: ["反光度", "shininess", "机制"],
  },
  {
    id: "mt-21",
    chapter: "materials",
    level: 2,
    question: "为什么 `Light` 的环境强度通常调得很低、镜面强度通常拉到最强？",
    answer:
      "环境光是四面八方都有的底光，调高了整个物体会发灰、丢掉明暗层次；镜面是那一小块高光，拉满才够亮够「精神」。所以环境压低、漫反射中等、镜面拉到 `(1,1,1)` 是常见配法。",
    tags: ["Light 结构体", "为什么"],
  },
  {
    id: "mt-22",
    chapter: "materials",
    level: 2,
    question:
      "`material.specular` 和 `light.specular` 名字几乎一样，各自描述什么？",
    answer:
      "`material.specular` 描述「这个表面在镜面项上反射什么颜色」（表面怎么反）；`light.specular` 描述「光的镜面项有多强」（光多强）。一个属于表面、一个属于光，计算时两者相乘才得到高光真正的颜色。",
    tags: ["Material 结构体", "Light 结构体", "对比"],
  },
  {
    id: "mt-23",
    chapter: "materials",
    level: 2,
    question: "为什么把材质和光分成两套结构体，而不是合并成一套数？",
    answer:
      "为了两边能各调各的：换物体质感（金属↔橡胶）只动 `material`，调场景明暗（光强弱）只动 `light`，互不干扰。如果合并，调一个就会牵动另一个，没法干净地「只换材质」或「只调光」。",
    tags: ["Material 结构体", "Light 结构体", "为什么"],
  },
  {
    id: "mt-24",
    chapter: "materials",
    level: 2,
    question:
      "为什么金属类材质（金、翡翠、红宝石）的反光度普遍偏高，橡胶偏低？",
    answer:
      "金属、宝石表面光滑，反射集中在很小角度，所以高光小而锐，需要高反光度（约 51~77）；橡胶表面粗糙，反射散开，高光摊成一大片、显哑，对应低反光度（约 10）。反光度高低直接对上「表面光滑还是粗糙」。",
    tags: ["材质预设", "反光度", "为什么"],
  },
  {
    id: "mt-25",
    chapter: "materials",
    level: 2,
    question: "为什么这个 Demo 改不出「黑橡胶」「绿翡翠」这种不同颜色的材质？",
    answer:
      "因为 Demo 的物体颜色是固定的，三个滑块只控制环境强度、镜面强度、高光指数（光泽感那一半）。材质的另一半——颜色（diffuse 等）——得靠 §6 的材质预设表把 `material.diffuse` 设成对应色，Demo 不改色。",
    tags: ["材质", "Demo"],
  },
  {
    id: "mt-26",
    chapter: "materials",
    level: 2,
    question:
      "把同样的反光度配上不同的 `diffuse` 颜色，会得到什么？这说明质感由哪两半组成？",
    answer:
      "会得到同样光泽感、但颜色不同的物体（比如都很光滑，但一红一蓝）。这说明质感是两半组成的：一半是光泽感（由反光度和镜面决定光滑还是哑），一半是颜色（由 ambient/diffuse/specular 三色决定是什么色）。",
    tags: ["材质", "质感"],
  },
  {
    id: "mt-27",
    chapter: "materials",
    level: 2,
    question: "漫反射项里除了「光强 × 材质色」，为什么还要多乘一个 `diff`？",
    answer:
      "因为漫反射的亮度取决于表面有多正对光源。`diff = max(dot(norm, lightDir), 0.0)`（就是上一章的 `N·L`），面越正对光源越接近 1、越亮，背对则为 0。它是材质这一章新加进来之前就有的几何因子，材质只是把固定颜色换成 `material.diffuse`。",
    tags: ["diffuse", "机制"],
  },
  {
    id: "mt-28",
    chapter: "materials",
    level: 2,
    question: "想让物体严格按预设表显示质感，光的三项强度该设成多少？为什么？",
    answer:
      "都设成 `(1,1,1)`。因为每一项是 `light.X * material.X`，光强全为 1 时相乘等于不缩放，物体颜色就严格由材质决定，方便核对预设表是否照对了。",
    tags: ["材质预设", "Light 结构体", "为什么"],
  },
  {
    id: "mt-29",
    chapter: "materials",
    level: 2,
    question:
      "为什么镜面色 `material.specular` 对塑料常设成灰白、对金属常带本色？",
    answer:
      "塑料、橡胶这类非金属的高光基本是光源颜色（多为白），所以镜面色设成灰白；金属反射时会给反射光染上自身的金属本色（如金子高光偏暖），所以镜面色带本色。这是预设表里金属与塑料镜面色不同的原因。",
    tags: ["Material 结构体", "specular", "材质预设"],
  },
  {
    id: "mt-31",
    chapter: "materials",
    level: 2,
    question:
      '为什么 CPU 侧定位结构体成员要用带点的名字（如 `"material.diffuse"`）？',
    answer:
      '因为 GLSL 把结构体的每个成员当成独立的 uniform 暴露给外部，名字就是「结构体名.成员名」。所以拿位置时要按 `"material.diffuse"`、`"light.specular"` 这样的字符串查，不能只写 `"material"`。',
    tags: ["uniform", "CPU 侧", "API"],
  },
  {
    id: "mt-32",
    chapter: "materials",
    level: 2,
    question:
      "为什么材质的 `ambient` 和 `diffuse` 在预设表里大多取相近的颜色？",
    answer:
      "因为环境项只是物体在四面八方底光下显出的基色，本就该和它正面受光时的主色调一致或接近——同一块红橡胶在暗处也还是红的。所以预设表里 `ambient` 常取 `diffuse` 的同色或略暗版，而不是另设一个无关的颜色。",
    tags: ["Material 结构体", "ambient", "diffuse"],
  },
  {
    id: "mt-33",
    chapter: "materials",
    level: 2,
    question:
      "环境项 `light.ambient * material.ambient` 为什么不像漫反射那样乘 `diff`？",
    answer:
      "因为环境光代表四面八方、不分方向的底光，跟表面是否正对光源无关，所以不乘几何因子 `diff`，直接两色相乘即可。漫反射、镜面才依赖方向，分别乘 `diff` 和 `spec`。",
    tags: ["ambient", "机制"],
  },
  {
    id: "mt-34",
    chapter: "materials",
    level: 2,
    question: "为什么颜色用 `uniform3f`、反光度用 `uniform1f`，不能混用？",
    answer:
      "因为颜色是 `vec3`（三个分量），要用 3f 系列一次灌三个数；反光度是单个 `float`，用 1f 系列灌一个数。类型和后缀必须对上着色器里的声明，否则灌不进去或报错。",
    tags: ["uniform", "API"],
  },
  {
    id: "mt-35",
    chapter: "materials",
    level: 2,
    question: "为什么说「调质感不用懂物理」？材质预设是怎么让这件事变简单的？",
    answer:
      "因为「哪几个数配出金、哪几个配出橡胶」是前人已经测好的经验值，列成了材质预设表。你只要照抄表里某一行的 ambient/diffuse/specular/shininess 灌进 uniform，物体就有了对应质感，不必从光学原理推导。",
    tags: ["材质预设", "为什么"],
  },

  // ── L3 应用（读代码 / 给参数判结果 / 照抄预设 / 小推断） ──
  {
    id: "mt-37",
    chapter: "materials",
    level: 3,
    question:
      "想在 Demo 里调出「高反光的光滑金属感」（锐利小高光），三个滑块怎么动？",
    answer:
      "把高光指数拉到很高（如 256）、镜面强度拉满（1.0）、环境强度压低。高指数让 `pow(..., shininess)` 只在反射方向几乎正对视线时才亮，高光收成锐点；镜面拉满让这点够亮——合起来就是光滑金属/抛光面。",
    tags: ["Demo", "shininess", "应用"],
  },
  {
    id: "mt-38",
    chapter: "materials",
    level: 3,
    question:
      "想在 Demo 里调出「哑光橡胶感」（高光摊成一大片），三个滑块怎么动？",
    answer:
      "把高光指数压到很低（如 8）、镜面强度调小。低指数让稍微偏一点也还亮，高光铺成一大片、边缘模糊；镜面小让它整体不刺眼——合起来就是哑光橡胶感。（颜色这一维 Demo 改不了。）",
    tags: ["Demo", "shininess", "应用"],
  },
  {
    id: "mt-39",
    chapter: "materials",
    level: 3,
    question:
      "已知 `norm`、`lightDir`、`viewDir` 都算好了，写出镜面项那几行 GLSL。",
    answer:
      "`vec3 reflectDir = reflect(-lightDir, norm);` 求反射方向；`float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);` 反光度当指数；`vec3 specular = light.specular * (spec * material.specular);` 光镜面强度 ×（次方 × 材质镜面色）。",
    tags: ["specular", "GLSL", "应用"],
  },
  {
    id: "mt-40",
    chapter: "materials",
    level: 3,
    question:
      "写出漫反射项那几行 GLSL（从 `material`、`light` 出发，已知 `norm`、`lightDir`）。",
    answer:
      "`float diff = max(dot(norm, lightDir), 0.0);` 算面朝光源的程度；`vec3 diffuse = light.diffuse * (diff * material.diffuse);` 光漫反射强度 ×（朝向程度 × 材质漫反射色）。",
    tags: ["diffuse", "GLSL", "应用"],
  },
  {
    id: "mt-41",
    chapter: "materials",
    level: 3,
    question:
      "环境项 `vec3 ambient = light.ambient * material.ambient;` 里两个量各代表什么？",
    answer:
      "`light.ambient` 是光的环境强度（通常很低，如 `(0.2,0.2,0.2)`）；`material.ambient` 是材质的环境色（物体底光下的基色）。两者逐分量相乘，得到环境项贡献的颜色。",
    tags: ["ambient", "读代码", "应用"],
  },
  {
    id: "mt-42",
    chapter: "materials",
    level: 3,
    question:
      "照抄预设表「金 Gold」一行，CPU 侧灌 `material` 的四句大概怎么写（C++）？",
    answer:
      '`shader.setVec3("material.ambient", 0.24725f, 0.1995f, 0.0745f);`、`shader.setVec3("material.diffuse", 0.75164f, 0.60648f, 0.22648f);`、`shader.setVec3("material.specular", 0.62828f, 0.5558f, 0.36607f);`、`shader.setFloat("material.shininess", 51.2f);`。',
    tags: ["材质预设", "CPU 侧", "应用"],
  },
  {
    id: "mt-43",
    chapter: "materials",
    level: 3,
    question: "WebGL2 里给 `material.shininess` 灌值 32，那一句怎么写？",
    answer:
      '先拿位置 `const loc = gl.getUniformLocation(program, "material.shininess");`，再 `gl.uniform1f(loc, 32.0);`。反光度是单个 `float`，必须用 1f 系列（`uniform1f`），别用 3f。',
    tags: ["shininess", "CPU 侧", "WebGL2"],
  },
  {
    id: "mt-44",
    chapter: "materials",
    level: 3,
    question:
      'C++ 的 `shader.setVec3("material.diffuse", ...)` 内部其实做了哪两步？',
    answer:
      '内部先 `glGetUniformLocation(program, "material.diffuse")` 拿到该 uniform 的位置，再 `glUniform3f(位置, r, g, b)` 把三个分量写进去。`setVec3` 只是把这两步封装成一个辅助函数。',
    tags: ["CPU 侧", "API", "读代码"],
  },
  {
    id: "mt-45",
    chapter: "materials",
    level: 3,
    question: "把高光指数从 8 调到 256，物体表面的高光会怎么变化？",
    answer:
      "高光会从一大片糊开的微光，收缩成一个小而锐利的亮点。指数越大，只有反射方向几乎正对视线才亮，于是高光越集中——视觉上从哑光橡胶感变成光滑金属/抛光感。",
    tags: ["shininess", "Demo", "应用"],
  },
  {
    id: "mt-46",
    chapter: "materials",
    level: 3,
    question:
      "对照预设表，「绿橡胶 Green」的 shininess 是 10、「红宝石 Ruby」是 76.8。仅凭这两个数，你能推断它们高光的差别吗？",
    answer:
      "能。红宝石反光度高（76.8），高光小而锐、像光滑宝石；绿橡胶反光度低（10），高光大而散、显哑。反光度直接对上高光的大小与锐利度，数越大高光越小越锐。",
    tags: ["材质预设", "shininess", "应用"],
  },
  {
    id: "mt-47",
    chapter: "materials",
    level: 3,
    question: "想从「珊瑚红塑料」换成「翡翠」，CPU 侧需要重灌哪几个 uniform？",
    answer:
      "重灌 `material` 那四个：`material.ambient`、`material.diffuse`、`material.specular`、`material.shininess`，照抄翡翠那一行的四样数即可。`light` 三项不必动（除非也想顺便调光）。",
    tags: ["材质预设", "CPU 侧", "应用"],
  },
  {
    id: "mt-48",
    chapter: "materials",
    level: 3,
    question:
      "光设成 `light.diffuse = (0.5,0.5,0.5)`、材质 `material.diffuse = (1.0,0.5,0.31)`，正对光源（`diff=1`）时漫反射项算出来是多少？",
    answer:
      "逐分量相乘：`light.diffuse * (diff * material.diffuse)` = `(0.5,0.5,0.5) * (1.0,0.5,0.31)` = `(0.5, 0.25, 0.155)`。这是该片段漫反射项贡献的颜色。",
    tags: ["diffuse", "计算", "应用"],
  },
  {
    id: "mt-49",
    chapter: "materials",
    level: 3,
    question:
      "WebGL2 片段着色器里声明 `Material`，除了 `struct` 本体外开头必须多写哪一行？",
    answer:
      "必须在开头写 `#version 300 es` 之后补一行 `precision highp float;`。WebGL2 片段着色器没有默认浮点精度，不写这行编译直接失败；桌面 OpenGL（`#version 330 core`）不需要。",
    tags: ["GLSL", "WebGL2", "precision"],
  },
  {
    id: "mt-50",
    chapter: "materials",
    level: 3,
    question:
      "把光三项都设成 `(1,1,1)`、材质 `specular = (0.5,0.5,0.5)`，某片段 `spec`（pow 结果）算得 0.8，镜面项颜色是多少？",
    answer:
      "`light.specular * (spec * material.specular)` = `(1,1,1) * (0.8 * (0.5,0.5,0.5))` = `(0.4, 0.4, 0.4)`。光强为 1 时不缩放，结果就是 `spec` 乘材质镜面色。",
    tags: ["specular", "计算", "应用"],
  },
  {
    id: "mt-51",
    chapter: "materials",
    level: 3,
    question: "想把一块塑料的高光从「灰白」改成「偏蓝」，该动材质的哪个成员？",
    answer:
      "动 `material.specular`，把它从灰白（如 `(0.5,0.5,0.5)`）改成偏蓝（如 `(0.3,0.3,0.7)`）。镜面色就是高光那一小块反射出的颜色，改它就改高光的色调，不影响主色调 `diffuse`。",
    tags: ["specular", "应用"],
  },
  {
    id: "mt-52",
    chapter: "materials",
    level: 3,
    question:
      "片段着色器里只写了环境项、漏掉了漫反射和镜面，物体会显示成什么样？",
    answer:
      "整个物体显示成一片均匀的暗色（`light.ambient * material.ambient`），没有随朝向变化的明暗、也没有高光——看起来像一块没有立体感的平板色块。漫反射给明暗、镜面给高光，缺了它们立体感和光泽就都没了。",
    tags: ["Phong", "ambient", "应用"],
  },
  {
    id: "mt-53",
    chapter: "materials",
    level: 3,
    question:
      "对照预设表，怎么看出「金 Gold」的镜面会带暖色，而「青塑料 Cyan」的镜面是中性灰？",
    answer:
      "看 specular 一列：金的 specular 约 `(0.628, 0.556, 0.366)`，R>G>B，偏暖（金属本色）；青塑料的 specular 约 `(0.502, 0.502, 0.502)`，三分量几乎相等，是中性灰（塑料高光偏白）。镜面色的 RGB 比例决定高光色调。",
    tags: ["材质预设", "specular", "应用"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 边界） ──
  {
    id: "mt-54",
    chapter: "materials",
    level: 4,
    question:
      "照抄「金」那一行时把镜面色误填成 `(2, 2, 2)`，物体会出什么毛病？为什么？根治办法？",
    answer:
      "高光那块会整片过曝、惨白，看不清颜色和明暗。因为颜色分量本该在 0~1，填 2 会把那块直接顶到纯白（超出可显示上限）。根治：检查 `material.specular` 等三色每个分量都 ≤ 1，照抄预设表别加倍。",
    tags: ["specular", "陷阱", "过曝"],
  },
  {
    id: "mt-55",
    chapter: "materials",
    level: 4,
    question:
      "调了半天分不清效果到底是「光变了」还是「材质变了」，越调越乱。原因和理清办法是什么？",
    answer:
      "原因是把 `light.ambient/diffuse/specular`（光多强）和 `material.ambient/diffuse/specular`（表面怎么反）搞混了——名字像但管的事不同。办法：想严格照预设显示质感就把 `light` 三项都设成 `(1,1,1)`，让效果只由材质决定；想调暗整体再单独动 `light`。两套分开调。",
    tags: ["Material 结构体", "Light 结构体", "陷阱"],
  },
  {
    id: "mt-56",
    chapter: "materials",
    level: 4,
    question: "把 `shininess` 设成 0（或极小），高光会怎样？为什么？怎么修？",
    answer:
      "高光会铺满整个物体一片白。因为 `pow(x, 0)` 恒等于 1，镜面项在每个片段上都拉满，高光不再收敛成点而是糊满整面。修：把 `shininess` 控制在常用区间（哑光约 8~32、光滑约 64~256），别用极端值。",
    tags: ["shininess", "陷阱", "边界"],
  },
  {
    id: "mt-57",
    chapter: "materials",
    level: 4,
    question:
      "把 `shininess` 设到上千，高光又会怎样？这是 §5 Demo 里能亲手触发的另一个极端吗？",
    answer:
      "高光会变得极尖极小，几乎采样不到、看上去像没有高光。这和指数为 0 时铺满整面是两个极端：到 Demo 把高光指数拖到最小看糊成一片、拖到 256 看收成锐点，正是这个坑的两头。常用区间在哑光 8~32、光滑 64~256 之间。",
    tags: ["shininess", "陷阱", "Demo"],
  },
  {
    id: "mt-58",
    chapter: "materials",
    level: 4,
    question:
      "只把 `material.diffuse` 改成深色想做「黑橡胶」，但物体还是亮、还带大高光。漏了哪些维度？",
    answer:
      "漏了反光度和镜面：橡胶要的是低 `shininess`（约 10）让高光摊开变哑，外加适中的镜面色，光泽感才对。只改 diffuse 只换了主色调（颜色那一半），没改光泽感那一半。质感要颜色 + 光泽两半都对上。",
    tags: ["材质", "shininess", "综合"],
  },
  {
    id: "mt-59",
    chapter: "materials",
    level: 4,
    question:
      "完整串一遍片段着色器算最终颜色的链路：从 `material`、`light` 到 `FragColor`，经过哪几步？",
    answer:
      "① 环境 `ambient = light.ambient * material.ambient`；② 漫反射：算 `diff = max(dot(norm,lightDir),0)`，得 `diffuse = light.diffuse * (diff * material.diffuse)`；③ 镜面：算 `reflectDir`、`spec = pow(max(dot(viewDir,reflectDir),0), material.shininess)`，得 `specular = light.specular * (spec * material.specular)`；④ `FragColor = vec4(ambient + diffuse + specular, 1.0)`。",
    tags: ["Phong", "流程", "综合"],
  },
  {
    id: "mt-60",
    chapter: "materials",
    level: 4,
    question:
      "CPU 侧灌 `material.diffuse` 时误用了 `uniform1f`（而非 `uniform3f`），会怎样？",
    answer:
      "灌不进去或报错——`material.diffuse` 是 `vec3`，得用 3f 系列一次给三个分量；用 1f 系列类型对不上，OpenGL 拒绝写入，该 uniform 拿不到正确值，物体颜色会异常（如保持默认或全黑）。颜色用 `uniform3f`、反光度才用 `uniform1f`。",
    tags: ["uniform", "陷阱", "API"],
  },
  {
    id: "mt-61",
    chapter: "materials",
    level: 4,
    question:
      'WebGL2 里 `gl.getUniformLocation(program, "material")`（只写结构体名，不带成员）能拿到位置吗？',
    answer:
      '拿不到（返回 `null`）。结构体本身不是一个可写的 uniform，能写的是它的各个成员，名字必须带点，如 `"material.diffuse"`、`"material.shininess"`。只写 `"material"` 定位不到任何东西，后续 `uniform*` 会失败。',
    tags: ["uniform", "陷阱", "WebGL2"],
  },
  {
    id: "mt-62",
    chapter: "materials",
    level: 4,
    question:
      "两个物体想用同一套着色器、不同材质，CPU 侧该怎么安排灌 uniform 和绘制的顺序？",
    answer:
      "在循环里：灌物体 A 的 `material.*` → 画 A；再灌物体 B 的 `material.*`（覆盖掉 A 的值）→ 画 B。uniform 是「当前程序的全局状态」，每次绘制前把当前物体的材质灌进去即可，无需多套程序。注意要先 `useProgram` 再灌。",
    tags: ["uniform", "流程", "综合"],
  },
  {
    id: "mt-63",
    chapter: "materials",
    level: 4,
    question:
      "想做「磨砂金属」——既有金属的暖色高光、又比抛光金属哑一些，材质四样大致怎么配？",
    answer:
      "diffuse/ambient 用金属暖色（如金子的暖黄）；specular 带暖色本色（不要纯白）；shininess 取中等偏低（如 32 左右，而非 128~256），让高光比抛光金属摊得开一点、显磨砂。颜色这一半给金属感，反光度这一半给「磨砂还是抛光」。",
    tags: ["材质预设", "shininess", "综合"],
  },
  {
    id: "mt-64",
    chapter: "materials",
    level: 4,
    question:
      "片段着色器里把镜面项写成 `light.specular * spec * material.diffuse`（误用 diffuse），高光会出什么问题？",
    answer:
      "高光会染上物体主色调而非镜面色——比如一块本该有白色高光的红塑料，高光会变成红色。因为镜面项的颜色本该由 `material.specular` 决定，误用 `material.diffuse` 让高光取了主色。修：镜面项必须乘 `material.specular`。",
    tags: ["specular", "diffuse", "陷阱"],
  },
  {
    id: "mt-65",
    chapter: "materials",
    level: 4,
    question:
      "为什么说光的三项强度全设 `(1,1,1)` 是「核对材质」的好基准，但不一定是好看的最终配置？",
    answer:
      "全 1 时颜色严格由材质决定，便于核对是否照对了预设表（基准用途）。但实际场景里环境光通常该压低（免得物体发灰、丢明暗），所以最终好看的配置往往是环境低、漫反射中等、镜面拉满，而非一律全 1。",
    tags: ["Light 结构体", "材质预设", "综合"],
  },
  {
    id: "mt-66",
    chapter: "materials",
    level: 4,
    question:
      "把材质三色都设成 `(1,1,1)`（纯白材质）、光三项也都 `(1,1,1)`，物体会显示成什么样？",
    answer:
      "显示成一个普通的白色物体：环境项让整体不全黑，漫反射项随朝向产生明暗，镜面项在反光度对应的范围里给一块白高光。因为材质不染色（全 1 不缩放），看到的完全是「光的形状」——这其实就是退回到没有材质着色、只有 Phong 几何明暗的样子。",
    tags: ["材质", "Phong", "边界"],
  },
  {
    id: "mt-67",
    chapter: "materials",
    level: 4,
    question:
      "想让一个物体「正面看是亮红、暗处也明显是红的」，材质四样里该重点配哪两样？为什么不是镜面色？",
    answer:
      "重点配 `diffuse`（正面主色调，设成亮红）和 `ambient`（暗处底色，设成同款红或略暗），这两样决定物体在受光和背光处的颜色。镜面色 `specular` 只管那一小块高光，配它改的是高光色调、不影响「整体是不是红的」。",
    tags: ["Material 结构体", "ambient", "diffuse"],
  },
  {
    id: "mt-68",
    chapter: "materials",
    level: 4,
    question:
      "两个相邻物体，A 用高反光度、B 用低反光度，其余材质和光都相同。视觉上怎么区分哪个是 A？",
    answer:
      "看高光：A（高反光度）的高光是一个小而锐、很亮的点，像抛光金属/塑料；B（低反光度）的高光摊成一大片、边缘模糊、不刺眼，像哑光橡胶/磨砂面。反光度只改高光的大小与锐利度，颜色和整体明暗两者一致。",
    tags: ["反光度", "shininess", "综合"],
  },
  {
    id: "mt-69",
    chapter: "materials",
    level: 4,
    question:
      "代码里 `reflect` 的第一个参数误写成 `lightDir`（漏了负号，本该 `reflect(-lightDir, norm)`），高光会怎样？",
    answer:
      "高光位置会算错——`reflect` 要的是「入射光线」方向（从光源射向片段，即 `-lightDir`），写成 `lightDir`（从片段指向光源）方向反了，反射方向随之偏掉，高光会出现在错误的位置或干脆看不到正确高光。修：第一个参数务必取 `lightDir` 的负方向。",
    tags: ["specular", "reflect", "陷阱"],
  },
];
