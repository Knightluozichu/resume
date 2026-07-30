import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "unity-animation";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(
  ROOT,
  "src/components/mdx/unity-animation/v2",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/unity-animation-v2-profiles.json",
);

const SOURCES = {
  catalog:
    "https://www.packtpub.com/en-us/product/unity-animation-essentials-9781782174813?type=print",
  preview:
    "https://api.pageplace.de/preview/DT0400.9781782174998_A25206050/preview-9781782174998_A25206050.pdf",
  chinese:
    "https://opac.uibe.edu.cn/opac/book/a9eb591e52e545387e17168005244ab7",
  clips:
    "https://docs.unity3d.com/6000.0/Documentation/Manual/AnimationClips.html",
  window:
    "https://docs.unity3d.com/6000.0/Documentation/Manual/AnimationEditorGuide.html",
  animator:
    "https://docs.unity3d.com/6000.0/Documentation/Manual/class-Animator.html",
  controller:
    "https://docs.unity3d.com/6000.0/Documentation/Manual/class-AnimatorController.html",
  transitions:
    "https://docs.unity3d.com/6000.0/Documentation/Manual/class-Transition.html",
  deltaTime:
    "https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Time-deltaTime.html",
  curve:
    "https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AnimationCurve.html",
  sprite:
    "https://docs.unity3d.com/6000.0/Documentation/Manual/SpriteEditor.html",
  particles:
    "https://docs.unity3d.com/6000.0/Documentation/Manual/class-ParticleSystem.html",
  root:
    "https://docs.unity3d.com/6000.0/Documentation/Manual/RootMotion.html",
  retarget:
    "https://docs.unity3d.com/6000.0/Documentation/Manual/Retargeting.html",
  blendTree:
    "https://docs.unity3d.com/6000.0/Documentation/Manual/class-BlendTree.html",
  blendShapes:
    "https://docs.unity3d.com/6000.0/Documentation/Manual/BlendShapes.html",
  ik:
    "https://docs.unity3d.com/6000.0/Documentation/Manual/InverseKinematics.html",
  video:
    "https://docs.unity3d.com/6000.0/Documentation/Manual/class-VideoPlayer.html",
};

const PATHS = {
  learningMap: "00-guide/uan-official-learning-map",
  "uan-01": "01-foundations-2d/uan-01-animation-fundamentals",
  "uan-02": "01-foundations-2d/uan-02-sprite-animation",
  "uan-03": "02-native-mecanim/uan-03-native-animation",
  "uan-04": "02-native-mecanim/uan-04-noncharacter-animation-mecanim",
  "uan-05": "03-character/uan-05-character-animation-fundamentals",
  "uan-06": "03-character/uan-06-advanced-character-animation",
  "uan-07": "04-advanced-media/uan-07-blend-shapes-ik-movie-textures",
  finalReview: "05-review/uan-official-final-review",
};

