/** 复习题库 · 视差贴图（parallax-mapping）。HEL-90 高级光照篇。 */

import type { ReviewQuestion } from "./types";

export const parallaxMappingQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / 公式 / 数值约定） ──
  {
    id: "px-1",
    chapter: "parallax-mapping",
    level: 1,
    question: "什么是「高度贴图」？本章把它当什么用、白黑各代表什么？",
    answer:
      "一张灰度图，每个像素的明暗编码「表面的高低 / 深浅」。本章按原书约定当**深度图**用：**白 = 深**（凹下去多）、**黑 = 浅**（接近顶面），所以砖缝偏白、砖面偏黑。",
    tags: ["高度贴图", "定义"],
  },
  {
    id: "px-2",
    chapter: "parallax-mapping",
    level: 1,
    question: "什么是「视差贴图」？核心思想一句话。",
    answer:
      "渲染每个片元时，先**按观察方向把要采样的纹理坐标偏移一点**，再用偏移后的坐标去采样。效果是平面斜看时显出真实凹凸深度和遮挡，比只改光照的法线贴图更立体。",
    tags: ["视差贴图", "定义"],
  },
  {
    id: "px-3",
    chapter: "parallax-mapping",
    level: 1,
    question: "视差贴图和法线贴图一样工作在哪个空间、用哪个方向？",
    answer:
      "一样工作在**切线空间**、一样用**视方向**（这两个概念上一章已讲透，本章直接接用）。视差偏移就是把切线空间的视方向投影到表面、按高度缩放得到 UV 偏移量。",
    tags: ["视差贴图", "切线空间"],
  },
  {
    id: "px-4",
    chapter: "parallax-mapping",
    level: 1,
    question: "什么是「陡峭视差」（Steep Parallax）？",
    answer:
      "基础视差的改进：把表面深度切成若干等距的层，让视线从顶面沿观察方向一层层往深处步进，每层采样高度图比较「当前层深度 vs 该处表面深度」，直到层深度首次超过表面深度＝命中。逐层逼近比一步到位准得多。",
    tags: ["陡峭视差", "定义"],
  },
  {
    id: "px-5",
    chapter: "parallax-mapping",
    level: 1,
    question: "什么是「视差遮蔽映射 POM」？",
    answer:
      "Parallax Occlusion Mapping，陡峭视差的**精修版**：陡峭视差找到命中层后，真实交点落在命中层与上一层之间，POM 取这两层各自「层深度 − 表面深度」之差做**线性插值**，算出更接近真实交点的坐标，把台阶感磨平滑。是视差三档里效果最好的。",
    tags: ["视差遮蔽映射POM", "定义"],
  },
  {
    id: "px-6",
    chapter: "parallax-mapping",
    level: 1,
    question: "什么是「自遮挡」瑕疵？常见修法？",
    answer:
      "视差偏移把采样坐标推出表面边界、或推到本该被遮住的区域时，若不丢弃就露出错误拉伸 / 重复的纹理。常见修法是偏移后 UV 越界就 `discard` 丢弃片元，让边缘缺一块也比拉花强。",
    tags: ["自遮挡", "定义"],
  },
  {
    id: "px-7",
    chapter: "parallax-mapping",
    level: 1,
    question: "基础视差的偏移公式怎么写？",
    answer:
      "`vec2 p = viewDir.xy / viewDir.z * (height * depthScale);` 然后 `return texCoords - p;`——把视方向投影到表面（`xy/z`）、按高度和缩放定偏移量，沿视方向把 UV 挪一步。",
    tags: ["基础视差", "公式"],
  },
  {
    id: "px-8",
    chapter: "parallax-mapping",
    level: 1,
    question: "陡峭视差里「命中」的判定条件是什么？",
    answer:
      "沿视方向逐层下探，当**层深度首次大于等于该处表面深度**（视线钻到真实表面以下）就命中、停下。命中层对应的偏移坐标就是采样点。",
    tags: ["陡峭视差", "命中"],
  },
  {
    id: "px-9",
    chapter: "parallax-mapping",
    level: 1,
    question: "POM 的插值权重大致怎么算？",
    answer:
      "`afterDepth = curDepth - curLayerDepth;`（命中后为正）、`beforeDepth = 上一层表面深度 - (curLayerDepth - layerDepth);`（命中前为负），`weight = afterDepth / (afterDepth - beforeDepth);`，再 `mix(curUv, prevUv, weight)`。",
    tags: ["视差遮蔽映射POM", "公式"],
  },
  {
    id: "px-10",
    chapter: "parallax-mapping",
    level: 1,
    question: "陡峭视差的 for 循环在 WebGL2 里上界有什么硬约束？",
    answer:
      "**WebGL2（GLSL 300 es）的 for 循环上界必须是编译期常量**，不能用变量当上界。所以要写 `for (int i = 0; i < 32; i++) { if (命中) break; … }`——用够大的固定上界 + 提前 `break`。",
    tags: ["陡峭视差", "WebGL2"],
  },
  {
    id: "px-11",
    chapter: "parallax-mapping",
    level: 1,
    question: "桌面 GLSL 写陡峭视差循环能用什么写法、WebGL2 不能？",
    answer:
      "桌面可用 `while (条件) { … }`（边界不定的循环）；WebGL2 不行，for 上界必须常量，只能用固定上界 + `if (命中) break`。其余计算逻辑两端一致。",
    tags: ["陡峭视差", "API差异"],
  },
  {
    id: "px-12",
    chapter: "parallax-mapping",
    level: 1,
    question: "视差三档分别是哪三个、由浅到深排序？",
    answer:
      "**基础视差**（一步偏移）→ **陡峭视差**（分层步进到命中层）→ **视差遮蔽映射 POM**（命中层与上一层间线性插值精修）。效果由弱到强、开销由小到大。",
    tags: ["视差三档", "排序"],
  },
  {
    id: "px-13",
    chapter: "parallax-mapping",
    level: 1,
    question: "拿到偏移后的最终 UV 之后，接下来做什么？",
    answer:
      "用这个偏移后的 UV 去采样颜色图、采样法线图解码、算 Blinn-Phong——和上一章一模一样。视差只是在所有采样**之前**先把 UV 挪到了「你斜看真正该看到的那一点」。",
    tags: ["视差贴图", "流程"],
  },
  {
    id: "px-14",
    chapter: "parallax-mapping",
    level: 1,
    question: "深度图（白=深）沿视方向偏移用加还是减？",
    answer:
      "用**减**：`texCoords - p`（深度图约定白=深时）。若图是高度图（白=高），要把含义反过来（`height = 1.0 - sample`）再用。",
    tags: ["视差贴图", "方向"],
  },
  {
    id: "px-15",
    chapter: "parallax-mapping",
    level: 1,
    question: "陡峭视差每层 UV 偏移步长 deltaUv 怎么算？",
    answer:
      "总偏移 `P = viewDir.xy / viewDir.z * depthScale`，每层 `deltaUv = P / numLayers`——把总偏移均分到每一层，逐层 `curUv -= deltaUv`。",
    tags: ["陡峭视差", "公式"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "px-16",
    chapter: "parallax-mapping",
    level: 2,
    question: "法线贴图只骗了什么、视差贴图还多骗了什么？",
    answer:
      "法线贴图只改「这一点该有多亮」（骗了光），轮廓还是平的、没遮挡。视差贴图连「你斜看该看到表面的哪一点」都改（骗了可见位置），所以能造出近处凸起挡住后面的真遮挡。",
    tags: ["视差贴图", "对比"],
  },
  {
    id: "px-17",
    chapter: "parallax-mapping",
    level: 2,
    question: "为什么按观察方向偏移采样坐标就能造出深度？",
    answer:
      "斜看真实凹凸墙时，视线本该打在 A 点，但表面在更靠近你处先凸起把视线挡住，你实际看到的是 B 点的纹理。视差就照这个几何关系把采样坐标从 A 沿视方向挪到 B，平面于是「假装」在 B 处有凸起。",
    tags: ["视差贴图", "机制"],
  },
  {
    id: "px-18",
    chapter: "parallax-mapping",
    level: 2,
    question: "视差为什么「正看几乎无效、斜看才明显」？",
    answer:
      "偏移量正比于切线空间视方向的 `xy/z`。正看时 `viewDir.z≈1`、`xy≈0`，偏移几乎为零；视线越斜 `viewDir.z` 越小、偏移量越大，所以斜看视差才显著。",
    tags: ["视差贴图", "斜看"],
  },
  {
    id: "px-19",
    chapter: "parallax-mapping",
    level: 2,
    question: "基础视差在陡 / 深的高度图上为什么会断裂失真？",
    answer:
      "基础视差只采一次、一步偏移，默认从当前点到目标点之间表面是平的。陡坡上这个假设大错，偏移量算多算少都会让纹理断裂、游泳，凸起和凹陷接不上。",
    tags: ["基础视差", "失真"],
  },
  {
    id: "px-20",
    chapter: "parallax-mapping",
    level: 2,
    question: "陡峭视差怎么修掉基础视差的陡处失真？",
    answer:
      "把「一步到位」换成「一步步逼近」：深度分层，视线沿视方向逐层下探、每层采样高度图比较，直到层深度首次超过表面深度才停（命中）。逐层逼近真实交点，陡坡上也不失真。",
    tags: ["陡峭视差", "机制"],
  },
  {
    id: "px-21",
    chapter: "parallax-mapping",
    level: 2,
    question: "陡峭视差为什么会有「台阶感」？POM 怎么消除它？",
    answer:
      "陡峭视差只能停在某一层、取整层坐标，层数少时相邻层之间有跳变、显台阶感。POM 在命中层和上一层之间按两层「层深度−表面深度」之差线性插值，算出中间的真实交点，把台阶磨平滑。",
    tags: ["视差遮蔽映射POM", "机制"],
  },
  {
    id: "px-22",
    chapter: "parallax-mapping",
    level: 2,
    question: "公式里 `/ viewDir.z` 起什么作用？",
    answer:
      "视线越斜，`viewDir.z`（朝表面外的分量）越小、`xy/z` 越大、偏移量越大——所以斜看视差明显。正看时 `viewDir.z≈1`、`xy≈0`、偏移几乎为零。它把「视线有多斜」转成「偏移有多大」。",
    tags: ["基础视差", "viewDir.z"],
  },
  {
    id: "px-23",
    chapter: "parallax-mapping",
    level: 2,
    question: "为什么偏移后 UV 越界要 discard，而不是让采样器环绕 / 钳制？",
    answer:
      "越界后采样器按 REPEAT / CLAMP 取边界外的值，会造成边缘拉伸 / 重复的自遮挡瑕疵（像贴图溢出）。`discard` 丢弃这片元、让边缘干脆缺一小块，远比拉花重复好看。",
    tags: ["自遮挡", "discard"],
  },
  {
    id: "px-24",
    chapter: "parallax-mapping",
    level: 2,
    question:
      "POM 相比陡峭视差只多了一步插值，为什么开销增加很小却效果明显更好？",
    answer:
      "陡峭视差的分层步进（多次采样）才是大头；POM 只在命中后多一次插值（两层间一次 mix），开销几乎可忽略，却把台阶感磨平、边缘更平滑——所以性价比很高。",
    tags: ["视差遮蔽映射POM", "开销"],
  },
  {
    id: "px-25",
    chapter: "parallax-mapping",
    level: 2,
    question: "深度缩放 depthScale 太大为什么会剧烈失真、来回游泳？",
    answer:
      "`depthScale` 太大 → 一步（或每层）偏移量过大，基础视差「表面是平的」假设彻底失效，连陡峭视差的分层都跨过了真实交点，纹理就剧烈失真、游泳。",
    tags: ["基础视差", "缩放"],
  },
  {
    id: "px-26",
    chapter: "parallax-mapping",
    level: 2,
    question: "深度大时，光调大 depthScale 够吗？还要配合什么？",
    answer:
      "不够。深度大时还要提高陡峭视差的**层数 `numLayers`** 让步进更细，否则层太疏会跨过真实交点。深度和层数要匹配，不能只猛拉深度。",
    tags: ["陡峭视差", "层数"],
  },
  {
    id: "px-27",
    chapter: "parallax-mapping",
    level: 2,
    question: "为什么本章 demo 的高度图在片段着色器里解析算、而不用外部贴图？",
    answer:
      "为了演示方便：给定一个 UV 直接算出该处砖块该有的深度，效果等同于采样一张真实高度图，但无需外部资源、便于在单个着色器里玩各档视差。真实场景就 `texture(depthMap, uv).r` 采样真图。",
    tags: ["高度贴图", "demo"],
  },
  {
    id: "px-28",
    chapter: "parallax-mapping",
    level: 2,
    question: "视差贴图能否完全替代法线贴图？两者关系是？",
    answer:
      "不替代，是互补 / 叠加。视差负责「斜看该看到哪一点」（深度、遮挡），偏移出 UV 后仍要用这个 UV 去采样法线图、算光照（明暗）。实际中常一起用：视差给位移、法线给明暗。",
    tags: ["视差贴图", "对比"],
  },
  {
    id: "px-29",
    chapter: "parallax-mapping",
    level: 2,
    question: "demo 里把倾斜角拖回 0（正对看），三档为什么几乎看不出差别？",
    answer:
      "因为偏移量正比于视方向的 xy 分量，正看时 xy≈0、偏移几乎为零，三档都几乎不偏移、和纯贴图无异。这正印证「视差正看几乎无效、斜看才明显」。",
    tags: ["视差贴图", "demo"],
  },

  // ── L3 应用（给参数判结果 / 改法 / 读代码） ──
  {
    id: "px-30",
    chapter: "parallax-mapping",
    level: 3,
    question: "视差效果为什么斜看明显、正看无效？用一句话回答自测。",
    answer:
      "因为偏移量正比于切线空间视方向的 xy 分量（`xy/z`）：正看 xy≈0 偏移近乎零、看不出；斜看 xy 大、偏移大、深度遮挡才显出来。",
    tags: ["视差贴图", "应用"],
  },
  {
    id: "px-31",
    chapter: "parallax-mapping",
    level: 3,
    question:
      "在 Demo 里想让砖块凸起最立体、近处明显挡住后面砖缝、且不失真，三个控件怎么调？",
    answer:
      "①模式切到**陡峭+POM**（基础视差深 + 斜看会断裂）；②倾斜角拖**大**（偏移正比视方向 xy，越斜遮挡越能盖住后面）；③深度拖**深但别拉满**（深则凸起厚、遮挡明显，太满会超出层数能力反而失真），取「深而不崩」的值。",
    tags: ["Demo", "应用"],
  },
  {
    id: "px-32",
    chapter: "parallax-mapping",
    level: 3,
    question: "开了视差后砖块凹进去（本该凸的反凹），偏移可能哪错了？",
    answer:
      "偏移方向反了——要么用了 `texCoords + p`（该减成了加），要么把高度图 / 深度图的明暗约定搞反（白到底是高还是深）。修法：深度图（白=深）用 `texCoords - p`；高度图（白=高）需 `height = 1.0 - sample` 再用。",
    tags: ["视差贴图", "排错"],
  },
  {
    id: "px-33",
    chapter: "parallax-mapping",
    level: 3,
    question: "把深度往大里拖，纹理在陡角处剧烈失真、来回游泳，怎么修？",
    answer:
      "`depthScale` 太大致每步偏移过大、跨过真实交点。修法：把 `depthScale` 收到温和值；深度确实要大就提高陡峭视差的 `numLayers` 让步进更细。深度和层数要匹配，别只猛拉深度。",
    tags: ["陡峭视差", "排错"],
  },
  {
    id: "px-34",
    chapter: "parallax-mapping",
    level: 3,
    question: "表面边缘出现被拉长 / 纹理重复的假象，根因和修法？",
    answer:
      "视差偏移把采样 UV 推出 `[0,1]`，采样器取了边界外的值，造成自遮挡瑕疵。修法：偏移后判断 `texCoords` 是否越界，越界就 `discard` 丢弃这个片元——边缘缺一小块远比拉花好看。",
    tags: ["自遮挡", "排错"],
  },
  {
    id: "px-35",
    chapter: "parallax-mapping",
    level: 3,
    question: "换了张深度大、坡很急的高度图，基础视差立刻断裂错位，怎么办？",
    answer:
      "陡高度图改用**陡峭视差 / POM**——分层步进逐层逼近真实命中点。基础视差只留给起伏平缓的表面（平缓时它又快又够用）。",
    tags: ["基础视差", "应用"],
  },
  {
    id: "px-36",
    chapter: "parallax-mapping",
    level: 3,
    question: "陡峭视差的分层步进循环大致怎么写（WebGL2）？",
    answer:
      "`vec2 P = viewDir.xy/viewDir.z*depthScale; vec2 deltaUv = P/numLayers; ... for (int i=0;i<32;i++){ if (curLayerDepth >= curDepth) break; curUv -= deltaUv; curDepth = texture(depthMap, curUv).r; curLayerDepth += layerDepth; }`——固定上界 + break。",
    tags: ["陡峭视差", "代码"],
  },
  {
    id: "px-37",
    chapter: "parallax-mapping",
    level: 3,
    question: "Demo 里切到基础视差、深度 + 斜看拉大，盯砖缝会看到什么？",
    answer:
      "纹理在陡处**断裂、游来游去**，凸起和凹陷接不上——这是一步偏移在陡坡上估歪的后果。切到陡峭+POM 同样参数下凸起干净、近处砖块正确挡住后面砖缝。",
    tags: ["基础视差", "Demo"],
  },
  {
    id: "px-38",
    chapter: "parallax-mapping",
    level: 3,
    question: "一面起伏平缓的磨砂石膏墙，视差该选哪档？为什么？",
    answer:
      "选**基础视差**。起伏小、坡平缓，「一步偏移、表面近似平」的假设基本成立，基础视差又快又够用，没必要上分层步进的开销。",
    tags: ["视差三档", "选型"],
  },
  {
    id: "px-39",
    chapter: "parallax-mapping",
    level: 3,
    question:
      "一块深沟壑的鹅卵石路面，要斜看时石头间清晰遮挡、不失真，选哪档？",
    answer:
      "至少选**陡峭视差**。深度大、坡陡，基础视差必断裂；陡峭视差分层逐层逼近命中点，才能正确算出「近石头挡住后石头」的遮挡。要更平滑可再上 POM。",
    tags: ["视差三档", "选型"],
  },
  {
    id: "px-40",
    chapter: "parallax-mapping",
    level: 3,
    question: "性能吃紧但想要鹅卵石那种最平滑遮挡的手游场景，选哪档？怎么省？",
    answer:
      "选 **POM**，但把层数 `numLayers` 压到够用。POM 是三档最平滑的（命中层插值磨台阶），相比陡峭视差只多一次插值、开销增加很小；性能吃紧主要靠**减少层数**省，而不是退回陡峭视差。",
    tags: ["视差三档", "选型"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 边界） ──
  {
    id: "px-41",
    chapter: "parallax-mapping",
    level: 4,
    question:
      "视差四个常见坑：内陷反向、深度过大游泳、边缘拉伸、基础用在陡图，分别根因和修法？",
    answer:
      "①内陷反向：偏移方向 / 明暗约定反，深度图用 `texCoords - p`、约定清白=深。②游泳：`depthScale` 太大，收小 + 加层数。③边缘拉伸：越界没 discard，越界 `discard`。④基础用在陡图：换陡峭 / POM 分层步进。",
    tags: ["陷阱", "综合"],
  },
  {
    id: "px-42",
    chapter: "parallax-mapping",
    level: 4,
    question: "视差选型本质是哪两个因素的权衡？深度越大对层数有什么要求？",
    answer:
      "本质是「表面有多陡」和「能花多少步进」的权衡：平缓用基础（省）、陡用陡峭（准）、要平滑加 POM（插值便宜）。**深度越大越需要更多层数**撑住，否则层太疏会跨过真实交点。",
    tags: ["视差三档", "综合"],
  },
  {
    id: "px-43",
    chapter: "parallax-mapping",
    level: 4,
    question:
      "为什么深度大 + 斜看是基础视差的「死穴」，却恰是视差立体感最强的工况？",
    answer:
      "深度大 + 斜看时偏移量最大、遮挡最明显（立体感强）；但基础视差「一步偏移、表面近似平」的假设在大偏移下彻底失效、必断裂。所以这种最出效果的工况恰恰必须上陡峭 / POM，基础视差扛不住。",
    tags: ["综合", "基础视差"],
  },
  {
    id: "px-44",
    chapter: "parallax-mapping",
    level: 4,
    question: "结合上一章：视差偏移出 UV 后，为什么还要再走法线贴图那套？",
    answer:
      "视差只解决「斜看该看到哪一点」（位移 / 遮挡），偏移出的 UV 还要拿去采样颜色图给底色、采样法线图解码算 Blinn-Phong 给明暗。视差给「位置」、法线给「明暗」，两者叠加才既有深度又有凹凸光影。",
    tags: ["综合", "法线贴图"],
  },
  {
    id: "px-45",
    chapter: "parallax-mapping",
    level: 4,
    question:
      "为什么 WebGL2 的 for 循环上界必须常量，对陡峭视差实现有什么实际影响？",
    answer:
      "WebGL2（GLSL 300 es）规范要求循环上界编译期可知，不能用 `numLayers` 这种变量当上界。所以实现上要用一个**够大的固定上界**（如 32）跑循环、靠 `if (命中) break` 提前退出，而不能写 `while` 或变量上界。",
    tags: ["陡峭视差", "综合"],
  },
  {
    id: "px-46",
    chapter: "parallax-mapping",
    level: 4,
    question:
      "要做一个「锐利且不失真」的深沟壑视差，深度、层数、模式、边缘处理怎么搭？",
    answer:
      "用陡峭视差 / POM（分层步进不失真）+ 适中偏大的 `depthScale`（深则凸起厚）+ 与深度匹配的较大 `numLayers`（步进够细、不跨过交点）+ 偏移后 `discard` 处理越界边缘。光拉深度不加层数会断裂。",
    tags: ["综合", "参数"],
  },
  {
    id: "px-47",
    chapter: "parallax-mapping",
    level: 4,
    question: "为什么「内陷反向」可能来自两个完全不同的原因？怎么分别确认？",
    answer:
      "一是偏移符号反（`+p` 该是 `-p`），二是高度 / 深度明暗约定反（白=高还是白=深）。确认：先在 demo 里把深度调小看方向对不对——若整体内外翻，检查 `texCoords ± p` 的符号和 `height` 是否 `1.0 - sample`，两处任一错都会内陷反向。",
    tags: ["视差贴图", "综合"],
  },
  {
    id: "px-48",
    chapter: "parallax-mapping",
    level: 4,
    question:
      "把基础视差、陡峭视差、POM 三档逐项对比：采样次数、准度、平滑度、适用表面。",
    answer:
      "基础：采 1 次、陡处不准、有断裂、适合平缓；陡峭：采 N 层、陡处准、有台阶感、适合陡 / 深；POM：陡峭 + 1 次插值、最准、最平滑、适合要高质量的陡面。开销和效果都递增，按表面陡度和性能预算选。",
    tags: ["视差三档", "综合"],
  },
  {
    id: "px-49",
    chapter: "parallax-mapping",
    level: 4,
    question: "为什么 POM 只在「命中层与上一层之间」插值，而不是全程插值？",
    answer:
      "因为真实交点必落在「层深度刚超过表面深度的那一层（命中层）」和「它上一层」之间——上一层还在表面上方、命中层已钻到表面下，交点夹在两者中间。只需对这两层插值就能逼近交点，全程插值既无必要又浪费。",
    tags: ["视差遮蔽映射POM", "综合"],
  },
  {
    id: "px-50",
    chapter: "parallax-mapping",
    level: 4,
    question: "把整条视差贴图思路讲清：从一张高度图到平墙斜看见砖块的厚度。",
    answer:
      "①准备高度（深度）图存每点深浅。②渲每个片元时按切线空间视方向偏移 UV：基础视差一步 `texCoords - viewDir.xy/z*height*scale`；陡峭视差分层逐层下探到命中层；POM 再在命中层与上一层间插值精修。③偏移后 UV 越界 `discard`。④用偏移后的 UV 采颜色 / 法线算光照。于是平墙斜看时近处凸起真的挡住后面、显出深度，比法线贴图更立体。",
    tags: ["综合", "全流程"],
  },
];
