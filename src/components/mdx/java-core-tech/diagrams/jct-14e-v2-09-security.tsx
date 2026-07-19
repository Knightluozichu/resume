import { OfficialJct25Studio } from "./official-jct-lab";

const props = {
  "unitId": "jct-14e-v2-09-security",
  "title": "卷II 第9章 安全",
  "concepts": [
    "Chapter 9: Security",
    "9.1 Class Loaders",
    "9.2 User Authentication",
    "9.3 Digital Signatures",
    "9.4 Encryption"
  ],
  "stages": [
    "建立威胁模型",
    "验证身份",
    "验证完整性",
    "保护机密",
    "轮换密钥"
  ],
  "focuses": [
    "ClassLoader",
    "Principal",
    "Signature",
    "Cipher",
    "KeyStore",
    "随机数"
  ],
  "model": {
    "studio": "签名与加密边界验证台",
    "axisA": {
      "label": "安全目标",
      "levels": [
        "完整性",
        "身份认证",
        "机密性"
      ]
    },
    "axisB": {
      "label": "密钥管理",
      "levels": [
        "源码内硬编码",
        "KeyStore",
        "轮换与撤销"
      ]
    },
    "outcomes": {
      "success": "信任验证率",
      "risk": "密钥暴露风险",
      "evidence": "可重放证据"
    },
    "fault": "把加密当成认证，复用nonce或把密钥写进日志和源码",
    "task": "篡改消息、签名和密钥三项中的一项，定位验证失败并检查敏感信息是否泄露",
    "invariant": "算法、密钥用途、随机数与失败处理遵循公开标准合同",
    "probe": "Signature.getInstance(\"Ed25519\")",
    "practiceMode": "diagnosis",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jct14eV209SecurityMapLab() {
  return <OfficialJct25Studio {...props} mode="map" />;
}

export function Jct14eV209SecurityExperimentLab() {
  return <OfficialJct25Studio {...props} mode="experiment" />;
}

export function Jct14eV209SecurityEvidenceLab() {
  return <OfficialJct25Studio {...props} mode="evidence" />;
}