const PAGE_SPECS = {
  learningMap: {
    title: "《Unity Animation Essentials》34组目录学习地图",
    duty: "按基础、Sprite、Animation窗口、Mecanim、角色、Blend Tree及高级表现组织34组公开目录条目",
    question:
      "怎样让2015年的Unity 4/5工作流保持可辨认，同时用Unity 6资料验证稳定机制和迁移点？",
    invariant:
      "七章目录各有唯一归属，时间、属性、状态、空间与输出都可重放，现代接口不倒填为原书内容",
    fault: "把当前编辑器截图和VideoPlayer等现行接口直接写成2015年原书步骤",
    scenario:
      "团队接手一套2015年动画示例，先复原剪辑、状态机和角色链，再为Unity 6登记仍成立的资产合同与已变化接口。",
    stages: ["锁定目录与引擎时代", "贯通剪辑状态与空间", "登记运行证据和迁移"],
    clipNames: ["全书时间轴", "状态图总览", "运行迁移轨"],
    sources: [SOURCES.catalog, SOURCES.preview, SOURCES.clips, SOURCES.animator],
    artifact:
      "34组条目映射、Unity时代标签、资产依赖、时间采样、状态轨迹、空间基准、运行截图、迁移表和回退说明。",
    opening:
      "学习地图保留原书七章的动作顺序，不把Timeline、VideoPlayer或Unity 6面板反写进2015年；现代手册用于验证剪辑、控制器、Avatar和运行时关系。",
  },
  "uan-01": {
    duty: "从帧、关键帧与动画类型走到deltaTime、曲线、协程、材质和相机效果",
    question:
      "怎样证明代码动画在不同帧率下保持相同速度，并让曲线、旋转、材质与相机效果共享明确时钟？",
    invariant:
      "位移按经过时间积分，端点与坐标系明确，协程和曲线不重复推进同一属性",
    fault: "每帧累加固定距离而忽略deltaTime，导致高帧率设备移动更快",
    scenario:
      "为无人机演示实现位移、朝向、材质滚动和受控相机震动，分别在30与120 FPS采样终点。",
    stages: ["声明属性端点与时钟", "采样曲线和代码更新", "比较帧率与恢复状态"],
    clipNames: ["位置曲线", "朝向协程", "材质与相机"],
    sources: [SOURCES.clips, SOURCES.deltaTime, SOURCES.curve],
    artifact:
      "属性清单、坐标系、关键帧、曲线、deltaTime积分、协程生命周期、两档帧率轨迹和重置快照。",
    opening:
      "动画基础页把变化写成属性关于时间的函数；帧只是采样点，不能把一帧当成固定物理时长。",
  },
  "uan-02": {
    duty: "把Sprite导入、切片、图集、帧序列、速度、循环和顺序问题编成可诊断资产链",
    question:
      "怎样从纹理导入设置追到Animation Clip采样，定位播放过快、循环错误或帧顺序颠倒？",
    invariant:
      "切片结果、帧序列、采样率、循环设置与运行时控制器引用同一组版本化资产",
    fault: "图集切片顺序与剪辑关键帧顺序不一致，预览和运行时出现倒序跳帧",
    scenario:
      "导入一张角色Sprite图集，生成待机与行走剪辑，并对速度、loopTime和帧排序各注入一次错误。",
    stages: ["核对纹理切片和轴心", "生成帧序列与采样率", "验证循环顺序和运行引用"],
    clipNames: ["图集切片", "待机序列", "行走序列"],
    sources: [SOURCES.sprite, SOURCES.clips, SOURCES.controller],
    artifact:
      "纹理导入设置、切片矩形、轴心、帧清单、采样率、loopTime、控制器引用、运行录屏和故障对照。",
    opening:
      "Sprite页把看似视觉问题还原成资产身份问题：帧是否存在、顺序如何、以何种采样率进入哪个剪辑。",
  },
  "uan-03": {
    duty: "用Animation窗口编排飞行镜头、多对象属性、Animation Event与粒子模块",
    question:
      "怎样区分单层级Animation Clip、多对象编排和事件副作用，并让粒子发射与渲染结果可复核？",
    invariant:
      "剪辑只驱动声明属性，事件函数幂等且可追踪，粒子生命周期与发射模块拥有明确基线",
    fault: "动画事件在循环剪辑中重复触发非幂等逻辑，粒子实例和游戏状态持续累积",
    scenario:
      "创建一段萤火虫飞行镜头，动画相机与灯光，并在指定时刻启动粒子系统和记录事件调用。",
    stages: ["录制多属性关键帧", "绑定可追踪动画事件", "验证粒子发射渲染与消亡"],
    clipNames: ["飞行镜头", "事件轨", "萤火粒子"],
    sources: [SOURCES.window, SOURCES.clips, SOURCES.particles],
    artifact:
      "层级与绑定路径、关键帧、曲线、事件时间与调用ID、粒子模块快照、边界、渲染结果和重放日志。",
    opening:
      "Native Animation页把Animation窗口中的曲线、事件和粒子副作用分层记录，避免编辑器预览掩盖循环执行问题。",
  },
  "uan-04": {
    duty: "用按钮、门、参数、过渡和场景交互建立非角色Mecanim状态图",
    question:
      "怎样让门只在合法参数变化时从关闭过渡到开启，并防止重复输入、过渡中断或双重驱动？",
    invariant:
      "一个权威状态机驱动门属性，参数变化可追溯，过渡条件、时长与中断策略显式",
    fault: "脚本和Animator同时写门的Transform，导致过渡末端抖动且无法确定权威状态",
    scenario:
      "原型场景中按钮触发门开关，团队记录每次参数写入、状态进入、过渡条件和场景碰撞。",
    stages: ["创建按钮与门剪辑", "组装参数化状态图", "执行交互并检查中断"],
    clipNames: ["按钮按下", "门开启", "门关闭"],
    sources: [SOURCES.controller, SOURCES.transitions, SOURCES.animator],
    artifact:
      "场景对象、剪辑、控制器、状态、参数、过渡条件、退出时间、中断设置、写入者和运行状态日志。",
    opening:
      "非角色Mecanim页把Animator Controller当成可执行状态图；状态节点、参数和过渡条件共同决定属性权威。",
  },
  "uan-05": {
    duty: "贯通骨骼角色导入、Avatar、重定向、根运动与偏移修正",
    question:
      "怎样证明同一人形剪辑在两个Avatar上保持语义，并让根运动与角色控制器不重复位移？",
    invariant:
      "骨骼映射有效，Avatar姿势可核对，根位移只有一个权威来源，偏移修正有前后轨迹",
    fault: "Animator应用Root Motion，角色控制脚本又积分速度，角色每帧发生双倍位移",
    scenario:
      "把一段行走剪辑重定向到两个比例不同的人形角色，比较脚底、朝向、根轨迹和控制器位移。",
    stages: ["验证骨骼Avatar与姿势", "重定向并采样接触点", "选择根运动权威和修正偏移"],
    clipNames: ["源角色行走", "目标角色重定向", "根轨迹"],
    sources: [SOURCES.retarget, SOURCES.root, SOURCES.animator],
    artifact:
      "骨骼映射、Avatar验证、源目标姿势、剪辑设置、根曲线、Apply Root Motion、控制器轨迹和偏移修正。",
    opening:
      "角色基础页把骨骼、Avatar、剪辑和场景位移拆开；重定向复用运动语义，不等于自动解决接触与根轨迹。",
  },
  "uan-06": {
    duty: "用维度、浮点参数、脚本映射与测试构建可控角色Blend Tree",
    question:
      "怎样把输入速度和方向映射到Blend Tree坐标，并证明阈值、阻尼和剪辑速度不会造成跳变？",
    invariant:
      "参数单位与范围固定，1D或2D维度选择有依据，输入到权重和最终运动的映射可采样",
    fault: "脚本传入世界速度而Blend Tree按归一化局部速度设阈值，权重长期饱和",
    scenario:
      "构建待机、行走、奔跑的1D树，再加入方向形成2D测试，记录五组边界输入的权重和根速度。",
    stages: ["选择维度剪辑与阈值", "映射脚本浮点和阻尼", "采样边界与过渡结果"],
    clipNames: ["待机行走跑", "方向二维树", "脚本输入轨"],
    sources: [SOURCES.blendTree, SOURCES.animator, SOURCES.transitions],
    artifact:
      "剪辑速度、Blend Type、参数单位、阈值、二维坐标、阻尼、输入样本、权重结果、根速度和边界测试。",
    opening:
      "高级角色页把Blend Tree视作参数到混合权重的函数；画面顺滑必须能追到单位、阈值和输入空间。",
  },
  "uan-07": {
    duty: "分别建立Blend Shape权重、Humanoid IK目标与MovieTexture到VideoPlayer迁移链",
    question:
      "怎样让形变、IK和视频各自使用正确资产与更新阶段，并明确MovieTexture的现代替代路径？",
    invariant:
      "Blend Shape索引与网格匹配，IK在有效Avatar和IK Pass下运行，视频源与输出目标可追溯",
    fault: "把2015年的MovieTexture代码直接用于Unity 6，既没有VideoPlayer迁移也没有平台格式验证",
    scenario:
      "角色播放面部形变并伸手触及目标，场景材质同时播放视频；三条表现链分别注入资产错配。",
    stages: ["验证形变网格与权重", "配置Avatar IK目标和回调", "迁移视频源播放器与输出"],
    clipNames: ["面部权重", "手部IK", "视频输出"],
    sources: [SOURCES.blendShapes, SOURCES.ik, SOURCES.video],
    artifact:
      "Blend Shape名称索引与权重、Avatar、IK Pass、目标与权重、VideoClip或URL、VideoPlayer输出、平台测试和迁移说明。",
    opening:
      "高级表现页不把三种技术揉成一条动画：形变修改网格权重，IK求解骨骼目标，视频由独立解码时钟驱动纹理输出。",
  },
  finalReview: {
    title: "《Unity Animation Essentials》综合复核：时间、状态、空间与输出",
    duty: "用一个场景串联代码动画、Sprite、Animation窗口、Mecanim、角色、Blend Tree及高级表现",
    question:
      "怎样证明七章动画资产在编辑器预览与运行构建中共享一致的时间、状态、空间和输出合同？",
    invariant:
      "资产版本、绑定路径、时钟、参数、状态、Avatar、根运动和平台输出形成可重放证据链",
    fault: "演示只录制一次编辑器成功画面，没有低高帧率、冷启动、状态中断或目标平台验证",
    scenario:
      "综合场景从Sprite提示开始，按钮开门，角色经Blend Tree进入房间，触发粒子、IK、表情和视频播放。",
    stages: ["锁定资产时钟与空间基准", "运行状态角色和表现链", "跨帧率平台复核并回退"],
    clipNames: ["场景主时间轴", "角色状态轨", "表现输出轨"],
    sources: [
      SOURCES.clips,
      SOURCES.controller,
      SOURCES.root,
      SOURCES.blendTree,
      SOURCES.video,
    ],
    artifact:
      "34组条目检查、资产依赖、关键帧、参数日志、状态轨、Avatar与根轨迹、粒子形变IK视频结果和跨平台测试。",
    opening:
      "综合复核要求同一输入可重放到同一可解释状态；单次画面好看不能替代时钟、状态权威、空间基准与目标平台证据。",
  },
};

