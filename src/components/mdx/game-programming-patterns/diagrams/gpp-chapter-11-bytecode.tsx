import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "11. Bytecode";
const focus = "把行为编码为受控指令序列，由栈式虚拟机逐条解释";
const stages = [
  "解析内容",
  "生成指令",
  "验证字节码",
  "解释执行",
  "限制预算"
];
const nodes = [
  {
    "label": "11. Bytecode",
    "mechanism": "11. Bytecode 把本章机制落到一个具体设计坐标：前端生成字节码，虚拟机用受限指令集和栈组合高层行为，并以“任意输入程序都不能越过指令、栈和资源预算”作为通过条件。",
    "probe": "检查指令指针、栈深、操作数、预算计数与错误位置"
  },
  {
    "label": "Intent",
    "mechanism": "Intent 把“底层宿主语言编译慢且权限过大，不适合频繁制作大量内容行为”压缩成可检验的问题合同，先界定目标而不预设类图。",
    "probe": "检查指令指针、栈深、操作数、预算计数与错误位置"
  },
  {
    "label": "Motivation",
    "mechanism": "Motivation 用具体游戏场景暴露“底层宿主语言编译慢且权限过大，不适合频繁制作大量内容行为”，并保存不用模式时的失败基线。",
    "probe": "检查指令指针、栈深、操作数、预算计数与错误位置"
  },
  {
    "label": "Spell fight!",
    "mechanism": "Spell fight! 把本章机制落到一个具体设计坐标：前端生成字节码，虚拟机用受限指令集和栈组合高层行为，并以“任意输入程序都不能越过指令、栈和资源预算”作为通过条件。",
    "probe": "检查指令指针、栈深、操作数、预算计数与错误位置"
  },
  {
    "label": "Data > code",
    "mechanism": "Data > code 把本章机制落到一个具体设计坐标：前端生成字节码，虚拟机用受限指令集和栈组合高层行为，并以“任意输入程序都不能越过指令、栈和资源预算”作为通过条件。",
    "probe": "检查指令指针、栈深、操作数、预算计数与错误位置"
  },
  {
    "label": "The Interpreter pattern",
    "mechanism": "The Interpreter pattern 把本章机制落到一个具体设计坐标：前端生成字节码，虚拟机用受限指令集和栈组合高层行为，并以“任意输入程序都不能越过指令、栈和资源预算”作为通过条件。",
    "probe": "检查指令指针、栈深、操作数、预算计数与错误位置"
  },
  {
    "label": "Machine code, virtually",
    "mechanism": "Machine code, virtually 把本章机制落到一个具体设计坐标：前端生成字节码，虚拟机用受限指令集和栈组合高层行为，并以“任意输入程序都不能越过指令、栈和资源预算”作为通过条件。",
    "probe": "检查指令指针、栈深、操作数、预算计数与错误位置"
  },
  {
    "label": "The Pattern",
    "mechanism": "The Pattern 从例子抽离最小参与者与因果关系：前端生成字节码，虚拟机用受限指令集和栈组合高层行为。",
    "probe": "检查指令指针、栈深、操作数、预算计数与错误位置"
  },
  {
    "label": "When to Use It",
    "mechanism": "When to Use It 要求变化压力已经出现，并且候选机制能守住“任意输入程序都不能越过指令、栈和资源预算”。",
    "probe": "检查指令指针、栈深、操作数、预算计数与错误位置"
  },
  {
    "label": "Keep in Mind",
    "mechanism": "Keep in Mind 把额外间接层、内存、时序和工具成本写入决定，尤其检查“畸形字节码造成栈下溢或无限执行”。",
    "probe": "检查指令指针、栈深、操作数、预算计数与错误位置"
  },
  {
    "label": "You’ll need a front-end",
    "mechanism": "You’ll need a front-end 把本章机制落到一个具体设计坐标：前端生成字节码，虚拟机用受限指令集和栈组合高层行为，并以“任意输入程序都不能越过指令、栈和资源预算”作为通过条件。",
    "probe": "检查指令指针、栈深、操作数、预算计数与错误位置"
  },
  {
    "label": "You’ll miss your debugger",
    "mechanism": "You’ll miss your debugger 把本章机制落到一个具体设计坐标：前端生成字节码，虚拟机用受限指令集和栈组合高层行为，并以“任意输入程序都不能越过指令、栈和资源预算”作为通过条件。",
    "probe": "检查指令指针、栈深、操作数、预算计数与错误位置"
  },
  {
    "label": "Sample Code",
    "mechanism": "Sample Code 只演示前端生成字节码，虚拟机用受限指令集和栈组合高层行为的最小骨架；生产迁移还需补齐所有权、错误与测试合同。",
    "probe": "检查指令指针、栈深、操作数、预算计数与错误位置"
  },
  {
    "label": "A magical API",
    "mechanism": "A magical API 把本章机制落到一个具体设计坐标：前端生成字节码，虚拟机用受限指令集和栈组合高层行为，并以“任意输入程序都不能越过指令、栈和资源预算”作为通过条件。",
    "probe": "检查指令指针、栈深、操作数、预算计数与错误位置"
  },
  {
    "label": "A magical instruction set",
    "mechanism": "A magical instruction set 把本章机制落到一个具体设计坐标：前端生成字节码，虚拟机用受限指令集和栈组合高层行为，并以“任意输入程序都不能越过指令、栈和资源预算”作为通过条件。",
    "probe": "检查指令指针、栈深、操作数、预算计数与错误位置"
  },
  {
    "label": "A stack machine",
    "mechanism": "A stack machine 把本章机制落到一个具体设计坐标：前端生成字节码，虚拟机用受限指令集和栈组合高层行为，并以“任意输入程序都不能越过指令、栈和资源预算”作为通过条件。",
    "probe": "检查指令指针、栈深、操作数、预算计数与错误位置"
  },
  {
    "label": "Behavior = composition",
    "mechanism": "Behavior = composition 把本章机制落到一个具体设计坐标：前端生成字节码，虚拟机用受限指令集和栈组合高层行为，并以“任意输入程序都不能越过指令、栈和资源预算”作为通过条件。",
    "probe": "检查指令指针、栈深、操作数、预算计数与错误位置"
  },
  {
    "label": "A virtual machine",
    "mechanism": "A virtual machine 把本章机制落到一个具体设计坐标：前端生成字节码，虚拟机用受限指令集和栈组合高层行为，并以“任意输入程序都不能越过指令、栈和资源预算”作为通过条件。",
    "probe": "检查指令指针、栈深、操作数、预算计数与错误位置"
  },
  {
    "label": "Spellcasting tools",
    "mechanism": "Spellcasting tools 把本章机制落到一个具体设计坐标：前端生成字节码，虚拟机用受限指令集和栈组合高层行为，并以“任意输入程序都不能越过指令、栈和资源预算”作为通过条件。",
    "probe": "检查指令指针、栈深、操作数、预算计数与错误位置"
  },
  {
    "label": "Design Decisions",
    "mechanism": "Design Decisions 围绕创建、所有权、通信、粒度和失败恢复比较方案，并以指令指针、栈深、操作数、预算计数与错误位置复核。",
    "probe": "检查指令指针、栈深、操作数、预算计数与错误位置"
  },
  {
    "label": "How do instructions access the stack?",
    "mechanism": "How do instructions access the stack? 是设计分叉题；回答必须说明选择怎样改变前端生成字节码，虚拟机用受限指令集和栈组合高层行为，以及哪条反例会推翻选择。",
    "probe": "检查指令指针、栈深、操作数、预算计数与错误位置"
  },
  {
    "label": "What instructions do you have?",
    "mechanism": "What instructions do you have? 是设计分叉题；回答必须说明选择怎样改变前端生成字节码，虚拟机用受限指令集和栈组合高层行为，以及哪条反例会推翻选择。",
    "probe": "检查指令指针、栈深、操作数、预算计数与错误位置"
  },
  {
    "label": "How are values represented?",
    "mechanism": "How are values represented? 是设计分叉题；回答必须说明选择怎样改变前端生成字节码，虚拟机用受限指令集和栈组合高层行为，以及哪条反例会推翻选择。",
    "probe": "检查指令指针、栈深、操作数、预算计数与错误位置"
  },
  {
    "label": "How is the bytecode generated?",
    "mechanism": "How is the bytecode generated? 是设计分叉题；回答必须说明选择怎样改变前端生成字节码，虚拟机用受限指令集和栈组合高层行为，以及哪条反例会推翻选择。",
    "probe": "检查指令指针、栈深、操作数、预算计数与错误位置"
  },
  {
    "label": "See Also",
    "mechanism": "See Also 用相邻模式做替代和组合比较；只有解决不同变化轴时才允许叠加。",
    "probe": "检查指令指针、栈深、操作数、预算计数与错误位置"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "宿主硬编码",
  "candidateLabel": "受控字节码",
  "unit": "迭代分钟",
  "baselineBase": 18,
  "baselineSlope": 7,
  "candidateBase": 11,
  "candidateSlope": 1.8,
  "faultPenalty": 16,
  "invariant": "任意输入程序都不能越过指令、栈和资源预算",
  "fault": "畸形字节码造成栈下溢或无限执行",
  "evidence": "指令指针、栈深、操作数、预算计数与错误位置"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppChapter11BytecodeMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppChapter11BytecodeExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppChapter11BytecodeEvidenceLab() {
  return <GppFailureLab {...props} />;
}
