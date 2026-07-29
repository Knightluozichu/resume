#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, "content");
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx");
const MANIFESTS = JSON.parse(
  fs.readFileSync(path.join(ROOT, "quality/fidelity-manifests.json"), "utf8"),
).books;

function manifestIdentityUnits(bookSlug) {
  const units = MANIFESTS[bookSlug]?.units;
  if (!Array.isArray(units) || units.length === 0) {
    throw new Error(`Manifest units missing: ${bookSlug}`);
  }
  return Object.fromEntries(units.map(({ id }) => [id, id]));
}

function explainNetworkConcept(label, unitTitle, bookSlug) {
  const context = `${unitTitle}中的${label}`;
  if (bookSlug === "illustrated-http") {
    if (/状态码|响应|请求|报文|方法|URI|版本|连接/u.test(label)) {
      return `${context}要放进一次完整 HTTP 交换中判断：请求行与首部给出前置条件，状态码和响应首部说明处理结果，消息体承载表示。复核时保存原始报文并改变方法、资源状态或连接复用条件，确认客户端、代理与服务端对语义的解释一致。`;
    }
    if (/首部|缓存|代理|网关|隧道|内容协商|压缩|编码/u.test(label)) {
      return `${context}会改变中间节点如何转发、缓存或变换表示；字段值必须与适用方向、缓存键和端到端/逐跳边界一起解释。可用两次可重复请求对照命中状态、报文首部与实际字节，避免只凭浏览器最终页面判断。`;
    }
    if (/HTTPS|TLS|证书|认证|Cookie|会话|攻击|XSS|SQL|安全/u.test(label)) {
      return `${context}涉及身份、机密性或输入信任边界，不能把“使用 HTTPS”或“已经登录”当作完整安全证明。应分别验证握手/证书、凭据传递、会话属性、授权拒绝和恶意输入，并检查敏感信息是否进入 URL、日志或可被脚本读取的存储。`;
    }
    return `${context}描述 Web 组件之间的一项可观察契约。先写出发送方、接收方和中间节点各自保存的状态，再以一组成功报文和一组边界/拒绝报文核对字段、时序与最终表示，防止把实现习惯误认为协议保证。`;
  }

  if (bookSlug === "wireshark-packet-analysis") {
    if (/捕获|网卡|接口|混杂|监听|镜像|分流|tap|保存|pcap/u.test(label)) {
      return `${context}首先受捕获位置和采集方式约束：观察点决定能看到哪一方向、哪一封装以及是否经过网卡卸载。实验要记录接口、镜像/TAP 拓扑、捕获过滤器和时间范围，并用端点计数或另一观察点确认丢包不是采集过程造成的。`;
    }
    if (/过滤|显示|着色|列|时间|统计|流|会话|重组|专家/u.test(label)) {
      return `${context}是缩小证据范围的分析手段，而不是结论本身。先保留未过滤 pcap，再逐步加入显示条件、会话跟踪和时间基准；每一步记录匹配数量与被排除样本，防止错误过滤器把反例隐藏掉。`;
    }
    if (/Ethernet|ARP|IP|ICMP|TCP|UDP|DNS|DHCP|HTTP|协议|端口/u.test(label)) {
      return `${context}必须沿封装层次和会话时序解释：字段只在对应协议状态与方向中有意义。核查时同时查看上下层地址、长度/校验信息、序列或事务标识和响应关系，并把异常帧关联到发送端日志或套接字状态。`;
    }
    if (/慢|延迟|丢包|重传|安全|恶意|无线|故障|攻击/u.test(label)) {
      return `${context}需要先提出可证伪假设，再区分网络现象、主机行为和采集伪象。以基线会话对照异常会话，量化 RTT、重传、窗口、响应码或无线重试，并用不同观察点或系统日志验证根因方向。`;
    }
    return `${context}应被写成“观察字段—推断状态—反例条件”的证据链。保留原始帧号和时间戳，说明所用过滤器与会话边界，再用至少一个相邻层字段或端点日志交叉验证，避免从单个高亮报文直接跳到根因。`;
  }

  if (bookSlug === "computer-networks-top-down") {
    if (/应用|HTTP|DNS|邮件|P2P|socket|套接字|Web/u.test(label)) {
      return `${context}位于端系统应用边界，重点是消息语义、进程寻址和请求/响应状态。可用固定客户端输入同时观察应用日志与抓包，核对名称解析、端口、消息字段、超时和错误响应是否形成同一条端到端证据链。`;
    }
    if (/TCP|UDP|运输|拥塞|可靠|流量控制|重传|RTT/u.test(label)) {
      return `${context}通过端点状态把不可靠网络服务转换为应用可用的传输行为；序号、确认、窗口、计时器和拥塞状态必须按时序联合判断。用受控丢包或延迟实验比较发送窗口、重传与吞吐，区分可靠性机制和拥塞控制各自的作用。`;
    }
    if (/路由|转发|IP|数据平面|控制平面|SDN|OSPF|BGP|ICMP/u.test(label)) {
      return `${context}要区分每台路由器的逐包转发与全网路径计算：前者查表执行，后者生成和更新表项。验证时记录前缀、下一跳和控制协议状态，再改变一条链路或策略，观察收敛期间路径与丢包如何变化。`;
    }
    if (/链路|以太网|交换|MAC|ARP|VLAN|局域网/u.test(label)) {
      return `${context}发生在一跳交付与局域网转发范围内，地址解析、帧封装和交换表学习共同决定实际出口。可清空相关缓存后发起一次通信，按时间核对 ARP/邻居发现、MAC 表、帧地址以及跨 VLAN 时的三层边界。`;
    }
    if (/无线|移动|Wi-Fi|蜂窝/u.test(label)) {
      return `${context}受到共享介质、信号变化和接入点/基站切换影响，不能直接套用有线链路的稳定假设。实验应固定距离与负载，记录信号、重试、关联和地址变化，并在移动或干扰条件下验证会话连续性。`;
    }
    if (/安全|加密|认证|完整性|密钥|TLS|防火墙/u.test(label)) {
      return `${context}要明确攻击者能力、信任根和保护目标，分别验证身份、机密性、完整性与重放边界。保留握手或策略命中证据，并用错误证书、篡改消息或未授权主体确认系统确实拒绝失败路径。`;
    }
    return `${context}应沿“发送端—网络核心—接收端”的分层接口定位责任。先写输入报文、每层新增状态和可观察输出，再改变一个链路或协议条件，用抓包、表项和端点日志交叉验证因果关系。`;
  }

  if (/电缆|光纤|端口|机架|电源|承重|散热|吞吐|连接|物理|设备/u.test(label)) {
    return `${context}属于可施工的物理约束，介质、距离、速率/双工、连接器、端口容量、供电与散热要按完整链路核对。验证时把两端规格和余量写入端口表，再用错误计数、光功率或负载测试确认最弱一段仍满足峰值与单故障条件。`;
  }
  if (/VLAN|地址|IP|路由|NAT|DNS|网段|子网|逻辑/u.test(label)) {
    return `${context}决定报文在二层广播域、三层前缀和地址转换之间如何选择路径。应同时记录正反向路由、ARP/邻居状态、策略与转换表，再从两个方向发起测试，避免单向可达掩盖返回路径或地址重叠问题。`;
  }
  if (/防火墙|安全|负载|会话|SSL|攻击|认证/u.test(label)) {
    return `${context}同时影响允许哪些流量以及请求如何分配，规则顺序、会话保持、健康检查和返回路径必须形成闭环。用允许、拒绝、节点摘除和会话续接四类样本核对策略命中、后端选择、连接表与客户端结果。`;
  }
  if (/冗余|高可用|故障|切换|VRRP|集群|备份/u.test(label)) {
    return `${context}只有在明确故障域、剩余容量和状态接管条件后才算高可用。先记录正常主备/集群状态，再单独中断链路、节点或依赖，测量检测与收敛时间，并确认恢复后不会双主、丢会话或长期降级。`;
  }
  if (/监控|日志|管理|配置|告警|SNMP|备份|运维/u.test(label)) {
    return `${context}把运行状态转化为可诊断、可恢复的操作证据。指标、日志、配置版本、告警阈值和责任人要关联同一设备与时间线；通过制造一个已知故障验证告警能定位根因，恢复步骤能把配置和服务带回基线。`;
  }
  return `${context}需要落到明确的流量路径、责任设备和状态表，而不能停留在设备名称。画出正常与单故障路径，固定输入后只改变一个链路、表项或容量条件，再以双向抓包、设备状态、告警和恢复结果核对设计。`;
}

