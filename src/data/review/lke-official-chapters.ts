import type { ReviewQuestion } from "./types";

const units: Array<{
  slug: ReviewQuestion["chapter"];
  title: string;
  thesis: string;
  invariant: string;
  terms: string[];
  chain: readonly string[];
}> = [
  {
    slug: "lke-official-learning-map",
    title: "《Linux内核精髓》权威学习地图",
    thesis:
      "按机械工业出版社中文版完整目录，把8章75个HACK组织为开发、资源、存储网络、虚拟化省电和诊断追踪五条证据链。",
    invariant:
      "8个章标题和75个HACK都有唯一教学归属；原书Linux 2.6.18～3.0语境与现代迁移说明明确分开。",
    terms: [
      "8章75个HACK",
      "历史版本边界",
      "实验基线",
      "首错证据",
      "恢复闭环",
      "五条学习主线",
    ],
    chain: [
      "核对版本与目录",
      "搭建可恢复环境",
      "完成开发资源实验",
      "验证存储网络路径",
      "比较虚拟化省电",
      "用调试追踪闭环",
    ],
  },
  {
    slug: "lke-01-kernel-intro",
    title: "第1章 内核入门",
    thesis:
      "把源码获取、配置编译、模块生命周期、Git补丁和快速重编译连接成可重复的内核开发反馈环。",
    invariant:
      "源码提交、配置文件、编译器、符号、模块vermagic和启动内核属于同一基线，加载与卸载后资源回到初始状态。",
    terms: [
      "内核源码树",
      "Kconfig",
      "内核模块",
      "Git补丁",
      "localmodconfig",
      "缩短反馈回路",
    ],
    chain: [
      "确认基线版本",
      "取得源码与配置",
      "编译内核与模块",
      "加载最小模块",
      "审查补丁格式",
      "缩短反馈回路",
    ],
  },
  {
    slug: "lke-02-resource-management",
    title: "第2章 资源管理",
    thesis:
      "用cgroup控制器、namespace、调度组、cpuset、内存限制、块I/O权重和OOM路径解释Linux怎样隔离并仲裁竞争资源。",
    invariant:
      "任务成员关系、控制器层级、CPU与NUMA亲和、内存记账和I/O策略可追溯；压力只影响目标组，解除限制后系统可恢复。",
    terms: [
      "cgroup",
      "namespace",
      "组调度",
      "cpuset",
      "OOM Killer",
      "解释压力与OOM",
    ],
    chain: [
      "建立可重复负载",
      "隔离进程视图",
      "分配CPU集合",
      "限制内存用量",
      "调节块I/O",
      "解释压力与OOM",
    ],
  },
  {
    slug: "lke-03-filesystems",
    title: "第3章 文件系统",
    thesis:
      "以ext4启用与迁移、挂载调优、fio基准和FUSE用户态文件系统串起格式、缓存、持久性与性能证据。",
    invariant:
      "块设备、文件系统特性、挂载参数和工作负载配置明确；数据迁移可回滚，基准区分缓存命中与真实设备I/O。",
    terms: ["ext4", "日志模式", "挂载选项", "fio", "FUSE", "比较FUSE路径"],
    chain: [
      "盘点磁盘与特性",
      "建立可回滚镜像",
      "迁移并校验ext4",
      "固定挂载参数",
      "运行fio矩阵",
      "比较FUSE路径",
    ],
  },
  {
    slug: "lke-04-networking",
    title: "第4章 网络",
    thesis:
      "从流量控制进入TUN/TAP、网桥、VLAN、bonding与丢包监控，建立虚拟二层设备到排队和故障证据的路径图。",
    invariant:
      "接口层级、命名空间、地址、路由、队列规则和链路状态可重建；基线、拥塞、链路失败和恢复使用同一流量样本比较。",
    terms: ["qdisc", "TUN/TAP", "网桥", "VLAN", "bonding", "定位丢包层级"],
    chain: [
      "绘制接口拓扑",
      "生成固定流量",
      "施加队列规则",
      "叠加二层虚拟设备",
      "注入链路故障",
      "定位丢包层级",
    ],
  },
  {
    slug: "lke-05-virtualization",
    title: "第5章 虚拟化",
    thesis:
      "比较Xen与KVM，贯通无介质安装、vCPU布局、EPT、IOMMU、SR-IOV、KSM、磁盘挂载、环境识别和客户机调试。",
    invariant:
      "宿主与客户版本、CPU拓扑、内存映射、直通设备IOMMU组、磁盘写入状态和调试通道明确；关闭或回滚后宿主资源不残留。",
    terms: ["Xen", "KVM", "EPT", "IOMMU", "SR-IOV", "调试并恢复客户机"],
    chain: [
      "冻结宿主客户基线",
      "创建虚拟机",
      "布局vCPU与内存",
      "验证二级页表",
      "隔离设备直通",
      "调试并恢复客户机",
    ],
  },
  {
    slug: "lke-06-power-saving",
    title: "第6章 省电",
    thesis:
      "从ACPI系统状态、CPU C/P状态进入PCI/USB/显示/网络/键盘/硬盘电源管理，并用PowerTOP把节能与唤醒延迟量化。",
    invariant:
      "节能前后工作负载一致，电源状态、驻留时间、唤醒源、设备错误和延迟同时记录；恢复后设备功能与性能回到基线。",
    terms: [
      "ACPI",
      "S状态",
      "C/P状态",
      "runtime PM",
      "PowerTOP",
      "回归睡眠唤醒",
    ],
    chain: [
      "建立功耗基线",
      "识别系统电源状态",
      "测量CPU驻留",
      "约束设备唤醒",
      "验证网络与存储",
      "回归睡眠唤醒",
    ],
  },
  {
    slug: "lke-07-debugging",
    title: "第7章 调试",
    thesis:
      "从SysRq、diskdump/Kdump和崩溃测试进入看门狗、soft lockup、crash、用户态core、lockdep与内存泄漏检测。",
    invariant:
      "故障注入只在可恢复环境进行；运行内核、vmlinux、模块、转储和符号完全匹配，分析结论能由栈、结构或检测器事件复核。",
    terms: [
      "SysRq",
      "Kdump",
      "watchdog",
      "crash",
      "lockdep",
      "修复后同输入重放",
    ],
    chain: [
      "配置恢复与转储",
      "验证符号匹配",
      "触发受控故障",
      "保存完整现场",
      "定位栈与资源",
      "修复后同输入重放",
    ],
  },
  {
    slug: "lke-08-profiling-tracing",
    title: "第8章 概要分析与追踪",
    thesis:
      "用perf、ftrace、trace-cmd、动态探针和SystemTap从统计采样进入函数、事件和脚本化追踪，形成假设驱动的性能诊断链。",
    invariant:
      "先提出可证伪假设，再选择最低开销信号；时间戳、CPU、进程、符号和采样配置完整，关闭探针后性能回到基线。",
    terms: [
      "perf",
      "ftrace",
      "tracepoint",
      "kprobe",
      "SystemTap",
      "关闭探针并复测",
    ],
    chain: [
      "提出性能假设",
      "选择计数或采样",
      "限定函数与事件",
      "采集统一时间线",
      "关联用户与内核栈",
      "关闭探针并复测",
    ],
  },
  {
    slug: "lke-official-final-review",
    title: "《Linux内核精髓》全书总复习",
    thesis:
      "用同一基线、单变量故障和恢复重放贯通75个HACK，能从资源压力、I/O、虚拟化、电源与故障现象回到可核查内核证据。",
    invariant:
      "任何结论都包含版本、配置、工作负载、原始信号、首个分叉和恢复结果，不用单次跑分或最终现象代替机制解释。",
    terms: [
      "资源控制",
      "存储与网络",
      "虚拟化与省电",
      "转储分析",
      "性能追踪",
      "跨章故障树",
    ],
    chain: [
      "冻结版本与输入",
      "预测资源状态",
      "采集基线信号",
      "只注入一个故障",
      "停在首个分叉",
      "恢复后重放验收",
    ],
  },
];

export const lkeOfficialQuestions: ReviewQuestion[] = units.flatMap((unit) =>
  unit.terms.map(
    (term, index): ReviewQuestion => ({
      id: unit.slug + "-" + (index + 1),
      chapter: unit.slug,
      level: index < 2 ? 2 : index < 4 ? 3 : 4,
      question:
        unit.title +
        "：如何用“" +
        term +
        "”验证“" +
        unit.chain[index % unit.chain.length] +
        "”阶段的首个内核状态分叉？",
      answer:
        unit.thesis +
        " 固定内核版本、配置、工具和工作负载，预测“" +
        term +
        "”在“" +
        unit.chain[index % unit.chain.length] +
        "”的对象、状态和信号；只改变一个条件并停在首错。通过条件是：" +
        unit.invariant +
        " 撤销配置或恢复快照后以同一输入重放。",
      tags: [term, unit.chain[index % unit.chain.length], "Linux内核精髓"],
    }),
  ),
);
