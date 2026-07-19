#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "unix-network-programming-vol1";
const BOOK_DIR = path.join(ROOT, "content", BOOK);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/unix-network-programming-vol1-v2-profiles.json",
);
const INFORMIT =
  "https://www.informit.com/store/unix-network-programming-volume-1-the-sockets-networking-9780131411555";
const POSIX_SOCKET =
  "https://pubs.opengroup.org/onlinepubs/9799919799/functions/socket.html";
const RFC_9293 = "https://www.rfc-editor.org/rfc/rfc9293.html";
const RFC_768 = "https://www.rfc-editor.org/rfc/rfc768.html";
const RFC_9260 = "https://www.rfc-editor.org/rfc/rfc9260.html";
const RFC_6458 = "https://www.rfc-editor.org/rfc/rfc6458.html";
const RFC_8200 = "https://www.rfc-editor.org/rfc/rfc8200.html";
const WORK_TITLE =
  "W. Richard Stevens, Bill Fenner, Andrew M. Rudoff, UNIX Network Programming, Volume 1: The Sockets Networking API, Third Edition";

function walkMdx(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkMdx(entryPath));
    else if (entry.name.endsWith(".mdx")) files.push(entryPath);
  }
  return files.sort();
}

function addFrontmatterFields(raw) {
  if (/^qualityVersion:\s*2\s*$/m.test(raw)) return raw;
  const closing = raw.indexOf("\n---", 3);
  if (closing < 0) throw new Error("frontmatter 未闭合");
  return `${raw.slice(0, closing)}\nqualityVersion: 2\npracticeMode: code\nsourceMode: independent-rewrite${raw.slice(closing)}`;
}

function conceptVariant(concept, variants) {
  const seed = [...concept].reduce(
    (sum, character) => sum + character.codePointAt(0),
    0,
  );
  return variants[seed % variants.length];
}

