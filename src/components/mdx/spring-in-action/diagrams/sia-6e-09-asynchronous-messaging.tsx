import { OfficialSiaLab } from "./official-sia6-lab";

const props = {
  "unitId": "sia-6e-09-asynchronous-messaging",
  "title": "第9章 异步消息",
  "concepts": [
    "9 Sending messages asynchronously",
    "9.1 Sending messages with JMS",
    "9.1.1 Setting up JMS",
    "9.1.2 Sending messages with JmsTemplate",
    "9.1.3 Receiving JMS messages",
    "9.2 Working with RabbitMQ and AMQP",
    "9.2.1 Adding RabbitMQ to Spring",
    "9.2.2 Sending messages with RabbitTemplate",
    "9.2.3 Receiving messages from RabbitMQ",
    "9.3 Messaging with Kafka",
    "9.3.1 Setting up Spring for Kafka messaging",
    "9.3.2 Sending messages with KafkaTemplate",
    "9.3.3 Writing Kafka listeners",
    "Summary"
  ],
  "chain": [
    "冻结输入与版本",
    "解释容器决策",
    "执行边界合同",
    "注入失败与恢复",
    "保存发布证据"
  ],
  "model": {
    "studio": "JMS、AMQP与Kafka交付台",
    "boundary": "producer → broker → consumer → business commit → ack",
    "axisA": {
      "label": "消息样本",
      "levels": [
        "首次",
        "重复",
        "乱序"
      ]
    },
    "axisB": {
      "label": "确认时点",
      "levels": [
        "处理前",
        "事务后",
        "超时后"
      ]
    },
    "fault": "消费者在业务提交前确认，崩溃后消息丢失且无补偿记录",
    "invariant": "同一业务键重复交付只产生一次有效结果，失败消息可定位并可重放",
    "signal": "offset/ack、幂等键与死信队列",
    "practiceMode": "code",
    "metric": "JMS、AMQP与Kafka交付台合同命中率",
    "risk": "确认时点暴露风险",
    "task": "比较JMS、RabbitMQ与Kafka的路由、保留、顺序、确认、重试和消费组语义；仅改变一项条件并保存初始、变化、故障、恢复和复位证据。",
    "artifact": "消息合同、交付语义表、幂等键设计、死信重放步骤与故障时间线"
  }
} as const;

export function Sia609AsynchronousMessagingMapLab() { return <OfficialSiaLab {...props} view="map" />; }
export function Sia609AsynchronousMessagingExperimentLab() { return <OfficialSiaLab {...props} view="experiment" />; }
export function Sia609AsynchronousMessagingEvidenceLab() { return <OfficialSiaLab {...props} view="evidence" />; }
