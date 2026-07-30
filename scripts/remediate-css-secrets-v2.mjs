import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "css-secrets";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx/css-secrets/v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(ROOT, "quality/css-secrets-v2-profiles.json");

const SOURCES = {
  catalog:
    "https://www.oreilly.com/library/view/css-secrets/9781449372736/toc.html",
  author: "https://verou.me/publications/",
  chinese: "https://www.96192.com/product/detail/240822",
  cascade: "https://www.w3.org/TR/css-cascade-6/",
  backgrounds: "https://www.w3.org/TR/css-backgrounds-3/",
  images: "https://www.w3.org/TR/css-images-4/",
  masking: "https://www.w3.org/TR/css-masking-1/",
  shapes: "https://www.w3.org/TR/css-shapes-1/",
  filters: "https://www.w3.org/TR/filter-effects-1/",
  text: "https://www.w3.org/TR/css-text-4/",
  fonts: "https://www.w3.org/TR/css-fonts-4/",
  decorations: "https://www.w3.org/TR/css-text-decor-4/",
  ui: "https://www.w3.org/TR/css-ui-4/",
  wcagTarget:
    "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html",
  sizing: "https://www.w3.org/TR/css-sizing-3/",
  grid: "https://www.w3.org/TR/css-grid-2/",
  flexbox: "https://www.w3.org/TR/css-flexbox-1/",
  animations: "https://www.w3.org/TR/css-animations-2/",
  transitions: "https://www.w3.org/TR/css-transitions-2/",
  easing: "https://www.w3.org/TR/css-easing-2/",
};

const PATHS = {
  learningMap: "00-guide/csec-official-learning-map",
  "csec-unit-01": "01-method/csec-01-introduction",
  "csec-unit-02": "02-backgrounds-borders/csec-02-backgrounds-borders",
  "csec-unit-03": "03-shapes-effects/csec-03-shapes",
  "csec-unit-04": "03-shapes-effects/csec-04-visual-effects",
  "csec-unit-05": "04-typography-ux/csec-05-typography",
  "csec-unit-06": "04-typography-ux/csec-06-user-experience",
  "csec-unit-07": "05-layout-motion/csec-07-structure-layout",
  "csec-unit-08": "05-layout-motion/csec-08-transitions-animations",
  finalReview: "06-review/csec-official-final-review",
};

