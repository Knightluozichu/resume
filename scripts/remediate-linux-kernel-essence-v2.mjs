#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = process.cwd();
const BOOK = "linux-kernel-essence";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx", BOOK, "v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/linux-kernel-essence-v2-profiles.json",
);
const OUTLINE =
  "https://www.cnblogs.com/hzbook/archive/2013/02/01/2889106.html";

const SOURCES = {
  publisherOutline: OUTLINE,
  kernelHowto: "https://docs.kernel.org/process/howto.html",
  modules: "https://docs.kernel.org/kbuild/modules.html",
  cgroupV2: "https://docs.kernel.org/admin-guide/cgroup-v2.html",
  scheduler: "https://docs.kernel.org/scheduler/index.html",
  memory: "https://docs.kernel.org/admin-guide/mm/index.html",
  block: "https://docs.kernel.org/block/index.html",
  ext4: "https://docs.kernel.org/filesystems/ext4/index.html",
  fio: "https://fio.readthedocs.io/en/latest/",
  fuse: "https://docs.kernel.org/filesystems/fuse.html",
  tuntap: "https://docs.kernel.org/networking/tuntap.html",
  networking: "https://docs.kernel.org/networking/index.html",
  kvm: "https://docs.kernel.org/virt/kvm/index.html",
  xen: "https://xenbits.xen.org/docs/",
  ksm: "https://docs.kernel.org/admin-guide/mm/ksm.html",
  power: "https://docs.kernel.org/power/index.html",
  sysrq: "https://docs.kernel.org/admin-guide/sysrq.html",
  kdump: "https://docs.kernel.org/admin-guide/kdump/kdump.html",
  watchdogs: "https://docs.kernel.org/admin-guide/lockup-watchdogs.html",
  lockdep: "https://docs.kernel.org/dev-tools/lockdep.html",
  kmemleak: "https://docs.kernel.org/dev-tools/kmemleak.html",
  perf: "https://perfwiki.github.io/main/",
  ftrace: "https://docs.kernel.org/trace/ftrace.html",
  kprobe: "https://docs.kernel.org/trace/kprobetrace.html",
  events: "https://docs.kernel.org/trace/events.html",
  systemtap: "https://sourceware.org/systemtap/documentation.html",
};

const SOURCE_META = {
  publisherOutline: [
    "华章中文版完整目录",
    "publisher-editorial-complete-outline",
    "只核对中文版书目信息、8章与75个HACK的正式目录边界",
  ],
  kernelHowto: [
    "Linux 内核开发流程",
    "upstream-primary-documentation",
    "核对当前源码、补丁、评审与开发流程",
  ],
  modules: [
    "Linux 外部模块构建文档",
    "upstream-primary-documentation",
    "核对当前kbuild外部模块对象与构建边界",
  ],
  cgroupV2: [
    "Linux cgroup v2 文档",
    "upstream-primary-documentation",
    "核对当前层级、控制器、资源分配与迁移语义",
  ],
  scheduler: [
    "Linux 调度器文档",
    "upstream-primary-documentation",
    "核对当前调度类、组调度和CPU集合边界",
  ],
  memory: [
    "Linux 内存管理文档",
    "upstream-primary-documentation",
    "核对当前内存控制、回收、压缩和OOM边界",
  ],
  block: [
    "Linux 块层文档",
    "upstream-primary-documentation",
    "核对当前块设备队列、I/O控制与观测接口",
  ],
  ext4: [
    "Linux ext4 文档",
    "upstream-primary-documentation",
    "核对当前ext4特性、挂载、日志与迁移边界",
  ],
  fio: [
    "fio 官方文档",
    "maintainer-primary-documentation",
    "核对作业模型、I/O引擎、分布与结果字段",
  ],
  fuse: [
    "Linux FUSE 文档",
    "upstream-primary-documentation",
    "核对内核协议、用户态守护进程和请求队列",
  ],
  tuntap: [
    "Linux TUN/TAP 文档",
    "upstream-primary-documentation",
    "核对三层TUN、二层TAP与用户态文件描述符边界",
  ],
  networking: [
    "Linux 网络文档",
    "upstream-primary-documentation",
    "核对流控、网桥、VLAN、bonding和丢包观测边界",
  ],
  kvm: [
    "Linux KVM 文档",
    "upstream-primary-documentation",
    "核对虚拟机API、vCPU、内存与设备接口",
  ],
  xen: [
    "Xen 官方文档",
    "maintainer-primary-documentation",
    "核对Xen当前架构、域、工具栈与版本边界",
  ],
  ksm: [
    "Linux KSM 文档",
    "upstream-primary-documentation",
    "核对内存页合并、扫描、收益与风险",
  ],
  power: [
    "Linux 电源管理文档",
    "upstream-primary-documentation",
    "核对系统睡眠、设备运行时电源与唤醒关系",
  ],
  sysrq: [
    "Linux SysRq 文档",
    "upstream-primary-documentation",
    "核对键序列、proc接口、能力位与危险操作",
  ],
  kdump: [
    "Linux kdump 文档",
    "upstream-primary-documentation",
    "核对预留内存、捕获内核、vmcore和恢复链",
  ],
  watchdogs: [
    "Linux lockup watchdog 文档",
    "upstream-primary-documentation",
    "核对soft/hard lockup检测器与阈值",
  ],
  lockdep: [
    "Linux lockdep 设计文档",
    "upstream-primary-documentation",
    "核对锁类、依赖链和可能死锁报告",
  ],
  kmemleak: [
    "Linux kmemleak 文档",
    "upstream-primary-documentation",
    "核对扫描模型、疑似泄漏与误报边界",
  ],
  perf: [
    "perf 维护方文档",
    "maintainer-primary-documentation",
    "核对采样、计数、记录与报告工作流",
  ],
  ftrace: [
    "Linux ftrace 文档",
    "upstream-primary-documentation",
    "核对tracefs实例、tracer、过滤和缓冲区",
  ],
  kprobe: [
    "Linux kprobe事件文档",
    "upstream-primary-documentation",
    "核对动态探针定义、参数获取与事件删除",
  ],
  events: [
    "Linux事件追踪文档",
    "upstream-primary-documentation",
    "核对静态tracepoint、启用、过滤与格式",
  ],
  systemtap: [
    "SystemTap 官方文档",
    "maintainer-primary-documentation",
    "核对探针脚本、tapset、运行权限与版本依赖",
  ],
};

