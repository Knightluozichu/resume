import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-02-12",
  title: "2.12 序列化：一个老家伙的咸鱼翻身",
  family: "data",
  nodes: ["选择Schema", "编码字段", "传输字节", "校验版本", "受限解码"],
  concepts: [
    "2.12 序列化：一个老家伙的咸鱼翻身",
    "寒冬的蛰伏",
    "XML和JSON的挑战",
    "新协议的崛起",
  ],
  mechanism:
    "序列化把内存对象映射为带协议和版本的字节表示；接收端必须知道 schema、类型边界和不可信输入策略",
  success: "2.12 序列化：一个老家伙的咸鱼翻身 的输入、机制、输出与复位轨迹一致",
  failure:
    "2.12 序列化：一个老家伙的咸鱼翻身 在“反序列化任意来源的类型图并在构造期间触发危险行为”处拒绝",
} as const;

export function Crv18Section0212Lab() {
  return <CoderMechanismLab {...profile} />;
}