const manifestDocument = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const previousManifest = manifestDocument.books[BOOK];
if (!previousManifest) throw new Error(`缺少 ${BOOK} fidelity manifest`);
const unitTitles = previousManifest.units.map((unit) => unit.title);

function toPascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
    .join("");
}

function mechanismFor(concept) {
  const rules = [
    [
      /Understanding animation|Frames|Key frames/,
      ["把属性变化表示成可采样时间函数", "属性、时间、关键帧和插值", "帧等同固定时长"],
    ],
    [
      /Rigid body|Rigged|bone-based|Sprite animation|Physics-based|Morph animation|Video animation|Particle animation|Programmatic/,
      ["按被驱动对象和求解方式分类动画", "资产、属性、时钟和权威写入者", "类型名称代替运行合同"],
    ],
    [
      /code|deltaTime|Movement|tweens|animation curves|Rotating|coroutines|Material|Camera shaking/,
      ["用经过时间、曲线或协程推进声明属性", "deltaTime、端点、曲线和重置轨迹", "每帧固定增量或双重写入"],
    ],
    [
      /Sprites|sprite atlas|importing|configuration|Individual sprites/,
      ["把纹理切片为带轴心和身份的Sprite资产", "导入设置、切片矩形、轴心和图集", "切片顺序隐式变化"],
    ],
    [
      /Animation with sprites|too slow|too fast|looping|wrong order/,
      ["用帧序列、采样率与循环设置生成剪辑", "关键帧顺序、Samples和loopTime", "预览掩盖运行引用"],
    ],
    [
      /Animation window|fly-through|multiple objects|Invoking functions/,
      ["在绑定路径上记录属性曲线与事件", "层级、曲线、事件时间和调用ID", "循环事件产生非幂等副作用"],
    ],
    [
      /Particle Systems|firefly|global properties|Emitter shape|emission rate|Particle Renderer|velocity|color|disappearance/,
      ["由模块组合粒子生成、运动、渲染与生命周期", "模块快照、发射数、边界和消亡时间", "只凭静态截图调粒子"],
    ],
    [
      /prototyping assets|button and door|Mecanim|transitions|parameters|door-open|scene interactions/,
      ["用参数和过渡组织非角色状态机", "状态、参数、条件、退出时间和中断", "脚本与Animator双重驱动"],
    ],
    [
      /rigged characters|Importing rigged|Avatars|retargeting|Retargeting animations/,
      ["以Avatar骨骼对应复用人形运动语义", "骨骼映射、姿势、Avatar验证和接触点", "重定向自动修复比例差"],
    ],
    [
      /Root motion|motion offsets/,
      ["从剪辑根曲线选择场景位移权威", "根轨迹、Apply Root Motion和控制器位移", "动画与脚本重复位移"],
    ],
    [
      /controllable character|Blend Trees|Dimensions|Mapping floats|script with Blend Tree|Scripting with Mecanim|Testing Mecanim/,
      ["把输入参数映射为剪辑混合权重", "维度、阈值、单位、样本和权重", "参数空间与脚本单位不一致"],
    ],
    [
      /Blend Shapes/,
      ["按名称索引驱动SkinnedMeshRenderer形变权重", "网格、索引、权重端点和预览", "模型更换后索引漂移"],
    ],
    [
      /Inverse Kinematics/,
      ["从末端目标反求有效Avatar骨骼姿势", "IK Pass、目标、权重和OnAnimatorIK", "无Avatar仍假定IK生效"],
    ],
    [
      /Movie textures/,
      ["把2015视频纹理流程迁移到VideoPlayer输出", "源、时钟、输出目标和平台格式", "旧MovieTexture代码直接沿用"],
    ],
    [
      /Chapter \d|Summary|总结/,
      ["封闭本章资产、时钟和运行证据", "目录坐标、相邻章节和迁移标签", "跨章步骤任意拼接"],
    ],
  ];
  return (
    rules.find(([pattern]) => pattern.test(concept))?.[1] ?? [
      "把目录条目转成动画状态变化",
      "资产、时间、属性、空间和运行结果",
      "编辑器预览代替运行验证",
    ]
  );
}

