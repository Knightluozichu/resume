"use client";

import { useEffect, useMemo, useState } from "react";

type ModuleKey =
  | "body"
  | "power"
  | "transmission"
  | "chassis"
  | "electronics"
  | "safety"
  | "tires";

type LayoutMode = "fwd" | "rwd" | "awd";
type BodyType = "unibody" | "bodyOnFrame";
type BodyMaterial = "steel" | "aluminum" | "composite";
type StrokeKey = "intake" | "compression" | "power" | "exhaust";
type IntakeMode = "natural" | "turbo" | "supercharged";
type TransmissionMode = "mt" | "at" | "cvt" | "dct";
type DrivetrainLayout = "fwd" | "rwd" | "awd" | "partTime4wd";
type DifferentialMode = "open" | "lsd" | "locked";
type SuspensionType = "macpherson" | "doubleWishbone" | "multiLink";
type RoadMode = "bump" | "corner" | "rough";
type SteeringAssist = "mechanical" | "hydraulic" | "electric";
type FourWheelSteerMode = "frontOnly" | "lowSpeed" | "highSpeed";
type BrakeType = "disc" | "drum";
type BrakeScenario = "normal" | "wet" | "fade";
type ElectronicsSensor =
  | "camera"
  | "radar"
  | "ultrasonic"
  | "wheelSpeed"
  | "cabinTemp";
type SafetyMode = "active" | "passive" | "comfort";
type ElectronicsScenario = "cruise" | "emergencyBrake" | "airbag" | "cooling";
type TireRoad = "dry" | "wet" | "snow";
type TirePattern = "summer" | "allSeason" | "winter";
type ElectricDriveType = "hev" | "phev" | "bev" | "fcev";
type ElectricEnergyMode = "drive" | "regen" | "charge";
type ManufacturingStage =
  | "design"
  | "prototype"
  | "aero"
  | "stamping"
  | "welding"
  | "painting"
  | "assembly"
  | "quality";
type BodyShape = "boxy" | "fastback" | "streamlined";
type FinalReviewPath = "fuel" | "electric" | "stability";

const MODULES: Record<
  ModuleKey,
  { label: string; role: string; color: string; x: number; y: number }
> = {
  body: {
    label: "车身",
    role: "提供乘员空间、碰撞吸能和零部件安装骨架。",
    color: "#60a5fa",
    x: 305,
    y: 82,
  },
  power: {
    label: "动力源",
    role: "把燃油或电能变成可输出的旋转动力。",
    color: "#f97316",
    x: 165,
    y: 165,
  },
  transmission: {
    label: "传动",
    role: "把动力调速、分配，再送到需要驱动的车轮。",
    color: "#a855f7",
    x: 315,
    y: 170,
  },
  chassis: {
    label: "底盘",
    role: "承载悬架、转向、制动，让车能稳、能转、能停。",
    color: "#22c55e",
    x: 455,
    y: 168,
  },
  electronics: {
    label: "电气电子",
    role: "连接传感器、控制器和执行器，是现代汽车的大脑和神经。",
    color: "#06b6d4",
    x: 365,
    y: 245,
  },
  safety: {
    label: "安全",
    role: "主动预防风险，被动保护乘员。",
    color: "#ef4444",
    x: 505,
    y: 245,
  },
  tires: {
    label: "车轮轮胎",
    role: "真正接触地面的部件，决定抓地、制动和转向极限。",
    color: "#64748b",
    x: 132,
    y: 256,
  },
};

const DRIVE_LAYOUTS: Record<
  LayoutMode,
  { label: string; short: string; driven: string; path: string[] }
> = {
  fwd: {
    label: "前置前驱",
    short: "动力源、变速器和驱动轮集中在车头，结构紧凑。",
    driven: "前轮",
    path: ["发动机/电机", "变速器", "前半轴", "前轮", "地面反作用力"],
  },
  rwd: {
    label: "前置后驱",
    short: "动力从车头经传动轴送到后桥，前轮主要负责转向。",
    driven: "后轮",
    path: ["发动机", "变速器", "传动轴", "后差速器", "后轮"],
  },
  awd: {
    label: "四轮驱动",
    short: "动力可分配到前后轴，抓地差时更容易保持牵引。",
    driven: "四个车轮",
    path: ["动力源", "中央分配", "前后差速器", "四个车轮", "地面"],
  },
};

const FLOW_STEPS = [
  {
    title: "1. 动力源输出",
    text: "发动机或电机先产生旋转动力，车身本身不会被直接推着走。",
  },
  {
    title: "2. 变速与传动",
    text: "变速器和传动系统把转速、扭矩和方向整理成车轮能用的形式。",
  },
  {
    title: "3. 车轮抓地",
    text: "驱动轮推地，地面反作用力把整车往前带。",
  },
  {
    title: "4. 系统协同",
    text: "悬架、转向、制动、电子和安全系统同时工作，车才跑得稳。",
  },
] as const;

const BOOK_CHAPTERS = [
  ["整车", "先建立系统地图"],
  ["车身", "空间、安全和制造骨架"],
  ["发动机", "燃油动力从哪里来"],
  ["变速器", "为什么要换挡"],
  ["传动系统", "动力怎样送到车轮"],
  ["悬架系统", "为什么颠簸时还能稳"],
  ["转向系统", "方向盘怎样控制车轮"],
  ["制动系统", "汽车如何安全停下"],
  ["电气电子", "现代汽车的大脑和神经"],
  ["车轮轮胎", "接触地面的唯一部件"],
  ["电力驱动", "新能源车的动力链"],
  ["设计制造", "从草图到量产"],
] as const;

const BODY_TYPES: Record<
  BodyType,
  { label: string; summary: string; tradeoff: string }
> = {
  unibody: {
    label: "承载式车身",
    summary: "车身壳体和底部结构一起承力，乘用车常见。",
    tradeoff: "空间利用好、重量容易控制，但越野大载荷改装余量较小。",
  },
  bodyOnFrame: {
    label: "非承载式车身",
    summary: "车架像梯子一样先承力，车身再安装在车架上。",
    tradeoff: "抗扭和承载强，适合硬派越野和货车，但通常更重。",
  },
};

const BODY_MATERIALS: Record<
  BodyMaterial,
  { label: string; role: string; cost: string; color: string }
> = {
  steel: {
    label: "高强钢",
    role: "常用于乘员舱骨架，负责抗变形和保护生存空间。",
    cost: "成本低，维修体系成熟，重量较高。",
    color: "#60a5fa",
  },
  aluminum: {
    label: "铝合金",
    role: "常用于覆盖件、机舱盖或轻量化结构。",
    cost: "更轻但制造和维修成本更高。",
    color: "#f59e0b",
  },
  composite: {
    label: "复合材料",
    role: "用于减重、外覆盖或特殊性能区域。",
    cost: "可塑性强，但成本和回收难度更高。",
    color: "#22c55e",
  },
};

const CRASH_STEPS = [
  {
    title: "1. 前端吸能",
    text: "保险杠横梁和前纵梁先变形，把瞬间冲击拉长成更可控的过程。",
  },
  {
    title: "2. 力沿结构分流",
    text: "纵梁、门槛梁、A 柱把载荷绕开乘员舱，不能让力集中在一点。",
  },
  {
    title: "3. 乘员舱保持形状",
    text: "高强钢骨架尽量不变形，留出生存空间。",
  },
  {
    title: "4. 约束系统接力",
    text: "安全带和气囊把人体减速度控制住，车身结构和安全系统一起工作。",
  },
] as const;

const ENGINE_STROKES: Record<
  StrokeKey,
  {
    label: string;
    pistonY: number;
    crankAngle: number;
    intakeOpen: boolean;
    exhaustOpen: boolean;
    spark: boolean;
    summary: string;
  }
> = {
  intake: {
    label: "进气",
    pistonY: 205,
    crankAngle: 40,
    intakeOpen: true,
    exhaustOpen: false,
    spark: false,
    summary: "活塞下行，进气门打开，空气和燃油混合气进入气缸。",
  },
  compression: {
    label: "压缩",
    pistonY: 124,
    crankAngle: 130,
    intakeOpen: false,
    exhaustOpen: false,
    spark: false,
    summary: "活塞上行，两个气门关闭，混合气被压缩，等待点火。",
  },
  power: {
    label: "做功",
    pistonY: 205,
    crankAngle: 220,
    intakeOpen: false,
    exhaustOpen: false,
    spark: true,
    summary: "火花塞点燃混合气，膨胀气体把活塞往下推，曲轴输出动力。",
  },
  exhaust: {
    label: "排气",
    pistonY: 124,
    crankAngle: 310,
    intakeOpen: false,
    exhaustOpen: true,
    spark: false,
    summary: "活塞上行，排气门打开，把燃烧后的废气推出气缸。",
  },
};

const STROKE_ORDER: StrokeKey[] = ["intake", "compression", "power", "exhaust"];

const INTAKE_MODES: Record<
  IntakeMode,
  { label: string; path: string[]; summary: string }
> = {
  natural: {
    label: "自然吸气",
    path: ["空气滤清器", "节气门", "进气歧管", "气缸"],
    summary: "靠活塞下行形成的压差吸入空气，结构直接、响应自然。",
  },
  turbo: {
    label: "涡轮增压",
    path: ["废气推动涡轮", "压气机压缩空气", "中冷器降温", "气缸"],
    summary: "利用废气能量压缩进气，提升进气量和动力，但控制更复杂。",
  },
  supercharged: {
    label: "机械增压",
    path: ["曲轴带动增压器", "压缩空气", "进气歧管", "气缸"],
    summary: "由发动机机械带动压气，低转响应好，但会消耗一部分输出功。",
  },
};

const GEAR_RATIOS = [3.8, 2.35, 1.55, 1.1, 0.82, 0.62] as const;

const TRANSMISSION_MODES: Record<
  TransmissionMode,
  { label: string; summary: string; path: string[] }
> = {
  mt: {
    label: "MT 手动变速器",
    summary: "驾驶者踩离合、拨挡，齿轮组按固定齿比传递动力。",
    path: ["离合器", "输入轴", "齿轮组", "同步器", "输出轴"],
  },
  at: {
    label: "AT 自动变速器",
    summary: "液力变矩器负责柔性连接，行星齿轮组通过锁止组合得到不同挡位。",
    path: ["液力变矩器", "油泵", "离合器/制动器", "行星齿轮", "输出轴"],
  },
  cvt: {
    label: "CVT 无级变速器",
    summary: "钢带和可变直径锥轮连续改变传动比，没有清晰的固定挡位台阶。",
    path: ["主动锥轮", "钢带", "从动锥轮", "液压控制", "输出轴"],
  },
  dct: {
    label: "DCT 双离合变速器",
    summary: "奇数挡和偶数挡由两套离合器预先准备，换挡时交替接合。",
    path: ["离合器 A", "奇数挡轴", "离合器 B", "偶数挡轴", "输出轴"],
  },
};

const DRIVETRAIN_LAYOUTS: Record<
  DrivetrainLayout,
  {
    label: string;
    summary: string;
    path: string[];
    frontShare: number;
    rearShare: number;
  }
> = {
  fwd: {
    label: "前驱 FWD",
    summary: "变速器、主减速器和前差速器集中在车头，半轴直接驱动前轮。",
    path: ["变速器", "前差速器", "左右前半轴", "前轮"],
    frontShare: 100,
    rearShare: 0,
  },
  rwd: {
    label: "后驱 RWD",
    summary: "动力经传动轴送到后桥，前轮负责转向，后轮负责主要驱动。",
    path: ["变速器", "传动轴", "后差速器", "左右后半轴", "后轮"],
    frontShare: 0,
    rearShare: 100,
  },
  awd: {
    label: "全时四驱 AWD",
    summary: "中央差速器持续分配前后轴动力，转弯时允许前后轴有转速差。",
    path: ["变速器", "中央差速器", "前后传动", "前后差速器", "四轮"],
    frontShare: 45,
    rearShare: 55,
  },
  partTime4wd: {
    label: "分时/适时四驱",
    summary: "分动器、取力器或电控多片离合器按路况接合另一根车轴。",
    path: ["变速器", "分动器/取力器", "多片离合器", "前后轴", "四轮"],
    frontShare: 35,
    rearShare: 65,
  },
};

const DIFFERENTIAL_MODES: Record<
  DifferentialMode,
  { label: string; summary: string; slipLoss: number; bias: string }
> = {
  open: {
    label: "普通差速器",
    summary: "允许左右轮自由转速差，转弯顺滑；一侧打滑时动力会从低附着轮流失。",
    slipLoss: 78,
    bias: "扭矩跟着低附着轮走",
  },
  lsd: {
    label: "限滑差速器",
    summary: "保留必要差速，但限制左右轮转速差，把更多扭矩留给有抓地的车轮。",
    slipLoss: 38,
    bias: "限制打滑，保留转弯能力",
  },
  locked: {
    label: "差速锁",
    summary:
      "强制左右半轴同速，脱困能力强；铺装路转弯会憋劲，不适合长期高速使用。",
    slipLoss: 12,
    bias: "左右轮硬连接",
  },
};

const SUSPENSION_TYPES: Record<
  SuspensionType,
  {
    label: string;
    summary: string;
    parts: string[];
    comfort: number;
    handling: number;
  }
> = {
  macpherson: {
    label: "麦弗逊",
    summary: "弹簧减振器支柱兼作导向结构，零件少、占空间小，前悬架常见。",
    parts: ["支柱", "下摆臂", "转向节", "稳定杆"],
    comfort: 68,
    handling: 64,
  },
  doubleWishbone: {
    label: "双叉臂",
    summary: "上下两根摆臂控制车轮姿态，几何控制能力强，运动取向更明显。",
    parts: ["上摆臂", "下摆臂", "减振器", "转向节"],
    comfort: 62,
    handling: 86,
  },
  multiLink: {
    label: "多连杆",
    summary: "多根连杆分别管理纵向、横向和外倾变化，可在舒适与操控之间细调。",
    parts: ["纵臂", "横臂", "控制臂", "减振器", "副车架"],
    comfort: 82,
    handling: 78,
  },
};

const ROAD_MODES: Record<RoadMode, { label: string; summary: string }> = {
  bump: {
    label: "单个凸起",
    summary: "车轮先快速上跳，弹簧储能，减振器控制回弹速度。",
  },
  corner: {
    label: "转弯侧倾",
    summary: "外侧悬架被压缩，内侧伸长，稳定杆帮助抑制车身侧倾。",
  },
  rough: {
    label: "连续碎路",
    summary: "悬架需要让车轮贴地，同时避免车身跟着高频抖动。",
  },
};

const STEERING_ASSISTS: Record<
  SteeringAssist,
  { label: string; summary: string; path: string[]; effort: number }
> = {
  mechanical: {
    label: "机械转向",
    summary:
      "方向盘力矩直接通过转向柱、齿轮齿条和拉杆传到车轮，结构直观但低速较重。",
    path: ["方向盘", "转向柱", "小齿轮", "齿条", "拉杆", "转向节"],
    effort: 86,
  },
  hydraulic: {
    label: "液压助力",
    summary:
      "液压泵和助力阀帮驾驶者推动车轮，低速轻，但需要持续消耗发动机能量。",
    path: ["方向盘", "转向阀", "液压泵", "助力缸", "齿条", "车轮"],
    effort: 42,
  },
  electric: {
    label: "电动助力 EPS",
    summary:
      "电机按车速和转角提供助力，低速轻、高速稳，也方便和驾驶辅助系统协同。",
    path: ["方向盘传感器", "ECU", "助力电机", "减速机构", "齿条", "车轮"],
    effort: 28,
  },
};

const FOUR_WHEEL_STEER_MODES: Record<
  FourWheelSteerMode,
  { label: string; summary: string; rearFactor: number }
> = {
  frontOnly: {
    label: "仅前轮转向",
    summary: "传统车辆主要由前轮改变方向，后轮只跟随车身轨迹。",
    rearFactor: 0,
  },
  lowSpeed: {
    label: "低速反向",
    summary: "后轮和前轮反向偏转，车辆更容易掉头和入库，等效转弯半径变小。",
    rearFactor: -0.42,
  },
  highSpeed: {
    label: "高速同向",
    summary: "后轮和前轮同向小角度偏转，变道更稳定，车身横摆更柔和。",
    rearFactor: 0.24,
  },
};

const BRAKE_TYPES: Record<
  BrakeType,
  { label: string; summary: string; parts: string[]; cooling: number }
> = {
  disc: {
    label: "盘式制动",
    summary:
      "卡钳把刹车片夹紧刹车盘，散热好、响应直接，乘用车前轮和高性能车常见。",
    parts: ["制动盘", "卡钳", "刹车片", "活塞", "制动液"],
    cooling: 82,
  },
  drum: {
    label: "鼓式制动",
    summary: "制动蹄向外撑开贴住制动鼓，成本低、驻车制动容易集成，但散热较弱。",
    parts: ["制动鼓", "制动蹄", "轮缸", "回位弹簧", "驻车拉索"],
    cooling: 48,
  },
};

const BRAKE_SCENARIOS: Record<
  BrakeScenario,
  { label: string; grip: number; heat: number; summary: string }
> = {
  normal: {
    label: "干燥路面",
    grip: 1,
    heat: 0.18,
    summary: "轮胎抓地和制动散热都较稳定，是基础制动距离参考场景。",
  },
  wet: {
    label: "湿滑路面",
    grip: 0.62,
    heat: 0.12,
    summary: "轮胎抓地下降，ABS 更容易介入，制动距离明显变长。",
  },
  fade: {
    label: "长下坡热衰减",
    grip: 0.78,
    heat: 0.82,
    summary: "制动器温度升高，摩擦系数下降，踏板感觉和制动力都会变差。",
  },
};

const ELECTRONICS_SENSORS: Record<
  ElectronicsSensor,
  {
    label: string;
    role: string;
    x: number;
    y: number;
    range: number;
    color: string;
  }
> = {
  camera: {
    label: "摄像头",
    role: "识别车道线、车辆、行人和交通标志，是 ADAS 的视觉入口。",
    x: 340,
    y: 92,
    range: 130,
    color: "#60a5fa",
  },
  radar: {
    label: "毫米波雷达",
    role: "测距和测速能力强，适合自适应巡航和前向碰撞预警。",
    x: 340,
    y: 258,
    range: 160,
    color: "#22c55e",
  },
  ultrasonic: {
    label: "超声波",
    role: "近距离探测障碍物，常用于泊车雷达和低速辅助。",
    x: 142,
    y: 238,
    range: 68,
    color: "#f59e0b",
  },
  wheelSpeed: {
    label: "轮速传感器",
    role: "感知车轮是否即将抱死或打滑，是 ABS / ESP 的基础信号。",
    x: 528,
    y: 238,
    range: 56,
    color: "#a855f7",
  },
  cabinTemp: {
    label: "座舱温度",
    role: "反馈空调系统当前状态，帮助控制压缩机、风门和鼓风机。",
    x: 340,
    y: 176,
    range: 48,
    color: "#06b6d4",
  },
};