const PAGE_SPECS = {
  learningMap: {
    title: "《CSS Secrets》47项技巧与57个目录坐标学习地图",
    duty: "按方法、背景边框、形状、视觉、排印、体验、布局和动画组织原版47项技巧与57个公开坐标",
    question:
      "怎样保留2015年原书的解题方法，同时用现行CSS规范区分仍成立的机制、已有原生替代和需要回退的技巧？",
    invariant:
      "47个编号技巧与57个目录坐标分别计数，每项声明都能追到层叠、计算、使用与绘制结果，现代语法不倒填原书",
    fault:
      "把2026年已有的Grid、现代颜色或新函数反写成2015年原书方案，并省略原始技巧的约束",
    scenario:
      "团队维护一套2015年CSS技巧库，先按原版重建最小问题与约束，再登记现行规范、回退声明和可删除的历史兼容层。",
    stages: [
      "锁定47项技巧与57个坐标",
      "重放声明到绘制路径",
      "登记现代替代与发布边界",
    ],
    visualKind: "cascade",
    recipes: [
      [
        "目录分母",
        "--secret-count: 47",
        "保留8章结构",
        "47只统计连续编号技巧，57统计公开目录坐标",
      ],
      [
        "声明最小化",
        "border: 1px solid",
        "保持语义结构",
        "先定义问题约束，再选择最少声明",
      ],
      [
        "渐进增强",
        "@supports (...) { ... }",
        "基础样式可用",
        "增强层失败时不破坏内容和操作",
      ],
    ],
    sources: [
      SOURCES.catalog,
      SOURCES.author,
      SOURCES.cascade,
      SOURCES.backgrounds,
    ],
    artifact:
      "47项技巧清单、57坐标映射、原版年份标签、声明最小化记录、值处理轨迹、规范锚点、现代替代、回退和浏览器矩阵。",
    opening:
      "学习地图不把技巧收藏册当作固定答案；原书最有价值的是从约束、标准机制和最小声明推导方案的方式。",
  },
  "csec-unit-01": {
    duty: "用标准演进、最小复现、依赖值和可维护声明建立CSS解题方法",
    question:
      "怎样把一个视觉需求转成可验证约束，并判断该由标准特性、回退声明还是脚本处理？",
    invariant:
      "问题、浏览器基线、语义结构、声明依赖和验收截图固定，解法不依赖偶然的默认值",
    fault:
      "复制一段看似有效的技巧，却没有记录它依赖的背景色、字体度量、包含块或浏览器特性",
    scenario:
      "为设计系统接收一个“半透明卡片”需求，先写问题约束与基线，再用最小HTML/CSS复现和规范锚点验收。",
    stages: [
      "写明问题与标准基线",
      "缩减HTML和CSS声明",
      "验证依赖回退与维护成本",
    ],
    visualKind: "cascade",
    recipes: [
      [
        "依赖值",
        "background: currentColor",
        "显式基础色",
        "让声明复用已计算值而非重复魔数",
      ],
      ["相对单位", "padding: .6em 1em", "保留可读内边距", "组件随字体度量扩展"],
      [
        "颜色派生",
        "border-color: color-mix(...)",
        "先给静态颜色",
        "增强声明覆盖而不是替换基线",
      ],
    ],
    sources: [SOURCES.catalog, SOURCES.author, SOURCES.cascade],
    artifact:
      "问题陈述、浏览器基线、最小DOM、声明依赖图、指定值与计算值、失败样本、规范锚点、回退和维护说明。",
    opening:
      "第一章先治理方法：CSS技巧成立的前提不是代码短，而是问题约束、值来源和失效边界都能解释。",
  },
  "csec-unit-02": {
    duty: "覆盖半透明与多重边框、背景定位、内圆角、条纹图案、伪随机纹理和连续图像边框",
    question:
      "怎样把多个背景层、边框绘制区和渐变尺寸写成可计算的层序，而不是靠截图猜位置？",
    invariant:
      "背景层顺序、绘制区域、定位区域、尺寸、重复周期和边框盒均显式，透明层下方颜色可追溯",
    fault:
      "半透明边框下的背景延伸到border-box，视觉上看不到透明效果且换背景后颜色污染",
    scenario:
      "制作活动卡片，组合半透明边框、内圆角、斜纹背景与图像边框，并在三种容器尺寸下采样。",
    stages: [
      "声明盒模型和背景层序",
      "计算定位尺寸与重复周期",
      "检查透明边缘和图像切片",
    ],
    visualKind: "background",
    recipes: [
      [
        "半透明边框",
        "background-clip: padding-box",
        "实色边框",
        "阻止背景绘制到透明边框下方",
      ],
      [
        "条纹周期",
        "repeating-linear-gradient(...)",
        "单色背景",
        "把色标距离写成可复算周期",
      ],
      [
        "连续图像边框",
        "border-image: ... 1",
        "普通solid边框",
        "让切片和填充随盒尺寸延续",
      ],
    ],
    sources: [SOURCES.backgrounds, SOURCES.images, SOURCES.catalog],
    artifact:
      "background层序、origin与clip、位置、尺寸、色标周期、border-radius、border-image切片、三档尺寸截图和回退。",
    opening:
      "背景与边框页把视觉图案还原为多个绘制层；先确定每层覆盖哪个盒，再讨论渐变和图像。",
  },
  "csec-unit-03": {
    duty: "覆盖椭圆、平行四边形、菱形、切角、梯形标签与饼图的几何构造",
    question:
      "怎样从边界框、变换、裁剪路径或渐变角度推导形状，并保持内容不被错误变换？",
    invariant:
      "形状边界、内容坐标、命中区域、裁剪回退和宽高比均可测量，装饰几何不改变语义顺序",
    fault: "对整个按钮做skew而未反向校正内容，文字和点击边界一起倾斜且难以阅读",
    scenario:
      "为标签导航制作平行四边形、切角卡和饼图徽章，分别验证文字、焦点环与点击区域。",
    stages: [
      "选择边界框和几何原语",
      "分离内容与装饰变换",
      "验证裁剪命中与回退",
    ],
    visualKind: "shape",
    recipes: [
      [
        "自适应椭圆",
        "border-radius: 50%",
        "普通圆角矩形",
        "半径相对边框盒随宽高变化",
      ],
      [
        "切角卡片",
        "clip-path: polygon(...)",
        "保留矩形内容",
        "裁剪视觉外形并检查焦点可见",
      ],
      [
        "圆锥饼图",
        "background: conic-gradient(...)",
        "显示数字文本",
        "图形只增强比例表达",
      ],
    ],
    sources: [
      SOURCES.backgrounds,
      SOURCES.images,
      SOURCES.masking,
      SOURCES.shapes,
    ],
    artifact:
      "边界框、半径、变换矩阵、反向内容变换、clip-path顶点、命中测试、比例文本、焦点环和不支持时回退。",
    opening:
      "形状页不把几何效果当成图片；每个方案都要说明哪个盒被变换、哪个区域被裁剪以及内容是否仍可读可点。",
  },
  "csec-unit-04": {
    duty: "覆盖单侧与不规则投影、染色、毛玻璃和折角效果",
    question:
      "怎样区分盒投影、alpha轮廓投影、滤镜、背景模糊和伪元素层，并控制合成成本？",
    invariant:
      "效果作用对象、滤镜输入、模糊采样区、堆叠上下文、回退和性能边界明确",
    fault:
      "对整页内容使用大半径blur并持续动画，造成文字不可读、离屏缓冲放大和滚动掉帧",
    scenario:
      "为弹层制作不规则投影、染色封面、毛玻璃背景和折角提示，分别记录合成层与可读性。",
    stages: [
      "选择投影或滤镜输入",
      "建立伪元素和堆叠层",
      "检查模糊边缘性能与回退",
    ],
    visualKind: "effect",
    recipes: [
      [
        "不规则投影",
        "filter: drop-shadow(...)",
        "box-shadow矩形投影",
        "沿元素alpha轮廓生成投影",
      ],
      [
        "毛玻璃",
        "backdrop-filter: blur(...)",
        "半透明实色背景",
        "模糊元素背后的已合成图像",
      ],
      [
        "染色",
        "filter: sepia() saturate()",
        "保留原图",
        "组合滤镜但不替代信息文本",
      ],
    ],
    sources: [
      SOURCES.filters,
      SOURCES.backgrounds,
      SOURCES.masking,
      SOURCES.catalog,
    ],
    artifact:
      "效果输入、box-shadow或drop-shadow参数、滤镜序列、伪元素层、backdrop范围、对比度、合成性能和回退截图。",
    opening:
      "视觉效果页先问浏览器在处理哪个像素输入；盒阴影、alpha投影和背景模糊不是同一条渲染路径。",
  },
  "csec-unit-05": {
    duty: "覆盖连字符、换行、斑马纹、tab、连字、特殊符号、下划线、文字效果与环形文字",
    question:
      "怎样在语言、字体特性、行盒、装饰线和阅读顺序约束下实现排印，而不把文本栅格化？",
    invariant:
      "语言标签、字体回退、OpenType特性、行高、换行机会、装饰线和可复制文本均被验证",
    fault: "未设置正确lang就启用自动连字符，浏览器按错误词典断词并破坏专有名词",
    scenario:
      "制作中英混排文章卡，验证连字符、连字、tab、下划线、文字阴影和圆形标题的可读与复制。",
    stages: [
      "锁定语言字体和行盒",
      "应用断行特性与装饰",
      "验证复制缩放和辅助技术",
    ],
    visualKind: "typography",
    recipes: [
      [
        "自定义下划线",
        "text-decoration-thickness: ...",
        "浏览器默认下划线",
        "控制厚度与偏移但保留文本语义",
      ],
      ["连字符", "hyphens: auto", "允许正常换行", "由lang与词典决定合法断词点"],
      [
        "连字",
        "font-variant-ligatures: common-ligatures",
        "普通字形",
        "使用字体提供的OpenType替换",
      ],
    ],
    sources: [
      SOURCES.text,
      SOURCES.fonts,
      SOURCES.decorations,
      SOURCES.catalog,
    ],
    artifact:
      "lang、字体栈、OpenType能力、hyphens、white-space、tab-size、行盒、装饰参数、复制文本、缩放与屏幕阅读顺序。",
    opening:
      "排印页把文字视为语言内容经过字体塑形与行布局后的结果；漂亮轮廓不能牺牲复制、阅读顺序和回退。",
  },
  "csec-unit-06": {
    duty: "覆盖光标、命中区、复选框、背景弱化、滚动提示和图片对比控件",
    question:
      "怎样让视觉提示、命中区域、焦点、原生语义和模态状态保持一致，并覆盖键盘与触摸？",
    invariant:
      "可点击区域不小于产品基线，原生控件语义保留，焦点可见，背景不可误操作，滚动状态可感知",
    fault: "用display:none隐藏原生复选框并用无语义span替代，键盘和读屏无法切换",
    scenario:
      "实现设置弹层，含自定义复选框、扩大命中按钮、背景弱化、滚动列表和图片前后对比。",
    stages: [
      "保留语义焦点和命中区",
      "同步模态与背景状态",
      "验证滚动触摸和图片对比",
    ],
    visualKind: "ux",
    recipes: [
      [
        "扩大命中区",
        "padding: .75rem 1rem",
        "文本仍可操作",
        "视觉尺寸和实际命中区同时可测",
      ],
      [
        "自定义复选框",
        "input:checked + label",
        "原生input可见可用",
        "外观增强不能删除表单语义",
      ],
      [
        "滚动提示",
        "background-attachment: local",
        "保留滚动条",
        "渐变只提示还有内容",
      ],
    ],
    sources: [SOURCES.ui, SOURCES.wcagTarget, SOURCES.filters, SOURCES.catalog],
    artifact:
      "语义控件、label关系、焦点顺序、命中尺寸、cursor、checked状态、模态背景、滚动边界、键盘触摸和读屏记录。",
    opening:
      "用户体验页要求视觉外观服从交互合同；CSS可以扩大或美化控件，但不能删除原生状态和输入路径。",
  },
  "csec-unit-07": {
    duty: "覆盖内在尺寸、表格列宽、兄弟计数、满幅背景、垂直居中和紧贴底部页脚",
    question:
      "怎样用内在尺寸、格式化上下文和可用空间解释布局，而不是用固定高度与魔数补丁？",
    invariant:
      "包含块、最小与最大内容尺寸、自由空间、溢出和DOM关系固定，布局在内容增长与窄屏下仍成立",
    fault: "用固定视口高度减去猜测头部高度实现页脚，内容换行后发生重叠和双滚动",
    scenario:
      "构建文档页，包含定宽内容的满幅区、数据表、动态卡片组、垂直居中空态和短页页脚。",
    stages: [
      "声明包含块与内在尺寸",
      "分配轨道和自由空间",
      "注入长内容窄屏与空状态",
    ],
    visualKind: "layout",
    recipes: [
      [
        "内在尺寸",
        "width: fit-content",
        "width: auto",
        "让盒尺寸由内容贡献和可用空间共同限制",
      ],
      [
        "垂直居中",
        "display: grid; place-items: center",
        "正常文档流",
        "由布局算法分配自由空间",
      ],
      [
        "紧贴底部页脚",
        "min-block-size: 100dvb",
        "内容自然流动",
        "用flex或grid吸收剩余空间",
      ],
    ],
    sources: [SOURCES.sizing, SOURCES.grid, SOURCES.flexbox, SOURCES.catalog],
    artifact:
      "包含块、min/max-content贡献、轨道、自由空间、表格算法、兄弟数量、长短内容、窄屏、溢出和页脚位置记录。",
    opening:
      "布局页把结果归因于算法输入：内容贡献、可用空间与轨道约束；固定像素只是某次结果，不是布局合同。",
  },
  "csec-unit-08": {
    duty: "覆盖弹性缓动、逐帧、闪烁、打字、平滑状态与环形路径动画",
    question:
      "怎样把离散或连续状态映射到时间函数，并在减少动态、暂停、反向和中断时保持可预测？",
    invariant:
      "起止状态、插值类型、时长、缓动、迭代、填充、合成属性和reduced-motion替代均显式",
    fault:
      "用无限闪烁和逐帧动画表达关键信息，却没有暂停控制或prefers-reduced-motion静态替代",
    scenario:
      "制作状态徽章、逐帧图标、打字提示和环形运行指示，分别测试中断、反向、后台恢复与减少动态。",
    stages: [
      "声明关键状态和时间函数",
      "选择连续插值或离散步进",
      "验证中断暂停与减少动态",
    ],
    visualKind: "motion",
    recipes: [
      [
        "弹性缓动",
        "transition-timing-function: cubic-bezier(...)",
        "linear或ease",
        "曲线允许越界但端点仍固定",
      ],
      [
        "逐帧动画",
        "animation-timing-function: steps(...)",
        "静态首帧",
        "离散跳变与精灵帧数对齐",
      ],
      [
        "环形路径",
        "offset-path: circle(...)",
        "静态终点",
        "路径位置与朝向分别定义",
      ],
    ],
    sources: [
      SOURCES.animations,
      SOURCES.transitions,
      SOURCES.easing,
      SOURCES.catalog,
    ],
    artifact:
      "关键帧、起止计算值、duration、delay、easing、steps、iteration、fill、合成属性、暂停中断和reduced-motion截图。",
    opening:
      "动画页把效果写成状态关于时间的函数；连续插值、离散步进和路径运动需要不同证据，不能只录一段顺利视频。",
  },
  finalReview: {
    title: "《CSS Secrets》综合复核：声明、计算值与绘制证据",
    duty: "用一个产品界面串联47项技巧的背景、几何、视觉、排印、体验、布局和动画决策",
    question:
      "怎样证明一个CSS技巧来自明确约束，经层叠和布局得到可解释结果，并在不支持或减少动态时安全回退？",
    invariant:
      "DOM语义、浏览器基线、声明来源、计算值、布局尺寸、绘制层、交互状态和回退形成可重放证据链",
    fault:
      "只提交理想浏览器截图，没有指定值、计算值、窄屏、键盘、减少动态或不支持特性的证据",
    scenario:
      "综合页面包含图案卡片、切角标签、毛玻璃弹层、排印正文、表单、响应式布局和状态动画。",
    stages: [
      "锁定语义基线和声明依赖",
      "追踪层叠布局与绘制",
      "跨浏览器输入与偏好复核",
    ],
    visualKind: "cascade",
    recipes: [
      [
        "绘制层",
        "background + border + filter",
        "基础盒可读",
        "逐层增加效果并保留来源",
      ],
      [
        "布局合同",
        "minmax() + fit-content",
        "正常文档流",
        "内容增长时不依赖固定高度",
      ],
      [
        "偏好回退",
        "@media (prefers-reduced-motion)",
        "静态终态",
        "动态不是理解内容的唯一途径",
      ],
    ],
    sources: [
      SOURCES.catalog,
      SOURCES.cascade,
      SOURCES.backgrounds,
      SOURCES.text,
      SOURCES.grid,
      SOURCES.animations,
    ],
    artifact:
      "47项技巧检查、57坐标映射、语义DOM、声明依赖、指定与计算值、布局盒、绘制层、输入测试、浏览器矩阵和回退。",
    opening:
      "综合复核不追求把47项技巧堆在一张页面；它要求每项视觉决策都能回到约束、规范机制和可撤销增强。",
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
      /引言|Web 标准|CSS 编码技巧/,
      [
        "从标准机制、问题约束与声明依赖推导最小解法",
        "浏览器基线、最小复现、声明来源、计算值和失败样本",
        "复制技巧却未记录隐含依赖",
      ],
    ],
    [
      /半透明边框|多重边框|背景定位|边框内圆角/,
      [
        "协调边框盒、背景绘制区、定位区与多层绘制顺序",
        "box边界、background-clip、origin、position与层序",
        "透明层下方背景污染或固定偏移",
      ],
    ],
    [
      /条纹背景|复杂的背景图案|伪随机背景|图像边框/,
      [
        "以渐变色标、重复周期和图像切片生成可缩放纹理",
        "色标位置、background-size、重复最小公倍数与border-image切片",
        "图案周期或切片依赖单一尺寸",
      ],
    ],
    [
      /椭圆|平行四边形|菱形|切角|梯形|饼图/,
      [
        "用半径、变换、裁剪路径或角度构造几何边界",
        "边界框、变换矩阵、裁剪顶点、内容坐标和命中测试",
        "装饰变换同时扭曲内容或焦点",
      ],
    ],
    [
      /投影|染色|毛玻璃|折角/,
      [
        "选择盒、alpha轮廓、滤镜输入或伪元素合成视觉层",
        "输入图像、阴影参数、滤镜序列、堆叠上下文和合成成本",
        "大范围滤镜牺牲可读性与性能",
      ],
    ],
    [
      /连字符|插入换行|斑马条纹|tab|连字|& 符号|下划线|文字效果|环形文字/,
      [
        "在语言、字体塑形、行盒与文字装饰阶段控制排印",
        "lang、字体特性、换行机会、行高、装饰线和复制结果",
        "视觉轮廓破坏语言断词或阅读顺序",
      ],
    ],
    [
      /鼠标光标|可点击区域|复选框|弱化背景|滚动提示|图片对比/,
      [
        "同步语义控件、视觉状态、焦点、命中区和模态交互",
        "DOM语义、焦点顺序、命中尺寸、checked、滚动和键盘触摸测试",
        "自定义外观删除原生输入路径",
      ],
    ],
    [
      /内部元素|表格列宽|兄弟元素|满幅的背景|垂直居中|页脚/,
      [
        "由内在尺寸、包含块、轨道与自由空间计算布局",
        "min/max-content贡献、可用空间、轨道、溢出和内容边界",
        "固定高度和魔数只适配单一样本",
      ],
    ],
    [
      /缓动|逐帧|闪烁|打字动画|状态平滑|环形路径/,
      [
        "把离散或连续状态映射到时间函数与运动路径",
        "关键帧、计算值、duration、easing、steps、中断和减少动态",
        "无限动画无暂停或静态替代",
      ],
    ],
    [
      /第\s*[1-8]\s*章/,
      [
        "封闭本章问题类型、规范机制与回退证据",
        "目录坐标、编号技巧、相邻章节和发布结论",
        "跨章技巧脱离原始约束拼贴",
      ],
    ],
  ];
  return (
    rules.find(([pattern]) => pattern.test(concept))?.[1] ?? [
      "把目录技巧转成声明到绘制的可复现路径",
      "DOM、指定值、计算值、使用值、绘制结果与回退",
      "单张截图代替机制验证",
    ]
  );
}

