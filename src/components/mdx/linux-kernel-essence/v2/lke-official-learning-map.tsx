"use client";

import {
  KernelEvidenceLab,
  type KernelEvidenceModel,
} from "@/components/mdx/linux-kernel-essence/v2/kernel-evidence-lab";

const model = {
  unitId: "learningMap",
  title: "《Linux内核精髓》83坐标证据学习地图",
  question: "怎样把8章75个HACK组织成从对象到信号、从历史到当前的证据地图？",
  concepts: [
    "第1章 内核入门",
    "HACK #1 如何获取Linux内核",
    "HACK #2 如何编译Linux内核",
    "HACK #3 如何编写内核模块",
    "HACK #4 如何使用Git",
    "HACK #5 使用checkpatch.pl检查补丁的格式",
    "HACK #6 使用localmodconfig缩短编译时间",
    "第2章 资源管理",
    "HACK #7 Cgroup、Namespace、Linux容器",
    "HACK #8 调度策略",
    "HACK #9 RT Group Scheduling与RT Throttling",
    "HACK #10 Fair Group Scheduling",
    "HACK #11 cpuset",
    "HACK #12 使用Memory Cgroup限制内存使用量",
    "HACK #13 使用Block I/O控制器设置I/O优先级",
    "HACK #14 虚拟存储子系统的调整",
    "HACK #15 ramzswap",
    "HACK #16 OOM Killer的运行与结构",
    "第3章 文件系统",
    "HACK #17 如何使用ext4",
    "HACK #18 向ext4转换",
    "HACK #19 ext4的调整",
    "HACK #20 使用fio进行I/O的基准测试",
    "HACK #21 FUSE",
    "第4章 网络",
    "HACK #22 如何控制网络的带宽",
    "HACK #23 TUN/TAP设备",
    "HACK #24 网桥设备",
    "HACK #25 VLAN",
    "HACK #26 bonding驱动程序",
    "HACK #27 Network Drop Monitor",
    "第5章 虚拟化",
    "HACK #28 如何使用Xen",
    "HACK #29 如何使用KVM",
    "HACK #30 如何不使用DVD安装操作系统",
    "HACK #31 更改虚拟CPU分配方法，提高性能",
    "HACK #32 如何使用EPT提高客户端操作系统的性能",
    "HACK #33 使用IOMMU提高客户端操作系统运行速度",
    "HACK #34 使用IOMMU+SR-IOV提高客户端操作系统速度",
    "HACK #35 SR-IOV带宽控制",
    "HACK #36 使用KSM节约内存",
    "HACK #37 如何挂载客户端操作系统的磁盘",
    "HACK #38 从客户端操作系统识别虚拟机环境",
    "HACK #39 如何调试客户端操作系统",
    "第6章 省电",
    "HACK #40 ACPI",
    "HACK #41 使用ACPI的S状态",
    "HACK #42 使用CPU省电（C、P状态）",
    "HACK #43 PCI设备的热插拔",
    "HACK #44 虚拟环境下的省电",
    "HACK #45 远程管理机器的电源",
    "HACK #46 USB的电力管理",
    "HACK #47 显示器的省电",
    "HACK #48 通过网络设备节省电能",
    "HACK #49 关闭键盘的LED来省电",
    "HACK #50 PowerTOP",
    "HACK #51 硬盘的省电",
    "第7章 调试",
    "HACK #52 SysRq键",
    "HACK #53 使用diskdump提取内核崩溃转储",
    "HACK #54 使用Kdump提取内核崩溃转储",
    "HACK #55 崩溃测试",
    "HACK #56 IPMI看门狗计时器",
    "HACK #57 NMI看门狗计时器",
    "HACK #58 soft lockup",
    "HACK #59 crash命令",
    "HACK #60 核心转储过滤器",
    "HACK #61 生成用户模式进程的进程核心转储",
    "HACK #62 使用lockdep查找系统的死锁",
    "HACK #63 检测内核的内存泄漏",
    "第8章 概要分析与追踪",
    "HACK #64 使用perf tools的概要分析（1）",
    "HACK #65 使用perf tools的概要分析（2）",
    "HACK #66 进行内核或进程的各种概要分析",
    "HACK #67 追踪内核的函数调用",
    "HACK #68 ftrace的插件追踪器",
    "HACK #69 记录内核的运行事件",
    "HACK #70 使用trace-cmd的内核追踪",
    "HACK #71 将动态追踪事件添加到内核中",
    "HACK #72 使用SystemTap进行内核追踪",
    "HACK #73 使用SystemTap编写对话型程序",
    "HACK #74 SystemTap脚本的重复利用",
    "HACK #75 运用SystemTap",
  ],
  invariant: "83个正式坐标都必须绑定对象、控制、信号、失败、恢复与版本边界",
  fault: "把目录标题当成已验证结论，或把当前接口静默倒灌进2013年原书语境",
  artifact: "83坐标覆盖矩阵、五条依赖链、历史/当前迁移门和实验安全清单",
  stages: [
    {
      label: "冻结对象与版本",
      object:
        "《Linux内核精髓》83坐标证据学习地图涉及的内核、配置、设备和工作负载身份",
      control: "只读采集版本、配置、拓扑和初始状态，不改变生产对象",
      signal: "《Linux内核精髓》83坐标证据学习地图的基线身份表与缺失能力清单",
      rollback: "此阶段无写入；发现身份不一致即停止实验",
    },
    {
      label: "建立参考基线",
      object: "《Linux内核精髓》83坐标证据学习地图的主要对象与可观察接口",
      control:
        "执行预注册的最小参考路径：选择一个正式坐标，沿开发、资源、存储网络、虚拟化省电和诊断追踪五条链定位前置条件与交付物",
      signal:
        "《Linux内核精髓》83坐标证据学习地图的正常轨迹、计数、日志和完成条件",
      rollback: "保存证据后回到干净快照，确认无残留控制",
    },
    {
      label: "注入单一故障",
      object:
        "《Linux内核精髓》83坐标证据学习地图中与“把目录标题当成已验证结论，或把当前接口静默倒灌进2013年原书语境”直接相连的对象",
      control:
        "保持输入与其他设置不变，只注入“把目录标题当成已验证结论，或把当前接口静默倒灌进2013年原书语境”",
      signal: "《Linux内核精髓》83坐标证据学习地图相对基线的首个分岔与传播路径",
      rollback: "立即撤销单一写入；若失去控制则从快照或带外控制台恢复",
    },
    {
      label: "同输入恢复",
      object: "《Linux内核精髓》83坐标证据学习地图的控制面、数据面和证据文件",
      control: "从干净快照以相同输入重放，并核对撤销后状态",
      signal:
        "《Linux内核精髓》83坐标证据学习地图重新满足“83个正式坐标都必须绑定对象、控制、信号、失败、恢复与版本边界”且无残留对象",
      rollback: "销毁一次性实验环境，归档版本化证据而非复用污染状态",
    },
  ],
  experiments: [
    {
      name: "《Linux内核精髓》83坐标证据学习地图历史接口复现",
      setup: "只在匹配旧内核/发行版的可丢弃虚拟机中复现",
      prediction:
        "原书时期对象可解释机制，但具体路径和默认值受旧版本限制；预期交付83坐标覆盖矩阵、五条依赖链、历史/当前迁移门和实验安全清单。",
      boundary:
        "不能把旧命令直接发布为当前生产操作，也不能用当前输出改写原书。",
    },
    {
      name: "《Linux内核精髓》83坐标证据学习地图当前接口迁移",
      setup: "先读当前上游文档，再在匹配版本的隔离环境中建立新基线",
      prediction:
        "当前接口可能更名、合并或删除，但仍应守住“83个正式坐标都必须绑定对象、控制、信号、失败、恢复与版本边界”。",
      boundary: "当前迁移是本站独立教学结论，不是2013年中文版正文。",
    },
    {
      name: "《Linux内核精髓》83坐标证据学习地图单故障恢复",
      setup: "预先准备快照、串口/带外控制台、超时和停止条件",
      prediction:
        "只注入“把目录标题当成已验证结论，或把当前接口静默倒灌进2013年原书语境”后，首个分岔可定位且撤销可恢复。",
      boundary: "无快照、无控制台、无数据备份或不可承受中断时禁止执行。",
    },
  ],
  baselineTrace: [
    "《Linux内核精髓》83坐标证据学习地图基线1：冻结对象与版本，观察《Linux内核精髓》83坐标证据学习地图的基线身份表与缺失能力清单。",
    "《Linux内核精髓》83坐标证据学习地图基线2：建立参考基线，观察《Linux内核精髓》83坐标证据学习地图的正常轨迹、计数、日志和完成条件。",
    "《Linux内核精髓》83坐标证据学习地图基线3：注入单一故障，观察《Linux内核精髓》83坐标证据学习地图相对基线的首个分岔与传播路径。",
    "《Linux内核精髓》83坐标证据学习地图基线4：同输入恢复，观察《Linux内核精髓》83坐标证据学习地图重新满足“83个正式坐标都必须绑定对象、控制、信号、失败、恢复与版本边界”且无残留对象。",
  ],
  faultTrace: [
    "《Linux内核精髓》83坐标证据学习地图故障1：冻结对象与版本只追踪“把目录标题当成已验证结论，或把当前接口静默倒灌进2013年原书语境”，核对《Linux内核精髓》83坐标证据学习地图涉及的内核、配置、设备和工作负载身份。",
    "《Linux内核精髓》83坐标证据学习地图故障2：建立参考基线只追踪“把目录标题当成已验证结论，或把当前接口静默倒灌进2013年原书语境”，核对《Linux内核精髓》83坐标证据学习地图的主要对象与可观察接口。",
    "《Linux内核精髓》83坐标证据学习地图故障3：注入单一故障只追踪“把目录标题当成已验证结论，或把当前接口静默倒灌进2013年原书语境”，核对《Linux内核精髓》83坐标证据学习地图中与“把目录标题当成已验证结论，或把当前接口静默倒灌进2013年原书语境”直接相连的对象。",
    "《Linux内核精髓》83坐标证据学习地图故障4：同输入恢复只追踪“把目录标题当成已验证结论，或把当前接口静默倒灌进2013年原书语境”，核对《Linux内核精髓》83坐标证据学习地图的控制面、数据面和证据文件。",
  ],
  recoveryTrace: [
    "《Linux内核精髓》83坐标证据学习地图恢复1：此阶段无写入；发现身份不一致即停止实验，重新验证《Linux内核精髓》83坐标证据学习地图的基线身份表与缺失能力清单。",
    "《Linux内核精髓》83坐标证据学习地图恢复2：保存证据后回到干净快照，确认无残留控制，重新验证《Linux内核精髓》83坐标证据学习地图的正常轨迹、计数、日志和完成条件。",
    "《Linux内核精髓》83坐标证据学习地图恢复3：立即撤销单一写入；若失去控制则从快照或带外控制台恢复，重新验证《Linux内核精髓》83坐标证据学习地图相对基线的首个分岔与传播路径。",
    "《Linux内核精髓》83坐标证据学习地图恢复4：销毁一次性实验环境，归档版本化证据而非复用污染状态，重新验证《Linux内核精髓》83坐标证据学习地图重新满足“83个正式坐标都必须绑定对象、控制、信号、失败、恢复与版本边界”且无残留对象。",
  ],
  gates: [
    {
      label: "版本与来源门",
      detail:
        "《Linux内核精髓》83坐标证据学习地图已分开2013年前后历史语境、当前上游文档和本站独立解释；目录来源不承担技术事实。",
    },
    {
      label: "隔离与控制门",
      detail:
        "《Linux内核精髓》83坐标证据学习地图的破坏性步骤只在可丢弃虚拟机或专用测试机运行，并具备快照、控制台和停止条件。",
    },
    {
      label: "单变量证伪门",
      detail:
        "《Linux内核精髓》83坐标证据学习地图只改变“把目录标题当成已验证结论，或把当前接口静默倒灌进2013年原书语境”，保存首个分岔、传播路径与竞争性解释。",
    },
    {
      label: "恢复与证据门",
      detail:
        "《Linux内核精髓》83坐标证据学习地图撤销后用同一输入恢复基线，交付83坐标覆盖矩阵、五条依赖链、历史/当前迁移门和实验安全清单并报告失败与未知项。",
    },
  ],
} as const satisfies KernelEvidenceModel;

export function LkeOfficialLearningMapObjectContractLab() {
  return <KernelEvidenceLab model={model} view="object-contract" />;
}

export function LkeOfficialLearningMapSignalTraceLab() {
  return <KernelEvidenceLab model={model} view="signal-trace" />;
}

export function LkeOfficialLearningMapSafetyGateLab() {
  return <KernelEvidenceLab model={model} view="safety-gate" />;
}
