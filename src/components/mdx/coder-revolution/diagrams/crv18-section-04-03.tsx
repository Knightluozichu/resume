import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-04-03",
  title: "4.3 烂代码传奇",
  family: "engineering",
  nodes: ["锁定行为", "识别气味", "小步改动", "运行测试", "比较接口"],
  concepts: ["4.3 烂代码传奇"],
  mechanism:
    "坏代码的可操作信号包括重复、过长职责、隐式依赖和高耦合；重构应在测试保护下小步保持外部行为",
  success: "4.3 烂代码传奇 的输入、机制、输出与复位轨迹一致",
  failure:
    "4.3 烂代码传奇 在“一次性重写大量模块并同时改变需求，使失败无法归因于重构还是新行为”处拒绝",
} as const;

export function Crv18Section0403Lab() {
  return <CoderMechanismLab {...profile} />;
}