function termFor(concept, index) {
  const short = concept
    .replace(/^\d+\s*/, "")
    .replace(/^第\s*[1-8]\s*章\s*/, "")
    .split(/[；;：:——,]/, 1)[0]
    .trim();
  return short.length > 0 && short.length <= 18 ? short : `CSS条目${index + 1}`;
}

function enrichProfile(key, specification, role, unit = null) {
  const chapterPath = PATHS[key];
  const concepts = unit
    ? unit.concepts.map((group) => group.join("；"))
    : unitTitles;
  const title = specification.title ?? unit?.title;
  const normalTrace = [
    `“${title}”从版本化DOM和浏览器基线收集候选声明、初始值与继承值`,
    `层叠按来源、重要性、层、特异性、作用域和顺序为“${title}”选出声明`,
    `计算阶段解析相对值、变量、字体与包含块依赖，保存“${title}”的computed style`,
    `布局阶段把计算值转成使用尺寸、位置、行盒或时间样本`,
    `绘制与合成生成可截图结果，并交付${specification.artifact}`,
  ];
  const failureTrace = [
    `“${title}”复用同一DOM、浏览器、视口、字体、输入和用户偏好`,
    `只注入CSS故障：${specification.fault}`,
    "在层叠或计算阶段定位首个丢失、被覆盖、无效或依赖未解析的声明",
    "保存错误使用值、布局盒或绘制层，不用手工修图覆盖差异",
    `依据“${specification.invariant}”拒绝提交并恢复基线声明`,
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
    recipes: specification.recipes.map(
      ([name, declaration, fallback, explanation]) => ({
        name,
        declaration,
        fallback,
        explanation,
      }),
    ),
    normalTrace,
    failureTrace,
  };
}

