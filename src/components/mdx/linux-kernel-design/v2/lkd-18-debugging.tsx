"use client";

import {
  KernelDesignEvidenceLab,
  type KernelDesignEvidenceModel,
} from "@/components/mdx/linux-kernel-design/v2/kernel-design-evidence-lab";

const model = {
  unitId: "lkd-unit-18",
  title: "第18章 调试",
  question:
    "printk、oops、符号、调试配置、kgdb、探针与git bisect怎样按症状选择？",
  concepts: [
    "第18章 调试",
    "18.1 准备开始",
    "18.2 内核中的bug",
    "18.3 通过打印来调试",
    "18.3.1 健壮性",
    "18.3.2 日志等级",
    "18.3.3 记录缓冲区",
    "18.3.4 syslogd和klogd",
    "18.3.5 从printf()到printk()的转换",
    "18.4 oops",
    "18.4.1 ksymoops",
    "18.4.2 kallsyms",
    "18.5 内核调试配置选项",
    "18.6 引发bug并打印信息",
    "18.7 神奇的系统请求键",
    "18.8 内核调试器的传奇",
    "18.8.1 gdb",
    "18.8.2 kgdb",
    "18.9 探测系统",
    "18.9.1 用UID作为选择条件",
    "18.9.2 使用条件变量",
    "18.9.3 使用统计量",
    "18.9.4 重复频率限制",
    "18.10 用二分查找法找出引发罪恶的变更",
    "18.11 使用Git进行二分搜索",
    "18.12 当所有的努力都失败时：社区",
    "18.13 小结",
  ],
  invariant: "症状可重复且每个捕获绑定提交、配置、机器和时间",
  fault: "没有稳定好坏判定就二分、日志淹没故障或符号/配置不匹配",
  artifact: "复现脚本、日志/oops/trace/转储、符号与二分记录",
  probe: "debug",
  stages: [
    {
      label: "冻结对象身份",
      object:
        "第18章 调试涉及的打印、oops、调试选项、SysRq、调试器、探针、统计与二分",
      control: "记录提交、配置、架构、上下文与输入",
      signal: "对象地址/ID、初始状态和所有者",
      rollback: "恢复干净快照与参考构建",
    },
    {
      label: "执行参考路径",
      object: "第18章 调试的参考对象链",
      control: "只运行预注册基线操作",
      signal:
        "状态转移、tracepoint、计数与“症状可重复且每个捕获绑定提交、配置、机器和时间”",
      rollback: "停止负载并核对无残留对象",
    },
    {
      label: "注入唯一故障",
      object: "第18章 调试的故障边界",
      control: "只注入“没有稳定好坏判定就二分、日志淹没故障或符号/配置不匹配”",
      signal: "相对基线的首个状态、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并清理副作用",
    },
    {
      label: "同输入恢复",
      object: "第18章 调试的恢复对象链",
      control: "以相同构建、机器和输入重放",
      signal:
        "重新满足“症状可重复且每个捕获绑定提交、配置、机器和时间”且资源计数回基线",
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

export function Lkd18DebuggingObjectVersionLab() {
  return <KernelDesignEvidenceLab model={model} view="object-version" />;
}

export function Lkd18DebuggingExecutableProbeLab() {
  return <KernelDesignEvidenceLab model={model} view="executable-probe" />;
}

export function Lkd18DebuggingTraceGateLab() {
  return <KernelDesignEvidenceLab model={model} view="trace-gate" />;
}