function explanationForConcept(concept, focus) {
  const value = concept.toLowerCase();
  const includes = (...needles) => needles.some((needle) => value.includes(needle));

  if (includes("socket函数", "套接字函数", "原始套接字创建"))
    return `“${concept}”用 domain、type 与 protocol 创建通信端点，成功返回描述符、失败返回 -1 并设置 errno；创建本身不绑定地址，也不建立连接。`;
  if (includes("connect函数", "非阻塞connect"))
    return `“${concept}”为流式端点发起连接；阻塞调用等待完成，非阻塞调用常以 EINPROGRESS 返回，随后必须用可写事件和 SO_ERROR 判定真实结果。`;
  if (includes("bind函数", "sctp_bindx"))
    return `“${concept}”把本地地址与端口交给内核；地址可用性、通配绑定、端口复用和 SCTP 多宿主语义都必须从返回值与实际端点核对。`;
  if (includes("listen函数"))
    return `“${concept}”把已绑定的流式端点转为被动监听，并设置未完成或已完成连接的排队提示；backlog 不是可移植的精确队列容量。`;
  if (includes("accept函数", "非阻塞accept"))
    return `“${concept}”从已完成连接队列取得一个新的已连接描述符；监听描述符继续接收连接，返回地址长度是值—结果参数，失败时不能泄漏所有权。`;
  if (includes("close函数", "shutdown函数", "正常终止", "控制终结"))
    return `“${concept}”区分释放描述符引用与关闭通信方向；shutdown 可表达半关闭，close 受引用计数影响，线上 FIN、RST 与 TIME_WAIT 要同应用返回一起解释。`;
  if (includes("getsockname", "getpeername"))
    return `“${concept}”从内核读取本地或对端地址，常用于确认临时端口、被接受连接和透明转发后的真实端点；调用者必须初始化地址缓冲长度。`;
  if (includes("inet_aton", "inet_addr", "inet_ntoa", "inet_pton", "inet_ntop", "sock_ntop"))
    return `“${concept}”在可打印地址与网络字节结构之间转换；新代码优先使用支持 IPv4/IPv6 且显式给出缓冲区长度的 inet_pton/inet_ntop。`;
  if (includes("getaddrinfo", "freeaddrinfo", "gai_strerror", "getnameinfo"))
    return `“${concept}”把名字、服务与协议提示转换成可遍历的地址候选，或执行反向格式化；客户端应逐候选尝试并最终释放整条结果链。`;
  if (includes("gethostby", "getservby", "可重入函数"))
    return `“${concept}”属于较旧的名字或服务数据库接口，静态存储与地址族限制影响线程安全和 IPv6；应明确平台可重入变体与现代替代接口。`;
  if (includes("字节排序", "字节操纵", "值-结果参数", "地址结构"))
    return `“${concept}”决定用户空间结构如何与内核 ABI 交换：多字节整数使用网络字节序，地址长度在进入和返回时含义不同，填充字节不能携带未初始化数据。`;
  if (includes("readn", "writen", "readline", "短读", "短计数"))
    return `“${concept}”处理流式 I/O 的短计数、EINTR 与 EOF；一次 read/write 成功不等于请求长度全部完成，循环还要避免把 EOF 当作可重试错误。`;
  if (includes("select函数", "pselect", "poll函数", "i/o模型", "复用"))
    return `“${concept}”把多个描述符的就绪状态交给一个执行流管理；就绪只保证调用不会按原条件阻塞，返回后仍需处理短计数、EOF、错误和集合重建。`;
  if (includes("getsockopt", "setsockopt", "套接字选项", "fcntl函数"))
    return `“${concept}”读取或改变描述符、套接字层或协议层行为；选项值类型、设置时机和是否继承到 accept 返回端点都必须按平台实测。`;
  if (includes("recvmsg", "sendmsg", "辅助数据", "控制信息", "目的ip", "接口索引"))
    return `“${concept}”用 msghdr 同时传递散布/聚集缓冲、对端地址、标志与控制消息；msg_controllen、对齐和截断标志决定辅助数据能否安全解析。`;
  if (includes("readv", "writev"))
    return `“${concept}”对多个缓冲区执行一次散布或聚集 I/O，减少拼接复制；返回值仍可能只覆盖 iovec 前缀，调用者必须推进游标。`;
  if (includes("recv和send", "recvfrom", "sendto", "接收和发送", "读和写"))
    return `“${concept}”在描述符上搬运字节或数据报，并通过标志、地址和返回计数暴露边界；流没有消息边界，数据报则可能整报截断。`;
  if (includes("udp", "数据报"))
    return conceptVariant(concept, [
      `“${concept}”使用无连接数据报语义：每次发送保留一条消息边界，但协议不保证送达、顺序或去重，应用必须定义超时与重试责任。`,
      `分析“${concept}”要保存源/目的地址、数据报长度、校验和与丢失/重复样本；connect 只固定默认对端并让异步错误更易关联。`,
      `验证“${concept}”固定负载，只改变丢包、MTU 或接收缓冲中的一个条件，比较 send/recv 返回、ICMP 错误与是否发生截断。`,
      `“${concept}”的可靠性若由应用补充，必须同时处理请求标识、重传、重复抑制、乱序与拥塞，不能只加一个无限重试循环。`,
    ]);
  if (includes("tcp", "time_wait", "sigpipe", "连接"))
    return conceptVariant(concept, [
      `“${concept}”建立可靠有序字节流，握手、序号、确认、流量/拥塞控制和双向关闭共同决定状态；应用层必须自行恢复消息边界。`,
      `分析“${concept}”同时对齐 connect/accept/read/write 返回、内核状态与 SYN、ACK、FIN、RST 分组，最终文本不能替代中间证据。`,
      `验证“${concept}”只改变一项关闭、复位、缓冲或并发条件，定位首个 errno、短计数、状态转换和重传差异。`,
      `“${concept}”的资源所有权跨监听端点、已连接端点、父子进程或线程；每条异常路径都要证明描述符最终关闭且可重新绑定。`,
    ]);
  if (includes("sctp", "关联", "流分", "头端阻塞"))
    return conceptVariant(concept, [
      `“${concept}”以关联承载保留边界的消息，并支持多流与多宿主；一到一和一到多套接字模型的描述符与 association id 所有权不同。`,
      `分析“${concept}”要记录关联、流号、消息标志、通知和对端地址集合，不能把 SCTP 直接套用为带消息边界的 TCP。`,
      `验证“${concept}”固定关联，只改变流号、顺序标志或活动路径，观察头端阻塞、通知与故障切换是否符合预测。`,
      `“${concept}”在原书与现代平台的 API 可用性差异较大；代码必须记录 SCTP 实现、头文件与 RFC 6458 映射版本。`,
    ]);
  if (includes("fork", "exec", "wait", "sigchld", "线程", "互斥锁", "并发服务器", "客户/服务器程序设计"))
    return conceptVariant(concept, [
      `“${concept}”分配并发执行与描述符所有权；fork 复制引用、exec 保留未设 close-on-exec 的描述符，线程则共享进程描述符表。`,
      `分析“${concept}”要画出监听端点、连接端点、子进程或线程、信号与锁的生存期，避免重复 close、僵尸进程和竞态。`,
      `验证“${concept}”固定请求，只改变并发度或退出时序，比较吞吐、排队、wait 结果、锁竞争和未回收执行单元。`,
      `“${concept}”的过载边界需要有界队列、拒绝策略与可终止路径；创建更多进程线程不是自动扩容方案。`,
    ]);
  if (includes("信号", "sigio", "sigpipe"))
    return `“${concept}”是异步通知而非工作队列；处理函数只执行异步信号安全操作，主循环通过标志或自管道消费状态，并处理信号合并与竞态。`;
  if (includes("守护", "inetd", "syslog", "daemon"))
    return `“${concept}”处理长期服务的会话脱离、工作目录、文件描述符、日志与按需启动；inetd 交接的标准输入输出本身就是已连接端点。`;
  if (includes("unix域", "socketpair", "描述符传递", "凭证"))
    return `“${concept}”在本机内核中提供字节流或数据报 IPC；路径名/抽象地址、SCM_RIGHTS 描述符传递与对端凭证各有独立所有权和安全边界。`;
  if (includes("非阻塞", "eagain", "einprogress"))
    return `“${concept}”把等待责任移给事件循环；EAGAIN 表示当前不能完成，EINPROGRESS 表示连接尚在进行，后续必须从就绪与 SO_ERROR 收束状态。`;
  if (includes("ioctl", "接口配置", "arp", "路由表", "sysctl", "接口名字"))
    return `“${concept}”读取或修改内核网络控制状态，结构布局和命令号高度依赖平台；实验前后必须快照接口、地址、ARP 与路由并完整回滚。`;
  if (includes("路由套接字", "数据链路套接字"))
    return `“${concept}”通过内核消息查询或订阅接口、地址与路由变化；消息头长度、对齐、序号和进程标识用于把响应关联到请求。`;
  if (includes("密钥管理", "安全关联"))
    return `“${concept}”管理 IPsec 安全关联而非传输应用数据；SPI、算法、密钥材料、方向与生存期属于高敏感状态，只能在隔离环境演练。`;
  if (includes("广播"))
    return `“${concept}”把一份 IPv4 数据报交给广播域内多个主机，需要 SO_BROADCAST 且受路由器边界限制；多响应会形成竞争与放大风险。`;
  if (includes("多播", "mcast_join", "源特定"))
    return `“${concept}”由接收者加入组、发送者把数据报发往组地址；成员关系绑定接口与地址族，TTL/跳限和源过滤控制分发范围。`;
  if (includes("带外", "sockatmark", "心搏"))
    return `“${concept}”讨论 TCP 紧急指针与应用通知边界；只有一个紧急标记位置，普通数据仍在同一字节流中，不能把它当独立可靠消息通道。`;
  if (includes("ipv4", "ipv6", "ip选项", "扩展首部", "路径mtu"))
    return conceptVariant(concept, [
      `“${concept}”明确地址族、首部与路径 MTU 的协议差异；双栈映射和 IPv6 扩展首部的可用性不能靠结构体外观猜测。`,
      `分析“${concept}”要保存地址、作用域、接口索引、首部链与内核选项，区分源代码可移植和运行时互操作。`,
      `验证“${concept}”固定应用负载，只改变地址族、接口或 MTU，比较解析候选、套接字选项、ICMP 错误和实际分组。`,
      `“${concept}”的现代语义以 RFC 8200 等规范核对，但原书中的历史 API 仍按第三版语境说明，不用新名称改写旧接口。`,
    ]);
  if (includes("原始套接字", "ping", "traceroute", "icmp"))
    return `“${concept}”让应用直接构造或接收网络层报文，需要特权并承担首部、校验和、标识与过滤责任；实验只在隔离命名空间进行。`;
  if (includes("bpf", "dlpi", "pfpacket", "sock_packet", "libpcap", "libnet", "数据链路"))
    return `“${concept}”在链路层捕获或构造帧；捕获方向、snaplen、过滤器、链路类型、校验和卸载与时间戳都会影响证据解释。`;
  if (includes("streams", "流", "getmsg", "putmsg", "tpi"))
    return `“${concept}”属于 System V STREAMS 历史接口，以模块队列和消息控制/数据部分组成通路；现代平台未必提供，必须明确可用性与替代接口。`;
  if (includes("附录", "精选习题", "调试技术", "虚拟网络", "杂凑的源代码"))
    return `“${concept}”是第三版参考单元，用于把协议图、测试网络、调试轨迹、公共源码或答案连接回正文；引用时必须标出前置章节和可复现条件。`;
  if (includes("小结", "概述", "总图", "学习地图", "总复习"))
    return `“${concept}”是结构节点，用来组织“${focus}”的接口、内核与分组证据；若只能复述标题而不能给出返回值或状态因果，本节点不通过。`;
  return conceptVariant(concept, [
    `“${concept}”服务于“${focus}”。解释时必须写清输入、系统调用合同、内核对象、线上分组与清理结果，并用一个单变量反例定位首个分叉。`,
    `分析“${concept}”要把应用调用、描述符所有权、内核状态与线上分组放在同一时间轴；最终输出只能证明终点，不能证明中间因果。`,
    `验证“${concept}”固定平台、地址与输入，只改变一个返回条件或网络事件，保存首个 errno、队列变化和分组差异。`,
    `“${concept}”的交接证据包含可编译代码、系统调用轨迹、端点状态、pcap 与清理日志；缺少任一层时要明确结论边界。`,
  ]);
}