const profiles = [
  enrichProfile("learningMap", PAGE_SPECS.learningMap, "learning-map"),
  ...previousManifest.units.map((unit) =>
    enrichProfile(unit.id, PAGE_SPECS[unit.id], "chapter", unit),
  ),
  enrichProfile("finalReview", PAGE_SPECS.finalReview, "final-review"),
];
if (profiles.length !== 10)
  throw new Error("《CSS Secrets》课程必须恰好为10页");

function objectivesBlock(profile) {
  return `<Objectives>

- 能说明“${profile.title}”如何${profile.duty}，并明确2015原书技巧、现行规范事实与现代替代之间的时间边界
- 能先预测“${profile.question}”的计算值或绘制结果，再沿DOM、声明、层叠、计算、布局与绘制逐阶段核对
- 能注入“${profile.fault}”，用“${profile.invariant}”决定接受、修正或拒绝样式发布

</Objectives>`;
}

function sourceSection(profile) {
  const links = profile.sources
    .map((url, index) => `[技术核对 ${index + 1}](${url})`)
    .join("、");
  return `## 为什么从这个CSS问题开始

${profile.opening} “${profile.title}”使用的贯穿任务是：${profile.scenario} 操作前先预测哪个声明、计算值、布局盒或绘制层会变化，渲染后再补理由不算预测。

本页围绕“${profile.question}”建立正常、反例与恢复路径。只有“${profile.title}”保持“${profile.invariant}”并交付${profile.artifact}，视觉效果才构成CSS证据。

## 原版47项技巧、57个目录坐标与现代边界

“${profile.title}”以[O'Reilly官方目录](${SOURCES.catalog})核对Lea Verou著、2015年6月、388页、ISBN 9781449372736、八章和47个连续编号技巧；[作者出版页](${SOURCES.author})确认《CSS Secrets》由O'Reilly于2015年出版，[中文版书页](${SOURCES.chinese})核对《CSS揭秘》的中文出版信息。原版47项编号技巧分布在第2至第8章；若把八个章标题和第一章两个方法主题一起计算，公开目录共有57个坐标。

“${profile.title}”只依据官方目录限定范围，不逐段改写原文；解释、示例、交互、练习与答案均为独立教学重写。47是编号技巧分母，57是完整目录坐标分母，两者不能混称。

“${profile.title}”另以${links}核对现行技术事实。2015年的技巧保留为历史方案；现行CSS规范用于解释仍成立的层叠、背景、几何、排印、布局与动画机制，或标出现代原生替代。现行语法不能倒填为原书内容，草案特性也不能冒充跨浏览器基线。`;
}

