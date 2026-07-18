import { OfficialFla3BookLab } from "./official-fla3-book-lab";

const nodes = [
  "第7章 数据存储全方案，详解持久化技术",
  "7.1 持久化技术简介",
  "7.2 文件存储",
  "7.3 SharedPreferences存储",
  "7.4 SQLite数据库存储",
  "7.5 SQLite数据库的最佳实践",
  "7.6 Kotlin课堂：高阶函数的应用",
  "7.7 小结与点评"
];

export function FlaLifecycleLab() { return <OfficialFla3BookLab mode="lifecycle" unitTitle="第7章 数据存储全方案，详解持久化技术" focus="比较文件、SharedPreferences、SQLite与事务封装，建立模式、迁移、并发、失败恢复和高阶函数应用" nodes={nodes} />; }
export function FlaStateLab() { return <OfficialFla3BookLab mode="state" unitTitle="第7章 数据存储全方案，详解持久化技术" focus="把设置、文档和结构化记录分别落入合适存储，注入中断、重复写、模式升级和并发读写验证恢复" nodes={nodes} />; }
export function FlaEvidenceLab() { return <OfficialFla3BookLab mode="evidence" unitTitle="第7章 数据存储全方案，详解持久化技术" focus="数据分类表、SQLite模式与迁移、事务故障测试、备份与敏感数据边界" nodes={nodes} />; }
