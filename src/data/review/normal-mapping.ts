/** 复习题库 · 法线贴图（normal-mapping）。HEL-90 高级光照篇。 */

import type { ReviewQuestion } from "./types";

export const normalMappingQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / API / 数值约定） ──
  {
    id: "nm-1",
    chapter: "normal-mapping",
    level: 1,
    question: "什么是「法线贴图」？它每个像素存的是什么？",
    answer:
      "一张专门存「表面法线」的纹理：每个像素的 RGB 不是颜色，而是编码了「这一点的表面其实朝哪个方向」的一个法线向量。渲染时逐片元采样、解码出法线，用它去算光照。",
    tags: ["法线贴图", "定义"],
  },
  {
    id: "nm-2",
    chapter: "normal-mapping",
    level: 1,
    question: "法线贴图能在不加几何的情况下做出什么效果？",
    answer:
      "在一面平整的墙上造出**砖缝、凹凸的光影细节**，却不加一个三角形——凹凸感是「光照上的假象」，几何还是平的。",
    tags: ["法线贴图", "效果"],
  },
  {
    id: "nm-3",
    chapter: "normal-mapping",
    level: 1,
    question: "什么是「切线空间」？它的三个轴各是什么？",
    answer:
      "以表面**自身**为参照建立的局部坐标系。三个轴贴着表面：切线 T（沿纹理 U 方向）、副切线 B（沿纹理 V 方向）、法线 N（垂直表面朝外）。法线图里的法线就存在这个空间里。",
    tags: ["切线空间", "定义"],
  },
  {
    id: "nm-4",
    chapter: "normal-mapping",
    level: 1,
    question: "什么是「切线 T」和「副切线 B」？",
    answer:
      "切线空间里「躺在表面上」的两个轴：切线 T 沿纹理 U 方向、副切线 B 沿纹理 V 方向，二者都贴着表面且互相垂直。它们和法线 N 一起组成切线空间这组基（TBN 矩阵的三列）。",
    tags: ["切线·副切线", "定义"],
  },
  {
    id: "nm-5",
    chapter: "normal-mapping",
    level: 1,
    question: "什么是「TBN 矩阵」？怎么拼出来？",
    answer:
      "由切线 T、副切线 B、法线 N 三个轴当作三列拼成的 3×3 矩阵：`TBN = [T | B | N]`。用它一乘可把切线空间的向量变到世界（或视）空间。",
    tags: ["TBN 矩阵", "定义"],
  },
  {
    id: "nm-6",
    chapter: "normal-mapping",
    level: 1,
    question: "什么是「法线解码」？为什么要做？",
    answer:
      "法线图里每个分量按 `normal * 0.5 + 0.5` 被压进 `0~1` 的颜色范围存储；采样后必须反过来做 `normal = texColor * 2.0 - 1.0`，把 `0~1` 拉回真正的 `-1~1`，才能当法线用。",
    tags: ["法线解码", "定义"],
  },
  {
    id: "nm-7",
    chapter: "normal-mapping",
    level: 1,
    question: "切线空间里「正对外」的法线是哪个向量？对应法线图的什么颜色？",
    answer:
      "`(0, 0, 1)`。它对应法线图的基准色 `RGB(0.5, 0.5, 1.0)`（`*2-1` 解出 `(0,0,1)`）——因为大多像素接近这个值，整张法线图看上去**偏蓝紫色**。",
    tags: ["法线解码", "蓝紫"],
  },
  {
    id: "nm-8",
    chapter: "normal-mapping",
    level: 1,
    question: "法线贴图作用在渲染管线的哪个阶段？",
    answer:
      "作用在**片段着色器**：逐片元采样法线图、解码、然后拿这个被扰动的新法线替换原来的几何法线 N，去做漫反射和镜面。",
    tags: ["法线贴图", "管线位置"],
  },
  {
    id: "nm-9",
    chapter: "normal-mapping",
    level: 1,
    question: "法线贴图的两种实现是什么？",
    answer:
      "①把采样的切线空间法线 `× TBN` 推到**世界空间**，和世界空间的光 / 视算；②用 TBN 的转置把光 / 视向量拉进**切线空间**，和切线空间法线算。两种逻辑等价、二选一。",
    tags: ["TBN 矩阵", "两种实现"],
  },
  {
    id: "nm-10",
    chapter: "normal-mapping",
    level: 1,
    question: "为什么 TBN 矩阵的转置就等于它的逆？",
    answer:
      "因为 T、B、N 三轴互相垂直（正交），正交矩阵的转置就等于它的逆。所以用 `transpose(TBN)` 就能把世界空间向量变回切线空间。",
    tags: ["TBN 矩阵", "正交"],
  },
  {
    id: "nm-11",
    chapter: "normal-mapping",
    level: 1,
    question: "副切线 B 通常怎么补出来？",
    answer:
      "由切线 T 和法线 N 叉乘得到：`B = cross(N, T)`。顶点只需带切线 aTangent，副切线由叉乘凑出第三轴。",
    tags: ["切线·副切线", "cross"],
  },
  {
    id: "nm-12",
    chapter: "normal-mapping",
    level: 1,
    question:
      "片段着色器里采样、解码、换算法线的关键三行怎么写（世界空间实现）？",
    answer:
      "`vec3 sampled = texture(normalMap, TexCoords).rgb;` → `vec3 tangentN = normalize(sampled * 2.0 - 1.0);` → `vec3 worldNormal = normalize(TBN * tangentN);`。",
    tags: ["法线解码", "代码"],
  },
  {
    id: "nm-13",
    chapter: "normal-mapping",
    level: 1,
    question: "顶点着色器里施密特正交化那行怎么写？做什么？",
    answer:
      "`T = normalize(T - dot(T, N) * N);`——减去 T 在 N 上的投影分量，保证 T⊥N，让 TBN 三轴正交。建模导出的切线未必和法线严格垂直，这步纠正它。",
    tags: ["TBN 矩阵", "正交化"],
  },
  {
    id: "nm-14",
    chapter: "normal-mapping",
    level: 1,
    question: "法线贴图是 sRGB 还是线性数据？能做 gamma 解码吗？",
    answer:
      "法线贴图是**线性数据**（存的是数据不是颜色），**绝不能**像颜色贴图那样做 gamma / sRGB 解码——解码了会毁掉法线数据。用普通 `RGB` 纹理格式、别用 `SRGB8`。",
    tags: ["法线贴图", "线性"],
  },
  {
    id: "nm-15",
    chapter: "normal-mapping",
    level: 1,
    question: "法线贴图四步精髓是什么？",
    answer:
      "**采样 → 解码 `*2-1` → 乘 TBN 换到世界空间 → 照常算光照**。剩下的漫反射、镜面和 Blinn-Phong 一样，只是 `normal` 换成了采样出的扰动法线。",
    tags: ["法线贴图", "四步"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "nm-16",
    chapter: "normal-mapping",
    level: 2,
    question: "一面平墙所有片元法线相同，为什么就显不出凹凸？",
    answer:
      "表面有多亮取决于法线 N 和光线方向的夹角（`N·L`）。平墙所有片元 N 都一样（都垂直墙面），所以无论怎么照都均匀一片、没有起伏。法线贴图逐片元换不同的法线，才有明暗起伏。",
    tags: ["法线贴图", "机制"],
  },
  {
    id: "nm-17",
    chapter: "normal-mapping",
    level: 2,
    question: "法线图里的法线为什么不存世界空间、要存切线空间？",
    answer:
      "存世界空间的话，一张图就只能贴在某个固定朝向的墙上，墙一转或贴到地板，里面的法线方向全错。存切线空间（参照表面自己），**同一张法线图能贴到任意朝向的表面复用**。",
    tags: ["切线空间", "为什么"],
  },
  {
    id: "nm-18",
    chapter: "normal-mapping",
    level: 2,
    question: "为什么同一张法线图能贴到竖墙、斜坡、球面上都成立？",
    answer:
      "因为切线空间是相对表面自身定义的，法线图里写的「朝表面外偏一点」不绑定任何特定朝向。无论贴到什么朝向 / 弯曲的表面，「相对表面自己」的扰动都仍然成立。这正是非用切线空间不可的根本原因。",
    tags: ["切线空间", "复用"],
  },
  {
    id: "nm-19",
    chapter: "normal-mapping",
    level: 2,
    question: "为什么需要 TBN 矩阵换算，不能直接用采样的法线算光照？",
    answer:
      "法线图给的是**切线空间**法线，而光 / 视方向通常在**世界（或视）空间**。两个空间的向量不能直接点乘，必须先用 TBN（或其转置）把它们换算到同一空间，点乘才有意义。",
    tags: ["TBN 矩阵", "为什么"],
  },
  {
    id: "nm-20",
    chapter: "normal-mapping",
    level: 2,
    question: "法线图为什么整体偏蓝紫色？",
    answer:
      "因为切线空间里「正对外」是 `(0,0,1)`，对应颜色 `(0.5,0.5,1.0)`。绝大多数像素的法线接近正对外、只微微偏一点，所以颜色都接近这个偏蓝紫的基准色，整张图就偏蓝紫。",
    tags: ["法线解码", "蓝紫"],
  },
  {
    id: "nm-21",
    chapter: "normal-mapping",
    level: 2,
    question: "为什么采样出的 RGB 不是法线本身、必须解码？",
    answer:
      "法线分量取值是 `-1~1`，但纹理像素是 `0~1`。存图时做了 `normal*0.5+0.5` 压缩才能当颜色存。所以采样回来是 `0~1` 的压缩值，必须 `*2-1` 还原回 `-1~1` 才是真法线。",
    tags: ["法线解码", "机制"],
  },
  {
    id: "nm-22",
    chapter: "normal-mapping",
    level: 2,
    question: "两种实现（法线推世界 vs 光视拉切线）各有什么优劣？",
    answer:
      "「法线推世界」直观（法线一乘 TBN 就好）；「光视拉切线」更省——把矩阵乘法挪到顶点着色器（顶点比片段少），片段不做矩阵乘。逻辑等价，挑一种用、别混用。",
    tags: ["TBN 矩阵", "对比"],
  },
  {
    id: "nm-23",
    chapter: "normal-mapping",
    level: 2,
    question: "为什么忘了 *2-1 解码会让画面整片发蓝、光照全错？",
    answer:
      "不解码就把 `0~1` 的 RGB 当法线，所有分量都成了正数、z 分量恒为正。最常见的底色 `(0.5,0.5,1)` 直接当法线就是一个偏蓝的歪向量，拿去算光照全盘错位、画面整片发蓝。",
    tags: ["法线解码", "为什么"],
  },
  {
    id: "nm-24",
    chapter: "normal-mapping",
    level: 2,
    question: "为什么法线贴图是线性数据、不能像颜色贴图那样 gamma 解码？",
    answer:
      "颜色 / 漫反射贴图是 sRGB、要 `pow(c,2.2)` 解码；但法线图存的是**方向数据不是颜色**，本就是线性的。错误地对它 `^2.2`，法线分量被压扭、数据当场毁掉、凹凸方向乱掉。",
    tags: ["法线贴图", "线性"],
  },
  {
    id: "nm-25",
    chapter: "normal-mapping",
    level: 2,
    question: "施密特正交化为什么必要？不做会怎样？",
    answer:
      "建模导出的切线未必和法线严格垂直，TBN 三轴就不正交、换算会偏。`T = normalize(T - dot(T,N)*N)` 减去 T 在 N 上的投影保证 T⊥N，再 `B = cross(N,T)` 凑齐正交三轴。不做会出歪斜错位的光照。",
    tags: ["TBN 矩阵", "正交化"],
  },
  {
    id: "nm-26",
    chapter: "normal-mapping",
    level: 2,
    question: "法线贴图的凹凸和真几何凹凸，本质区别是什么？",
    answer:
      "几何没变——凹凸全是「光照所用的那个法线」被逐片元扰动后算出来的光影假象。真几何凹凸会有真实的轮廓、遮挡；法线贴图只改明暗，轮廓还是平的（这也是下一章视差贴图要补的）。",
    tags: ["法线贴图", "对比"],
  },
  {
    id: "nm-27",
    chapter: "normal-mapping",
    level: 2,
    question:
      "为什么移动光源时，开着法线贴图能看到高光暗影沿砖缝爬动，关着不会？",
    answer:
      "开着时每个片元用的是被扰动的法线，缝边法线被推歪，光一动迎光 / 背光侧的明暗就变、高光暗影沿缝爬动；关着时每片元都用同一个几何法线 `(0,0,1)`，怎么移光都还是均匀的平面。",
    tags: ["法线贴图", "随光变"],
  },
  {
    id: "nm-28",
    chapter: "normal-mapping",
    level: 2,
    question: "「光视拉进切线空间」这种实现，顶点和片段各做什么？",
    answer:
      "顶点：用 `transpose(TBN)` 把 `lightPos`、`viewPos`、`FragPos` 变进切线空间传给片段。片段：采样法线解码后**不用再乘 TBN**，直接和切线空间的光 / 视向量算光照。矩阵乘挪到顶点，片段更省。",
    tags: ["TBN 矩阵", "实现"],
  },
  {
    id: "nm-29",
    chapter: "normal-mapping",
    level: 2,
    question: "法线贴图在两端 GLSL 有 API 差异吗？跨端区别在哪？",
    answer:
      "采样、解码、TBN 换算这几行计算逻辑两端一致。区别是老几样：桌面 `#version 330 core` + `layout(location=…)`；WebGL2 `#version 300 es`、片段着色器必写 `precision highp float;`，属性位置一般用 JS 端绑定。",
    tags: ["跨端", "对比"],
  },

  // ── L3 应用（给参数判结果 / 改法 / 读代码） ──
  {
    id: "nm-30",
    chapter: "normal-mapping",
    level: 3,
    question: "采样法线图后不做 *2-1、直接当法线用会怎样？怎么修？",
    answer:
      "画面整片发蓝、光照全乱、凹凸方向也不对（所有分量成正数、z 恒为正）。修法：采样后必须 `normal = normalize(texColor * 2.0 - 1.0)` 把 `[0,1]` 拉回 `[-1,1]` 再用。",
    tags: ["法线解码", "排错"],
  },
  {
    id: "nm-31",
    chapter: "normal-mapping",
    level: 3,
    question: "在砖墙 Demo 里想让凹凸阴影最分明立体，四个控件各往哪调？",
    answer:
      "①法线贴图开关：**打开**（关着没凹凸）；②凹凸强度：调**大**（扰动幅度越大明暗差越大）；③④光源 X / Y：拖到**偏侧**位置（侧光制造长阴影，正对照凹凸明暗差最小）。",
    tags: ["Demo", "应用"],
  },
  {
    id: "nm-32",
    chapter: "normal-mapping",
    level: 3,
    question:
      "开了 gamma 流程后，法线贴图照亮的表面凹凸乱掉、光照发闷，最可能哪错了？",
    answer:
      "把法线图也当 sRGB 做了 gamma 解码，法线分量被 `^2.2` 一压、数据毁掉。修法：只对颜色贴图做 sRGB 解码，法线图保持线性、绝不 gamma 解码（用普通 RGB 格式、别用 SRGB8）。",
    tags: ["法线贴图", "排错"],
  },
  {
    id: "nm-33",
    chapter: "normal-mapping",
    level: 3,
    question: "凹凸看着「凹凸反了」（该凸的凹），TBN 可能哪里错了？",
    answer:
      "建模导出的切线和法线没正交化，或副切线 `cross` 顺序 / handedness 反了，导致三轴不垂直或某轴朝向相反。修法：做施密特正交化、`B = cross(N,T)`；若整体反向，检查 cross 顺序或按 UV handedness 翻转 B。",
    tags: ["TBN 矩阵", "排错"],
  },
  {
    id: "nm-34",
    chapter: "normal-mapping",
    level: 3,
    question: "高光暗影位置整个错位、移光时凹凸响应方向不对，最可能是什么坑？",
    answer:
      "把**切线空间**的采样法线和**世界空间**的光 / 视向量直接点乘了——两空间向量混用，结果毫无意义。修法：二选一并贯彻——要么法线 `× TBN` 推世界、要么光 / 视 `transpose(TBN)` 拉切线，别混用。",
    tags: ["TBN 矩阵", "排错"],
  },
  {
    id: "nm-35",
    chapter: "normal-mapping",
    level: 3,
    question:
      "给定 normalMap、TBN（切线→世界）、TexCoords，写出得到世界空间法线的关键三行。",
    answer:
      "`vec3 sampled = texture(normalMap, TexCoords).rgb;` → `vec3 tangentN = normalize(sampled * 2.0 - 1.0);` → `vec3 worldNormal = normalize(TBN * tangentN);`。顺序不能乱：先采样、再 `*2-1` 解码、最后 `× TBN`。",
    tags: ["代码", "应用"],
  },
  {
    id: "nm-36",
    chapter: "normal-mapping",
    level: 3,
    question:
      "在 Demo 里把凹凸强度调到 0、光源拖回正中，会看到什么？验证了什么？",
    answer:
      "凹凸几乎消失、回到平面。验证了「凹凸全是法线扰动算出来的光影假象」——强度 0 没扰动、正光明暗差最小，几何本来就是平的。",
    tags: ["Demo", "应用"],
  },
  {
    id: "nm-37",
    chapter: "normal-mapping",
    level: 3,
    question: "顶点着色器构造 TBN 的几行大致怎么写（世界空间实现）？",
    answer:
      "`vec3 T = normalize(mat3(model)*aTangent); vec3 N = normalize(mat3(model)*aNormal); T = normalize(T - dot(T,N)*N); vec3 B = cross(N,T); TBN = mat3(T,B,N);`——把 T、N 变到世界、正交化、叉乘补 B、三轴当三列。",
    tags: ["TBN 矩阵", "代码"],
  },
  {
    id: "nm-38",
    chapter: "normal-mapping",
    level: 3,
    question: "Demo 里关 / 开法线贴图，整面墙各是什么样？为什么？",
    answer:
      "关：整面均匀一片、像张平纸（每片元用同一几何法线 `(0,0,1)`，光照处处一样）。开：砖缝凹下去、砖面鼓起来、凹凸凭空出现（缝边法线被推歪，迎光侧亮、背光侧暗）。",
    tags: ["Demo", "应用"],
  },
  {
    id: "nm-39",
    chapter: "normal-mapping",
    level: 3,
    question:
      "采样后解码了却忘了 × TBN，直接拿切线空间法线和世界空间光算，会怎样？",
    answer:
      "光照错位——切线空间法线和世界空间光 / 视向量在不同空间，点乘无意义，高光暗影位置整个错。修法：补上 `× TBN` 把法线推到世界空间再算（或改走「光视拉切线」实现）。",
    tags: ["TBN 矩阵", "排错"],
  },
  {
    id: "nm-40",
    chapter: "normal-mapping",
    level: 3,
    question: "想把法线贴图实现从「法线推世界」改成「光视拉切线」，要改哪里？",
    answer:
      "顶点着色器里用 `transpose(TBN)` 把 `lightPos`、`viewPos`、`FragPos` 变进切线空间传给片段；片段着色器采样解码法线后**去掉 `× TBN`**、直接和切线空间的光 / 视向量算光照。",
    tags: ["TBN 矩阵", "改写"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 边界） ──
  {
    id: "nm-41",
    chapter: "normal-mapping",
    level: 4,
    question:
      "法线贴图四个常见坑：发蓝、凹凸乱（gamma）、凹凸反、错位，分别根因和修法是什么？",
    answer:
      "①发蓝：忘 `*2-1` 解码，补解码。②凹凸乱：法线图当 sRGB 做了 gamma 解码，法线图保持线性。③凹凸反：TBN 不正交 / handedness 反，正交化 + 检查 cross 顺序。④错位：切线 / 世界空间向量混用，二选一贯彻。",
    tags: ["陷阱", "综合"],
  },
  {
    id: "nm-42",
    chapter: "normal-mapping",
    level: 4,
    question: "为什么「切线空间」「TBN」「解码」三者缺一不可？",
    answer:
      "切线空间让法线图能复用到任意朝向；TBN 把切线空间法线和世界空间光统一到同一空间才能点乘；解码把存储的 `0~1` 还原成真法线 `-1~1`。少了切线空间不能复用、少了 TBN 算不对、少了解码全发蓝——三者各管一环。",
    tags: ["综合", "三概念"],
  },
  {
    id: "nm-43",
    chapter: "normal-mapping",
    level: 4,
    question:
      "结合 gamma 校正那章：颜色贴图和法线贴图在 gamma 处理上为什么截然相反？",
    answer:
      "颜色 / 漫反射贴图是 sRGB（给屏幕看的颜色），入口要 `pow(c,2.2)` 解码到线性；法线贴图存的是方向数据、本就是线性的，绝不能解码（解码会毁数据）。一个要解码、一个绝不解码，因为一个是颜色、一个是数据。",
    tags: ["综合", "gamma"],
  },
  {
    id: "nm-44",
    chapter: "normal-mapping",
    level: 4,
    question: "两种 TBN 实现混用会出什么隐蔽问题？怎么避免？",
    answer:
      "比如顶点把光 / 视拉进了切线空间，片段却又把法线 `× TBN` 推到世界——双方落在不同空间，点乘错位、光照怪异，且不报错很难查。避免：选定一种实现并**贯彻到底**，顶点和片段对齐同一个空间。",
    tags: ["TBN 矩阵", "综合"],
  },
  {
    id: "nm-45",
    chapter: "normal-mapping",
    level: 4,
    question:
      "为什么 Demo 用平面正对 +Z 的「平凡切线空间」演示，真实场景却必须靠 TBN？",
    answer:
      "平面正对 +Z 时切线空间是平凡的（`T=+X, B=+Y, N=+Z`），采样法线可直接当世界法线用。但真实场景表面朝向千变万化，切线空间各不相同，必须靠每个顶点的 TBN 把切线空间法线换算到统一空间，才能正确算光照。",
    tags: ["TBN 矩阵", "综合"],
  },
  {
    id: "nm-46",
    chapter: "normal-mapping",
    level: 4,
    question: "把采样、解码、× TBN 三步顺序打乱（如先 × TBN 再解码），会怎样？",
    answer:
      "顺序错了结果全错。如先 `× TBN` 再 `*2-1`：你把 `0~1` 的压缩值当切线空间法线乘了矩阵、得到错的世界向量，再 `*2-1` 也救不回。正确顺序：先采样、再 `*2-1` 解码、最后 `× TBN`。",
    tags: ["综合", "顺序"],
  },
  {
    id: "nm-47",
    chapter: "normal-mapping",
    level: 4,
    question: "法线贴图省了几何、却没省什么？它和真几何凹凸的本质局限是什么？",
    answer:
      "省了三角形数（不加几何），但没改「你斜看该看到哪一点」——轮廓还是平的、近处凸起不会真挡住后面。本质局限：它只改明暗、不改可见性，没有真遮挡。这正是下一章视差贴图要补的。",
    tags: ["综合", "局限"],
  },
  {
    id: "nm-48",
    chapter: "normal-mapping",
    level: 4,
    question:
      "为什么副切线 B 既可以用 cross(N,T) 补、也可能要按 UV handedness 翻转？",
    answer:
      "`B = cross(N,T)` 凑出第三个正交轴。但 UV 在某些面上是镜像的（handedness 不同），此时叉乘出的 B 方向可能反，导致凹凸整体反向。这种情况要按 UV 的 handedness 给 B 取个符号翻转，保证切线空间手性正确。",
    tags: ["切线·副切线", "综合"],
  },
  {
    id: "nm-49",
    chapter: "normal-mapping",
    level: 4,
    question:
      "一个表面凹凸看着「整体反向」，从 cross 顺序、副切线符号两方面怎么排查？",
    answer:
      "①检查 `cross` 顺序：应是 `B = cross(N, T)`，写成 `cross(T, N)` 会让 B 反向。②检查副切线符号 / UV handedness：镜像 UV 的面叉乘出的 B 可能反，按 handedness 翻转 B（乘 ±1）。两处任一错都会让凹凸整体反。",
    tags: ["TBN 矩阵", "综合"],
  },
  {
    id: "nm-50",
    chapter: "normal-mapping",
    level: 4,
    question: "把整条法线贴图流程讲清：从一张图到平墙在灯下坑洼分明。",
    answer:
      "①顶点：算 TBN（T、N 变世界、施密特正交化、`B=cross(N,T)`），传给片段。②片段：`texture` 采样法线图拿 `0~1` RGB → `*2-1` 解码成切线空间法线 → `× TBN` 推到世界空间。③用这个被扰动的世界法线和世界空间 L、V 照常算 Blinn-Phong。注意法线图保持线性、不做 gamma 解码。于是平墙逐片元法线各异、缝暗面亮，灯下坑洼分明却不加一个三角形。",
    tags: ["综合", "全流程"],
  },
];