const paragraphPatterns = [
  (profile, concept, mechanism, evidence, caution, index) =>
    `在“${profile.title}”的坐标${index + 1}中，${concept}用于${mechanism}；先固定DOM和浏览器基线，再用${evidence}复核，出现${caution}时不得提交。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `${concept}进入“${profile.title}”后要回答第${index + 1}张声明卡：它怎样${mechanism}、改变哪个计算值或绘制层、由哪些${evidence}证明，并如何排除${caution}。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `围绕“${profile.question}”，条目${index + 1}把${concept}解释为${mechanism}；复核者先读取${evidence}再判断截图，不能接受${caution}。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `对“${profile.title}”而言，${concept}的最小合同是${mechanism}，第${index + 1}次检查保存${evidence}；若产生${caution}，就回到声明、层叠或布局上游。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `第${index + 1}个公开目录坐标${concept}服务于${profile.duty}，需要以${evidence}呈现${mechanism}；${caution}会破坏“${profile.invariant}”。`,
  (profile, concept, mechanism, evidence, caution) =>
    `学习者在“${profile.title}”中讨论${concept}前预测${mechanism}会改变哪项值或像素状态，再读取${evidence}；观察到${caution}时保留失败轨迹。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `${profile.scenario} 在条目${index + 1}处理${concept}时，要把${mechanism}写进样式合同，把${evidence}写进运行记录，并把${caution}写进反例。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `“${profile.invariant}”限定了${concept}的适用域：坐标${index + 1}只能通过${mechanism}推进，由${evidence}复核，而${caution}构成拒绝条件。`,
];

