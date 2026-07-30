"use client";

import { RubyEvidenceLab, type RubyEvidenceModel } from "./ruby-evidence-lab";

const model = {
  unitId: "tr5-18",
  title: "第18章 File类与Dir类",
  question: "怎样让路径、目录遍历、临时文件和复制删除操作保持原子与可回退？",
  concepts: [
    "变更、复制与删除文件",
    "目录内容的读取",
    "目录的创建与删除",
    "文件与目录的属性",
    "文件名的操作",
    "find库",
    "tempfile库",
    "fileutils库",
  ],
  stages: [
    {
      label: "建立变更、复制与删除文件输入",
      input: "固定变更、复制与删除文件所需的原始值、Ruby 版本和调用入口。",
      state: "在执行前记录接收者身份，并声明目录内容的读取的允许状态。",
      evidence: "保存第18章 File类与Dir类的初值、参数、编码或资源位置。",
    },
    {
      label: "执行目录内容的读取",
      input: "保持相同输入，只改变与目录内容的读取直接相关的一项操作。",
      state: "逐步记录目录的创建与删除造成的对象、控制或边界变化。",
      evidence:
        "定位“先删除目标再写新文件，中途失败后同时失去旧版本和新版本”出现时的第一处不同状态。",
    },
    {
      label: "验收fileutils库",
      input: "恢复基线，再以fileutils库覆盖正常、错误和重复执行。",
      state:
        "最终状态必须重新满足：路径归属、符号链接策略、权限与替换顺序在每次文件变更前明确。",
      evidence:
        "交付第18章 File类与Dir类的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
    },
  ],
  normalTrace: [
    "固定变更、复制与删除文件的输入和接收者",
    "执行目录内容的读取并记录状态",
    "观察目录的创建与删除的返回或副作用",
    "用fileutils库核对不变量并复位",
  ],
  failureTrace: [
    "保持第18章 File类与Dir类的输入与初值不变",
    "仅注入故障：先删除目标再写新文件，中途失败后同时失去旧版本和新版本",
    "记录首个对象、控制或边界分岔",
    "拒绝把最终现象误当成根因",
  ],
  invariant: "路径归属、符号链接策略、权限与替换顺序在每次文件变更前明确。",
  fault: "先删除目标再写新文件，中途失败后同时失去旧版本和新版本",
  artifact:
    "第18章 File类与Dir类的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
} satisfies RubyEvidenceModel;

export function RubFileDirObjectModelLab() {
  return <RubyEvidenceLab model={model} view="object-model" />;
}

export function RubFileDirControlTraceLab() {
  return <RubyEvidenceLab model={model} view="control-trace" />;
}

export function RubFileDirBoundaryProbeLab() {
  return <RubyEvidenceLab model={model} view="boundary-probe" />;
}
