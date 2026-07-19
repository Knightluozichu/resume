import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-03-04",
  title: "3.4 机房夜话",
  family: "web",
  nodes: ["识别负载", "划分故障域", "布置副本", "检测失效", "切换恢复"],
  concepts: ["3.4 机房夜话", "第一夜", "第二夜", "第三夜"],
  mechanism:
    "机房可靠性来自供电、制冷、网络、计算与存储的故障域隔离；冗余只有在共同故障不会同时击中副本时才有效",
  success: "3.4 机房夜话 的输入、机制、输出与复位轨迹一致",
  failure:
    "3.4 机房夜话 在“两套服务放在同一电源、交换机或机架下，却按独立副本计算可用性”处拒绝",
} as const;

export function Crv18Section0304Lab() {
  return <CoderMechanismLab {...profile} />;
}