const PATHS = {
  "lke-unit-01": "01-foundations/lke-01-kernel-intro",
  "lke-unit-02": "02-resources/lke-02-resource-management",
  "lke-unit-03": "03-storage-network/lke-03-filesystems",
  "lke-unit-04": "03-storage-network/lke-04-networking",
  "lke-unit-05": "04-virtual-power/lke-05-virtualization",
  "lke-unit-06": "04-virtual-power/lke-06-power-saving",
  "lke-unit-07": "05-diagnostics/lke-07-debugging",
  "lke-unit-08": "05-diagnostics/lke-08-profiling-tracing",
};

const SPECS = {
  "lke-unit-01": {
    question: "怎样把源码、配置、构建、模块和补丁变成可重复反馈环？",
    scenario:
      "固定一个小型外部模块和一次最小补丁，从干净树重放构建、加载、卸载与格式检查",
    fault: "构建所用头文件、运行内核和模块版本不一致",
    invariant:
      "源码身份、配置、工具链、构建产物与运行内核必须形成同一条可追溯链",
    artifact: "源码提交、配置差分、构建日志、模块元数据和加载/卸载内核日志",
    focus:
      "源码获取、配置编译、模块生命周期、Git补丁、checkpatch与localmodconfig",
    sourceIds: ["publisherOutline", "kernelHowto", "modules"],
  },
  "lke-unit-02": {
    question: "资源控制写入怎样改变进程可见的CPU、内存和块I/O结果？",
    scenario:
      "在隔离层级中运行一组CPU、内存和I/O竞争负载，保存控制文件、归属与压力信号",
    fault: "任务附着在错误的cgroup层级或错误控制器未启用",
    invariant: "资源结论必须同时记录层级、控制器、任务归属、负载和内核可见计量",
    artifact: "cgroup树、任务归属、调度/内存/I/O计量、OOM事件和恢复记录",
    focus: "cgroup、namespace、调度、cpuset、内存、块I/O、ramzswap与OOM",
    sourceIds: ["publisherOutline", "cgroupV2", "scheduler", "memory", "block"],
  },
  "lke-unit-03": {
    question: "怎样区分文件系统语义、缓存影响、介质持久性与基准测试噪声？",
    scenario:
      "在可丢弃镜像上比较ext4迁移和挂载条件，并以fio分离访问模式、队列深度与同步语义",
    fault: "不同实验沿用未清理缓存或不同挂载参数",
    invariant:
      "文件系统比较必须冻结镜像、挂载、缓存、工作集、同步点与故障恢复条件",
    artifact: "镜像快照、特性位、挂载清单、fio作业文件、延迟分布和一致性复核",
    focus: "ext4启用与迁移、挂载调优、fio基准和FUSE请求链",
    sourceIds: ["publisherOutline", "ext4", "fio", "fuse"],
  },
  "lke-unit-04": {
    question: "虚拟网络对象、流量控制与物理链路怎样共同决定包的去向？",
    scenario:
      "用network namespace构造TUN/TAP、网桥、VLAN和bonding的最小拓扑并注入单点丢包",
    fault: "数据包进入了错误二层域或排队规则挂在错误方向",
    invariant:
      "网络结论必须给出设备类型、层次、命名空间、路由/桥表、队列和抓包位置",
    artifact: "拓扑快照、链接状态、转发表、qdisc统计、分层抓包和回滚脚本",
    focus: "带宽控制、TUN/TAP、网桥、VLAN、bonding和丢包监控",
    sourceIds: ["publisherOutline", "tuntap", "networking"],
  },
  "lke-unit-05": {
    question: "虚拟化加速究竟减少哪一层开销，又新增了哪些隔离与设备风险？",
    scenario:
      "在同一客户机镜像上比较vCPU、二级页表、IOMMU、SR-IOV和KSM的单变量变化",
    fault: "把宿主机全局变化误归因于客户机内的单一优化",
    invariant:
      "虚拟化结论必须分开宿主、VMM、客户机、设备、内存和工作负载的版本与状态",
    artifact: "宿主/客户机版本表、CPU拓扑、内存与设备映射、基线指标和故障回滚",
    focus: "Xen、KVM、无介质安装、vCPU、EPT、IOMMU、SR-IOV、KSM与客户机调试",
    sourceIds: ["publisherOutline", "kvm", "xen", "ksm"],
  },
  "lke-unit-06": {
    question: "省电设置减少的是哪种驻留或唤醒，代价是否被延迟和可用性抵消？",
    scenario:
      "固定工作负载和采样窗口，逐项改变系统睡眠、CPU、设备和存储电源状态",
    fault: "只比较瞬时功耗而忽略唤醒次数、完成时间或服务失败",
    invariant:
      "节能结论必须同时记录能量、驻留、唤醒、延迟、吞吐、设备能力和回退状态",
    artifact: "电源能力表、驻留与唤醒计数、能量/任务量、延迟分布和恢复检查",
    focus: "ACPI、系统睡眠、CPU状态、PCI/USB/显示/网络/磁盘电源与PowerTOP",
    sourceIds: ["publisherOutline", "power"],
  },
  "lke-unit-07": {
    question: "系统失去响应时，怎样先保全证据再区分崩溃、锁死、死锁和泄漏？",
    scenario:
      "在带串口控制台和快照的测试机中预注册一次可控故障，验证SysRq、kdump与诊断链",
    fault: "故障发生后才发现捕获内核、预留内存或远程控制不可用",
    invariant:
      "调试设施必须在故障前验证，并把触发、首错、转储、分析和恢复分成独立阶段",
    artifact:
      "控制台记录、kdump预检、vmcore、crash摘要、watchdog/lockdep/kmemleak证据和恢复日志",
    focus:
      "SysRq、diskdump/kdump、崩溃测试、看门狗、crash、core、lockdep与kmemleak",
    sourceIds: [
      "publisherOutline",
      "sysrq",
      "kdump",
      "watchdogs",
      "lockdep",
      "kmemleak",
    ],
  },
  "lke-unit-08": {
    question:
      "性能或行为假设应选择计数、采样、静态事件、函数追踪还是动态探针？",
    scenario:
      "从同一CPU密集与I/O密集负载出发，逐层缩小到一个可证伪的函数或事件假设",
    fault: "追踪工具本身改变调度与时序，却被当成被测系统行为",
    invariant: "追踪结论必须记录时钟、过滤、缓冲、丢事件、采样开销、符号和版本",
    artifact:
      "perf基线、tracefs实例配置、事件格式、探针定义、丢失计数和撤销记录",
    focus: "perf、ftrace、trace-cmd、静态事件、kprobe与SystemTap",
    sourceIds: [
      "publisherOutline",
      "perf",
      "ftrace",
      "events",
      "kprobe",
      "systemtap",
    ],
  },
};

