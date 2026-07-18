#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK_DIR = path.join(ROOT, "content/auto-why-car-runs");
const MANIFEST = JSON.parse(
  fs.readFileSync(path.join(ROOT, "quality/fidelity-manifests.json"), "utf8"),
).books["auto-why-car-runs"];

const CONFIG = {
  "learning-map": { component: "AutoBookLearningMap", practiceMode: "design" },
  "whole-car-system": {
    component: "WholeCarSystemsLab",
    practiceMode: "diagnosis",
  },
  "body-structure": { component: "BodyStructureLab", practiceMode: "design" },
  "engine-principles": {
    component: "EnginePrinciplesLab",
    practiceMode: "simulation",
  },
  "transmission-principles": {
    component: "TransmissionLab",
    practiceMode: "simulation",
  },
  "drivetrain-system": {
    component: "DrivetrainLab",
    practiceMode: "diagnosis",
  },
  "suspension-system": {
    component: "SuspensionLab",
    practiceMode: "simulation",
  },
  "steering-system": { component: "SteeringLab", practiceMode: "simulation" },
  "brake-system": { component: "BrakeLab", practiceMode: "diagnosis" },
  "electronics-system": {
    component: "ElectronicsLab",
    practiceMode: "diagnosis",
  },
  "tire-wheel-system": { component: "TireLab", practiceMode: "diagnosis" },
  "electric-drive-system": {
    component: "ElectricDriveLab",
    practiceMode: "simulation",
  },
  "design-manufacturing": {
    component: "ManufacturingLab",
    practiceMode: "design",
  },
  "final-review": {
    component: "AutoFinalReviewLab",
    practiceMode: "diagnosis",
  },
};

const FACT_SOURCES = {
  "learning-map": [
    [
      "美国能源部：内燃机基础",
      "https://www.energy.gov/cmei/vehicles/articles/internal-combustion-engine-basics",
    ],
    [
      "Bosch：整车运动域协同",
      "https://www.bosch-mobility.com/en/solutions/software-and-services/vehicle-motion-management/",
    ],
    [
      "美国能源部 AFDC：混合动力构造",
      "https://afdc.energy.gov/vehicles/how-do-hybrid-electric-cars-work",
    ],
  ],
  "whole-car-system": [
    [
      "美国能源部：内燃机与动力链",
      "https://www.energy.gov/cmei/vehicles/articles/internal-combustion-engine-basics",
    ],
    [
      "Bosch：制动、转向、动力与悬架协同",
      "https://www.bosch-mobility.com/en/solutions/software-and-services/vehicle-motion-management/",
    ],
  ],
  "body-structure": [
    [
      "美国能源部：汽车轻量化材料",
      "https://www.energy.gov/eere/vehicles/lightweight-and-propulsion-materials",
    ],
    [
      "NHTSA：碰撞安全与乘员保护",
      "https://www.nhtsa.gov/research-data/crashworthiness",
    ],
  ],
  "engine-principles": [
    [
      "美国能源部：内燃机四冲程与点燃方式",
      "https://www.energy.gov/cmei/vehicles/articles/internal-combustion-engine-basics",
    ],
  ],
  "transmission-principles": [
    [
      "美国能源部：内燃机到车轮的动力链",
      "https://www.energy.gov/cmei/vehicles/articles/internal-combustion-engine-basics",
    ],
    [
      "美国能源部 AFDC：混动系统与传动",
      "https://afdc.energy.gov/vehicles/how-do-hybrid-electric-cars-work",
    ],
  ],
  "drivetrain-system": [
    [
      "Bosch：整车运动域协同",
      "https://www.bosch-mobility.com/en/solutions/software-and-services/vehicle-motion-management/",
    ],
    [
      "美国能源部：动力链基础",
      "https://www.energy.gov/cmei/vehicles/articles/internal-combustion-engine-basics",
    ],
  ],
  "suspension-system": [
    [
      "Bosch：悬架与整车运动管理",
      "https://www.bosch-mobility.com/en/solutions/software-and-services/vehicle-motion-management/",
    ],
    [
      "NHTSA：车辆试验程序",
      "https://www.nhtsa.gov/vehicle-manufacturers/test-procedures",
    ],
  ],
  "steering-system": [
    [
      "Bosch：转向与整车运动管理",
      "https://www.bosch-mobility.com/en/solutions/software-and-services/vehicle-motion-management/",
    ],
    [
      "NHTSA：车辆试验程序",
      "https://www.nhtsa.gov/vehicle-manufacturers/test-procedures",
    ],
  ],
  "brake-system": [
    [
      "Bosch：线控制动工作原理",
      "https://www.bosch-mobility.com/en/solutions/driving-safety/brake-by-wire/",
    ],
    [
      "NHTSA：轻型车制动试验程序",
      "https://www.nhtsa.gov/vehicle-manufacturers/test-procedures",
    ],
  ],
  "electronics-system": [
    [
      "NHTSA：驾驶辅助技术",
      "https://www.nhtsa.gov/vehicle-safety/driver-assistance-technologies",
    ],
    [
      "Bosch：跨域执行器协同",
      "https://www.bosch-mobility.com/en/solutions/software-and-services/vehicle-motion-management/",
    ],
  ],
  "tire-wheel-system": [
    [
      "NHTSA：轮胎、胎压、抓地与温度安全",
      "https://www.nhtsa.gov/vehicle-safety/tires",
    ],
    [
      "NHTSA：轮胎与轮辋试验程序",
      "https://www.nhtsa.gov/vehicle-manufacturers/test-procedures",
    ],
  ],
  "electric-drive-system": [
    [
      "美国能源部 AFDC：混合动力汽车",
      "https://afdc.energy.gov/vehicles/how-do-hybrid-electric-cars-work",
    ],
    [
      "美国能源部 AFDC：纯电动汽车",
      "https://afdc.energy.gov/vehicles/how-do-all-electric-cars-work",
    ],
  ],
  "design-manufacturing": [
    [
      "Toyota：整车总装工艺沿革",
      "https://www.toyota-global.com/company/history_of_toyota/75years/data/automotive_business/production/production_engineering/vehicles/assembly/index.html",
    ],
    [
      "NHTSA：车辆研究与试验程序",
      "https://www.nhtsa.gov/vehicle-manufacturers/test-procedures",
    ],
  ],
  "final-review": [
    [
      "美国能源部：内燃机基础",
      "https://www.energy.gov/cmei/vehicles/articles/internal-combustion-engine-basics",
    ],
    [
      "NHTSA：驾驶辅助技术",
      "https://www.nhtsa.gov/vehicle-safety/driver-assistance-technologies",
    ],
    [
      "美国能源部 AFDC：混合动力构造",
      "https://afdc.energy.gov/vehicles/how-do-hybrid-electric-cars-work",
    ],
  ],
};

