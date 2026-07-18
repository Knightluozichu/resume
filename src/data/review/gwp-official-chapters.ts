import type { ReviewQuestion } from "./types";

/** 《Go Web Programming》官方十章复习题。 */
export const gwpOfficialChapterQuestions: ReviewQuestion[] = [
  { id: "gwp-http-basics-1", chapter: "gwp-http-basics", level: 1, question: "HTTP请求与响应各由哪些主要部分组成？", answer: "请求包含method、URI、版本、header和可选body；响应包含版本、状态码、header和可选body。空行把header与body分开，服务端由net/http解析为结构化对象。", tags: ["第1章", "HTTP"] },
  { id: "gwp-http-basics-2", chapter: "gwp-http-basics", level: 2, question: "安全方法和幂等方法有什么区别？", answer: "安全表示客户端不请求改变服务端状态，典型是GET和HEAD；幂等表示重复执行与执行一次达到同一目标状态，典型是PUT和DELETE。幂等不要求每次响应字节相同。", tags: ["第1章", "method语义"] },
  { id: "gwp-http-basics-3", chapter: "gwp-http-basics", level: 3, question: "Handler与template engine如何分工？", answer: "Handler接收协议输入、执行业务并准备视图数据；template engine只把数据与模板组合成内容并执行上下文转义。数据库和授权不应藏在模板函数中。", tags: ["第1章", "handler", "template"] },
  { id: "gwp-http-basics-4", chapter: "gwp-http-basics", level: 4, question: "HTTP/2会怎样影响Go Web应用？", answer: "它在传输层提供二进制帧、header压缩和连接内多stream复用，但net/http保持Request、ResponseWriter和Handler高层契约。业务代码不应假设一条连接只承载一个请求。", tags: ["第1章", "HTTP2"] },

  { id: "gwp-chitchat-1", chapter: "gwp-chitchat", level: 1, question: "ChitChat论坛包含哪些主要部件？", answer: "进程入口与mux、动态handler、静态文件服务、Cookie会话、模板、用户会话主题回复数据模型、PostgreSQL访问层和HTTP服务器。", tags: ["第2章", "ChitChat"] },
  { id: "gwp-chitchat-2", chapter: "gwp-chitchat", level: 2, question: "User、Session、Thread和Post之间的关系如何维护？", answer: "Session关联User，Thread有创建者，Post关联Thread与作者；主键、外键和唯一约束维护结构，handler在写入前还要验证当前身份和目标资源。", tags: ["第2章", "数据模型"] },
  { id: "gwp-chitchat-3", chapter: "gwp-chitchat", level: 3, question: "Cookie访问控制的可信边界在哪里？", answer: "浏览器Cookie只携带签名值或不透明会话ID，服务端验证签名、过期并加载Session，再执行授权。HttpOnly和Secure是属性，不等于完整身份与权限。", tags: ["第2章", "Cookie", "会话"] },
  { id: "gwp-chitchat-4", chapter: "gwp-chitchat", level: 4, question: "数据库或模板失败时，ChitChat应怎样避免伪成功？", answer: "在提交响应前完成可失败的数据读取和模板准备；数据库失败映射为明确错误且回滚事务，模板错误记录模板名。若body已写出，就不能再假装把状态改成500。", tags: ["第2章", "错误路径"] },

  { id: "gwp-routing-1", chapter: "gwp-routing", level: 1, question: "ListenAndServe正常运行和失败时分别怎样表现？", answer: "正常运行时阻塞接收连接；端口占用、配置失败或服务器停止时返回错误。启动错误必须传回main或记录后退出，正常关闭要与其他错误区分。", tags: ["第3章", "server"] },
  { id: "gwp-routing-2", chapter: "gwp-routing", level: 2, question: "Handler接口与HandlerFunc适配器是什么关系？", answer: "Handler要求ServeHTTP方法；HandlerFunc是函数类型并实现该方法，所以符合签名的普通函数可以被适配为Handler。持有依赖的对象和轻量函数都能进入同一服务链。", tags: ["第3章", "HandlerFunc"] },
  { id: "gwp-routing-3", chapter: "gwp-routing", level: 3, question: "为什么优先创建显式ServeMux而不是DefaultServeMux？", answer: "显式mux让路由集合有明确所有者，多个服务器和测试彼此隔离；DefaultServeMux是包级全局状态，容易造成测试污染和未知路由暴露。", tags: ["第3章", "ServeMux"] },
  { id: "gwp-routing-4", chapter: "gwp-routing", level: 4, question: "如何验证mux匹配没有掩盖授权和参数错误？", answer: "用表格覆盖具体路径、子树、根fallback、未知路径和不支持方法，只断言分派结果；再在handler测试中独立验证参数、身份、权限和领域不变量。", tags: ["第3章", "路由验证"] },

  { id: "gwp-processing-requests-1", chapter: "gwp-processing-requests", level: 1, question: "Form、PostForm与MultipartForm的来源有什么不同？", answer: "Form可包含URL查询和已解析表单，PostForm只表示body表单字段，MultipartForm保存multipart的Value与File。安全边界应显式解析并读取需要的集合。", tags: ["第4章", "表单"] },
  { id: "gwp-processing-requests-2", chapter: "gwp-processing-requests", level: 2, question: "为什么要在ParseForm前限制Request Body？", answer: "解析可能把大body读入内存或临时文件。先用MaxBytesReader等设置预算，超限明确返回错误，避免攻击者用一个请求耗尽内存或磁盘。", tags: ["第4章", "输入预算"] },
  { id: "gwp-processing-requests-3", chapter: "gwp-processing-requests", level: 3, question: "ResponseWriter的状态和header何时冻结？", answer: "调用WriteHeader或第一次Write时提交；未显式写状态时第一次Write默认提交200。提交后再改header或状态不会按预期生效，所以可预检失败应先完成。", tags: ["第4章", "ResponseWriter"] },
  { id: "gwp-processing-requests-4", chapter: "gwp-processing-requests", level: 4, question: "Cookie Flash消息怎样保证只显示一次？", answer: "响应设置带签名的一次性Cookie，下一请求验证并读取，再立刻发送过期Cookie删除；Path、Secure、HttpOnly、SameSite和过期策略必须一致。", tags: ["第4章", "Cookie", "Flash"] },

  { id: "gwp-templates-1", chapter: "gwp-templates", level: 1, question: "模板解析和执行为什么应分成两阶段？", answer: "解析把源码编译成语法树，适合启动期一次完成并尽早暴露语法错误；执行用请求数据生成输出，可并发复用已解析模板，避免每请求磁盘I/O。", tags: ["第5章", "parse", "execute"] },
  { id: "gwp-templates-2", chapter: "gwp-templates", level: 2, question: "html/template的上下文感知转义解决什么？", answer: "它根据数据位于HTML文本、属性、URL、CSS还是JavaScript选择不同编码，防止不可信数据改变页面语法。不能用template.HTML随意绕过。", tags: ["第5章", "转义"] },
  { id: "gwp-templates-3", chapter: "gwp-templates", level: 3, question: "Pipeline函数返回(value, error)时错误如何传播？", answer: "前一命令输出成为后一命令参数；若函数第二返回值是非nil error，模板执行立即终止并把错误交给调用方。函数应保持确定且不做隐藏网络或数据库I/O。", tags: ["第5章", "pipeline"] },
  { id: "gwp-templates-4", chapter: "gwp-templates", level: 4, question: "define、template与block如何组成布局？", answer: "define声明命名模板，template调用局部，block提供可被页面覆盖的默认内容。基础布局复用header和footer，页面只定义content，但双方必须共享模板名和数据契约。", tags: ["第5章", "layout"] },

  { id: "gwp-database-1", chapter: "gwp-database", level: 1, question: "内存、文件和SQL存储应按哪些维度选择？", answer: "比较数据寿命、容量、查询、并发、恢复、共享范围和运维成本。内存低延迟但易失，CSV或gob适合本地文件，关系数据库提供查询、约束和事务。", tags: ["第6章", "存储选择"] },
  { id: "gwp-database-2", chapter: "gwp-database", level: 2, question: "sql.DB为什么不应每次请求创建和关闭？", answer: "它是并发安全的数据库句柄与连接池，不是单连接。通常由进程长期持有，在handler间共享，并在服务整体退出时关闭。", tags: ["第6章", "database/sql"] },
  { id: "gwp-database-3", chapter: "gwp-database", level: 3, question: "查询多行结果时必须检查哪些资源与错误？", answer: "检查Query错误，defer Rows.Close，逐行检查Scan，循环后检查Rows.Err；事务中还要确保失败回滚，成功只在全部步骤完成后Commit。", tags: ["第6章", "Rows", "事务"] },
  { id: "gwp-database-4", chapter: "gwp-database", level: 4, question: "关系映射器的便利会隐藏哪些风险？", answer: "可能隐藏N+1查询、字段映射、事务范围、锁和受影响行数。应记录或断言SQL数量与参数，并让领域对象、数据库行和公开DTO保持独立。", tags: ["第6章", "关系映射"] },

  { id: "gwp-json-api-1", chapter: "gwp-json-api", level: 1, question: "SOAP与REST的主要契约差异是什么？", answer: "SOAP以XML envelope、操作、命名空间和Fault表达正式消息协议；REST以资源URI、HTTP方法、状态码和表示形成统一接口。JSON只是格式，不等于REST。", tags: ["第7章", "SOAP", "REST"] },
  { id: "gwp-json-api-2", chapter: "gwp-json-api", level: 2, question: "XML与JSON解码都要防哪些输入边界？", answer: "限制body大小和嵌套深度，处理格式错误与未知字段，区分缺失和零值；单对象JSON还应确认首个值后只有EOF，避免尾随第二对象。", tags: ["第7章", "XML", "JSON"] },
  { id: "gwp-json-api-3", chapter: "gwp-json-api", level: 3, question: "创建REST资源时应返回什么状态与header？", answer: "通常返回201 Created，并用Location指向新资源；验证失败、未找到、冲突和内部错误分别映射为合适状态，不用200包裹所有错误。", tags: ["第7章", "状态码"] },
  { id: "gwp-json-api-4", chapter: "gwp-json-api", level: 4, question: "为什么公开API要用DTO而不是直接编码数据库行？", answer: "DTO让协议字段、验证和版本独立于schema，避免内部列和关系泄漏。Service adapter显式完成DTO与领域模型转换，并集中做错误映射。", tags: ["第7章", "DTO"] },

  { id: "gwp-testing-1", chapter: "gwp-testing", level: 1, question: "ResponseRecorder与httptest.Server分别适合什么？", answer: "Recorder直接调用handler，验证method、path、status、header和body；Server启动本地真实HTTP，适合测试client与传输往返。", tags: ["第8章", "httptest"] },
  { id: "gwp-testing-2", chapter: "gwp-testing", level: 2, question: "stub、fake、spy和mock有什么不同？", answer: "Stub返回固定值，fake提供轻量行为，spy记录调用，mock预设并验证交互。选择由待证明契约决定，过度mock会绑定内部实现。", tags: ["第8章", "test double"] },
  { id: "gwp-testing-3", chapter: "gwp-testing", level: 3, question: "Dependency Injection如何让数据库失败可测试？", answer: "Handler或用例通过构造参数接收Store接口，测试传入可控fake，脚本化返回成功、未找到、超时或提交错误，再断言领域与HTTP映射。", tags: ["第8章", "依赖注入"] },
  { id: "gwp-testing-4", chapter: "gwp-testing", level: 4, question: "引入第三方测试库时应保留哪些Go测试属性？", answer: "仍由go test统一发现和退出，失败输出可定位，测试并行和清理语义明确。断言或BDD语法不能隐藏控制流、随机顺序和真实外部依赖。", tags: ["第8章", "第三方测试库"] },

  { id: "gwp-concurrency-1", chapter: "gwp-concurrency", level: 1, question: "并发和并行在Web任务中怎样区分？", answer: "并发让多个任务在同一时间区间独立推进，并行让它们在多个执行资源上同一时刻运行。I/O并发可缩短等待，但启动goroutine不保证并行或提速。", tags: ["第9章", "并发", "并行"] },
  { id: "gwp-concurrency-2", chapter: "gwp-concurrency", level: 2, question: "启动goroutine前必须决定哪四件事？", answer: "谁等待完成、谁传播取消、错误返回到哪里、资源和并发上限由谁拥有。没有这些答案的goroutine容易在请求结束后泄漏。", tags: ["第9章", "goroutine"] },
  { id: "gwp-concurrency-3", chapter: "gwp-concurrency", level: 3, question: "Channel的关闭责任如何确定？", answer: "由知道不会再发送的一侧协调关闭；多发送者先等待全部生产者完成，再由唯一协调者close。接收侧读取关闭状态，不关闭未知生产者仍可能发送的channel。", tags: ["第9章", "channel"] },
  { id: "gwp-concurrency-4", chapter: "gwp-concurrency", level: 4, question: "怎样证明并发改造对Web handler有收益且没有泄漏？", answer: "比较串行与有限并发的p50、p95、错误和下游并发；注入慢、错和取消；运行race detector并检查请求结束后goroutine profile和数量回落。", tags: ["第9章", "性能证据"] },

  { id: "gwp-deployment-1", chapter: "gwp-deployment", level: 1, question: "Go Web部署物为何不只是二进制？", answer: "还可能包含模板、静态资源、配置、证书、数据库迁移和版本元数据。发布清单与摘要必须覆盖所有运行依赖。", tags: ["第10章", "发布物"] },
  { id: "gwp-deployment-2", chapter: "gwp-deployment", level: 2, question: "独立服务器、Heroku和App Engine的核心取舍是什么？", answer: "独立服务器控制权最大但运维负担高；Heroku提供PaaS进程与路由约束；App Engine提供托管运行时与伸缩但平台限制更多。按控制、成本、状态和约束比较。", tags: ["第10章", "部署平台"] },
  { id: "gwp-deployment-3", chapter: "gwp-deployment", level: 3, question: "Docker镜像不能替代哪些部署责任？", answer: "不能替代配置与秘密管理、持久数据、网络、调度、健康检查、日志、流量切换和回滚。镜像应不可变、非root并记录digest。", tags: ["第10章", "Docker"] },
  { id: "gwp-deployment-4", chapter: "gwp-deployment", level: 4, question: "如何证明测试物、上线物与回滚物一致？", answer: "同一提交只构建一次，保存测试报告和不可变artifact digest；部署记录引用该digest，探针通过后切流，失败则回到上一份已验证digest和兼容schema。", tags: ["第10章", "回滚", "digest"] },
];
