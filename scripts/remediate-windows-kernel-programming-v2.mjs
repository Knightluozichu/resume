#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = process.cwd();
const BOOK = "windows-kernel-programming";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx", BOOK, "v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/windows-kernel-programming-v2-profiles.json",
);
const FIRST_EDITION = "https://leanpub.com/windowskernelprogramming";
const SAMPLE =
  "https://s3.amazonaws.com/samples.leanpub.com/windowskernelprogramming-sample.pdf";
const SECOND_EDITION =
  "https://leanpub.com/windowskernelprogrammingsecondedition/";
const AUTHOR_REPO =
  "https://github.com/zodiacon/windowskernelprogrammingbook2e";

const SOURCES = {
  firstEdition: FIRST_EDITION,
  sample: SAMPLE,
  secondEdition: SECOND_EDITION,
  authorRepo: AUTHOR_REPO,
  kernelDdi:
    "https://learn.microsoft.com/en-us/windows-hardware/drivers/ddi/_kernel/",
  kernelGuide:
    "https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/",
  wdf: "https://learn.microsoft.com/en-us/windows-hardware/drivers/wdf/kernel-mode-driver-framework-architecture",
  wdmKmdf:
    "https://learn.microsoft.com/en-us/windows-hardware/drivers/wdf/differences-between-wdm-and-kmdf",
  debug:
    "https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/getting-started-with-windows-debugging",
  irql: "https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/dispatch-routines-and-irqls",
  irp: "https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/when-to-complete-an-irp-in-a-dispatch-routine",
  ioctl:
    "https://learn.microsoft.com/en-us/windows-hardware/drivers/ifs/irp-based-ioctl-and-fsctl-operations",
  security:
    "https://learn.microsoft.com/en-us/windows-hardware/drivers/driversecurity/driver-security-checklist",
  verifier:
    "https://learn.microsoft.com/en-us/windows-hardware/drivers/devtest/driver-verifier",
  obCallbacks:
    "https://learn.microsoft.com/en-us/windows-hardware/drivers/ddi/wdm/nf-wdm-obregistercallbacks",
  obSample:
    "https://learn.microsoft.com/en-us/samples/microsoft/windows-driver-samples/obcallback-callback-registration-driver/",
  minifilter:
    "https://learn.microsoft.com/en-us/windows-hardware/drivers/ifs/loading-and-unloading",
  altitude:
    "https://learn.microsoft.com/en-us/windows-hardware/drivers/ifs/load-order-groups-and-altitudes-for-minifilter-drivers",
  filterVerifier:
    "https://learn.microsoft.com/en-us/windows-hardware/drivers/devtest/file-system-filter-verification",
  signing:
    "https://learn.microsoft.com/en-us/windows-hardware/drivers/install/driver-signing",
};

const SOURCE_META = {
  firstEdition: [
    "作者一版Leanpub页面与完整公开目录",
    "official-author-first-edition-complete-toc",
    "核对Pavel Yosifovich、2020-12-10版本、455页、11章公开目录与软件内核驱动范围",
  ],
  sample: [
    "作者一版Leanpub官方18页授权样章",
    "official-author-authorized-sample",
    "局部核对一版身份、第一章目录及进程、虚拟内存、线程和系统调用开放正文；不扩大整书授权",
  ],
  secondEdition: [
    "作者二版Leanpub页面与完整公开目录",
    "official-author-second-edition-complete-toc",
    "建立二版迁移轨，识别新增章节和接口；不把二版倒写成2021年中文版",
  ],
  authorRepo: [
    "作者二版MIT示例仓库",
    "official-author-mit-licensed-second-edition-samples",
    "核对当前作者示例的章节归属、提交与许可；仓库只对应二版",
  ],
  kernelDdi: [
    "Microsoft Windows内核DDI参考",
    "platform-vendor-kernel-ddi-reference",
    "核对目标build公开DDI、对象、IRP和例程合同",
  ],
  kernelGuide: [
    "Microsoft内核模式驱动架构指南",
    "platform-vendor-kernel-driver-guide",
    "核对I/O、DPC、同步、PnP、电源和驱动编程当前路由",
  ],
  wdf: [
    "Microsoft KMDF架构",
    "platform-vendor-kmdf-architecture",
    "核对WDF对象、回调、队列和框架生命周期",
  ],
  wdmKmdf: [
    "Microsoft WDM与KMDF差异",
    "platform-vendor-driver-model-comparison",
    "把一版WDM手工路径与当前优先考虑的框架路径显式分轨",
  ],
  debug: [
    "Microsoft Windows调试入门",
    "platform-vendor-debugging-guide",
    "核对WinDbg、宿主—目标、符号和转储调试当前边界",
  ],
  irql: [
    "Microsoft分发例程与IRQL",
    "platform-vendor-irql-contract",
    "核对PASSIVE/APC/DISPATCH与分页、阻塞和任意线程上下文限制",
  ],
  irp: [
    "Microsoft分发例程中的IRP完成规则",
    "platform-vendor-irp-completion-contract",
    "核对验证、下传、完成与状态/信息字段的所有权",
  ],
  ioctl: [
    "Microsoft IRP型IOCTL与FSCTL传输方法",
    "platform-vendor-ioctl-buffer-contract",
    "核对METHOD_BUFFERED、DIRECT与NEITHER的缓冲区边界",
  ],
  security: [
    "Microsoft驱动安全清单",
    "platform-vendor-driver-security-policy",
    "核对内核必要性、最小权限、WDF、HVCI、测试、签名和发布门",
  ],
  verifier: [
    "Microsoft Driver Verifier指南",
    "platform-vendor-driver-verifier-guide",
    "核对只在测试机启用、目标驱动选择、bug check、查询和reset恢复",
  ],
  obCallbacks: [
    "Microsoft ObRegisterCallbacks DDI",
    "platform-vendor-object-callback-ddi",
    "核对注册句柄、前后回调与卸载前注销合同",
  ],
  obSample: [
    "Microsoft ObCallback官方示例",
    "platform-vendor-object-callback-sample",
    "核对进程通知与对象回调的受支持示例边界",
  ],
  minifilter: [
    "Microsoft Minifilter装入与卸载",
    "platform-vendor-minifilter-lifecycle",
    "核对FltRegisterFilter、FltStartFiltering、实例、端口和反向卸载",
  ],
  altitude: [
    "Microsoft Minifilter高度与加载组",
    "platform-vendor-minifilter-altitude-policy",
    "核对唯一十进制高度、加载次序和正式分配边界",
  ],
  filterVerifier: [
    "Microsoft文件系统过滤器验证",
    "platform-vendor-filter-verifier-guide",
    "核对callback data、context、名称信息与引用泄漏验证",
  ],
  signing: [
    "Microsoft驱动签名指南",
    "platform-vendor-driver-signing-guide",
    "核对测试签名、发布签名和驱动包交付边界",
  ],
};

