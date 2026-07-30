"use client";

import { RubyEvidenceLab, type RubyEvidenceModel } from "./ruby-evidence-lab";

const model = {
  unitId: "tr5-17",
  title: "第17章 IO类",
  question: "怎样区分流能力、文件位置、缓冲、文本模式与外部进程生命周期？",
  concepts: [
    "标准输入输出",
    "文件输入输出",
    "输入操作与输出操作",
    "文件指针",
    "二进制模式与文本模式",
    "缓冲",
    "与命令进行交互",
    "open-uri库",
    "stringio库",
  ],
  stages: [
    {
      label: "建立标准输入输出输入",
      input: "固定标准输入输出所需的原始值、Ruby 版本和调用入口。",
      state: "在执行前记录接收者身份，并声明文件输入输出的允许状态。",
      evidence: "保存第17章 IO类的初值、参数、编码或资源位置。",
    },
    {
      label: "执行文件输入输出",
      input: "保持相同输入，只改变与文件输入输出直接相关的一项操作。",
      state: "逐步记录输入操作与输出操作造成的对象、控制或边界变化。",
      evidence:
        "定位“写入后未刷新或关闭就读取文件大小，把缓冲状态误判为数据丢失”出现时的第一处不同状态。",
    },
    {
      label: "验收stringio库",
      input: "恢复基线，再以stringio库覆盖正常、错误和重复执行。",
      state:
        "最终状态必须重新满足：读写前确认流状态，资源所有者覆盖关闭、刷新和子进程退出。",
      evidence:
        "交付第17章 IO类的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
    },
  ],
  normalTrace: [
    "固定标准输入输出的输入和接收者",
    "执行文件输入输出并记录状态",
    "观察输入操作与输出操作的返回或副作用",
    "用stringio库核对不变量并复位",
  ],
  failureTrace: [
    "保持第17章 IO类的输入与初值不变",
    "仅注入故障：写入后未刷新或关闭就读取文件大小，把缓冲状态误判为数据丢失",
    "记录首个对象、控制或边界分岔",
    "拒绝把最终现象误当成根因",
  ],
  invariant: "读写前确认流状态，资源所有者覆盖关闭、刷新和子进程退出。",
  fault: "写入后未刷新或关闭就读取文件大小，把缓冲状态误判为数据丢失",
  artifact:
    "第17章 IO类的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
} satisfies RubyEvidenceModel;

export function RubIoObjectModelLab() {
  return <RubyEvidenceLab model={model} view="object-model" />;
}

export function RubIoControlTraceLab() {
  return <RubyEvidenceLab model={model} view="control-trace" />;
}

export function RubIoBoundaryProbeLab() {
  return <RubyEvidenceLab model={model} view="boundary-probe" />;
}
