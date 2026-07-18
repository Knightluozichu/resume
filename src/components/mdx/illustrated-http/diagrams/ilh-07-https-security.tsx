"use client";

import { IllustratedHttpLab } from "./official-illustrated-http-lab";

const config = {
  unitTitle: "第7章 确保Web安全的HTTPS",
  snapshot: "《图解HTTP》2014年4月首版 / HTTP/1.1时代",
  focus:
    "从HTTP明文、身份不验证和完整性不可证三个缺点，推导SSL/TLS、混合密码与证书链的HTTPS通信机制",
  nodes: [
    "7.1 HTTP的缺点",
    "7.1.1 通信使用明文可能会被窃听",
    "7.1.2 不验证通信方的身份就可能遭遇伪装",
    "7.1.3 无法证明报文完整性，可能已遭篡改",
    "7.2 HTTP+加密+认证+完整性保护=HTTPS",
    "7.2.1 HTTP加上加密处理和认证以及完整性保护后即是HTTPS",
    "7.2.2 HTTPS是身披SSL外壳的HTTP",
    "7.2.3 相互交换密钥的公开密钥加密技术",
    "7.2.4 证明公开密钥正确性的证书",
    "7.2.5 HTTPS的安全通信机制",
  ],
  invariant:
    "能把一次HTTPS连接拆成证书验证、密钥协商、对称加密记录与完整性检查，并指出每一步阻断哪类攻击",
  failure:
    "把HTTPS简化成用公钥加密全部网页，或只看到锁图标就跳过主机名、有效期和信任链验证，会留下中间人路径",
  links: [
    {
      label: "窃听",
      mechanism: "攻击者在传输路径读取明文通信内容的威胁",
      evidence: "请求行、目标URI与时间线",
    },
    {
      label: "伪装",
      mechanism: "通信对端身份未验证时，攻击者冒充服务器或客户端",
      evidence: "原始首部、主体边界与状态码",
    },
    {
      label: "完整性",
      mechanism: "接收方能判断报文从发送后是否被篡改的性质",
      evidence: "正常/失败对照和状态前后值",
    },
    {
      label: "公开密钥加密",
      mechanism: "使用公开密钥加密或验证、私有密钥解密或签名的非对称密码机制",
      evidence: "缓存、会话或安全边界复核",
    },
  ],
  gates: [
    "首版目录节点与2014年技术边界",
    "原始请求行、状态行与首部",
    "主体边界、编码和表示元数据",
    "连接、中介、缓存或会话状态",
    "单变量失败与无副作用证明",
    "恢复、限制、责任人与复核人",
  ],
} as const;

export function Ilh07HttpsSecurityFlowLab() {
  return (
    <IllustratedHttpLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="flow"
    />
  );
}

export function Ilh07HttpsSecurityExperimentLab() {
  return (
    <IllustratedHttpLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="experiment"
    />
  );
}

export function Ilh07HttpsSecurityEvidenceLab() {
  return (
    <IllustratedHttpLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