const PATHS = {
  "wkp-unit-01": "01-foundations/wkp-01-windows-internals-overview",
  "wkp-unit-02": "01-foundations/wkp-02-getting-started-kernel-development",
  "wkp-unit-03": "01-foundations/wkp-03-kernel-programming-basics",
  "wkp-unit-04": "02-driver-debugging/wkp-04-driver-start-to-finish",
  "wkp-unit-05": "02-driver-debugging/wkp-05-debugging",
  "wkp-unit-06": "03-mechanisms/wkp-06-kernel-mechanisms",
  "wkp-unit-07": "03-mechanisms/wkp-07-io-request-packet",
  "wkp-unit-08": "04-notifications/wkp-08-process-thread-notifications",
  "wkp-unit-09": "04-notifications/wkp-09-object-registry-notifications",
  "wkp-unit-10": "05-filters/wkp-10-file-system-minifilters",
  "wkp-unit-11": "05-filters/wkp-11-miscellaneous-topics",
};

const SPECS = {
  "wkp-unit-01": [
    "进程、线程、句柄、对象与虚拟内存怎样按目标build和进程上下文建立可调试关系？",
    "把样章中的固定容量或地址布局当成所有当前Windows的稳定承诺",
    "每个地址、ID、句柄和对象引用都绑定进程、build、架构与生命周期",
    "对象关系图、句柄/访问掩码、VA页状态与系统调用轨迹",
    "进程、虚拟内存、页状态、线程、系统服务、架构、句柄和对象",
    "internals",
    ["kernelDdi", "kernelGuide", "security"],
  ],
  "wkp-unit-02": [
    "Windows build、SDK、WDK、Visual Studio、架构、驱动模型、签名与部署怎样组成可恢复构建链？",
    "版本或架构错配、在日常主机直接部署、只保存一次成功加载截图",
    "可重建驱动包只进入隔离测试目标且卸载、重启和快照恢复均可用",
    "环境清单、SYS/INF/CAT摘要、签名验证、部署日志与恢复快照",
    "工具、驱动项目、DriverEntry、Unload、部署和跟踪",
    "setup",
    ["wdf", "wdmKmdf", "signing", "security"],
  ],
  "wkp-unit-03": [
    "NTSTATUS、IRQL、字符串、池、链表、驱动对象和设备对象怎样形成失败安全的内核合同？",
    "高IRQL访问分页内存、忽略返回值、异常越过所有权或错误释放池对象",
    "每条成功与失败路径都满足IRQL、分页性、所有权、引用和反向清理",
    "DDI/IRQL矩阵、池标签与分配轨迹、对象/链表不变量和失败注入",
    "内核准则、异常、返回值、IRQL、C++、API、字符串、内存、链表与设备对象",
    "basics",
    ["kernelDdi", "kernelGuide", "irql", "security"],
  ],
  "wkp-unit-04": [
    "DriverEntry、设备对象、访问控制、Create/Close、IOCTL与Unload怎样闭合一个驱动生命周期？",
    "IOCTL长度或权限未验证、请求在途时卸载、符号链接和设备对象清理次序错误",
    "停止新请求后所有句柄、IRP、引用、设备与命名对象按反向顺序归零",
    "生命周期状态机、SDDL/设备访问、IOCTL协议夹具、并发关闭与卸载轨迹",
    "初始化、通信协议、设备对象、客户代码、分发、安装和测试",
    "lifecycle",
    ["ioctl", "security", "wdf", "kernelGuide"],
  ],
  "wkp-unit-05": [
    "WinDbg、符号、宿主—目标、转储与可重复症状怎样定位首个内核分岔？",
    "符号错配、只做本地观察、Verifier致崩溃却无调试宿主或恢复方案",
    "每份转储和轨迹都绑定目标build、驱动摘要、符号、输入与唯一故障",
    "宿主/目标清单、符号验证、转储、调用栈、首错假设与恢复报告",
    "调试工具、WinDbg、本地/完整内核调试、宿主、目标与驱动调试",
    "debug",
    ["debug", "verifier", "kernelDdi"],
  ],
  "wkp-unit-06": [
    "IRQL、DPC、APC、异常、崩溃转储、同步原语、自旋锁与工作项怎样按上下文选择？",
    "把线程优先级当IRQL、在高IRQL等待或访问分页代码、锁序环和工作项卸载竞态",
    "可等待性、分页性、锁序、IRQL、队列与反向释放在所有执行路径匹配",
    "IRQL/CPU/线程轨迹、DPC与工作项队列、锁图、转储和同输入恢复",
    "IRQL、DPC、APC、SEH、系统崩溃、同步、高IRQL与工作项",
    "mechanisms",
    ["irql", "kernelGuide", "debug", "verifier"],
  ],
  "wkp-unit-07": [
    "IRP、设备栈位置、分发、用户缓冲区、pending、取消与完成怎样保持唯一所有权？",
    "METHOD_NEITHER未探测、长度溢出、双完成、遗失完成或pending/取消竞态",
    "每个IRP只完成一次且状态、Information、缓冲区、引用与取消协议一致",
    "IRP/栈位置图、IOCTL传输方法表、边界夹具、取消与完成调用链",
    "IRP、设备节点、栈位置、分发、用户缓冲区、Zero驱动和测试程序",
    "irp",
    ["irp", "ioctl", "kernelDdi", "security"],
  ],
  "wkp-unit-08": [
    "进程、线程与映像通知怎样以短回调、显式队列、丢弃统计和注销顺序送达用户态？",
    "回调内阻塞、事件队列无界、PID复用误关联或Unload时回调仍可达",
    "注册代次内事件不重不乱，丢弃可计数，停止新事件后队列与引用归零",
    "回调注册表、事件模式、队列/丢弃轨迹、用户态协议与注销证明",
    "进程通知、创建/退出、用户态数据、线程通知与映像加载通知",
    "process-callback",
    ["kernelDdi", "obSample", "security"],
  ],
  "wkp-unit-09": [
    "对象与注册表前后回调怎样限制访问、关联上下文并在卸载前可靠注销？",
    "把保护示例扩展为任意内核能力、忽略访问控制、注册句柄泄漏或前后回调错配",
    "只收窄声明的访问且每个注册句柄、上下文和回调引用都反向释放",
    "操作类/访问掩码矩阵、前后关联键、注册表通知轨迹与注销记录",
    "对象通知、进程保护、注册表前后通知、性能与用户态客户",
    "object-registry",
    ["obCallbacks", "obSample", "security", "kernelDdi"],
  ],
  "wkp-unit-10": [
    "Minifilter的高度、注册、实例、pre/post、文件名、context、I/O、通信端口与卸载怎样闭环？",
    "伪造高度、名称或context引用泄漏、pre/post返回错误、通信端口或实例未关闭",
    "过滤次序合法且callback data、名称、context、端口、实例和filter引用全部归零",
    "高度/加载组身份、操作回调轨迹、名称/context引用、端口消息与Filter Verifier结果",
    "Minifilter装卸、初始化、高度、I/O、删除保护、文件名、context、备份、通信与调试",
    "minifilter",
    ["minifilter", "altitude", "filterVerifier", "security"],
  ],
  "wkp-unit-11": [
    "签名、Verifier、Native API、过滤器、设备监视与内核库怎样迁移到受支持且最小权限的当前实践？",
    "生产机全局Verifier、测试代码生产签名、驱动挂钩或向用户态暴露任意内核访问",
    "只有必要内核功能、受支持模型、最小权限、隔离验证、恢复与发布签名全部成立",
    "必要性决策、驱动包/签名/HVCI验证、Verifier设置与reset、过滤设备生命周期",
    "签名、Verifier、Native API、过滤驱动、设备监视、挂钩与内核库",
    "miscellaneous",
    ["security", "verifier", "signing", "wdf", "filterVerifier"],
  ],
};

