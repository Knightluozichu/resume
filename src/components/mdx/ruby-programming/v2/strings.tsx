"use client";

import { RubyEvidenceLab, type RubyEvidenceModel } from "./ruby-evidence-lab";

const model = {
  unitId: "tr5-14",
  title: "第14章 字符串类",
  question: "怎样区分字符串内容、字节、编码、可变性与外部命令结果？",
  concepts: [
    "%Q、%q与Here Document",
    "sprintf方法与反引号命令",
    "字符串的长度与索引",
    "字符串的连接与比较",
    "字符串的分割",
    "换行符的使用方法",
    "字符串的检索与替换",
    "Enumerator对象",
    "连接与reverse",
    "encode方法与nkf库",
  ],
  stages: [
    {
      label: "建立%Q、%q与Here Document输入",
      input: "固定%Q、%q与Here Document所需的原始值、Ruby 版本和调用入口。",
      state:
        "在执行前记录接收者身份，并声明sprintf方法与反引号命令的允许状态。",
      evidence: "保存第14章 字符串类的初值、参数、编码或资源位置。",
    },
    {
      label: "执行sprintf方法与反引号命令",
      input:
        "保持相同输入，只改变与sprintf方法与反引号命令直接相关的一项操作。",
      state: "逐步记录字符串的长度与索引造成的对象、控制或边界变化。",
      evidence:
        "定位“把反引号命令输出当成可信字符串，忽略命令失败和外部编码”出现时的第一处不同状态。",
    },
    {
      label: "验收encode方法与nkf库",
      input: "恢复基线，再以encode方法与nkf库覆盖正常、错误和重复执行。",
      state:
        "最终状态必须重新满足：每次连接、切片、比较和转换都保留明确的编码与数据来源。",
      evidence:
        "交付第14章 字符串类的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
    },
  ],
  normalTrace: [
    "固定%Q、%q与Here Document的输入和接收者",
    "执行sprintf方法与反引号命令并记录状态",
    "观察字符串的长度与索引的返回或副作用",
    "用encode方法与nkf库核对不变量并复位",
  ],
  failureTrace: [
    "保持第14章 字符串类的输入与初值不变",
    "仅注入故障：把反引号命令输出当成可信字符串，忽略命令失败和外部编码",
    "记录首个对象、控制或边界分岔",
    "拒绝把最终现象误当成根因",
  ],
  invariant: "每次连接、切片、比较和转换都保留明确的编码与数据来源。",
  fault: "把反引号命令输出当成可信字符串，忽略命令失败和外部编码",
  artifact:
    "第14章 字符串类的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
} satisfies RubyEvidenceModel;

export function RubStringsObjectModelLab() {
  return <RubyEvidenceLab model={model} view="object-model" />;
}

export function RubStringsControlTraceLab() {
  return <RubyEvidenceLab model={model} view="control-trace" />;
}

export function RubStringsBoundaryProbeLab() {
  return <RubyEvidenceLab model={model} view="boundary-probe" />;
}
