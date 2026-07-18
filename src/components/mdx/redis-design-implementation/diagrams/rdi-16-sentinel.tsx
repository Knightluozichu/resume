import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const config = {
  unitTitle: "第16章 Sentinel",
  focus:
    "沿Sentinel初始化、INFO发现、hello频道、主客观下线、领头选举与故障转移还原高可用",
  invariant:
    "故障判断满足法定票数，单轮只有合法领头者，晋升后旧主被重配置且客户端拓扑最终一致",
  artifact: "Sentinel状态机、投票记录、故障转移时间线、旧主恢复与客户端验证",
  nodes: [
    "启动并初始化Sentinel",
    "获取主服务器信息",
    "获取从服务器信息",
    "向主服务器和从服务器发送信息",
    "接收来自主服务器和从服务器的频道信息",
    "检测主观下线状态",
    "检查客观下线状态",
    "选举领头Sentinel",
    "故障转移",
    "重点回顾",
    "参考资料",
  ],
};

export function Rdi16SentinelStructureLab() {
  return <OfficialRedisDesignLab {...config} mode="structure" />;
}

export function Rdi16SentinelTraceLab() {
  return <OfficialRedisDesignLab {...config} mode="trace" />;
}

export function Rdi16SentinelEvidenceLab() {
  return <OfficialRedisDesignLab {...config} mode="evidence" />;
}
