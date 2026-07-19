import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-02-04",
  title: "2.4 JDBC的诞生",
  family: "java",
  nodes: ["取得连接", "准备语句", "绑定参数", "读取结果", "提交关闭"],
  concepts: [
    "2.4 JDBC的诞生",
    "谈判",
    "统一接口",
    "面向接口编程",
    "简单工厂",
    "数据驱动",
    "工厂方法",
  ],
  mechanism:
    "JDBC 以 Driver/DataSource、Connection、PreparedStatement 与 ResultSet 统一关系数据库访问，并把事务提交权留给连接边界",
  success: "2.4 JDBC的诞生 的输入、机制、输出与复位轨迹一致",
  failure:
    "2.4 JDBC的诞生 在“拼接用户输入形成 SQL，既破坏参数类型也引入注入风险”处拒绝",
} as const;

export function Crv18Section0204Lab() {
  return <CoderMechanismLab {...profile} />;
}