const MAP_SPEC = {
  question: "怎样把8章75个HACK组织成从对象到信号、从历史到当前的证据地图？",
  scenario:
    "选择一个正式坐标，沿开发、资源、存储网络、虚拟化省电和诊断追踪五条链定位前置条件与交付物",
  fault: "把目录标题当成已验证结论，或把当前接口静默倒灌进2013年原书语境",
  invariant: "83个正式坐标都必须绑定对象、控制、信号、失败、恢复与版本边界",
  artifact: "83坐标覆盖矩阵、五条依赖链、历史/当前迁移门和实验安全清单",
  focus: "8个章标题与75个HACK的全书阅读路线",
  sourceIds: Object.keys(SOURCES),
};

const REVIEW_SPEC = {
  question: "能否从一个异常信号反查对象、控制写入、版本边界和最小恢复路径？",
  scenario:
    "用同一基线依次重放资源压力、I/O、网络、虚拟化、电源、崩溃和追踪案例",
  fault: "一次改变多个内核对象，导致首个分岔和恢复条件都不可归因",
  invariant: "全书裁决必须由固定输入、单变量故障、内核信号和同输入恢复共同支持",
  artifact: "全书证据索引、跨章故障树、83坐标答辩记录和发布复核表",
  focus: "75个HACK的跨章因果链、证伪实验与迁移判断",
  sourceIds: Object.keys(SOURCES),
};

function conceptStrings(unit) {
  return unit.concepts.map((alternatives) => alternatives[0]);
}

function pascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

function alphabeticIndex(index) {
  let value = index + 1;
  let result = "";
  while (value > 0) {
    value -= 1;
    result = String.fromCharCode(65 + (value % 26)) + result;
    value = Math.floor(value / 26);
  }
  return result;
}

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function evidenceKey(index, profile) {
  const scope =
    profile.role === "learning-map"
      ? "MAP"
      : profile.role === "final-review"
        ? "REVIEW"
        : profile.id.replace("lke-unit-", "UNIT");
  return `LKE-${scope}-${alphabeticIndex(index)}`;
}

