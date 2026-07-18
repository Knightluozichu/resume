import type { ReviewQuestion } from "./types";

export const cswOfficialQuestions: ReviewQuestion[] = [
  {
    id: "csw-official-learning-map-1",
    chapter: "csw-official-learning-map",
    level: 1,
    question: "《CSS 世界》权威学习地图的核心主张是什么？",
    answer:
      "张鑫旭原著以 CSS 2.1 的“流”为世界观，从术语与基本尺寸进入四大盒尺寸、内联、浮动定位、层叠、文本、装饰、显隐、界面和书写方向；Flex、Grid、transform 与 animation 不属于本书章节。",
    tags: ["《CSS 世界》权威学习地图", "核心机制"],
  },
  {
    id: "csw-official-learning-map-2",
    chapter: "csw-official-learning-map",
    level: 2,
    question: "《CSS 世界》权威学习地图覆盖哪些出版社目录条目？",
    answer:
      "第 1 章 概述、第 2 章 需提前了解的术语和概念、第 3 章 流、元素与基本尺寸、第 4 章 盒尺寸四大家族、第 5 章 内联元素与流、第 6 章 流的破坏与保护、第 7 章 CSS 世界的层叠规则、第 8 章 强大的文本处理能力、第 9 章 元素的装饰与美化、第 10 章 元素的显示与隐藏、第 11 章 用户界面样式、第 12 章 流向的改变",
    tags: ["《CSS 世界》权威学习地图", "目录覆盖"],
  },
  {
    id: "csw-official-learning-map-3",
    chapter: "csw-official-learning-map",
    level: 2,
    question: "《CSS 世界》权威学习地图的六阶段证据链是什么？",
    answer:
      "核验 CSS 2.1 身份 → 建立流与盒模型 → 推演尺寸和内联 → 控制脱流与层叠 → 组织文本与装饰 → 验证界面和流向",
    tags: ["《CSS 世界》权威学习地图", "机制链"],
  },
  {
    id: "csw-official-learning-map-4",
    chapter: "csw-official-learning-map",
    level: 3,
    question: "《CSS 世界》权威学习地图为什么不能只看最终截图？",
    answer:
      "截图会隐藏固定尺寸、错误包含块、字体偶然命中、溢出裁剪和层叠补丁，必须保存盒树、使用值与恢复轨迹。",
    tags: ["《CSS 世界》权威学习地图", "故障注入"],
  },
  {
    id: "csw-official-learning-map-5",
    chapter: "csw-official-learning-map",
    level: 3,
    question: "《CSS 世界》权威学习地图签发时保持什么不变量？",
    answer:
      "每章都必须能回答元素生成什么盒、处于哪个格式化上下文、包含块是谁、使用尺寸如何得到、绘制在哪个层级，以及换方向或换内容后是否仍成立。",
    tags: ["《CSS 世界》权威学习地图", "工程验收"],
  },
  {
    id: "csw-official-learning-map-6",
    chapter: "csw-official-learning-map",
    level: 3,
    question: "《CSS 世界》权威学习地图怎样完成可复现实验？",
    answer:
      "固定 DOM、样式表、视口、字体和内容，依次执行正常、边界、失败和恢复样本，记录盒、包含块、使用值、行框、层级与首偏离点。",
    tags: ["《CSS 世界》权威学习地图", "可复现实验"],
  },
  {
    id: "csw-01-worldview-flow-1",
    chapter: "csw-01-worldview-flow",
    level: 1,
    question: "第 1 章 概述的核心主张是什么？",
    answer:
      "CSS 2.1 世界以正常流为底层秩序：块级和内联盒沿流排布，尺寸与位置尽量由容器和内容共同决定；table 与 CSS3 属于需要另行识别的平行世界。",
    tags: ["第 1 章 概述", "核心机制"],
  },
  {
    id: "csw-01-worldview-flow-2",
    chapter: "csw-01-worldview-flow",
    level: 2,
    question: "第 1 章 概述覆盖哪些出版社目录条目？",
    answer:
      "第1章 概述、1.1 CSS世界的“世界观”、1.2 世界都是创造出来的、1.3 CSS完胜SVG的武器——流、1.3.1 何为“流”、1.3.2 流是如何影响整个CSS世界的、1.3.3 什么是流体布局、1.4 CSS世界的开启从IE8开始、1.5 table自己的世界、1.6 CSS新世界——CSS3",
    tags: ["第 1 章 概述", "目录覆盖"],
  },
  {
    id: "csw-01-worldview-flow-3",
    chapter: "csw-01-worldview-flow",
    level: 2,
    question: "第 1 章 概述的六阶段证据链是什么？",
    answer:
      "建立世界观 → 辨认浏览器创造的盒 → 观察正常流 → 推演流体布局 → 划定 CSS 2.1 边界 → 比较 table 与 CSS3",
    tags: ["第 1 章 概述", "机制链"],
  },
  {
    id: "csw-01-worldview-flow-4",
    chapter: "csw-01-worldview-flow",
    level: 3,
    question: "第 1 章 概述为什么不能只看最终截图？",
    answer:
      "截图会隐藏固定尺寸、错误包含块、字体偶然命中、溢出裁剪和层叠补丁，必须保存盒树、使用值与恢复轨迹。",
    tags: ["第 1 章 概述", "故障注入"],
  },
  {
    id: "csw-01-worldview-flow-5",
    chapter: "csw-01-worldview-flow",
    level: 3,
    question: "第 1 章 概述签发时保持什么不变量？",
    answer:
      "删去非必要声明后，内容仍应随容器宽度自然伸缩；如果布局依赖固定坐标、固定高度或大量补丁，说明它已经背离流体原则。",
    tags: ["第 1 章 概述", "工程验收"],
  },
  {
    id: "csw-01-worldview-flow-6",
    chapter: "csw-01-worldview-flow",
    level: 3,
    question: "第 1 章 概述怎样完成可复现实验？",
    answer:
      "固定 DOM、样式表、视口、字体和内容，依次执行正常、边界、失败和恢复样本，记录盒、包含块、使用值、行框、层级与首偏离点。",
    tags: ["第 1 章 概述", "可复现实验"],
  },
  {
    id: "csw-02-terms-undefined-behavior-1",
    chapter: "csw-02-terms-undefined-behavior",
    level: 1,
    question: "第 2 章 需提前了解的术语和概念的核心主张是什么？",
    answer:
      "读懂 CSS 必须区分属性、值、关键字、变量、长度单位、功能符和声明，并承认规范中的未定义行为；没有定义的结果不能当作跨浏览器契约。",
    tags: ["第 2 章 需提前了解的术语和概念", "核心机制"],
  },
  {
    id: "csw-02-terms-undefined-behavior-2",
    chapter: "csw-02-terms-undefined-behavior",
    level: 2,
    question: "第 2 章 需提前了解的术语和概念覆盖哪些出版社目录条目？",
    answer:
      "第2章 需提前了解的术语和概念、2.1 务必了解的CSS世界的专业术语、2.2 了解CSS世界中的“未定义行为”",
    tags: ["第 2 章 需提前了解的术语和概念", "目录覆盖"],
  },
  {
    id: "csw-02-terms-undefined-behavior-3",
    chapter: "csw-02-terms-undefined-behavior",
    level: 2,
    question: "第 2 章 需提前了解的术语和概念的六阶段证据链是什么？",
    answer:
      "拆分规则与声明 → 辨认属性和值 → 解析关键字和单位 → 确定初始与继承 → 标记未定义行为 → 建立可移植测试",
    tags: ["第 2 章 需提前了解的术语和概念", "机制链"],
  },
  {
    id: "csw-02-terms-undefined-behavior-4",
    chapter: "csw-02-terms-undefined-behavior",
    level: 3,
    question: "第 2 章 需提前了解的术语和概念为什么不能只看最终截图？",
    answer:
      "截图会隐藏固定尺寸、错误包含块、字体偶然命中、溢出裁剪和层叠补丁，必须保存盒树、使用值与恢复轨迹。",
    tags: ["第 2 章 需提前了解的术语和概念", "故障注入"],
  },
  {
    id: "csw-02-terms-undefined-behavior-5",
    chapter: "csw-02-terms-undefined-behavior",
    level: 3,
    question: "第 2 章 需提前了解的术语和概念签发时保持什么不变量？",
    answer:
      "任何依赖未定义顺序、错误语法容错或单一浏览器偶然表现的样式，都必须通过更明确的结构和声明改写，不能用一次截图证明正确。",
    tags: ["第 2 章 需提前了解的术语和概念", "工程验收"],
  },
  {
    id: "csw-02-terms-undefined-behavior-6",
    chapter: "csw-02-terms-undefined-behavior",
    level: 3,
    question: "第 2 章 需提前了解的术语和概念怎样完成可复现实验？",
    answer:
      "固定 DOM、样式表、视口、字体和内容，依次执行正常、边界、失败和恢复样本，记录盒、包含块、使用值、行框、层级与首偏离点。",
    tags: ["第 2 章 需提前了解的术语和概念", "可复现实验"],
  },
  {
    id: "csw-03-flow-elements-sizing-1",
    chapter: "csw-03-flow-elements-sizing",
    level: 1,
    question: "第 3 章 流、元素与基本尺寸的核心主张是什么？",
    answer:
      "块级元素通过外在块级盒参与流、通过内在容器盒承载内容；width:auto 的充分利用可用宽度、收缩包裹、最小宽度和超出容器四种表现，以及内联盒和幽灵空白节点，共同决定基本尺寸。",
    tags: ["第 3 章 流、元素与基本尺寸", "核心机制"],
  },
  {
    id: "csw-03-flow-elements-sizing-2",
    chapter: "csw-03-flow-elements-sizing",
    level: 2,
    question: "第 3 章 流、元素与基本尺寸覆盖哪些出版社目录条目？",
    answer:
      "第3章 流、元素与基本尺寸、3.1 块级元素、3.1.1 为什么list-item元素会出现项目符号、3.1.2 display:inline-table的盒子是怎样组成的、3.1.3 width/height作用在哪个盒子上、3.2 width/height作用的具体细节、3.2.1 深藏不露的width:auto、3.2.2 width值作用的细节、3.2.3 CSS流体布局下的宽度分离原则、3.2.4 改变width/height作用细节的box-sizing、3.2.5 相对简单而单纯的height:auto、3.2.6 关于height:100%、3.3 CSS min-width/max-width和min-height/max-height二三事、3.3.1 为流体而生的min-width/max-width、3.3.2 与众不同的初始值、3.3.3 超越!important，超越最大、3.3.4 任意高度元素的展开收起动画技术、3.4 内联元素、3.4.1 哪些元素是内联元素、3.4.2 内联世界深入的基础——内联盒模型、3.4.3 幽灵空白节点",
    tags: ["第 3 章 流、元素与基本尺寸", "目录覆盖"],
  },
  {
    id: "csw-03-flow-elements-sizing-3",
    chapter: "csw-03-flow-elements-sizing",
    level: 2,
    question: "第 3 章 流、元素与基本尺寸的六阶段证据链是什么？",
    answer:
      "辨认外在与内在盒 → 求解 width:auto → 应用宽度分离 → 约束最小最大尺寸 → 建立内联盒模型 → 排查幽灵空白",
    tags: ["第 3 章 流、元素与基本尺寸", "机制链"],
  },
  {
    id: "csw-03-flow-elements-sizing-4",
    chapter: "csw-03-flow-elements-sizing",
    level: 3,
    question: "第 3 章 流、元素与基本尺寸为什么不能只看最终截图？",
    answer:
      "截图会隐藏固定尺寸、错误包含块、字体偶然命中、溢出裁剪和层叠补丁，必须保存盒树、使用值与恢复轨迹。",
    tags: ["第 3 章 流、元素与基本尺寸", "故障注入"],
  },
  {
    id: "csw-03-flow-elements-sizing-5",
    chapter: "csw-03-flow-elements-sizing",
    level: 3,
    question: "第 3 章 流、元素与基本尺寸签发时保持什么不变量？",
    answer:
      "先让外部尺寸由流决定，再在内层用 margin 或 padding 分离内容；只有替换元素、明确业务约束或格式化上下文要求时才固定宽高。",
    tags: ["第 3 章 流、元素与基本尺寸", "工程验收"],
  },
  {
    id: "csw-03-flow-elements-sizing-6",
    chapter: "csw-03-flow-elements-sizing",
    level: 3,
    question: "第 3 章 流、元素与基本尺寸怎样完成可复现实验？",
    answer:
      "固定 DOM、样式表、视口、字体和内容，依次执行正常、边界、失败和恢复样本，记录盒、包含块、使用值、行框、层级与首偏离点。",
    tags: ["第 3 章 流、元素与基本尺寸", "可复现实验"],
  },
  {
    id: "csw-04-box-dimensions-1",
    chapter: "csw-04-box-dimensions",
    level: 1,
    question: "第 4 章 盒尺寸四大家族的核心主张是什么？",
    answer:
      "content、padding、margin 和 border 分别控制内容生成、内边空间、外部尺寸与边界图形；百分比基准、替换元素、外边距合并和 margin:auto 分配必须放回格式化上下文理解。",
    tags: ["第 4 章 盒尺寸四大家族", "核心机制"],
  },
  {
    id: "csw-04-box-dimensions-2",
    chapter: "csw-04-box-dimensions",
    level: 2,
    question: "第 4 章 盒尺寸四大家族覆盖哪些出版社目录条目？",
    answer:
      "第4章 盒尺寸四大家族、4.1 深入理解content、4.1.1 content与替换元素、4.1.2 content内容生成技术、4.2 温和的padding属性、4.2.1 padding与元素的尺寸、4.2.2 padding的百分比值、4.2.3 标签元素内置的padding、4.2.4 padding与图形绘制、4.3 激进的margin属性、4.3.1 margin与元素尺寸以及相关布局、4.3.2 margin的百分比值、4.3.3 正确看待CSS世界里的margin合并、4.3.4 深入理解CSS中的margin:auto、4.3.5 margin无效情形解析、4.4 功勋卓越的border属性、4.4.1 为什么border-width不支持百分比值、4.4.2 了解各种border-style类型、4.4.3 border-color和color、4.4.4 border与透明边框技巧、4.4.5 border与图形构建、4.4.6 border等高布局技术",
    tags: ["第 4 章 盒尺寸四大家族", "目录覆盖"],
  },
  {
    id: "csw-04-box-dimensions-3",
    chapter: "csw-04-box-dimensions",
    level: 2,
    question: "第 4 章 盒尺寸四大家族的六阶段证据链是什么？",
    answer:
      "确定 content 来源 → 计算 padding 空间 → 求解 margin 外部尺寸 → 处理 margin 合并 → 分配 margin:auto → 绘制 border 边界",
    tags: ["第 4 章 盒尺寸四大家族", "机制链"],
  },
  {
    id: "csw-04-box-dimensions-4",
    chapter: "csw-04-box-dimensions",
    level: 3,
    question: "第 4 章 盒尺寸四大家族为什么不能只看最终截图？",
    answer:
      "截图会隐藏固定尺寸、错误包含块、字体偶然命中、溢出裁剪和层叠补丁，必须保存盒树、使用值与恢复轨迹。",
    tags: ["第 4 章 盒尺寸四大家族", "故障注入"],
  },
  {
    id: "csw-04-box-dimensions-5",
    chapter: "csw-04-box-dimensions",
    level: 3,
    question: "第 4 章 盒尺寸四大家族签发时保持什么不变量？",
    answer:
      "每次尺寸计算都写出内容盒、内边距、边框和外部尺寸四层结果；合并、auto 或替换元素参与时，必须额外记录包含块和格式化上下文。",
    tags: ["第 4 章 盒尺寸四大家族", "工程验收"],
  },
  {
    id: "csw-04-box-dimensions-6",
    chapter: "csw-04-box-dimensions",
    level: 3,
    question: "第 4 章 盒尺寸四大家族怎样完成可复现实验？",
    answer:
      "固定 DOM、样式表、视口、字体和内容，依次执行正常、边界、失败和恢复样本，记录盒、包含块、使用值、行框、层级与首偏离点。",
    tags: ["第 4 章 盒尺寸四大家族", "可复现实验"],
  },
  {
    id: "csw-05-inline-flow-1",
    chapter: "csw-05-inline-flow",
    level: 1,
    question: "第 5 章 内联元素与流的核心主张是什么？",
    answer:
      "内联格式化由字符度量、行内盒、行框盒和基线共同决定；line-height 形成行框高度，vertical-align 改变基线对齐，两者联动解释图片底部空隙、垂直居中和大值特性。",
    tags: ["第 5 章 内联元素与流", "核心机制"],
  },
  {
    id: "csw-05-inline-flow-2",
    chapter: "csw-05-inline-flow",
    level: 2,
    question: "第 5 章 内联元素与流覆盖哪些出版社目录条目？",
    answer:
      "第5章 内联元素与流、5.1 字母x——CSS世界中隐匿的举足轻重的角色、5.1.1 字母x与CSS世界的基线、5.1.2 字母x与CSS中的x-height、5.1.3 字母x与CSS中的ex、5.2 内联元素的基石line-height、5.2.1 内联元素的高度之本——line-height、5.2.2 为什么line-height可以让内联元素“垂直居中”、5.2.3 深入line-height的各类属性值、5.2.4 内联元素line-height的“大值特性”、5.3 line-height的好朋友vertical-align、5.3.1 vertical-align家族基本认识、5.3.2 vertical-align作用的前提、5.3.3 vertical-align和line-height之间的关系、5.3.4 深入理解vertical-align线性类属性值、5.3.5 深入理解vertical-align文本类属性值、5.3.6 简单了解vertical-align上标下标类属性值、5.3.7 无处不在的vertical-align、5.3.8 基于vertical-align属性的水平垂直居中弹框",
    tags: ["第 5 章 内联元素与流", "目录覆盖"],
  },
  {
    id: "csw-05-inline-flow-3",
    chapter: "csw-05-inline-flow",
    level: 2,
    question: "第 5 章 内联元素与流的六阶段证据链是什么？",
    answer:
      "读取字体 x-height → 建立内容区域 → 计算行内盒 → 形成行框盒 → 应用 line-height → 按基线 vertical-align",
    tags: ["第 5 章 内联元素与流", "机制链"],
  },
  {
    id: "csw-05-inline-flow-4",
    chapter: "csw-05-inline-flow",
    level: 3,
    question: "第 5 章 内联元素与流为什么不能只看最终截图？",
    answer:
      "截图会隐藏固定尺寸、错误包含块、字体偶然命中、溢出裁剪和层叠补丁，必须保存盒树、使用值与恢复轨迹。",
    tags: ["第 5 章 内联元素与流", "故障注入"],
  },
  {
    id: "csw-05-inline-flow-5",
    chapter: "csw-05-inline-flow",
    level: 3,
    question: "第 5 章 内联元素与流签发时保持什么不变量？",
    answer:
      "调垂直位置前先画出基线、x-height、行内盒和行框盒；若用固定 top 或负 margin 试错而说不清基线，方案不可签发。",
    tags: ["第 5 章 内联元素与流", "工程验收"],
  },
  {
    id: "csw-05-inline-flow-6",
    chapter: "csw-05-inline-flow",
    level: 3,
    question: "第 5 章 内联元素与流怎样完成可复现实验？",
    answer:
      "固定 DOM、样式表、视口、字体和内容，依次执行正常、边界、失败和恢复样本，记录盒、包含块、使用值、行框、层级与首偏离点。",
    tags: ["第 5 章 内联元素与流", "可复现实验"],
  },
  {
    id: "csw-06-flow-breaking-protection-1",
    chapter: "csw-06-flow-breaking-protection",
    level: 1,
    question: "第 6 章 流的破坏与保护的核心主张是什么？",
    answer:
      "float、absolute 和 fixed 会不同程度脱离正常流，clear、BFC、overflow、包含块、相对定位和四向偏移则负责约束或恢复布局；关键是控制破坏范围并保留流体能力。",
    tags: ["第 6 章 流的破坏与保护", "核心机制"],
  },
  {
    id: "csw-06-flow-breaking-protection-2",
    chapter: "csw-06-flow-breaking-protection",
    level: 2,
    question: "第 6 章 流的破坏与保护覆盖哪些出版社目录条目？",
    answer:
      "第6章 流的破坏与保护、6.1 魔鬼属性float、6.1.1 float的本质与特性、6.1.2 float的作用机制、6.1.3 float更深入的作用机制、6.1.4 float与流体布局、6.2 float的天然克星clear、6.2.1 什么是clear属性、6.2.2 成事不足败事有余的clear、6.3 CSS世界的结界——BFC、6.3.1 BFC的定义、6.3.2 BFC与流体布局、6.4 最佳结界overflow、6.4.1 overflow剪裁界线border box、6.4.2 了解overflow-x和overflow-y、6.4.3 overflow与滚动条、6.4.4 依赖overflow的样式表现、6.4.5 overflow与锚点定位、6.5 float的兄弟position:absolute、6.5.1 absolute的包含块、6.5.2 具有相对特性的无依赖absolute绝对定位、6.5.3 absolute与text-align、6.6 absolute与overflow、6.7 absolute与clip、6.7.1 重新认识的clip属性、6.7.2 深入了解clip的渲染、6.8 absolute的流体特性、6.8.1 当absolute遇到left/top/right/bottom属性、6.8.2 absolute的流体特性、6.8.3 absolute的margin:auto居中、6.9 position:relative才是大哥、6.9.1 relative对absolute的限制、6.9.2 relative与定位、6.9.3 relative的最小化影响原则、6.10 强悍的position:fixed固定定位、6.10.1 position:fixed不一样的“包含块”、6.10.2 position:fixed的absolute模拟、6.10.3 position:fixed与背景锁定",
    tags: ["第 6 章 流的破坏与保护", "目录覆盖"],
  },
  {
    id: "csw-06-flow-breaking-protection-3",
    chapter: "csw-06-flow-breaking-protection",
    level: 2,
    question: "第 6 章 流的破坏与保护的六阶段证据链是什么？",
    answer:
      "观察 float 环绕 → 用 clear 结束影响 → 建立 BFC 保护 → 定义 overflow 边界 → 求解 absolute 包含块 → 限制 relative 与 fixed",
    tags: ["第 6 章 流的破坏与保护", "机制链"],
  },
  {
    id: "csw-06-flow-breaking-protection-4",
    chapter: "csw-06-flow-breaking-protection",
    level: 3,
    question: "第 6 章 流的破坏与保护为什么不能只看最终截图？",
    answer:
      "截图会隐藏固定尺寸、错误包含块、字体偶然命中、溢出裁剪和层叠补丁，必须保存盒树、使用值与恢复轨迹。",
    tags: ["第 6 章 流的破坏与保护", "故障注入"],
  },
  {
    id: "csw-06-flow-breaking-protection-5",
    chapter: "csw-06-flow-breaking-protection",
    level: 3,
    question: "第 6 章 流的破坏与保护签发时保持什么不变量？",
    answer:
      "每个脱流元素都必须标注原流中缺失的空间、实际包含块、层叠位置和恢复策略；relative 只用于最小范围约束，不能无节制包裹整页。",
    tags: ["第 6 章 流的破坏与保护", "工程验收"],
  },
  {
    id: "csw-06-flow-breaking-protection-6",
    chapter: "csw-06-flow-breaking-protection",
    level: 3,
    question: "第 6 章 流的破坏与保护怎样完成可复现实验？",
    answer:
      "固定 DOM、样式表、视口、字体和内容，依次执行正常、边界、失败和恢复样本，记录盒、包含块、使用值、行框、层级与首偏离点。",
    tags: ["第 6 章 流的破坏与保护", "可复现实验"],
  },
  {
    id: "csw-07-stacking-rules-1",
    chapter: "csw-07-stacking-rules",
    level: 1,
    question: "第 7 章 CSS 世界的层叠规则的核心主张是什么？",
    answer:
      "z-index 只在层叠上下文中比较层叠水平；背景、负值、块级盒、浮动、内联内容、定位元素等按规定层叠顺序绘制，子上下文整体受父上下文约束。",
    tags: ["第 7 章 CSS 世界的层叠规则", "核心机制"],
  },
  {
    id: "csw-07-stacking-rules-2",
    chapter: "csw-07-stacking-rules",
    level: 2,
    question: "第 7 章 CSS 世界的层叠规则覆盖哪些出版社目录条目？",
    answer:
      "第7章 CSS世界的层叠规则、7.1 z-index只是CSS层叠规则中的一叶小舟、7.2 理解CSS世界的层叠上下文和层叠水平、7.2.1 什么是层叠上下文、7.2.2 什么是层叠水平、7.3 理解元素的层叠顺序、7.4 务必牢记的层叠准则、7.5 深入了解层叠上下文、7.5.1 层叠上下文的特性、7.5.2 层叠上下文的创建、7.5.3 层叠上下文与层叠顺序、7.6 z-index负值深入理解、7.7 z-index“不犯二”准则",
    tags: ["第 7 章 CSS 世界的层叠规则", "目录覆盖"],
  },
  {
    id: "csw-07-stacking-rules-3",
    chapter: "csw-07-stacking-rules",
    level: 2,
    question: "第 7 章 CSS 世界的层叠规则的六阶段证据链是什么？",
    answer:
      "识别层叠上下文 → 列出层叠水平 → 按顺序绘制 → 比较同级 z-index → 封装子上下文 → 限制层级变量",
    tags: ["第 7 章 CSS 世界的层叠规则", "机制链"],
  },
  {
    id: "csw-07-stacking-rules-4",
    chapter: "csw-07-stacking-rules",
    level: 3,
    question: "第 7 章 CSS 世界的层叠规则为什么不能只看最终截图？",
    answer:
      "截图会隐藏固定尺寸、错误包含块、字体偶然命中、溢出裁剪和层叠补丁，必须保存盒树、使用值与恢复轨迹。",
    tags: ["第 7 章 CSS 世界的层叠规则", "故障注入"],
  },
  {
    id: "csw-07-stacking-rules-5",
    chapter: "csw-07-stacking-rules",
    level: 3,
    question: "第 7 章 CSS 世界的层叠规则签发时保持什么不变量？",
    answer:
      "排查遮挡时先列上下文树，再比较同一父级下的层叠水平；禁止通过不断增大数字绕过结构问题，组件只使用有限语义层级。",
    tags: ["第 7 章 CSS 世界的层叠规则", "工程验收"],
  },
  {
    id: "csw-07-stacking-rules-6",
    chapter: "csw-07-stacking-rules",
    level: 3,
    question: "第 7 章 CSS 世界的层叠规则怎样完成可复现实验？",
    answer:
      "固定 DOM、样式表、视口、字体和内容，依次执行正常、边界、失败和恢复样本，记录盒、包含块、使用值、行框、层级与首偏离点。",
    tags: ["第 7 章 CSS 世界的层叠规则", "可复现实验"],
  },
  {
    id: "csw-08-text-processing-1",
    chapter: "csw-08-text-processing",
    level: 1,
    question: "第 8 章 强大的文本处理能力的核心主张是什么？",
    answer:
      "font-size、font-family、字重、字形、font 缩写、@font-face 与文本控制属性共同形成排版系统；单位继承、字体回退、字形可用性和断行规则决定最终文字而非单个声明。",
    tags: ["第 8 章 强大的文本处理能力", "核心机制"],
  },
  {
    id: "csw-08-text-processing-2",
    chapter: "csw-08-text-processing",
    level: 2,
    question: "第 8 章 强大的文本处理能力覆盖哪些出版社目录条目？",
    answer:
      "第8章 强大的文本处理能力、8.1 line-height的另外一个朋友font-size、8.1.1 font-size和vertical-align的隐秘故事、8.1.2 理解font-size与ex、em和rem的关系、8.1.3 理解font-size的关键字属性值、8.1.4 font-size:0与文本的隐藏、8.2 字体属性家族的大家长font-family、8.2.1 了解衬线字体和无衬线字体、8.2.2 等宽字体的实践价值、8.2.3 中文字体和英文名称、8.2.4 一些补充说明、8.3 字体家族其他成员、8.3.1 貌似粗犷、实则精细无比的font-weight、8.3.2 具有近似姐妹花属性值的font-style、8.3.3 不适合国情的font-variant、8.4 font属性、8.4.1 作为缩写的font属性、8.4.2 使用关键字值的font属性、8.4.3 font关键字属性值的应用价值、8.5 真正了解@font face规则、8.5.1 @font face的本质是变量、8.5.2 @font face与字体图标技术、8.6 文本的控制、8.6.1 text-indent与内联元素缩进、8.6.2 letter-spacing与字符间距、8.6.3 word-spacing与单词间距、8.6.4 了解word-break和word-wrap的区别、8.6.5 white-space与换行和空格的控制、8.6.6 text-align与元素对齐、8.6.7 如何解决text-decoration下划线和文本重叠的问题、8.6.8 一本万利的text-transform字符大小写、8.7 了解:first-letter/:first-line伪元素、8.7.1 深入:first-letter伪元素及其实例、8.7.2 故事相对较少的:first-line伪元素",
    tags: ["第 8 章 强大的文本处理能力", "目录覆盖"],
  },
  {
    id: "csw-08-text-processing-3",
    chapter: "csw-08-text-processing",
    level: 2,
    question: "第 8 章 强大的文本处理能力的六阶段证据链是什么？",
    answer:
      "确定字号与单位 → 选择字体回退链 → 匹配字重与字形 → 装载 @font-face → 控制间距与断行 → 应用首字与首行",
    tags: ["第 8 章 强大的文本处理能力", "机制链"],
  },
  {
    id: "csw-08-text-processing-4",
    chapter: "csw-08-text-processing",
    level: 3,
    question: "第 8 章 强大的文本处理能力为什么不能只看最终截图？",
    answer:
      "截图会隐藏固定尺寸、错误包含块、字体偶然命中、溢出裁剪和层叠补丁，必须保存盒树、使用值与恢复轨迹。",
    tags: ["第 8 章 强大的文本处理能力", "故障注入"],
  },
  {
    id: "csw-08-text-processing-5",
    chapter: "csw-08-text-processing",
    level: 3,
    question: "第 8 章 强大的文本处理能力签发时保持什么不变量？",
    answer:
      "文本验收至少覆盖中英文、数字、长 URL、缺失网络字体、放大字号和不同字重；仅在本机字体齐全时截图不能证明排版稳定。",
    tags: ["第 8 章 强大的文本处理能力", "工程验收"],
  },
  {
    id: "csw-08-text-processing-6",
    chapter: "csw-08-text-processing",
    level: 3,
    question: "第 8 章 强大的文本处理能力怎样完成可复现实验？",
    answer:
      "固定 DOM、样式表、视口、字体和内容，依次执行正常、边界、失败和恢复样本，记录盒、包含块、使用值、行框、层级与首偏离点。",
    tags: ["第 8 章 强大的文本处理能力", "可复现实验"],
  },
  {
    id: "csw-09-decoration-1",
    chapter: "csw-09-decoration",
    level: 1,
    question: "第 9 章 元素的装饰与美化的核心主张是什么？",
    answer:
      "color 提供可继承的前景色并通过 currentColor 联动边框，background 在边框盒内分层绘制颜色与图像；位置百分比、重复、固定附着和资源加载都有独立计算规则。",
    tags: ["第 9 章 元素的装饰与美化", "核心机制"],
  },
  {
    id: "csw-09-decoration-2",
    chapter: "csw-09-decoration",
    level: 2,
    question: "第 9 章 元素的装饰与美化覆盖哪些出版社目录条目？",
    answer:
      "第9章 元素的装饰与美化、9.1 CSS世界的color很单调、9.1.1 少得可怜的颜色关键字、9.1.2 不支持的transparent关键字、9.1.3 不支持的currentColor变量、9.1.4 不支持的rgba颜色和hsla颜色、9.1.5 支持却鸡肋的系统颜色、9.2 CSS世界的background很单调、9.2.1 隐藏元素的background-image到底加不加载、9.2.2 与众不同的background-position百分比计算方式、9.2.3 background-repeat与渲染性能、9.2.4 外强中干的background-attachment:fixed、9.2.5 background-color背景色永远是最低的、9.2.6 利用多背景的属性hack小技巧、9.2.7 渐变背景和rgba背景色的兼容处理",
    tags: ["第 9 章 元素的装饰与美化", "目录覆盖"],
  },
  {
    id: "csw-09-decoration-3",
    chapter: "csw-09-decoration",
    level: 2,
    question: "第 9 章 元素的装饰与美化的六阶段证据链是什么？",
    answer:
      "解析颜色值 → 传播 currentColor → 铺设背景色 → 定位背景图 → 应用重复与附着 → 验证隐藏和兼容状态",
    tags: ["第 9 章 元素的装饰与美化", "机制链"],
  },
  {
    id: "csw-09-decoration-4",
    chapter: "csw-09-decoration",
    level: 3,
    question: "第 9 章 元素的装饰与美化为什么不能只看最终截图？",
    answer:
      "截图会隐藏固定尺寸、错误包含块、字体偶然命中、溢出裁剪和层叠补丁，必须保存盒树、使用值与恢复轨迹。",
    tags: ["第 9 章 元素的装饰与美化", "故障注入"],
  },
  {
    id: "csw-09-decoration-5",
    chapter: "csw-09-decoration",
    level: 3,
    question: "第 9 章 元素的装饰与美化签发时保持什么不变量？",
    answer:
      "装饰不能改变内容可读性和盒尺寸契约；资源失败、透明颜色、系统主题和高对比模式下，仍要保留可辨认边界与文字。",
    tags: ["第 9 章 元素的装饰与美化", "工程验收"],
  },
  {
    id: "csw-09-decoration-6",
    chapter: "csw-09-decoration",
    level: 3,
    question: "第 9 章 元素的装饰与美化怎样完成可复现实验？",
    answer:
      "固定 DOM、样式表、视口、字体和内容，依次执行正常、边界、失败和恢复样本，记录盒、包含块、使用值、行框、层级与首偏离点。",
    tags: ["第 9 章 元素的装饰与美化", "可复现实验"],
  },
  {
    id: "csw-10-display-visibility-1",
    chapter: "csw-10-display-visibility",
    level: 1,
    question: "第 10 章 元素的显示与隐藏的核心主张是什么？",
    answer:
      "display:none 让元素不生成盒，visibility:hidden 保留布局盒并让可见性可被后代覆盖；隐藏策略还会影响事件命中、可访问树、资源加载和表格 collapse 行为。",
    tags: ["第 10 章 元素的显示与隐藏", "核心机制"],
  },
  {
    id: "csw-10-display-visibility-2",
    chapter: "csw-10-display-visibility",
    level: 2,
    question: "第 10 章 元素的显示与隐藏覆盖哪些出版社目录条目？",
    answer:
      "第10章 元素的显示与隐藏、10.1 display与元素的显隐、10.2 visibility与元素的显隐、10.2.1 不仅仅是保留空间这么简单、10.2.2 了解visibility:collapse",
    tags: ["第 10 章 元素的显示与隐藏", "目录覆盖"],
  },
  {
    id: "csw-10-display-visibility-3",
    chapter: "csw-10-display-visibility",
    level: 2,
    question: "第 10 章 元素的显示与隐藏的六阶段证据链是什么？",
    answer:
      "决定是否生成盒 → 计算布局占位 → 传播 visibility → 处理后代覆盖 → 核对交互与可访问性 → 比较 collapse",
    tags: ["第 10 章 元素的显示与隐藏", "机制链"],
  },
  {
    id: "csw-10-display-visibility-4",
    chapter: "csw-10-display-visibility",
    level: 3,
    question: "第 10 章 元素的显示与隐藏为什么不能只看最终截图？",
    answer:
      "截图会隐藏固定尺寸、错误包含块、字体偶然命中、溢出裁剪和层叠补丁，必须保存盒树、使用值与恢复轨迹。",
    tags: ["第 10 章 元素的显示与隐藏", "故障注入"],
  },
  {
    id: "csw-10-display-visibility-5",
    chapter: "csw-10-display-visibility",
    level: 3,
    question: "第 10 章 元素的显示与隐藏签发时保持什么不变量？",
    answer:
      "选择隐藏方案前必须写明是否保留空间、是否允许后代出现、是否可聚焦、是否读屏可见以及是否继续加载资源；只比较视觉结果不够。",
    tags: ["第 10 章 元素的显示与隐藏", "工程验收"],
  },
  {
    id: "csw-10-display-visibility-6",
    chapter: "csw-10-display-visibility",
    level: 3,
    question: "第 10 章 元素的显示与隐藏怎样完成可复现实验？",
    answer:
      "固定 DOM、样式表、视口、字体和内容，依次执行正常、边界、失败和恢复样本，记录盒、包含块、使用值、行框、层级与首偏离点。",
    tags: ["第 10 章 元素的显示与隐藏", "可复现实验"],
  },
  {
    id: "csw-11-user-interface-1",
    chapter: "csw-11-user-interface",
    level: 1,
    question: "第 11 章 用户界面样式的核心主张是什么？",
    answer:
      "outline 在边框之外绘制且不占布局空间，是键盘焦点的重要反馈；cursor 只表达可用交互意图，不能替代语义元素、真实状态和可访问名称。",
    tags: ["第 11 章 用户界面样式", "核心机制"],
  },
  {
    id: "csw-11-user-interface-2",
    chapter: "csw-11-user-interface",
    level: 2,
    question: "第 11 章 用户界面样式覆盖哪些出版社目录条目？",
    answer:
      "第11章 用户界面样式、11.1 和border形似的outline属性、11.1.1 万万不可在全局设置outline:0 none、11.1.2 真正的不占据空间的outline及其应用、11.2 光标属性cursor、11.2.1 琳琅满目的cursor属性值、11.2.2 自定义光标",
    tags: ["第 11 章 用户界面样式", "目录覆盖"],
  },
  {
    id: "csw-11-user-interface-3",
    chapter: "csw-11-user-interface",
    level: 2,
    question: "第 11 章 用户界面样式的六阶段证据链是什么？",
    answer:
      "保留原生焦点 → 绘制 outline → 处理偏移与圆角 → 选择系统 cursor → 提供自定义回退 → 核对键盘与指针",
    tags: ["第 11 章 用户界面样式", "机制链"],
  },
  {
    id: "csw-11-user-interface-4",
    chapter: "csw-11-user-interface",
    level: 3,
    question: "第 11 章 用户界面样式为什么不能只看最终截图？",
    answer:
      "截图会隐藏固定尺寸、错误包含块、字体偶然命中、溢出裁剪和层叠补丁，必须保存盒树、使用值与恢复轨迹。",
    tags: ["第 11 章 用户界面样式", "故障注入"],
  },
  {
    id: "csw-11-user-interface-5",
    chapter: "csw-11-user-interface",
    level: 3,
    question: "第 11 章 用户界面样式签发时保持什么不变量？",
    answer:
      "任何移除 outline 的规则都必须提供对比度和几何位置同等清晰的 focus-visible 替代；鼠标、键盘和触摸路径应表达同一状态。",
    tags: ["第 11 章 用户界面样式", "工程验收"],
  },
  {
    id: "csw-11-user-interface-6",
    chapter: "csw-11-user-interface",
    level: 3,
    question: "第 11 章 用户界面样式怎样完成可复现实验？",
    answer:
      "固定 DOM、样式表、视口、字体和内容，依次执行正常、边界、失败和恢复样本，记录盒、包含块、使用值、行框、层级与首偏离点。",
    tags: ["第 11 章 用户界面样式", "可复现实验"],
  },
  {
    id: "csw-12-writing-directions-1",
    chapter: "csw-12-writing-directions",
    level: 1,
    question: "第 12 章 流向的改变的核心主张是什么？",
    answer:
      "direction 与 unicode-bidi 控制双向文本嵌入，writing-mode 改变块流和内联流方向；尺寸、边距、对齐与滚动应优先使用逻辑轴推理，而不是把横排物理方向硬编码。",
    tags: ["第 12 章 流向的改变", "核心机制"],
  },
  {
    id: "csw-12-writing-directions-2",
    chapter: "csw-12-writing-directions",
    level: 2,
    question: "第 12 章 流向的改变覆盖哪些出版社目录条目？",
    answer:
      "第12章 流向的改变、12.1 改变水平流向的direction、12.1.1 direction简介、12.1.2 direction的黄金搭档unicode-bidi、12.2 改变CSS世界纵横规则的writing-mode、12.2.1 writing-mode原本的作用、12.2.2 writing-mode不经意改变了哪些规则、12.2.3 writing-mode和direction的关系",
    tags: ["第 12 章 流向的改变", "目录覆盖"],
  },
  {
    id: "csw-12-writing-directions-3",
    chapter: "csw-12-writing-directions",
    level: 2,
    question: "第 12 章 流向的改变的六阶段证据链是什么？",
    answer:
      "确定文字书写方向 → 应用双向算法 → 设置块流方向 → 重映射内联与块轴 → 改写逻辑尺寸 → 验证混合语言",
    tags: ["第 12 章 流向的改变", "机制链"],
  },
  {
    id: "csw-12-writing-directions-4",
    chapter: "csw-12-writing-directions",
    level: 3,
    question: "第 12 章 流向的改变为什么不能只看最终截图？",
    answer:
      "截图会隐藏固定尺寸、错误包含块、字体偶然命中、溢出裁剪和层叠补丁，必须保存盒树、使用值与恢复轨迹。",
    tags: ["第 12 章 流向的改变", "故障注入"],
  },
  {
    id: "csw-12-writing-directions-5",
    chapter: "csw-12-writing-directions",
    level: 3,
    question: "第 12 章 流向的改变签发时保持什么不变量？",
    answer:
      "至少用横排中英文、RTL 文本和竖排样本验收；若切换书写模式后需要大量 left、right、top、bottom 覆盖，应改用逻辑属性重建。",
    tags: ["第 12 章 流向的改变", "工程验收"],
  },
  {
    id: "csw-12-writing-directions-6",
    chapter: "csw-12-writing-directions",
    level: 3,
    question: "第 12 章 流向的改变怎样完成可复现实验？",
    answer:
      "固定 DOM、样式表、视口、字体和内容，依次执行正常、边界、失败和恢复样本，记录盒、包含块、使用值、行框、层级与首偏离点。",
    tags: ["第 12 章 流向的改变", "可复现实验"],
  },
  {
    id: "csw-official-final-review-1",
    chapter: "csw-official-final-review",
    level: 1,
    question: "《CSS 世界》全书总复习的核心主张是什么？",
    answer:
      "全书最终验收是能从 DOM 元素出发，依次解释盒生成、正常流、使用尺寸、内联基线、脱流定位、层叠绘制、文本装饰、显隐和书写方向，并用最少覆盖保持流体布局。",
    tags: ["《CSS 世界》全书总复习", "核心机制"],
  },
  {
    id: "csw-official-final-review-2",
    chapter: "csw-official-final-review",
    level: 2,
    question: "《CSS 世界》全书总复习覆盖哪些出版社目录条目？",
    answer:
      "第 1 章 概述、第 2 章 需提前了解的术语和概念、第 3 章 流、元素与基本尺寸、第 4 章 盒尺寸四大家族、第 5 章 内联元素与流、第 6 章 流的破坏与保护、第 7 章 CSS 世界的层叠规则、第 8 章 强大的文本处理能力、第 9 章 元素的装饰与美化、第 10 章 元素的显示与隐藏、第 11 章 用户界面样式、第 12 章 流向的改变",
    tags: ["《CSS 世界》全书总复习", "目录覆盖"],
  },
  {
    id: "csw-official-final-review-3",
    chapter: "csw-official-final-review",
    level: 2,
    question: "《CSS 世界》全书总复习的六阶段证据链是什么？",
    answer:
      "读取元素与声明 → 建立盒树和格式化上下文 → 求解尺寸与位置 → 形成行盒和层叠上下文 → 绘制文本与背景 → 验证显隐和流向",
    tags: ["《CSS 世界》全书总复习", "机制链"],
  },
  {
    id: "csw-official-final-review-4",
    chapter: "csw-official-final-review",
    level: 3,
    question: "《CSS 世界》全书总复习为什么不能只看最终截图？",
    answer:
      "截图会隐藏固定尺寸、错误包含块、字体偶然命中、溢出裁剪和层叠补丁，必须保存盒树、使用值与恢复轨迹。",
    tags: ["《CSS 世界》全书总复习", "故障注入"],
  },
  {
    id: "csw-official-final-review-5",
    chapter: "csw-official-final-review",
    level: 3,
    question: "《CSS 世界》全书总复习签发时保持什么不变量？",
    answer:
      "同一组件必须在窄宽、长内容、替换元素、不同字体、层叠覆盖、隐藏状态、RTL 和竖排样本中保持核心契约。",
    tags: ["《CSS 世界》全书总复习", "工程验收"],
  },
  {
    id: "csw-official-final-review-6",
    chapter: "csw-official-final-review",
    level: 3,
    question: "《CSS 世界》全书总复习怎样完成可复现实验？",
    answer:
      "固定 DOM、样式表、视口、字体和内容，依次执行正常、边界、失败和恢复样本，记录盒、包含块、使用值、行框、层级与首偏离点。",
    tags: ["《CSS 世界》全书总复习", "可复现实验"],
  },
];
