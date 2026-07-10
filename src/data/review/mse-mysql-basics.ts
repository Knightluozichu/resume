import type { ReviewQuestion } from "./types";

export const mseMysqlBasicsQuestions: ReviewQuestion[] = [
  {
    id: "mse-mb-1",
    chapter: "mse-mysql-basics",
    level: 1,
    question: `MySQL的客户端/服务器架构由哪几层组成？SQL语句从客户端到返回结果经过哪些处理阶段？`,
    answer: `MySQL架构分四层：①连接管理层——连接池、认证鉴权、线程管理，客户端TCP连接后认证身份；②SQL层（Server层）——解析器（词法/语法分析生成解析树）→优化器（生成执行计划、选择索引）→执行器（调用存储引擎接口执行）；该层还包含查询缓存（8.0已移除）、binlog日志、视图/触发器/存储过程；③存储引擎接口——可插拔引擎架构，InnoDB/MyISAM/Memory等；④文件系统——.ibd数据文件、.frm表结构、redo/undo日志。SQL处理阶段：客户端发SQL → 连接层接收认证 → 解析器解析 → 优化器优化 → 执行器调用引擎 → 引擎读写磁盘 → 结果返回客户端。`,
    tags: ["架构", "Server层", "解析器", "执行器"],
  },
  {
    id: "mse-mb-2",
    chapter: "mse-mysql-basics",
    level: 2,
    question: `VARCHAR和CHAR的区别是什么？什么场景该用哪种？TEXT和BLOB的区别呢？`,
    answer: `CHAR(n)是定长字符串，始终占用n个字符空间，不足用空格填充（读取时去除），适合长度固定的数据（如手机号、身份证号、状态码），优势是查找快、无碎片。VARCHAR(n)是变长字符串，实际占用 真实长度+1~2字节长度前缀，适合长度不固定的数据（如姓名、邮箱、地址），优势是省空间。TEXT和BLOB区别：TEXT存储文本字符串（有字符集和排序规则），BLOB存储二进制数据（无字符集，如图片/音频）。两者都不能设默认值、不能全做索引（只能前缀索引），大字段会存溢出页。选择原则：短文本用VARCHAR，长文本用TEXT，二进制用BLOB（但大文件建议存文件系统只存路径）。`,
    tags: ["数据类型", "VARCHAR", "CHAR", "TEXT", "BLOB"],
  },
  {
    id: "mse-mb-3",
    chapter: "mse-mysql-basics",
    level: 2,
    question: `MySQL中INT(11)的11代表什么意思？DECIMAL(10,2)中的10和2分别是什么？`,
    answer: `INT(11)中的11是显示宽度（display width），不是存储长度——INT无论写INT(1)还是INT(11)都占4字节、范围相同（-2^31到2^31-1）。显示宽度仅在配合ZEROFILL属性时有效（如INT(4) ZEROFILL存入1显示0001），MySQL 8.0已废弃此语法。DECIMAL(10,2)中10是精度（总位数，含小数部分），2是小数位数——即可存-99999999.99到99999999.99。DECIMAL用于存储精确小数（如金额），底层用二进制字符串存储避免浮点误差。金额绝不能用FLOAT/DOUBLE（浮点精度丢失），必须用DECIMAL或整数存分。`,
    tags: ["数据类型", "INT", "DECIMAL", "显示宽度", "精度"],
  },
  {
    id: "mse-mb-4",
    chapter: "mse-mysql-basics",
    level: 3,
    question: `设计一张用户表users，要求包含自增主键、用户名（唯一非空）、邮箱（唯一）、手机号、年龄（默认0）、注册时间（默认当前时间），请写出完整DDL。`,
    answer: `CREATE TABLE users (\n  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',\n  username VARCHAR(50) NOT NULL COMMENT '用户名',\n  email VARCHAR(100) NOT NULL COMMENT '邮箱',\n  phone VARCHAR(20) DEFAULT NULL COMMENT '手机号',\n  age TINYINT UNSIGNED DEFAULT 0 COMMENT '年龄',\n  created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',\n  UNIQUE KEY uk_username (username),\n  UNIQUE KEY uk_email (email)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';\n关键点：①主键用INT UNSIGNED + AUTO_INCREMENT；②username和email加NOT NULL + UNIQUE约束；③age用TINYINT UNSIGNED（0-255足够）+ DEFAULT 0；④created_at用DATETIME + DEFAULT CURRENT_TIMESTAMP；⑤指定InnoDB引擎和utf8mb4字符集（支持emoji）。`,
    tags: ["DDL", "建表", "约束", "AUTO_INCREMENT", "实践"],
  },
];
