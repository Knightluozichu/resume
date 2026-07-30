#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = process.cwd();
const BOOK = "unity-vfx";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx", BOOK, "v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(ROOT, "quality/unity-vfx-v2-profiles.json");
const OUTLINE = "https://www.tenlong.com.tw/products/9787115455222";

const SOURCES = {
  outline: OUTLINE,
  unityRelease: "https://unity.com/releases/unity-6",
  hubInstall: "https://docs.unity3d.com/hub/manual/InstallEditors.html",
  particles:
    "https://docs.unity3d.com/6000.0/Documentation/Manual/ParticleSystems.html",
  particleModules:
    "https://docs.unity3d.com/6000.0/Documentation/Manual/ParticleSystemModules.html",
  vfxGraph:
    "https://docs.unity3d.com/6000.0/Documentation/Manual/VFXGraph.html",
  modelImport:
    "https://docs.unity3d.com/6000.0/Documentation/Manual/ImportingModelFiles.html",
  prefabs: "https://docs.unity3d.com/6000.0/Documentation/Manual/Prefabs.html",
  materials:
    "https://docs.unity3d.com/6000.0/Documentation/Manual/materials-introduction.html",
  textures:
    "https://docs.unity3d.com/6000.0/Documentation/Manual/ImportingTextures.html",
  colorSpace:
    "https://docs.unity3d.com/6000.0/Documentation/Manual/linear-gamma-workflow.html",
  cameras:
    "https://docs.unity3d.com/6000.0/Documentation/Manual/CamerasOverview.html",
  lighting:
    "https://docs.unity3d.com/6000.0/Documentation/Manual/Lighting.html",
  profiler:
    "https://docs.unity3d.com/6000.0/Documentation/Manual/Profiler.html",
  frameDebugger:
    "https://docs.unity3d.com/6000.0/Documentation/Manual/FrameDebugger.html",
  urpPerformance:
    "https://docs.unity3d.com/6000.0/Documentation/Manual/urp/configure-for-better-performance.html",
};

const SOURCE_META = {
  outline: [
    "天瓏《Unity 3D游戏特效制作典型实例》版本与公开目录页",
    "public-bookseller-edition-and-outline",
    "核对张天骥、人民邮电出版社、2017年7月1日、232页、ISBN 9787115455222及9章66个编号主题",
  ],
  unityRelease: [
    "Unity 6正式发布轨道",
    "engine-vendor-release-primary",
    "核对当前Unity 6·3 LTS及支持周期；不承担Unity 6·0手册之外的具体组件行为",
  ],
  hubInstall: [
    "Unity Hub安装编辑器手册",
    "engine-vendor-tooling-primary",
    "核对当前编辑器版本、目标平台模块与安装身份",
  ],
  particles: [
    "Unity 6·0粒子系统手册",
    "engine-vendor-versioned-manual",
    "核对Built-in Particle System与Visual Effect Graph的选择边界",
  ],
  particleModules: [
    "Unity 6·0粒子系统模块参考",
    "engine-vendor-versioned-manual",
    "核对发射、形状、生命周期、碰撞、拖尾与渲染模块",
  ],
  vfxGraph: [
    "Unity 6·0 Visual Effect Graph手册",
    "engine-vendor-versioned-manual",
    "核对当前GPU特效工作流；它不是2017首版作者内容",
  ],
  modelImport: [
    "Unity 6·0模型导入手册",
    "engine-vendor-versioned-manual",
    "核对FBX、比例、坐标、动画与模型资源导入边界",
  ],
  prefabs: [
    "Unity 6·0 Prefab手册",
    "engine-vendor-versioned-manual",
    "核对可复用特效对象、实例覆盖与资源依赖",
  ],
  materials: [
    "Unity 6·0材质手册",
    "engine-vendor-versioned-manual",
    "核对Material、Shader、渲染管线与Pass身份",
  ],
  textures: [
    "Unity 6·0纹理导入手册",
    "engine-vendor-versioned-manual",
    "核对纹理尺寸、格式、压缩、Alpha和目标平台覆盖",
  ],
  colorSpace: [
    "Unity 6·0线性与Gamma工作流",
    "engine-vendor-versioned-manual",
    "核对色彩空间对光照、混合和取样结果的影响",
  ],
  cameras: [
    "Unity 6·0摄像机手册",
    "engine-vendor-versioned-manual",
    "核对投影、视锥、空间、排序与目标纹理",
  ],
  lighting: [
    "Unity 6·0光照手册",
    "engine-vendor-versioned-manual",
    "核对实时光、烘焙光与渲染管线依赖",
  ],
  profiler: [
    "Unity 6·0 Profiler手册",
    "engine-vendor-versioned-manual",
    "核对CPU、GPU、渲染与内存测量边界",
  ],
  frameDebugger: [
    "Unity 6·0 Frame Debugger手册",
    "engine-vendor-versioned-manual",
    "核对逐事件渲染、Pass、批次与中间结果",
  ],
  urpPerformance: [
    "Unity 6·0 URP性能配置手册",
    "engine-vendor-versioned-manual",
    "核对URP资源、相机、光照、阴影与后处理的性能开关",
  ],
};

const PATHS = {
  "uvf-chapter-01": "01-foundations/uvf-01-unity3d-engine-overview",
  "uvf-chapter-02": "01-foundations/uvf-02-vfx-foundations",
  "uvf-chapter-03": "02-workflow/uvf-03-unity3d-foundations",
  "uvf-chapter-04": "03-scene-max/uvf-04-scene-fire-snow",
  "uvf-chapter-05": "03-scene-max/uvf-05-unity-max-weapon-buff-slash",
  "uvf-chapter-06": "04-particle-cases/uvf-06-particle-hit-projectile-ui",
  "uvf-chapter-07": "05-attack-cases/uvf-07-physical-attacks",
  "uvf-chapter-08": "05-attack-cases/uvf-08-magic-attacks",
  "uvf-chapter-09": "06-common-skills/uvf-09-common-skills",
};

const TITLES = {
  "uvf-chapter-01": "第1章 Unity3D游戏引擎概述",
  "uvf-chapter-02": "第2章 游戏特效基础知识",
  "uvf-chapter-03": "第3章 Unity3D基础知识入门",
  "uvf-chapter-04": "第4章 Unity3D场景特效分析与讲解",
  "uvf-chapter-05": "第5章 Unity3D与MAX的基本配合",
  "uvf-chapter-06": "第6章 深入学习粒子系统",
  "uvf-chapter-07": "第7章 物理攻击特效案例",
  "uvf-chapter-08": "第8章 法术攻击特效案例",
  "uvf-chapter-09": "第9章 通用类技能特效案例",
};