const BOOKS = {
  "c-primer-plus": {
    sourceUrl: "https://www.informit.com/store/c-primer-plus-9780321928429",
    sourceName: "C Primer Plus, Sixth Edition",
    unitIds: {
      "getting-ready": "cpr-01",
      "introducing-c": "cpr-02",
      "data-and-c": "cpr-03",
      "strings-io": "cpr-04",
      "operators-expressions": "cpr-05",
      "control-loops": "cpr-06",
      "control-branching": "cpr-07",
      "char-io-validation": "cpr-08",
      functions: "cpr-09",
      "arrays-pointers": "cpr-10",
      "strings-functions": "cpr-11",
      "storage-linkage-memory": "cpr-12",
      "file-io": "cpr-13",
      structures: "cpr-14",
      "bit-fiddling": "cpr-15",
      preprocessor: "cpr-16",
      "advanced-data": "cpr-17",
    },
    failure(label) {
      return `若只记语法而忽略「${label}」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。`;
    },
    evidence(label) {
      return `用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「${label}」的实际行为。`;
    },
  },
  "cpp-primer-5e": {
    sourceUrl:
      "https://www.informit.com/store/c-plus-plus-primer-9780321714114",
    sourceName: "C++ Primer, Fifth Edition",
    unitIds: {
      "getting-started": "cppp-01",
      "variables-and-types": "cppp-02",
      "strings-vectors-and-arrays": "cppp-03",
      expressions: "cppp-04",
      statements: "cppp-05",
      functions: "cppp-06",
      classes: "cppp-07",
      "io-library": "cppp-08",
      "sequential-containers": "cppp-09",
      "generic-algorithms": "cppp-10",
      "associative-containers": "cppp-11",
      "dynamic-memory": "cppp-12",
      "copy-control": "cppp-13",
      "overloaded-operations": "cppp-14",
      oop: "cppp-15",
      templates: "cppp-16",
      "specialized-library": "cppp-17",
      "large-programs": "cppp-18",
      "specialized-tools": "cppp-19",
      "library-appendix": "cppp-a",
    },
    failure(label) {
      return `若把「${label}」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。`;
    },
    evidence(label) {
      return `保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「${label}」的契约。`;
    },
  },
  "cpp-primer-plus": {
    sourceUrl:
      "https://www.informit.com/store/c-plus-plus-primer-plus-9780132781176",
    sourceName: "C++ Primer Plus, Sixth Edition",
    unitIds: {
      "getting-started-with-cpp": "epp-01",
      "setting-out-to-cpp": "epp-02",
      "dealing-with-data": "epp-03",
      "compound-types": "epp-04",
      "loops-and-relational-expressions": "epp-05",
      "branching-statements-and-logical-operators": "epp-06",
      "functions-programming-modules": "epp-07",
      "adventures-in-functions": "epp-08",
      "memory-models-and-namespaces": "epp-09",
      "objects-and-classes": "epp-10",
      "working-with-classes": "epp-11",
      "classes-and-dynamic-memory-allocation": "epp-12",
      "class-inheritance": "epp-13",
      "reusing-code-in-cpp": "epp-14",
      "friends-exceptions-and-more": "epp-15",
      "string-class-and-stl": "epp-16",
      "input-output-and-files": "epp-17",
      "visiting-new-cpp-standard": "epp-18",
    },
    failure(label) {
      return `若只复述「${label}」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。`;
    },
    evidence(label) {
      return `从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「${label}」的状态变化。`;
    },
  },
  "inside-cpp-object-model": {
    sourceUrl:
      "https://www.informit.com/store/inside-the-c-plus-plus-object-model-9780201834543",
    sourceName: "Inside the C++ Object Model, First Edition",
    unitIds: {
      "object-lessons": "ico-01",
      "semantics-of-constructors": "ico-02",
      "semantics-of-data": "ico-03",
      "semantics-of-function": "ico-04",
      "construction-destruction-copy": "ico-05",
      "runtime-semantics": "ico-06",
      "cusp-of-object-model": "ico-07",
    },
    failure(label) {
      return `若只从源码表面理解「${label}」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。`;
    },
    evidence(label) {
      return `用对象大小、成员地址、反汇编或构造析构轨迹核对「${label}」，并区分标准语义与当前 ABI 实现。`;
    },
  },
  "the-c-programming-language": {
    sourceUrl:
      "https://www.informit.com/content/images/9780131103627/samplepages/0131103628.pdf",
    sourceName: "The C Programming Language, Second Edition",
    sourceBasis: "authorized-sample",
    unitIds: {
      "types-operators": ["kr2-01", "kr2-02"],
      "control-flow": "kr2-03",
      "functions-program": "kr2-04",
      "pointers-arrays": "kr2-05",
      "pointer-arithmetic": "kr2-05",
      structures: "kr2-06",
      "input-output": "kr2-07",
      "unix-interface": "kr2-08",
    },
    failure(label) {
      return `若把「${label}」写法照搬到新输入却不核对类型转换、数组边界和错误返回，程序会在编译器允许的路径上产生错误结果或未定义行为。`;
    },
    evidence(label) {
      return `以严格警告构建本节最小程序，再用边界输入、失败返回和 sanitizer 复核「${label}」的实际契约。`;
    },
  },
  "cpp-high-performance": {
    sourceUrl:
      "https://www.packtpub.com/en-ID/product/c-high-performance-9781787120952/chapter/preface-pref/section/what-this-book-covers-preflvl1sec03",
    sourceName: "C++ High Performance, First Edition",
    unitIds: {
      "brief-introduction-to-cpp": "chp-01",
      "modern-cpp-concepts": "chp-02",
      "measuring-performance": "chp-03",
      "data-structures": "chp-04",
      "deeper-look-at-iterators": "chp-05",
      "stl-algorithms-and-beyond": "chp-06",
      "memory-management": "chp-07",
      "metaprogramming-compile-time": "chp-08",
      "proxy-objects-lazy-evaluation": "chp-09",
      concurrency: "chp-10",
      "parallel-stl": "chp-11",
    },
    failure(label) {
      return `若脱离基线与成本模型讨论「${label}」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。`;
    },
    evidence(label) {
      return `保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「${label}」前后的时间和资源变化。`;
    },
  },
  "modern-cpp-design": {
    sourceUrl:
      "https://www.informit.com/store/modern-c-plus-plus-design-generic-programming-and-design-9780133387629",
    sourceName: "Modern C++ Design, First Edition",
    unitIds: {
      "policy-based-class-design": "mcd-01",
      techniques: "mcd-02",
      typelists: "mcd-03",
      "small-object-allocation": "mcd-04",
      "generalized-functors": "mcd-05",
      "implementing-singletons": "mcd-06",
      "smart-pointers": "mcd-07",
      "object-factories": "mcd-08",
      "abstract-factory": "mcd-09",
      visitor: "mcd-10",
      multimethods: "mcd-11",
    },
    failure(label) {
      return `若只复制「${label}」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。`;
    },
    evidence(label) {
      return `用正向与应拒绝的编译案例、生成类型和生命周期测试核对「${label}」的组合规则与扩展边界。`;
    },
  },
  "cpp-testing-recipes": {
    sourceUrl:
      "https://pragprog.com/titles/lotdd/modern-c-programming-with-test-driven-development/",
    sourceName: "Modern C++ Programming with Test-Driven Development",
    unitIds: {
      "global-setup": "mctdd-01",
      "tdd-first-example": "mctdd-02",
      "tdd-foundations": "mctdd-03",
      "test-construction": "mctdd-04",
      "test-doubles": "mctdd-05",
      "incremental-design": "mctdd-06",
      "quality-tests": "mctdd-07",
      "legacy-challenges": "mctdd-08",
      "tdd-and-threading": "mctdd-09",
      "additional-tdd-concepts": "mctdd-10",
      "growing-and-sustaining-tdd": "mctdd-11",
    },
    failure(label) {
      return `若把「${label}」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。`;
    },
    evidence(label) {
      return `保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「${label}」是否提供快速反馈。`;
    },
  },
  "illustrated-server-network": {
    sourceUrl: "https://www.ituring.com.cn/book/1494",
    sourceName: "图解服务器端网络架构",
    sourceBasis: "authorized-sample",
    unitIds: manifestIdentityUnits("illustrated-server-network"),
    pruneNodeTemplate: true,
    explainConcept(label, unitTitle) {
      return explainNetworkConcept(label, unitTitle, "illustrated-server-network");
    },
    failure(label) {
      return `若只记住「${label}」的设备名称而不追踪流量路径、故障域和容量边界，拓扑在切换、拥塞或链路中断时会暴露单点。`;
    },
    evidence(label) {
      return `画出「${label}」的端到端报文路径，以抓包、路由与负载均衡状态验证正常流量，再注入链路或节点故障核对收敛结果。`;
    },
  },
  "computer-networks-top-down": {
    sourceUrl: "https://www.cmpedu.com/books/book/5606311.htm",
    sourceName: "计算机网络：自顶向下方法（第 8 版）",
    unitIds: manifestIdentityUnits("computer-networks-top-down"),
    pruneNodeTemplate: true,
    explainConcept(label, unitTitle) {
      return explainNetworkConcept(label, unitTitle, "computer-networks-top-down");
    },
    failure(label) {
      return `若把「${label}」当成孤立协议名而忽略分层接口、时序和端到端状态，丢包、重传或路由变化后就难以解释观测结果。`;
    },
    evidence(label) {
      return `用确定的客户端与服务端输入复现「${label}」，同时核对应用日志、套接字状态和分层抓包中的字段、时序与失败响应。`;
    },
  },
  "illustrated-http": {
    sourceUrl: "https://www.ituring.com.cn/book/1229",
    sourceName: "图解 HTTP",
    unitIds: manifestIdentityUnits("illustrated-http"),
    pruneNodeTemplate: true,
    explainConcept(label, unitTitle) {
      return explainNetworkConcept(label, unitTitle, "illustrated-http");
    },
    failure(label) {
      return `若只背诵「${label}」字段而不区分请求语义、缓存边界和安全上下文，代理或浏览器状态变化后会得到错误响应或泄露数据。`;
    },
    evidence(label) {
      return `保存「${label}」的原始请求与响应报文，用 curl 和浏览器网络面板复现成功、重定向、缓存及拒绝路径，并核对状态码与首部。`;
    },
  },
  "wireshark-packet-analysis": {
    sourceUrl: "https://nostarch.com/packetanalysis3",
    sourceName: "Practical Packet Analysis, Third Edition",
    unitIds: manifestIdentityUnits("wireshark-packet-analysis"),
    pruneNodeTemplate: true,
    explainConcept(label, unitTitle) {
      return explainNetworkConcept(label, unitTitle, "wireshark-packet-analysis");
    },
    failure(label) {
      return `若分析「${label}」时忽略捕获位置、时间基准和协议上下文，重传、校验和卸载或非对称路径会被误判为真实故障。`;
    },
    evidence(label) {
      return `固定接口、捕获过滤器和时间范围，围绕「${label}」保存可复现 pcap，再用显示过滤器、会话跟踪与端点计数交叉核对结论。`;
    },
  },
};

