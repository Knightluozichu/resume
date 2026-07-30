"use client";

import { RubyEvidenceLab, type RubyEvidenceModel } from "./ruby-evidence-lab";

const model = {
  unitId: "tr5-15",
  title: "第15章 散列类",
  question: "怎样证明散列的键相等、默认值、更新与合并没有制造隐藏共享？",
  concepts: [
    "散列的创建",
    "Hash.new",
    "值的获取与设定",
    "散列的默认值",
    "键或值的存在检查",
    "散列的大小",
    "删除键值与初始化散列",
    "合并两个散列",
    "计算单词数量",
  ],
  stages: [
    {
      label: "建立散列的创建输入",
      input: "固定散列的创建所需的原始值、Ruby 版本和调用入口。",
      state: "在执行前记录接收者身份，并声明Hash.new的允许状态。",
      evidence: "保存第15章 散列类的初值、参数、编码或资源位置。",
    },
    {
      label: "执行Hash.new",
      input: "保持相同输入，只改变与Hash.new直接相关的一项操作。",
      state: "逐步记录值的获取与设定造成的对象、控制或边界变化。",
      evidence:
        "定位“使用 Hash.new([]) 后直接修改默认数组却没有为键写回独立对象”出现时的第一处不同状态。",
    },
    {
      label: "验收计算单词数量",
      input: "恢复基线，再以计算单词数量覆盖正常、错误和重复执行。",
      state:
        "最终状态必须重新满足：每个键的规范化、哈希相等、默认对象和写回时机都可观察。",
      evidence:
        "交付第15章 散列类的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
    },
  ],
  normalTrace: [
    "固定散列的创建的输入和接收者",
    "执行Hash.new并记录状态",
    "观察值的获取与设定的返回或副作用",
    "用计算单词数量核对不变量并复位",
  ],
  failureTrace: [
    "保持第15章 散列类的输入与初值不变",
    "仅注入故障：使用 Hash.new([]) 后直接修改默认数组却没有为键写回独立对象",
    "记录首个对象、控制或边界分岔",
    "拒绝把最终现象误当成根因",
  ],
  invariant: "每个键的规范化、哈希相等、默认对象和写回时机都可观察。",
  fault: "使用 Hash.new([]) 后直接修改默认数组却没有为键写回独立对象",
  artifact:
    "第15章 散列类的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
} satisfies RubyEvidenceModel;

export function RubHashesObjectModelLab() {
  return <RubyEvidenceLab model={model} view="object-model" />;
}

export function RubHashesControlTraceLab() {
  return <RubyEvidenceLab model={model} view="control-trace" />;
}

export function RubHashesBoundaryProbeLab() {
  return <RubyEvidenceLab model={model} view="boundary-probe" />;
}