function termFor(concept, index) {
  const short = concept
    .replace(/^Chapter\s*\d+\.\s*/i, "")
    .split(/[；;：:——]/, 1)[0]
    .trim();
  return short.length > 0 && short.length <= 18 ? short : `动画条目${index + 1}`;
}

function enrichProfile(key, specification, role, unit = null) {
  const chapterPath = PATHS[key];
  const concepts = unit
    ? unit.concepts.map((alternatives) => alternatives[0])
    : unitTitles;
  const title = specification.title ?? unit?.title;
  const normalTrace = [
    `为“${title}”锁定Unity版本、场景、资产GUID、绑定路径、输入和初始状态`,
    `执行${specification.stages[0]}，保存关键帧、参数或空间基准`,
    `推进${specification.stages[1]}，记录采样时间、活动状态和属性写入者`,
    `完成${specification.stages[2]}，交付${specification.artifact}`,
  ];
  const failureTrace = [
    `复用“${title}”相同的Unity版本、场景、资产、输入和初始状态`,
    `只注入动画故障：${specification.fault}`,
    "沿资产导入到运行输出方向定位最早发生时间、状态、空间或绑定偏离的位置",
    `依据“${specification.invariant}”拒绝资产并恢复已知场景快照`,
  ];
  const clips = specification.clipNames.map((name, index) => ({
    name,
    duration: `${(1.2 + index * 0.6).toFixed(1)} s`,
    property:
      index === 0
        ? "Transform / Sprite / BlendShape"
        : index === 1
          ? "Animator parameter / state weight"
          : "Particle / IK / video output",
    from: index === 0 ? "基线属性" : "上游已验证状态",
    to: index === 2 ? "运行输出与证据" : "下一关键状态",
    clock:
      index === 0
        ? "Animation Clip time"
        : index === 1
          ? "Animator normalized time"
          : "runtime or media clock",
  }));
  return {
    key,
    id: unit?.id ?? key,
    officialUnitId: unit?.id ?? null,
    role,
    chapterPath,
    componentBase: toPascal(path.basename(chapterPath)),
    concepts,
    title,
    ...specification,
    normalTrace,
    failureTrace,
    clips,
  };
}

