import {
  UnityUiDesignLab,
  type UnityUiDesignSnapshot,
} from "./official-ui-design-lab";

const SNAPSHOTS = [
  {
    label: "范围",
    stage: "Chapter 6 的权威边界",
    action:
      "原章覆盖 Unravelling the Event System、Event System loop、Controlling state、Raycast Marshalling、Working with events、Using a parameter、Built-in event interfaces、Executing events、Building custom handlers/events；然后构造 custom event Data Structure、Interface、static container 和 processing，并以 Roll a Ball Derby、Droid、Alarm plates、watchers 等例子验证。最后讨论 Getting access to the source、repository、fork、download、update、solution、adding own UI version 与贡献回 Unity。",
    metric: "6 concept groups",
    evidence:
      "https://api.pageplace.de/preview/DT0400.9781783553624_A24173589/preview-9781783553624_A24173589.pdf + https://darkgenesis.zenithmoon.com/announcing-unity-3d-ui-essentials.html",
    boundary: "目录证明范围，运行场景和失败样本证明掌握。",
  },
  {
    label: "对象",
    stage: "事件数据、接口和执行器的三件套",
    action:
      "EventSystem 选择当前 InputModule，模块维护 PointerEventData 或 AxisEventData，并请求所有 BaseRaycaster 收集 RaycastResult；结果按相机、层级、sorting、distance 等规则排序，ExecuteEvents 再向目标及其层级寻找实现指定接口的组件。自定义事件要把载荷放进 BaseEventData 子类，用接口声明处理契约，再用 EventFunction 静态委托调用，才能保持类型边界和复用现有派发机制。",
    metric: "producer -> consumer",
    evidence:
      "Unravelling the Event System；Event System loop；Controlling state；Raycast Marshalling；Working with events；Using a parameter；Built-in event interfaces；Executing events",
    boundary:
      "每次派发都创建大量事件数据会增加分配；但盲目复用对象又可能泄漏上次状态，必须明确重置契约。",
  },
  {
    label: "实验",
    stage: "观察内置事件",
    action:
      "为 IPointerDownHandler、IPointerClickHandler 和 ISelectHandler 记录时间、目标、pointerId 与位置；同时输出 RaycastAll 列表，确认事件顺序来自哪里。",
    metric: "one variable",
    evidence: "public sealed class AlarmEventData : BaseEventData {",
    boundary: "同时改变布局、输入和相机，会失去故障归属。",
  },
  {
    label: "边界",
    stage: "评估源码修改",
    action:
      "定位当前 Unity 版本中 uGUI 包源码，先尝试继承、组合或自定义 Graphic；只有公开扩展点不足时才建立 fork，并记录补丁、上游版本与升级回归。",
    metric: "normal / edge / failure",
    evidence:
      "每次派发都创建大量事件数据会增加分配；但盲目复用对象又可能泄漏上次状态，必须明确重置契约。；直接复制旧 Bitbucket UI 源码进现代项目会失去 Package 版本关系，也可能与引擎内部 API 不兼容。",
    boundary:
      "2015 年 UI 源码托管和集成方式已经变化，现代 uGUI 通常以 Package 形式存在，仓库和分支也不同。迁移的稳定部分是读懂 EventSystem、Raycaster、ExecuteEvents 与控件源码；变化部分是获取地址、程序集、包依赖和贡献流程。优先使用公开接口、继承或组合，必须修改源码时锁定 Unity 与包版本并维护最小补丁。新 Input System 改变事件生产者，不改变事件接口消费者的核心思路。",
  },
  {
    label: "验收",
    stage: "Chapter 6 证据包",
    action:
      "验收要有一份完整事件时间线、一份 RaycastResult 排序表、自定义事件正常与无处理器样本，以及源码扩展决策记录。若选择 fork，必须证明不能通过公开扩展点实现，并有上游版本、补丁大小、自动回归和升级策略；否则源码修改不通过。",
    metric: "replayable proof",
    evidence:
      "EventSystem 是输入模块、射线器、事件数据、接口和执行器的协调者；自定义事件应保持数据、契约与派发函数分离；调试要沿生产者到消费者逐段保存证据，不能只盯最终回调；开放源码首先用于理解和扩展，fork 是有长期维护成本的最后手段",
    boundary: "没有参数、期望和失败重放的截图不能单独签发。",
  },
] as const satisfies ReadonlyArray<UnityUiDesignSnapshot>;

export function Uid06WorkingWithUiSourceMapLab() {
  return (
    <UnityUiDesignLab
      title="第 6 章 Working with the UI Source：EventSystem 与源码扩展"
      chapter="Chapter 6 · Unity 3D UI Essentials"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function Uid06WorkingWithUiSourceExperimentLab() {
  return (
    <UnityUiDesignLab
      title="第 6 章 Working with the UI Source：EventSystem 与源码扩展"
      chapter="Chapter 6 · Unity 3D UI Essentials"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function Uid06WorkingWithUiSourceEvidenceLab() {
  return (
    <UnityUiDesignLab
      title="第 6 章 Working with the UI Source：EventSystem 与源码扩展"
      chapter="Chapter 6 · Unity 3D UI Essentials"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
