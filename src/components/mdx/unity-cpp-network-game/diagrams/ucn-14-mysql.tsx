import { UnityCppEvidenceLab } from "./official-unity-cpp-evidence-lab";

const nodes = [
  "安装并锁定版本",
  "建立最小权限账号",
  "从C++连接",
  "执行参数化事务",
  "备份导出与迁移",
  "恢复演练后签发",
] as const;

export function Ucn14MysqlMapLab() {
  return (
    <UnityCppEvidenceLab
      title="第14章 MySQL数据库的使用"
      label="第3篇 C++网络开发基础（服务器）"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ucn14MysqlExperimentLab() {
  return (
    <UnityCppEvidenceLab
      title="正常、边界与失败样本"
      label="第14章 MySQL数据库的使用"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ucn14MysqlEvidenceLab() {
  return (
    <UnityCppEvidenceLab
      title="所有权、代际与恢复证据"
      label="第14章 MySQL数据库的使用"
      nodes={nodes}
      mode="evidence"
    />
  );
}
