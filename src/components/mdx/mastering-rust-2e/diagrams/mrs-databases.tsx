import { MasteringRustOfficialLab, type MasteringRustCase } from "./official-lab";

const cases: MasteringRustCase[] = [
  { label: "数据持久化", input: "目标与输入", rule: "持久化把进程内状态转成可恢复事实，需要schema、约束、事务和迁移", evidence: "数据持久化的边界测试与结果记录", invariant: "持久化把进程内状态转成可恢复事实，需要schema、约束、事务和迁移；数据库成功写入不等于业务流程的所有外部副作用都成功。" },
  { label: "SQLite", input: "数据持久化", rule: "SQLite适合嵌入式和单文件场景，事务与锁仍需明确", evidence: "SQLite的边界测试与结果记录", invariant: "SQLite适合嵌入式和单文件场景，事务与锁仍需明确；连接、临时文件和备份必须按进程模型验证，不能把开发便利直接外推到多实例服务。" },
  { label: "PostgreSQL", input: "SQLite", rule: "PostgreSQL提供并发事务、约束和丰富类型，查询参数必须绑定而非拼接", evidence: "PostgreSQL的边界测试与结果记录", invariant: "PostgreSQL提供并发事务、约束和丰富类型，查询参数必须绑定而非拼接；应用还要处理隔离级别、死锁重试和迁移兼容窗口。" },
  { label: "r2d2 连接池", input: "PostgreSQL", rule: "连接池复用昂贵连接并限制并发，容量应由数据库预算反推", evidence: "r2d2 连接池的边界测试与结果记录", invariant: "连接池复用昂贵连接并限制并发，容量应由数据库预算反推；获取超时、失效连接检测和优雅关闭比简单clone池句柄更重要。" },
  { label: "Diesel ORM", input: "r2d2 连接池", rule: "原书以Diesel展示编译期查询约束和schema映射", evidence: "Diesel ORM的边界测试与结果记录", invariant: "原书以Diesel展示编译期查询约束和schema映射；ORM减少样板但不消除索引、执行计划、N加1查询和事务边界设计。" },
];

export function MrsDatabasesModelLab() {
  return <MasteringRustOfficialLab title="Rust 数据库交互：概念执行链" caption="选择核心单元，沿输入、规则与证据追踪。" cases={cases} tone="cyan" />;
}

export function MrsDatabasesBoundaryLab() {
  return <MasteringRustOfficialLab title="Rust 数据库交互：边界切换" caption="切换单元，比较静态契约与运行期协议。" cases={cases} tone="amber" initial={1} />;
}

export function MrsDatabasesEvidenceLab() {
  return <MasteringRustOfficialLab title="Rust 数据库交互：验收证据" caption="把编译、测试与外部结果收束为可复现记录。" cases={cases} tone="emerald" initial={2} />;
}
