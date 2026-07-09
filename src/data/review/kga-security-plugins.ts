import type { ReviewQuestion } from "./types";

export const kgaSecurityPluginsQuestions: ReviewQuestion[] = [
  {
    id: "kga-sp-1",
    chapter: "kga-security-plugins",
    level: 2,
    question: "Kong的CORS插件解决什么问题？如何配置？预检请求(OPTIONS)是如何处理的？",
    answer: "CORS(Cross-Origin Resource Sharing)解决的问题：浏览器的同源策略限制Web页面跨域请求API。当前端页面(https://app.example.com)调用API(https://api.example.com)时，浏览器会拦截跨域请求，除非API响应包含正确的CORS头允许该来源。CORS插件自动在响应中添加CORS头，免去后端服务各自处理CORS的麻烦。配置：POST /plugins {\"name\":\"cors\",\"config\":{\"origins\":[\"https://app.example.com\",\"https://admin.example.com\"],\"methods\":[\"GET\",\"POST\",\"PUT\",\"DELETE\"],\"headers\":[\"Content-Type\",\"Authorization\"],\"exposed_headers\":[\"X-Custom-Header\"],\"credentials\":true,\"max_age\":3600,\"preflight_continue\":false}}。关键配置：origins(允许的来源，*表示所有)、methods(允许的HTTP方法)、headers(允许的请求头)、exposed_headers(允许客户端读取的响应头)、credentials(是否允许携带Cookie)、max_age(预检结果缓存秒数)。预检请求处理：浏览器对「非简单请求」(如POST+Content-Type:application/json)会先发送OPTIONS预检请求询问服务器是否允许。Kong CORS插件的preflight_continue=false（默认）——Kong直接拦截OPTIONS请求并返回CORS预检响应(204 No Content + CORS头)，不转发给后端服务，减轻后端负担。preflight_continue=true——Kong将OPTIONS请求转发给后端，由后端处理CORS预检。核心：CORS插件在header_filter阶段添加Access-Control-Allow-Origin等响应头，在access阶段拦截OPTIONS预检请求，集中处理跨域逻辑。",
    tags: ["CORS", "跨域", "预检请求", "OPTIONS", "安全插件"],
  },
  {
    id: "kga-sp-2",
    chapter: "kga-security-plugins",
    level: 2,
    question: "Kong的ACL插件如何实现访问控制？它如何与认证插件配合工作？",
    answer: "ACL(Access Control List)插件原理：基于Consumer的group归属控制对Route/Service的访问权限。ACL插件声明允许(allow)或拒绝(deny)哪些group的Consumer访问，认证插件负责识别Consumer身份，ACL插件在认证之后检查该Consumer是否属于允许的group。配置流程：①创建Consumer：POST /consumers {\"username\":\"admin-user\"}。②为Consumer分配group：POST /consumers/{admin-user}/acls {\"group\":\"admin-group\"}。③配置认证插件（如JWT）：POST /routes/{route}/plugins {\"name\":\"jwt\"}。④配置ACL插件：POST /routes/{route}/plugins {\"name\":\"acl\",\"config\":{\"allow\":[\"admin-group\"],\"hide_groups_header\":true}}。工作流程：Client请求 → JWT插件验证令牌识别Consumer(admin-user) → ACL插件检查admin-user的group是否在allow列表中 → 属于admin-group则放行，不属于则返回403 Forbidden。关键配置：allow(允许访问的group列表)、deny(拒绝访问的group列表)、hide_groups_header(是否隐藏X-Consumer-Groups头不转发后端)。与认证插件的依赖关系：ACL插件必须在认证插件之后执行（ACL priority=950 < JWT priority=1450 < Key Auth priority=1250），因为它依赖认证插件设置的Consumer身份。如果请求未通过认证(匿名访问)，Consumer为nil，ACL插件会返回403(因为匿名Consumer不属于任何group，除非配置了anonymous Consumer并分配group)。典型应用：①管理员API只允许admin-group访问；②付费API只允许premium-group访问；③内部API只允许internal-group访问。ACL实现的是粗粒度授权（组级别），细粒度权限控制（资源级别）仍需后端业务逻辑实现。",
    tags: ["ACL", "访问控制", "Consumer", "group", "认证配合"],
  },
  {
    id: "kga-sp-3",
    chapter: "kga-security-plugins",
    level: 2,
    question: "Kong的IP Restriction插件如何配置黑白名单？它支持哪些匹配规则？",
    answer: "IP Restriction插件原理：根据客户端IP地址控制请求访问，支持黑名单(deny)和白名单(allow)两种模式。配置：①白名单模式——只允许指定IP访问：POST /plugins {\"name\":\"ip-restriction\",\"config\":{\"allow\":[\"192.168.1.0/24\",\"10.0.0.5\"]}}，只有192.168.1.x网段和10.0.0.5可访问，其他IP返回403。②黑名单模式——禁止指定IP访问：POST /plugins {\"name\":\"ip-restriction\",\"config\":{\"deny\":[\"1.2.3.4\",\"5.6.7.0/24\"]}}，列出的IP被拒绝，其他IP正常访问。匹配规则：①支持IPv4和IPv6地址；②支持CIDR网段表示法（如192.168.1.0/24表示192.168.1.0~192.168.1.255共256个IP）；③支持单个IP地址。客户端IP来源：Kong通过Nginx的real_ip机制获取客户端真实IP——①直连场景取TCP连接的remote_addr；②经过代理/CDN场景需配置Nginx的set_real_ip_from和real_ip_header（如X-Forwarded-For），Kong的配置文件kong.conf或Nginx注入配置中设置。注意：不能同时配置allow和deny，只能选其一。如果两者都配置，Kong报错。优先级：IP Restriction priority=3000，在认证插件之前执行，可在认证前就拒绝恶意IP，节省认证开销。典型应用：①管理API白名单内网IP；②封禁恶意爬虫/攻击IP黑名单；③灰度发布只允许测试IP访问新版本API；④地域限制（结合GeoIP）。局限：动态IP（拨号上网/移动网络）和代理池可绕过IP限制，需配合Bot Detection和Rate Limiting使用。",
    tags: ["IP Restriction", "黑白名单", "CIDR", "安全插件"],
  },
  {
    id: "kga-sp-4",
    chapter: "kga-security-plugins",
    level: 3,
    question: "在Kong中如何构建完整的安全防护体系？请综合运用CORS、ACL、IP Restriction、Bot Detection等插件设计一个多层安全方案。",
    answer: "多层安全防护体系（从外到内逐层过滤）：①第一层IP Restriction(priority=3000)——网络层防护：配置黑名单封禁已知恶意IP/网段，配置白名单限制管理API只能内网访问。在认证之前执行，第一时间拒绝恶意流量。②第二层Bot Detection(priority=2500)——机器人检测：识别并拦截恶意爬虫、扫描器、暴力破解工具的User-Agent和请求模式，保护API不被自动化攻击。③第三层认证插件(JWT priority=1450 / Key Auth priority=1250)——身份验证：验证请求者身份，只有持有有效凭证的Consumer才能通过。配置anonymous Consumer处理未认证请求。④第四层ACL(priority=950)——访问控制：认证通过后检查Consumer的group，不同group访问不同API。admin-group访问管理API，premium-group访问付费API，basic-group访问基础API。⑤第五层Rate Limiting(priority=910)——频率控制：限制每个Consumer的请求频率，防止暴力破解和DDoS。未认证(anonymous)Consumer限制更严格(10/min)，认证Consumer限制宽松(1000/min)。⑥第六层CORS(priority=2000)——跨域控制：限制只有合法前端域名可以跨域访问API。CORS priority高但在header_filter阶段处理响应头，不影响access阶段的认证/授权流程。⑥第七层Request Size Limiting / Request Terminator——请求体大小限制和异常请求终止。配置示例（针对/admin API）：Route级配置ip-restriction(allow内网) + bot-detection + jwt(认证) + acl(allow admin-group) + rate-limiting(100/min) + cors(origins=admin.example.com)。设计原则：①纵深防御——多层安全插件叠加，任一层被突破还有后续防护；②按priority从高到低自然形成安全过滤链；③认证前过滤(IP/Bot)节省后端资源；④认证后授权(ACL)实现精准访问控制；⑤限流防止暴力破解和DDoS。安全插件priority排序：IP Restriction(3000) > Bot Detection(2500) > CORS(2000) > JWT(1450) > Key Auth(1250) > ACL(950) > Rate Limiting(910)，自然形成从网络层到应用层的安全过滤链。",
    tags: ["安全体系", "多层防护", "纵深防御", "CORS", "ACL", "IP Restriction"],
  },
];
