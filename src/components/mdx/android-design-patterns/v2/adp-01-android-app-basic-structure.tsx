"use client";

import {
  AndroidArchitectureEvidenceLab,
  type AndroidArchitectureEvidenceModel,
} from "@/components/mdx/android-design-patterns/v2/android-architecture-evidence-lab";

const model = {
  unitId: "adp-01-android-app-basic-structure",
  title: "第 1 章 Android 应用的基本构成",
  question: "模式与库怎样改变责任、生命周期和失败恢复，而不是只改变类名？",
  concepts: [
    "第 1 章 Android 应用的基本构成",
    "第 I 部：理解应用设计",
    "1.1 讨论所基于的应用与规格",
    "1.2 架构选择",
    "1.3 Model-View-Presenter",
    "1.4 Model-View-ViewModel",
    "1.4.1 数据绑定",
    "1.4.2 MVVM 的基础思想：Presentation Model",
    "1.5 平台约束与复杂性",
    "1.6 设计演进",
    "1.6.1 Fat Activity 问题",
    "1.6.2 生命周期复杂化",
    "1.6.3 版本差异",
    "1.6.4 异步处理与后台执行",
    "1.6.5 团队开发",
    "1.7 第三方库兴起",
    "1.7.1 Android Architecture Components",
    "1.7.2 Android Support Library",
    "1.7.3 Dagger 2",
    "1.7.4 Gson",
    "1.7.5 OkHttp",
    "1.7.6 PermissionsDispatcher",
    "1.7.7 Retrofit 2",
    "1.7.8 RxJava 2",
    "1.8 编程语言发展",
  ],
  invariant:
    "第 1 章 Android 应用的基本构成的规格、唯一状态所有者、事件方向、生命周期、失败恢复和版本轨道始终可追溯",
  fault: "旋转后旧异步结果写回已销毁界面，且把权限库误当成 Flux 调度器",
  artifact: "责任矩阵、生命周期回放、库职责卡与版本迁移差分",
  stages: [
    {
      name: "第 1 章 Android 应用的基本构成 · 规格与版本",
      input:
        "在最终2018版目录与同一业务/案例约束内重放TODO 规格、MVP/MVVM、平台约束、历史演进与库职责",
      owner: "来源清单与共同业务规格是比较合同的唯一所有者",
      event: "锁定最终版坐标、样例提交、平台版本、功能输入和验收结果",
      output: "第 1 章 Android 应用的基本构成的来源快照、输入合同和未知项",
      check: "没有把众筹草案、当前框架或课程解释冒充2018原书事实",
    },
    {
      name: "第 1 章 Android 应用的基本构成 · 责任与状态",
      input:
        "第 1 章 Android 应用的基本构成的固定规格、界面实例、数据源和初始状态",
      owner:
        "由TODO 规格、MVP/MVVM、平台约束、历史演进与库职责中的明确角色拥有事实，界面只渲染声明状态",
      event:
        "在同一 TODO 规格下比较 MVP、MVVM、平台约束、设计演进与八类出版时期库",
      output:
        "第 1 章 Android 应用的基本构成的状态快照、调用/事件轨迹和依赖方向",
      check: "每种状态只有一个写入口，模式名与实际责任一致",
    },
    {
      name: "第 1 章 Android 应用的基本构成 · 生命周期",
      input:
        "第 1 章 Android 应用的基本构成的参考状态、订阅、异步任务和界面宿主",
      owner: "作用域所有者负责创建、停止、取消、释放与恢复",
      event: "依次执行启动、旋转、后台、返回、最终销毁和进程重建",
      output: "第 1 章 Android 应用的基本构成的宿主、状态、订阅和任务存活矩阵",
      check: "旧界面零回调、无重复订阅，持久状态与一次性效果分离",
    },
    {
      name: "第 1 章 Android 应用的基本构成 · 单一故障",
      input: "第 1 章 Android 应用的基本构成的参考轨迹与其余不变条件",
      owner: "故障注入器只改变一个变量，状态所有者记录首个分岔",
      event:
        "只注入“旋转后旧异步结果写回已销毁界面，且把权限库误当成 Flux 调度器”",
      output:
        "第 1 章 Android 应用的基本构成的首个错误状态、传播路径和用户可见影响",
      check: "没有同时替换架构、框架、需求、数据与团队流程",
    },
    {
      name: "第 1 章 Android 应用的基本构成 · 恢复与迁移",
      input: "第 1 章 Android 应用的基本构成的故障快照、恢复点与2018历史结论",
      owner: "恢复协议拥有回退，迁移记录拥有当前官方对照",
      event: "撤销故障，从同一输入重放，再单独评估当前迁移",
      output: "第 1 章 Android 应用的基本构成的恢复结果、迁移差分和不适用范围",
      check:
        "第 1 章 Android 应用的基本构成的规格、唯一状态所有者、事件方向、生命周期、失败恢复和版本轨道始终可追溯",
    },
  ],
  cases: [
    {
      name: "共同 TODO 或案例基线",
      setup:
        "在最终2018版目录与同一业务/案例约束内重放TODO 规格、MVP/MVVM、平台约束、历史演进与库职责",
      historical:
        "2018轨道只依据最终目录、官方样章与出版时期样例解释TODO 规格、MVP/MVVM、平台约束、历史演进与库职责。",
      current:
        "当前轨道对照 Android 官方 UI/数据/可选领域层、状态持有者、单一事实源与单向数据流。",
      boundary:
        "当前建议用于迁移决策，不能静默改写2018原作的术语、代码与案例结论。",
    },
    {
      name: "生命周期与迟到结果",
      setup:
        "保持业务输入不变，只执行“旋转后旧异步结果写回已销毁界面，且把权限库误当成 Flux 调度器”",
      historical:
        "按 Activity/Fragment、手写 MVP/MVVM、RxJava 与早期 Architecture Components 的语境重放。",
      current:
        "分别检查 ViewModel 作用域、SavedStateHandle、生命周期收集、取消和进程死亡恢复。",
      boundary:
        "配置变更存活不等于进程死亡持久化；无论使用何种组件都必须保存恢复证据。",
    },
    {
      name: "团队与依赖迁移",
      setup:
        "以责任矩阵、生命周期回放、库职责卡与版本迁移差分记录一个可回退切片",
      historical:
        "保留书中真实团队、OSS、Flux 和混合应用案例的组织与技术约束。",
      current:
        "用依赖注入、分层、UDF 和当前平台文档评估新边界，同时计算迁移成本。",
      boundary:
        "案例经验不是普适模板；团队规模、版本、发布风险和未测试路径必须显式保留。",
    },
  ],
  referenceTrace: [
    "第 1 章 Android 应用的基本构成参考步骤1：锁定最终版坐标、样例提交、平台版本、功能输入和验收结果，由来源清单与共同业务规格是比较合同的唯一所有者，产出第 1 章 Android 应用的基本构成的来源快照、输入合同和未知项。",
    "第 1 章 Android 应用的基本构成参考步骤2：在同一 TODO 规格下比较 MVP、MVVM、平台约束、设计演进与八类出版时期库，由由TODO 规格、MVP/MVVM、平台约束、历史演进与库职责中的明确角色拥有事实，界面只渲染声明状态，产出第 1 章 Android 应用的基本构成的状态快照、调用/事件轨迹和依赖方向。",
    "第 1 章 Android 应用的基本构成参考步骤3：依次执行启动、旋转、后台、返回、最终销毁和进程重建，由作用域所有者负责创建、停止、取消、释放与恢复，产出第 1 章 Android 应用的基本构成的宿主、状态、订阅和任务存活矩阵。",
    "第 1 章 Android 应用的基本构成参考步骤4：只注入“旋转后旧异步结果写回已销毁界面，且把权限库误当成 Flux 调度器”，由故障注入器只改变一个变量，状态所有者记录首个分岔，产出第 1 章 Android 应用的基本构成的首个错误状态、传播路径和用户可见影响。",
    "第 1 章 Android 应用的基本构成参考步骤5：撤销故障，从同一输入重放，再单独评估当前迁移，由恢复协议拥有回退，迁移记录拥有当前官方对照，产出第 1 章 Android 应用的基本构成的恢复结果、迁移差分和不适用范围。",
  ],
  faultTrace: [
    "第 1 章 Android 应用的基本构成故障步骤1：保持在最终2018版目录与同一业务/案例约束内重放TODO 规格、MVP/MVVM、平台约束、历史演进与库职责不变，只检查“旋转后旧异步结果写回已销毁界面，且把权限库误当成 Flux 调度器”如何破坏没有把众筹草案、当前框架或课程解释冒充2018原书事实。",
    "第 1 章 Android 应用的基本构成故障步骤2：保持第 1 章 Android 应用的基本构成的固定规格、界面实例、数据源和初始状态不变，只检查“旋转后旧异步结果写回已销毁界面，且把权限库误当成 Flux 调度器”如何破坏每种状态只有一个写入口，模式名与实际责任一致。",
    "第 1 章 Android 应用的基本构成故障步骤3：保持第 1 章 Android 应用的基本构成的参考状态、订阅、异步任务和界面宿主不变，只检查“旋转后旧异步结果写回已销毁界面，且把权限库误当成 Flux 调度器”如何破坏旧界面零回调、无重复订阅，持久状态与一次性效果分离。",
    "第 1 章 Android 应用的基本构成故障步骤4：保持第 1 章 Android 应用的基本构成的参考轨迹与其余不变条件不变，只检查“旋转后旧异步结果写回已销毁界面，且把权限库误当成 Flux 调度器”如何破坏没有同时替换架构、框架、需求、数据与团队流程。",
    "第 1 章 Android 应用的基本构成故障步骤5：保持第 1 章 Android 应用的基本构成的故障快照、恢复点与2018历史结论不变，只检查“旋转后旧异步结果写回已销毁界面，且把权限库误当成 Flux 调度器”如何破坏第 1 章 Android 应用的基本构成的规格、唯一状态所有者、事件方向、生命周期、失败恢复和版本轨道始终可追溯。",
  ],
  recoveryTrace: [
    "第 1 章 Android 应用的基本构成恢复步骤1：撤销单一故障，从在最终2018版目录与同一业务/案例约束内重放TODO 规格、MVP/MVVM、平台约束、历史演进与库职责重放，确认第 1 章 Android 应用的基本构成的来源快照、输入合同和未知项重新满足没有把众筹草案、当前框架或课程解释冒充2018原书事实。",
    "第 1 章 Android 应用的基本构成恢复步骤2：撤销单一故障，从第 1 章 Android 应用的基本构成的固定规格、界面实例、数据源和初始状态重放，确认第 1 章 Android 应用的基本构成的状态快照、调用/事件轨迹和依赖方向重新满足每种状态只有一个写入口，模式名与实际责任一致。",
    "第 1 章 Android 应用的基本构成恢复步骤3：撤销单一故障，从第 1 章 Android 应用的基本构成的参考状态、订阅、异步任务和界面宿主重放，确认第 1 章 Android 应用的基本构成的宿主、状态、订阅和任务存活矩阵重新满足旧界面零回调、无重复订阅，持久状态与一次性效果分离。",
    "第 1 章 Android 应用的基本构成恢复步骤4：撤销单一故障，从第 1 章 Android 应用的基本构成的参考轨迹与其余不变条件重放，确认第 1 章 Android 应用的基本构成的首个错误状态、传播路径和用户可见影响重新满足没有同时替换架构、框架、需求、数据与团队流程。",
    "第 1 章 Android 应用的基本构成恢复步骤5：撤销单一故障，从第 1 章 Android 应用的基本构成的故障快照、恢复点与2018历史结论重放，确认第 1 章 Android 应用的基本构成的恢复结果、迁移差分和不适用范围重新满足第 1 章 Android 应用的基本构成的规格、唯一状态所有者、事件方向、生命周期、失败恢复和版本轨道始终可追溯。",
  ],
  gates: [
    {
      label: "最终版来源门",
      detail:
        "第 1 章 Android 应用的基本构成只能把正式五位作者、三部八章、官方样章与样例仓库写成原作事实；草案单独排除。",
    },
    {
      label: "责任与生命周期门",
      detail:
        "第 1 章 Android 应用的基本构成的状态所有者、事件方向、作用域、取消、效果消费和恢复均有轨迹。",
    },
    {
      label: "单故障与证伪门",
      detail:
        "第 1 章 Android 应用的基本构成只注入“旋转后旧异步结果写回已销毁界面，且把权限库误当成 Flux 调度器”，能定位首个分岔并从同一输入恢复。",
    },
    {
      label: "历史—当前迁移门",
      detail:
        "第 1 章 Android 应用的基本构成分别标记2018原作、课程独立解释和当前官方建议，交付责任矩阵、生命周期回放、库职责卡与版本迁移差分。",
    },
  ],
} as const satisfies AndroidArchitectureEvidenceModel;

export function Adp01AndroidAppBasicStructureResponsibilityContractLab() {
  return (
    <AndroidArchitectureEvidenceLab
      model={model}
      view="responsibility-contract"
    />
  );
}

export function Adp01AndroidAppBasicStructureLifecycleTraceLab() {
  return (
    <AndroidArchitectureEvidenceLab model={model} view="lifecycle-trace" />
  );
}

export function Adp01AndroidAppBasicStructureMigrationGateLab() {
  return <AndroidArchitectureEvidenceLab model={model} view="migration-gate" />;
}