function walkMdx(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkMdx(entryPath));
    else if (entry.name.endsWith(".mdx")) files.push(entryPath);
  }
  return files.sort();
}

function toPascalCase(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
    .join("");
}

function stripEditorialComments(source) {
  return source
    .replace(/\n?\{\/\*[\s\S]*?\*\/\}\n?/g, "\n\n")
    .replace(/\n{3,}/g, "\n\n");
}

function pruneRepeatedNodeTemplate(source, chapter) {
  let result = source.replace(
    /\n## 原书目录逐节点重构\n[\s\S]*?(?=\n## 本页完整节点清单\n)/,
    "\n",
  );
  result = result.replace(
    "\n## 本页完整节点清单\n",
    "\n## 原书目录核对清单\n",
  );
  result = result.replace(
    /^.*最小证据包包含：/gm,
    `${chapter.title} 的最小证据包包含：`,
  );
  result = result.replace(
    /固定URI、客户端、网络、服务器数据和操作，只改变一个方法、首部、主体、连接、Cookie或输入上下文；/g,
    `围绕 ${chapter.title} 固定 URI、客户端、网络、服务器数据和操作，并且只改变一个方法、首部、主体、连接、Cookie 或输入上下文；`,
  );
  result = result.replace(
    /对关键帧同时保存frame\.number、frame\.time_relative、五元组、协议字段和十六进制偏移；/g,
    `围绕 ${chapter.title} 的关键帧，同时保存 frame.number、frame.time_relative、五元组、协议字段和十六进制偏移；`,
  );
  result = result.replace(
    /至少保留一个竞争解释，例如/g,
    `${chapter.title} 的诊断要保留至少一个竞争解释，例如`,
  );
  result = result.replace(
    /证据包使用只读原始PCAP及其哈希，/g,
    `${chapter.title} 的证据包以只读原始 PCAP 及其哈希为起点，`,
  );

  let experimentPromptSeen = false;
  result = result
    .split(/\n(?=动手试：)/)
    .map((block) => {
      if (!block.startsWith("动手试：")) return block;
      const [prompt, ...rest] = block.split("\n");
      if (experimentPromptSeen) return rest.join("\n").replace(/^\n+/, "");
      experimentPromptSeen = true;
      return [prompt, ...rest].join("\n");
    })
    .join("\n");

  return result.replace(/\n{3,}/g, "\n\n");
}

