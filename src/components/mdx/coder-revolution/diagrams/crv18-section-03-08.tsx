import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-03-08",
  title: "3.8 从SOA到微服务",
  family: "web",
  nodes: ["识别能力", "定义合同", "划分数据", "独立部署", "端到端观测"],
  concepts: ["3.8 从SOA到微服务"],
  mechanism:
    "SOA 与微服务都以服务合同拆分能力；微服务强调独立部署和自治数据，因此必须承担网络、观测、一致性与运维成本",
  success: "3.8 从SOA到微服务 的输入、机制、输出与复位轨迹一致",
  failure:
    "3.8 从SOA到微服务 在“按代码层而非业务能力拆服务，导致一次业务请求跨越大量同步调用”处拒绝",
} as const;

export function Crv18Section0308Lab() {
  return <CoderMechanismLab {...profile} />;
}