const FORMAL_TOC = {
  "uvf-chapter-01": [
    "1.1 初识Unity3D",
    "1.2 了解Unity3D发展",
    "1.3 Unity游戏概说",
    "1.3.1 网页游戏概述",
    "1.3.2 手机游戏概述",
    "1.4 Unity3D学习技巧",
    "1.5 如何安装Unity3D",
  ],
  "uvf-chapter-02": [
    "2.1 游戏特效概述",
    "2.1.1 什么是游戏特效",
    "2.1.2 游戏特效的重要性",
    "2.1.3 游戏特效的自然性",
    "2.2 游戏特效的类型",
    "2.2.1 粒子动画特效",
    "2.2.2 模型动画特效",
    "2.2.3 贴图动画特效",
    "2.2.4 混合特效",
    "2.3 游戏特效的基本点",
    "2.4 游戏特效分析",
    "2.5 游戏制作规范概述",
    "2.5.1 手机游戏特效规范",
    "2.5.2 手机游戏特效图片大小要求",
    "2.5.3 手机游戏特效贴图的格式要求",
    "2.6 游戏特效贴图设计",
    "2.7 游戏特效的色彩感",
    "2.7.1 色彩基础概述",
    "2.7.2 认识色彩的情感",
    "2.8 游戏特效的情感设计",
    "2.9 游戏特效制作常用软件",
  ],
  "uvf-chapter-03": [
    "3.1 Unity3D界面介绍",
    "3.2 如何建立项目工程",
    "3.3 了解Importing Assets（导入资源）",
    "3.3.1 Max模型导出设置",
    "3.3.2 Max模型导入Unity",
    "3.3.3 Max动画导出设置",
    "3.3.4 Max动画导入Unity",
    "3.4 认识Unity3D粒子系统",
    "3.4.1 粒子系统的建立",
    "3.4.2 Particle Properties（粒子属性）",
    "3.4.3 粒子的扩展属性（拾取外部模型发射）",
    "3.4.4 粒子的碰撞",
    "3.5 Unity3D资源管理",
    "3.5.1 Creating Prefab（创建预制体）",
    "3.5.2 Output Prefab（输出预制体）",
    "3.5.3 Imported Prefab（导入预制体）",
    "3.6 Materials and Shaders（材质与着色器）",
    "3.7 Lights（光源）",
    "3.8 Cameras（摄像机）介绍",
    "3.8.1 了解Cameras（摄像机）",
    "3.8.2 Cameras（摄像机）定位",
    "3.9 Unity3D插件介绍",
  ],
  "uvf-chapter-04": [
    "4.1 实例：火焰特效案例讲解",
    "4.2 实例：雪花飞舞特效案例讲解",
  ],
  "uvf-chapter-05": [
    "5.1 实例：武器特效案例讲解",
    "5.2 实例：BUFF特效案例讲解",
    "5.3 实例：刀光特效案例讲解",
  ],
  "uvf-chapter-06": [
    "6.1 实例：受击特效案例讲解",
    "6.2 实例：飞行弹道特效案例讲解",
    "6.3 实例：UI特效案例讲解",
  ],
  "uvf-chapter-07": [
    "7.1 实例：旋风斩特效案例讲解",
    "7.2 实例：3连击特效案例讲解",
  ],
  "uvf-chapter-08": [
    "8.1 实例：冰冻术特效案例讲解",
    "8.2 实例：法系旋风特效案例讲解",
    "8.3 实例：闪电特效案例讲解",
  ],
  "uvf-chapter-09": [
    "9.1 实例：加血特效案例讲解",
    "9.2 实例：传送门特效案例讲解",
    "9.3 实例：升级特效案例讲解",
  ],
};

