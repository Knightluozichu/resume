"use client";

import {
  FrontendPipelineEvidenceLab,
  type FrontendPipelineEvidenceModel,
} from "./frontend-pipeline-evidence-lab";

const model = {
  unitId: "feng-unit-06",
  title: "第 6 章 工作流",
  question: "怎样消除二次构建，让测试、预发和生产验证的是同一个产物身份？",
  concepts: [
    "第6章 工作流",
    "6.1 本地工作流",
    "6.1.1 二次构建的隐患",
    "6.1.2 代码分离与测试沙箱",
    "6.2 云平台工作流",
    "6.2.1 GitFlow与版本管理",
    "6.2.2 WebHook与自动构建",
    "6.3 持续集成与持续交付",
    "6.4 总结",
  ],
  nodeCards: [
    {
      name: "Git事件",
      input: "“第 6 章 工作流”的Git事件读取已版本化需求、模板或源码。",
      action: "按提交与分支触发处理Git事件，不得读取未声明的可变输入。",
      output: "Git事件输出带版本、哈希或运行ID的工程证据，供下一节点验证。",
      gate: "若发生“测试通过后在生产环境重新安装依赖并构建，导致上线对象不是被验证对象”，Git事件必须停止而非越过“每个环境只改变外部配置，不重新解释源代码或重新生成应用产物”。",
    },
    {
      name: "WebHook",
      input: "“第 6 章 工作流”的WebHook读取上游已验证的状态与产物。",
      action: "按一次构建和测试处理WebHook，不得读取未声明的可变输入。",
      output: "WebHook输出带版本、哈希或运行ID的工程证据，供下一节点验证。",
      gate: "若发生“测试通过后在生产环境重新安装依赖并构建，导致上线对象不是被验证对象”，WebHook必须停止而非越过“每个环境只改变外部配置，不重新解释源代码或重新生成应用产物”。",
    },
    {
      name: "CI运行",
      input: "“第 6 章 工作流”的CI运行读取上游已验证的状态与产物。",
      action: "按产物晋级与持续交付处理CI运行，不得读取未声明的可变输入。",
      output: "CI运行输出带版本、哈希或运行ID的工程证据，供下一节点验证。",
      gate: "若发生“测试通过后在生产环境重新安装依赖并构建，导致上线对象不是被验证对象”，CI运行必须停止而非越过“每个环境只改变外部配置，不重新解释源代码或重新生成应用产物”。",
    },
    {
      name: "产物仓库",
      input: "“第 6 章 工作流”的产物仓库读取上游已验证的状态与产物。",
      action: "按提交与分支触发处理产物仓库，不得读取未声明的可变输入。",
      output: "产物仓库输出带版本、哈希或运行ID的工程证据，供下一节点验证。",
      gate: "若发生“测试通过后在生产环境重新安装依赖并构建，导致上线对象不是被验证对象”，产物仓库必须停止而非越过“每个环境只改变外部配置，不重新解释源代码或重新生成应用产物”。",
    },
    {
      name: "环境晋级",
      input: "“第 6 章 工作流”的环境晋级读取上游已验证的状态与产物。",
      action: "按一次构建和测试处理环境晋级，不得读取未声明的可变输入。",
      output: "环境晋级输出带版本、哈希或运行ID的工程证据，供下一节点验证。",
      gate: "若发生“测试通过后在生产环境重新安装依赖并构建，导致上线对象不是被验证对象”，环境晋级必须停止而非越过“每个环境只改变外部配置，不重新解释源代码或重新生成应用产物”。",
    },
  ],
  normalTrace: [
    "为“第 6 章 工作流”记录源码提交、依赖锁、配置版本和责任边界",
    "执行提交与分支触发，保存输入与产生的工程状态",
    "推进一次构建和测试，核对日志、清单和产物身份",
    "完成产物晋级与持续交付，交付提交SHA、触发事件、依赖锁、测试结果、产物哈希、签名或校验、环境配置、审批与晋级记录。",
  ],
  failureTrace: [
    "复用“第 6 章 工作流”相同的提交、依赖、配置和外部服务",
    "只注入工程故障：测试通过后在生产环境重新安装依赖并构建，导致上线对象不是被验证对象",
    "沿项目创建到交付方向记录最早发生身份或契约偏离的阶段",
    "依据“每个环境只改变外部配置，不重新解释源代码或重新生成应用产物”拒绝运行并恢复已验证状态",
  ],
  invariant: "每个环境只改变外部配置，不重新解释源代码或重新生成应用产物",
  fault: "测试通过后在生产环境重新安装依赖并构建，导致上线对象不是被验证对象",
  artifact:
    "提交SHA、触发事件、依赖锁、测试结果、产物哈希、签名或校验、环境配置、审批与晋级记录。",
  gates: [
    {
      label: "输入锁定",
      detail: "“第 6 章 工作流”的提交、模板、依赖和配置都有版本。",
    },
    {
      label: "确定性构建",
      detail: "“第 6 章 工作流”不读取时间戳、浮动网络内容或未声明环境。",
    },
    {
      label: "产物完整性",
      detail: "“第 6 章 工作流”的清单、哈希、测试和部署对象保持一致。",
    },
    {
      label: "回滚准备",
      detail: "“第 6 章 工作流”可以切回先前已验证的入口和不可变产物。",
    },
  ],
} satisfies FrontendPipelineEvidenceModel;

export function Feng06WorkflowArchitectureLab() {
  return <FrontendPipelineEvidenceLab model={model} view="architecture" />;
}

export function Feng06WorkflowExecutionTraceLab() {
  return <FrontendPipelineEvidenceLab model={model} view="execution-trace" />;
}

export function Feng06WorkflowReleaseGateLab() {
  return <FrontendPipelineEvidenceLab model={model} view="release-gate" />;
}
