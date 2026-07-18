"use client";

import { IllustratedHttpLab } from "./official-illustrated-http-lab";

const config = {
  unitTitle: "第8章 确认访问用户身份的认证",
  snapshot: "《图解HTTP》2014年4月首版 / HTTP/1.1时代",
  focus:
    "比较BASIC、DIGEST、SSL客户端认证与表单认证，并解释Session和Cookie如何保持认证状态",
  nodes: [
    "8.1 何为认证",
    "8.2 BASIC认证",
    "8.3 DIGEST认证",
    "8.4 SSL客户端认证",
    "8.4.1 SSL客户端认证的认证步骤",
    "8.4.2 SSL客户端认证采用双因素认证",
    "8.4.3 SSL客户端认证必要的费用",
    "8.5 基于表单认证",
    "8.5.1 认证多半为基于表单认证",
    "8.5.2 Session管理及Cookie应用",
  ],
  invariant:
    "对任一认证流程能指出凭据形式、挑战与响应、验证位置、会话标识生命周期和退出失效点",
  failure:
    "把Base64当加密、把DIGEST当现代安全方案，或只依赖客户端Cookie中的用户身份，会让凭据重放和会话劫持直接成立",
  links: [
    {
      label: "认证",
      mechanism: "通过凭据确认访问者声称身份的过程",
      evidence: "请求行、目标URI与时间线",
    },
    {
      label: "BASIC认证",
      mechanism:
        "把用户名和密码组合后Base64编码放入Authorization的HTTP挑战响应方案",
      evidence: "原始首部、主体边界与状态码",
    },
    {
      label: "DIGEST认证",
      mechanism: "以nonce和摘要计算避免直接发送明文密码的挑战响应方案",
      evidence: "正常/失败对照和状态前后值",
    },
    {
      label: "SSL客户端认证",
      mechanism: "客户端用证书和私钥向服务器证明身份的TLS双向认证机制",
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

export function Ilh08UserAuthenticationFlowLab() {
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

export function Ilh08UserAuthenticationExperimentLab() {
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

export function Ilh08UserAuthenticationEvidenceLab() {
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