const SPECS = {
  "uvf-chapter-01": {
    question: "编辑器、项目与目标平台身份怎样成为第一个可重建特效前提？",
    scenario:
      "用固定空项目记录编辑器补丁、模板、渲染管线、色彩空间、质量级别与平台模块，再保存空场景参考帧",
    fault: "只更换编辑器或项目模板，却继续沿用旧截图和性能基线",
    invariant:
      "项目身份、场景、目标平台和空场景观察必须一致，当前版本迁移不得伪装成2017首版事实",
    artifact: "版本表、项目设置快照、空场景帧、平台模块清单与迁移差分",
    focus: "引擎定位、网页与手机目标、学习路径、Unity Hub安装和项目身份",
    sourceIds: ["outline", "unityRelease", "hubInstall", "profiler"],
  },
  "uvf-chapter-02": {
    question: "视觉意图、层类型、纹理、色彩和移动端预算怎样变成可检查合同？",
    scenario:
      "为同一技能拆出预兆、命中和消散三阶段，固定纹理、色彩空间、覆盖面积、发射率、寿命与材质Pass",
    fault: "同时增加透明叠层、粒子寿命和贴图尺寸，再把变慢归因于单一参数",
    invariant:
      "情感与自然性必须映射到时间、轮廓、色彩和运动观察，预算结论必须来自目标设备测量",
    artifact:
      "效果合同、分层草图、纹理导入表、色彩空间记录、预算估算与目标机捕获",
    focus: "特效类型、自然性、制作规范、纹理、色彩、情感与常用工具",
    sourceIds: [
      "outline",
      "particles",
      "textures",
      "colorSpace",
      "profiler",
      "frameDebugger",
    ],
  },
  "uvf-chapter-03": {
    question:
      "模型、动画、粒子、Prefab、材质、光照与摄像机怎样形成无歧义资源链？",
    scenario:
      "从一个固定FBX和纹理开始，逐步导入模型与动画，建立Prefab、粒子、材质、光照和摄像机，再检查依赖与帧事件",
    fault: "改变FBX比例或坐标轴后只修Prefab实例，不修源资产和参考帧",
    invariant:
      "每个画面结果都能回溯到源资产、导入设置、Prefab、材质Pass、光照、摄像机和渲染管线",
    artifact:
      "资产哈希、导入设置、Prefab差分、材质与摄像机表、帧调试捕获和恢复记录",
    focus:
      "编辑器、项目、FBX、动画、粒子模块、Prefab、材质、光照、摄像机与插件",
    sourceIds: [
      "outline",
      "modelImport",
      "particles",
      "particleModules",
      "prefabs",
      "materials",
      "lighting",
      "cameras",
      "frameDebugger",
    ],
  },
  "uvf-chapter-04": {
    question:
      "火焰与雪花的连续发射、空间分布、透明混合和摄像机覆盖怎样分别验证？",
    scenario:
      "在固定摄像机中比较火焰连续发射与雪花场发射，记录寿命、速度、形状、屏幕覆盖、透明叠层和材质Pass",
    fault: "扩大雪花发射盒和火焰Quad尺寸，却继续使用旧的覆盖比例与GPU捕获",
    invariant:
      "火焰与雪花必须各自绑定发射空间、生命周期、材质、摄像机覆盖和同输入恢复",
    artifact:
      "发射器参数、生命周期曲线、覆盖帧、片元估算、Profiler与Frame Debugger捕获",
    focus: "火焰连续发射、雪花场发射、透明混合、空间和摄像机覆盖",
    sourceIds: [
      "outline",
      "particles",
      "particleModules",
      "materials",
      "cameras",
      "profiler",
      "frameDebugger",
    ],
  },
  "uvf-chapter-05": {
    question:
      "武器、BUFF与刀光怎样与骨骼插槽、动画事件、拖尾和资源生命周期对齐？",
    scenario:
      "固定角色动画和武器骨骼，分别触发武器常驻、BUFF循环与刀光瞬时轨迹，记录挂点、时序、空间和回收",
    fault: "把世界空间拖尾挂到局部骨骼，却在角色移动时继续按静止参考帧验收",
    invariant:
      "挂点、坐标空间、动画时序、材质、持续时间和销毁或池化责任必须同时闭合",
    artifact:
      "骨骼挂点表、动画事件时间线、空间轨迹、材质捕获、生命周期和恢复记录",
    focus: "3ds Max资源、武器挂点、BUFF循环、刀光轨迹、动画时序与生命周期",
    sourceIds: [
      "outline",
      "modelImport",
      "particleModules",
      "prefabs",
      "materials",
      "profiler",
    ],
  },
  "uvf-chapter-06": {
    question: "受击、弹道与UI特效的事件、轨迹、空间和排序怎样分别建立证据？",
    scenario:
      "用固定命中事件、起终点和UI画布，比较一次Burst、飞行轨迹与界面特效，保存触发、坐标和渲染顺序",
    fault:
      "混用世界空间和屏幕空间，并用编辑器Scene视图替代Game视图与目标机结果",
    invariant:
      "事件输入、起终状态、模拟空间、摄像机或Canvas、排序、生命周期和目标机观察必须一致",
    artifact:
      "事件日志、弹道轨迹、空间变换表、UI排序帧、目标机Profiler与恢复记录",
    focus: "受击Burst、飞行弹道、UI空间、排序、摄像机与目标设备",
    sourceIds: [
      "outline",
      "particles",
      "particleModules",
      "cameras",
      "frameDebugger",
      "profiler",
    ],
  },
  "uvf-chapter-07": {
    question: "旋风斩与3连击的多段时序、重入、取消和池化怎样避免残留？",
    scenario:
      "固定攻击动画和三次命中时间，分别执行完整、取消、快速重入和池对象复用，记录每个发射器状态",
    fault: "在第二段取消后复用未清理粒子对象，导致下一次连击继承旧粒子",
    invariant:
      "每段攻击必须有唯一触发、可见窗口、取消路径、对象所有权和复用前清理断言",
    artifact:
      "命中时间线、发射器状态表、取消轨迹、池化前后快照、帧捕获与回归记录",
    focus: "旋风斩、3连击、多段命中、取消、快速重入和对象池清理",
    sourceIds: [
      "outline",
      "particles",
      "particleModules",
      "prefabs",
      "profiler",
      "frameDebugger",
    ],
  },
  "uvf-chapter-08": {
    question: "冰冻、法系旋风与闪电的表面、环流、分支和持续时间怎样证伪？",
    scenario:
      "固定目标网格与技能时序，比较冰冻覆盖、旋风环流和闪电分支，保存遮罩、发射路径、材质与首帧",
    fault: "更换目标网格或法线后仍沿用旧遮罩，并把穿插归因于随机种子",
    invariant:
      "目标表面、空间、随机种子、分支规则、材质、时序和恢复帧必须可重放",
    artifact:
      "目标网格身份、遮罩、路径与种子表、材质Pass、时序捕获和同输入恢复",
    focus: "冰冻表面、法系旋风环流、闪电分支、随机性、材质与时序",
    sourceIds: [
      "outline",
      "particles",
      "vfxGraph",
      "modelImport",
      "materials",
      "frameDebugger",
      "profiler",
    ],
  },
  "uvf-chapter-09": {
    question: "加血、传送门与升级怎样用可读预兆、持续循环和对象边界完成交付？",
    scenario:
      "固定角色包围盒、摄像机和技能事件，比较加血脉冲、传送门循环与升级爆发，记录预兆、峰值和消散",
    fault: "角色缩放或传送门持续时间改变后不更新发射空间和回收时点",
    invariant:
      "语义预兆、角色边界、循环或Burst、材质、摄像机、预算和回收必须共同满足",
    artifact:
      "技能阶段表、角色边界快照、循环状态、覆盖与Profiler捕获、回收和恢复记录",
    focus: "加血语义、传送门持续循环、升级Burst、角色边界、预算和回收",
    sourceIds: [
      "outline",
      "particles",
      "particleModules",
      "prefabs",
      "materials",
      "cameras",
      "profiler",
    ],
  },
};

const MAP_SPEC = {
  question: "怎样把9章75个正式坐标组织成版本、资产、渲染、预算与复现地图？",
  scenario:
    "选择一个正式坐标，沿版本身份、资源输入、特效阶段、渲染状态、目标机观察和同输入恢复定位前置条件",
  fault: "把公开目录当成原书正文，或把Unity 6·3 LTS能力静默倒灌到2017首版",
  invariant:
    "75个正式坐标都必须绑定来源边界、时代轨、可观察合同、单变量故障、目标机捕获和恢复条件",
  artifact: "75坐标覆盖表、九章依赖图、首版与当前迁移矩阵、预算与证据索引",
  focus: "9个章根坐标与66个公开编号主题的全书路线",
  sourceIds: Object.keys(SOURCES),
};

