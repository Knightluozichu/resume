import type { ReviewQuestion } from "./types";

export const kgaAuthenticationQuestions: ReviewQuestion[] = [
  {
    id: "kga-au-1",
    chapter: "kga-authentication",
    level: 2,
    question: `Kong的JWT认证插件如何工作？请描述完整的配置和使用流程。`,
    answer: `JWT插件工作原理：Kong在access阶段拦截请求，验证Authorization头中的JWT令牌签名和有效期，验证通过后将Consumer信息注入请求头转发给后端，后端无需再验证JWT。完整流程：①创建Consumer：POST /consumers {\"username\":\"alice\"}。②为Consumer创建JWT凭证：POST /consumers/{alice}/jwt {\"algorithm\":\"HS256\",\"key\":\"alice-key\",\"secret\":\"alice-secret\"}，返回凭证含key(=issuer/iss)和secret(签名密钥)。也可不指定key/secret由Kong自动生成。③配置JWT插件：POST /plugins {\"name\":\"jwt\",\"config\":{\"claims_to_verify\":[\"exp\"]}}（全局）或关联到Route/Service。④客户端获取JWT：用key作为iss声明、secret作为HS256签名密钥，生成JWT令牌（payload含iss=alice-key, exp=过期时间戳）。⑤客户端携带令牌请求：GET /api/users Authorization: Bearer eyJhbGc...。⑥Kong验证：解析JWT → 用iss(alice-key)查找Consumer的secret → 用secret验证签名 → 检查exp是否过期 → 验证通过注入X-Consumer-Id/X-Consumer-Username头 → 转发给后端。⑦验证失败返回401。关键配置：claims_to_verify(验证exp/nbf声明)、key_claim_name(指定iss声明字段名，默认iss)、secret_is_base64(secret是否base64编码)、anonymous(匿名Consumer ID，未认证时使用)。RS256非对称算法：需配置rsa_public_key字段，Kong用公钥验签，客户端用私钥签名，适合微服务间认证。`,
    tags: ["JWT", "认证", "Consumer", "Credential", "令牌验证"],
  },
  {
    id: "kga-au-2",
    chapter: "kga-authentication",
    level: 1,
    question: `Kong的Key Auth认证插件和Basic Auth认证插件分别如何使用？它们的区别是什么？`,
    answer: `Key Auth插件：①原理——客户端在请求中携带apikey参数（查询参数或请求头），Kong验证apikey是否存在于Consumer的Credential中。②配置：POST /plugins {\"name\":\"key-auth\",\"config\":{\"key_names\":[\"apikey\"],\"hide_credentials\":true}}。③创建凭证：POST /consumers/{alice}/key-auth {\"key\":\"alice-api-key-123\"}（不指定key则自动生成UUID）。④客户端调用：GET /api/users?apikey=alice-api-key-123 或 GET /api/users apikey: alice-api-key-123。⑤hide_credentials=true表示转发后端时去掉apikey头/参数，不泄露密钥。Basic Auth插件：①原理——HTTP Basic认证，客户端在Authorization头中发送Base64编码的username:password，Kong验证凭证。②配置：POST /plugins {\"name\":\"basic-auth\",\"config\":{\"hide_credentials\":true}}。③创建凭证：POST /consumers/{alice}/basic-auth {\"username\":\"alice\",\"password\":\"secret123\"}（密码在数据库中哈希存储）。④客户端调用：GET /api/users Authorization: Basic YWxpY2U6c2VjcmV0MTIz（Base64编码alice:secret123）。区别：①Key Auth用简单API Key（一个字符串），适合内部服务/简单场景，密钥泄露风险高；Basic Auth用用户名+密码，适合标准HTTP认证。②Key Auth密钥通过查询参数或自定义头传递，灵活但查询参数可能被日志记录；Basic Auth用标准Authorization头，HTTP规范。③Key Auth密钥无过期机制，需手动轮换；Basic Auth密码可配合外部认证系统。④安全级别都较低，生产环境推荐JWT或OAuth2。`,
    tags: ["Key Auth", "Basic Auth", "认证插件", "Credential"],
  },
  {
    id: "kga-au-3",
    chapter: "kga-authentication",
    level: 3,
    question: `Kong的OAuth2认证插件如何配置？完整的OAuth2授权码流程是怎样的？`,
    answer: `OAuth2插件配置：①创建Consumer代表OAuth应用：POST /consumers {\"username\":\"mobile-app\"}。②配置OAuth2插件：POST /plugins {\"name\":\"oauth2\",\"config\":{\"enable_authorization_code\":true,\"enable_client_credentials\":true,\"enable_implicit_grant\":true,\"enable_password_grant\":false,\"token_expiration\":7200,\"refresh_token_ttl\":1209600,\"provision_key\":\"your-provision-key\",\"scopes\":[\"read\",\"write\"]}}。③为Consumer创建OAuth应用：POST /consumers/{mobile-app}/oauth2 {\"name\":\"Mobile App\",\"redirect_uris\":[\"https://app.example.com/callback\"],\"client_id\":\"auto-generated\",\"client_secret\":\"auto-generated\"}。授权码流程(Authorization Code)：①用户访问授权页面——GET /oauth2/authorize?client_id=xxx&response_type=code&scope=read&redirect_uri=https://app.example.com/callback，请求头带provision_key。②Kong返回授权码——用户同意授权后Kong返回code。③用code换token——POST /oauth2/token grant_type=authorization_code&code=xxx&client_id=xxx&client_secret=xxx，Kong返回access_token和refresh_token。④携带token访问API——GET /api/users Authorization: Bearer {access_token}。⑤token过期后刷新——POST /oauth2/token grant_type=refresh_token&refresh_token=xxx&client_id=xxx。四种授权类型：authorization_code(授权码，最安全，Web应用)、implicit(简化模式，SPA)、password(密码模式，高信任客户端)、client_credentials(客户端凭证，服务间调用)。provision_key是管理授权端点的密钥，用于/authorize和/token接口认证。`,
    tags: ["OAuth2", "授权码流程", "认证", "token", "授权类型"],
  },
  {
    id: "kga-au-4",
    chapter: "kga-authentication",
    level: 3,
    question: `Kong中如何组合多种认证插件？多认证插件的执行顺序和Consumer识别机制是怎样的？`,
    answer: `多认证组合场景：有时需要同时支持多种认证方式（如外部客户端用JWT，内部服务用Key Auth，管理后台用LDAP）。组合策略：①多认证插件共存——在同一个Route/Service上同时启用jwt和key-auth插件，客户端可用任一方式认证。②执行顺序——按priority排序，JWT(priority=1450)先于Key Auth(priority=1250)执行。JWT先验证：成功则Consumer已识别，Key Auth插件检测到Consumer已设置可跳过(取决于配置)；JWT失败返回401则请求终止，不会继续Key Auth。③实际行为——Kong的多认证组合默认是「任一通过即可」而非「全部通过」：第一个认证插件成功后设置X-Consumer-Id，后续认证插件看到Consumer已设置则跳过。如果第一个认证失败（返回401），请求不会到达第二个认证插件。实现「多认证都通过」需用anonymous模式+逻辑组合。Anonymous Consumer机制：认证插件配置anonymous=某个Consumer ID，当认证失败时不返回401而是将请求关联到匿名Consumer（身份为匿名），后续可用ACL插件限制匿名Consumer的访问范围，实现「认证可选但未认证有不同权限」的效果。Consumer识别机制：认证插件在access阶段执行——验证凭证成功 → 查找Credential关联的Consumer → 将Consumer ID/Username注入请求头(X-Consumer-Id/X-Consumer-Username) → 后续插件和后端可通过这些头识别调用者。ACL插件配合：认证识别Consumer后，ACL插件根据Consumer的group判断是否有权访问当前Route，实现认证+授权分离。最佳实践：生产环境通常一种认证方式为主，避免多认证组合的复杂性和优先级混乱。`,
    tags: ["多认证组合", "Consumer识别", "anonymous", "priority", "ACL"],
  },
];
