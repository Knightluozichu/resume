import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-03-03",
  title: "3.3 一个故事讲完HTTPS",
  family: "network",
  nodes: ["ClientHello", "协商参数", "验证证书", "派生密钥", "保护HTTP"],
  concepts: [
    "3.3 一个故事讲完HTTPS",
    "总有一种被偷窥的感觉",
    "RSA：非对称加密",
    "非对称加密 对称加密",
    "中间人劫持",
    "你到底是谁",
    "HTTPS",
  ],
  mechanism:
    "TLS 1.3 用证书链认证端点，通过握手建立共享密钥，再用带认证的对称加密保护记录；HTTPS 是 HTTP 运行在该安全通道上",
  success: "3.3 一个故事讲完HTTPS 的输入、机制、输出与复位轨迹一致",
  failure:
    "3.3 一个故事讲完HTTPS 在“客户端忽略主机名或证书链校验，使加密连接仍可能终止在攻击者”处拒绝",
} as const;

export function Crv18Section0303Lab() {
  return <CoderMechanismLab {...profile} />;
}
