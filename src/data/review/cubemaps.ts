/** 复习题库 · 立方体贴图（cubemaps）。HEL-78 高级OpenGL篇。 */

import type { ReviewQuestion } from "./types";

export const cubemapsQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / API / 数值约定） ──
  {
    id: "cb-1",
    chapter: "cubemaps",
    level: 1,
    question: "什么是「立方体贴图」（cubemap）？它由几张图组成？",
    answer:
      "一种特殊纹理，由 **6 张 2D 图**组成，分别贴在一个立方体的 6 个面（内壁）上：右(+X)、左(−X)、上(+Y)、下(−Y)、后(+Z)、前(−Z)。它非常适合表示「物体周围一整圈的环境」。",
    tags: ["立方体贴图", "定义"],
  },
  {
    id: "cb-2",
    chapter: "cubemaps",
    level: 1,
    question: "立方体贴图用什么来采样？和普通 2D 纹理有何不同？",
    answer:
      "立方体贴图用一根三维**方向向量** `(x, y, z)` 来采样，而不是普通 2D 纹理那样的二维 uv 坐标 `(u, v)`。给一个从立方体中心射出的方向，它戳中某个面的某一点，那一点的颜色就是采样结果。",
    tags: ["方向向量来采样", "定义"],
  },
  {
    id: "cb-3",
    chapter: "cubemaps",
    level: 1,
    question: "用方向向量采样立方体贴图时，向量的长度重要吗？",
    answer:
      "不重要。采样只看方向、不看长度——向量多长都行，只看它指向哪。从立方体中心朝这个方向射出去，戳中哪个面的哪一点，那一点的颜色就是采样结果。",
    tags: ["方向向量来采样", "长度"],
  },
  {
    id: "cb-4",
    chapter: "cubemaps",
    level: 1,
    question: "OpenGL 里立方体贴图的目标常量是什么？6 个面的枚举叫什么？",
    answer:
      "目标常量是 `GL_TEXTURE_CUBE_MAP`（不是 `GL_TEXTURE_2D`）。6 个面是 `GL_TEXTURE_CUBE_MAP_POSITIVE_X`（右）、`NEGATIVE_X`（左）、`POSITIVE_Y`（上）、`NEGATIVE_Y`（下）、`POSITIVE_Z`（后）、`NEGATIVE_Z`（前）。",
    tags: ["GL_TEXTURE_CUBE_MAP", "API"],
  },
  {
    id: "cb-5",
    chapter: "cubemaps",
    level: 1,
    question: "加载 6 个面时常用的 `POSITIVE_X + i` 这招靠什么成立？",
    answer:
      "靠 6 个面的枚举值是**连续递增**的：`GL_TEXTURE_CUBE_MAP_POSITIVE_X + i`（i 从 0 到 5）依次命中右 / 左 / 上 / 下 / 后 / 前。所以加载时可以用一个循环把六张图依次塞进去。",
    tags: ["GL_TEXTURE_CUBE_MAP", "加载"],
  },
  {
    id: "cb-6",
    chapter: "cubemaps",
    level: 1,
    question: "立方体贴图的环绕方式该设成什么？多设哪个维度？",
    answer:
      "三个维度（S / T / R）都设成 `GL_CLAMP_TO_EDGE`（钳到边缘）。比 2D 纹理多一个第三维 `GL_TEXTURE_WRAP_R`，因为立方体贴图是 3D 采样、要钳三个维度，否则六个面交界处会出现接缝伪影。",
    tags: ["CLAMP_TO_EDGE", "API"],
  },
  {
    id: "cb-7",
    chapter: "cubemaps",
    level: 1,
    question: "什么是「天空盒」（skybox）？相机放在哪里？",
    answer:
      "用立方体贴图当背景的一个大盒子：把相机放在盒子正中央，盒子的 6 个内壁贴着环境图，往任意方向看出去都是那圈环境。它要永远在「最远处」当背景，相机怎么移动都到不了盒壁。",
    tags: ["天空盒", "定义"],
  },
  {
    id: "cb-8",
    chapter: "cubemaps",
    level: 1,
    question: "天空盒的采样方向向量从哪来？为什么不需要单独准备 uv？",
    answer:
      "立方体的每个顶点本身就是一个从中心指向那个角的方向向量，所以**顶点坐标直接拿来当采样方向**就行——把局部坐标 `aPos` 传给片段着色器当方向，不需要另外准备 uv。",
    tags: ["天空盒", "方向向量来采样"],
  },
  {
    id: "cb-9",
    chapter: "cubemaps",
    level: 1,
    question: "什么是「天空盒去平移」？具体怎么做？",
    answer:
      "渲染天空盒时让它只随相机**旋转**、不随相机**位移**。做法是取观察矩阵的左上角 3×3 部分 `mat3(view)`（只保留旋转、丢掉位移），再补成 `mat4`。这样天空盒永远以相机为中心、在最远处当背景。",
    tags: ["天空盒去平移", "定义"],
  },
  {
    id: "cb-10",
    chapter: "cubemaps",
    level: 1,
    question: "让天空盒永远在最远处的深度技巧是哪两步？",
    answer:
      "①顶点着色器里 `gl_Position = pos.xyww`（让 z = w），透视除法后深度恒为最大值 `1.0`；②把深度测试从默认 `GL_LESS` 改成 `GL_LEQUAL`。这样天空盒只画在没有物体挡着的地方、不盖住任何物体。",
    tags: ["深度技巧", "API"],
  },
  {
    id: "cb-11",
    chapter: "cubemaps",
    level: 1,
    question: "什么是「环境映射」（environment mapping）？最常见哪两种？",
    answer:
      "用立方体贴图给物体表面「照」上周围环境的一类技术：物体每个片段算出一根方向向量，拿它去采样环境立方体贴图，把环境颜色映到表面上。最常见两种：**反射**（像镜子）和**折射**（像玻璃）。",
    tags: ["环境映射", "定义"],
  },
  {
    id: "cb-12",
    chapter: "cubemaps",
    level: 1,
    question: "什么是「反射」（reflection）？反射方向用哪个内置函数算？",
    answer:
      "反射让物体表面像镜子一样把周围环境原样映出来。从相机看向该点的视线 `I` 打到表面，按法线 `N` 算出反射方向 `R = reflect(I, N)`（关于法线对称弹出、入射角 = 反射角），用 `R` 采样环境立方体贴图。",
    tags: ["反射", "reflect"],
  },
  {
    id: "cb-13",
    chapter: "cubemaps",
    level: 1,
    question: "什么是「折射」（refraction）？折射方向用哪个内置函数算？",
    answer:
      "折射让物体像玻璃 / 水一样把背后的环境弯折着透过来。视线 `I` 打到表面后穿过界面进入介质、被弯折，得到折射方向 `R = refract(I, N, ratio)`，用 `R` 采样环境立方体贴图。",
    tags: ["折射", "refract"],
  },
  {
    id: "cb-14",
    chapter: "cubemaps",
    level: 1,
    question: "什么是「折射率比」（ratio）？常见介质折射率有哪些？",
    answer:
      "折射率比是弯折程度的决定因素，等于两介质折射率之比 $\\text{ratio} = n_1 / n_2$（$n_1$ 入射侧如空气、$n_2$ 进入侧如玻璃）。常见折射率：空气 1.00、水 1.33、冰 1.309、玻璃 1.52、钻石 2.42。",
    tags: ["折射率比", "定义"],
  },
  {
    id: "cb-15",
    chapter: "cubemaps",
    level: 1,
    question: "片段着色器里采样立方体贴图的采样器类型和采样函数是什么？",
    answer:
      "采样器类型是 `samplerCube`（不是 `sampler2D`）。采样函数是 `texture(skybox, R)`，第二个参数 `R` 是 **3D 方向向量**（不是 2D 的 `vec2` uv）。",
    tags: ["samplerCube", "API"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "cb-16",
    chapter: "cubemaps",
    level: 2,
    question: "没有立方体贴图，场景的背景和金属 / 玻璃物体会显得怎样？",
    answer:
      "没有它，场景只有一个纯色背景，物体表面也照不出周遭的世界——金属球不能像镜子映环境、玻璃球不能透出弯折的环境，金属和玻璃都会显得很假、缺乏「周遭感」。",
    tags: ["立方体贴图", "为什么"],
  },
  {
    id: "cb-17",
    chapter: "cubemaps",
    level: 2,
    question: "为什么天空盒一定要「去平移」？不去会出什么问题？",
    answer:
      "你站在盒子正中，盒子应该永远以你为中心、你永远走不到盒壁。若天空盒老实跟着相机位移走位，相机一移动就会「撞」到某面盒壁、糊一脸、穿模。去平移（只留旋转）后天空盒只随相机转、不随相机走，才能当永远在最远处的背景。",
    tags: ["天空盒去平移", "为什么"],
  },
  {
    id: "cb-18",
    chapter: "cubemaps",
    level: 2,
    question: "`mat3(view)` 为什么能去掉位移、只留旋转？",
    answer:
      "观察矩阵是 4×4，左上角 3×3 部分编码旋转、第四列编码位移。取 `mat3(view)` 只保留左上 3×3、把第四列（位移）丢掉，再补成 `mat4`，就只剩旋转——相机往哪走，天空盒都跟着、永远以相机为中心。",
    tags: ["天空盒去平移", "机制"],
  },
  {
    id: "cb-19",
    chapter: "cubemaps",
    level: 2,
    question: "天空盒用 `gl_Position = pos.xyww` 后，为什么深度恒为 1.0？",
    answer:
      "把输出位置的 `z` 分量设成等于 `w`（`pos.xyww` 即 z = w），透视除法时屏幕深度算的是 `z / w = w / w = 1.0`，恒为最大深度值 1.0。这让天空盒永远「贴在最远处」。",
    tags: ["深度技巧", "机制"],
  },
  {
    id: "cb-20",
    chapter: "cubemaps",
    level: 2,
    question:
      "天空盒深度恒为 1.0 后，为什么要把深度函数从 `GL_LESS` 改成 `GL_LEQUAL`？",
    answer:
      "默认 `GL_LESS` 要求新深度严格小于已有深度才通过。天空盒深度恒为 1.0，若背景清空值也是 1.0，`1.0 < 1.0` 永远不成立，天空盒一个像素都画不出来。改成 `GL_LEQUAL`（`1.0 <= 1.0` 成立）它才能画在没有物体挡着的地方。",
    tags: ["深度技巧", "为什么"],
  },
  {
    id: "cb-21",
    chapter: "cubemaps",
    level: 2,
    question: "天空盒、反射、折射看着是三件事，共用的核心动作是什么？",
    answer:
      "共用同一个核心动作：**算一根方向向量、去采样同一张立方体贴图**。变的只是方向向量的来历——天空盒用看出去的视线、反射用 `reflect(I,N)`、折射用 `refract(I,N,ratio)`，不变的是采样动作。",
    tags: ["立方体贴图", "环境映射", "机制"],
  },
  {
    id: "cb-22",
    chapter: "cubemaps",
    level: 2,
    question: "反射公式 $R = I - 2(N \\cdot I)N$ 在几何上做了什么？",
    answer:
      "$N \\cdot I$ 是 $I$ 在法线上的投影。减去一倍只是把 $I$「拍平」到表面上，减去**两倍**则让它越过表面、对称地弹到另一侧——结果就是「入射角 = 反射角」的镜面反射。",
    tags: ["反射", "数学"],
  },
  {
    id: "cb-23",
    chapter: "cubemaps",
    level: 2,
    question:
      "斯涅尔定律 $n_1\\sin\\theta_1 = n_2\\sin\\theta_2$ 的直观结论是什么？",
    answer:
      "入射角与折射角的正弦之比等于两介质折射率的反比。直观结论：光进入更「密」的介质（折射率更大，如从空气进玻璃）会**弯向法线**（折射角更小）；进入更「稀」的介质则弯离法线。`refract` 内部就按这条算。",
    tags: ["斯涅尔定律", "折射", "机制"],
  },
  {
    id: "cb-24",
    chapter: "cubemaps",
    level: 2,
    question: "反射和折射的片段着色器有多大区别？变的是哪一行？",
    answer:
      "几乎只差一行：把 `R = reflect(I, N)` 换成 `R = refract(I, N, ratio)`、多一个折射率比 `ratio`，其余（算 `I`、采样 `texture(skybox, R)`）一模一样。这正是 Demo 切材质时背后发生的事。",
    tags: ["反射", "折射", "对比"],
  },
  {
    id: "cb-25",
    chapter: "cubemaps",
    level: 2,
    question: "`reflect` / `refract` 为什么要求 `I` 和 `N` 是单位向量？",
    answer:
      "因为这两个内置函数的几何推导建立在单位向量上（投影、对称弹出、Snell 弯折都假设长度为 1）。输入不归一化，算出的反射 / 折射方向就是错的。所以代码里对视线 `Position - cameraPos` 和法线 `Normal` 都做 `normalize`。",
    tags: ["反射", "折射", "归一化"],
  },
  {
    id: "cb-26",
    chapter: "cubemaps",
    level: 2,
    question:
      "采样立方体贴图的方向向量需要手动归一化吗？为什么和 reflect/refract 输入不同？",
    answer:
      "采样方向**不必**手动归一化——立方体贴图采样只看方向、不看长度。但 `reflect` / `refract` 的**输入** `I`、`N` 必须是单位向量，否则算出的方向错。两者要求不同：采样看方向，函数推导要单位长度。",
    tags: ["方向向量来采样", "归一化", "对比"],
  },
  {
    id: "cb-27",
    chapter: "cubemaps",
    level: 2,
    question: "天空盒通常在场景里第几个画？为什么这样安排省效率？",
    answer:
      "通常**最后画**。先画完所有物体、深度缓冲里已记下物体占了哪些像素，天空盒深度恒 1.0 + `GL_LEQUAL` 只填到没物体挡着的空白处。这样被物体遮住的天空盒像素不会白白着色，省效率。",
    tags: ["天空盒", "为什么"],
  },
  {
    id: "cb-28",
    chapter: "cubemaps",
    level: 2,
    question:
      "玻璃（1.52）和水（1.33）做折射球，哪个里的环境弯折更强？为什么？",
    answer:
      "玻璃更强。折射率差越大、弯折越狠：玻璃 1.52 比水 1.33 折射率更高，光从空气进玻璃比进水弯得更厉害。`ratio` 越接近 1（两介质折射率越接近）弯折越小——水 `ratio ≈ 0.752` 比玻璃 `≈ 0.658` 更接近 1，所以水球弯折更弱。",
    tags: ["折射", "折射率比", "对比"],
  },
  {
    id: "cb-29",
    chapter: "cubemaps",
    level: 2,
    question: "立方体贴图相比 2D 纹理，加载和采样上有哪些 API 差异？",
    answer:
      "目标常量从 `GL_TEXTURE_2D` 换成 `GL_TEXTURE_CUBE_MAP`；6 个面用 `GL_TEXTURE_CUBE_MAP_POSITIVE_X + i`（固定顺序右/左/上/下/后/前）；环绕方式多一个第三维 `GL_TEXTURE_WRAP_R`；采样器类型是 `samplerCube`、采样用 3D 方向向量而非 2D uv。",
    tags: ["API差异", "对比"],
  },

  // ── L3 应用（读代码 / 给参数判结果 / 手算） ──
  {
    id: "cb-30",
    chapter: "cubemaps",
    level: 3,
    question:
      "天空盒不动时正常，相机一移动就糊到脸上、穿模。最可能哪一步没做对？怎么修？",
    answer:
      "最可能**没去平移**——直接用了带位移的 `view` 矩阵，天空盒被当成固定在世界某处的盒子，相机走近就撞上去。修法：渲染天空盒时把观察矩阵取 `mat4(mat3(view))`（只留旋转、丢掉位移）。",
    tags: ["天空盒去平移", "读代码"],
  },
  {
    id: "cb-31",
    chapter: "cubemaps",
    level: 3,
    question:
      "天空盒用了 `gl_Position = pos.xyww` 但深度函数还是默认 `GL_LESS`，结果如何？怎么修？",
    answer:
      "天空盒一个像素都画不出来（背景还是纯色）。因为深度恒为 1.0，`1.0 < 1.0` 永远不成立、全被深度测试丢弃。修法：画天空盒前 `glDepthFunc(GL_LEQUAL)`（`1.0 <= 1.0` 成立），画完再恢复 `GL_LESS`。",
    tags: ["深度技巧", "读代码"],
  },
  {
    id: "cb-32",
    chapter: "cubemaps",
    level: 3,
    question:
      "折射做出来玻璃里环境整个翻了、弯折方向反了。最可能是哪个值写错？怎么修？",
    answer:
      "最可能 `ratio` 分子分母写反——写成 `1.52/1.00`（玻璃→空气）而不是 `1.00/1.52`（空气→玻璃），弯折方向整个颠倒。修法：`ratio = n1/n2`，`n1` 入射侧（通常空气 1.00）、`n2` 进入侧（如玻璃 1.52），别写反。",
    tags: ["折射率比", "读代码"],
  },
  {
    id: "cb-33",
    chapter: "cubemaps",
    level: 3,
    question:
      "把 CubemapDemo 折射球从「空气→玻璃」改成水（折射率 1.33），`ratio` 怎么写？",
    answer:
      "`ratio = 1.00 / 1.33 ≈ 0.752`（空气 $n_1 = 1.00$ → 水 $n_2 = 1.33$）。在折射片段着色器里把 `float ratio = 1.00 / 1.52;` 改成 `float ratio = 1.00 / 1.33;` 即可，其余 `I`、`R = refract(...)`、采样都不动。",
    tags: ["折射率比", "应用"],
  },
  {
    id: "cb-34",
    chapter: "cubemaps",
    level: 3,
    question:
      "反射公式 $R = I - 2(N\\cdot I)N$，设 $I = (0,-1,0)$、$N = (0,1,0)$，手算 $R$。",
    answer:
      "先算 $N \\cdot I = (0)(0)+(1)(-1)+(0)(0) = -1$。代入：$R = (0,-1,0) - 2(-1)(0,1,0) = (0,-1,0)+(0,2,0) = (0,1,0)$。结果**垂直向上**——光垂直向下打到水平镜面，原路垂直弹回，入射角 = 反射角 = 0°，符合「正对镜面、原路返回」。",
    tags: ["反射", "计算"],
  },
  {
    id: "cb-35",
    chapter: "cubemaps",
    level: 3,
    question:
      "反射 / 折射物体表面一片乱、方向不对，镜面映出的环境位置错乱。两个常见原因？",
    answer:
      "①把 `reflect` / `refract` 的输入 `I`、`N` 没归一化（这两个函数要求单位向量）。②误以为立方体贴图要用 2D uv 去采样。修法：对 `Position - cameraPos` 和 `Normal` 都 `normalize` 再传入；采样用 `texture(skybox, R)`，第二个参数是 3D 方向向量。",
    tags: ["反射", "折射", "读代码"],
  },
  {
    id: "cb-36",
    chapter: "cubemaps",
    level: 3,
    question:
      "WebGL2 里加载立方体贴图 6 个面，循环里 `texImage2D` 第一个参数怎么写？",
    answer:
      "`gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, ...)`，i 从 0 到 5 依次命中右/左/上/下/后/前 6 个面。WebGL2 还能直接吃 `TexImageSource`（`<img>`/`<canvas>`），不像桌面要先 `stbi_load` 读像素。",
    tags: ["GL_TEXTURE_CUBE_MAP", "应用"],
  },
  {
    id: "cb-37",
    chapter: "cubemaps",
    level: 3,
    question: "立方体贴图六个面交界处出现接缝伪影。最可能漏设了什么？怎么修？",
    answer:
      "最可能没把环绕方式设成 `GL_CLAMP_TO_EDGE`（或漏了第三维 `GL_TEXTURE_WRAP_R`），采样到边界外导致接缝。修法：把 S / T / R 三个维度都设 `GL_CLAMP_TO_EDGE`，钳到边缘消接缝。",
    tags: ["CLAMP_TO_EDGE", "读代码"],
  },
  {
    id: "cb-38",
    chapter: "cubemaps",
    level: 3,
    question:
      "天空盒着色器里把 `TexCoords = aPos;` 写成了别的，天空盒会怎样？这一行的作用是什么？",
    answer:
      "天空盒会采样错乱、方向不对。这一行把局部坐标 `aPos` 直接当采样方向传给片段着色器——立方体顶点本身就是从中心指向那个角的方向向量，正好当采样方向用。写错就拿不到正确的看出去方向。",
    tags: ["天空盒", "读代码"],
  },
  {
    id: "cb-39",
    chapter: "cubemaps",
    level: 3,
    question:
      "空气进玻璃，$n_1 = 1.00$、$n_2 = 1.52$，折射率比 $\\eta$ 约是多少？喂给谁？",
    answer:
      "$\\eta = n_1 / n_2 = 1.00 / 1.52 \\approx 0.658$。把这个 $\\eta$ 喂给 `refract(I, N, ratio)`，就得到「从空气进玻璃」的折射方向。注意别写成 `1.52/1.00`（那是玻璃→空气，方向会反）。",
    tags: ["折射率比", "计算"],
  },
  {
    id: "cb-40",
    chapter: "cubemaps",
    level: 3,
    question: "把环境映射物体的材质从反射切到折射，片段着色器最少改哪几处？",
    answer:
      "只改两处：①算方向那行 `reflect(I, N)` 换成 `refract(I, N, ratio)`；②多声明 / 传入一个折射率比 `ratio`（如 `float ratio = 1.00/1.52;`）。`I` 的计算、`normalize`、`texture(skybox, R)` 采样都不动。",
    tags: ["反射", "折射", "应用"],
  },
  {
    id: "cb-41",
    chapter: "cubemaps",
    level: 3,
    question:
      "CubemapDemo 里把材质切到「漫反射」，球会变成什么样？说明环境映射的价值。",
    answer:
      "球立刻「失去周遭感」、变成一个普通哑光灰球，环境一点都照不上去——作对照。这一眼就看出环境映射（反射 / 折射）给了物体多少「周遭感」：同一圈环境下，反射像镜子、折射像玻璃，漫反射则完全不反映环境。",
    tags: ["环境映射", "应用"],
  },
  {
    id: "cb-42",
    chapter: "cubemaps",
    level: 3,
    question: "反射片段着色器里视线 `I` 怎么算？方向是相机指向片段还是反过来？",
    answer:
      "`vec3 I = normalize(Position - cameraPos);`——世界空间里片段位置减相机位置，方向是**相机指向该点**（视线打过去的方向），再归一化。然后 `R = reflect(I, normalize(Normal))` 算反射方向去采样。",
    tags: ["反射", "应用"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 边界） ──
  {
    id: "cb-43",
    chapter: "cubemaps",
    level: 4,
    question:
      "天空盒画出来正常，但相机一前进就「贴到脸上」穿模。已确认 `GL_LEQUAL`、贴图也对，漏了哪一步？写出修法关键代码。",
    answer:
      '漏了**去平移**——传给着色器的 `view` 没去掉位移、还带平移分量，天空盒被当成世界里固定的盒子，相机走近就撞壁。修法：`glm::mat4 viewNoTrans = glm::mat4(glm::mat3(camera.GetViewMatrix())); skyboxShader.setMat4("view", viewNoTrans);`。注意 `GL_LEQUAL` + `pos.xyww` 管「最远处当背景」，和去平移是两件互不替代的事。',
    tags: ["天空盒去平移", "陷阱", "综合"],
  },
  {
    id: "cb-44",
    chapter: "cubemaps",
    level: 4,
    question:
      "天空盒既要「永远在最远处不盖物体」又要「随相机移动不糊脸」，分别靠哪些机制？为什么不能只做一个？",
    answer:
      "「最远处不盖物体」靠 `gl_Position = pos.xyww`（深度恒 1.0）+ `GL_LEQUAL`；「不糊脸」靠去平移 `mat4(mat3(view))`。两者管的是不同问题：前者管深度排序、后者管位置跟随。只做去平移会因深度被 `GL_LESS` 丢弃而画不出；只做深度技巧则相机一移动还是会撞壁糊脸。必须都做。",
    tags: ["天空盒去平移", "深度技巧", "综合"],
  },
  {
    id: "cb-45",
    chapter: "cubemaps",
    level: 4,
    question:
      "折射球弯折方向反了、像哈哈镜。结合斯涅尔定律和 `ratio` 定义，讲清根因和修法。",
    answer:
      "根因：`ratio = n1/n2` 分子分母写反成 `1.52/1.00`，相当于把「空气→玻璃」当成了「玻璃→空气」，按斯涅尔定律弯折方向整个颠倒（本该弯向法线却弯离）。修法：`n1` 取**入射侧**（空气 1.00）、`n2` 取**进入侧**（玻璃 1.52），`ratio = 1.00/1.52`，弯折方向才对。",
    tags: ["折射率比", "斯涅尔定律", "陷阱"],
  },
  {
    id: "cb-46",
    chapter: "cubemaps",
    level: 4,
    question:
      "为什么说立方体贴图采样「不必归一化」而 reflect/refract 输入「必须归一化」并不矛盾？",
    answer:
      "不矛盾——两处要求的对象不同。立方体贴图采样只看方向、不看长度，给它任意长度的 `R` 都采同一点，所以 `R` 不必归一化。但 `reflect` / `refract` 在**算出 R 之前**的输入 `I`、`N` 必须是单位向量，否则按它们推导出的 `R` 本身就错。即：算 R 的输入要单位向量，拿 R 去采样不要求长度。",
    tags: ["方向向量来采样", "归一化", "综合"],
  },
  {
    id: "cb-47",
    chapter: "cubemaps",
    level: 4,
    question:
      "完整描述：从一根方向向量到屏幕上一个像素的颜色，天空盒 / 反射 / 折射三条路各怎么走？",
    answer:
      "共同核心是「算一根方向向量 R、用 `texture(skybox, R)` 采样同一张立方体贴图」。区别只在 R 怎么来：天空盒 R = 相机看出去的视线（顶点坐标，且 view 去平移）；反射 R = `reflect(I, N)`（对称弹出）；折射 R = `refract(I, N, ratio)`（按折射率比弯折）。采到的环境颜色就是该像素颜色。",
    tags: ["环境映射", "链路", "综合"],
  },
  {
    id: "cb-48",
    chapter: "cubemaps",
    level: 4,
    question:
      "反射镜面球上能读到「反过来」的方位字，为什么会反？这和反射的几何有什么关系？",
    answer:
      "因为反射是关于法线**对称弹出**：视线打到球面，反射方向把环境镜像地映上来，就像照镜子时左右颠倒。球面把四周天空盒原样但镜像地映出，所以面图上的方位字在球面上读到的是反过来的。这正是 `reflect(I,N)` 入射角 = 反射角的镜面性质带来的。",
    tags: ["反射", "综合"],
  },
  {
    id: "cb-49",
    chapter: "cubemaps",
    level: 4,
    question:
      "立方体贴图渲出来正常但有接缝、且物体反射方向乱。可能分别是哪两类设置问题？",
    answer:
      "①接缝：环绕方式没把 S/T/R 三维都设 `GL_CLAMP_TO_EDGE`（尤其漏了第三维 `WRAP_R`），面交界采到边界外。②反射乱：`reflect` 输入 `I`/`N` 没归一化，或采样误用 2D uv。修法：三维都 `CLAMP_TO_EDGE`；对 `I`、`N` 做 `normalize`、采样用 3D 方向 `texture(skybox, R)`。",
    tags: ["CLAMP_TO_EDGE", "反射", "陷阱"],
  },
  {
    id: "cb-50",
    chapter: "cubemaps",
    level: 4,
    question:
      "把一个反射金属球改成钻石（折射率 2.42）折射球，`ratio` 怎么写？相比玻璃弯折更强还是更弱？为什么？",
    answer:
      "`ratio = 1.00 / 2.42 ≈ 0.413`（空气→钻石）。弯折比玻璃**更强**：钻石折射率 2.42 远高于玻璃 1.52，两介质折射率差越大、`ratio` 越偏离 1，光弯得越狠。钻石 `ratio ≈ 0.413` 比玻璃 `≈ 0.658` 更远离 1，所以钻石球的环境弯折最夸张（现实里钻石也最「闪」）。",
    tags: ["折射率比", "折射", "综合"],
  },
  {
    id: "cb-51",
    chapter: "cubemaps",
    level: 4,
    question:
      "天空盒和环境映射物体都采样同一张立方体贴图，但着色器输入不同。各自需要什么输入、为什么物体多要法线？",
    answer:
      "天空盒只需相机看出去的方向（顶点坐标当方向，配去平移的 view）。环境映射物体需要世界空间的**位置**（算视线 `I = Position - cameraPos`）和**法线 N**（`reflect`/`refract` 都要按法线算反射 / 折射方向）。物体多要法线，是因为「环境怎么映上去」取决于表面朝向；天空盒是纯背景、没有表面朝向可言。",
    tags: ["环境映射", "天空盒", "综合"],
  },
  {
    id: "cb-52",
    chapter: "cubemaps",
    level: 4,
    question:
      "天空盒一像素都画不出来、背景还是纯色。结合深度技巧把根因和修法讲清，并指出它和「去平移」是不是一回事。",
    answer:
      "根因：天空盒 `gl_Position = pos.xyww` 让深度恒 1.0，而深度函数还是默认 `GL_LESS`，`1.0 < 1.0` 永不成立、天空盒全被深度测试丢弃。修法：画天空盒前 `glDepthFunc(GL_LEQUAL)`（`1.0 <= 1.0` 成立），画完恢复 `GL_LESS`，并确保天空盒最后画。它和「去平移」**不是一回事**：去平移解决糊脸 / 跟随，深度技巧解决最远处当背景 / 不盖物体，两者互不替代。",
    tags: ["深度技巧", "天空盒去平移", "综合"],
  },
];