const SAFETY_MODES: Record<
  SafetyMode,
  { label: string; summary: string; nodes: string[] }
> = {
  active: {
    label: "主动安全",
    summary:
      "在事故发生前感知风险并提示或干预，例如 ABS、ESP、AEB 和车道保持。",
    nodes: ["传感器", "控制器", "判断风险", "制动/转向/提示"],
  },
  passive: {
    label: "被动安全",
    summary: "事故已经发生时保护乘员，例如安全带预紧、气囊、车身吸能结构。",
    nodes: ["碰撞传感器", "气囊 ECU", "安全带预紧", "气囊展开"],
  },
  comfort: {
    label: "舒适电子",
    summary: "围绕照明、仪表、空调和座舱体验工作，强调状态感知和执行控制。",
    nodes: ["温度/光照信号", "车身控制器", "空调/灯光/仪表", "乘员反馈"],
  },
};

const ELECTRONICS_SCENARIOS: Record<
  ElectronicsScenario,
  { label: string; summary: string; signal: number; intervention: number }
> = {
  cruise: {
    label: "自适应巡航",
    summary: "雷达和摄像头持续感知前车，控制器调整动力和制动保持距离。",
    signal: 74,
    intervention: 46,
  },
  emergencyBrake: {
    label: "紧急制动",
    summary: "前方风险快速接近时，系统先预警，再触发 AEB 或 ABS/ESP 协同。",
    signal: 92,
    intervention: 88,
  },
  airbag: {
    label: "碰撞气囊",
    summary: "碰撞传感器判断冲击强度，气囊 ECU 触发安全带预紧和气囊展开。",
    signal: 96,
    intervention: 94,
  },
  cooling: {
    label: "空调制冷",
    summary: "温度传感器、压缩机、冷凝器、蒸发器和风门一起把热量搬出座舱。",
    signal: 58,
    intervention: 62,
  },
};

const TIRE_ROADS: Record<
  TireRoad,
  { label: string; grip: number; summary: string }
> = {
  dry: {
    label: "干地",
    grip: 1,
    summary: "干地抓地稳定，胎面刚性和接地面积更直接影响操控与制动。",
  },
  wet: {
    label: "湿地",
    grip: 0.68,
    summary: "湿地需要花纹排水，胎压和沟槽状态会影响水膜和抓地。",
  },
  snow: {
    label: "雪地",
    grip: 0.42,
    summary: "雪地更依赖细密沟槽和软胶料，普通胎容易打滑。",
  },
};

const TIRE_PATTERNS: Record<
  TirePattern,
  { label: string; summary: string; wetBonus: number; snowBonus: number }
> = {
  summer: {
    label: "夏季胎",
    summary: "胎块刚性高，干地操控好，低温和雪地不是强项。",
    wetBonus: 0.04,
    snowBonus: -0.08,
  },
  allSeason: {
    label: "四季胎",
    summary: "在干湿地和轻微低温之间折中，适合日常均衡使用。",
    wetBonus: 0.08,
    snowBonus: 0.06,
  },
  winter: {
    label: "冬季胎",
    summary: "软胶料和细密刀槽提升低温雪地抓地，但干地响应会更钝。",
    wetBonus: 0.02,
    snowBonus: 0.22,
  },
};

const ELECTRIC_DRIVE_TYPES: Record<
  ElectricDriveType,
  {
    label: string;
    summary: string;
    nodes: string[];
    engineShare: number;
    batteryShare: number;
    transmissionComplexity: number;
  }
> = {
  hev: {
    label: "HEV 混合动力",
    summary:
      "不能外接充电，发动机和电机协同工作，低速和起步常由电机减轻发动机负担。",
    nodes: ["燃油箱", "发动机", "发电机/电机", "小电池", "车轮"],
    engineShare: 58,
    batteryShare: 42,
    transmissionComplexity: 64,
  },
  phev: {
    label: "PHEV 插电混动",
    summary: "电池更大，可外接充电，短途可更多用电，长途仍可由发动机接力。",
    nodes: ["充电口", "大电池", "电机", "发动机", "车轮"],
    engineShare: 38,
    batteryShare: 72,
    transmissionComplexity: 58,
  },
  bev: {
    label: "BEV 纯电动",
    summary: "动力主要来自电池和电机，通常不需要传统多挡变速器，结构更直接。",
    nodes: ["充电口", "动力电池", "逆变器", "电机", "减速器", "车轮"],
    engineShare: 0,
    batteryShare: 100,
    transmissionComplexity: 26,
  },
  fcev: {
    label: "FCEV 燃料电池",
    summary: "氢气和氧气在燃料电池堆中产生电能，再驱动电机，排放主要是水。",
    nodes: ["储氢罐", "燃料电池堆", "缓冲电池", "电机", "车轮"],
    engineShare: 0,
    batteryShare: 82,
    transmissionComplexity: 32,
  },
};

const ELECTRIC_ENERGY_MODES: Record<
  ElectricEnergyMode,
  { label: string; summary: string }
> = {
  drive: {
    label: "加速驱动",
    summary: "电池或燃料电池输出电能，逆变器控制电机产生扭矩，车轮获得驱动力。",
  },
  regen: {
    label: "制动回收",
    summary: "车辆减速时，电机反过来发电，把一部分动能回收到电池。",
  },
  charge: {
    label: "补能充电",
    summary:
      "BEV/PHEV 通过充电口补能，FCEV 通过加氢，HEV 主要靠发动机和回收补电。",
  },
};

const MANUFACTURING_STAGES: Array<{
  id: ManufacturingStage;
  label: string;
  summary: string;
  output: string;
}> = [
  {
    id: "design",
    label: "目标定义",
    summary: "先确定用户、价格、尺寸、安全、续航、性能和法规目标。",
    output: "产品需求和工程指标",
  },
  {
    id: "prototype",
    label: "样车验证",
    summary: "用样车暴露结构、热管理、操控、噪声和可靠性问题。",
    output: "问题清单和改版方案",
  },
  {
    id: "aero",
    label: "风阻优化",
    summary: "通过造型、底盘和细节件降低空气阻力，减少高速能耗。",
    output: "风阻系数和气流方案",
  },
  {
    id: "stamping",
    label: "冲压",
    summary: "把钢板或铝板压成车门、翼子板、地板等车身覆盖件和结构件。",
    output: "车身钣金零件",
  },
  {
    id: "welding",
    label: "焊装",
    summary: "把大量钣金件定位、焊接和胶接成白车身。",
    output: "白车身",
  },
  {
    id: "painting",
    label: "涂装",
    summary: "通过电泳、中涂、色漆和清漆提供防腐、外观和耐候性。",
    output: "已涂装车身",
  },
  {
    id: "assembly",
    label: "总装",
    summary: "装入动力系统、底盘、内饰、电器、玻璃、轮胎和软件配置。",
    output: "完整车辆",
  },
  {
    id: "quality",
    label: "质检下线",
    summary: "检查尺寸、密封、灯光、制动、路试、软件和安全项目。",
    output: "可交付车辆",
  },
];

const BODY_SHAPES: Record<
  BodyShape,
  {
    label: string;
    drag: number;
    stability: number;
    summary: string;
    path: string;
  }
> = {
  boxy: {
    label: "方正车身",
    drag: 0.36,
    stability: 64,
    summary: "空间好、姿态硬朗，但尾部气流分离更明显，高速能耗压力更大。",
    path: "M112 248 L148 188 H442 L520 248 Z",
  },
  fastback: {
    label: "溜背车身",
    drag: 0.29,
    stability: 72,
    summary: "车顶向尾部顺滑下落，兼顾造型和风阻，但后排头部与尾厢空间受影响。",
    path: "M112 248 L172 188 H332 C410 190 472 214 520 248 Z",
  },
  streamlined: {
    label: "低风阻车身",
    drag: 0.23,
    stability: 82,
    summary: "车头、车顶、车尾和底盘共同导流，高速能耗低，但设计约束更多。",
    path: "M112 248 C156 194 238 176 338 184 C420 192 482 218 520 248 Z",
  },
};

const FINAL_REVIEW_PATHS: Record<
  FinalReviewPath,
  {
    label: string;
    summary: string;
    nodes: string[];
    color: string;
  }
> = {
  fuel: {
    label: "燃油车动力链",
    summary: "燃油在发动机里变成曲轴扭矩，经变速器、传动系统和轮胎推动车身。",
    nodes: ["燃油", "发动机", "变速器", "传动系统", "轮胎", "路面"],
    color: "#f97316",
  },
  electric: {
    label: "新能源动力链",
    summary: "电池或燃料电池供电，电控调节电流，电机通过减速器把扭矩送到车轮。",
    nodes: ["电池/氢", "电控", "电机", "减速器", "轮胎", "路面"],
    color: "#60a5fa",
  },
  stability: {
    label: "能稳能停链路",
    summary: "车身、悬架、转向、制动、电子控制和轮胎共同决定车是否稳定安全。",
    nodes: ["车身", "悬架", "转向", "制动", "电子安全", "轮胎"],
    color: "#22c55e",
  },
};

