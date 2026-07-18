"use client";

import { Ppa3PacketWorkbench } from "./official-ppa3-packet-workbench";

const config = {
  title: "第5章 Wireshark高级特性",
  focus: "用端点、会话、协议层次、解析器、流跟踪、图表和专家信息交叉诊断",
  invariant: "统计结论能下钻到具体会话、帧、字段与解析器，并与原始字节一致",
  failure: "专家信息和图表是线索而非裁决，单独使用会把症状误判为根因",
  stages: [
    {
      label: "捕获",
      detail: "拓扑、接口、方向、时钟、snaplen与丢包计数",
    },
    {
      label: "筛选",
      detail: "捕获过滤、显示过滤、前后帧数与保留集合",
    },
    {
      label: "解码",
      detail: "协议树、原始字节、字段偏移与解析器版本",
    },
    {
      label: "诊断",
      detail: "首个异常帧、替代解释、根因与影响范围",
    },
    {
      label: "复核",
      detail: "文件哈希、命令、修复、恢复与独立复现",
    },
  ],
  gates: [
    "第3版正式节点与Wireshark 2.0.5边界",
    "捕获点覆盖目标双向通信",
    "原始PCAP、哈希、帧号与字节偏移",
    "过滤器、解析器和名称解析可复现",
    "正常/故障单变量对照与首个偏差",
    "恢复结果、责任人与独立复核人",
  ],
} as const;

export function Ppa305AdvancedWiresharkFeaturesPacketLab() {
  return (
    <Ppa3PacketWorkbench
      {...config}
      stages={[...config.stages]}
      gates={[...config.gates]}
      mode="packet"
    />
  );
}

export function Ppa305AdvancedWiresharkFeaturesDiagnosisLab() {
  return (
    <Ppa3PacketWorkbench
      {...config}
      stages={[...config.stages]}
      gates={[...config.gates]}
      mode="diagnosis"
    />
  );
}

export function Ppa305AdvancedWiresharkFeaturesEvidenceLab() {
  return (
    <Ppa3PacketWorkbench
      {...config}
      stages={[...config.stages]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