const ORIGINAL_ONLY_COORDINATES = [
  "第1章：Thread Stacks",
  "第2章：Exercises",
  "第5章：Tutorial: User mode debugging basics",
  "第6章：Using DPC with a Timer",
  "第6章：Critical Regions and Guarded Regions",
  "第6章：The Spin Lock",
  "第7章：IRP Flow",
  "第7章：Viewing IRP Information",
  "第7章：Completing a Request",
  "第8章：The User Mode Client",
  "第8章：Exercises",
  "第9章：Desktop Objects",
  "第9章：Exercises",
  "第10章：Pipes and Mailslots",
  "第10章：Direct Access Volume (DAX or DAS)",
  "第10章：Context Types",
  "第10章：Managing Contexts",
  "第10章：Exercises",
  "第11章：Example Driver Verifier Sessions",
];

const COMMON_GATES = [
  [
    "目标身份与驱动包",
    "记录Windows产品与完整build、架构、SDK、WDK、Visual Studio、SYS/INF/CAT摘要、签名、驱动模型及VBS/HVCI状态。",
  ],
  [
    "隔离与恢复",
    "只用可丢弃VM或专用测试机，准备快照、数据备份、宿主内核调试器、转储、超时、恢复启动和Verifier reset。",
  ],
  [
    "基线与唯一故障",
    "在签名参考驱动上建立稳定基线，每次只改变一个对象、输入或调度条件并保存首个分岔。",
  ],
  [
    "反向卸载与同输入恢复",
    "先停止新请求和回调，再排空IRP、队列、端口、实例、引用与设备；以同输入恢复否则标记失败或未知。",
  ],
];