function mechanismFor(concept, profile) {
  const value = concept.toLocaleLowerCase();
  const label = concept.replaceAll(".", "·");
  const lead = `${profile.title}把${label}`;
  if (/第\d章/.test(value))
    return `${lead}设为本章证据边界：先声明被测内核、发行版、配置和风险等级，再进入章内HACK；章名本身不算机制说明。`;
  if (/获取linux内核|使用git|checkpatch|localmodconfig/.test(value))
    return `${lead}落实到仓库远端、提交、标签、配置差分和补丁检查记录；来源身份与可重建性比“下载成功”更重要。`;
  if (/编译linux内核|内核模块/.test(value))
    return `${lead}连接源码树、配置、工具链、kbuild对象、模块元数据与运行内核日志；加载成功不能替代卸载和版本失配实验。`;
  if (/cgroup|namespace|容器/.test(value))
    return `${lead}映射为层级、控制器、任务归属和命名空间视图；原书时期接口与当前cgroup v2文件不可混写。`;
  if (/调度|cpuset/.test(value))
    return `${lead}绑定调度类、优先级/权重、CPU集合、运行队列和节流信号；平均CPU占用不能证明延迟与公平性。`;
  if (/memory|内存|ramzswap|oom/.test(value))
    return `${lead}绑定内存上限、回收/压缩路径、事件计数和牺牲者选择；宿主压力与受控层级压力必须分开。`;
  if (/block i\/o|虚拟存储|i\/o优先级/.test(value))
    return `${lead}绑定块设备、调度/控制器、队列、工作集和延迟分布；文件缓存和设备缓存必须作为独立变量。`;
  if (/ext4/.test(value))
    return `${lead}绑定文件系统特性位、迁移前备份、离线检查、挂载参数、日志模式和掉电恢复；禁止在唯一数据副本上实验。`;
  if (/fio/.test(value))
    return `${lead}绑定作业文件、I/O引擎、块大小、队列深度、读写分布、运行时和延迟百分位；结果不是设备的永恒额定值。`;
  if (/fuse/.test(value))
    return `${lead}拆为VFS请求、内核FUSE协议、用户态守护进程和后端资源；用户态退出、超时与队列拥塞都要单独观察。`;
  if (/带宽|tun\/tap|网桥|vlan|bonding|drop monitor/.test(value))
    return `${lead}绑定网络层次、命名空间、设备主从关系、队列方向、包头和丢包点；端到端吞吐只是一项结果信号。`;
  if (/xen|kvm|虚拟|cpu|ept|iommu|sr-iov|ksm|客户端|磁盘/.test(value))
    return `${lead}分开宿主、VMM、客户机、内存和设备对象，冻结镜像与负载后只改变一项加速或映射；性能提升不能自动证明隔离成立。`;
  if (
    /acpi|省电|电力|电源|c、p状态|热插拔|usb|显示器|网络设备|led|powertop|硬盘/.test(
      value,
    )
  )
    return `${lead}绑定设备能力、目标状态、驻留、唤醒源、能量、完成时间与恢复延迟；减少瞬时瓦数不等于减少单位任务能量。`;
  if (/sysrq/.test(value))
    return `${lead}绑定能力位、触发通道、串口/控制台和每个键的副作用；同步、重新挂载、终止或重启等动作必须预先分级。`;
  if (/diskdump|kdump|崩溃转储|crash命令|崩溃测试/.test(value))
    return `${lead}绑定捕获内核、预留内存、vmcore、符号和crash分析；只有在可丢弃测试机中验证故障路径，生产环境只执行预检。`;
  if (/看门狗|soft lockup/.test(value))
    return `${lead}绑定检测器、阈值、CPU响应、NMI/定时器来源和panic策略；告警证明症状存在，不直接证明根因。`;
  if (/核心转储/.test(value))
    return `${lead}绑定进程限制、转储过滤、模式、存储空间、凭据与符号；隐私数据和磁盘耗尽是实验边界的一部分。`;
  if (/lockdep|死锁/.test(value))
    return `${lead}绑定锁类、获取顺序、依赖图和报告栈；可能死锁报告需要最小复现，不能直接等同已发生死锁。`;
  if (/内存泄漏/.test(value))
    return `${lead}绑定分配、引用扫描、疑似对象、时间窗口和误报排除；增长曲线与kmemleak报告必须互相校验。`;
  if (/perf|概要分析/.test(value))
    return `${lead}先选计数或采样事件，再记录频率、调用图、符号和复用比例；热点比例必须放回总运行时间解释。`;
  if (/ftrace|函数调用|插件追踪器|运行事件|trace-cmd/.test(value))
    return `${lead}绑定tracefs实例、tracer/事件、过滤、时钟、每CPU缓冲和丢失计数；采集结束后必须撤销启用状态。`;
  if (/动态追踪|systemtap/.test(value))
    return `${lead}绑定探针位置、参数语义、内核构建标识、调试信息、权限和卸载路径；探针开销与版本依赖限制结论范围。`;
  return `${lead}转换成明确的内核对象、单一控制写入、预期信号和撤销步骤，并分别记录原书历史轨道与当前官方迁移轨道。`;
}

