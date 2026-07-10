import type { ReviewQuestion } from "./types";

export const hpmOsTuningQuestions: ReviewQuestion[] = [
  {
    id: "hpm-os-1",
    chapter: "hpm-os-tuning",
    level: 2,
    question: `如何用系统工具判断MySQL的瓶颈是CPU、IO还是内存？分别如何解决？`,
    answer: `用top/iostat/vmstat判断：①iowait高+CPU低→磁盘IO瓶颈，解决：换SSD/NVMe、加内存扩大缓冲池减少读盘、优化查询减少扫描量；②user%高+查询慢→CPU计算密集，解决：优化查询和索引减少排序/聚合计算、避免SELECT *；③load高但CPU低→IO等待，解决：换SSD、加内存；④内存swap活跃→缓冲池不足，解决：加物理内存、扩大innodb_buffer_pool_size、调低swappiness；⑤上下文切换高→线程过多，解决：用连接池/线程池限制连接数。原则是先定位瓶颈再针对性解决。`,
    tags: ["瓶颈定位", "CPU", "IO", "内存", "系统工具"],
  },
  {
    id: "hpm-os-2",
    chapter: "hpm-os-tuning",
    level: 2,
    question: `innodb_buffer_pool_size为什么是最重要的参数？如何监控和设置？`,
    answer: `重要性：缓冲池缓存数据和索引页，命中率直接决定性能——命中则免IO（内存访问比磁盘快约10万倍），未命中则读盘。绝大多数MySQL性能问题都可通过足够的缓冲池缓解。设置：物理内存的70-80%（留给OS和连接）。监控：用SHOW STATUS看Innodb_buffer_pool_read_requests（总读请求）和Innodb_buffer_pool_reads（物理磁盘读），命中率=1-reads/read_requests应大于99%。命中率低说明缓冲池不足，最直接的优化是加内存扩大缓冲池。`,
    tags: ["缓冲池", "buffer_pool", "命中率", "最重要的参数"],
  },
  {
    id: "hpm-os-3",
    chapter: "hpm-os-tuning",
    level: 3,
    question: `解释刷盘策略\"双1配置\"和\"性能优先\"配置，及各自适用场景。`,
    answer: `双1配置：innodb_flush_log_at_trx_commit=1（每次事务提交都把Redo log刷盘）+ sync_binlog=1（每次提交都刷binlog）。最安全，崩溃不丢已提交数据，但每次提交都刷盘性能最差。适用RPO=0的金融交易等不能丢数据的场景。性能优先配置：innodb_flush_log_at_trx_commit=2（每次提交写OS缓冲，每秒刷盘）+ sync_binlog=0（binlog交由OS刷）。性能好但崩溃可能丢失约1秒数据。适用能容忍少量数据丢失的一般业务。选择依据是RPO（可容忍丢失多少数据）：RPO=0用双1，RPO>0可用性能优先。`,
    tags: ["刷盘策略", "双1配置", "RPO", "安全与性能"],
  },
  {
    id: "hpm-os-4",
    chapter: "hpm-os-tuning",
    level: 4,
    question: `为什么推荐innodb_flush_method=O_DIRECT？默认方式有什么问题？`,
    answer: `推荐O_DIRECT的原因：避免\"双缓冲\"。默认fsync方式下，数据写入会先经过OS的页缓冲再刷到磁盘，而InnoDB自己也有缓冲池——两者缓存了同样的数据，浪费内存。更严重的是，OS缓冲的刷盘时机由OS决定，不可控，可能导致意外的IO尖峰。O_DIRECT绕过OS缓冲直接写磁盘，让InnoDB完全掌控刷盘时机（InnoDB的刷盘策略更智能，能结合Redo log和脏页情况优化），既节省内存又使IO更可控。故O_DIRECT是数据库生产环境的推荐配置。`,
    tags: ["O_DIRECT", "双缓冲", "刷盘", "fsync"],
  },
];