const REVIEW_SPEC = {
  question: "能否从一次画面、导入或性能异常反查正式坐标与最小证据链？",
  scenario:
    "用同一技能贯穿资产导入、Prefab、发射器、材质、摄像机、Profiler和回收，依次注入一个可撤销故障",
  fault: "同时改变资产、粒子参数、材质、摄像机和目标设备，使首个分岔不可归因",
  invariant:
    "全书裁决必须由固定版本与资产、单变量故障、原始捕获、目标设备测量和同输入恢复共同支持",
  artifact: "全书证据索引、跨章效果合同、75坐标答辩记录和发布复核表",
  focus: "9章跨章资产与渲染路径、预算估算、证伪实验、当前迁移与发布判断",
  sourceIds: Object.keys(SOURCES),
};

function conceptStrings(unit) {
  return unit.concepts.map((alternatives) => alternatives[0]);
}

function pascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

function alphabeticIndex(index) {
  let value = index + 1;
  let result = "";
  while (value > 0) {
    value -= 1;
    result = String.fromCharCode(65 + (value % 26)) + result;
    value = Math.floor(value / 26);
  }
  return result;
}

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function evidenceKey(index, profile) {
  const scope =
    profile.role === "learning-map"
      ? "MAP"
      : profile.role === "final-review"
        ? "REVIEW"
        : profile.id.replace("uvf-chapter-", "UNIT");
  return `UVF-${scope}-${alphabeticIndex(index)}`;
}

function mechanismFor(concept, profile) {
  const value = concept.toLocaleLowerCase();
  const label = concept.replaceAll(".", "·");
  const lead = `${profile.title}把${label}`;
  if (/^第\d章/.test(concept))
    return `${lead}设为章级交付边界：目录只能限定主题范围，必须另列2017首版身份、当前Unity版本、资产输入、渲染状态和目标机工件；章名本身不证明画面或性能。`;
  if (/初识|发展|游戏概说|网页游戏|手机游戏|学习技巧|安装/.test(value))
    return `${lead}落实为编辑器补丁、项目模板、目标平台模块、渲染管线和可重建空场景；网页与手机标签不替代具体平台、图形API、分辨率和设备身份。`;
  if (/什么是|重要性|自然性|基本点|特效分析|情感设计/.test(value))
    return `${lead}转换成预兆、峰值、消散、轮廓、方向、速度和遮挡等可观察合同；“自然”“重要”或“有冲击力”必须由对照帧与任务语义解释。`;
  if (/类型|粒子动画|模型动画|贴图动画|混合特效/.test(value))
    return `${lead}拆成粒子、Mesh、翻页纹理和组合层，分别记录源资产、发射器、材质Pass、坐标空间与生命周期；组合层不能用一个总粒子数掩盖各层责任。`;
  if (/制作规范|图片大小|格式要求|贴图设计|色彩/.test(value))
    return `${lead}绑定纹理源文件、尺寸、Alpha、导入格式、压缩、色彩空间和目标平台覆盖；视觉验收与显存、带宽或片元成本必须分别采集。`;
  if (/常用软件/.test(value))
    return `${lead}记录DCC、导出器、Unity编辑器和插件的精确版本、坐标单位与许可证；工具名称不是可复现资产管线，第三方资源也不能默认复制。`;
  if (/界面介绍|建立项目工程/.test(value))
    return `${lead}映射为窗口职责、场景和项目身份、包锁定、渲染管线资源、色彩空间与版本控制边界；工作区布局变化不应改变运行结论。`;
  if (/importing assets|模型导出|模型导入|动画导出|动画导入/.test(value))
    return `${lead}建立源文件哈希、单位、轴向、骨骼、动画剪辑与Importer设置链；导入后手工修实例会制造不可重建状态，修复必须回到源资产或明确覆盖。`;
  if (/粒子系统|particle properties|扩展属性|碰撞/.test(value))
    return `${lead}定位到发射、Shape、速度、生命周期、碰撞、Renderer和Simulation Space模块；Built-in Particle System与当前VFX Graph是不同实现轨，不能混作同一证据。`;
  if (/资源管理|prefab/.test(value))
    return `${lead}写成Prefab源、变体、实例覆盖、依赖、加载、复用和回收合同；导入或输出名称不能替代GUID、依赖图和实例差分。`;
  if (/materials|shaders/.test(value))
    return `${lead}绑定渲染管线、Shader、关键字、混合、深度、队列和Pass；外观相近不代表Frame Debugger事件、透明排序和目标机成本相同。`;
  if (/lights/.test(value))
    return `${lead}区分实时、混合与烘焙光，固定阴影、探针、管线资产和质量级别；光照改变后旧参考帧与性能捕获都必须失效。`;
  if (/cameras/.test(value))
    return `${lead}固定投影、视锥、位置、裁剪、目标纹理、堆叠和观察分辨率；Scene视图不能替代Game摄像机或目标设备输出。`;
  if (/插件/.test(value))
    return `${lead}记录包名、版本、来源、许可证、渲染管线兼容性和最小复现；插件成功导入不证明运行结果，也不能掩盖缺失依赖。`;
  if (/火焰/.test(value))
    return `${lead}建模为持续发射、向上速度、寿命曲线、软粒子或透明混合与热区覆盖；必须把画面覆盖、叠层和材质Pass带入目标机测量。`;
  if (/雪花/.test(value))
    return `${lead}建模为有界发射体积、下落速度、摄像机相对空间和透明排序；扩大Shape或Quad尺寸时，覆盖比例和旧GPU基线同时作废。`;
  if (/武器/.test(value))
    return `${lead}绑定武器骨骼、局部坐标、动画事件和常驻或瞬时生命周期；换骨架或缩放后必须重建挂点和参考轨迹。`;
  if (/buff/i.test(value))
    return `${lead}拆成进入、循环和退出状态，明确角色边界、持续时间、叠加规则和回收者；循环特效不能靠销毁场景对象隐式清理。`;
  if (/刀光/.test(value))
    return `${lead}绑定动画采样、拖尾顶点、世界或局部空间、材质和消散时间；帧率或角色位移变化时要检查轨迹断裂与残留。`;
  if (/受击/.test(value))
    return `${lead}绑定一次命中事件、法线或方向、Burst、伤害语义与短生命周期；重复事件、无效目标和对象池复用都必须有反例。`;
  if (/飞行弹道/.test(value))
    return `${lead}固定起点、终点、时间参数、碰撞和模拟空间，保存每步位置与到达条件；画面命中不等于逻辑命中或无穿透。`;
  if (/ui特效/i.test(value))
    return `${lead}区分屏幕、Canvas和世界空间，记录摄像机、排序、遮罩、缩放和目标分辨率；Scene视图外观不能替代实际UI合成帧。`;
  if (/旋风斩|3连击/.test(value))
    return `${lead}写成多段攻击时间线，规定每段触发、可见窗口、取消、重入、对象所有权和池化清理；下一次攻击不得继承旧粒子。`;
  if (/冰冻/.test(value))
    return `${lead}绑定目标网格、表面遮罩、法线、材质替换或叠层与解除时点；模型或骨骼变化后旧遮罩不能继续充当真值。`;
  if (/法系旋风/.test(value))
    return `${lead}绑定环流路径、半径、速度、随机种子、地面关系和持续时间；粒子更多不自动等于轮廓更清楚。`;
  if (/闪电/.test(value))
    return `${lead}绑定端点、分支规则、随机种子、采样频率、材质和闪烁时间；每次随机形状可不同，但约束与统计边界必须可重放。`;
  if (/加血/.test(value))
    return `${lead}把治疗语义映射到上升运动、颜色、脉冲、目标边界和数值事件；绿色画面只是设计选择，不能独立证明反馈可读。`;
  if (/传送门/.test(value))
    return `${lead}拆成预兆、开启、持续、传送和关闭状态，记录循环、遮挡、交互窗口与回收；持续运行必须验证稳态存量。`;
  if (/升级/.test(value))
    return `${lead}绑定唯一升级事件、角色边界、Burst峰值、UI或音频同步与消散；重复触发和场景卸载必须不留发射器。`;
  return `${lead}转换成版本化资产、特效阶段、渲染状态、预期观察、单变量故障、目标机捕获与同输入恢复，并明确公开目录与当前官方手册各自承担什么。`;
}

