"use client";

import { RubyEvidenceLab, type RubyEvidenceModel } from "./ruby-evidence-lab";

const model = {
  unitId: "tr5-23",
  title: "第23章 检索邮政编码",
  question: "怎样从邮政编码原始数据重建可验证、可切换、可回滚的查询索引？",
  concepts: ["获取邮政编码", "csv库", "sqlite3库", "插入数据", "检索数据"],
  stages: [
    {
      label: "建立获取邮政编码输入",
      input: "固定获取邮政编码所需的原始值、Ruby 版本和调用入口。",
      state: "在执行前记录接收者身份，并声明csv库的允许状态。",
      evidence: "保存第23章 检索邮政编码的初值、参数、编码或资源位置。",
    },
    {
      label: "执行csv库",
      input: "保持相同输入，只改变与csv库直接相关的一项操作。",
      state: "逐步记录sqlite3库造成的对象、控制或边界变化。",
      evidence:
        "定位“直接向在线数据库逐行写入，失败时暴露半完成数据集”出现时的第一处不同状态。",
    },
    {
      label: "验收检索数据",
      input: "恢复基线，再以检索数据覆盖正常、错误和重复执行。",
      state:
        "最终状态必须重新满足：原始数据、模式、事务导入、完整性检查和活动版本形成闭环。",
      evidence:
        "交付第23章 检索邮政编码的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
    },
  ],
  normalTrace: [
    "固定获取邮政编码的输入和接收者",
    "执行csv库并记录状态",
    "观察sqlite3库的返回或副作用",
    "用检索数据核对不变量并复位",
  ],
  failureTrace: [
    "保持第23章 检索邮政编码的输入与初值不变",
    "仅注入故障：直接向在线数据库逐行写入，失败时暴露半完成数据集",
    "记录首个对象、控制或边界分岔",
    "拒绝把最终现象误当成根因",
  ],
  invariant: "原始数据、模式、事务导入、完整性检查和活动版本形成闭环。",
  fault: "直接向在线数据库逐行写入，失败时暴露半完成数据集",
  artifact:
    "第23章 检索邮政编码的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
} satisfies RubyEvidenceModel;

export function RubPostalCodeSearchObjectModelLab() {
  return <RubyEvidenceLab model={model} view="object-model" />;
}

export function RubPostalCodeSearchControlTraceLab() {
  return <RubyEvidenceLab model={model} view="control-trace" />;
}

export function RubPostalCodeSearchBoundaryProbeLab() {
  return <RubyEvidenceLab model={model} view="boundary-probe" />;
}
