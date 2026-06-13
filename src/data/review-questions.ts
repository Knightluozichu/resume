/**
 * 复习系统题库（复习系统 Phase A 种子库）。
 *
 * 独立数据模块：与引擎/UI 解耦，Phase B 要把 ~40 题扩到 500 时只动这个文件。
 * 题目从入门 7 章（你好窗口 / 你好三角形 / 着色器 / 纹理 / 变换 / 坐标系统 / 摄像机）
 * 的学习目标、概念讲解、名词解释、练习、常见误区里提炼，答案与各章 Term/术语严格一致。
 *
 * 本阶段答案用纯文本 + 行内 `代码`（反引号），数学用纯文本表达（cos θ、(x+tx)），不引 KaTeX。
 *
 * 这个模块被 ReviewApp 的 next/dynamic(ssr:false) 边界懒加载，
 * 切成独立 chunk、不进 /review 首屏关键路径（与全站 WebGL/重数据同一原则）。
 */

/** 章节 slug：与 content/learn/getting-started/<slug>.mdx 一一对应。 */
export type ReviewChapterSlug =
  | "hello-window"
  | "hello-triangle"
  | "shaders"
  | "textures"
  | "transformations"
  | "coordinate-systems"
  | "camera";

/** 认知层级：1 认记 / 2 理解 / 3 应用 / 4 综合。 */
export type ReviewLevel = 1 | 2 | 3 | 4;

export type ReviewQuestion = {
  id: string;
  chapter: ReviewChapterSlug;
  level: ReviewLevel;
  question: string;
  answer: string;
  tags?: string[];
};

/** 章节 slug → 中文章名（卡片上展示，复习页无 MDX frontmatter 可读，故就近内置）。 */
export const CHAPTER_TITLES: Record<ReviewChapterSlug, string> = {
  "hello-window": "你好，窗口",
  "hello-triangle": "你好，三角形",
  shaders: "着色器",
  textures: "纹理",
  transformations: "变换",
  "coordinate-systems": "坐标系统",
  camera: "摄像机",
};

/** 等级 → 短标签（卡片徽标文案）。 */
export const LEVEL_LABELS: Record<ReviewLevel, string> = {
  1: "L1 认记",
  2: "L2 理解",
  3: "L3 应用",
  4: "L4 综合",
};