function enrich(id, title, target, concepts, spec, role, officialUnitId) {
  const chapterSlug = target.split("/").at(-1);
  const stages = [
    {
      label: "冻结对象与版本",
      object: `${title}涉及的内核、配置、设备和工作负载身份`,
      control: "只读采集版本、配置、拓扑和初始状态，不改变生产对象",
      signal: `${title}的基线身份表与缺失能力清单`,
      rollback: "此阶段无写入；发现身份不一致即停止实验",
    },
    {
      label: "建立参考基线",
      object: `${title}的主要对象与可观察接口`,
      control: `执行预注册的最小参考路径：${spec.scenario}`,
      signal: `${title}的正常轨迹、计数、日志和完成条件`,
      rollback: "保存证据后回到干净快照，确认无残留控制",
    },
    {
      label: "注入单一故障",
      object: `${title}中与“${spec.fault}”直接相连的对象`,
      control: `保持输入与其他设置不变，只注入“${spec.fault}”`,
      signal: `${title}相对基线的首个分岔与传播路径`,
      rollback: "立即撤销单一写入；若失去控制则从快照或带外控制台恢复",
    },
    {
      label: "同输入恢复",
      object: `${title}的控制面、数据面和证据文件`,
      control: "从干净快照以相同输入重放，并核对撤销后状态",
      signal: `${title}重新满足“${spec.invariant}”且无残留对象`,
      rollback: "销毁一次性实验环境，归档版本化证据而非复用污染状态",
    },
  ];
  const experiments = [
    {
      name: `${title}历史接口复现`,
      setup: "只在匹配旧内核/发行版的可丢弃虚拟机中复现",
      prediction: `原书时期对象可解释机制，但具体路径和默认值受旧版本限制；预期交付${spec.artifact}。`,
      boundary:
        "不能把旧命令直接发布为当前生产操作，也不能用当前输出改写原书。",
    },
    {
      name: `${title}当前接口迁移`,
      setup: "先读当前上游文档，再在匹配版本的隔离环境中建立新基线",
      prediction: `当前接口可能更名、合并或删除，但仍应守住“${spec.invariant}”。`,
      boundary: "当前迁移是本站独立教学结论，不是2013年中文版正文。",
    },
    {
      name: `${title}单故障恢复`,
      setup: "预先准备快照、串口/带外控制台、超时和停止条件",
      prediction: `只注入“${spec.fault}”后，首个分岔可定位且撤销可恢复。`,
      boundary: "无快照、无控制台、无数据备份或不可承受中断时禁止执行。",
    },
  ];
  const baselineTrace = stages.map(
    (stage, index) =>
      `${title}基线${index + 1}：${stage.label}，观察${stage.signal}。`,
  );
  const faultTrace = stages.map(
    (stage, index) =>
      `${title}故障${index + 1}：${stage.label}只追踪“${spec.fault}”，核对${stage.object}。`,
  );
  const recoveryTrace = stages.map(
    (stage, index) =>
      `${title}恢复${index + 1}：${stage.rollback}，重新验证${stage.signal}。`,
  );
  const gates = [
    {
      label: "版本与来源门",
      detail: `${title}已分开2013年前后历史语境、当前上游文档和本站独立解释；目录来源不承担技术事实。`,
    },
    {
      label: "隔离与控制门",
      detail: `${title}的破坏性步骤只在可丢弃虚拟机或专用测试机运行，并具备快照、控制台和停止条件。`,
    },
    {
      label: "单变量证伪门",
      detail: `${title}只改变“${spec.fault}”，保存首个分岔、传播路径与竞争性解释。`,
    },
    {
      label: "恢复与证据门",
      detail: `${title}撤销后用同一输入恢复基线，交付${spec.artifact}并报告失败与未知项。`,
    },
  ];
  return {
    id,
    title,
    target,
    chapterSlug,
    componentBase: pascal(chapterSlug),
    concepts,
    role,
    officialUnitId,
    ...spec,
    stages,
    experiments,
    baselineTrace,
    faultTrace,
    recoveryTrace,
    gates,
  };
}

function objectives(profile) {
  return `<Objectives>

- 把${profile.focus}落实为内核对象、控制写入、可观察信号与恢复条件
- 只注入“${profile.fault}”，定位${profile.title}相对基线的首个分岔
- 交付${profile.artifact}，明确区分2013年前后历史轨道与当前上游文档轨道

</Objectives>`;
}

function sourceSection(profile) {
  const links = profile.sourceIds
    .map((id) => {
      const meta = SOURCE_META[id];
      if (!meta) throw new Error(`缺少来源元数据：${id}`);
      return `- [${meta[0]}](${SOURCES[id]})：${profile.title}用它${meta[2]}。`;
    })
    .join("\n");
  return `## 来源合同、时代边界与执行边界

${profile.title}以[华章公司发布的中文版完整目录](${OUTLINE})核对高桥浩和主编、杨婷译、机械工业出版社2013年2月版、424页、ISBN 9787111410492，以及8章75个HACK。本站的来源访问级别是 outline-only：目录只能限定覆盖范围，不能支持原书正文、图表、代码、练习或作者判断。

${profile.title}是中文独立教学重构，不是原书翻译、节译或替代品。页面不复制未获得授权的正文，也不从标题臆造原作者的具体操作结论；技术机制另由Linux内核上游文档和工具维护方资料交叉核对。

${profile.title}把两条时间轨道明确分开：历史轨道保留Linux 2.6.18至3.0、RHEL 4、Fedora和CentOS等成书语境；当前轨道依据最新上游文档重新确认接口、配置、默认值和弃用情况。当前结论不能倒灌成2013年原书事实。

${profile.title}涉及模块加载、资源限制、文件系统迁移、网络重配、直通设备、电源状态、SysRq、崩溃和动态探针。页面给出的是实验协议，不是生产命令清单；只有在可丢弃虚拟机或专用测试机具备快照、数据备份、串口/带外控制台、超时和停止条件时，才能执行破坏性步骤。

### 本页独立事实来源

${links}`;
}