function conceptsSection(profile) {
  return `## 公开目录坐标与CSS机制

${profile.concepts
  .map((concept, index) => {
    const [mechanism, evidence, caution] = mechanismFor(concept);
    const term = termFor(concept, index);
    const definition = `${term}对应公开目录坐标“${concept}”，在“${profile.title}”中用于${mechanism}，并受原书年份、DOM、层叠、布局、绘制与回退边界约束。`;
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
  return `## 先预测，再操作三个CSS实验

<Callout type="info" title="先写出哪个值或绘制层会先变化">
  对“${profile.title}”先选择版本化DOM、浏览器、视口、字体、输入与预期结果，再操作渲染探针、值处理轨迹和发布门；结果与预测不一致时应修改CSS假设，不删除失败运行。
</Callout>

<Stepper>
  <Step title="1. 声明与渲染探针">
    切换“${profile.recipes.map((recipe) => recipe.name).join("、")}”并一次只调整一个控制量，核对声明、回退和实际绘制怎样连接“${profile.title}”。

    <${profile.componentBase}RenderProbe />
  </Step>
  <Step title="2. 正常与反例值处理轨迹">
    保持“${profile.scenario}”不变，沿声明、层叠、计算、使用与绘制阶段定位“${profile.fault}”的第一处偏离。

    <${profile.componentBase}CascadeTraceLab />
  </Step>
  <Step title="3. 渐进增强发布门">
    分别切换语义基线、特性回退、输入与对比、响应式与偏好验证，展开${profile.artifact}后决定是否提交。

    <${profile.componentBase}ReleaseGateLab />
  </Step>
</Stepper>

<Callout type="trap" title="本页CSS反例：${profile.fault}">
  “${profile.title}”遇到该反例时应保持DOM、浏览器、视口、字体、输入和偏好不变，寻找最早无效或被覆盖的声明；用最终截图看似接近掩盖错误计算值、不可操作状态或性能代价，不能证明“${profile.invariant}”。
</Callout>

<Callout type="trap" title="单张理想截图不等于浏览器合同">
  ${profile.scenario} 在一个桌面浏览器看起来正确，只证明一组环境；“${profile.title}”仍需窄屏、长内容、键盘、触摸、缩放、减少动态和不支持特性时的证据。
</Callout>

<Callout type="trap" title="现代CSS不能倒填2015原书">
  “${profile.title}”引用现行规范是为了核对机制和替代边界；Grid、color-mix、现代视口单位或新选择器若非原书内容，必须明确标成现代对照。
</Callout>`;
}

function protocolSection(profile) {
  return `## ${profile.title}的可重放CSS协议

| 阶段 | CSS动作 | 必留证据 | 拒绝条件 |
| --- | --- | --- | --- |
${profile.stages
  .map(
    (stage, index) =>
      `| ${stage} | 在“${profile.title}”执行${stage}，一次只改变一个声明或环境条件 | ${index === 0 ? "DOM、浏览器基线、视口、字体与初始样式" : index === 1 ? "层叠来源、computed style、布局盒与绘制截图" : "回退、输入、偏好、性能与现代边界记录"} | ${index === 0 ? "语义或依赖不可追溯" : index === 1 ? profile.fault : "无法重放或恢复基础样式"} |`,
  )
  .join("\n")}

\`\`\`yaml
unit: ${JSON.stringify(profile.id)}
question: ${JSON.stringify(profile.question)}
scenario: ${JSON.stringify(profile.scenario)}
recipes: ${JSON.stringify(profile.recipes.map((recipe) => recipe.name))}
stages: ${JSON.stringify(profile.stages)}
invariant: ${JSON.stringify(profile.invariant)}
fault: ${JSON.stringify(profile.fault)}
evidence: ${JSON.stringify(profile.artifact)}
reset: restore_recipe_value_trace_step_gates_and_artifact
\`\`\`

该协议要求“${profile.title}”在相同DOM、浏览器、视口、字体、输入和用户偏好下重放。重置后若技巧、控制量、轨迹模式、步骤、发布门或证据显示没有回到基线，交互状态已经污染比较，不能作为CSS证据。`;
}