const MAP_SPEC = [
  "怎样以185个中文版正式坐标、19项作者目录差异和当前Microsoft合同重建全书证据地图？",
  "把作者一版204坐标冒充中文版185坐标、把18页样章扩大成整书或用Windows 11代替完整build",
  "185坐标各覆盖一次，19项差异单列，作者一版/二版/目标平台陈述互不倒写",
  "185坐标矩阵、19项差异表、11章对象路由、版本迁移与驱动安全门",
  "中文版11章185坐标、作者一版204坐标公开目录差异、授权样章和当前平台轨",
  "cross",
  ["kernelGuide", "security", "debug", "irp", "minifilter"],
];

const REVIEW_SPEC = [
  "从对象与构建到IRQL、IRP、通知、Minifilter、签名和恢复，怎样完成跨章驱动证据链？",
  "跨子系统同时注错、混用驱动包或只保留最终蓝屏与一次成功重启",
  "唯一故障的首错可归因，撤销后所有回调、IRP、引用、端口、实例和设备恢复基线",
  "全书目标清单、跨章对象ID、逐故障轨迹、转储/符号与卸载回归报告",
  "对象、构建、生命周期、调试、机制、IRP、通知、过滤、签名和发布安全",
  "cross",
  [
    "kernelDdi",
    "kernelGuide",
    "security",
    "verifier",
    "debug",
    "irp",
    "obCallbacks",
    "minifilter",
    "filterVerifier",
  ],
];

function pascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/u)
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase()}${part.slice(1)}`)
    .join("");
}

function alphaIndex(index) {
  let value = index + 1;
  let output = "";
  while (value > 0) {
    value -= 1;
    output = String.fromCharCode(65 + (value % 26)) + output;
    value = Math.floor(value / 26);
  }
  return output;
}

function evidenceKey(index, profile) {
  const scope =
    profile.role === "chapter"
      ? profile.officialUnitId?.replace("wkp-unit-", "C")
      : profile.role === "learning-map"
        ? "MAP"
        : "REVIEW";
  return `WKP2-${scope}-${alphaIndex(index)}`;
}

function escapeAttribute(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}

function makeStages(title, focus, fault, invariant) {
  return [
    {
      label: "冻结平台与对象",
      object: `${title}涉及的${focus}`,
      control: "记录完整build、工具链、驱动包、签名、IRQL与输入",
      signal: "对象地址/ID、注册代次、引用、初始状态和所有者",
      rollback: "恢复干净VM快照与签名参考驱动",
    },
    {
      label: "执行参考路径",
      object: `${title}的参考调用链`,
      control: "只运行预注册基线请求或回调",
      signal: `状态、NTSTATUS、调用栈、ETW/WinDbg信号与“${invariant}”`,
      rollback: "停止负载并核对无残留请求、回调与引用",
    },
    {
      label: "注入唯一故障",
      object: `${title}的单故障边界`,
      control: `只注入“${fault}”`,
      signal: "相对基线首个对象、IRQL、线程、CPU、时间或调用链分岔",
      rollback: "撤销唯一控制并执行安全卸载/Verifier reset",
    },
    {
      label: "同输入恢复",
      object: `${title}的反向清理链`,
      control: "以相同build、驱动包、VM和输入重放",
      signal: `重新满足“${invariant}”且对象与引用计数回到基线`,
      rollback: "保存转储与报告后恢复实验快照",
    },
  ];
}

function enrich(id, title, target, concepts, tuple, role, officialUnitId) {
  const [
    question,
    fault,
    invariant,
    artifact,
    focus,
    probe,
    specificSourceIds,
  ] = tuple;
  const chapterSlug = path.basename(target);
  return {
    id,
    title,
    target,
    chapterSlug,
    componentBase: pascal(chapterSlug),
    concepts,
    role,
    officialUnitId,
    question,
    fault,
    invariant,
    artifact,
    focus,
    probe,
    sourceIds: [
      "firstEdition",
      "sample",
      "secondEdition",
      "authorRepo",
      ...specificSourceIds,
    ],
    stages: makeStages(title, focus, fault, invariant),
    gates: COMMON_GATES.map(([label, detail]) => ({ label, detail })),
  };
}

function objectives(profile) {
  return `<Objectives>

