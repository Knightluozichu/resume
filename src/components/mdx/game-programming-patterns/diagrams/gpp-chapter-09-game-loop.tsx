import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "9. Game Loop";
const focus = "把游戏时间推进与输入到达、处理器速度和渲染频率解耦";
const stages = [
  "采集时间",
  "处理输入",
  "累积步长",
  "更新模拟",
  "渲染插值"
];
const nodes = [
  {
    "label": "9. Game Loop",
    "mechanism": "9. Game Loop 把本章机制落到一个具体设计坐标：循环非阻塞处理输入，按时间步更新状态并渲染，可用累积器协调频率，并以“相同真实时长内的模拟推进量与机器速度无关”作为通过条件。",
    "probe": "检查真实时间、模拟时间、更新次数、插值比例与帧分位数"
  },
  {
    "label": "Intent",
    "mechanism": "Intent 把“每次循环固定移动量会让更快处理器上的游戏运行得更快”压缩成可检验的问题合同，先界定目标而不预设类图。",
    "probe": "检查真实时间、模拟时间、更新次数、插值比例与帧分位数"
  },
  {
    "label": "Motivation",
    "mechanism": "Motivation 用具体游戏场景暴露“每次循环固定移动量会让更快处理器上的游戏运行得更快”，并保存不用模式时的失败基线。",
    "probe": "检查真实时间、模拟时间、更新次数、插值比例与帧分位数"
  },
  {
    "label": "Interview with a CPU",
    "mechanism": "Interview with a CPU 把本章机制落到一个具体设计坐标：循环非阻塞处理输入，按时间步更新状态并渲染，可用累积器协调频率，并以“相同真实时长内的模拟推进量与机器速度无关”作为通过条件。",
    "probe": "检查真实时间、模拟时间、更新次数、插值比例与帧分位数"
  },
  {
    "label": "Event loops",
    "mechanism": "Event loops 把本章机制落到一个具体设计坐标：循环非阻塞处理输入，按时间步更新状态并渲染，可用累积器协调频率，并以“相同真实时长内的模拟推进量与机器速度无关”作为通过条件。",
    "probe": "检查真实时间、模拟时间、更新次数、插值比例与帧分位数"
  },
  {
    "label": "A world out of time",
    "mechanism": "A world out of time 把本章机制落到一个具体设计坐标：循环非阻塞处理输入，按时间步更新状态并渲染，可用累积器协调频率，并以“相同真实时长内的模拟推进量与机器速度无关”作为通过条件。",
    "probe": "检查真实时间、模拟时间、更新次数、插值比例与帧分位数"
  },
  {
    "label": "Seconds per second",
    "mechanism": "Seconds per second 把本章机制落到一个具体设计坐标：循环非阻塞处理输入，按时间步更新状态并渲染，可用累积器协调频率，并以“相同真实时长内的模拟推进量与机器速度无关”作为通过条件。",
    "probe": "检查真实时间、模拟时间、更新次数、插值比例与帧分位数"
  },
  {
    "label": "The Pattern",
    "mechanism": "The Pattern 从例子抽离最小参与者与因果关系：循环非阻塞处理输入，按时间步更新状态并渲染，可用累积器协调频率。",
    "probe": "检查真实时间、模拟时间、更新次数、插值比例与帧分位数"
  },
  {
    "label": "When to Use It",
    "mechanism": "When to Use It 要求变化压力已经出现，并且候选机制能守住“相同真实时长内的模拟推进量与机器速度无关”。",
    "probe": "检查真实时间、模拟时间、更新次数、插值比例与帧分位数"
  },
  {
    "label": "Keep in Mind",
    "mechanism": "Keep in Mind 把额外间接层、内存、时序和工具成本写入决定，尤其检查“长帧让累积器无限追赶形成死亡螺旋”。",
    "probe": "检查真实时间、模拟时间、更新次数、插值比例与帧分位数"
  },
  {
    "label": "You may need to coordinate with the platform’s event loop",
    "mechanism": "You may need to coordinate with the platform’s event loop 把本章机制落到一个具体设计坐标：循环非阻塞处理输入，按时间步更新状态并渲染，可用累积器协调频率，并以“相同真实时长内的模拟推进量与机器速度无关”作为通过条件。",
    "probe": "检查真实时间、模拟时间、更新次数、插值比例与帧分位数"
  },
  {
    "label": "Sample Code",
    "mechanism": "Sample Code 只演示循环非阻塞处理输入，按时间步更新状态并渲染，可用累积器协调频率的最小骨架；生产迁移还需补齐所有权、错误与测试合同。",
    "probe": "检查真实时间、模拟时间、更新次数、插值比例与帧分位数"
  },
  {
    "label": "Run, run as fast as you can",
    "mechanism": "Run, run as fast as you can 聚焦运行代价，固定场景后用真实时间、模拟时间、更新次数、插值比例与帧分位数定位首个超限点，不能以模式名称推断快慢。",
    "probe": "检查真实时间、模拟时间、更新次数、插值比例与帧分位数"
  },
  {
    "label": "Take a little nap",
    "mechanism": "Take a little nap 把本章机制落到一个具体设计坐标：循环非阻塞处理输入，按时间步更新状态并渲染，可用累积器协调频率，并以“相同真实时长内的模拟推进量与机器速度无关”作为通过条件。",
    "probe": "检查真实时间、模拟时间、更新次数、插值比例与帧分位数"
  },
  {
    "label": "One small step, one giant step",
    "mechanism": "One small step, one giant step 把本章机制落到一个具体设计坐标：循环非阻塞处理输入，按时间步更新状态并渲染，可用累积器协调频率，并以“相同真实时长内的模拟推进量与机器速度无关”作为通过条件。",
    "probe": "检查真实时间、模拟时间、更新次数、插值比例与帧分位数"
  },
  {
    "label": "Play catch up",
    "mechanism": "Play catch up 把本章机制落到一个具体设计坐标：循环非阻塞处理输入，按时间步更新状态并渲染，可用累积器协调频率，并以“相同真实时长内的模拟推进量与机器速度无关”作为通过条件。",
    "probe": "检查真实时间、模拟时间、更新次数、插值比例与帧分位数"
  },
  {
    "label": "Stuck in the middle",
    "mechanism": "Stuck in the middle 把本章机制落到一个具体设计坐标：循环非阻塞处理输入，按时间步更新状态并渲染，可用累积器协调频率，并以“相同真实时长内的模拟推进量与机器速度无关”作为通过条件。",
    "probe": "检查真实时间、模拟时间、更新次数、插值比例与帧分位数"
  },
  {
    "label": "Design Decisions",
    "mechanism": "Design Decisions 围绕创建、所有权、通信、粒度和失败恢复比较方案，并以真实时间、模拟时间、更新次数、插值比例与帧分位数复核。",
    "probe": "检查真实时间、模拟时间、更新次数、插值比例与帧分位数"
  },
  {
    "label": "Do you own the game loop, or does the platform?",
    "mechanism": "Do you own the game loop, or does the platform? 是设计分叉题；回答必须说明选择怎样改变循环非阻塞处理输入，按时间步更新状态并渲染，可用累积器协调频率，以及哪条反例会推翻选择。",
    "probe": "检查真实时间、模拟时间、更新次数、插值比例与帧分位数"
  },
  {
    "label": "How do you manage power consumption?",
    "mechanism": "How do you manage power consumption? 是设计分叉题；回答必须说明选择怎样改变循环非阻塞处理输入，按时间步更新状态并渲染，可用累积器协调频率，以及哪条反例会推翻选择。",
    "probe": "检查真实时间、模拟时间、更新次数、插值比例与帧分位数"
  },
  {
    "label": "How do you control gameplay speed?",
    "mechanism": "How do you control gameplay speed? 是设计分叉题；回答必须说明选择怎样改变循环非阻塞处理输入，按时间步更新状态并渲染，可用累积器协调频率，以及哪条反例会推翻选择。",
    "probe": "检查真实时间、模拟时间、更新次数、插值比例与帧分位数"
  },
  {
    "label": "See Also",
    "mechanism": "See Also 用相邻模式做替代和组合比较；只有解决不同变化轴时才允许叠加。",
    "probe": "检查真实时间、模拟时间、更新次数、插值比例与帧分位数"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "每帧固定移动",
  "candidateLabel": "时间步循环",
  "unit": "ms偏差",
  "baselineBase": 16,
  "baselineSlope": 7,
  "candidateBase": 8,
  "candidateSlope": 1.6,
  "faultPenalty": 15,
  "invariant": "相同真实时长内的模拟推进量与机器速度无关",
  "fault": "长帧让累积器无限追赶形成死亡螺旋",
  "evidence": "真实时间、模拟时间、更新次数、插值比例与帧分位数"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppChapter09GameLoopMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppChapter09GameLoopExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppChapter09GameLoopEvidenceLab() {
  return <GppFailureLab {...props} />;
}
