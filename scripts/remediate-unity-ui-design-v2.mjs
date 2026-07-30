import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "unity-ui-design";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx/unity-ui-design/v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/unity-ui-design-v2-profiles.json",
);

const SOURCES = {
  author:
    "https://darkgenesis.zenithmoon.com/announcing-unity-3d-ui-essentials.html",
  preview:
    "https://api.pageplace.de/preview/DT0400.9781783553624_A24173589/preview-9781783553624_A24173589.pdf",
  chinese: "https://e.dangdang.com/touch/products/1901049187.html",
  compare:
    "https://docs.unity3d.com/6000.0/Documentation/Manual/UI-system-compare.html",
  rectTransform:
    "https://docs.unity3d.com/Packages/com.unity.ugui@2.0/manual/class-RectTransform.html",
  canvas:
    "https://docs.unity3d.com/Packages/com.unity.ugui@2.0/manual/UICanvas.html",
  canvasScaler:
    "https://docs.unity3d.com/Packages/com.unity.ugui@2.0/manual/script-CanvasScaler.html",
  autoLayout:
    "https://docs.unity3d.com/Packages/com.unity.ugui@2.0/manual/UIAutoLayout.html",
  selectable:
    "https://docs.unity3d.com/Packages/com.unity.ugui@2.0/manual/script-Selectable.html",
  eventSystem:
    "https://docs.unity3d.com/Packages/com.unity.ugui@2.0/manual/EventSystem.html",
  messaging:
    "https://docs.unity3d.com/Packages/com.unity.ugui@2.0/manual/MessagingSystem.html",
  raycasters:
    "https://docs.unity3d.com/Packages/com.unity.ugui@2.0/manual/Raycasters.html",
  runtimeEvents:
    "https://docs.unity3d.com/6000.0/Documentation/Manual/UIE-Runtime-Event-System.html",
};

const PATHS = {
  learningMap: "00-guide/uid-official-learning-map",
  "uid-01": "01-foundations/uid-01-looking-back-looking-forward",
  "uid-02": "01-foundations/uid-02-building-layouts",
  "uid-03": "02-controls/uid-03-control-control",
  "uid-04": "02-controls/uid-04-anchors-away",
  "uid-05": "03-space-source/uid-05-screen-world-camera",
  "uid-06": "03-space-source/uid-06-working-with-ui-source",
  "uid-app": "03-space-source/uid-appendix-3d-scene-sample",
  finalReview: "04-review/uid-official-final-review",
};

