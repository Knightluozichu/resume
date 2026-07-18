"use client";

import { Ppa3PacketWorkbench } from "./official-ppa3-packet-workbench";

const config = {
  title: "第9章 常见高层网络协议",
  focus: "沿真实会话分析DHCP/DHCPv6、DNS、HTTP和SMTP的结构与交互",
  invariant: "每次应用事务能关联到底层会话、请求响应标识、状态和载荷",
  failure: "按端口猜协议会错过非标准端口、重传、分段和解析器选择问题",
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

export function Ppa309UpperLayerProtocolsPacketLab() {
  return (
    <Ppa3PacketWorkbench
      {...config}
      stages={[...config.stages]}
      gates={[...config.gates]}
      mode="packet"
    />
  );
}

export function Ppa309UpperLayerProtocolsDiagnosisLab() {
  return (
    <Ppa3PacketWorkbench
      {...config}
      stages={[...config.stages]}
      gates={[...config.gates]}
      mode="diagnosis"
    />
  );
}

export function Ppa309UpperLayerProtocolsEvidenceLab() {
  return (
    <Ppa3PacketWorkbench
      {...config}
      stages={[...config.stages]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