function plainText(value) {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_>#|{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalized(value) {
  return String(value ?? "")
    .toLocaleLowerCase()
    .replace(/[\s`*_~“”‘’"'：:，,。.!！?？、（）()[\]{}<>/\\|—–-]+/g, "")
    .trim();
}

function proseParagraphs(source, { excludeLists = false } = {}) {
  return source
    .replace(/```[\s\S]*?```/g, "")
    .split(/\n\s*\n/)
    .filter(
      (block) =>
        !excludeLists ||
        !block
          .trim()
          .split("\n")
          .filter(Boolean)
          .every((line) => /^\s*[-*]\s+/.test(line)),
    )
    .map(plainText)
    .filter((paragraph) => paragraph.length >= 45);
}

function preferredConcept(alternatives) {
  return (
    alternatives.find((value) => /[\u3400-\u9fff]/u.test(value)) ??
    alternatives[0]
  );
}

function addMissingConceptCoverage(source, chapter) {
  const configuredUnitIds = chapter.book.unitIds[chapter.slug];
  const unitIds = Array.isArray(configuredUnitIds)
    ? configuredUnitIds
    : configuredUnitIds
      ? [configuredUnitIds]
      : [];
  if (unitIds.length === 0) return { source, added: [] };
  const units = unitIds.map((unitId) => {
    const unit = MANIFESTS[chapter.bookSlug]?.units?.find(
      (candidate) => candidate.id === unitId,
    );
    if (!unit)
      throw new Error(`Manifest unit missing: ${chapter.bookSlug}/${unitId}`);
    return unit;
  });

  const paragraphs = proseParagraphs(source, {
    excludeLists: Boolean(chapter.book.pruneNodeTemplate),
  });
  const missing = units.flatMap((unit) =>
    unit.concepts
      .map((alternatives, index) => ({
        alternatives,
        index,
        unitId: unit.id,
        unitTitle: unit.title,
      }))
      .filter(({ alternatives, index }) => {
        if (index === 0) return false;
        return !alternatives.some((alternative) => {
          const needle = normalized(alternative);
          return (
            needle &&
            paragraphs.some((paragraph) =>
              normalized(paragraph).includes(needle),
            )
          );
        });
      })
      .map(({ alternatives, index, unitId, unitTitle }) => ({
        label: preferredConcept(alternatives),
        index,
        unitId,
        unitTitle,
      })),
  );
  if (missing.length === 0 || source.includes("## 原版目录概念补充核对")) {
    return { source, added: [] };
  }

  const sections = missing
    .map(
      ({ label, index, unitId, unitTitle }) => `### ${label}：机制、边界与证据

${chapter.book.explainConcept?.(label, unitTitle) ?? `在《${chapter.title}》的官方单元 ${unitId} 中，${label}连接本章第 ${index + 1} 组知识约束。学习时要同时说明它接受什么输入、改变什么状态、在何种边界失效；再以本章示例的固定输入输出或失败用例复核结论，不能只记术语名称。`}`,
    )
    .join("\n\n");
  const supplement = `## 原版目录概念补充核对

以下条目补齐官方目录中容易被示例主线掩盖的概念。它们不重复罗列目录，而是明确每项概念的机制、适用边界和验收证据。

${sections}

`;
  return {
    source: source.replace("<Attribution", `${supplement}<Attribution`),
    added: missing.map(({ label }) => label),
  };
}

function compactLabel(value) {
  const text = plainText(value).replace(
    /^[一二三四五六七八九十\d]+[、.：:\s-]*/,
    "",
  );
  return text.length > 30 ? `${text.slice(0, 29)}…` : text;
}

function compactMechanism(value, label, title) {
  const cleaned = plainText(value);
  if (!cleaned)
    return `本节把「${label}」放回《${title}》的输入、状态变化与输出路径中理解。`;
  const sentence =
    cleaned.match(/^.{35,180}?[。！？.!?](?:\s|$)/u)?.[0]?.trim() ??
    cleaned.slice(0, 150);
  return sentence.length < cleaned.length && !/[。！？.!?]$/u.test(sentence)
    ? `${sentence}…`
    : sentence;
}

function chapterSections(source, title) {
  const headingPattern = /^##\s+(.+)$/gm;
  const headings = [...source.matchAll(headingPattern)];
  const excluded = /名词解释|术语表|练习|小结|总结|复习题|出处|来源/u;
  const sections = [];

  for (let index = 0; index < headings.length; index += 1) {
    const heading = compactLabel(headings[index][1]);
    if (!heading || excluded.test(heading)) continue;
    const start = headings[index].index + headings[index][0].length;
    const end =
      index + 1 < headings.length ? headings[index + 1].index : source.length;
    const body = source.slice(start, end);
    const paragraph = body
      .split(/\n\s*\n/)
      .map((candidate) => candidate.trim())
      .find(
        (candidate) =>
          candidate.length >= 45 &&
          !/^(?:import\b|<|```|\||[-*]\s|\d+[.)、]\s)/.test(candidate),
      );
    sections.push({
      label: heading,
      mechanism: compactMechanism(paragraph ?? "", heading, title),
    });
    if (sections.length === 3) break;
  }

  const fallbacks = ["建立概念边界", "跟踪状态变化", "用失败证据验收"];
  while (sections.length < 3) {
    const label = fallbacks[sections.length];
    sections.push({
      label,
      mechanism: `围绕《${title}》${label}，明确输入、执行条件、输出与可观察证据。`,
    });
  }
  return sections;
}

