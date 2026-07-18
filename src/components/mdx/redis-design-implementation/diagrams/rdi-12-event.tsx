import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const config = {
  unitTitle: "第12章 事件",
  focus:
    "把I/O多路复用、文件事件处理器、时间事件和aeProcessEvents调度连接为单线程事件循环",
  invariant:
    "就绪事件不丢不重复，时间事件按策略执行，长回调不无限阻塞其他客户端与serverCron",
  artifact: "事件循环时序、处理器注册表、阻塞实验与调度延迟分布",
  nodes: ["文件事件", "时间事件", "事件的调度与执行", "重点回顾", "参考资料"],
};

export function Rdi12EventStructureLab() {
  return <OfficialRedisDesignLab {...config} mode="structure" />;
}

export function Rdi12EventTraceLab() {
  return <OfficialRedisDesignLab {...config} mode="trace" />;
}

export function Rdi12EventEvidenceLab() {
  return <OfficialRedisDesignLab {...config} mode="evidence" />;
}
