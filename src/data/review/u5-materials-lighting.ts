/** 复习题库 · 材质、光照与渲染基础（u5-materials-lighting）。《Unity 5 权威讲解》第11章改编。 */

import type { ReviewQuestion } from "./types";

export const u5MaterialsLightingQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "u5-ml-1",
    chapter: "u5-materials-lighting",
    level: 1,
    question:
      "屏幕上的「一帧画面」由哪三样输入决定？它们各管什么？谁把它们算成像素？",
    answer:
      "三样输入：**Mesh（网格）**——决定东西「长什么形状」（一团点连成的骨架轮廓）；**Material（材质）**——决定表面「什么质感、什么颜色」（刷的「漆」）；**Light（光照）**——决定「被什么灯照、明暗如何」。把这三者「形状 + 质感 + 灯光」合起来、算出屏幕上每个像素颜色的，是 **Renderer（渲染器）**。一句话：**画面 = 网格 × 材质 × 光照，由渲染器算成像素**，三者缺一画面就不对。",
    tags: ["渲染", "Mesh", "Material", "Light", "Renderer", "定义"],
  },
  {
    id: "u5-ml-2",
    chapter: "u5-materials-lighting",
    level: 1,
    question: "`Material`（材质）是什么？用片场的话怎么比喻？",
    answer:
      "`Material`（材质）是一份**描述「物体表面长什么样」的资产**——它内部用一个 **Shader**，再给这个 Shader 填好一组具体参数（贴图、颜色、金属度、光滑度……）。用片场的话：材质就是给道具刷的「**漆 / 质感**」——同一把椅子，刷木纹漆还是金属漆，看起来完全两样。它**只管外观**，不管形状（形状归 Mesh 管）。",
    tags: ["Material", "材质", "外观", "定义"],
  },
  {
    id: "u5-ml-3",
    chapter: "u5-materials-lighting",
    level: 1,
    question: "`Shader`（着色器）是什么？它和 Material 的关系是什么？",
    answer:
      "`Shader`（着色器）是一段**决定「一个表面怎么被画出来」的程序 / 模板**，它留着一组待填的参数槽（基础色、金属度、光滑度、贴图……）。`Material` 则是给这个 Shader 把参数槽**填上具体值**的一份实例。关系：**Material = Shader + 一组参数值**；而且**一个 Shader 可以被多个 Material 复用**（同一个 Shader 填不同参数，得到木纹、金属、塑料等不同材质）。",
    tags: ["Shader", "着色器", "模板", "定义"],
  },
  {
    id: "u5-ml-4",
    chapter: "u5-materials-lighting",
    level: 1,
    question:
      "Unity 5 的 `Standard Shader` 是什么？它最关键的几个输入通道分别控制表面的什么？",
    answer:
      "`Standard Shader` 是 Unity 5 引入的**基于物理（PBR）的标准着色器**，一个 Shader 就能调出绝大多数表面。几个关键输入：**Albedo**（基础色 / 反照率，可贴图）——控制**表面的基础颜色**；**Metallic**（金属度）——控制**像不像金属**（0 塑料/木头，1 金属）；**Smoothness**（光滑度）——控制**多光滑、反光多锐**（高=镜面，低=磨砂）；**Normal Map**（法线贴图）——给平面**伪造凹凸细节**（不改真实形状）。",
    tags: ["Standard Shader", "Albedo", "Metallic", "Smoothness", "定义"],
  },
  {
    id: "u5-ml-5",
    chapter: "u5-materials-lighting",
    level: 1,
    question: "`MeshRenderer` 是干什么的组件？没有它会怎样？",
    answer:
      "`MeshRenderer`（网格渲染器）是真正**把网格用材质「画出来」**的组件——它拿 MeshFilter 提供的网格 + 自己引用的材质，交给渲染管线绘制到屏幕。没有它（或它被禁用 / 没指定材质），物体**在画面里就看不见**（引擎没东西可画）。这正是「新建空对象看不到」的常见原因之一。",
    tags: ["MeshRenderer", "渲染器", "组件", "定义"],
  },
  {
    id: "u5-ml-6",
    chapter: "u5-materials-lighting",
    level: 1,
    question: "Unity 里常见的光源类型有哪几种？最常用的是哪个？",
    answer:
      "常见光源类型：**Directional Light（方向光）**——像太阳，只有方向、照亮整个场景、不衰减，**最常用**；**Point Light（点光源）**——像灯泡，从一个点向四周发光、有距离衰减；**Spot Light（聚光灯）**——像手电 / 舞台灯，从一点沿一个锥形方向打；**Area Light（面光源）**——从一块面发光（仅用于烘焙）。另外还有**环境光（ambient）**给场景一个整体底色亮度。光按是否预计算分**实时光（realtime）**和**烘焙光（baked）**。",
    tags: ["光源类型", "Directional", "Point", "Spot", "定义"],
  },
  {
    id: "u5-ml-7",
    chapter: "u5-materials-lighting",
    level: 1,
    question: "实时光（realtime）和烘焙光（baked）有什么区别？",
    answer:
      "**实时光（realtime）**：每帧实时计算光照，光、物体都能动、阴影会跟着变，但**运行时开销大**。**烘焙光（baked）**：在编辑器里**预先把光照 / 阴影算好「烤」进贴图（光照贴图）**，运行时直接采样、几乎不花计算——适合**不动的静态物体和静态光**，省性能但烤好后光和物体就不能动了。常见做法是动态对象用实时光、大量静态场景用烘焙光。",
    tags: ["realtime", "baked", "光照贴图", "定义"],
  },

  // ── L2 理解：辨析 / 关系 ──
  {
    id: "u5-ml-8",
    chapter: "u5-materials-lighting",
    level: 2,
    question:
      "Material 和 Shader 到底什么关系？为什么说「一个 Shader 能对应多个 Material，反过来不行」？",
    answer:
      "**Shader 是模板（怎么画），Material 是实例（填好参数的一份具体外观）**：`Material = Shader + 一组参数值`。一个 Shader 留着参数槽，能被无数 Material 复用——木纹、金属、红塑料可以都用同一个 Standard Shader，只是 Albedo / Metallic / Smoothness 等参数填得不同。反过来，一个 Material 只「基于」一个 Shader（它要先选定一个 Shader，才知道有哪些参数槽可填）。类比：Shader 是「填空题的卷子」，Material 是「填好答案的一份卷子」——一张卷子能印出无数份不同答案。",
    tags: ["Material", "Shader", "复用", "辨析"],
  },
  {
    id: "u5-ml-9",
    chapter: "u5-materials-lighting",
    level: 2,
    question:
      "Mesh、Material、Light 三者，谁管「形状」、谁管「外观」、谁管「明暗」？少了其中一个画面会怎样？",
    answer:
      "**Mesh 管形状**（长什么样的骨架）、**Material 管外观 / 质感**（刷什么漆、什么颜色）、**Light 管照明 / 明暗**（打什么灯）。少了任意一个画面都不对：**少 Mesh** → 没有形状，画不出东西；**少 Material**（或没指定）→ 不知道表面刷什么，通常显示成默认 / 洋红错误材质；**少 Light** → 场景没有照明，物体一片漆黑（受光的材质在无光时基本黑乎乎）。三者交给 Renderer 一起算，才合成一帧正确画面。",
    tags: ["Mesh", "Material", "Light", "分工", "辨析"],
  },
  {
    id: "u5-ml-10",
    chapter: "u5-materials-lighting",
    level: 2,
    question:
      "在代码里 `renderer.material` 和 `renderer.sharedMaterial` 有什么本质区别？各自影响谁？",
    answer:
      "**`renderer.material`**：第一次访问时会**克隆出一份独立的材质副本**只给当前这个对象用——改它**只影响这个对象**，不动别人，但会产生一份新材质实例（多了内存、可能打断批处理）。**`renderer.sharedMaterial`**：直接拿到**共享的那份原材质资产**——改它会**影响所有正在用这份材质的对象**（包括项目资产里的那份）。一句话：只想改「这一个」用 `material`（接受克隆代价）；想改「原始资产 / 所有共用者」用 `sharedMaterial`（但要清楚它会牵连一片）。",
    tags: ["material", "sharedMaterial", "克隆", "辨析"],
  },
  {
    id: "u5-ml-11",
    chapter: "u5-materials-lighting",
    level: 2,
    question:
      "Standard Shader 里 `Metallic`（金属度）调到 1 和 `Smoothness`（光滑度）调到 1，分别让表面看起来怎样？两者有什么不同？",
    answer:
      "**Metallic = 1**：表面表现得像**金属**——基础色更多体现为「反射环境 / 高光的颜色」而非漫反射，看起来有金属质感；Metallic = 0 则是塑料 / 木头等**非金属**。**Smoothness = 1**：表面非常**光滑**，反光锐利、像镜面 / 抛光；Smoothness 低则粗糙、反光发散、像磨砂。区别：**Metallic 管「是不是金属」，Smoothness 管「多光滑 / 反光多锐」**——两者独立，可组合出「光滑金属（镜面铬）」「磨砂金属（拉丝铝）」「光滑塑料」「磨砂塑料」等不同表面。",
    tags: ["Metallic", "Smoothness", "PBR", "辨析"],
  },
  {
    id: "u5-ml-12",
    chapter: "u5-materials-lighting",
    level: 2,
    question:
      "法线贴图（Normal Map）说能给平面「加凹凸」，它真的改变了物体的几何形状吗？",
    answer:
      "**没有**。Normal Map 并不增减一个顶点——它只是**逐像素「伪造」表面的法线方向**，骗光照计算以为表面有凹凸，从而在受光时产生明暗起伏、看起来有砖缝 / 颗粒 / 划痕等细节。代价极低（不增三角面）。但因为真实几何没变，从掠射角看、或看物体**轮廓边缘**时会「露馅」——边缘仍是平的。要真正改变形状得用更多几何或置换贴图（Displacement），不是 Normal Map。",
    tags: ["Normal Map", "法线贴图", "凹凸", "辨析"],
  },

  // ── L3 应用：用法 / 排错 ──
  {
    id: "u5-ml-13",
    chapter: "u5-materials-lighting",
    level: 3,
    question:
      "想在运行时**只把当前这一个对象**变红，又**不影响**场景里其它用同一材质的对象，该怎么写？",
    answer:
      "用 **`renderer.material`**（它会为当前对象克隆一份独立材质副本，改它只影响自己）：\n```csharp\nvar rend = GetComponent<Renderer>();\nrend.material.color = Color.red; // 克隆出独立副本，只改这一个\n```\n**别用 `sharedMaterial`**——那会改到共享的原材质，**所有用这份材质的对象都会跟着变红**（还包括项目里的资产）。代价：`material` 会产生一份新材质实例（多点内存、可能打断动态批处理），但这正是「只改一个」该付的代价。",
    tags: ["material", "改颜色", "克隆", "应用"],
  },
  {
    id: "u5-ml-14",
    chapter: "u5-materials-lighting",
    level: 3,
    question:
      "一个物体在场景里「全黑 / 几乎看不见」（不是完全消失），最可能的几个原因是什么？怎么排查？",
    answer:
      "「物体在、但黑乎乎」最常见的原因：\n1. **场景里没有光 / 光太弱**——受光材质在无光照时基本是黑的。检查有没有 Directional Light、环境光（Ambient）设置，或把光强调高。\n2. **法线朝反 / 面被剔除**——看到的是背面，光照不到。检查模型法线、材质是否双面。\n3. **材质 / 贴图本身就很暗**（Albedo 接近黑、或贴图没赋上）。\n排查口诀：**先看场景有没有光**（最常见），再看材质 Albedo / 是否指定了材质，再看法线朝向。\n（若是**整个物体彻底不见**而非变黑，则多半是没有 MeshRenderer / 没指定材质 / 被剔除——见下一题。）",
    tags: ["全黑", "光照", "排错", "应用"],
  },
  {
    id: "u5-ml-15",
    chapter: "u5-materials-lighting",
    level: 3,
    question:
      "一个 GameObject 在 Game 窗口里**完全看不见**（不是变黑，是压根没画出来），该从渲染三要素里查哪几样？",
    answer:
      "「完全没画出来」从「网格 + 材质 + 渲染器」三处查：\n1. **有没有 MeshRenderer（且启用、配了 MeshFilter 提供网格）**——它才是把网格画出来的组件；空 GameObject 默认只有 Transform、根本没有 Renderer，自然不可见。\n2. **有没有指定材质**——Renderer 的材质槽为空 / 材质用了不合适的 Shader，可能画不出或显示成洋红「错误材质」。\n3. **用了不受光 / 透明度为 0 的 Shader，或被剔除 / 被遮挡 / 在相机视锥外**。\n口诀：完全不见先查 **Renderer + 材质**；只是发黑则多半是**没光**（上一题）。",
    tags: ["看不见", "MeshRenderer", "材质", "排错"],
  },
  {
    id: "u5-ml-16",
    chapter: "u5-materials-lighting",
    level: 3,
    question:
      "在代码里怎么改一个对象的 Standard Shader 金属度、怎么换它的主贴图、怎么调一盏灯的强度和颜色？",
    answer:
      'Standard Shader 的参数用 `material.SetFloat / SetColor` 按**属性名**改（金属度的属性名是 `_Metallic`），主贴图用 `mainTexture`，灯用 `Light` 组件的字段：\n```csharp\nvar mat = GetComponent<Renderer>().material; // 克隆副本，只改这一个\nmat.SetFloat("_Metallic", 1f);      // 金属度调满\nmat.mainTexture = myTexture;          // 换主贴图（= _MainTex）\n\nvar light = GetComponent<Light>();\nlight.intensity = 2f;                 // 调亮\nlight.color = Color.red;              // 灯光变红\n```\n要点：Standard Shader 属性名带下划线（`_Metallic` / `_Glossiness` / `_Color`）；改 `material` 是改克隆副本（只影响自己）。',
    tags: ["SetFloat", "_Metallic", "mainTexture", "light.intensity", "应用"],
  },
  {
    id: "u5-ml-17",
    chapter: "u5-materials-lighting",
    level: 3,
    question:
      "有人写 `renderer.sharedMaterial.color = Color.red` 想让「这一个怪物受伤变红」，结果**场上所有同种怪物全变红了**。为什么？怎么改？",
    answer:
      "因为 `sharedMaterial` 是**所有用这份材质的对象共享的那份原材质资产**——改它的颜色，**每个引用这份材质的对象（甚至项目里的资产）都跟着变**，所以全场怪物一起变红。修法：改用 **`renderer.material`**——第一次访问它会**克隆出一份独立副本**只给当前对象，改它只影响这一个：\n```csharp\nrenderer.material.color = Color.red; // 只让这一个变红\n```\n口诀：**想改「单个对象」用 `material`（克隆）；`sharedMaterial` 是改「所有共用者 / 原始资产」**——别拿它做单体效果。",
    tags: ["sharedMaterial", "material", "材质泄漏", "排错"],
  },

  // ── L4 综合：贯通 / 迁移 ──
  {
    id: "u5-ml-18",
    chapter: "u5-materials-lighting",
    level: 4,
    question:
      "你拿到一个「黑乎乎、看不太清」的金属箱子场景，要把它做成「明亮、有金属反光、表面有划痕细节、且只改这个箱子不影响别处」。请按「渲染三要素 + Material/Shader + 代码」串一遍思路。",
    answer:
      '按「网格 × 材质 × 光照 → 渲染器」这条主线逐项落地：\n**① 光照（先解决「黑」）**：场景多半缺光或太暗。加 / 调亮一盏 **Directional Light**（当太阳，最常用、照整场），必要时调环境光（Ambient）。没光，再好的材质也黑——光决定明暗。\n**② 材质质感（金属反光 + 划痕）**：给箱子的材质用 **Standard Shader**，把 **Metallic 调高（接近 1）** 让它像金属、**Smoothness 调高** 让反光更锐（镜面感）；再挂一张 **Normal Map（法线贴图）** 伪造表面划痕 / 凹凸细节（不增几何）。**Albedo** 设成箱子的基础金属色 / 贴图。\n**③ 能被画出来**：确认箱子有 **MeshRenderer**（启用、配了网格、指定了上面这份材质），否则根本不可见。\n**④ 只改这一个（代码）**：运行时若要动态调，用 **`renderer.material`**（克隆副本，只影响这个箱子），而**不是 `sharedMaterial`**（那会牵连所有同材质对象）：\n```csharp\nvar mat = boxRenderer.material;       // 克隆副本\nmat.SetFloat("_Metallic", 1f);\nmat.SetFloat("_Glossiness", 0.85f);   // Smoothness\n```\n**贯穿原则**：画面 = 形状 × 材质 × 光照三者交给 Renderer 合成——「黑」先查光、「质感」调 Material 的 Standard Shader 参数、「只改一个」用 `material` 别用 `sharedMaterial`。',
    tags: [
      "综合",
      "Directional",
      "Standard Shader",
      "Metallic",
      "Normal Map",
      "material",
      "迁移",
    ],
  },
];
