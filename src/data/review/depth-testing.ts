/** 复习题库 · 深度测试（depth-testing）。HEL-78 高级OpenGL篇。 */

import type { ReviewQuestion } from "./types";

export const depthTestingQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / 数值约定 / 公式形状） ──
  {
    id: "dt-1",
    chapter: "depth-testing",
    level: 1,
    question: "什么是「深度缓冲」（depth buffer / z-buffer）？",
    answer:
      "显存里一块和颜色缓冲一样大的内存，为每个像素额外存一个 0~1 的「深度值」（离镜头的远近）。屏幕显示的是颜色缓冲，深度缓冲只在幕后记账，供深度测试比较用。常见精度为 24 位，又叫 z-buffer。",
    tags: ["深度缓冲", "定义"],
  },
  {
    id: "dt-2",
    chapter: "depth-testing",
    level: 1,
    question: "深度缓冲和颜色缓冲是什么关系？各存什么？",
    answer:
      "两者是「孪生兄弟」：尺寸一样大、一一对应每个像素。颜色缓冲存「这个像素什么颜色」，深度缓冲存「这个像素当前贴的色块有多远」。屏幕显示的是颜色缓冲，深度缓冲不直接显示、只在幕后记账。",
    tags: ["深度缓冲", "颜色缓冲"],
  },
  {
    id: "dt-3",
    chapter: "depth-testing",
    level: 1,
    question: "什么是「深度值」（depth value）？取值范围和约定是什么？",
    answer:
      "深度缓冲里每个像素存的那个数，范围 0~1，表示该像素当前色块离镜头的远近。约定 **0 最近、1 最远**（落在近平面记 0、落在远平面记 1）。",
    tags: ["深度值", "定义"],
  },
  {
    id: "dt-4",
    chapter: "depth-testing",
    level: 1,
    question: "片段着色器里用哪个内建变量读当前片段的深度值？",
    answer:
      "用内建变量 `gl_FragCoord.z`，它就是当前片段写进深度缓冲的那个 0~1 的深度值。",
    tags: ["深度值", "gl_FragCoord"],
  },
  {
    id: "dt-5",
    chapter: "depth-testing",
    level: 1,
    question: "什么是「深度测试」（depth test）？一句话说清它做的事。",
    answer:
      "新片段要写进某像素前，先拿它的深度值和深度缓冲里该像素已存的深度值比一比——更近才写、更远就丢。它让三维场景的前后遮挡自动正确。",
    tags: ["深度测试", "定义"],
  },
  {
    id: "dt-6",
    chapter: "depth-testing",
    level: 1,
    question: "深度测试在渲染管线里处在什么位置？",
    answer:
      "发生在**片段着色器之后**（要先有颜色和深度才能测），在片段被真正写入颜色缓冲**之前**。",
    tags: ["深度测试", "管线位置"],
  },
  {
    id: "dt-7",
    chapter: "depth-testing",
    level: 1,
    question: "用哪个调用启用深度测试？默认是开还是关？",
    answer:
      "用 `glEnable(GL_DEPTH_TEST)` 启用。默认是**关**的——不开就没有遮挡判定，管线退回「谁后画谁赢」。",
    tags: ["glEnable", "GL_DEPTH_TEST"],
  },
  {
    id: "dt-8",
    chapter: "depth-testing",
    level: 1,
    question: "每帧清深度缓冲用哪个调用？为什么要清？",
    answer:
      "用 `glClear(GL_DEPTH_BUFFER_BIT)`（通常和颜色缓冲一起 `GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT`）。清深度就是把账本重置成「最远」（1.0），这样新一帧任何东西都能先写进去。",
    tags: ["glClear", "GL_DEPTH_BUFFER_BIT"],
  },
  {
    id: "dt-9",
    chapter: "depth-testing",
    level: 1,
    question: "什么是「深度函数」（depth function）？用哪个调用设置？",
    answer:
      "决定深度测试「怎样算通过」的比较规则，用 `glDepthFunc(...)` 设置。默认 `GL_LESS`（新深度更小才通过）。",
    tags: ["深度函数", "glDepthFunc"],
  },
  {
    id: "dt-10",
    chapter: "depth-testing",
    level: 1,
    question: "`glDepthFunc` 的默认算子是哪个？它表示什么含义？",
    answer:
      "默认是 `GL_LESS`——「新深度严格更小才通过」，也就是「近的盖远的」，这是绝大多数场景要的遮挡规则。",
    tags: ["深度函数", "GL_LESS"],
  },
  {
    id: "dt-11",
    chapter: "depth-testing",
    level: 1,
    question: "`GL_ALWAYS` 和 `GL_NEVER` 这两个深度函数各是什么效果？",
    answer:
      "`GL_ALWAYS` 永远通过（等于没做测试，谁后写谁赢）；`GL_NEVER` 永远不通过（什么都画不出来）。",
    tags: ["深度函数", "GL_ALWAYS", "GL_NEVER"],
  },
  {
    id: "dt-12",
    chapter: "depth-testing",
    level: 1,
    question: "`glDepthMask(GL_FALSE)` 是干什么的？",
    answer:
      "让深度缓冲变**只读**：仍参与深度比较，但通过测试的片段不更新（不写回）深度缓冲。画半透明物体时常用，避免它们互相挡掉。",
    tags: ["glDepthMask", "只读"],
  },
  {
    id: "dt-13",
    chapter: "depth-testing",
    level: 1,
    question: "什么是「非线性深度」（non-linear depth）？",
    answer:
      "深度缓冲里的深度值随真实距离不是均匀变化的，而是与 `1/z` 成正比——绝大部分精度集中在离镜头很近的范围，越远精度越粗。它是透视投影的副产物。",
    tags: ["非线性深度", "定义"],
  },
  {
    id: "dt-14",
    chapter: "depth-testing",
    level: 1,
    question: "什么是「线性化深度」？什么是「深度可视化」？",
    answer:
      "线性化深度是把非线性的深度值还原成正比于真实距离的线性值的过程。深度可视化是把片段的深度值当成灰度颜色输出到屏幕，用来「看见」深度缓冲长什么样。",
    tags: ["线性化深度", "深度可视化"],
  },
  {
    id: "dt-15",
    chapter: "depth-testing",
    level: 1,
    question: "什么是「深度冲突」（Z-fighting）？",
    answer:
      "两个表面靠得极近、深度值小到深度缓冲分辨不出谁前谁后时，同一片区域里两个面交替胜出、渲染成一道道交错闪烁的撕裂条纹的现象。摄像机一动还会闪，又称深度冲突。",
    tags: ["深度冲突", "Z-fighting", "定义"],
  },
  {
    id: "dt-16",
    chapter: "depth-testing",
    level: 1,
    question: "深度缓冲通常是多少位精度？",
    answer:
      "通常是 24 位精度，足够细地区分远近。也可以用更高精度（如 32 位）来缓解深度冲突，但牺牲一点性能。",
    tags: ["深度缓冲", "精度"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "dt-17",
    chapter: "depth-testing",
    level: 2,
    question:
      "没有深度测试时，三维场景的前后遮挡靠什么决定？会出什么问题？",
    answer:
      "靠绘制顺序——「谁后画谁赢」，纯按上色顺序叠色。问题是：远处的墙可能因为「碰巧后画」而盖住近处的杯子，近的反被远的挡住，画面穿帮。深度测试就是为了让遮挡和绘制顺序无关。",
    tags: ["深度测试", "为什么"],
  },
  {
    id: "dt-18",
    chapter: "depth-testing",
    level: 2,
    question: "深度测试为什么能让遮挡和「谁先画谁后画」无关？",
    answer:
      "因为它是**逐片段**地比深度缓冲里已存的深度值：每个片段写入前都核对一次，更近才写、更远就丢，无论这个片段属于哪个物体、那物体是第几个画的。所以留在屏幕上的永远是每个像素处最近的那块。",
    tags: ["深度测试", "机制"],
  },
  {
    id: "dt-19",
    chapter: "depth-testing",
    level: 2,
    question: "深度测试通过和不通过时，颜色缓冲和深度缓冲分别怎么变？",
    answer:
      "通过（默认即更近）：把颜色写进颜色缓冲、并把这个更小的深度值更新进深度缓冲。不通过：整个片段被丢弃，颜色缓冲和深度缓冲都不动。",
    tags: ["深度测试", "机制"],
  },
  {
    id: "dt-20",
    chapter: "depth-testing",
    level: 2,
    question: "为什么深度值在 0~1 之间不是均匀分布，而是堆在近处？",
    answer:
      "因为深度值与真实距离的倒数 `1/z` 成正比，而 `1/z` 在 z 小（近）时变化剧烈、z 大（远）时变化迟缓。于是近处一点点距离变化就让深度值明显挪动（精度高），远处挪很大距离才动一点（精度低）——「近密远疏」。",
    tags: ["非线性深度", "为什么"],
  },
  {
    id: "dt-21",
    chapter: "depth-testing",
    level: 2,
    question: "为什么要把深度设计成「近处精度高、远处精度低」？",
    answer:
      "因为我们通常更在乎近处物体之间的遮挡是否精确（它们占了画面大头），远处糊一点无所谓。而且这套非线性映射是透视投影「免费附送」的副产物，不用额外开销。",
    tags: ["非线性深度", "为什么"],
  },
  {
    id: "dt-22",
    chapter: "depth-testing",
    level: 2,
    question:
      "把 `gl_FragCoord.z` 直接当灰度输出做深度可视化，为什么画面几乎一片惨白？",
    answer:
      "因为深度值是非线性的，精度全堆在近处，可视范围内的值被挤到接近 1 的高位区间，肉眼分不出层次，所以看着惨白。想看到从近到远平滑的灰阶，得先把它线性化。",
    tags: ["深度可视化", "非线性深度"],
  },
  {
    id: "dt-23",
    chapter: "depth-testing",
    level: 2,
    question: "深度冲突（Z-fighting）的根本成因是什么？",
    answer:
      "两个面几乎共面，深度差小于深度缓冲能分辨的精度，两面的深度值被四舍五入成了同一个数。深度测试只能在它们之间「随机」二选一，于是同一片区域反复横跳、斑驳撕裂。",
    tags: ["深度冲突", "成因"],
  },
  {
    id: "dt-24",
    chapter: "depth-testing",
    level: 2,
    question: "非线性深度的「近密远疏」和深度冲突之间有什么联系？",
    answer:
      "深度冲突的温床正是非线性带来的「远处精度差」：远处深度值挨得太近，两个远处的面稍微一靠近就分不出谁前谁后，被压成同一深度，于是深度测试随机二选一、撕裂闪烁。",
    tags: ["非线性深度", "深度冲突"],
  },
  {
    id: "dt-25",
    chapter: "depth-testing",
    level: 2,
    question: "只清颜色缓冲、忘了清深度缓冲，会发生什么？",
    answer:
      "上一帧的深度账本会残留下来，新一帧的片段拿来和旧深度比，遮挡逐帧出错——画面会出现莫名的遮挡错乱、随相机移动还跳变。所以每帧都要清深度缓冲。",
    tags: ["glClear", "GL_DEPTH_BUFFER_BIT"],
  },
  {
    id: "dt-26",
    chapter: "depth-testing",
    level: 2,
    question: "深度测试和「按物体远近排序、远的先画」是不是一回事？",
    answer:
      "不是。深度测试不依赖也不改变绘制顺序，它是逐片段比深度缓冲。「远的先画、近的后画」是没有深度测试时（或画半透明物体时）才需要手动排序的做法，和深度测试的自动逐片段比较是两回事。",
    tags: ["深度测试", "对比"],
  },
  {
    id: "dt-27",
    chapter: "depth-testing",
    level: 2,
    question: "`glDepthMask(GL_FALSE)` 和 `glDisable(GL_DEPTH_TEST)` 有什么区别？",
    answer:
      "`glDepthMask(GL_FALSE)` 是「深度只读」：仍参与深度比较，只是通过的片段不写回深度。`glDisable(GL_DEPTH_TEST)` 是彻底关掉测试：既不比较也不写。前者画半透明物常用，后者会让遮挡判定整个失效。",
    tags: ["glDepthMask", "对比"],
  },
  {
    id: "dt-28",
    chapter: "depth-testing",
    level: 2,
    question: "为什么把深度函数设成 `GL_ALWAYS` 可以用来验证深度测试是否在起作用？",
    answer:
      "因为 `GL_ALWAYS` 让所有片段都通过，等于退回「谁后画谁赢」的无测试状态。把它和默认 `GL_LESS` 对比，若两种下遮挡表现明显不同，就证明深度测试确实在生效。",
    tags: ["深度函数", "GL_ALWAYS"],
  },
  {
    id: "dt-29",
    chapter: "depth-testing",
    level: 2,
    question: "为什么说近平面 near 设得越小，越多精度被「浪费」？",
    answer:
      "因为非线性深度的精度都堆在近处，near 越小，越多精度被分到贴脸的极近处那一小段，留给可视范围内真正有物体的区域的精度就更少——远处更容易出深度冲突。",
    tags: ["非线性深度", "near"],
  },
  {
    id: "dt-30",
    chapter: "depth-testing",
    level: 2,
    question: "线性化深度时，为什么第一步要把 0~1 的深度映射回 -1~1？",
    answer:
      "因为深度缓冲存的是 0~1，而 NDC（标准化设备坐标）约定深度是 -1~1。要套透视投影的逆运算反算真实距离，得先把深度值换算回 NDC 那个区间，所以做 `z_ndc = 2·z_depth − 1` 的区间换算。",
    tags: ["线性化深度", "NDC"],
  },

  // ── L3 应用（读代码 / 给参数判结果 / 小计算） ──
  {
    id: "dt-31",
    chapter: "depth-testing",
    level: 3,
    question:
      "默认 `GL_LESS` 下，深度缓冲某格当前是 0.7，来了个深度 0.3 的片段，通过吗？缓冲会怎样？",
    answer:
      "通过。`GL_LESS` 是「新深度更小才通过」，`0.3 < 0.7` 成立，新片段更近。于是把它的颜色写进颜色缓冲（盖掉原来的），并把深度缓冲这一格从 0.7 更新成更近的 0.3。",
    tags: ["深度测试", "GL_LESS", "判结果"],
  },
  {
    id: "dt-32",
    chapter: "depth-testing",
    level: 3,
    question:
      "深度缓冲某格已是 0.3，又来一块深度 0.5 的片段（默认 `GL_LESS`），结果如何？",
    answer:
      "不通过。`0.5 < 0.3` 不成立，新片段更远，整个片段被丢弃——颜色和深度都不写。近的（0.3）稳稳留住。",
    tags: ["深度测试", "GL_LESS", "判结果"],
  },
  {
    id: "dt-33",
    chapter: "depth-testing",
    level: 3,
    question:
      "把比较规则从「更近才通过」改成「更远才通过」（`GL_GREATER`），近杯子（0.3）和远墙（0.7）落同一像素，最后留下谁？",
    answer:
      "留下远墙。`GL_GREATER` 是「新深度更大才通过」，远墙深度 0.7 比杯子 0.3 大，于是远的胜出、近的被丢——遮挡正好反过来，远的盖住近的。",
    tags: ["深度函数", "GL_GREATER", "判结果"],
  },
  {
    id: "dt-34",
    chapter: "depth-testing",
    level: 3,
    question: "桌面 `glEnable(GL_DEPTH_TEST)` 在 WebGL2 里怎么写？",
    answer:
      "写成 `gl.enable(gl.DEPTH_TEST)`。WebGL2 是上下文方法 + 上下文上的常量，没有桌面那种全局函数 + 大写常量的写法。",
    tags: ["WebGL2", "API差异"],
  },
  {
    id: "dt-35",
    chapter: "depth-testing",
    level: 3,
    question:
      "桌面 `glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)` 在 WebGL2 里怎么写？",
    answer:
      "写成 `gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)`。常量去掉 `GL_` 前缀、挂到 `gl` 上，按位或一起清，含义完全一致。",
    tags: ["WebGL2", "glClear"],
  },
  {
    id: "dt-36",
    chapter: "depth-testing",
    level: 3,
    question:
      "想换深度比较规则、想让深度只读，分别加哪两行代码（C++）？",
    answer:
      "换规则：`glDepthFunc(GL_LESS)`（可改 `GL_LEQUAL` 等）。只读：`glDepthMask(GL_FALSE)`（参与比较但通过的片段不写回深度）。用完只读记得 `glDepthMask(GL_TRUE)` 恢复。",
    tags: ["glDepthFunc", "glDepthMask"],
  },
  {
    id: "dt-37",
    chapter: "depth-testing",
    level: 3,
    question:
      "深度可视化 Demo 里把「线性化」从关切到开，靠近你的那个圆灰度会变深还是变浅？为什么？",
    answer:
      "通常会变深（更黑）。关时显示非线性深度，近处的圆深度值被挤到接近 1 的高位（偏白）；开时按真实距离线性显示，近处对应小深度值、涂成黑，所以更深。整体上线性化后近黑远白的层次才拉开。",
    tags: ["深度可视化", "线性化深度", "Demo"],
  },
  {
    id: "dt-38",
    chapter: "depth-testing",
    level: 3,
    question:
      "深度可视化 Demo 非线性档下，三个伪深度跨 0.1~0.92 的圆，灰度为什么都偏白、彼此难分？",
    answer:
      "因为非线性档直接显示与 `1/z` 成正比的深度值，精度全堆在近处，三个圆的伪深度映射出来的值都被挤到接近 1 的高位区间，差距很小，所以灰度都偏白、几乎一个色。",
    tags: ["深度可视化", "非线性深度", "Demo"],
  },
  {
    id: "dt-39",
    chapter: "depth-testing",
    level: 3,
    question:
      "深度可视化 Demo 里把 near 拖到最小（0.1），画面灰度对比变明显还是更糊？为什么？",
    answer:
      "更糊（尤其非线性档下）。near 越小，越多精度被浪费在贴脸的极近处，留给可视范围内物体的精度就更少，灰度差更不明显——这也正是「把 near 设远一点能缓解 Z-fighting」的同一个道理。",
    tags: ["深度可视化", "near", "Demo"],
  },
  {
    id: "dt-40",
    chapter: "depth-testing",
    level: 3,
    question:
      "近平面 near = 0.5、远平面 far = 20，非线性映射 `z_depth = (1/z − 1/near)/(1/far − 1/near)`，z = near 和 z = far 时深度值各是多少？",
    answer:
      "z = near：分子 `1/near − 1/near = 0`，深度值 = 0（最近记 0）。z = far：分子 `1/far − 1/near` 等于分母，深度值 = 1（最远记 1）。正好对上「近平面记 0、远平面记 1」。",
    tags: ["非线性深度", "计算"],
  },
  {
    id: "dt-41",
    chapter: "depth-testing",
    level: 3,
    question:
      "线性化第一步 `z_ndc = 2·z_depth − 1`，深度值 z_depth = 0.5 对应的 NDC 深度是多少？",
    answer:
      "`z_ndc = 2 × 0.5 − 1 = 0`。0~1 区间的正中（0.5）映射到 -1~1 区间的正中（0），符合区间换算。",
    tags: ["线性化深度", "计算"],
  },
  {
    id: "dt-42",
    chapter: "depth-testing",
    level: 3,
    question:
      "线性化反算公式 `z = 2·near·far / (far + near − z_ndc·(far − near))`，near = 1、far = 100、z_ndc = 0 时 z 约是多少？",
    answer:
      "代入 `z = 2×1×100 / (100 + 1 − 0×99) = 200 / 101 ≈ 1.98`。NDC 深度取中点（0）反算出的真实距离接近 near 端（约 1.98），说明深度中点其实对应很近的距离——非线性的体现。",
    tags: ["线性化深度", "计算"],
  },
  {
    id: "dt-43",
    chapter: "depth-testing",
    level: 3,
    question:
      "看到一段渲染代码初始化时没有 `glEnable(GL_DEPTH_TEST)`，3D 物体遮挡乱了，怎么排？",
    answer:
      "首先确认遗漏的 `glEnable(GL_DEPTH_TEST)`——默认是关的，不开就退回「谁后画谁赢」。补上它在初始化时开一次，并确保每帧 `glClear(... | GL_DEPTH_BUFFER_BIT)` 清深度缓冲。",
    tags: ["glEnable", "排错"],
  },
  {
    id: "dt-44",
    chapter: "depth-testing",
    level: 3,
    question:
      "WebGL2 里 `glDepthMask(GL_FALSE)` 怎么写？什么时候该恢复？",
    answer:
      "写成 `gl.depthMask(false)`。画完需要只读深度的物体（如半透明物）后，要 `gl.depthMask(true)` 恢复可写，否则后续物体的深度都写不进去，遮挡会出错。",
    tags: ["WebGL2", "glDepthMask"],
  },
  {
    id: "dt-45",
    chapter: "depth-testing",
    level: 3,
    question:
      "墙上贴张严丝合缝共面的海报，边缘满是闪烁撕裂条纹，给两种不动硬件的缓解办法。",
    answer:
      "这是 Z-fighting。① 给海报一点点偏移、离墙微微靠前（别完全共面），两面深度值就能被区分开；② 把近平面 near 设得远一点，整个可视范围分到的精度更足，远处也更不易冲突。",
    tags: ["深度冲突", "排错"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 边界） ──
  {
    id: "dt-46",
    chapter: "depth-testing",
    level: 4,
    question:
      "「深度测试就是按物体离镜头远近排序、远的先画近的后画盖上去」——这说法对吗？深度测试到底靠不靠控制绘制顺序实现遮挡？",
    answer:
      "不对。深度测试不依赖也不改变绘制顺序。它是逐片段比深度缓冲里已存的深度值：每个片段写入前核对一次，更近才写、更远就丢，与物体是第几个画的无关。哪怕先画近杯子、再画远墙，墙的片段也会因深度更大被丢弃。「远的先画」是无深度测试时（或画半透明物）才需要手动排序的做法。",
    tags: ["深度测试", "综合"],
  },
  {
    id: "dt-47",
    chapter: "depth-testing",
    level: 4,
    question:
      "Z-fighting 的完整链路：从非线性深度到屏幕上的撕裂闪烁，经过哪几环？",
    answer:
      "① 非线性深度把精度堆在近处、远处精度粗 → ② 两个面几乎共面时，深度差小于可分辨精度，两面深度值被四舍五入成同一个数 → ③ 深度测试在两者间「随机」二选一 → ④ 同一片区域反复横跳、渲染成交错条纹，相机一动就闪。",
    tags: ["深度冲突", "非线性深度", "综合"],
  },
  {
    id: "dt-48",
    chapter: "depth-testing",
    level: 4,
    question:
      "3D 场景遮挡全乱、远墙盖住近杯子、随相机移动还跳变。原因和修法？",
    answer:
      "原因：忘了 `glEnable(GL_DEPTH_TEST)`（默认关），管线退回「谁后画谁赢」，纯按绘制顺序叠色。修法：初始化时 `glEnable(GL_DEPTH_TEST)` 开一次，并确保**每帧**都 `glClear(... | GL_DEPTH_BUFFER_BIT)` 清深度缓冲。",
    tags: ["glEnable", "陷阱"],
  },
  {
    id: "dt-49",
    chapter: "depth-testing",
    level: 4,
    question:
      "遮挡只是「偶尔」错、且随帧数累积越来越乱——更可能是忘开测试，还是忘清深度缓冲？为什么？",
    answer:
      "更像忘清深度缓冲。忘开 `glEnable` 是一开始就完全没遮挡判定、表现稳定地错；而只清颜色不清深度，会让上一帧的深度账本残留，逐帧累积污染，所以错得「越来越乱、跟帧数有关」。修法：每帧 `glClear` 带上 `GL_DEPTH_BUFFER_BIT`。",
    tags: ["glClear", "陷阱", "边界"],
  },
  {
    id: "dt-50",
    chapter: "depth-testing",
    level: 4,
    question:
      "做深度可视化时画面一片惨白看不出层次。原因是什么？怎么修才能看出远近？",
    answer:
      "原因：直接把非线性的 `gl_FragCoord.z` 当灰度输出，精度全堆在近处，可视范围内的值被挤到接近 1 的高位，肉眼分不出。修法：先按公式把深度线性化（映射回 NDC → 套透视逆运算反算真实距离）再归一输出，灰阶才能从近到远平滑拉开。",
    tags: ["深度可视化", "线性化深度", "陷阱"],
  },
  {
    id: "dt-51",
    chapter: "depth-testing",
    level: 4,
    question:
      "Z-fighting 的三种修法分别从哪个角度治本？各说一句为什么管用。",
    answer:
      "① 别让两物体完全共面、给点偏移——直接拉开两面深度值，不再争同一深度；② 把近平面 near 设远一点——非线性精度别浪费在极近处，整个可视范围分到的精度更足；③ 用更高精度深度缓冲（如 32 位）——能分辨更小的深度差，代价是牺牲一点性能。",
    tags: ["深度冲突", "综合"],
  },
  {
    id: "dt-52",
    chapter: "depth-testing",
    level: 4,
    question:
      "为什么深度测试发生在「片段着色器之后、写颜色之前」这个特定位置？换个位置行不行？",
    answer:
      "因为要先有片段的颜色和深度（片段着色器算出来）才有得比，所以必须在片段着色器之后。又因为只有通过测试的片段才该写进颜色缓冲，所以必须在写颜色之前——不通过的直接丢弃、连颜色都不写。位置错了要么没数据可比、要么白白写了又被覆盖。",
    tags: ["深度测试", "管线位置", "综合"],
  },
  {
    id: "dt-53",
    chapter: "depth-testing",
    level: 4,
    question:
      "为什么深度做成非线性「近密远疏」总体上是好事，但它也是 Z-fighting 的根源？这对设 near/far 有什么启发？",
    answer:
      "好处：近处物体占画面大头，把精度堆在近处让近处遮挡判定特别精确，且是透视投影免费附送的。坏处：远处精度粗，两面稍近就分不出、Z-fighting。启发：尽量把 near 设大（别贴脸）、far 别设得过分远，让宝贵精度落在真正有物体的可视范围内。",
    tags: ["非线性深度", "深度冲突", "综合"],
  },
  {
    id: "dt-54",
    chapter: "depth-testing",
    level: 4,
    question:
      "把深度函数误设成 `GL_GREATER`、又忘了它的影响——画面会出什么？怎么快速定位是这个原因？",
    answer:
      "遮挡整个反过来：远的盖住近的，能看到「本该被前面挡住的背面」反而显示出来。快速定位：把 `glDepthFunc` 改回默认 `GL_LESS`，若遮挡立刻恢复正常，就坐实是深度函数被设反了（绝大多数场景应用 `GL_LESS`）。",
    tags: ["深度函数", "GL_GREATER", "陷阱"],
  },
  {
    id: "dt-55",
    chapter: "depth-testing",
    level: 4,
    question:
      "下一章「混合」里画半透明物为什么常配 `glDepthMask(GL_FALSE)`，而不是 `glDisable(GL_DEPTH_TEST)`？把两者差别讲清。",
    answer:
      "`glDepthMask(GL_FALSE)` 让半透明物仍参与深度比较（被前面的不透明物正确遮挡），只是不把自己的深度写回去、免得互相挡掉。若改成 `glDisable(GL_DEPTH_TEST)`，半透明物连深度比较都不做，会直接穿过不透明物显示出来。所以要的是「只读不写」，不是「彻底关测试」。",
    tags: ["glDepthMask", "混合", "综合"],
  },
];
