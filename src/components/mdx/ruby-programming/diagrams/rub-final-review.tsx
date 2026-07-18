"use client";

import { RubyOfficialLab } from "./official-lab";

const partReviewCases = [
  {
    label: "第1-3章",
    fields: [
      ["能力", "从解释器、对象和容器走到完整命令行程序"],
      ["综合证明", "实现带参数、输入、输出和错误状态的小命令"],
      ["回查", "执行环境不确定先回第1章；对象/API不确定回第2章"],
    ],
  },
  {
    label: "第4-11章",
    fields: [
      ["能力", "用作用域、分支、循环、方法、类、块与异常组织行为"],
      ["综合证明", "画出接收者、方法查找、块调用和异常传播链"],
      ["回查", "状态错回4-8章；控制或清理错回5-7、10-11章"],
    ],
  },
  {
    label: "第12-21章",
    fields: [
      ["能力", "为核心类选择正确表示、API、编码和资源边界"],
      ["综合证明", "完成文本/文件管线并覆盖Unicode、时间与回调失败"],
      ["回查", "数据形状回12-16章；IO/文件/编码/时间/Proc回17-21章"],
    ],
  },
  {
    label: "第22-23章",
    fields: [
      ["能力", "把整书语义组合为可交付的数据处理工具"],
      ["综合证明", "CSV到SQLite的版本化导入、查询、验证和回滚"],
      ["回查", "解析回22章；来源、导入和检索闭环回23章"],
    ],
    alert: "终局复盘仍保留23个章节坐标。任何综合项目失败，都应能回指到一个或多个具体官方章节。",
  },
] as const;

const failureCases = [
  {
    label: "对象状态",
    fields: [
      ["症状", "变量遮蔽、共享可变对象、错误receiver或class/module边界"],
      ["最小证据", "object_id、class、作用域、ancestors与状态转移"],
      ["相关章节", "4、7、8、9、12-15"],
    ],
  },
  {
    label: "控制分派",
    fields: [
      ["症状", "分支漏项、循环不终止、块未调用、异常被吞或Proc提前返回"],
      ["最小证据", "调用者/接收者、参数、块、返回值、异常类与ensure路径"],
      ["相关章节", "5-11、21"],
    ],
  },
  {
    label: "数据解释",
    fields: [
      ["症状", "数值精度、索引、Hash默认值、正则过匹配、字符乱码"],
      ["最小证据", "类型、bytes/encoding、normalized form、match与边界样本"],
      ["相关章节", "12-16、19、22"],
    ],
  },
  {
    label: "资源边界",
    fields: [
      ["症状", "文件泄漏、部分写入、时区漂移、回调悬挂或数据库半导入"],
      ["最小证据", "owner、open/closed状态、transaction、deadline与rollback"],
      ["相关章节", "10、17-23"],
    ],
    alert: "同一故障可能跨两类：坏编码导致错误分支属于数据解释加控制分派；导入异常后出现半库属于控制分派加资源边界。",
  },
] as const;

const capstoneCases = [
  {
    label: "输入",
    fields: [
      ["契约", "参数、stdin、CSV来源、版本、编码和尺寸限制"],
      ["故障注入", "缺参、空文件、坏编码、quoted newline和checksum错误"],
      ["通过证据", "拒绝原因明确，raw provenance可重建"],
    ],
  },
  {
    label: "转换",
    fields: [
      ["契约", "对象形状、normalization、匹配规则与错误隔离"],
      ["故障注入", "nil、重复key、异常字符、歧义正则和溢出"],
      ["通过证据", "original/canonical并存，accepted/rejected可核对"],
    ],
  },
  {
    label: "持久化",
    fields: [
      ["契约", "schema、index、prepared values、transaction和activation"],
      ["故障注入", "首行/中途/末行失败、磁盘满与验证失败"],
      ["通过证据", "candidate回滚，live版本与查询结果不变"],
    ],
  },
  {
    label: "查询交付",
    fields: [
      ["契约", "输入grammar、match mode、limit、stable order与status"],
      ["故障注入", "0/1/many结果、wildcard、数据库忙、cancel和shutdown"],
      ["通过证据", "结果可追到dataset/hash/schema，状态可自动判断"],
    ],
    alert: "Capstone必须同时验证正常、错误、中断、重复执行和回滚；只展示一次成功查询不算全书验收。",
  },
] as const;

export function RubyFinalPartReviewLab() {
  return <RubyOfficialLab cases={partReviewCases} caption="四部分把23章收敛为可回查的综合能力。" tone="cyan" />;
}

export function RubyFailureModelLab() {
  return <RubyOfficialLab cases={failureCases} caption="对象状态、控制分派、数据解释与资源边界是全书统一故障索引。" tone="rose" />;
}

export function RubyCapstoneGateLab() {
  return <RubyOfficialLab cases={capstoneCases} caption="从输入到查询交付的四段门禁完成第五版终局验收。" tone="emerald" />;
}

export const RubFinalReviewDiagram = RubyFinalPartReviewLab;
