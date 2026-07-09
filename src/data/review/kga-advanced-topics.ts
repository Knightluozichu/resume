import type { ReviewQuestion } from "./types";

export const kgaAdvancedTopicsQuestions: ReviewQuestion[] = [
  {
    id: "kga-at-1",
    chapter: "kga-advanced-topics",
    level: 3,
    question: "如何开发一个Kong自定义插件？请描述插件的结构、PDK的使用和开发流程。",
    answer: "自定义插件结构（Lua模块）：①handler.lua——插件的执行逻辑，定义在各生命周期阶段(rewrite/access/header_filter/body_filter/log)的handler函数。②schema.lua——插件的配置模式定义，声明config的字段类型、默认值、校验规则。③插件的Mocha测试（可选）。handler.lua结构示例：local MyPlugin = {PRIORITY = 1000, VERSION = \"1.0.0\"} function MyPlugin:access(conf) kong.log.info(\"access phase\") kong.service.request.set_header(\"X-My-Plugin\", \"true\") end return MyPlugin。PRIORITY定义插件执行优先级（数值越大越先执行），VERSION是插件版本。schema.lua结构示例：local typedefs = require \"kong.db.schema.typedefs\" return {name=\"my-plugin\", fields={{config={type=\"record\", fields={{header_name={type=\"string\",default=\"X-Custom\"}},{header_value={type=\"string\",required=true}}}}}}}}。PDK（Plugin Development Kit）：Kong提供的Lua API集合，让插件开发者安全地操作请求/响应，无需直接操作Nginx内部数据结构。常用PDK API：①kong.service.request.set_header/get_header——操作转发给后端的请求头；②kong.service.response.get_header/get_status——读取后端响应头和状态码；③kong.client.get_ip——获取客户端IP；④kong.log.info/debug/err——日志记录；⑤kong.response.set_header/exit——操作返回客户端的响应/直接返回错误；⑥kong.request.get_header/get_query/get_body——读取客户端请求信息；⑦kong.node.get_memory——获取节点信息。开发流程：①创建插件目录结构（kong/plugins/my-plugin/handler.lua + schema.lua）；②编写handler.lua实现各阶段逻辑；③编写schema.lua定义配置；④在kong.conf的plugins=bundled,my-plugin中注册插件（或KONG_PLUGINS环境变量）；⑤重启Kong加载插件；⑥通过Admin API配置插件：POST /plugins {\"name\":\"my-plugin\",\"config\":{\"header_value\":\"hello\"}}；⑦测试验证。打包分发：将插件打成Lua rock（.rockspec）或Docker镜像（基于kong官方镜像COPY插件代码），供其他部署使用。",
    tags: ["自定义插件", "Lua", "PDK", "handler.lua", "schema.lua", "插件开发"],
  },
  {
    id: "kga-at-2",
    chapter: "kga-advanced-topics",
    level: 3,
    question: "开发Kong自定义插件时，handler.lua中的各阶段handler分别在什么时机执行？如何正确选择实现哪些阶段？",
    answer: "handler.lua中可实现的阶段handler及执行时机：①rewrite(self, conf)——在Nginx rewrite阶段执行，路由匹配之前。可修改请求URI。注意：此阶段在路由匹配之前执行，无法获取kong.route/kong.service信息（还没匹配到路由）。适用：URL预重写、通用请求预处理。②access(self, conf)——在Nginx access阶段执行，路由匹配之后、请求转发之前。这是最常用的阶段，可读取/修改请求头、查询参数、请求体，可进行认证、限流、访问控制，可通过kong.response.exit()直接返回响应终止请求。适用：认证、授权、限流、请求改写、请求终止。③header_filter(self, conf)——在后端响应头返回后、发送给客户端之前执行。可修改/增删响应头。适用：响应头改写、添加CORS头、安全头注入。④body_filter(self, conf)——在后端响应体分块返回时逐块执行。可修改响应体。注意：响应体可能被分多块，body_filter会被多次调用，需要用全局变量拼接完整body。适用：响应体改写、内容压缩/转换。⑤log(self, conf)——请求结束后(响应已返回客户端)执行。可记录日志、上报指标。此阶段不影响响应。适用：日志记录、指标采集、追踪上报。选择原则：①认证/授权/限流/请求终止 → access阶段（在转发前控制）；②请求URI重写 → rewrite阶段（路由匹配前）；③响应头修改 → header_filter阶段（响应头返回后）；④响应体修改 → body_filter阶段（响应体返回时）；⑤日志/监控/追踪 → log阶段（请求结束后）；⑥只实现需要的阶段，不必全部实现——如Rate Limiting插件只需access阶段，CORS插件需access(拦截OPTIONS)+header_filter(添加CORS头)。conf参数：传入插件的config配置（来自schema.lua定义的字段值），各阶段handler共享同一conf。self参数：插件实例，可用于存储跨阶段的上下文变量。注意事项：①access阶段修改请求后，header_filter/body_filter阶段可读取后端响应；②body_filter修改响应体需注意Content-Length可能失效，需在header_filter中清除或重新设置；③log阶段不可修改响应，只做异步记录。",
    tags: ["handler阶段", "access", "header_filter", "body_filter", "log", "rewrite"],
  },
  {
    id: "kga-at-3",
    chapter: "kga-advanced-topics",
    level: 3,
    question: "Kong Mesh是什么？它与传统API网关有什么区别？Kong Mesh基于Kuma解决了什么问题？",
    answer: "Kong Mesh是Kong推出的开源Service Mesh（服务网格）产品，基于Kuma项目构建，将Kong的API网关能力扩展到微服务间通信（东西向流量）的治理。传统API网关 vs Service Mesh区别：①流量方向——API网关管理南北向流量（外部客户端到内部服务的入口流量），Service Mesh管理东西向流量（服务之间的内部调用流量）。②部署位置——API网关是独立部署的集中式代理（所有外部流量经过网关节点），Service Mesh是分布式Sidecar代理（每个服务Pod旁部署一个代理，拦截所有进出流量）。③治理范围——API网关治理入口层（认证/限流/路由/监控），Service Mesh治理全链路（服务发现/负载均衡/熔断/mTLS/可观测性/流量拆分）。Kuma是Kong开源的通用Service Mesh控制平面，支持Kubernetes和VM混合环境。Kong Mesh=Kuma控制面+Kong/Envoy数据面。Kong Mesh解决的问题：①服务间mTLS——自动加密所有服务间通信，无需修改应用代码；②服务级流量控制——细粒度的限流/熔断/重试策略，比API网关更精细；③流量拆分——金丝雀发布/蓝绿部署/流量镜像，按百分比拆分流量到不同版本；④全链路可观测性——分布式追踪/指标采集/日志统一，跨服务调用链可视化；⑤多平台支持——K8s+VM混合环境统一管理（Kuma的Universal模式）。架构：Control Plane（kuma-cp）管理策略下发 → Data Plane（每个Pod的Sidecar代理，K8s模式用Envoy，VM模式用Kong DP）执行流量治理 → 通过Dataplane资源注册服务。典型策略：TrafficPermission(mTLS访问控制)、TrafficRoute(流量路由/拆分)、Retry(重试)、Timeout(超时)、CircuitBreaker(熔断)、RateLimit(限流)、HealthCheck(健康检查)、Trace(分布式追踪)。Kong API网关+Kong Mesh组合：网关治理入口流量 + Mesh治理内部流量 = 全栈API治理。",
    tags: ["Kong Mesh", "Service Mesh", "Kuma", "东西向流量", "Sidecar", "mTLS"],
  },
  {
    id: "kga-at-4",
    chapter: "kga-advanced-topics",
    level: 2,
    question: "Kong的Serverless插件（AWS Lambda/Azure Functions/OpenWhisk）如何工作？它带来了什么架构变革？",
    answer: "Serverless插件工作原理：当请求匹配到配置了Serverless插件的Route时，Kong不转发请求到传统后端Service，而是直接调用云函数（AWS Lambda/Azure Functions/Apache OpenWhisk），将请求数据传给函数，将函数返回值作为HTTP响应返回客户端。AWS Lambda插件配置：①创建Service（url指向lambda函数ARN或占位）：POST /services {\"name\":\"lambda-service\",\"url\":\"http://lambda\"}。②配置Lambda插件：POST /routes/{route}/plugins {\"name\":\"aws-lambda\",\"config\":{\"aws_key\":\"AKIAxxx\",\"aws_secret\":\"secretxxx\",\"aws_region\":\"us-east-1\",\"function_name\":\"my-function\",\"qualifier\":\"$LATEST\",\"forward_request_body\":true,\"forward_request_headers\":true,\"forward_request_method\":true,\"forward_request_uri\":true,\"is_proxy_integration\":true}}。③请求到达Kong → Kong匹配Route → Lambda插件调用AWS Lambda API → 传入请求body/headers/method/uri → Lambda函数执行 → 返回结果 → Kong返回客户端。is_proxy_integration=true使用Lambda Proxy Integration，函数收到完整HTTP请求上下文，返回值需包含statusCode/body/headers格式。架构变革：①无需管理服务器——后端逻辑运行在云函数平台，自动扩缩容，按调用次数计费，无需维护服务器/容器。②API网关直接对接函数——Kong作为HTTP入口，Lambda作为计算后端，形成「API Gateway + Function」的Serverless架构模式。③事件驱动——函数只在有请求时执行，空闲时不消耗资源，适合间歇性/低频API。④快速原型——开发者只需编写函数代码（无需部署服务），通过Kong配置路由即可暴露为API。适用场景：①Webhook处理（GitHub/Stripe等Webhook回调）；②低频API（如报表生成、批量任务触发）；③API聚合/BFF层（一个函数聚合多个后端服务数据）；④快速原型验证（无需搭建完整微服务）。局限：①冷启动延迟（函数首次调用需初始化，可能数百毫秒）；②不适合高频/低延迟API（冷启动+函数调用开销）；③长时间运行任务受限（Lambda最长15分钟）；④调试和本地开发较复杂。最佳实践：高频核心API用传统微服务+Kong路由，低频/事件驱动API用Lambda+Kong Serverless插件。",
    tags: ["Serverless", "AWS Lambda", "Azure Functions", "无服务器", "架构变革"],
  },
];
