/** 复习题库 · HDR（hdr）。HEL-90 高级光照篇。 */

import type { ReviewQuestion } from "./types";

export const hdrQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / 公式 / 数值约定） ──
  {
    id: "hdr-1",
    chapter: "hdr",
    level: 1,
    question: "什么是「LDR」？普通 RGBA8 帧缓冲属于哪种？",
    answer:
      "Low Dynamic Range，低动态范围。颜色每个通道被锁在 `[0,1]`（或 0~255 整数），最亮就是纯白 1，存不下「比纯白还亮」的值。普通的 `RGBA8` 帧缓冲就是 LDR 的。",
    tags: ["LDR", "定义"],
  },
  {
    id: "hdr-2",
    chapter: "hdr",
    level: 1,
    question: "什么是「动态范围」？",
    answer:
      "一个场景里**最亮和最暗之间的亮度跨度**。真实世界跨度极大（正午太阳能比阴影亮上万倍），渲染时强光源、多光叠加也会让某些区域远亮于 1。",
    tags: ["动态范围", "定义"],
  },
  {
    id: "hdr-3",
    chapter: "hdr",
    level: 1,
    question: "什么是「HDR」（作为一套渲染做法）？",
    answer:
      "High Dynamic Range，高动态范围。先把场景渲进能存 `>1` 的浮点帧缓冲（保住超亮高光的全部层次），再用色调映射把这个大范围压回屏幕能显示的 `[0,1]`。亮处暗处都能保留细节。",
    tags: ["HDR", "定义"],
  },
  {
    id: "hdr-4",
    chapter: "hdr",
    level: 1,
    question: "什么是「浮点帧缓冲」？用什么内部格式？",
    answer:
      "颜色附件用 **16 位（或 32 位）浮点数**存储的帧缓冲，WebGL2 里用 `RGBA16F` 这类内部格式。浮点数能表示远大于 1 的值，所以 `>1` 的高动态范围颜色能原封不动存进去、不被截断。",
    tags: ["浮点帧缓冲", "定义"],
  },
  {
    id: "hdr-5",
    chapter: "hdr",
    level: 1,
    question: "什么是「色调映射」？它和硬截断的关键区别是什么？",
    answer:
      "Tone Mapping，把 `[0,∞)` 的高动态范围颜色用一个函数**平滑压回** `[0,1]`。关键是它不硬截断，而是越亮压得越狠、但保留相对层次，于是窗户中心和窗框不再糊成同一片白。",
    tags: ["色调映射", "定义"],
  },
  {
    id: "hdr-6",
    chapter: "hdr",
    level: 1,
    question: "什么是「曝光」映射？公式怎么写？",
    answer:
      "一种色调映射方式，模拟相机曝光：`1 - exp(-c * 曝光)`。曝光调大暗处快速提亮、亮处更易顶白；曝光调小亮处保留更多层次、暗处偏黑。让你像调相机一样权衡亮暗。",
    tags: ["曝光", "公式"],
  },
  {
    id: "hdr-7",
    chapter: "hdr",
    level: 1,
    question: "Reinhard 色调映射公式怎么写？c=1、c=6 各压成多少？",
    answer:
      "`c / (c + 1)`。`c=1` 压成 `0.5`、`c=6` 压成约 `0.86`；c 再大也只越来越逼近 1 但永远到不了，所以高光始终有层次、绝不死白。",
    tags: ["色调映射", "Reinhard"],
  },
  {
    id: "hdr-8",
    chapter: "hdr",
    level: 1,
    question: "HDR 的出口顺序是什么？三步谁先谁后？",
    answer:
      "**采样 HDR → tonemap 压回 [0,1] → gamma 校正编码回 sRGB → 上屏**。色调映射在前、gamma 校正在后，顺序不能换。",
    tags: ["HDR", "出口顺序"],
  },
  {
    id: "hdr-9",
    chapter: "hdr",
    level: 1,
    question: "WebGL2 建 RGBA16F 可渲染 FBO 前必须做什么？",
    answer:
      '必须先 `gl.getExtension("EXT_color_buffer_float")`。WebGL2 里 `RGBA16F` 默认不能当可渲染的颜色附件，拿不到这个扩展就建不出可渲染的浮点 FBO。',
    tags: ["浮点帧缓冲", "扩展"],
  },
  {
    id: "hdr-10",
    chapter: "hdr",
    level: 1,
    question: "建浮点纹理时内部格式和数据类型分别填什么（WebGL2）？",
    answer:
      "`gl.texImage2D(target, 0, gl.RGBA16F, W, H, 0, gl.RGBA, gl.FLOAT, null)`——内部格式 `gl.RGBA16F`、数据类型 `gl.FLOAT`。桌面对应 `GL_RGBA16F` + `GL_FLOAT`。",
    tags: ["浮点帧缓冲", "代码"],
  },
  {
    id: "hdr-11",
    chapter: "hdr",
    level: 1,
    question: "HDR 是几遍渲染？每遍做什么？",
    answer:
      "两遍（和帧缓冲章同构）。第一遍把场景渲进浮点 FBO（`>1` 高光原样存住、不 tonemap 不 gamma）；第二遍画全屏四边形采样这张浮点纹理、做 tonemap + gamma 上屏。",
    tags: ["HDR", "两遍"],
  },
  {
    id: "hdr-12",
    chapter: "hdr",
    level: 1,
    question: "Reinhard 的 tonemap 着色器关键那行怎么写？",
    answer:
      "`vec3 mapped = hdr / (hdr + vec3(1.0));`，之后 `FragColor = vec4(pow(mapped, vec3(1.0/2.2)), 1.0);`——先 Reinhard tonemap、再 gamma 校正。",
    tags: ["色调映射", "代码"],
  },
  {
    id: "hdr-13",
    chapter: "hdr",
    level: 1,
    question: "曝光的 tonemap 着色器关键那行怎么写？",
    answer:
      "`vec3 mapped = vec3(1.0) - exp(-hdr * exposure);`，之后 `FragColor = vec4(pow(mapped, vec3(1.0/2.2)), 1.0);`——`exposure` 是个可调 uniform。",
    tags: ["曝光", "代码"],
  },
  {
    id: "hdr-14",
    chapter: "hdr",
    level: 1,
    question: "HDR 承接前面哪两章？分别承接什么？",
    answer:
      "承接 gamma 校正（tonemap 后还要 gamma 校正、顺序先 tonemap 后 gamma）和帧缓冲（第一遍渲到浮点 FBO、第二遍上屏，与它同构两遍渲染）。",
    tags: ["HDR", "承接"],
  },
  {
    id: "hdr-15",
    chapter: "hdr",
    level: 1,
    question: "桌面 OpenGL 用 RGBA16F 当颜色附件需要扩展吗？",
    answer:
      "不需要。桌面 OpenGL 3.x 直接用内部格式 `GL_RGBA16F` 即可（核心支持）。只有 WebGL2 才需要先 `EXT_color_buffer_float`。",
    tags: ["浮点帧缓冲", "API差异"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "hdr-16",
    chapter: "hdr",
    level: 2,
    question: "为什么强光区在 LDR 帧缓冲里会糊成死白？",
    answer:
      "LDR 每通道只存 `[0,1]`。窗户中心算出 `6.0`、窗框 `2.5`，写进去全被截断成 `1.0`——本该有的明暗层次在写入那刻就永久丢了，整扇窗糊成一片死白。",
    tags: ["LDR", "死白"],
  },
  {
    id: "hdr-17",
    chapter: "hdr",
    level: 2,
    question: "浮点帧缓冲凭什么能存住 >1 的颜色？",
    answer:
      "因为浮点数能轻松表示 `6.0`、`100.0` 这种远超 1 的值（也能表示很小的小数）。换成 16 位浮点纹理后，窗户的 `6.0`、窗框的 `2.5` 都原封不动存进去，一个细节都不丢。",
    tags: ["浮点帧缓冲", "机制"],
  },
  {
    id: "hdr-18",
    chapter: "hdr",
    level: 2,
    question: "色调映射怎么把大范围塞进 [0,1] 又不丢层次？",
    answer:
      "用平滑压缩的函数而不是一刀切：越亮的地方压得越狠，但亮处之间的相对层次保留下来。于是 `6.0` 和 `2.5` 被压成两个不同的、都在 `[0,1]` 内的值，窗户中心和窗框分得开。",
    tags: ["色调映射", "机制"],
  },
  {
    id: "hdr-19",
    chapter: "hdr",
    level: 2,
    question: "为什么 Reinhard 能保证高光绝不死白？",
    answer:
      "`c/(c+1)` 把任意大的 c 平滑压进 `[0,1)`，c 再大也只越来越逼近 1 但永远到不了。所以高光区始终是 1 以内的不同值、保留层次，绝不会糊成纯白。",
    tags: ["色调映射", "Reinhard"],
  },
  {
    id: "hdr-20",
    chapter: "hdr",
    level: 2,
    question: "曝光映射里调大、调小曝光值各偏向照顾谁？",
    answer:
      "曝光调大：暗处被快速提亮（看清昏暗细节），但亮处更易顶到接近 1。曝光调小：亮处保留更多层次（看清强光），但暗处偏黑。亮处暗处此消彼长，正是逆光拍照的取舍。",
    tags: ["曝光", "此消彼长"],
  },
  {
    id: "hdr-21",
    chapter: "hdr",
    level: 2,
    question: "为什么 tonemap 必须放在 gamma 校正之前，反了会怎样？",
    answer:
      "tonemap 假设输入是**线性**的、在线性空间压缩亮度。要是先 gamma 校正（颜色已被提亮、不再线性），再拿去 tonemap，压缩曲线作用在错误数值上，颜色全乱（通常发灰、对比异常）。",
    tags: ["色调映射", "顺序"],
  },
  {
    id: "hdr-22",
    chapter: "hdr",
    level: 2,
    question: "为什么 HDR 第一遍不做任何 tonemap、也不 gamma 校正？",
    answer:
      "第一遍的任务只是把 `>1` 的高光原封不动存进浮点纹理。tonemap 和 gamma 是出口（第二遍）的事——第一遍若提前压缩 / 校正，就把高动态范围信息提前丢了 / 提前编码了，破坏后续处理。",
    tags: ["HDR", "两遍"],
  },
  {
    id: "hdr-23",
    chapter: "hdr",
    level: 2,
    question: "用了 RGBA16F 浮点 FBO 但忘了 tonemap，画面为什么还是死白？",
    answer:
      "因为屏幕只认 `[0,1]`。第一遍把 `>1` 好好存进浮点纹理了，第二遍若直接原样输出，`>1` 在上屏那刻照样被硬截断成纯白——浮点 FBO 只是「存住」，还得 tonemap「压回」才能上屏。",
    tags: ["色调映射", "为什么"],
  },
  {
    id: "hdr-24",
    chapter: "hdr",
    level: 2,
    question: "Reinhard 和曝光映射在曲线图上和「直接截断」相比有何不同？",
    answer:
      "红线 clamp 到 1 就封顶（>1 全是死白）；紫线 Reinhard、灰虚线 exposure 平滑趋近 1，把同样 `>1` 的高光压成一段段不同的灰、层次保住。截断是「砍掉超出的」，色调映射是「柔和地压缩进来」。",
    tags: ["色调映射", "对比"],
  },
  {
    id: "hdr-25",
    chapter: "hdr",
    level: 2,
    question:
      "为什么逆光拍照「要么窗外白成一片、要么屋里黑成一团」和 HDR 是同一个坎？",
    answer:
      "都是动态范围太大、显示介质范围太小：场景既有极亮的窗又有暗部，屏幕 / 相机只能显示一段亮度。HDR 的解法（浮点存住 + tonemap 压回）正是同时照顾亮处暗处，就像相机的 HDR 模式。",
    tags: ["HDR", "类比"],
  },
  {
    id: "hdr-26",
    chapter: "hdr",
    level: 2,
    question: "Reinhard 和曝光映射，tonemap 着色器里差在哪行？其余一样吗？",
    answer:
      "只第 2 行不同——Reinhard 是固定的 `hdr/(hdr+1)`，曝光是 `1-exp(-hdr*exposure)`（多个可调 uniform）。第 1 行采样、第 3 行 gamma 校正完全一样。",
    tags: ["色调映射", "对比"],
  },
  {
    id: "hdr-27",
    chapter: "hdr",
    level: 2,
    question:
      "为什么 WebGL2 写浮点 HDR 着色器时 precision highp float 不能省？",
    answer:
      "因为 HDR 值范围大（可能 `>1` 很多），`highp` 才有足够精度表示这些大值；用 `mediump` 精度不够会出色带 / 误差。所以 WebGL2 片段着色器开头必须加 `precision highp float;`。",
    tags: ["浮点帧缓冲", "precision"],
  },
  {
    id: "hdr-28",
    chapter: "hdr",
    level: 2,
    question:
      "为什么 RGBA8 帧缓冲下高光在「写入那一刻」就丢了，tonemap 救不回？",
    answer:
      "RGBA8 每通道只存 `[0,1]`，`6.0` 在第一遍写入帧缓冲那刻就被截成 `1.0`。等第二遍 tonemap 时画面里已没有 `>1` 的层次可压，压谁都白搭。所以必须第一遍就用浮点纹理存住。",
    tags: ["LDR", "写入截断"],
  },
  {
    id: "hdr-29",
    chapter: "hdr",
    level: 2,
    question: "完整的 HDR 出口流水线是什么？",
    answer:
      "**浮点 FBO 存住 HDR → 色调映射压回 [0,1] → gamma 校正编码回 sRGB → 上屏**。tonemap 和 gamma 顺序固定不能反。",
    tags: ["HDR", "流水线"],
  },

  // ── L3 应用（给参数判结果 / 改法 / 读代码） ──
  {
    id: "hdr-30",
    chapter: "hdr",
    level: 3,
    question: "为什么 tonemap 必须放 gamma 校正之前？一句话回答自测。",
    answer:
      "因为 tonemap 假设输入是线性 HDR 值。先 gamma 校正会把颜色提亮成非线性 sRGB，再 tonemap 就作用在错误数值上、颜色全乱。所以先 tonemap（线性空间压缩）、最后才 gamma。",
    tags: ["HDR", "应用"],
  },
  {
    id: "hdr-31",
    chapter: "hdr",
    level: 3,
    question:
      "走廊 demo 里 clamp 模式那行是什么？为什么死白？改成 Reinhard 怎么写？",
    answer:
      "clamp 行是 `mapped = clamp(hdr, 0.0, 1.0);`——窗户 `6.0`、窗框 `4.5` 全被切成 `1.0`、糊成死白。改 Reinhard：`mapped = hdr / (hdr + vec3(1.0));`，`6.0→约0.86`、`4.5→约0.82`，层次透出。",
    tags: ["色调映射", "Demo"],
  },
  {
    id: "hdr-32",
    chapter: "hdr",
    level: 3,
    question:
      "有人第一遍渲进 RGBA16F、第二遍先 gamma 再 Reinhard，颜色不对，问题在哪、怎么改？",
    answer:
      "顺序反了——先 gamma 把颜色推到非线性 sRGB，再 tonemap 作用在错误数值上。改：先 tonemap `hdr/(hdr+1)`、最后 `pow(mapped, 1/2.2)` gamma。gamma 永远是最后一步。",
    tags: ["HDR", "排错"],
  },
  {
    id: "hdr-33",
    chapter: "hdr",
    level: 3,
    question: "明明用了浮点帧缓冲画面还是死白、HDR 像没做，最可能漏了什么？",
    answer:
      "漏了第二遍的**色调映射**——把浮点纹理原样输出，`>1` 上屏那刻照样被截。修法：第二遍片段着色器先做 tonemap（Reinhard 或曝光）把 HDR 压回 `[0,1]` 再上屏。",
    tags: ["色调映射", "排错"],
  },
  {
    id: "hdr-34",
    chapter: "hdr",
    level: 3,
    question:
      "换上「HDR 流程」后高光依旧死白、调 tonemap 怎么都救不回，最可能哪错了？",
    answer:
      "颜色附件其实还是普通 `RGBA8`，存不下 `>1`——`6.0` 在第一遍写入那刻就被截成 `1.0`，第二遍 tonemap 时层次早没了。修法：颜色纹理内部格式必须是浮点 `RGBA16F`、数据类型 `FLOAT`。",
    tags: ["浮点帧缓冲", "排错"],
  },
  {
    id: "hdr-35",
    chapter: "hdr",
    level: 3,
    question:
      "WebGL2 建浮点 FBO 后 checkFramebufferStatus 返回不完整、画面全黑，怎么修？",
    answer:
      'WebGL2 默认不允许 `RGBA16F` 当可渲染颜色附件。修法：建之前先 `gl.getExtension("EXT_color_buffer_float")`，拿到才建；拿不到（老设备）就降级用普通 LDR 帧缓冲并告知用户，别硬上。',
    tags: ["浮点帧缓冲", "排错"],
  },
  {
    id: "hdr-36",
    chapter: "hdr",
    level: 3,
    question: "做 tonemap 了但画面发暗、发闷、对比度怪异，最可能哪错了？",
    answer:
      "tonemap 和 gamma 顺序反了（先 `pow(c,1/2.2)` 再 tonemap），或忘了 gamma 校正。修法：固定顺序 `pow(tonemap(hdr), 1.0/2.2)`——先色调映射、最后才 gamma，两步别换位、别漏。",
    tags: ["HDR", "排错"],
  },
  {
    id: "hdr-37",
    chapter: "hdr",
    level: 3,
    question: "走廊 demo 切到曝光模式拖滑块，调大、调小曝光各看到什么？",
    answer:
      "调大：墙角越来越亮、但窗户更接近全白。调小：窗户层次更足、但墙角转暗。这就是逆光取舍的此消彼长，全凭一只手调——对应 `1-exp(-c*exposure)` 里的 exposure。",
    tags: ["曝光", "Demo"],
  },
  {
    id: "hdr-38",
    chapter: "hdr",
    level: 3,
    question:
      "一个室内夜景，想让玩家手动「眯眼/睁眼」适应明暗，tonemap 选 Reinhard 还是曝光？",
    answer:
      "选**曝光**。曝光映射多一个曝光值，正好对应「眯眼/睁眼」——玩家拖大曝光提亮暗处、拖小压住亮处，交互感和相机一致；Reinhard 没有这个旋钮。",
    tags: ["曝光", "选型"],
  },
  {
    id: "hdr-39",
    chapter: "hdr",
    level: 3,
    question:
      "一个不需交互、只要把任意亮度稳妥压进 [0,1] 的离屏缩略图渲染，tonemap 选哪个？",
    answer:
      "选 **Reinhard**。它简单、无参、对任意大输入都平滑压进 `[0,1)`，不需要调，最省心；缩略图不需要曝光交互。",
    tags: ["色调映射", "选型"],
  },
  {
    id: "hdr-40",
    chapter: "hdr",
    level: 3,
    question:
      "一个逆光场景，美术想调到「既看清窗外、墙角也不全黑」的平衡点，tonemap 选哪个？",
    answer:
      "选**曝光**。要在「看清窗外」和「墙角不全黑」之间找那个点，正是曝光值在调的此消彼长，美术拖曝光滑块到满意为止。Reinhard 给的是固定曲线、没有调节余地。",
    tags: ["曝光", "选型"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 边界） ──
  {
    id: "hdr-41",
    chapter: "hdr",
    level: 4,
    question:
      "HDR 三个「还是死白」的坑：忘 tonemap、用 RGBA8、WebGL2 没启扩展，根因和修法各是什么？",
    answer:
      "①忘 tonemap：浮点存住了但没压回，上屏被截 → 第二遍加 tonemap。②用 RGBA8：第一遍写入就截了 → 改 `RGBA16F`。③WebGL2 没启扩展：浮点 FBO 不完整全黑 → 先 `EXT_color_buffer_float` 再建。三个坑在管线不同位置。",
    tags: ["陷阱", "综合"],
  },
  {
    id: "hdr-42",
    chapter: "hdr",
    level: 4,
    question: "为什么 HDR 必须「浮点存住」和「tonemap 压回」两步缺一不可？",
    answer:
      "只浮点存住、不 tonemap：上屏时 `>1` 仍被屏幕截成死白，存了白存。只 tonemap、不浮点存（用 RGBA8）：`>1` 在写入帧缓冲那刻就被截了，第二遍没东西可压。两步分别管「不丢」和「能显」，必须配合。",
    tags: ["HDR", "综合"],
  },
  {
    id: "hdr-43",
    chapter: "hdr",
    level: 4,
    question:
      "结合 gamma 校正章：HDR 出口的 tonemap 和 gamma 各在线性 / 非线性空间做哪步？",
    answer:
      "tonemap 在**线性空间**把 HDR 亮度平滑压回 `[0,1]`（仍是线性值）；gamma 校正是最后一步，把这个线性结果 `pow(.,1/2.2)` 编码回 sRGB 给屏幕。所以顺序必须先 tonemap（线性）后 gamma（编码出口）。",
    tags: ["综合", "gamma"],
  },
  {
    id: "hdr-44",
    chapter: "hdr",
    level: 4,
    question:
      "为什么说 Reinhard「无参省心」、曝光「可调」是它们各自的本质卖点？",
    answer:
      "Reinhard `c/(c+1)` 是一条固定曲线、对任意输入都稳妥压进 `[0,1)`、不用调——适合无交互、要稳的场合。曝光多一个旋钮，能像相机一样在亮 / 暗间权衡——适合要交互、要找平衡点的场合。一句话：要稳省心选 Reinhard、要可调模拟相机选曝光。",
    tags: ["色调映射", "综合"],
  },
  {
    id: "hdr-45",
    chapter: "hdr",
    level: 4,
    question:
      "三个场景：夜景手动适应、离屏缩略图、逆光找平衡，分别选 Reinhard 还是曝光？",
    answer:
      "夜景手动适应 → **曝光**（对应眯眼睁眼）；离屏缩略图 → **Reinhard**（无参稳妥、不需交互）；逆光找平衡 → **曝光**（此消彼长、拖滑块到满意）。原则：要可调 / 模拟相机选曝光，要无参省心选 Reinhard。",
    tags: ["选型", "综合"],
  },
  {
    id: "hdr-46",
    chapter: "hdr",
    level: 4,
    question: "HDR 和后面的泛光（Bloom）是什么关系？为什么泛光离不开 HDR？",
    answer:
      "泛光要按「亮度有没有超过阈值（如 1）」把强光源挑出来。只有 HDR 让颜色真能 `>1`，才分得清「该发光的强光」和「白墙」。若画面早被截在 `[0,1]`、满屏 1.0，亮度阈值提取就失效。所以泛光必须建在 HDR 之上。",
    tags: ["综合", "Bloom"],
  },
  {
    id: "hdr-47",
    chapter: "hdr",
    level: 4,
    question:
      "为什么 demo 里用单个片段着色器在 frag 内构造 HDR 场景，仍能真实演示 HDR？",
    answer:
      "因为片段着色器里的 `float` 计算本就是高精度的，frag 内算出的窗户 `6.0`、墙角零点几就是真实的高动态范围值。clamp 把 `>1` 截成死白、tonemap 保层次的对比，在单 frag 里就能如实呈现——只是省去了真浮点 FBO 多 pass。",
    tags: ["HDR", "综合"],
  },
  {
    id: "hdr-48",
    chapter: "hdr",
    level: 4,
    question:
      "把 RGBA16F、tonemap、gamma 三者哪个负责「不丢」、哪个「压回」、哪个「适配屏幕」？",
    answer:
      "`RGBA16F` 浮点帧缓冲负责「不丢」（存住 `>1`）；tonemap 负责「压回」（把大范围平滑塞进 `[0,1]`、保层次）；gamma 校正负责「适配屏幕」（编码回 sRGB 抵消显示器 `^2.2`）。三者按 存→压→编 顺序串成出口。",
    tags: ["综合", "分工"],
  },
  {
    id: "hdr-49",
    chapter: "hdr",
    level: 4,
    question:
      "为什么 Reinhard 把 c=6 压成 0.86、c=4.5 压成 0.82，这么接近也算「保住层次」？",
    answer:
      "因为它们是两个**不同**的值（0.86 ≠ 0.82），都在 `[0,1)` 内、能区分——而 clamp 会把两者都切成 1.0、完全无法区分。哪怕差距小，只要不同就保住了相对层次，窗户中心和窗框就分得开，不糊成死白。",
    tags: ["色调映射", "综合"],
  },
  {
    id: "hdr-50",
    chapter: "hdr",
    level: 4,
    question:
      "把整条 HDR 流程讲清：从一扇算出 6.0 的亮窗到屏幕上既看清窗又看清墙角。",
    answer:
      "①第一遍：绑 `RGBA16F` 浮点 FBO（WebGL2 先启 `EXT_color_buffer_float`），正常渲场景，窗户 `6.0`、墙角零点几原样存住、不 tonemap 不 gamma。②第二遍：绑回默认帧缓冲、画全屏四边形采样浮点纹理，做色调映射（Reinhard `c/(c+1)` 或曝光 `1-exp(-c*曝光)`）把大范围压回 `[0,1]` 保层次，③再 gamma 校正 `pow(.,1/2.2)` 上屏。于是窗框层次透出、墙角细节也回来。",
    tags: ["综合", "全流程"],
  },
];
