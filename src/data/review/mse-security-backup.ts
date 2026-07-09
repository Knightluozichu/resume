import type { ReviewQuestion } from "./types";

export const mseSecurityBackupQuestions: ReviewQuestion[] = [
  {
    id: "mse-sb-1",
    chapter: "mse-security-backup",
    level: 2,
    question: "MySQL的权限体系是怎样的？如何创建用户并授予最小权限？请写出SQL示例。",
    answer: "MySQL权限体系分四级：①全局级（*.*）——SUPER/PROCESS/SHUTDOWN等管理权限；②数据库级（db.*）——SELECT/INSERT/UPDATE/DELETE/CREATE/DROP/ALTER等；③表级（db.table）——对特定表的权限；④列级——对特定列的权限。用户标识为'用户名'@'主机名'，主机名限制来源IP。最小权限原则：只授予应用所需的最少权限，避免GRANT ALL。SQL示例：\n-- 创建应用用户，只允许从应用服务器(10.0.1.100)连接\nCREATE USER 'appuser'@'10.0.1.100' IDENTIFIED BY 'Str0ngP@ss!';\n-- 只授shop库的增删改查权限\nGRANT SELECT, INSERT, UPDATE, DELETE ON shop.* TO 'appuser'@'10.0.1.100';\n-- 创建只读分析用户\nCREATE USER 'analyst'@'%' IDENTIFIED BY 'AnaP@ss!';\nGRANT SELECT ON shop.* TO 'analyst'@'%';\n-- 撤销权限\nREVOKE DELETE ON shop.* FROM 'appuser'@'10.0.1.100';\n-- 查看权限\nSHOW GRANTS FOR 'appuser'@'10.0.1.100';",
    tags: ["权限", "GRANT", "REVOKE", "最小权限", "用户管理", "实践"],
  },
  {
    id: "mse-sb-2",
    chapter: "mse-security-backup",
    level: 2,
    question: "逻辑备份和物理备份有什么区别？mysqldump和xtrabackup各适合什么场景？",
    answer: "逻辑备份：导出SQL语句（CREATE/INSERT等文本），工具mysqldump。优点——跨版本/跨平台恢复、可选择性恢复单表、可读性好；缺点——速度慢（需执行SQL重建）、大表恢复耗时。适合中小型数据库（<50GB）、跨版本迁移、单表恢复。命令：mysqldump -u root -p --single-transaction --routines --triggers shop > shop.sql。物理备份：直接拷贝数据文件（.ibd/redo/undo），工具xtrabackup（Percona）。优点——速度快（拷贝文件无需重建）、支持增量备份；缺点——需同版本/同平台、文件大。适合大型数据库（>50GB）、快速恢复、增量备份需求。命令：xtrabackup --backup --target-dir=/backup/full。备份策略：全量（每周xtrabackup）+ 增量（每日xtrabackup --incremental）+ binlog（实时，用于PITR时间点恢复）。3-2-1原则：3份副本、2种介质、1份异地。",
    tags: ["备份", "逻辑备份", "物理备份", "mysqldump", "xtrabackup", "PITR"],
  },
  {
    id: "mse-sb-3",
    chapter: "mse-security-backup",
    level: 2,
    question: "MySQL的redo log、undo log、binlog三大日志各自的作用和区别是什么？",
    answer: "redo log（重做日志）：InnoDB引擎层、物理日志（记录页的物理修改），用于崩溃恢复保证D持久性。WAL机制——先写redo log再写数据页，保证即使数据页没刷盘崩溃后也能从redo log恢复。循环写、固定大小。undo log（回滚日志）：InnoDB引擎层、逻辑日志（记录旧值），用于事务回滚保证A原子性 + MVCC旧版本数据来源。随事务回滚后清理（但长事务会导致undo膨胀）。binlog（二进制日志）：Server层、逻辑日志（记录SQL语句或行变更），用于主从复制和PITR恢复。追加写、按文件滚动。三者协作（两阶段提交）：①事务执行中写undo log；②事务提交时先写redo log（prepare状态）；③写binlog；④写redo log（commit状态）。崩溃恢复时：redo log有commit标记 → 直接恢复；有prepare无commit → 检查binlog是否完整，完整则提交否则回滚。这保证redo和binlog一致性。",
    tags: ["redo log", "undo log", "binlog", "三大日志", "两阶段提交", "崩溃恢复"],
  },
  {
    id: "mse-sb-4",
    chapter: "mse-security-backup",
    level: 3,
    question: "什么是SQL注入？如何在MySQL中防止SQL注入？请用代码示例说明参数化查询。",
    answer: "SQL注入：攻击者通过输入拼接SQL语句，篡改原SQL逻辑。例：登录查询 \"SELECT * FROM users WHERE name='\" + input + \"' AND pwd='\" + pwd + \"'\"，输入 name = admin' -- 则SQL变为 SELECT * FROM users WHERE name='admin' --' AND pwd=... 绕过密码验证。防护方法：①参数化查询/预编译语句（最有效）——SQL模板与参数分离，参数只做数据不做SQL语法。Java JDBC示例：\nString sql = \"SELECT * FROM users WHERE name = ? AND pwd = ?\";\nPreparedStatement ps = conn.prepareStatement(sql);\nps.setString(1, username);  // 参数自动转义，不会注入\nps.setString(2, password);\nResultSet rs = ps.executeQuery();\n②使用ORM框架（MyBatis/Hibernate）——默认参数化，MyBatis用#{}而非${}；③输入校验——白名单验证数据类型/长度/格式；④最小权限——应用用户不加DROP/ALTER权限；⑤WAF——Web应用防火墙拦截SQL注入特征。绝不能：字符串拼接SQL、信任用户输入、用Statement而非PreparedStatement。",
    tags: ["SQL注入", "参数化查询", "PreparedStatement", "安全", "实践"],
  },
];
