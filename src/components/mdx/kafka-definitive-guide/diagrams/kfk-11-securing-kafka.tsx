import { OfficialKafka2Lab } from "./official-kafka2-lab";

const meta = {
  unitTitle: "第11章 保护Kafka",
  focus:
    "把安全协议、SSL、SASL、重新认证、加密、授权、审计、ZooKeeper安全和平台边界组合成最小权限体系",
  invariant:
    "客户端、broker与管理员身份可验证，传输保密，资源授权默认拒绝，密钥轮换不中断服务，审计能关联主体与动作",
  artifact:
    "威胁模型、协议矩阵、证书与凭据轮换演练、ACL测试、审计样本和ZooKeeper加固清单",
  nodes: [
    "锁住Kafka",
    "安全协议",
    "身份验证",
    "SSL",
    "SASL",
    "重新认证",
    "安全更新不停机",
    "加密",
    "授权",
    "AclAuthorizer",
    "自定义授权",
    "安全方面的考虑",
    "审计",
    "保护ZooKeeper",
    "SASL",
    "SSL",
    "授权",
    "保护平台",
    "小结",
  ],
} as const;

export function Kfk11SecuringKafkaTopologyLab() {
  return <OfficialKafka2Lab mode="topology" {...meta} />;
}
export function Kfk11SecuringKafkaReliabilityLab() {
  return <OfficialKafka2Lab mode="reliability" {...meta} />;
}
export function Kfk11SecuringKafkaEvidenceLab() {
  return <OfficialKafka2Lab mode="evidence" {...meta} />;
}