- 把${profile.focus}落实为Windows build、驱动模型、内核对象、执行上下文、调用链与恢复条件
- 只注入“${profile.fault}”，定位${profile.title}相对签名参考驱动的首个分岔
- 交付${profile.artifact}，明确区分中文版一版、作者二版迁移轨与目标Microsoft平台轨

</Objectives>`;
}

function sourceSection(profile) {
  const links = [...new Set(profile.sourceIds)]
    .map((id) => {
      const meta = SOURCE_META[id];
      if (!meta) throw new Error(`缺少来源元数据：${id}`);
      return `- [${meta[0]}](${SOURCES[id]})：${profile.title}用它${meta[2]}。`;
    })
    .join("\n");
  return `## 来源合同、版本差异与安全边界

${profile.title}以[作者一版Leanpub完整公开目录](${FIRST_EDITION})核对Pavel Yosifovich《Windows Kernel Programming》2020-12-10版本、455页和11章结构；中文版采用李亮译《Windows内核编程》，机械工业出版社2021年版，ISBN 9787111684756。中文版治理清单是11章185个正式坐标，章根已计入；作者一版公开目录按同口径是204个坐标，两者相差19项。

[官方18页样章](${SAMPLE})开放一版身份、第一章目录以及进程、虚拟内存、线程和系统调用的局部正文，因此本站来源访问级别是authorized-sample。样章不授权其余正文、代码、图表或练习；${profile.title}是中文独立教学重构，不复制未开放内容。

${profile.title}登记的19项差异是：${ORIGINAL_ONLY_COORDINATES.join("；")}。它们可能来自译本底稿、修订时点或目录裁剪；没有出版社正文证据就保持“来源差异”，不补成中文版坐标，也不把作者页面的后续更新倒写给译者。

${profile.title}把三条轨道分开：中文版/作者一版解释成书范围；[作者二版](${SECOND_EDITION})及[MIT示例仓库](${AUTHOR_REPO})只做迁移参考；当前平台轨以Microsoft Learn和目标系统公开DDI核对。${profile.title}的实验必须记录完整Windows build、架构、SDK、WDK、Visual Studio、驱动模型、签名、VBS/HVCI、驱动包摘要和符号，不能只写Windows 11或latest。

${profile.title}涉及内核代码、驱动部署、回调、用户缓冲区、Minifilter、Verifier和故障调试。${profile.title}页面只给实验协议；执行仅允许在可丢弃VM或专用测试机，并预备快照、备份、宿主内核调试、崩溃转储、超时、恢复启动和Verifier reset。生产设备、日常主机和无法承受蓝屏或数据损坏的对象不在实验范围内。

### 本页独立事实来源

${links}`;
}

function mechanismFor(concept, profile, index) {
  const label = concept.replaceAll(".", "·");
  const variants = [
    `${profile.title}把${label}映射到“${profile.focus}”中的对象身份、所有者、引用、IRQL和调用线程。`,
    `${profile.title}为${label}分别记录中文版一版对象、作者二版迁移和目标Microsoft DDI，形成显式版本差分。`,
    `${profile.title}对${label}预注册输入、唯一控制与首个WinDbg/ETW/状态信号，不以最终蓝屏或成功加载替代调用链。`,
    `${profile.title}用${label}构造可撤销反例，安全卸载或恢复快照后以同驱动包和输入重新验收“${profile.invariant}”。`,
  ];
  return variants[index % variants.length];
}

function conceptsSection(profile) {
  return `## 正式目录坐标逐项解释

