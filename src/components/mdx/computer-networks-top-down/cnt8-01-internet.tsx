"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从一条可证伪的端到端路径开始",
    mechanism:
      "先预测：把带宽当作传输速度或忽略排队、协议开销与瓶颈链路，会让时延和吞吐预测在负载变化时失效。把预测写成“应用意图、运输状态、数据平面、控制平面、链路/无线、安全”六行，再运行协议或抓包。若结果与预测不同，先定位首个偏差，不把后续连锁症状冒充根因。",
    failure:
      "若把「从一条可证伪的端到端路径开始」当成孤立协议名而忽略分层接口、时序和端到端状态，丢包、重传或路由变化后就难以解释观测结果。",
    evidence:
      "用确定的客户端与服务端输入复现「从一条可证伪的端到端路径开始」，同时核对应用日志、套接字状态和分层抓包中的字段、时序与失败响应。",
  },
  {
    label: "核心词汇与第8版边界",
    mechanism:
      "这些词汇固定在原书第8版语境。HTTP/2、QUIC/HTTP/3演化、CUBIC/BBR、SDN、NETCONF/YANG、4G/5G和WPA3语境属于本版；第9版重排或新增内容只能另行比较，不能修改218个节点分母。",
    failure:
      "若把「核心词汇与第8版边界」当成孤立协议名而忽略分层接口、时序和端到端状态，丢包、重传或路由变化后就难以解释观测结果。",
    evidence:
      "用确定的客户端与服务端输入复现「核心词汇与第8版边界」，同时核对应用日志、套接字状态和分层抓包中的字段、时序与失败响应。",
  },
  {
    label: "核心机制深读",
    mechanism:
      "具体构成描述列端系统、通信链路、分组交换机和ISP；服务描述把因特网视为向分布式应用提供通信服务的平台。两者通过协议和接口连接。",
    failure:
      "若把「核心机制深读」当成孤立协议名而忽略分层接口、时序和端到端状态，丢包、重传或路由变化后就难以解释观测结果。",
    evidence:
      "用确定的客户端与服务端输入复现「核心机制深读」，同时核对应用日志、套接字状态和分层抓包中的字段、时序与失败响应。",
  },
];

export function Cnt801InternetDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第1章 计算机网络和因特网：机制与证据"
      prompt="切换《第1章 计算机网络和因特网》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第1章 计算机网络和因特网》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function Cnt801InternetMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第1章 计算机网络和因特网：机制路径"
      stages={STAGES}
    />
  );
}

export function Cnt801InternetFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第1章 计算机网络和因特网：失效与核验"
      stages={STAGES}
    />
  );
}
