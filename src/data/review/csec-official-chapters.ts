import type { ReviewQuestion } from "./types";

export const csecOfficialQuestions: ReviewQuestion[] = [
  {
    id: "csec-official-learning-map-1",
    chapter: "csec-official-learning-map",
    level: 1,
    question: "《CSS 揭秘》权威学习地图的核心主张是什么？",
    answer:
      "按 8 章与 47 个攻略建立问题、机制、回退和验收四联表，掌握可迁移的 CSS 求解方法。",
    tags: ["《CSS 揭秘》权威学习地图", "核心机制"],
  },
  {
    id: "csec-official-learning-map-2",
    chapter: "csec-official-learning-map",
    level: 2,
    question: "《CSS 揭秘》权威学习地图覆盖哪些权威目录条目？",
    answer:
      "第1章 引言、第2章 背景与边框、第3章 形状、第4章 视觉效果、第5章 字体排印、第6章 用户体验、第7章 结构与布局、第8章 过渡与动画",
    tags: ["《CSS 揭秘》权威学习地图", "目录覆盖"],
  },
  {
    id: "csec-official-learning-map-3",
    chapter: "csec-official-learning-map",
    level: 2,
    question: "《CSS 揭秘》权威学习地图的六阶段解题链是什么？",
    answer:
      "核验版本目录 → 建立编码原则 → 推演绘制技巧 → 保护文本交互 → 验证布局动效 → 签发回退证据",
    tags: ["《CSS 揭秘》权威学习地图", "机制链"],
  },
  {
    id: "csec-official-learning-map-4",
    chapter: "csec-official-learning-map",
    level: 3,
    question: "《CSS 揭秘》权威学习地图为什么不能只看最终截图？",
    answer:
      "截图不显示规范能力、计算值、语义、命中区、焦点和自然回退；必须比较基线、增强、失败与恢复四条轨迹。",
    tags: ["《CSS 揭秘》权威学习地图", "故障注入"],
  },
  {
    id: "csec-official-learning-map-5",
    chapter: "csec-official-learning-map",
    level: 3,
    question: "《CSS 揭秘》权威学习地图签发时保持什么不变量？",
    answer:
      "每个攻略都能回答解决什么问题、依赖哪条机制、怎样回退，以及如何用边界样本证明它可维护。",
    tags: ["《CSS 揭秘》权威学习地图", "工程验收"],
  },
  {
    id: "csec-official-learning-map-6",
    chapter: "csec-official-learning-map",
    level: 3,
    question: "《CSS 揭秘》权威学习地图怎样完成可复现实验？",
    answer:
      "固定 DOM、文本、视口、字体和输入方式，每次只改变一个能力或边界变量，记录首个偏离点，删除故障后重放同一输入。",
    tags: ["《CSS 揭秘》权威学习地图", "可复现实验"],
  },
  {
    id: "csec-01-introduction-1",
    chapter: "csec-01-introduction",
    level: 1,
    question: "第 1 章 引言的核心主张是什么？",
    answer:
      "把 CSS 技巧视为受规范、回退路径和维护成本约束的问题求解，而不是记忆一次性代码片段。",
    tags: ["第 1 章 引言", "核心机制"],
  },
  {
    id: "csec-01-introduction-2",
    chapter: "csec-01-introduction",
    level: 2,
    question: "第 1 章 引言覆盖哪些权威目录条目？",
    answer: "第1章 引言、Web 标准：是敌还是友、CSS 编码技巧",
    tags: ["第 1 章 引言", "目录覆盖"],
  },
  {
    id: "csec-01-introduction-3",
    chapter: "csec-01-introduction",
    level: 2,
    question: "第 1 章 引言的六阶段解题链是什么？",
    answer:
      "定义视觉问题 → 调查标准能力 → 建立最小基线 → 组合属性副作用 → 设计回退路径 → 删除重复约束",
    tags: ["第 1 章 引言", "机制链"],
  },
  {
    id: "csec-01-introduction-4",
    chapter: "csec-01-introduction",
    level: 3,
    question: "第 1 章 引言为什么不能只看最终截图？",
    answer:
      "截图不显示规范能力、计算值、语义、命中区、焦点和自然回退；必须比较基线、增强、失败与恢复四条轨迹。",
    tags: ["第 1 章 引言", "故障注入"],
  },
  {
    id: "csec-01-introduction-5",
    chapter: "csec-01-introduction",
    level: 3,
    question: "第 1 章 引言签发时保持什么不变量？",
    answer:
      "解决方案必须说明依赖的规范能力、基线表现、增强效果与失败时的可用状态。",
    tags: ["第 1 章 引言", "工程验收"],
  },
  {
    id: "csec-01-introduction-6",
    chapter: "csec-01-introduction",
    level: 3,
    question: "第 1 章 引言怎样完成可复现实验？",
    answer:
      "固定 DOM、文本、视口、字体和输入方式，每次只改变一个能力或边界变量，记录首个偏离点，删除故障后重放同一输入。",
    tags: ["第 1 章 引言", "可复现实验"],
  },
  {
    id: "csec-02-backgrounds-borders-1",
    chapter: "csec-02-backgrounds-borders",
    level: 1,
    question: "第 2 章 背景与边框的核心主张是什么？",
    answer:
      "利用背景绘制区、渐变图像、阴影扩张和边框图像，把装饰层压缩进单个元素并保持尺寸可调。",
    tags: ["第 2 章 背景与边框", "核心机制"],
  },
  {
    id: "csec-02-backgrounds-borders-2",
    chapter: "csec-02-backgrounds-borders",
    level: 2,
    question: "第 2 章 背景与边框覆盖哪些权威目录条目？",
    answer:
      "第2章 背景与边框、1 半透明边框、2 多重边框、3 灵活的背景定位、4 边框内圆角、5 条纹背景、6 复杂的背景图案、7 伪随机背景、8 连续的图像边框",
    tags: ["第 2 章 背景与边框", "目录覆盖"],
  },
  {
    id: "csec-02-backgrounds-borders-3",
    chapter: "csec-02-backgrounds-borders",
    level: 2,
    question: "第 2 章 背景与边框的六阶段解题链是什么？",
    answer:
      "分离内容与装饰 → 标出背景绘制区 → 组合多层图像 → 校准尺寸与定位 → 验证透明边界 → 保留纯色回退",
    tags: ["第 2 章 背景与边框", "机制链"],
  },
  {
    id: "csec-02-backgrounds-borders-4",
    chapter: "csec-02-backgrounds-borders",
    level: 3,
    question: "第 2 章 背景与边框为什么不能只看最终截图？",
    answer:
      "截图不显示规范能力、计算值、语义、命中区、焦点和自然回退；必须比较基线、增强、失败与恢复四条轨迹。",
    tags: ["第 2 章 背景与边框", "故障注入"],
  },
  {
    id: "csec-02-backgrounds-borders-5",
    chapter: "csec-02-backgrounds-borders",
    level: 3,
    question: "第 2 章 背景与边框签发时保持什么不变量？",
    answer:
      "装饰层不能改变内容盒契约，透明、缩放和长内容条件下仍应出现可预测的边框与背景。",
    tags: ["第 2 章 背景与边框", "工程验收"],
  },
  {
    id: "csec-02-backgrounds-borders-6",
    chapter: "csec-02-backgrounds-borders",
    level: 3,
    question: "第 2 章 背景与边框怎样完成可复现实验？",
    answer:
      "固定 DOM、文本、视口、字体和输入方式，每次只改变一个能力或边界变量，记录首个偏离点，删除故障后重放同一输入。",
    tags: ["第 2 章 背景与边框", "可复现实验"],
  },
  {
    id: "csec-03-shapes-1",
    chapter: "csec-03-shapes",
    level: 1,
    question: "第 3 章 形状的核心主张是什么？",
    answer:
      "从盒模型、圆角半径、变换坐标和渐变切分推导形状，让内容保持正常坐标而装饰承担几何变换。",
    tags: ["第 3 章 形状", "核心机制"],
  },
  {
    id: "csec-03-shapes-2",
    chapter: "csec-03-shapes",
    level: 2,
    question: "第 3 章 形状覆盖哪些权威目录条目？",
    answer:
      "第3章 形状、9 自适应的椭圆、10 平行四边形、11 菱形图片、12 切角效果、13 梯形标签页、14 简单的饼图",
    tags: ["第 3 章 形状", "目录覆盖"],
  },
  {
    id: "csec-03-shapes-3",
    chapter: "csec-03-shapes",
    level: 2,
    question: "第 3 章 形状的六阶段解题链是什么？",
    answer:
      "确定基础矩形 → 选择几何原语 → 隔离内容坐标 → 调整变换原点 → 注入非方形边界 → 验证自适应尺寸",
    tags: ["第 3 章 形状", "机制链"],
  },
  {
    id: "csec-03-shapes-4",
    chapter: "csec-03-shapes",
    level: 3,
    question: "第 3 章 形状为什么不能只看最终截图？",
    answer:
      "截图不显示规范能力、计算值、语义、命中区、焦点和自然回退；必须比较基线、增强、失败与恢复四条轨迹。",
    tags: ["第 3 章 形状", "故障注入"],
  },
  {
    id: "csec-03-shapes-5",
    chapter: "csec-03-shapes",
    level: 3,
    question: "第 3 章 形状签发时保持什么不变量？",
    answer:
      "视觉几何变化不能扭曲文本、破坏点击区域或依赖固定宽高；形状在长内容和缩放下仍可解释。",
    tags: ["第 3 章 形状", "工程验收"],
  },
  {
    id: "csec-03-shapes-6",
    chapter: "csec-03-shapes",
    level: 3,
    question: "第 3 章 形状怎样完成可复现实验？",
    answer:
      "固定 DOM、文本、视口、字体和输入方式，每次只改变一个能力或边界变量，记录首个偏离点，删除故障后重放同一输入。",
    tags: ["第 3 章 形状", "可复现实验"],
  },
  {
    id: "csec-04-visual-effects-1",
    chapter: "csec-04-visual-effects",
    level: 1,
    question: "第 4 章 视觉效果的核心主张是什么？",
    answer:
      "区分盒阴影、像素轮廓和背景采样，选择与目标轮廓一致的绘制机制，并为滤镜能力准备可读回退。",
    tags: ["第 4 章 视觉效果", "核心机制"],
  },
  {
    id: "csec-04-visual-effects-2",
    chapter: "csec-04-visual-effects",
    level: 2,
    question: "第 4 章 视觉效果覆盖哪些权威目录条目？",
    answer:
      "第4章 视觉效果、15 单侧投影、16 不规则投影、17 染色效果、18 毛玻璃效果、19 折角效果",
    tags: ["第 4 章 视觉效果", "目录覆盖"],
  },
  {
    id: "csec-04-visual-effects-3",
    chapter: "csec-04-visual-effects",
    level: 2,
    question: "第 4 章 视觉效果的六阶段解题链是什么？",
    answer:
      "识别目标轮廓 → 选择绘制阶段 → 裁剪多余阴影 → 建立背景采样 → 控制对比度 → 验证无滤镜回退",
    tags: ["第 4 章 视觉效果", "机制链"],
  },
  {
    id: "csec-04-visual-effects-4",
    chapter: "csec-04-visual-effects",
    level: 3,
    question: "第 4 章 视觉效果为什么不能只看最终截图？",
    answer:
      "截图不显示规范能力、计算值、语义、命中区、焦点和自然回退；必须比较基线、增强、失败与恢复四条轨迹。",
    tags: ["第 4 章 视觉效果", "故障注入"],
  },
  {
    id: "csec-04-visual-effects-5",
    chapter: "csec-04-visual-effects",
    level: 3,
    question: "第 4 章 视觉效果签发时保持什么不变量？",
    answer:
      "效果应匹配真实轮廓并维持文本对比度；关闭滤镜、透明或混合能力后，信息仍然清楚可读。",
    tags: ["第 4 章 视觉效果", "工程验收"],
  },
  {
    id: "csec-04-visual-effects-6",
    chapter: "csec-04-visual-effects",
    level: 3,
    question: "第 4 章 视觉效果怎样完成可复现实验？",
    answer:
      "固定 DOM、文本、视口、字体和输入方式，每次只改变一个能力或边界变量，记录首个偏离点，删除故障后重放同一输入。",
    tags: ["第 4 章 视觉效果", "可复现实验"],
  },
  {
    id: "csec-05-typography-1",
    chapter: "csec-05-typography",
    level: 1,
    question: "第 5 章 字体排印的核心主张是什么？",
    answer:
      "把字体度量、语言、行框和装饰绘制作为同一排印系统，先保证可读文本，再渐进增强连字、下划线和路径效果。",
    tags: ["第 5 章 字体排印", "核心机制"],
  },
  {
    id: "csec-05-typography-2",
    chapter: "csec-05-typography",
    level: 2,
    question: "第 5 章 字体排印覆盖哪些权威目录条目？",
    answer:
      "第5章 字体排印、20 连字符断行、21 插入换行、22 文本行的斑马条纹、23 调整 tab 的宽度、24 连字、25 华丽的 & 符号、26 自定义下划线、27 现实中的文字效果、28 环形文字",
    tags: ["第 5 章 字体排印", "目录覆盖"],
  },
  {
    id: "csec-05-typography-3",
    chapter: "csec-05-typography",
    level: 2,
    question: "第 5 章 字体排印的六阶段解题链是什么？",
    answer:
      "声明语言与字体 → 稳定行框节奏 → 控制断行空白 → 启用字形特性 → 叠加文本装饰 → 验证复制与缩放",
    tags: ["第 5 章 字体排印", "机制链"],
  },
  {
    id: "csec-05-typography-4",
    chapter: "csec-05-typography",
    level: 3,
    question: "第 5 章 字体排印为什么不能只看最终截图？",
    answer:
      "截图不显示规范能力、计算值、语义、命中区、焦点和自然回退；必须比较基线、增强、失败与恢复四条轨迹。",
    tags: ["第 5 章 字体排印", "故障注入"],
  },
  {
    id: "csec-05-typography-5",
    chapter: "csec-05-typography",
    level: 3,
    question: "第 5 章 字体排印签发时保持什么不变量？",
    answer:
      "排印增强不能损害文本语义、复制顺序、语言断行和缩放可读性，缺少高级字体能力时仍保留正文。",
    tags: ["第 5 章 字体排印", "工程验收"],
  },
  {
    id: "csec-05-typography-6",
    chapter: "csec-05-typography",
    level: 3,
    question: "第 5 章 字体排印怎样完成可复现实验？",
    answer:
      "固定 DOM、文本、视口、字体和输入方式，每次只改变一个能力或边界变量，记录首个偏离点，删除故障后重放同一输入。",
    tags: ["第 5 章 字体排印", "可复现实验"],
  },
  {
    id: "csec-06-user-experience-1",
    chapter: "csec-06-user-experience",
    level: 1,
    question: "第 6 章 用户体验的核心主张是什么？",
    answer:
      "把视觉反馈与真实交互语义绑定，扩大目标但不改变布局，定制控件但不丢键盘、焦点、状态和可访问名称。",
    tags: ["第 6 章 用户体验", "核心机制"],
  },
  {
    id: "csec-06-user-experience-2",
    chapter: "csec-06-user-experience",
    level: 2,
    question: "第 6 章 用户体验覆盖哪些权威目录条目？",
    answer:
      "第6章 用户体验、29 选用合适的鼠标光标、30 扩大可点击区域、31 自定义复选框、32 通过阴影来弱化背景、33 通过模糊来弱化背景、34 滚动提示、35 交互式的图片对比控件",
    tags: ["第 6 章 用户体验", "目录覆盖"],
  },
  {
    id: "csec-06-user-experience-3",
    chapter: "csec-06-user-experience",
    level: 2,
    question: "第 6 章 用户体验的六阶段解题链是什么？",
    answer:
      "确认原生语义 → 定义输入状态 → 扩大命中区域 → 绘制清晰反馈 → 处理遮罩与滚动 → 完成键盘验收",
    tags: ["第 6 章 用户体验", "机制链"],
  },
  {
    id: "csec-06-user-experience-4",
    chapter: "csec-06-user-experience",
    level: 3,
    question: "第 6 章 用户体验为什么不能只看最终截图？",
    answer:
      "截图不显示规范能力、计算值、语义、命中区、焦点和自然回退；必须比较基线、增强、失败与恢复四条轨迹。",
    tags: ["第 6 章 用户体验", "故障注入"],
  },
  {
    id: "csec-06-user-experience-5",
    chapter: "csec-06-user-experience",
    level: 3,
    question: "第 6 章 用户体验签发时保持什么不变量？",
    answer:
      "鼠标、键盘和触摸必须得到一致状态；扩大命中区、弱化背景或定制控件不能遮挡焦点与可访问名称。",
    tags: ["第 6 章 用户体验", "工程验收"],
  },
  {
    id: "csec-06-user-experience-6",
    chapter: "csec-06-user-experience",
    level: 3,
    question: "第 6 章 用户体验怎样完成可复现实验？",
    answer:
      "固定 DOM、文本、视口、字体和输入方式，每次只改变一个能力或边界变量，记录首个偏离点，删除故障后重放同一输入。",
    tags: ["第 6 章 用户体验", "可复现实验"],
  },
  {
    id: "csec-07-structure-layout-1",
    chapter: "csec-07-structure-layout",
    level: 1,
    question: "第 7 章 结构与布局的核心主张是什么？",
    answer:
      "让内容、容器和视口各自承担尺寸责任，用内在尺寸、表格算法、选择器计数与弹性空间解决结构问题。",
    tags: ["第 7 章 结构与布局", "核心机制"],
  },
  {
    id: "csec-07-structure-layout-2",
    chapter: "csec-07-structure-layout",
    level: 2,
    question: "第 7 章 结构与布局覆盖哪些权威目录条目？",
    answer:
      "第7章 结构与布局、36 自适应内部元素、37 精确控制表格列宽、38 根据兄弟元素的数量来设置样式、39 满幅的背景，定宽的内容、40 垂直居中、41 紧贴底部的页脚",
    tags: ["第 7 章 结构与布局", "目录覆盖"],
  },
  {
    id: "csec-07-structure-layout-3",
    chapter: "csec-07-structure-layout",
    level: 2,
    question: "第 7 章 结构与布局的六阶段解题链是什么？",
    answer:
      "标出尺寸所有者 → 测量内在尺寸 → 选择布局算法 → 分离背景与内容 → 分配剩余空间 → 注入长短内容",
    tags: ["第 7 章 结构与布局", "机制链"],
  },
  {
    id: "csec-07-structure-layout-4",
    chapter: "csec-07-structure-layout",
    level: 3,
    question: "第 7 章 结构与布局为什么不能只看最终截图？",
    answer:
      "截图不显示规范能力、计算值、语义、命中区、焦点和自然回退；必须比较基线、增强、失败与恢复四条轨迹。",
    tags: ["第 7 章 结构与布局", "故障注入"],
  },
  {
    id: "csec-07-structure-layout-5",
    chapter: "csec-07-structure-layout",
    level: 3,
    question: "第 7 章 结构与布局签发时保持什么不变量？",
    answer:
      "布局尺寸应由内容与可用空间共同决定，短内容不漂移、长内容不溢出，背景与正文宽度职责清晰。",
    tags: ["第 7 章 结构与布局", "工程验收"],
  },
  {
    id: "csec-07-structure-layout-6",
    chapter: "csec-07-structure-layout",
    level: 3,
    question: "第 7 章 结构与布局怎样完成可复现实验？",
    answer:
      "固定 DOM、文本、视口、字体和输入方式，每次只改变一个能力或边界变量，记录首个偏离点，删除故障后重放同一输入。",
    tags: ["第 7 章 结构与布局", "可复现实验"],
  },
  {
    id: "csec-08-transitions-animations-1",
    chapter: "csec-08-transitions-animations",
    level: 1,
    question: "第 8 章 过渡与动画的核心主张是什么？",
    answer:
      "把时间函数、离散帧、状态连续性和坐标变换分开推导，保证运动传达因果，并为减少动态偏好提供静态状态。",
    tags: ["第 8 章 过渡与动画", "核心机制"],
  },
  {
    id: "csec-08-transitions-animations-2",
    chapter: "csec-08-transitions-animations",
    level: 2,
    question: "第 8 章 过渡与动画覆盖哪些权威目录条目？",
    answer:
      "第8章 过渡与动画、42 缓动效果、43 逐帧动画、44 闪烁效果、45 打字动画、46 状态平滑的动画、47 沿环形路径平移的动画",
    tags: ["第 8 章 过渡与动画", "目录覆盖"],
  },
  {
    id: "csec-08-transitions-animations-3",
    chapter: "csec-08-transitions-animations",
    level: 2,
    question: "第 8 章 过渡与动画的六阶段解题链是什么？",
    answer:
      "定义状态端点 → 选择连续或离散 → 设计时间函数 → 控制变换原点 → 处理中途反转 → 验证减少动态",
    tags: ["第 8 章 过渡与动画", "机制链"],
  },
  {
    id: "csec-08-transitions-animations-4",
    chapter: "csec-08-transitions-animations",
    level: 3,
    question: "第 8 章 过渡与动画为什么不能只看最终截图？",
    answer:
      "截图不显示规范能力、计算值、语义、命中区、焦点和自然回退；必须比较基线、增强、失败与恢复四条轨迹。",
    tags: ["第 8 章 过渡与动画", "故障注入"],
  },
  {
    id: "csec-08-transitions-animations-5",
    chapter: "csec-08-transitions-animations",
    level: 3,
    question: "第 8 章 过渡与动画签发时保持什么不变量？",
    answer:
      "动画的端点、时间和坐标都可解释；中途反转不跳变，减少动态模式下仍能辨认最终状态。",
    tags: ["第 8 章 过渡与动画", "工程验收"],
  },
  {
    id: "csec-08-transitions-animations-6",
    chapter: "csec-08-transitions-animations",
    level: 3,
    question: "第 8 章 过渡与动画怎样完成可复现实验？",
    answer:
      "固定 DOM、文本、视口、字体和输入方式，每次只改变一个能力或边界变量，记录首个偏离点，删除故障后重放同一输入。",
    tags: ["第 8 章 过渡与动画", "可复现实验"],
  },
  {
    id: "csec-official-final-review-1",
    chapter: "csec-official-final-review",
    level: 1,
    question: "《CSS 揭秘》全书总复习的核心主张是什么？",
    answer:
      "用同一组件贯穿背景、形状、视觉、排印、体验、布局与动效，复核 47 个攻略的机制边界。",
    tags: ["《CSS 揭秘》全书总复习", "核心机制"],
  },
  {
    id: "csec-official-final-review-2",
    chapter: "csec-official-final-review",
    level: 2,
    question: "《CSS 揭秘》全书总复习覆盖哪些权威目录条目？",
    answer:
      "第1章 引言、第2章 背景与边框、第3章 形状、第4章 视觉效果、第5章 字体排印、第6章 用户体验、第7章 结构与布局、第8章 过渡与动画",
    tags: ["《CSS 揭秘》全书总复习", "目录覆盖"],
  },
  {
    id: "csec-official-final-review-3",
    chapter: "csec-official-final-review",
    level: 2,
    question: "《CSS 揭秘》全书总复习的六阶段解题链是什么？",
    answer:
      "重述视觉契约 → 选择最少机制 → 构造正常样本 → 注入能力缺失 → 检查语义性能 → 恢复并签发",
    tags: ["《CSS 揭秘》全书总复习", "机制链"],
  },
  {
    id: "csec-official-final-review-4",
    chapter: "csec-official-final-review",
    level: 3,
    question: "《CSS 揭秘》全书总复习为什么不能只看最终截图？",
    answer:
      "截图不显示规范能力、计算值、语义、命中区、焦点和自然回退；必须比较基线、增强、失败与恢复四条轨迹。",
    tags: ["《CSS 揭秘》全书总复习", "故障注入"],
  },
  {
    id: "csec-official-final-review-5",
    chapter: "csec-official-final-review",
    level: 3,
    question: "《CSS 揭秘》全书总复习签发时保持什么不变量？",
    answer:
      "任一增强能力被关闭后内容、交互和布局仍成立；恢复能力后不残留重复规则或状态跳变。",
    tags: ["《CSS 揭秘》全书总复习", "工程验收"],
  },
  {
    id: "csec-official-final-review-6",
    chapter: "csec-official-final-review",
    level: 3,
    question: "《CSS 揭秘》全书总复习怎样完成可复现实验？",
    answer:
      "固定 DOM、文本、视口、字体和输入方式，每次只改变一个能力或边界变量，记录首个偏离点，删除故障后重放同一输入。",
    tags: ["《CSS 揭秘》全书总复习", "可复现实验"],
  },
];
