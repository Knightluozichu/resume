import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-02-11",
  title: "2.11 一个著名的日志系统是怎么设计出来的",
  family: "engineering",
  nodes: ["创建事件", "选择Logger", "级别过滤", "布局格式", "Appender输出"],
  concepts: [
    "2.11 一个著名的日志系统是怎么设计出来的",
    "前言",
    "张家村",
    "小张的设计",
    "正交性",
    "Log4j",
    "尾声",
  ],
  mechanism:
    "日志系统把 logger 层级、级别判断、格式布局和输出目的地正交组合，调用点只提交结构化事件而不决定落盘策略",
  success:
    "2.11 一个著名的日志系统是怎么设计出来的 的输入、机制、输出与复位轨迹一致",
  failure:
    "2.11 一个著名的日志系统是怎么设计出来的 在“在禁用级别仍先构造昂贵字符串或执行有副作用的参数计算”处拒绝",
} as const;

export function Crv18Section0211Lab() {
  return <CoderMechanismLab {...profile} />;
}