const UNIT_EXPLANATIONS = {
  "1.1 整车构造组成":
    "整车由车身、动力、传动、底盘、电气电子、安全与轮胎等系统协同工作；任何一个模块都要沿能量、力或信号链说明输入、职责与输出，不能把汽车简化成发动机加四个轮子。",
  "1.2 整车布局形式":
    "发动机或电机的位置、变速机构的位置和驱动轮共同决定前驱、后驱与四驱布局；布局会改变动力路径、空间利用、质量分布与抓地能力，没有一种方案在所有场景都占优。",
  "2.1 车身规格":
    "轴距、轮距、前后悬和车身长宽高共同描述车辆几何边界；这些尺寸会影响乘员空间、转弯与通过性，也会约束碰撞结构、悬架布置和空气动力设计。",
  "2.2 车身构造":
    "承载式车身把乘员舱、纵梁、门槛梁与覆盖件组合成受力整体；非承载式结构则由独立车架承担主要载荷，两者在重量、刚度、舒适性和改装能力上取舍不同。",
  "2.3 车身材料":
    "高强钢、铝合金与复合材料的密度、强度、延展性、连接工艺和维修成本不同；选材不是越轻越好，而要同时满足碰撞吸能、刚度、量产和全生命周期成本。",
  "3.1 发动机基本原理":
    "内燃机把混合气燃烧产生的压力作用在活塞上，再由连杆和曲轴把往复运动变成旋转扭矩；燃烧只发生在循环的一部分，持续输出依赖多个气缸错峰工作。",
  "3.2 气缸排列形式":
    "直列、V 型和水平对置改变气缸在曲轴两侧的布置，由此影响发动机长度、宽度、高度、振动平衡和制造复杂度；排列形式本身不能直接等同于性能高低。",
  "3.3 发动机工作过程":
    "发动机工作过程包括进气、压缩、点火做功和排气，活塞方向、气门开闭与曲轴角度必须同步；只背四个名称而不看部件状态，就无法判断当前冲程。",
  "3.4 发动机燃烧原理":
    "汽油机通常由火花塞点燃均匀混合气，火焰前锋在气缸内传播；空燃比、压缩、点火时刻和温度会共同影响效率、爆震、排放与部件热负荷。",
  "3.5 发动机工作循环":
    "四冲程发动机需要曲轴转两圈完成一个气缸的完整循环，只有做功冲程向曲轴提供净能量；飞轮和多缸相位把离散做功脉冲平滑成较连续的输出。",
  "3.6 进气和排气系统":
    "空气经过滤清器、节气门和进气歧管进入气缸，废气经排气歧管和后处理系统排出；流动阻力、脉动与温度决定充气效率，路径并非越粗越短就一定更好。",
  "3.7 气门和气门正时":
    "凸轮机构控制进排气门在曲轴角度上的开启、升程与关闭；实际气门会提前开启或延后关闭以利用气流惯性，因此开闭时刻并不严格等于活塞到达上下止点。",
  "3.8 可变气门技术":
    "可变正时或可变升程会随转速和负荷调整气门事件，让低速扭矩、怠速稳定、高速充气与排放之间取得更宽范围的折中，而不是简单地让气门始终开得更大。",
  "3.9 可变气缸":
    "低负荷时停用部分气缸，可减少泵气和摩擦损失；控制系统必须同时处理气门、喷油、点火、振动和重新接合过程，否则节油收益会被舒适性与瞬态问题抵消。",
  "3.10 涡轮增压器":
    "涡轮利用排气焓驱动同轴压气机提高进气密度，废气旁通阀和中冷器分别约束增压压力与进气温度；它能回收部分排气能量，但会带来热管理和响应迟滞。",
  "3.11 机械增压器":
    "机械增压器由曲轴直接驱动压气机，低转速响应直接但需要消耗发动机轴功；它与涡轮增压的关键差异是能量来源，不应只用峰值增压压力比较。",
  "3.12 燃油供给系统":
    "燃油泵、油轨、喷油器和控制器按工况计量并雾化燃油；进气道喷射与缸内直喷在混合气形成、压力、颗粒物和冷启动控制方面具有不同边界。",
  "3.13 点火起动系统":
    "起动机先带动曲轴达到可燃转速，点火线圈再把低压电转换成火花塞所需高压；点火提前角必须随转速、负荷和爆震反馈调整，过早或过晚都会损失效率。",
  "3.14 发动机整体构造":
    "缸体、缸盖、油底壳、配气机构和附件形成发动机总成；结构既要密封燃烧压力，也要提供冷却、润滑、支承和装配基准，不能只关注气缸内部。",
  "3.15 发动机主运动部件":
    "活塞、活塞销、连杆和曲轴承受周期性气体力与惯性力，轴瓦和配重用于支承与平衡；转速升高会显著放大惯性载荷，因此轻量化也受强度与寿命限制。",
  "3.16 冷却系统":
    "水泵推动冷却液在缸体、缸盖、散热器和暖风回路循环，节温器按温度分配流量；目标是稳定在合适工作温度，而不是把发动机冷却得越低越好。",
  "3.17 润滑系统":
    "机油泵把机油送往轴承、凸轮与活塞等摩擦副，油膜分隔表面并带走热量和杂质；压力、黏度、温度与油道清洁度共同决定润滑是否可靠。",
  "3.18 柴油发动机":
    "柴油机先压缩空气升温，再在接近上止点时喷入燃油自燃，通常使用更高压缩比和高压喷射；其扭矩、效率和排放控制特性不能直接套用汽油机点火模型。",
  "3.19 转子发动机":
    "转子发动机用三角转子在特殊形状壳体内形成变化容积，省去活塞连杆机构；结构紧凑且运转平顺，但密封、油耗、排放和燃烧室形状带来独特挑战。",
  "4.1 变速原理":
    "齿轮传动用不同传动比交换转速与扭矩：忽略损失时功率近似守恒，减速会提高输出扭矩；变速器不能凭空增加功率，它让发动机工作区与车轮需求匹配。",
  "4.2 手动变速器":
    "驾驶者通过离合器切断动力，再用换挡机构选择不同齿轮副；正确换挡需要输入轴与目标齿轮转速接近，否则同步器负担和冲击都会增加。",
  "4.3 同步器":
    "同步器利用摩擦锥先消除齿轮与轴套的转速差，再允许结合齿啮合；它解决的是接合前的转速匹配，而不是承担持续传递全部扭矩的主齿轮副。",
  "4.4 自动变速器（AT）":
    "液力自动变速器以液力变矩器起步，并通过行星齿轮组与多片离合器组合出多个挡位；控制器协调油压、锁止和换挡重叠以兼顾平顺与效率。",
  "4.5 液力变矩器":
    "泵轮、涡轮和导轮借助油液循环传递扭矩，起步时可产生扭矩放大并允许转速差；巡航时锁止离合器减少滑差损失，所以它并非始终依靠液体打滑。",
  "4.6 行星齿轮变速系统":
    "太阳轮、行星架和齿圈三者固定、输入或输出角色的不同组合会产生减速、直接挡和倒挡；理解各构件状态比死记某套变速器的挡位表更可靠。",
  "4.7 无级变速器（CVT）":
    "带轮式 CVT 通过改变主从动锥盘有效半径连续改变传动比，使发动机更容易停留在高效转速；夹紧力、钢带承载、响应感受和效率限制其适用范围。",
  "4.8 双离合变速器（DCT）":
    "两套离合器分别管理奇数挡和偶数挡，下一挡可提前啮合，再通过两套离合器交接扭矩；换挡快不等于所有低速工况都平顺，热管理也很关键。",
  "4.9 序列式变速器（SMG）":
    "序列式机构按相邻挡位顺序切换，换挡执行器可由驾驶者或控制器触发；它强调快速、确定的换挡路径，与传统 H 型手动排挡的自由选挡不同。",
  "4.10 自动离合变速器（AMT）":
    "AMT 在手动齿轮箱基础上增加离合与选换挡执行器，结构效率高但动力中断明显；控制器需要通过发动机降扭和离合器结合速度改善冲击。",
  "4.11 变速器档位数":
    "更多挡位能缩小相邻传动比落差并扩大总速比范围，但也增加齿轮、离合器、控制与换挡机会；合理挡位数取决于动力特性、车辆用途和成本。",
  "5.1 传动形式":
    "横置前驱、纵置后驱和四驱会采用不同的变速器、传动轴、差速器与半轴路径；分析时应从动力源沿每个旋转部件追到驱动轮，而不是只看车型标签。",
  "5.2 离合器":
    "摩擦离合器通过压紧或分离摩擦片接通、调节或切断动力，起步时允许受控滑磨；长期半联动会把机械功转成热量，因此结合平顺与热负荷必须同时考虑。",
  "5.3 传动轴和半轴":
    "传动轴负责跨越较长车身距离传递扭矩，半轴把差速器输出送到左右车轮；万向节或等速节允许悬架和转向运动时仍保持传动。",
  "5.4 差速器":
    "开放式差速器允许左右车轮转速不同并近似分配相同扭矩，使车辆转弯不拖胎；当一侧附着很低时，可用扭矩也会被低附着侧限制。",
  "5.5 差速限制器":
    "限滑差速器用摩擦、黏性或齿轮机构限制左右轮过大转速差，把更多可用扭矩送到有附着的一侧；限制程度过强也会影响转向灵活性。",
  "5.6 差速器锁":
    "差速锁把两侧输出强制连接，越野低附着时能避免单轮空转，但铺装路转弯时会造成轮胎拖滑和传动应力，因此必须明确接合条件。",
  "5.7 四轮驱动":
    "四驱把动力分配给前后轴，可改善低附着起步和通过性，但制动仍受轮胎总附着限制；额外的传动部件也带来质量、损耗与控制复杂度。",
  "5.8 中央差速器":
    "全时四驱的中央差速器允许前后轴在转弯时存在平均转速差，并可通过限滑或锁止改变扭矩分配；没有差速能力的刚性连接不适合持续用于高附着路面。",
  "5.9 电控多片离合器":
    "电控多片离合器通过改变压紧力连续调节可传扭矩，常用于按需连接另一车轴；它需要根据轮速、油门、转角和温度控制，过热时必须降级保护。",
  "5.10 HALDEX（翰德）四驱系统":
    "这类按需四驱以电液控制多片离合器连接前后轴，能在检测或预测打滑时提高后轴参与度；代际与标定不同，不能简单概括为固定前后比例。",
  "5.11 取力器":
    "取力器从变速器或分动器引出旋转动力供液压泵、发电机等上装设备使用；设计要限定接合转速、可用扭矩和车辆行驶状态，避免超载。",
  "5.12 分动器":
    "分动器把变速器输出分给前后传动轴，越野车型还可能提供低速挡；低速挡通过额外减速提高轮端扭矩，但车辆速度和允许接合条件受限。",
  "5.13 液力耦合器":
    "液力耦合器只有泵轮和涡轮，利用油液动量柔性传递动力并允许滑差；它不能像带导轮的变矩器那样明显放大扭矩，滑差也会产生热损失。",
  "5.14 运动型差速器":
    "主动或运动型差速器可用离合器把更多驱动扭矩分配到外侧车轮，产生辅助横摆力矩；效果依赖附着和控制边界，不能突破轮胎总抓地极限。",
  "5.15 四驱系统图解":
    "绘制四驱系统时要标出动力源、变速器、中央耦合装置、前后差速器和四根半轴，并用不同状态展示正常、打滑、锁止与过热降级的动力路径。",
  "6.1 悬架的作用和构造":
    "悬架用弹簧支承车身、减振器耗散振动，连杆约束车轮运动轨迹；它要同时维持轮胎接地、隔离路面冲击并承受制动和转弯载荷。",
  "6.2 悬架形式":
    "麦弗逊、双叉臂和多连杆用不同数量与方向的构件控制车轮自由度；结构复杂度、占用空间、定位精度和成本不同，名称本身不能代表绝对操控水平。",
  "6.3 悬架性能":
    "弹簧刚度、阻尼、簧下质量和几何定位共同决定舒适与抓地；过软会让车身运动过大，过硬又可能让轮胎跳离路面，调校目标是动态折中。",
  "7.1 转向形式":
    "转向盘输入经转向柱和齿轮机构变成车轮转角，内外轮需满足不同转弯半径；阿克曼关系用于减少低速转弯拖滑，实际车辆还会结合悬架与轮胎特性修正。",
  "7.2 转向助力":
    "液压助力由泵建立压力，电动助力由电机按传感器和控制策略提供辅助扭矩；助力减少驾驶者负担，但机械连接、故障降级和路感仍需保证。",
  "7.3 四轮转向":
    "低速时后轮与前轮反向可缩小转弯半径，高速时同向可降低车身横摆响应；后轮转角较小且必须与车速、稳定控制和故障状态协调。",
  "8.1 制动系统形式":
    "驾驶者或控制器建立液压，卡钳或轮缸把压力转成摩擦力矩；前后轮制动力分配必须随载荷转移和附着变化调整，车轮抱死并不代表制动力最大。",
  "8.2 驻车制动":
    "驻车制动通过机械拉索或电机保持车轮制动力，目标是在无持续脚踏和液压供能时固定车辆；电子驻车还要处理坡道、释放和故障应急逻辑。",
  "8.3 陶瓷复合制动盘":
    "碳陶复合制动盘耐高温、质量低且抗热衰退，但低温摩擦、噪声、冲击敏感和成本与普通铸铁盘不同，适合场景不能只按最高温度判断。",
  "8.4 制动助力器":
    "真空或电控制动助力器放大驾驶者输入，主缸再建立液压；助力失效时基础机械液压链通常仍能制动，但踏板力和制动距离会显著变化。",
  "9.1 灯光照明":
    "近光、远光、位置灯、转向灯和制动灯分别承担照路与通信功能，控制器还可能执行自动调平和自适应配光；亮度提升必须服从眩光与法规边界。",
  "9.2 仪表":
    "仪表把车速、能量、故障和驾驶辅助状态转成驾驶者能及时理解的信息；数据来源可能跨多个控制器，显示设计必须区分正常提示、警告和立即处置。",
  "9.3 空调":
    "压缩机、冷凝器、膨胀装置和蒸发器搬运热量，风门与鼓风机分配空气；燃油车可利用发动机余热，电动车制热则会直接影响续航。",
  "9.4 驾驶辅助系统":
    "摄像头、雷达和超声波等传感器感知环境，控制器估计目标并给出提示或有限控制；系统有天气、遮挡和工作域边界，驾驶者仍需理解接管责任。",
  "9.5 主动安全系统":
    "ABS、牵引力控制和车身稳定控制通过轮速、转角与横摆等信号识别失稳趋势，再调节制动或动力；它们利用现有附着，不能创造超出轮胎极限的抓地。",
  "9.6 被动安全系统":
    "安全带、气囊、吸能结构和乘员舱在碰撞发生后管理人体减速度与侵入；各装置按碰撞方向和乘员状态协同，单看气囊数量不能代表整体安全。",
  "10.1 轮胎造型":
    "胎面花纹的沟槽、块状和方向性设计用于排水、咬合与控制形变；花纹需要在干地接触、湿地排水、噪声、滚阻和磨耗之间折中。",
  "10.2 轮胎构造":
    "胎面、带束层、胎体帘布、胎侧和胎圈共同承受载荷并密封气压；轮胎不是实心橡胶块，内部结构和气压共同决定形变与承载。",
  "10.3 轮胎性能":
    "附着、滚阻、耐磨、舒适和温度性能会随配方、气压、载荷与路面改变；低气压会增加形变和发热，高气压也可能缩小有效接地与降低舒适。",
  "11.1 混合动力":
    "混合动力系统让发动机与电机按工况分担驱动，并通过制动回收部分动能；串联、并联和混联的能量路径不同，节能来自让动力源更常处于高效区。",
  "11.2 插电式混合动力":
    "插电混动具有更大电池和外接充电能力，可在一定里程内主要用电；实际能耗取决于充电频率、行程长度、温度和馈电后的混动效率。",
  "11.3 纯电动汽车":
    "动力电池经逆变器向电机供电，减速器把电机转速转换为轮端扭矩；续航、快充、热管理和低温性能由电芯、控制、空气阻力与使用条件共同决定。",
  "11.4 燃料电池汽车":
    "燃料电池把氢与氧的化学能直接转成电能，再由电机驱动车轮，动力电池用于缓冲瞬态功率和回收能量；储氢、补能和系统成本是关键边界。",
  "12.1 设计流程":
    "整车设计从用户与法规目标出发，逐级分解到总布置、系统和零部件，并通过仿真、样件和评审闭环；后期修改成本高，因此接口和验证条件要尽早冻结。",
  "12.2 样车测试":
    "样车测试覆盖耐久、碰撞、操稳、制动、环境、电磁兼容和软件功能等场景；单次成功不能代表量产可靠，需要边界、故障和重复样本共同验证。",
  "12.3 空气动力学设计":
    "车头、底盘、车顶和车尾共同决定气流分离、阻力、升力与冷却流量；降低阻力有利于高速能耗，但也要兼顾稳定、散热、空间和造型。",
  "12.4 制造流程":
    "冲压形成覆盖件与结构件，焊装构成白车身，涂装负责防腐与外观，总装连接动力、底盘和内饰；尺寸、扭矩、密封与软件配置都要在线检测。",
};