function synthesisSection(profile) {
  const glossary = profile.concepts
    .map((concept, index) => {
      const [mechanism] = mechanismFor(concept);
      const term = termFor(concept, index);
      return `  <GlossaryItem term=${JSON.stringify(term)}>对应“${concept}”；在“${profile.title}”中用于${mechanism}，需要连接原书年份、DOM、声明、计算、布局、绘制与回退。</GlossaryItem>`;
    })
    .join("\n");
  const conceptList = profile.concepts
    .map((concept, index) => {
      const [mechanism, evidence] = mechanismFor(concept);
      return `${index + 1}. “${profile.title}”的${concept}：以“${mechanism}”解释CSS作用，用“${evidence}”提供复核。`;
    })
    .join("\n");
  return `## 本页回顾

掌握“${profile.title}”不是背诵代码片段，而是能围绕“${profile.question}”重建值处理与绘制路径，并用“${profile.invariant}”拒绝“${profile.fault}”。最终交付为${profile.artifact}

## 练习与答案

<Exercises>

1. **问题 1：CSS合同。** “${profile.title}”为什么必须先声明DOM、浏览器基线、视口、字体、输入与用户偏好？

<Answer>
  ${profile.scenario} 若这些条件不固定，相同声明可能得到不同继承值、字体度量、包含块、命中状态或动画偏好；“${profile.title}”先声明合同，才能把截图连接到可解释机制。
</Answer>

2. **问题 2：目录逐项覆盖。** 怎样证明本页公开目录坐标已经进入机制、交互和练习？

<Answer>
${conceptList}
</Answer>

3. **问题 3：反例恢复。** 怎样证明“${profile.fault}”已经被修正？

<Answer>
  为“${profile.title}”复用同一DOM、浏览器、视口、字体、输入和偏好，重放正常路径后只注入“${profile.fault}”；记录最早偏离点，撤销故障并再次运行。只有渲染探针、值处理轨迹、发布门和${profile.artifact}重新满足“${profile.invariant}”，修正才可提交。
</Answer>

</Exercises>

## 名词解释

<Glossary>
${glossary}
</Glossary>

<Attribution
  mode="independent-rewrite"
  sourceBasis="outline-only"
  workTitle="Lea Verou《CSS Secrets》"
  adaptedUrl="${SOURCES.catalog}"
/>`;
}