export function AutoBookLearningMap() {
  return (
    <section className="not-prose my-8 rounded-card border border-border bg-elevated p-4">
      <div className="mb-4 flex flex-col gap-1">
        <p className="text-xs font-medium text-accent">全书学习地图</p>
        <h2 className="text-lg font-semibold text-primary">
          从“为什么会跑”一路拆到“为什么能稳、能停、能造”
        </h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {BOOK_CHAPTERS.map(([title, desc], index) => (
          <div
            key={title}
            className="flex gap-3 rounded-control border border-border bg-bg p-3"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent text-xs font-semibold text-accent">
              {index + 1}
            </span>
            <div>
              <p className="text-sm font-medium text-primary">{title}</p>
              <p className="mt-1 text-xs leading-relaxed text-secondary">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function WholeCarSystemsLab() {
  const [active, setActive] = useState<ModuleKey>("power");
  const [layout, setLayout] = useState<LayoutMode>("fwd");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [answer, setAnswer] = useState<"engine" | "wheel" | null>(null);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setStep((current) => {
        if (current >= FLOW_STEPS.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 1200);
    return () => window.clearInterval(id);
  }, [playing]);

  const activeModule = MODULES[active];
  const layoutInfo = DRIVE_LAYOUTS[layout];
  const flowProgress = useMemo(
    () => Math.round((step / (FLOW_STEPS.length - 1)) * 100),
    [step],
  );

  return (
    <section className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border p-4">
        <p className="text-xs font-medium text-accent">整车拆解实验室</p>
        <h2 className="mt-1 text-lg font-semibold text-primary">
          点模块、切布局、看动力如何走到车轮
        </h2>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="border-b border-border p-4 lg:border-r lg:border-b-0">
          <svg
            viewBox="0 0 640 340"
            role="img"
            aria-label="整车系统分层图"
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="auto-arrow"
                markerWidth="8"
                markerHeight="8"
                refX="7"
                refY="4"
                orient="auto"
              >
                <path d="M0,0 L8,4 L0,8 Z" fill="var(--accent)" />
              </marker>
            </defs>

            <path
              d="M100 132 C140 66 500 66 548 132 L580 218 C586 238 570 260 548 260 H92 C70 260 54 238 60 218 Z"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="3"
            />
            <path
              d="M205 118 H445 L492 166 H156 Z"
              fill="var(--card)"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <circle cx="158" cy="264" r="35" fill="#111827" />
            <circle cx="482" cy="264" r="35" fill="#111827" />
            <circle cx="158" cy="264" r="18" fill="var(--bg)" />
            <circle cx="482" cy="264" r="18" fill="var(--bg)" />

            {Object.entries(MODULES).map(([key, item]) => {
              const selected = key === active;
              const moduleKey = key as ModuleKey;
              return (
                <g
                  key={key}
                  role="button"
                  tabIndex={0}
                  aria-label={`查看${item.label}`}
                  onClick={() => setActive(moduleKey)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActive(moduleKey);
                    }
                  }}
                  className="cursor-pointer"
                >
                  <rect
                    x={item.x - 54}
                    y={item.y - 22}
                    width="108"
                    height="44"
                    rx="8"
                    fill={selected ? item.color : "var(--card)"}
                    stroke={item.color}
                    strokeWidth={selected ? 3 : 1.5}
                  />
                  <text
                    x={item.x}
                    y={item.y + 5}
                    textAnchor="middle"
                    className="pointer-events-none fill-primary text-[14px] font-semibold"
                  >
                    {item.label}
                  </text>
                </g>
              );
            })}

            <path
              d={
                layout === "fwd"
                  ? "M166 186 C154 205 152 226 156 246"
                  : layout === "rwd"
                    ? "M176 186 C260 218 366 218 476 246"
                    : "M176 186 C250 205 385 205 476 246 M176 186 C160 210 154 230 156 246"
              }
              fill="none"
              stroke="var(--accent)"
              strokeWidth="5"
              strokeLinecap="round"
              markerEnd="url(#auto-arrow)"
              opacity="0.9"
            />
          </svg>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {(Object.keys(DRIVE_LAYOUTS) as LayoutMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setLayout(mode)}
                className={`rounded-control border px-3 py-2 text-left text-xs transition-colors ${
                  layout === mode
                    ? "border-accent text-accent"
                    : "border-border text-secondary hover:text-primary"
                }`}
              >
                <span className="block font-medium">
                  {DRIVE_LAYOUTS[mode].label}
                </span>
                <span className="mt-1 block leading-relaxed">
                  驱动：{DRIVE_LAYOUTS[mode].driven}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 p-4">
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">当前模块</p>
            <h3 className="mt-1 text-base font-semibold text-primary">
              {activeModule.label}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-secondary">
              {activeModule.role}
            </p>
          </div>

          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">当前布局</p>
            <h3 className="mt-1 text-base font-semibold text-primary">
              {layoutInfo.label}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-secondary">
              {layoutInfo.short}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {layoutInfo.path.map((node, index) => (
                <span
                  key={`${layout}-${node}`}
                  className="rounded-control border border-border px-2 py-1 text-xs text-secondary"
                >
                  {index + 1}. {node}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-medium text-accent">分步动画</p>
            <h3 className="mt-1 text-base font-semibold text-primary">
              汽车从静止到跑起来
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-secondary">
              {FLOW_STEPS[step].text}
            </p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-accent transition-all"
                style={{ width: `${flowProgress}%` }}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setStep((current) => Math.max(0, current - 1))}
                className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
              >
                上一步
              </button>
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                className="rounded-control border border-accent px-3 py-2 text-xs text-accent"
              >
                {playing ? "暂停" : "播放"}
              </button>
              <button
                type="button"
                onClick={() =>
                  setStep((current) =>
                    Math.min(FLOW_STEPS.length - 1, current + 1),
                  )
                }
                className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
              >
                下一步
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlaying(false);
                  setStep(0);
                }}
                className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
              >
                回放
              </button>
            </div>
          </div>

          <ol className="grid gap-2">
            {FLOW_STEPS.map((item, index) => (
              <li
                key={item.title}
                className={`rounded-control border p-3 ${
                  index === step
                    ? "border-accent bg-bg text-primary"
                    : "border-border text-secondary"
                }`}
              >
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <p className="text-xs font-medium text-accent">拆车小测</p>
        <h3 className="mt-1 text-base font-semibold text-primary">
          真正把整车往前带的直接接触点是谁？
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setAnswer("engine")}
            className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
          >
            发动机直接推车身
          </button>
          <button
            type="button"
            onClick={() => setAnswer("wheel")}
            className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
          >
            驱动轮通过轮胎推地
          </button>
        </div>
        {answer && (
          <p
            className={`mt-3 rounded-control border p-3 text-sm leading-relaxed ${
              answer === "wheel"
                ? "border-accent text-primary"
                : "border-warning text-primary"
            }`}
          >
            {answer === "wheel"
              ? "正确。动力最终要变成轮胎对地面的作用，地面的反作用力才把车推向前方。"
              : "还差一步。发动机输出的是旋转动力，它必须经过变速器、传动系统和驱动轮，不能直接推动车身。"}
          </p>
        )}
      </div>
    </section>
  );
}

export function BodyStructureLab() {
  const [bodyType, setBodyType] = useState<BodyType>("unibody");
  const [material, setMaterial] = useState<BodyMaterial>("steel");
  const [wheelbase, setWheelbase] = useState(2800);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [answer, setAnswer] = useState<"shell" | "structure" | null>(null);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setStep((current) => {
        if (current >= CRASH_STEPS.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 1200);
    return () => window.clearInterval(id);
  }, [playing]);

  const materialInfo = BODY_MATERIALS[material];
  const cabinLength = 185 + (wheelbase - 2600) * 0.14;
  const frontOverhang = 112 - (wheelbase - 2600) * 0.03;
  const rearX = frontOverhang + cabinLength + 135;
  const crashWidth = 90 + step * 88;

  return (
    <section className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border p-4">
        <p className="text-xs font-medium text-accent">车身结构实验室</p>
        <h2 className="mt-1 text-lg font-semibold text-primary">
          看车身如何同时解决空间、安全、重量和制造
        </h2>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="border-b border-border p-4 lg:border-r lg:border-b-0">
          <svg
            viewBox="0 0 640 360"
            role="img"
            aria-label="车身结构与尺寸示意图"
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="body-arrow"
                markerWidth="8"
                markerHeight="8"
                refX="7"
                refY="4"
                orient="auto"
              >
                <path d="M0,0 L8,4 L0,8 Z" fill="var(--accent)" />
              </marker>
            </defs>

            <path
              d={`M${frontOverhang} 178 C132 88 488 88 550 178 L576 226 C582 240 570 256 552 256 H88 C70 256 58 240 64 226 Z`}
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="3"
            />
            <path
              d={`M185 154 H${185 + cabinLength} L${185 + cabinLength + 48} 206 H145 Z`}
              fill="var(--card)"
              stroke={BODY_MATERIALS.steel.color}
              strokeWidth={material === "steel" ? 4 : 2}
            />
            <path
              d="M95 224 H555"
              stroke={
                bodyType === "bodyOnFrame" ? "var(--accent)" : "var(--border)"
              }
              strokeWidth={bodyType === "bodyOnFrame" ? 12 : 4}
              strokeLinecap="round"
            />
            {bodyType === "bodyOnFrame" && (
              <>
                <path
                  d="M126 205 H528"
                  stroke="var(--accent)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  opacity="0.65"
                />
                <path
                  d="M145 205 L185 224 M250 205 L290 224 M390 205 L430 224 M500 205 L535 224"
                  stroke="var(--accent)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0.65"
                />
              </>
            )}
            <path
              d="M78 198 H148 L168 224 H92 Z"
              fill={
                material === "aluminum"
                  ? BODY_MATERIALS.aluminum.color
                  : "var(--card)"
              }
              stroke={BODY_MATERIALS.aluminum.color}
              strokeWidth={material === "aluminum" ? 4 : 2}
            />
            <path
              d="M455 188 H548 L560 224 H430 Z"
              fill={
                material === "composite"
                  ? BODY_MATERIALS.composite.color
                  : "var(--card)"
              }
              stroke={BODY_MATERIALS.composite.color}
              strokeWidth={material === "composite" ? 4 : 2}
            />

            <circle cx="160" cy="262" r="34" fill="#111827" />
            <circle cx={rearX} cy="262" r="34" fill="#111827" />
            <circle cx="160" cy="262" r="16" fill="var(--bg)" />
            <circle cx={rearX} cy="262" r="16" fill="var(--bg)" />

            <path
              d={`M160 318 H${rearX}`}
              stroke="var(--accent)"
              strokeWidth="3"
              markerEnd="url(#body-arrow)"
            />
            <text
              x={(160 + rearX) / 2}
              y="343"
              textAnchor="middle"
              className="fill-secondary text-[13px]"
            >
              轴距 {wheelbase} mm
            </text>

            <path
              d="M70 306 H575"
              stroke="var(--border)"
              strokeWidth="2"
              markerEnd="url(#body-arrow)"
            />
            <text
              x="322"
              y="300"
              textAnchor="middle"
              className="fill-secondary text-[13px]"
            >
              车长 / 车宽 / 车高是外部尺寸，轴距影响乘坐空间和姿态
            </text>

            <path
              d={`M64 205 C${95 + crashWidth} ${170 - step * 10} ${145 + crashWidth} ${155 - step * 6} ${195 + crashWidth} 164`}
              fill="none"
              stroke="var(--warning)"
              strokeWidth="5"
              strokeLinecap="round"
              markerEnd="url(#body-arrow)"
              opacity="0.85"
            />
            <text x="72" y="150" className="fill-warning text-[13px]">
              碰撞力路径
            </text>
          </svg>

          <div className="mt-4">
            <label
              className="text-xs font-medium text-secondary"
              htmlFor="wheelbase"
            >
              轴距：{wheelbase} mm
            </label>
            <input
              id="wheelbase"
              type="range"
              min="2600"
              max="3100"
              step="50"
              value={wheelbase}
              onChange={(event) => setWheelbase(Number(event.target.value))}
              className="mdx-range mt-2 h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
            />
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              轴距变长通常更利于乘坐空间和直线稳定；车身也要同时处理重量、转弯灵活性和制造成本。
            </p>
          </div>
        </div>

        <div className="space-y-4 p-4">
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">车身形式</p>
            <div className="mt-3 grid gap-2">
              {(Object.keys(BODY_TYPES) as BodyType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setBodyType(type)}
                  className={`rounded-control border px-3 py-2 text-left text-xs ${
                    bodyType === type
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:text-primary"
                  }`}
                >
                  <span className="block font-medium">
                    {BODY_TYPES[type].label}
                  </span>
                  <span className="mt-1 block leading-relaxed">
                    {BODY_TYPES[type].summary}
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              {BODY_TYPES[bodyType].tradeoff}
            </p>
          </div>

          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">材料热区</p>
            <div className="mt-3 grid gap-2">
              {(Object.keys(BODY_MATERIALS) as BodyMaterial[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMaterial(key)}
                  className={`rounded-control border px-3 py-2 text-left text-xs ${
                    material === key
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:text-primary"
                  }`}
                >
                  {BODY_MATERIALS[key].label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm font-medium text-primary">
              {materialInfo.label}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-secondary">
              {materialInfo.role}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-secondary">
              {materialInfo.cost}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-medium text-accent">分步动画</p>
            <h3 className="mt-1 text-base font-semibold text-primary">
              碰撞力如何绕开乘员舱
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-secondary">
              {CRASH_STEPS[step].text}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setStep((current) => Math.max(0, current - 1))}
                className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
              >
                上一步
              </button>
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                className="rounded-control border border-accent px-3 py-2 text-xs text-accent"
              >
                {playing ? "暂停" : "播放"}
              </button>
              <button
                type="button"
                onClick={() =>
                  setStep((current) =>
                    Math.min(CRASH_STEPS.length - 1, current + 1),
                  )
                }
                className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
              >
                下一步
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlaying(false);
                  setStep(0);
                }}
                className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
              >
                回放
              </button>
            </div>
          </div>
          <ol className="grid gap-2">
            {CRASH_STEPS.map((item, index) => (
              <li
                key={item.title}
                className={`rounded-control border p-3 ${
                  index === step
                    ? "border-accent bg-bg text-primary"
                    : "border-border text-secondary"
                }`}
              >
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <p className="text-xs font-medium text-accent">拆车小测</p>
        <h3 className="mt-1 text-base font-semibold text-primary">
          车身最重要的任务只是“好看外壳”吗？
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setAnswer("shell")}
            className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
          >
            是，主要是外观覆盖件
          </button>
          <button
            type="button"
            onClick={() => setAnswer("structure")}
            className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
          >
            不是，它也是安全结构
          </button>
        </div>
        {answer && (
          <p
            className={`mt-3 rounded-control border p-3 text-sm leading-relaxed ${
              answer === "structure"
                ? "border-accent text-primary"
                : "border-warning text-primary"
            }`}
          >
            {answer === "structure"
              ? "正确。车身同时决定空间、碰撞吸能、刚性、重量、空气动力和制造工艺。"
              : "不对。覆盖件只是看得见的一层，真正关键的是乘员舱、纵梁、门槛梁、柱体和材料分布。"}
          </p>
        )}
      </div>
    </section>
  );
}

export function EnginePrinciplesLab() {
  const [stroke, setStroke] = useState<StrokeKey>("intake");
  const [intakeMode, setIntakeMode] = useState<IntakeMode>("natural");
  const [rpm, setRpm] = useState(2200);
  const [playing, setPlaying] = useState(false);
  const [answer, setAnswer] = useState<"compression" | "power" | null>(null);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(
      () => {
        setStroke((current) => {
          const index = STROKE_ORDER.indexOf(current);
          return STROKE_ORDER[(index + 1) % STROKE_ORDER.length];
        });
      },
      Math.max(450, 1500 - rpm / 3),
    );
    return () => window.clearInterval(id);
  }, [playing, rpm]);

  const state = ENGINE_STROKES[stroke];
  const intake = INTAKE_MODES[intakeMode];
  const crankRadians = (state.crankAngle * Math.PI) / 180;
  const crankX = 320 + Math.cos(crankRadians) * 52;
  const crankY = 282 + Math.sin(crankRadians) * 42;
  const flameOpacity = state.spark ? 1 : 0.18;

  return (
    <section className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border p-4">
        <p className="text-xs font-medium text-accent">发动机剖面实验室</p>
        <h2 className="mt-1 text-lg font-semibold text-primary">
          看四冲程如何把燃油变成曲轴旋转
        </h2>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="border-b border-border p-4 lg:border-r lg:border-b-0">
          <svg
            viewBox="0 0 640 380"
            role="img"
            aria-label="四冲程发动机剖面图"
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="engine-arrow"
                markerWidth="8"
                markerHeight="8"
                refX="7"
                refY="4"
                orient="auto"
              >
                <path d="M0,0 L8,4 L0,8 Z" fill="var(--accent)" />
              </marker>
            </defs>

            <rect
              x="235"
              y="74"
              width="170"
              height="206"
              rx="16"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="3"
            />
            <rect
              x="265"
              y={state.pistonY}
              width="110"
              height="42"
              rx="8"
              fill="var(--card)"
              stroke="var(--accent)"
              strokeWidth="4"
            />
            <text
              x="320"
              y={state.pistonY + 27}
              textAnchor="middle"
              className="fill-primary text-[13px] font-semibold"
            >
              活塞
            </text>
            <path
              d={`M320 ${state.pistonY + 42} L${crankX} ${crankY}`}
              stroke="var(--accent)"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <circle
              cx="320"
              cy="282"
              r="54"
              fill="none"
              stroke="var(--border)"
              strokeWidth="8"
            />
            <circle cx={crankX} cy={crankY} r="12" fill="var(--accent)" />
            <text
              x="320"
              y="355"
              textAnchor="middle"
              className="fill-secondary text-[13px]"
            >
              连杆带动曲轴旋转，当前约 {rpm} rpm
            </text>

            <path
              d="M238 92 H164"
              stroke={state.intakeOpen ? "#22c55e" : "var(--border)"}
              strokeWidth={state.intakeOpen ? 7 : 3}
              strokeLinecap="round"
              markerEnd={state.intakeOpen ? "url(#engine-arrow)" : undefined}
            />
            <text x="100" y="88" className="fill-secondary text-[13px]">
              进气门
            </text>
            <rect
              x="222"
              y={state.intakeOpen ? 102 : 84}
              width="16"
              height="46"
              rx="6"
              fill={state.intakeOpen ? "#22c55e" : "var(--border)"}
            />

            <path
              d="M402 92 H485"
              stroke={state.exhaustOpen ? "#f97316" : "var(--border)"}
              strokeWidth={state.exhaustOpen ? 7 : 3}
              strokeLinecap="round"
              markerEnd={state.exhaustOpen ? "url(#engine-arrow)" : undefined}
            />
            <text x="492" y="88" className="fill-secondary text-[13px]">
              排气门
            </text>
            <rect
              x="402"
              y={state.exhaustOpen ? 102 : 84}
              width="16"
              height="46"
              rx="6"
              fill={state.exhaustOpen ? "#f97316" : "var(--border)"}
            />

            <path
              d="M320 72 L304 118 H336 Z"
              fill={state.spark ? "#facc15" : "var(--card)"}
              stroke="#facc15"
              strokeWidth="2"
            />
            <path
              d="M320 121 L300 150 L320 142 L340 150 Z"
              fill="#f97316"
              opacity={flameOpacity}
            />
            <text
              x="320"
              y="52"
              textAnchor="middle"
              className="fill-secondary text-[13px]"
            >
              火花塞
            </text>

            <path
              d={
                intakeMode === "natural"
                  ? "M70 150 H190"
                  : intakeMode === "turbo"
                    ? "M70 150 C120 105 168 105 210 150"
                    : "M70 150 C120 178 170 122 210 150"
              }
              fill="none"
              stroke="#22c55e"
              strokeWidth="5"
              strokeLinecap="round"
              markerEnd="url(#engine-arrow)"
              opacity="0.9"
            />
            <circle
              cx="118"
              cy="150"
              r={intakeMode === "natural" ? 0 : 26}
              fill="var(--bg)"
              stroke="#22c55e"
              strokeWidth={intakeMode === "natural" ? 0 : 4}
            />
            {intakeMode !== "natural" && (
              <text
                x="118"
                y="155"
                textAnchor="middle"
                className="fill-primary text-[12px] font-semibold"
              >
                压气
              </text>
            )}

            <path
              d="M430 245 C498 225 535 250 560 306"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="5"
              strokeLinecap="round"
              markerEnd="url(#engine-arrow)"
              opacity="0.85"
            />
            <text x="492" y="224" className="fill-secondary text-[13px]">
              冷却液带走热量
            </text>

            <path
              d="M236 300 C190 318 180 250 230 236"
              fill="none"
              stroke="#facc15"
              strokeWidth="5"
              strokeLinecap="round"
              markerEnd="url(#engine-arrow)"
              opacity="0.85"
            />
            <text x="74" y="318" className="fill-secondary text-[13px]">
              机油润滑曲轴和活塞
            </text>
          </svg>

          <div className="mt-4">
            <label className="text-xs font-medium text-secondary" htmlFor="rpm">
              转速：{rpm} rpm
            </label>
            <input
              id="rpm"
              type="range"
              min="800"
              max="6000"
              step="200"
              value={rpm}
              onChange={(event) => setRpm(Number(event.target.value))}
              className="mdx-range mt-2 h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
            />
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              转速越高，四个冲程循环越快；但动力、油耗、热量和磨损也会一起变化。
            </p>
          </div>
        </div>

        <div className="space-y-4 p-4">
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">四冲程循环</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {STROKE_ORDER.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setStroke(key)}
                  className={`rounded-control border px-3 py-2 text-left text-xs ${
                    stroke === key
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:text-primary"
                  }`}
                >
                  {ENGINE_STROKES[key].label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm font-medium text-primary">
              当前：{state.label}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-secondary">
              {state.summary}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  const index = STROKE_ORDER.indexOf(stroke);
                  setStroke(
                    STROKE_ORDER[
                      (index + STROKE_ORDER.length - 1) % STROKE_ORDER.length
                    ],
                  );
                }}
                className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
              >
                上一步
              </button>
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                className="rounded-control border border-accent px-3 py-2 text-xs text-accent"
              >
                {playing ? "暂停" : "播放"}
              </button>
              <button
                type="button"
                onClick={() => {
                  const index = STROKE_ORDER.indexOf(stroke);
                  setStroke(STROKE_ORDER[(index + 1) % STROKE_ORDER.length]);
                }}
                className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
              >
                下一步
              </button>
            </div>
          </div>

          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">进气方式</p>
            <div className="mt-3 grid gap-2">
              {(Object.keys(INTAKE_MODES) as IntakeMode[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setIntakeMode(key)}
                  className={`rounded-control border px-3 py-2 text-left text-xs ${
                    intakeMode === key
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:text-primary"
                  }`}
                >
                  {INTAKE_MODES[key].label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              {intake.summary}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {intake.path.map((node, index) => (
                <span
                  key={`${intakeMode}-${node}`}
                  className="rounded-control border border-border px-2 py-1 text-xs text-secondary"
                >
                  {index + 1}. {node}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">燃烧系统</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              负责把空气、燃油、压缩和点火配合起来，做功冲程才真正输出动力。
            </p>
          </div>
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">冷却系统</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              把多余热量带走，避免发动机过热、爆震或零件变形。
            </p>
          </div>
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">润滑系统</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              用机油隔开高速摩擦面，减少磨损并带走局部热量。
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <p className="text-xs font-medium text-accent">冲程判断小测</p>
        <h3 className="mt-1 text-base font-semibold text-primary">
          两个气门都关闭，活塞上行，还没点火，这是哪个冲程？
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setAnswer("compression")}
            className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
          >
            压缩冲程
          </button>
          <button
            type="button"
            onClick={() => setAnswer("power")}
            className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
          >
            做功冲程
          </button>
        </div>
        {answer && (
          <p
            className={`mt-3 rounded-control border p-3 text-sm leading-relaxed ${
              answer === "compression"
                ? "border-accent text-primary"
                : "border-warning text-primary"
            }`}
          >
            {answer === "compression"
              ? "正确。压缩冲程是两个气门关闭、活塞上行，把混合气压小，等待点火。"
              : "不对。做功冲程发生在点火之后，膨胀气体推动活塞下行输出动力。"}
          </p>
        )}
      </div>
    </section>
  );
}

export function TransmissionLab() {
  const [gear, setGear] = useState(1);
  const [mode, setMode] = useState<TransmissionMode>("mt");
  const [engineRpm, setEngineRpm] = useState(2600);
  const [playing, setPlaying] = useState(false);
  const [answer, setAnswer] = useState<"first" | "sixth" | null>(null);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setGear((current) => (current >= GEAR_RATIOS.length ? 1 : current + 1));
    }, 1300);
    return () => window.clearInterval(id);
  }, [playing]);

  const ratio = GEAR_RATIOS[gear - 1];
  const outputRpm = Math.round(engineRpm / ratio);
  const wheelTorque = Math.round(260 * ratio);
  const modeInfo = TRANSMISSION_MODES[mode];
  const inputRadius = mode === "cvt" ? 28 + gear * 4 : 28 + ratio * 7;
  const outputRadius = mode === "cvt" ? 70 - gear * 4 : 74 - ratio * 6;
  const activeX = 92 + (gear - 1) * 82;

  return (
    <section className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border p-4">
        <p className="text-xs font-medium text-accent">变速器实验室</p>
        <h2 className="mt-1 text-lg font-semibold text-primary">
          看变速器如何在扭矩和车速之间做交换
        </h2>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="border-b border-border p-4 lg:border-r lg:border-b-0">
          <svg
            viewBox="0 0 640 380"
            role="img"
            aria-label="变速器齿比与动力路径示意图"
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="transmission-arrow"
                markerWidth="8"
                markerHeight="8"
                refX="7"
                refY="4"
                orient="auto"
              >
                <path d="M0,0 L8,4 L0,8 Z" fill="var(--accent)" />
              </marker>
            </defs>

            <rect
              x="70"
              y="70"
              width="500"
              height="210"
              rx="18"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="3"
            />
            <text x="86" y="104" className="fill-secondary text-[13px]">
              发动机输入 {engineRpm} rpm
            </text>
            <text x="438" y="104" className="fill-secondary text-[13px]">
              输出约 {outputRpm} rpm
            </text>

            <circle
              cx="230"
              cy="180"
              r={inputRadius}
              fill="var(--card)"
              stroke="var(--accent)"
              strokeWidth="5"
            />
            <circle
              cx="402"
              cy="180"
              r={outputRadius}
              fill="var(--card)"
              stroke="#22c55e"
              strokeWidth="5"
            />
            <path
              d={`M${230 + inputRadius} 180 H${402 - outputRadius}`}
              stroke={mode === "cvt" ? "#f59e0b" : "var(--border)"}
              strokeWidth={mode === "cvt" ? 10 : 5}
              strokeLinecap="round"
            />
            <path
              d="M105 180 H170"
              stroke="var(--accent)"
              strokeWidth="6"
              strokeLinecap="round"
              markerEnd="url(#transmission-arrow)"
            />
            <path
              d="M470 180 H545"
              stroke="#22c55e"
              strokeWidth="6"
              strokeLinecap="round"
              markerEnd="url(#transmission-arrow)"
            />
            <text
              x="230"
              y="184"
              textAnchor="middle"
              className="fill-primary text-[13px] font-semibold"
            >
              输入轮
            </text>
            <text
              x="402"
              y="184"
              textAnchor="middle"
              className="fill-primary text-[13px] font-semibold"
            >
              输出轮
            </text>

            <path d="M92 318 H505" stroke="var(--border)" strokeWidth="2" />
            <path
              d={`M${activeX} 318 H${activeX + 66}`}
              stroke="var(--accent)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {GEAR_RATIOS.map((item, index) => {
              const x = 92 + index * 82;
              return (
                <g key={item}>
                  <circle
                    cx={x + 33}
                    cy="318"
                    r="15"
                    fill={gear === index + 1 ? "var(--accent)" : "var(--bg)"}
                    stroke="var(--border)"
                    strokeWidth="2"
                  />
                  <text
                    x={x + 33}
                    y="323"
                    textAnchor="middle"
                    className="fill-primary text-[12px] font-semibold"
                  >
                    {index + 1}
                  </text>
                  <text
                    x={x + 33}
                    y="352"
                    textAnchor="middle"
                    className="fill-secondary text-[12px]"
                  >
                    {item.toFixed(2)}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="mt-4">
            <label
              className="text-xs font-medium text-secondary"
              htmlFor="engine-rpm"
            >
              发动机转速：{engineRpm} rpm
            </label>
            <input
              id="engine-rpm"
              type="range"
              min="1200"
              max="5200"
              step="200"
              value={engineRpm}
              onChange={(event) => setEngineRpm(Number(event.target.value))}
              className="mdx-range mt-2 h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
            />
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              同样的发动机转速，低挡输出转速低但轮上扭矩大；高挡输出转速高但扭矩放大少。
            </p>
          </div>
        </div>

        <div className="space-y-4 p-4">
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">挡位与齿比</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {GEAR_RATIOS.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setGear(index + 1)}
                  className={`rounded-control border px-3 py-2 text-xs ${
                    gear === index + 1
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:text-primary"
                  }`}
                >
                  {index + 1} 挡
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm font-medium text-primary">
              当前 {gear} 挡：齿比 {ratio.toFixed(2)}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-secondary">
              轮上扭矩约 {wheelTorque} Nm，输出转速约 {outputRpm} rpm。
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setGear((current) => Math.max(1, current - 1))}
                className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
              >
                降挡
              </button>
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                className="rounded-control border border-accent px-3 py-2 text-xs text-accent"
              >
                {playing ? "暂停" : "播放换挡"}
              </button>
              <button
                type="button"
                onClick={() =>
                  setGear((current) =>
                    Math.min(GEAR_RATIOS.length, current + 1),
                  )
                }
                className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
              >
                升挡
              </button>
            </div>
          </div>

          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">变速器类型</p>
            <div className="mt-3 grid gap-2">
              {(Object.keys(TRANSMISSION_MODES) as TransmissionMode[]).map(
                (key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setMode(key)}
                    className={`rounded-control border px-3 py-2 text-left text-xs ${
                      mode === key
                        ? "border-accent text-accent"
                        : "border-border text-secondary hover:text-primary"
                    }`}
                  >
                    {TRANSMISSION_MODES[key].label}
                  </button>
                ),
              )}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              {modeInfo.summary}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {modeInfo.path.map((node, index) => (
                <span
                  key={`${mode}-${node}`}
                  className="rounded-control border border-border px-2 py-1 text-xs text-secondary"
                >
                  {index + 1}. {node}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">低挡</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              齿比大，车轮转得慢但扭矩放大多，适合起步、爬坡、加速。
            </p>
          </div>
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">高挡</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              齿比小，车轮转得快但扭矩放大少，适合巡航和降低转速。
            </p>
          </div>
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">换挡</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              本质是在发动机舒服的转速区间和车轮需要的速度之间重新匹配。
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <p className="text-xs font-medium text-accent">挡位选择小测</p>
        <h3 className="mt-1 text-base font-semibold text-primary">
          车辆刚起步、需要更大轮上扭矩时，应该优先选哪个挡？
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setAnswer("first")}
            className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
          >
            1 挡
          </button>
          <button
            type="button"
            onClick={() => setAnswer("sixth")}
            className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
          >
            6 挡
          </button>
        </div>
        {answer && (
          <p
            className={`mt-3 rounded-control border p-3 text-sm leading-relaxed ${
              answer === "first"
                ? "border-accent text-primary"
                : "border-warning text-primary"
            }`}
          >
            {answer === "first"
              ? "正确。1 挡齿比大，牺牲车速换来更强轮上扭矩，适合起步。"
              : "不对。6 挡齿比小，更适合巡航；起步时轮上扭矩不足，发动机也容易吃力。"}
          </p>
        )}
      </div>
    </section>
  );
}

export function DrivetrainLab() {
  const [layout, setLayout] = useState<DrivetrainLayout>("rwd");
  const [diffMode, setDiffMode] = useState<DifferentialMode>("open");
  const [turnRadius, setTurnRadius] = useState(38);
  const [slipping, setSlipping] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [answer, setAnswer] = useState<"open" | "locked" | null>(null);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setTurnRadius((value) => (value >= 62 ? 24 : value + 4));
    }, 850);
    return () => window.clearInterval(timer);
  }, [playing]);

  const layoutInfo = DRIVETRAIN_LAYOUTS[layout];
  const diffInfo = DIFFERENTIAL_MODES[diffMode];

  const wheelSpeed = useMemo(() => {
    const base = 66;
    const spread = Math.round(480 / turnRadius);
    if (diffMode === "locked") {
      return { inner: base, outer: base, spread: 0 };
    }
    const limitedSpread =
      diffMode === "lsd" ? Math.max(5, Math.round(spread * 0.55)) : spread;
    return {
      inner: Math.max(34, base - limitedSpread),
      outer: base + limitedSpread,
      spread: limitedSpread * 2,
    };
  }, [diffMode, turnRadius]);

  const gripShare = slipping ? 100 - diffInfo.slipLoss : 92;
  const slipShare = slipping ? diffInfo.slipLoss : 8;
  const rearOpacity = layoutInfo.rearShare / 100;
  const frontOpacity = layoutInfo.frontShare / 100;
  const activeFront = layoutInfo.frontShare > 0;
  const activeRear = layoutInfo.rearShare > 0;

  return (
    <section className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border p-4">
        <p className="text-xs font-medium text-accent">传动系统实验台</p>
        <h2 className="mt-1 text-lg font-semibold text-primary">
          变速器之后，动力如何继续走到车轮？
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
          这一章把动力路径拆成传动轴、半轴、差速器、中央差速器、分动器和电控多片离合器。重点不是背零件名，而是看懂转弯、打滑和四驱分配时，动力为什么会重新分流。
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.35fr_0.95fr]">
        <div className="border-b border-border p-4 lg:border-b-0 lg:border-r">
          <svg
            viewBox="0 0 680 460"
            role="img"
            aria-label="传动系统动力路径、差速器和转弯轮速示意"
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="drivetrain-arrow"
                markerHeight="8"
                markerWidth="8"
                orient="auto"
                refX="7"
                refY="4"
              >
                <path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" />
              </marker>
              <linearGradient id="shaft-gradient" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>

            <rect
              x="96"
              y="60"
              width="488"
              height="220"
              rx="28"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="3"
            />
            <path
              d="M155 96 C250 40 430 40 525 96"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <path
              d="M140 248 C250 302 430 302 540 248"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            />

            {[
              [126, 80, activeFront ? frontOpacity : 0.18, "左前"],
              [496, 80, activeFront ? frontOpacity : 0.18, "右前"],
              [126, 238, activeRear ? rearOpacity : 0.18, "左后"],
              [496, 238, activeRear ? rearOpacity : 0.18, "右后"],
            ].map(([x, y, opacity, label]) => (
              <g key={`${label}`}>
                <rect
                  x={Number(x)}
                  y={Number(y)}
                  width="58"
                  height="28"
                  rx="8"
                  fill={Number(opacity) > 0.2 ? "#22c55e" : "var(--card)"}
                  opacity={Number(opacity)}
                  stroke="var(--border)"
                  strokeWidth="2"
                />
                <text
                  x={Number(x) + 29}
                  y={Number(y) + 50}
                  textAnchor="middle"
                  className="fill-secondary text-[11px]"
                >
                  {label}
                </text>
              </g>
            ))}

            <rect
              x="286"
              y="128"
              width="108"
              height="54"
              rx="10"
              fill="var(--card)"
              stroke="#f97316"
              strokeWidth="3"
            />
            <text
              x="340"
              y="151"
              textAnchor="middle"
              className="fill-primary text-[13px] font-semibold"
            >
              变速器
            </text>
            <text
              x="340"
              y="170"
              textAnchor="middle"
              className="fill-secondary text-[11px]"
            >
              输出轴
            </text>

            <circle
              cx="340"
              cy="235"
              r="31"
              fill="var(--card)"
              stroke="#a855f7"
              strokeWidth="4"
            />
            <text
              x="340"
              y="232"
              textAnchor="middle"
              className="fill-primary text-[12px] font-semibold"
            >
              中央
            </text>
            <text
              x="340"
              y="248"
              textAnchor="middle"
              className="fill-primary text-[12px] font-semibold"
            >
              分配
            </text>

            <path
              d="M340 182 V204"
              stroke="url(#shaft-gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              markerEnd="url(#drivetrain-arrow)"
            />
            <path
              d="M309 235 H225 V94 H184"
              stroke={activeFront ? "var(--accent)" : "var(--border)"}
              strokeWidth={activeFront ? 7 : 3}
              strokeLinecap="round"
              fill="none"
              opacity={activeFront ? 1 : 0.35}
              markerEnd={activeFront ? "url(#drivetrain-arrow)" : undefined}
            />
            <path
              d="M371 235 H455 V94 H496"
              stroke={activeFront ? "var(--accent)" : "var(--border)"}
              strokeWidth={activeFront ? 7 : 3}
              strokeLinecap="round"
              fill="none"
              opacity={activeFront ? 1 : 0.35}
              markerEnd={activeFront ? "url(#drivetrain-arrow)" : undefined}
            />
            <path
              d="M309 252 H225 V252 H184"
              stroke={activeRear ? "#22c55e" : "var(--border)"}
              strokeWidth={activeRear ? 7 : 3}
              strokeLinecap="round"
              fill="none"
              opacity={activeRear ? 1 : 0.35}
              markerEnd={activeRear ? "url(#drivetrain-arrow)" : undefined}
            />
            <path
              d="M371 252 H455 V252 H496"
              stroke={activeRear ? "#22c55e" : "var(--border)"}
              strokeWidth={activeRear ? 7 : 3}
              strokeLinecap="round"
              fill="none"
              opacity={activeRear ? 1 : 0.35}
              markerEnd={activeRear ? "url(#drivetrain-arrow)" : undefined}
            />

            <g transform="translate(72 326)">
              <text className="fill-primary text-[13px] font-semibold">
                转弯时：外侧轮要走更长的弧线
              </text>
              <path
                d="M34 90 C130 4 242 4 338 90"
                fill="none"
                stroke="#22c55e"
                strokeWidth="8"
                strokeLinecap="round"
                opacity="0.9"
              />
              <path
                d="M84 90 C154 36 218 36 288 90"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="8"
                strokeLinecap="round"
                opacity="0.9"
              />
              <circle cx="84" cy="90" r="14" fill="#60a5fa" />
              <circle cx="288" cy="90" r="14" fill="#22c55e" />
              <text
                x="84"
                y="124"
                textAnchor="middle"
                className="fill-secondary text-[11px]"
              >
                内侧 {wheelSpeed.inner}
              </text>
              <text
                x="288"
                y="124"
                textAnchor="middle"
                className="fill-secondary text-[11px]"
              >
                外侧 {wheelSpeed.outer}
              </text>
            </g>

            <g transform="translate(470 326)">
              <text className="fill-primary text-[13px] font-semibold">
                打滑模拟
              </text>
              <rect
                x="0"
                y="24"
                width="136"
                height="16"
                rx="8"
                fill="var(--border)"
              />
              <rect
                x="0"
                y="24"
                width={Math.round(gripShare * 1.36)}
                height="16"
                rx="8"
                fill="#22c55e"
              />
              <rect
                x="0"
                y="58"
                width="136"
                height="16"
                rx="8"
                fill="var(--border)"
              />
              <rect
                x="0"
                y="58"
                width={Math.round(slipShare * 1.36)}
                height="16"
                rx="8"
                fill="#ef4444"
              />
              <text x="0" y="102" className="fill-secondary text-[11px]">
                有抓地轮 {gripShare}% / 打滑轮 {slipShare}%
              </text>
            </g>
          </svg>
        </div>

        <div className="space-y-4 p-4">
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">传动形式</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {(Object.keys(DRIVETRAIN_LAYOUTS) as DrivetrainLayout[]).map(
                (key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setLayout(key)}
                    className={`rounded-control border px-3 py-2 text-left text-xs ${
                      layout === key
                        ? "border-accent text-accent"
                        : "border-border text-secondary hover:text-primary"
                    }`}
                  >
                    {DRIVETRAIN_LAYOUTS[key].label}
                  </button>
                ),
              )}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              {layoutInfo.summary}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {layoutInfo.path.map((node, index) => (
                <span
                  key={`${layout}-${node}`}
                  className="rounded-control border border-border px-2 py-1 text-xs text-secondary"
                >
                  {index + 1}. {node}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-secondary">
              前轴 {layoutInfo.frontShare}% / 后轴 {layoutInfo.rearShare}%
            </p>
          </div>

          <div className="rounded-control border border-border bg-bg p-4">
            <label
              className="text-xs font-medium text-secondary"
              htmlFor="turn-radius"
            >
              转弯半径：{turnRadius} m
            </label>
            <input
              id="turn-radius"
              type="range"
              min="24"
              max="64"
              step="2"
              value={turnRadius}
              onChange={(event) => setTurnRadius(Number(event.target.value))}
              className="mdx-range mt-2 h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
            />
            <p className="mt-2 text-sm leading-relaxed text-secondary">
              轮速差：{wheelSpeed.spread}
              。半径越小，内外轮路线差越明显，差速器越重要。
            </p>
            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              className="mt-3 rounded-control border border-accent px-3 py-2 text-xs text-accent"
            >
              {playing ? "暂停半径动画" : "播放转弯动画"}
            </button>
          </div>

          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">差速器策略</p>
            <div className="mt-3 grid gap-2">
              {(Object.keys(DIFFERENTIAL_MODES) as DifferentialMode[]).map(
                (key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setDiffMode(key)}
                    className={`rounded-control border px-3 py-2 text-left text-xs ${
                      diffMode === key
                        ? "border-accent text-accent"
                        : "border-border text-secondary hover:text-primary"
                    }`}
                  >
                    {DIFFERENTIAL_MODES[key].label}
                  </button>
                ),
              )}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              {diffInfo.summary}
            </p>
            <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-xs text-secondary">
              <input
                type="checkbox"
                checked={slipping}
                onChange={(event) => setSlipping(event.target.checked)}
                className="h-4 w-4 accent-accent"
              />
              模拟单侧车轮打滑
            </label>
            <p className="mt-2 text-xs text-secondary">{diffInfo.bias}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">差速器</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              让左右车轮能以不同转速转动，所以转弯时不拖拽、不跳动。
            </p>
          </div>
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">
              分动器 / 中央差速器
            </p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              负责前后轴动力分配；全时四驱强调可差速，分时四驱强调硬连接脱困。
            </p>
          </div>
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">电控多片离合器</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              通过压紧离合片改变前后轴连接强度，适时四驱和 HALDEX 常见。
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <p className="text-xs font-medium text-accent">差速器小测</p>
        <h3 className="mt-1 text-base font-semibold text-primary">
          单侧车轮陷入湿滑路面时，哪种策略更适合短时间脱困？
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setAnswer("open")}
            className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
          >
            普通差速器
          </button>
          <button
            type="button"
            onClick={() => setAnswer("locked")}
            className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
          >
            差速锁
          </button>
        </div>
        {answer && (
          <p
            className={`mt-3 rounded-control border p-3 text-sm leading-relaxed ${
              answer === "locked"
                ? "border-accent text-primary"
                : "border-warning text-primary"
            }`}
          >
            {answer === "locked"
              ? "正确。差速锁把左右半轴硬连接，能把动力保留给仍有抓地的一侧，但不适合铺装路长时间转弯。"
              : "不对。普通差速器转弯舒服，但单侧打滑时，动力容易从低附着轮流失。"}
          </p>
        )}
      </div>
    </section>
  );
}

export function SuspensionLab() {
  const [type, setType] = useState<SuspensionType>("macpherson");
  const [roadMode, setRoadMode] = useState<RoadMode>("bump");
  const [spring, setSpring] = useState(58);
  const [damping, setDamping] = useState(52);
  const [travel, setTravel] = useState(34);
  const [playing, setPlaying] = useState(false);
  const [answer, setAnswer] = useState<"spring" | "damper" | null>(null);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setTravel((value) => (value >= 58 ? 18 : value + 8));
    }, 720);
    return () => window.clearInterval(timer);
  }, [playing]);

  const typeInfo = SUSPENSION_TYPES[type];
  const roadInfo = ROAD_MODES[roadMode];
  const bodyLift = Math.round((travel - 34) * 0.42 - (damping - 50) * 0.06);
  const wheelY = 286 - travel;
  const bodyY = 86 - bodyLift;
  const rebound = Math.max(8, Math.round((100 - damping) * 0.72));
  const comfortScore = Math.max(
    20,
    Math.min(96, typeInfo.comfort + Math.round((70 - spring) * 0.25)),
  );
  const handlingScore = Math.max(
    20,
    Math.min(96, typeInfo.handling + Math.round((spring - 52) * 0.24)),
  );
  const rollAngle =
    roadMode === "corner" ? Math.max(2, Math.round((88 - spring) / 8)) : 0;
  const springPath = `M332 ${bodyY + 86} l-16 12 l32 12 l-32 12 l32 12 l-32 12 l32 12 l-16 12`;

  return (
    <section className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border p-4">
        <p className="text-xs font-medium text-accent">悬架系统实验台</p>
        <h2 className="mt-1 text-lg font-semibold text-primary">
          车轮上下跳，为什么车身还能相对稳定？
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
          悬架不是简单的弹簧。弹簧负责承托和储能，减振器负责把多余振动耗掉，摆臂和连杆负责控制车轮姿态。调校不同，舒适和操控的性格就不同。
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.35fr_0.95fr]">
        <div className="border-b border-border p-4 lg:border-b-0 lg:border-r">
          <svg
            viewBox="0 0 680 450"
            role="img"
            aria-label="悬架系统车身车轮弹簧减振器示意"
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="suspension-arrow"
                markerHeight="8"
                markerWidth="8"
                orient="auto"
                refX="7"
                refY="4"
              >
                <path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" />
              </marker>
            </defs>

            <path
              d="M72 350 H176 C212 350 228 326 260 326 H610"
              fill="none"
              stroke="var(--border)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {roadMode === "rough" && (
              <path
                d="M72 360 C112 334 148 382 188 350 C228 318 262 382 302 350 C342 318 382 382 424 350 H610"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="4"
                strokeLinecap="round"
              />
            )}
            {roadMode === "bump" && (
              <path
                d="M202 350 C226 310 252 310 278 350"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="5"
                strokeLinecap="round"
              />
            )}

            <g transform={`rotate(${rollAngle} 336 150)`}>
              <rect
                x="144"
                y={bodyY}
                width="384"
                height="92"
                rx="18"
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="3"
              />
              <path
                d={`M188 ${bodyY} C240 ${bodyY - 42} 430 ${
                  bodyY - 42
                } 482 ${bodyY}`}
                fill="none"
                stroke="var(--border)"
                strokeWidth="3"
              />
              <text
                x="336"
                y={bodyY + 48}
                textAnchor="middle"
                className="fill-primary text-[13px] font-semibold"
              >
                车身 / 副车架
              </text>
            </g>

            <circle
              cx="336"
              cy={wheelY}
              r="54"
              fill="var(--card)"
              stroke="#64748b"
              strokeWidth="10"
            />
            <circle
              cx="336"
              cy={wheelY}
              r="24"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="3"
            />
            <text
              x="336"
              y={wheelY + 5}
              textAnchor="middle"
              className="fill-primary text-[12px] font-semibold"
            >
              车轮
            </text>

            <path
              d={springPath}
              fill="none"
              stroke="#22c55e"
              strokeWidth={Math.max(4, Math.round(spring / 14))}
              strokeLinejoin="round"
            />
            <path
              d={`M384 ${bodyY + 88} L384 ${wheelY - 40}`}
              stroke="#60a5fa"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d={`M384 ${bodyY + 112} L384 ${wheelY - 18}`}
              stroke="var(--accent)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {type === "macpherson" && (
              <path
                d={`M290 ${bodyY + 84} L336 ${wheelY - 22} L252 ${wheelY + 36}`}
                fill="none"
                stroke="#a855f7"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            {type === "doubleWishbone" && (
              <g>
                <path
                  d={`M246 ${bodyY + 42} L336 ${wheelY - 34} L430 ${
                    bodyY + 42
                  }`}
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d={`M232 ${bodyY + 126} L336 ${wheelY + 30} L444 ${
                    bodyY + 126
                  }`}
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </g>
            )}
            {type === "multiLink" && (
              <g strokeLinecap="round">
                {[-44, -20, 20, 44].map((offset, index) => (
                  <path
                    key={offset}
                    d={`M${274 + index * 40} ${bodyY + 108} L${
                      336 + offset
                    } ${wheelY + 14}`}
                    stroke={index % 2 ? "#f97316" : "#a855f7"}
                    strokeWidth="4"
                  />
                ))}
              </g>
            )}

            <path
              d={`M500 ${bodyY + 92} C544 ${bodyY + 118} 564 ${
                bodyY + 142 + rebound
              } 584 ${bodyY + 178}`}
              fill="none"
              stroke="#ef4444"
              strokeWidth="4"
              strokeDasharray="8 8"
              markerEnd="url(#suspension-arrow)"
            />
            <text
              x="540"
              y={bodyY + 210}
              textAnchor="middle"
              className="fill-secondary text-[12px]"
            >
              余振 {rebound}
            </text>

            <g transform="translate(76 84)">
              <text className="fill-primary text-[13px] font-semibold">
                当前场景
              </text>
              <rect
                x="0"
                y="18"
                width="112"
                height="70"
                rx="10"
                fill="var(--card)"
                stroke="var(--border)"
              />
              <text
                x="56"
                y="48"
                textAnchor="middle"
                className="fill-primary text-[12px] font-semibold"
              >
                {ROAD_MODES[roadMode].label}
              </text>
              <text
                x="56"
                y="68"
                textAnchor="middle"
                className="fill-secondary text-[11px]"
              >
                行程 {travel} mm
              </text>
            </g>
          </svg>
        </div>

        <div className="space-y-4 p-4">
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">悬架形式</p>
            <div className="mt-3 grid gap-2">
              {(Object.keys(SUSPENSION_TYPES) as SuspensionType[]).map(
                (key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setType(key)}
                    className={`rounded-control border px-3 py-2 text-left text-xs ${
                      type === key
                        ? "border-accent text-accent"
                        : "border-border text-secondary hover:text-primary"
                    }`}
                  >
                    {SUSPENSION_TYPES[key].label}
                  </button>
                ),
              )}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              {typeInfo.summary}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {typeInfo.parts.map((part) => (
                <span
                  key={`${type}-${part}`}
                  className="rounded-control border border-border px-2 py-1 text-xs text-secondary"
                >
                  {part}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">路面场景</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(Object.keys(ROAD_MODES) as RoadMode[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setRoadMode(key)}
                  className={`rounded-control border px-3 py-2 text-xs ${
                    roadMode === key
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:text-primary"
                  }`}
                >
                  {ROAD_MODES[key].label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              {roadInfo.summary}
            </p>
          </div>

          <div className="rounded-control border border-border bg-bg p-4">
            <label
              className="text-xs font-medium text-secondary"
              htmlFor="spring-stiffness"
            >
              弹簧硬度：{spring}
            </label>
            <input
              id="spring-stiffness"
              type="range"
              min="30"
              max="90"
              step="2"
              value={spring}
              onChange={(event) => setSpring(Number(event.target.value))}
              className="mdx-range mt-2 h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
            />
            <label
              className="mt-4 block text-xs font-medium text-secondary"
              htmlFor="damping-force"
            >
              减振阻尼：{damping}
            </label>
            <input
              id="damping-force"
              type="range"
              min="20"
              max="90"
              step="2"
              value={damping}
              onChange={(event) => setDamping(Number(event.target.value))}
              className="mdx-range mt-2 h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
            />
            <label
              className="mt-4 block text-xs font-medium text-secondary"
              htmlFor="wheel-travel"
            >
              车轮上跳行程：{travel} mm
            </label>
            <input
              id="wheel-travel"
              type="range"
              min="16"
              max="62"
              step="2"
              value={travel}
              onChange={(event) => setTravel(Number(event.target.value))}
              className="mdx-range mt-2 h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
            />
            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              className="mt-4 rounded-control border border-accent px-3 py-2 text-xs text-accent"
            >
              {playing ? "暂停过坎动画" : "播放过坎动画"}
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">舒适倾向</p>
            <div className="mt-3 h-2 rounded-full bg-border">
              <div
                className="h-2 rounded-full bg-[#60a5fa]"
                style={{ width: `${comfortScore}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-secondary">{comfortScore}%</p>
          </div>
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">操控支撑</p>
            <div className="mt-3 h-2 rounded-full bg-border">
              <div
                className="h-2 rounded-full bg-[#22c55e]"
                style={{ width: `${handlingScore}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-secondary">{handlingScore}%</p>
          </div>
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">车身余振</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              阻尼越低，弹簧回弹后越容易继续晃；阻尼过高又会把冲击直接传给车身。
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <p className="text-xs font-medium text-accent">悬架小测</p>
        <h3 className="mt-1 text-base font-semibold text-primary">
          过完一个凸起后，主要是谁负责抑制车身继续上下晃？
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setAnswer("spring")}
            className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
          >
            弹簧
          </button>
          <button
            type="button"
            onClick={() => setAnswer("damper")}
            className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
          >
            减振器
          </button>
        </div>
        {answer && (
          <p
            className={`mt-3 rounded-control border p-3 text-sm leading-relaxed ${
              answer === "damper"
                ? "border-accent text-primary"
                : "border-warning text-primary"
            }`}
          >
            {answer === "damper"
              ? "正确。弹簧负责承托和回弹，减振器把振动能量转成热，控制车身不要反复弹跳。"
              : "不对。弹簧会储能和回弹，如果没有减振器，车身会更容易反复上下晃。"}
          </p>
        )}
      </div>
    </section>
  );
}

export function SteeringLab() {
  const [assist, setAssist] = useState<SteeringAssist>("electric");
  const [mode, setMode] = useState<FourWheelSteerMode>("frontOnly");
  const [wheelAngle, setWheelAngle] = useState(24);
  const [speed, setSpeed] = useState(36);
  const [playing, setPlaying] = useState(false);
  const [answer, setAnswer] = useState<"low" | "high" | null>(null);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setWheelAngle((value) => (value >= 38 ? -38 : value + 8));
    }, 760);
    return () => window.clearInterval(timer);
  }, [playing]);

  const assistInfo = STEERING_ASSISTS[assist];
  const modeInfo = FOUR_WHEEL_STEER_MODES[mode];
  const frontAngle = Math.round(wheelAngle * 0.36);
  const rearAngle = Math.round(frontAngle * modeInfo.rearFactor);
  const rackOffset = Math.round(wheelAngle * 1.18);
  const turningRadius = Math.max(
    4.6,
    Number(
      (18 - Math.abs(frontAngle) * 0.55 - Math.abs(rearAngle) * 0.85).toFixed(
        1,
      ),
    ),
  );
  const effort = Math.max(
    10,
    Math.round(
      assistInfo.effort + (speed > 80 ? 10 : 0) - Math.abs(wheelAngle) * 0.18,
    ),
  );

  return (
    <section className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border p-4">
        <p className="text-xs font-medium text-accent">转向系统实验台</p>
        <h2 className="mt-1 text-lg font-semibold text-primary">
          方向盘转动，前轮为什么会跟着偏转？
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
          转向系统把驾驶者手上的旋转动作，转换成车轮左右摆动。核心链路是方向盘、转向柱、转向机、拉杆和转向节；助力系统负责让低速不费劲、高速不发飘。
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.35fr_0.95fr]">
        <div className="border-b border-border p-4 lg:border-b-0 lg:border-r">
          <svg
            viewBox="0 0 680 450"
            role="img"
            aria-label="转向系统方向盘齿轮齿条拉杆和车轮转角示意"
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="steering-arrow"
                markerHeight="8"
                markerWidth="8"
                orient="auto"
                refX="7"
                refY="4"
              >
                <path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" />
              </marker>
            </defs>

            <rect
              x="98"
              y="76"
              width="484"
              height="234"
              rx="30"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="3"
            />
            <path
              d="M164 104 C250 48 430 48 516 104"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <path
              d="M132 286 C246 332 430 332 548 286"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            />

            <g transform={`translate(194 142) rotate(${wheelAngle})`}>
              <circle
                cx="0"
                cy="0"
                r="46"
                fill="var(--card)"
                stroke="#60a5fa"
                strokeWidth="7"
              />
              <path
                d="M-30 0 H30 M0 -30 V30"
                stroke="var(--border)"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </g>
            <text
              x="194"
              y="214"
              textAnchor="middle"
              className="fill-secondary text-[12px]"
            >
              方向盘 {wheelAngle}°
            </text>

            <path
              d="M230 150 C286 150 296 198 332 214"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="7"
              strokeLinecap="round"
              markerEnd="url(#steering-arrow)"
            />
            <text
              x="288"
              y="143"
              textAnchor="middle"
              className="fill-secondary text-[11px]"
            >
              转向柱
            </text>

            <circle
              cx="350"
              cy="222"
              r="28"
              fill="var(--card)"
              stroke="#f97316"
              strokeWidth="5"
            />
            <path
              d="M331 222 H369 M350 203 V241"
              stroke="#f97316"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <text
              x="350"
              y="269"
              textAnchor="middle"
              className="fill-primary text-[12px] font-semibold"
            >
              小齿轮
            </text>

            <rect
              x={260 + rackOffset}
              y="288"
              width="184"
              height="24"
              rx="8"
              fill="var(--card)"
              stroke="var(--accent)"
              strokeWidth="4"
            />
            <path
              d={`M${260 + rackOffset} 300 H${184 + frontAngle * 1.8}`}
              stroke="var(--accent)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d={`M${444 + rackOffset} 300 H${498 + frontAngle * 1.8}`}
              stroke="var(--accent)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <text
              x="352"
              y="337"
              textAnchor="middle"
              className="fill-secondary text-[12px]"
            >
              齿条左右移动 {rackOffset}px
            </text>

            {[
              [154, 274, frontAngle, "左前"],
              [500, 274, frontAngle, "右前"],
              [154, 116, rearAngle, "左后"],
              [500, 116, rearAngle, "右后"],
            ].map(([x, y, angle, label]) => (
              <g
                key={`${label}`}
                transform={`translate(${x} ${y}) rotate(${angle})`}
              >
                <rect
                  x="-30"
                  y="-16"
                  width="60"
                  height="32"
                  rx="8"
                  fill={
                    String(label).includes("前") ? "#22c55e" : "var(--card)"
                  }
                  opacity={
                    String(label).includes("前") || mode !== "frontOnly"
                      ? 1
                      : 0.45
                  }
                  stroke="var(--border)"
                  strokeWidth="2"
                />
                <text
                  x="0"
                  y="44"
                  textAnchor="middle"
                  className="fill-secondary text-[11px]"
                  transform={`rotate(${-Number(angle)} 0 44)`}
                >
                  {label} {angle}°
                </text>
              </g>
            ))}

            <g transform="translate(72 354)">
              <text className="fill-primary text-[13px] font-semibold">
                助力负担
              </text>
              <rect
                x="0"
                y="18"
                width="160"
                height="16"
                rx="8"
                fill="var(--border)"
              />
              <rect
                x="0"
                y="18"
                width={Math.round(effort * 1.6)}
                height="16"
                rx="8"
                fill={assist === "mechanical" ? "#ef4444" : "#22c55e"}
              />
              <text x="0" y="58" className="fill-secondary text-[11px]">
                手感负担 {effort}%
              </text>
            </g>

            <g transform="translate(456 354)">
              <text className="fill-primary text-[13px] font-semibold">
                转弯半径
              </text>
              <circle
                cx="56"
                cy="42"
                r={Math.max(18, turningRadius * 3.2)}
                fill="none"
                stroke="#60a5fa"
                strokeWidth="4"
                strokeDasharray="8 8"
              />
              <text
                x="56"
                y="48"
                textAnchor="middle"
                className="fill-primary text-[12px] font-semibold"
              >
                {turningRadius}m
              </text>
            </g>
          </svg>
        </div>

        <div className="space-y-4 p-4">
          <div className="rounded-control border border-border bg-bg p-4">
            <label
              className="text-xs font-medium text-secondary"
              htmlFor="steering-wheel-angle"
            >
              方向盘角度：{wheelAngle}°
            </label>
            <input
              id="steering-wheel-angle"
              type="range"
              min="-40"
              max="40"
              step="2"
              value={wheelAngle}
              onChange={(event) => setWheelAngle(Number(event.target.value))}
              className="mdx-range mt-2 h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
            />
            <label
              className="mt-4 block text-xs font-medium text-secondary"
              htmlFor="steering-speed"
            >
              车速：{speed} km/h
            </label>
            <input
              id="steering-speed"
              type="range"
              min="5"
              max="120"
              step="5"
              value={speed}
              onChange={(event) => setSpeed(Number(event.target.value))}
              className="mdx-range mt-2 h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
            />
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              前轮转角约 {frontAngle}°，后轮转角约 {rearAngle}°。
            </p>
            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              className="mt-3 rounded-control border border-accent px-3 py-2 text-xs text-accent"
            >
              {playing ? "暂停转向动画" : "播放转向动画"}
            </button>
          </div>

          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">转向助力</p>
            <div className="mt-3 grid gap-2">
              {(Object.keys(STEERING_ASSISTS) as SteeringAssist[]).map(
                (key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setAssist(key)}
                    className={`rounded-control border px-3 py-2 text-left text-xs ${
                      assist === key
                        ? "border-accent text-accent"
                        : "border-border text-secondary hover:text-primary"
                    }`}
                  >
                    {STEERING_ASSISTS[key].label}
                  </button>
                ),
              )}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              {assistInfo.summary}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {assistInfo.path.map((node, index) => (
                <span
                  key={`${assist}-${node}`}
                  className="rounded-control border border-border px-2 py-1 text-xs text-secondary"
                >
                  {index + 1}. {node}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">四轮转向</p>
            <div className="mt-3 grid gap-2">
              {(
                Object.keys(FOUR_WHEEL_STEER_MODES) as FourWheelSteerMode[]
              ).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMode(key)}
                  className={`rounded-control border px-3 py-2 text-left text-xs ${
                    mode === key
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:text-primary"
                  }`}
                >
                  {FOUR_WHEEL_STEER_MODES[key].label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              {modeInfo.summary}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">齿轮齿条</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              小齿轮把转向柱旋转变成齿条左右移动，拉杆再推动车轮偏转。
            </p>
          </div>
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">助力系统</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              低速提供更多帮助，高速减少过度轻飘，是手感和稳定性的平衡。
            </p>
          </div>
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">四轮转向</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              低速反向缩小半径，高速同向提升变道稳定性。
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <p className="text-xs font-medium text-accent">四轮转向小测</p>
        <h3 className="mt-1 text-base font-semibold text-primary">
          低速掉头或入库时，后轮怎样转更容易缩小转弯半径？
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setAnswer("low")}
            className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
          >
            后轮反向
          </button>
          <button
            type="button"
            onClick={() => setAnswer("high")}
            className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
          >
            后轮同向
          </button>
        </div>
        {answer && (
          <p
            className={`mt-3 rounded-control border p-3 text-sm leading-relaxed ${
              answer === "low"
                ? "border-accent text-primary"
                : "border-warning text-primary"
            }`}
          >
            {answer === "low"
              ? "正确。低速时后轮和前轮反向偏转，车辆等效轴距变短，掉头和泊车更灵活。"
              : "不对。高速同向更适合稳定变道；低速想缩小半径，后轮通常反向偏转。"}
          </p>
        )}
      </div>
    </section>
  );
}

export function BrakeLab() {
  const [brakeType, setBrakeType] = useState<BrakeType>("disc");
  const [scenario, setScenario] = useState<BrakeScenario>("normal");
  const [speed, setSpeed] = useState(80);
  const [pedal, setPedal] = useState(62);
  const [temperature, setTemperature] = useState(220);
  const [playing, setPlaying] = useState(false);
  const [answer, setAnswer] = useState<"heat" | "speed" | null>(null);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setPedal((value) => (value >= 92 ? 20 : value + 12));
      setTemperature((value) => (value >= 520 ? 160 : value + 45));
    }, 820);
    return () => window.clearInterval(timer);
  }, [playing]);

  const brakeInfo = BRAKE_TYPES[brakeType];
  const scenarioInfo = BRAKE_SCENARIOS[scenario];
  const brakeForce = Math.round(pedal * (brakeType === "disc" ? 1 : 0.88));
  const heatPenalty = scenarioInfo.heat * (temperature / 520);
  const effectiveGrip = Math.max(0.24, scenarioInfo.grip - heatPenalty * 0.28);
  const stoppingDistance = Math.round(
    (speed * speed) / Math.max(55, brakeForce * effectiveGrip * 1.62),
  );
  const hydraulicPressure = Math.round(pedal * 1.35);
  const fadeRisk = Math.min(
    98,
    Math.round((temperature / 560) * 100 + scenarioInfo.heat * 22),
  );
  const caliperGap = Math.max(4, 18 - Math.round(pedal / 8));
  const heatColor =
    temperature > 420 ? "#ef4444" : temperature > 300 ? "#f59e0b" : "#22c55e";

  return (
    <section className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border p-4">
        <p className="text-xs font-medium text-accent">制动系统实验台</p>
        <h2 className="mt-1 text-lg font-semibold text-primary">
          踩下刹车踏板，车轮为什么能被减速？
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
          制动系统把脚上的力放大并传到车轮端：踏板推动助力器和总泵，制动液把压力传到卡钳或轮缸，摩擦副把车辆动能转成热。热量过高或轮胎抓地不足，都会让制动距离变长。
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.35fr_0.95fr]">
        <div className="border-b border-border p-4 lg:border-b-0 lg:border-r">
          <svg
            viewBox="0 0 680 450"
            role="img"
            aria-label="制动系统踏板助力总泵管路和车轮制动示意"
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="brake-arrow"
                markerHeight="8"
                markerWidth="8"
                orient="auto"
                refX="7"
                refY="4"
              >
                <path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" />
              </marker>
            </defs>

            <rect
              x="80"
              y="66"
              width="520"
              height="244"
              rx="30"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="3"
            />
            <path
              d="M128 284 C246 334 438 334 552 284"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            />

            <g transform={`translate(142 ${146 + pedal * 0.18}) rotate(-18)`}>
              <rect
                x="-14"
                y="-58"
                width="28"
                height="112"
                rx="8"
                fill="var(--card)"
                stroke="#60a5fa"
                strokeWidth="4"
              />
              <rect
                x="-24"
                y="46"
                width="48"
                height="16"
                rx="6"
                fill="#60a5fa"
              />
            </g>
            <text
              x="142"
              y="246"
              textAnchor="middle"
              className="fill-secondary text-[12px]"
            >
              踏板 {pedal}%
            </text>

            <circle
              cx="248"
              cy="172"
              r="38"
              fill="var(--card)"
              stroke="#a855f7"
              strokeWidth="5"
            />
            <text
              x="248"
              y="168"
              textAnchor="middle"
              className="fill-primary text-[12px] font-semibold"
            >
              助力器
            </text>
            <text
              x="248"
              y="186"
              textAnchor="middle"
              className="fill-secondary text-[11px]"
            >
              放大脚力
            </text>

            <rect
              x="318"
              y="148"
              width="102"
              height="48"
              rx="10"
              fill="var(--card)"
              stroke="#f97316"
              strokeWidth="4"
            />
            <text
              x="369"
              y="168"
              textAnchor="middle"
              className="fill-primary text-[12px] font-semibold"
            >
              制动总泵
            </text>
            <text
              x="369"
              y="186"
              textAnchor="middle"
              className="fill-secondary text-[11px]"
            >
              {hydraulicPressure} bar
            </text>

            <path
              d="M180 172 H210"
              stroke="var(--accent)"
              strokeWidth="6"
              strokeLinecap="round"
              markerEnd="url(#brake-arrow)"
            />
            <path
              d="M286 172 H318"
              stroke="var(--accent)"
              strokeWidth="6"
              strokeLinecap="round"
              markerEnd="url(#brake-arrow)"
            />
            <path
              d="M420 172 C474 172 478 246 514 260"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="6"
              strokeLinecap="round"
              markerEnd="url(#brake-arrow)"
            />
            <path
              d="M420 172 C474 172 478 104 514 90"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.45"
            />

            <g transform="translate(530 260)">
              <circle
                cx="0"
                cy="0"
                r="56"
                fill="var(--card)"
                stroke="#64748b"
                strokeWidth="10"
              />
              <circle
                cx="0"
                cy="0"
                r="28"
                fill="var(--bg)"
                stroke={heatColor}
                strokeWidth="7"
              />
              {brakeType === "disc" ? (
                <g>
                  <rect
                    x={-42}
                    y={-caliperGap - 18}
                    width="84"
                    height="14"
                    rx="6"
                    fill="#ef4444"
                  />
                  <rect
                    x={-42}
                    y={caliperGap + 4}
                    width="84"
                    height="14"
                    rx="6"
                    fill="#ef4444"
                  />
                </g>
              ) : (
                <g>
                  <path
                    d={`M-32 -20 C-50 ${-8 - pedal * 0.05} -50 ${
                      8 + pedal * 0.05
                    } -32 20`}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d={`M32 -20 C50 ${-8 - pedal * 0.05} 50 ${
                      8 + pedal * 0.05
                    } 32 20`}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                </g>
              )}
              <text
                x="0"
                y="84"
                textAnchor="middle"
                className="fill-secondary text-[12px]"
              >
                {brakeInfo.label}
              </text>
            </g>

            <g transform="translate(90 350)">
              <text className="fill-primary text-[13px] font-semibold">
                制动距离
              </text>
              <rect
                x="0"
                y="20"
                width="250"
                height="18"
                rx="9"
                fill="var(--border)"
              />
              <rect
                x="0"
                y="20"
                width={Math.min(250, stoppingDistance * 4)}
                height="18"
                rx="9"
                fill="#22c55e"
              />
              <text x="0" y="62" className="fill-secondary text-[11px]">
                约 {stoppingDistance} m / 抓地 {effectiveGrip.toFixed(2)}
              </text>
            </g>

            <g transform="translate(410 350)">
              <text className="fill-primary text-[13px] font-semibold">
                热衰减风险
              </text>
              <rect
                x="0"
                y="20"
                width="170"
                height="18"
                rx="9"
                fill="var(--border)"
              />
              <rect
                x="0"
                y="20"
                width={Math.round(fadeRisk * 1.7)}
                height="18"
                rx="9"
                fill={heatColor}
              />
              <text x="0" y="62" className="fill-secondary text-[11px]">
                {temperature}°C / {fadeRisk}%
              </text>
            </g>
          </svg>
        </div>

        <div className="space-y-4 p-4">
          <div className="rounded-control border border-border bg-bg p-4">
            <label
              className="text-xs font-medium text-secondary"
              htmlFor="brake-speed"
            >
              车速：{speed} km/h
            </label>
            <input
              id="brake-speed"
              type="range"
              min="20"
              max="140"
              step="5"
              value={speed}
              onChange={(event) => setSpeed(Number(event.target.value))}
              className="mdx-range mt-2 h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
            />
            <label
              className="mt-4 block text-xs font-medium text-secondary"
              htmlFor="brake-pedal"
            >
              踏板力度：{pedal}%
            </label>
            <input
              id="brake-pedal"
              type="range"
              min="15"
              max="100"
              step="5"
              value={pedal}
              onChange={(event) => setPedal(Number(event.target.value))}
              className="mdx-range mt-2 h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
            />
            <label
              className="mt-4 block text-xs font-medium text-secondary"
              htmlFor="brake-temperature"
            >
              制动温度：{temperature}°C
            </label>
            <input
              id="brake-temperature"
              type="range"
              min="80"
              max="560"
              step="20"
              value={temperature}
              onChange={(event) => setTemperature(Number(event.target.value))}
              className="mdx-range mt-2 h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
            />
            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              className="mt-4 rounded-control border border-accent px-3 py-2 text-xs text-accent"
            >
              {playing ? "暂停制动动画" : "播放制动动画"}
            </button>
          </div>

          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">制动形式</p>
            <div className="mt-3 grid gap-2">
              {(Object.keys(BRAKE_TYPES) as BrakeType[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setBrakeType(key)}
                  className={`rounded-control border px-3 py-2 text-left text-xs ${
                    brakeType === key
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:text-primary"
                  }`}
                >
                  {BRAKE_TYPES[key].label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              {brakeInfo.summary}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {brakeInfo.parts.map((part) => (
                <span
                  key={`${brakeType}-${part}`}
                  className="rounded-control border border-border px-2 py-1 text-xs text-secondary"
                >
                  {part}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">制动场景</p>
            <div className="mt-3 grid gap-2">
              {(Object.keys(BRAKE_SCENARIOS) as BrakeScenario[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setScenario(key)}
                  className={`rounded-control border px-3 py-2 text-left text-xs ${
                    scenario === key
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:text-primary"
                  }`}
                >
                  {BRAKE_SCENARIOS[key].label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              {scenarioInfo.summary}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">制动助力器</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              把驾驶者脚力放大，让总泵能建立足够液压。
            </p>
          </div>
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">液压管路</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              制动液把压力传到各车轮，空气进入管路会让踏板变软。
            </p>
          </div>
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">热衰减</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              摩擦把动能变热，温度过高会让摩擦系数和制动效果下降。
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <p className="text-xs font-medium text-accent">制动热衰减小测</p>
        <h3 className="mt-1 text-base font-semibold text-primary">
          长下坡连续刹车后，为什么同样踏板力度可能刹不住？
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setAnswer("heat")}
            className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
          >
            制动器过热
          </button>
          <button
            type="button"
            onClick={() => setAnswer("speed")}
            className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
          >
            方向盘太轻
          </button>
        </div>
        {answer && (
          <p
            className={`mt-3 rounded-control border p-3 text-sm leading-relaxed ${
              answer === "heat"
                ? "border-accent text-primary"
                : "border-warning text-primary"
            }`}
          >
            {answer === "heat"
              ? "正确。连续制动会让制动盘、刹车片或制动鼓升温，摩擦能力下降，制动距离变长。"
              : "不对。方向盘手感不决定制动力；长下坡刹不住的核心风险是热衰减和抓地不足。"}
          </p>
        )}
      </div>
    </section>
  );
}

export function ElectronicsLab() {
  const [sensor, setSensor] = useState<ElectronicsSensor>("radar");
  const [mode, setMode] = useState<SafetyMode>("active");
  const [scenario, setScenario] =
    useState<ElectronicsScenario>("emergencyBrake");
  const [playStep, setPlayStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [answer, setAnswer] = useState<"active" | "passive" | null>(null);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setPlayStep((value) => (value >= 3 ? 0 : value + 1));
    }, 900);
    return () => window.clearInterval(timer);
  }, [playing]);

  const sensorInfo = ELECTRONICS_SENSORS[sensor];
  const modeInfo = SAFETY_MODES[mode];
  const scenarioInfo = ELECTRONICS_SCENARIOS[scenario];
  const activeNode = modeInfo.nodes[playStep % modeInfo.nodes.length];

  return (
    <section className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border p-4">
        <p className="text-xs font-medium text-accent">电气电子实验台</p>
        <h2 className="mt-1 text-lg font-semibold text-primary">
          现代汽车为什么像一台移动的电子系统？
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
          传感器负责看见和感知，控制器负责判断，执行器负责动作。灯光、仪表、空调、ABS、ESP、ADAS
          和气囊，本质都是信号流和控制流的组合。
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.35fr_0.95fr]">
        <div className="border-b border-border p-4 lg:border-b-0 lg:border-r">
          <svg
            viewBox="0 0 680 450"
            role="img"
            aria-label="汽车电气电子传感器控制器执行器架构示意"
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="electronics-arrow"
                markerHeight="8"
                markerWidth="8"
                orient="auto"
                refX="7"
                refY="4"
              >
                <path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" />
              </marker>
            </defs>

            <rect
              x="104"
              y="72"
              width="472"
              height="238"
              rx="32"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="3"
            />
            <path
              d="M158 108 C246 44 434 44 522 108"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <path
              d="M140 286 C252 334 430 334 544 286"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            />

            <ellipse
              cx={sensorInfo.x}
              cy={sensorInfo.y}
              rx={sensorInfo.range}
              ry={Math.max(30, sensorInfo.range * 0.36)}
              fill={sensorInfo.color}
              opacity="0.12"
              stroke={sensorInfo.color}
              strokeWidth="2"
              strokeDasharray="8 8"
            />

            <rect
              x="278"
              y="168"
              width="124"
              height="68"
              rx="14"
              fill="var(--card)"
              stroke="#f97316"
              strokeWidth="4"
            />
            <text
              x="340"
              y="195"
              textAnchor="middle"
              className="fill-primary text-[13px] font-semibold"
            >
              中央控制器
            </text>
            <text
              x="340"
              y="216"
              textAnchor="middle"
              className="fill-secondary text-[11px]"
            >
              ECU / 域控
            </text>

            {(Object.keys(ELECTRONICS_SENSORS) as ElectronicsSensor[]).map(
              (key) => {
                const item = ELECTRONICS_SENSORS[key];
                const selected = key === sensor;
                return (
                  <g
                    key={key}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSensor(key)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ")
                        setSensor(key);
                    }}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={item.x}
                      cy={item.y}
                      r={selected ? 22 : 17}
                      fill={selected ? item.color : "var(--card)"}
                      stroke={item.color}
                      strokeWidth="4"
                    />
                    <text
                      x={item.x}
                      y={item.y + 42}
                      textAnchor="middle"
                      className="fill-secondary text-[11px]"
                    >
                      {item.label}
                    </text>
                    <path
                      d={`M${item.x} ${item.y} L340 202`}
                      stroke={selected ? item.color : "var(--border)"}
                      strokeWidth={selected ? 5 : 2}
                      strokeLinecap="round"
                      opacity={selected ? 1 : 0.45}
                      markerEnd={
                        selected ? "url(#electronics-arrow)" : undefined
                      }
                    />
                  </g>
                );
              },
            )}

            {[
              ["制动执行器", 172, 354, "#ef4444"],
              ["转向执行器", 338, 354, "#22c55e"],
              ["灯光/仪表", 506, 354, "#60a5fa"],
            ].map(([label, x, y, color]) => (
              <g key={String(label)}>
                <rect
                  x={Number(x) - 54}
                  y={Number(y) - 24}
                  width="108"
                  height="48"
                  rx="12"
                  fill="var(--card)"
                  stroke={String(color)}
                  strokeWidth="3"
                />
                <text
                  x={Number(x)}
                  y={Number(y) + 5}
                  textAnchor="middle"
                  className="fill-primary text-[12px] font-semibold"
                >
                  {label}
                </text>
                <path
                  d={`M340 236 C340 284 ${Number(x)} 296 ${Number(x)} 330`}
                  fill="none"
                  stroke={String(color)}
                  strokeWidth="4"
                  strokeLinecap="round"
                  markerEnd="url(#electronics-arrow)"
                  opacity={playStep >= 2 ? 1 : 0.36}
                />
              </g>
            ))}

            <g transform="translate(70 342)">
              <text className="fill-primary text-[13px] font-semibold">
                信号强度
              </text>
              <rect
                x="0"
                y="18"
                width="160"
                height="16"
                rx="8"
                fill="var(--border)"
              />
              <rect
                x="0"
                y="18"
                width={Math.round(scenarioInfo.signal * 1.6)}
                height="16"
                rx="8"
                fill="#60a5fa"
              />
            </g>
            <g transform="translate(450 342)">
              <text className="fill-primary text-[13px] font-semibold">
                干预强度
              </text>
              <rect
                x="0"
                y="18"
                width="160"
                height="16"
                rx="8"
                fill="var(--border)"
              />
              <rect
                x="0"
                y="18"
                width={Math.round(scenarioInfo.intervention * 1.6)}
                height="16"
                rx="8"
                fill="#22c55e"
              />
            </g>
          </svg>
        </div>

        <div className="space-y-4 p-4">
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">当前传感器</p>
            <p className="mt-2 text-base font-semibold text-primary">
              {sensorInfo.label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-secondary">
              {sensorInfo.role}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {(Object.keys(ELECTRONICS_SENSORS) as ElectronicsSensor[]).map(
                (key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSensor(key)}
                    className={`rounded-control border px-3 py-2 text-left text-xs ${
                      sensor === key
                        ? "border-accent text-accent"
                        : "border-border text-secondary hover:text-primary"
                    }`}
                  >
                    {ELECTRONICS_SENSORS[key].label}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">系统类型</p>
            <div className="mt-3 grid gap-2">
              {(Object.keys(SAFETY_MODES) as SafetyMode[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setMode(key);
                    setPlayStep(0);
                  }}
                  className={`rounded-control border px-3 py-2 text-left text-xs ${
                    mode === key
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:text-primary"
                  }`}
                >
                  {SAFETY_MODES[key].label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              {modeInfo.summary}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {modeInfo.nodes.map((node, index) => (
                <span
                  key={`${mode}-${node}`}
                  className={`rounded-control border px-2 py-1 text-xs ${
                    index === playStep
                      ? "border-accent text-accent"
                      : "border-border text-secondary"
                  }`}
                >
                  {index + 1}. {node}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-secondary">
              当前步骤：{activeNode}
            </p>
            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              className="mt-3 rounded-control border border-accent px-3 py-2 text-xs text-accent"
            >
              {playing ? "暂停信号流" : "播放信号流"}
            </button>
          </div>

          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">场景模拟</p>
            <div className="mt-3 grid gap-2">
              {(
                Object.keys(ELECTRONICS_SCENARIOS) as ElectronicsScenario[]
              ).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setScenario(key)}
                  className={`rounded-control border px-3 py-2 text-left text-xs ${
                    scenario === key
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:text-primary"
                  }`}
                >
                  {ELECTRONICS_SCENARIOS[key].label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              {scenarioInfo.summary}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">传感器</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              摄像头、雷达、轮速和温度传感器把环境与车辆状态变成电信号。
            </p>
          </div>
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">控制器</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              ECU 或域控根据规则和算法判断下一步，是电子系统的大脑。
            </p>
          </div>
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">执行器</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              制动、转向、灯光、空调和气囊把控制决策变成真实动作。
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <p className="text-xs font-medium text-accent">主动 / 被动安全小测</p>
        <h3 className="mt-1 text-base font-semibold text-primary">
          AEB 在碰撞前自动刹车，属于哪类安全系统？
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setAnswer("active")}
            className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
          >
            主动安全
          </button>
          <button
            type="button"
            onClick={() => setAnswer("passive")}
            className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
          >
            被动安全
          </button>
        </div>
        {answer && (
          <p
            className={`mt-3 rounded-control border p-3 text-sm leading-relaxed ${
              answer === "active"
                ? "border-accent text-primary"
                : "border-warning text-primary"
            }`}
          >
            {answer === "active"
              ? "正确。AEB 是事故发生前的风险感知和制动干预，属于主动安全。"
              : "不对。被动安全是在碰撞发生后保护乘员，例如气囊和安全带预紧。"}
          </p>
        )}
      </div>
    </section>
  );
}

export function TireLab() {
  const [road, setRoad] = useState<TireRoad>("wet");
  const [pattern, setPattern] = useState<TirePattern>("allSeason");
  const [pressure, setPressure] = useState(2.4);
  const [width, setWidth] = useState(225);
  const [aspect, setAspect] = useState(55);
  const [rim, setRim] = useState(17);
  const [playing, setPlaying] = useState(false);
  const [answer, setAnswer] = useState<"width" | "rim" | null>(null);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setPressure((value) =>
        value >= 3.1 ? 1.8 : Number((value + 0.2).toFixed(1)),
      );
    }, 820);
    return () => window.clearInterval(timer);
  }, [playing]);

  const roadInfo = TIRE_ROADS[road];
  const patternInfo = TIRE_PATTERNS[pattern];
  const contactPatch = Math.round((width / pressure) * 0.88);
  const sidewall = Math.round((width * aspect) / 100);
  const gripBonus =
    road === "wet"
      ? patternInfo.wetBonus
      : road === "snow"
        ? patternInfo.snowBonus
        : 0;
  const pressurePenalty = Math.abs(pressure - 2.4) * 0.12;
  const gripScore = Math.max(
    18,
    Math.min(
      98,
      Math.round((roadInfo.grip + gripBonus - pressurePenalty) * 92),
    ),
  );
  const rollingResistance = Math.max(
    18,
    Math.min(95, Math.round(90 - pressure * 18 + width * 0.08)),
  );
  const tireSpec = `${width}/${aspect} R${rim}`;
  const treadLines =
    pattern === "summer"
      ? ["M-28 -54 V54", "M0 -56 V56", "M28 -54 V54"]
      : pattern === "allSeason"
        ? ["M-34 -48 L-12 48", "M0 -56 V56", "M34 -48 L12 48"]
        : ["M-38 -44 L38 44", "M38 -44 L-38 44", "M0 -58 V58"];

  return (
    <section className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border p-4">
        <p className="text-xs font-medium text-accent">车轮轮胎实验台</p>
        <h2 className="mt-1 text-lg font-semibold text-primary">
          真正接触地面的，只有四小块轮胎
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
          发动机、制动、转向和电子系统再强，最后都要通过轮胎和地面交换力。胎宽、扁平比、轮辋、胎压、花纹和路面共同决定抓地、舒适、滚阻和安全边界。
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.35fr_0.95fr]">
        <div className="border-b border-border p-4 lg:border-b-0 lg:border-r">
          <svg
            viewBox="0 0 680 450"
            role="img"
            aria-label="轮胎剖面规格胎压接地面积示意"
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="tire-arrow"
                markerHeight="8"
                markerWidth="8"
                orient="auto"
                refX="7"
                refY="4"
              >
                <path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" />
              </marker>
            </defs>

            <g transform="translate(340 198)">
              <circle
                cx="0"
                cy="0"
                r="132"
                fill="var(--card)"
                stroke="#64748b"
                strokeWidth="22"
              />
              <circle
                cx="0"
                cy="0"
                r="74"
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="5"
              />
              <circle
                cx="0"
                cy="0"
                r="38"
                fill="var(--card)"
                stroke="#60a5fa"
                strokeWidth="4"
              />
              <g
                stroke="#22c55e"
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.9"
              >
                {treadLines.map((path) => (
                  <path key={path} d={path} />
                ))}
              </g>
              <text
                x="0"
                y="7"
                textAnchor="middle"
                className="fill-primary text-[15px] font-semibold"
              >
                {tireSpec}
              </text>
            </g>

            <path
              d="M118 350 H562"
              stroke={
                road === "snow"
                  ? "#dbeafe"
                  : road === "wet"
                    ? "#60a5fa"
                    : "var(--border)"
              }
              strokeWidth="8"
              strokeLinecap="round"
            />
            <rect
              x={340 - contactPatch / 2}
              y="336"
              width={contactPatch}
              height="28"
              rx="14"
              fill={
                pressure < 2.1
                  ? "#f59e0b"
                  : pressure > 2.8
                    ? "#ef4444"
                    : "#22c55e"
              }
              opacity="0.85"
            />
            <text
              x="340"
              y="392"
              textAnchor="middle"
              className="fill-secondary text-[12px]"
            >
              接地印迹约 {contactPatch} mm，胎压 {pressure.toFixed(1)} bar
            </text>

            <path
              d="M208 92 H472"
              stroke="var(--accent)"
              strokeWidth="3"
              markerEnd="url(#tire-arrow)"
            />
            <text
              x="340"
              y="78"
              textAnchor="middle"
              className="fill-secondary text-[12px]"
            >
              胎宽 {width} mm
            </text>
            <path
              d="M496 142 V254"
              stroke="#f59e0b"
              strokeWidth="3"
              markerEnd="url(#tire-arrow)"
            />
            <text x="536" y="202" className="fill-secondary text-[12px]">
              胎侧 {sidewall} mm
            </text>

            <g transform="translate(70 92)">
              <text className="fill-primary text-[13px] font-semibold">
                抓地
              </text>
              <rect
                x="0"
                y="18"
                width="156"
                height="16"
                rx="8"
                fill="var(--border)"
              />
              <rect
                x="0"
                y="18"
                width={Math.round(gripScore * 1.56)}
                height="16"
                rx="8"
                fill="#22c55e"
              />
              <text x="0" y="58" className="fill-secondary text-[11px]">
                {gripScore}%
              </text>
            </g>

            <g transform="translate(454 92)">
              <text className="fill-primary text-[13px] font-semibold">
                滚阻
              </text>
              <rect
                x="0"
                y="18"
                width="156"
                height="16"
                rx="8"
                fill="var(--border)"
              />
              <rect
                x="0"
                y="18"
                width={Math.round(rollingResistance * 1.56)}
                height="16"
                rx="8"
                fill="#f97316"
              />
              <text x="0" y="58" className="fill-secondary text-[11px]">
                {rollingResistance}%
              </text>
            </g>
          </svg>
        </div>

        <div className="space-y-4 p-4">
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">轮胎规格</p>
            <p className="mt-2 text-xl font-semibold text-primary">
              {tireSpec}
            </p>
            <div className="mt-3 grid gap-3">
              <label className="text-xs text-secondary" htmlFor="tire-width">
                胎宽：{width} mm
              </label>
              <input
                id="tire-width"
                type="range"
                min="185"
                max="285"
                step="5"
                value={width}
                onChange={(event) => setWidth(Number(event.target.value))}
                className="mdx-range h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
              />
              <label className="text-xs text-secondary" htmlFor="tire-aspect">
                扁平比：{aspect}
              </label>
              <input
                id="tire-aspect"
                type="range"
                min="35"
                max="70"
                step="5"
                value={aspect}
                onChange={(event) => setAspect(Number(event.target.value))}
                className="mdx-range h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
              />
              <label className="text-xs text-secondary" htmlFor="tire-rim">
                轮辋：R{rim}
              </label>
              <input
                id="tire-rim"
                type="range"
                min="15"
                max="21"
                step="1"
                value={rim}
                onChange={(event) => setRim(Number(event.target.value))}
                className="mdx-range h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
              />
            </div>
          </div>

          <div className="rounded-control border border-border bg-bg p-4">
            <label
              className="text-xs font-medium text-secondary"
              htmlFor="tire-pressure"
            >
              胎压：{pressure.toFixed(1)} bar
            </label>
            <input
              id="tire-pressure"
              type="range"
              min="1.6"
              max="3.2"
              step="0.1"
              value={pressure}
              onChange={(event) => setPressure(Number(event.target.value))}
              className="mdx-range mt-2 h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
            />
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              胎压偏低接地面积大但发热和滚阻上升；胎压偏高接地面积小，舒适和抓地都会受影响。
            </p>
            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              className="mt-3 rounded-control border border-accent px-3 py-2 text-xs text-accent"
            >
              {playing ? "暂停胎压动画" : "播放胎压动画"}
            </button>
          </div>

          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">路面与花纹</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {(Object.keys(TIRE_ROADS) as TireRoad[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setRoad(key)}
                  className={`rounded-control border px-2 py-2 text-xs ${road === key ? "border-accent text-accent" : "border-border text-secondary hover:text-primary"}`}
                >
                  {TIRE_ROADS[key].label}
                </button>
              ))}
            </div>
            <div className="mt-3 grid gap-2">
              {(Object.keys(TIRE_PATTERNS) as TirePattern[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPattern(key)}
                  className={`rounded-control border px-3 py-2 text-left text-xs ${pattern === key ? "border-accent text-accent" : "border-border text-secondary hover:text-primary"}`}
                >
                  {TIRE_PATTERNS[key].label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              {roadInfo.summary}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              {patternInfo.summary}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">胎面</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              负责接触地面，花纹影响排水、抓地和噪声。
            </p>
          </div>
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">胎侧</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              影响缓冲和支撑，扁平比越低通常侧向响应越直接。
            </p>
          </div>
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">胎压</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              决定接地印迹形状，也影响滚阻、磨耗、舒适和安全。
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <p className="text-xs font-medium text-accent">规格小测</p>
        <h3 className="mt-1 text-base font-semibold text-primary">
          `225/55 R17` 里的 225 表示什么？
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setAnswer("width")}
            className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
          >
            胎宽
          </button>
          <button
            type="button"
            onClick={() => setAnswer("rim")}
            className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
          >
            轮辋直径
          </button>
        </div>
        {answer && (
          <p
            className={`mt-3 rounded-control border p-3 text-sm leading-relaxed ${answer === "width" ? "border-accent text-primary" : "border-warning text-primary"}`}
          >
            {answer === "width"
              ? "正确。225 表示名义胎宽约 225 mm；55 是扁平比，R17 表示 17 英寸轮辋。"
              : "不对。轮辋直径看 R 后面的数字，R17 才表示 17 英寸轮辋。"}
          </p>
        )}
      </div>
    </section>
  );
}

export function ElectricDriveLab() {
  const [driveType, setDriveType] = useState<ElectricDriveType>("bev");
  const [mode, setMode] = useState<ElectricEnergyMode>("drive");
  const [throttle, setThrottle] = useState(58);
  const [brake, setBrake] = useState(18);
  const [batterySoc, setBatterySoc] = useState(72);
  const [playing, setPlaying] = useState(false);
  const [answer, setAnswer] = useState<"bev" | "hev" | null>(null);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setThrottle((value) => (value >= 92 ? 18 : value + 14));
      setBrake((value) => (value >= 76 ? 8 : value + 10));
    }, 850);
    return () => window.clearInterval(timer);
  }, [playing]);

  const driveInfo = ELECTRIC_DRIVE_TYPES[driveType];
  const modeInfo = ELECTRIC_ENERGY_MODES[mode];
  const motorPower =
    mode === "regen"
      ? -Math.round(brake * 1.1)
      : Math.round((throttle * driveInfo.batteryShare) / 70);
  const regenPower =
    mode === "regen"
      ? Math.round(brake * (driveType === "hev" ? 0.42 : 0.72))
      : 0;
  const fuelUse = Math.round(
    (driveInfo.engineShare * Math.max(0, throttle - 20)) / 100,
  );
  const electricShare = Math.min(
    100,
    Math.max(0, driveInfo.batteryShare + (mode === "regen" ? 8 : 0)),
  );
  const batteryFill = Math.max(
    8,
    Math.min(
      100,
      batterySoc + (mode === "regen" ? 8 : mode === "drive" ? -8 : 12),
    ),
  );
  const flowColor =
    mode === "regen" ? "#22c55e" : mode === "charge" ? "#60a5fa" : "#f97316";
  const showEngine = driveInfo.engineShare > 0;
  const showHydrogen = driveType === "fcev";

  return (
    <section className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border p-4">
        <p className="text-xs font-medium text-accent">电力驱动实验台</p>
        <h2 className="mt-1 text-lg font-semibold text-primary">
          新能源车为什么可以少很多传统传动部件？
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
          电驱系统把能量链改成“电池/燃料电池 → 电控 → 电机 →
          车轮”。电机低速就能输出大扭矩，很多纯电车只需要固定减速器，不再依赖复杂多挡变速器。
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.35fr_0.95fr]">
        <div className="border-b border-border p-4 lg:border-b-0 lg:border-r">
          <svg
            viewBox="0 0 680 450"
            role="img"
            aria-label="电力驱动三电系统和能量流示意"
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="electric-arrow"
                markerHeight="8"
                markerWidth="8"
                orient="auto"
                refX="7"
                refY="4"
              >
                <path d="M0 0 L8 4 L0 8 Z" fill={flowColor} />
              </marker>
            </defs>

            <rect
              x="88"
              y="74"
              width="504"
              height="242"
              rx="32"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="3"
            />
            <path
              d="M146 108 C246 48 434 48 534 108"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <path
              d="M132 288 C248 334 432 334 552 288"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            />

            <rect
              x="132"
              y="160"
              width="116"
              height="72"
              rx="14"
              fill="var(--card)"
              stroke="#60a5fa"
              strokeWidth="4"
            />
            <rect
              x="146"
              y="182"
              width={Math.round(batteryFill * 0.88)}
              height="26"
              rx="6"
              fill="#60a5fa"
            />
            <text
              x="190"
              y="150"
              textAnchor="middle"
              className="fill-primary text-[13px] font-semibold"
            >
              {showHydrogen ? "缓冲电池" : "动力电池"}
            </text>
            <text
              x="190"
              y="258"
              textAnchor="middle"
              className="fill-secondary text-[12px]"
            >
              SOC {batteryFill}%
            </text>

            <rect
              x="282"
              y="164"
              width="104"
              height="64"
              rx="14"
              fill="var(--card)"
              stroke="#a855f7"
              strokeWidth="4"
            />
            <text
              x="334"
              y="190"
              textAnchor="middle"
              className="fill-primary text-[13px] font-semibold"
            >
              电控
            </text>
            <text
              x="334"
              y="210"
              textAnchor="middle"
              className="fill-secondary text-[11px]"
            >
              逆变器 / ECU
            </text>

            <circle
              cx="470"
              cy="196"
              r="42"
              fill="var(--card)"
              stroke="#22c55e"
              strokeWidth="5"
            />
            <text
              x="470"
              y="192"
              textAnchor="middle"
              className="fill-primary text-[13px] font-semibold"
            >
              电机
            </text>
            <text
              x="470"
              y="212"
              textAnchor="middle"
              className="fill-secondary text-[11px]"
            >
              {motorPower} kW
            </text>

            <g transform="translate(548 196)">
              <circle
                cx="0"
                cy="0"
                r="44"
                fill="var(--card)"
                stroke="#64748b"
                strokeWidth="8"
              />
              <circle
                cx="0"
                cy="0"
                r="20"
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="3"
              />
              <text
                x="0"
                y="72"
                textAnchor="middle"
                className="fill-secondary text-[12px]"
              >
                车轮
              </text>
            </g>

            {showEngine && (
              <g>
                <rect
                  x="264"
                  y="76"
                  width="120"
                  height="54"
                  rx="12"
                  fill="var(--card)"
                  stroke="#f97316"
                  strokeWidth="4"
                />
                <text
                  x="324"
                  y="100"
                  textAnchor="middle"
                  className="fill-primary text-[12px] font-semibold"
                >
                  发动机
                </text>
                <text
                  x="324"
                  y="118"
                  textAnchor="middle"
                  className="fill-secondary text-[11px]"
                >
                  燃油 {fuelUse}%
                </text>
                <path
                  d="M324 130 V164"
                  stroke="#f97316"
                  strokeWidth="5"
                  strokeLinecap="round"
                  markerEnd="url(#electric-arrow)"
                />
              </g>
            )}

            {showHydrogen && (
              <g>
                <rect
                  x="106"
                  y="82"
                  width="116"
                  height="52"
                  rx="12"
                  fill="var(--card)"
                  stroke="#06b6d4"
                  strokeWidth="4"
                />
                <text
                  x="164"
                  y="104"
                  textAnchor="middle"
                  className="fill-primary text-[12px] font-semibold"
                >
                  储氢罐
                </text>
                <text
                  x="164"
                  y="122"
                  textAnchor="middle"
                  className="fill-secondary text-[11px]"
                >
                  H₂ + O₂
                </text>
                <path
                  d="M222 108 H282"
                  stroke="#06b6d4"
                  strokeWidth="5"
                  strokeLinecap="round"
                  markerEnd="url(#electric-arrow)"
                />
              </g>
            )}

            <path
              d="M248 196 H282"
              stroke={flowColor}
              strokeWidth="7"
              strokeLinecap="round"
              markerEnd="url(#electric-arrow)"
            />
            <path
              d="M386 196 H428"
              stroke={flowColor}
              strokeWidth="7"
              strokeLinecap="round"
              markerEnd="url(#electric-arrow)"
            />
            <path
              d="M512 196 H542"
              stroke={flowColor}
              strokeWidth="7"
              strokeLinecap="round"
              markerEnd="url(#electric-arrow)"
            />
            {mode === "regen" && (
              <path
                d="M540 234 C420 292 300 286 200 232"
                fill="none"
                stroke="#22c55e"
                strokeWidth="6"
                strokeLinecap="round"
                markerEnd="url(#electric-arrow)"
              />
            )}

            <g transform="translate(96 344)">
              <text className="fill-primary text-[13px] font-semibold">
                电驱占比
              </text>
              <rect
                x="0"
                y="18"
                width="180"
                height="18"
                rx="9"
                fill="var(--border)"
              />
              <rect
                x="0"
                y="18"
                width={Math.round(electricShare * 1.8)}
                height="18"
                rx="9"
                fill="#60a5fa"
              />
              <text x="0" y="62" className="fill-secondary text-[11px]">
                {electricShare}%
              </text>
            </g>
            <g transform="translate(404 344)">
              <text className="fill-primary text-[13px] font-semibold">
                传动复杂度
              </text>
              <rect
                x="0"
                y="18"
                width="180"
                height="18"
                rx="9"
                fill="var(--border)"
              />
              <rect
                x="0"
                y="18"
                width={Math.round(driveInfo.transmissionComplexity * 1.8)}
                height="18"
                rx="9"
                fill="#f97316"
              />
              <text x="0" y="62" className="fill-secondary text-[11px]">
                {driveInfo.transmissionComplexity}%
              </text>
            </g>
          </svg>
        </div>

        <div className="space-y-4 p-4">
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">动力类型</p>
            <div className="mt-3 grid gap-2">
              {(Object.keys(ELECTRIC_DRIVE_TYPES) as ElectricDriveType[]).map(
                (key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setDriveType(key)}
                    className={`rounded-control border px-3 py-2 text-left text-xs ${driveType === key ? "border-accent text-accent" : "border-border text-secondary hover:text-primary"}`}
                  >
                    {ELECTRIC_DRIVE_TYPES[key].label}
                  </button>
                ),
              )}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              {driveInfo.summary}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {driveInfo.nodes.map((node, index) => (
                <span
                  key={`${driveType}-${node}`}
                  className="rounded-control border border-border px-2 py-1 text-xs text-secondary"
                >
                  {index + 1}. {node}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">能量模式</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {(Object.keys(ELECTRIC_ENERGY_MODES) as ElectricEnergyMode[]).map(
                (key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setMode(key)}
                    className={`rounded-control border px-2 py-2 text-xs ${mode === key ? "border-accent text-accent" : "border-border text-secondary hover:text-primary"}`}
                  >
                    {ELECTRIC_ENERGY_MODES[key].label}
                  </button>
                ),
              )}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              {modeInfo.summary}
            </p>
          </div>

          <div className="rounded-control border border-border bg-bg p-4">
            <label
              className="text-xs font-medium text-secondary"
              htmlFor="electric-throttle"
            >
              油门：{throttle}%
            </label>
            <input
              id="electric-throttle"
              type="range"
              min="0"
              max="100"
              step="5"
              value={throttle}
              onChange={(event) => setThrottle(Number(event.target.value))}
              className="mdx-range mt-2 h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
            />
            <label
              className="mt-4 block text-xs font-medium text-secondary"
              htmlFor="electric-brake"
            >
              刹车回收：{brake}%
            </label>
            <input
              id="electric-brake"
              type="range"
              min="0"
              max="100"
              step="5"
              value={brake}
              onChange={(event) => setBrake(Number(event.target.value))}
              className="mdx-range mt-2 h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
            />
            <label
              className="mt-4 block text-xs font-medium text-secondary"
              htmlFor="battery-soc"
            >
              电池电量：{batterySoc}%
            </label>
            <input
              id="battery-soc"
              type="range"
              min="10"
              max="100"
              step="5"
              value={batterySoc}
              onChange={(event) => setBatterySoc(Number(event.target.value))}
              className="mdx-range mt-2 h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
            />
            <p className="mt-3 text-xs text-secondary">
              回收功率约 {regenPower} kW。
            </p>
            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              className="mt-3 rounded-control border border-accent px-3 py-2 text-xs text-accent"
            >
              {playing ? "暂停能量流" : "播放能量流"}
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">三电系统</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              动力电池、电机、电控共同决定电驱车的能量储存、转换和输出。
            </p>
          </div>
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">能量回收</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              减速时电机变成发电机，把一部分动能回收到电池。
            </p>
          </div>
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">固定减速器</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              电机扭矩范围宽，纯电车常用简单减速器替代传统多挡变速器。
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <p className="text-xs font-medium text-accent">动力类型小测</p>
        <h3 className="mt-1 text-base font-semibold text-primary">
          如果一辆车完全没有发动机，主要靠动力电池和电机驱动，它属于哪类？
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setAnswer("bev")}
            className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
          >
            BEV 纯电动
          </button>
          <button
            type="button"
            onClick={() => setAnswer("hev")}
            className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
          >
            HEV 混合动力
          </button>
        </div>
        {answer && (
          <p
            className={`mt-3 rounded-control border p-3 text-sm leading-relaxed ${answer === "bev" ? "border-accent text-primary" : "border-warning text-primary"}`}
          >
            {answer === "bev"
              ? "正确。BEV 纯电动车没有发动机，能量主要来自动力电池，电机通过减速器驱动车轮。"
              : "不对。HEV 仍然有发动机，不能外接充电，电机主要辅助发动机提升效率。"}
          </p>
        )}
      </div>
    </section>
  );
}

