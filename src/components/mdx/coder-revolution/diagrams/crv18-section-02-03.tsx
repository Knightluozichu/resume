import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-02-03",
  title: "2.3 持久化：Java帝国反击战",
  family: "data",
  nodes: ["加载对象", "映射标识", "访问关系", "生成SQL", "事务提交"],
  concepts: [
    "2.3 持久化：Java帝国反击战",
    "断电的威胁",
    "数据库联合酋长国",
    "表面风光的EJB",
    "轻量级O/R Mapping框架",
    "帝国的反击",
  ],
  mechanism:
    "持久化层把对象身份、关系和生命周期映射到数据库事务；ORM 减少样板代码，但不能消除查询计划和事务边界",
  success: "2.3 持久化：Java帝国反击战 的输入、机制、输出与复位轨迹一致",
  failure:
    "2.3 持久化：Java帝国反击战 在“遍历关联对象时逐行延迟加载，产生 N+1 查询并把事务外访问变成失败”处拒绝",
} as const;

export function Crv18Section0203Lab() {
  return <CoderMechanismLab {...profile} />;
}
