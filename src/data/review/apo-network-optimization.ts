import type { ReviewQuestion } from "./types";

export const apoNetworkOptimizationQuestions: ReviewQuestion[] = [
  {
    id: "apo-no-1",
    chapter: "apo-network-optimization",
    level: 2,
    question: "HTTP 请求从发起到收到响应经过哪些阶段？各阶段有什么优化手段？",
    answer:
      "五个阶段及优化：①DNS解析——域名解析为IP通常20-200ms。优化：HTTPDNS（绕过运营商DNS防劫持+低延迟）、DNS预解析（App启动时预解析常用域名）、OkHttp DNS缓存 ②TCP连接——3次握手1-2 RTT。优化：Keep-Alive保持连接、连接池复用（OkHttp ConnectionPool）、HTTP/2多路复用（单连接并发多请求）③TLS握手——HTTPS额外1-2 RTT。优化：TLS Session复用、TLS 1.3（1-RTT甚至0-RTT）、HTTP/3 QUIC（基于UDP 0-RTT恢复）④请求发送——上传头和体。优化：Gzip压缩、Protobuf替代JSON（体积小65%）、合并请求 ⑤响应接收——下载数据。优化：多级缓存（内存+磁盘+HTTP Cache）、ETag条件请求（304无响应体）、增量更新、分页加载。移动网络下一次RTT约50-200ms，连接复用可将后续请求连接开销降为0。",
    tags: ["HTTP请求", "DNS", "TCP", "TLS", "连接复用"],
  },
  {
    id: "apo-no-2",
    chapter: "apo-network-optimization",
    level: 3,
    question: "OkHttp 的应用拦截器和网络拦截器有什么区别？各适用什么场景？",
    answer:
      "区别：①执行顺序——应用拦截器在拦截器链最外层只执行一次；网络拦截器在连接建立后请求发送前执行重定向时可能执行多次 ②缓存——应用拦截器不关心缓存（在缓存判断之前）；网络拦截器能看到最终网络请求和响应（缓存未命中时）③调用次数——应用拦截器对每个请求只调用一次（即使重定向）；网络拦截器对每次实际网络请求都调用（重定向N次调N次）④chain.proceed()——应用拦截器的chain只有一个请求；网络拦截器的chain可能是重定向后请求。应用拦截器适合：统一添加公共头/参数、日志记录、离线缓存判断（FORCE_CACHE）、重试逻辑、请求加密。网络拦截器适合：HTTP缓存策略控制（Cache-Control头）、监控实际网络传输、Gzip压缩处理。最佳实践：离线缓存用应用拦截器（addInterceptor），在线缓存用网络拦截器（addNetworkInterceptor）。",
    tags: ["OkHttp", "应用拦截器", "网络拦截器", "缓存"],
  },
  {
    id: "apo-no-3",
    chapter: "apo-network-optimization",
    level: 3,
    question: "如何实现多级缓存策略？离线时如何保证用户体验？",
    answer:
      "多级缓存实现：L1内存缓存用Map或LruCache存储最近Response读取最快容量小App重启丢失。L2磁盘缓存用OkHttp Cache在cacheDir下存10MB App重启可用。HTTP Cache通过服务端Cache-Control/ETag控制304 Not Modified减少传输。实现策略：①应用拦截器判断网络状态离线时FORCE_CACHE只用磁盘缓存 ②网络拦截器在线时设max-age控制缓存有效期 ③自定义二级缓存：先查内存→内存未命中查磁盘→磁盘未命中发网络请求→成功后同时写入内存和磁盘。离线体验保障：①离线时展示上次缓存数据标注「数据可能不是最新」②离线写入操作暂存队列联网后自动同步 ③图片等资源预缓存到磁盘离线可显示 ④页面骨架屏+缓存数据避免空白 ⑤关键功能完全离线可用 ⑥监听网络恢复自动刷新。核心原则：离线不让用户看到错误页面而是展示缓存+提示。",
    tags: ["多级缓存", "离线缓存", "OkHttp Cache", "用户体验"],
  },
  {
    id: "apo-no-4",
    chapter: "apo-network-optimization",
    level: 4,
    question: "弱网环境下应该采取哪些优化策略？设计一个弱网图片加载方案。",
    answer:
      "弱网优化策略：①请求降级——降低数据精度（低清图片、纯文本替代HTML、减少字段）②超时调整——弱网延长超时（connectTimeout 10s→30s）③重试策略——指数退避（1s→2s→4s）④离线优先——先展示缓存后台静默更新 ⑤预加载——WiFi时预取后续页面数据 ⑥批量请求——合并API减少连接数 ⑦断点续传——大文件支持Range请求恢复。弱网图片加载方案：①网络检测——ConnectivityManager监听网络类型和信号强度判断弱网 ②分级加载——弱网请求缩略图URL（?quality=low&w=200）WiFi请求原图 ③缓存优先——先查内存→磁盘有缓存直接显示无缓存才发网络请求 ④占位图——加载中显示低分辨率占位图或骨架屏 ⑤渐进式加载——Glide thumbnail()先加载缩略图再全图 ⑥超时降级——图片加载超时5s后取消显示占位图 ⑦并发控制——弱网限制并发下载数（最多2个）⑧质量自适应——根据带宽动态选图片质量（WebP>JPEG>低清JPEG）⑨预加载下一屏——当前图片完成后预加载下一屏缩略图。",
    tags: ["弱网优化", "图片加载", "降级", "预加载"],
  },
];
