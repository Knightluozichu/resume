/** 复习题库 · 多光源（multiple-lights）。Phase B 各章独立文件，避免并行写冲突。 */

import type { ReviewQuestion } from "./types";

export const multipleLightsQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / 约定 / 函数名） ──
  {
    id: "ml-1",
    chapter: "multiple-lights",
    level: 1,
    question: "一块表面同时被多盏光照到时，它的最终颜色怎么算？",
    answer:
      "最终颜色 = 照到它的每一盏光各自贡献的颜色之和。每盏光各算各的「环境 + 漫反射 + 镜面」贡献，再全部相加，就是这块片段的最终色。",
    tags: ["多光源", "累加"],
  },
  {
    id: "ml-2",
    chapter: "multiple-lights",
    level: 1,
    question: "本章按惯例给三类光各写一个 GLSL 函数，名字分别叫什么？",
    answer:
      "`CalcDirLight`（平行光）、`CalcPointLight`（点光源）、`CalcSpotLight`（聚光）。每个函数算完那一类光的 Phong 三项，返回一个 `vec3`——这盏光对当前片段的颜色贡献。",
    tags: ["光贡献函数", "CalcDirLight", "CalcPointLight", "CalcSpotLight"],
  },
  {
    id: "ml-3",
    chapter: "multiple-lights",
    level: 1,
    question: "三个 `Calc*` 光贡献函数各返回什么类型？它代表什么？",
    answer:
      "都返回一个 `vec3`，代表「这盏光对当前这块片段的颜色贡献」（即这盏光算出来的环境 + 漫反射 + 镜面之和）。`main` 把各函数返回的 `vec3` 相加得最终色。",
    tags: ["光贡献函数", "vec3"],
  },
  {
    id: "ml-4",
    chapter: "multiple-lights",
    level: 1,
    question: "什么是 uniform 数组？本章用它装哪类光？",
    answer:
      "uniform 数组是 GLSL 里一段连续、定长的同类型 uniform，如 `pointLights[4]`。本章用它装多个点光源——同类光要放好几个，用数组 + 下标 + 循环统一处理。",
    tags: ["uniform 数组", "点光源"],
  },
  {
    id: "ml-5",
    chapter: "multiple-lights",
    level: 1,
    question: "点光源数组的长度本章用什么定？为什么不能随便写个变量？",
    answer:
      "用 `#define NR_POINT_LIGHTS 4` 定一个编译期常量当长度。GLSL 的 uniform 数组长度必须是编译期常量，着色器编译时就得知道要为几个 `PointLight` 留位置，不能在运行时动态增减。",
    tags: ["uniform 数组", "NR_POINT_LIGHTS"],
  },
  {
    id: "ml-6",
    chapter: "multiple-lights",
    level: 1,
    question: "本章的光照计算放在顶点着色器还是片段着色器里？",
    answer:
      "放在片段着色器里，逐像素算。三个 `Calc*` 函数和 `main` 里的累加都在片段着色器中执行。",
    tags: ["片段着色器", "管线"],
  },
  {
    id: "ml-7",
    chapter: "multiple-lights",
    level: 1,
    question: "平行光（CalcDirLight）和点光源比，最大的特点是什么？",
    answer:
      "平行光只有方向、没有位置，也不随距离衰减——像太阳，场景里各处受到的光线方向都一样。所以 `CalcDirLight` 里 `lightDir` 直接用 `normalize(-light.direction)`，不用片段位置。",
    tags: ["平行光", "CalcDirLight"],
  },
  {
    id: "ml-8",
    chapter: "multiple-lights",
    level: 1,
    question: "点光源（CalcPointLight）比平行光多了哪两件事？",
    answer:
      "一是 `lightDir` 要由「光源位置 − 片段位置」算出（它有具体位置）；二是要按距离做衰减（越远越暗），衰减系数乘到环境/漫反射/镜面三项上。",
    tags: ["点光源", "CalcPointLight", "衰减"],
  },
  {
    id: "ml-9",
    chapter: "multiple-lights",
    level: 1,
    question: "聚光（CalcSpotLight）在点光源基础上又加了什么？",
    answer:
      "加了锥形判断：用「片段方向与聚光朝向的夹角」和内外切光角余弦比较，算出一个 0~1 的强度因子 `intensity`，乘到漫反射/镜面上做软边过渡，锥外不照。它同时有位置、方向、切光角和衰减。",
    tags: ["聚光", "CalcSpotLight", "切光角"],
  },
  {
    id: "ml-10",
    chapter: "multiple-lights",
    level: 1,
    question: "什么是「衰减」？哪几类光要用它？",
    answer:
      "衰减是光照强度随「光源到表面的距离」变弱的处理（越远越暗）。点光源和聚光要用，平行光不用。常用系数 `1 / (常数 + 一次·d + 二次·d²)`，乘到三项上。",
    tags: ["衰减", "点光源", "聚光"],
  },
  {
    id: "ml-11",
    chapter: "multiple-lights",
    level: 1,
    question: "本章场景里放了「几盏什么光」？",
    answer:
      "1 个平行光 + N 个点光源（用 uniform 数组 + `for` 循环处理，默认 `NR_POINT_LIGHTS = 4`）+ 1 个聚光。`main` 把这三类的贡献全部相加得最终色。",
    tags: ["多光源", "main"],
  },
  {
    id: "ml-12",
    chapter: "multiple-lights",
    level: 1,
    question: "main 里遍历点光源数组用什么语句？累加贡献用什么运算符？",
    answer:
      "用 `for` 循环遍历 `pointLights` 数组，每次 `result += CalcPointLight(pointLights[i], ...)`。累加用 `+=`，把每盏点光源的贡献加进 `result`。",
    tags: ["main", "for 循环", "累加"],
  },
  {
    id: "ml-13",
    chapter: "multiple-lights",
    level: 1,
    question: "把光贡献封装成 GLSL 函数（光贡献函数）的好处是什么？",
    answer:
      "`main` 里只需一行调用就拿到一盏光的贡献，代码清爽、可复用、可循环；每盏光的内部细节（衰减、锥形判断）锁在各自函数里，不会一股脑全塞进 `main` 纠缠成几十行。",
    tags: ["光贡献函数", "代码组织"],
  },
  {
    id: "ml-14",
    chapter: "multiple-lights",
    level: 1,
    question: "三类光的 Phong 主体（环境/漫反射/镜面）算法一样吗？差异在哪？",
    answer:
      "Phong 主体算法一样（都是上几章那套）。差异只在「光从哪来」（方向恒定 vs 由位置算）、「要不要按距离衰减」、「要不要限制在锥内」。所以它们天生适合各封装成一个函数。",
    tags: ["光贡献函数", "Phong"],
  },
  {
    id: "ml-15",
    chapter: "multiple-lights",
    level: 1,
    question: "本章相对前几章引入了什么「新数学」？",
    answer:
      "没有新数学。Phong 三项、衰减公式、聚光切光角都在前几章（基础光照/材质/投光物）讲过。本章的功夫全在「代码组织」——函数化 + 累加。",
    tags: ["多光源", "代码组织"],
  },
  {
    id: "ml-16",
    chapter: "multiple-lights",
    level: 2,
    question: "原书把 CalcSpotLight 留作练习，本章是怎么处理的？",
    answer:
      "本章给出 `CalcSpotLight` 的完整版（不留作练习），方便把光照篇收成一套完整、可运行的代码。",
    tags: ["CalcSpotLight", "出处"],
  },

  // ── L2 理解（为什么 / 机制 / 对比 / API 差异） ──
  {
    id: "ml-17",
    chapter: "multiple-lights",
    level: 2,
    question: "为什么要把每类光封装成一个函数，而不是把三类全写进 main？",
    answer:
      "三类光各有各的算法，全塞进 `main` 会有几十行纠缠在一起，没法看也没法改。封装后 `main` 只管「把各份贡献加起来」，每类光的细节锁在各自函数里，清爽、可复用、能循环。",
    tags: ["光贡献函数", "为什么"],
  },
  {
    id: "ml-18",
    chapter: "multiple-lights",
    level: 2,
    question: "为什么说多光源「不是新数学，而是代码组织」？",
    answer:
      "算一盏光得到的就是「这盏光对这块表面的贡献」，前几章已学透。多光源无非把这件事对每盏光各做一遍、再全加起来——数学还是那套 Phong，难点只在「怎么把三类光的代码组织得不乱」。",
    tags: ["多光源", "为什么"],
  },
  {
    id: "ml-19",
    chapter: "multiple-lights",
    level: 2,
    question:
      "为什么 CalcPointLight 要把 normal、fragPos、viewDir 都当参数传进来？",
    answer:
      "这样函数不依赖任何外部全局变量，`main` 里在循环中反复调它就很干净——每次传入当前片段的 `normal/fragPos/viewDir` 和数组里的某盏光即可，函数本身可复用、可循环。",
    tags: ["CalcPointLight", "函数参数"],
  },
  {
    id: "ml-20",
    chapter: "multiple-lights",
    level: 2,
    question:
      "为什么点光源要写成定长数组，而不能「灯有几盏就来几个」随用随加？",
    answer:
      "GLSL 的 uniform 数组长度必须是编译期常量——着色器编译时就得知道要为多少个 `PointLight` 留位置，没法运行时动态增减。所以用 `#define` 把个数定死，想要更多灯就改 `#define` 重新编译。",
    tags: ["uniform 数组", "为什么"],
  },
  {
    id: "ml-21",
    chapter: "multiple-lights",
    level: 2,
    question:
      "结构体声明、#define、uniform 数组声明这些 GLSL 语法两端（C++/WebGL2）一样吗？",
    answer:
      "完全一样——这些是 GLSL 语言本身的特性，`struct`、`#define`、`pointLights[NR_POINT_LIGHTS]` 的声明语法两端一字不差。差别在 CPU 侧怎么把数组灌进去。",
    tags: ["API差异", "uniform 数组"],
  },
  {
    id: "ml-22",
    chapter: "multiple-lights",
    level: 2,
    question:
      "把 uniform 数组灌值时，C++ 和 WebGL2 的共同套路是什么？为什么这么麻烦？",
    answer:
      "两端都得拼出带下标的字符串名（`pointLights[0].position`、`pointLights[1].position`…）逐个字段灌。因为结构体数组没有「一次灌一整个数组」的批量接口，只能一个字段一个字段地写，通常用循环把这件繁琐事自动化。",
    tags: ["uniform 数组", "API差异"],
  },
  {
    id: "ml-23",
    chapter: "multiple-lights",
    level: 2,
    question: "为什么被多盏光同时照到的面会更亮，甚至顶到纯白？",
    answer:
      "每盏光的贡献都是正数，几份漫反射/镜面叠加，相加后那块面自然更亮；加得太多时某些通道超过 1.0，被钳到纯白（过曝），丢失明暗细节。",
    tags: ["过曝", "累加"],
  },
  {
    id: "ml-24",
    chapter: "multiple-lights",
    level: 2,
    question:
      "CalcDirLight 里 lightDir 为什么用 `normalize(-light.direction)`，要加个负号？",
    answer:
      "`light.direction` 是「光照过来的方向」，而 Phong 里要的是「从片段指向光源」的方向，二者相反，所以取负号再归一化。点光源/聚光则用 `position - fragPos` 得到指向光源的方向。",
    tags: ["CalcDirLight", "lightDir"],
  },
  {
    id: "ml-25",
    chapter: "multiple-lights",
    level: 2,
    question: "三个 Calc 函数结构高度一致，可以概括成什么统一形态？",
    answer:
      "都是「算 Phong 三项 → 乘衰减/锥形因子 → 返回三项之和（一个 `vec3`）」。差异只在各自多出来的几行：点光源多衰减，聚光多衰减 + 锥形强度。平行光最简单，无衰减无锥形。",
    tags: ["光贡献函数", "对比"],
  },
  {
    id: "ml-26",
    chapter: "multiple-lights",
    level: 2,
    question:
      "main 里 norm 和 viewDir 为什么「只算一次」，而不是每个 Calc 函数内部各算？",
    answer:
      "`norm = normalize(Normal)` 和 `viewDir = normalize(viewPos - FragPos)` 是所有光共用的，与具体哪盏光无关。在 `main` 里算一次、当参数传给每个 `Calc*`，避免每盏光重复计算，省开销也更清晰。",
    tags: ["main", "性能"],
  },
  {
    id: "ml-27",
    chapter: "multiple-lights",
    level: 4,
    question:
      "为什么 GLSL（尤其 WebGL2/GLSL ES）的 for 循环上限最好用编译期常量？",
    answer:
      "WebGL2 / GLSL ES 对「循环次数能否在编译期定下来」比桌面更敏感，用动态变量当上限可能编译失败。所以循环上限最好就用 `NR_POINT_LIGHTS` 这个常量，让编译器能把循环次数定死。",
    tags: ["for 循环", "API差异", "GLSL ES"],
  },
  {
    id: "ml-28",
    chapter: "multiple-lights",
    level: 2,
    question: "聚光的环境光（ambient）通常不乘 intensity 软边因子，为什么？",
    answer:
      "保留环境光不受锥形限制，让锥外也有一点底光，避免锥外漆黑一片。软边因子 `intensity` 只乘到漫反射/镜面上，所以锥外仍有微弱环境光打底，锥内才有明显的漫反射/镜面。",
    tags: ["CalcSpotLight", "环境光", "切光角"],
  },
  {
    id: "ml-29",
    chapter: "multiple-lights",
    level: 4,
    question: "为什么 result 第一盏可以用 `=` 起头、后面必须用 `+=`？",
    answer:
      "第一盏（如 `CalcDirLight`）用 `=` 把 `result` 初始化为它的贡献；之后每盏若再用 `=` 就会覆盖掉前面已累加的值，所以必须用 `+=` 把后续贡献加进去。也可统一写 `result = vec3(0.0);` 后全用 `+=`。",
    tags: ["累加", "main"],
  },
  {
    id: "ml-30",
    chapter: "multiple-lights",
    level: 4,
    question: "为什么光源越多越卡？开销大致和什么成正比？",
    answer:
      "光照在片段着色器里逐像素跑，每多一盏光，每个像素都多算一整套 Phong（还有循环、采样）。开销大致和「像素数 × 光源数」成正比，光一多就飙升。",
    tags: ["性能", "片段着色器"],
  },
  {
    id: "ml-31",
    chapter: "multiple-lights",
    level: 4,
    question: "前向渲染里同时生效的光源数大概控制在多少？海量光源要换什么？",
    answer:
      "前向渲染里几盏到十几盏为宜。真要海量光源（成百上千），得换延迟渲染等进阶管线（超出本篇）。",
    tags: ["性能", "延迟渲染"],
  },
  {
    id: "ml-32",
    chapter: "multiple-lights",
    level: 2,
    question: "WebGL2 片段着色器里有一行 C++ 不需要写，是哪一行？为什么？",
    answer:
      "`precision highp float;`。WebGL2（GLSL ES 300）规定片段着色器没有默认的 float 精度，必须显式声明否则编译失败；桌面 OpenGL（`#version 330 core`）有默认精度，不需要这行。",
    tags: ["API差异", "precision", "WebGL2"],
  },
  {
    id: "ml-33",
    chapter: "multiple-lights",
    level: 2,
    question: "本章「房间里好几盏灯」的比喻对应到代码里是什么？",
    answer:
      "吸顶灯/台灯/射灯 = 多盏不同类型的光；桌面同时接到几盏灯的光、台灯正下方更亮 = 多盏光的贡献相加、叠加处更亮。对应代码就是各 `Calc*` 各算一份贡献、`main` 里 `result` 累加。",
    tags: ["多光源", "直觉"],
  },
  {
    id: "ml-34",
    chapter: "multiple-lights",
    level: 2,
    question:
      "为什么 CalcSpotLight 比 CalcPointLight 还多收的不是参数、而是函数内的几行？",
    answer:
      "两者签名一样（都收 `light/normal/fragPos/viewDir`），聚光的额外信息（方向、内外切光角）藏在 `SpotLight` 结构体里。函数内多出的是算 `theta`、`eps`、`intensity` 那几行锥形软边，再把 `intensity` 乘进漫反射/镜面。",
    tags: ["CalcSpotLight", "对比"],
  },

  // ── L3 应用（读代码 / 给参数判结果 / 改代码） ──
  {
    id: "ml-35",
    chapter: "multiple-lights",
    level: 3,
    question:
      "main 里写 `vec3 result = CalcDirLight(...); result += CalcPointLight(...); result = CalcSpotLight(...);`，画面会怎样？",
    answer:
      "最后一行用了 `=` 而非 `+=`，会把前面平行光 + 点光源累加的结果全部冲掉，只剩聚光的贡献。画面看上去像只有聚光这一盏光在起作用。改法：最后一行也用 `+=`。",
    tags: ["累加", "读代码", "误区"],
  },
  {
    id: "ml-36",
    chapter: "multiple-lights",
    level: 3,
    question:
      "着色器声明 `#define NR_POINT_LIGHTS 4`，CPU 侧灌点光源的循环只写 `for (i = 0; i < 2; i++)`，会出什么问题？",
    answer:
      "数组里 `[2]`、`[3]` 没灌值，全是默认 0，相当于两盏「黑灯」——不亮，但仍白白参与累加计算。画面可能莫名偏暗或对不上光源数。改法：CPU 循环上限和着色器 `#define` 用同一个常量，逐个灌满 `[0..3]`。",
    tags: ["uniform 数组", "读代码", "误区"],
  },
  {
    id: "ml-37",
    chapter: "multiple-lights",
    level: 3,
    question:
      "想把场景改成「0 个平行光 + 8 个点光源 + 0 个聚光」，着色器、main、CPU 侧各改哪里？",
    answer:
      "①着色器：`#define NR_POINT_LIGHTS` 改成 `8`（数组随之变 8）；平行光/聚光的 uniform 可删可留。② `main`：删掉 `CalcDirLight`、`CalcSpotLight` 两行，`result` 用 `vec3(0.0)` 起头、循环全用 `+=`，上限自然是 8。③ CPU 侧：灌点光源的循环上限改到 8，逐个灌满 `pointLights[0..7]`，不再灌 `dirLight/spotLight`。关键是着色器 `#define` 和 CPU 循环上限用同一个数。",
    tags: ["改代码", "NR_POINT_LIGHTS", "应用"],
  },
  {
    id: "ml-38",
    chapter: "multiple-lights",
    level: 3,
    question:
      "默认 `NR_POINT_LIGHTS = 4`，main 跑完后 result 一共累加了几份光贡献？",
    answer:
      "6 份：1 份平行光（`CalcDirLight`）+ 4 份点光源（`for` 循环 4 次）+ 1 份聚光（`CalcSpotLight`），共 6 份贡献相加成 `FragColor`。",
    tags: ["main", "累加", "计算"],
  },
  {
    id: "ml-39",
    chapter: "multiple-lights",
    level: 3,
    question:
      "CalcPointLight 里 `float d = length(light.position - fragPos);` 这个 d 是什么？它用来干什么？",
    answer:
      "`d` 是光源到当前片段的距离。它代入衰减公式 `att = 1.0 / (constant + linear*d + quadratic*d*d)`，算出衰减系数 `att`，再乘到环境/漫反射/镜面三项上——距离越大 `d` 越大、`att` 越小，光越暗。",
    tags: ["CalcPointLight", "衰减", "读代码"],
  },
  {
    id: "ml-40",
    chapter: "multiple-lights",
    level: 3,
    question:
      "要在着色器里循环采到 `pointLights` 的第 3 个元素（共 4 个），下标该写几？写 `pointLights[4]` 行不行？",
    answer:
      "第 3 个写 `pointLights[2]`（下标从 0 起）。`pointLights[4]` 越界——数组只有 `[0..3]`，访问 `[4]` 是未定义行为。着色器里只能用 `0..NR_POINT_LIGHTS-1` 的下标。",
    tags: ["uniform 数组", "越界", "应用"],
  },
  {
    id: "ml-41",
    chapter: "multiple-lights",
    level: 3,
    question:
      "CPU 侧要给第 1 个点光源（下标 0）的位置灌值，C++ 和 WebGL2 各拼什么 uniform 名？",
    answer:
      '都用名字 `pointLights[0].position`。C++：`shader.setVec3("pointLights[0].position", ...)`；WebGL2：`gl.uniform3f(gl.getUniformLocation(program, "pointLights[0].position"), ...)`。下标在字符串里拼出来。',
    tags: ["uniform 数组", "API差异", "应用"],
  },
  {
    id: "ml-42",
    chapter: "multiple-lights",
    level: 3,
    question:
      "想给场景再加第二个聚光，main 和着色器要怎么改？main 结构会大改吗？",
    answer:
      "着色器再声明一个 `uniform SpotLight spotLight2;`（或把聚光也改成数组）；`main` 里多加一行 `result += CalcSpotLight(spotLight2, norm, FragPos, viewDir);`。`main` 结构基本不变——这正是函数化的好处，加光只是多调一行 + 累加。",
    tags: ["改代码", "CalcSpotLight", "应用"],
  },
  {
    id: "ml-43",
    chapter: "multiple-lights",
    level: 3,
    question:
      "不看原文，写出 CalcDirLight 的完整签名和函数体（已知全局 material、传入 light）。",
    answer:
      "`vec3 CalcDirLight(DirLight light, vec3 normal, vec3 viewDir)`：\n`vec3 lightDir = normalize(-light.direction);`\n`float diff = max(dot(normal, lightDir), 0.0);`\n`vec3 reflectDir = reflect(-lightDir, normal);`\n`float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);`\n`vec3 ambient = light.ambient * material.ambient;`\n`vec3 diffuse = light.diffuse * diff * material.diffuse;`\n`vec3 specular = light.specular * spec * material.specular;`\n`return ambient + diffuse + specular;`",
    tags: ["CalcDirLight", "默写", "应用"],
  },
  {
    id: "ml-44",
    chapter: "multiple-lights",
    level: 3,
    question:
      "CalcSpotLight 里 `float intensity = clamp((theta - light.outerCutOff) / eps, 0.0, 1.0);`，theta 落在内锥内、外锥外、内外之间时 intensity 各是多少？",
    answer:
      "`theta` 是 `dot(lightDir, normalize(-light.direction))`，越靠锥轴越大。内锥内（`theta ≥ cutOff`）：intensity 被 `clamp` 到 1（全亮）；外锥外（`theta ≤ outerCutOff`）：clamp 到 0（不照漫反射/镜面）；内外之间：在 0~1 间线性过渡（软边）。",
    tags: ["CalcSpotLight", "切光角", "计算"],
  },
  {
    id: "ml-45",
    chapter: "multiple-lights",
    level: 3,
    question: "把 CalcPointLight 改成「不衰减」（当平行光那样用），删哪几行？",
    answer:
      "删掉算距离和衰减的两行 `float d = length(...);`、`float att = 1.0 / (...);`，并把三项里的 `* att` 全去掉。这样点光源就不随距离变暗。（其实更接近 CalcDirLight，只是 `lightDir` 仍用 `position - fragPos`。）",
    tags: ["CalcPointLight", "衰减", "改代码"],
  },
  {
    id: "ml-46",
    chapter: "multiple-lights",
    level: 3,
    question:
      "GLSL 里 `uniform PointLight pointLights[NR_POINT_LIGHTS];` 占多少个 PointLight 的空间？`pointLights[i].position` 取的是什么？",
    answer:
      "占 `NR_POINT_LIGHTS`（默认 4）个连续的 `PointLight`。`pointLights[i].position` 取的是数组里第 `i` 个点光源结构体的 `position` 字段——下标选哪盏灯，点号取该灯的某个字段。",
    tags: ["uniform 数组", "读代码", "应用"],
  },
  {
    id: "ml-47",
    chapter: "multiple-lights",
    level: 3,
    question:
      "WebGL2 里用循环灌点光源数组，循环体里 `const p = \\`pointLights[${i}].\\`;` 这行起什么作用？",
    answer:
      '它拼出当前下标的字段名前缀，如 `i=0` 时 `p = "pointLights[0]."`。后面 `loc(p + "position")`、`loc(p + "constant")` 等就能拿到 `pointLights[0].position` 等完整 uniform 名，循环帮你把逐字段拼名自动化。',
    tags: ["uniform 数组", "WebGL2", "读代码"],
  },
  {
    id: "ml-48",
    chapter: "multiple-lights",
    level: 4,
    question:
      "main 里把 `for (int i = 0; i < NR_POINT_LIGHTS; i++)` 的上限误写成一个运行时传入的 uniform 变量 `numLights`，在 WebGL2 上可能出什么事？",
    answer:
      "可能编译失败或行为不可靠——WebGL2/GLSL ES 对循环次数能否编译期确定很敏感，动态上限不被保证支持。应把上限写成编译期常量 `NR_POINT_LIGHTS`。",
    tags: ["for 循环", "GLSL ES", "误区"],
  },
  {
    id: "ml-49",
    chapter: "multiple-lights",
    level: 3,
    question:
      "在 §5 主 Demo（单盏点光源）里，怎么操作能直观看出「多盏叠加会过曝」的苗头？",
    answer:
      "把镜面强度、环境强度都拉高，单盏光就能逼近顶白；再想象叠上好几盏，过曝（顶满 1.0 变纯白）只会更严重。Demo 是单盏，但拉高强度已能预演累加溢出的效果。",
    tags: ["过曝", "Demo", "应用"],
  },
  {
    id: "ml-50",
    chapter: "multiple-lights",
    level: 3,
    question:
      "CalcSpotLight 里 `float eps = light.cutOff - light.outerCutOff;`，eps 代表什么？它为什么是正数？",
    answer:
      "`eps` 是内外切光角余弦之差，代表软边过渡带的「宽度」。因为内锥更窄、夹角更小、余弦更大，所以 `cutOff > outerCutOff`，`eps` 为正。它当分母把 `theta - outerCutOff` 归一化到 0~1 做软边。",
    tags: ["CalcSpotLight", "切光角", "读代码"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 边界） ──
  {
    id: "ml-51",
    chapter: "multiple-lights",
    level: 4,
    question:
      "明明写了好几盏光的 Calc*，画面却只看到一盏（通常是最后一盏）的效果，最可能是什么原因？怎么修？",
    answer:
      "最可能是 `main` 里把某盏光的贡献算了却用 `=` 覆盖、而非 `+=` 加进 `result`（如写成 `result = CalcSpotLight(...)`），前面几盏被冲掉。修：第一盏可用 `=` 起头，之后每盏一律 `result += Calc...(...)`；对照「每份贡献都得加进总和」。",
    tags: ["累加", "陷阱", "综合"],
  },
  {
    id: "ml-52",
    chapter: "multiple-lights",
    level: 4,
    question:
      "场景里有些位置莫名偏暗、光源数怎么数都对不上，可能跟 uniform 数组有什么关系？怎么修？",
    answer:
      "uniform 数组没灌满——着色器声明了 `NR_POINT_LIGHTS` 个，CPU 侧循环上限写小了或漏了某下标，漏灌的元素全是 0，成了「黑灯」白白参与累加。修：CPU 灌值循环上限和着色器 `#define` 用同一常量，下标 0 到 N-1 一个不漏。",
    tags: ["uniform 数组", "陷阱", "黑灯"],
  },
  {
    id: "ml-53",
    chapter: "multiple-lights",
    level: 4,
    question:
      "被多盏光同时照到的面过曝、糊成纯白丢了细节，根因是什么？有哪几条修法（从简到进阶）？",
    answer:
      "根因：每盏光贡献都是正数，相加后某些通道超过 1.0 被钳到纯白。修法：①调低各盏光强度（尤其 `diffuse`/`specular`）；②减少同处叠加的光源数；③进阶上 HDR + 色调映射（后续篇章）把高动态范围压回可显示区间。",
    tags: ["过曝", "陷阱", "HDR"],
  },
  {
    id: "ml-54",
    chapter: "multiple-lights",
    level: 4,
    question:
      "场景一加到几十盏光就严重掉帧，为什么？前向渲染下怎么缓解、真要海量光源怎么办？",
    answer:
      "光照在片段着色器里逐像素跑，开销约「像素数 × 光源数」，几十盏光成本飙升。缓解：前向渲染里把同时生效的光控制在几盏到十几盏。海量光源（成百上千）需换延迟渲染等进阶管线（超出本篇）。",
    tags: ["性能", "陷阱", "延迟渲染"],
  },
  {
    id: "ml-55",
    chapter: "multiple-lights",
    level: 4,
    question:
      "为什么着色器里用了越界下标 `pointLights[5]`（数组只有 4 个）后果比「漏灌成黑灯」更糟？",
    answer:
      "漏灌只是多一盏值为 0 的黑灯，结果可预测（偏暗）。越界访问 `pointLights[5]` 是未定义行为——可能读到垃圾值、串到别的内存、或在某些平台编译/运行报错，表现不可预测。务必只用 `0..NR_POINT_LIGHTS-1` 的下标。",
    tags: ["uniform 数组", "越界", "陷阱"],
  },
  {
    id: "ml-56",
    chapter: "multiple-lights",
    level: 4,
    question:
      "把光照篇五章串起来：Phong、材质、光照贴图、投光物、多光源各自补了什么，合起来是什么？",
    answer:
      "基础光照给出 Phong（环境+漫反射+镜面）；材质把三色 + 反光度结构化；光照贴图让表面各处材质来自贴图；投光物给出平行光/点光源/聚光三类 + 衰减 + 切光角；多光源把多盏不同类型光的贡献相加。合起来 = 一套能用的完整光照。",
    tags: ["多光源", "综合", "光照篇"],
  },
  {
    id: "ml-57",
    chapter: "multiple-lights",
    level: 4,
    question:
      "若把 CalcDirLight、CalcPointLight、CalcSpotLight 的 `material.*` 改成从一张贴图采样，本章的「函数化 + 累加」结构要大改吗？",
    answer:
      "几乎不用改结构。三个函数仍各返回一份 `vec3` 贡献、`main` 仍累加，只是函数内 `material.diffuse` 等换成 `texture(...)` 的采样结果。这正体现函数化的好处：换材质来源是局部改动，累加骨架不动。",
    tags: ["光贡献函数", "综合", "光照贴图"],
  },
  {
    id: "ml-58",
    chapter: "multiple-lights",
    level: 4,
    question:
      "一个着色器里点光源用 `for` 循环 + 数组，聚光为什么本章不也塞进同一个循环？两者循环处理的前提差别是什么？",
    answer:
      "点光源是「多盏同类光」，适合用定长数组 + 循环统一处理；聚光本章只有一盏、且 `CalcSpotLight` 签名/逻辑与点光源不同，单独调一行更清晰。要循环处理，前提是「同类型、同函数、放进定长数组」——聚光若有多盏，也可改成 `spotLights[N]` 数组循环。",
    tags: ["for 循环", "uniform 数组", "综合"],
  },
  {
    id: "ml-59",
    chapter: "multiple-lights",
    level: 4,
    question:
      "改 demo 时把所有点光源的 `constant/linear/quadratic` 都灌成 0，运行会出什么问题？",
    answer:
      "衰减 `att = 1.0 / (constant + linear*d + quadratic*d*d)` 分母变成 0，发生除零——结果为 inf/NaN，乘进三项后该点光源贡献变成异常值（常见画面爆白或出黑斑）。`constant` 一般保持 1.0 起步，确保分母不为 0。",
    tags: ["衰减", "除零", "陷阱"],
  },
  {
    id: "ml-60",
    chapter: "multiple-lights",
    level: 4,
    question:
      "完整串一遍多光源片段着色器的执行链路：从 main 入口到 FragColor 落定，经过哪几环？",
    answer:
      "① `main` 先备好共用的 `norm`、`viewDir`（各算一次）；②调 `CalcDirLight` 得平行光贡献，`result =` 它；③ `for` 循环遍历 `pointLights[0..N-1]`，每次 `result += CalcPointLight(...)`；④ `result += CalcSpotLight(...)` 加上聚光；⑤ `FragColor = vec4(result, 1.0)`——各份贡献之和就是该片段最终色。",
    tags: ["main", "流程", "综合"],
  },
];
