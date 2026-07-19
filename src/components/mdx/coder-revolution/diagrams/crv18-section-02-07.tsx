import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-02-07",
  title: "2.7 Java 帝国之消息队列",
  family: "data",
  nodes: ["生产消息", "代理持久化", "分派消费", "业务落库", "确认或重试"],
  concepts: [
    "2.7 Java 帝国之消息队列",
    "张家村的历史",
    "拆分",
    "新问题",
    "消息队列",
    "互不兼容的MQ",
    "消息队列接口设计",
    "配置和代码的分离",
    "再次抽象",
  ],
  mechanism:
    "消息队列把生产、持久化、投递、确认和重试分开；消费端要假设重复投递，并用业务键实现幂等",
  success: "2.7 Java 帝国之消息队列 的输入、机制、输出与复位轨迹一致",
  failure:
    "2.7 Java 帝国之消息队列 在“消费者处理成功却在确认前断线，重投后重复扣款或重复发货”处拒绝",
} as const;

export function Crv18Section0207Lab() {
  return <CoderMechanismLab {...profile} />;
}
