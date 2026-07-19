import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-02-09",
  title: "2.9 Java注解是怎么成功上位的",
  family: "java",
  nodes: ["声明注解", "选择保留期", "标注元素", "处理器读取", "生成行为"],
  concepts: [
    "2.9 Java注解是怎么成功上位的",
    "XML大臣",
    "安翰林献计",
    "早朝争斗",
  ],
  mechanism:
    "注解是受类型约束的元数据，Retention 决定保留阶段，Target 限定位置，编译器、处理器或反射读取后才产生行为",
  success: "2.9 Java注解是怎么成功上位的 的输入、机制、输出与复位轨迹一致",
  failure:
    "2.9 Java注解是怎么成功上位的 在“只添加注解却没有处理器或运行时读取者，误以为元数据会自动执行”处拒绝",
} as const;

export function Crv18Section0209Lab() {
  return <CoderMechanismLab {...profile} />;
}
