import { OfficialHighPerformanceMysqlLab } from "./official-high-performance-mysql-lab";

export function Hpm4Ch05ServerSettingsSloLab() {
  return (
    <OfficialHighPerformanceMysqlLab
      mode="slo"
      unitTitle="第5章 优化服务器设置"
      focus="用最小配置、容量预算和逐项实验管理MySQL 8.0系统变量"
      invariant="全局、会话和持久化值来源清楚，总内存不超预算，耐久和只读保护保持启用"
      artifact="配置来源账本、内存上界模型、变更前后状态快照和回退文件"
      nodes={[
        "5.1 MySQL配置如何工作",
        "5.1.1 语法、作用域和动态性",
        "5.1.2 持久化系统变量",
        "5.1.3 设置变量的副作用",
        "5.1.4 规划变量更改",
        "5.1.5 什么不该做",
        "5.2 创建MySQL配置文件",
        "5.2.1 最小化配置",
        "5.3 检查服务器状态变量",
        "5.4 配置内存使用",
        "5.4.1 每连接内存需求",
        "5.4.2 为操作系统保留内存",
        "5.4.3 InnoDB缓冲池",
        "5.4.4 线程缓存",
        "5.5 配置MySQL I/O行为",
        "5.5.1 InnoDB事务日志",
        "5.5.2 日志缓冲区",
        "5.5.3 InnoDB表空间",
        "5.5.4 其他I/O配置",
        "5.6 配置MySQL并发",
        "5.7 安全设置",
        "5.8 高级InnoDB设置",
        "5.9 小结",
      ]}
    />
  );
}

export function Hpm4Ch05ServerSettingsCapacityLab() {
  return (
    <OfficialHighPerformanceMysqlLab
      mode="capacity"
      unitTitle="第5章 优化服务器设置"
      focus="用最小配置、容量预算和逐项实验管理MySQL 8.0系统变量"
      invariant="全局、会话和持久化值来源清楚，总内存不超预算，耐久和只读保护保持启用"
      artifact="配置来源账本、内存上界模型、变更前后状态快照和回退文件"
      nodes={[
        "5.1 MySQL配置如何工作",
        "5.1.1 语法、作用域和动态性",
        "5.1.2 持久化系统变量",
        "5.1.3 设置变量的副作用",
        "5.1.4 规划变量更改",
        "5.1.5 什么不该做",
        "5.2 创建MySQL配置文件",
        "5.2.1 最小化配置",
        "5.3 检查服务器状态变量",
        "5.4 配置内存使用",
        "5.4.1 每连接内存需求",
        "5.4.2 为操作系统保留内存",
        "5.4.3 InnoDB缓冲池",
        "5.4.4 线程缓存",
        "5.5 配置MySQL I/O行为",
        "5.5.1 InnoDB事务日志",
        "5.5.2 日志缓冲区",
        "5.5.3 InnoDB表空间",
        "5.5.4 其他I/O配置",
        "5.6 配置MySQL并发",
        "5.7 安全设置",
        "5.8 高级InnoDB设置",
        "5.9 小结",
      ]}
    />
  );
}

export function Hpm4Ch05ServerSettingsEvidenceLab() {
  return (
    <OfficialHighPerformanceMysqlLab
      mode="evidence"
      unitTitle="第5章 优化服务器设置"
      focus="用最小配置、容量预算和逐项实验管理MySQL 8.0系统变量"
      invariant="全局、会话和持久化值来源清楚，总内存不超预算，耐久和只读保护保持启用"
      artifact="配置来源账本、内存上界模型、变更前后状态快照和回退文件"
      nodes={[
        "5.1 MySQL配置如何工作",
        "5.1.1 语法、作用域和动态性",
        "5.1.2 持久化系统变量",
        "5.1.3 设置变量的副作用",
        "5.1.4 规划变量更改",
        "5.1.5 什么不该做",
        "5.2 创建MySQL配置文件",
        "5.2.1 最小化配置",
        "5.3 检查服务器状态变量",
        "5.4 配置内存使用",
        "5.4.1 每连接内存需求",
        "5.4.2 为操作系统保留内存",
        "5.4.3 InnoDB缓冲池",
        "5.4.4 线程缓存",
        "5.5 配置MySQL I/O行为",
        "5.5.1 InnoDB事务日志",
        "5.5.2 日志缓冲区",
        "5.5.3 InnoDB表空间",
        "5.5.4 其他I/O配置",
        "5.6 配置MySQL并发",
        "5.7 安全设置",
        "5.8 高级InnoDB设置",
        "5.9 小结",
      ]}
    />
  );
}