function enrich(id, title, target, concepts, spec, role, officialUnitId) {
  const chapterSlug = target.split("/").at(-1);
  const contracts = [
    {
      phase: "准备与预兆",
      asset: `${title}的源资产、导入设置、Prefab依赖和固定随机种子`,
      emitter: `发射器尚未进入峰值，先记录Shape、Simulation Space、延迟和触发事件`,
      material: "固定渲染管线、Shader、混合、深度、队列、关键字和Pass",
      camera: "固定Game摄像机、投影、位置、分辨率、质量级别和目标平台",
      observation: `${title}的轮廓、方向、遮挡和触发前状态符合预注册参考帧`,
    },
    {
      phase: "发射与峰值",
      asset: `${title}只使用冻结的Mesh、纹理、动画、材质和Prefab版本`,
      emitter: `执行“${spec.scenario}”，记录Rate、Burst、寿命、速度、模块和活动粒子`,
      material: "保存Frame Debugger中的事件、材质Pass、透明排序和中间画面",
      camera: "在同一Game摄像机与目标设备上记录覆盖比例、CPU与GPU采样",
      observation: `${title}的首个峰值、持续窗口、屏幕覆盖和性能工件能相互对齐`,
    },
    {
      phase: "消散与回收",
      asset: `${title}撤销唯一变量并从相同源资产、Prefab和场景重新实例化`,
      emitter: "停止发射，等待现存粒子死亡，检查子发射器、拖尾、碰撞与池对象",
      material: "确认临时材质、关键字、Renderer和后处理状态没有残留",
      camera: "以相同摄像机、目标设备和输入重放参考帧与Profiler区间",
      observation: `${title}重新满足“${spec.invariant}”，且场景、池和渲染事件无残留`,
    },
  ];
  const captures = [
    {
      name: `${title}参考捕获`,
      setup: `固定编辑器补丁、渲染管线、目标设备、资产和摄像机后执行：${spec.scenario}`,
      prediction: `参考帧、Profiler区间和Frame Debugger事件共同支持${spec.focus}的当前观察。`,
      boundary:
        "这是本站独立实验；公开目录没有提供原书正文、工程文件或性能数据，不能声称复现作者数值。",
    },
    {
      name: `${title}单一故障捕获`,
      setup: `保持其余条件不变，只注入“${spec.fault}”`,
      prediction: `首个画面、状态或测量分岔应能由该变量解释，并交付${spec.artifact}。`,
      boundary:
        "若多个资产、渲染开关或设备条件同时变化，就保留竞争性解释，不生成风险分或置信度。",
    },
    {
      name: `${title}同输入恢复捕获`,
      setup: "撤销受控变量，清理场景与对象池，从同一资产和项目身份重建",
      prediction: `参考画面、渲染事件和目标机测量恢复，并再次满足“${spec.invariant}”。`,
      boundary:
        "恢复只修生成结果无效；必须回到源资产、导入设置、Prefab或项目配置，并报告所有残留和未知项。",
    },
  ];
  const gates = [
    {
      label: "原版、目录与访问门",
      detail: `${title}只用天瓏版本页和公开目录限定2017首版范围；outline-only不支持复制原文、图片、工程或虚构作者判断。`,
    },
    {
      label: "编辑器与渲染版本门",
      detail: `${title}记录实际Unity补丁、目标平台、Built-in/URP/HDRP、色彩空间、质量级别和包版本；Unity 6·0手册与Unity 6·3 LTS项目分开标示。`,
    },
    {
      label: "资产、Prefab与许可证门",
      detail: `${title}固定源资产哈希、Importer、Prefab依赖、材质和第三方许可证；缺少授权的原书工程、图片或插件不复制。`,
    },
    {
      label: "发射器与生命周期门",
      detail: `${title}保存触发、Rate、Burst、寿命、Simulation Space、停止、池化和回收状态，并只改变“${spec.fault}”。`,
    },
    {
      label: "摄像机与渲染工件门",
      detail: `${title}固定Game摄像机、分辨率和参考帧，保存Frame Debugger或图形捕获中的Pass、透明叠层和排序。`,
    },
    {
      label: "目标机测量与恢复门",
      detail: `${title}把预算公式当估算，以目标设备Profiler为裁决；撤销后用同一输入恢复画面、状态与测量并交付${spec.artifact}。`,
    },
  ];
  return {
    id,
    title,
    target,
    chapterSlug,
    componentBase: pascal(chapterSlug),
    concepts,
    role,
    officialUnitId,
    ...spec,
    contracts,
    captures,
    gates,
  };
}

