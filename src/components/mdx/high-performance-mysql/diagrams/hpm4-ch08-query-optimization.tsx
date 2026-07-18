import { OfficialHighPerformanceMysqlLab } from "./official-high-performance-mysql-lab";

export function Hpm4Ch08QueryOptimizationSloLab() {
  return (
    <OfficialHighPerformanceMysqlLab
      mode="slo"
      unitTitle="第8章 查询性能优化"
      focus="从响应时间分解、访问行数、执行计划和客户端传输定位查询瓶颈"
      invariant="优化后结果集合和事务语义不变，实际扫描、排序、临时表与网络字节有可重复下降"
      artifact="慢查询样本、EXPLAIN ANALYZE差异、结果校验和上线回归门"
      nodes={[
        "8.1 查询为什么会慢",
        "8.2 慢查询基础：优化数据访问",
        "8.2.1 是否请求了不需要的数据",
        "8.2.2 MySQL是否扫描过多记录",
        "8.3 重构查询方式",
        "8.3.1 一个复杂查询还是多个简单查询",
        "8.3.2 切分查询",
        "8.3.3 分解连接查询",
        "8.4 查询执行基础",
        "8.4.1 客户端/服务器通信协议",
        "8.4.2 查询状态",
        "8.4.3 查询优化过程",
        "8.4.4 查询执行引擎",
        "8.4.5 将结果返回客户端",
        "8.5 MySQL查询优化器局限",
        "8.5.1 UNION限制",
        "8.5.2 等值传递",
        "8.5.3 并行执行",
        "8.5.4 同表SELECT与UPDATE",
        "8.6 优化特定查询",
        "8.6.1 优化COUNT查询",
        "8.6.2 优化连接查询",
        "8.6.3 使用ROLLUP优化GROUP BY",
        "8.6.4 优化LIMIT和OFFSET",
        "8.6.5 优化SQL_CALC_FOUND_ROWS",
        "8.6.6 优化UNION",
        "8.7 小结",
        "8.8 查询回归门",
      ]}
    />
  );
}

export function Hpm4Ch08QueryOptimizationCapacityLab() {
  return (
    <OfficialHighPerformanceMysqlLab
      mode="capacity"
      unitTitle="第8章 查询性能优化"
      focus="从响应时间分解、访问行数、执行计划和客户端传输定位查询瓶颈"
      invariant="优化后结果集合和事务语义不变，实际扫描、排序、临时表与网络字节有可重复下降"
      artifact="慢查询样本、EXPLAIN ANALYZE差异、结果校验和上线回归门"
      nodes={[
        "8.1 查询为什么会慢",
        "8.2 慢查询基础：优化数据访问",
        "8.2.1 是否请求了不需要的数据",
        "8.2.2 MySQL是否扫描过多记录",
        "8.3 重构查询方式",
        "8.3.1 一个复杂查询还是多个简单查询",
        "8.3.2 切分查询",
        "8.3.3 分解连接查询",
        "8.4 查询执行基础",
        "8.4.1 客户端/服务器通信协议",
        "8.4.2 查询状态",
        "8.4.3 查询优化过程",
        "8.4.4 查询执行引擎",
        "8.4.5 将结果返回客户端",
        "8.5 MySQL查询优化器局限",
        "8.5.1 UNION限制",
        "8.5.2 等值传递",
        "8.5.3 并行执行",
        "8.5.4 同表SELECT与UPDATE",
        "8.6 优化特定查询",
        "8.6.1 优化COUNT查询",
        "8.6.2 优化连接查询",
        "8.6.3 使用ROLLUP优化GROUP BY",
        "8.6.4 优化LIMIT和OFFSET",
        "8.6.5 优化SQL_CALC_FOUND_ROWS",
        "8.6.6 优化UNION",
        "8.7 小结",
        "8.8 查询回归门",
      ]}
    />
  );
}

export function Hpm4Ch08QueryOptimizationEvidenceLab() {
  return (
    <OfficialHighPerformanceMysqlLab
      mode="evidence"
      unitTitle="第8章 查询性能优化"
      focus="从响应时间分解、访问行数、执行计划和客户端传输定位查询瓶颈"
      invariant="优化后结果集合和事务语义不变，实际扫描、排序、临时表与网络字节有可重复下降"
      artifact="慢查询样本、EXPLAIN ANALYZE差异、结果校验和上线回归门"
      nodes={[
        "8.1 查询为什么会慢",
        "8.2 慢查询基础：优化数据访问",
        "8.2.1 是否请求了不需要的数据",
        "8.2.2 MySQL是否扫描过多记录",
        "8.3 重构查询方式",
        "8.3.1 一个复杂查询还是多个简单查询",
        "8.3.2 切分查询",
        "8.3.3 分解连接查询",
        "8.4 查询执行基础",
        "8.4.1 客户端/服务器通信协议",
        "8.4.2 查询状态",
        "8.4.3 查询优化过程",
        "8.4.4 查询执行引擎",
        "8.4.5 将结果返回客户端",
        "8.5 MySQL查询优化器局限",
        "8.5.1 UNION限制",
        "8.5.2 等值传递",
        "8.5.3 并行执行",
        "8.5.4 同表SELECT与UPDATE",
        "8.6 优化特定查询",
        "8.6.1 优化COUNT查询",
        "8.6.2 优化连接查询",
        "8.6.3 使用ROLLUP优化GROUP BY",
        "8.6.4 优化LIMIT和OFFSET",
        "8.6.5 优化SQL_CALC_FOUND_ROWS",
        "8.6.6 优化UNION",
        "8.7 小结",
        "8.8 查询回归门",
      ]}
    />
  );
}