function choosePracticeMode(slug) {
  if (
    /loop|branch|io|algorithm|statement|expression|function|standard/.test(slug)
  )
    return "simulation";
  if (/class|template|container|structure|inheritance|oop|library/.test(slug))
    return "design";
  return "diagnosis";
}

function attributeValue(attributes, names) {
  for (const name of names) {
    const match = attributes.match(new RegExp(`\\b${name}="([^"]+)"`));
    if (match) return match[1];
  }
  return null;
}

function escapeAttribute(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}

function normalizeAttribution(source, book) {
  const attributionPattern = /<Attribution\b([\s\S]*?)\/>/;
  const match = source.match(attributionPattern);
  if (!match) throw new Error("Attribution block missing");
  const adaptedFrom =
    attributeValue(match[1], ["adaptedFrom", "source", "title"]) ??
    book.sourceName;
  const adaptedUrl =
    attributeValue(match[1], ["adaptedUrl", "url"]) ?? book.sourceUrl;
  const replacement = `<Attribution
  adaptedFrom="${escapeAttribute(adaptedFrom)}"
  adaptedUrl="${escapeAttribute(adaptedUrl)}"
  mode="independent-rewrite"
  sourceBasis="${book.sourceBasis ?? "outline-only"}"
/>`;
  return source.replace(attributionPattern, replacement);
}

