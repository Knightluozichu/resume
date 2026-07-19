import { OfficialSiaLab } from "./official-sia6-lab";

const props = {
  "unitId": "sia-6e-13-reactive-persistence",
  "title": "第13章 响应式持久化",
  "concepts": [
    "13 Persisting data reactively",
    "13.1 Working with R2DBC",
    "13.1.1 Defining domain entities for R2DBC",
    "13.1.2 Defining reactive repositories",
    "13.1.3 Testing R2DBC repositories",
    "13.1.4 Defining an OrderRepository aggregate root service",
    "13.2 Persisting document data reactively with MongoDB",
    "13.2.1 Defining domain document types",
    "13.2.2 Defining reactive MongoDB repositories",
    "13.2.3 Testing reactive MongoDB repositories",
    "13.3 Reactively persisting data in Cassandra",
    "13.3.1 Defining domain classes for Cassandra persistence",
    "13.3.2 Creating reactive Cassandra repositories",
    "13.3.3 Testing reactive Cassandra repositories",
    "13.4 Summary"
  ],
  "chain": [
    "冻结输入与版本",
    "解释容器决策",
    "执行边界合同",
    "注入失败与恢复",
    "保存发布证据"
  ],
  "model": {
    "studio": "R2DBC响应式事务台",
    "boundary": "Publisher → reactive transaction → driver → database",
    "axisA": {
      "label": "数据驱动",
      "levels": [
        "R2DBC",
        "Mongo reactive",
        "Cassandra reactive"
      ]
    },
    "axisB": {
      "label": "事务场景",
      "levels": [
        "提交",
        "错误",
        "取消"
      ]
    },
    "fault": "使用JDBC阻塞驱动或在订阅之外开启事务，导致上下文丢失",
    "invariant": "订阅上下文携带事务，错误或取消不会留下半写入数据和悬挂连接",
    "signal": "事务事件、连接池与数据行断言",
    "practiceMode": "code",
    "metric": "R2DBC响应式事务台合同命中率",
    "risk": "事务场景暴露风险",
    "task": "比较R2DBC、响应式MongoDB与Cassandra仓储的聚合、事务、驱动和背压边界；仅改变一项条件并保存初始、变化、故障、恢复和复位证据。",
    "artifact": "驱动能力表、响应式事务图、StepVerifier仓储测试和连接池压力记录"
  }
} as const;

export function Sia613ReactivePersistenceMapLab() { return <OfficialSiaLab {...props} view="map" />; }
export function Sia613ReactivePersistenceExperimentLab() { return <OfficialSiaLab {...props} view="experiment" />; }
export function Sia613ReactivePersistenceEvidenceLab() { return <OfficialSiaLab {...props} view="evidence" />; }
