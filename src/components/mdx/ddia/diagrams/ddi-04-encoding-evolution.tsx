import { OfficialDdiaLab } from "./official-ddia-lab";

const config = {
  unitTitle: "第4章 数据编码与演化",
  focus:
    "把对象转换为稳定字节，并以向前、向后兼容约束数据库、服务和消息的独立演进",
  invariant:
    "新旧代码与新旧数据在滚动升级、回滚和异步消费期间互操作，未知字段不破坏语义",
  artifact: "Schema演化矩阵、兼容测试、滚动升级演练、消息样本与回滚记录",
  nodes: [
    "数据编码格式",
    "语言特定格式",
    "JSON、XML和二进制变体",
    "Thrift与Protocol Buffers",
    "Avro",
    "Schema的优点",
    "数据流模式",
    "通过数据库的数据流",
    "通过服务的数据流：REST与RPC",
    "消息传递的数据流",
    "小结",
  ],
};

export function Ddi04EncodingEvolutionArchitectureLab() {
  return <OfficialDdiaLab {...config} mode="architecture" />;
}

export function Ddi04EncodingEvolutionFailureLab() {
  return <OfficialDdiaLab {...config} mode="failure" />;
}

export function Ddi04EncodingEvolutionEvidenceLab() {
  return <OfficialDdiaLab {...config} mode="evidence" />;
}