function wrapperSource(profile) {
  const model = {
    unitId: profile.id,
    title: profile.title,
    question: profile.question,
    concepts: profile.concepts,
    visualKind: profile.visualKind,
    recipes: profile.recipes,
    normalTrace: profile.normalTrace,
    failureTrace: profile.failureTrace,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
    gates: [
      {
        label: "语义基线",
        detail: `“${profile.title}”保留可读DOM、内容顺序、原生状态和基础样式。`,
      },
      {
        label: "特性与回退",
        detail: `“${profile.title}”的增强声明有规范锚点、支持边界和可用回退。`,
      },
      {
        label: "输入与可读",
        detail: `“${profile.title}”经过键盘、触摸、焦点、缩放、对比和长内容复核。`,
      },
      {
        label: "响应与偏好",
        detail: `“${profile.title}”覆盖窄屏、宽屏、减少动态、不支持特性和目标浏览器。`,
      },
    ],
  };
  return `"use client";

import {
  CssSecretsEvidenceLab,
  type CssSecretsEvidenceModel,
} from "./css-secrets-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies CssSecretsEvidenceModel;

export function ${profile.componentBase}RenderProbe() {
  return <CssSecretsEvidenceLab model={model} view="render-probe" />;
}

export function ${profile.componentBase}CascadeTraceLab() {
  return <CssSecretsEvidenceLab model={model} view="cascade-trace" />;
}

export function ${profile.componentBase}ReleaseGateLab() {
  return <CssSecretsEvidenceLab model={model} view="release-gate" />;
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
import { ${profile.componentBase}RenderProbe, ${profile.componentBase}CascadeTraceLab, ${profile.componentBase}ReleaseGateLab } from "@/components/mdx/${BOOK}/v2/${slug}";

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
    description: `${profile.duty}；用渲染探针、值处理轨迹和渐进增强发布门完成独立复核。`,
    demo: true,
    math: false,
    sourceUrl: SOURCES.catalog,
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

const catalogEntries = previousManifest.units.reduce(
  (sum, unit) => sum + unit.concepts.length,
  0,
);
if (catalogEntries !== 57)
  throw new Error(`《CSS Secrets》公开目录坐标应为57，实际${catalogEntries}`);

manifestDocument.books[BOOK] = {
  ...previousManifest,
  edition:
    "Lea Verou著《CSS Secrets》，O'Reilly Media，2015年6月，388页，ISBN 9781449372736；CSS魔法译《CSS揭秘》，人民邮电出版社，2016年4月，232页，ISBN 9787115416940",
  sourceKind:
    "official-oreilly-complete-toc-author-publication-page-chinese-edition-page-and-current-w3c-primary-specifications",
  sourceUrl: SOURCES.catalog,
  secondarySourceUrls: [
    SOURCES.author,
    SOURCES.chinese,
    SOURCES.cascade,
    SOURCES.backgrounds,
    SOURCES.images,
    SOURCES.masking,
    SOURCES.shapes,
    SOURCES.filters,
    SOURCES.text,
    SOURCES.fonts,
    SOURCES.decorations,
    SOURCES.ui,
    SOURCES.wcagTarget,
    SOURCES.sizing,
    SOURCES.grid,
    SOURCES.flexbox,
    SOURCES.animations,
    SOURCES.transitions,
    SOURCES.easing,
  ],
  verifiedAt: "2026-07-30",
  disclosureNote:
    "O'Reilly官方目录确认Lea Verou著、2015年6月、388页、ISBN 9781449372736、八章以及第2至第8章的47个连续编号技巧；作者出版页确认O'Reilly 2015年出版，中文版书页核对中文出版信息。47是编号技巧分母；连同八个章标题和第一章两个方法主题，完整公开目录共有57个坐标。课程按八章逐一覆盖，另设学习地图与综合复核，共10页。现行W3C规范只核对稳定机制、草案状态和现代替代，不倒填原书。内容均为独立教学重写。",
  units: previousManifest.units.map((unit) => ({
    ...unit,
    chapterPath: PATHS[unit.id],
  })),
  sourceAccess: "outline-only",
  defaultSourceMode: "independent-rewrite",
  unitMappingEvidence: "quality/css-secrets-v2-profiles.json",
  factSourcePolicy:
    "O'Reilly官方目录限定八章、47项编号技巧与57个完整目录坐标；层叠、背景边框、图像渐变、遮罩形状、滤镜、文字字体装饰、UI、目标尺寸、内在尺寸、Grid、Flexbox、动画、过渡与缓动分别以W3C规范和WAI资料核对。草案特性明确标注，现行资料不反写2015内容。",
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
      outlineSources: [SOURCES.catalog, SOURCES.author, SOURCES.chinese],
      technicalSources: [
        SOURCES.cascade,
        SOURCES.backgrounds,
        SOURCES.images,
        SOURCES.masking,
        SOURCES.shapes,
        SOURCES.filters,
        SOURCES.text,
        SOURCES.fonts,
        SOURCES.decorations,
        SOURCES.ui,
        SOURCES.wcagTarget,
        SOURCES.sizing,
        SOURCES.grid,
        SOURCES.flexbox,
        SOURCES.animations,
        SOURCES.transitions,
        SOURCES.easing,
      ],
      numberedSecrets: 47,
      officialUnits: previousManifest.units.length,
      officialCatalogEntries: catalogEntries,
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
  `已重建 ${profiles.length} 页，覆盖47项编号技巧与${catalogEntries}个公开目录坐标，生成 ${profiles.length * 3} 个交互视图。`,
);
