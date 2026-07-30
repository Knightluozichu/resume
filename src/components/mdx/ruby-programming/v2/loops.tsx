"use client";

import { RubyEvidenceLab, type RubyEvidenceModel } from "./ruby-evidence-lab";

const model = {
  unitId: "tr5-06",
  title: "第6章 循环",
  question:
    "怎样为 times、while、until、each 与 loop 选择可证明终止的驱动方式？",
  concepts: [
    "循环的基础",
    "times方法",
    "for语句",
    "while语句",
    "until语句",
    "each方法",
    "loop方法",
    "break与next",
  ],
  stages: [
    {
      label: "建立循环的基础输入",
      input: "固定循环的基础所需的原始值、Ruby 版本和调用入口。",
      state: "在执行前记录接收者身份，并声明times方法的允许状态。",
      evidence: "保存第6章 循环的初值、参数、编码或资源位置。",
    },
    {
      label: "执行times方法",
      input: "保持相同输入，只改变与times方法直接相关的一项操作。",
      state: "逐步记录for语句造成的对象、控制或边界变化。",
      evidence:
        "定位“在 next 分支跳过状态推进，使循环重复同一个状态”出现时的第一处不同状态。",
    },
    {
      label: "验收break与next",
      input: "恢复基线，再以break与next覆盖正常、错误和重复执行。",
      state:
        "最终状态必须重新满足：每轮都保持处理区间不变量，并让剩余工作量严格减少或显式退出。",
      evidence:
        "交付第6章 循环的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
    },
  ],
  normalTrace: [
    "固定循环的基础的输入和接收者",
    "执行times方法并记录状态",
    "观察for语句的返回或副作用",
    "用break与next核对不变量并复位",
  ],
  failureTrace: [
    "保持第6章 循环的输入与初值不变",
    "仅注入故障：在 next 分支跳过状态推进，使循环重复同一个状态",
    "记录首个对象、控制或边界分岔",
    "拒绝把最终现象误当成根因",
  ],
  invariant: "每轮都保持处理区间不变量，并让剩余工作量严格减少或显式退出。",
  fault: "在 next 分支跳过状态推进，使循环重复同一个状态",
  artifact:
    "第6章 循环的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
} satisfies RubyEvidenceModel;

export function RubLoopsObjectModelLab() {
  return <RubyEvidenceLab model={model} view="object-model" />;
}

export function RubLoopsControlTraceLab() {
  return <RubyEvidenceLab model={model} view="control-trace" />;
}

export function RubLoopsBoundaryProbeLab() {
  return <RubyEvidenceLab model={model} view="boundary-probe" />;
}