export const REVIEW_QUESTIONS: ReviewQuestion[] = [
  // ============ 你好，窗口（hello-window）============
  {
    id: "hw-1",
    chapter: "hello-window",
    level: 1,
    question:
      "网页里用来画图的那块方块元素叫什么？怎么从它身上拿到画图的「画笔」？",
    answer:
      "那块元素是 `<canvas>` 画布。调用 `canvas.getContext('webgl2')` 就能拿到 WebGL2 上下文（习惯命名 `gl`），它就是连通 GPU 的画笔。",
    tags: ["canvas", "WebGL2 上下文"],
  },
  {
    id: "hw-2",
    chapter: "hello-window",
    level: 1,
    question: "「渲染循环」是什么？通常用什么 API 驱动它？",
    answer:
      "渲染循环是一段「画一帧 → 等屏幕下次刷新 → 再画一帧」不停重复的代码，是网页里的「放映机」。通常用 `requestAnimationFrame` 驱动——它在屏幕下次刷新前回调你登记的画帧函数。",
    tags: ["渲染循环", "requestAnimationFrame"],
  },
  {
    id: "hw-3",
    chapter: "hello-window",
    level: 2,
    question:
      "「清屏」具体做哪两步？为什么每一帧开头都要清屏，而不是程序启动时清一次？",
    answer:
      "两步配套：先 `gl.clearColor(r,g,b,a)` 定好用哪种颜色，再 `gl.clear(...)` 真正把整块颜色缓冲刷成那个色。每帧都要清，是因为上一帧的画面不会自己消失；只清一次的话新内容会叠在旧画面上，物体一动就拖出残影。",
    tags: ["清屏", "颜色缓冲"],
  },
  {
    id: "hw-4",
    chapter: "hello-window",
    level: 2,
    question: "只调了 `gl.clearColor` 换了颜色值，画面却纹丝不动，为什么？",
    answer:
      "`clearColor` 只是「定好待会儿用哪种颜料」，并没有真正动手刷。必须再调 `gl.clear(gl.COLOR_BUFFER_BIT)` 才会把颜色缓冲填成该色。两步缺一不可。",
    tags: ["清屏", "误区"],
  },
  {
    id: "hw-5",
    chapter: "hello-window",
    level: 3,
    question:
      "WebGL2 里 `canvas.getContext('webgl2')` 的返回值，使用前必须做什么处理？不做会怎样？",
    answer:
      "必须判空（`if (!gl) {...}`）。浏览器太旧或 WebGL2 被禁用时它会返回 `null`，不判空就拿去调命令会报「Cannot read properties of null」、画面一片空白。",
    tags: ["WebGL2 上下文", "误区"],
  },

  // ============ 你好，三角形（hello-triangle）============
  {
    id: "ht-1",
    chapter: "hello-triangle",
    level: 1,
    question: "VBO 和 VAO 各自负责什么？一句话说清它们的关系。",
    answer:
      "VBO（顶点缓冲对象）是显存里存顶点数据的「料仓」；VAO（顶点数组对象）是「怎么解读这堆字节」的说明书（不存数据）。一句话：VBO 是料，属性指针是切料的规则，VAO 是把规则记下来的说明书。",
    tags: ["VBO", "VAO"],
  },
  {
    id: "ht-2",
    chapter: "hello-triangle",
    level: 1,
    question: "什么是 NDC（标准化设备坐标）？它的范围是多少？",
    answer:
      "NDC 是一套统一的标准坐标尺：x/y/z 都落在 [-1, 1]，正中间是原点。不管屏幕多大都用这套范围写顶点，落在框外的会被裁掉。",
    tags: ["NDC"],
  },
  {
    id: "ht-3",
    chapter: "hello-triangle",
    level: 2,
    question: "渲染管线把顶点变成像素，固定的五道工位依次是哪几道？",
    answer:
      "顶点 → 图元装配（输入装配）→ 光栅化 → 片段（着色）→ 测试与混合。其中光栅化把矢量三角形切成一个个屏幕像素格、每个被覆盖的像素产生一个片段。",
    tags: ["渲染管线", "光栅化", "片段"],
  },
  {
    id: "ht-4",
    chapter: "hello-triangle",
    level: 3,
    question:
      "`gl.vertexAttribPointer(0, 3, gl.FLOAT, false, stride, offset)` 里，对每顶点只有 3 个 float 的位置属性，stride 和 offset 该填多少？",
    answer:
      "stride（步长）= 单个顶点的字节数 = 3 个 float = `3 * 4` = 12 字节；offset（偏移）= 位置在最前，填 `0`。第一个参数 `0` 是 location，对应着色器里 `layout(location = 0)`。",
    tags: ["属性指针", "stride", "offset"],
  },
  {
    id: "ht-5",
    chapter: "hello-triangle",
    level: 3,
    question: "为什么要先绑定 VAO 再配置顶点属性，反过来会怎样？",
    answer:
      "`vertexAttribPointer` / `enableVertexAttribArray` 的状态会被「当前绑定的 VAO」记录。没绑 VAO 就配置，这些状态无处归属（WebGL2 下甚至直接报错）。先绑 VAO，配置才被它捕获，绘制时绑回这张说明书即可。",
    tags: ["VAO", "误区"],
  },
  {
    id: "ht-6",
    chapter: "hello-triangle",
    level: 4,
    question:
      "一段顶点数据从内存到屏幕像素，经过了哪几个阶段？编译运行后屏幕全黑、什么都没有，最常见的原因是什么？",
    answer:
      "阶段：CPU 内存里的顶点数组 → 上传进 VBO（显存）→ VAO 记录属性布局 → 绘制调用走管线（顶点 → 图元装配 → 光栅化 → 片段着色 → 测试混合）→ 屏幕。全黑最常见原因：忘了绑定 VAO 就调 `vertexAttribPointer`，属性配置没被任何对象记录；或着色器编译/链接失败却没查日志（用 `getShaderInfoLog`/`getProgramInfoLog`）。",
    tags: ["渲染管线", "VAO", "误区"],
  },

  // ============ 着色器（shaders）============
  {
    id: "sh-1",
    chapter: "shaders",
    level: 1,
    question: "GLSL 是什么？为什么图形要专门用一门语言？",
    answer:
      "GLSL（OpenGL Shading Language）是写着色器的小语言，语法很像 C。专设一门语言是因为 GPU 会用同一段代码对成千上万个顶点/像素并行跑，GLSL 为这种「一份代码、海量并行」设计，还自带 vec/mat 等图形类型。",
    tags: ["GLSL"],
  },
  {
    id: "sh-2",
    chapter: "shaders",
    level: 2,
    question: "in/out 和 uniform 各自传的是什么数据？从哪来到哪去？",
    answer:
      "in/out 在两段着色器之间传逐顶点/逐片段的数据：上一段用 `out` 递出、下一段用同名同类型的 `in` 接收。uniform 是从你的程序（CPU）传进着色器的全局只读变量，一次绘制里所有顶点/片段读到的值都相同（如时间、颜色、变换矩阵），着色器里只能读不能改。",
    tags: ["in/out", "uniform"],
  },
  {
    id: "sh-3",
    chapter: "shaders",
    level: 2,
    question: "顶点只有 3 个角，片段着色器里那片连续渐变的颜色是哪来的？",
    answer:
      "来自片段插值。光栅化把三角形切成片段时，会把三个顶点的 out 值按每个片段离三个角的远近自动混合算出——顶点只定了角上的值，中间是「混」出来的，于是得到连续渐变。",
    tags: ["片段插值"],
  },
  {
    id: "sh-4",
    chapter: "shaders",
    level: 3,
    question:
      "从程序里给一个 uniform 写值的两个步骤是什么？写值前有一条铁律是什么？",
    answer:
      "两步：先用 `getUniformLocation(program, 名字)` 问出 uniform 的位置（句柄），再用 `gl.uniform*`（如 `uniform1f`/`uniform3f`）把值写进那个位置。铁律：写值前必须先 `useProgram` 启用目标程序，否则值写不进去。",
    tags: ["uniform", "useProgram"],
  },
  {
    id: "sh-5",
    chapter: "shaders",
    level: 3,
    question:
      "顶点着色器写 `out vec3 vColor;`，片段着色器写 `in vec4 vColor;`，会发生什么？",
    answer:
      "会编译/链接失败（或行为未定义）。名字虽都叫 `vColor`，但类型一边 `vec3` 一边 `vec4` 对不上。in/out 是同一根管子的两头，名字和类型都必须一字不差，应把片段着色器那行改成 `in vec3 vColor;`。",
    tags: ["in/out", "误区"],
  },
  {
    id: "sh-6",
    chapter: "shaders",
    level: 4,
    question:
      "Demo 里「随时间脉动」的动画是怎么实现的？它有没有重新编译着色器？",
    answer:
      "靠一个名叫 `uTime` 的 uniform，在渲染循环里每帧用 `gl.uniform1f` 把新的时间值写进去，片段着色器里 `sin(uTime)` 跟着变，颜色就动了。没有重新编译着色器——调控件/做动画只是每帧上传新的 uniform 值，这正是 uniform 的用法。",
    tags: ["uniform", "动画"],
  },

  // ============ 纹理（textures）============
  {
    id: "tx-1",
    chapter: "textures",
    level: 1,
    question: "纹理坐标（UV）的范围是多少？原点 (0,0) 在图的哪个角？",
    answer:
      "范围 0~1。约定 (0,0) 是图的左下角、(1,1) 是右上角，正中间是 (0.5, 0.5)。UV 逐顶点指定，三角形内部每个片段的 UV 由片段插值「混」出来。",
    tags: ["纹理坐标", "UV"],
  },
  {
    id: "tx-2",
    chapter: "textures",
    level: 1,
    question: "什么是「采样」？在 GLSL 里用哪个函数完成？",
    answer:
      "采样是片段着色器拿着自己那对 UV 坐标，去纹理图里取出对应位置颜色的动作。在 GLSL 里就是一句 `texture(sampler, uv)`，返回一个 vec4（rgba）——这是「贴图」最终落到每个像素上的那一步。",
    tags: ["采样", "texture()"],
  },
  {
    id: "tx-3",
    chapter: "textures",
    level: 2,
    question:
      "UV 坐标超过了 1（比如 2.5），那一片显示什么？取决于哪个设置？三种常见取值各是什么效果？",
    answer:
      "取决于纹理环绕（wrapping）设置，对 U（WRAP_S）、V（WRAP_T）可分开设。三种常见：REPEAT 重复平铺（默认）、MIRRORED_REPEAT 平铺但每隔一张镜像翻转、CLAMP_TO_EDGE 用最边上一排像素的颜色拉长填满。",
    tags: ["纹理环绕", "REPEAT", "CLAMP_TO_EDGE"],
  },
  {
    id: "tx-4",
    chapter: "textures",
    level: 2,
    question:
      "NEAREST 和 LINEAR 两种纹理过滤有什么区别？mipmap 又是解决什么问题的？",
    answer:
      "纹理过滤决定片段 UV 落在两格像素之间时怎么取色：NEAREST 取最近一格，放大后是马赛克硬块（像素风爱用）；LINEAR 在邻近几格间按距离混合，放大后平滑但偏糊。mipmap（多级渐远纹理）是预先生成一整套逐级减半的缩小版，物体离得远、贴图缩得小时 GPU 自动从尺寸合适的那一级取色，避免远处闪烁、噪点。",
    tags: ["纹理过滤", "NEAREST", "LINEAR", "mipmap"],
  },
  {
    id: "tx-5",
    chapter: "textures",
    level: 3,
    question: "要在 Demo 里把同一张图平铺成 3×3，该动哪些设置？",
    answer:
      "把「UV 缩放」拉到 3（等于把顶点 UV 推到 (0,0)~(3,3)），并把环绕设为 REPEAT。越界部分由 REPEAT 一张张平铺，于是横竖各 3 张、共 3×3。（用 MIRRORED_REPEAT 也是 3×3，但每隔一张镜像翻转。）",
    tags: ["纹理环绕", "UV"],
  },
  {
    id: "tx-6",
    chapter: "textures",
    level: 3,
    question:
      "要同时用两张图，靠什么机制区分它们？采样器（sampler2D）该怎么和纹理对接？",
    answer:
      "靠纹理单元（带编号的插槽，至少 16 个）。流程：用 `activeTexture` 选中某编号单元、把图绑上去；再用 `uniform1i` 告诉着色器里的某个采样器「去几号单元取图」——传的是整数单元号（0、1），不是纹理对象。着色器里声明多个 `sampler2D`，再用 `mix()` 把多次采样结果按比例混合。",
    tags: ["纹理单元", "sampler2D", "mix()"],
  },
  {
    id: "tx-7",
    chapter: "textures",
    level: 4,
    question: "贴上去的图上下颠倒了（天在下、地在上），为什么？怎么修？",
    answer:
      "因为图片文件大多从左上角第一行开始存，而纹理 UV 原点在左下角——两者 Y 方向相反。修法：上传前翻转图片 Y 轴。C++ 用 stb_image 的 `stbi_set_flip_vertically_on_load(true)`；WebGL 用 `gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)`。",
    tags: ["纹理坐标", "误区"],
  },

  // ============ 变换（transformations）============
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

  // ============ 坐标系统（coordinate-systems）============
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

  // ============ 摄像机（camera）============
  {
    id: "cm-1",
    chapter: "camera",
    level: 1,
    question:
      "欧拉角里 Pitch、Yaw、Roll 各控制什么？FPS/漫游相机为什么不用 Roll？",
    answer:
      "Pitch（俯仰角）管上下看（抬头低头，绕 X 轴）；Yaw（偏航角）管左右看（转头，绕 Y 轴）；Roll（滚转角）管歪头（绕 front 轴）。FPS 和漫游相机几乎不用 Roll、锁 0 就好，否则画面会天旋地转（翻滚）。",
    tags: ["欧拉角", "Pitch", "Yaw", "Roll"],
  },
  {
    id: "cm-2",
    chapter: "camera",
    level: 1,
    question:
      "可交互摄像机的三要素是哪三个？分别对应 `lookAt(eye, center, up)` 的什么？",
    answer:
      "三要素：position（站哪）、front（朝哪）、worldUp（头顶方向）。日常实现里 center = position + front，所以三者对应 `lookAt(eye, center, up)`：eye=position，center=position+front，up=worldUp。right = normalize(cross(front, worldUp))。",
    tags: ["摄像机三要素", "LookAt"],
  },
  {
    id: "cm-3",
    chapter: "camera",
    level: 2,
    question: "WASD 移动为什么要乘 delta time？",
    answer:
      "delta time 是两次渲染之间经过的真实时间（秒）。移动距离 = 速度 × deltaTime，这样不同帧率下走得一样远——30fps 和 144fps 移动同样的距离，不会因为帧率高就走得飞快。",
    tags: ["delta time", "WASD"],
  },
  {
    id: "cm-4",
    chapter: "camera",
    level: 2,
    question: "鼠标控制视角时，垂直方向的 yoffset 为什么要取反？",
    answer:
      "因为屏幕坐标 y 向下为正，而「抬头」应让 Pitch 增大。所以把 yoffset 取反（`yoffset = lastY - ypos`）再加给 Pitch，鼠标上移才对应抬头、下移对应低头，符合直觉。",
    tags: ["鼠标视角", "Pitch", "yoffset"],
  },
  {
    id: "cm-5",
    chapter: "camera",
    level: 3,
    question:
      "给定 Yaw=θ、Pitch=φ（弧度），摄像机方向向量 front 的三个分量公式是什么？",
    answer:
      "fx = cos θ · cos φ，fy = sin φ，fz = sin θ · cos φ。直觉：Yaw 决定在水平圈上指向哪；Pitch 把向量从水平面翘起来——XZ 两个分量都乘 cos φ（翘角越大水平投影越短），Y 分量直接是 sin φ。算完 front 要 normalize。",
    tags: ["方向向量", "front", "三角推导"],
  },
  {
    id: "cm-6",
    chapter: "camera",
    level: 4,
    question:
      "为什么 Pitch 要限制在 ±89°？滚轮调 FOV 时，向上滚通常是放大还是缩小 FOV？效果像什么镜头？",
    answer:
      "Pitch 限 ±89°：当 φ→90° 时 cos φ→0，front 几乎平行于 worldUp，`cross(front, worldUp)` 接近零向量，right 算不出来——视角突然翻转（万向节死锁），所以锁范围。滚轮向上通常缩小 FOV（看得更窄、像长焦）、向下放大 FOV（广角）。FOV 越大越广角、越小越长焦。",
    tags: ["Pitch", "万向节死锁", "FOV"],
  },
];

/** 题库总数（自检/小结展示用）。 */
export const REVIEW_QUESTION_COUNT = REVIEW_QUESTIONS.length;
