import type { ReviewQuestion } from "./types";

export const apoStorageOptimizationQuestions: ReviewQuestion[] = [
  {
    id: "apo-so-1",
    chapter: "apo-storage-optimization",
    level: 2,
    question: `SharedPreferences 有哪些问题？DataStore 和 MMKV 分别如何解决？如何选型？`,
    answer:
      `SharedPreferences问题：①commit()同步写磁盘阻塞主线程 ②apply()异步但Activity onStop时等待pending写入完成可能ANR ③全量写入——改一个key写整个XML文件 ④不支持跨进程 ⑤getSharedPreferences()首次调用同步加载整个文件到内存。DataStore解决：①基于协程Flow全异步非阻塞不会ANR ②增量写入（只写变化的key）③Preferences DataStore简单易用Proto DataStore类型安全。但速度仍不如MMKV。MMKV解决：①mmap内存映射写内存=写文件无系统调用开销比SP快100倍 ②增量更新只写变化的key ③支持跨进程（MULTI_PROCESS_MODE）④序列化用protobuf高效紧凑。选型：①简单配置低频读写→DataStore（Jetpack官方推荐协程友好）②高频读写或需跨进程→MMKV（性能极致）③新项目不再用SP ④需类型安全→Proto DataStore ⑤大量结构化数据→Room。`,
    tags: ["SharedPreferences", "DataStore", "MMKV", "存储选型"],
  },
  {
    id: "apo-so-2",
    chapter: "apo-storage-optimization",
    level: 3,
    question: `为什么 SQLite 批量插入比单条插入快 100 倍？如何用 Room 实现批量插入？`,
    answer:
      `快100倍原因：①单条插入每次事务隐含begin/commit每次commit触发fsync（强制刷盘约10-50ms）1000条=1000次fsync=10-50秒。批量插入一个事务内只fsync一次1000条=1次fsync=10-50ms ②每次单条插入有SQL解析、执行计划生成开销批量在预编译语句上重复执行避免重复解析 ③每次单条插入有Binder调用开销（Room跨进程到SQLite进程）。Room批量实现：①DAO方法接受List参数@Insert自动批量\`@Insert suspend fun insertAll(users: List&lt;User&gt;)\` ②手动事务\`db.runInTransaction { users.forEach { dao.insert(it) } }\` ③协程事务\`db.withTransaction { users.forEach { dao.insert(it) } }\`（需room-ktx）④大量数据分批每500条一个事务避免WAL日志过大。实测单条1000条约10秒事务批量约100ms提升100倍。`,
    tags: ["SQLite", "批量插入", "事务", "fsync", "Room"],
  },
  {
    id: "apo-so-3",
    chapter: "apo-storage-optimization",
    level: 3,
    question: `WAL 模式如何提升 SQLite 并发性能？有什么注意事项？`,
    answer:
      `WAL (Write-Ahead Logging)提升：①传统模式：写操作锁全表（SQLITE_BUSY）读操作必须等待写完成写操作必须等待读完成读写完全互斥 ②WAL模式：写操作先追加到独立WAL日志文件不修改主数据库文件。读操作读主文件不阻塞写。写操作写WAL文件不阻塞读。实现读写并发 ③多个读可并发（各自读主文件快照）写仍串行（WAL追加写）。注意事项：①WAL文件会增长需定期checkpoint（将WAL合并回主文件）SQLite默认超1000页自动checkpoint可手动PRAGMA wal_checkpoint(TRUNCATE) ②checkpoint时仍有短暂锁应低峰期执行 ③WAL不支持网络文件系统（NFS）因WAL依赖共享内存 ④Room默认开启WAL（API 16+）手动SQLite需db.enableWriteAheadLogging() ⑤WAL文件和SHM文件需一起备份 ⑥WAL模式下最大连接数有限（通常1写+多读）。`,
    tags: ["WAL", "SQLite并发", "checkpoint", "读写并发"],
  },
  {
    id: "apo-so-4",
    chapter: "apo-storage-optimization",
    level: 4,
    question: `设计一个高性能的搜索历史存储方案，要求：支持模糊搜索、按时间排序、最多保存 100 条、高频写入。`,
    answer:
      `方案设计：①存储选型——用Room (SQLite FTS4全文搜索)。MMKV不适合因为需模糊搜索和排序。Room支持FTS虚拟表实现全文搜索 ②Entity定义：@Fts4 @Entity(tableName=\"search_history\") data class SearchHistory(@PrimaryKey @DocumentId val id: Long, @ColumnInfo(name=\"query\") val query: String, @ColumnInfo(name=\"timestamp\") val timestamp: Long) ③模糊搜索DAO：@Query(\"SELECT query FROM search_history WHERE query MATCH :keyword || '*' ORDER BY timestamp DESC LIMIT 20\") suspend fun search(keyword: String): List&lt;String&gt;（MATCH实现前缀匹配'*'是FTS通配符）④高频写入优化：用事务批量插入@Insert(onConflict=REPLACE) suspend fun insertAll(items: List&lt;SearchHistory&gt;) + timestamp上建索引 ⑤限制100条：每次插入后删除超出旧记录@Query(\"DELETE FROM search_history WHERE id NOT IN (SELECT id FROM search_history ORDER BY timestamp DESC LIMIT 100)\") suspend fun trim() ⑥去重：插入前先删除相同query旧记录 ⑦时间排序：timestamp建索引ORDER BY timestamp DESC走索引 ⑧异步：所有DAO方法用suspend协程Dispatchers.IO调用 ⑨缓存：内存LruCache缓存最近搜索结果减少DB查询 ⑩WAL模式：Room默认开启读写不互斥。`,
    tags: ["Room", "FTS", "搜索历史", "高性能存储", "综合设计"],
  },
];
