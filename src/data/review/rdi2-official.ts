import type { ReviewQuestion } from "../review-questions";

export const rdi2OfficialQuestions: ReviewQuestion[] = [
  {
    id: "rdi-official-learning-map-q1",
    chapter: "rdi-official-learning-map",
    level: 1,
    question: "为什么“第2版权威学习地图”必须覆盖7个页面节点？",
    answer:
      "节点组成“沿数据结构与对象、单机数据库、多机数据库和独立功能四部分完成24章Redis 3.0实现”的结构、函数、状态与证据链；缺项会让26页路线、源码依赖图、Redis 3.0实验仓、版本边界与全书清单无法复现。",
    tags: ["Redis设计与实现", "Redis 3.0", "第2版权威学习地图"],
  },
  {
    id: "rdi-official-learning-map-q2",
    chapter: "rdi-official-learning-map",
    level: 1,
    question: "“第2版权威学习地图”的最小不变量是什么？",
    answer:
      "24章都有正式页面、完整小节、源码结构图、运行实验、失败反例和独立交付物；需要结构、函数、负载、故障与对账共同证明。",
    tags: ["Redis设计与实现", "Redis 3.0", "第2版权威学习地图"],
  },
  {
    id: "rdi-official-learning-map-q3",
    chapter: "rdi-official-learning-map",
    level: 2,
    question: "怎样为“第2版权威学习地图”构造反例？",
    answer:
      "把“把24章合并成少数主题，漏掉客户端、服务器、排序、位数组、慢日志和监视器”写成假设，只改变一个条件再检查状态。",
    tags: ["Redis设计与实现", "Redis 3.0", "第2版权威学习地图"],
  },
  {
    id: "rdi-official-learning-map-q4",
    chapter: "rdi-official-learning-map",
    level: 2,
    question: "“第2版权威学习地图”为什么必须固定Redis 3.0？",
    answer:
      "版本固定结构和函数语义，后续版本只能作为“沿数据结构与对象、单机数据库、多机数据库和独立功能四部分完成24章Redis 3.0实现”的差异材料。",
    tags: ["Redis设计与实现", "Redis 3.0", "第2版权威学习地图"],
  },
  {
    id: "rdi-official-learning-map-q5",
    chapter: "rdi-official-learning-map",
    level: 3,
    question: "如何验证“第2版权威学习地图”的性能与语义？",
    answer:
      "固定命令与数据，测分位延迟、内存、I/O和事件，并独立证明“24章都有正式页面、完整小节、源码结构图、运行实验、失败反例和独立交付物”。",
    tags: ["Redis设计与实现", "Redis 3.0", "第2版权威学习地图"],
  },
  {
    id: "rdi-official-learning-map-q6",
    chapter: "rdi-official-learning-map",
    level: 3,
    question: "“第2版权威学习地图”独立交接需要哪些材料？",
    answer:
      "需要版本目录、结构函数、26页路线、源码依赖图、Redis 3.0实验仓、版本边界与全书清单、负载、故障、对账、停止、恢复与回退。",
    tags: ["Redis设计与实现", "Redis 3.0", "第2版权威学习地图"],
  },
  {
    id: "rdi-01-introduction-q1",
    chapter: "rdi-01-introduction",
    level: 1,
    question: "为什么“第1章 简介”必须覆盖5个页面节点？",
    answer:
      "节点组成“固定Redis 3.0源码版本、24章边界、阅读顺序和配套注释源码，建立从结构到功能的追踪方法”的结构、函数、状态与证据链；缺项会让版本边界表、24章路线、源码阅读索引与术语约定无法复现。",
    tags: ["Redis设计与实现", "Redis 3.0", "第1章 简介"],
  },
  {
    id: "rdi-01-introduction-q2",
    chapter: "rdi-01-introduction",
    level: 1,
    question: "“第1章 简介”的最小不变量是什么？",
    answer:
      "任何结论都标明Redis 3.0语境、目录归属、源码入口和后续版本差异；需要结构、函数、负载、故障与对账共同证明。",
    tags: ["Redis设计与实现", "Redis 3.0", "第1章 简介"],
  },
  {
    id: "rdi-01-introduction-q3",
    chapter: "rdi-01-introduction",
    level: 2,
    question: "怎样为“第1章 简介”构造反例？",
    answer:
      "把“把当代Redis实现倒灌到2014版，或脱离源码版本把命令行为当永恒实现”写成假设，只改变一个条件再检查状态。",
    tags: ["Redis设计与实现", "Redis 3.0", "第1章 简介"],
  },
  {
    id: "rdi-01-introduction-q4",
    chapter: "rdi-01-introduction",
    level: 2,
    question: "“第1章 简介”为什么必须固定Redis 3.0？",
    answer:
      "版本固定结构和函数语义，后续版本只能作为“固定Redis 3.0源码版本、24章边界、阅读顺序和配套注释源码，建立从结构到功能的追踪方法”的差异材料。",
    tags: ["Redis设计与实现", "Redis 3.0", "第1章 简介"],
  },
  {
    id: "rdi-01-introduction-q5",
    chapter: "rdi-01-introduction",
    level: 3,
    question: "如何验证“第1章 简介”的性能与语义？",
    answer:
      "固定命令与数据，测分位延迟、内存、I/O和事件，并独立证明“任何结论都标明Redis 3.0语境、目录归属、源码入口和后续版本差异”。",
    tags: ["Redis设计与实现", "Redis 3.0", "第1章 简介"],
  },
  {
    id: "rdi-01-introduction-q6",
    chapter: "rdi-01-introduction",
    level: 3,
    question: "“第1章 简介”独立交接需要哪些材料？",
    answer:
      "需要版本目录、结构函数、版本边界表、24章路线、源码阅读索引与术语约定、负载、故障、对账、停止、恢复与回退。",
    tags: ["Redis设计与实现", "Redis 3.0", "第1章 简介"],
  },
  {
    id: "rdi-02-simple-dynamic-string-q1",
    chapter: "rdi-02-simple-dynamic-string",
    level: 1,
    question: "为什么“第2章 简单动态字符串”必须覆盖5个页面节点？",
    answer:
      "节点组成“从sdshdr的len、free和buf理解常数时间取长、二进制安全、空间预分配与惰性释放”的结构、函数、状态与证据链；缺项会让SDS内存图、扩缩容轨迹、边界测试与C字符串对照无法复现。",
    tags: ["Redis设计与实现", "Redis 3.0", "第2章 简单动态字符串"],
  },
  {
    id: "rdi-02-simple-dynamic-string-q2",
    chapter: "rdi-02-simple-dynamic-string",
    level: 1,
    question: "“第2章 简单动态字符串”的最小不变量是什么？",
    answer:
      "字符串长度、终止字节和可用空间始终一致，扩容不会溢出，二进制数据不被截断；需要结构、函数、负载、故障与对账共同证明。",
    tags: ["Redis设计与实现", "Redis 3.0", "第2章 简单动态字符串"],
  },
  {
    id: "rdi-02-simple-dynamic-string-q3",
    chapter: "rdi-02-simple-dynamic-string",
    level: 2,
    question: "怎样为“第2章 简单动态字符串”构造反例？",
    answer:
      "把“只看buf而忽略len/free不变量，或把SDS等同普通以零结尾字符串”写成假设，只改变一个条件再检查状态。",
    tags: ["Redis设计与实现", "Redis 3.0", "第2章 简单动态字符串"],
  },
  {
    id: "rdi-02-simple-dynamic-string-q4",
    chapter: "rdi-02-simple-dynamic-string",
    level: 2,
    question: "“第2章 简单动态字符串”为什么必须固定Redis 3.0？",
    answer:
      "版本固定结构和函数语义，后续版本只能作为“从sdshdr的len、free和buf理解常数时间取长、二进制安全、空间预分配与惰性释放”的差异材料。",
    tags: ["Redis设计与实现", "Redis 3.0", "第2章 简单动态字符串"],
  },
  {
    id: "rdi-02-simple-dynamic-string-q5",
    chapter: "rdi-02-simple-dynamic-string",
    level: 3,
    question: "如何验证“第2章 简单动态字符串”的性能与语义？",
    answer:
      "固定命令与数据，测分位延迟、内存、I/O和事件，并独立证明“字符串长度、终止字节和可用空间始终一致，扩容不会溢出，二进制数据不被截断”。",
    tags: ["Redis设计与实现", "Redis 3.0", "第2章 简单动态字符串"],
  },
  {
    id: "rdi-02-simple-dynamic-string-q6",
    chapter: "rdi-02-simple-dynamic-string",
    level: 3,
    question: "“第2章 简单动态字符串”独立交接需要哪些材料？",
    answer:
      "需要版本目录、结构函数、SDS内存图、扩缩容轨迹、边界测试与C字符串对照、负载、故障、对账、停止、恢复与回退。",
    tags: ["Redis设计与实现", "Redis 3.0", "第2章 简单动态字符串"],
  },
  {
    id: "rdi-03-linked-list-q1",
    chapter: "rdi-03-linked-list",
    level: 1,
    question: "为什么“第3章 链表”必须覆盖3个页面节点？",
    answer:
      "节点组成“沿listNode双向指针和list头尾、长度、复制与释放函数指针理解通用链表”的结构、函数、状态与证据链；缺项会让链表拓扑图、插删指针轨迹、复杂度表与结构断言无法复现。",
    tags: ["Redis设计与实现", "Redis 3.0", "第3章 链表"],
  },
  {
    id: "rdi-03-linked-list-q2",
    chapter: "rdi-03-linked-list",
    level: 1,
    question: "“第3章 链表”的最小不变量是什么？",
    answer:
      "头尾、前后指针和长度在插入删除后相互一致，节点所有权与释放回调明确；需要结构、函数、负载、故障与对账共同证明。",
    tags: ["Redis设计与实现", "Redis 3.0", "第3章 链表"],
  },
  {
    id: "rdi-03-linked-list-q3",
    chapter: "rdi-03-linked-list",
    level: 2,
    question: "怎样为“第3章 链表”构造反例？",
    answer:
      "把“只验证正向遍历，不核对尾指针、prev链接、长度和释放回调”写成假设，只改变一个条件再检查状态。",
    tags: ["Redis设计与实现", "Redis 3.0", "第3章 链表"],
  },
  {
    id: "rdi-03-linked-list-q4",
    chapter: "rdi-03-linked-list",
    level: 2,
    question: "“第3章 链表”为什么必须固定Redis 3.0？",
    answer:
      "版本固定结构和函数语义，后续版本只能作为“沿listNode双向指针和list头尾、长度、复制与释放函数指针理解通用链表”的差异材料。",
    tags: ["Redis设计与实现", "Redis 3.0", "第3章 链表"],
  },
  {
    id: "rdi-03-linked-list-q5",
    chapter: "rdi-03-linked-list",
    level: 3,
    question: "如何验证“第3章 链表”的性能与语义？",
    answer:
      "固定命令与数据，测分位延迟、内存、I/O和事件，并独立证明“头尾、前后指针和长度在插入删除后相互一致，节点所有权与释放回调明确”。",
    tags: ["Redis设计与实现", "Redis 3.0", "第3章 链表"],
  },
  {
    id: "rdi-03-linked-list-q6",
    chapter: "rdi-03-linked-list",
    level: 3,
    question: "“第3章 链表”独立交接需要哪些材料？",
    answer:
      "需要版本目录、结构函数、链表拓扑图、插删指针轨迹、复杂度表与结构断言、负载、故障、对账、停止、恢复与回退。",
    tags: ["Redis设计与实现", "Redis 3.0", "第3章 链表"],
  },
  {
    id: "rdi-04-dictionary-q1",
    chapter: "rdi-04-dictionary",
    level: 1,
    question: "为什么“第4章 字典”必须覆盖7个页面节点？",
    answer:
      "节点组成“追踪dict、dictht和dictEntry的哈希、冲突链、双表rehash与渐进迁移”的结构、函数、状态与证据链；缺项会让双哈希表图、冲突链样本、渐进rehash轨迹与负载测试无法复现。",
    tags: ["Redis设计与实现", "Redis 3.0", "第4章 字典"],
  },
  {
    id: "rdi-04-dictionary-q2",
    chapter: "rdi-04-dictionary",
    level: 1,
    question: "“第4章 字典”的最小不变量是什么？",
    answer:
      "迁移期间查找覆盖两张表，rehashidx单调推进，键只存在于正确位置且负载因子受控；需要结构、函数、负载、故障与对账共同证明。",
    tags: ["Redis设计与实现", "Redis 3.0", "第4章 字典"],
  },
  {
    id: "rdi-04-dictionary-q3",
    chapter: "rdi-04-dictionary",
    level: 2,
    question: "怎样为“第4章 字典”构造反例？",
    answer:
      "把“把rehash当一次性停顿，或迁移期间只查一张表导致漏键”写成假设，只改变一个条件再检查状态。",
    tags: ["Redis设计与实现", "Redis 3.0", "第4章 字典"],
  },
  {
    id: "rdi-04-dictionary-q4",
    chapter: "rdi-04-dictionary",
    level: 2,
    question: "“第4章 字典”为什么必须固定Redis 3.0？",
    answer:
      "版本固定结构和函数语义，后续版本只能作为“追踪dict、dictht和dictEntry的哈希、冲突链、双表rehash与渐进迁移”的差异材料。",
    tags: ["Redis设计与实现", "Redis 3.0", "第4章 字典"],
  },
  {
    id: "rdi-04-dictionary-q5",
    chapter: "rdi-04-dictionary",
    level: 3,
    question: "如何验证“第4章 字典”的性能与语义？",
    answer:
      "固定命令与数据，测分位延迟、内存、I/O和事件，并独立证明“迁移期间查找覆盖两张表，rehashidx单调推进，键只存在于正确位置且负载因子受控”。",
    tags: ["Redis设计与实现", "Redis 3.0", "第4章 字典"],
  },
  {
    id: "rdi-04-dictionary-q6",
    chapter: "rdi-04-dictionary",
    level: 3,
    question: "“第4章 字典”独立交接需要哪些材料？",
    answer:
      "需要版本目录、结构函数、双哈希表图、冲突链样本、渐进rehash轨迹与负载测试、负载、故障、对账、停止、恢复与回退。",
    tags: ["Redis设计与实现", "Redis 3.0", "第4章 字典"],
  },
  {
    id: "rdi-05-skiplist-q1",
    chapter: "rdi-05-skiplist",
    level: 1,
    question: "为什么“第5章 跳跃表”必须覆盖3个页面节点？",
    answer:
      "节点组成“用zskiplist层级、前进指针、跨度和后退指针解释有序集合的范围与排名操作”的结构、函数、状态与证据链；缺项会让多层路径图、插删轨迹、排名验证与复杂度实验无法复现。",
    tags: ["Redis设计与实现", "Redis 3.0", "第5章 跳跃表"],
  },
  {
    id: "rdi-05-skiplist-q2",
    chapter: "rdi-05-skiplist",
    level: 1,
    question: "“第5章 跳跃表”的最小不变量是什么？",
    answer:
      "分值顺序与成员字典序稳定，跨度可恢复排名，层级和前后链在更新后保持一致；需要结构、函数、负载、故障与对账共同证明。",
    tags: ["Redis设计与实现", "Redis 3.0", "第5章 跳跃表"],
  },
  {
    id: "rdi-05-skiplist-q3",
    chapter: "rdi-05-skiplist",
    level: 2,
    question: "怎样为“第5章 跳跃表”构造反例？",
    answer:
      "把“只画前进指针而忽略跨度、后退指针和同分值成员排序”写成假设，只改变一个条件再检查状态。",
    tags: ["Redis设计与实现", "Redis 3.0", "第5章 跳跃表"],
  },
  {
    id: "rdi-05-skiplist-q4",
    chapter: "rdi-05-skiplist",
    level: 2,
    question: "“第5章 跳跃表”为什么必须固定Redis 3.0？",
    answer:
      "版本固定结构和函数语义，后续版本只能作为“用zskiplist层级、前进指针、跨度和后退指针解释有序集合的范围与排名操作”的差异材料。",
    tags: ["Redis设计与实现", "Redis 3.0", "第5章 跳跃表"],
  },
  {
    id: "rdi-05-skiplist-q5",
    chapter: "rdi-05-skiplist",
    level: 3,
    question: "如何验证“第5章 跳跃表”的性能与语义？",
    answer:
      "固定命令与数据，测分位延迟、内存、I/O和事件，并独立证明“分值顺序与成员字典序稳定，跨度可恢复排名，层级和前后链在更新后保持一致”。",
    tags: ["Redis设计与实现", "Redis 3.0", "第5章 跳跃表"],
  },
  {
    id: "rdi-05-skiplist-q6",
    chapter: "rdi-05-skiplist",
    level: 3,
    question: "“第5章 跳跃表”独立交接需要哪些材料？",
    answer:
      "需要版本目录、结构函数、多层路径图、插删轨迹、排名验证与复杂度实验、负载、故障、对账、停止、恢复与回退。",
    tags: ["Redis设计与实现", "Redis 3.0", "第5章 跳跃表"],
  },
  {
    id: "rdi-06-integer-set-q1",
    chapter: "rdi-06-integer-set",
    level: 1,
    question: "为什么“第6章 整数集合”必须覆盖6个页面节点？",
    answer:
      "节点组成“理解intset的有序连续存储、编码升级、重排插入和不支持降级的空间权衡”的结构、函数、状态与证据链；缺项会让编码布局、升级搬迁轨迹、边界值测试与空间对照无法复现。",
    tags: ["Redis设计与实现", "Redis 3.0", "第6章 整数集合"],
  },
  {
    id: "rdi-06-integer-set-q2",
    chapter: "rdi-06-integer-set",
    level: 1,
    question: "“第6章 整数集合”的最小不变量是什么？",
    answer:
      "contents按当前编码解释且严格有序，升级后所有旧值保持数值不变，新值落在正确位置；需要结构、函数、负载、故障与对账共同证明。",
    tags: ["Redis设计与实现", "Redis 3.0", "第6章 整数集合"],
  },
  {
    id: "rdi-06-integer-set-q3",
    chapter: "rdi-06-integer-set",
    level: 2,
    question: "怎样为“第6章 整数集合”构造反例？",
    answer:
      "把“原地升级时从前向后搬移覆盖数据，或假设删除后会自动降级”写成假设，只改变一个条件再检查状态。",
    tags: ["Redis设计与实现", "Redis 3.0", "第6章 整数集合"],
  },
  {
    id: "rdi-06-integer-set-q4",
    chapter: "rdi-06-integer-set",
    level: 2,
    question: "“第6章 整数集合”为什么必须固定Redis 3.0？",
    answer:
      "版本固定结构和函数语义，后续版本只能作为“理解intset的有序连续存储、编码升级、重排插入和不支持降级的空间权衡”的差异材料。",
    tags: ["Redis设计与实现", "Redis 3.0", "第6章 整数集合"],
  },
  {
    id: "rdi-06-integer-set-q5",
    chapter: "rdi-06-integer-set",
    level: 3,
    question: "如何验证“第6章 整数集合”的性能与语义？",
    answer:
      "固定命令与数据，测分位延迟、内存、I/O和事件，并独立证明“contents按当前编码解释且严格有序，升级后所有旧值保持数值不变，新值落在正确位置”。",
    tags: ["Redis设计与实现", "Redis 3.0", "第6章 整数集合"],
  },
  {
    id: "rdi-06-integer-set-q6",
    chapter: "rdi-06-integer-set",
    level: 3,
    question: "“第6章 整数集合”独立交接需要哪些材料？",
    answer:
      "需要版本目录、结构函数、编码布局、升级搬迁轨迹、边界值测试与空间对照、负载、故障、对账、停止、恢复与回退。",
    tags: ["Redis设计与实现", "Redis 3.0", "第6章 整数集合"],
  },
  {
    id: "rdi-07-ziplist-q1",
    chapter: "rdi-07-ziplist",
    level: 1,
    question: "为什么“第7章 压缩列表”必须覆盖5个页面节点？",
    answer:
      "节点组成“按zlbytes、zltail、zllen和变长节点解析连续内存，并推演previous_entry_length导致的连锁更新”的结构、函数、状态与证据链；缺项会让字节布局图、节点解析器、连锁更新最坏轨迹与边界测试无法复现。",
    tags: ["Redis设计与实现", "Redis 3.0", "第7章 压缩列表"],
  },
  {
    id: "rdi-07-ziplist-q2",
    chapter: "rdi-07-ziplist",
    level: 1,
    question: "“第7章 压缩列表”的最小不变量是什么？",
    answer:
      "总字节、尾偏移、节点数和每个前驱长度一致，插删后能双向遍历到终止字节；需要结构、函数、负载、故障与对账共同证明。",
    tags: ["Redis设计与实现", "Redis 3.0", "第7章 压缩列表"],
  },
  {
    id: "rdi-07-ziplist-q3",
    chapter: "rdi-07-ziplist",
    level: 2,
    question: "怎样为“第7章 压缩列表”构造反例？",
    answer:
      "把“只算平均内存收益，忽略连锁更新的最坏复制成本和损坏传播”写成假设，只改变一个条件再检查状态。",
    tags: ["Redis设计与实现", "Redis 3.0", "第7章 压缩列表"],
  },
  {
    id: "rdi-07-ziplist-q4",
    chapter: "rdi-07-ziplist",
    level: 2,
    question: "“第7章 压缩列表”为什么必须固定Redis 3.0？",
    answer:
      "版本固定结构和函数语义，后续版本只能作为“按zlbytes、zltail、zllen和变长节点解析连续内存，并推演previous_entry_length导致的连锁更新”的差异材料。",
    tags: ["Redis设计与实现", "Redis 3.0", "第7章 压缩列表"],
  },
  {
    id: "rdi-07-ziplist-q5",
    chapter: "rdi-07-ziplist",
    level: 3,
    question: "如何验证“第7章 压缩列表”的性能与语义？",
    answer:
      "固定命令与数据，测分位延迟、内存、I/O和事件，并独立证明“总字节、尾偏移、节点数和每个前驱长度一致，插删后能双向遍历到终止字节”。",
    tags: ["Redis设计与实现", "Redis 3.0", "第7章 压缩列表"],
  },
  {
    id: "rdi-07-ziplist-q6",
    chapter: "rdi-07-ziplist",
    level: 3,
    question: "“第7章 压缩列表”独立交接需要哪些材料？",
    answer:
      "需要版本目录、结构函数、字节布局图、节点解析器、连锁更新最坏轨迹与边界测试、负载、故障、对账、停止、恢复与回退。",
    tags: ["Redis设计与实现", "Redis 3.0", "第7章 压缩列表"],
  },
  {
    id: "rdi-08-object-q1",
    chapter: "rdi-08-object",
    level: 1,
    question: "为什么“第8章 对象”必须覆盖11个页面节点？",
    answer:
      "节点组成“从redisObject的type、encoding、ptr、refcount和lru连接五类对象与多种底层编码”的结构、函数、状态与证据链；缺项会让类型编码矩阵、转换阈值实验、命令多态轨迹与内存回收记录无法复现。",
    tags: ["Redis设计与实现", "Redis 3.0", "第8章 对象"],
  },
  {
    id: "rdi-08-object-q2",
    chapter: "rdi-08-object",
    level: 1,
    question: "“第8章 对象”的最小不变量是什么？",
    answer:
      "对象类型决定命令集合，编码与ptr结构匹配，转换不改变用户值，引用计数和空转时间正确；需要结构、函数、负载、故障与对账共同证明。",
    tags: ["Redis设计与实现", "Redis 3.0", "第8章 对象"],
  },
  {
    id: "rdi-08-object-q3",
    chapter: "rdi-08-object",
    level: 2,
    question: "怎样为“第8章 对象”构造反例？",
    answer:
      "把“把用户类型直接等同一种底层结构，或引用共享对象后错误修改和释放”写成假设，只改变一个条件再检查状态。",
    tags: ["Redis设计与实现", "Redis 3.0", "第8章 对象"],
  },
  {
    id: "rdi-08-object-q4",
    chapter: "rdi-08-object",
    level: 2,
    question: "“第8章 对象”为什么必须固定Redis 3.0？",
    answer:
      "版本固定结构和函数语义，后续版本只能作为“从redisObject的type、encoding、ptr、refcount和lru连接五类对象与多种底层编码”的差异材料。",
    tags: ["Redis设计与实现", "Redis 3.0", "第8章 对象"],
  },
  {
    id: "rdi-08-object-q5",
    chapter: "rdi-08-object",
    level: 3,
    question: "如何验证“第8章 对象”的性能与语义？",
    answer:
      "固定命令与数据，测分位延迟、内存、I/O和事件，并独立证明“对象类型决定命令集合，编码与ptr结构匹配，转换不改变用户值，引用计数和空转时间正确”。",
    tags: ["Redis设计与实现", "Redis 3.0", "第8章 对象"],
  },
  {
    id: "rdi-08-object-q6",
    chapter: "rdi-08-object",
    level: 3,
    question: "“第8章 对象”独立交接需要哪些材料？",
    answer:
      "需要版本目录、结构函数、类型编码矩阵、转换阈值实验、命令多态轨迹与内存回收记录、负载、故障、对账、停止、恢复与回退。",
    tags: ["Redis设计与实现", "Redis 3.0", "第8章 对象"],
  },
  {
    id: "rdi-09-database-q1",
    chapter: "rdi-09-database",
    level: 1,
    question: "为什么“第9章 数据库”必须覆盖9个页面节点？",
    answer:
      "节点组成“追踪redisServer.db、redisDb.dict与expires完成键空间、TTL、惰性和定期删除以及通知”的结构、函数、状态与证据链；缺项会让键空间图、TTL时间线、过期采样实验、持久化与复制对照无法复现。",
    tags: ["Redis设计与实现", "Redis 3.0", "第9章 数据库"],
  },
  {
    id: "rdi-09-database-q2",
    chapter: "rdi-09-database",
    level: 1,
    question: "“第9章 数据库”的最小不变量是什么？",
    answer:
      "键空间和过期字典引用同一键，过期语义在命令、RDB、AOF和复制路径中一致；需要结构、函数、负载、故障与对账共同证明。",
    tags: ["Redis设计与实现", "Redis 3.0", "第9章 数据库"],
  },
  {
    id: "rdi-09-database-q3",
    chapter: "rdi-09-database",
    level: 2,
    question: "怎样为“第9章 数据库”构造反例？",
    answer:
      "把“把过期键物理存在等同逻辑可见，或忽略主从与载入过程的不同处理”写成假设，只改变一个条件再检查状态。",
    tags: ["Redis设计与实现", "Redis 3.0", "第9章 数据库"],
  },
  {
    id: "rdi-09-database-q4",
    chapter: "rdi-09-database",
    level: 2,
    question: "“第9章 数据库”为什么必须固定Redis 3.0？",
    answer:
      "版本固定结构和函数语义，后续版本只能作为“追踪redisServer.db、redisDb.dict与expires完成键空间、TTL、惰性和定期删除以及通知”的差异材料。",
    tags: ["Redis设计与实现", "Redis 3.0", "第9章 数据库"],
  },
  {
    id: "rdi-09-database-q5",
    chapter: "rdi-09-database",
    level: 3,
    question: "如何验证“第9章 数据库”的性能与语义？",
    answer:
      "固定命令与数据，测分位延迟、内存、I/O和事件，并独立证明“键空间和过期字典引用同一键，过期语义在命令、RDB、AOF和复制路径中一致”。",
    tags: ["Redis设计与实现", "Redis 3.0", "第9章 数据库"],
  },
  {
    id: "rdi-09-database-q6",
    chapter: "rdi-09-database",
    level: 3,
    question: "“第9章 数据库”独立交接需要哪些材料？",
    answer:
      "需要版本目录、结构函数、键空间图、TTL时间线、过期采样实验、持久化与复制对照、负载、故障、对账、停止、恢复与回退。",
    tags: ["Redis设计与实现", "Redis 3.0", "第9章 数据库"],
  },
  {
    id: "rdi-10-rdb-persistence-q1",
    chapter: "rdi-10-rdb-persistence",
    level: 1,
    question: "为什么“第10章 RDB持久化”必须覆盖5个页面节点？",
    answer:
      "节点组成“比较SAVE与BGSAVE，追踪自动保存条件、RDB文件结构、载入顺序与校验”的结构、函数、状态与证据链；缺项会让快照时间线、RDB字节解析、自动保存实验与恢复对账无法复现。",
    tags: ["Redis设计与实现", "Redis 3.0", "第10章 RDB持久化"],
  },
  {
    id: "rdi-10-rdb-persistence-q2",
    chapter: "rdi-10-rdb-persistence",
    level: 1,
    question: "“第10章 RDB持久化”的最小不变量是什么？",
    answer:
      "快照表示一致时点，文件头尾与对象编码可校验，恢复结果与快照时刻对账；需要结构、函数、负载、故障与对账共同证明。",
    tags: ["Redis设计与实现", "Redis 3.0", "第10章 RDB持久化"],
  },
  {
    id: "rdi-10-rdb-persistence-q3",
    chapter: "rdi-10-rdb-persistence",
    level: 2,
    question: "怎样为“第10章 RDB持久化”构造反例？",
    answer:
      "把“看到RDB文件生成就假设可恢复，忽略fork、写时复制、校验与数据损失窗口”写成假设，只改变一个条件再检查状态。",
    tags: ["Redis设计与实现", "Redis 3.0", "第10章 RDB持久化"],
  },
  {
    id: "rdi-10-rdb-persistence-q4",
    chapter: "rdi-10-rdb-persistence",
    level: 2,
    question: "“第10章 RDB持久化”为什么必须固定Redis 3.0？",
    answer:
      "版本固定结构和函数语义，后续版本只能作为“比较SAVE与BGSAVE，追踪自动保存条件、RDB文件结构、载入顺序与校验”的差异材料。",
    tags: ["Redis设计与实现", "Redis 3.0", "第10章 RDB持久化"],
  },
  {
    id: "rdi-10-rdb-persistence-q5",
    chapter: "rdi-10-rdb-persistence",
    level: 3,
    question: "如何验证“第10章 RDB持久化”的性能与语义？",
    answer:
      "固定命令与数据，测分位延迟、内存、I/O和事件，并独立证明“快照表示一致时点，文件头尾与对象编码可校验，恢复结果与快照时刻对账”。",
    tags: ["Redis设计与实现", "Redis 3.0", "第10章 RDB持久化"],
  },
  {
    id: "rdi-10-rdb-persistence-q6",
    chapter: "rdi-10-rdb-persistence",
    level: 3,
    question: "“第10章 RDB持久化”独立交接需要哪些材料？",
    answer:
      "需要版本目录、结构函数、快照时间线、RDB字节解析、自动保存实验与恢复对账、负载、故障、对账、停止、恢复与回退。",
    tags: ["Redis设计与实现", "Redis 3.0", "第10章 RDB持久化"],
  },
  {
    id: "rdi-11-aof-persistence-q1",
    chapter: "rdi-11-aof-persistence",
    level: 1,
    question: "为什么“第11章 AOF持久化”必须覆盖4个页面节点？",
    answer:
      "节点组成“沿命令追加、缓冲区写入、fsync、载入重放和后台重写理解AOF”的结构、函数、状态与证据链；缺项会让appendfsync对照、AOF解析、崩溃截断实验、重写双缓冲轨迹无法复现。",
    tags: ["Redis设计与实现", "Redis 3.0", "第11章 AOF持久化"],
  },
  {
    id: "rdi-11-aof-persistence-q2",
    chapter: "rdi-11-aof-persistence",
    level: 1,
    question: "“第11章 AOF持久化”的最小不变量是什么？",
    answer:
      "确认策略对应明确丢失窗口，AOF语法完整可重放，重写期间增量不丢且结果等价；需要结构、函数、负载、故障与对账共同证明。",
    tags: ["Redis设计与实现", "Redis 3.0", "第11章 AOF持久化"],
  },
  {
    id: "rdi-11-aof-persistence-q3",
    chapter: "rdi-11-aof-persistence",
    level: 2,
    question: "怎样为“第11章 AOF持久化”构造反例？",
    answer:
      "把“把写入操作系统缓存等同落盘，或重写时漏合并父进程新增命令”写成假设，只改变一个条件再检查状态。",
    tags: ["Redis设计与实现", "Redis 3.0", "第11章 AOF持久化"],
  },
  {
    id: "rdi-11-aof-persistence-q4",
    chapter: "rdi-11-aof-persistence",
    level: 2,
    question: "“第11章 AOF持久化”为什么必须固定Redis 3.0？",
    answer:
      "版本固定结构和函数语义，后续版本只能作为“沿命令追加、缓冲区写入、fsync、载入重放和后台重写理解AOF”的差异材料。",
    tags: ["Redis设计与实现", "Redis 3.0", "第11章 AOF持久化"],
  },
  {
    id: "rdi-11-aof-persistence-q5",
    chapter: "rdi-11-aof-persistence",
    level: 3,
    question: "如何验证“第11章 AOF持久化”的性能与语义？",
    answer:
      "固定命令与数据，测分位延迟、内存、I/O和事件，并独立证明“确认策略对应明确丢失窗口，AOF语法完整可重放，重写期间增量不丢且结果等价”。",
    tags: ["Redis设计与实现", "Redis 3.0", "第11章 AOF持久化"],
  },
  {
    id: "rdi-11-aof-persistence-q6",
    chapter: "rdi-11-aof-persistence",
    level: 3,
    question: "“第11章 AOF持久化”独立交接需要哪些材料？",
    answer:
      "需要版本目录、结构函数、appendfsync对照、AOF解析、崩溃截断实验、重写双缓冲轨迹、负载、故障、对账、停止、恢复与回退。",
    tags: ["Redis设计与实现", "Redis 3.0", "第11章 AOF持久化"],
  },
  {
    id: "rdi-12-event-q1",
    chapter: "rdi-12-event",
    level: 1,
    question: "为什么“第12章 事件”必须覆盖5个页面节点？",
    answer:
      "节点组成“把I/O多路复用、文件事件处理器、时间事件和aeProcessEvents调度连接为单线程事件循环”的结构、函数、状态与证据链；缺项会让事件循环时序、处理器注册表、阻塞实验与调度延迟分布无法复现。",
    tags: ["Redis设计与实现", "Redis 3.0", "第12章 事件"],
  },
  {
    id: "rdi-12-event-q2",
    chapter: "rdi-12-event",
    level: 1,
    question: "“第12章 事件”的最小不变量是什么？",
    answer:
      "就绪事件不丢不重复，时间事件按策略执行，长回调不无限阻塞其他客户端与serverCron；需要结构、函数、负载、故障与对账共同证明。",
    tags: ["Redis设计与实现", "Redis 3.0", "第12章 事件"],
  },
  {
    id: "rdi-12-event-q3",
    chapter: "rdi-12-event",
    level: 2,
    question: "怎样为“第12章 事件”构造反例？",
    answer:
      "把“把单线程等同所有工作无阻塞，忽略慢命令、fork与持久化I/O对事件循环的影响”写成假设，只改变一个条件再检查状态。",
    tags: ["Redis设计与实现", "Redis 3.0", "第12章 事件"],
  },
  {
    id: "rdi-12-event-q4",
    chapter: "rdi-12-event",
    level: 2,
    question: "“第12章 事件”为什么必须固定Redis 3.0？",
    answer:
      "版本固定结构和函数语义，后续版本只能作为“把I/O多路复用、文件事件处理器、时间事件和aeProcessEvents调度连接为单线程事件循环”的差异材料。",
    tags: ["Redis设计与实现", "Redis 3.0", "第12章 事件"],
  },
  {
    id: "rdi-12-event-q5",
    chapter: "rdi-12-event",
    level: 3,
    question: "如何验证“第12章 事件”的性能与语义？",
    answer:
      "固定命令与数据，测分位延迟、内存、I/O和事件，并独立证明“就绪事件不丢不重复，时间事件按策略执行，长回调不无限阻塞其他客户端与serverCron”。",
    tags: ["Redis设计与实现", "Redis 3.0", "第12章 事件"],
  },
  {
    id: "rdi-12-event-q6",
    chapter: "rdi-12-event",
    level: 3,
    question: "“第12章 事件”独立交接需要哪些材料？",
    answer:
      "需要版本目录、结构函数、事件循环时序、处理器注册表、阻塞实验与调度延迟分布、负载、故障、对账、停止、恢复与回退。",
    tags: ["Redis设计与实现", "Redis 3.0", "第12章 事件"],
  },
  {
    id: "rdi-13-client-q1",
    chapter: "rdi-13-client",
    level: 1,
    question: "为什么“第13章 客户端”必须覆盖3个页面节点？",
    answer:
      "节点组成“检查redisClient的套接字、名字、标志、输入输出缓冲、命令参数、事务与复制状态”的结构、函数、状态与证据链；缺项会让客户端结构图、创建关闭轨迹、缓冲区压力与资源泄漏检查无法复现。",
    tags: ["Redis设计与实现", "Redis 3.0", "第13章 客户端"],
  },
  {
    id: "rdi-13-client-q2",
    chapter: "rdi-13-client",
    level: 1,
    question: "“第13章 客户端”的最小不变量是什么？",
    answer:
      "客户端生命周期与套接字一致，缓冲区有上界，关闭路径清理订阅、监视和事务状态；需要结构、函数、负载、故障与对账共同证明。",
    tags: ["Redis设计与实现", "Redis 3.0", "第13章 客户端"],
  },
  {
    id: "rdi-13-client-q3",
    chapter: "rdi-13-client",
    level: 2,
    question: "怎样为“第13章 客户端”构造反例？",
    answer:
      "把“只看连接数，不检查输出缓冲、阻塞状态和关闭后的跨结构引用”写成假设，只改变一个条件再检查状态。",
    tags: ["Redis设计与实现", "Redis 3.0", "第13章 客户端"],
  },
  {
    id: "rdi-13-client-q4",
    chapter: "rdi-13-client",
    level: 2,
    question: "“第13章 客户端”为什么必须固定Redis 3.0？",
    answer:
      "版本固定结构和函数语义，后续版本只能作为“检查redisClient的套接字、名字、标志、输入输出缓冲、命令参数、事务与复制状态”的差异材料。",
    tags: ["Redis设计与实现", "Redis 3.0", "第13章 客户端"],
  },
  {
    id: "rdi-13-client-q5",
    chapter: "rdi-13-client",
    level: 3,
    question: "如何验证“第13章 客户端”的性能与语义？",
    answer:
      "固定命令与数据，测分位延迟、内存、I/O和事件，并独立证明“客户端生命周期与套接字一致，缓冲区有上界，关闭路径清理订阅、监视和事务状态”。",
    tags: ["Redis设计与实现", "Redis 3.0", "第13章 客户端"],
  },
  {
    id: "rdi-13-client-q6",
    chapter: "rdi-13-client",
    level: 3,
    question: "“第13章 客户端”独立交接需要哪些材料？",
    answer:
      "需要版本目录、结构函数、客户端结构图、创建关闭轨迹、缓冲区压力与资源泄漏检查、负载、故障、对账、停止、恢复与回退。",
    tags: ["Redis设计与实现", "Redis 3.0", "第13章 客户端"],
  },
  {
    id: "rdi-14-server-q1",
    chapter: "rdi-14-server",
    level: 1,
    question: "为什么“第14章 服务器”必须覆盖4个页面节点？",
    answer:
      "节点组成“从读取协议、查找命令、预备执行、调用函数到回复客户端，串联serverCron与初始化”的结构、函数、状态与证据链；缺项会让命令执行时序、serverCron职责表、启动阶段日志与失败注入无法复现。",
    tags: ["Redis设计与实现", "Redis 3.0", "第14章 服务器"],
  },
  {
    id: "rdi-14-server-q2",
    chapter: "rdi-14-server",
    level: 1,
    question: "“第14章 服务器”的最小不变量是什么？",
    answer:
      "命令查找、权限与状态检查先于执行，统计和传播围绕同一调用，初始化失败不留下半可用服务；需要结构、函数、负载、故障与对账共同证明。",
    tags: ["Redis设计与实现", "Redis 3.0", "第14章 服务器"],
  },
  {
    id: "rdi-14-server-q3",
    chapter: "rdi-14-server",
    level: 2,
    question: "怎样为“第14章 服务器”构造反例？",
    answer:
      "把“只追命令函数本身，忽略执行前检查、执行后传播、周期任务和初始化顺序”写成假设，只改变一个条件再检查状态。",
    tags: ["Redis设计与实现", "Redis 3.0", "第14章 服务器"],
  },
  {
    id: "rdi-14-server-q4",
    chapter: "rdi-14-server",
    level: 2,
    question: "“第14章 服务器”为什么必须固定Redis 3.0？",
    answer:
      "版本固定结构和函数语义，后续版本只能作为“从读取协议、查找命令、预备执行、调用函数到回复客户端，串联serverCron与初始化”的差异材料。",
    tags: ["Redis设计与实现", "Redis 3.0", "第14章 服务器"],
  },
  {
    id: "rdi-14-server-q5",
    chapter: "rdi-14-server",
    level: 3,
    question: "如何验证“第14章 服务器”的性能与语义？",
    answer:
      "固定命令与数据，测分位延迟、内存、I/O和事件，并独立证明“命令查找、权限与状态检查先于执行，统计和传播围绕同一调用，初始化失败不留下半可用服务”。",
    tags: ["Redis设计与实现", "Redis 3.0", "第14章 服务器"],
  },
  {
    id: "rdi-14-server-q6",
    chapter: "rdi-14-server",
    level: 3,
    question: "“第14章 服务器”独立交接需要哪些材料？",
    answer:
      "需要版本目录、结构函数、命令执行时序、serverCron职责表、启动阶段日志与失败注入、负载、故障、对账、停止、恢复与回退。",
    tags: ["Redis设计与实现", "Redis 3.0", "第14章 服务器"],
  },
  {
    id: "rdi-15-replication-q1",
    chapter: "rdi-15-replication",
    level: 1,
    question: "为什么“第15章 复制”必须覆盖8个页面节点？",
    answer:
      "节点组成“比较SYNC全量同步与PSYNC部分重同步，连接运行ID、复制偏移量、积压缓冲区和心跳”的结构、函数、状态与证据链；缺项会让复制状态机、偏移与backlog实验、断线重连轨迹和主从对账无法复现。",
    tags: ["Redis设计与实现", "Redis 3.0", "第15章 复制"],
  },
  {
    id: "rdi-15-replication-q2",
    chapter: "rdi-15-replication",
    level: 1,
    question: "“第15章 复制”的最小不变量是什么？",
    answer:
      "主从偏移与数据一致，断线重连正确选择全量或部分同步，命令传播顺序不分叉；需要结构、函数、负载、故障与对账共同证明。",
    tags: ["Redis设计与实现", "Redis 3.0", "第15章 复制"],
  },
  {
    id: "rdi-15-replication-q3",
    chapter: "rdi-15-replication",
    level: 2,
    question: "怎样为“第15章 复制”构造反例？",
    answer:
      "把“把连接恢复等同数据同步，或积压区不足时仍强行部分重同步”写成假设，只改变一个条件再检查状态。",
    tags: ["Redis设计与实现", "Redis 3.0", "第15章 复制"],
  },
  {
    id: "rdi-15-replication-q4",
    chapter: "rdi-15-replication",
    level: 2,
    question: "“第15章 复制”为什么必须固定Redis 3.0？",
    answer:
      "版本固定结构和函数语义，后续版本只能作为“比较SYNC全量同步与PSYNC部分重同步，连接运行ID、复制偏移量、积压缓冲区和心跳”的差异材料。",
    tags: ["Redis设计与实现", "Redis 3.0", "第15章 复制"],
  },
  {
    id: "rdi-15-replication-q5",
    chapter: "rdi-15-replication",
    level: 3,
    question: "如何验证“第15章 复制”的性能与语义？",
    answer:
      "固定命令与数据，测分位延迟、内存、I/O和事件，并独立证明“主从偏移与数据一致，断线重连正确选择全量或部分同步，命令传播顺序不分叉”。",
    tags: ["Redis设计与实现", "Redis 3.0", "第15章 复制"],
  },
  {
    id: "rdi-15-replication-q6",
    chapter: "rdi-15-replication",
    level: 3,
    question: "“第15章 复制”独立交接需要哪些材料？",
    answer:
      "需要版本目录、结构函数、复制状态机、偏移与backlog实验、断线重连轨迹和主从对账、负载、故障、对账、停止、恢复与回退。",
    tags: ["Redis设计与实现", "Redis 3.0", "第15章 复制"],
  },
  {
    id: "rdi-16-sentinel-q1",
    chapter: "rdi-16-sentinel",
    level: 1,
    question: "为什么“第16章 Sentinel”必须覆盖11个页面节点？",
    answer:
      "节点组成“沿Sentinel初始化、INFO发现、hello频道、主客观下线、领头选举与故障转移还原高可用”的结构、函数、状态与证据链；缺项会让Sentinel状态机、投票记录、故障转移时间线、旧主恢复与客户端验证无法复现。",
    tags: ["Redis设计与实现", "Redis 3.0", "第16章 Sentinel"],
  },
  {
    id: "rdi-16-sentinel-q2",
    chapter: "rdi-16-sentinel",
    level: 1,
    question: "“第16章 Sentinel”的最小不变量是什么？",
    answer:
      "故障判断满足法定票数，单轮只有合法领头者，晋升后旧主被重配置且客户端拓扑最终一致；需要结构、函数、负载、故障与对账共同证明。",
    tags: ["Redis设计与实现", "Redis 3.0", "第16章 Sentinel"],
  },
  {
    id: "rdi-16-sentinel-q3",
    chapter: "rdi-16-sentinel",
    level: 2,
    question: "怎样为“第16章 Sentinel”构造反例？",
    answer:
      "把“单个Sentinel超时就宣布客观下线，或完成晋升后不隔离和重配旧主”写成假设，只改变一个条件再检查状态。",
    tags: ["Redis设计与实现", "Redis 3.0", "第16章 Sentinel"],
  },
  {
    id: "rdi-16-sentinel-q4",
    chapter: "rdi-16-sentinel",
    level: 2,
    question: "“第16章 Sentinel”为什么必须固定Redis 3.0？",
    answer:
      "版本固定结构和函数语义，后续版本只能作为“沿Sentinel初始化、INFO发现、hello频道、主客观下线、领头选举与故障转移还原高可用”的差异材料。",
    tags: ["Redis设计与实现", "Redis 3.0", "第16章 Sentinel"],
  },
  {
    id: "rdi-16-sentinel-q5",
    chapter: "rdi-16-sentinel",
    level: 3,
    question: "如何验证“第16章 Sentinel”的性能与语义？",
    answer:
      "固定命令与数据，测分位延迟、内存、I/O和事件，并独立证明“故障判断满足法定票数，单轮只有合法领头者，晋升后旧主被重配置且客户端拓扑最终一致”。",
    tags: ["Redis设计与实现", "Redis 3.0", "第16章 Sentinel"],
  },
  {
    id: "rdi-16-sentinel-q6",
    chapter: "rdi-16-sentinel",
    level: 3,
    question: "“第16章 Sentinel”独立交接需要哪些材料？",
    answer:
      "需要版本目录、结构函数、Sentinel状态机、投票记录、故障转移时间线、旧主恢复与客户端验证、负载、故障、对账、停止、恢复与回退。",
    tags: ["Redis设计与实现", "Redis 3.0", "第16章 Sentinel"],
  },
  {
    id: "rdi-17-cluster-q1",
    chapter: "rdi-17-cluster",
    level: 1,
    question: "为什么“第17章 集群”必须覆盖8个页面节点？",
    answer:
      "节点组成“用16384槽、节点握手、MOVED与ASK、重新分片、复制和Gossip消息解释Redis Cluster”的结构、函数、状态与证据链；缺项会让槽位图、MOVED/ASK轨迹、在线迁槽演练、Gossip与故障转移记录无法复现。",
    tags: ["Redis设计与实现", "Redis 3.0", "第17章 集群"],
  },
  {
    id: "rdi-17-cluster-q2",
    chapter: "rdi-17-cluster",
    level: 1,
    question: "“第17章 集群”的最小不变量是什么？",
    answer:
      "每个槽恰有有效所有者，迁移状态可路由请求，故障转移不产生两个合法写主；需要结构、函数、负载、故障与对账共同证明。",
    tags: ["Redis设计与实现", "Redis 3.0", "第17章 集群"],
  },
  {
    id: "rdi-17-cluster-q3",
    chapter: "rdi-17-cluster",
    level: 2,
    question: "怎样为“第17章 集群”构造反例？",
    answer:
      "把“把节点均衡等同槽和负载均衡，或客户端把ASK临时重定向缓存为永久映射”写成假设，只改变一个条件再检查状态。",
    tags: ["Redis设计与实现", "Redis 3.0", "第17章 集群"],
  },
  {
    id: "rdi-17-cluster-q4",
    chapter: "rdi-17-cluster",
    level: 2,
    question: "“第17章 集群”为什么必须固定Redis 3.0？",
    answer:
      "版本固定结构和函数语义，后续版本只能作为“用16384槽、节点握手、MOVED与ASK、重新分片、复制和Gossip消息解释Redis Cluster”的差异材料。",
    tags: ["Redis设计与实现", "Redis 3.0", "第17章 集群"],
  },
  {
    id: "rdi-17-cluster-q5",
    chapter: "rdi-17-cluster",
    level: 3,
    question: "如何验证“第17章 集群”的性能与语义？",
    answer:
      "固定命令与数据，测分位延迟、内存、I/O和事件，并独立证明“每个槽恰有有效所有者，迁移状态可路由请求，故障转移不产生两个合法写主”。",
    tags: ["Redis设计与实现", "Redis 3.0", "第17章 集群"],
  },
  {
    id: "rdi-17-cluster-q6",
    chapter: "rdi-17-cluster",
    level: 3,
    question: "“第17章 集群”独立交接需要哪些材料？",
    answer:
      "需要版本目录、结构函数、槽位图、MOVED/ASK轨迹、在线迁槽演练、Gossip与故障转移记录、负载、故障、对账、停止、恢复与回退。",
    tags: ["Redis设计与实现", "Redis 3.0", "第17章 集群"],
  },
  {
    id: "rdi-18-pubsub-q1",
    chapter: "rdi-18-pubsub",
    level: 1,
    question: "为什么“第18章 发布与订阅”必须覆盖6个页面节点？",
    answer:
      "节点组成“追踪频道字典、模式链表、订阅状态和PUBLISH扇出，并明确Pub/Sub不持久化消息”的结构、函数、状态与证据链；缺项会让频道模式结构图、匹配与扇出实验、断线丢失验证和订阅清理无法复现。",
    tags: ["Redis设计与实现", "Redis 3.0", "第18章 发布与订阅"],
  },
  {
    id: "rdi-18-pubsub-q2",
    chapter: "rdi-18-pubsub",
    level: 1,
    question: "“第18章 发布与订阅”的最小不变量是什么？",
    answer:
      "订阅与退订更新双向关系，发送只到当前匹配客户端，断线消息不被错误承诺可恢复；需要结构、函数、负载、故障与对账共同证明。",
    tags: ["Redis设计与实现", "Redis 3.0", "第18章 发布与订阅"],
  },
  {
    id: "rdi-18-pubsub-q3",
    chapter: "rdi-18-pubsub",
    level: 2,
    question: "怎样为“第18章 发布与订阅”构造反例？",
    answer:
      "把“把Pub/Sub当可靠队列，或忽略模式匹配随订阅数增长的成本”写成假设，只改变一个条件再检查状态。",
    tags: ["Redis设计与实现", "Redis 3.0", "第18章 发布与订阅"],
  },
  {
    id: "rdi-18-pubsub-q4",
    chapter: "rdi-18-pubsub",
    level: 2,
    question: "“第18章 发布与订阅”为什么必须固定Redis 3.0？",
    answer:
      "版本固定结构和函数语义，后续版本只能作为“追踪频道字典、模式链表、订阅状态和PUBLISH扇出，并明确Pub/Sub不持久化消息”的差异材料。",
    tags: ["Redis设计与实现", "Redis 3.0", "第18章 发布与订阅"],
  },
  {
    id: "rdi-18-pubsub-q5",
    chapter: "rdi-18-pubsub",
    level: 3,
    question: "如何验证“第18章 发布与订阅”的性能与语义？",
    answer:
      "固定命令与数据，测分位延迟、内存、I/O和事件，并独立证明“订阅与退订更新双向关系，发送只到当前匹配客户端，断线消息不被错误承诺可恢复”。",
    tags: ["Redis设计与实现", "Redis 3.0", "第18章 发布与订阅"],
  },
  {
    id: "rdi-18-pubsub-q6",
    chapter: "rdi-18-pubsub",
    level: 3,
    question: "“第18章 发布与订阅”独立交接需要哪些材料？",
    answer:
      "需要版本目录、结构函数、频道模式结构图、匹配与扇出实验、断线丢失验证和订阅清理、负载、故障、对账、停止、恢复与回退。",
    tags: ["Redis设计与实现", "Redis 3.0", "第18章 发布与订阅"],
  },
  {
    id: "rdi-19-transaction-q1",
    chapter: "rdi-19-transaction",
    level: 1,
    question: "为什么“第19章 事务”必须覆盖5个页面节点？",
    answer:
      "节点组成“沿MULTI、命令入队、WATCH乐观锁、EXEC和DISCARD判断Redis事务的ACID边界”的结构、函数、状态与证据链；缺项会让事务状态机、WATCH竞态实验、错误矩阵和ACID边界表无法复现。",
    tags: ["Redis设计与实现", "Redis 3.0", "第19章 事务"],
  },
  {
    id: "rdi-19-transaction-q2",
    chapter: "rdi-19-transaction",
    level: 1,
    question: "“第19章 事务”的最小不变量是什么？",
    answer:
      "入队顺序确定，WATCH键变化使EXEC中止，执行期命令错误按Redis语义返回而非自动回滚；需要结构、函数、负载、故障与对账共同证明。",
    tags: ["Redis设计与实现", "Redis 3.0", "第19章 事务"],
  },
  {
    id: "rdi-19-transaction-q3",
    chapter: "rdi-19-transaction",
    level: 2,
    question: "怎样为“第19章 事务”构造反例？",
    answer:
      "把“把Redis事务等同关系数据库事务，假设运行时错误会回滚已执行命令”写成假设，只改变一个条件再检查状态。",
    tags: ["Redis设计与实现", "Redis 3.0", "第19章 事务"],
  },
  {
    id: "rdi-19-transaction-q4",
    chapter: "rdi-19-transaction",
    level: 2,
    question: "“第19章 事务”为什么必须固定Redis 3.0？",
    answer:
      "版本固定结构和函数语义，后续版本只能作为“沿MULTI、命令入队、WATCH乐观锁、EXEC和DISCARD判断Redis事务的ACID边界”的差异材料。",
    tags: ["Redis设计与实现", "Redis 3.0", "第19章 事务"],
  },
  {
    id: "rdi-19-transaction-q5",
    chapter: "rdi-19-transaction",
    level: 3,
    question: "如何验证“第19章 事务”的性能与语义？",
    answer:
      "固定命令与数据，测分位延迟、内存、I/O和事件，并独立证明“入队顺序确定，WATCH键变化使EXEC中止，执行期命令错误按Redis语义返回而非自动回滚”。",
    tags: ["Redis设计与实现", "Redis 3.0", "第19章 事务"],
  },
  {
    id: "rdi-19-transaction-q6",
    chapter: "rdi-19-transaction",
    level: 3,
    question: "“第19章 事务”独立交接需要哪些材料？",
    answer:
      "需要版本目录、结构函数、事务状态机、WATCH竞态实验、错误矩阵和ACID边界表、负载、故障、对账、停止、恢复与回退。",
    tags: ["Redis设计与实现", "Redis 3.0", "第19章 事务"],
  },
  {
    id: "rdi-20-lua-q1",
    chapter: "rdi-20-lua",
    level: 1,
    question: "为什么“第20章 Lua脚本”必须覆盖8个页面节点？",
    answer:
      "节点组成“检查Lua环境初始化、伪客户端、EVAL/EVALSHA、脚本缓存、管理命令与复制传播”的结构、函数、状态与证据链；缺项会让Lua环境图、脚本执行轨迹、缓存命中实验、超时与复制验证无法复现。",
    tags: ["Redis设计与实现", "Redis 3.0", "第20章 Lua脚本"],
  },
  {
    id: "rdi-20-lua-q2",
    chapter: "rdi-20-lua",
    level: 1,
    question: "“第20章 Lua脚本”的最小不变量是什么？",
    answer:
      "脚本在服务器中原子执行，Redis与Lua类型转换稳定，缓存摘要和复制传播对应同一脚本；需要结构、函数、负载、故障与对账共同证明。",
    tags: ["Redis设计与实现", "Redis 3.0", "第20章 Lua脚本"],
  },
  {
    id: "rdi-20-lua-q3",
    chapter: "rdi-20-lua",
    level: 2,
    question: "怎样为“第20章 Lua脚本”构造反例？",
    answer:
      "把“用长脚本追求原子性却阻塞事件循环，或只复制EVALSHA而副本没有脚本”写成假设，只改变一个条件再检查状态。",
    tags: ["Redis设计与实现", "Redis 3.0", "第20章 Lua脚本"],
  },
  {
    id: "rdi-20-lua-q4",
    chapter: "rdi-20-lua",
    level: 2,
    question: "“第20章 Lua脚本”为什么必须固定Redis 3.0？",
    answer:
      "版本固定结构和函数语义，后续版本只能作为“检查Lua环境初始化、伪客户端、EVAL/EVALSHA、脚本缓存、管理命令与复制传播”的差异材料。",
    tags: ["Redis设计与实现", "Redis 3.0", "第20章 Lua脚本"],
  },
  {
    id: "rdi-20-lua-q5",
    chapter: "rdi-20-lua",
    level: 3,
    question: "如何验证“第20章 Lua脚本”的性能与语义？",
    answer:
      "固定命令与数据，测分位延迟、内存、I/O和事件，并独立证明“脚本在服务器中原子执行，Redis与Lua类型转换稳定，缓存摘要和复制传播对应同一脚本”。",
    tags: ["Redis设计与实现", "Redis 3.0", "第20章 Lua脚本"],
  },
  {
    id: "rdi-20-lua-q6",
    chapter: "rdi-20-lua",
    level: 3,
    question: "“第20章 Lua脚本”独立交接需要哪些材料？",
    answer:
      "需要版本目录、结构函数、Lua环境图、脚本执行轨迹、缓存命中实验、超时与复制验证、负载、故障、对账、停止、恢复与回退。",
    tags: ["Redis设计与实现", "Redis 3.0", "第20章 Lua脚本"],
  },
  {
    id: "rdi-21-sort-q1",
    chapter: "rdi-21-sort",
    level: 1,
    question: "为什么“第21章 排序”必须覆盖10个页面节点？",
    answer:
      "节点组成“还原SORT对象数组、数值与字典序比较、BY外部键、LIMIT、GET、STORE和选项执行顺序”的结构、函数、状态与证据链；缺项会让SORT执行管线、选项组合矩阵、稳定性与复杂度测试无法复现。",
    tags: ["Redis设计与实现", "Redis 3.0", "第21章 排序"],
  },
  {
    id: "rdi-21-sort-q2",
    chapter: "rdi-21-sort",
    level: 1,
    question: "“第21章 排序”的最小不变量是什么？",
    answer:
      "输入元素、比较键、排序方向、分页与输出投影按固定顺序组合，缺失外部键语义一致；需要结构、函数、负载、故障与对账共同证明。",
    tags: ["Redis设计与实现", "Redis 3.0", "第21章 排序"],
  },
  {
    id: "rdi-21-sort-q3",
    chapter: "rdi-21-sort",
    level: 2,
    question: "怎样为“第21章 排序”构造反例？",
    answer:
      "把“把多个选项当任意顺序执行，或让BY/GET外部查找形成不可控N倍成本”写成假设，只改变一个条件再检查状态。",
    tags: ["Redis设计与实现", "Redis 3.0", "第21章 排序"],
  },
  {
    id: "rdi-21-sort-q4",
    chapter: "rdi-21-sort",
    level: 2,
    question: "“第21章 排序”为什么必须固定Redis 3.0？",
    answer:
      "版本固定结构和函数语义，后续版本只能作为“还原SORT对象数组、数值与字典序比较、BY外部键、LIMIT、GET、STORE和选项执行顺序”的差异材料。",
    tags: ["Redis设计与实现", "Redis 3.0", "第21章 排序"],
  },
  {
    id: "rdi-21-sort-q5",
    chapter: "rdi-21-sort",
    level: 3,
    question: "如何验证“第21章 排序”的性能与语义？",
    answer:
      "固定命令与数据，测分位延迟、内存、I/O和事件，并独立证明“输入元素、比较键、排序方向、分页与输出投影按固定顺序组合，缺失外部键语义一致”。",
    tags: ["Redis设计与实现", "Redis 3.0", "第21章 排序"],
  },
  {
    id: "rdi-21-sort-q6",
    chapter: "rdi-21-sort",
    level: 3,
    question: "“第21章 排序”独立交接需要哪些材料？",
    answer:
      "需要版本目录、结构函数、SORT执行管线、选项组合矩阵、稳定性与复杂度测试、负载、故障、对账、停止、恢复与回退。",
    tags: ["Redis设计与实现", "Redis 3.0", "第21章 排序"],
  },
  {
    id: "rdi-22-bit-array-q1",
    chapter: "rdi-22-bit-array",
    level: 1,
    question: "为什么“第22章 二进制位数组”必须覆盖7个页面节点？",
    answer:
      "节点组成“按SDS字节和大端位序解释GETBIT、SETBIT、查表与SWAR BITCOUNT以及BITOP”的结构、函数、状态与证据链；缺项会让位序图、偏移边界测试、BITCOUNT算法对照和BITOP样本无法复现。",
    tags: ["Redis设计与实现", "Redis 3.0", "第22章 二进制位数组"],
  },
  {
    id: "rdi-22-bit-array-q2",
    chapter: "rdi-22-bit-array",
    level: 1,
    question: "“第22章 二进制位数组”的最小不变量是什么？",
    answer:
      "偏移到字节与位的映射正确，扩展补零，计数和按位运算对任意长度输入一致；需要结构、函数、负载、故障与对账共同证明。",
    tags: ["Redis设计与实现", "Redis 3.0", "第22章 二进制位数组"],
  },
  {
    id: "rdi-22-bit-array-q3",
    chapter: "rdi-22-bit-array",
    level: 2,
    question: "怎样为“第22章 二进制位数组”构造反例？",
    answer:
      "把“混淆位序和字节序，或SETBIT扩展巨大偏移导致意外内存分配”写成假设，只改变一个条件再检查状态。",
    tags: ["Redis设计与实现", "Redis 3.0", "第22章 二进制位数组"],
  },
  {
    id: "rdi-22-bit-array-q4",
    chapter: "rdi-22-bit-array",
    level: 2,
    question: "“第22章 二进制位数组”为什么必须固定Redis 3.0？",
    answer:
      "版本固定结构和函数语义，后续版本只能作为“按SDS字节和大端位序解释GETBIT、SETBIT、查表与SWAR BITCOUNT以及BITOP”的差异材料。",
    tags: ["Redis设计与实现", "Redis 3.0", "第22章 二进制位数组"],
  },
  {
    id: "rdi-22-bit-array-q5",
    chapter: "rdi-22-bit-array",
    level: 3,
    question: "如何验证“第22章 二进制位数组”的性能与语义？",
    answer:
      "固定命令与数据，测分位延迟、内存、I/O和事件，并独立证明“偏移到字节与位的映射正确，扩展补零，计数和按位运算对任意长度输入一致”。",
    tags: ["Redis设计与实现", "Redis 3.0", "第22章 二进制位数组"],
  },
  {
    id: "rdi-22-bit-array-q6",
    chapter: "rdi-22-bit-array",
    level: 3,
    question: "“第22章 二进制位数组”独立交接需要哪些材料？",
    answer:
      "需要版本目录、结构函数、位序图、偏移边界测试、BITCOUNT算法对照和BITOP样本、负载、故障、对账、停止、恢复与回退。",
    tags: ["Redis设计与实现", "Redis 3.0", "第22章 二进制位数组"],
  },
  {
    id: "rdi-23-slow-log-q1",
    chapter: "rdi-23-slow-log",
    level: 1,
    question: "为什么“第23章 慢查询日志”必须覆盖4个页面节点？",
    answer:
      "节点组成“理解slowlog_entry保存内容、阈值与最大长度配置、查询删除命令和执行后记录时点”的结构、函数、状态与证据链；缺项会让慢日志结构图、阈值实验、截断与清理验证、延迟监控对照无法复现。",
    tags: ["Redis设计与实现", "Redis 3.0", "第23章 慢查询日志"],
  },
  {
    id: "rdi-23-slow-log-q2",
    chapter: "rdi-23-slow-log",
    level: 1,
    question: "“第23章 慢查询日志”的最小不变量是什么？",
    answer:
      "耗时口径排除网络I/O并按配置阈值记录，日志长度有界，ID与参数可追溯；需要结构、函数、负载、故障与对账共同证明。",
    tags: ["Redis设计与实现", "Redis 3.0", "第23章 慢查询日志"],
  },
  {
    id: "rdi-23-slow-log-q3",
    chapter: "rdi-23-slow-log",
    level: 2,
    question: "怎样为“第23章 慢查询日志”构造反例？",
    answer:
      "把“把慢日志耗时当客户端总延迟，或阈值与长度配置导致关键样本静默丢失”写成假设，只改变一个条件再检查状态。",
    tags: ["Redis设计与实现", "Redis 3.0", "第23章 慢查询日志"],
  },
  {
    id: "rdi-23-slow-log-q4",
    chapter: "rdi-23-slow-log",
    level: 2,
    question: "“第23章 慢查询日志”为什么必须固定Redis 3.0？",
    answer:
      "版本固定结构和函数语义，后续版本只能作为“理解slowlog_entry保存内容、阈值与最大长度配置、查询删除命令和执行后记录时点”的差异材料。",
    tags: ["Redis设计与实现", "Redis 3.0", "第23章 慢查询日志"],
  },
  {
    id: "rdi-23-slow-log-q5",
    chapter: "rdi-23-slow-log",
    level: 3,
    question: "如何验证“第23章 慢查询日志”的性能与语义？",
    answer:
      "固定命令与数据，测分位延迟、内存、I/O和事件，并独立证明“耗时口径排除网络I/O并按配置阈值记录，日志长度有界，ID与参数可追溯”。",
    tags: ["Redis设计与实现", "Redis 3.0", "第23章 慢查询日志"],
  },
  {
    id: "rdi-23-slow-log-q6",
    chapter: "rdi-23-slow-log",
    level: 3,
    question: "“第23章 慢查询日志”独立交接需要哪些材料？",
    answer:
      "需要版本目录、结构函数、慢日志结构图、阈值实验、截断与清理验证、延迟监控对照、负载、故障、对账、停止、恢复与回退。",
    tags: ["Redis设计与实现", "Redis 3.0", "第23章 慢查询日志"],
  },
  {
    id: "rdi-24-monitor-q1",
    chapter: "rdi-24-monitor",
    level: 1,
    question: "为什么“第24章 监视器”必须覆盖3个页面节点？",
    answer:
      "节点组成“追踪MONITOR客户端标志、监视器链表和命令传播，评估可见性、敏感信息与运行开销”的结构、函数、状态与证据链；缺项会让监视器状态图、命令格式样本、开销压测与敏感数据评审无法复现。",
    tags: ["Redis设计与实现", "Redis 3.0", "第24章 监视器"],
  },
  {
    id: "rdi-24-monitor-q2",
    chapter: "rdi-24-monitor",
    level: 1,
    question: "“第24章 监视器”的最小不变量是什么？",
    answer:
      "进入监视状态后收到规定命令信息，断开后清理关系，观测不会被误当低成本生产审计；需要结构、函数、负载、故障与对账共同证明。",
    tags: ["Redis设计与实现", "Redis 3.0", "第24章 监视器"],
  },
  {
    id: "rdi-24-monitor-q3",
    chapter: "rdi-24-monitor",
    level: 2,
    question: "怎样为“第24章 监视器”构造反例？",
    answer:
      "把“长期在高流量生产开启MONITOR，既增加开销又泄露命令参数”写成假设，只改变一个条件再检查状态。",
    tags: ["Redis设计与实现", "Redis 3.0", "第24章 监视器"],
  },
  {
    id: "rdi-24-monitor-q4",
    chapter: "rdi-24-monitor",
    level: 2,
    question: "“第24章 监视器”为什么必须固定Redis 3.0？",
    answer:
      "版本固定结构和函数语义，后续版本只能作为“追踪MONITOR客户端标志、监视器链表和命令传播，评估可见性、敏感信息与运行开销”的差异材料。",
    tags: ["Redis设计与实现", "Redis 3.0", "第24章 监视器"],
  },
  {
    id: "rdi-24-monitor-q5",
    chapter: "rdi-24-monitor",
    level: 3,
    question: "如何验证“第24章 监视器”的性能与语义？",
    answer:
      "固定命令与数据，测分位延迟、内存、I/O和事件，并独立证明“进入监视状态后收到规定命令信息，断开后清理关系，观测不会被误当低成本生产审计”。",
    tags: ["Redis设计与实现", "Redis 3.0", "第24章 监视器"],
  },
  {
    id: "rdi-24-monitor-q6",
    chapter: "rdi-24-monitor",
    level: 3,
    question: "“第24章 监视器”独立交接需要哪些材料？",
    answer:
      "需要版本目录、结构函数、监视器状态图、命令格式样本、开销压测与敏感数据评审、负载、故障、对账、停止、恢复与回退。",
    tags: ["Redis设计与实现", "Redis 3.0", "第24章 监视器"],
  },
  {
    id: "rdi-official-final-review-q1",
    chapter: "rdi-official-final-review",
    level: 1,
    question: "为什么“第2版全书总复习”必须覆盖24个页面节点？",
    answer:
      "节点组成“从一条命令反向串联客户端、事件、对象、结构、持久化、复制、集群与独立功能”的结构、函数、状态与证据链；缺项会让24章追踪矩阵、综合时序图、崩溃与切换演练、源码口试记录无法复现。",
    tags: ["Redis设计与实现", "Redis 3.0", "第2版全书总复习"],
  },
  {
    id: "rdi-official-final-review-q2",
    chapter: "rdi-official-final-review",
    level: 1,
    question: "“第2版全书总复习”的最小不变量是什么？",
    answer:
      "任何实现结论可追溯到Redis 3.0目录、结构字段、函数路径、运行指标和故障对账；需要结构、函数、负载、故障与对账共同证明。",
    tags: ["Redis设计与实现", "Redis 3.0", "第2版全书总复习"],
  },
  {
    id: "rdi-official-final-review-q3",
    chapter: "rdi-official-final-review",
    level: 2,
    question: "怎样为“第2版全书总复习”构造反例？",
    answer:
      "把“用平均分掩盖缺章，以命令成功替代数据正确，以新版本行为冒充Redis 3.0实现”写成假设，只改变一个条件再检查状态。",
    tags: ["Redis设计与实现", "Redis 3.0", "第2版全书总复习"],
  },
  {
    id: "rdi-official-final-review-q4",
    chapter: "rdi-official-final-review",
    level: 2,
    question: "“第2版全书总复习”为什么必须固定Redis 3.0？",
    answer:
      "版本固定结构和函数语义，后续版本只能作为“从一条命令反向串联客户端、事件、对象、结构、持久化、复制、集群与独立功能”的差异材料。",
    tags: ["Redis设计与实现", "Redis 3.0", "第2版全书总复习"],
  },
  {
    id: "rdi-official-final-review-q5",
    chapter: "rdi-official-final-review",
    level: 3,
    question: "如何验证“第2版全书总复习”的性能与语义？",
    answer:
      "固定命令与数据，测分位延迟、内存、I/O和事件，并独立证明“任何实现结论可追溯到Redis 3.0目录、结构字段、函数路径、运行指标和故障对账”。",
    tags: ["Redis设计与实现", "Redis 3.0", "第2版全书总复习"],
  },
  {
    id: "rdi-official-final-review-q6",
    chapter: "rdi-official-final-review",
    level: 3,
    question: "“第2版全书总复习”独立交接需要哪些材料？",
    answer:
      "需要版本目录、结构函数、24章追踪矩阵、综合时序图、崩溃与切换演练、源码口试记录、负载、故障、对账、停止、恢复与回退。",
    tags: ["Redis设计与实现", "Redis 3.0", "第2版全书总复习"],
  },
];