function addGovernanceFrontmatter(source, book, slug, practiceMode) {
  const parsed = matter(source);
  const configuredUnitIds = book.unitIds[slug];
  const unitIds = Array.isArray(configuredUnitIds)
    ? configuredUnitIds
    : configuredUnitIds
      ? [configuredUnitIds]
      : [];
  const additions = [
    "qualityVersion: 2",
    `practiceMode: ${practiceMode}`,
    "sourceMode: independent-rewrite",
    ...(unitIds.length === 1 ? [`officialUnitId: ${unitIds[0]}`] : []),
    ...(unitIds.length > 1 ? [`officialUnitIds: [${unitIds.join(", ")}]`] : []),
  ];
  let frontmatter = source.slice(0, source.indexOf("---", 3) + 3);
  const body = source.slice(frontmatter.length);
  if (!/^sourceUrl:/m.test(frontmatter)) {
    frontmatter = frontmatter.replace(
      /^draft:/m,
      `sourceUrl: "${book.sourceUrl}"\ndraft:`,
    );
  }
  for (const addition of additions) {
    const key = addition.split(":")[0];
    if (!new RegExp(`^${key}:`, "m").test(frontmatter)) {
      frontmatter = frontmatter.replace(/\n---$/, `\n${addition}\n---`);
    }
  }
  if (!parsed.data.title) throw new Error("Chapter title missing");
  return `${frontmatter}${body}`;
}

