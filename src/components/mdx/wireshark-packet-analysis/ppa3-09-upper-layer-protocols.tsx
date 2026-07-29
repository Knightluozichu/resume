"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从一个可证伪的数据包结论开始",
    mechanism:
      "先写预测：按端口猜协议会错过非标准端口、重传、分段和解析器选择问题。然后固定接口、捕获点、时钟、snaplen、名称解析和配置方案，保存未经修改的原始PCAP。任何结论必须指向具体帧号、字段、字节偏移和相邻事务。",
    failure:
      "若分析「从一个可证伪的数据包结论开始」时忽略捕获位置、时间基准和协议上下文，重传、校验和卸载或非对称路径会被误判为真实故障。",
    evidence:
      "固定接口、捕获过滤器和时间范围，围绕「从一个可证伪的数据包结论开始」保存可复现 pcap，再用显示过滤器、会话跟踪与端点计数交叉核对结论。",
  },
  {
    label: "核心词汇与第3版边界",
    mechanism:
      "本书工具边界固定在Wireshark 2.0.5和2017年英文第3版：保留TShark、tcpdump、AirPcap、WEP/WPA、原书恶意流量案例和当时工具生态。当前Wireshark语法、Npcap演进、WPA2/WPA3或QUIC可以另作对照，不能替换正式节点。",
    failure:
      "若分析「核心词汇与第3版边界」时忽略捕获位置、时间基准和协议上下文，重传、校验和卸载或非对称路径会被误判为真实故障。",
    evidence:
      "固定接口、捕获过滤器和时间范围，围绕「核心词汇与第3版边界」保存可复现 pcap，再用显示过滤器、会话跟踪与端点计数交叉核对结论。",
  },
  {
    label: "核心机制深读",
    mechanism:
      "画出端点、交换机、路由器、镜像口或分流器和分析主机。记录双向包数、接口丢包、snaplen、硬件卸载和时钟来源；混杂模式本身不保证交换网络可见性。",
    failure:
      "若分析「核心机制深读」时忽略捕获位置、时间基准和协议上下文，重传、校验和卸载或非对称路径会被误判为真实故障。",
    evidence:
      "固定接口、捕获过滤器和时间范围，围绕「核心机制深读」保存可复现 pcap，再用显示过滤器、会话跟踪与端点计数交叉核对结论。",
  },
];

export function Ppa309UpperLayerProtocolsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第9章 常见高层网络协议：机制与证据"
      prompt="切换《第9章 常见高层网络协议》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第9章 常见高层网络协议》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function Ppa309UpperLayerProtocolsMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第9章 常见高层网络协议：机制路径"
      stages={STAGES}
    />
  );
}

export function Ppa309UpperLayerProtocolsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第9章 常见高层网络协议：失效与核验"
      stages={STAGES}
    />
  );
}
