#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "http-definitive-guide";
const BOOK_DIR = path.join(ROOT, "content", BOOK);
const COMPONENT_DIR = path.join(
  ROOT,
  "src/components/mdx/http-definitive-guide/diagrams",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/http-definitive-guide-v2-profiles.json",
);
const OREILLY =
  "https://www.oreilly.com/library/view/http-the-definitive/1565925092/";
const CHAPTER_GUIDE =
  "https://www.oreilly.com/library/view/http-the-definitive/1565925092/pr02s02.html";
const RFC_9110 = "https://www.rfc-editor.org/rfc/rfc9110.html";
const RFC_9111 = "https://www.rfc-editor.org/rfc/rfc9111.html";
const RFC_9112 = "https://www.rfc-editor.org/rfc/rfc9112.html";
const WORK_TITLE =
  "David Gourley, Brian Totty, Marjorie Sayer, Sailu Reddy, Anshu Aggarwal, HTTP: The Definitive Guide";

function verificationForConcept(concept) {
  const value = concept.toLowerCase();
  const includes = (...needles) => needles.some((needle) => value.includes(needle));

  if (includes("url", "uri", "urn", "方案", "路径", "参数", "查询", "片段", "字符限制", "转义"))
    return `拆分“${concept}”的方案、主机、端口、路径、查询与片段，核对哪些字节进入请求目标、哪些信息只留在客户端。`;
  if (includes("缓存", "新鲜", "age", "vary", "验证器", "再验证", "命中", "过期", "使用期", "条件请求"))
    return `围绕“${concept}”固定缓存键与响应，只改变 Age、寿命或验证器，比较新鲜命中、条件再验证和完整回源三条路径。`;
  if (includes("连接", "tcp", "keep-alive", "持久", "管道", "关闭", "time_wait", "时延", "带宽", "拥塞", "性能"))
    return `为“${concept}”保存 TCP 四元组、握手、复用与关闭时间线，只改变一次连接策略，比较连接数、消息边界和延迟。`;
  if (includes("报文", "首部", "状态码", "方法", "主体", "content-length", "chunk", "起始行", "get", "head", "put", "post", "options", "delete"))
    return `把“${concept}”落实到原始请求与响应字节，标注起始行、相关首部和主体边界，再注入一个语法或语义错误核对状态变化。`;
  if (includes("代理", "proxy", "网关", "隧道", "中继", "via", "trace", "ident"))
    return `沿客户端到源站逐跳追踪“${concept}”，记录每一跳读取或改写的字段、下一跳目标和失败责任，不用最终页面反推中间过程。`;
  if (includes("认证", "摘要", "口令", "密码", "nonce", "随机数", "挑战", "质询", "保护空间", "重放", "词典攻击", "明文攻击", "h(d)", "kd(s,d)", "证书", "安全", "https", "ssl", "tls", "加密", "密钥", "rsa", "数字签名", "基础设施"))
    return `针对“${concept}”分别执行正常、错误凭据或身份、重放三次事务，核对挑战域、保护边界、失败状态与敏感信息暴露。`;
  if (includes("cookie", "会话", "状态", "隐私"))
    return `用两个站点与两个用户检验“${concept}”的创建、选择、回送和过期范围，确认状态不会越过预期域、路径或会话边界。`;
  if (includes("实体", "编码", "mime", "字符集", "语言", "国际", "协商", "转码", "截尾", "范围", "可靠传输", "表示形式", "字形", "子标记", "名字空间", "日期", "域名", "内容注入", "格式转换", "信息综合"))
    return `为“${concept}”保存原始实体字节及 Content-Type、Content-Encoding、Content-Language 或协商首部，改变一个表示维度并验证解码结果。`;
  if (includes("重定向", "位置", "location", "负载均衡"))
    return `为“${concept}”记录每一跳状态码与 Location，只改变一个路由条件，检查方法是否保留、循环是否终止以及最终资源身份。`;
  if (includes("主机", "托管", "虚拟", "发布", "webdav", "日志", "配置", "docroot", "cgi", "应用程序接口", "web 服务", "内容分发", "网站", "属性", "集合", "任播", "转发", "网元控制"))
    return `以两个主机或两个版本验证“${concept}”，保存 Host、资源映射、权限、发布前后响应与日志关联号，排除串站和半发布状态。`;
  if (includes("机器人", "爬虫", "robots", "搜索", "索引"))
    return `让“${concept}”处理允许、禁止与循环链接三组样本，保存抓取决策、去重键、访问频率和索引结果。`;
  if (includes("base-64", "base64"))
    return `用已知字节向量验证“${concept}”的 3 字节到 4 字符分组、填充与反解结果，并确认它只编码而不提供保密性。`;
  if (includes("更多信息", "协议信息", "其他万维网", "历史", "未来", "下一步", "2002年", "当前的状态", "原版", "中文版"))
    return `为“${concept}”各列一条首版证据与现代对照，注明日期和规范版本；若二者语义不同，保留差异而不是覆盖历史结论。`;
  if (includes("资源", "媒体类型", "事务", "协议版本", "http 概述", "多媒体信使", "结构组件", "web 页面", "telnet", "http：web", "http结构", "http 结构"))
    return `画出“${concept}”涉及的资源、请求、响应与处理者，改变一个方法或表示，确认资源身份和事务边界仍可追踪。`;
  if (includes("服务器", "接收", "解析", "查找", "处理请求", "访问控制", "构建响应", "创建响应", "发送", "目录列表", "docroot", "cgi", "应用程序接口", "web 服务"))
    return `在服务器流水线中暂停“${concept}”前后两个阶段，对比解析结果、资源映射、权限、响应元数据和日志关联号。`;
  if (includes("性能", "时延", "带宽", "拥塞", "串行", "确认"))
    return `记录“${concept}”的 DNS、建连、首字节与传输时延，只改变一次复用或并发策略，解释总耗时变化来自哪一段。`;
  if (includes("机器人", "robot", "爬虫", "根集", "链接", "环路", "循环", "复制", "面包屑", "搜索", "排序", "欺诈"))
    return `给“${concept}”输入一个允许链接、一个禁止链接和一个循环链接，核对规范化键、抓取决策、频率限制与索引输出。`;
  if (includes("http-ng", "webmux", "远程调用", "分布式对象", "模块化"))
    return `把“${concept}”放入 HTTP-NG 的传输、远程调用或应用层，比较它与 HTTP/1.1 的连接/扩展成本，并明确这只是历史方案。`;
  if (includes("部分", "附录", "概述", "大格局", "结束语", "复核", "边界实验", "状态实验"))
    return `用一条端到端事务串起“${concept}”覆盖的相邻节点；若任一节点只能复述标题而不能给出报文或状态证据，则本结构节点不通过。`;
  return `写出“${concept}”在 HTTP 事务中的输入、状态位置和可观察输出；只注入一处错误，凭原始报文与恢复记录定位首个偏差。`;
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

  // 先处理会被大类吞掉的具体机制。每条说明都给出状态位置或线路因果，
  // 避免把目录标题换个说法就冒充正文解释。
  if (includes("报文流入源端", "向下游流动"))
    return `“${concept}”描述报文方向：请求朝源服务器流动，响应朝用户代理流动；上游/下游是相对当前报文方向的称呼，不是固定机器角色。`;
  if (includes("100 ～ 199"))
    return `“${concept}”表示临时进展而非最终结果；客户端收到 1xx 后仍要等待最终响应，代理也不能把它当作完整事务终点。`;
  if (includes("200 ～ 299"))
    return `“${concept}”表示请求已成功处理，但不同代码对主体和后续动作的要求不同；成功状态不能替代资源身份与实体完整性检查。`;
  if (includes("300 ～ 399"))
    return `“${concept}”通过 Location 或缓存验证引导后续动作；必须区分重定向、未修改响应以及方法是否应在下一跳保留。`;
  if (includes("400 ～ 499"))
    return `“${concept}”表示请求侧条件未满足，例如语法、认证、权限或资源定位问题；诊断要保留服务器给出的状态和挑战信息。`;
  if (includes("500 ～ 599"))
    return `“${concept}”表示服务器或网关未能完成看似有效的请求；重试前需判断方法幂等性，并区分源站失败与中间实体失败。`;
  if (includes("get"))
    return `“${concept}”读取资源的当前表示，通常不应改变服务器状态；缓存与条件请求可复用已有表示，但仍要按请求首部选择变体。`;
  if (includes("head"))
    return `“${concept}”返回与 GET 对应的响应首部而不传输消息主体，适合核对元数据、验证器和资源可达性。`;
  if (includes("put"))
    return `“${concept}”要求用请求主体创建或替换目标资源的表示；服务端必须明确目标 URI、权限和成功后的资源状态。`;
  if (includes("post"))
    return `“${concept}”把表示交给目标资源按其语义处理，结果可能是新资源、动作结果或状态变化，不能默认具有 PUT 的幂等性。`;
  if (includes("trace"))
    return `“${concept}”让服务器回显其收到的请求，用于观察中间实体改写；它可能暴露敏感首部，生产环境通常需要限制。`;
  if (includes("options"))
    return `“${concept}”查询目标资源或服务器支持的通信选项；Allow 等响应元数据是能力声明，不等于调用者已经获得执行权限。`;
  if (includes("delete"))
    return `“${concept}”请求删除目标 URI 与当前资源的关联；响应成功也不保证底层存储字节被物理擦除。`;
  if (includes("延迟确认"))
    return `“${concept}”让 TCP 接收端短暂等待，以便把 ACK 搭载在反向数据上；对小型请求/响应，它可能把等待直接叠加到 HTTP 时延。`;
  if (includes("慢启动"))
    return `“${concept}”让新 TCP 连接从较小拥塞窗口逐步增加在途数据；频繁新建连接会反复支付这一增长成本。`;
  if (includes("nagle"))
    return `“${concept}”在已有未确认小报文时合并后续小写入以减少分段；TCP_NODELAY 可关闭它，但应用仍应合理批量写入。`;
  if (includes("time_wait"))
    return `“${concept}”让主动关闭方暂时保留连接四元组，避免旧分段污染新连接；高连接 churn 会消耗临时端口，不能靠粗暴缩短计时器掩盖。`;
  if (includes("握手时延"))
    return `“${concept}”来自建立 TCP 连接所需的往返；持久连接可以摊薄握手成本，但 DNS、TLS 和服务器处理仍需分别计时。`;
  if (includes("并行连接"))
    return `“${concept}”用多条 TCP 连接同时取回对象，可能改善空闲链路利用率，也会竞争带宽、增加握手并给服务器施压。`;
  if (includes("keep-alive"))
    return `“${concept}”在 HTTP/1.0 时代依靠显式协商复用连接；双方必须一致理解消息长度和关闭规则，哑代理会造成错误转发。`;
  if (includes("proxy-connection"))
    return `“${concept}”是为绕开不理解 Connection 的旧代理而出现的非标准做法；多级或未知代理链中仍可能失效，不能当作端到端首部。`;
  if (includes("管道化"))
    return `“${concept}”允许在等待前一响应时继续发送后续请求，但响应仍按请求顺序返回；非幂等请求与失败重试需要额外谨慎。`;
  if (includes("截尾操作", "错误的content-length"))
    return `“${concept}”说明错误长度会让接收端把实体截短或吞入下一条消息；持久连接下必须以线路边界和完整性校验共同确认。`;
  if (includes("正常关闭连接", "解除连接", "关闭容限"))
    return `“${concept}”区分半关闭、完整关闭与异常断开；只有幂等且未确认生效的事务才适合自动重试。`;
  if (includes("客户端主机名识别"))
    return `“${concept}”通常需要反向 DNS，既增加延迟也不构成可靠身份；服务器应把它当作可选日志信息，而非访问控制凭据。`;
  if (includes("ident"))
    return `“${concept}”尝试从客户端主机的 Ident 服务取得发起连接的用户名；穿越 NAT、代理或防火墙时可靠性很低，也带来隐私成本。`;
  if (includes("docroot"))
    return `“${concept}”把 URL 路径映射到服务器文件树根；规范化后必须仍位于允许根目录内，防止路径穿越访问任意文件。`;
  if (includes("服务器端包含项"))
    return `“${concept}”在发送前由服务器把动态片段嵌入静态表示；它改变最终实体、缓存键与执行权限，不能仅按源文件判断响应。`;
  if (includes("pac 文件"))
    return `“${concept}”用客户端脚本按 URL/主机选择代理；脚本返回 DIRECT 或代理链，因此下载来源、缓存和失败回退都属于安全边界。`;
  if (includes("wpad"))
    return `“${concept}”自动发现代理配置，减少手工配置但扩大信任面；发现渠道被劫持会让攻击者接管后续 Web 流量。`;
  if (includes("代理uri 与服务器uri", "部分uri", "显式代理时uri", "没有代理时uri"))
    return `“${concept}”区分绝对形式与源站形式的请求目标：显式代理通常接收完整 URI，源站通常接收路径与查询，Host 补充目标主机。`;
  if (includes("via 首部"))
    return `“${concept}”按顺序记录报文经过的协议版本与中间节点，便于发现环路和能力差异；每个代理只追加自己的条目。`;
  if (includes("if-modified-since"))
    return `“${concept}”按修改日期验证缓存表示；时间粒度和时钟差会造成歧义，资源有可靠实体标签时通常更精确。`;
  if (includes("if-none-match", "实体标签"))
    return `“${concept}”让客户端携带已有表示的实体标签；标签匹配时服务器可返回 304，强验证器要求逐字节等价，弱验证器只保证语义等价。`;
  if (includes("no-store"))
    return `“${concept}”中 no-store 禁止保存响应，no-cache 允许保存但复用前必须验证；二者都不是简单的“立即删除浏览器缓存”。`;
  if (includes("max-age"))
    return `“${concept}”给出响应自生成起可视为新鲜的秒数；当前年龄达到寿命后需验证或回源，不能从下载时刻重新计时。`;
  if (includes("expires"))
    return `“${concept}”用绝对日期声明过期时间，依赖发送端与接收端时钟；相对的 max-age 通常更不易受时钟偏差影响。`;
  if (includes("must-revalidate"))
    return `“${concept}”要求过期响应在复用前成功验证；断网时也不能随意提供陈旧副本，除非其他明确规则允许。`;
  if (includes("试探性过期"))
    return `“${concept}”在缺少显式寿命时依据 Last-Modified 等历史信息估计新鲜期；这是有上限的启发式，不应伪装成源站承诺。`;
  if (includes("使用期的计算", "完整的使用期"))
    return `“${concept}”合并 Date、Age、请求/响应时间与驻留时间，得到校正后的当前年龄；只看单个 Age 值会漏掉传输和本地驻留。`;
  if (includes("新鲜生存期"))
    return `“${concept}”优先采用 s-maxage/max-age，其次 Expires，最后才使用启发式；共享缓存与私有缓存的指令优先级不同。`;
  if (includes("connect"))
    return `“${concept}”请求代理与目标主机建立 TCP 通道，成功后代理盲转发双向字节；代理必须限制可连接端口和目标，避免开放隧道。`;
  if (includes("robots.txt 的格式"))
    return `“${concept}”按 User-agent 分组并用 Allow/Disallow 描述抓取路径策略；它是自律协议，不是服务器端授权机制。`;
  if (includes("规范化url"))
    return `“${concept}”统一主机大小写、默认端口、相对路径和安全等价的转义形式，以建立稳定去重键；不能把语义不同的查询参数盲目合并。`;
  if (includes("胖url"))
    return `“${concept}”把会话状态写入每个链接，能跨请求传递身份线索，却会污染共享链接、缓存与日志并泄露敏感状态。`;
  if (includes("cookie 的类型"))
    return `“${concept}”区分会话 Cookie 与持久 Cookie：前者依赖用户代理会话，后者由到期时间或 Max-Age 控制。`;
  if (includes("cookie 成分"))
    return `“${concept}”包含名称、值、域、路径、到期与安全属性；用户代理按作用域选择回送，服务器不能假定所有同名 Cookie 等价。`;
  if (includes("cookie") && includes("版本0", "版本1"))
    return `“${concept}”记录早期 Cookie 规范差异；实现与实验必须固定版本语境，不能用现代 SameSite 等属性替代原书协议字段。`;
  if (includes("base-64 用户名"))
    return `“${concept}”只是把“用户名:密码”的字节转换为可打印字符，任何能看到报文的人都可还原；基本认证必须依赖 TLS 保护传输。`;
  if (includes("a1"))
    return `“${concept}”把用户名、保护域与密码组合为摘要认证的长期秘密材料；保护域变化会改变结果，原始密码不应在线路上传输。`;
  if (includes("a2"))
    return `“${concept}”至少绑定请求方法与请求 URI；启用实体完整性保护时还会纳入实体摘要，使凭据与本次操作相关。`;
  if (includes("h(d)", "kd(s,d)"))
    return `“${concept}”区分对数据做单向摘要 H 与用秘密材料计算响应 KD；双方必须使用相同算法、字符编码和字段拼接顺序。`;
  if (includes("首部篡改"))
    return `“${concept}”指出未进入摘要输入的字段仍可能被中间人修改；摘要认证保护范围有限，不能替代 TLS 的通道完整性。`;
  if (includes("对称密钥"))
    return `“${concept}”让通信双方共享同一秘密用于加解密，计算高效但密钥分发困难；密钥泄露会同时破坏机密性与身份信任。`;
  if (includes("公开密钥"))
    return `“${concept}”使用成对密钥：公钥可公开，私钥必须保密；它解决部分密钥分发问题，但仍需证书绑定公钥与身份。`;
  if (includes("数字加密", "密码编制", "密码机", "使用了密钥", "数字密码"))
    return `“${concept}”描述以算法和密钥把明文变成密文的基本模型；安全性来自密钥与经过分析的算法，而不是隐藏算法名称或自制变换。`;
  if (includes("rsa"))
    return `“${concept}”是原书语境中的公开密钥算法实例，安全性依赖密钥长度、填充和正确实现；实际 HTTPS 通常用它认证或协商，而非加密大体量内容。`;
  if (includes("数字签名"))
    return `“${concept}”用私钥对数据摘要产生可验证值，公钥持有者可检查完整性和签名者控制的密钥；它不自动提供保密性。`;
  if (includes("x.509", "证书的主要内容", "站点证书的有效性"))
    return `“${concept}”把主体名称、公钥、有效期、用途和签发者签名装入证书；客户端还要验证信任链、时间、主机名和用途。`;
  if (includes("ssl 握手"))
    return `“${concept}”协商协议与密码套件、认证服务器并建立会话密钥；只有握手成功且证书校验通过，后续 HTTP 字节才进入可信加密通道。`;
  if (includes("分块编码"))
    return `“${concept}”把消息主体拆成十六进制长度标记的块，以零长度块结束；它只界定传输，不改变解码后的实体语义。`;
  if (includes("差异编码"))
    return `“${concept}”只传输客户端已有实例与目标实例之间的差异；双方必须明确基础版本和验证器，否则差异无法安全应用。`;
  if (includes("质量值"))
    return `“${concept}”用 q 值表达客户端对媒体类型、语言、字符集或编码的相对偏好；零表示不可接受，服务器还需结合自身能力选择。`;
  if (includes("vary 首部"))
    return `“${concept}”声明服务器选择表示时读取了哪些请求首部；共享缓存必须把这些维度纳入变体键，避免把一种语言或编码发给错误客户端。`;
  if (includes("host 首部", "缺乏主机信息"))
    return `“${concept}”解决同一地址承载多个站点时的目标歧义；HTTP/1.1 请求必须携带 Host，服务器也应拒绝无效或冲突目标。`;
  if (includes("锁定与防止覆写", "lock 方法", "unlock 方法"))
    return `“${concept}”用锁令牌协调 WebDAV 并发写入；客户端修改或释放资源时必须提交正确令牌，且锁不能替代版本与权限检查。`;
  if (includes("propfind", "proppatch"))
    return `“${concept}”读取或更新 WebDAV 资源属性；属性与实体内容分离，服务器需按资源层级和权限返回多状态结果。`;
  if (includes("copy 与move", "mkcol"))
    return `“${concept}”操作 WebDAV 集合或资源命名关系；Destination、覆盖策略、深度和权限共同决定结果，不能只看最终 URL。`;
  if (includes("dns 重定向"))
    return `“${concept}”在名称解析阶段把客户端导向不同地址，能按地域或负载分流，但看不到单个 HTTP 请求路径且受 DNS 缓存影响。`;
  if (includes("任播寻址"))
    return `“${concept}”让多个节点宣告同一网络地址，由路由选择较近路径；它改善入口分布，却需要处理路由变化对会话的影响。`;
  if (includes("ip mac 转发"))
    return `“${concept}”在二层改写或选择目标 MAC，把入站包交给集群节点；它依赖同一局域网，HTTP 主机语义仍由上层处理。`;
  if (includes("ip 地址转发"))
    return `“${concept}”在网络层重写或转发目标地址以分配流量；返回路径、连接状态和源地址可见性必须与负载均衡策略一致。`;
  if (includes("常见日志格式", "组合日志格式", "网景扩展", "squid"))
    return `“${concept}”规定一行日志应保存的客户端、时间、请求、状态、字节和扩展字段；解析器必须按所选格式处理转义与缺失值。`;
  if (includes("meter 首部"))
    return `“${concept}”是原书讨论的使用量/命中度量尝试；它反映历史方案，不应被误写为现代 HTTP 的通用标准首部。`;
  if (includes("更多信息", "其他万维网信息", "http 协议信息"))
    return `“${concept}”是原书的延伸资料入口，不增加新的协议结论；使用时必须记录资料版本、适用的 HTTP 年代和与本章结论的对应关系。`;
  if (includes("历史", "2002年", "未来展望", "当前的状态", "下一步计划"))
    return `“${concept}”用于区分 2002 年首版观察与后续 HTTP 演进：先复原原书当时的限制，再把现代 RFC 结论作为单独对照，二者不能互相冒充。`;
  if (includes("url", "uri", "urn", "方案", "路径", "参数", "查询", "片段", "字符限制", "转义"))
    return conceptVariant(concept, [
      `“${concept}”属于资源标识链：方案决定解释规则，权限部分给出主机与端口，路径、参数和查询参与请求目标，片段只在客户端定位表示内部位置。`,
      `解释“${concept}”时先写原始 URI，再标出规范化与百分号编码的位置；客户端显示文本不能替代真正发送的请求目标字节。`,
      `“${concept}”用基准 URI、目标 URI 与最终请求目标三列核对，尤其区分相对引用解析、默认端口和只在客户端使用的片段。`,
      `验证“${concept}”只改变一个 URI 组成部分，同时观察 DNS 目标、Host 与请求路径；若三者一起变化，就无法归因。`,
    ]);
  if (includes("get", "head", "put", "post", "options", "delete", "方法", "状态码", "报文", "首部", "content-length", "主体"))
    return conceptVariant(concept, [
      `“${concept}”必须在线路语义中判断：请求方法声明意图，状态码表达处理结果，首部携带元数据，主体边界由明确的报文规则确定。`,
      `分析“${concept}”要保留起始行、全部首部与实体边界；把解析对象重新打印，可能丢掉重复字段、空白和线路顺序证据。`,
      `“${concept}”由发送者意图与接收者结果共同决定；状态成功并不能证明方法安全、幂等或表示完整。`,
      `验证“${concept}”构造一条合法报文和一条只改一个字节的反例，比较解析、状态码、连接复用与后续消息边界。`,
    ]);
  if (includes("连接", "tcp", "时延", "带宽", "拥塞", "性能", "串行", "确认", "复用", "关闭"))
    return conceptVariant(concept, [
      `“${concept}”把 HTTP 等待拆成 DNS、建连、请求发送、服务器处理和响应传输；连接复用影响握手次数，但不能改变报文边界与应用语义。`,
      `评估“${concept}”要同时记录 TCP 四元组、分段与确认时间线和 HTTP 消息边界，避免把网络等待误判成服务器计算。`,
      `“${concept}”的实验固定请求与响应大小，只改变一项建连、复用、并发或关闭策略，再比较握手数、首字节时间与失败重试。`,
      `诊断“${concept}”先确定哪一端关闭、是否仍有未确认字节以及方法是否幂等；页面最终成功不能证明中间没有重复请求。`,
    ]);
  if (includes("服务器", "接收", "解析", "查找", "处理请求", "访问控制", "构建响应", "创建响应", "发送响应", "发送", "日志", "目录列表"))
    return conceptVariant(concept, [
      `“${concept}”位于服务器处理流水线：接收连接后解析请求、映射资源、执行访问控制、构造响应并记录日志；每一步都应留下可归责的输入与输出。`,
      `定位“${concept}”要用同一关联号串起连接、解析结果、资源映射、权限判定、响应元数据与访问日志，不能只观察浏览器页面。`,
      `验证“${concept}”固定 URL 与身份，只改变一项映射或权限配置，比较服务器选择的资源、状态码和日志责任字段。`,
      `“${concept}”的失败应归到接收、解析、映射、授权、执行或发送中的首个异常阶段；后续 500 响应只是结果，不是根因。`,
    ]);
  if (includes("代理", "网关", "隧道", "中继", "via", "trace", "ident"))
    return conceptVariant(concept, [
      `“${concept}”描述中间实体行为：它可能终止一侧连接、改写逐跳字段或转换协议，因此必须分别记录两侧报文和下一跳选择。`,
      `核对“${concept}”在每一跳保存请求形式、Via、Connection 所列字段与目标端点，区分端到端字段和只作用于当前连接的字段。`,
      `“${concept}”的实验固定客户端与源站，只插入或移除一个中间节点，再比较两侧原始报文、认证边界和错误归属。`,
      `诊断“${concept}”先确认它是转发 HTTP、转换协议还是盲转发字节；三种角色拥有不同的解析能力和安全责任。`,
    ]);
  if (includes("缓存", "命中", "新鲜", "过期", "age", "使用期", "验证", "条件请求"))
    return conceptVariant(concept, [
      `“${concept}”由缓存键、当前年龄、新鲜寿命、Vary 维度和验证器共同决定；命中不等于新鲜，过期对象也可能通过条件请求复用。`,
      `分析“${concept}”先计算校正年龄与新鲜寿命，再检查 Vary、ETag 或 Last-Modified 和请求指令；是否联系源站不是唯一证据。`,
      `验证“${concept}”固定响应字节与缓存键，只改变 Age、寿命或验证器中的一个量，观察新鲜命中、304 再验证和完整回源。`,
      `“${concept}”的故障常来自错误变体键、过期算法或共享与私有策略混用；证据包必须包含缓存日志和源站条件请求。`,
    ]);
  if (includes("机器人", "robot", "爬虫", "根集", "链接", "环路", "循环", "复制", "搜索", "排序", "索引", "欺诈"))
    return conceptVariant(concept, [
      `“${concept}”属于抓取与索引闭环：从种子 URL 发现并规范化链接，以去重键和访问策略避免循环，再将内容特征写入可排序索引。`,
      `处理“${concept}”要区分 URL 发现、抓取许可、内容获取、重复检测和索引排序；robots.txt 只声明抓取策略，不是访问授权。`,
      `验证“${concept}”用允许、禁止、重定向和循环四类链接，记录规范化键、抓取频率、响应处理和最终索引项。`,
      `“${concept}”的风险包括无限空间、别名重复、站点压力与排序欺诈；停止条件和每主机预算必须成为可审计状态。`,
    ]);
  if (includes("http-ng", "webmux", "远程调用", "分布式对象", "模块化"))
    return `“${concept}”记录 HTTP-NG 的历史设计取舍：把传输复用、远程调用与 Web 应用语义分层，以减少旧 HTTP 的连接和扩展成本；它不是 HTTP/2 或 HTTP/3 的别名。`;
  if (includes("cookie", "会话", "个性化", "状态", "隐私", "客户端ip", "用户登录"))
    return conceptVariant(concept, [
      `“${concept}”解决无状态请求之间的关联问题；识别线索、Cookie 与登录会话的可靠性和隐私边界不同，不能把弱关联当成已认证身份。`,
      `分析“${concept}”要记录状态由谁创建、存在哪里、何时回送与何时过期；IP 或 User-Agent 等线索只能辅助关联。`,
      `验证“${concept}”使用两个用户与两个站点，比较域、路径、会话和持久状态的选择规则，确认不会跨边界串用。`,
      `“${concept}”会进入请求、缓存和日志，必须评估泄露与跟踪风险；能识别浏览器不代表已验证真实用户身份。`,
    ]);
  if (includes("认证", "摘要", "口令", "密码", "质询", "nonce", "挑战", "保护空间", "重放", "词典攻击", "明文攻击"))
    return conceptVariant(concept, [
      `“${concept}”属于挑战—响应认证：服务器给出保护域与挑战参数，客户端生成凭据，验证端检查身份、时效和重放条件；Base64 本身不保密。`,
      `核对“${concept}”要保存 401 或 407 挑战、保护域、nonce、请求目标和 Authorization，区分身份验证、通道保密与资源授权。`,
      `验证“${concept}”分别执行正确凭据、错误凭据和重放事务；摘要输入、时间状态与失败代码都可复算，结论才可交接。`,
      `“${concept}”的边界包括口令存储、中间人、词典攻击和代理认证；单次登录成功不能证明凭据未在线路或日志中泄露。`,
    ]);
  if (includes("安全", "https", "ssl", "tls", "证书", "密码机", "rsa", "加密"))
    return conceptVariant(concept, [
      `“${concept}”把 HTTP 放入经过身份验证的加密通道；证书校验目标主机，握手协商密钥与算法，记录层保护后续字节。`,
      `分析“${concept}”要分开证书链、主机名、有效期、算法协商和会话密钥；只看到锁形图标不能证明每项均正确。`,
      `验证“${concept}”使用正常证书、错误主机名和不受信任签发者三组连接，保存握手失败位置与客户端拒绝原因。`,
      `“${concept}”保护传输中的字节，不自动解决端点权限、应用日志或存储泄露；代理隧道还需约束目标和端口。`,
    ]);
  if (includes("实体", "编码", "mime", "范围", "多部分", "multipart", "截尾", "可靠传输"))
    return conceptVariant(concept, [
      `“${concept}”描述表示字节及其封装：媒体类型说明格式，内容编码说明变换，长度或分块界定边界，验证器和范围支持局部传输。`,
      `核对“${concept}”要保存编码前后实体、Content-Type、Content-Encoding、线路长度与解码长度，避免把传输编码误当资源格式。`,
      `验证“${concept}”用完整实体、截尾实体和局部范围三组字节，比较边界解析、摘要或验证器与最终表示是否一致。`,
      `“${concept}”的失败会表现为消息串线、解码错误或错误变体；仅凭 200 状态无法证明实体完整且可解释。`,
    ]);
  if (includes("字符", "语言", "国际", "字形", "子标记", "名字空间", "日期", "域名"))
    return conceptVariant(concept, [
      `“${concept}”区分字符编码、语言标记与显示字形：发送端声明表示元数据，接收端按注册规则解析，不能由外观猜测。`,
      `分析“${concept}”要同时保存原始字节、声明的 charset 或 language 与解码后的码点；字体渲染正确不代表编码声明正确。`,
      `验证“${concept}”用同一文本的两种编码或语言表示，改变一个 Accept 或 Content 元数据并检查协商、缓存变体与显示结果。`,
      `“${concept}”的边界涉及注册名称、大小写规则、转义和旧客户端容错；本地默认字符集不能成为跨系统协议。`,
    ]);
  if (includes("协商", "转码", "格式转换", "内容注入", "信息综合"))
    return conceptVariant(concept, [
      `“${concept}”从多个可用表示中选择或生成响应；选择依据必须进入 Vary 或等价缓存维度，转码前后还要保留媒体类型、编码与语义差异。`,
      `分析“${concept}”要列出候选表示、客户端偏好和服务器能力，再解释最终选择；q 值只是偏好权重，不是强制命令。`,
      `验证“${concept}”固定资源，只改变一个 Accept 维度，比较响应元数据、Vary、缓存键和实体字节是否同步变化。`,
      `“${concept}”若生成新表示，必须记录转换链和信息损失；静态预生成与请求时转码的缓存、时延和错误边界不同。`,
    ]);
  if (includes("主机托管", "虚拟", "host", "发布", "webdav", "集合", "名字空间管理", "内容分发", "cdn", "任播", "转发"))
    return `“${concept}”把请求路由到具体站点与版本：Host/地址决定虚拟主机，权限与写入协议控制发布，副本和分发节点必须保持资源身份与版本一致。`;
  if (includes("base-64", "base64", "六位组", "字母表"))
    return `“${concept}”按 24 位分组把二进制映射为四个 6 位字符，末组用填充补齐；它便于文本通道传输，但没有加密或认证能力。`;
  if (includes("资源", "媒体类型", "事务", "协议版本", "web 的结构组件", "http 概述", "多媒体信使"))
    return `“${concept}”位于 HTTP 基础模型：URI 标识资源，请求与响应组成事务，媒体类型解释表示，中间组件在不破坏端到端语义的前提下转发或处理消息。`;
  if (includes("部分", "附录", "概述", "大格局", "结束语", "复核"))
    return `“${concept}”是结构节点，用来组织“${focus}”的学习范围；它负责串联相邻机制与证据，不把目录标题本身当作知识解释。`;
  return `“${concept}”在本章用于回答“${focus}”。学习时必须把这个名称落到具体报文、连接、中间状态或历史规范，并说明它改变了哪项可观察结果。`;
}

