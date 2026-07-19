import { OfficialSiaLab } from "./official-sia6-lab";

const props = {
  "unitId": "sia-6e-03-working-with-data",
  "title": "第3章 使用关系数据",
  "concepts": [
    "3 Working with data",
    "3.1 Reading and writing data with JDBC",
    "3.1.1 Adapting the domain for persistence",
    "3.1.2 Working with JdbcTemplate",
    "3.1.3 Defining a schema and preloading data",
    "3.1.4 Inserting data",
    "3.2 Working with Spring Data JDBC",
    "3.2.1 Adding Spring Data JDBC to the build",
    "3.2.2 Defining repository interfaces",
    "3.2.3 Annotating the domain for persistence",
    "3.3 Persisting data with Spring Data JPA",
    "3.3.1 Adding Spring Data JPA to the project",
    "3.3.2 Annotating the domain as entities",
    "3.3.3 Declaring JPA repositories",
    "3.3.4 Customizing repositories",
    "3.4 Summary"
  ],
  "chain": [
    "冻结输入与版本",
    "解释容器决策",
    "执行边界合同",
    "注入失败与恢复",
    "保存发布证据"
  ],
  "model": {
    "studio": "关系聚合与事务台",
    "boundary": "service → transaction → repository → relational constraints",
    "axisA": {
      "label": "持久化策略",
      "levels": [
        "JdbcTemplate",
        "Data JDBC",
        "JPA"
      ]
    },
    "axisB": {
      "label": "事务结局",
      "levels": [
        "提交",
        "约束失败",
        "回滚"
      ]
    },
    "fault": "聚合部分写入后异常，测试却只检查主表记录",
    "invariant": "聚合写入要么整体提交要么整体回滚，查询数量和约束可观察",
    "signal": "SQL日志、行数与事务断言",
    "practiceMode": "code",
    "metric": "关系聚合与事务台合同命中率",
    "risk": "事务结局暴露风险",
    "task": "对比JdbcTemplate、Spring Data JDBC与JPA的映射、聚合、查询和事务边界；仅改变一项条件并保存初始、变化、故障、恢复和复位证据。",
    "artifact": "三方案查询轨迹、数据库约束、仓储合同测试与事务边界图"
  }
} as const;

export function Sia603WorkingWithDataMapLab() { return <OfficialSiaLab {...props} view="map" />; }
export function Sia603WorkingWithDataExperimentLab() { return <OfficialSiaLab {...props} view="experiment" />; }
export function Sia603WorkingWithDataEvidenceLab() { return <OfficialSiaLab {...props} view="evidence" />; }
