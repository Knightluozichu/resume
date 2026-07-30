"use client";

import {
  CompilerEvidenceLab,
  type CompilerEvidenceModel,
} from "@/components/mdx/dragon-book-compilers/v2/compiler-evidence-lab";

const model = {
  unitId: "tbc-unit-22",
  title: "附录 Tiger语言参考手册",
  question: "语言参考中的每条静态与动态规则怎样落到测试、AST、类型和运行时？",
  concepts: [
    "附录 Tiger语言参考手册",
    "A.1 词法问题",
    "A.2 声明",
    "A.3 变量和表达式",
    "A.4 标准库",
  ],
  invariant:
    "附录 Tiger语言参考手册的C模块接口、数据结构、状态变换、输出语义与测试始终一致",
  fault: "标准库签名与编译器内建声明不一致",
  artifact: "语言规则—测试矩阵、AST/类型快照、运行结果与诊断",
  stages: [
    {
      name: "附录 Tiger语言参考手册 · C模块与输入",
      input:
        "在Tiger C实现轨道中复现“附录 Tiger语言参考手册”的输入、状态、变换与验证",
      operation:
        "冻结Tiger语言规范、测试与实现一致性所需的C接口、源程序、规则、数据结构和版本",
      output: "附录 Tiger语言参考手册的模块合同、输入快照与所有权表",
      check:
        "附录 Tiger语言参考手册的类型、所有权、源位置、名字和接口布局没有错位",
    },
    {
      name: "附录 Tiger语言参考手册 · 算法与状态",
      input: "附录 Tiger语言参考手册的冻结模块和输入",
      operation:
        "执行把Tiger词法、声明、变量/表达式与标准库变成编译器前后端共同语言合同的最小算法并保存每一步状态",
      output: "附录 Tiger语言参考手册的参考轨迹、故障轨迹与首个状态分岔",
      check:
        "附录 Tiger语言参考手册每一步可由同一C接口、输入、规则和执行顺序复算",
    },
    {
      name: "附录 Tiger语言参考手册 · 输出与整合",
      input: "附录 Tiger语言参考手册的中间状态、输出与下游模块合同",
      operation: "比较变换前后AST/IR/汇编/运行时状态和跨模块传递",
      output: "附录 Tiger语言参考手册的前后差、接口谱系与恢复路径",
      check:
        "附录 Tiger语言参考手册没有把单模块通过或单一样例正确当作端到端正确性",
    },
    {
      name: "附录 Tiger语言参考手册 · 独立验证",
      input: "附录 Tiger语言参考手册的冻结候选与黄金测试、差分执行或不变量检查",
      operation: "重放预测、单故障、恢复和不适用边界",
      output: "附录 Tiger语言参考手册的接受、回退或拒绝理由",
      check:
        "附录 Tiger语言参考手册满足“附录 Tiger语言参考手册的C模块接口、数据结构、状态变换、输出语义与测试始终一致”",
    },
  ],
  cases: [
    {
      name: "附录 Tiger语言参考手册 · 基线",
      setup:
        "固定在Tiger C实现轨道中复现“附录 Tiger语言参考手册”的输入、状态、变换与验证的C接口、输入、版本、预算和顺序",
      prediction:
        "附录 Tiger语言参考手册的参考轨迹应持续满足“附录 Tiger语言参考手册的C模块接口、数据结构、状态变换、输出语义与测试始终一致”",
      boundary: "附录 Tiger语言参考手册只回答本页正式坐标和C实现轨道内的问题",
    },
    {
      name: "附录 Tiger语言参考手册 · 单故障",
      setup: "保持其余条件不变，只注入“标准库签名与编译器内建声明不一致”",
      prediction:
        "附录 Tiger语言参考手册应出现可定位的首个状态分岔，而不是只在末端输出异常",
      boundary:
        "附录 Tiger语言参考手册的故障结论不能外推到未运行的语言特性、目标机或程序",
    },
    {
      name: "附录 Tiger语言参考手册 · 恢复",
      setup:
        "撤销故障并从同一快照重放在Tiger C实现轨道中复现“附录 Tiger语言参考手册”的输入、状态、变换与验证",
      prediction: "附录 Tiger语言参考手册的状态、整合测试和交付证据应恢复基线",
      boundary:
        "附录 Tiger语言参考手册若不能复现恢复结果，就不能把异常归因给单一故障",
    },
  ],
  referenceTrace: [
    "附录 Tiger语言参考手册参考步骤1：冻结Tiger语言规范、测试与实现一致性所需的C接口、源程序、规则、数据结构和版本；保存附录 Tiger语言参考手册的模块合同、输入快照与所有权表。",
    "附录 Tiger语言参考手册参考步骤2：执行把Tiger词法、声明、变量/表达式与标准库变成编译器前后端共同语言合同的最小算法并保存每一步状态；保存附录 Tiger语言参考手册的参考轨迹、故障轨迹与首个状态分岔。",
    "附录 Tiger语言参考手册参考步骤3：比较变换前后AST/IR/汇编/运行时状态和跨模块传递；保存附录 Tiger语言参考手册的前后差、接口谱系与恢复路径。",
    "附录 Tiger语言参考手册参考步骤4：重放预测、单故障、恢复和不适用边界；保存附录 Tiger语言参考手册的接受、回退或拒绝理由。",
  ],
  faultTrace: [
    "附录 Tiger语言参考手册故障步骤1：保持在Tiger C实现轨道中复现“附录 Tiger语言参考手册”的输入、状态、变换与验证不变，检查附录 Tiger语言参考手册的模块合同、输入快照与所有权表如何受单一故障传播。",
    "附录 Tiger语言参考手册故障步骤2：只注入“标准库签名与编译器内建声明不一致”，记录首个偏离“附录 Tiger语言参考手册每一步可由同一C接口、输入、规则和执行顺序复算”的状态。",
    "附录 Tiger语言参考手册故障步骤3：保持附录 Tiger语言参考手册的中间状态、输出与下游模块合同不变，检查附录 Tiger语言参考手册的前后差、接口谱系与恢复路径如何受单一故障传播。",
    "附录 Tiger语言参考手册故障步骤4：保持附录 Tiger语言参考手册的冻结候选与黄金测试、差分执行或不变量检查不变，检查附录 Tiger语言参考手册的接受、回退或拒绝理由如何受单一故障传播。",
  ],
  gates: [
    {
      label: "原版轨道与译本边界",
      detail:
        "附录 Tiger语言参考手册区分作者C/Java/ML三条轨道、Cambridge C版、中文修订版与本站C轨道独立重写。",
    },
    {
      label: "C接口、状态与所有权",
      detail:
        "附录 Tiger语言参考手册的头文件、实现、数据结构、内存所有权、源位置和中间状态可复算。",
    },
    {
      label: "变换、整合与恢复",
      detail:
        "附录 Tiger语言参考手册的规则、状态、跨模块接口、前后表示、诊断和恢复路径已归档。",
    },
    {
      label: "端到端语义与边界",
      detail:
        "附录 Tiger语言参考手册以黄金测试或差分执行复核“附录 Tiger语言参考手册的C模块接口、数据结构、状态变换、输出语义与测试始终一致”，并报告“标准库签名与编译器内建声明不一致”的恢复结果。",
    },
  ],
} as const satisfies CompilerEvidenceModel;

export function TbcAppendixTigerLanguageReferencePipelineContractLab() {
  return <CompilerEvidenceLab model={model} view="pipeline-contract" />;
}

export function TbcAppendixTigerLanguageReferenceStateTraceLab() {
  return <CompilerEvidenceLab model={model} view="state-trace" />;
}

export function TbcAppendixTigerLanguageReferenceVerificationGateLab() {
  return <CompilerEvidenceLab model={model} view="verification-gate" />;
}
