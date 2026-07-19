import { OfficialJct25Studio } from "./official-jct-lab";

const props = {
  "unitId": "jct-14e-v2-05-database",
  "title": "卷II 第5章 数据库编程",
  "concepts": [
    "Chapter 5: Database Programming",
    "5.1 The Design of JDBC",
    "5.2 The Structured Query Language",
    "5.3 JDBC Configuration",
    "5.4 Working with JDBC Statements",
    "5.5 Query Execution",
    "5.6 Scrollable and Updatable Result Sets",
    "5.7 Row Sets",
    "5.8 Metadata",
    "5.9 Transactions",
    "5.10 Connection Management in Web and Enterprise Applications"
  ],
  "stages": [
    "取得连接",
    "绑定参数",
    "执行语句",
    "提交事务",
    "归还连接"
  ],
  "focuses": [
    "DataSource",
    "PreparedStatement",
    "ResultSet",
    "Metadata",
    "Transaction",
    "连接池"
  ],
  "model": {
    "studio": "JDBC 事务与资源轨迹台",
    "axisA": {
      "label": "语句构造",
      "levels": [
        "字符串拼接",
        "参数语句",
        "批处理参数"
      ]
    },
    "axisB": {
      "label": "事务边界",
      "levels": [
        "自动提交",
        "显式提交",
        "失败回滚"
      ]
    },
    "outcomes": {
      "success": "数据一致率",
      "risk": "注入与半提交风险",
      "evidence": "可重放证据"
    },
    "fault": "拼接SQL或捕获异常后仍提交部分修改，并把脏连接放回池中",
    "task": "在第二条更新前注入失败，核对数据库状态、rollback与连接池归还状态",
    "invariant": "事务要么完整提交，要么完整回滚并释放所有JDBC资源",
    "probe": "connection.setAutoCommit(false)",
    "practiceMode": "diagnosis",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jct14eV205DatabaseMapLab() {
  return <OfficialJct25Studio {...props} mode="map" />;
}

export function Jct14eV205DatabaseExperimentLab() {
  return <OfficialJct25Studio {...props} mode="experiment" />;
}

export function Jct14eV205DatabaseEvidenceLab() {
  return <OfficialJct25Studio {...props} mode="evidence" />;
}
