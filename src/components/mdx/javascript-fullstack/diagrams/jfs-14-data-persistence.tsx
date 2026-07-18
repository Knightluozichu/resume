import { JfsBookLab } from "./official-jfs-lab";

const nodes = [
  "识别状态所有者",
  "选择持久化介质",
  "校验并编码数据",
  "执行参数化读写",
  "提交或回滚事务",
  "关闭连接并重读验证",
] as const;

export function Jfs14DataPersistenceMapLab() {
  return (
    <JfsBookLab
      title="第 14 章 实现数据存取 · 机制地图"
      label="JavaScript 全栈开发 · 服务器端"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Jfs14DataPersistenceExperimentLab() {
  return (
    <JfsBookLab
      title="第 14 章 实现数据存取 · 边界实验"
      label="JavaScript 全栈开发 · 服务器端"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Jfs14DataPersistenceEvidenceLab() {
  return (
    <JfsBookLab
      title="第 14 章 实现数据存取 · 恢复证据"
      label="JavaScript 全栈开发 · 服务器端"
      nodes={nodes}
      mode="evidence"
    />
  );
}