${profile.concepts
  .map((concept, index) => {
    const label = concept.replaceAll(".", "·");
    const key = evidenceKey(index, profile);
    return `### ${concept}

**坐标 ${index + 1}/${profile.concepts.length}：${label}。稳定证据键 ${key}。** ${mechanismFor(concept, profile, index)} ${profile.title}必须交付${profile.artifact}中的对应记录；目录标题限定范围，授权样章只支持开放页，Microsoft文档支持当前平台，三者都不能替代目标build的运行证据。`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 三个可操作证据视图

${profile.title}先选择正式坐标、版本轨和执行上下文，再调整小输入复算对象数量、队列或缓冲边界，最后逐阶段切换参考、单故障与恢复。每个视图都保留重置，不生成驱动成熟度、风险或性能综合分。

<Stepper>
  <Step title="版本合同：选择坐标、出版轨与IRQL">
    <${profile.componentBase}VersionContextLab />
  </Step>
  <Step title="可执行探针：调整输入并复算对象状态">
    <${profile.componentBase}ExecutableProbeLab />
  </Step>
  <Step title="安全门：重放基线、单故障与恢复">
    <${profile.componentBase}SafetyGateLab />
  </Step>
</Stepper>

${profile.title}的探针真正计算对象/句柄、构建矩阵、池载荷、IOCTL请求、转储二分提示、DPC预算、IRP栈位置、通知队列、回调关联、Minifilter消息或Verifier请求。公式公开且只用于小模型；真实延迟、内存、安全和并发结论必须来自目标build、驱动包、测试机与捕获。`;
}

function protocolSection(profile) {
  return `## 最小可重现实验协议

1. ${profile.title}先冻结Windows产品与完整build、架构、SDK、WDK、Visual Studio、驱动模型、SYS/INF/CAT摘要、签名、VBS/HVCI、符号、VM快照、输入和预期结果。
2. ${profile.title}只在可丢弃VM或专用测试机运行签名参考驱动，保存${profile.artifact}；基线不稳、符号不匹配、对象身份不明或调试宿主不可用时停止。
3. ${profile.title}保持其余条件不变，只注入“${profile.fault}”，记录首个对象状态、NTSTATUS、IRQL、线程、CPU、时间、调用链、竞争性解释和停止条件。
4. ${profile.title}停止新请求与回调，反向排空IRP、队列、端口、实例、引用和设备，必要时执行Verifier reset或恢复快照；以同输入重放，无法恢复“${profile.invariant}”则标记失败或未知。

<Callout type="trap" title="${profile.title}误区一：作者样章或二版等于中文版整书">
${profile.title}只把18页样章当开放页授权，把二版与MIT仓库当迁移来源；中文版185坐标与作者一版204坐标之间的19项差异必须单列，不能复制、补写或倒写。
</Callout>

<Callout type="trap" title="${profile.title}误区二：接口同名就说明当前合同未变">
${profile.title}中的IRQL、池、WDM/KMDF、IRP、通知、Minifilter、签名和Verifier都必须回到目标build与当前Microsoft文档确认；Windows 11、x64或latest都不是足够身份。
</Callout>

<Callout type="trap" title="${profile.title}误区三：能加载、能蓝屏或有日志就证明机制">
${profile.title}不以一次加载、最终bug check、单条DbgPrint或综合分裁决；必须保存正确符号、稳定基线、唯一故障首错、竞争性解释、反向卸载和同输入恢复。
</Callout>`;
}

function exerciseEntries(profile) {
  if (profile.role === "chapter") {
    return profile.concepts
      .map((concept, index) => ({ concept, index }))
      .filter(({ concept }) => /^\d+\.\d+/u.test(concept));
  }
  return profile.concepts
    .map((concept, index) => ({ concept, index }))
    .filter(({ concept }) => /^第\d+章/u.test(concept));
}

function exercises(profile) {
  const entries = exerciseEntries(profile);
  const coordinateQuestions = entries
    .map(({ concept, index }, exerciseIndex) => {
      const key = evidenceKey(index, profile);
      const label = concept.replaceAll(".", "·");
      return `**问题 ${exerciseIndex + 1}：${concept}**

为${profile.title}的 ${key} 设计一个中文版一版/作者二版/目标平台差分、签名参考基线、唯一故障、首个对象或调用链信号和恢复断言，并说明${label}的IRQL或用户边界。

<Answer>
${profile.title}先冻结完整build、架构、工具链、驱动包、签名、VBS/HVCI、符号、VM和输入，把 ${key} 映射到对象身份、所有者、IRQL、控制前值与预期信号；只注入“${profile.fault}”。${profile.title}保存首个分岔与竞争性解释，停止新请求并反向清理后以同输入重新满足“${profile.invariant}”。样章外原文、未测build和未捕获竞态保留为未知。
</Answer>`;
    })
    .join("\n\n");
  const start = entries.length + 1;
  return `## 练习与答案

<Exercises>

${coordinateQuestions}

**问题 ${start}：为什么中文版185坐标不能静默扩成作者目录204坐标**

${profile.title}应怎样处理19项来源差异、18页样章和作者二版？

<Answer>
中文版185坐标是当前译本治理分母；作者一版公开目录204坐标用来发现19项差异，18页样章只支持开放页，二版和MIT仓库只支持迁移。${profile.title}必须把差异登记为待出版社正文核实，不能把作者更新、开放样章或二版示例冒充中文版缺失内容。
</Answer>

**问题 ${start + 1}：什么时候必须停止内核实验**

${profile.title}缺少哪些条件时不能继续？

<Answer>
${profile.title}缺少可丢弃VM或专用测试机、快照、备份、宿主内核调试器、转储、恢复启动、Verifier reset、正确符号、完整build/驱动包身份或稳定基线中的任一项就停止。生产设备、日常主机以及无法承受蓝屏、数据损坏、设备失联或启动失败的对象不在实验范围内。
</Answer>

</Exercises>`;
}

function glossary(profile) {
  const terms = [
    [
      "目标身份",
      `${profile.title}的Windows完整build、架构、SDK、WDK、工具链、驱动包、签名与安全状态`,
    ],
    [
      "执行上下文",
      `${profile.title}对象所处的线程/进程、IRQL、可分页性、等待、锁与用户缓冲区边界`,
    ],
    [
      "驱动对象链",
      `${profile.title}中Driver、Device、File、IRP、callback、filter、instance或context的所有权关系`,
    ],
    [
      "首个分岔",
      `${profile.title}单故障轨迹相对签名参考驱动最早出现状态、NTSTATUS或调用链差异的位置`,
    ],
    [
      "出版轨差异",
      `${profile.title}把中文版185坐标、作者一版204坐标、二版与目标平台分开的显式记录`,
    ],
    [
      "同输入恢复",
      `${profile.title}反向清理或恢复快照后用原驱动包与输入恢复对象、引用、队列和信号的断言`,
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
    )}构成最小证据语言；这些术语指向真实build、对象、IRQL、调用链与恢复，不生成成熟度、风险或性能综合分。

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

${profile.title}把${profile.focus}连接成可复核链：中文版目录给185正式坐标，作者一版页面暴露19项目录差异，18页样章限定局部授权，二版与MIT仓库只支持迁移，当前Microsoft文档和目标DDI限定实际合同。版本/IRQL合同、透明对象探针、唯一故障首错、反向卸载和同输入恢复共同决定能否上架。最终交付${profile.artifact}并同时报告未测build、未开放正文和安全边界。

${exercises(profile)}

${glossary(profile)}

<Attribution
  mode="independent-rewrite"
  sourceBasis="authorized-sample"
  workTitle="Pavel Yosifovich《Windows Kernel Programming》与李亮译《Windows内核编程》"
  adaptedUrl="${FIRST_EDITION}"
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
    probe: profile.probe,
    stages: profile.stages,
    gates: profile.gates,
  };
  return `"use client";

import {
  WindowsKernelEvidenceLab,
  type WindowsKernelEvidenceModel,
} from "@/components/mdx/windows-kernel-programming/v2/windows-kernel-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies WindowsKernelEvidenceModel;

export function ${profile.componentBase}VersionContextLab() {
  return <WindowsKernelEvidenceLab model={model} view="version-context" />;
}

export function ${profile.componentBase}ExecutableProbeLab() {
  return <WindowsKernelEvidenceLab model={model} view="executable-probe" />;
}

export function ${profile.componentBase}SafetyGateLab() {
  return <WindowsKernelEvidenceLab model={model} view="safety-gate" />;
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
  ${profile.componentBase}VersionContextLab,
  ${profile.componentBase}ExecutableProbeLab,
  ${profile.componentBase}SafetyGateLab,
} from "@/components/mdx/${BOOK}/v2/${profile.chapterSlug}";

${objectives(profile)}

## 为什么从这个问题开始

${profile.title}围绕“${profile.question}”建立贯穿任务。先冻结出版轨、目标build、驱动包和对象身份，再以小输入观察状态与调用链，最后用唯一故障和同输入恢复验收；只有守住“${profile.invariant}”并交付${profile.artifact}，目录术语、DDI名字或一次成功加载才可能升级为机制证据。

${sourceSection(profile)}

${conceptsSection(profile)}

${experimentSection(profile)}

${protocolSection(profile)}

${synthesis(profile)}
`;
  const data = {
    ...parsed.data,
    title: profile.title,
    description: `${profile.title}覆盖${profile.concepts.length}个正式目录坐标，用版本/IRQL合同、可执行对象探针与安全门交付${profile.artifact}`,
    demo: true,
    math: false,
    sourceUrl: FIRST_EDITION,
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
if (!manifest) throw new Error(`缺少manifest：${BOOK}`);
if (manifest.units.length !== 11) {
  throw new Error(`正式章数应为11，实际${manifest.units.length}`);
}
for (const unit of manifest.units) {
  if (!SPECS[unit.id] || !PATHS[unit.id]) {
    throw new Error(`缺少单元配置：${unit.id}`);
  }
  if (unit.concepts[0]?.[0] !== unit.title) {
    throw new Error(`${unit.id}首坐标必须是章根`);
  }
}

const allCoordinates = manifest.units.flatMap((unit) =>
  unit.concepts.map((group) => group[0]),
);
if (allCoordinates.length !== 185) {
  throw new Error(`中文版正式坐标应为185，实际${allCoordinates.length}`);
}
if (ORIGINAL_ONLY_COORDINATES.length !== 19) {
  throw new Error(
    `作者一版目录差异应为19，实际${ORIGINAL_ONLY_COORDINATES.length}`,
  );
}

const profiles = [
  enrich(
    "learningMap",
    "《Windows内核编程》185坐标与19项版本差异证据学习地图",
    "00-guide/wkp-official-learning-map",
    allCoordinates,
    MAP_SPEC,
    "learning-map",
  ),
  ...manifest.units.map((unit) =>
    enrich(
      unit.id,
      unit.title,
      PATHS[unit.id],
      unit.concepts.map((group) => group[0]),
      SPECS[unit.id],
      "chapter",
      unit.id,
    ),
  ),
  enrich(
    "finalReview",
    "《Windows内核编程》185坐标全书驱动证据总复习",
    "06-review/wkp-official-final-review",
    allCoordinates,
    REVIEW_SPEC,
    "final-review",
  ),
];
if (profiles.length !== 13) {
  throw new Error(`页面数量应为13，实际${profiles.length}`);
}

fs.mkdirSync(COMPONENT_ROOT, { recursive: true });
for (const profile of profiles) await transformPage(profile);

for (const unit of manifest.units) {
  const tuple = SPECS[unit.id];
  unit.chapterPath = PATHS[unit.id];
  unit.sourceMode = "independent-rewrite";
  unit.sourceAccess = "authorized-sample";
  unit.factSourceIds = [
    "firstEdition",
    "sample",
    "secondEdition",
    "authorRepo",
    ...tuple[6],
  ];
}
manifest.edition =
  "Pavel Yosifovich《Windows Kernel Programming》作者一版2020-12-10、455页；李亮译《Windows内核编程》，机械工业出版社，2021-06-25，310页，ISBN 9787111684756";
manifest.sourceKind =
  "official-author-first-edition-complete-toc-and-18-page-authorized-sample-cross-checked-with-chinese-edition-185-coordinate-manifest-plus-second-edition-migration-and-current-microsoft-driver-docs";
manifest.sourceUrl = FIRST_EDITION;
manifest.secondarySourceUrls = Object.values(SOURCES).filter(
  (url) => url !== FIRST_EDITION,
);
manifest.status =
  "verified-185-chinese-coordinate-authorized-sample-independent-rewrite-with-19-first-edition-toc-differences-and-current-platform-migration";
manifest.verifiedAt = "2026-07-30";
manifest.sourceAccess = "authorized-sample";
manifest.defaultSourceMode = "independent-rewrite";
manifest.disclosureNote =
  "中文版治理分母为11章185个正式坐标，章根已包含在concepts中。作者一版Leanpub页面更新于2020-12-10，公开目录按同口径为204个坐标，较中文版manifest多19项：线程栈、练习、用户态调试教程、DPC定时器、临界/保护区、自旋锁、IRP流/查看/完成、用户态客户、Desktop Objects、Pipes/Mailslots、DAX/DAS、Context Types/Managing Contexts、Verifier示例会话等。没有出版社正文证据时这些只登记为版本/译本目录差异，不扩充中文版分母。作者官方18页样章只开放第一章局部内容，因此全书为authorized-sample独立重构。作者二版和MIT示例仓库只做迁移轨；当前结论必须冻结完整Windows build、架构、SDK/WDK/VS、驱动模型、驱动包、签名、VBS/HVCI和符号。";
manifest.unitMappingEvidence =
  "quality/windows-kernel-programming-v2-profiles.json";
manifest.factSourcePolicy =
  "作者一版完整公开目录限定原版范围，中文版185坐标限定译本治理分母，18页授权样章只支持开放页局部核对；本站中文机制解释、对象探针、反例与练习为独立重构。作者二版与MIT仓库不得倒写为中文版内容。当前平台事实由Microsoft Learn和目标公开DDI核对，任何安全、性能或并发结论必须绑定完整build、驱动包、签名、VM/测试机、符号、唯一故障和恢复。";
manifest.factSources = Object.fromEntries(
  Object.entries(SOURCE_META).map(([id, [label, kind]]) => [
    id,
    { kind, label, url: SOURCES[id] },
  ]),
);
manifest.coverageMetrics = {
  targetFormalNodes: 185,
  coveredFormalNodes: 185,
  coveragePercent: 100,
};
manifest.metrics = {
  officialChapterRoots: 11,
  chineseEditionFormalNodesIncludingRoots: 185,
  authorFirstEditionPublicTocNodesIncludingRoots: 204,
  catalogDivergenceNodes: 19,
  authorizedSamplePages: 18,
  officialUnits: 11,
  learningMapPages: 1,
  chapterPages: 11,
  finalReviewPages: 1,
  totalPages: 13,
  interactiveViews: 39,
};

await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      generatedAt: "2026-07-30",
      sourceAccess: "authorized-sample",
      chineseEditionFormalNodes: 185,
      authorFirstEditionPublicTocNodes: 204,
      catalogDivergenceNodes: ORIGINAL_ONLY_COORDINATES,
      officialChapterRoots: 11,
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

console.log(
  "已重构13页、11章、185个中文版正式坐标、19项作者目录差异与39个交互视图。",
);
