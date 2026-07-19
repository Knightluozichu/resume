import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-02-10",
  title: "2.10 Java帝国之泛型",
  family: "java",
  nodes: ["声明类型参", "推断实参", "检查边界", "擦除桥接", "运行使用"],
  concepts: [
    "2.10 Java帝国之泛型",
    "新王登基",
    "C 使者",
    "泛型实现",
    "泛型方法",
    "泛型和继承",
  ],
  mechanism:
    "Java 泛型在编译期检查参数化类型，多数信息经擦除映射到边界类型；泛型类默认不因类型实参继承而协变",
  success: "2.10 Java帝国之泛型 的输入、机制、输出与复位轨迹一致",
  failure:
    "2.10 Java帝国之泛型 在“把 List[Integer] 当成 List[Number] 写入 Double，破坏原容器元素合同”处拒绝",
} as const;

export function Crv18Section0210Lab() {
  return <CoderMechanismLab {...profile} />;
}
