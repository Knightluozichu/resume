import type { ReviewQuestion } from "./types";

export const ilhCachingQuestions: ReviewQuestion[] = [
  {
    id: "ilh-ca-1",
    chapter: "ilh-caching",
    level: 1,
    question: `强缓存和协商缓存有什么区别？各自返回什么状态码？`,
    answer: `强缓存命中时不向服务器发送请求，直接用本地缓存，返回200（DevTools显示from cache），通过Cache-Control: max-age或Expires控制，无网络延迟最快。协商缓存命中时向服务器发送请求询问缓存是否可用，服务器返回304 Not Modified（无响应体），通过ETag/If-None-Match或Last-Modified/If-Modified-Since验证。强缓存过期后才进入协商缓存。ETag优先于Last-Modified。`,
    tags: ["强缓存", "协商缓存", "304", "200"],
  },
  {
    id: "ilh-ca-2",
    chapter: "ilh-caching",
    level: 2,
    question: `Cache-Control有哪些常用指令？各自含义是什么？`,
    answer: `Cache-Control常用指令：max-age=N（缓存N秒，从响应生成时刻起算）、no-cache（不直接用缓存，每次走协商缓存验证）、no-store（完全不缓存，敏感数据用）、public（允许CDN等中间代理缓存）、private（仅浏览器缓存，个性化数据用）、must-revalidate（过期后必须验证不能用过期缓存）。Cache-Control是HTTP/1.1首选，优先于HTTP/1.0的Expires。`,
    tags: ["Cache-Control", "max-age", "no-cache", "no-store"],
  },
  {
    id: "ilh-ca-3",
    chapter: "ilh-caching",
    level: 2,
    question: `ETag和Last-Modified有什么区别？为什么ETag优先？`,
    answer: `ETag基于内容哈希，精确度高——能检测1秒内多次修改，内容没变ETag不变。Last-Modified基于修改时间，精度为秒级——1秒内多次修改检测不到，内容没变但时间改了会误判修改。ETag优先于Last-Modified是因为它更精确——服务器先比较ETag，ETag匹配才返回304。ETag通过If-None-Match携带，Last-Modified通过If-Modified-Since携带。`,
    tags: ["ETag", "Last-Modified", "协商缓存", "优先级"],
  },
  {
    id: "ilh-ca-4",
    chapter: "ilh-caching",
    level: 3,
    question: `前端如何实现最优的缓存策略？原理是什么？`,
    answer: `前端最优缓存策略：打包工具（Webpack/Vite）给文件名加hash（如app.a1b2c3.js），对静态资源设置极长max-age（如31536000秒=1年）。原理：文件内容变化→hash变化→文件名变化→浏览器视为新资源请求新文件；文件不变→hash不变→文件名不变→强缓存命中。这样静态资源可长期缓存，内容更新时通过文件名变化自动失效缓存，兼顾性能与更新。`,
    tags: ["缓存策略", "hash", "前端优化", "max-age"],
  },
];
