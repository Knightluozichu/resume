import { OfficialDatabaseSystemConceptsLab } from "./official-database-system-concepts-lab";

export function DscCh18ConcurrencyControlArchitectureLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="architecture"
      unitTitle="第18章 并发控制"
      part="第七部分 事务管理"
      medium="纸书正文"
      focus="比较锁、时间戳、验证和多版本协议如何排序冲突并处理幻读"
      invariant="并发历史不破坏声明的不变量，等待图、版本可见性和冲突检测均可审计"
      artifact="锁表轨迹、死锁等待图、MVCC可见性时间线和写偏差反例"
      nodes={[
        "18.1 基于锁的协议",
        "18.2 死锁处理",
        "18.3 多粒度",
        "18.4 插入、删除与谓词读取",
        "18.5 基于时间戳的协议",
        "18.6 基于有效性检查的协议",
        "18.7 多版本方案",
        "18.8 快照隔离",
        "18.9 实践中的弱一致性级别",
        "18.10 并发控制高级主题",
        "18.11 小结",
      ]}
    />
  );
}

export function DscCh18ConcurrencyControlExperimentLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="experiment"
      unitTitle="第18章 并发控制"
      part="第七部分 事务管理"
      medium="纸书正文"
      focus="比较锁、时间戳、验证和多版本协议如何排序冲突并处理幻读"
      invariant="并发历史不破坏声明的不变量，等待图、版本可见性和冲突检测均可审计"
      artifact="锁表轨迹、死锁等待图、MVCC可见性时间线和写偏差反例"
      nodes={[
        "18.1 基于锁的协议",
        "18.2 死锁处理",
        "18.3 多粒度",
        "18.4 插入、删除与谓词读取",
        "18.5 基于时间戳的协议",
        "18.6 基于有效性检查的协议",
        "18.7 多版本方案",
        "18.8 快照隔离",
        "18.9 实践中的弱一致性级别",
        "18.10 并发控制高级主题",
        "18.11 小结",
      ]}
    />
  );
}

export function DscCh18ConcurrencyControlEvidenceLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="evidence"
      unitTitle="第18章 并发控制"
      part="第七部分 事务管理"
      medium="纸书正文"
      focus="比较锁、时间戳、验证和多版本协议如何排序冲突并处理幻读"
      invariant="并发历史不破坏声明的不变量，等待图、版本可见性和冲突检测均可审计"
      artifact="锁表轨迹、死锁等待图、MVCC可见性时间线和写偏差反例"
      nodes={[
        "18.1 基于锁的协议",
        "18.2 死锁处理",
        "18.3 多粒度",
        "18.4 插入、删除与谓词读取",
        "18.5 基于时间戳的协议",
        "18.6 基于有效性检查的协议",
        "18.7 多版本方案",
        "18.8 快照隔离",
        "18.9 实践中的弱一致性级别",
        "18.10 并发控制高级主题",
        "18.11 小结",
      ]}
    />
  );
}
