import { ReviewQuestion } from "../types";

export const hdgCachingQuestions: ReviewQuestion[] = [
  {
    id: "hdg-caching-1",
    chapter: "hdg-caching",
    level: 1,
    question: "缓存命中和未命中分别是什么？条件请求的作用是什么？",
    answer:
      "缓存命中：缓存有有效副本（max-age 未过期），直接返回无需请求源服务器。未命中：无副本或已过期，需向源服务器请求。条件请求的作用：副本过期后不直接丢弃，而是用 If-Modified-Since/If-None-Match 验证——服务器返回 304（未修改，用缓存）或 200（新内容）。体现了「过期不等于无效」。",
    tags: ["缓存", "命中", "条件请求", "304"],
  },
  {
    id: "hdg-caching-2",
    chapter: "hdg-caching",
    level: 2,
    question: "Cache-Control 的 no-cache 和 no-store 有什么区别？max-age 和 s-maxage 有什么区别？",
    answer:
      "no-cache：可存储但每次使用前必须向源服务器验证（不是不缓存）。no-store：完全禁止缓存存储（敏感数据专用）。max-age=N：所有缓存的新鲜期 N 秒。s-maxage=N：仅共享缓存（代理/CDN）的新鲜期，覆盖 max-age，实现不同层级差异化缓存。",
    tags: ["Cache-Control", "no-cache", "no-store", "max-age"],
  },
  {
    id: "hdg-caching-3",
    chapter: "hdg-caching",
    level: 2,
    question: "ETag 和 Last-Modified 在缓存验证中有什么区别？",
    answer:
      "Last-Modified 基于修改时间，精度为秒，1 秒内多次修改无法检测。ETag 基于内容哈希，任何修改都能检测，更精确。两者可共存——服务器优先检查 If-None-Match（ETag），再检查 If-Modified-Since（Last-Modified）。ETag 计算有服务器开销，但精确度更高。",
    tags: ["ETag", "Last-Modified", "缓存验证", "条件请求"],
  },
  {
    id: "hdg-caching-4",
    chapter: "hdg-caching",
    level: 1,
    question: "HTTP 缓存的层次结构是什么？启发式过期是如何计算的？",
    answer:
      "缓存层次：浏览器缓存 → 代理缓存 → CDN 边缘缓存 → 源服务器，层级越靠用户延迟越低。启发式过期：当响应没有 max-age/Expires 时，缓存用 LM-Factor 估算：过期时间 = (Date - Last-Modified) × 因子（通常 0.1）。例如资源 1 小时前修改，启发式过期 = 3600 × 0.1 = 360 秒。",
    tags: ["缓存层次", "启发式过期", "LM-Factor"],
  },
];
