import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-02-14",
  title: "2.14 Spring 的本质",
  family: "java",
  nodes: ["读取Bean定义", "创建实例", "解析依赖", "生成代理", "调用业务"],
  concepts: [
    "2.14 Spring 的本质",
    "问题来源",
    "设计模式：模板方法",
    "设计模式：装饰者",
    "AOP",
    "实现AOP",
    "对象的创建",
    "IoC与DI",
  ],
  mechanism:
    "Spring 容器依据定义创建并注入 bean，IoC 把对象装配权交给容器；AOP 通常通过代理在连接点应用横切通知",
  success: "2.14 Spring 的本质 的输入、机制、输出与复位轨迹一致",
  failure:
    "2.14 Spring 的本质 在“同一类内部自调用绕过代理入口，导致预期的事务或通知没有执行”处拒绝",
} as const;

export function Crv18Section0214Lab() {
  return <CoderMechanismLab {...profile} />;
}