function objectives(profile) {
  return `<Objectives>

- 把${profile.focus}落实为版本化资产、特效阶段、渲染状态与目标机观察
- 只注入“${profile.fault}”，定位${profile.title}相对参考捕获的首个分岔
- 交付${profile.artifact}，明确分开2017首版范围、Unity 6·3 LTS项目与Unity 6·0手册依据

</Objectives>`;
}

function sourceSection(profile) {
  const links = profile.sourceIds
    .map((id) => {
      const meta = SOURCE_META[id];
      if (!meta) throw new Error(`缺少来源元数据：${id}`);
      return `- [${meta[0]}](${SOURCES[id]})：${profile.title}用它${meta[2]}。`;
    })
    .join("\n");
  return `## 原版、来源访问与时代边界

${profile.title}以[天瓏版本与公开目录页](${OUTLINE})核对张天骥著、人民邮电出版社、2017年7月1日、232页、ISBN 9787115455222以及9章66个编号主题。${profile.title}的来源访问级别是 outline-only：公开目录只能限定覆盖分母，不能支持原书正文、截图、参数、工程文件、性能结论或作者判断。

${profile.title}是中文独立教学重构，不是翻译、节译或原书替代品。${profile.title}的2017首版范围只保留公开目录揭示的问题结构；当前轨道以[Unity 6发布页](${SOURCES.unityRelease})确认Unity 6·3 LTS，并用明确标版的Unity 6·0英文官方手册核对粒子、资源和渲染机制。${profile.title}引用的Unity 6·0手册不自动证明Unity 6·3 LTS每个补丁行为，实际实验还必须记录编辑器完整版本；VFX Graph、URP与HDRP也不能倒灌成原作者观点。

${profile.title}不使用日文文档或日文残留。${profile.title}保留Unity界面中的英文专名时，会同时给出中文责任解释；所有当前技术链接都指向Unity官方英文页面。${profile.title}涉及的第三方插件、DCC资产、纹理、模型和原书工程必须逐项核对许可证，公开可见不等于允许复制。

${profile.title}的实验可能导入不可信资产、运行插件代码、改变项目设置或占用大量CPU、GPU与显存。${profile.title}必须使用可丢弃副本、版本控制、已知来源资产、固定目标设备和停止条件；画面截图不能替代Profiler、Frame Debugger或图形捕获，估算模型也不能冒充实测。

### 本页独立事实来源

${links}`;
}

function conceptsSection(profile) {
  return `## 正式目录坐标逐项深读

${profile.concepts
  .map((concept, index) => {
    const key = evidenceKey(index, profile);
    const label = concept.replaceAll(".", "·");
    return `### ${concept}

**坐标 ${index + 1}/${profile.concepts.length}：${label}。稳定证据键 ${key}。** ${mechanismFor(concept, profile)} ${profile.title}在这个坐标必须保存版本与管线身份、源资产、参考帧、唯一变量、首个分岔、渲染工件、目标机测量和同输入恢复；一次Play、单张截图、编辑器平均帧率或本站预算估算都不能独立证明主张。`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 三个可操作特效证据实验

${profile.title}先写预测：若只注入“${profile.fault}”，资产、发射器、材质、摄像机、帧事件或目标机测量哪一项最先变化？先选择正式坐标与特效阶段，再调整可解释预算参数，最后重放参考、故障和恢复并闭合六道发布门。

<Stepper>
  <Step title="效果合同：选择坐标、阶段与时代轨">
    <${profile.componentBase}EffectContractLab />
  </Step>
  <Step title="预算模型：估算粒子存量与透明片元工作量">
    <${profile.componentBase}BudgetModelLab />
  </Step>
  <Step title="捕获门：闭合来源、版本、资产、渲染、测量与恢复">
    <${profile.componentBase}CaptureGateLab />
  </Step>
</Stepper>

${profile.title}的预算视图使用两个透明、可复算的近似。${profile.title}的稳态粒子存量上界为“持续发射率 × 寿命 + 单次 Burst”；每帧片元工作量为“1920×1080像素 × 画面覆盖比例 × 聚合透明叠层 × 材质Pass”。${profile.title}的聚合叠层已经表达重叠，因此不再乘粒子数。${profile.title}的两式只用于暴露参数量级，Profiler、Frame Debugger或目标平台图形捕获才是性能裁决依据。`;
}

function protocolSection(profile) {
  return `## 最小可重现实验协议

1. ${profile.title}先冻结项目提交、Unity完整版本、包锁定、渲染管线、色彩空间、目标平台、质量级别、源资产哈希、Importer、Prefab、材质、摄像机和成功条件。
2. ${profile.title}用同一Game摄像机与目标设备建立参考捕获，保存${profile.artifact}；参考帧或测量不稳定就停止，不用后续故障解释机制。
3. ${profile.title}保持其余条件不变，只注入“${profile.fault}”，记录首个画面或状态分岔、Frame Debugger事件、CPU/GPU区间、竞争性解释和停止条件。
4. ${profile.title}撤销受控变量，清理场景、对象池和临时材质，从源资产与项目配置重建；画面、渲染事件、测量或资源残留没有一起恢复时，结论标记失败或未知。

<Callout type="trap" title="${profile.title}误区一：公开目录等于原书全文">
${profile.title}的outline-only来源只能证明版本身份与目录范围，不能从标题虚构原书参数、步骤或作者评价，也不能复制不可授权的正文、截图、工程、模型或纹理。
</Callout>

<Callout type="trap" title="${profile.title}误区二：2017工作流就是当前Unity事实">
${profile.title}分开2017首版范围、Unity 6·3 LTS实际项目和Unity 6·0标版手册；Built-in Particle System、VFX Graph、URP和HDRP必须分别核对，当前能力不冒充原作者观点。
</Callout>

<Callout type="trap" title="${profile.title}误区三：画面好看或估算变小就代表性能通过">
${profile.title}不以Scene视图、单张截图、编辑器FPS或预算公式裁决。必须固定Game摄像机和目标设备，只改变一个条件，保存Profiler、帧事件、原始捕获与同输入恢复。
</Callout>`;
}

