import type { ReviewQuestion } from "./types";

export const rmqPerformanceTuningQuestions: ReviewQuestion[] = [
  {
    id: "rmq-pf-1",
    chapter: "rmq-performance-tuning",
    level: 1,
    question: "Erlang VM的关键调优参数有哪些？如何配置？",
    answer: "关键参数：①+S N——调度器线程数，通常设为CPU核心数，充分利用多核并行能力。②+A N——异步IO线程池大小，默认通常不够，推荐96~128（高并发场景），影响TCP读写性能。IO线程负责网络数据的读写，线程数不足会导致网络I/O成为瓶颈。③+sbwt none +sbwtdcpu none +sbwtdio none——减少调度器忙等待（busy wait），降低CPU空转。默认调度器在空闲时会忙等待以快速响应新任务，但会浪费CPU。配置方式：通过RABBITMQ_SERVER_ADDITIONAL_ERL_ARGS环境变量设置。推荐配置：RABBITMQ_SERVER_ADDITIONAL_ERL_ARGS=\"+A 128 +sbwt none +sbwtdcpu none +sbwtdio none\"。此外还需调大文件描述符：ulimit -n 65536（每个TCP连接消耗一个fd），rabbitmq.conf中max_open_files=65536。调优步骤：先监控当前瓶颈（CPU/内存/网络/磁盘I/O），再有针对性地调整VM参数，逐步测试验证效果。",
    tags: ["Erlang VM", "调优", "调度器", "IO线程", "文件描述符"],
  },
  {
    id: "rmq-pf-2",
    chapter: "rmq-performance-tuning",
    level: 2,
    question: "内存水位和磁盘告警的机制是什么？触发流控后会怎样？",
    answer: "内存水位（vm_memory_high_watermark）：默认0.4（Broker内存的40%），建议不超过0.6。当内存使用达到阈值时触发流控。paging_ratio=0.5表示内存达水位的50%（即总内存的20%）时开始将消息page out到磁盘，提前将消息从内存转移到磁盘，避免内存满后突然大量写磁盘造成性能抖动。磁盘告警（disk_free_limit）：默认2GB或RAM*0.5，磁盘剩余低于阈值时触发流控。集群中任一节点磁盘不足都会触发全集群流控（因为消息可能在节点间复制）。触发流控后的行为：①生产者Connection被block——Broker向生产者发送connection.block，阻止消息写入，生产者被限流；②消费者不受影响——消费者可以继续消费消息（消费消息不增加内存/磁盘压力，反而释放资源）；③资源恢复后自动unblock——内存降到阈值以下或磁盘空间恢复后，Broker发送connection.unblock恢复生产者写入。流控是RabbitMQ的自我保护机制，防止内存溢出或磁盘满导致Broker崩溃。",
    tags: ["内存水位", "vm_memory_high_watermark", "磁盘告警", "流控", "flow control"],
  },
  {
    id: "rmq-pf-3",
    chapter: "rmq-performance-tuning",
    level: 2,
    question: "如何优化生产者和消费者的性能？请描述完整的优化策略。",
    answer: "生产者优化策略：①连接池复用——维护2~5个Connection，每个Connection上创建多个Channel供线程使用，避免频繁创建/销毁TCP连接。②异步Confirm替代事务——Confirm异步模式吞吐量是事务模式的250倍，不要用txSelect/txCommit。③批量发送——合并小消息减少网络RTT，适合日志类、指标类场景。④持久化权衡——delivery_mode=2持久化安全但慢，非关键业务可用非持久化提升性能。⑤避免大消息——单消息建议<128KB，大消息拆分或用外部存储+消息引用。消费者优化策略：①prefetch_count调优——处理快（<1ms）设50~100，处理慢（>100ms）设1~10，消息体大（>10KB）减小prefetch防内存溢出。②多线程消费——多个Channel并行消费不同消息提高吞吐，注意同Queue消息可能乱序（需要严格顺序则单Channel+prefetch=1）。③批量Ack——multiple=true批量确认多条消息，减少Ack网络往返。④消费幂等——减少重复处理开销，用Redis/数据库去重表。核心原则：生产者减少网络往返+连接复用，消费者合理预取+并行处理+批量确认。",
    tags: ["生产者优化", "消费者优化", "连接池", "prefetch", "批量Ack"],
  },
  {
    id: "rmq-pf-4",
    chapter: "rmq-performance-tuning",
    level: 3,
    question: "Lazy Queue是什么？在什么场景下使用？它有什么优缺点？",
    answer: "Lazy Queue（惰性队列）是RabbitMQ的一种队列模式，消息直接写入磁盘，内存只存消息索引。声明方式：queue.declare时设置x-queue-mode=\"lazy\"。优点：①内存占用极低——只存索引不存消息体，可支持百万级消息积压不OOM（Out of Memory）。普通队列消息存储在内存中，大量积压会导致内存溢出；Lazy Queue将消息体直接写入磁盘，内存只保存少量索引信息。②适合消费速度远低于生产速度的场景——当生产者速度远大于消费者时，消息会大量积压，普通队列内存溢出风险高，Lazy Queue可以将积压消息安全存储在磁盘上。缺点：①消费延迟略高——消费时需要从磁盘读取消息，比从内存读取慢。②磁盘I/O开销——所有消息都写磁盘，增加磁盘I/O压力。③不适合低延迟场景——需要毫秒级延迟的场景不适合用Lazy Queue。适用场景：①日志队列——大量日志消息积压，不需要实时消费。②消息削峰——生产远快于消费时，用Lazy Queue安全吸收峰值。③历史数据暂存——需要长时间保存但消费频率低的场景。与普通队列对比：普通队列消息在内存中（快但内存有限），Lazy Queue消息在磁盘上（慢但容量大）。",
    tags: ["Lazy Queue", "惰性队列", "消息积压", "磁盘存储", "内存优化"],
  },
];
