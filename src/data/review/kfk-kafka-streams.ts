import type { ReviewQuestion } from "./types";

export const kfkKafkaStreamsQuestions: ReviewQuestion[] = [
  {
    id: "kfk-st-1",
    chapter: "kfk-kafka-streams",
    level: 1,
    question: `Kafka Streams是什么？它与传统流处理框架（如Spark Streaming/Flink）有什么区别？`,
    answer: `Kafka Streams是Kafka原生提供的轻量级流处理库（library而非框架），用Java/Scala编写流处理应用。与传统框架的区别：①部署模型——Streams是库不是集群，无需独立集群，应用就是一个普通Java进程，部署简单（jar+java -jar）；Spark/Flink需要独立集群（ResourceManager/TaskManager），部署运维复杂。②数据源——Streams原生读写Kafka Topic（输入输出都是Topic），零集成成本；Spark/Flink需额外Source/Sink连接器。③状态管理——Streams内置RocksDB状态存储，状态直接存在应用本地（本地磁盘），无需外部状态存储；Spark/Flink状态在TaskManager内存或RocksDB。④Exactly-Once——Streams通过Kafka事务原生支持端到端Exactly-Once；Spark/Flink需额外配置。⑤延迟——Streams是事件级低延迟（毫秒级）；Spark Streaming是微批（秒级）；Flink也是事件级。⑥编程模型——Streams提供DSL和Processor API两种接口，DSL高层声明式，Processor API底层灵活。Streams适合Kafka生态内的流处理，轻量无侵入；Flink功能更全面适合复杂场景。`,
    tags: ["Kafka Streams", "流处理", "轻量级", "对比"],
  },
  {
    id: "kfk-st-2",
    chapter: "kfk-kafka-streams",
    level: 2,
    question: `Kafka Streams中的KStream和KTable有什么区别？它们各自适用于什么场景？`,
    answer: `KStream和KTable是Streams的两种核心抽象：①KStream（流）——代表无界的事件记录流，每条记录是一个独立事件（如用户点击、订单创建）。KStream中的记录是「插入」语义——新记录追加到流中，即使key相同也互不影响（都保留）。适合事件日志（每条消息独立有价值），如点击流、日志、传感器数据。②KTable（表）——代表有界的状态快照流（类似数据库表），按key聚合最新value。KTable中的记录是「更新」语义——同一key的新记录覆盖旧记录，旧value被替换。适合状态变更（只关心最新值），如用户信息变更、配置更新、计数聚合。关系：KStream→KTable：通过groupByKey().reduce()/aggregate()聚合将Stream转为Table（物化视图）；KTable→KStream：toStream()将Table转为Stream（发出变更事件）。对偶关系：KTable是KStream的物化视图（changelog stream的聚合状态），KStream是KTable的变更日志（changelog stream）。windowed KTable支持窗口聚合（如每5分钟按key求和）。`,
    tags: ["KStream", "KTable", "流表二象性", "物化视图"],
  },
  {
    id: "kfk-st-3",
    chapter: "kfk-kafka-streams",
    level: 2,
    question: `Kafka Streams的状态存储（State Store）有哪几种？如何实现故障恢复？`,
    answer: `状态存储类型：①KeyValueStore——键值存储，支持get/put/delete/range查询；②WindowStore——窗口存储，按键+时间窗口存储，支持窗口范围查询；③SessionStore——会话存储，按键+会话窗口存储，支持会话合并。存储后端：默认使用RocksDB（本地磁盘嵌入式KV数据库），内存大时可用InMemoryKeyValueStore。Changelog Topic（变更日志Topic）机制：每个有状态的操作（如aggregate/reduce/join）自动创建一个changelog Topic，记录状态的每次变更（类似数据库的binlog），用于故障恢复。故障恢复流程：①Streams应用实例崩溃→其负责的分区被重新分配给其他存活实例（类似消费者组再均衡）；②新实例创建本地State Store→从changelog Topic重放（restore）数据重建状态；③重建完成后开始处理新消息。优化：①standby replica——在其他实例上维护State Store的备副本（standby task），故障时直接用备副本减少恢复时间；②changelog Topic配置保留策略——retention足够长保证恢复。changelog Topic本质是将State Store的每次put/delete记录为Kafka消息，利用Kafka的持久化和重放能力实现状态容错。`,
    tags: ["状态存储", "RocksDB", "Changelog", "故障恢复"],
  },
  {
    id: "kfk-st-4",
    chapter: "kfk-kafka-streams",
    level: 3,
    question: `Kafka Streams的窗口（Windowing）机制有哪几种？各自适用于什么时间语义的场景？`,
    answer: `三种窗口类型：①Tumbling Window（翻滚窗口）——固定大小、不重叠的窗口，如每5分钟一个窗口。每个事件只属于一个窗口。适合固定周期统计（如每5分钟PV）。通过TimeWindows.of(Duration.ofMinutes(5))创建。②Hopping Window（跳跃窗口）——固定大小、可重叠的窗口，有advance步长。如窗口大小5分钟、步长1分钟，则每分钟产生一个5分钟窗口，事件可能属于多个窗口。适合移动平均/平滑统计。通过TimeWindows.of(Duration.ofMinutes(5)).advanceBy(Duration.ofMinutes(1))创建。③Session Window（会话窗口）——基于事件活动间隔的动态窗口，无固定大小。同一key的事件如果间隔超过inactivity gap则属于不同会话。适合用户会话分析（如用户连续操作合并为一个会话）。通过SessionWindows.with(Duration.ofMinutes(30))创建。时间语义：①Event Time（事件时间）——消息携带的时间戳（CreateTime/LogAppendTime），反映事件真实发生时间；②Processing Time（处理时间）——Streams处理消息时的墙钟时间，简单但不稳定（受处理速度影响）。窗口默认用Event Time（从消息的timestamp字段获取），更准确但需处理乱序（ watermark机制或接受窗口边界延迟）。生产环境推荐Event Time+合理window大小。`,
    tags: ["窗口", "Tumbling", "Hopping", "Session", "时间语义"],
  },
];
