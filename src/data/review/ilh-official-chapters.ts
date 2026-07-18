import type { ReviewQuestion } from "../review-questions";

export const ilhOfficialQuestions: ReviewQuestion[] = [
  {
    id: "ilh-official-q1",
    chapter: "ilh-official-learning-map",
    level: 1,
    question: "“2014年首版权威学习地图”的主链和正式节点分母是什么？",
    answer:
      "主链是把原书11章、202个正式节/小节节点还原为从Web基础、HTTP/1.1报文到HTTPS与Web攻击的完整路线；本页完整覆盖11个目录或复习节点，所有结论固定2014年4月首版语境。",
    tags: ["2014年首版权威学习地图", "Web"],
  },
  {
    id: "ilh-official-q2",
    chapter: "ilh-official-learning-map",
    level: 1,
    question: "“2014年首版权威学习地图”的最小协议不变量是什么？",
    answer:
      "任一知识点都能定位到原书章号，并能用一组请求、响应、状态变化和安全边界解释其作用",
    tags: ["2014年首版权威学习地图", "HTTP/1.1"],
  },
  {
    id: "ilh-official-q3",
    chapter: "ilh-official-learning-map",
    level: 2,
    question: "怎样为“2014年首版权威学习地图”构造单变量失败实验？",
    answer:
      "固定URI、客户端、网络和服务端状态，只改变一个方法、首部、主体、连接、Cookie或输入上下文；重点反证：按现代HTTP主题重新分组会遗漏原书第3、5、9、10、11章，并把HTTP/2定稿、HTTP/3、JWT和现代浏览器策略倒灌进2014年首版。",
    tags: ["2014年首版权威学习地图", "请求响应"],
  },
  {
    id: "ilh-official-q4",
    chapter: "ilh-official-learning-map",
    level: 2,
    question:
      "为什么“2014年首版权威学习地图”不能只看浏览器页面或一个状态码验收？",
    answer:
      "页面和状态码只是结果切片，不能单独证明连接、中介、主体边界、缓存、会话、授权和最终副作用；必须保存完整请求响应及状态前后值。",
    tags: ["2014年首版权威学习地图", "首部字段"],
  },
  {
    id: "ilh-official-q5",
    chapter: "ilh-official-learning-map",
    level: 3,
    question: "如何验证“2014年首版权威学习地图”没有混入后续HTTP时代？",
    answer:
      "核对2014年首版目录与图灵官方出版信息；SPDY、当时的HTTP/2.0期待和历史扩展保留原语义，HTTP/2定稿、HTTP/3、JWT、OAuth、SameSite等后续变化只能单独标注。",
    tags: ["2014年首版权威学习地图", "版次门"],
  },
  {
    id: "ilh-official-q6",
    chapter: "ilh-official-learning-map",
    level: 3,
    question: "“2014年首版权威学习地图”独立交接必须包含什么？",
    answer:
      "需要首版节点、原始请求响应、连接/中介方向、主体边界、缓存或会话状态、Web安全的正常与失败证据、最终副作用、恢复步骤、责任人与复核人。",
    tags: ["2014年首版权威学习地图", "Web安全"],
  },
  {
    id: "ilh-official-q7",
    chapter: "ilh-01-web-network-foundations",
    level: 1,
    question: "“第1章 了解Web及网络基础”的主链和正式节点分母是什么？",
    answer:
      "主链是理解Web的诞生、TCP/IP四层封装、IP/TCP/DNS协作以及URI的标识与语法；本页完整覆盖17个目录或复习节点，所有结论固定2014年4月首版语境。",
    tags: ["第1章 了解Web及网络基础", "TCP/IP协议族"],
  },
  {
    id: "ilh-official-q8",
    chapter: "ilh-01-web-network-foundations",
    level: 1,
    question: "“第1章 了解Web及网络基础”的最小协议不变量是什么？",
    answer:
      "输入一个URI后，能按DNS解析、TCP连接、HTTP交换、分层封装的顺序说明每一步的地址、数据单位和责任",
    tags: ["第1章 了解Web及网络基础", "封装"],
  },
  {
    id: "ilh-official-q9",
    chapter: "ilh-01-web-network-foundations",
    level: 2,
    question: "怎样为“第1章 了解Web及网络基础”构造单变量失败实验？",
    answer:
      "固定URI、客户端、网络和服务端状态，只改变一个方法、首部、主体、连接、Cookie或输入上下文；重点反证：把HTTP等同于整个互联网，或把IP地址、MAC地址、域名和URI混为一谈，会导致故障定位跨错层。",
    tags: ["第1章 了解Web及网络基础", "IP"],
  },
  {
    id: "ilh-official-q10",
    chapter: "ilh-01-web-network-foundations",
    level: 2,
    question:
      "为什么“第1章 了解Web及网络基础”不能只看浏览器页面或一个状态码验收？",
    answer:
      "页面和状态码只是结果切片，不能单独证明连接、中介、主体边界、缓存、会话、授权和最终副作用；必须保存完整请求响应及状态前后值。",
    tags: ["第1章 了解Web及网络基础", "TCP"],
  },
  {
    id: "ilh-official-q11",
    chapter: "ilh-01-web-network-foundations",
    level: 3,
    question: "如何验证“第1章 了解Web及网络基础”没有混入后续HTTP时代？",
    answer:
      "核对2014年首版目录与图灵官方出版信息；SPDY、当时的HTTP/2.0期待和历史扩展保留原语义，HTTP/2定稿、HTTP/3、JWT、OAuth、SameSite等后续变化只能单独标注。",
    tags: ["第1章 了解Web及网络基础", "版次门"],
  },
  {
    id: "ilh-official-q12",
    chapter: "ilh-01-web-network-foundations",
    level: 3,
    question: "“第1章 了解Web及网络基础”独立交接必须包含什么？",
    answer:
      "需要首版节点、原始请求响应、连接/中介方向、主体边界、缓存或会话状态、URI的正常与失败证据、最终副作用、恢复步骤、责任人与复核人。",
    tags: ["第1章 了解Web及网络基础", "URI"],
  },
  {
    id: "ilh-official-q13",
    chapter: "ilh-02-simple-http-protocol",
    level: 1,
    question: "“第2章 简单的HTTP协议”的主链和正式节点分母是什么？",
    answer:
      "主链是掌握客户端/服务器请求响应、无状态、请求URI、HTTP方法、持久连接、管线化和Cookie状态管理；本页完整覆盖10个目录或复习节点，所有结论固定2014年4月首版语境。",
    tags: ["第2章 简单的HTTP协议", "请求报文"],
  },
  {
    id: "ilh-official-q14",
    chapter: "ilh-02-simple-http-protocol",
    level: 1,
    question: "“第2章 简单的HTTP协议”的最小协议不变量是什么？",
    answer:
      "看到任一请求都能指出方法语义、目标资源、协议状态与连接复用边界，并区分协议无状态和应用会话状态",
    tags: ["第2章 简单的HTTP协议", "响应报文"],
  },
  {
    id: "ilh-official-q15",
    chapter: "ilh-02-simple-http-protocol",
    level: 2,
    question: "怎样为“第2章 简单的HTTP协议”构造单变量失败实验？",
    answer:
      "固定URI、客户端、网络和服务端状态，只改变一个方法、首部、主体、连接、Cookie或输入上下文；重点反证：按CRUD口号随意替换原书方法语义，或把Cookie理解成HTTP变成有状态协议，会掩盖重复请求和权限风险。",
    tags: ["第2章 简单的HTTP协议", "无状态"],
  },
  {
    id: "ilh-official-q16",
    chapter: "ilh-02-simple-http-protocol",
    level: 2,
    question:
      "为什么“第2章 简单的HTTP协议”不能只看浏览器页面或一个状态码验收？",
    answer:
      "页面和状态码只是结果切片，不能单独证明连接、中介、主体边界、缓存、会话、授权和最终副作用；必须保存完整请求响应及状态前后值。",
    tags: ["第2章 简单的HTTP协议", "幂等"],
  },
  {
    id: "ilh-official-q17",
    chapter: "ilh-02-simple-http-protocol",
    level: 3,
    question: "如何验证“第2章 简单的HTTP协议”没有混入后续HTTP时代？",
    answer:
      "核对2014年首版目录与图灵官方出版信息；SPDY、当时的HTTP/2.0期待和历史扩展保留原语义，HTTP/2定稿、HTTP/3、JWT、OAuth、SameSite等后续变化只能单独标注。",
    tags: ["第2章 简单的HTTP协议", "版次门"],
  },
  {
    id: "ilh-official-q18",
    chapter: "ilh-02-simple-http-protocol",
    level: 3,
    question: "“第2章 简单的HTTP协议”独立交接必须包含什么？",
    answer:
      "需要首版节点、原始请求响应、连接/中介方向、主体边界、缓存或会话状态、Cookie的正常与失败证据、最终副作用、恢复步骤、责任人与复核人。",
    tags: ["第2章 简单的HTTP协议", "Cookie"],
  },
  {
    id: "ilh-official-q19",
    chapter: "ilh-03-http-message-information",
    level: 1,
    question: "“第3章 HTTP报文内的HTTP信息”的主链和正式节点分母是什么？",
    answer:
      "主链是拆解HTTP报文、实体与主体，理解内容编码、分块传输、多部分对象、范围请求和内容协商；本页完整覆盖9个目录或复习节点，所有结论固定2014年4月首版语境。",
    tags: ["第3章 HTTP报文内的HTTP信息", "HTTP报文"],
  },
  {
    id: "ilh-official-q20",
    chapter: "ilh-03-http-message-information",
    level: 1,
    question: "“第3章 HTTP报文内的HTTP信息”的最小协议不变量是什么？",
    answer:
      "能够从线上的八位字节恢复起始行、首部和主体边界，并判断表示被压缩、分块、分段还是协商选择",
    tags: ["第3章 HTTP报文内的HTTP信息", "实体"],
  },
  {
    id: "ilh-official-q21",
    chapter: "ilh-03-http-message-information",
    level: 2,
    question: "怎样为“第3章 HTTP报文内的HTTP信息”构造单变量失败实验？",
    answer:
      "固定URI、客户端、网络和服务端状态，只改变一个方法、首部、主体、连接、Cookie或输入上下文；重点反证：把Transfer-Encoding和Content-Encoding混为一谈，或把消息主体等同于编码前实体，会计算错边界并破坏缓存验证。",
    tags: ["第3章 HTTP报文内的HTTP信息", "内容编码"],
  },
  {
    id: "ilh-official-q22",
    chapter: "ilh-03-http-message-information",
    level: 2,
    question:
      "为什么“第3章 HTTP报文内的HTTP信息”不能只看浏览器页面或一个状态码验收？",
    answer:
      "页面和状态码只是结果切片，不能单独证明连接、中介、主体边界、缓存、会话、授权和最终副作用；必须保存完整请求响应及状态前后值。",
    tags: ["第3章 HTTP报文内的HTTP信息", "分块传输编码"],
  },
  {
    id: "ilh-official-q23",
    chapter: "ilh-03-http-message-information",
    level: 3,
    question: "如何验证“第3章 HTTP报文内的HTTP信息”没有混入后续HTTP时代？",
    answer:
      "核对2014年首版目录与图灵官方出版信息；SPDY、当时的HTTP/2.0期待和历史扩展保留原语义，HTTP/2定稿、HTTP/3、JWT、OAuth、SameSite等后续变化只能单独标注。",
    tags: ["第3章 HTTP报文内的HTTP信息", "版次门"],
  },
  {
    id: "ilh-official-q24",
    chapter: "ilh-03-http-message-information",
    level: 3,
    question: "“第3章 HTTP报文内的HTTP信息”独立交接必须包含什么？",
    answer:
      "需要首版节点、原始请求响应、连接/中介方向、主体边界、缓存或会话状态、内容协商的正常与失败证据、最终副作用、恢复步骤、责任人与复核人。",
    tags: ["第3章 HTTP报文内的HTTP信息", "内容协商"],
  },
  {
    id: "ilh-official-q25",
    chapter: "ilh-04-http-status-codes",
    level: 1,
    question: "“第4章 返回结果的HTTP状态码”的主链和正式节点分母是什么？",
    answer:
      "主链是按2XX成功、3XX重定向、4XX客户端错误和5XX服务器错误解释原书列出的14个代表状态码；本页完整覆盖19个目录或复习节点，所有结论固定2014年4月首版语境。",
    tags: ["第4章 返回结果的HTTP状态码", "状态码"],
  },
  {
    id: "ilh-official-q26",
    chapter: "ilh-04-http-status-codes",
    level: 1,
    question: "“第4章 返回结果的HTTP状态码”的最小协议不变量是什么？",
    answer:
      "只看状态码和相关首部就能判断请求是否完成、是否需要新请求、责任在客户端还是服务器，以及主体是否存在",
    tags: ["第4章 返回结果的HTTP状态码", "成功"],
  },
  {
    id: "ilh-official-q27",
    chapter: "ilh-04-http-status-codes",
    level: 2,
    question: "怎样为“第4章 返回结果的HTTP状态码”构造单变量失败实验？",
    answer:
      "固定URI、客户端、网络和服务端状态，只改变一个方法、首部、主体、连接、Cookie或输入上下文；重点反证：只按百位背分类而忽略304无响应主体、401认证挑战、206范围和重定向方法变化，会让客户端做出错误后续动作。",
    tags: ["第4章 返回结果的HTTP状态码", "重定向"],
  },
  {
    id: "ilh-official-q28",
    chapter: "ilh-04-http-status-codes",
    level: 2,
    question:
      "为什么“第4章 返回结果的HTTP状态码”不能只看浏览器页面或一个状态码验收？",
    answer:
      "页面和状态码只是结果切片，不能单独证明连接、中介、主体边界、缓存、会话、授权和最终副作用；必须保存完整请求响应及状态前后值。",
    tags: ["第4章 返回结果的HTTP状态码", "客户端错误"],
  },
  {
    id: "ilh-official-q29",
    chapter: "ilh-04-http-status-codes",
    level: 3,
    question: "如何验证“第4章 返回结果的HTTP状态码”没有混入后续HTTP时代？",
    answer:
      "核对2014年首版目录与图灵官方出版信息；SPDY、当时的HTTP/2.0期待和历史扩展保留原语义，HTTP/2定稿、HTTP/3、JWT、OAuth、SameSite等后续变化只能单独标注。",
    tags: ["第4章 返回结果的HTTP状态码", "版次门"],
  },
  {
    id: "ilh-official-q30",
    chapter: "ilh-04-http-status-codes",
    level: 3,
    question: "“第4章 返回结果的HTTP状态码”独立交接必须包含什么？",
    answer:
      "需要首版节点、原始请求响应、连接/中介方向、主体边界、缓存或会话状态、服务器错误的正常与失败证据、最终副作用、恢复步骤、责任人与复核人。",
    tags: ["第4章 返回结果的HTTP状态码", "服务器错误"],
  },
  {
    id: "ilh-official-q31",
    chapter: "ilh-05-web-servers-cooperation",
    level: 1,
    question: "“第5章 与HTTP协作的Web服务器”的主链和正式节点分母是什么？",
    answer:
      "主链是解释虚拟主机、代理、网关、隧道和缓存如何处在客户端与源服务器之间并改变转发路径；本页完整覆盖8个目录或复习节点，所有结论固定2014年4月首版语境。",
    tags: ["第5章 与HTTP协作的Web服务器", "虚拟主机"],
  },
  {
    id: "ilh-official-q32",
    chapter: "ilh-05-web-servers-cooperation",
    level: 1,
    question: "“第5章 与HTTP协作的Web服务器”的最小协议不变量是什么？",
    answer:
      "给出一条含中介的请求链时，能说明每一跳代表谁、是否改写协议、缓存存在哪里以及响应新鲜度如何判断",
    tags: ["第5章 与HTTP协作的Web服务器", "代理"],
  },
  {
    id: "ilh-official-q33",
    chapter: "ilh-05-web-servers-cooperation",
    level: 2,
    question: "怎样为“第5章 与HTTP协作的Web服务器”构造单变量失败实验？",
    answer:
      "固定URI、客户端、网络和服务端状态，只改变一个方法、首部、主体、连接、Cookie或输入上下文；重点反证：把代理、网关、隧道和CDN统称为反向代理，会丢失协议转换、透明转发、加密通道与缓存责任边界。",
    tags: ["第5章 与HTTP协作的Web服务器", "网关"],
  },
  {
    id: "ilh-official-q34",
    chapter: "ilh-05-web-servers-cooperation",
    level: 2,
    question:
      "为什么“第5章 与HTTP协作的Web服务器”不能只看浏览器页面或一个状态码验收？",
    answer:
      "页面和状态码只是结果切片，不能单独证明连接、中介、主体边界、缓存、会话、授权和最终副作用；必须保存完整请求响应及状态前后值。",
    tags: ["第5章 与HTTP协作的Web服务器", "隧道"],
  },
  {
    id: "ilh-official-q35",
    chapter: "ilh-05-web-servers-cooperation",
    level: 3,
    question: "如何验证“第5章 与HTTP协作的Web服务器”没有混入后续HTTP时代？",
    answer:
      "核对2014年首版目录与图灵官方出版信息；SPDY、当时的HTTP/2.0期待和历史扩展保留原语义，HTTP/2定稿、HTTP/3、JWT、OAuth、SameSite等后续变化只能单独标注。",
    tags: ["第5章 与HTTP协作的Web服务器", "版次门"],
  },
  {
    id: "ilh-official-q36",
    chapter: "ilh-05-web-servers-cooperation",
    level: 3,
    question: "“第5章 与HTTP协作的Web服务器”独立交接必须包含什么？",
    answer:
      "需要首版节点、原始请求响应、连接/中介方向、主体边界、缓存或会话状态、缓存的正常与失败证据、最终副作用、恢复步骤、责任人与复核人。",
    tags: ["第5章 与HTTP协作的Web服务器", "缓存"],
  },
  {
    id: "ilh-official-q37",
    chapter: "ilh-06-http-headers",
    level: 1,
    question: "“第6章 HTTP首部”的主链和正式节点分母是什么？",
    answer:
      "主链是系统掌握HTTP/1.1通用、请求、响应、实体、Cookie及原书列出的扩展首部字段；本页完整覆盖67个目录或复习节点，所有结论固定2014年4月首版语境。",
    tags: ["第6章 HTTP首部", "端到端首部"],
  },
  {
    id: "ilh-official-q38",
    chapter: "ilh-06-http-headers",
    level: 1,
    question: "“第6章 HTTP首部”的最小协议不变量是什么？",
    answer:
      "面对原始报文能按端到端/逐跳和通用/请求/响应/实体分类解释每个字段，并用条件请求与缓存键验证组合语义",
    tags: ["第6章 HTTP首部", "逐跳首部"],
  },
  {
    id: "ilh-official-q39",
    chapter: "ilh-06-http-headers",
    level: 2,
    question: "怎样为“第6章 HTTP首部”构造单变量失败实验？",
    answer:
      "固定URI、客户端、网络和服务端状态，只改变一个方法、首部、主体、连接、Cookie或输入上下文；重点反证：孤立背字段名、不区分请求方向与逐跳边界，或把同名现代语义倒灌，会造成缓存泄漏、条件更新覆盖和代理转发错误。",
    tags: ["第6章 HTTP首部", "条件请求"],
  },
  {
    id: "ilh-official-q40",
    chapter: "ilh-06-http-headers",
    level: 2,
    question: "为什么“第6章 HTTP首部”不能只看浏览器页面或一个状态码验收？",
    answer:
      "页面和状态码只是结果切片，不能单独证明连接、中介、主体边界、缓存、会话、授权和最终副作用；必须保存完整请求响应及状态前后值。",
    tags: ["第6章 HTTP首部", "实体首部"],
  },
  {
    id: "ilh-official-q41",
    chapter: "ilh-06-http-headers",
    level: 3,
    question: "如何验证“第6章 HTTP首部”没有混入后续HTTP时代？",
    answer:
      "核对2014年首版目录与图灵官方出版信息；SPDY、当时的HTTP/2.0期待和历史扩展保留原语义，HTTP/2定稿、HTTP/3、JWT、OAuth、SameSite等后续变化只能单独标注。",
    tags: ["第6章 HTTP首部", "版次门"],
  },
  {
    id: "ilh-official-q42",
    chapter: "ilh-06-http-headers",
    level: 3,
    question: "“第6章 HTTP首部”独立交接必须包含什么？",
    answer:
      "需要首版节点、原始请求响应、连接/中介方向、主体边界、缓存或会话状态、Cookie首部的正常与失败证据、最终副作用、恢复步骤、责任人与复核人。",
    tags: ["第6章 HTTP首部", "Cookie首部"],
  },
  {
    id: "ilh-official-q43",
    chapter: "ilh-07-https-security",
    level: 1,
    question: "“第7章 确保Web安全的HTTPS”的主链和正式节点分母是什么？",
    answer:
      "主链是从HTTP明文、身份不验证和完整性不可证三个缺点，推导SSL/TLS、混合密码与证书链的HTTPS通信机制；本页完整覆盖10个目录或复习节点，所有结论固定2014年4月首版语境。",
    tags: ["第7章 确保Web安全的HTTPS", "窃听"],
  },
  {
    id: "ilh-official-q44",
    chapter: "ilh-07-https-security",
    level: 1,
    question: "“第7章 确保Web安全的HTTPS”的最小协议不变量是什么？",
    answer:
      "能把一次HTTPS连接拆成证书验证、密钥协商、对称加密记录与完整性检查，并指出每一步阻断哪类攻击",
    tags: ["第7章 确保Web安全的HTTPS", "伪装"],
  },
  {
    id: "ilh-official-q45",
    chapter: "ilh-07-https-security",
    level: 2,
    question: "怎样为“第7章 确保Web安全的HTTPS”构造单变量失败实验？",
    answer:
      "固定URI、客户端、网络和服务端状态，只改变一个方法、首部、主体、连接、Cookie或输入上下文；重点反证：把HTTPS简化成用公钥加密全部网页，或只看到锁图标就跳过主机名、有效期和信任链验证，会留下中间人路径。",
    tags: ["第7章 确保Web安全的HTTPS", "完整性"],
  },
  {
    id: "ilh-official-q46",
    chapter: "ilh-07-https-security",
    level: 2,
    question:
      "为什么“第7章 确保Web安全的HTTPS”不能只看浏览器页面或一个状态码验收？",
    answer:
      "页面和状态码只是结果切片，不能单独证明连接、中介、主体边界、缓存、会话、授权和最终副作用；必须保存完整请求响应及状态前后值。",
    tags: ["第7章 确保Web安全的HTTPS", "公开密钥加密"],
  },
  {
    id: "ilh-official-q47",
    chapter: "ilh-07-https-security",
    level: 3,
    question: "如何验证“第7章 确保Web安全的HTTPS”没有混入后续HTTP时代？",
    answer:
      "核对2014年首版目录与图灵官方出版信息；SPDY、当时的HTTP/2.0期待和历史扩展保留原语义，HTTP/2定稿、HTTP/3、JWT、OAuth、SameSite等后续变化只能单独标注。",
    tags: ["第7章 确保Web安全的HTTPS", "版次门"],
  },
  {
    id: "ilh-official-q48",
    chapter: "ilh-07-https-security",
    level: 3,
    question: "“第7章 确保Web安全的HTTPS”独立交接必须包含什么？",
    answer:
      "需要首版节点、原始请求响应、连接/中介方向、主体边界、缓存或会话状态、数字证书的正常与失败证据、最终副作用、恢复步骤、责任人与复核人。",
    tags: ["第7章 确保Web安全的HTTPS", "数字证书"],
  },
  {
    id: "ilh-official-q49",
    chapter: "ilh-08-user-authentication",
    level: 1,
    question: "“第8章 确认访问用户身份的认证”的主链和正式节点分母是什么？",
    answer:
      "主链是比较BASIC、DIGEST、SSL客户端认证与表单认证，并解释Session和Cookie如何保持认证状态；本页完整覆盖10个目录或复习节点，所有结论固定2014年4月首版语境。",
    tags: ["第8章 确认访问用户身份的认证", "认证"],
  },
  {
    id: "ilh-official-q50",
    chapter: "ilh-08-user-authentication",
    level: 1,
    question: "“第8章 确认访问用户身份的认证”的最小协议不变量是什么？",
    answer:
      "对任一认证流程能指出凭据形式、挑战与响应、验证位置、会话标识生命周期和退出失效点",
    tags: ["第8章 确认访问用户身份的认证", "BASIC认证"],
  },
  {
    id: "ilh-official-q51",
    chapter: "ilh-08-user-authentication",
    level: 2,
    question: "怎样为“第8章 确认访问用户身份的认证”构造单变量失败实验？",
    answer:
      "固定URI、客户端、网络和服务端状态，只改变一个方法、首部、主体、连接、Cookie或输入上下文；重点反证：把Base64当加密、把DIGEST当现代安全方案，或只依赖客户端Cookie中的用户身份，会让凭据重放和会话劫持直接成立。",
    tags: ["第8章 确认访问用户身份的认证", "DIGEST认证"],
  },
  {
    id: "ilh-official-q52",
    chapter: "ilh-08-user-authentication",
    level: 2,
    question:
      "为什么“第8章 确认访问用户身份的认证”不能只看浏览器页面或一个状态码验收？",
    answer:
      "页面和状态码只是结果切片，不能单独证明连接、中介、主体边界、缓存、会话、授权和最终副作用；必须保存完整请求响应及状态前后值。",
    tags: ["第8章 确认访问用户身份的认证", "SSL客户端认证"],
  },
  {
    id: "ilh-official-q53",
    chapter: "ilh-08-user-authentication",
    level: 3,
    question: "如何验证“第8章 确认访问用户身份的认证”没有混入后续HTTP时代？",
    answer:
      "核对2014年首版目录与图灵官方出版信息；SPDY、当时的HTTP/2.0期待和历史扩展保留原语义，HTTP/2定稿、HTTP/3、JWT、OAuth、SameSite等后续变化只能单独标注。",
    tags: ["第8章 确认访问用户身份的认证", "版次门"],
  },
  {
    id: "ilh-official-q54",
    chapter: "ilh-08-user-authentication",
    level: 3,
    question: "“第8章 确认访问用户身份的认证”独立交接必须包含什么？",
    answer:
      "需要首版节点、原始请求响应、连接/中介方向、主体边界、缓存或会话状态、Session的正常与失败证据、最终副作用、恢复步骤、责任人与复核人。",
    tags: ["第8章 确认访问用户身份的认证", "Session"],
  },
  {
    id: "ilh-official-q55",
    chapter: "ilh-09-http-extensions",
    level: 1,
    question: "“第9章 基于HTTP的功能追加协议”的主链和正式节点分母是什么？",
    answer:
      "主链是在2013至2014年的技术快照下理解SPDY、WebSocket、当时仍受期待的HTTP/2.0和WebDAV扩展；本页完整覆盖12个目录或复习节点，所有结论固定2014年4月首版语境。",
    tags: ["第9章 基于HTTP的功能追加协议", "SPDY"],
  },
  {
    id: "ilh-official-q56",
    chapter: "ilh-09-http-extensions",
    level: 1,
    question: "“第9章 基于HTTP的功能追加协议”的最小协议不变量是什么？",
    answer:
      "能区分HTTP承载、协议升级和HTTP方法扩展，并明确哪些结论属于首版出版时的提案或实现状态",
    tags: ["第9章 基于HTTP的功能追加协议", "WebSocket"],
  },
  {
    id: "ilh-official-q57",
    chapter: "ilh-09-http-extensions",
    level: 2,
    question: "怎样为“第9章 基于HTTP的功能追加协议”构造单变量失败实验？",
    answer:
      "固定URI、客户端、网络和服务端状态，只改变一个方法、首部、主体、连接、Cookie或输入上下文；重点反证：用今天HTTP/2或HTTP/3的最终规范重写本章，会抹掉SPDY为何出现以及原书对HTTP瓶颈的历史判断。",
    tags: ["第9章 基于HTTP的功能追加协议", "HTTP/2.0"],
  },
  {
    id: "ilh-official-q58",
    chapter: "ilh-09-http-extensions",
    level: 2,
    question:
      "为什么“第9章 基于HTTP的功能追加协议”不能只看浏览器页面或一个状态码验收？",
    answer:
      "页面和状态码只是结果切片，不能单独证明连接、中介、主体边界、缓存、会话、授权和最终副作用；必须保存完整请求响应及状态前后值。",
    tags: ["第9章 基于HTTP的功能追加协议", "WebDAV"],
  },
  {
    id: "ilh-official-q59",
    chapter: "ilh-09-http-extensions",
    level: 3,
    question: "如何验证“第9章 基于HTTP的功能追加协议”没有混入后续HTTP时代？",
    answer:
      "核对2014年首版目录与图灵官方出版信息；SPDY、当时的HTTP/2.0期待和历史扩展保留原语义，HTTP/2定稿、HTTP/3、JWT、OAuth、SameSite等后续变化只能单独标注。",
    tags: ["第9章 基于HTTP的功能追加协议", "版次门"],
  },
  {
    id: "ilh-official-q60",
    chapter: "ilh-09-http-extensions",
    level: 3,
    question: "“第9章 基于HTTP的功能追加协议”独立交接必须包含什么？",
    answer:
      "需要首版节点、原始请求响应、连接/中介方向、主体边界、缓存或会话状态、Upgrade的正常与失败证据、最终副作用、恢复步骤、责任人与复核人。",
    tags: ["第9章 基于HTTP的功能追加协议", "Upgrade"],
  },
  {
    id: "ilh-official-q61",
    chapter: "ilh-10-web-content-technologies",
    level: 1,
    question: "“第10章 构建Web内容的技术”的主链和正式节点分母是什么？",
    answer:
      "主链是理解HTML、CSS、动态HTML、DOM、CGI、Servlet以及XML、RSS/Atom和JSON在Web内容生成与发布中的分工；本页完整覆盖15个目录或复习节点，所有结论固定2014年4月首版语境。",
    tags: ["第10章 构建Web内容的技术", "HTML"],
  },
  {
    id: "ilh-official-q62",
    chapter: "ilh-10-web-content-technologies",
    level: 1,
    question: "“第10章 构建Web内容的技术”的最小协议不变量是什么？",
    answer:
      "从一个URL返回页面时，能区分服务器端生成、传输格式、浏览器DOM构建、样式应用和脚本修改五个阶段",
    tags: ["第10章 构建Web内容的技术", "CSS"],
  },
  {
    id: "ilh-official-q63",
    chapter: "ilh-10-web-content-technologies",
    level: 2,
    question: "怎样为“第10章 构建Web内容的技术”构造单变量失败实验？",
    answer:
      "固定URI、客户端、网络和服务端状态，只改变一个方法、首部、主体、连接、Cookie或输入上下文；重点反证：把HTTP、HTML、JavaScript与服务器程序视为同一层，会把传输错误、生成错误和客户端渲染错误混在一起。",
    tags: ["第10章 构建Web内容的技术", "DOM"],
  },
  {
    id: "ilh-official-q64",
    chapter: "ilh-10-web-content-technologies",
    level: 2,
    question:
      "为什么“第10章 构建Web内容的技术”不能只看浏览器页面或一个状态码验收？",
    answer:
      "页面和状态码只是结果切片，不能单独证明连接、中介、主体边界、缓存、会话、授权和最终副作用；必须保存完整请求响应及状态前后值。",
    tags: ["第10章 构建Web内容的技术", "CGI"],
  },
  {
    id: "ilh-official-q65",
    chapter: "ilh-10-web-content-technologies",
    level: 3,
    question: "如何验证“第10章 构建Web内容的技术”没有混入后续HTTP时代？",
    answer:
      "核对2014年首版目录与图灵官方出版信息；SPDY、当时的HTTP/2.0期待和历史扩展保留原语义，HTTP/2定稿、HTTP/3、JWT、OAuth、SameSite等后续变化只能单独标注。",
    tags: ["第10章 构建Web内容的技术", "版次门"],
  },
  {
    id: "ilh-official-q66",
    chapter: "ilh-10-web-content-technologies",
    level: 3,
    question: "“第10章 构建Web内容的技术”独立交接必须包含什么？",
    answer:
      "需要首版节点、原始请求响应、连接/中介方向、主体边界、缓存或会话状态、JSON的正常与失败证据、最终副作用、恢复步骤、责任人与复核人。",
    tags: ["第10章 构建Web内容的技术", "JSON"],
  },
  {
    id: "ilh-official-q67",
    chapter: "ilh-11-web-attack-techniques",
    level: 1,
    question: "“第11章 Web的攻击技术”的主链和正式节点分母是什么？",
    answer:
      "主链是按输入输出、设计配置、会话管理和其他风险四类还原XSS、注入、遍历、强制浏览、CSRF、DoS等攻击机制；本页完整覆盖25个目录或复习节点，所有结论固定2014年4月首版语境。",
    tags: ["第11章 Web的攻击技术", "跨站脚本"],
  },
  {
    id: "ilh-official-q68",
    chapter: "ilh-11-web-attack-techniques",
    level: 1,
    question: "“第11章 Web的攻击技术”的最小协议不变量是什么？",
    answer:
      "每个漏洞都能写出不可信输入、解释器或信任边界、可观察后果、单变量复现和对应防线，而不是只背攻击名称",
    tags: ["第11章 Web的攻击技术", "SQL注入"],
  },
  {
    id: "ilh-official-q69",
    chapter: "ilh-11-web-attack-techniques",
    level: 2,
    question: "怎样为“第11章 Web的攻击技术”构造单变量失败实验？",
    answer:
      "固定URI、客户端、网络和服务端状态，只改变一个方法、首部、主体、连接、Cookie或输入上下文；重点反证：只部署HTTPS或只过滤尖括号就宣称Web安全，会遗漏SQL/OS/首部解释器、授权检查、会话生命周期和资源耗尽。",
    tags: ["第11章 Web的攻击技术", "目录遍历"],
  },
  {
    id: "ilh-official-q70",
    chapter: "ilh-11-web-attack-techniques",
    level: 2,
    question:
      "为什么“第11章 Web的攻击技术”不能只看浏览器页面或一个状态码验收？",
    answer:
      "页面和状态码只是结果切片，不能单独证明连接、中介、主体边界、缓存、会话、授权和最终副作用；必须保存完整请求响应及状态前后值。",
    tags: ["第11章 Web的攻击技术", "会话劫持"],
  },
  {
    id: "ilh-official-q71",
    chapter: "ilh-11-web-attack-techniques",
    level: 3,
    question: "如何验证“第11章 Web的攻击技术”没有混入后续HTTP时代？",
    answer:
      "核对2014年首版目录与图灵官方出版信息；SPDY、当时的HTTP/2.0期待和历史扩展保留原语义，HTTP/2定稿、HTTP/3、JWT、OAuth、SameSite等后续变化只能单独标注。",
    tags: ["第11章 Web的攻击技术", "版次门"],
  },
  {
    id: "ilh-official-q72",
    chapter: "ilh-11-web-attack-techniques",
    level: 3,
    question: "“第11章 Web的攻击技术”独立交接必须包含什么？",
    answer:
      "需要首版节点、原始请求响应、连接/中介方向、主体边界、缓存或会话状态、CSRF的正常与失败证据、最终副作用、恢复步骤、责任人与复核人。",
    tags: ["第11章 Web的攻击技术", "CSRF"],
  },
  {
    id: "ilh-official-q73",
    chapter: "ilh-official-final-review",
    level: 1,
    question: "“2014年首版总复习与协议审计”的主链和正式节点分母是什么？",
    answer:
      "主链是把11章、202个正式目录节点压缩成可独立复核的一条HTTP请求生命周期与四道证据门；本页完整覆盖11个目录或复习节点，所有结论固定2014年4月首版语境。",
    tags: ["2014年首版总复习与协议审计", "协议轨迹"],
  },
  {
    id: "ilh-official-q74",
    chapter: "ilh-official-final-review",
    level: 1,
    question: "“2014年首版总复习与协议审计”的最小协议不变量是什么？",
    answer:
      "读者能从URI输入追踪到响应呈现或攻击阻断，逐段说明协议、中介、表示、身份和安全状态",
    tags: ["2014年首版总复习与协议审计", "报文边界"],
  },
  {
    id: "ilh-official-q75",
    chapter: "ilh-official-final-review",
    level: 2,
    question: "怎样为“2014年首版总复习与协议审计”构造单变量失败实验？",
    answer:
      "固定URI、客户端、网络和服务端状态，只改变一个方法、首部、主体、连接、Cookie或输入上下文；重点反证：按术语列表复习会失去跨章因果；真正掌握必须让同一个请求同时通过报文、缓存、认证和攻击面审计。",
    tags: ["2014年首版总复习与协议审计", "缓存验证"],
  },
  {
    id: "ilh-official-q76",
    chapter: "ilh-official-final-review",
    level: 2,
    question:
      "为什么“2014年首版总复习与协议审计”不能只看浏览器页面或一个状态码验收？",
    answer:
      "页面和状态码只是结果切片，不能单独证明连接、中介、主体边界、缓存、会话、授权和最终副作用；必须保存完整请求响应及状态前后值。",
    tags: ["2014年首版总复习与协议审计", "身份边界"],
  },
  {
    id: "ilh-official-q77",
    chapter: "ilh-official-final-review",
    level: 3,
    question: "如何验证“2014年首版总复习与协议审计”没有混入后续HTTP时代？",
    answer:
      "核对2014年首版目录与图灵官方出版信息；SPDY、当时的HTTP/2.0期待和历史扩展保留原语义，HTTP/2定稿、HTTP/3、JWT、OAuth、SameSite等后续变化只能单独标注。",
    tags: ["2014年首版总复习与协议审计", "版次门"],
  },
  {
    id: "ilh-official-q78",
    chapter: "ilh-official-final-review",
    level: 3,
    question: "“2014年首版总复习与协议审计”独立交接必须包含什么？",
    answer:
      "需要首版节点、原始请求响应、连接/中介方向、主体边界、缓存或会话状态、攻击面的正常与失败证据、最终副作用、恢复步骤、责任人与复核人。",
    tags: ["2014年首版总复习与协议审计", "攻击面"],
  },
];
