import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-02-05",
  title: "2.5 Java帝国之宫廷内斗",
  family: "data",
  nodes: ["开启全局事务", "参与者执行", "准备投票", "协调决定", "完成释放"],
  concepts: [
    "2.5 Java帝国之宫廷内斗",
    "JDBC大臣",
    "密谋",
    "两阶段提交",
    "JTA",
    "塞翁失马，焉知非福",
    "基本可用",
    "走漏风声",
    "宫廷激辩",
  ],
  mechanism:
    "两阶段提交先让参与者 prepare 并持久化承诺，再由协调者发出 commit 或 rollback；它换取原子决定，也引入阻塞窗口",
  success: "2.5 Java帝国之宫廷内斗 的输入、机制、输出与复位轨迹一致",
  failure:
    "2.5 Java帝国之宫廷内斗 在“协调者在 prepare 后失联，参与者持锁等待决定，系统虽然一致却无法继续处理相关资源”处拒绝",
} as const;

export function Crv18Section0205Lab() {
  return <CoderMechanismLab {...profile} />;
}
