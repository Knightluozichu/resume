import { OfficialSiaLab } from "./official-sia6-lab";

const nodes = [
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
];

export function Sia6ArchitectureLab() {
  return <OfficialSiaLab mode="map" unitTitle="第3章 使用关系数据" focus="对比JdbcTemplate、Spring Data JDBC与JPA的映射、聚合、查询和事务边界" nodes={nodes} />;
}

export function Sia6FlowLab() {
  return <OfficialSiaLab mode="flow" unitTitle="第3章 使用关系数据" focus="对同一新增订单运行JDBC、Data JDBC与JPA实现，比较SQL条数、回滚行为、对象状态与并发冲突" nodes={nodes} />;
}

export function Sia6EvidenceLab() {
  return <OfficialSiaLab mode="evidence" unitTitle="第3章 使用关系数据" focus="三方案查询轨迹、数据库约束、仓储合同测试与事务边界图" nodes={nodes} />;
}
