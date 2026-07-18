import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const config = {
  unitTitle: "第13章 客户端",
  focus:
    "检查redisClient的套接字、名字、标志、输入输出缓冲、命令参数、事务与复制状态",
  invariant:
    "客户端生命周期与套接字一致，缓冲区有上界，关闭路径清理订阅、监视和事务状态",
  artifact: "客户端结构图、创建关闭轨迹、缓冲区压力与资源泄漏检查",
  nodes: ["客户端属性", "客户端的创建与关闭", "重点回顾"],
};

export function Rdi13ClientStructureLab() {
  return <OfficialRedisDesignLab {...config} mode="structure" />;
}

export function Rdi13ClientTraceLab() {
  return <OfficialRedisDesignLab {...config} mode="trace" />;
}

export function Rdi13ClientEvidenceLab() {
  return <OfficialRedisDesignLab {...config} mode="evidence" />;
}
