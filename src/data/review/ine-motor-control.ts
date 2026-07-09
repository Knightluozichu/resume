import type { ReviewQuestion } from "./types";

export const ineMotorControlQuestions: ReviewQuestion[] = [
  {
    id: "ine-motor-control-01",
    chapter: "ine-motor-control",
    level: 1,
    question: "新能源汽车主流的三种驱动电机是什么？为什么 PMSM 成为首选？",
    answer: "三种主流电机：永磁同步PMSM（效率95-97%、功率密度高、转子永磁体）、交流异步ACIM（效率90-93%、可靠性高、鼠笼绕组）、开关磁阻SRM（效率88-92%、成本最低、凸极铁芯）。PMSM 成为首选因为：效率最高（直接影响续航）、功率密度最高（体积小重量轻）、扭矩响应快（加速性能好）。缺点是依赖稀土材料成本较高。",
    tags: ["PMSM", "ACIM", "SRM", "电机类型", "永磁同步"],
  },
  {
    id: "ine-motor-control-02",
    chapter: "ine-motor-control",
    level: 2,
    question: "FOC 矢量控制的完整链路是什么？Clarke 和 Park 变换的作用是什么？",
    answer: "FOC 链路：速度指令→PI调节器→Park逆变换→SVPWM→逆变器→驱动电机，反馈环路：编码器/旋变→Clarke/Park变换→Id/Iq实际值。Clarke 变换将三相电流（ia/ib/ic）转换为两相静止坐标（iα/iβ），Park 变换将两相静止坐标转换为旋转坐标（Id/Iq）。Id 控制磁通，Iq 控制转矩，解耦后可像直流电机一样独立控制转矩与磁通，实现精确控制。",
    tags: ["FOC", "矢量控制", "Clarke变换", "Park变换", "SVPWM", "Id/Iq"],
  },
  {
    id: "ine-motor-control-03",
    chapter: "ine-motor-control",
    level: 2,
    question: "为什么新能源汽车普遍采用减速器而非多挡变速箱？",
    answer: "电机具有宽速域恒扭矩和恒功率特性：低速大扭矩（0-基速恒扭矩，加速强）、高速恒功率（基速以上恒功率，续航够），单一减速比即可覆盖全速域需求。多挡变速箱增加重量、成本和能量损耗，且换挡过程有动力中断。电机转速可达16000rpm以上，通过减速器（单速比7-10:1）即可满足0-200km/h需求。",
    tags: ["减速器", "变速箱", "恒扭矩", "恒功率", "电机特性"],
  },
  {
    id: "ine-motor-control-04",
    chapter: "ine-motor-control",
    level: 3,
    question: "再生制动（能量回收）的原理是什么？它与液压制动如何协调？",
    answer: "再生制动原理：车辆减速时电机切换为发电机模式，车轮驱动电机反转发电，动能→电能→充入电池，实现能量回收。协调策略：制动踏板信号同时输入制动控制器和电机控制器，低速时以液压制动为主（电机发电效率低），中高速时优先再生制动（回收效率高），紧急制动时液压+再生同时工作。通过制动踏板行程和压力传感器分配制动力比例，保证制动安全性和能量回收效率的平衡。",
    tags: ["再生制动", "能量回收", "液压制动", "协调策略"],
  },
];