const profiles = [
  enrichProfile("learningMap", PAGE_SPECS.learningMap, "learning-map"),
  ...previousManifest.units.map((unit) =>
    enrichProfile(unit.id, PAGE_SPECS[unit.id], "chapter", unit),
  ),
  enrichProfile("finalReview", PAGE_SPECS.finalReview, "final-review"),
];
if (profiles.length !== 9)
  throw new Error("《Unity Animation Essentials》课程必须恰好为9页");

function objectivesBlock(profile) {
  return `<Objectives>

- 能说明“${profile.title}”如何${profile.duty}，并明确2015原书工作流与Unity 6现行资料的时代边界
- 能先预测“${profile.question}”的时间或状态轨迹，再沿资产、绑定、时钟、状态、空间和输出逐阶段核对
- 能注入“${profile.fault}”，用“${profile.invariant}”决定接受、修正或拒绝动画资产

</Objectives>`;
}

function sourceSection(profile) {
  const links = profile.sources
    .map((url, index) => `[技术核对 ${index + 1}](${url})`)
    .join("、");
  return `## 为什么从这个动画任务开始

${profile.opening} “${profile.title}”使用的贯穿任务是：${profile.scenario} 操作前先预测哪个采样点或状态会先变化，播放后再补理由不算预测。

本页围绕“${profile.question}”建立正常、故障与恢复路径。只有“${profile.title}”保持“${profile.invariant}”并交付${profile.artifact}，编辑器预览或运行画面才构成动画证据。

## 书目、34组条目与引擎时代

“${profile.title}”以[Packt官方书页](${SOURCES.catalog})核对Alan Thorn著、2015年6月24日、第一版、200页、ISBN 9781782174813及七个内容章节和索引；[出版社授权预览](${SOURCES.preview})为“${profile.title}”提供前言与详细目录交叉核对，[中文馆藏](${SOURCES.chinese})核对中文版ISBN 9787302442660。课程分母为七章合并后的34组公开目录条目。

“${profile.title}”仅依据授权样章和公开目录限定范围，不逐段改写原文；解释、状态模型、交互、练习与答案均为独立教学重写。合并目录组保留组内所有英文小节名，不能用一个现代主题替换。

“${profile.title}”另以${links}核对现行技术事实。Mecanim、MovieTexture与2015编辑器步骤保留为原书时代轨；Unity 6的Animator、Blend Tree、Animation窗口和VideoPlayer只作稳定机制核验或迁移说明，不能反向证明2015年的面板位置、默认值和平台支持。`;
}

const paragraphPatterns = [
  (profile, concept, mechanism, evidence, caution, index) =>
    `在“${profile.title}”的坐标${index + 1}中，${concept}用于${mechanism}；先锁定场景与资产，再用${evidence}复核，出现${caution}时不得提交。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `${concept}进入“${profile.title}”后要回答第${index + 1}张采样卡：它怎样${mechanism}、改变哪个属性、由哪些${evidence}证明，并如何排除${caution}。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `围绕“${profile.question}”，条目${index + 1}把${concept}解释为${mechanism}；复核者先读取${evidence}再判断动画，不能接受${caution}。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `对“${profile.title}”而言，${concept}的最小合同是${mechanism}，第${index + 1}次检查保存${evidence}；若产生${caution}，就回到资产或状态上游。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `第${index + 1}个公开条目组${concept}服务于${profile.duty}，需要以${evidence}呈现${mechanism}；${caution}会破坏“${profile.invariant}”。`,
  (profile, concept, mechanism, evidence, caution) =>
    `学习者在“${profile.title}”中讨论${concept}前预测${mechanism}会改变哪项时间或空间状态，再读取${evidence}；观察到${caution}时保留失败轨迹。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `${profile.scenario} 在条目${index + 1}处理${concept}时，要把${mechanism}写进资产合同，把${evidence}写进运行记录，并把${caution}写进故障样本。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `“${profile.invariant}”限定了${concept}的适用域：坐标${index + 1}只能通过${mechanism}推进，由${evidence}复核，而${caution}构成拒绝条件。`,
];

