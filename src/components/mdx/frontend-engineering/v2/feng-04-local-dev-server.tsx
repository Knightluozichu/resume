"use client";

import {
  FrontendPipelineEvidenceLab,
  type FrontendPipelineEvidenceModel,
} from "./frontend-pipeline-evidence-lab";

const model = {
  unitId: "feng-unit-04",
  title: "第 4 章 本地开发服务器",
  question:
    "怎样在不完整重载的情况下更新模块，又证明状态、接口和服务端渲染没有被本地便利掩盖？",
  concepts: [
    "第4章 本地开发服务器",
    "4.1 本地开发服务器解决的问题",
    "4.2 动态构建",
    "4.2.1 webpack-dev-middleware",
    "4.2.2 Livereload和HMR",
    "4.3 Mock服务",
    "4.3.1 Mock的必要前提和发展进程",
    "4.3.2 异步数据接口",
    "4.3.3 SSR",
    "4.4 总结",
  ],
  nodeCards: [
    {
      name: "文件监听",
      input: "“第 4 章 本地开发服务器”的文件监听读取已版本化需求、模板或源码。",
      action: "按触发增量编译处理文件监听，不得读取未声明的可变输入。",
      output: "文件监听输出带版本、哈希或运行ID的工程证据，供下一节点验证。",
      gate: "若发生“Mock返回生产不可能出现的数据形状，HMR又保留旧状态，使缺陷只在部署后出现”，文件监听必须停止而非越过“本地路径使用与生产一致的接口和构建语义，HMR失败能退回完整刷新”。",
    },
    {
      name: "内存编译",
      input: "“第 4 章 本地开发服务器”的内存编译读取上游已验证的状态与产物。",
      action: "按应用HMR或完整刷新处理内存编译，不得读取未声明的可变输入。",
      output: "内存编译输出带版本、哈希或运行ID的工程证据，供下一节点验证。",
      gate: "若发生“Mock返回生产不可能出现的数据形状，HMR又保留旧状态，使缺陷只在部署后出现”，内存编译必须停止而非越过“本地路径使用与生产一致的接口和构建语义，HMR失败能退回完整刷新”。",
    },
    {
      name: "更新清单",
      input: "“第 4 章 本地开发服务器”的更新清单读取上游已验证的状态与产物。",
      action: "按核对Mock、接口与SSR处理更新清单，不得读取未声明的可变输入。",
      output: "更新清单输出带版本、哈希或运行ID的工程证据，供下一节点验证。",
      gate: "若发生“Mock返回生产不可能出现的数据形状，HMR又保留旧状态，使缺陷只在部署后出现”，更新清单必须停止而非越过“本地路径使用与生产一致的接口和构建语义，HMR失败能退回完整刷新”。",
    },
    {
      name: "浏览器状态",
      input: "“第 4 章 本地开发服务器”的浏览器状态读取上游已验证的状态与产物。",
      action: "按触发增量编译处理浏览器状态，不得读取未声明的可变输入。",
      output: "浏览器状态输出带版本、哈希或运行ID的工程证据，供下一节点验证。",
      gate: "若发生“Mock返回生产不可能出现的数据形状，HMR又保留旧状态，使缺陷只在部署后出现”，浏览器状态必须停止而非越过“本地路径使用与生产一致的接口和构建语义，HMR失败能退回完整刷新”。",
    },
    {
      name: "接口与SSR",
      input: "“第 4 章 本地开发服务器”的接口与SSR读取上游已验证的状态与产物。",
      action: "按应用HMR或完整刷新处理接口与SSR，不得读取未声明的可变输入。",
      output: "接口与SSR输出带版本、哈希或运行ID的工程证据，供下一节点验证。",
      gate: "若发生“Mock返回生产不可能出现的数据形状，HMR又保留旧状态，使缺陷只在部署后出现”，接口与SSR必须停止而非越过“本地路径使用与生产一致的接口和构建语义，HMR失败能退回完整刷新”。",
    },
  ],
  normalTrace: [
    "为“第 4 章 本地开发服务器”记录源码提交、依赖锁、配置版本和责任边界",
    "执行触发增量编译，保存输入与产生的工程状态",
    "推进应用HMR或完整刷新，核对日志、清单和产物身份",
    "完成核对Mock、接口与SSR，交付文件变更、编译哈希、更新模块、接受边界、保留状态、刷新回退、接口契约和SSR结果。",
  ],
  failureTrace: [
    "复用“第 4 章 本地开发服务器”相同的提交、依赖、配置和外部服务",
    "只注入工程故障：Mock返回生产不可能出现的数据形状，HMR又保留旧状态，使缺陷只在部署后出现",
    "沿项目创建到交付方向记录最早发生身份或契约偏离的阶段",
    "依据“本地路径使用与生产一致的接口和构建语义，HMR失败能退回完整刷新”拒绝运行并恢复已验证状态",
  ],
  invariant: "本地路径使用与生产一致的接口和构建语义，HMR失败能退回完整刷新",
  fault:
    "Mock返回生产不可能出现的数据形状，HMR又保留旧状态，使缺陷只在部署后出现",
  artifact:
    "文件变更、编译哈希、更新模块、接受边界、保留状态、刷新回退、接口契约和SSR结果。",
  gates: [
    {
      label: "输入锁定",
      detail: "“第 4 章 本地开发服务器”的提交、模板、依赖和配置都有版本。",
    },
    {
      label: "确定性构建",
      detail:
        "“第 4 章 本地开发服务器”不读取时间戳、浮动网络内容或未声明环境。",
    },
    {
      label: "产物完整性",
      detail: "“第 4 章 本地开发服务器”的清单、哈希、测试和部署对象保持一致。",
    },
    {
      label: "回滚准备",
      detail: "“第 4 章 本地开发服务器”可以切回先前已验证的入口和不可变产物。",
    },
  ],
} satisfies FrontendPipelineEvidenceModel;

export function Feng04LocalDevServerArchitectureLab() {
  return <FrontendPipelineEvidenceLab model={model} view="architecture" />;
}

export function Feng04LocalDevServerExecutionTraceLab() {
  return <FrontendPipelineEvidenceLab model={model} view="execution-trace" />;
}

export function Feng04LocalDevServerReleaseGateLab() {
  return <FrontendPipelineEvidenceLab model={model} view="release-gate" />;
}
