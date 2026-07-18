import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const config = {
  unitTitle: "第23章 慢查询日志",
  focus:
    "理解slowlog_entry保存内容、阈值与最大长度配置、查询删除命令和执行后记录时点",
  invariant:
    "耗时口径排除网络I/O并按配置阈值记录，日志长度有界，ID与参数可追溯",
  artifact: "慢日志结构图、阈值实验、截断与清理验证、延迟监控对照",
  nodes: [
    "慢查询记录的保存",
    "慢查询日志的阅览和删除",
    "添加新日志",
    "重点回顾",
  ],
};

export function Rdi23SlowLogStructureLab() {
  return <OfficialRedisDesignLab {...config} mode="structure" />;
}

export function Rdi23SlowLogTraceLab() {
  return <OfficialRedisDesignLab {...config} mode="trace" />;
}

export function Rdi23SlowLogEvidenceLab() {
  return <OfficialRedisDesignLab {...config} mode="evidence" />;
}