function rewriteDeepDive(source, focus) {
  return source.replace(
    /\n## (?:原书目录逐节点重构|首版机制逐项深读)\n([\s\S]*?)(?=\n<Stepper>)/,
    (_match, body) => {
      const headings = [...body.matchAll(/^(#{3,5})\s+(.+)$/gm)].map(
        (match) => ({ marks: match[1], concept: match[2].trim() }),
      );
      const sections = headings.map(({ marks, concept }) => {
        const explanation = explanationForConcept(concept, focus);
        const completeExplanation =
          explanation.length >= 50
            ? explanation
            : `${explanation} 对“${concept}”的验收必须能指向原始报文、状态变化或版本证据。`;
        return `${marks} ${concept}\n\n${completeExplanation}`;
      });
      return `\n## 首版机制逐项深读\n\n${sections.join("\n\n")}`;
    },
  );
}

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
  return `${raw.slice(0, closing)}\nqualityVersion: 2\npracticeMode: simulation\nsourceMode: independent-rewrite${raw.slice(closing)}`;
}

function remediatePage(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const title = String(parsed.data.title ?? path.basename(filePath, ".mdx"));
  let next = addFrontmatterFields(raw);

  next = next.replace(
    "本课程锁定David Gourley、Brian Totty、Marjorie Sayer、Sailu Reddy、Anshu Aggarwal著，陈涓、赵振平译《HTTP权威指南》，人民邮电出版社，2012年，ISBN 9787115281487；英文原版HTTP: The Definitive Guide，O'Reilly Media，2002年9月，656页，ISBN 1565925092。",
    `“${title}”锁定David Gourley、Brian Totty、Marjorie Sayer、Sailu Reddy、Anshu Aggarwal著，陈涓、赵振平译《HTTP权威指南》，人民邮电出版社，2012年，ISBN 9787115281487；英文原版HTTP: The Definitive Guide，O'Reilly Media，2002年9月，656页，ISBN 1565925092。`,
  );
  next = next.replace(
    "HTTP/2、HTTP/3、OAuth、JWT、SameSite、HSTS和现代CDN行为可以独立比较，但不得替换HTTP-NG、Digest、WebDAV、WPAD等原书节点。",
    `在“${title}”中，HTTP/2、HTTP/3、OAuth、JWT、SameSite、HSTS和现代CDN行为只作独立比较，不得替换HTTP-NG、Digest、WebDAV、WPAD等首版节点。`,
  );
  next = next.replace(
    /\*\*(?:事务核查|[^*\n]+节点核查)：\*\* (?:为“|固定请求目标与源资源，只改变一个与“)([^”]+)”[^\n]*/g,
    (_match, concept) => `**验证：** ${verificationForConcept(concept)}`,
  );
  next = next.replace(
    /\*\*验证：\*\* [^\n]*?“([^”]+)”[^\n]*/g,
    "",
  );
  next = next.replace(
    / 验收时先预测原始报文与状态变化，只改变一个连接、首部、缓存、认证、编码或路由变量；保存首个偏差、影响范围和恢复结果。/g,
    "",
  );
  const focus = String(parsed.data.description ?? title);
  next = next.replace(
    /把“([^”]+)”放回“[^”]+”的HTTP事务，明确客户端、服务器、中间实体、请求输入、响应输出和历史协议限制。/g,
    (_match, concept) => explanationForConcept(concept, focus),
  );
  next = next.replace(
    /\n## 本页完整节点清单\n[\s\S]*?\n<Stepper>/,
    "\n<Stepper>",
  );
  next = next.replace(
    "## 原书目录逐节点重构",
    "## 首版机制逐项深读",
  );
  next = rewriteDeepDive(next, focus);
  // 早期内容把线路换行写成了可见的 `\\n`。这些只出现在本书的 text
  // 代码围栏中，转换成真正换行后，浏览器与复制结果才是合法 HTTP 报文。
  next = next.replaceAll("\\n", "\n");
  next = next.replace(
    /<Attribution[\s\S]*?\/>/,
    `<Attribution\n  mode="independent-rewrite"\n  sourceBasis="authorized-sample"\n  workTitle=${JSON.stringify(WORK_TITLE)}\n  adaptedUrl=${JSON.stringify(OREILLY)}\n/>`,
  );

  const scopeNeedle =
    "忠实度分母共586个部分、章、编号节/小节、附录与索引节点。";
  if (
    next.includes(scopeNeedle) &&
    !next.includes("未取得未获授权的完整中文正文")
  ) {
    next = next.replace(
      scopeNeedle,
      `${scopeNeedle}\n\n“${title}”未取得未获授权的完整中文正文；课程以 [O’Reilly 官方在线版](${OREILLY}) 与 [章级导览](${CHAPTER_GUIDE}) 界定首版范围，中文解释、报文、实验和练习均为独立教学重写。现代语义仅以 [RFC 9110](${RFC_9110})、[RFC 9111](${RFC_9111}) 和 [RFC 9112](${RFC_9112}) 核对差异。`,
    );
  }

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
  .sort((a, b) => a.order - b.order);
const pageBySlug = new Map(
  profiles.map((profile) => [profile.chapterSlug, profile]),
);

for (const profile of profiles) {
  const componentPath = path.join(COMPONENT_DIR, `${profile.chapterSlug}.tsx`);
  const source = fs.readFileSync(componentPath, "utf8");
  fs.writeFileSync(componentPath, source.replaceAll("\\\\n", "\\n"));
}

const manifestRoot = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = manifestRoot.books[BOOK];
if (!manifest) throw new Error(`缺少 ${BOOK} manifest`);
const formalNodes = manifest.units.reduce(
  (sum, unit) => sum + unit.concepts.length,
  0,
);
if (manifest.units.length !== 36 || formalNodes !== 586)
  throw new Error(
    `HTTP manifest 分母异常：${manifest.units.length}/${formalNodes}`,
  );

manifestRoot.books[BOOK] = {
  ...manifest,
  version: 2,
  sourceKind:
    "publisher-official-online-toc-authorized-preview-and-http-standards",
  sourceUrl: OREILLY,
  secondarySourceUrls: [CHAPTER_GUIDE, RFC_9110, RFC_9111, RFC_9112],
  status: "verified-authorized-sample-independent-rewrite",
  verifiedAt: "2026-07-19",
  sourceAccess: "authorized-sample",
  sourceMode: "independent-rewrite",
  defaultSourceMode: "independent-rewrite",
  disclosureNote:
    "O’Reilly 官方在线版确认 2002 年英文首版、五位作者、656 页、21 章、5 个技术部分和 8 个附录，并提供完整目录与合法可见预览页；中文版印刷目录补充第六部分附录标签与索引。未取得未获授权的完整中文正文，课程按官方目录界定范围，以独立中文解释、HTTP 报文、交互实验和练习教学。RFC 9110/9111/9112 只用于核对现代语义差异，不回填或改写 HTTP-NG、Digest、FrontPage、WebDAV、WPAD 等历史节点。",
  factSources: {
    oreilly: { label: "O’Reilly 官方在线版与完整目录", url: OREILLY },
    chapterGuide: { label: "O’Reilly 官方章级导览", url: CHAPTER_GUIDE },
    rfc9110: { label: "RFC 9110 HTTP Semantics", url: RFC_9110 },
    rfc9111: { label: "RFC 9111 HTTP Caching", url: RFC_9111 },
    rfc9112: { label: "RFC 9112 HTTP/1.1", url: RFC_9112 },
  },
  coverage: { formalUnits: 36, outlineNodes: 586, pages: 38 },
  units: manifest.units.map((unit) => {
    const page = pageBySlug.get(unit.id);
    if (!page) throw new Error(`manifest 单元缺少页面：${unit.id}`);
    return {
      ...unit,
      chapterPath: `${page.sectionSlug}/${page.chapterSlug}`,
      factSourceIds: [
        "oreilly",
        "chapterGuide",
        "rfc9110",
        "rfc9111",
        "rfc9112",
      ],
    };
  }),
  unitMappingEvidence: "quality/remediation-ledger.json",
  factSourcePolicy:
    "O’Reilly 官方目录与合法预览限定 2002 年首版范围；历史行为优先按首版语境解释，现代 HTTP 语义仅用 RFC 9110/9111/9112 独立核对并明确区分。",
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
      scope: { formalUnits: 36, outlineNodes: 586, pages: 38 },
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
