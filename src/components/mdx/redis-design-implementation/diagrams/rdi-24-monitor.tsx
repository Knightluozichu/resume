import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const config = {
  unitTitle: "第24章 监视器",
  focus:
    "追踪MONITOR客户端标志、监视器链表和命令传播，评估可见性、敏感信息与运行开销",
  invariant:
    "进入监视状态后收到规定命令信息，断开后清理关系，观测不会被误当低成本生产审计",
  artifact: "监视器状态图、命令格式样本、开销压测与敏感数据评审",
  nodes: ["成为监视器", "向监视器发送命令信息", "重点回顾"],
};

export function Rdi24MonitorStructureLab() {
  return <OfficialRedisDesignLab {...config} mode="structure" />;
}

export function Rdi24MonitorTraceLab() {
  return <OfficialRedisDesignLab {...config} mode="trace" />;
}

export function Rdi24MonitorEvidenceLab() {
  return <OfficialRedisDesignLab {...config} mode="evidence" />;
}