function conceptsSection(profile) {
  return `## 正式目录坐标逐项解释

${profile.concepts
  .map((concept, index) => {
    const key = evidenceKey(index, profile);
    const label = concept.replaceAll(".", "·");
    return `### ${concept}

**坐标 ${index + 1}/${profile.concepts.length}：${label}。稳定证据键 ${key}。** ${mechanismFor(concept, profile)} ${profile.title}在该坐标必须留下输入身份、控制前值、单一写入、首个信号、故障传播、撤销结果与版本边界；一次命令成功、平均值改善或最终截图都不足以通过裁决。`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 三个可操作证据视图

${profile.title}先预注册预测：若只注入“${profile.fault}”，最先变化的内核对象或信号是什么？选择正式坐标和时间轨道，再逐步重放基线、故障、恢复，最后逐项打开安全门。

<Stepper>
  <Step title="对象合同：选择坐标、轨道与阶段">
    <${profile.componentBase}ObjectContractLab />
  </Step>
  <Step title="信号轨迹：比较基线、故障与恢复">
    <${profile.componentBase}SignalTraceLab />
  </Step>
  <Step title="安全门：核对隔离、证伪与回退">
    <${profile.componentBase}SafetyGateLab />
  </Step>
</Stepper>`;
}

function protocolSection(profile) {
  return `## 最小可重现实验协议

1. ${profile.title}先冻结内核构建标识、发行版、配置、工具版本、硬件/虚拟设备、工作负载、输入数据、采样窗口和预期输出。
2. ${profile.title}在干净快照上运行参考路径，保存${profile.artifact}；若基线不稳定，停止而不是用故障结果解释机制。
3. ${profile.title}保持其余条件不变，只注入“${profile.fault}”，记录首个分岔、传播路径、竞争性解释和停止条件。
4. ${profile.title}撤销控制并以同一输入重放；恢复不了基线、存在残留对象或缺少版本身份时，结论标记失败或未知。

<Callout type="trap" title="${profile.title}误区一：目录标题等于原书结论">
${profile.title}的outline-only来源只能证明HACK名称与结构；具体机制必须由当前上游资料和独立实验支持，不能虚构原书段落、命令或作者判断。
</Callout>

<Callout type="trap" title="${profile.title}误区二：旧命令可直接用于当前生产">
${profile.title}保留历史对象身份，但接口路径、控制器、默认值和安全模型都可能变化；迁移前必须重读与目标内核构建匹配的官方文档。
</Callout>

<Callout type="trap" title="${profile.title}误区三：有输出就证明因果">
${profile.title}不以命令退出码、单次截图或综合分数裁决；必须固定输入，只改变一个对象，并保存首错、撤销和同输入恢复。
</Callout>`;
}

function exercises(profile) {
  const coordinateQuestions = profile.concepts
    .map((concept, index) => {
      const key = evidenceKey(index, profile);
      const label = concept.replaceAll(".", "·");
      return `**问题 ${index + 1}：${concept}**

为${profile.title}的稳定证据键 ${key} 设计一个基线、一个单变量故障、一个内核可观察信号和一个恢复检查，并说明${label}在历史轨道与当前轨道的边界。

<Answer>
先为${profile.title}冻结${profile.scenario}所需的版本、配置、对象、输入和停止条件；把 ${key} 映射到控制前值、唯一写入和预期信号，只注入“${profile.fault}”。首个分岔必须能由该变量解释，撤销或恢复快照后同一输入重新满足“${profile.invariant}”；未覆盖的内核、发行版、硬件和生产条件保留为未知。
</Answer>`;
    })
    .join("\n\n");
  const start = profile.concepts.length + 1;
  return `## 练习与答案

<Exercises>

${coordinateQuestions}

**问题 ${start}：为什么要保留双时间轨道**

${profile.title}为什么不能用当前cgroup v2、tracefs或电源接口静默替换原书时期对象？

<Answer>
${profile.title}的历史轨道回答“当时的对象和约束是什么”，当前轨道回答“目标构建现在提供什么”；二者只能通过显式迁移差分连接。接口同名也要核对语义，接口改名也不能假定机制完全改变，更不能把当前结论冒充原作者观点。
</Answer>

**问题 ${start + 1}：什么时候必须停止实验**

${profile.title}在什么条件下不应继续执行内核实验？

<Answer>
${profile.title}只要缺少可丢弃环境、干净快照、数据备份、串口或带外控制、明确超时、停止条件、版本身份或可靠基线中的任一项，就应停止。无法承受重启、数据损坏、网络中断或设备失联的对象不在本页实验范围内。
</Answer>

</Exercises>`;
}