function exercises(profile) {
  const coordinateQuestions = profile.concepts
    .map((concept, index) => {
      const key = evidenceKey(index, profile);
      const label = concept.replaceAll(".", "·");
      return `**问题 ${index + 1}：${concept}**

为${profile.title}的稳定证据键 ${key} 设计一个参考效果合同、一个单变量故障、一个应见画面或测量和一个恢复检查，并说明${label}在2017首版范围与当前轨道的边界。

<Answer>
先为${profile.title}冻结${profile.scenario}所需的Unity完整版本、渲染管线、目标设备、源资产、Importer、Prefab、材质、摄像机和停止条件；把 ${key} 映射到准备、峰值和消散阶段，只注入“${profile.fault}”。首个分岔必须能由该变量解释，撤销后从源配置重建并以同一输入重新满足“${profile.invariant}”；不可访问的原书正文、未授权资产、Unity 6·0与6·3差异及未测目标设备保留为未知。
</Answer>`;
    })
    .join("\n\n");
  const start = profile.concepts.length + 1;
  return `## 练习与答案

<Exercises>

${coordinateQuestions}

**问题 ${start}：为什么要保留三层版本身份**

${profile.title}为什么不能把2017首版范围、Unity 6·0标版手册和Unity 6·3 LTS实际项目合并成一句“当前Unity如此”？

<Answer>
${profile.title}的公开目录只回答原书覆盖哪些主题，Unity 6·0手册回答该手册版本如何描述组件，Unity 6·3 LTS项目才回答当前选定补丁与包组合的真实行为。三者只能通过显式迁移和实测连接；手册相近不代表补丁等同，当前支持更好也不能改写作者时代。
</Answer>

**问题 ${start + 1}：什么时候必须缩小画面或性能结论**

${profile.title}在哪些情况下只能报告观察或未知，不能发布“效果正确”“没有残留”或“性能通过”？

<Answer>
${profile.title}缺少固定编辑器补丁、渲染管线、目标设备、资产哈希、Importer、Prefab、材质、摄像机、原始帧、Profiler区间、帧事件、单变量故障或同输入恢复中的任一项，就只能报告局部观察。预算公式是上界近似，编辑器结果不代表目标机，单帧也不证明生命周期；这些限制必须随结果发布。
</Answer>

</Exercises>`;
}

function glossary(profile) {
  const terms = [
    [
      "效果合同",
      `${profile.title}把输入事件、资产、阶段、空间、材质、摄像机与应见画面连成的可检查约束`,
    ],
    [
      "Simulation Space",
      `${profile.title}中粒子位置与速度相对本地、世界或自定义变换解释的坐标责任`,
    ],
    [
      "稳态存量",
      `${profile.title}持续发射在给定寿命下可能同时存活的粒子数量近似`,
    ],
    ["透明叠层", `${profile.title}同一屏幕区域被透明几何重复覆盖的聚合层数`],
    [
      "首个分岔",
      `${profile.title}的故障捕获最早偏离参考资产、状态、画面或测量的位置`,
    ],
    [
      "同输入恢复",
      `${profile.title}撤销唯一变量并从源配置重建后恢复参考画面、帧事件与测量的断言`,
    ],
  ];
  return `## 六个裁决术语

${profile.title}使用${terms
    .map(
      ([term, definition]) =>
        `<Term def="${escapeAttribute(definition)}">${term}</Term>`,
    )
    .join(
      "、",
    )}构成最小证据语言；它们指向真实资产、渲染状态或工件，不生成审美分、成熟度、风险分或置信度。

<Glossary>
${terms
  .map(
    ([term, definition]) =>
      `<GlossaryItem term="${term}">${definition}。</GlossaryItem>`,
  )
  .join("\n")}
</Glossary>`;
}

function synthesis(profile) {
  return `## 小结与上架门

${profile.title}把${profile.focus}连接成可复核效果链：公开目录只给正式坐标，版本身份阻止时代错置，资产与阶段合同约束画面，预算公式只暴露量级，Profiler和Frame Debugger提供目标机证据，单故障与同输入恢复决定结论能否发布。最终交付${profile.artifact}，同时报告失败、第三方许可、未测设备、Unity 6·0与6·3差异及所有残留。

${exercises(profile)}

${glossary(profile)}

<Attribution
  mode="independent-rewrite"
  sourceBasis="outline-only"
  workTitle="张天骥《Unity 3D游戏特效制作典型实例》公开版本与目录"
  adaptedUrl="${OUTLINE}"
/>`;
}

function wrapper(profile) {
  const model = {
    unitId: profile.id,
    title: profile.title,
    question: profile.question,
    concepts: profile.concepts,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
    contracts: profile.contracts,
    captures: profile.captures,
    gates: profile.gates,
  };
  return `"use client";

import {
  UnityVfxEvidenceLab,
  type UnityVfxEvidenceModel,
} from "@/components/mdx/unity-vfx/v2/vfx-budget-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies UnityVfxEvidenceModel;

export function ${profile.componentBase}EffectContractLab() {
  return <UnityVfxEvidenceLab model={model} view="effect-contract" />;
}

export function ${profile.componentBase}BudgetModelLab() {
  return <UnityVfxEvidenceLab model={model} view="budget-model" />;
}

export function ${profile.componentBase}CaptureGateLab() {
  return <UnityVfxEvidenceLab model={model} view="capture-gate" />;
}
`;
}

async function writeFormatted(filePath, source, parser) {
  const output = await format(source, { parser });
  const current = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : "";
  if (current !== output) fs.writeFileSync(filePath, output);
}

