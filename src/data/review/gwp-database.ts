import type { ReviewQuestion } from "./types";

/** 数据库 复习题 */
export const gwpDatabaseQuestions: ReviewQuestion[] = [
  {
    id: "gwp-database-1",
    chapter: "gwp-database",
    level: 1,
    question: `database/sql 中 db.Query、db.QueryRow 和 db.Exec 三者的区别是什么？`,
    answer: `db.Query 返回 (*sql.Rows, error)，用于 SELECT 多行，需 rows.Next() 遍历，必须 defer rows.Close()。db.QueryRow 返回 *sql.Row，用于 SELECT 单行，直接 row.Scan(&v)，无结果返回 sql.ErrNoRows。db.Exec 返回 (sql.Result, error)，用于 INSERT/UPDATE/DELETE，Result 可取 LastInsertId() 和 RowsAffected()。`,
    tags: ["database/sql", "查询方法", "基础"],
  },
  {
    id: "gwp-database-2",
    level: 2,
    chapter: "gwp-database",
    question: `为什么必须调用 rows.Close()？不调用会导致什么后果？`,
    answer: `db.Query 返回的 *sql.Rows 持有一个数据库连接。不调用 rows.Close()，这个连接永远不会归还连接池——连接泄漏。积累下去连接池耗尽（达到 MaxOpenConns），新请求会阻塞等待空闲连接，最终超时或死锁。最佳实践是 defer rows.Close()——即使循环中 return 或 panic 也会执行。即使 rows.Next() 返回 false（遍历结束），也需要 Close 释放连接。`,
    tags: ["rows.Close", "连接泄漏", "理解"],
  },
  {
    id: "gwp-database-3",
    level: 3,
    chapter: "gwp-database",
    question: `写一个函数 getUser(db *sql.DB, id int) 查询单个用户，处理\"未找到\"和\"数据库错误\"两种情况。`,
    answer: `func getUser(db *sql.DB, id int) (*User, error) {\n  var u User\n  err := db.QueryRow(\"SELECT id, name, email FROM users WHERE id = ?\", id).\n    Scan(&u.ID, &u.Name, &u.Email)\n  if err == sql.ErrNoRows {\n    return nil, nil // 未找到，返回 nil 用户而非 error\n  }\n  if err != nil {\n    return nil, fmt.Errorf(\"query user %d: %w\", id, err)\n  }\n  return &u, nil\n}。关键点：用 QueryRow 查单行、Scan 直接扫描、区分 sql.ErrNoRows（业务层面\"未找到\"）和其他 error（数据库故障）、用 %w 包装错误保留原始错误链。`,
    tags: ["QueryRow", "错误处理", "实践"],
  },
  {
    id: "gwp-database-4",
    level: 4,
    chapter: "gwp-database",
    question: `连接池的 MaxOpenConns、MaxIdleConns、ConnMaxLifetime 三个参数如何配置？设置不当各有什么后果？`,
    answer: `MaxOpenConns（最大并发连接数）：设过高耗尽数据库连接配额（数据库有 max_connections 上限），设过低成并发瓶颈——超限请求阻塞。MaxIdleConns（最大空闲连接）：设过低导致频繁创建/销毁连接（TCP+认证开销），设过高占数据库空闲连接配额。ConnMaxLifetime（连接存活时间）：设过长，连接因数据库重启/防火墙超时变为\"腐败连接\"导致查询失败；设过短，频繁重建连接浪费资源。合理配置：MaxOpenConns 略低于数据库 max_connections / 应用实例数；MaxIdleConns 约为 MaxOpenConns 的 50-80%；ConnMaxLifetime 设 5-15 分钟。需根据实际负载测试调优，监控连接池等待时间指标。`,
    tags: ["连接池", "配置", "性能", "综合"],
  },
];
