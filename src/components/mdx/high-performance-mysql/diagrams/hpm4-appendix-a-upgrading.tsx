import { OfficialHighPerformanceMysqlLab } from "./official-high-performance-mysql-lab";

export function Hpm4AppendixAUpgradingSloLab() {
  return (
    <OfficialHighPerformanceMysqlLab
      mode="slo"
      unitTitle="附录A 升级MySQL"
      focus="用发布说明、真实流量对照、灰度副本和自动化runbook降低版本升级风险"
      invariant="新旧版本结果与错误差异已知，升级目标不承载写流量，失败可由升级前备份恢复"
      artifact="兼容性矩阵、pt-upgrade对照、灰度结果和自动升级runbook"
      nodes={[
        "A.1 为什么升级",
        "A.2 升级生命周期",
        "A.3 测试升级",
        "A.3.1 开发环境测试",
        "A.3.2 生产镜像",
        "A.3.3 副本灰度",
        "A.3.4 升级工具",
        "A.4 大规模升级",
        "A.5 小结",
      ]}
    />
  );
}

export function Hpm4AppendixAUpgradingCapacityLab() {
  return (
    <OfficialHighPerformanceMysqlLab
      mode="capacity"
      unitTitle="附录A 升级MySQL"
      focus="用发布说明、真实流量对照、灰度副本和自动化runbook降低版本升级风险"
      invariant="新旧版本结果与错误差异已知，升级目标不承载写流量，失败可由升级前备份恢复"
      artifact="兼容性矩阵、pt-upgrade对照、灰度结果和自动升级runbook"
      nodes={[
        "A.1 为什么升级",
        "A.2 升级生命周期",
        "A.3 测试升级",
        "A.3.1 开发环境测试",
        "A.3.2 生产镜像",
        "A.3.3 副本灰度",
        "A.3.4 升级工具",
        "A.4 大规模升级",
        "A.5 小结",
      ]}
    />
  );
}

export function Hpm4AppendixAUpgradingEvidenceLab() {
  return (
    <OfficialHighPerformanceMysqlLab
      mode="evidence"
      unitTitle="附录A 升级MySQL"
      focus="用发布说明、真实流量对照、灰度副本和自动化runbook降低版本升级风险"
      invariant="新旧版本结果与错误差异已知，升级目标不承载写流量，失败可由升级前备份恢复"
      artifact="兼容性矩阵、pt-upgrade对照、灰度结果和自动升级runbook"
      nodes={[
        "A.1 为什么升级",
        "A.2 升级生命周期",
        "A.3 测试升级",
        "A.3.1 开发环境测试",
        "A.3.2 生产镜像",
        "A.3.3 副本灰度",
        "A.3.4 升级工具",
        "A.4 大规模升级",
        "A.5 小结",
      ]}
    />
  );
}