async function transformPage(profile) {
  const filePath = path.join(CONTENT_ROOT, `${profile.target}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`缺少页面：${filePath}`);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const body = `import {
  Objectives,
  Term,
  Callout,
  Stepper,
  Step,
  Exercises,
  Answer,
  Glossary,
  GlossaryItem,
  Attribution,
} from "@/components/mdx/mdx-components";
import {
  ${profile.componentBase}EffectContractLab,
  ${profile.componentBase}BudgetModelLab,
  ${profile.componentBase}CaptureGateLab,
} from "@/components/mdx/${BOOK}/v2/${profile.chapterSlug}";

${objectives(profile)}

## 为什么从这个问题开始

${profile.title}围绕“${profile.question}”建立贯穿任务：${profile.scenario}。先写效果合同和预算预测，再重放参考、单故障与恢复；只有守住“${profile.invariant}”并交付${profile.artifact}，目录标题、编辑器画面或性能数字才可能升级为可复核证据。

${sourceSection(profile)}

${conceptsSection(profile)}

${experimentSection(profile)}

${protocolSection(profile)}

${synthesis(profile)}
`;
  const data = {
    ...parsed.data,
    title: profile.title,
    section: profile.title,
    description: `${profile.title}覆盖${profile.concepts.length}个正式目录坐标，用效果合同、预算模型与捕获门交付${profile.artifact}`,
    demo: true,
    math: false,
    sourceUrl: OUTLINE,
    qualityVersion: 2,
    practiceMode: "simulation",
    sourceMode: "independent-rewrite",
  };
  if (profile.officialUnitId) data.officialUnitId = profile.officialUnitId;
  else delete data.officialUnitId;
  await writeFormatted(
    filePath,
    matter.stringify(body.trimStart(), data),
    "mdx",
  );
  await writeFormatted(
    path.join(COMPONENT_ROOT, `${profile.chapterSlug}.tsx`),
    wrapper(profile),
    "typescript",
  );
}

const document = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = document.books[BOOK];
if (!manifest) throw new Error(`缺少manifest：${BOOK}`);
if (manifest.units.length !== 9)
  throw new Error(`正式章数应为9，实际${manifest.units.length}`);

for (const unit of manifest.units) {
  const topics = FORMAL_TOC[unit.id];
  if (!topics || !SPECS[unit.id] || !PATHS[unit.id] || !TITLES[unit.id])
    throw new Error(`缺少单元配置：${unit.id}`);
  unit.title = TITLES[unit.id];
  unit.concepts = topics.map((topic) => [topic]);
}

const allCoordinates = manifest.units.flatMap((unit) => [
  unit.title,
  ...conceptStrings(unit),
]);
const publicTopics = manifest.units.reduce(
  (count, unit) => count + conceptStrings(unit).length,
  0,
);
if (publicTopics !== 66) throw new Error(`编号主题应为66，实际${publicTopics}`);
if (allCoordinates.length !== 75)
  throw new Error(`正式坐标应为75，实际${allCoordinates.length}`);

const profiles = [
  enrich(
    "learningMap",
    "《Unity 3D游戏特效制作典型实例》75坐标证据学习地图",
    "00-guide/uvf-official-learning-map",
    allCoordinates,
    MAP_SPEC,
    "learning-map",
  ),
  ...manifest.units.map((unit) =>
    enrich(
      unit.id,
      TITLES[unit.id],
      PATHS[unit.id],
      [unit.title, ...conceptStrings(unit)],
      SPECS[unit.id],
      "chapter",
      unit.id,
    ),
  ),
  enrich(
    "finalReview",
    "《Unity 3D游戏特效制作典型实例》75坐标全书证据总复习",
    "07-review/uvf-official-final-review",
    allCoordinates,
    REVIEW_SPEC,
    "final-review",
  ),
];
if (profiles.length !== 11)
  throw new Error(`页面数量应为11，实际${profiles.length}`);

fs.mkdirSync(COMPONENT_ROOT, { recursive: true });
for (const profile of profiles) await transformPage(profile);

for (const unit of manifest.units) {
  unit.chapterPath = PATHS[unit.id];
  unit.sourceMode = "independent-rewrite";
  unit.sourceAccess = "outline-only";
  unit.factSourceIds = SPECS[unit.id].sourceIds;
}
manifest.edition =
  "《Unity 3D游戏特效制作典型实例》，张天骥，人民邮电出版社，2017年7月1日，232页，ISBN 9787115455222";
manifest.sourceKind =
  "public-bookseller-edition-and-outline-plus-current-unity-vendor-primary-documentation";
manifest.sourceUrl = OUTLINE;
manifest.secondarySourceUrls = Object.values(SOURCES).filter(
  (url) => url !== OUTLINE,
);
manifest.status =
  "verified-public-outline-independent-rewrite-current-unity-cross-check";
manifest.verifiedAt = "2026-07-30";
manifest.sourceAccess = "outline-only";
manifest.defaultSourceMode = "independent-rewrite";
manifest.disclosureNote =
  "正式分母为9个章根坐标和公开目录的66个编号主题，共75个正式坐标。天瓏页核对作者、出版社、2017-07-01、232页、ISBN与目录；未获得原书正文、工程、截图或许可资产，故只做独立重构。历史轨只称2017首版范围，不推断精确编辑器版本；当前轨以Unity 6.3 LTS为项目目标，Unity 6.0英文官方手册逐页标版引用。Built-in Particle System、VFX Graph、URP与HDRP分轨，不使用日文页面，不把当前结论写成作者观点。";
manifest.unitMappingEvidence = "quality/unity-vfx-v2-profiles.json";
manifest.factSourcePolicy =
  "天瓏版本与目录页只核对原作身份和正式范围；当前粒子、资产、渲染与性能事实由Unity官方发布页和明确标版的英文手册独立核对。Unity 6.0手册不自动等同Unity 6.3 LTS实际补丁，目标项目仍需记录完整版本并实测。";
manifest.factSources = Object.fromEntries(
  Object.entries(SOURCE_META).map(([id, [label, kind]]) => [
    id,
    { kind, label, url: SOURCES[id] },
  ]),
);
manifest.coverageMetrics = {
  targetFormalNodes: 75,
  coveredFormalNodes: 75,
  coveragePercent: 100,
};
manifest.metrics = {
  officialChapterRoots: 9,
  officialNumberedTopics: 66,
  formalNodes: 75,
  officialUnits: 9,
  learningMapPages: 1,
  chapterPages: 9,
  finalReviewPages: 1,
  totalPages: 11,
  interactiveViews: 33,
};

await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      generatedAt: "2026-07-30",
      sourceAccess: "outline-only",
      publisherEdition: "2017-07-01, ISBN 9787115455222",
      currentTrack: "Unity 6.3 LTS",
      manualTrack: "Unity 6.0 English official manual",
      formalNodes: 75,
      profiles: profiles.map((profile) => ({
        ...profile,
        filePath: `content/${BOOK}/${profile.target}.mdx`,
        componentPath: `src/components/mdx/${BOOK}/v2/${profile.chapterSlug}.tsx`,
      })),
    },
    null,
    2,
  )}\n`,
  "json",
);
await writeFormatted(
  MANIFEST_PATH,
  `${JSON.stringify(document, null, 2)}\n`,
  "json",
);

console.log("已重构11页、9章、66个编号主题、75个正式坐标与33个交互视图。");
