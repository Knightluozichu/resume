/** 复习题库 · 延迟着色（deferred-shading）。HEL-90 高级光照篇。 */

import type { ReviewQuestion } from "./types";

export const deferredShadingQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / API / 数值约定） ──
  {
    id: "df-1",
    chapter: "deferred-shading",
    level: 1,
    question: "什么是「前向着色」？",
    answer:
      "Forward Shading，最常规的渲染方式：物体一个个画，每个物体的每个片元一生成就立刻在片段着色器里把所有光照（环境光 + 每盏灯的漫反射 + 镜面）算完写进帧缓冲。",
    tags: ["前向着色", "定义"],
  },
  {
    id: "df-2",
    chapter: "deferred-shading",
    level: 1,
    question: "什么是「延迟着色」？它把渲染拆成哪两遍？",
    answer:
      "Deferred Shading，把渲染拆两遍绕开前向的浪费：第一遍「几何 pass」只把每片元的几何属性用 MRT 存进 G-buffer、不算光照；第二遍「光照 pass」画全屏四边形，对每个可见像素采 G-buffer 只算一次光照。",
    tags: ["延迟着色", "定义"],
  },
  {
    id: "df-3",
    chapter: "deferred-shading",
    level: 1,
    question: "什么是「G-buffer」？典型存哪几样？",
    answer:
      "Geometry Buffer，延迟着色第一遍输出的一组纹理，专存每片元的几何属性不存光照：①位置（坐标 xyz）②法线（朝向）③反照率 albedo（漫反射底色）+ 镜面强度（常塞 alpha 通道）。",
    tags: ["G-buffer", "定义"],
  },
  {
    id: "df-4",
    chapter: "deferred-shading",
    level: 1,
    question: "什么是「几何 pass」？",
    answer:
      "Geometry Pass，延迟第一遍：把所有物体照常画一遍，但片段着色器不算任何光照，只用 MRT 把每片元的位置 / 法线 / 反照率 / 镜面写进 G-buffer。开着深度测试，每像素留最靠前的可见片元。",
    tags: ["几何 pass", "定义"],
  },
  {
    id: "df-5",
    chapter: "deferred-shading",
    level: 1,
    question: "什么是「光照 pass」？",
    answer:
      "Lighting Pass，延迟第二遍：绑回默认帧缓冲，画一个全屏四边形，对每个屏幕像素采 G-buffer 拿位置 / 法线 / 反照率，再 for 循环每盏灯累加光照算出最终色上屏。只对可见像素算一次。",
    tags: ["光照 pass", "定义"],
  },
  {
    id: "df-6",
    chapter: "deferred-shading",
    level: 1,
    question: "什么是「光体积」（Light Volume）？",
    answer:
      "一盏灯（尤其点光源）只照亮周围一小块。光体积的思路是光照 pass 里只在这盏灯影响得到的那块屏幕区域内的像素才算它的贡献——常为每盏灯画一个包住其影响范围的球 / 锥，只对体积内像素累加该灯。",
    tags: ["光体积", "定义"],
  },
  {
    id: "df-7",
    chapter: "deferred-shading",
    level: 1,
    question: "延迟着色的光照计算次数和什么成正比、和什么无关？",
    answer:
      "和「**屏幕像素数 × 光源数**」成正比，与场景里有多少物体、有没有 overdraw **无关**。光照成本和场景复杂度解耦了。",
    tags: ["延迟着色", "成本"],
  },
  {
    id: "df-8",
    chapter: "deferred-shading",
    level: 1,
    question: "前向着色的光照成本随什么涨？",
    answer:
      "随「**物体片元数 × 光源数**」涨。被遮挡的片元也白算光照（overdraw），光源越多每片元要乘的灯越多，多光源下极易卡顿。",
    tags: ["前向着色", "成本"],
  },
  {
    id: "df-9",
    chapter: "deferred-shading",
    level: 1,
    question: "G-buffer 靠什么能力一次把几张图都画出来？",
    answer:
      "靠 **MRT 多渲染目标**——一个片段着色器靠 `layout(location=N)` 同时往好几个颜色附件写。和泛光那章一次输出「场景色 + 亮区色」是同一个能力。",
    tags: ["G-buffer", "MRT"],
  },
  {
    id: "df-10",
    chapter: "deferred-shading",
    level: 1,
    question: "G-buffer 的位置、法线、反照率三张纹理格式分别该用什么？",
    answer:
      "位置、法线**必须用浮点 `RGBA16F`**（坐标、法线分量范围大、要精度）；反照率是 `[0,1]` 颜色，`RGBA8` 够用还省带宽。",
    tags: ["G-buffer", "格式"],
  },
  {
    id: "df-11",
    chapter: "deferred-shading",
    level: 1,
    question: "几何 pass 片段着色器声明三个输出怎么写？",
    answer:
      "`layout(location=0) out vec4 gPosition;`、`layout(location=1) out vec4 gNormal;`、`layout(location=2) out vec4 gAlbedoSpec;`——位置、法线、反照率(rgb)+镜面(a)，且完全不算光照。",
    tags: ["几何 pass", "代码"],
  },
  {
    id: "df-12",
    chapter: "deferred-shading",
    level: 1,
    question: "启用三个附件的 MRT，桌面和 WebGL2 各怎么写？",
    answer:
      "桌面 `glDrawBuffers(3, atts)`（`GL_COLOR_ATTACHMENT0/1/2` 数组）；WebGL2 `gl.drawBuffers([gl.COLOR_ATTACHMENT0, gl.COLOR_ATTACHMENT1, gl.COLOR_ATTACHMENT2])`（数组形式、核心自带不需扩展）。漏了它 `location 1/2` 写了也白写。",
    tags: ["MRT", "API差异"],
  },
  {
    id: "df-13",
    chapter: "deferred-shading",
    level: 1,
    question: "延迟着色的三个绕不开的局限是什么？",
    answer:
      "①**透明物体没法延迟**（G-buffer 每像素只存一个片元）；②**MSAA 难做**（光照在全屏 pass、边缘已摊平）；③**G-buffer 占带宽和显存**（好几张全屏浮点纹理）。",
    tags: ["延迟着色", "局限"],
  },
  {
    id: "df-14",
    chapter: "deferred-shading",
    level: 1,
    question: "法线图存进 G-buffer 为什么看起来偏蓝紫？",
    answer:
      "法线分量在 `[-1,1]`，存进 `[0,1]` 的纹理要做 `n*0.5+0.5`，大多朝外的法线 z 偏大，所以法线图整体偏蓝紫（和法线贴图章同理）。",
    tags: ["G-buffer", "法线"],
  },
  {
    id: "df-15",
    chapter: "deferred-shading",
    level: 1,
    question: "光照 pass 片段着色器对每个像素做哪两步？",
    answer:
      "①采 G-buffer 拿这个可见像素的位置 / 法线 / 反照率 / 镜面；②for 循环每盏灯累加 Blinn-Phong（漫反射 + 镜面），算出最终色。光照只算这一次。",
    tags: ["光照 pass", "代码"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "df-16",
    chapter: "deferred-shading",
    level: 2,
    question: "前向着色的「overdraw」浪费是怎么回事？",
    answer:
      "一个片元算完光照写进帧缓冲，后面又画了个更近的物体把它盖住——那次光照白算了。场景越复杂、物体叠得越多，「算了又被盖掉」的浪费越多。",
    tags: ["前向着色", "overdraw"],
  },
  {
    id: "df-17",
    chapter: "deferred-shading",
    level: 2,
    question: "延迟着色「延迟（defer）」的到底是什么？",
    answer:
      "把「立刻点灯」这件事推迟到最后。第一遍不点任何灯、只登记几何属性；第二遍才点灯，且只对屏幕上每个可见像素算一次。光照从「每生成一个片元就算」推迟到「全部几何登记完、只对可见像素算」。",
    tags: ["延迟着色", "机制"],
  },
  {
    id: "df-18",
    chapter: "deferred-shading",
    level: 2,
    question: "为什么延迟着色对大量光源更省？光照成本里少了什么？",
    answer:
      "因为光照 pass 只对屏幕每个可见像素算一次，成本 ≈ 屏幕像素数 × 光源数——里面**没有「物体片元数」**了。物体片元数往往远大于屏幕像素数（overdraw、遮挡），所以光源一多延迟优势压倒性。",
    tags: ["延迟着色", "为什么"],
  },
  {
    id: "df-19",
    chapter: "deferred-shading",
    level: 2,
    question: "为什么 G-buffer 里「一点光照都没有」、全是几何事实？",
    answer:
      "因为延迟把点灯推迟到第二遍。第一遍只登记「它在哪、法线朝哪、什么颜色」这些几何属性，光照留到光照 pass 统一算。这样才能只对可见像素点一次灯、避免前向的重复浪费。",
    tags: ["G-buffer", "机制"],
  },
  {
    id: "df-20",
    chapter: "deferred-shading",
    level: 2,
    question: "为什么 G-buffer 的位置、法线必须用浮点，反照率却可以 RGBA8？",
    answer:
      "位置坐标（可能几十上百）和法线分量精度需求远超 8 位整数能表示，`RGBA8` 会量化成台阶状错值。反照率是 `[0,1]` 颜色，`RGBA8` 够用且省带宽。所以位置 / 法线用浮点、反照率用 RGBA8。",
    tags: ["G-buffer", "格式"],
  },
  {
    id: "df-21",
    chapter: "deferred-shading",
    level: 2,
    question: "为什么透明物体没法走延迟？",
    answer:
      "G-buffer 每个像素只存**一个**片元的属性（最靠前那个）。透明物体要把它后面的东西也透出来、要多层混合——一个像素一份属性根本存不下。所以透明物体得单独用前向再画一遍。",
    tags: ["延迟着色", "透明"],
  },
  {
    id: "df-22",
    chapter: "deferred-shading",
    level: 2,
    question: "为什么传统 MSAA 在延迟里难做？",
    answer:
      "硬件 MSAA 在光栅化阶段对边缘多采样，可延迟的光照发生在之后的全屏 pass 里，边缘信息已摊平成 G-buffer 的像素了，传统 MSAA 用不上，得另想办法（如 FXAA 等后处理抗锯齿）。",
    tags: ["延迟着色", "MSAA"],
  },
  {
    id: "df-23",
    chapter: "deferred-shading",
    level: 2,
    question: "用工厂流水线比喻，前向和延迟各是怎么干活的？",
    answer:
      "前向：每来一个半成品零件就立刻全套加工一遍，哪怕它最后被压箱底没人看见（白做）。延迟：先给会露面的零件登记造册（形状 / 朝向 / 材质），最后只对露面的零件统一抛光上灯——箱底的没上登记表最上层、不白加工。",
    tags: ["延迟着色", "类比"],
  },
  {
    id: "df-24",
    chapter: "deferred-shading",
    level: 2,
    question: "为什么深度测试保证 G-buffer 每像素留的是「最靠前的可见片元」？",
    answer:
      "几何 pass 开着深度测试，多个片元落到同一像素时只保留最近（最靠前）那个的属性。所以 G-buffer 最上层记的是可见片元，被挡住的根本不会留下——这也是延迟「只对可见像素点灯」的基础。",
    tags: ["几何 pass", "深度测试"],
  },
  {
    id: "df-25",
    chapter: "deferred-shading",
    level: 2,
    question: "为什么换了延迟、复杂场景还是可能卡？延迟省的到底是什么？",
    answer:
      "延迟省的**只是光照计算**。几何 pass 该画的物体一个不少，它的 overdraw、顶点 / 光栅化、G-buffer 显存和带宽开销照旧。物体本身多、面数高，几何 pass 一样慢。延迟是「多光源」的解药，不是「复杂几何」的解药。",
    tags: ["延迟着色", "误区"],
  },
  {
    id: "df-26",
    chapter: "deferred-shading",
    level: 2,
    question: "光体积为什么能在灯极多时进一步省？",
    answer:
      "一盏灯（尤其点光）只照亮周围一小块，超出衰减半径基本照不到。光体积只对落在这盏灯影响范围内的像素累加它的贡献，远处的小灯不必全屏白算——这是延迟上更多光源时的标准优化。",
    tags: ["光体积", "机制"],
  },
  {
    id: "df-27",
    chapter: "deferred-shading",
    level: 2,
    question: "为什么延迟的光照 pass 里加灯几乎只是多跑一次循环？",
    answer:
      "因为光照只对每个可见像素算一次，加一盏灯就是片段着色器的 `for` 循环多跑一圈累加。每个可见像素的成本只随灯数线性涨、和场景物体多少无关——所以能轻松上几百盏灯。",
    tags: ["光照 pass", "机制"],
  },
  {
    id: "df-28",
    chapter: "deferred-shading",
    level: 2,
    question: "为什么延迟着色的光照结果常也渲进浮点帧缓冲？",
    answer:
      "因为光照 pass 多盏灯叠加算出的 `lighting` 可能 `>1`（HDR）。所以延迟通常也渲进浮点帧缓冲，后面接 tonemap、甚至 Bloom——和 HDR / 泛光那两章是连着的。",
    tags: ["光照 pass", "HDR"],
  },
  {
    id: "df-29",
    chapter: "deferred-shading",
    level: 2,
    question: "G-buffer 占带宽显存是延迟的什么开销？为什么算固定开销？",
    answer:
      "是延迟实打实的**固定开销**：好几张全屏浮点纹理（位置、法线、反照率…）既吃显存，每帧读写又吃带宽。不管场景多简单，这组全屏纹理的开销都得付——这是延迟换来「光照解耦」的代价。",
    tags: ["G-buffer", "开销"],
  },

  // ── L3 应用（给参数判结果 / 改法 / 读代码） ──
  {
    id: "df-30",
    chapter: "deferred-shading",
    level: 3,
    question:
      "延迟着色为什么对大量光源更省？光照次数正比 / 无关于什么？一句话自测。",
    answer:
      "因为光照只对每个可见像素算一次，次数 ≈ 屏幕像素数 × 光源数，**与场景里物体多少、overdraw 无关**。物体片元数远大于屏幕像素数，光源越多延迟越省。",
    tags: ["延迟着色", "应用"],
  },
  {
    id: "df-31",
    chapter: "deferred-shading",
    level: 3,
    question: "demo 切到「法线」通道，画面会是什么样？为什么不是乱成一团？",
    answer:
      "整体偏蓝紫、每个球面上颜色随朝向平滑过渡（朝左偏红、朝右偏绿、朝你偏蓝），地面一整片同色（法线全朝上）。因为法线被 `n*0.5+0.5` 编码成颜色，朝外的法线 z 偏大、整体偏蓝紫。",
    tags: ["G-buffer", "Demo"],
  },
  {
    id: "df-32",
    chapter: "deferred-shading",
    level: 3,
    question:
      "demo 的四个查看通道分别对应 G-buffer 的什么？最终光照通道做什么？",
    answer:
      "反照率 = `gAlbedoSpec` 的本色（零光照）；法线 = `gNormal`（`n*0.5+0.5` 编码、偏蓝紫）；位置 = `gPosition`（坐标当颜色）。最终光照 = 采上面三样、for 循环每盏灯累加 Blinn-Phong 合成出被点亮的成品。",
    tags: ["G-buffer", "Demo"],
  },
  {
    id: "df-33",
    chapter: "deferred-shading",
    level: 3,
    question:
      "延迟跑通了但光照发斑、边缘错位、离相机越远越糟，最可能哪错了？怎么修？",
    answer:
      "G-buffer 的 `gPosition` / `gNormal` 用了普通 `RGBA8`、精度不够，坐标 / 法线被量化成台阶状错值。修法：位置、法线两张必须用浮点 `RGBA16F`（WebGL2 还要 `EXT_color_buffer_float`）。反照率 `RGBA8` 够用、别一刀切全用浮点。",
    tags: ["G-buffer", "排错"],
  },
  {
    id: "df-34",
    chapter: "deferred-shading",
    level: 3,
    question: "玻璃 / 水 / 半透明物体一加进延迟管线就变不透明或穿帮，怎么修？",
    answer:
      "G-buffer 每像素只存一个片元、存不下透明的多层混合。修法：透明物体不能走延迟，要在延迟的光照 pass **之后单独用前向再画一遍**半透明物体（从远到近、开混合）。这是工业界标准混合管线。",
    tags: ["延迟着色", "排错"],
  },
  {
    id: "df-35",
    chapter: "deferred-shading",
    level: 3,
    question: "demo 里把光源数从 1 拖到 4，画面怎么变？对应代码哪一行？",
    answer:
      "画面被一盏盏点亮、不同颜色的光叠加。对应光照通道的循环上界：`int n = int(uLights+0.5); for(i=0;i<MAX_LIGHTS;i++){ if(i>=n) break; …累加这盏灯 }`——`uLights` 就是循环跑几盏灯，加灯只是多跑一次循环。",
    tags: ["光照 pass", "Demo"],
  },
  {
    id: "df-36",
    chapter: "deferred-shading",
    level: 3,
    question:
      "几何 pass 着色器声明了三个输出，但 location 1/2 写了没效果、亮区 / 法线全黑，漏了什么？",
    answer:
      "漏了用 `drawBuffers` 告诉这次渲染「确实要往三个附件写」。修法：桌面 `glDrawBuffers(3, atts)`、WebGL2 `gl.drawBuffers([COLOR_ATTACHMENT0, 1, 2])`。否则只有附件 0 生效。",
    tags: ["MRT", "排错"],
  },
  {
    id: "df-37",
    chapter: "deferred-shading",
    level: 3,
    question: "几百盏灯下延迟帧率还是往下掉、灯越多越慢，最可能没用什么优化？",
    answer:
      "光照 pass 里每盏灯都对全屏所有像素算了一遍——可一盏小灯只照亮周围一小块，远处算它纯属浪费。修法：用**光体积**裁剪，为每盏灯画包住其影响范围的球 / 锥，只对体积内像素累加该灯。",
    tags: ["光体积", "排错"],
  },
  {
    id: "df-38",
    chapter: "deferred-shading",
    level: 3,
    question:
      "一个夜晚赛博朋克街区、几百盏霓虹车灯、几何不复杂，选前向还是延迟？",
    answer:
      "选**延迟**。光源极多，前向的「物体片元数 × 几百盏灯」直接爆炸；延迟的「屏幕像素数 × 灯」把成本和场景解耦，几百盏霓虹也流畅；几何不复杂，G-buffer 带宽开销也不痛。",
    tags: ["延迟着色", "选型"],
  },
  {
    id: "df-39",
    chapter: "deferred-shading",
    level: 3,
    question:
      "手机休闲游戏只有一盏太阳光、要支持大量半透明水面玻璃、还要开 MSAA，选前向还是延迟？",
    answer:
      "选**前向**。延迟在这里全是短板：只有一盏灯、省光照的优势用不上；半透明没法延迟、MSAA 延迟也难做——而这些恰是前向的强项。单光源场景前向又简单又快。",
    tags: ["前向着色", "选型"],
  },
  {
    id: "df-40",
    chapter: "deferred-shading",
    level: 3,
    question: "光照 pass 片段着色器采 G-buffer + 循环 N 灯大致怎么写？",
    answer:
      "`vec3 FragPos = texture(gPosition, uv).rgb; vec3 N = texture(gNormal, uv).rgb; vec3 Albedo = texture(gAlbedoSpec, uv).rgb; vec3 lighting = Albedo*0.1; for(i<activeLights){ vec3 L=normalize(lightPos[i]-FragPos); ...累加漫反射+镜面 } FragColor = vec4(lighting,1);`",
    tags: ["光照 pass", "代码"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 选型） ──
  {
    id: "df-41",
    chapter: "deferred-shading",
    level: 4,
    question:
      "延迟四个常见坑：RGBA8 存位置 / 透明走延迟 / 以为省一切 / 没用光体积，根因和修法各是什么？",
    answer:
      "①位置法线用 RGBA8 精度不够发斑 → 改 `RGBA16F`。②透明走延迟穿帮 → 透明单独前向画。③以为换延迟降所有开销 → 延迟只省光照，几何重还得 LOD / 剔除。④灯多没用光体积、每盏全屏算 → 加光体积只对受影响像素算。",
    tags: ["陷阱", "综合"],
  },
  {
    id: "df-42",
    chapter: "deferred-shading",
    level: 4,
    question: "对比前向和延迟的光照次数：分别是什么 × 什么？为什么延迟更省？",
    answer:
      "前向：「物体片元数 × 灯」（含被遮挡片元的浪费）；延迟：「屏幕像素数 × 灯」（只对可见像素算一次）。物体片元数往往远大于屏幕像素数（overdraw、遮挡），所以光源一多延迟压倒性更省。",
    tags: ["综合", "对比"],
  },
  {
    id: "df-43",
    chapter: "deferred-shading",
    level: 4,
    question: "大量半透明粒子（烟、火、魔法）叠在不透明物体上，该用什么管线？",
    answer:
      "用**混合管线**：不透明物体若光源多可走延迟；半透明粒子**必须单独用前向**在延迟之后画（从远到近、开混合）。纯延迟会让粒子穿帮（透明没法延迟）。这正是工业界的延迟 + 前向混合做法。",
    tags: ["综合", "选型"],
  },
  {
    id: "df-44",
    chapter: "deferred-shading",
    level: 4,
    question:
      "三个场景选前向 / 延迟：①几百盏灯几何不复杂 ②单光源 + 大量半透明 + 要 MSAA ③半透明粒子叠不透明。",
    answer:
      "①几百盏灯 → **延迟**（光源多是主场）；②单光源 + 半透明 + MSAA → **前向**（延迟全是短板）；③半透明粒子叠不透明 → **混合管线**（不透明走延迟、半透明前向画）。原则：光多几何不爆不透明为主→延迟；光少 / 大量半透明 / 要 MSAA→前向。",
    tags: ["选型", "综合"],
  },
  {
    id: "df-45",
    chapter: "deferred-shading",
    level: 4,
    question: "为什么 G-buffer 用 MRT 是延迟的关键？它复用了前面哪章的能力？",
    answer:
      "G-buffer 要一次几何渲染同时输出位置 / 法线 / 反照率几张纹理，正是 MRT（多渲染目标）的本职。它复用了泛光那章「一次输出场景色 + 亮区色」的同一能力——`layout(location=N)` + `drawBuffers`，只是这里输出的是几何属性。",
    tags: ["G-buffer", "综合"],
  },
  {
    id: "df-46",
    chapter: "deferred-shading",
    level: 4,
    question:
      "为什么延迟「先存几何、再点灯」能同时绕开 overdraw 浪费和多光源爆炸？",
    answer:
      "绕开 overdraw：深度测试让 G-buffer 只留可见片元，被遮挡的根本没进最上层、不会白算光照。绕开多光源爆炸：光照只对可见像素算一次、成本 = 屏幕像素 × 灯、与片元数解耦。两个浪费都因「把点灯推迟到只对可见像素」而消除。",
    tags: ["延迟着色", "综合"],
  },
  {
    id: "df-47",
    chapter: "deferred-shading",
    level: 4,
    question:
      "有人 G-buffer 三张图省事全用 RGBA8，反照率没问题但光照发斑、远处边缘错位，为什么、怎么改？",
    answer:
      "位置坐标（几十上百）和法线分量（`[-1,1]`）精度需求远超 8 位、被量化成台阶错值，光照算 `N·L`/`N·H` 自然发斑、错位，远处坐标大量化误差更明显。改：位置、法线两张换浮点 `RGBA16F`（WebGL2 还要扩展），反照率保持 `RGBA8` 即可。",
    tags: ["G-buffer", "综合"],
  },
  {
    id: "df-48",
    chapter: "deferred-shading",
    level: 4,
    question: "延迟着色和 HDR、Bloom 是什么关系？为什么常一起用？",
    answer:
      "延迟光照 pass 多盏灯叠加结果常 `>1`（HDR），所以渲进浮点帧缓冲、接 tonemap；既有了浮点帧缓冲和 MRT，泛光（按亮度阈值提亮 + 模糊 + 合成）也顺势接上。三者都建立在浮点 FBO + 多遍渲染之上，是连贯的一套现代渲染管线。",
    tags: ["综合", "HDR"],
  },
  {
    id: "df-49",
    chapter: "deferred-shading",
    level: 4,
    question:
      "为什么 demo 用单个片段着色器「同时算 G-buffer 又合成光照」能可视化延迟，真延迟却必须多 pass？",
    answer:
      "demo 在同一个 frag 里对解析场景算出位置 / 法线 / 反照率三样、按通道切换显示或合成光照，便于可视化 G-buffer 每张图。但单 frag 做不了真 MRT 多 pass——真延迟是几何 pass 用 MRT 把三样存进纹理、再由独立的光照 pass 采样它们算一次光。内核一致、实现不同。",
    tags: ["延迟着色", "综合"],
  },
  {
    id: "df-50",
    chapter: "deferred-shading",
    level: 4,
    question:
      "把整条延迟着色流程讲清：从几何 pass 填 G-buffer 到光照 pass 上屏。",
    answer:
      "①几何 pass：绑 G-buffer FBO（位置 / 法线用 `RGBA16F`、反照率 `RGBA8`，`drawBuffers` 启 MRT），所有物体照常画，片段着色器只把位置 / 法线 / 反照率 / 镜面写进三张纹理、不点灯，深度测试留可见片元。②光照 pass：绑回默认帧缓冲，画全屏四边形，对每个可见像素采 G-buffer 三样、for 循环每盏灯累加 Blinn-Phong 算一次光照（结果可能 >1，常渲进浮点 FBO 接 tonemap）。整条：几何 pass 填 G-buffer → 光照 pass 采样循环 N 灯 → 上屏。",
    tags: ["综合", "全流程"],
  },
];