function conceptsSection(profile) {
  return `## 公开目录条目与动画机制

${profile.concepts
  .map((concept, index) => {
    const [mechanism, evidence, caution] = mechanismFor(concept);
    const term = termFor(concept, index);
    const definition = `${term}对应目录条目组“${concept}”，在“${profile.title}”中用于${mechanism}，并受Unity时代、资产、时钟、状态与空间边界约束。`;
    const paragraph = paragraphPatterns[index % paragraphPatterns.length](
      profile,
      concept,
      mechanism,
      evidence,
      caution,
      index,
    );
    return `### ${concept}

<Term def=${JSON.stringify(definition)}>${term}</Term>

**公开坐标 ${index + 1}/${profile.concepts.length}。** ${paragraph}`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 先预测，再操作三个动画实验

<Callout type="info" title="先写出哪个采样点或状态会先变化">
  对“${profile.title}”先选择版本化场景、动画资产、输入与预期属性，再操作时间采样、状态轨迹和运行时门；结果与预测不一致时应修改动画假设，不删除失败运行。
</Callout>

<Stepper>
  <Step title="1. 时间轴与属性采样">
    切换“${profile.clipNames.join("、")}”并逐步移动采样点，核对时钟、属性端点和当前进度怎样连接“${profile.title}”。

    <${profile.componentBase}TimelineSampler />
  </Step>
  <Step title="2. 正常与故障状态轨迹">
    保持“${profile.scenario}”不变，切换正常和故障模式，定位“${profile.fault}”最先破坏资产、状态、时间或空间的位置。

    <${profile.componentBase}StateTraceLab />
  </Step>
  <Step title="3. 运行时门与证据包">
    分别切换资产绑定、时钟一致、权威写入与目标平台验证，展开${profile.artifact}后决定是否提交。

    <${profile.componentBase}RuntimeGateLab />
  </Step>
</Stepper>

<Callout type="trap" title="本页动画故障：${profile.fault}">
  “${profile.title}”遇到该故障时应保持Unity版本、场景、资产、输入和初始状态不变，沿导入到输出方向寻找最早偏离；用最终画面看似正常掩盖中间双写或错绑，不能证明“${profile.invariant}”。
</Callout>

<Callout type="trap" title="编辑器预览不等于目标构建">
  ${profile.scenario} 在Animation或Animator窗口能播放，只证明当前编辑器状态可预览；“${profile.title}”仍需冷启动、不同帧率、状态中断和目标平台输出证据。
</Callout>

<Callout type="trap" title="Unity 6不能倒填2015步骤">
  “${profile.title}”引用现行手册是为了核对稳定机制和迁移边界，不能把当前菜单、包、默认导入器或VideoPlayer宣称成原书原有内容。
</Callout>`;
}

function protocolSection(profile) {
  return `## ${profile.title}的可重放动画协议

| 阶段 | 动画动作 | 必留证据 | 拒绝条件 |
| --- | --- | --- | --- |
${profile.stages
  .map(
    (stage, index) =>
      `| ${stage} | 在“${profile.title}”执行${stage}，只允许声明组件写入属性 | ${index === 0 ? "Unity版本、场景、资产GUID与初始状态" : index === 1 ? "关键帧、时钟、参数、状态与空间轨迹" : "运行截图、平台输出、迁移与回退记录"} | ${index === 0 ? "资产或绑定不可追溯" : index === 1 ? profile.fault : "无法重放或恢复基线"} |`,
  )
  .join("\n")}

\`\`\`yaml
unit: ${JSON.stringify(profile.id)}
question: ${JSON.stringify(profile.question)}
scenario: ${JSON.stringify(profile.scenario)}
clips: ${JSON.stringify(profile.clipNames)}
stages: ${JSON.stringify(profile.stages)}
invariant: ${JSON.stringify(profile.invariant)}
fault: ${JSON.stringify(profile.fault)}
evidence: ${JSON.stringify(profile.artifact)}
reset: restore_clip_frame_mode_step_gates_and_artifact
\`\`\`

该协议要求“${profile.title}”在相同Unity版本、场景、资产、输入和初始状态下重放。重置后若剪辑、采样点、轨迹模式、验收门或证据显示没有回到基线，交互状态已经污染比较，不能作为动画证据。`;
}

