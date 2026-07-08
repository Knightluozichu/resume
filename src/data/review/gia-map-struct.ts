import type { ReviewQuestion } from "./types";

/** Map 与 Struct 复习题 */
export const giaMapStructQuestions: ReviewQuestion[] = [
  {
    id: "gia-map-struct-1",
    chapter: "gia-map-struct",
    level: 1,
    question: "Go map 的零值是什么？能直接写入吗？",
    answer: "map 零值是 nil。nil map 能安全读取（返回零值），但不能写入——向 nil map 写入会 panic: assignment to entry in nil map。必须用 make(map[K]V) 或字面量 map[K]V{} 初始化后才可写。这与切片不同——nil 切片可以 append（会分配），但 nil map 不能直接写。",
    tags: ["map", "nil", "make"],
  },
  {
    id: "gia-map-struct-2",
    chapter: "gia-map-struct",
    level: 2,
    question: "什么时候用值接收者，什么时候用指针接收者？",
    answer: "默认用指针接收者 *T：避免大 struct 每次方法调用复制、能修改字段、保持方法集一致。用值接收者 T：struct 很小（几个基本类型复制成本可忽略）、需要值语义（如排序 Less 不可变）、类型本身不可变（如 time.Time）。关键规则：一个类型的方法集应统一用值或指针，不要混用——混用会导致接口实现不一致（值接收者方法集只含值方法，指针接收者含值+指针方法），影响接口满足性。",
    tags: ["值接收者", "指针接收者", "方法集"],
  },
  {
    id: "gia-map-struct-3",
    chapter: "gia-map-struct",
    level: 3,
    question: "标准 map 为什么不是并发安全的？并发场景如何处理？",
    answer: "标准 map 不是并发安全——多 goroutine 同时读写会运行时 panic: concurrent map read and map write。因为 map 内部哈希表无锁，并发访问会破坏数据结构。并发处理：1. sync.RWMutex 加锁——读多写少用 RWMutex（多读单写），适合一般场景；2. sync.Map——读多写少且 key 稳定时性能更好，无需初始化，用 Load/Store/Delete；3. channel 串行化——一个 goroutine 拥有 map，其他通过 channel 读写请求（CSP 风格）。用 go test -race 检测并发 map 问题。",
    tags: ["并发安全", "sync.Map", "RWMutex", "race"],
  },
  {
    id: "gia-map-struct-4",
    chapter: "gia-map-struct",
    level: 4,
    question: "设计一个配置管理模块，用 struct 还是 map？如何支持默认值、环境变量覆盖、JSON 标签？",
    answer: "用 struct——配置字段固定且类型已知，struct 提供编译期类型安全、字段标签、连续内存。设计：type Config struct { Host string `json:\"host\" env:\"HOST\" default:\"localhost\"`; Port int `json:\"port\" env:\"PORT\" default:\"8080\"` }。默认值：定义带默认值的变量 var defaultConfig = Config{Host:\"localhost\",Port:8080}，或用 struct tag + 反射读取 default 标签填充。环境变量覆盖：用 os.Getenv 或 envconfig 库读取 env 标签覆盖。JSON：encoding/json 读取 json 标签反序列化配置文件。加载顺序：默认值 → 配置文件 JSON 覆盖 → 环境变量覆盖（优先级最高）。用 struct tag 统一元信息，避免硬编码。map 仅用于运行时动态键值（如用户自定义参数），配置管理用 struct 最合适。",
    tags: ["struct", "配置管理", "struct tag", "综合"],
  },
];
