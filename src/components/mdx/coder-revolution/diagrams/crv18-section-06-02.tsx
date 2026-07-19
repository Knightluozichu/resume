import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-06-02",
  title: "6.2 码农需要知道的“潜规则”",
  family: "hardware",
  nodes: ["识别局部性", "放置缓存", "建立抽象", "异步解耦", "递归拆分"],
  concepts: [
    "6.2 码农需要知道的“潜规则”",
    "上帝的规矩：局部性原理",
    "坐飞机的怎么和坐驴车的打交道：缓存",
    "抛弃细节：抽象",
    "我只想和邻居打交道：分层",
    "我怕等不及：异步调用",
    "大事化小，小事化了：分而治之",
  ],
  mechanism:
    "局部性使缓存有效，抽象与分层限制认知边界，异步隐藏等待，分而治之缩小问题；每种原则都有适用条件和额外成本",
  success: "6.2 码农需要知道的“潜规则” 的输入、机制、输出与复位轨迹一致",
  failure:
    "6.2 码农需要知道的“潜规则” 在“为增加缓存层而忽略失效策略，读到旧数据却把问题误判为数据库故障”处拒绝",
} as const;

export function Crv18Section0602Lab() {
  return <CoderMechanismLab {...profile} />;
}
