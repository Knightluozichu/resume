"use client";

import { PhoenixArchitectureLab } from "./official-phoenix-architecture-lab";

const config = {
  unitTitle: "2021纸书版权威学习地图",
  focus:
    "建立5部分、16章、2附录的依赖图，固定2021纸书版与作者v1.0.20210629快照边界",
  nodes: [
    "第一部分 演进中的架构",
    "第二部分 架构师的视角",
    "第三部分 分布式的基石",
    "第四部分 不可变基础设施",
    "第五部分 技术方法论",
    "第1章 服务架构演进史",
    "第2章 访问远程服务",
    "第3章 事务处理",
    "第4章 透明多级分流系统",
    "第5章 架构安全性",
    "第6章 分布式共识",
    "第7章 从类库到服务",
    "第8章 流量治理",
    "第9章 可靠通信",
    "第10章 可观测性",
    "第11章 虚拟化容器",
    "第12章 容器间网络",
    "第13章 持久化存储",
    "第14章 资源与调度",
    "第15章 服务网格",
    "第16章 向微服务迈进",
    "附录A 技术演示工程实践",
    "附录B 部署Kubernetes集群",
  ],
  invariant:
    "18个原书单元和77个唯一正式节点全部可达，每个结论都能回指纸书目录、作者快照和可复现实验",
  gates: [
    "正式目录与2021版本边界",
    "机制、主体、状态与责任边界",
    "单变量基线和故障反例",
    "日志、追踪、指标与状态轨迹",
    "最终业务结果与持久状态对账",
    "停止、恢复、回退与责任人",
  ],
} as const;

export function PhaOfficialLearningMapPathLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="path"
    />
  );
}

export function PhaOfficialLearningMapTradeoffLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="tradeoff"
    />
  );
}

export function PhaOfficialLearningMapEvidenceLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
