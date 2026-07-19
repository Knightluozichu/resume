import {
  WindowsJourneyMigrationLab,
  WindowsJourneyPipelineLab,
  WindowsJourneyRecoveryLab,
  type WindowsJourneyCausalModel,
  type WindowsJourneyCoverageNode,
} from "./official-windows-journey-book-lab";

const title = "第25章 造物主的降临——多游戏模型的载入";
const focus = "让多个模型实例共享不可变资源，同时隔离变换、材质覆盖和生命周期";
const stages = [
  "规范路径",
  "查询缓存",
  "加载资源",
  "创建实例",
  "引用释放"
];
const nodes = [
  {
    "label": "第25章 造物主的降临——多游戏模型的载入",
    "mechanism": "围绕让多个模型实例共享不可变资源，同时隔离变换、材质覆盖和生命周期，对 第25章 造物主的降临——多游戏模型的载入，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留缓存键、资源身份、引用计数、实例变换和内存占用。",
    "probe": "记录缓存键、资源身份、引用计数、实例变换和内存占用"
  },
  {
    "label": "25.1 网格模型的优化",
    "mechanism": "围绕让多个模型实例共享不可变资源，同时隔离变换、材质覆盖和生命周期，25.1 网格模型的优化 限定本章的一个知识坐标；独立解释围绕“资源缓存按规范路径保存网格纹理，实例只持有资源引用和独立世界状态”展开，并以“同一资产只加载一次，实例变化不修改共享资源或其他实例”结束。",
    "probe": "记录缓存键、资源身份、引用计数、实例变换和内存占用"
  },
  {
    "label": "25.2 网格模型的克隆",
    "mechanism": "围绕让多个模型实例共享不可变资源，同时隔离变换、材质覆盖和生命周期，25.2 网格模型的克隆 限定本章的一个知识坐标；独立解释围绕“资源缓存按规范路径保存网格纹理，实例只持有资源引用和独立世界状态”展开，并以“同一资产只加载一次，实例变化不修改共享资源或其他实例”结束。",
    "probe": "记录缓存键、资源身份、引用计数、实例变换和内存占用"
  },
  {
    "label": "25.3 文件模型载入类的设计",
    "mechanism": "围绕让多个模型实例共享不可变资源，同时隔离变换、材质覆盖和生命周期，对 25.3 文件模型载入类的设计，重点检查资源生命周期：创建成功只完成一半，失败回滚、逆序释放和同输入重建同样属于通过条件。",
    "probe": "记录缓存键、资源身份、引用计数、实例变换和内存占用"
  },
  {
    "label": "25.4 文件模型载入类的实现",
    "mechanism": "围绕让多个模型实例共享不可变资源，同时隔离变换、材质覆盖和生命周期，对 25.4 文件模型载入类的实现，重点检查资源生命周期：创建成功只完成一半，失败回滚、逆序释放和同输入重建同样属于通过条件。",
    "probe": "记录缓存键、资源身份、引用计数、实例变换和内存占用"
  },
  {
    "label": "25.5 文件模型载入类的使用",
    "mechanism": "围绕让多个模型实例共享不可变资源，同时隔离变换、材质覆盖和生命周期，对 25.5 文件模型载入类的使用，重点检查资源生命周期：创建成功只完成一半，失败回滚、逆序释放和同输入重建同样属于通过条件。",
    "probe": "记录缓存键、资源身份、引用计数、实例变换和内存占用"
  },
  {
    "label": "25.6 示例程序D3Ddemo20",
    "mechanism": "围绕让多个模型实例共享不可变资源，同时隔离变换、材质覆盖和生命周期，对 25.6 示例程序D3Ddemo20，把前述机制装入一个可运行场景：固定构建、资源和输入，仅改变一个条件，并保留缓存键、资源身份、引用计数、实例变换和内存占用。",
    "probe": "记录缓存键、资源身份、引用计数、实例变换和内存占用"
  },
  {
    "label": "25.7 章节小憩",
    "mechanism": "围绕让多个模型实例共享不可变资源，同时隔离变换、材质覆盖和生命周期，对 25.7 章节小憩，收尾不是装饰，而是要求用缓存键、资源身份、引用计数、实例变换和内存占用复盘“同一资产只加载一次，实例变化不修改共享资源或其他实例”是否在正常和失败路径同时成立。",
    "probe": "记录缓存键、资源身份、引用计数、实例变换和内存占用"
  }
] satisfies WindowsJourneyCoverageNode[];
const model = {
  "historicalLabel": "逐模型 D3DX 加载",
  "modernLabel": "缓存实例管线",
  "unit": "重复 MiB",
  "historicalBase": 26,
  "historicalSlope": 8,
  "modernBase": 12,
  "modernSlope": 1.7,
  "faultPenalty": 32,
  "invariant": "同一资产只加载一次，实例变化不修改共享资源或其他实例",
  "fault": "缓存键未规范化造成重复资源，或实例直接改共享材质",
  "evidence": "缓存键、资源身份、引用计数、实例变换和内存占用"
} satisfies WindowsJourneyCausalModel;
const props = { title, focus, stages, nodes, model };

export function Wj25MultiModelLoadingMapLab() {
  return <WindowsJourneyPipelineLab {...props} />;
}

export function Wj25MultiModelLoadingExperimentLab() {
  return <WindowsJourneyMigrationLab {...props} />;
}

export function Wj25MultiModelLoadingEvidenceLab() {
  return <WindowsJourneyRecoveryLab {...props} />;
}
