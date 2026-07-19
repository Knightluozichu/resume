import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-01-08",
  title: "1.8 数据库的奇妙之旅",
  family: "data",
  nodes: ["定义模式", "开始事务", "读取版本", "写入约束", "提交或回滚"],
  concepts: [
    "1.8 数据库的奇妙之旅",
    "无纸化办公",
    "数据的冗余和不一致",
    "李氏查询",
    "并发访问",
    "原子性问题",
    "安全",
  ],
  mechanism:
    "数据库用模式、约束、事务与访问控制集中管理数据；并发控制需要让提交历史满足声明的一致性级别",
  success: "1.8 数据库的奇妙之旅 的输入、机制、输出与复位轨迹一致",
  failure:
    "1.8 数据库的奇妙之旅 在“两个会话先读后写同一余额却没有锁、版本检查或可串行化隔离，产生丢失更新”处拒绝",
} as const;

export function Crv18Section0108Lab() {
  return <CoderMechanismLab {...profile} />;
}