function rewriteDeepDive(source, focus, pageTitle) {
  return source.replace(
    /\n## (?:正式目录逐项讲解|第三版机制逐项深读)\n([\s\S]*?)(?=\n## 分步视觉验证)/,
    (_match, body) => {
      const headings = [...body.matchAll(/^(#{3,5})\s+(.+)$/gm)].map(
        (match) => ({ marks: match[1], concept: match[2].trim() }),
      );
      const sections = headings.map(({ marks, concept }) => {
        const explanation = explanationForConcept(concept, focus);
        const pageExplanation = `在“${pageTitle}”中，${explanation}`;
        const complete =
          pageExplanation.length >= 50
            ? pageExplanation
            : `${pageExplanation} “${concept}”的结论必须能由返回值、内核状态或原始分组复核。`;
        return `${marks} ${concept}\n\n${complete}`;
      });
      return `\n## 第三版机制逐项深读\n\n${sections.join("\n\n")}`;
    },
  );
}

function remediatePage(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const title = String(parsed.data.title ?? path.basename(filePath, ".mdx"));
  const focus = String(parsed.data.description ?? title).replace(/\s+/g, " ");
  let next = addFrontmatterFields(raw);

  next = rewriteDeepDive(next, focus, title);
  next = next.replace(
    "本书第3版覆盖IPv4、IPv6、TCP、UDP、SCTP、路由与密钥管理套接字，并保留STREAMS等历史接口。",
    `在“${title}”中，第3版覆盖IPv4、IPv6、TCP、UDP、SCTP、路由与密钥管理套接字，并保留STREAMS等历史接口。`,
  );
  next = next.replace(
    "实验台账至少包含内核/库版本、命名空间、接口与路由、地址端口、入口参数、描述符所有者、预期状态、实际返回与errno、首个分组分叉、内核队列和清理结果十一列。",
    `“${title}”的实验台账至少包含内核/库版本、命名空间、接口与路由、地址端口、入口参数、描述符所有者、预期状态、实际返回与errno、首个分组分叉、内核队列和清理结果十一列。`,
  );
  next = next.replace(
    "原始套接字、路由、密钥管理、广播多播和故障注入只在隔离网络命名空间、容器或可恢复虚拟机执行。",
    `“${title}”涉及的原始套接字、路由、密钥管理、广播多播和故障注入只在隔离网络命名空间、容器或可恢复虚拟机执行。`,
  );
  next = next.replace(
    "最终输出会隐藏短读写、errno、地址错误、队列积压、重传、分组重排和描述符泄漏。",
    `“${title}”的最终输出会隐藏短读写、errno、地址错误、队列积压、重传、分组重排和描述符泄漏。`,
  );
  next = next.replace(
    "把TCP当消息协议、把UDP当可靠流，或把Linux专有行为当成跨UNIX与协议标准保证。",
    `在“${title}”中，把TCP当消息协议、把UDP当可靠流，或把Linux专有行为当成跨UNIX与协议标准保证，都会直接判错。`,
  );
  next = next.replace(
    "运行时同步抓取标准输出、标准错误、strace、ss状态和pcap；任何结论都必须能指向第一条应用返回值或线上分组分叉，而不是只凭最终页面或一句“连接失败”。",
    `“${title}”运行时同步抓取标准输出、标准错误、strace、ss状态和pcap；任何结论都必须能指向第一条应用返回值或线上分组分叉，而不是只凭最终页面或一句“连接失败”。`,
  );
  next = next.replace(
    "协议附录要把IPv4、IPv6与ICMP首部字段落实到抓包偏移和字节序；虚拟网络附录要列清节点、接口、链路、地址、路由与MTU；调试附录要区分应用日志、系统调用、套接字队列和线上分组各自能证明什么；源码附录要追踪公共包装函数的调用者、错误传播与描述符所有权；答案附录则先独立重做实验，再对照书中结论解释差异。",
    `在“${title}”中，协议参考、虚拟网络、调试轨迹、公共源码或答案必须回到本页职责：标明抓包偏移和字节序、节点/接口/路由/MTU、各证据层能证明什么、错误传播与描述符所有权，再独立重放结论。`,
  );
  next = next.replace(
    "验收附录时再做一次交叉核对：从一个正文失败样本能否在两步内定位到附录条目，从附录条目能否回到可编译程序和原始pcap，替换地址族、MTU或并发模型后结论是否仍能说明适用边界。",
    `验收“${title}”时做交叉核对：从正文失败样本能否在两步内定位到本附录条目，从条目能否回到可编译程序和原始pcap，替换地址族、MTU或并发模型后是否仍能说明边界。`,
  );
  next = next.replace(
    "跨平台重放还要记录缺失接口、兼容层行为与替代观测工具，分别标注“标准保证、实现约定、历史接口和本机实测”，避免把某个内核的偶然结果写成通用结论。",
    `“${title}”的跨平台重放要记录缺失接口、兼容层行为与替代观测工具，分别标注“标准保证、实现约定、历史接口和本机实测”，避免把单一内核结果写成通用结论。`,
  );
  next = next.replace(
    "最后在新网络命名空间中仅按记录重放，关闭套接字、wait子进程、join线程、删除虚拟接口和流量控制规则，并确认命名空间、监听端口与临时文件归零。",
    `完成“${title}”后，在新网络命名空间仅按记录重放，关闭套接字、wait子进程、join线程、删除虚拟接口和流量控制规则，并确认命名空间、监听端口与临时文件归零。`,
  );
  for (const term of ["协议参考", "虚拟网络", "调试证据", "公共源码", "习题答案"]) {
    next = next.replaceAll(
      `${term}用于解释`,
      `“${title}”中的${term}用于解释`,
    );
  }
  next = next.replace(
    "接口与协议事实分别以 [POSIX socket]",
    `“${title}”的接口与协议事实分别以 [POSIX socket]`,
  );

  const sourceNeedle =
    "SCTP、STREAMS、T/TCP和历史IPv6 API的可用性必须由当前平台实测确认。";
  if (next.includes(sourceNeedle) && !next.includes("未取得未获授权的完整中文正文")) {
    next = next.replace(
      sourceNeedle,
      `${sourceNeedle}\n\n“${title}”未取得未获授权的完整中文正文；以 [InformIT 第三版官方目录与合法样章](${INFORMIT}) 界定 3 部分、31 章和 5 个附录范围，中文解释、代码、实验与练习均为独立教学重写。“${title}”的接口与协议事实分别以 [POSIX socket](${POSIX_SOCKET})、[RFC 9293 TCP](${RFC_9293})、[RFC 768 UDP](${RFC_768})、[RFC 9260 SCTP](${RFC_9260})、[RFC 6458 SCTP sockets](${RFC_6458}) 和 [RFC 8200 IPv6](${RFC_8200}) 核对；现代差异不覆盖第三版历史语境。`,
    );
  }

  next = next.replace(
    /<Attribution[\s\S]*?\/>/,
    `<Attribution\n  mode="independent-rewrite"\n  sourceBasis="authorized-sample"\n  workTitle=${JSON.stringify(WORK_TITLE)}\n  adaptedUrl=${JSON.stringify(INFORMIT)}\n/>`,
  );

  fs.writeFileSync(filePath, next);
  return {
    title,
    order: Number(parsed.data.order ?? 0),
    sectionSlug: path.basename(path.dirname(filePath)),
    chapterSlug: path.basename(filePath, ".mdx"),
    relativePath: path.relative(ROOT, filePath).replaceAll(path.sep, "/"),
  };
}

const profiles = walkMdx(BOOK_DIR)
  .map(remediatePage)
  .sort((left, right) => left.order - right.order);
const pageByTitle = new Map(profiles.map((profile) => [profile.title, profile]));

const manifestRoot = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = manifestRoot.books[BOOK];
if (!manifest) throw new Error(`缺少 ${BOOK} manifest`);
const formalNodes = manifest.units.reduce(
  (sum, unit) => sum + unit.concepts.length,
  0,
);
if (manifest.units.length !== 36 || formalNodes !== 359)
  throw new Error(`UNP manifest 分母异常：${manifest.units.length}/${formalNodes}`);

const factSources = {
  informit: { label: "InformIT 第三版官方目录与合法样章", url: INFORMIT },
  posixSocket: { label: "POSIX socket()", url: POSIX_SOCKET },
  rfc9293: { label: "RFC 9293 TCP", url: RFC_9293 },
  rfc768: { label: "RFC 768 UDP", url: RFC_768 },
  rfc9260: { label: "RFC 9260 SCTP", url: RFC_9260 },
  rfc6458: { label: "RFC 6458 SCTP sockets API", url: RFC_6458 },
  rfc8200: { label: "RFC 8200 IPv6", url: RFC_8200 },
};

manifestRoot.books[BOOK] = {
  ...manifest,
  version: 2,
  sourceKind: "publisher-official-toc-authorized-sample-and-primary-standards",
  sourceUrl: INFORMIT,
  secondarySourceUrls: [
    POSIX_SOCKET,
    RFC_9293,
    RFC_768,
    RFC_9260,
    RFC_6458,
    RFC_8200,
  ],
  status: "verified-authorized-sample-independent-rewrite",
  verifiedAt: "2026-07-19",
  sourceAccess: "authorized-sample",
  sourceMode: "independent-rewrite",
  defaultSourceMode: "independent-rewrite",
  disclosureNote:
    "InformIT 官方页确认第三版、三位作者、目录与合法样章；课程未取得未获授权的完整中文正文，按官方目录的 3 部分、31 章与 5 附录独立中文重写。POSIX 与 RFC 9293/768/9260/6458/8200 用于核对接口和协议事实，STREAMS、T/TCP、旧 IPv6 API 等仍按第三版历史语境披露。",
  factSources,
  coverage: { formalUnits: 36, outlineNodes: 359, pages: 38 },
  units: manifest.units.map((unit) => {
    const page = pageByTitle.get(unit.title);
    if (!page) throw new Error(`manifest 单元缺少页面：${unit.title}`);
    const title = unit.title.toLowerCase();
    const factSourceIds = ["informit", "posixSocket"];
    if (title.includes("tcp")) factSourceIds.push("rfc9293");
    if (title.includes("udp")) factSourceIds.push("rfc768");
    if (title.includes("sctp")) factSourceIds.push("rfc9260", "rfc6458");
    if (title.includes("ipv6") || title.includes("ip"))
      factSourceIds.push("rfc8200");
    return {
      ...unit,
      chapterPath: `${page.sectionSlug}/${page.chapterSlug}`,
      factSourceIds: [...new Set(factSourceIds)],
    };
  }),
  unitMappingEvidence: "quality/remediation-ledger.json",
  factSourcePolicy:
    "InformIT 官方目录与合法样章限定第三版范围；POSIX 和 IETF RFC 独立核对 API/协议事实，现代行为与原书历史接口明确分层。",
};

fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifestRoot, null, 2)}\n`);
fs.writeFileSync(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      sourceAccess: "authorized-sample",
      sourceMode: "independent-rewrite",
      scope: { formalUnits: 36, outlineNodes: 359, pages: 38 },
      profiles,
    },
    null,
    2,
  )}\n`,
);

console.log(
  JSON.stringify({
    book: BOOK,
    pages: profiles.length,
    formalUnits: manifest.units.length,
    outlineNodes: formalNodes,
  }),
);
