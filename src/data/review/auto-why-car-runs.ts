import type { ReviewQuestion } from "./types";

export const autoWhyCarRunsQuestions: ReviewQuestion[] = [
  {
    id: "auto-learning-map-1",
    chapter: "auto-learning-map",
    level: 1,
    question: "全书用哪几个主问题组织汽车构造学习？",
    answer:
      "主问题是：为什么能跑、为什么能转、为什么能停、为什么能稳、燃油车和新能源车差在哪里、汽车如何被设计和制造出来。",
    tags: ["学习地图", "系统问题"],
  },
  {
    id: "auto-whole-car-1",
    chapter: "auto-whole-car-system",
    level: 1,
    question: "为什么不能把汽车简单理解成“发动机加四个轮子”？",
    answer:
      "因为汽车是系统工程：车身提供空间和安全，动力系统产生扭矩，变速器和传动系统传递扭矩，底盘控制姿态，制动负责减速，电气电子负责感知和控制，轮胎最终把力传给路面。",
    tags: ["整车", "系统视角"],
  },
  {
    id: "auto-body-1",
    chapter: "auto-body-structure",
    level: 2,
    question: "车身为什么不只是外壳？",
    answer:
      "车身同时承担空间、安全、空气动力、材料和制造职责。承载式车身还直接参与受力，碰撞时要通过结构路径吸能并保护乘员舱。",
    tags: ["车身", "承载式车身", "安全"],
  },
  {
    id: "auto-engine-1",
    chapter: "auto-engine-principles",
    level: 2,
    question: "四冲程发动机如何把燃油能量变成机械扭矩？",
    answer:
      "进气吸入混合气，压缩提高燃烧条件，做功冲程燃烧推动活塞，活塞通过连杆带动曲轴旋转，排气排出废气。连续循环后曲轴输出扭矩。",
    tags: ["发动机", "四冲程", "曲轴"],
  },
  {
    id: "auto-transmission-1",
    chapter: "auto-transmission-principles",
    level: 2,
    question: "为什么汽车需要变速器？",
    answer:
      "发动机高效工作区和车轮所需转速并不一致。变速器用不同传动比在低速时放大扭矩，在高速时降低发动机转速，让动力源适配不同车速。",
    tags: ["变速器", "齿比", "扭矩"],
  },
  {
    id: "auto-drivetrain-1",
    chapter: "auto-drivetrain-system",
    level: 2,
    question: "差速器为什么是转弯时的关键部件？",
    answer:
      "车辆转弯时外侧车轮路径更长，必须比内侧轮转得更快。差速器允许左右轮存在转速差，同时继续传递动力。",
    tags: ["差速器", "转弯", "传动"],
  },
  {
    id: "auto-suspension-1",
    chapter: "auto-suspension-system",
    level: 2,
    question: "悬架为什么要同时考虑舒适性和操控性？",
    answer:
      "弹簧和减振器要吸收路面冲击，让车身不剧烈晃动；同时又要让轮胎尽量贴地，保持转向、制动和驱动所需的抓地。",
    tags: ["悬架", "阻尼", "抓地"],
  },
  {
    id: "auto-steering-1",
    chapter: "auto-steering-system",
    level: 1,
    question: "方向盘到车轮之间的基本转向链路是什么？",
    answer:
      "方向盘带动转向柱，转向机把旋转转成横向移动，转向拉杆推动转向节，最终让前轮产生转角。助力系统降低驾驶者需要施加的力。",
    tags: ["转向", "转向机", "转向拉杆"],
  },
  {
    id: "auto-brake-1",
    chapter: "auto-brake-system",
    level: 2,
    question: "为什么刹车距离不只由刹车盘和卡钳决定？",
    answer:
      "刹车系统产生制动力，但制动力必须通过轮胎传给地面。车速、车重、路面、轮胎抓地、ABS 介入和热衰减都会影响最终制动距离。",
    tags: ["制动", "轮胎", "ABS"],
  },
  {
    id: "auto-electronics-1",
    chapter: "auto-electronics-system",
    level: 2,
    question: "主动安全和被动安全的区别是什么？",
    answer:
      "主动安全在事故前尽量避免风险，例如 ABS、ESP、AEB；被动安全在事故发生时降低伤害，例如安全气囊、安全带和车身吸能结构。",
    tags: ["主动安全", "被动安全", "电子系统"],
  },
  {
    id: "auto-tire-1",
    chapter: "auto-tire-wheel-system",
    level: 2,
    question: "为什么轮胎是整车系统的共同出口？",
    answer:
      "动力、制动、转向和稳定控制最终都要通过轮胎接地印迹与路面交换力。轮胎抓地不足时，再强的发动机、刹车或电子系统都无法完全发挥。",
    tags: ["轮胎", "接地印迹", "抓地"],
  },
  {
    id: "auto-electric-1",
    chapter: "auto-electric-drive-system",
    level: 2,
    question: "BEV 为什么通常可以减少传统多挡变速器复杂度？",
    answer:
      "电机低速就能输出较大扭矩，转速范围也宽，纯电车常用固定减速器即可覆盖多数工况，不再依赖复杂多挡变速器维持动力输出。",
    tags: ["BEV", "电机", "减速器"],
  },
  {
    id: "auto-manufacturing-1",
    chapter: "auto-design-manufacturing",
    level: 2,
    question: "冲压、焊装、涂装、总装分别解决什么问题？",
    answer:
      "冲压把板材压成钣金件；焊装把钣金件连接成白车身；涂装提供防腐、颜色和外观；总装把动力、底盘、内饰、电器等装成完整车辆。",
    tags: ["制造", "四大工艺", "白车身"],
  },
  {
    id: "auto-final-1",
    chapter: "auto-final-review",
    level: 4,
    question: "用一条链路解释“汽车为什么会跑”，并指出新能源车改变了哪几个节点。",
    answer:
      "燃油车链路是燃油 -> 发动机 -> 变速器 -> 传动系统 -> 轮胎 -> 路面。新能源车把燃油和发动机换成电池/燃料电池、电控和电机，常减少传统多挡变速器复杂度，并加入能量回收，但轮胎仍是力进入路面的出口。",
    tags: ["总复习", "动力链", "新能源"],
  },
];
