"use client";

import {
  KernelDesignEvidenceLab,
  type KernelDesignEvidenceModel,
} from "@/components/mdx/linux-kernel-design/v2/kernel-design-evidence-lab";

const model = {
  unitId: "lkd-unit-17",
  title: "第17章 设备与模块",
  question: "模块、kobject/ktype/kset、sysfs与uevent怎样形成设备生命周期？",
  concepts: [
    "第17章 设备与模块",
    "17.1 设备类型",
    "17.2 模块",
    "17.2.1 Hello，World",
    "17.2.2 构建模块",
    "17.2.3 安装模块",
    "17.2.4 产生模块依赖性",
    "17.2.5 载入模块",
    "17.2.6 管理配置选项",
    "17.2.7 模块参数",
    "17.2.8 导出符号表",
    "17.3 设备模型",
    "17.3.1 kobject",
    "17.3.2 ktype",
    "17.3.3 kset",
    "17.3.4 kobject、ktype和kset的相互关系",
    "17.3.5 管理和操作kobject",
    "17.3.6 引用计数",
    "17.4 sysfs",
    "17.4.1 sysfs中添加和删除kobject",
    "17.4.2 向sysfs中添加文件",
    "17.4.3 内核事件层",
    "17.5 小结",
  ],
  invariant: "注册、绑定、引用、用户可见属性与反向释放顺序闭合",
  fault: "对象仍可达时卸载模块、错误引用计数或把sysfs当任意配置接口",
  artifact: "设备对象图、模块/引用状态、sysfs/uevent与release轨迹",
  probe: "device",
  stages: [
    {
      label: "冻结对象身份",
      object:
        "第17章 设备与模块涉及的设备类型、模块构建加载、参数符号、设备模型、sysfs与事件",
      control: "记录提交、配置、架构、上下文与输入",
      signal: "对象地址/ID、初始状态和所有者",
      rollback: "恢复干净快照与参考构建",
    },
    {
      label: "执行参考路径",
      object: "第17章 设备与模块的参考对象链",
      control: "只运行预注册基线操作",
      signal:
        "状态转移、tracepoint、计数与“注册、绑定、引用、用户可见属性与反向释放顺序闭合”",
      rollback: "停止负载并核对无残留对象",
    },
    {
      label: "注入唯一故障",
      object: "第17章 设备与模块的故障边界",
      control:
        "只注入“对象仍可达时卸载模块、错误引用计数或把sysfs当任意配置接口”",
      signal: "相对基线的首个状态、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并清理副作用",
    },
    {
      label: "同输入恢复",
      object: "第17章 设备与模块的恢复对象链",
      control: "以相同构建、机器和输入重放",
      signal:
        "重新满足“注册、绑定、引用、用户可见属性与反向释放顺序闭合”且资源计数回基线",
      rollback: "保存报告并恢复实验快照",
    },
  ],
  gates: [
    {
      label: "源码与构建身份",
      detail:
        "记录uname -r、源码提交、.config、架构、编译器、启动参数和工件摘要。",
    },
    {
      label: "安全实验环境",
      detail:
        "只在可丢弃虚拟机或专用测试机执行，具备快照、串口/带外控制台、超时和旧内核回退。",
    },
    {
      label: "基线与单故障",
      detail:
        "同一负载先建立稳定基线，每次只改变一个对象并保存首个分岔与竞争性解释。",
    },
    {
      label: "撤销与同输入恢复",
      detail:
        "撤销控制、清理模块/任务/缓存/队列后以同输入恢复；否则标记失败或未知。",
    },
  ],
} as const satisfies KernelDesignEvidenceModel;

export function Lkd17DevicesModulesObjectVersionLab() {
  return <KernelDesignEvidenceLab model={model} view="object-version" />;
}

export function Lkd17DevicesModulesExecutableProbeLab() {
  return <KernelDesignEvidenceLab model={model} view="executable-probe" />;
}

export function Lkd17DevicesModulesTraceGateLab() {
  return <KernelDesignEvidenceLab model={model} view="trace-gate" />;
}
