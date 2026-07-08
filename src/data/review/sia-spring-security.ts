import type { ReviewQuestion } from "./types";

export const siaSpringSecurityQuestions: ReviewQuestion[] = [
  {
    id: "sia-ss-1",
    chapter: "sia-spring-security",
    level: 2,
    question: "认证（Authentication）和授权（Authorization）的区别是什么？",
    answer:
      "认证回答「你是谁」——验证用户身份，通常通过用户名密码、Token、证书等凭证。认证成功后用户身份（Principal）和权限（Authorities）存入 SecurityContext。授权回答「你能做什么」——验证已认证用户是否有权执行某操作或访问某资源。授权依赖认证的结果（先认证再授权）。Spring Security 中：认证由 AuthenticationManager → AuthenticationProvider → UserDetailsService 完成；授权由 FilterSecurityInterceptor（URL级）或 @PreAuthorize/@PostAuthorize（方法级）完成。认证失败返回 401 Unauthorized，授权失败返回 403 Forbidden——注意 401 是「未认证」，403 是「已认证但无权限」。",
    tags: ["认证", "授权"],
  },
  {
    id: "sia-ss-2",
    chapter: "sia-spring-security",
    level: 3,
    question: "为什么密码必须用 BCrypt 而不能用 MD5？",
    answer:
      "MD5/SHA 是通用哈希算法，设计目标是「快」——而快对密码存储是致命的：现代 GPU 每秒能计算几十亿次 MD5，即使加盐（防彩虹表）也挡不住暴力穷举破解。BCrypt 是专为密码存储设计的「慢哈希」：①自适应成本因子——可调强度（默认10），每次哈希耗时几十到几百毫秒，让暴力破解成本高到不可行；②内置盐——每次哈希自动生成随机盐并嵌入结果，同一密码两次哈希结果不同，防彩虹表；③抗 GPU——BCrypt 的 key expansion 算法对内存敏感，比 MD5 更难用 GPU 并行加速。Spring Security 默认用 BCryptPasswordEncoder。更强可选 Argon2（内存难哈希抗 ASIC）。绝不能明文或 MD5 存密码。",
    tags: ["密码编码", "BCrypt"],
  },
  {
    id: "sia-ss-3",
    chapter: "sia-spring-security",
    level: 3,
    question: "@PreAuthorize 和 @PostAuthorize 有什么区别？举例说明。",
    answer:
      "@PreAuthorize 在方法执行前检查权限——不满足直接抛 AccessDeniedException，方法不执行。适合做「调用门禁」：如 @PreAuthorize(\"hasRole('ADMIN')\") 保证只有管理员能调用。@PostAuthorize 在方法执行后检查——方法已执行，检查不满足则抛异常丢弃返回值。适合做「结果过滤」：如 @PreAuthorize(\"hasRole('ADMIN') or #o.userId == authentication.principal.id\") 在删除前检查，而 @PostAuthorize(\"returnObject.userId == authentication.principal.id\") 在查询后检查返回的订单是否属于当前用户——防止越权访问他人数据。@PostAuthorize 的代价是方法已执行（可能有副作用），所以查询用 @PostAuthorize 合适，有副作用的写操作应该用 @PreAuthorize 在执行前拦截。两者都用 SpEL 表达式，可访问 #参数名、authentication.principal、returnObject。",
    tags: ["方法级安全", "授权注解"],
  },
  {
    id: "sia-ss-4",
    chapter: "sia-spring-security",
    level: 4,
    question: "Spring Security 的过滤链架构是如何工作的？请求如何穿过安全过滤链？",
    answer:
      "Spring Security 用一条过滤器链（FilterChain）拦截所有请求，每个过滤器负责一个安全关注点。请求流程：请求 → SecurityContextPersistenceFilter（从会话恢复认证信息）→ UsernamePasswordAuthenticationFilter（处理表单登录认证）→ BasicAuthenticationFilter（HTTP Basic认证）→ CSRF/CORS 过滤器 → FilterSecurityInterceptor（授权检查：当前用户有权访问该 URL 吗）→ 控制器。关键组件：AuthenticationManager 分发给 AuthenticationProvider，后者调 UserDetailsService 加载用户、用 PasswordEncoder 比对哈希。认证失败由 AuthenticationEntryPoint 处理（返回 401），授权失败由 AccessDeniedHandler 处理（返回 403）。SecurityContext 存储已认证主体，默认用 ThreadLocal 绑定当前线程，可在任何地方通过 SecurityContextHolder.get() 获取当前用户。这种设计让安全逻辑与业务逻辑完全解耦。",
    tags: ["过滤链", "架构"],
  },
];
