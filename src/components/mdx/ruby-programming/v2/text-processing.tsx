"use client";

import { RubyEvidenceLab, type RubyEvidenceModel } from "./ruby-evidence-lab";

const model = {
  unitId: "tr5-22",
  title: "第22章 文本处理",
  question: "怎样把下载、解码、正文提取、匹配和上下文展示做成可复核文本管线？",
  concepts: [
    "下载文件",
    "获取正文",
    "删除标签",
    "显示匹配次数",
    "显示匹配的部分",
    "突出匹配到的位置",
    "显示前后各10个字符",
    "让前后的字符数可变更",
  ],
  stages: [
    {
      label: "建立下载文件输入",
      input: "固定下载文件所需的原始值、Ruby 版本和调用入口。",
      state: "在执行前记录接收者身份，并声明获取正文的允许状态。",
      evidence: "保存第22章 文本处理的初值、参数、编码或资源位置。",
    },
    {
      label: "执行获取正文",
      input: "保持相同输入，只改变与获取正文直接相关的一项操作。",
      state: "逐步记录删除标签造成的对象、控制或边界变化。",
      evidence:
        "定位“用正则删除 HTML 标签后把残缺文本当成可靠正文”出现时的第一处不同状态。",
    },
    {
      label: "验收让前后的字符数可变更",
      input: "恢复基线，再以让前后的字符数可变更覆盖正常、错误和重复执行。",
      state:
        "最终状态必须重新满足：原始材料保留，解析规则固定，匹配位置可回指且输出有界稳定。",
      evidence:
        "交付第22章 文本处理的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
    },
  ],
  normalTrace: [
    "固定下载文件的输入和接收者",
    "执行获取正文并记录状态",
    "观察删除标签的返回或副作用",
    "用让前后的字符数可变更核对不变量并复位",
  ],
  failureTrace: [
    "保持第22章 文本处理的输入与初值不变",
    "仅注入故障：用正则删除 HTML 标签后把残缺文本当成可靠正文",
    "记录首个对象、控制或边界分岔",
    "拒绝把最终现象误当成根因",
  ],
  invariant: "原始材料保留，解析规则固定，匹配位置可回指且输出有界稳定。",
  fault: "用正则删除 HTML 标签后把残缺文本当成可靠正文",
  artifact:
    "第22章 文本处理的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
} satisfies RubyEvidenceModel;

export function RubTextProcessingObjectModelLab() {
  return <RubyEvidenceLab model={model} view="object-model" />;
}

export function RubTextProcessingControlTraceLab() {
  return <RubyEvidenceLab model={model} view="control-trace" />;
}

export function RubTextProcessingBoundaryProbeLab() {
  return <RubyEvidenceLab model={model} view="boundary-probe" />;
}