const PAGE_SPECS = {
  learningMap: {
    title: "《Unity 3D UI Essentials》38组目录学习地图",
    duty: "按uGUI演进、布局、控件、锚点、画布空间、事件源码与3D示例组织38组公开目录条目",
    question:
      "怎样保留2015年Unity 4.6新uGUI的原书语境，同时用现行uGUI资料验证稳定机制并标出UI Toolkit边界？",
    invariant:
      "七个原书单元各有唯一归属，布局、缩放、渲染、射线和事件路径可复现，现代UI系统不倒填原书",
    fault: "把Unity 6的UI Toolkit推荐、包结构和当前菜单直接写成2015年原书步骤",
    scenario:
      "团队接手一套2015年uGUI示例，先复原RectTransform、Canvas和EventSystem合同，再登记Unity 6中的继续适用点与迁移边界。",
    stages: ["锁定目录与UI时代", "贯通布局渲染和事件", "执行多分辨率复核"],
    panelNames: ["全书目录面板", "系统边界提示", "发布证据栏"],
    sources: [
      SOURCES.author,
      SOURCES.preview,
      SOURCES.compare,
      SOURCES.eventSystem,
    ],
    artifact:
      "38组条目映射、2015与现行系统标签、层级、锚点、布局所有权、画布模式、事件路由、分辨率矩阵、迁移与回退说明。",
    opening:
      "学习地图按原书六章加附录推进，不把UI Toolkit反写成2015年的主题；现行资料只验证uGUI仍成立的布局、画布和事件合同。",
  },
  "uid-01": {
    duty: "从旧GUI控件、样式和事件过渡到RectTransform、Canvas、UnityEvent、可扩展控件与动画",
    question:
      "怎样解释旧即时GUI与新GameObject组件式uGUI的状态、布局和事件差异，而不混淆两个时代的接口？",
    invariant:
      "每个控件的层级、布局矩形、视觉组件、交互状态和事件接收者都能追到同一版本化场景",
    fault:
      "继续用每帧即时绘制的假设解释uGUI，导致状态、层级和序列化事件的所有权不清",
    scenario:
      "把旧版设置面板改造成2015年uGUI场景，逐项记录控件分组、焦点、皮肤、RectTransform、Canvas和UnityEvent。",
    stages: [
      "对照旧GUI状态与布局",
      "建立Canvas和RectTransform层级",
      "验证事件扩展与动画",
    ],
    panelNames: ["设置面板", "焦点控件", "事件反馈条"],
    sources: [
      SOURCES.author,
      SOURCES.rectTransform,
      SOURCES.canvas,
      SOURCES.eventSystem,
    ],
    artifact:
      "旧新GUI对照、GameObject层级、RectTransform、Canvas、视觉组件、Selectable状态、UnityEvent监听和动画状态记录。",
    opening:
      "第一章的重点不是把旧API换一个名字，而是看见uGUI把布局、视觉、交互与事件拆成可序列化组件。",
  },
  "uid-02": {
    duty: "贯通RectTransform、Canvas组件、自动布局、尺寸适配、遮罩、缩放与EventSystem",
    question:
      "怎样确定锚点、Layout Group、Fitter与Canvas Scaler的唯一尺寸写入者，并让输入路由不受重排破坏？",
    invariant:
      "同一RectTransform属性只有一个权威布局写入者，缩放策略有参考分辨率，射线目标与可见层级一致",
    fault:
      "Layout Group与Content Size Fitter循环写入同一尺寸，编辑器预览稳定而运行时持续重建",
    scenario:
      "构建可滚动商品栏，在横竖屏切换中检查网格、内容尺寸、遮罩、Canvas Scaler和点击目标。",
    stages: [
      "声明层级和尺寸所有权",
      "组合布局遮罩与缩放",
      "追踪输入射线和事件",
    ],
    panelNames: ["商品网格", "滚动视口", "缩放基准条"],
    sources: [
      SOURCES.rectTransform,
      SOURCES.canvas,
      SOURCES.canvasScaler,
      SOURCES.autoLayout,
      SOURCES.eventSystem,
    ],
    artifact:
      "RectTransform矩阵、Canvas与Renderer层级、布局输入输出、Fitter所有权、遮罩边界、缩放样本和事件射线路径。",
    opening:
      "布局页把自动重排视作尺寸依赖图；任何组件写宽高前，都必须说明输入、输出以及是否与父子布局循环。",
  },
  "uid-03": {
    duty: "把文本、图像、Button、Selectable、Toggle、Slider、ScrollRect、Mask、导航与着色器编成控件状态链",
    question:
      "怎样证明控件在视觉状态、选择状态、导航状态和事件输出上保持一致，并覆盖鼠标、键盘和触摸？",
    invariant:
      "控件可见状态、Selectable状态、导航邻接、交互命中和事件值指向同一对象身份",
    fault:
      "视觉上禁用按钮但Selectable仍可导航和触发，键盘用户进入不可见或无效状态",
    scenario:
      "实现音量设置页，组合文本、切片图、按钮、Toggle、Slider和滚动容器，并逐输入方式验证。",
    stages: [
      "建立视觉与交互状态",
      "连接控件值和动态事件",
      "验证遮罩导航与材质",
    ],
    panelNames: ["音量滑块", "开关组", "导航焦点环"],
    sources: [
      SOURCES.selectable,
      SOURCES.autoLayout,
      SOURCES.eventSystem,
      SOURCES.raycasters,
    ],
    artifact:
      "控件层级、图像类型、文本效果、Selectable状态图、导航邻接表、事件值、遮罩命中和输入方式测试。",
    opening:
      "控件页不以截图判定正确；视觉、选择、导航、射线和回调五条状态必须对齐，尤其要保留非指针输入证据。",
  },
  "uid-04": {
    duty: "用锚点、轴心、拉伸与Canvas Scaler三种模式建立多分辨率布局选择",
    question:
      "怎样从产品约束选择固定像素、按屏幕缩放或物理尺寸，而不是靠拖动到某一分辨率看起来合适？",
    invariant:
      "锚点归一坐标、轴心、偏移、参考分辨率、Match和安全区均被记录并在边界视口复核",
    fault: "只测试16:9参考分辨率，超宽屏和刘海竖屏中的按钮漂出安全区",
    scenario:
      "为HUD固定四角按钮、拉伸中央状态栏，并比较三种Canvas Scaler模式在手机与桌面的结果。",
    stages: [
      "声明锚点轴心和偏移",
      "选择缩放模式与参考值",
      "覆盖宽高比和安全区",
    ],
    panelNames: ["左上状态牌", "底部拉伸栏", "中央操作键"],
    sources: [SOURCES.rectTransform, SOURCES.canvasScaler, SOURCES.canvas],
    artifact:
      "Anchor Min/Max、Pivot、offset、参考分辨率、Match值、物理单位、宽高比矩阵、安全区截图和选择理由。",
    opening:
      "锚点页把响应式布局还原为父矩形中的归一坐标与偏移；缩放模式解决的是度量政策，不能替代正确锚定。",
  },
  "uid-05": {
    duty: "比较Screen Space Overlay、Screen Space Camera与World Space的渲染和事件摄像机合同",
    question:
      "怎样为HUD、相机平面和世界血条选择Canvas模式，并证明深度、比例、朝向和事件摄像机一致？",
    invariant:
      "渲染相机、事件相机、Canvas模式、排序、世界尺度和目标对象形成明确的一对一映射",
    fault:
      "World Space Canvas使用错误Event Camera，画面可见但射线从另一相机发出而无法点击",
    scenario:
      "同时制作屏幕HUD、相机空间生命条和世界空间展柜标签，改变FOV、距离与遮挡进行复核。",
    stages: [
      "选择Canvas空间与相机",
      "校准透视深度和世界尺度",
      "验证事件相机与遮挡",
    ],
    panelNames: ["屏幕HUD", "相机生命条", "世界展柜标签"],
    sources: [
      SOURCES.canvas,
      SOURCES.canvasScaler,
      SOURCES.raycasters,
      SOURCES.compare,
    ],
    artifact:
      "Canvas模式、Render Camera、Event Camera、Plane Distance、FOV、排序、世界尺寸、遮挡、射线结果和尺度对照。",
    opening:
      "空间页把“看得见”和“点得到”分开验证：渲染相机决定画面，事件相机与Raycaster决定输入坐标如何命中。",
  },
  "uid-06": {
    duty: "拆解EventSystem循环、事件接口、ExecuteEvents、自定义事件数据与2015年uGUI源码工作流",
    question:
      "怎样从输入模块沿Raycaster、事件数据、接口和处理器重放一次事件，并区分历史源码仓库与现行包？",
    invariant:
      "活动输入模块唯一，Raycaster结果可排序，事件数据类型匹配处理器，源码版本与项目Unity版本一致",
    fault:
      "自定义事件容器复用错误数据类型，同时把2015源码仓库操作当作Unity 6包升级流程",
    scenario:
      "为Roll-a-Ball警报板添加自定义事件，记录Droid与压力板处理器，再复盘源码分叉、同步和回馈边界。",
    stages: [
      "跟踪循环状态与射线",
      "实现类型化事件分发",
      "锁定源码版本和回馈路径",
    ],
    panelNames: ["警报压力板", "Droid接收器", "事件日志"],
    sources: [
      SOURCES.eventSystem,
      SOURCES.messaging,
      SOURCES.raycasters,
      SOURCES.runtimeEvents,
    ],
    artifact:
      "输入模块、PointerEventData、RaycastResult、目标排序、事件接口、ExecuteEvents、自定义数据、处理日志和源码版本说明。",
    opening:
      "源码页先把事件当成可重放消息路由，再讨论扩展；2015年的Bitbucket式源码获取与现行包分发必须分别标注。",
  },
  "uid-app": {
    duty: "为书中3D场景示例锁定工程、相机、光照、碰撞体、Canvas与初始状态",
    question:
      "怎样建立可复现的3D示例基线，使后续世界空间UI和事件实验不是依赖未记录的场景偶然状态？",
    invariant:
      "场景对象、Transform、相机、碰撞层、Canvas和初始交互状态均有版本化快照",
    fault:
      "示例只保存截图，没有记录层级、相机和碰撞层，重开工程后事件目标完全不同",
    scenario:
      "从空场景建立Roll-a-Ball样例基线，保存对象层级、相机、地面、角色、Canvas和首次运行快照。",
    stages: [
      "建立工程与场景层级",
      "校准相机碰撞和Canvas",
      "保存初始状态与重开验证",
    ],
    panelNames: ["场景基线卡", "相机视口", "初始状态栏"],
    sources: [SOURCES.preview, SOURCES.canvas, SOURCES.eventSystem],
    artifact:
      "Unity版本、工程设置、场景层级、Transform、相机、光照、碰撞层、Canvas、输入模块和冷启动截图。",
    opening:
      "附录虽短，却承担实验基线；如果场景状态不可复现，世界空间UI、射线和自定义事件的后续差异都无法归因。",
  },
  finalReview: {
    title: "《Unity 3D UI Essentials》综合复核：布局、空间与事件",
    duty: "用一个响应式3D界面串联布局、控件、锚点、三种Canvas空间、事件路由与源码扩展",
    question:
      "怎样证明38组目录能力在横竖屏、相机变化、输入方式和冷启动中共享一致的UI合同？",
    invariant:
      "层级、锚点、尺寸所有权、缩放、渲染相机、事件相机、导航和处理器形成可重放证据链",
    fault:
      "只验收一张桌面截图，没有窄屏、安全区、键盘导航、世界射线或目标构建记录",
    scenario:
      "综合场景包含响应式HUD、设置面板、世界生命条和警报板，分别用鼠标、触摸与键盘重放。",
    stages: [
      "锁定层级布局与缩放",
      "运行画布空间和事件链",
      "跨视口输入与构建复核",
    ],
    panelNames: ["响应式HUD", "世界生命条", "警报与证据栏"],
    sources: [
      SOURCES.compare,
      SOURCES.rectTransform,
      SOURCES.canvas,
      SOURCES.eventSystem,
      SOURCES.messaging,
    ],
    artifact:
      "38组条目检查、层级、RectTransform、布局所有权、Canvas模式、缩放矩阵、导航、射线、事件日志和目标构建证据。",
    opening:
      "综合复核要求同一输入能沿布局、渲染和事件路径解释；单一参考分辨率的漂亮截图不构成可发布证据。",
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
      /State of play|GUI controls|Common control|Grouping controls|focus|styles|skins|GUI events|Layout controls/,
      [
        "对照即时GUI的绘制调用、分组、焦点、样式与布局状态",
        "绘制顺序、焦点对象、皮肤、事件类型和布局结果",
        "用uGUI组件状态反推旧GUI行为",
      ],
    ],
    [
      /New layouts|Rect Transform|Rect Transforms|Rect Transform component|Dropping Anchor|nail|Stretch/,
      [
        "以父矩形中的归一锚点、轴心和偏移计算UI矩形",
        "Anchor Min/Max、Pivot、offset、父尺寸与运行结果",
        "只在参考分辨率拖出绝对坐标",
      ],
    ],
    [
      /The Canvas|Canvas Renderer|Canvas Groups|Canvas and Cameras|Screen Space|World Space|Render cameras|Event Cameras|perspective/,
      [
        "由Canvas空间、排序、相机和组状态决定渲染与交互边界",
        "Render Mode、相机、排序、透明度、射线与屏幕结果",
        "画面可见就假定事件相机正确",
      ],
    ],
    [
      /Horizontal Layout|Vertical Layout|Grid Layout|Layout Element|Content Size Fitter|Aspect Ratio Fitter/,
      [
        "把最小、首选与弹性尺寸沿布局依赖图分配给子项",
        "布局输入、尺寸写入者、重建次数和最终矩形",
        "多个组件循环写同一宽高",
      ],
    ],
    [
      /Scroll Rect|Masks|Masking|Resolution and scaling|Constant Pixel|Scale with Screen|Constant Physical|Scaling and resolution|constant default|Scaling to my view|physical|Which to choose/,
      [
        "用视口裁剪内容并按产品度量政策缩放Canvas",
        "视口、内容边界、缩放模式、参考分辨率、Match与安全区",
        "以单一16:9截图替代边界矩阵",
      ],
    ],
    [
      /UnityEvent|Raycasting|Input modules|Event Triggers|Event System loop|Controlling state|Raycast Marshalling/,
      [
        "从活动输入模块经Raycaster生成事件数据并选择目标",
        "输入样本、活动模块、RaycastResult排序、目标和事件日志",
        "多个模块或错误相机竞争同一输入",
      ],
    ],
    [
      /Dealing with text|Shadows and effects|Image types|Simple Images|Sliced Images|Tiled Images|Filled Images|RawImage/,
      [
        "由Graphic数据、网格和材质生成文字或图像视觉状态",
        "源资产、Image Type、边框、填充、材质和裁剪结果",
        "拉伸资产掩盖九宫格或像素密度错误",
      ],
    ],
    [
      /Button|Selectable|Grouping toggles|Dynamic event|Sliding opportunities|Navigation|shaders/,
      [
        "把可选择状态、值、导航邻接和视觉过渡绑定到同一控件",
        "Selectable状态、导航表、值变化、回调参数和材质输出",
        "只改变视觉而未同步交互状态",
      ],
    ],
    [
      /health bar|What's in a Canvas|Am I dead yet|Reaching in|gone a bit flat|Going deep|Hang your Canvas|showcase|Troubles with scale|better way|final word/,
      [
        "在屏幕、相机或世界坐标中校准生命条与展柜UI",
        "对象绑定、相机、FOV、距离、深度、尺度、朝向与事件命中",
        "渲染相机与事件相机不一致",
      ],
    ],
    [
      /Working with events|Using a parameter|event interfaces|Executing events|handlers|custom events|event Data|event Interface|static container/,
      [
        "用类型化事件数据和接口把消息派发到明确处理器",
        "事件类型、数据载荷、ExecuteEvents调用、接收者与副作用日志",
        "载荷类型与处理接口不匹配",
      ],
    ],
    [
      /Roll a Ball|Droid script|Alarm plates|Setting up for the big game|initial 3D scene/,
      [
        "在版本化3D场景中连接压力板、角色、相机和UI事件",
        "场景层级、碰撞层、对象身份、初始状态与冷启动轨迹",
        "未保存场景基线而无法归因",
      ],
    ],
    [
      /access to the source|repository|forked|Keeping up to date|version of UI|push it back/,
      [
        "锁定2015源码版本、分叉、同步与项目集成边界",
        "仓库提交、Unity版本、差异补丁、升级记录与回馈说明",
        "把历史源码流程当成现行包升级步骤",
      ],
    ],
    [
      /Control extensibility|Animation/,
      [
        "以组件继承、序列化事件和状态过渡扩展uGUI控件",
        "扩展点、状态、监听器、动画剪辑和运行日志",
        "扩展组件绕开Selectable或事件合同",
      ],
    ],
    [
      /Chapter \d|Appendix|总结/,
      [
        "封闭本单元布局、渲染和事件证据",
        "目录坐标、相邻单元、时代标签与发布结论",
        "跨章步骤任意拼接",
      ],
    ],
  ];
  return (
    rules.find(([pattern]) => pattern.test(concept))?.[1] ?? [
      "把目录条目转成可复现的UI状态变化",
      "层级、矩形、画布、输入、目标和运行结果",
      "编辑器截图代替跨视口验证",
    ]
  );
}