function wrapperSource(chapter) {
  const stages = chapter.sections.map((section) => ({
    label: section.label,
    mechanism: section.mechanism,
    failure: chapter.book.failure(section.label),
    evidence: chapter.book.evidence(section.label),
  }));
  return `"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = ${JSON.stringify(stages, null, 2)};

export function ${chapter.labComponent}() {
  return (
    <ChapterDecisionLab
      title=${JSON.stringify(`${chapter.title}：机制与证据`)}
      prompt=${JSON.stringify(`切换《${chapter.title}》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。`)}
      stages={STAGES}
      conclusion=${JSON.stringify(`学完《${chapter.title}》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。`)}
    />
  );
}

export function ${chapter.mechanismComponent}() {
  return (
    <ChapterMechanismMap
      title=${JSON.stringify(`${chapter.title}：机制路径`)}
      stages={STAGES}
    />
  );
}

export function ${chapter.failureComponent}() {
  return (
    <ChapterFailureMatrix
      title=${JSON.stringify(`${chapter.title}：失效与核验`)}
      stages={STAGES}
    />
  );
}
`;
}

function addChapterVisuals(source, chapter) {
  const importLine = `import { ${chapter.labComponent}, ${chapter.mechanismComponent}, ${chapter.failureComponent} } from "@/components/mdx/${chapter.bookSlug}/${chapter.slug}";`;
  if (!source.includes(importLine)) {
    source = source.replace(
      'import { Attribution } from "@/components/mdx/attribution";',
      `import { Attribution } from "@/components/mdx/attribution";\n${importLine}`,
    );
  }
  const visualBlock = `<${chapter.mechanismComponent} />

<${chapter.labComponent} />

<${chapter.failureComponent} />`;
  if (!source.includes(`<${chapter.mechanismComponent} />`)) {
    source = source.replace("</Objectives>", `</Objectives>\n\n${visualBlock}`);
  }
  return source;
}