function synthesisSection(profile) {
  const glossary = profile.concepts
    .map((concept, index) => {
      const [mechanism] = mechanismFor(concept);
      const term = termFor(concept, index);
      return `  <GlossaryItem term=${JSON.stringify(term)}>对应“${concept}”；在“${profile.title}”中用于${mechanism}，需要连接Unity时代、资产、时钟、状态、空间与输出。</GlossaryItem>`;
    })
    .join("\n");
  const conceptList = profile.concepts
    .map((concept, index) => {
      const [mechanism, evidence] = mechanismFor(concept);
      return `${index + 1}. “${profile.title}”的${concept}：以“${mechanism}”解释动画作用，用“${evidence}”提供复核。`;
    })
    .join("\n");
  return `## 本页回顾

掌握“${profile.title}”不是记住编辑器点击顺序，而是能围绕“${profile.question}”重建动画状态，并用“${profile.invariant}”拒绝“${profile.fault}”。最终交付为${profile.artifact}

## 练习与答案

<Exercises>

1. **问题 1：动画合同。** “${profile.title}”为什么必须先声明Unity版本、资产、时钟、空间与权威写入者？

<Answer>
  ${profile.scenario} 若这些条件不固定，相同输入可能读取不同资产、时钟或状态；“${profile.title}”先声明合同，才能把画面连接到可验证属性，并防止预览成功掩盖运行差异。
</Answer>

2. **问题 2：目录逐项覆盖。** 怎样证明公开条目组已经进入机制、交互和练习？

<Answer>
${conceptList}
</Answer>

3. **问题 3：故障恢复。** 怎样证明“${profile.fault}”已经被修正？

<Answer>
  为“${profile.title}”复用同一Unity版本、场景、资产、输入和初始状态，重放正常路径后只注入“${profile.fault}”；记录最早偏离点，撤销故障并再次运行。只有时间采样、状态轨迹、空间结果和${profile.artifact}重新满足“${profile.invariant}”，修正才可提交。
</Answer>

</Exercises>

## 名词解释

<Glossary>
${glossary}
</Glossary>

<Attribution
  mode="independent-rewrite"
  sourceBasis="authorized-sample"
  workTitle="Alan Thorn《Unity Animation Essentials》"
  adaptedUrl="${SOURCES.catalog}"
/>`;
}

function wrapperSource(profile) {
  const model = {
    unitId: profile.id,
    title: profile.title,
    question: profile.question,
    concepts: profile.concepts,
    clips: profile.clips,
    normalTrace: profile.normalTrace,
    failureTrace: profile.failureTrace,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
    gates: [
      {
        label: "资产绑定",
        detail: `“${profile.title}”的场景、剪辑、控制器、Avatar或媒体源都有稳定身份。`,
      },
      {
        label: "时钟一致",
        detail: `“${profile.title}”明确使用Clip、Animator、deltaTime、物理或媒体时钟。`,
      },
      {
        label: "权威写入",
        detail: `“${profile.title}”的每个属性只有一个权威驱动者，脚本与Animator不双写。`,
      },
      {
        label: "平台验证",
        detail: `“${profile.title}”经过冷启动、边界输入、不同帧率和目标构建复核。`,
      },
    ],
  };
  return `"use client";

import {
  UnityAnimationEvidenceLab,
  type UnityAnimationEvidenceModel,
} from "./unity-animation-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} satisfies UnityAnimationEvidenceModel;

export function ${profile.componentBase}TimelineSampler() {
  return <UnityAnimationEvidenceLab model={model} view="timeline-sampler" />;
}

export function ${profile.componentBase}StateTraceLab() {
  return <UnityAnimationEvidenceLab model={model} view="state-trace" />;
}

export function ${profile.componentBase}RuntimeGateLab() {
  return <UnityAnimationEvidenceLab model={model} view="runtime-gate" />;
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
  const filePath = path.join(CONTENT_ROOT, `${profile.chapterPath}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`缺少页面：${filePath}`);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const slug = path.basename(profile.chapterPath);
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
import { ${profile.componentBase}TimelineSampler, ${profile.componentBase}StateTraceLab, ${profile.componentBase}RuntimeGateLab } from "@/components/mdx/${BOOK}/v2/${slug}";

${objectivesBlock(profile)}

${sourceSection(profile)}

${conceptsSection(profile)}

${experimentSection(profile)}

${protocolSection(profile)}