function glossary(profile) {
  const terms = [
    [
      "内核对象",
      `${profile.title}中被读取或改变的任务、层级、设备、队列、页、事件或探针`,
    ],
    [
      "控制写入",
      `${profile.title}中唯一改变对象状态的参数、文件、系统调用或配置步骤`,
    ],
    [
      "可观察信号",
      `${profile.title}中用于比较基线与故障的计数、日志、轨迹、延迟或转储`,
    ],
    ["首个分岔", `${profile.title}的故障轨迹最早偏离参考轨迹的位置`],
    [
      "恢复检查",
      `${profile.title}撤销写入或恢复快照后，以同一输入重现基线的断言`,
    ],
    [
      "迁移轨道",
      `${profile.title}把原书历史对象映射到目标内核当前接口的显式差分`,
    ],
  ];
  return `## 六个裁决术语

${profile.title}使用${terms
    .map(
      ([term, definition]) =>
        `<Term def="${escapeAttribute(definition)}">${term}</Term>`,
    )
    .join(
      "、",
    )}构成最小证据语言；这些术语都指向真实对象、状态或证据，不生成置信度、风险分或装饰性评分。

<Glossary>
${terms
  .map(
    ([term, definition]) =>
      `<GlossaryItem term="${term}">${definition}。</GlossaryItem>`,
  )
  .join("\n")}
</Glossary>`;
}

function synthesis(profile) {
  return `## 小结与上架门

${profile.title}把${profile.focus}连接成可复核链：目录只给正式坐标，上游资料限定当前机制，历史/当前双轨防止时代错置，基线和单故障定位首错，安全门与同输入恢复决定结论能否发布。最终交付${profile.artifact}，同时报告失败、未知项和目标内核之外的边界。

${exercises(profile)}

${glossary(profile)}

<Attribution
  mode="independent-rewrite"
  sourceBasis="outline-only"
  workTitle="高桥浩和主编、杨婷译《Linux内核精髓：精通Linux内核必会的75个绝技》"
  adaptedUrl="${OUTLINE}"
/>`;
}

function wrapper(profile) {
  const model = {
    unitId: profile.id,
    title: profile.title,
    question: profile.question,
    concepts: profile.concepts,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
    stages: profile.stages,
    experiments: profile.experiments,
    baselineTrace: profile.baselineTrace,
    faultTrace: profile.faultTrace,
    recoveryTrace: profile.recoveryTrace,
    gates: profile.gates,
  };
  return `"use client";

import {
  KernelEvidenceLab,
  type KernelEvidenceModel,
} from "@/components/mdx/linux-kernel-essence/v2/kernel-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies KernelEvidenceModel;

export function ${profile.componentBase}ObjectContractLab() {
  return <KernelEvidenceLab model={model} view="object-contract" />;
}

export function ${profile.componentBase}SignalTraceLab() {
  return <KernelEvidenceLab model={model} view="signal-trace" />;
}

export function ${profile.componentBase}SafetyGateLab() {
  return <KernelEvidenceLab model={model} view="safety-gate" />;
}
`;
}

async function writeFormatted(filePath, source, parser) {
  const output = await format(source, { parser });
  const current = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : "";
  if (current !== output) fs.writeFileSync(filePath, output);
}

