"use client";

import { RubyOfficialLab } from "./official-lab";

const partCases = [
  {
    label: "Ruby初体验",
    fields: [
      ["章节", "第1-3章"],
      ["核心", "运行方式、对象与方法、数组/散列、命令行程序"],
      ["验收", "从输入到输出完成一个可诊断的Ruby命令"],
    ],
  },
  {
    label: "Ruby的基础",
    fields: [
      ["章节", "第4-11章"],
      ["核心", "变量、条件、循环、方法、类/模块、运算符、异常与块"],
      ["验收", "解释作用域、方法分派和正常/异常控制流"],
    ],
  },
  {
    label: "Ruby的类",
    fields: [
      ["章节", "第12-21章"],
      ["核心", "数值、数组、字符串、散列、正则、IO、文件、编码、时间与Proc"],
      ["验收", "为每类写出表示、边界、资源和失败语义"],
    ],
  },
  {
    label: "制作工具",
    fields: [
      ["章节", "第22-23章"],
      ["核心", "文本处理与邮政编码CSV/SQLite检索工具"],
      ["验收", "交付可重建、可验证、可回滚的完整数据管线"],
    ],
    alert: "《たのしいRuby 第5版》有四部分、23个官方章节。导学和总复习只负责导航与综合验收，不替代任何原文章节。",
  },
] as const;

const dependencyCases = [
  {
    label: "对象",
    fields: [
      ["问题", "接收者是什么对象，状态存在哪里？"],
      ["依赖", "字面量、变量、常量、类与模块"],
      ["解锁", "稳定的对象模型与作用域解释"],
    ],
  },
  {
    label: "控制",
    fields: [
      ["问题", "下一次由哪个方法、块或异常路径接管？"],
      ["依赖", "条件、循环、方法、块与异常"],
      ["解锁", "可组合的迭代、回调和失败传播"],
    ],
  },
  {
    label: "数据",
    fields: [
      ["问题", "值的编码、形状、顺序和匹配规则是什么？"],
      ["依赖", "数值、数组、字符串、散列、正则与Encoding"],
      ["解锁", "不会静默损坏的转换与文本处理"],
    ],
  },
  {
    label: "边界",
    fields: [
      ["问题", "谁拥有IO、文件、时间、数据库和回调生命周期？"],
      ["依赖", "前三层的对象、控制与数据契约"],
      ["解锁", "可诊断、可恢复、可重建的工程工具"],
    ],
    alert: "学习依赖是累积的。第22、23章不是孤立项目：它们把前21章的对象、控制、数据和资源语义组合成端到端工具。",
  },
] as const;

const gateCases = [
  {
    label: "预测",
    fields: [
      ["动作", "运行前写出返回值、对象状态、异常或文件变化"],
      ["证据", "可被执行结果证伪的具体预期"],
      ["失败信号", "只说大概会成功，没有可观察结果"],
    ],
  },
  {
    label: "执行",
    fields: [
      ["动作", "运行最小但完整的程序并保存输入与环境"],
      ["证据", "输出、类型、状态、文件内容或数据库行数"],
      ["失败信号", "只阅读代码，从未验证实际语义"],
    ],
  },
  {
    label: "扰动",
    fields: [
      ["动作", "注入nil、坏编码、空输入、异常、中断或重复数据"],
      ["证据", "非理想路径仍满足不变量并给出诊断"],
      ["失败信号", "示例只在一个happy path输入上工作"],
    ],
  },
  {
    label: "解释",
    fields: [
      ["动作", "离开页面重画对象、控制、数据和owner关系"],
      ["证据", "图、代码、测试和错误说明相互一致"],
      ["失败信号", "只记API名称，无法推导边界行为"],
    ],
    alert: "章节只有在预测、执行、扰动和解释四类证据一致时才算掌握。",
  },
] as const;

export function RubyBookPartMapLab() {
  return <RubyOfficialLab cases={partCases} caption="第五版按四部分覆盖全部23个官方章节。" tone="cyan" />;
}

export function RubyLearningDependencyLab() {
  return <RubyOfficialLab cases={dependencyCases} caption="对象、控制、数据与边界构成逐层累积的学习依赖。" tone="violet" />;
}

export function RubyStudyGateLab() {
  return <RubyOfficialLab cases={gateCases} caption="预测、执行、扰动与解释把阅读转化为可复查的掌握证据。" tone="emerald" />;
}

export const RubLearningMapDiagram = RubyBookPartMapLab;
