import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-02-08",
  title: "2.8 Java帝国之动态代理",
  family: "java",
  nodes: ["取得接口", "创建代理", "拦截调用", "委托目标", "返回或抛错"],
  concepts: ["2.8 Java帝国之动态代理", "深夜奏对", "明察暗访", "Java 动态代理"],
  mechanism:
    "JDK 动态代理为接口创建代理实例，InvocationHandler 在转发真实方法前后插入横切行为，并必须正确处理返回值与异常",
  success: "2.8 Java帝国之动态代理 的输入、机制、输出与复位轨迹一致",
  failure:
    "2.8 Java帝国之动态代理 在“代理再次调用代理自身而不调用目标对象，形成无限递归”处拒绝",
} as const;

export function Crv18Section0208Lab() {
  return <CoderMechanismLab {...profile} />;
}
