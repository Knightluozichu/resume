import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-03-09",
  title: "3.9 什么是框架",
  family: "engineering",
  nodes: ["启动框架", "读取配置", "创建扩展", "回调应用", "统一收尾"],
  concepts: ["3.9 什么是框架"],
  mechanism:
    "框架提供生命周期、默认控制流和扩展点，应用代码在约定时机被回调；库则通常由应用主动调用",
  success: "3.9 什么是框架 的输入、机制、输出与复位轨迹一致",
  failure:
    "3.9 什么是框架 在“绕过框架生命周期私建关键对象，导致配置、资源释放或横切能力失效”处拒绝",
} as const;

export function Crv18Section0309Lab() {
  return <CoderMechanismLab {...profile} />;
}
