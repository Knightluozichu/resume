"use client";

import { IllustratedHttpLab } from "./official-illustrated-http-lab";

const config = {
  unitTitle: "第11章 Web的攻击技术",
  snapshot: "《图解HTTP》2014年4月首版 / HTTP/1.1时代",
  focus:
    "按输入输出、设计配置、会话管理和其他风险四类还原XSS、注入、遍历、强制浏览、CSRF、DoS等攻击机制",
  nodes: [
    "11.1 针对Web的攻击技术",
    "11.1.1 HTTP不具备必要的安全功能",
    "11.1.2 在客户端即可篡改请求",
    "11.1.3 针对Web应用的攻击模式",
    "11.2 因输出值转义不完全引发的安全漏洞",
    "11.2.1 跨站脚本攻击",
    "11.2.2 SQL注入攻击",
    "11.2.3 OS命令注入攻击",
    "11.2.4 HTTP首部注入攻击",
    "11.2.5 邮件首部注入攻击",
    "11.2.6 目录遍历攻击",
    "11.2.7 远程文件包含漏洞",
    "11.3 因设置或设计上的缺陷引发的安全漏洞",
    "11.3.1 强制浏览",
    "11.3.2 不正确的错误消息处理",
    "11.3.3 开放重定向",
    "11.4 因会话管理疏忽引发的安全漏洞",
    "11.4.1 会话劫持",
    "11.4.2 会话固定攻击",
    "11.4.3 跨站点请求伪造",
    "11.5 其他安全漏洞",
    "11.5.1 密码破解",
    "11.5.2 点击劫持",
    "11.5.3 DoS攻击",
    "11.5.4 后门程序",
  ],
  invariant:
    "每个漏洞都能写出不可信输入、解释器或信任边界、可观察后果、单变量复现和对应防线，而不是只背攻击名称",
  failure:
    "只部署HTTPS或只过滤尖括号就宣称Web安全，会遗漏SQL/OS/首部解释器、授权检查、会话生命周期和资源耗尽",
  links: [
    {
      label: "跨站脚本",
      mechanism:
        "不可信数据未经上下文正确转义进入页面，使攻击者脚本在受害者源下执行",
      evidence: "请求行、目标URI与时间线",
    },
    {
      label: "SQL注入",
      mechanism: "输入改变SQL语法结构，使数据库执行开发者未预期的查询或命令",
      evidence: "原始首部、主体边界与状态码",
    },
    {
      label: "目录遍历",
      mechanism: "利用路径规范化缺陷越出允许目录读取或写入其他文件",
      evidence: "正常/失败对照和状态前后值",
    },
    {
      label: "会话劫持",
      mechanism: "攻击者取得有效Session ID并冒充受害者访问应用",
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

export function Ilh11WebAttackTechniquesFlowLab() {
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

export function Ilh11WebAttackTechniquesExperimentLab() {
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

export function Ilh11WebAttackTechniquesEvidenceLab() {
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
