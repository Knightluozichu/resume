import { OfficialDatabaseSystemConceptsLab } from "./official-database-system-concepts-lab";

export function DscCh19RecoveryArchitectureLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="architecture"
      unitTitle="第19章 恢复系统"
      part="第七部分 事务管理"
      medium="纸书正文"
      focus="用日志先行、检查点、重做与撤销把不同故障恢复到一致状态"
      invariant="数据页落盘前对应日志已持久，恢复重复执行安全，已提交与未提交事务被正确区分"
      artifact="WAL时间线、崩溃注入脚本、ARIES三阶段轨迹和恢复点报告"
      nodes={[
        "19.1 故障分类",
        "19.2 存储",
        "19.3 恢复与原子性",
        "19.4 恢复算法",
        "19.5 缓冲区管理",
        "19.6 非易失存储丢失故障",
        "19.7 使用远程备份系统实现高可用",
        "19.8 提前释放锁与逻辑撤销",
        "19.9 ARIES",
        "19.10 内存数据库恢复",
        "19.11 小结",
      ]}
    />
  );
}

export function DscCh19RecoveryExperimentLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="experiment"
      unitTitle="第19章 恢复系统"
      part="第七部分 事务管理"
      medium="纸书正文"
      focus="用日志先行、检查点、重做与撤销把不同故障恢复到一致状态"
      invariant="数据页落盘前对应日志已持久，恢复重复执行安全，已提交与未提交事务被正确区分"
      artifact="WAL时间线、崩溃注入脚本、ARIES三阶段轨迹和恢复点报告"
      nodes={[
        "19.1 故障分类",
        "19.2 存储",
        "19.3 恢复与原子性",
        "19.4 恢复算法",
        "19.5 缓冲区管理",
        "19.6 非易失存储丢失故障",
        "19.7 使用远程备份系统实现高可用",
        "19.8 提前释放锁与逻辑撤销",
        "19.9 ARIES",
        "19.10 内存数据库恢复",
        "19.11 小结",
      ]}
    />
  );
}

export function DscCh19RecoveryEvidenceLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="evidence"
      unitTitle="第19章 恢复系统"
      part="第七部分 事务管理"
      medium="纸书正文"
      focus="用日志先行、检查点、重做与撤销把不同故障恢复到一致状态"
      invariant="数据页落盘前对应日志已持久，恢复重复执行安全，已提交与未提交事务被正确区分"
      artifact="WAL时间线、崩溃注入脚本、ARIES三阶段轨迹和恢复点报告"
      nodes={[
        "19.1 故障分类",
        "19.2 存储",
        "19.3 恢复与原子性",
        "19.4 恢复算法",
        "19.5 缓冲区管理",
        "19.6 非易失存储丢失故障",
        "19.7 使用远程备份系统实现高可用",
        "19.8 提前释放锁与逻辑撤销",
        "19.9 ARIES",
        "19.10 内存数据库恢复",
        "19.11 小结",
      ]}
    />
  );
}
