import { OfficialHighPerformanceMysqlLab } from "./official-high-performance-mysql-lab";

export function Hpm4Ch10BackupRecoverySloLab() {
  return (
    <OfficialHighPerformanceMysqlLab
      mode="slo"
      unitTitle="第10章 备份与恢复"
      focus="从RPO、RTO与故障模型选择逻辑、物理、快照、增量和binlog恢复链"
      invariant="备份可验证、可解密、可定位时间点并在目标RTO内恢复到独立环境"
      artifact="备份清单、校验哈希、时间点恢复演练、RPO/RTO实测和删除事故复盘"
      nodes={[
        "10.1 为什么要备份",
        "10.2 定义恢复需求",
        "10.3 设计MySQL备份方案",
        "10.3.1 在线或离线备份",
        "10.3.2 逻辑或裸文件备份",
        "10.3.3 备份什么",
        "10.3.4 增量与差异备份",
        "10.3.5 复制不是备份",
        "10.3.6 管理和备份binlog",
        "10.4 备份与恢复工具",
        "10.4.1 MySQL Enterprise Backup",
        "10.4.2 Percona XtraBackup",
        "10.4.3 mydumper",
        "10.4.4 mysqldump",
        "10.5 备份数据",
        "10.5.1 逻辑SQL备份",
        "10.5.2 文件系统快照",
        "10.5.3 使用Percona XtraBackup",
        "10.6 从备份恢复",
        "10.6.1 恢复逻辑备份",
        "10.6.2 从快照恢复裸文件",
        "10.6.3 使用Percona XtraBackup恢复",
        "10.6.4 裸文件恢复后启动MySQL",
        "10.7 小结",
        "10.8 恢复演练",
      ]}
    />
  );
}

export function Hpm4Ch10BackupRecoveryCapacityLab() {
  return (
    <OfficialHighPerformanceMysqlLab
      mode="capacity"
      unitTitle="第10章 备份与恢复"
      focus="从RPO、RTO与故障模型选择逻辑、物理、快照、增量和binlog恢复链"
      invariant="备份可验证、可解密、可定位时间点并在目标RTO内恢复到独立环境"
      artifact="备份清单、校验哈希、时间点恢复演练、RPO/RTO实测和删除事故复盘"
      nodes={[
        "10.1 为什么要备份",
        "10.2 定义恢复需求",
        "10.3 设计MySQL备份方案",
        "10.3.1 在线或离线备份",
        "10.3.2 逻辑或裸文件备份",
        "10.3.3 备份什么",
        "10.3.4 增量与差异备份",
        "10.3.5 复制不是备份",
        "10.3.6 管理和备份binlog",
        "10.4 备份与恢复工具",
        "10.4.1 MySQL Enterprise Backup",
        "10.4.2 Percona XtraBackup",
        "10.4.3 mydumper",
        "10.4.4 mysqldump",
        "10.5 备份数据",
        "10.5.1 逻辑SQL备份",
        "10.5.2 文件系统快照",
        "10.5.3 使用Percona XtraBackup",
        "10.6 从备份恢复",
        "10.6.1 恢复逻辑备份",
        "10.6.2 从快照恢复裸文件",
        "10.6.3 使用Percona XtraBackup恢复",
        "10.6.4 裸文件恢复后启动MySQL",
        "10.7 小结",
        "10.8 恢复演练",
      ]}
    />
  );
}

export function Hpm4Ch10BackupRecoveryEvidenceLab() {
  return (
    <OfficialHighPerformanceMysqlLab
      mode="evidence"
      unitTitle="第10章 备份与恢复"
      focus="从RPO、RTO与故障模型选择逻辑、物理、快照、增量和binlog恢复链"
      invariant="备份可验证、可解密、可定位时间点并在目标RTO内恢复到独立环境"
      artifact="备份清单、校验哈希、时间点恢复演练、RPO/RTO实测和删除事故复盘"
      nodes={[
        "10.1 为什么要备份",
        "10.2 定义恢复需求",
        "10.3 设计MySQL备份方案",
        "10.3.1 在线或离线备份",
        "10.3.2 逻辑或裸文件备份",
        "10.3.3 备份什么",
        "10.3.4 增量与差异备份",
        "10.3.5 复制不是备份",
        "10.3.6 管理和备份binlog",
        "10.4 备份与恢复工具",
        "10.4.1 MySQL Enterprise Backup",
        "10.4.2 Percona XtraBackup",
        "10.4.3 mydumper",
        "10.4.4 mysqldump",
        "10.5 备份数据",
        "10.5.1 逻辑SQL备份",
        "10.5.2 文件系统快照",
        "10.5.3 使用Percona XtraBackup",
        "10.6 从备份恢复",
        "10.6.1 恢复逻辑备份",
        "10.6.2 从快照恢复裸文件",
        "10.6.3 使用Percona XtraBackup恢复",
        "10.6.4 裸文件恢复后启动MySQL",
        "10.7 小结",
        "10.8 恢复演练",
      ]}
    />
  );
}