const EXERCISES = {
  "learning-map": [
    [
      "为什么学习汽车时要先画三条链路，而不是先背零件名？",
      "链路能说明能量、力和信号怎样跨系统传递；零件名只有放进输入—状态—输出关系后，才能用于预测和排错。",
    ],
    [
      "把燃油车动力链改画成纯电动车，至少替换哪三个节点？",
      "把燃油与发动机替换为动力电池、逆变器和电机；变速器通常简化为减速器，车轮和路面作用仍保留。",
    ],
    [
      "制动和转向为什么同时依赖轮胎？",
      "执行机构最终都要通过轮胎—路面接触区产生纵向或横向力，轮胎附着不足时控制系统只能管理极限，不能创造抓地。",
    ],
  ],
  "whole-car-system": [
    [
      "发动机输出到车轮之前至少经过哪些环节？",
      "通常经过离合或液力元件、变速机构、差速器与半轴，最终由驱动轮把力传给路面。",
    ],
    [
      "前驱与后驱最直接的动力路径差异是什么？",
      "前驱把变速与差速机构集中在前部并驱动前轮；后驱通常还需纵向传动轴把动力送到后桥。",
    ],
    [
      "四驱为什么不能保证车辆永不打滑？",
      "四驱改善驱动扭矩分配，但轮胎总附着仍受路面、载荷和轮胎状态限制，制动与转弯同样不能突破这个极限。",
    ],
  ],
  "body-structure": [
    [
      "承载式与非承载式车身的主要受力路径有什么不同？",
      "承载式由车身结构整体承载；非承载式主要由独立车架承载，车身安装在车架上。",
    ],
    [
      "为什么车身轻量化不能只把钢换成铝？",
      "材料强度、连接、碰撞吸能、刚度、维修与成本都要重新设计，等体积替换并不自动得到同等结构性能。",
    ],
    [
      "轴距变长通常同时带来什么收益与代价？",
      "通常有利于乘员空间和直线稳定，但会增大转弯空间，并改变结构质量与总布置约束。",
    ],
  ],
  "engine-principles": [
    [
      "切到压缩冲程时，活塞、进排气门和火花塞应处于什么状态？",
      "活塞向上，进排气门基本关闭；汽油机火花通常在压缩末期、接近上止点前后触发。",
    ],
    [
      "涡轮增压与机械增压的能量来源有何不同？",
      "涡轮主要利用排气能量，机械增压器由曲轴直接驱动，因此响应与轴功消耗特性不同。",
    ],
    [
      "冷却系统为什么不能追求温度越低越好？",
      "发动机需要稳定在设计工作温度；过冷会增加摩擦、燃烧不完全和排放，节温器用于在升温和散热间调节。",
    ],
  ],
  "transmission-principles": [
    [
      "在忽略损失时，减速挡为什么能提高轮端扭矩却不能增加功率？",
      "传动比用转速换扭矩，输入输出功率近似守恒；真实系统还会因摩擦和液力滑差损失一部分功率。",
    ],
    [
      "同步器在手动换挡时先解决什么问题？",
      "先用摩擦让待接合齿轮与轴套转速接近，再让结合齿进入，避免直接撞齿。",
    ],
    [
      "DCT 低速拥堵为什么可能比高速换挡更难标定？",
      "低速需要离合器持续调节滑磨来模拟蠕行，热量、冲击和响应之间更难兼顾。",
    ],
  ],
  "drivetrain-system": [
    [
      "开放式差速器一侧车轮打滑时为什么会受限？",
      "两侧可传扭矩近似相同，低附着侧能承受的扭矩很小，会限制另一侧得到的扭矩。",
    ],
    [
      "差速锁为什么不应长期用于高附着铺装路？",
      "锁止后左右轮不能自由形成转速差，转弯会造成轮胎拖滑和传动系统扭转应力。",
    ],
    [
      "按需四驱过热时应怎样降级？",
      "降低或断开多片离合器可传扭矩，优先保护摩擦片与油液，并向驾驶者提示驱动能力下降。",
    ],
  ],
  "suspension-system": [
    [
      "把弹簧刚度调大后，车身与车轮可能分别发生什么变化？",
      "车身侧倾和俯仰可能减小，但冲击传递增大，崎岖路上车轮也可能更难持续贴地。",
    ],
    [
      "减振器和弹簧的职责为什么不能互换？",
      "弹簧储存并释放位移能量、支承载荷；减振器把振动能转成热量，控制振荡衰减。",
    ],
    [
      "簧下质量增大为什么不利于贴地？",
      "车轮总成惯性增大后更难跟随快速路面起伏，接地载荷波动会增加。",
    ],
  ],
  "steering-system": [
    [
      "低速转弯时内外前轮为什么需要不同转角？",
      "内轮路径半径更小，需要更大的转角；若转角相同会产生轮胎拖滑。",
    ],
    [
      "电动助力转向失效时最重要的降级目标是什么？",
      "保留基础机械转向路径并给出故障提示，即使转向力明显增大也不能失去方向控制。",
    ],
    [
      "四轮转向为什么低速反相、高速同相？",
      "低速反相缩小转弯半径；高速同相减小横摆突变，提高变道稳定性。",
    ],
  ],
  "brake-system": [
    [
      "湿滑路上用更大踏板力就一定能获得更短制动距离吗？",
      "不一定；超过轮胎附着会抱死，ABS 通过调压维持可控滑移，但仍受路面附着上限限制。",
    ],
    [
      "制动热衰退为什么会让踏板感觉或减速度改变？",
      "摩擦材料和制动液温度升高会降低摩擦或产生气化，导致同样输入下制动力下降。",
    ],
    [
      "助力失效是否等于完全没有制动？",
      "通常基础液压链仍存在，但驾驶者需要更大的踏板力，制动距离和操控余量会明显恶化。",
    ],
  ],
  "electronics-system": [
    [
      "摄像头被遮挡时驾驶辅助系统应怎样处理？",
      "识别感知质量下降，限制或退出相关功能并明确提示驾驶者接管，不能继续输出看似正常的控制。",
    ],
    [
      "主动安全系统为什么不能突破轮胎极限？",
      "它只能重新分配制动力或动力，所有车辆力仍通过轮胎接触区产生。",
    ],
    [
      "被动安全为何必须把安全带、气囊和车身结构一起看？",
      "三者共同管理乘员运动、约束时序与碰撞减速度，单个装置无法覆盖全部碰撞方向和状态。",
    ],
  ],
  "tire-wheel-system": [
    [
      "轮胎气压过低最先带来哪些风险？",
      "胎侧形变和发热增加，滚阻、操稳和结构损伤风险上升，长期可能导致异常磨损或失效。",
    ],
    [
      "冬季胎在干热路面为什么未必更好？",
      "低温配方和花纹为冰雪优化，高温下可能更软、磨耗更快，转向响应与制动表现也会改变。",
    ],
    [
      "四驱车型为什么仍需四条状态匹配的轮胎？",
      "轮胎周长和附着差异会持续触发差速与耦合装置工作，并影响稳定控制判断。",
    ],
  ],
  "electric-drive-system": [
    [
      "纯电动车减速时能量如何回到电池？",
      "车轮反拖电机发电，逆变器把电能送回电池；回收强度受电池温度、荷电状态和附着限制。",
    ],
    [
      "插电混动长期不充电会发生什么？",
      "车辆会更多依赖发动机与馈电混动模式，外接电能带来的低油耗优势显著下降。",
    ],
    [
      "燃料电池车为什么仍常配动力电池？",
      "电池缓冲加速瞬态功率、吸收制动回收能量，并让燃料电池工作变化更平缓。",
    ],
  ],
  "design-manufacturing": [
    [
      "为什么总布置问题越晚修改成本越高？",
      "空间和接口已经影响结构、系统、模具与验证，后期改动会跨多个团队产生连锁返工。",
    ],
    [
      "样车一次道路测试通过为什么不能代表量产可靠？",
      "可靠性需要覆盖温度、载荷、寿命、故障与重复样本，单次正常路线没有触及多数边界。",
    ],
    [
      "空气阻力降低是否可以牺牲所有冷却进风？",
      "不可以；动力和制动系统仍需散热，设计要在阻力、升力、冷却、空间和造型间平衡。",
    ],
  ],
  "final-review": [
    [
      "从燃油到车身前进，按顺序写出六个关键节点。",
      "燃油与空气、发动机、变速器、传动/差速机构、驱动轮、轮胎与路面作用。",
    ],
    [
      "车辆能加速但高速发飘，应优先沿哪条链路检查？",
      "沿轮胎、悬架、转向、空气动力和电子稳定控制链检查，不应只继续增加动力。",
    ],
    [
      "电动车与燃油车最主要的共同下游是什么？",
      "两者最终都要把旋转扭矩送到车轮，并依靠轮胎—路面作用实现加速、转向和制动。",
    ],
  ],
};

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(entryPath));
    else if (entry.name.endsWith(".mdx")) files.push(entryPath);
  }
  return files.sort();
}

