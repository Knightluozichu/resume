/** 复习题库 · 光照贴图（lighting-maps）。Phase B 各章独立文件，避免并行写冲突。 */

import type { ReviewQuestion } from "./types";

export const lightingMapsQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / 数值约定） ──
  {
    id: "lm-1",
    chapter: "lighting-maps",
    level: 1,
    question: "什么是「光照贴图」？它把上一章材质里的什么换掉了？",
    answer:
      "光照贴图就是用一张纹理图来逐片段地决定材质各项（底色、反光强弱等），取代上一章「整块物体共用一个常量」的做法。最常见两张：漫反射贴图（管各处底色）、镜面光贴图（管各处反不反光）。本质是把「纹理」和「材质」两章合到一起。",
    tags: ["光照贴图", "定义"],
  },
  {
    id: "lm-2",
    chapter: "lighting-maps",
    level: 1,
    question: "漫反射贴图（diffuse map）替换的是材质里的哪一项？",
    answer:
      "替换 `material.diffuse`——上一章它是一个常量 `vec3`（整块一色），现在改成一张图，每个片段拿自己的 UV 去采样，取出属于它那个部位的底色。于是木箱的木头、铁边能有各自的颜色。",
    tags: ["漫反射贴图", "material.diffuse"],
  },
  {
    id: "lm-3",
    chapter: "lighting-maps",
    level: 1,
    question:
      "镜面光贴图（specular map）替换的是材质里的哪一项？它通常是什么样的图？",
    answer:
      "替换 `material.specular`。它通常是一张灰度图：每个片段采样取出的明暗值，直接当作该处镜面高光的强度——亮处反光强、暗处不反光。木箱的钢边画成白、木头画成黑。",
    tags: ["镜面光贴图", "material.specular", "灰度"],
  },
  {
    id: "lm-4",
    chapter: "lighting-maps",
    level: 1,
    question: "镜面光贴图里，白色和黑色分别表示这一片反光强还是弱？",
    answer:
      "白（值接近 1.0）表示这里反光强，黑（值接近 0.0）表示这里不反光。这种「用一张图的明暗当强弱开关」的用法叫灰度遮罩。",
    tags: ["镜面光贴图", "灰度遮罩"],
  },
  {
    id: "lm-5",
    chapter: "lighting-maps",
    level: 1,
    question: "什么是「灰度遮罩」？",
    answer:
      "用一张灰度图（每个像素只有明暗、没有彩色）当作「强弱开关」：白（接近 1.0）表示该处效果强、黑（接近 0.0）表示该处效果弱或没有。镜面光贴图就是用它来控制各处反光强弱——白处反光强、黑处不反光。",
    tags: ["灰度遮罩", "定义"],
  },
  {
    id: "lm-6",
    chapter: "lighting-maps",
    level: 1,
    question:
      "要让材质里能放下「一张图」而不是「一个颜色」，结构体成员的类型该改成什么？",
    answer:
      "改成 `sampler2D`——这正是「纹理」章里采样器的那个类型。把 `vec3 diffuse;` 改成 `sampler2D diffuse;`，这一项就从「一个颜色」变成「一张可采样的图」。",
    tags: ["sampler2D", "类型"],
  },
  {
    id: "lm-7",
    chapter: "lighting-maps",
    level: 1,
    question: "`sampler2D` 是一种什么样的类型？它能像普通变量那样赋值吗？",
    answer:
      "它是一种不透明类型，本身不存图，而是「指向某个纹理单元」的句柄，配合 `texture()` 去采样取色。它不能像普通变量那样赋值、也不能在函数里临时造一个，只能用 `uniform` 声明。",
    tags: ["sampler2D", "不透明类型"],
  },
  {
    id: "lm-8",
    chapter: "lighting-maps",
    level: 1,
    question: "片元着色器里，从漫反射贴图取底色的那句采样怎么写？",
    answer:
      "`vec3(texture(material.diffuse, TexCoords))`——拿当前片段的 `TexCoords` 去 `material.diffuse` 这张图里采样，取其 `.rgb` 当作这一片的底色。",
    tags: ["texture()", "漫反射贴图"],
  },
  {
    id: "lm-9",
    chapter: "lighting-maps",
    level: 1,
    question: "上一章 Phong 里反光度 `shininess`，改用光照贴图后类型变了吗？",
    answer:
      "没变。`shininess` 仍是单个 `float`，不动。只有 `diffuse` / `specular` 两项由 `vec3` 改成了 `sampler2D`。",
    tags: ["shininess", "Material"],
  },
  {
    id: "lm-10",
    chapter: "lighting-maps",
    level: 1,
    question: "光照贴图最常见的是哪两张？各管什么？",
    answer:
      "漫反射贴图（diffuse map），管各处的底色；镜面光贴图（specular map），管各处反不反光、反多强。前者通常是彩色图，后者通常是灰度图。",
    tags: ["光照贴图", "漫反射贴图", "镜面光贴图"],
  },
  {
    id: "lm-11",
    chapter: "lighting-maps",
    level: 1,
    question: "片元着色器里，环境光项（ambient）的底色从哪里来？",
    answer:
      "从漫反射贴图来——环境色几乎总是等于漫反射色，所以环境项跟着漫反射贴图走，用同一次采样得到的 `baseColor`，不必单独再存一张图。",
    tags: ["环境光", "漫反射贴图"],
  },
  {
    id: "lm-12",
    chapter: "lighting-maps",
    level: 1,
    question:
      "采样贴图需要的 `TexCoords`（UV）是哪个着色器递下来的？属性位置一般是几？",
    answer:
      "由顶点着色器用 `out` 递给片元（中途会被插值）。承接「纹理」章，UV 作为顶点属性放在 `location = 2`（`layout (location = 2) in vec2 aTexCoords;`）。",
    tags: ["TexCoords", "顶点着色器", "location"],
  },
  {
    id: "lm-13",
    chapter: "lighting-maps",
    level: 1,
    question: "把两张贴图分别绑到几号纹理单元是本章的惯例？",
    answer:
      "惯例把漫反射贴图绑到 0 号单元、镜面光贴图绑到 1 号单元。再用 `uniform1i` 告诉每个采样器去几号单元取图。",
    tags: ["纹理单元", "约定"],
  },
  {
    id: "lm-14",
    chapter: "lighting-maps",
    level: 1,
    question:
      "CPU 侧告诉采样器「去几号单元取图」用的是哪个 uniform 函数？传的是什么？",
    answer:
      "用 `uniform1i`（C++ 封装为 `shader.setInt`）。传的是整数的纹理单元编号（0、1），不是纹理对象本身。",
    tags: ["uniform1i", "纹理单元"],
  },
  {
    id: "lm-15",
    chapter: "lighting-maps",
    level: 1,
    question:
      "`sampler2D` 为什么总是出现在 `uniform Material material;` 这种结构体里？",
    answer:
      "因为 `sampler2D` 只能用 `uniform` 声明，不能当普通变量。所以它必须藏在从 CPU 传进来的 `uniform` 结构体里，随结构体一起被声明和赋值。",
    tags: ["sampler2D", "uniform"],
  },
  {
    id: "lm-16",
    chapter: "lighting-maps",
    level: 1,
    question:
      "镜面光贴图采样出的灰度值，在片元里是当作「颜色」还是「强度」用？",
    answer:
      "当作强度（一个 0~1 的乘数）用。它乘到镜面高光项上：白处乘 1、高光照常亮；黑处乘 0、没有高光。它不替代高光颜色。",
    tags: ["镜面光贴图", "强度"],
  },
  {
    id: "lm-17",
    chapter: "lighting-maps",
    level: 1,
    question: "改用光照贴图后，每个顶点同时带哪三样数据？",
    answer:
      "位置（aPos）、法线（aNormal）、UV（aTexCoords）三样。法线供光照计算，UV 供采样两张贴图。",
    tags: ["顶点属性", "法线", "UV"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "lm-21",
    chapter: "lighting-maps",
    level: 2,
    question: "为什么用「一张图」而不是「一个常量」来描述材质各项？",
    answer:
      "因为真实物体表面的属性是逐点变化的：同一个木箱，木头哑、铁边亮。一个常量只能让整块共用一套参数，描述不了「同一物体内部还分区」。换成一张图后，每个片段拿自己的 UV 采样，反光能精细到每个像素。",
    tags: ["光照贴图", "为什么"],
  },
  {
    id: "lm-22",
    chapter: "lighting-maps",
    level: 2,
    question: "为什么镜面光贴图用灰度图，而不是彩色图？",
    answer:
      "因为要控制的不是「反光是什么颜色」，而是「这里反不反光、反多强」——这只需要一个 0~1 的强弱值，正好对应灰度图每个像素的明暗。彩色三通道在这里是浪费，也容易被误当成「高光颜色」用错。",
    tags: ["镜面光贴图", "灰度", "为什么"],
  },
  {
    id: "lm-23",
    chapter: "lighting-maps",
    level: 2,
    question: "漫反射贴图替换底色后，漫反射项的计算结构和上一章相比变了吗？",
    answer:
      "结构没变，还是 Phong 的漫反射项「光强 × 底色 × 面朝光源程度（`diff`）」，只是「底色」从一个常量换成了一次纹理采样的结果 `baseColor`。其余照旧。",
    tags: ["漫反射贴图", "Phong"],
  },
  {
    id: "lm-24",
    chapter: "lighting-maps",
    level: 2,
    question: "为什么环境光项可以「跟随」漫反射贴图，而不另存一张图？",
    answer:
      "因为环境色几乎总是等于物体的底色（漫反射色）——物体在环境光下呈现的就是它本身的颜色。所以环境项直接复用漫反射贴图那一次采样得到的 `baseColor`，省一张图、省一次采样。",
    tags: ["环境光", "漫反射贴图"],
  },
  {
    id: "lm-25",
    chapter: "lighting-maps",
    level: 2,
    question:
      "镜面项里把常量 `material.specular` 换成 `specMask` 后，木头部位为什么没有高光？",
    answer:
      "因为镜面项是 `light.specular * spec * specMask`。木头部位在镜面光贴图上是黑的，采样得 `specMask≈0`，乘出来约等于 0，于是这一片没有高光，显得哑光。",
    tags: ["镜面光贴图", "specMask"],
  },
  {
    id: "lm-26",
    chapter: "lighting-maps",
    level: 2,
    question:
      "为什么 `sampler2D` 只能用 `uniform` 声明，不能在函数里临时造一个？",
    answer:
      "因为 `sampler2D` 是不透明类型——它不存实际数据，只是「指向某号纹理单元」的句柄，必须由外部（CPU 侧绑定纹理 + `uniform1i` 指单元号）来赋予含义。GLSL 因此禁止它当普通变量赋值或局部实例化，只允许 `uniform` 声明。",
    tags: ["sampler2D", "不透明类型", "为什么"],
  },
  {
    id: "lm-27",
    chapter: "lighting-maps",
    level: 2,
    question: "本章和「纹理」章都用到 `sampler2D` / `texture()`，区别在哪？",
    answer:
      "机制完全一样，区别只在语境与用途：「纹理」章用它给物体贴一张「看上去的图」；本章把它放进材质结构体，用采样值去替换 Phong 里的「材质常量」，从而逐片段控制反光。本章是「纹理」+「材质」两章的合流。",
    tags: ["sampler2D", "承接"],
  },
  {
    id: "lm-28",
    chapter: "lighting-maps",
    level: 2,
    question:
      "用两张贴图时，为什么既要 `activeTexture` 绑图、又要 `uniform1i` 指单元号？",
    answer:
      "`activeTexture` + `bindTexture` 是「把图放进某号插槽」；`uniform1i` 是「告诉某个采样器去几号插槽取图」。一个管放、一个管取，缺一不可，着色器才能把两个 `sampler2D` 分别对上各自的贴图。这是承接「纹理」章的纹理单元机制。",
    tags: ["纹理单元", "activeTexture", "uniform1i"],
  },
  {
    id: "lm-29",
    chapter: "lighting-maps",
    level: 2,
    question:
      "镜面光贴图采样值是当成「乘数」乘到镜面项上，这样设计有什么好处？",
    answer:
      "好处是「逐片段开关 + 调强」一步到位：值在 0~1 之间，0 完全关掉高光、1 全保留、中间值（深灰）给出半强高光，能表现磨损、过渡。无需额外分支判断，乘一下就实现了各处反光强弱的连续控制。",
    tags: ["镜面光贴图", "乘数"],
  },
  {
    id: "lm-30",
    chapter: "lighting-maps",
    level: 2,
    question:
      "顶点着色器里 `TexCoords = aTexCoords;` 这句的作用是什么？少了会怎样？",
    answer:
      "它把每个顶点的 UV 原样递给片元（中途被光栅化插值）。少了这句，片元收到的 `TexCoords` 是未赋值的，所有片段会拿到同一个固定 UV，于是两张贴图都糊成一个颜色、花纹出不来。",
    tags: ["TexCoords", "顶点着色器"],
  },
  {
    id: "lm-31",
    chapter: "lighting-maps",
    level: 2,
    question:
      "改用光照贴图后，平台差异（桌面 OpenGL 与 WebGL2）主要体现在哪几处？",
    answer:
      "GLSL 主体几乎一字不差，平台差异只在两行：版本声明（`#version 330 core` 对 `#version 300 es`）和 WebGL2 片段着色器必写的 `precision highp float;`。CPU 侧则是 `shader.setInt` 封装 对 手写 `gl.getUniformLocation` + `gl.uniform1i`。",
    tags: ["API差异", "GLSL"],
  },
  {
    id: "lm-32",
    chapter: "lighting-maps",
    level: 2,
    question: "为什么说光照贴图是把「纹理」章和「材质」章「合到一起」？",
    answer:
      "「纹理」章教的是怎么按 UV 从一张图采样取色；「材质」章教的是 Phong 三项各是「材质色 × 光强」。光照贴图就是把材质里那几个写死的常量，换成「每个片段按 UV 采样得到的值」——采样来自纹理章、被采样的项来自材质章，两者合流。",
    tags: ["光照贴图", "承接"],
  },
  {
    id: "lm-33",
    chapter: "lighting-maps",
    level: 2,
    question: "为什么漫反射贴图不像镜面光贴图那样走「灰度遮罩」思路？",
    answer:
      "因为漫反射贴图管的是「这片是什么颜色」（底色），需要的是彩色信息（木纹色、金属色……）；而镜面光贴图管的是「这片反不反光」，只需一个明暗强弱值。前者是彩色图，后者才是黑白开关式的灰度遮罩。",
    tags: ["漫反射贴图", "灰度遮罩", "对比"],
  },
  {
    id: "lm-34",
    chapter: "lighting-maps",
    level: 2,
    question:
      "上一章的 Phong Demo（常量材质）拖到合适角度时整块一起泛高光，这说明了常量材质的什么局限？",
    answer:
      "说明常量镜面强度让整块物体共用同一个反光值——要么整块一起亮、要么整块一起暗，没法做到「同一物体上这块亮、那块哑」。这正是镜面光贴图（灰度遮罩）要打破的局限。",
    tags: ["局限", "镜面光贴图"],
  },
  {
    id: "lm-35",
    chapter: "lighting-maps",
    level: 2,
    question:
      "把 `material.diffuse` 从 `vec3` 改成 `sampler2D` 后，它还能直接参与颜色乘法吗？",
    answer:
      "不能直接乘——`sampler2D` 是句柄不是颜色值。必须先 `texture(material.diffuse, TexCoords)` 采样出一个 `vec4`、取 `.rgb` 得到 `vec3` 底色，再拿这个 `vec3` 去参与 Phong 的乘法。",
    tags: ["sampler2D", "采样"],
  },
  {
    id: "lm-36",
    chapter: "lighting-maps",
    level: 2,
    question:
      "镜面光贴图上画一片「深灰」（不是纯黑也不是纯白）的部位，画面会是什么效果？",
    answer:
      "采样得到中间值（如 0.4），`specMask` 乘到镜面项上给出半强高光——这片有反光，但比纯白的钢边弱。常用来表现磨损、轻微反光的过渡区域。",
    tags: ["镜面光贴图", "灰度遮罩"],
  },
  {
    id: "lm-37",
    chapter: "lighting-maps",
    level: 2,
    question:
      "为什么 `texture(material.diffuse, TexCoords)` 返回 `vec4`，而我们常只取 `.rgb`？",
    answer:
      "`texture()` 统一返回 rgba 四分量（`vec4`）。漫反射底色只用得到 rgb 三个颜色分量，alpha 这里用不上，所以用 `vec3(...)` 或 `.rgb` 取前三个。镜面光贴图是灰度，rgb 三通道相同，取任一或 `.rgb` 当强度都行。",
    tags: ["texture()", "vec4"],
  },

  // ── L3 应用（读代码 / 给参数判结果 / 小计算） ──
  {
    id: "lm-38",
    chapter: "lighting-maps",
    level: 3,
    question:
      "把上一章 `struct Material { vec3 diffuse; vec3 specular; float shininess; };` 改成贴图版，怎么写？",
    answer:
      "`struct Material { sampler2D diffuse; sampler2D specular; float shininess; };`。两项由 `vec3` 改 `sampler2D`，`shininess` 保持 `float` 不变。结构体仍由 `uniform Material material;` 声明。",
    tags: ["Material", "sampler2D", "读代码"],
  },
  {
    id: "lm-39",
    chapter: "lighting-maps",
    level: 3,
    question: "片元里要让环境项和漫反射项共用同一份底色，该怎么写这两句？",
    answer:
      "先采样一次存起来：`vec3 baseColor = vec3(texture(material.diffuse, TexCoords));`，然后 `vec3 ambient = light.ambient * baseColor;`、`vec3 diffuse = light.diffuse * diff * baseColor;`。两项共用 `baseColor`，只采样一次。",
    tags: ["环境光", "漫反射贴图", "读代码"],
  },
  {
    id: "lm-40",
    chapter: "lighting-maps",
    level: 3,
    question:
      "镜面项原来是 `light.specular * spec * material.specular`，换成镜面光贴图后这一行怎么写？",
    answer:
      "`vec3 specMask = vec3(texture(material.specular, TexCoords)); vec3 specular = light.specular * spec * specMask;`。把常量 `material.specular` 换成采样出的灰度值 `specMask` 即可。",
    tags: ["镜面光贴图", "specMask", "读代码"],
  },
  {
    id: "lm-41",
    chapter: "lighting-maps",
    level: 3,
    question: "CPU 侧（C++）告诉两个采样器各去 0、1 号单元取图，两句怎么写？",
    answer:
      '`shader.setInt("material.diffuse", 0);` 和 `shader.setInt("material.specular", 1);`，且要在 `shader.use()` 之后调用。传的是整数单元号，不是纹理对象。',
    tags: ["uniform1i", "纹理单元", "读代码"],
  },
  {
    id: "lm-42",
    chapter: "lighting-maps",
    level: 3,
    question: "CPU 侧（WebGL2）把漫反射贴图绑到 0 号单元，两句怎么写？",
    answer:
      "`gl.activeTexture(gl.TEXTURE0);` 再 `gl.bindTexture(gl.TEXTURE_2D, diffuseMap);`。先选中单元、再绑图，顺序不能反。",
    tags: ["activeTexture", "bindTexture", "读代码"],
  },
  {
    id: "lm-43",
    chapter: "lighting-maps",
    level: 3,
    question:
      "某片段在镜面光贴图上采到纯白（`specMask = vec3(1.0)`），镜面项的值等于多少？",
    answer:
      "等于 `light.specular * spec * 1.0`，即 `light.specular * spec`——和上一章常量 `material.specular = 1.0` 时一模一样，高光照常全亮。白处不削弱高光。",
    tags: ["镜面光贴图", "计算"],
  },
  {
    id: "lm-44",
    chapter: "lighting-maps",
    level: 3,
    question:
      "某片段在镜面光贴图上采到纯黑（`specMask = vec3(0.0)`），它的最终颜色由哪几项组成？",
    answer:
      "镜面项 `light.specular * spec * 0.0 = 0`，被乘没了。最终颜色只剩环境项 + 漫反射项（`ambient + diffuse`），显得哑光、没有高光。",
    tags: ["镜面光贴图", "计算"],
  },
  {
    id: "lm-45",
    chapter: "lighting-maps",
    level: 3,
    question: "顶点着色器要把 UV 递给片元，需要补哪两处声明/赋值？",
    answer:
      "①输入属性：`layout (location = 2) in vec2 aTexCoords;`；②输出 + 赋值：`out vec2 TexCoords;` 配 `main` 里 `TexCoords = aTexCoords;`。片元侧对应 `in vec2 TexCoords;`。",
    tags: ["TexCoords", "顶点着色器", "读代码"],
  },
  {
    id: "lm-46",
    chapter: "lighting-maps",
    level: 3,
    question: "WebGL2 里把镜面光贴图的采样器指到 1 号单元，这一句怎么写？",
    answer:
      '`gl.uniform1i(gl.getUniformLocation(program, "material.specular"), 1);`，且要在 `gl.useProgram(program)` 之后。第二个参数是整数单元号 1。',
    tags: ["uniform1i", "WebGL2", "读代码"],
  },
  {
    id: "lm-47",
    chapter: "lighting-maps",
    level: 3,
    question:
      "想让木箱钢边的白色高光带一点暖金色调（不换贴图），怎么改镜面项那一行？",
    answer:
      "再乘一个暖色调系数：`vec3 specular = light.specular * spec * specMask * vec3(1.0, 0.85, 0.6);`。灰度遮罩 `specMask` 决定「哪里反光」，暖色 `vec3(1.0,0.85,0.6)` 给反光处统一染暖。木头处 `specMask≈0`，乘什么仍没高光。",
    tags: ["镜面光贴图", "warmTint", "应用"],
  },
  {
    id: "lm-48",
    chapter: "lighting-maps",
    level: 3,
    question:
      "片元写 `vec3 baseColor = vec3(texture(material.diffuse, TexCoords));`，这里 `vec3(...)` 起什么作用？",
    answer:
      "`texture(...)` 返回 `vec4`（rgba），`vec3(...)` 把它截成前三个分量（rgb），丢掉 alpha，得到一个可直接参与 Phong 颜色乘法的 `vec3` 底色。等价于写 `.rgb`。",
    tags: ["texture()", "vec3", "读代码"],
  },
  {
    id: "lm-49",
    chapter: "lighting-maps",
    level: 3,
    question:
      "上一章片元只用了位置和法线，本章片元多用到哪个 `in` 变量？谁给它赋值的？",
    answer:
      "多用到 `in vec2 TexCoords;`，用于采样两张贴图。它由顶点着色器 `out vec2 TexCoords; TexCoords = aTexCoords;` 递下来，再经光栅化逐片段插值。",
    tags: ["TexCoords", "片元着色器", "读代码"],
  },
  {
    id: "lm-50",
    chapter: "lighting-maps",
    level: 3,
    question:
      "WebGL2 片段着色器开头除 `#version 300 es` 外，采样贴图前还必须写哪一行？为什么？",
    answer:
      "必须写 `precision highp float;`。因为 WebGL2（GLSL ES 300）规定片段着色器没有默认 float 精度，不声明会编译失败。桌面 `#version 330 core` 不需要这一行。",
    tags: ["precision", "WebGL2", "API差异"],
  },
  {
    id: "lm-51",
    chapter: "lighting-maps",
    level: 3,
    question:
      'C++ 里 `shader.setInt("material.diffuse", 0)` 内部其实做了哪两步？',
    answer:
      '先 `glGetUniformLocation` 按名字 `"material.diffuse"` 拿到 uniform 位置，再 `glUniform1i(位置, 0)` 写入整数单元号 0。WebGL2 没有这层封装，得手写这两步。',
    tags: ["setInt", "uniform1i", "API差异"],
  },
  {
    id: "lm-52",
    chapter: "lighting-maps",
    level: 3,
    question: "若镜面光贴图整张是纯白，最终效果和上一章哪种常量材质等价？",
    answer:
      "等价于上一章「`material.specular` 整块设为白（1.0）」的常量材质——整块物体反光强度一样，拖到角度时整块一起泛高光。纯白镜面光贴图等于没做遮罩。",
    tags: ["镜面光贴图", "等价", "应用"],
  },
  {
    id: "lm-53",
    chapter: "lighting-maps",
    level: 3,
    question: "每帧绘制前要把两张图绑好，C++ 侧这四句的正确顺序是什么？",
    answer:
      "`glActiveTexture(GL_TEXTURE0); glBindTexture(GL_TEXTURE_2D, diffuseMap); glActiveTexture(GL_TEXTURE1); glBindTexture(GL_TEXTURE_2D, specularMap);`。每张图都遵循「先 activeTexture 选单元、再 bindTexture 绑图」。",
    tags: ["activeTexture", "bindTexture", "读代码"],
  },
  {
    id: "lm-54",
    chapter: "lighting-maps",
    level: 3,
    question:
      "片元里写成 `vec3 diffuse = light.diffuse * diff * baseColor;`，其中 `diff` 是什么？",
    answer:
      "`diff` 是面朝光源程度，即 `max(dot(norm, lightDir), 0.0)`，就是上一章 Phong 的 `N·L`。它和底色 `baseColor`、光强 `light.diffuse` 相乘得到漫反射项。换贴图只动了 `baseColor`，`diff` 算法不变。",
    tags: ["漫反射", "diff", "读代码"],
  },
  {
    id: "lm-55",
    chapter: "lighting-maps",
    level: 3,
    question:
      "顶点数据每行是「位置 3 + 法线 3 + UV 2」共 8 个 float，配置 UV 属性（location 2）的步长和偏移填多少（以 float 计）？",
    answer:
      "步长 8 个 float，偏移 6 个 float（UV 排在位置 3 + 法线 3 之后）。C++ 写 `8*sizeof(float)` 和 `(void*)(6*sizeof(float))`；WebGL2 写 `8*4` 和 `6*4`。分量数填 2。",
    tags: ["vertexAttribPointer", "stride", "计算"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 边界） ──
  {
    id: "lm-56",
    chapter: "lighting-maps",
    level: 4,
    question:
      "物体表面漆黑一片或完全没有花纹，两张贴图像没生效，可能是什么原因？怎么修？",
    answer:
      "典型是贴图没绑对纹理单元：忘了用 `uniform1i` 告诉采样器「`material.diffuse` 去 0 号、`material.specular` 去 1 号」，或 `activeTexture` 选错单元、两张图绑到了同一个单元。修：每个 `sampler2D` 都用 `uniform1i` 指定单元号，绑图前先 `activeTexture` 选中对应单元——漫反射 0 号、镜面 1 号，别撞车。",
    tags: ["纹理单元", "陷阱", "uniform1i"],
  },
  {
    id: "lm-57",
    chapter: "lighting-maps",
    level: 4,
    question:
      "镜面高光区域染上奇怪颜色、本该哑光的木头也泛起彩色高光，可能是什么原因？怎么修？",
    answer:
      "原因：把彩色图当镜面光贴图用了，或把它当成「镜面的颜色」而非「镜面的强度」。镜面光贴图本该是灰度遮罩——只用明暗当反光强弱（白强黑哑）。修：用灰度图；片元里它当作强度乘数乘到镜面项上（`spec * specMask`），不替代高光颜色。",
    tags: ["镜面光贴图", "灰度遮罩", "陷阱"],
  },
  {
    id: "lm-58",
    chapter: "lighting-maps",
    level: 4,
    question: "贴图整块糊成一个颜色、花纹完全没出来，原因可能在哪？怎么修？",
    answer:
      "`TexCoords` 没正确传到片元：顶点着色器忘了 `out vec2 TexCoords; TexCoords = aTexCoords;`，或 CPU 侧没给 location 2 配 UV 顶点属性指针，于是每个片段拿到的 UV 都一样。修：顶点着色器声明并赋值 `TexCoords`，CPU 侧给 `aTexCoords`（location 2）配好 `vertexAttribPointer` + `enableVertexAttribArray`。",
    tags: ["TexCoords", "vertexAttribPointer", "陷阱"],
  },
  {
    id: "lm-59",
    chapter: "lighting-maps",
    level: 4,
    question:
      "编译报错说不能给 `sampler2D` 赋值或在函数里声明局部 `sampler2D`，根因是什么？",
    answer:
      "根因是 `sampler2D` 是不透明类型，只能用 `uniform` 声明，不能赋值、不能局部实例化。把它放回 `uniform Material material;` 结构体里、靠 CPU 侧绑纹理 + `uniform1i` 赋予含义即可，别想在着色器里临时造一个。",
    tags: ["sampler2D", "不透明类型", "陷阱"],
  },
  {
    id: "lm-60",
    chapter: "lighting-maps",
    level: 4,
    question:
      "完整串一遍「钢边亮、木头哑」是怎么在一帧里实现的：从两张贴图到最终像素。",
    answer:
      "CPU 侧把漫反射贴图绑 0 号、镜面光贴图绑 1 号单元，`uniform1i` 把两个采样器指向各自单元 → 顶点着色器把 UV 递给片元、被插值 → 片元用 `texture(material.diffuse, TexCoords)` 取底色（供环境 + 漫反射），用 `texture(material.specular, TexCoords)` 取灰度 `specMask` 当镜面强度 → 钢边处 `specMask≈1` 高光全亮、木头处 `specMask≈0` 没高光 → 三项相加输出该像素颜色。",
    tags: ["流程", "综合"],
  },
  {
    id: "lm-61",
    chapter: "lighting-maps",
    level: 4,
    question:
      "漫反射贴图正常、但镜面高光完全不出现（整块都哑），排查时该先看什么？",
    answer:
      "先看镜面光贴图是不是几乎全黑（采样 `specMask≈0` 把高光乘没了）；其次看它有没有绑对 1 号单元、`uniform1i` 有没有把 `material.specular` 指到 1 号（绑错会采到漫反射图甚至空）；再看 `shininess` 是否异常导致 `spec` 极小。漫反射正常说明 UV 和 0 号单元链路没问题，问题集中在镜面这一路。",
    tags: ["镜面光贴图", "调试", "综合"],
  },
  {
    id: "lm-62",
    chapter: "lighting-maps",
    level: 4,
    question:
      "把两个采样器都用 `uniform1i` 指到了 0 号单元（都填 0），会出现什么现象？",
    answer:
      "两个 `sampler2D` 都去 0 号单元取图，等于两项都采到同一张图。若 0 号绑的是漫反射图，镜面项会拿彩色漫反射图当「强度」乘，导致高光串色、哑光部位也泛彩色高光。修：把 `material.specular` 改指 1 号单元（`uniform1i(..., 1)`）。",
    tags: ["纹理单元", "uniform1i", "陷阱"],
  },
  {
    id: "lm-63",
    chapter: "lighting-maps",
    level: 4,
    question: "为什么本章不需要引入新数学，却能做出比上一章丰富得多的效果？",
    answer:
      "因为 Phong 三项的公式一字未改——环境、漫反射、镜面的算法和上一章完全相同。本章只把每项里的「材质常量色」换成「一次纹理采样」，让常量随片段变成图上的逐点值。复杂度全在「数据来源」从常量变图，数学结构没动。",
    tags: ["Phong", "综合", "为什么"],
  },
  {
    id: "lm-64",
    chapter: "lighting-maps",
    level: 4,
    question:
      "想让磨损的旧木箱「钢边亮、木头哑、磨损裂缝半亮」，镜面光贴图该怎么画？为什么漫反射贴图替代不了它？",
    answer:
      "镜面光贴图把钢边涂白（`specMask≈1` 强反光）、木头涂黑（≈0 不反光）、磨损裂缝涂深灰（中间值，半强高光）。漫反射贴图只能改「这片什么颜色」，改不了「这片反不反光」——反光强弱是镜面项的乘数，必须由镜面光贴图这张灰度遮罩单独控制。",
    tags: ["镜面光贴图", "灰度遮罩", "综合"],
  },
  {
    id: "lm-65",
    chapter: "lighting-maps",
    level: 4,
    question:
      "同事说「镜面光贴图也用彩色图，能让钢边反出不同颜色的光」，这说法对吗？该怎么实现彩色反光？",
    answer:
      "部分对：标准镜面光贴图是灰度遮罩，只控制反光强弱（白强黑哑）。要让反光本身带颜色，确实可以用一张彩色镜面光贴图，让采样出的 rgb 直接当镜面项的颜色乘数（`spec * 彩色采样`）；或在灰度遮罩基础上再乘一个色调 `vec3`。但前提是明确它此时表达的是「反光颜色」，别和「只用明暗当强度」的常规灰度用法混为一谈。",
    tags: ["镜面光贴图", "彩色", "综合"],
  },
  {
    id: "lm-66",
    chapter: "lighting-maps",
    level: 4,
    question:
      "改完贴图后，木箱底色对了，但整块物体都没有任何高光（钢边也不亮）。在镜面光贴图本身没问题的前提下，还有哪些环节可能出错？",
    answer:
      '底色对说明 UV、0 号单元、漫反射这一路通。高光全失可能出在：①镜面光贴图没绑到 1 号单元，或 `uniform1i("material.specular", 1)` 漏写/写错，采样器取到空或漫反射图；②`shininess` 设得过大，`pow` 出来的 `spec` 几乎为 0；③观察/光源方向算错（`viewDir`/`reflectDir`），导致 `spec` 恒为 0。逐项核对 1 号单元绑定与 `spec` 的计算。',
    tags: ["镜面光贴图", "调试", "综合"],
  },
  {
    id: "lm-67",
    chapter: "lighting-maps",
    level: 4,
    question:
      "有人把漫反射和镜面分别采样了两次 `texture(material.diffuse, TexCoords)`（环境一次、漫反射又一次）。这会出错吗？正文为什么只采一次存 `baseColor`？",
    answer:
      "结果不会错——两次采同一张图、同一 UV，取到的值相同。但这是浪费：纹理采样是片元里相对昂贵的操作，环境和漫反射共用同一底色，采一次存进 `baseColor` 复用即可，少一次采样。正文 `vec3 baseColor = vec3(texture(material.diffuse, TexCoords));` 正是为此。",
    tags: ["漫反射贴图", "baseColor", "优化"],
  },
  {
    id: "lm-68",
    chapter: "lighting-maps",
    level: 4,
    question:
      "顶点属性里 UV 放在 `location = 2`，但 CPU 侧只给 location 0、1 配了 `vertexAttribPointer`，漏了 2。两张贴图会表现成什么样？和「忘了在顶点着色器赋值 TexCoords」的症状一样吗？",
    answer:
      "症状相似：片元拿到的 `TexCoords` 是无效/恒定值，两张贴图都糊成单一颜色、花纹出不来。根因不同但都指向「UV 没正确流到片元」：这里是 CPU 侧没给 location 2 配指针 + `enableVertexAttribArray`，那里是顶点着色器没写 `TexCoords = aTexCoords;`。排查要两头都查：CPU 的 UV 属性配置 + 顶点着色器的 `out` 赋值。",
    tags: ["TexCoords", "vertexAttribPointer", "陷阱"],
  },
  {
    id: "lm-69",
    chapter: "lighting-maps",
    level: 4,
    question:
      "把上一章常量材质的片元一次性改成「漫反射贴图 + 镜面光贴图」，关键改动有哪三类？分别落在哪个文件/阶段？",
    answer:
      "①类型：着色器结构体把 `vec3 diffuse/specular` 改成 `sampler2D`（GLSL）；②采样：片元三项把常量换成采样——环境/漫反射共用 `vec3(texture(material.diffuse, TexCoords))`，镜面用 `vec3(texture(material.specular, TexCoords))` 当强度乘数（GLSL 片元）；③绑定：CPU 侧 `uniform1i` 把两个采样器指到 0/1 号单元，每帧 `activeTexture`+`bindTexture` 绑两张图，并给 UV 配好顶点属性（CPU/JS 或 C++）。三类缺一，效果都出不来。",
    tags: ["流程", "综合", "迁移"],
  },
];