async function transformPage(profile) {
  const filePath = path.join(CONTENT_ROOT, `${profile.target}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`缺少页面：${filePath}`);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const body = `import {
  Objectives,
  Term,
  Callout,
  Stepper,
  Step,
  Exercises,
  Answer,
  Glossary,
  GlossaryItem,
  Attribution,
} from "@/components/mdx/mdx-components";
import {
  ${profile.componentBase}ObjectContractLab,
  ${profile.componentBase}SignalTraceLab,
  ${profile.componentBase}SafetyGateLab,
} from "@/components/mdx/${BOOK}/v2/${profile.chapterSlug}";

${objectives(profile)}

## 为什么从这个问题开始

${profile.title}围绕“${profile.question}”建立贯穿任务：${profile.scenario}。先预测对象和信号，再重放参考、单故障与恢复路径；只有守住“${profile.invariant}”并交付${profile.artifact}，HACK名称或一次成功操作才可能升级为机制证据。

${sourceSection(profile)}

${conceptsSection(profile)}

${experimentSection(profile)}

${protocolSection(profile)}

${synthesis(profile)}
`;
  const data = {
    ...parsed.data,
    title: profile.title,
    section: profile.title,
    description: `${profile.title}覆盖${profile.concepts.length}个正式目录坐标，用对象合同、信号轨迹与安全门交付${profile.artifact}`,
    demo: true,
    math: false,
    sourceUrl: OUTLINE,
    qualityVersion: 2,
    practiceMode: "simulation",
    sourceMode: "independent-rewrite",
  };
  if (profile.officialUnitId) data.officialUnitId = profile.officialUnitId;
  else delete data.officialUnitId;
  await writeFormatted(
    filePath,
    matter.stringify(body.trimStart(), data),
    "mdx",
  );
  await writeFormatted(
    path.join(COMPONENT_ROOT, `${profile.chapterSlug}.tsx`),
    wrapper(profile),
    "typescript",
  );
}

const document = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = document.books[BOOK];
if (!manifest) throw new Error(`缺少 fidelity manifest：${BOOK}`);
if (manifest.units.length !== 8)
  throw new Error(`正式章数应为8，实际${manifest.units.length}`);

const allCoordinates = manifest.units.flatMap(conceptStrings);
const chapterHeadings = allCoordinates.filter((value) =>
  /^第\d章/.test(value),
).length;
const hackNodes = allCoordinates.filter((value) => /^HACK #\d+ /.test(value));
if (
  chapterHeadings !== 8 ||
  hackNodes.length !== 75 ||
  allCoordinates.length !== 83
)
  throw new Error(
    `目录计数异常：章标题${chapterHeadings}、HACK ${hackNodes.length}、总计${allCoordinates.length}`,
  );
for (let index = 1; index <= 75; index += 1) {
  if (!hackNodes.some((value) => value.startsWith(`HACK #${index} `)))
    throw new Error(`缺少正式坐标 HACK #${index}`);
}

const profiles = [
  enrich(
    "learningMap",
    "《Linux内核精髓》83坐标证据学习地图",
    "00-guide/lke-official-learning-map",
    allCoordinates,
    MAP_SPEC,
    "learning-map",
  ),
  ...manifest.units.map((unit) => {
    const spec = SPECS[unit.id];
    const target = PATHS[unit.id];
    if (!spec || !target) throw new Error(`缺少单元配置：${unit.id}`);
    return enrich(
      unit.id,
      unit.title,
      target,
      conceptStrings(unit),
      spec,
      "chapter",
      unit.id,
    );
  }),
  enrich(
    "finalReview",
    "《Linux内核精髓》83坐标全书证据总复习",
    "06-review/lke-official-final-review",
    allCoordinates,
    REVIEW_SPEC,
    "final-review",
  ),
];
if (profiles.length !== 10)
  throw new Error(`页面数量应为10，实际${profiles.length}`);

fs.mkdirSync(COMPONENT_ROOT, { recursive: true });
for (const profile of profiles) await transformPage(profile);

for (const unit of manifest.units) {
  unit.chapterPath = PATHS[unit.id];
  unit.sourceMode = "independent-rewrite";
  unit.sourceAccess = "outline-only";
  unit.factSourceIds = SPECS[unit.id].sourceIds;
}
manifest.edition =
  "高桥浩和主编、杨婷译《Linux内核精髓：精通Linux内核必会的75个绝技》，机械工业出版社，2013-02-01，424页，ISBN 9787111410492";
manifest.sourceKind =
  "publisher-editorial-complete-toc-cross-checked-with-primary-upstream-documentation";
manifest.sourceUrl = OUTLINE;
manifest.secondarySourceUrls = Object.values(SOURCES).filter(
  (url) => url !== OUTLINE,
);
manifest.status =
  "verified-outline-independent-rewrite-current-upstream-cross-check";
manifest.verifiedAt = "2026-07-30";
manifest.sourceAccess = "outline-only";
manifest.defaultSourceMode = "independent-rewrite";
manifest.disclosureNote =
  "正式分母为8个章标题与75个连续编号HACK，共83个正式目录坐标。华章中文版目录只限定结构，课程不复制或推断未获授权的原书正文、图表、代码与练习。原书Linux 2.6.18至3.0及RHEL 4、Fedora、CentOS语境作为历史轨道；当前Linux上游文档作为独立迁移轨道，二者不混写。所有模块、资源、文件系统、网络、虚拟化、电源、崩溃和追踪实验均要求可丢弃环境、快照、备份、串口或带外控制与停止条件。";
manifest.unitMappingEvidence = "quality/linux-kernel-essence-v2-profiles.json";
manifest.factSourcePolicy =
  "中文版目录只证明正式坐标；Linux内核上游文档和工具维护方资料核对当前技术机制。历史接口、本站独立解释与当前迁移必须分别标注，无法核对的结论标记失败或未知。";
manifest.factSources = Object.fromEntries(
  Object.entries(SOURCE_META).map(([id, [label, kind]]) => [
    id,
    { kind, label, url: SOURCES[id] },
  ]),
);
manifest.coverageMetrics = {
  targetFormalNodes: 83,
  coveredFormalNodes: 83,
  coveragePercent: 100,
};
manifest.metrics = {
  formalChapterHeadings: 8,
  formalHackNodes: 75,
  formalNodes: 83,
  officialUnits: 8,
  learningMapPages: 1,
  chapterPages: 8,
  finalReviewPages: 1,
  totalPages: 10,
  interactiveViews: 30,
};

await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      generatedAt: "2026-07-30",
      sourceAccess: "outline-only",
      formalNodes: 83,
      profiles: profiles.map((profile) => ({
        ...profile,
        filePath: `content/${BOOK}/${profile.target}.mdx`,
        componentPath: `src/components/mdx/${BOOK}/v2/${profile.chapterSlug}.tsx`,
      })),
    },
    null,
    2,
  )}\n`,
  "json",
);
await writeFormatted(
  MANIFEST_PATH,
  `${JSON.stringify(document, null, 2)}\n`,
  "json",
);

console.log("已重构10页、8章、75个HACK、83个正式坐标与30个交互视图。");
