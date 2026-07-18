import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const config = {
  unitTitle: "第14章 服务器",
  focus:
    "从读取协议、查找命令、预备执行、调用函数到回复客户端，串联serverCron与初始化",
  invariant:
    "命令查找、权限与状态检查先于执行，统计和传播围绕同一调用，初始化失败不留下半可用服务",
  artifact: "命令执行时序、serverCron职责表、启动阶段日志与失败注入",
  nodes: ["命令请求的执行过程", "serverCron函数", "初始化服务器", "重点回顾"],
};

export function Rdi14ServerStructureLab() {
  return <OfficialRedisDesignLab {...config} mode="structure" />;
}

export function Rdi14ServerTraceLab() {
  return <OfficialRedisDesignLab {...config} mode="trace" />;
}

export function Rdi14ServerEvidenceLab() {
  return <OfficialRedisDesignLab {...config} mode="evidence" />;
}