export function ManufacturingLab() {
  const [stage, setStage] = useState<ManufacturingStage>("design");
  const [shape, setShape] = useState<BodyShape>("fastback");
  const [lineSpeed, setLineSpeed] = useState(62);
  const [defectRate, setDefectRate] = useState(8);
  const [testLoad, setTestLoad] = useState(70);
  const [playing, setPlaying] = useState(false);
  const [answer, setAnswer] = useState<"welding" | "painting" | null>(null);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setLineSpeed((value) => (value >= 92 ? 38 : value + 9));
      setTestLoad((value) => (value >= 95 ? 45 : value + 8));
    }, 900);
    return () => window.clearInterval(timer);
  }, [playing]);

  const currentStage =
    MANUFACTURING_STAGES.find((item) => item.id === stage) ??
    MANUFACTURING_STAGES[0];
  const shapeInfo = BODY_SHAPES[shape];
  const qualityScore = Math.max(
    42,
    Math.min(99, 100 - defectRate * 4 + Math.round(testLoad / 8)),
  );
  const taktRisk =
    lineSpeed > 78 && defectRate > 10
      ? "节拍过快且缺陷率偏高，需要减速排查。"
      : lineSpeed < 45
        ? "节拍较慢，适合试制和问题确认。"
        : "节拍和质量处在可控区间。";
  const windEnergy = Math.round(shapeInfo.drag * 100 + testLoad / 10);
  const stageIndex = MANUFACTURING_STAGES.findIndex(
    (item) => item.id === stage,
  );

  return (
    <section className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border p-4">
        <p className="text-xs font-medium text-accent">设计制造实验台</p>
        <h2 className="mt-1 text-lg font-semibold text-primary">
          一辆车怎样从目标变成能交付的产品？
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
          汽车制造不是把零件装起来，而是先把需求转成工程指标，再用样车、风洞、产线和质检不断消除风险。设计决定方向，制造决定一致性，测试决定能不能交付。
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.35fr_0.95fr]">
        <div className="border-b border-border p-4 lg:border-b-0 lg:border-r">
          <svg
            viewBox="0 0 720 470"
            role="img"
            aria-label="汽车设计制造流程和风阻测试示意"
            className="h-auto w-full"
          >
            <rect
              x="70"
              y="48"
              width="580"
              height="124"
              rx="24"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="3"
            />
            {MANUFACTURING_STAGES.slice(0, 4).map((item, index) => {
              const x = 100 + index * 138;
              const active = item.id === stage;
              return (
                <g key={item.id}>
                  <rect
                    x={x}
                    y="78"
                    width="96"
                    height="58"
                    rx="12"
                    fill={active ? "var(--accent-soft)" : "var(--card)"}
                    stroke={active ? "var(--accent)" : "var(--border)"}
                    strokeWidth="3"
                  />
                  <text
                    x={x + 48}
                    y="104"
                    textAnchor="middle"
                    className="fill-primary text-[12px] font-semibold"
                  >
                    {item.label}
                  </text>
                  <text
                    x={x + 48}
                    y="122"
                    textAnchor="middle"
                    className="fill-secondary text-[12px]"
                  >
                    {index + 1}
                  </text>
                  {index < 3 && (
                    <path
                      d={`M${x + 96} 107 H${x + 130}`}
                      stroke="var(--border)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  )}
                </g>
              );
            })}

            <rect
              x="70"
              y="238"
              width="580"
              height="132"
              rx="24"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="3"
            />
            {MANUFACTURING_STAGES.slice(4).map((item, index) => {
              const x = 100 + index * 138;
              const active = item.id === stage;
              return (
                <g key={item.id}>
                  <rect
                    x={x}
                    y="268"
                    width="96"
                    height="58"
                    rx="12"
                    fill={active ? "var(--accent-soft)" : "var(--card)"}
                    stroke={active ? "var(--accent)" : "var(--border)"}
                    strokeWidth="3"
                  />
                  <text
                    x={x + 48}
                    y="294"
                    textAnchor="middle"
                    className="fill-primary text-[12px] font-semibold"
                  >
                    {item.label}
                  </text>
                  <text
                    x={x + 48}
                    y="312"
                    textAnchor="middle"
                    className="fill-secondary text-[12px]"
                  >
                    {index + 5}
                  </text>
                  {index < 3 && (
                    <path
                      d={`M${x + 96} 297 H${x + 130}`}
                      stroke="var(--border)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  )}
                </g>
              );
            })}

            <path
              d="M604 136 C666 174 666 220 604 268"
              fill="none"
              stroke="var(--border)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="8 8"
            />
            <text
              x="642"
              y="206"
              textAnchor="middle"
              className="fill-secondary text-[11px]"
            >
              进入产线
            </text>

            <g transform="translate(96 392)">
              <path
                d={shapeInfo.path}
                fill="var(--card)"
                stroke="#60a5fa"
                strokeWidth="4"
                transform="translate(-70 -150) scale(.52)"
              />
              <circle
                cx="16"
                cy="0"
                r="14"
                fill="var(--bg)"
                stroke="#64748b"
                strokeWidth="5"
              />
              <circle
                cx="176"
                cy="0"
                r="14"
                fill="var(--bg)"
                stroke="#64748b"
                strokeWidth="5"
              />
              <path
                d="M230 -18 C268 -44 306 -44 344 -18"
                fill="none"
                stroke="#22c55e"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M232 8 C278 32 312 32 352 8"
                fill="none"
                stroke="#22c55e"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <text x="0" y="52" className="fill-secondary text-[12px]">
                Cd {shapeInfo.drag.toFixed(2)} / 风阻能耗 {windEnergy}
              </text>
            </g>

            <g transform="translate(470 388)">
              <text className="fill-primary text-[13px] font-semibold">
                质量通过率
              </text>
              <rect
                x="0"
                y="18"
                width="170"
                height="18"
                rx="9"
                fill="var(--border)"
              />
              <rect
                x="0"
                y="18"
                width={Math.round(qualityScore * 1.7)}
                height="18"
                rx="9"
                fill="#22c55e"
              />
              <text x="0" y="58" className="fill-secondary text-[11px]">
                {qualityScore}%
              </text>
            </g>

            <text x="70" y="28" className="fill-secondary text-[12px]">
              当前阶段：{stageIndex + 1} / 8
            </text>
          </svg>
        </div>

        <div className="space-y-4 p-4">
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">制造阶段</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {MANUFACTURING_STAGES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStage(item.id)}
                  className={`rounded-control border px-2 py-2 text-left text-xs ${stage === item.id ? "border-accent text-accent" : "border-border text-secondary hover:text-primary"}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              {currentStage.summary}
            </p>
            <p className="mt-2 text-xs text-secondary">
              输出：{currentStage.output}
            </p>
          </div>

          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">车身形状</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {(Object.keys(BODY_SHAPES) as BodyShape[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setShape(key)}
                  className={`rounded-control border px-2 py-2 text-xs ${shape === key ? "border-accent text-accent" : "border-border text-secondary hover:text-primary"}`}
                >
                  {BODY_SHAPES[key].label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              {shapeInfo.summary}
            </p>
          </div>

          <div className="rounded-control border border-border bg-bg p-4">
            <label
              className="text-xs font-medium text-secondary"
              htmlFor="line-speed"
            >
              产线节拍：{lineSpeed}%
            </label>
            <input
              id="line-speed"
              type="range"
              min="25"
              max="100"
              step="5"
              value={lineSpeed}
              onChange={(event) => setLineSpeed(Number(event.target.value))}
              className="mdx-range mt-2 h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
            />
            <label
              className="mt-4 block text-xs font-medium text-secondary"
              htmlFor="defect-rate"
            >
              缺陷率：{defectRate}%
            </label>
            <input
              id="defect-rate"
              type="range"
              min="0"
              max="20"
              step="1"
              value={defectRate}
              onChange={(event) => setDefectRate(Number(event.target.value))}
              className="mdx-range mt-2 h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
            />
            <label
              className="mt-4 block text-xs font-medium text-secondary"
              htmlFor="test-load"
            >
              测试强度：{testLoad}%
            </label>
            <input
              id="test-load"
              type="range"
              min="30"
              max="100"
              step="5"
              value={testLoad}
              onChange={(event) => setTestLoad(Number(event.target.value))}
              className="mdx-range mt-2 h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
            />
            <p className="mt-3 text-xs text-secondary">{taktRisk}</p>
            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              className="mt-3 rounded-control border border-accent px-3 py-2 text-xs text-accent"
            >
              {playing ? "暂停产线" : "播放产线"}
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <div className="grid gap-3 sm:grid-cols-4">
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">设计目标</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              把用户需求翻译成尺寸、成本、安全、能耗和性能指标。
            </p>
          </div>
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">样车验证</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              用测试暴露问题，再回到设计和工程方案修正。
            </p>
          </div>
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">四大工艺</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              冲压、焊装、涂装、总装决定车辆批量制造质量。
            </p>
          </div>
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">质量闭环</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              尺寸、密封、制动、路试和软件检查决定能否下线。
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <p className="text-xs font-medium text-accent">制造流程小测</p>
        <h3 className="mt-1 text-base font-semibold text-primary">
          把大量钣金件定位并连接成白车身，主要属于哪道工艺？
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setAnswer("welding")}
            className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
          >
            焊装
          </button>
          <button
            type="button"
            onClick={() => setAnswer("painting")}
            className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
          >
            涂装
          </button>
        </div>
        {answer && (
          <p
            className={`mt-3 rounded-control border p-3 text-sm leading-relaxed ${answer === "welding" ? "border-accent text-primary" : "border-warning text-primary"}`}
          >
            {answer === "welding"
              ? "正确。焊装把冲压出来的钣金件定位并连接成白车身，是车身结构成形的关键工序。"
              : "不对。涂装主要负责防腐、颜色和外观，白车身结构成形发生在焊装。"}
          </p>
        )}
      </div>
    </section>
  );
}

export function AutoFinalReviewLab() {
  const [path, setPath] = useState<FinalReviewPath>("fuel");
  const [answer, setAnswer] = useState<"transmission" | "body" | null>(null);
  const [challenge, setChallenge] = useState<"brake" | "tire" | "electronics">(
    "tire",
  );

  const current = FINAL_REVIEW_PATHS[path];
  const challengeText =
    challenge === "brake"
      ? "制动力再强，也要通过轮胎和地面交换力。"
      : challenge === "electronics"
        ? "电子系统能感知和干预，但执行效果仍受机械系统和轮胎极限约束。"
        : "轮胎是动力、转向、制动和稳定性的共同出口。";

  return (
    <section className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border p-4">
        <p className="text-xs font-medium text-accent">全书总复习实验台</p>
        <h2 className="mt-1 text-lg font-semibold text-primary">
          用三条链路复盘“汽车为什么会跑”
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
          学完十二章后，不再把汽车看成孤立零件，而是看成能量链、稳定链和制造链共同工作的一套系统。
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.35fr_0.95fr]">
        <div className="border-b border-border p-4 lg:border-b-0 lg:border-r">
          <svg
            viewBox="0 0 760 470"
            role="img"
            aria-label="汽车构造全局知识地图和动力链路总复习"
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="final-review-arrow"
                markerHeight="8"
                markerWidth="8"
                orient="auto"
                refX="7"
                refY="4"
              >
                <path d="M0 0 L8 4 L0 8 Z" fill={current.color} />
              </marker>
            </defs>
            <rect
              x="78"
              y="56"
              width="604"
              height="140"
              rx="28"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="3"
            />
            {current.nodes.map((node, index) => {
              const x = 110 + index * 102;
              return (
                <g key={`${path}-${node}`}>
                  <circle
                    cx={x}
                    cy="126"
                    r="36"
                    fill="var(--card)"
                    stroke={current.color}
                    strokeWidth="4"
                  />
                  <text
                    x={x}
                    y="122"
                    textAnchor="middle"
                    className="fill-primary text-[12px] font-semibold"
                  >
                    {node}
                  </text>
                  <text
                    x={x}
                    y="140"
                    textAnchor="middle"
                    className="fill-secondary text-[12px]"
                  >
                    {index + 1}
                  </text>
                  {index < current.nodes.length - 1 && (
                    <path
                      d={`M${x + 38} 126 H${x + 64}`}
                      stroke={current.color}
                      strokeWidth="5"
                      strokeLinecap="round"
                      markerEnd="url(#final-review-arrow)"
                    />
                  )}
                </g>
              );
            })}

            <g transform="translate(82 248)">
              <rect
                width="176"
                height="112"
                rx="18"
                fill="var(--card)"
                stroke="#f97316"
                strokeWidth={path === "fuel" ? 5 : 2}
              />
              <text
                x="88"
                y="34"
                textAnchor="middle"
                className="fill-primary text-[14px] font-semibold"
              >
                为什么能跑
              </text>
              <text
                x="88"
                y="62"
                textAnchor="middle"
                className="fill-secondary text-[12px]"
              >
                发动机 / 变速器
              </text>
              <text
                x="88"
                y="82"
                textAnchor="middle"
                className="fill-secondary text-[12px]"
              >
                传动 / 轮胎
              </text>
            </g>
            <g transform="translate(292 248)">
              <rect
                width="176"
                height="112"
                rx="18"
                fill="var(--card)"
                stroke="#22c55e"
                strokeWidth={path === "stability" ? 5 : 2}
              />
              <text
                x="88"
                y="34"
                textAnchor="middle"
                className="fill-primary text-[14px] font-semibold"
              >
                为什么能稳停
              </text>
              <text
                x="88"
                y="62"
                textAnchor="middle"
                className="fill-secondary text-[12px]"
              >
                车身 / 悬架 / 转向
              </text>
              <text
                x="88"
                y="82"
                textAnchor="middle"
                className="fill-secondary text-[12px]"
              >
                制动 / 电子安全
              </text>
            </g>
            <g transform="translate(502 248)">
              <rect
                width="176"
                height="112"
                rx="18"
                fill="var(--card)"
                stroke="#60a5fa"
                strokeWidth={path === "electric" ? 5 : 2}
              />
              <text
                x="88"
                y="34"
                textAnchor="middle"
                className="fill-primary text-[14px] font-semibold"
              >
                新能源差异
              </text>
              <text
                x="88"
                y="62"
                textAnchor="middle"
                className="fill-secondary text-[12px]"
              >
                电池 / 电控 / 电机
              </text>
              <text
                x="88"
                y="82"
                textAnchor="middle"
                className="fill-secondary text-[12px]"
              >
                回收 / 补能 / 制造
              </text>
            </g>

            <path
              d="M170 360 C250 420 508 420 590 360"
              fill="none"
              stroke="var(--border)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="8 8"
            />
            <text
              x="380"
              y="430"
              textAnchor="middle"
              className="fill-secondary text-[12px]"
            >
              所有系统最终都要回到车轮和路面
            </text>
          </svg>
        </div>

        <div className="space-y-4 p-4">
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">复盘链路</p>
            <div className="mt-3 grid gap-2">
              {(Object.keys(FINAL_REVIEW_PATHS) as FinalReviewPath[]).map(
                (key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setPath(key)}
                    className={`rounded-control border px-3 py-2 text-left text-xs ${path === key ? "border-accent text-accent" : "border-border text-secondary hover:text-primary"}`}
                  >
                    {FINAL_REVIEW_PATHS[key].label}
                  </button>
                ),
              )}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              {current.summary}
            </p>
          </div>

          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">高频错误认知索引</p>
            <div className="mt-3 grid gap-2">
              {(["tire", "brake", "electronics"] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setChallenge(key)}
                  className={`rounded-control border px-3 py-2 text-left text-xs ${challenge === key ? "border-accent text-accent" : "border-border text-secondary hover:text-primary"}`}
                >
                  {key === "tire"
                    ? "只看发动机，不看轮胎"
                    : key === "brake"
                      ? "只看刹车，不看抓地"
                      : "只看电子，不看执行"}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              {challengeText}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <div className="grid gap-3 sm:grid-cols-4">
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">燃油主线</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              发动机、变速器、传动、差速器和轮胎共同解释“为什么能跑”。
            </p>
          </div>
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">底盘主线</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              车身、悬架、转向、制动让车能稳、能转、能停。
            </p>
          </div>
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">电子主线</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              传感器、控制器和执行器让机械系统获得感知和干预能力。
            </p>
          </div>
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-sm font-medium text-primary">新能源主线</p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              电池、电控、电机和回收改变了能量来源和传动复杂度。
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <p className="text-xs font-medium text-accent">综合小测</p>
        <h3 className="mt-1 text-base font-semibold text-primary">
          发动机输出的扭矩要先经过哪个系统改变转速和扭矩，再继续传到车轮？
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setAnswer("transmission")}
            className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
          >
            变速器
          </button>
          <button
            type="button"
            onClick={() => setAnswer("body")}
            className="rounded-control border border-border px-3 py-2 text-xs text-secondary"
          >
            车身覆盖件
          </button>
        </div>
        {answer && (
          <p
            className={`mt-3 rounded-control border p-3 text-sm leading-relaxed ${answer === "transmission" ? "border-accent text-primary" : "border-warning text-primary"}`}
          >
            {answer === "transmission"
              ? "正确。变速器负责改变发动机输出的转速和扭矩，再由传动系统送到车轮。"
              : "不对。车身负责空间、安全和空气动力，动力链上的转速/扭矩转换主要发生在变速器。"}
          </p>
        )}
      </div>
    </section>
  );
}