${synthesisSection(profile)}
`;
  const data = {
    ...parsed.data,
    title: profile.title,
    description: `${profile.duty}；用时间采样、状态轨迹和运行时门完成独立复核。`,
    demo: true,
    math: false,
    sourceUrl: SOURCES.catalog,
    qualityVersion: 2,
    practiceMode: "simulation",
    sourceMode: "independent-rewrite",
  };
  if (profile.officialUnitId)
    data.officialUnitId = profile.officialUnitId;
  else delete data.officialUnitId;
  await writeFormatted(
    filePath,
    matter.stringify(body.trimStart(), data),
    "mdx",
  );
  await writeFormatted(
    path.join(COMPONENT_ROOT, `${slug}.tsx`),
    wrapperSource(profile),
    "typescript",
  );
}

fs.mkdirSync(COMPONENT_ROOT, { recursive: true });
for (const profile of profiles) await transformPage(profile);

manifestDocument.books[BOOK] = {
  ...previousManifest,
  edition:
    "Alan Thorn著《Unity Animation Essentials》，Packt Publishing，2015年6月24日，第一版，200页，ISBN 9781782174813；中文版ISBN 9787302442660",
  sourceKind:
    "official-publisher-complete-catalog-authorized-preview-and-current-unity-primary-documentation",
  sourceUrl: SOURCES.catalog,
  secondarySourceUrls: [
    SOURCES.preview,
    SOURCES.chinese,
    SOURCES.clips,
    SOURCES.window,
    SOURCES.animator,
    SOURCES.controller,
    SOURCES.transitions,
    SOURCES.deltaTime,
    SOURCES.curve,
    SOURCES.sprite,
    SOURCES.particles,
    SOURCES.root,
    SOURCES.retarget,
    SOURCES.blendTree,
    SOURCES.blendShapes,
    SOURCES.ik,
    SOURCES.video,
  ],
  verifiedAt: "2026-07-30",
  disclosureNote:
    "Packt官方书页确认Alan Thorn著、2015年6月24日、第一版、200页、ISBN 9781782174813及七个内容章节和索引；出版社授权预览交叉核对前言与详细目录，中文馆藏核对ISBN 9787302442660。课程按原书七章的34组公开目录条目完整覆盖，另设学习地图与综合复核，共9页。Mecanim、MovieTexture和2015编辑器步骤保留为历史轨；Unity 6手册只核对剪辑、Animator、Avatar、Blend Tree、IK等稳定机制及VideoPlayer迁移，不倒填原书。内容均为独立教学重写。",
  units: previousManifest.units.map((unit) => ({
    ...unit,
    chapterPath: PATHS[unit.id],
  })),
  sourceAccess: "authorized-sample",
  defaultSourceMode: "independent-rewrite",
  unitMappingEvidence: "quality/unity-animation-v2-profiles.json",
  factSourcePolicy:
    "Packt书页和授权预览限定2015版34组目录；动画剪辑、窗口、Animator、状态过渡、deltaTime、Sprite、粒子、Avatar重定向、根运动、Blend Tree、Blend Shape、IK和视频分别以Unity官方手册与API核对。现行资料只说明稳定机制和迁移边界。",
};
const manifestOutput = `${JSON.stringify(manifestDocument, null, 2)}\n`;
if (fs.readFileSync(MANIFEST_PATH, "utf8") !== manifestOutput)
  fs.writeFileSync(MANIFEST_PATH, manifestOutput);

await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      book: BOOK,
      generatedAt: "2026-07-30",
      outlineSources: [SOURCES.catalog, SOURCES.preview, SOURCES.chinese],
      technicalSources: [
        SOURCES.clips,
        SOURCES.window,
        SOURCES.animator,
        SOURCES.controller,
        SOURCES.transitions,
        SOURCES.deltaTime,
        SOURCES.curve,
        SOURCES.sprite,
        SOURCES.particles,
        SOURCES.root,
        SOURCES.retarget,
        SOURCES.blendTree,
        SOURCES.blendShapes,
        SOURCES.ik,
        SOURCES.video,
      ],
      officialUnits: previousManifest.units.length,
      officialCatalogEntries: previousManifest.units.reduce(
        (sum, unit) => sum + unit.concepts.length,
        0,
      ),
      coursePages: profiles.length,
      interactiveViews: profiles.length * 3,
      pages: profiles.map((profile) => ({
        chapterPath: profile.chapterPath,
        title: profile.title,
        role: profile.role,
        officialUnitId: profile.officialUnitId,
        concepts: profile.concepts,
        question: profile.question,
        invariant: profile.invariant,
        fault: profile.fault,
        artifact: profile.artifact,
        technicalSources: profile.sources,
      })),
    },
    null,
    2,
  )}\n`,
  "json",
);

console.log(
  `已重建 ${profiles.length} 页，覆盖 ${previousManifest.units.reduce((sum, unit) => sum + unit.concepts.length, 0)} 组公开目录条目，生成 ${profiles.length * 3} 个交互视图。`,
);
