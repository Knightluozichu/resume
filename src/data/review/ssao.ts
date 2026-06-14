/** 复习题库 · SSAO（ssao）。HEL-90 高级光照篇·收官。 */

import type { ReviewQuestion } from "./types";

export const ssaoQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / API / 数值约定） ──
  {
    id: "ao-1",
    chapter: "ssao",
    level: 1,
    question: "什么是「环境光遮蔽」（AO）？",
    answer:
      "Ambient Occlusion，描述一个表面点能接收到多少四面八方漫射来的环境光：开阔处几乎不被挡、收得满、该亮；墙角、缝隙、物体接触处被围住、收得少、该暗。是个 `0~1` 系数（1=完全不挡、0=被挡死）。",
    tags: ["环境光遮蔽", "定义"],
  },
  {
    id: "ao-2",
    chapter: "ssao",
    level: 1,
    question: "什么是「SSAO」？",
    answer:
      "Screen-Space Ambient Occlusion，屏幕空间环境光遮蔽。一种实时近似 AO 的技术：不遍历真实几何，而是用延迟着色已存好的 G-buffer（位置 / 法线），在每个片元法线半球内撒采样点、投影回屏幕读深度比较，估出周围被挡的比例。",
    tags: ["SSAO", "定义"],
  },
  {
    id: "ao-3",
    chapter: "ssao",
    level: 1,
    question: "什么是「半球核采样」？为什么用半球不用整球？",
    answer:
      "以片元为中心、在它法线 N 朝向的**半球**内取一组随机偏移向量（采样核，常 16~64 个），加到片元位置得到采样点逐个判断有没有被挡。用半球而非整球是不让朝向表面背面的采样点把平坦面也凭空算暗。",
    tags: ["半球核采样", "定义"],
  },
  {
    id: "ao-4",
    chapter: "ssao",
    level: 1,
    question: "什么是「随机旋转 noise」？",
    answer:
      "Random Rotation Noise，SSAO 去条带的关键技巧：采样核点数少又整屏共用固定方向会让 AO 出现规则条带 banding。用一张很小的随机向量纹理（如 4×4）平铺整屏、逐像素把采样核绕法线转一个随机角度，把规则条带打散成细碎噪点。",
    tags: ["随机旋转 noise", "定义"],
  },
  {
    id: "ao-5",
    chapter: "ssao",
    level: 1,
    question: "什么是「范围检查」（range check）？",
    answer:
      "SSAO 的必要修正：深度比较只看采样点是否比那处表面更远，但若那处是离得很远的背景（深度差巨大），它本不该遮挡当前片元、否则物体边缘出黑晕。范围检查按深度差加权，差太远的（远背景）权重衰减到接近 0、不计。",
    tags: ["范围检查", "定义"],
  },
  {
    id: "ao-6",
    chapter: "ssao",
    level: 1,
    question: "什么是「AO 模糊」？为什么要做？",
    answer:
      "AO Blur，随机旋转把条带换成了噪点、画面变颗粒；AO 模糊就是算完 SSAO 后把 AO 灰度图过一道很小的盒式模糊（如 4×4 邻域取平均），把噪点抹平成柔和连续的 AO 再去乘环境光。",
    tags: ["AO 模糊", "定义"],
  },
  {
    id: "ao-7",
    chapter: "ssao",
    level: 1,
    question: "SSAO 算出的 AO 只乘到哪一项上？直接光动不动？",
    answer:
      "**只乘到环境光项**上（`ambient *= AO`），直接光（漫反射、镜面、阴影）一概**不动**。因为 AO 描述的是漫射环境光被挡多少，直接光该不该照由光源方向 / 阴影管。",
    tags: ["环境光遮蔽", "收尾"],
  },
  {
    id: "ao-8",
    chapter: "ssao",
    level: 1,
    question: "SSAO 怎么判断一个采样点「被挡了」？",
    answer:
      "把采样点投影到屏幕，读 G-buffer 在那位置存的真实表面深度 D。如果采样点比 D **离相机更远**，说明它藏在真实表面后面、被挡了，遮蔽 +1；比 D 更近则前面是空的、不计。",
    tags: ["深度比较", "判遮蔽"],
  },
  {
    id: "ao-9",
    chapter: "ssao",
    level: 1,
    question: "SSAO 用的 G-buffer 位置 / 法线是哪个空间的？为什么？",
    answer:
      "用**视空间**的位置 / 法线（不是世界空间）。这样投影矩阵 `projection` 才能把采样点直接投回屏幕、读 G-buffer 深度比较。",
    tags: ["SSAO", "视空间"],
  },
  {
    id: "ao-10",
    chapter: "ssao",
    level: 1,
    question: "AO 只乘环境光那两行代码怎么写？",
    answer:
      "`vec3 ambient = ambientColor * Albedo * AO;`（只有这里乘 AO）、`vec3 lighting = ambient + diffuse + specular;`（直接光照旧、不乘 AO）。",
    tags: ["环境光遮蔽", "代码"],
  },
  {
    id: "ao-11",
    chapter: "ssao",
    level: 1,
    question: "SSAO 是几遍？三块代码各是什么？",
    answer:
      "三遍 / 三块：① SSAO pass（半球采样 + 深度比较 + range check，输出 AO 灰度）；② 模糊 pass（小盒式模糊抹噪点）；③ 光照 pass（`ambient *= AO`，直接光不动）。",
    tags: ["SSAO", "三块"],
  },
  {
    id: "ao-12",
    chapter: "ssao",
    level: 1,
    question: "noise 纹理在 WebGL2 里采样参数怎么设？为什么？",
    answer:
      "用 `gl.NEAREST` 过滤 + `gl.REPEAT` 环绕平铺。线性过滤会把随机向量插值糊掉、失去打散条带的作用；REPEAT 才能把这张小 noise 纹理平铺整屏。",
    tags: ["随机旋转 noise", "API"],
  },
  {
    id: "ao-13",
    chapter: "ssao",
    level: 1,
    question: "AO 模糊核取 4×4 邻域有什么讲究？",
    answer:
      "因为随机旋转用的 noise 纹理是 `4×4` 平铺的，模糊核取 `4×4` 邻域取平均，正好抹掉一个完整噪声周期，把旋转带来的噪点干净抹平。",
    tags: ["AO 模糊", "数值"],
  },
  {
    id: "ao-14",
    chapter: "ssao",
    level: 1,
    question: "SSAO 直接复用了延迟着色的什么？",
    answer:
      "直接复用 G-buffer 的**位置和法线**——不重算真几何，省下大量开销，又能直接塞进延迟管线。这也是它名字里「屏幕空间」的由来。",
    tags: ["SSAO", "G-buffer"],
  },
  {
    id: "ao-15",
    chapter: "ssao",
    level: 1,
    question: "SSAO pass 输出什么？格式可以怎么省？",
    answer:
      "只输出一个标量 AO 灰度值。桌面常用单通道 `GL_RED`（`GL_R8`/`GL_R16F`）省带宽；WebGL2 单通道浮点要 `gl.R16F` + `EXT_color_buffer_float`，嫌麻烦也可退回 `RGBA8` 只用 `r` 通道。",
    tags: ["SSAO", "格式"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "ao-16",
    chapter: "ssao",
    level: 2,
    question: "为什么墙角、缝隙、接触处总比旁边平面更暗？",
    answer:
      "不是因为有谁专门打了阴影，而是它们**三面被围住**，四面八方漫射来的光被周围的东西挡掉了大半、能照进去的少。AO 描述的正是这个「被周围挡了多少」。",
    tags: ["环境光遮蔽", "为什么"],
  },
  {
    id: "ao-17",
    chapter: "ssao",
    level: 2,
    question: "为什么常量环境光照不出墙角的暗、显假？",
    answer:
      "常量环境光给所有表面统一加一个常数——墙角和空旷平面拿到一模一样的环境光。结果墙角缝隙和平整面一样亮，画面塌成一片、没立体感、一眼假。AO 才能让被挡的地方按比例暗下去。",
    tags: ["环境光遮蔽", "对比"],
  },
  {
    id: "ao-18",
    chapter: "ssao",
    level: 2,
    question: "SSAO 为什么「快」？它省在哪？",
    answer:
      "严格算 AO 要遍历周围真实几何、太贵。SSAO 只读 G-buffer 已存的深度 / 位置 / 法线做近似判断、不重算几何——整个判断只在屏幕空间、靠已有缓冲完成，所以又快又能塞进延迟管线。",
    tags: ["SSAO", "为什么"],
  },
  {
    id: "ao-19",
    chapter: "ssao",
    level: 2,
    question: "为什么半球采样用整球会让平坦面也凭空变暗？",
    answer:
      "用整球的话，朝向表面背面的采样点永远在几何内部、永远被判「被挡」，于是一面平整的墙也凭空算暗。限制在法线半球内，才只采到表面上方那一侧有意义的空间。",
    tags: ["半球核采样", "为什么"],
  },
  {
    id: "ao-20",
    chapter: "ssao",
    level: 2,
    question: "为什么 SSAO 不去碰真几何也能近似判断遮蔽？",
    answer:
      "因为 G-buffer 里每个屏幕像素都记着它对应表面点的位置和法线。在法线半球撒采样点、投影回屏幕读 G-buffer 那处深度一比，就能近似知道「这个片元周围被实体挡了多少」——用已有的深度 / 位置缓冲代替真几何遍历。",
    tags: ["SSAO", "机制"],
  },
  {
    id: "ao-21",
    chapter: "ssao",
    level: 2,
    question: "为什么 AO 会出现规则条带 banding？怎么治？",
    answer:
      "为了快，采样核只能取很少几个点（16~64），且整屏用同一套固定方向，于是 AO 上爬满规则条带（像水波纹）。治法：用随机旋转把整屏共用的固定方向逐像素打散成各异的随机方向，条带就变成细碎噪点。",
    tags: ["随机旋转 noise", "机制"],
  },
  {
    id: "ao-22",
    chapter: "ssao",
    level: 2,
    question: "随机旋转和模糊为什么「两步缺一不可」？",
    answer:
      "随机旋转负责把规则条带**打散成噪点**，模糊负责把噪点**抹平**成柔和 AO。只旋转不模糊，画面是颗粒；只模糊不旋转，规则条带糊不掉。两步配合才得干净 AO。",
    tags: ["AO 模糊", "机制"],
  },
  {
    id: "ao-23",
    chapter: "ssao",
    level: 2,
    question: "没做范围检查为什么物体边缘会出黑边黑晕？",
    answer:
      "深度比较只看「采样点是否比那处表面更远」。物体边缘旁边可能是几米外的远背景墙、深度差巨大，按规则也被算成「被挡」，于是物体边缘凭空多一圈黑边黑晕。范围检查按深度差加权把远背景的遮挡剔除。",
    tags: ["范围检查", "机制"],
  },
  {
    id: "ao-24",
    chapter: "ssao",
    level: 2,
    question: "为什么 AO 只能乘环境光、不能乘直接光？",
    answer:
      "AO 描述的是「漫射环境光」被周围挡了多少——没有明确来向的光。直接光有明确光源方向，它该不该照、照多亮由 `N·L` 和阴影映射管，跟 AO 是两码事。乘到直接光 / 整体上会让画面整体发黑过暗。",
    tags: ["环境光遮蔽", "为什么"],
  },
  {
    id: "ao-25",
    chapter: "ssao",
    level: 2,
    question: "采样半径 radius 太大为什么会糊成一大片污渍、丢接触细节？",
    answer:
      "半球探得太远，远处不相干的几何也被算进遮蔽，AO 失去了贴近接触面的细节、糊成大块脏污。半径管的是「暗角影响范围」，要贴合场景接触尺度；想更黑用强度 power，别用半径凑。",
    tags: ["范围检查", "半径"],
  },
  {
    id: "ao-26",
    chapter: "ssao",
    level: 2,
    question: "范围检查常用什么平滑权重实现？大致写法？",
    answer:
      "常用 `smoothstep(0.0, 1.0, radius / abs(深度差))` 之类：深度差在采样半径量级内的遮挡权重接近 1、算数；差太远的（远背景）权重衰减到接近 0、不计。",
    tags: ["范围检查", "公式"],
  },
  {
    id: "ao-27",
    chapter: "ssao",
    level: 2,
    question: "noise 纹理为什么必须用 NEAREST 而不是 LINEAR？",
    answer:
      "noise 纹理存的是**随机向量**，要的就是相邻像素方向各异来打散条带。LINEAR 过滤会把相邻随机向量插值糊成接近的方向，失去随机性、打散条带的作用就没了。所以必须 NEAREST。",
    tags: ["随机旋转 noise", "为什么"],
  },
  {
    id: "ao-28",
    chapter: "ssao",
    level: 2,
    question: "为什么 SSAO 用视空间位置 / 法线，而不是世界空间？",
    answer:
      "因为要把采样点用投影矩阵投回屏幕读 G-buffer 深度比较，视空间下乘 `projection` 就能直接得到屏幕坐标。用世界空间还得多一道视变换，不如直接在视空间算方便。",
    tags: ["SSAO", "视空间"],
  },
  {
    id: "ao-29",
    chapter: "ssao",
    level: 2,
    question: "AO 灰度图里开阔平地和接触缝隙各是什么颜色？代表什么？",
    answer:
      "开阔平地是**白**的（不被遮挡、AO≈1）；接触缝隙是一团团**黑**（强遮蔽、AO→0）。这张灰度图就是 SSAO 真正算出来的「每个点被挡了多少」，最终合成时只乘在环境光上。",
    tags: ["SSAO", "灰度图"],
  },

  // ── L3 应用（给参数判结果 / 改法 / 读代码） ──
  {
    id: "ao-30",
    chapter: "ssao",
    level: 3,
    question: "SSAO 为什么只把 AO 乘到环境光、不动直接光？一句话自测。",
    answer:
      "因为 AO 描述「漫射环境光被挡多少」、没有明确来向；直接光有明确光源方向、该不该照由 `N·L` 和阴影管。乘到直接光 / 整体上会让画面整体发黑过暗——所以只乘环境光。",
    tags: ["环境光遮蔽", "应用"],
  },
  {
    id: "ao-31",
    chapter: "ssao",
    level: 3,
    question:
      "加了 SSAO 后整个画面发黑、连开阔受光面和高光都被压暗，最可能哪错了？",
    answer:
      "把 AO 乘到了**整体颜色或直接光**上（`finalColor *= AO` 或 `diffuse *= AO`）。AO 只描述漫射环境光被挡多少。修法：只 `ambient *= AO`，漫反射、镜面等直接光一概不动。这是 SSAO 的头号坑。",
    tags: ["环境光遮蔽", "排错"],
  },
  {
    id: "ao-32",
    chapter: "ssao",
    level: 3,
    question:
      "物体边缘、轮廓处凭空出现一圈黑边黑晕，尤其前面紧挨远背景时，怎么修？",
    answer:
      "没做范围检查——深度比较把几米外的远背景也误算成遮挡。修法：加 range check 按深度差加权（如 `smoothstep(0,1, radius/abs(深度差))`），深度差远超采样半径的远背景权重衰减到 0、不计入遮蔽。",
    tags: ["范围检查", "排错"],
  },
  {
    id: "ao-33",
    chapter: "ssao",
    level: 3,
    question: "AO 上爬满规则水波纹条带，根因和修法？",
    answer:
      "采样核点数少又整屏共用固定方向（没用 noise 旋转）。修法：用 `4×4` 随机向量纹理平铺、逐像素把采样核绕法线随机旋转，把条带打散成噪点，再用 `4×4` 盒式模糊抹平。",
    tags: ["随机旋转 noise", "排错"],
  },
  {
    id: "ao-34",
    chapter: "ssao",
    level: 3,
    question: "AO 出暗角了但糊成一大片脏污、接触缝细节看不清，怎么修？",
    answer:
      "采样半径 `radius` 太大、半球探得太远，远处不相干几何被算进遮蔽。修法：把半径调回贴合场景接触尺度的小值（只够得着邻近接触面）；要更黑用强度 `power`，别用半径凑黑度。",
    tags: ["范围检查", "排错"],
  },
  {
    id: "ao-35",
    chapter: "ssao",
    level: 3,
    question: "demo 里把 SSAO 关 / 开，球与地面、球与球接触处分别有什么变化？",
    answer:
      "关：接触处和缝隙与旁边空地一样亮，球像浮在地上、缝隙平塌、显假。开：接触处和缝隙自动暗下一圈，球像坐在地上、挨着的球之间有厚重接触阴影。对应环境光遮蔽原理。",
    tags: ["SSAO", "Demo"],
  },
  {
    id: "ao-36",
    chapter: "ssao",
    level: 3,
    question: "demo 里半径和强度分别把画面改成什么样？别混用怎么理解？",
    answer:
      "半径拖大 → 探测够得更远，暗角**铺得更广**（范围变大）；强度（power）拖大 → 同样的遮蔽被**压得更黑**（黑度变深、范围不变）。一个管「影响范围」、一个管「压多黑」，别混用。",
    tags: ["范围检查", "Demo"],
  },
  {
    id: "ao-37",
    chapter: "ssao",
    level: 3,
    question:
      "SSAO 全做对了、AO 灰度图也干净，但接到光照里整画面灰暗了一截，问题在哪？怎么改？",
    answer:
      "AO 乘错地方了——大概率 `finalColor *= AO` 或 `diffuse *= AO`（乘到整体 / 直接光）。改：只保留 `ambient *= AO`，漫反射、镜面、阴影等直接光照旧、一概不乘 AO。",
    tags: ["环境光遮蔽", "排错"],
  },
  {
    id: "ao-38",
    chapter: "ssao",
    level: 3,
    question: "SSAO pass 循环体里怎么投影采样点、读深度、做 range check？",
    answer:
      "`vec3 samplePos = fragPos + (TBN*samples[i])*radius;` → `vec4 offset = projection*vec4(samplePos,1); offset.xyz/=offset.w; offset.xy=offset.xy*0.5+0.5;` → `float sampleDepth = texture(gPosition, offset.xy).z;` → `float rc = smoothstep(0,1, radius/abs(fragPos.z-sampleDepth));` → `occlusion += (sampleDepth >= samplePos.z + bias ? 1:0) * rc;`",
    tags: ["SSAO", "代码"],
  },
  {
    id: "ao-39",
    chapter: "ssao",
    level: 3,
    question:
      "三个 SSAO 症状：条带 / 边缘黑晕 / 暗角糊成污渍，各对应漏 / 错了哪个环节？",
    answer:
      "①规则条带 → 没用 noise 逐像素旋转采样核（或核点少又共用固定方向）；②边缘黑晕 → 没做范围检查（远背景误算遮挡）；③暗角糊成污渍 → 采样半径 radius 太大。三个症状各对症修。",
    tags: ["SSAO", "排错"],
  },
  {
    id: "ao-40",
    chapter: "ssao",
    level: 3,
    question: "demo 切到「AO 灰度图」通道看到什么？它最终怎么用？",
    answer:
      "开阔平地是白（不挡、AO≈1），接触缝隙是黑（强遮蔽、AO→0）。这张灰度图就是 SSAO 算出的「每个点被挡多少」，最终合成时**只乘在环境光上**、直接光不动。",
    tags: ["SSAO", "Demo"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 选型） ──
  {
    id: "ao-41",
    chapter: "ssao",
    level: 4,
    question:
      "SSAO 四个常见坑：乘错地方 / 没 range check / 没旋转或没模糊 / 半径太大，根因和修法各是什么？",
    answer:
      "①乘整体或直接光 → 整画面发黑：只 `ambient *= AO`。②没 range check → 边缘黑晕：按深度差加权剔远背景。③没旋转出条带 / 没模糊出颗粒：noise 旋转打散 + 盒式模糊抹平。④半径太大糊成污渍：半径调回接触尺度、要黑用 power。",
    tags: ["陷阱", "综合"],
  },
  {
    id: "ao-42",
    chapter: "ssao",
    level: 4,
    question:
      "为什么「半球采样 + 深度比较 + range check + 旋转 + 模糊 + 只乘环境光」六环节缺一不可？",
    answer:
      "半球采样圈定遮挡判断范围（整球会误暗平面）；深度比较判每点被没被挡；range check 剔除远背景误判；随机旋转打散条带；模糊抹平噪点；只乘环境光保证不动直接光。少任一环，AO 要么算错、要么有条带 / 颗粒 / 黑晕、要么画面整体发黑。",
    tags: ["综合", "六环节"],
  },
  {
    id: "ao-43",
    chapter: "ssao",
    level: 4,
    question:
      "SSAO 和阴影映射都让画面变暗，本质区别是什么？为什么 AO 不该管直接光？",
    answer:
      "阴影映射管的是**直接光**：有明确光源方向，靠 shadow map / `N·L` 判某点被不被某盏灯照到。AO 管的是**漫射环境光**：没有明确来向，估某点被周围挡掉多少环境光。两者是两码事——所以 AO 只乘环境光，直接光的明暗交给阴影那套。",
    tags: ["综合", "对比"],
  },
  {
    id: "ao-44",
    chapter: "ssao",
    level: 4,
    question: "为什么 SSAO 必须建在延迟着色之上？复用了它的什么？",
    answer:
      "SSAO 要在屏幕空间靠每个像素的位置 / 法线判遮挡、不重算真几何——这正需要延迟着色 G-buffer 里已存好的视空间位置和法线。有了 G-buffer，SSAO 才能又快又自然地塞进延迟管线，所以建在延迟之上。",
    tags: ["SSAO", "综合"],
  },
  {
    id: "ao-45",
    chapter: "ssao",
    level: 4,
    question: "半径和强度（power）分别管什么？为什么不能用半径凑黑度？",
    answer:
      "半径管「暗角**影响范围**」（探多远），强度管「**压多黑**」。用半径凑黑度会让半球探到不相干的远几何、AO 糊成一大片脏污、丢接触细节。想更黑该调 power、范围该调 radius，各管一头。",
    tags: ["范围检查", "综合"],
  },
  {
    id: "ao-46",
    chapter: "ssao",
    level: 4,
    question: "为什么 noise 旋转和 4×4 模糊的「4×4」要对得上？",
    answer:
      "随机旋转用 `4×4` noise 纹理平铺整屏，每 4×4 像素是一个完整随机周期。模糊核也取 `4×4` 邻域取平均，正好覆盖一个完整噪声周期、把旋转带来的噪点干净抹平。核取小了抹不净、取大了糊过头。",
    tags: ["AO 模糊", "综合"],
  },
  {
    id: "ao-47",
    chapter: "ssao",
    level: 4,
    question:
      "为什么 demo 的「点在不在几何内部」近似，和真 SSAO 的「投影读 G-buffer 深度」内核一致？",
    answer:
      "demo 用「采样点在不在球 / 地面内部」代替了「投影到屏幕读 G-buffer 深度比较」，但「在片元法线半球撒点数遮蔽 → 只压环境光」的内核完全一致。单 frag 做不了真 G-buffer 多 pass，所以用解析近似演示同一个思路。",
    tags: ["SSAO", "综合"],
  },
  {
    id: "ao-48",
    chapter: "ssao",
    level: 4,
    question:
      "SSAO 三遍流程分别做什么？为什么模糊要单独一遍、不能并进 SSAO pass？",
    answer:
      "① SSAO pass：半球采样 + 深度比较 + range check 输出带噪点的 AO 灰度；② 模糊 pass：4×4 盒式模糊抹噪点；③ 光照 pass：`ambient *= AO`。模糊要单独一遍是因为它需要采样**整张已算好的 AO 图**的邻域——必须先有完整 AO 图才能模糊，所以分两遍。",
    tags: ["SSAO", "综合"],
  },
  {
    id: "ao-49",
    chapter: "ssao",
    level: 4,
    question:
      "结合整篇收官：从 Blinn-Phong 到 SSAO，这一篇把「光怎么打、怎么算得快、怎么显得真」怎么拼齐的？",
    answer:
      "Blinn-Phong / Gamma 解决「光怎么打、颜色怎么对」；阴影 / 点阴影 / 法线 / 视差贴图加「遮挡和表面细节」让光更真；HDR / Bloom 解决「强光怎么显得真」；延迟着色解决「多光源怎么算得快」；SSAO 给环境光加接触阴影的厚重感。下一步通往基于物理渲染 PBR。",
    tags: ["综合", "收官"],
  },
  {
    id: "ao-50",
    chapter: "ssao",
    level: 4,
    question: "把整条 SSAO 流程讲清：从墙角缝隙到屏幕上自动暗下去的接触阴影。",
    answer:
      "① SSAO pass：对每个可见片元采 G-buffer 拿视空间位置 / 法线，用 noise 逐像素旋转的 TBN 把半球核旋到法线朝向，循环每个采样点投影到屏幕读 G-buffer 深度做深度比较 + range check，累加被挡比例 → 输出 AO 灰度。② 模糊 pass：4×4 盒式模糊抹平旋转噪点。③ 光照 pass：把干净 AO **只乘到环境光项**（`ambient *= AO`），直接光不动。于是墙角、缝隙、接触处的环境光被按比例压暗，画面多出一层接触阴影的立体厚重感。",
    tags: ["综合", "全流程"],
  },
];
