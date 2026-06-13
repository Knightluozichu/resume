/** 复习题库 · 纹理（textures）。Phase B 各章独立文件，避免并行写冲突。 */

import type { ReviewQuestion } from "./types";

export const texturesQuestions: ReviewQuestion[] = [
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

  // ── L1 认记（定义 / 术语 / 数值约定） ──
  {
    id: "tx-8",
    chapter: "textures",
    level: 1,
    question: "什么是「纹理」？用它的好处是什么？",
    answer:
      "纹理就是一张贴到几何体表面的图像（通常就是一张图片）。好处是把「表面长什么样」和「物体是什么形状」分开：形状由顶点定，表面细节（砖纹、木纹、花色）交给图，省去用海量顶点硬画。",
    tags: ["纹理", "定义"],
  },
  {
    id: "tx-9",
    chapter: "textures",
    level: 1,
    question: "纹理在渲染管线的哪个阶段起作用？",
    answer:
      "在片段着色器阶段。片段着色器负责给每个像素定颜色，有了纹理，这个颜色就不再写死，而是「按 UV 从图里采样查出来的」。",
    tags: ["管线", "片段着色器"],
  },
  {
    id: "tx-10",
    chapter: "textures",
    level: 1,
    question: "UV 坐标 (1, 1) 对应纹理图的哪个角？(0.5, 0.5) 呢？",
    answer:
      "(1, 1) 是图的右上角；(0.5, 0.5) 是图的正中间。配合约定：(0, 0) 是左下角。",
    tags: ["纹理坐标", "UV"],
  },
  {
    id: "tx-11",
    chapter: "textures",
    level: 1,
    question: "三种常见的纹理环绕方式各叫什么名字？",
    answer:
      "`REPEAT`（重复平铺，默认）、`MIRRORED_REPEAT`（镜像平铺）、`CLAMP_TO_EDGE`（夹到边缘、拉伸边缘像素）。另外还有 `CLAMP_TO_BORDER`（用指定边框颜色填充越界部分）。",
    tags: ["纹理环绕", "术语"],
  },
  {
    id: "tx-12",
    chapter: "textures",
    level: 1,
    question: "两种基本的纹理过滤方式各叫什么名字？",
    answer:
      "`NEAREST`（邻近过滤，取最近一格像素）和 `LINEAR`（线性过滤，在邻近几格间按距离加权混合）。",
    tags: ["纹理过滤", "NEAREST", "LINEAR"],
  },
  {
    id: "tx-13",
    chapter: "textures",
    level: 1,
    question: "设纹理环绕的两个方向 `WRAP_S`、`WRAP_T` 分别对应 UV 的哪个轴？",
    answer:
      "`WRAP_S` 对应 U（横向），`WRAP_T` 对应 V（纵向）。两个方向可以分开设置不同的环绕方式。",
    tags: ["纹理环绕", "WRAP_S", "WRAP_T"],
  },
  {
    id: "tx-14",
    chapter: "textures",
    level: 1,
    question:
      "设纹理过滤的两个参数 `MIN_FILTER`、`MAG_FILTER` 分别在什么情况下生效？",
    answer:
      "`MIN_FILTER` 在纹理被缩小（贴图显示得比原图小）时生效；`MAG_FILTER` 在纹理被放大（贴图显示得比原图大）时生效。",
    tags: ["纹理过滤", "MIN_FILTER", "MAG_FILTER"],
  },
  {
    id: "tx-15",
    chapter: "textures",
    level: 1,
    question: "什么是多级渐远纹理（mipmap）？",
    answer:
      "为一张纹理预先生成的一整套逐级减半的缩小版（原图、1/2、1/4、1/8……），堆成一座「纹理金字塔」。物体离得远、贴图缩得小时，GPU 自动从尺寸合适的那一级取色。",
    tags: ["mipmap", "定义"],
  },
  {
    id: "tx-16",
    chapter: "textures",
    level: 1,
    question: "GLSL 里代表一张 2D 纹理的采样器类型叫什么？它存图吗？",
    answer:
      "叫 `sampler2D`。它本身不存图，而是一个「指向某个纹理单元」的句柄，配合 `texture()` 用它去采样取色。",
    tags: ["sampler2D", "术语"],
  },
  {
    id: "tx-17",
    chapter: "textures",
    level: 1,
    question: "GLSL 里完成采样的内建函数是什么？它返回什么类型？",
    answer:
      "是 `texture(sampler, uv)`，返回一个 `vec4`（rgba 四个分量）。它表示「拿着 uv 坐标，去 sampler 指向的那张纹理里取出对应颜色」。",
    tags: ["texture()", "sampler2D"],
  },
  {
    id: "tx-18",
    chapter: "textures",
    level: 1,
    question: "什么是纹理单元（texture unit）？OpenGL 至少保证有几个？",
    answer:
      "纹理单元是显卡上一组带编号的「插槽」（0 号、1 号……），用来同时挂载多张纹理供着色器区分。OpenGL 保证至少有 16 个（`GL_TEXTURE0` ~ `GL_TEXTURE15`）。",
    tags: ["纹理单元", "GL_TEXTURE0"],
  },
  {
    id: "tx-19",
    chapter: "textures",
    level: 1,
    question: "默认激活的是哪个纹理单元？",
    answer:
      "默认激活的是 `GL_TEXTURE0`（0 号单元）。所以只用一张纹理时，不调用 `glActiveTexture` 也能正常工作。",
    tags: ["纹理单元", "GL_TEXTURE0"],
  },
  {
    id: "tx-20",
    chapter: "textures",
    level: 1,
    question: "`mix(a, b, t)` 函数是干什么的？`t=0` 和 `t=1` 各取到什么？",
    answer:
      "它做线性插值，按比例 `t` 混合 a 和 b：`t=0` 全取 a、`t=1` 全取 b、`t=0.2` 是 80% a + 20% b。常用来把两张纹理的采样结果按比例叠在一起。",
    tags: ["mix()", "定义"],
  },
  {
    id: "tx-21",
    chapter: "textures",
    level: 1,
    question: "把图片像素数据上传给纹理用哪个函数？生成 mipmap 用哪个？",
    answer:
      "上传像素数据用 `glTexImage2D`（WebGL 是 `gl.texImage2D`）；生成整套 mipmap 用 `glGenerateMipmap`（WebGL 是 `gl.generateMipmap`）。",
    tags: ["texImage2D", "generateMipmap"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "tx-23",
    chapter: "textures",
    level: 2,
    question: "为什么用纹理贴图，而不是堆更多顶点来画砖墙、木纹这些细节？",
    answer:
      "因为要靠顶点颜色画出砖墙每一道缝，得堆上成千上万个顶点，性能扛不住。纹理把表面细节从几何体里剥离：形状仍由少量顶点定，密集的花纹细节交给一张图，又快又省。",
    tags: ["纹理", "为什么"],
  },
  {
    id: "tx-24",
    chapter: "textures",
    level: 2,
    question: "顶点只给了几个角的 UV，三角形内部每个片段的 UV 是怎么来的？",
    answer:
      "由片段插值得到。光栅化把三角形切成片段时，按每个片段离三个顶点的远近，自动把三个角的 UV 加权混合算出来——和上一章顶点颜色被插值成渐变是同一个机制。",
    tags: ["纹理坐标", "片段插值"],
  },
  {
    id: "tx-24b",
    chapter: "textures",
    level: 2,
    question: "NEAREST 和 LINEAR 放大同一张图，视觉效果有什么区别？为什么？",
    answer:
      "NEAREST 只取最近一格像素、不混合，放大后是一块块清晰的马赛克硬块（像素风爱用）；LINEAR 在邻近几格间按距离加权混合，放大后平滑过渡但偏糊。区别源于一个不插值、一个插值。",
    tags: ["纹理过滤", "NEAREST", "LINEAR"],
  },
  {
    id: "tx-25",
    chapter: "textures",
    level: 2,
    question: "mipmap 解决的是放大问题还是缩小问题？没有它会怎样？",
    answer:
      "解决缩小（物体离得远、贴图被挤进很少几个屏幕像素）的问题。没有 mipmap 时，屏幕一个像素要硬「代表」原图一大片像素，只取一格会导致远处闪烁、出噪点（摩尔纹）。",
    tags: ["mipmap", "为什么"],
  },
  {
    id: "tx-26",
    chapter: "textures",
    level: 2,
    question: "为什么贴上去的图常会上下颠倒？根因在哪？",
    answer:
      "因为图片文件大多从左上角第一行开始向下存，而纹理 UV 的原点约定在左下角——两者 Y 方向相反，于是图的上下被翻过来了。",
    tags: ["纹理坐标", "误区"],
  },
  {
    id: "tx-27",
    chapter: "textures",
    level: 2,
    question: "REPEAT 和 MIRRORED_REPEAT 都做平铺，区别在哪？后者解决什么？",
    answer:
      "REPEAT 把图一张挨一张原样平铺；MIRRORED_REPEAT 每隔一张就镜像翻转一次。镜像让相邻两张在接缝处对齐（边缘像素相同），消除原样平铺时接缝突兀的问题。",
    tags: ["纹理环绕", "REPEAT", "MIRRORED_REPEAT"],
  },
  {
    id: "tx-28",
    chapter: "textures",
    level: 2,
    question:
      "为什么用多张纹理时，给采样器传的是「整数单元号」而不是纹理对象？",
    answer:
      "因为 `sampler2D` 本身不存图，它只是「指向某号纹理单元」的句柄。纹理是先绑到带编号的单元上的，所以告诉采样器去几号单元取图、传的自然是单元的整数编号（0、1），用 `glUniform1i`。",
    tags: ["纹理单元", "sampler2D", "uniform1i"],
  },
  {
    id: "tx-29",
    chapter: "textures",
    level: 2,
    question:
      "为什么用多张纹理时既要 `activeTexture`、又要给每个采样器指定单元号？",
    answer:
      "`activeTexture` 选中某号单元、把图绑上去，是「把图放进插槽」；`uniform1i` 告诉某个采样器「你去几号插槽取图」，是「让采样器认准插槽」。两件事一个管放、一个管取，缺一不可，着色器才能区分多张纹理。",
    tags: ["纹理单元", "activeTexture", "uniform1i"],
  },
  {
    id: "tx-30",
    chapter: "textures",
    level: 2,
    question: "调 Demo 里的「UV 缩放」本质上改的是什么？为什么能看到环绕效果？",
    answer:
      "本质是改顶点 UV 的范围——拉到 3 等于把顶点 UV 推到 $(0,0)$ ~ $(3,3)$。一旦 UV 超出 0~1，越界部分就交给环绕方式处理，于是平铺 / 镜像 / 拉边的差别才显现出来。",
    tags: ["UV", "纹理环绕"],
  },
  {
    id: "tx-31",
    chapter: "textures",
    level: 2,
    question:
      "为什么 WebGL2 的片段着色器里采样前一定要写 `precision highp float;`？",
    answer:
      "因为 WebGL2（GLSL ES 300）规定片段着色器没有默认的 float 精度，必须显式声明，否则编译失败。桌面 OpenGL（`#version 330 core`）不需要这一行。采样语句 `texture(sampler, uv)` 两端写法完全一样。",
    tags: ["GLSL", "precision", "API差异"],
  },
  {
    id: "tx-32",
    chapter: "textures",
    level: 2,
    question:
      "WebGL2 的 `gl.texImage2D` 为什么比 C++ 的 `glTexImage2D` 参数少？",
    answer:
      "因为 WebGL2 可以直接把图片元素 / Canvas / 视频帧当数据源传进去，由它内部读出宽高和像素，于是省去了宽、高、边框、数据指针几项；桌面 OpenGL 拿到的是一块裸内存指针，必须自己把宽、高、边框、数据一并报清楚。",
    tags: ["texImage2D", "API差异"],
  },
  {
    id: "tx-33",
    chapter: "textures",
    level: 2,
    question: "为什么 `MAG_FILTER`（放大过滤）不能设成带 mipmap 的档？",
    answer:
      "因为 mipmap 是为「缩小」准备的逐级缩小版，只在缩小（`MIN_FILTER`）时才有意义。放大时根本不存在「更高清的级」可选，给 `MAG_FILTER` 设 mipmap 档没有意义，OpenGL 会报 `GL_INVALID_ENUM`。",
    tags: ["mipmap", "MAG_FILTER", "误区"],
  },
  {
    id: "tx-34",
    chapter: "textures",
    level: 2,
    question: "「绑定」一个纹理是什么意思？为什么创建后第一步就要绑定？",
    answer:
      "绑定是把某个纹理设为「当前正在操作的纹理」。之后所有设参数（`texParameteri`）、传数据（`texImage2D`）的调用都作用在这个被绑定的纹理上——OpenGL 是状态机，不指明对象，调用就不知道作用在谁身上。",
    tags: ["bindTexture", "机制"],
  },
  {
    id: "tx-35",
    chapter: "textures",
    level: 2,
    question:
      "为什么纹理坐标（UV）用 0~1 这种归一化范围，而不是直接用像素坐标？",
    answer:
      "因为归一化后 UV 与纹理的实际分辨率无关：同一套 UV 配 256×256 或 4096×4096 的图都能正确贴。换分辨率、换 mipmap 级别都不用改顶点数据。$(0.5, 0.5)$ 永远是中心，与多少像素无关。",
    tags: ["纹理坐标", "UV", "为什么"],
  },
  {
    id: "tx-36",
    chapter: "textures",
    level: 2,
    question:
      "C++ 的 `glGenTextures` 和 WebGL2 的 `gl.createTexture()` 返回值有何不同？",
    answer:
      "`glGenTextures(1, &texture)` 把生成的句柄写进你传入的 `unsigned int`（一个整数 ID）；`gl.createTexture()` 直接返回一个 `WebGLTexture` 对象（不是数字，失败时为 `null`）。之后 `bindTexture` 等用法两端一致。",
    tags: ["createTexture", "API差异"],
  },

  // ── L3 应用（读代码 / 给参数判结果 / 小计算） ──
  {
    id: "tx-37",
    chapter: "textures",
    level: 3,
    question:
      "执行了 `glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_MIRRORED_REPEAT)`，这设置了什么？V 方向会受影响吗？",
    answer:
      "把横向（U / S 方向）的环绕设成了镜像重复。V 方向（`WRAP_T`）不受影响，仍是它各自的设置（未设则为默认 `REPEAT`）——两个方向独立。",
    tags: ["纹理环绕", "WRAP_S", "读代码"],
  },
  {
    id: "tx-38",
    chapter: "textures",
    level: 3,
    question:
      "环绕设为 REPEAT 时，UV 的 u 分量取到 2.5，实际采到图上哪个横向位置？",
    answer:
      "REPEAT 只看小数部分，相当于对 1 取模：2.5 等价于 0.5，采到图横向正中间。（若是 MIRRORED_REPEAT，因第 3 张是镜像翻转的，2.5 会采到 0.5 的镜像位置即 0.5，本例恰好相同；一般规律是整数段奇偶决定是否翻转。）",
    tags: ["纹理环绕", "REPEAT", "计算"],
  },
  {
    id: "tx-40",
    chapter: "textures",
    level: 3,
    question:
      "想让放大后的棋盘格呈现清晰的马赛克硬块（不要平滑），过滤该怎么设？",
    answer:
      "把放大过滤 `MAG_FILTER` 设为 `NEAREST`。放大时一个纹理像素铺满很多屏幕像素，NEAREST 只取最近一格、不混合，每格成为清晰的方块。设成 `LINEAR` 则会平滑（偏糊）。",
    tags: ["纹理过滤", "MAG_FILTER", "NEAREST"],
  },
  {
    id: "tx-41",
    chapter: "textures",
    level: 3,
    question:
      "`glTexImage2D(GL_TEXTURE_2D, 0, GL_RGB, w, h, 0, GL_RGB, GL_UNSIGNED_BYTE, data)` 里两个 `0` 各是什么？",
    answer:
      "第 2 个参数 `0` 是 mipmap 级别（基础级）；第 6 个参数 `0` 是边框（border），按规定永远填 0（历史遗留）。",
    tags: ["texImage2D", "参数", "读代码"],
  },
  {
    id: "tx-42",
    chapter: "textures",
    level: 3,
    question:
      "顶点数据每行是「位置 3 + 颜色 3 + UV 2」共 8 个 float，配置 UV 属性的步长和偏移该填多少（以 float 计）？",
    answer:
      "步长（stride）是每行 8 个 float，偏移（offset）是 6 个 float（UV 排在位置 3 + 颜色 3 之后）。C++ 写 `8*sizeof(float)` 和 `(void*)(6*sizeof(float))`；WebGL2 写 `8*4` 和 `6*4`。",
    tags: ["vertexAttribPointer", "stride", "计算"],
  },
  {
    id: "tx-43",
    chapter: "textures",
    level: 3,
    question:
      "顶点数据每行「位置 3 + UV 2」共 5 个 float（无颜色），配置 UV 属性的步长和偏移又是多少？",
    answer:
      "步长是 5 个 float，偏移是 3 个 float（UV 紧跟在位置之后）。C++ 写 `5*sizeof(float)`、`(void*)(3*sizeof(float))`；WebGL2 写 `5*4`、`3*4`。",
    tags: ["vertexAttribPointer", "stride", "计算"],
  },
  {
    id: "tx-44",
    chapter: "textures",
    level: 3,
    question:
      "片段着色器写 `FragColor = mix(texture(t1, uv), texture(t2, uv), 0.2)`，画面里两张图各占多少？",
    answer:
      "第一张图 t1 占 80%、第二张图 t2 占 20%（`mix(a, b, 0.2)` = $0.8a + 0.2b$）。把第三个参数从 0 调到 1，画面就从全是 t1 渐变到全是 t2。",
    tags: ["mix()", "读代码", "计算"],
  },
  {
    id: "tx-45",
    chapter: "textures",
    level: 3,
    question:
      "有两个采样器 `texture1`、`texture2`，想让它们分别去 0 号、1 号单元取图，CPU 侧两句怎么写？",
    answer:
      '`glUniform1i(glGetUniformLocation(program, "texture1"), 0);` 和 `glUniform1i(glGetUniformLocation(program, "texture2"), 1);`。传的是整数单元号 0、1，且要在 `glUseProgram` 之后调用。',
    tags: ["纹理单元", "uniform1i", "读代码"],
  },
  {
    id: "tx-46",
    chapter: "textures",
    level: 3,
    question:
      "要把纹理 `tex2` 绑到 1 号纹理单元上，CPU 侧两句怎么写？顺序重要吗？",
    answer:
      "`glActiveTexture(GL_TEXTURE1);` 再 `glBindTexture(GL_TEXTURE_2D, tex2);`。顺序重要：必须先 `activeTexture` 选中单元，`bindTexture` 才会把图绑到那个单元上。",
    tags: ["纹理单元", "activeTexture", "读代码"],
  },
  {
    id: "tx-47",
    chapter: "textures",
    level: 3,
    question:
      "顶点着色器里 UV 属性写 `layout (location = 2) in vec2 aTexCoord;`，配置该属性时 `glVertexAttribPointer` 的第一个参数应填几？分量数填几？",
    answer:
      "第一个参数（属性位置编号）填 `2`，要和 `location = 2` 对应；分量数填 `2`（UV 是 vec2，含 u、v 两个分量）。",
    tags: ["vertexAttribPointer", "layout location", "读代码"],
  },
  {
    id: "tx-48",
    chapter: "textures",
    level: 3,
    question: "片段着色器里想把笑脸纹理左右镜像贴上，采样坐标该怎么改？",
    answer:
      "把 u 分量取反：`texture(tex, vec2(1.0 - TexCoord.x, TexCoord.y))`。u 从 0→1 变成 1→0，于是图被横向翻转。",
    tags: ["纹理坐标", "采样", "应用"],
  },
  {
    id: "tx-49",
    chapter: "textures",
    level: 3,
    question:
      "WebGL2 里加载完图片 `image` 后，把它原样贴上去的 CPU 侧最少需要哪几步？",
    answer:
      "① `gl.createTexture()` + `gl.bindTexture(gl.TEXTURE_2D, tex)`；②设环绕 `WRAP_S/T` 与过滤 `MIN/MAG_FILTER`（如都用 `gl.LINEAR`）；③ `gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image)`；并给顶点配好 UV 属性。",
    tags: ["流程", "WebGL2", "应用"],
  },
  {
    id: "tx-50",
    chapter: "textures",
    level: 3,
    question:
      "想用纹理坐标范围 0.25~0.75（而非 0~1）来只显示图的中心区域，会得到什么？",
    answer:
      "只采到图正中间那块（左右各裁掉 25%、上下各裁掉 25%），相当于「放大看中心、裁掉四周」。因为 UV 没超出 0~1，环绕方式不参与，单纯是采样范围缩小。",
    tags: ["纹理坐标", "UV", "应用"],
  },
  {
    id: "tx-51",
    chapter: "textures",
    level: 3,
    question:
      "想用一个 uniform 在运行时动态控制两张图的混合比例，片段着色器和 CPU 侧各怎么改？",
    answer:
      "片段着色器：声明 `uniform float mixValue;`，把 `mix(..., ..., 0.2)` 的常量换成 `mixValue`。CPU 侧：用 `glUniform1f(location, 值)` 每帧传入 0~1 的比例（如按键控制），即可实时调混合度。",
    tags: ["mix()", "uniform", "应用"],
  },
  {
    id: "tx-52",
    chapter: "textures",
    level: 3,
    question:
      "`glTexImage2D` 的第 3 个参数（internalformat）和第 7 个参数（format）分别表示什么？",
    answer:
      "第 3 个 internalformat 是「显卡里把纹理存成什么格式」（如 `GL_RGB`）；第 7 个 format 是「你传进来的源数据是什么格式」（如 `GL_RGB`）。一个管存、一个管入，可以不同（如源是 RGBA、内部存 RGB）。",
    tags: ["texImage2D", "参数", "读代码"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 边界） ──
  {
    id: "tx-53",
    chapter: "textures",
    level: 4,
    question:
      "用多张图时画面全黑、串色、或两个采样器取到同一张图，可能是哪些原因？怎么修？",
    answer:
      "原因：采样器没绑对纹理单元——忘了用 `glUniform1i` 告诉着色器「这个采样器去几号单元」，或 `activeTexture` 选错了单元号，导致两个 `sampler2D` 默认都指向 0 号单元。修：确保每个采样器都用 `uniform1i` 指定了正确单元号，且绑纹理前先 `activeTexture` 选中对应单元。",
    tags: ["纹理单元", "陷阱", "uniform1i"],
  },
  {
    id: "tx-54",
    chapter: "textures",
    level: 4,
    question:
      "纹理完全不显示（一片黑），代码看着没错。一个常见原因是 mipmap 相关的，是什么？怎么修？",
    answer:
      "缩小过滤 `MIN_FILTER` 设成了带 mipmap 的档（如 `LINEAR_MIPMAP_LINEAR`），却没调用 `generateMipmap`——GPU 找不到缩小版，纹理判为「不完整」，采样返回黑。修：上传图片后补一句 `glGenerateMipmap(GL_TEXTURE_2D)`；或把 `MIN_FILTER` 改成不带 mipmap 的 `GL_LINEAR` / `GL_NEAREST`。",
    tags: ["mipmap", "MIN_FILTER", "陷阱"],
  },
  {
    id: "tx-55",
    chapter: "textures",
    level: 4,
    question: "纹理采样全黑，列举除「mipmap 没生成」外还有哪些常见原因。",
    answer:
      "常见还有：① UV 属性没配（`vertexAttribPointer` / `enableVertexAttribArray` 漏了），片段拿不到坐标；②纹理没成功上传（`texImage2D` 在图片还没加载完时就调了，WebGL 拿到空数据）；③采样器没用 `uniform1i` 绑到有效单元，或绑错单元；④绘制前没 `useProgram` 激活程序就传 uniform。",
    tags: ["采样", "陷阱", "调试"],
  },
  {
    id: "tx-56",
    chapter: "textures",
    level: 4,
    question:
      "给 `MAG_FILTER` 设了 `GL_LINEAR_MIPMAP_LINEAR`，运行报错。为什么？应该怎么设？",
    answer:
      "因为 mipmap 过滤只对缩小（`MIN_FILTER`）有意义，放大时没有「更高清的级」可取，给 `MAG_FILTER` 设 mipmap 档非法，OpenGL 报 `GL_INVALID_ENUM`。`MAG_FILTER` 只能设 `GL_NEAREST` 或 `GL_LINEAR`。",
    tags: ["mipmap", "MAG_FILTER", "陷阱"],
  },
  {
    id: "tx-57",
    chapter: "textures",
    level: 4,
    question:
      "把一张 RGBA（带透明通道）的笑脸图按 `format = GL_RGB` 上传，会出什么问题？",
    answer:
      "源数据每像素 4 字节（含 alpha），却按 RGB（每像素 3 字节）解读，字节错位读取，颜色全乱、出现斜向条纹或错色。修：`format` 改成 `GL_RGBA`，internalformat 一般也用 `GL_RGBA`，与源图通道数一致。",
    tags: ["texImage2D", "format", "陷阱"],
  },
  {
    id: "tx-58",
    chapter: "textures",
    level: 4,
    question:
      "贴图上下颠倒，有人改片段着色器把 `TexCoord.y` 取反 `1.0 - TexCoord.y` 来「修」，这样可行吗？和翻转图片的正规修法相比有什么差别？",
    answer:
      "能让画面正过来，是「治标」：它在采样阶段翻 V，所有用到这张图的着色器都得记得翻，且和别处约定容易冲突。正规修法是上传前翻转图片 Y 轴（C++ `stbi_set_flip_vertically_on_load(true)`、WebGL `gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)`），从源头统一坐标系，一劳永逸。",
    tags: ["纹理坐标", "陷阱", "翻转"],
  },
  {
    id: "tx-59",
    chapter: "textures",
    level: 4,
    question:
      "UV 拉到 0~2、想让图四角各出现一个完整图案且接缝平滑对齐，环绕该用哪个？只用 REPEAT 行不行？",
    answer:
      "用 `MIRRORED_REPEAT`：第二张镜像翻转，接缝处边缘像素相同，过渡平滑。只用 `REPEAT` 也能铺成 2×2，但相邻两张是原样拼接，接缝处可能出现明显的「硬接缝」，不够平滑。",
    tags: ["纹理环绕", "MIRRORED_REPEAT", "综合"],
  },
  {
    id: "tx-60",
    chapter: "textures",
    level: 4,
    question:
      "把贴图沿 U 方向平铺 4 次时边缘出现一条细的杂色缝（接缝处串到了对侧像素），可能是什么原因？",
    answer:
      "典型是 `LINEAR` 过滤在纹理边缘把「对侧那一行像素」也混了进来。若环绕是 REPEAT，边缘会混到另一头的像素；这种情况想避免边缘串色，可把对应方向环绕设 `CLAMP_TO_EDGE`，或确保贴图本身边缘可无缝衔接。",
    tags: ["纹理过滤", "纹理环绕", "陷阱"],
  },
  {
    id: "tx-61",
    chapter: "textures",
    level: 4,
    question:
      "完整串一遍单张贴图的链路：从顶点给 UV 到颜色落到屏幕像素，经过哪几环？",
    answer:
      "顶点给每个角配 UV → 光栅化把 UV 按片段插值到每个片段 → 片段着色器声明 `sampler2D` 接住纹理、用 `texture(sampler, uv)` 按插值出的 UV 采样取色 → 输出为该像素的颜色。CPU 侧前置：创建+绑定纹理、设环绕/过滤、`texImage2D` 上传、（按需）`generateMipmap`、配 UV 顶点属性。",
    tags: ["流程", "综合", "采样"],
  },
  {
    id: "tx-62",
    chapter: "textures",
    level: 4,
    question:
      "近处看清晰、移远后远处的栏杆 / 棋盘出现「闪烁、爬行的噪点」，是什么问题？根治办法？",
    answer:
      "是缩小时的走样（摩尔纹 / 闪烁）：远处一个屏幕像素覆盖原图一大片，只取一格采样不稳定。根治：开 mipmap——`generateMipmap` 生成金字塔，并把 `MIN_FILTER` 设为带 mipmap 的档（如 `GL_LINEAR_MIPMAP_LINEAR`），GPU 自动从尺寸合适的级取色。",
    tags: ["mipmap", "走样", "综合"],
  },
  {
    id: "tx-63",
    chapter: "textures",
    level: 4,
    question:
      "`GL_NEAREST_MIPMAP_LINEAR` 和 `GL_LINEAR_MIPMAP_NEAREST` 这两个 mipmap 过滤档，名字里两段分别管什么？两者有何不同？",
    answer:
      "命名规则：`X_MIPMAP_Y` 中，X 是「在某一级 mipmap 内部怎么取色」（NEAREST / LINEAR），Y 是「在相邻两级 mipmap 之间怎么选 / 混」（NEAREST 选最近一级 / LINEAR 在两级间线性插值）。所以前者级内邻近、级间插值；后者级内线性、级间只选最近一级。",
    tags: ["mipmap", "过滤", "综合"],
  },
  {
    id: "tx-64",
    chapter: "textures",
    level: 4,
    question:
      "要同时用 3 张纹理，分别绑到 0、1、2 号单元。`GL_TEXTURE1` 和 `GL_TEXTURE0 + 1` 是一回事吗？这说明纹理单元常量有什么性质？",
    answer:
      "是一回事——纹理单元常量是连续的，`GL_TEXTURE0 + 1` 恰等于 `GL_TEXTURE1`。所以在循环里可以写 `glActiveTexture(GL_TEXTURE0 + i)` 批量激活第 i 个单元，无需逐个写常量名。",
    tags: ["纹理单元", "GL_TEXTURE0", "综合"],
  },
  {
    id: "tx-65",
    chapter: "textures",
    level: 4,
    question:
      "上传纹理前不调用 `glGenTextures` / `glBindTexture`，直接 `glTexImage2D`，会发生什么？",
    answer:
      "`glTexImage2D` 作用在「当前绑定的 2D 纹理」上。若没绑定任何纹理对象（绑定的是 0 / 默认），上传要么失败、要么写进无效目标，纹理拿不到数据，采样得到全黑。必须先创建并绑定纹理，再上传——这是状态机的前提。",
    tags: ["bindTexture", "流程", "陷阱"],
  },
  {
    id: "tx-66",
    chapter: "textures",
    level: 4,
    question:
      "WebGL 里图片是异步加载的。若在 `image.onload` 之前就调用 `gl.texImage2D(..., image)`，会怎样？正确做法是什么？",
    answer:
      "图片还没解码完，`texImage2D` 拿到的是空 / 未就绪的图，纹理内容为空，贴出来全黑。正确做法：把创建纹理 + `texImage2D` + `generateMipmap` 放进 `image.onload` 回调里，等图加载完再上传。",
    tags: ["WebGL", "异步加载", "陷阱"],
  },
  {
    id: "tx-67",
    chapter: "textures",
    level: 4,
    question:
      "笑脸贴纸叠在木箱底图上，想让笑脸的透明背景露出底图，光靠 `mix()` 够吗？关键在哪？",
    answer:
      "光 `mix(a, b, 0.2)` 是按固定比例整体混合，做不到「按笑脸自身透明度露底」。关键是笑脸图要带 alpha 通道（RGBA 上传），再按它的 alpha 决定混合权重，例如 `mix(底图, 笑脸.rgb, 笑脸.a)`，让透明处权重为 0、只显底图。",
    tags: ["mix()", "alpha", "综合"],
  },
  {
    id: "tx-68",
    chapter: "textures",
    level: 4,
    question:
      "在 Demo 里同一份越界 UV（缩放=3）下切三种环绕得到截然不同的结果，这说明了什么道理？",
    answer:
      "说明 UV 越界（>1 或 <0）时显示什么，完全由环绕设置决定，而非 UV 本身——同一份 $(0,0)$ ~ $(3,3)$ 的越界 UV，REPEAT 是平铺、MIRRORED_REPEAT 是镜像平铺、CLAMP_TO_EDGE 是边缘拉伸。所以越界时务必按需设 `WRAP_S` / `WRAP_T`。",
    tags: ["纹理环绕", "UV", "综合"],
  },
  {
    id: "tx-69",
    chapter: "textures",
    level: 4,
    question:
      "顶点着色器声明了 `out vec2 TexCoord` 但忘了写 `TexCoord = aTexCoord;`，贴图会怎样？",
    answer:
      "片段着色器收到的 `TexCoord` 是未赋值的（内容不确定 / 全 0），采样坐标失效——常见表现是整个面只取到纹理某一个固定点的颜色（如全是 $(0,0)$ 处那一格颜色）的纯色块，而非正常贴图。修：在顶点着色器里把 `aTexCoord` 赋给 `TexCoord` 递下去。",
    tags: ["GLSL", "纹理坐标", "陷阱"],
  },
];