function exerciseBlock(chapterSlug) {
  const exercises = EXERCISES[chapterSlug];
  if (!exercises) throw new Error(`缺少练习配置: ${chapterSlug}`);
  return `<Exercises>\n\n${exercises
    .map(
      ([question, answer], index) =>
        `**问题 ${index + 1}**：${question}\n\n<Answer>${answer}</Answer>`,
    )
    .join("\n\n")}\n\n</Exercises>`;
}

function unitSection(title) {
  const unit = MANIFEST.units.find((candidate) => candidate.title === title);
  if (!unit) return "";
  const concepts = unit.concepts.flatMap((alternatives) =>
    alternatives.slice(0, 1),
  );
  const formalSections = concepts.filter((concept) =>
    /^\d+\.\d+\s/.test(concept),
  );
  return `## 逐项机制说明\n\n${formalSections
    .map((concept) => {
      const explanation = UNIT_EXPLANATIONS[concept];
      if (!explanation) throw new Error(`缺少单元解释: ${concept}`);
      return `### ${concept}\n\n${explanation}`;
    })
    .join("\n\n")}`;
}

function factSourceSection(chapterSlug) {
  const sources = FACT_SOURCES[chapterSlug];
  if (!sources) throw new Error(`缺少事实来源配置: ${chapterSlug}`);
  return `## 事实核对来源\n\n原书目录仅用于界定本章范围；以下一手资料用于核对技术事实，正文为独立教学重写：\n\n${sources
    .map(([label, url]) => `- [${label}](${url})`)
    .join("\n")}`;
}

function normalizeObjectives(content) {
  return content.replace(
    /<Objectives\b[^>]*>([\s\S]*?)<\/Objectives>/,
    (_match, inner) => {
      const items = inner
        .replace(/\r?\n/g, " ")
        .replace(/^\s*-\s*/, "")
        .split(/\s+-\s+/)
        .map((item) => item.trim())
        .filter(Boolean);
      if (items.length < 2) throw new Error("Objectives 无法解析为清单");
      return `<Objectives>\n\n${items.map((item) => `- ${item}`).join("\n")}\n\n</Objectives>`;
    },
  );
}

for (const filePath of walk(BOOK_DIR)) {
  const chapterSlug = path.basename(filePath, ".mdx");
  const config = CONFIG[chapterSlug];
  if (!config) throw new Error(`缺少章节配置: ${chapterSlug}`);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const objectiveMatches = [...parsed.content.matchAll(/<Objectives\b/g)];
  if (objectiveMatches.length < 1)
    throw new Error(`章节没有 Objectives: ${filePath}`);
  let content = parsed.content.slice(objectiveMatches.at(-1).index);
  content = normalizeObjectives(content);
  content = content.replace(/^##\s+材料状态\s*\n[\s\S]*?(?=^##\s)/gm, "");
  content = content.replace(
    /<Callout\b[^>]*title=["']材料状态["'][^>]*>[\s\S]*?<\/Callout>\s*/g,
    "",
  );
  content = content.replace(
    /<Callout\b[^>]*>[\s\S]*?content_missing[\s\S]*?<\/Callout>\s*/gi,
    "",
  );
  const componentTag = `<${config.component} />`;
  if (!content.includes(componentTag))
    throw new Error(`找不到专属实验 ${componentTag}: ${filePath}`);
  content = content.replace(
    /^##\s+逐项机制说明\s*\n[\s\S]*?(?=^##\s+动手验证)/gm,
    "",
  );
  content = content.replace(
    /^##\s+动手验证\s*\n\s*>\s*猜一猜[^\n]*\n\s*(?=<[A-Z])/gm,
    "",
  );
  content = content.replace(
    /^##\s+练习与诊断\s*\n\s*<Exercises>[\s\S]*?<\/Exercises>\s*/gm,
    "",
  );
  content = content.replace(
    /^##\s+事实核对来源\s*\n[\s\S]*?(?=^<Attribution\b)/gm,
    "",
  );
  const units = unitSection(String(parsed.data.title));
  const prediction = `> 猜一猜：先根据本章的结构和状态预测一个结果，再操作下面的汽车专属实验；如果结果不同，回到第一条发生变化的能量、力或信号路径解释原因。`;
  content = content.replace(
    componentTag,
    `${units ? `${units}\n\n` : ""}## 动手验证\n\n${prediction}\n\n${componentTag}`,
  );
  const exercises = `## 练习与诊断\n\n${exerciseBlock(chapterSlug)}`;
  const glossaryHeading = content.match(/^##\s+(?:名词解释|术语表)/m);
  if (!glossaryHeading || glossaryHeading.index === undefined) {
    const attributionIndex = content.lastIndexOf("<Attribution");
    if (attributionIndex < 0)
      throw new Error(`找不到 Attribution: ${filePath}`);
    content = `${content.slice(0, attributionIndex)}${exercises}\n\n${content.slice(attributionIndex)}`;
  } else {
    content = `${content.slice(0, glossaryHeading.index)}${exercises}\n\n${content.slice(glossaryHeading.index)}`;
  }
  content = content.replace(/<Attribution\b[^>]*\/>/g, "<Attribution />");
  content = content.replace(
    "<Attribution />",
    `${factSourceSection(chapterSlug)}\n\n<Attribution />`,
  );
  parsed.data.qualityVersion = 2;
  parsed.data.practiceMode = config.practiceMode;
  parsed.data.sourceMode = "independent-rewrite";
  const importLine = `import { ${config.component} } from "@/components/mdx/auto-why-car-runs/labs/${chapterSlug}";`;
  fs.writeFileSync(
    filePath,
    matter.stringify(`${importLine}\n\n${content.trim()}\n`, parsed.data),
  );
}

console.log(`已清理并升级 ${Object.keys(CONFIG).length} 个汽车课程页面。`);