function termFor(concept, index) {
  const short = concept
    .replace(/^Chapter\s*\d+\.\s*/i, "")
    .split(/[；;：:——,]/, 1)[0]
    .trim();
  return short.length > 0 && short.length <= 18 ? short : `UI条目${index + 1}`;
}

function enrichProfile(key, specification, role, unit = null) {
  const chapterPath = PATHS[key];
  const concepts = unit
    ? unit.concepts.map((group) => group.join("；"))
    : unitTitles;
  const title = specification.title ?? unit?.title;
  const normalRoute = [
    `“${title}”采集指针、触摸或导航输入，并固定设备、坐标与时间`,
    `唯一活动Input Module为“${title}”生成类型化事件数据`,
    `Graphic、2D或3D Raycaster按相机、排序和距离返回候选目标`,
    `EventSystem为“${title}”选择首个合法目标并维护选择状态`,
    `ExecuteEvents调用匹配接口，处理器提交${specification.artifact}`,
  ];
  const failureRoute = [
    `“${title}”复用相同设备、坐标、层级、相机和初始状态`,
    `只注入UI故障：${specification.fault}`,
    "输入模块或Raycaster在最早偏离点生成错误候选、顺序或事件数据",
    "目标不可达、重复接收或状态与画面分离，保留完整故障日志",
    `依据“${specification.invariant}”拒绝发布并恢复已知场景快照`,
  ];
  const panelPresets = [
    {
      anchorMin: [0.05, 0.9],
      anchorMax: [0.05, 0.9],
      pivot: [0, 1],
      offset: "+16, -16",
      owner: "固定角点，由RectTransform offset定位",
    },
    {
      anchorMin: [0.08, 0.08],
      anchorMax: [0.92, 0.22],
      pivot: [0.5, 0.5],
      offset: "16 px inset",
      owner: "水平与垂直拉伸，由父矩形分配尺寸",
    },
    {
      anchorMin: [0.5, 0.5],
      anchorMax: [0.5, 0.5],
      pivot: [0.5, 0.5],
      offset: "0, 0",
      owner: "中心锚定，由内容或布局元素声明尺寸",
    },
  ];
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
    normalRoute,
    failureRoute,
    viewports: [
      {
        name: "手机竖屏",
        width: 390,
        height: 844,
        safeInset: 7,
        scaleNote: "窄屏与安全区",
      },
      {
        name: "手机横屏",
        width: 844,
        height: 390,
        safeInset: 5,
        scaleNote: "超宽与短高度",
      },
      {
        name: "桌面窗口",
        width: 1440,
        height: 900,
        safeInset: 2,
        scaleNote: "参考分辨率之外",
      },
    ],
    panels: specification.panelNames.map((name, index) => ({
      name,
      ...panelPresets[index],
    })),
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
  throw new Error("《Unity 3D UI Essentials》课程必须恰好为9页");

function objectivesBlock(profile) {
  return `<Objectives>

- 能说明“${profile.title}”如何${profile.duty}，并明确2015年uGUI原书与Unity 6现行资料的时代边界
- 能先预测“${profile.question}”的布局或事件结果，再沿层级、矩形、画布、相机、射线和处理器逐阶段核对
- 能注入“${profile.fault}”，用“${profile.invariant}”决定接受、修正或拒绝UI发布

</Objectives>`;
}

function sourceSection(profile) {
  const links = profile.sources
    .map((url, index) => `[技术核对 ${index + 1}](${url})`)
    .join("、");
  return `## 为什么从这个UI任务开始

${profile.opening} “${profile.title}”使用的贯穿任务是：${profile.scenario} 操作前先预测哪个矩形、射线目标或事件处理器会变化，运行后再补理由不算预测。

本页围绕“${profile.question}”建立正常、故障与恢复路径。只有“${profile.title}”保持“${profile.invariant}”并交付${profile.artifact}，编辑器画面才构成UI证据。

## 书目、38组条目与UI时代

“${profile.title}”以[作者公告](${SOURCES.author})核对Simon Jackson在2014年发布的《Unity 3D UI Essentials》及其围绕Unity 4.6新UI、动态缩放、效果和世界空间界面的定位；[出版社授权预览](${SOURCES.preview})核对第一版详细目录，[中文版书页](${SOURCES.chinese})核对《Unity UI设计》出版信息。课程分母为六章与附录合并后的38组公开目录条目。

“${profile.title}”只依据作者公告、授权样章和公开目录限定范围，不逐段改写原文；解释、状态模型、交互、练习与答案均为独立教学重写。每个合并目录组保留组内全部英文小节名，不能用一个现代主题替换。

“${profile.title}”另以${links}核对现行技术事实。2015年的旧GUI对照、uGUI初版面板和源码仓库流程保留为原书时代轨；Unity 6的uGUI 2.0与UI系统比较只验证稳定布局、画布和事件机制或说明迁移边界，不能反向证明原书当年的菜单、包和默认值。`;
}

const paragraphPatterns = [
  (profile, concept, mechanism, evidence, caution, index) =>
    `在“${profile.title}”的坐标${index + 1}中，${concept}用于${mechanism}；先锁定场景和层级，再用${evidence}复核，出现${caution}时不得发布。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `${concept}进入“${profile.title}”后要回答第${index + 1}张布局卡：它怎样${mechanism}、改变哪个矩形或目标、由哪些${evidence}证明，并如何排除${caution}。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `围绕“${profile.question}”，条目${index + 1}把${concept}解释为${mechanism}；复核者先读取${evidence}再判断画面，不能接受${caution}。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `对“${profile.title}”而言，${concept}的最小合同是${mechanism}，第${index + 1}次检查保存${evidence}；若产生${caution}，就回到层级、布局或事件上游。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `第${index + 1}个公开条目组${concept}服务于${profile.duty}，需要以${evidence}呈现${mechanism}；${caution}会破坏“${profile.invariant}”。`,
  (profile, concept, mechanism, evidence, caution) =>
    `学习者在“${profile.title}”中讨论${concept}前预测${mechanism}会改变哪项布局或交互状态，再读取${evidence}；观察到${caution}时保留失败轨迹。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `${profile.scenario} 在条目${index + 1}处理${concept}时，要把${mechanism}写进UI合同，把${evidence}写进运行记录，并把${caution}写进故障样本。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `“${profile.invariant}”限定了${concept}的适用域：坐标${index + 1}只能通过${mechanism}推进，由${evidence}复核，而${caution}构成拒绝条件。`,
];

function conceptsSection(profile) {
  return `## 公开目录条目与UI机制

${profile.concepts
  .map((concept, index) => {
    const [mechanism, evidence, caution] = mechanismFor(concept);
    const term = termFor(concept, index);
    const definition = `${term}对应目录条目组“${concept}”，在“${profile.title}”中用于${mechanism}，并受Unity时代、层级、矩形、画布、输入和相机边界约束。`;
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
  return `## 先预测，再操作三个UI实验

<Callout type="info" title="先写出哪个矩形或事件跳会先变化">
  对“${profile.title}”先选择版本化场景、层级、视口、输入与预期目标，再操作布局探针、事件路由和发布门；结果与预测不一致时应修改UI假设，不删除失败运行。
</Callout>

<Stepper>
  <Step title="1. 画布锚点与布局探针">
    切换“${profile.panelNames.join("、")}”以及手机竖屏、横屏和桌面窗口，核对Anchor Min/Max、Pivot、offset与安全区怎样连接“${profile.title}”。

    <${profile.componentBase}LayoutProbe />
  </Step>
  <Step title="2. 正常与故障事件路由">
    保持“${profile.scenario}”不变，切换正常和故障模式，沿Input Module、Raycaster、目标与处理器定位“${profile.fault}”的第一处偏离。

    <${profile.componentBase}EventRouteLab />
  </Step>
  <Step title="3. 多分辨率发布门">
    分别切换层级锚点、布局所有权、事件路由和目标构建验证，展开${profile.artifact}后决定是否提交。

    <${profile.componentBase}ReleaseGateLab />
  </Step>
</Stepper>

<Callout type="trap" title="本页UI故障：${profile.fault}">
  “${profile.title}”遇到该故障时应保持Unity版本、场景、层级、视口、输入和初始状态不变，沿布局到事件方向寻找最早偏离；用最终截图看似正常掩盖双写、错相机或不可导航状态，不能证明“${profile.invariant}”。
</Callout>

<Callout type="trap" title="Game视图截图不等于目标构建">
  ${profile.scenario} 在参考分辨率中看起来正确，只证明一个编辑器视口；“${profile.title}”仍需窄屏、超宽屏、安全区、多输入方式、冷启动和目标平台证据。
</Callout>

<Callout type="trap" title="Unity 6不能倒填2015步骤">
  “${profile.title}”引用现行uGUI和UI系统比较资料是为了核对稳定机制及迁移边界，不能把UI Toolkit、当前包结构或菜单宣称成原书已有内容。
</Callout>`;
}

function protocolSection(profile) {
  return `## ${profile.title}的可重放UI协议

| 阶段 | UI动作 | 必留证据 | 拒绝条件 |
| --- | --- | --- | --- |
${profile.stages
  .map(
    (stage, index) =>
      `| ${stage} | 在“${profile.title}”执行${stage}，只允许声明组件写入布局或状态 | ${index === 0 ? "Unity版本、场景层级、视口与初始状态" : index === 1 ? "RectTransform、Canvas、相机、射线与事件轨迹" : "分辨率矩阵、构建截图、迁移与回退记录"} | ${index === 0 ? "层级或对象身份不可追溯" : index === 1 ? profile.fault : "无法重放或恢复基线"} |`,
  )
  .join("\n")}

\`\`\`yaml
unit: ${JSON.stringify(profile.id)}
question: ${JSON.stringify(profile.question)}
scenario: ${JSON.stringify(profile.scenario)}
panels: ${JSON.stringify(profile.panelNames)}
stages: ${JSON.stringify(profile.stages)}
invariant: ${JSON.stringify(profile.invariant)}
fault: ${JSON.stringify(profile.fault)}
evidence: ${JSON.stringify(profile.artifact)}
reset: restore_viewport_panel_route_step_gates_and_artifact
\`\`\`

该协议要求“${profile.title}”在相同Unity版本、场景、层级、视口、输入和初始状态下重放。重置后若视口、面板、路由模式、步骤、发布门或证据显示没有回到基线，交互状态已经污染比较，不能作为UI证据。`;
}

function synthesisSection(profile) {
  const glossary = profile.concepts
    .map((concept, index) => {
      const [mechanism] = mechanismFor(concept);
      const term = termFor(concept, index);
      return `  <GlossaryItem term=${JSON.stringify(term)}>对应“${concept}”；在“${profile.title}”中用于${mechanism}，需要连接Unity时代、层级、矩形、画布、输入与目标。</GlossaryItem>`;
    })
    .join("\n");
  const conceptList = profile.concepts
    .map((concept, index) => {
      const [mechanism, evidence] = mechanismFor(concept);
      return `${index + 1}. “${profile.title}”的${concept}：以“${mechanism}”解释UI作用，用“${evidence}”提供复核。`;
    })
    .join("\n");
  return `## 本页回顾

掌握“${profile.title}”不是记住编辑器点击顺序，而是能围绕“${profile.question}”重建UI状态，并用“${profile.invariant}”拒绝“${profile.fault}”。最终交付为${profile.artifact}

## 练习与答案

<Exercises>

1. **问题 1：UI合同。** “${profile.title}”为什么必须先声明Unity版本、场景层级、视口、布局写入者、相机与输入模块？

<Answer>
  ${profile.scenario} 若这些条件不固定，相同输入可能读取不同矩形、相机、排序或处理器；“${profile.title}”先声明合同，才能把画面连接到可验证状态，并防止参考分辨率成功掩盖运行差异。
</Answer>

2. **问题 2：目录逐项覆盖。** 怎样证明公开条目组已经进入机制、交互和练习？

<Answer>
${conceptList}
</Answer>

3. **问题 3：故障恢复。** 怎样证明“${profile.fault}”已经被修正？

<Answer>
  为“${profile.title}”复用同一Unity版本、场景、层级、视口、输入和初始状态，重放正常路径后只注入“${profile.fault}”；记录最早偏离点，撤销故障并再次运行。只有布局探针、事件路由、发布门和${profile.artifact}重新满足“${profile.invariant}”，修正才可提交。
</Answer>

</Exercises>

## 名词解释

<Glossary>
${glossary}
</Glossary>

<Attribution
  mode="independent-rewrite"
  sourceBasis="authorized-sample"
  workTitle="Simon Jackson《Unity 3D UI Essentials》"
  adaptedUrl="${SOURCES.author}"
/>`;
}

function wrapperSource(profile) {
  const model = {
    unitId: profile.id,
    title: profile.title,
    question: profile.question,
    concepts: profile.concepts,
    viewports: profile.viewports,
    panels: profile.panels,
    normalRoute: profile.normalRoute,
    failureRoute: profile.failureRoute,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
    gates: [
      {
        label: "层级与锚点",
        detail: `“${profile.title}”的父子层级、Anchor Min/Max、Pivot与offset有版本化记录。`,
      },
      {
        label: "布局所有权",
        detail: `“${profile.title}”的每个尺寸和状态只有一个权威写入者，不发生布局循环。`,
      },
      {
        label: "事件路由",
        detail: `“${profile.title}”的输入模块、Raycaster、相机、目标和处理器可以逐跳重放。`,
      },
      {
        label: "视口与构建",
        detail: `“${profile.title}”经过窄屏、超宽、安全区、多输入方式、冷启动和目标构建复核。`,
      },
    ],
  };
  return `"use client";

import {
  UnityUiEvidenceLab,
  type UnityUiEvidenceModel,
} from "./unity-ui-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies UnityUiEvidenceModel;

export function ${profile.componentBase}LayoutProbe() {
  return <UnityUiEvidenceLab model={model} view="layout-probe" />;
}

export function ${profile.componentBase}EventRouteLab() {
  return <UnityUiEvidenceLab model={model} view="event-route" />;
}

export function ${profile.componentBase}ReleaseGateLab() {
  return <UnityUiEvidenceLab model={model} view="release-gate" />;
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
import { ${profile.componentBase}LayoutProbe, ${profile.componentBase}EventRouteLab, ${profile.componentBase}ReleaseGateLab } from "@/components/mdx/${BOOK}/v2/${slug}";

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
    description: `${profile.duty}；用布局探针、事件路由和多分辨率发布门完成独立复核。`,
    demo: true,
    math: false,
    sourceUrl: SOURCES.author,
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
    "Simon Jackson著《Unity 3D UI Essentials》，Packt Publishing，2015年1月，ISBN 9781783553617；中文版《Unity UI设计》，清华大学出版社，2017年4月，ISBN 9787302460107",
  sourceKind:
    "official-author-announcement-authorized-preview-chinese-edition-page-and-current-unity-primary-documentation",
  sourceUrl: SOURCES.author,
  secondarySourceUrls: [
    SOURCES.preview,
    SOURCES.chinese,
    SOURCES.compare,
    SOURCES.rectTransform,
    SOURCES.canvas,
    SOURCES.canvasScaler,
    SOURCES.autoLayout,
    SOURCES.selectable,
    SOURCES.eventSystem,
    SOURCES.messaging,
    SOURCES.raycasters,
    SOURCES.runtimeEvents,
  ],
  verifiedAt: "2026-07-30",
  disclosureNote:
    "作者公告确认Simon Jackson围绕Unity 4.6新UI、动态缩放、效果与世界空间UI编写本书；出版社授权预览交叉核对详细目录，中文版书页核对中文出版信息。课程按原书六章与附录的38组公开目录条目完整覆盖，另设学习地图与综合复核，共9页。旧GUI对照、2015 uGUI面板与源码仓库流程保留为历史轨；Unity 6的uGUI 2.0和UI系统比较只核对稳定机制及现代边界，不倒填原书。内容均为独立教学重写。",
  units: previousManifest.units.map((unit) => ({
    ...unit,
    chapterPath: PATHS[unit.id],
  })),
  sourceAccess: "authorized-sample",
  defaultSourceMode: "independent-rewrite",
  unitMappingEvidence: "quality/unity-ui-design-v2-profiles.json",
  factSourcePolicy:
    "作者公告、授权预览与中文版书页限定2015版38组目录；RectTransform、Canvas、Canvas Scaler、自动布局、Selectable、EventSystem、消息与Raycaster分别以Unity官方uGUI 2.0和Unity 6手册核对。现行资料只说明稳定机制和迁移边界。",
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
      outlineSources: [SOURCES.author, SOURCES.preview, SOURCES.chinese],
      technicalSources: [
        SOURCES.compare,
        SOURCES.rectTransform,
        SOURCES.canvas,
        SOURCES.canvasScaler,
        SOURCES.autoLayout,
        SOURCES.selectable,
        SOURCES.eventSystem,
        SOURCES.messaging,
        SOURCES.raycasters,
        SOURCES.runtimeEvents,
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
