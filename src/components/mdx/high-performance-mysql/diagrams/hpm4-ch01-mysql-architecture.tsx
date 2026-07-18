import { OfficialHighPerformanceMysqlLab } from "./official-high-performance-mysql-lab";

export function Hpm4Ch01MysqlArchitectureSloLab() {
  return (
    <OfficialHighPerformanceMysqlLab
      mode="slo"
      unitTitle="第1章 MySQL架构"
      focus="从连接进入MySQL逻辑层，经优化器到InnoDB事务、页、日志与复制的完整请求路径"
      invariant="提交结果满足隔离与持久性，读视图、锁和日志边界可解释，原子DDL不留下半完成元数据"
      artifact="一次事务的连接、计划、锁、版本、日志和复制事件联合轨迹"
      nodes={[
        "1.1 MySQL的逻辑架构",
        "1.2 连接管理与安全性",
        "1.3 优化与执行",
        "1.4 并发控制",
        "1.4.1 读写锁",
        "1.4.2 锁的粒度",
        "1.5 事务",
        "1.5.1 隔离级别",
        "1.5.2 死锁",
        "1.5.3 事务日志",
        "1.5.4 MySQL中的事务",
        "1.6 多版本并发控制",
        "1.7 复制",
        "1.8 数据文件结构",
        "1.9 InnoDB引擎",
        "1.9.1 JSON文档支持",
        "1.9.2 数据字典的变化",
        "1.9.3 原子DDL",
        "1.10 小结",
      ]}
    />
  );
}

export function Hpm4Ch01MysqlArchitectureCapacityLab() {
  return (
    <OfficialHighPerformanceMysqlLab
      mode="capacity"
      unitTitle="第1章 MySQL架构"
      focus="从连接进入MySQL逻辑层，经优化器到InnoDB事务、页、日志与复制的完整请求路径"
      invariant="提交结果满足隔离与持久性，读视图、锁和日志边界可解释，原子DDL不留下半完成元数据"
      artifact="一次事务的连接、计划、锁、版本、日志和复制事件联合轨迹"
      nodes={[
        "1.1 MySQL的逻辑架构",
        "1.2 连接管理与安全性",
        "1.3 优化与执行",
        "1.4 并发控制",
        "1.4.1 读写锁",
        "1.4.2 锁的粒度",
        "1.5 事务",
        "1.5.1 隔离级别",
        "1.5.2 死锁",
        "1.5.3 事务日志",
        "1.5.4 MySQL中的事务",
        "1.6 多版本并发控制",
        "1.7 复制",
        "1.8 数据文件结构",
        "1.9 InnoDB引擎",
        "1.9.1 JSON文档支持",
        "1.9.2 数据字典的变化",
        "1.9.3 原子DDL",
        "1.10 小结",
      ]}
    />
  );
}

export function Hpm4Ch01MysqlArchitectureEvidenceLab() {
  return (
    <OfficialHighPerformanceMysqlLab
      mode="evidence"
      unitTitle="第1章 MySQL架构"
      focus="从连接进入MySQL逻辑层，经优化器到InnoDB事务、页、日志与复制的完整请求路径"
      invariant="提交结果满足隔离与持久性，读视图、锁和日志边界可解释，原子DDL不留下半完成元数据"
      artifact="一次事务的连接、计划、锁、版本、日志和复制事件联合轨迹"
      nodes={[
        "1.1 MySQL的逻辑架构",
        "1.2 连接管理与安全性",
        "1.3 优化与执行",
        "1.4 并发控制",
        "1.4.1 读写锁",
        "1.4.2 锁的粒度",
        "1.5 事务",
        "1.5.1 隔离级别",
        "1.5.2 死锁",
        "1.5.3 事务日志",
        "1.5.4 MySQL中的事务",
        "1.6 多版本并发控制",
        "1.7 复制",
        "1.8 数据文件结构",
        "1.9 InnoDB引擎",
        "1.9.1 JSON文档支持",
        "1.9.2 数据字典的变化",
        "1.9.3 原子DDL",
        "1.10 小结",
      ]}
    />
  );
}