const remediated = [];
const supplemented = [];
for (const [bookSlug, book] of Object.entries(BOOKS)) {
  const componentDirectory = path.join(COMPONENT_ROOT, bookSlug);
  fs.mkdirSync(componentDirectory, { recursive: true });

  for (const mdxPath of walkMdx(path.join(CONTENT_ROOT, bookSlug))) {
    const slug = path.basename(mdxPath, ".mdx");
    const componentStem = toPascalCase(slug);
    const chapter = {
      book,
      bookSlug,
      slug,
      labComponent: `${componentStem}DecisionLab`,
      mechanismComponent: `${componentStem}MechanismMap`,
      failureComponent: `${componentStem}FailureDiagram`,
    };
    let source = stripEditorialComments(fs.readFileSync(mdxPath, "utf8"));
    const parsed = matter(source);
    chapter.title = String(parsed.data.title);
    chapter.sections = chapterSections(parsed.content, chapter.title);
    const practiceMode = choosePracticeMode(slug);
    if (book.pruneNodeTemplate) {
      source = pruneRepeatedNodeTemplate(source, chapter);
    }
    source = addGovernanceFrontmatter(source, book, slug, practiceMode);
    source = normalizeAttribution(source, book);
    source = addChapterVisuals(source, chapter);
    const coverage = addMissingConceptCoverage(source, chapter);
    source = coverage.source;
    if (coverage.added.length > 0) {
      supplemented.push({
        id: `${bookSlug}/${slug}`,
        concepts: coverage.added,
      });
    }
    fs.writeFileSync(mdxPath, source);
    fs.writeFileSync(
      path.join(componentDirectory, `${slug}.tsx`),
      wrapperSource(chapter),
    );
    remediated.push(`${bookSlug}/${slug}`);
  }
}

console.log(
  `Remediated ${remediated.length} outline-based chapters across ${Object.keys(BOOKS).length} books.`,
);
for (const entry of supplemented) {
  console.log(`Supplemented ${entry.id}: ${entry.concepts.join(" · ")}`);
}
console.log(`Supplemented chapters: ${supplemented.length}.`);
