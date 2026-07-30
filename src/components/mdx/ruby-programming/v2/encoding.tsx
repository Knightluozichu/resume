"use client";

import { RubyEvidenceLab, type RubyEvidenceModel } from "./ruby-evidence-lab";

const model = {
  unitId: "tr5-19",
  title: "第19章 Encoding类",
  question: "怎样从原始字节、编码标签、有效性与转码错误定位乱码根因？",
  concepts: [
    "Ruby的编码与字符串",
    "脚本编码与魔法注释",
    "Encoding类",
    "正则表达式与编码",
    "IO类与编码",
    "外部编码与内部编码",
    "编码的设定与作用",
  ],
  stages: [
    {
      label: "建立Ruby的编码与字符串输入",
      input: "固定Ruby的编码与字符串所需的原始值、Ruby 版本和调用入口。",
      state: "在执行前记录接收者身份，并声明脚本编码与魔法注释的允许状态。",
      evidence: "保存第19章 Encoding类的初值、参数、编码或资源位置。",
    },
    {
      label: "执行脚本编码与魔法注释",
      input: "保持相同输入，只改变与脚本编码与魔法注释直接相关的一项操作。",
      state: "逐步记录Encoding类造成的对象、控制或边界变化。",
      evidence:
        "定位“对未知字节直接 force_encoding 为 UTF-8 并把标签变化当作转码成功”出现时的第一处不同状态。",
    },
    {
      label: "验收编码的设定与作用",
      input: "恢复基线，再以编码的设定与作用覆盖正常、错误和重复执行。",
      state:
        "最终状态必须重新满足：来源编码有可信元数据，转换严格，任何替换性数据损失都有记录。",
      evidence:
        "交付第19章 Encoding类的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
    },
  ],
  normalTrace: [
    "固定Ruby的编码与字符串的输入和接收者",
    "执行脚本编码与魔法注释并记录状态",
    "观察Encoding类的返回或副作用",
    "用编码的设定与作用核对不变量并复位",
  ],
  failureTrace: [
    "保持第19章 Encoding类的输入与初值不变",
    "仅注入故障：对未知字节直接 force_encoding 为 UTF-8 并把标签变化当作转码成功",
    "记录首个对象、控制或边界分岔",
    "拒绝把最终现象误当成根因",
  ],
  invariant: "来源编码有可信元数据，转换严格，任何替换性数据损失都有记录。",
  fault: "对未知字节直接 force_encoding 为 UTF-8 并把标签变化当作转码成功",
  artifact:
    "第19章 Encoding类的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
} satisfies RubyEvidenceModel;

export function RubEncodingObjectModelLab() {
  return <RubyEvidenceLab model={model} view="object-model" />;
}

export function RubEncodingControlTraceLab() {
  return <RubyEvidenceLab model={model} view="control-trace" />;
}

export function RubEncodingBoundaryProbeLab() {
  return <RubyEvidenceLab model={model} view="boundary-probe" />;
}
