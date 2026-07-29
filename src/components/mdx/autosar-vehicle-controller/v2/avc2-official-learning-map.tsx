"use client";

import {
  AutosarArtifactLab,
  type AutosarArtifactModel,
} from "./autosar-artifact-lab";

const model = {
  unitId: "learning-map",
  title: "《AUTOSAR规范与车用控制器软件开发》权威学习地图",
  decision:
    "把十章内容组织成需求、组件、系统、ECU、证据五个连续工件域，并在每次工具转换处保留可复核输入输出",
  invariant: "任一生成物都能追溯到上一层已批准工件、固定规范版本和责任所有者",
  fault: "跳过系统映射，直接把软件组件端口手工接到 ECU 实现并声称全书链路闭合",
  evidence:
    "需求基线、ARXML 版本、映射报告、生成日志、二进制标识、测试轨迹和发布签核",
  concepts: ["需求闭环", "SWC 合同", "系统映射", "ECU 实现", "验证与发布"],
  pipeline: [
    {
      label: "需求",
      artifact: "A/B 车灯行为、时序与故障反应",
    },
    {
      label: "SWC",
      artifact: "端口、接口、内部行为与 runnable",
    },
    {
      label: "系统",
      artifact: "Composition、通信与 ECU 映射",
    },
    {
      label: "ECU",
      artifact: "RTE、BSW、OS、MCAL 与可执行文件",
    },
    {
      label: "证据",
      artifact: "重放、故障注入、版本与发布清单",
    },
  ],
  scenarios: [
    {
      label: "正向学习路线",
      input: "从车灯需求开始，逐章冻结工件后再进入下一层",
      expected: "十章和参考文献均落到可追溯工件，最终可从需求重放到硬件输出",
    },
    {
      label: "已有工具经验",
      input: "保留需求与版本门禁，跳过界面熟悉但不跳过工件验证",
      expected: "学习者可压缩操作训练，却仍提交系统映射、生成和验证证据",
    },
  ],
} satisfies AutosarArtifactModel;

export function Avc2OfficialLearningMapArtifactLab() {
  return <AutosarArtifactLab model={model} view="artifact" />;
}

export function Avc2OfficialLearningMapTraceLab() {
  return <AutosarArtifactLab model={model} view="trace" />;
}

export function Avc2OfficialLearningMapFaultLab() {
  return <AutosarArtifactLab model={model} view="fault" />;
}
