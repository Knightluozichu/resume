import type { ReviewQuestion } from "./types";

export const rmqMonitoringOpsQuestions: ReviewQuestion[] = [
  {
    id: "rmq-mo-1",
    chapter: "rmq-monitoring-ops",
    level: 1,
    question: "如何使用Management Plugin的HTTP API监控RabbitMQ？请列举常用API及其用途。",
    answer: "Management Plugin通过HTTP API（端口15672）提供RESTful接口监控RabbitMQ。启用方式：rabbitmq-plugins enable rabbitmq_management。常用API及用途：①GET /api/overview——集群总览，包括RabbitMQ版本、消息总数、连接数、Channel数、队列数、Exchange数、消息速率统计。②GET /api/queues——队列列表与状态，包括每个队列的消息数、消费者数、未确认消息数、持久化状态、内存占用。支持按VHost过滤：/api/queues/{vhost}。③GET /api/connections——连接列表，包括客户端IP、连接状态、使用的Channel数。④GET /api/channels——Channel列表，包括未确认消息数、prefetch_count、消费速率。⑤GET /api/nodes——节点健康状态，包括内存使用、磁盘剩余、运行队列、Erlang进程数、是否正常运行。⑥GET /api/exchanges——Exchange列表及类型。⑦GET /api/definitions——定义导出（JSON），包含Exchange/Queue/Binding/用户/权限。⑧GET /api/aliveness-test/{vhost}——存活检测，返回status=ok表示Broker正常。使用方式：curl -u admin:password http://localhost:15672/api/overview。生产环境通常配合Prometheus+Grafana通过rabbitmq_exporter采集指标。",
    tags: ["Management Plugin", "HTTP API", "监控", "rabbitmqctl"],
  },
  {
    id: "rmq-mo-2",
    chapter: "rmq-monitoring-ops",
    level: 2,
    question: "生产环境需要监控哪些核心指标？告警阈值如何设置？",
    answer: "核心监控指标分四类：①队列级——queue_depth（队列积压消息数），P1告警>10000，P0紧急>100000；publish_rate/deliver_rate（生产/消费速率），消费速率=0且队列积压增长表示消费者离线；unacked_count（未确认消息数），持续增长表示消费者处理卡住。②节点级——mem_used（内存使用），P1告警>80% of vm_memory_high_watermark；disk_free（磁盘剩余），P1<5GB，P0<1GB；fd_used（文件描述符使用），P2>80% of max_open_files；run_queue（Erlang运行队列），P2>10表示CPU过载。③集群级——node_status（节点在线状态），任一节点down为P0紧急；partition（网络分区），出现partition为P0紧急。④连接级——connections（连接总数），突增/骤降为P2异常。告警分级：P0紧急（立即响应<5分钟）——节点宕机、网络分区、磁盘满、积压>10万；P1严重（15分钟内响应）——内存>80%、积压>1万、消费速率=0、连接异常；P2警告（1小时内响应）——积压持续增长、fd使用>80%、磁盘<10GB。监控工具：Prometheus+Grafana或Datadog。",
    tags: ["监控指标", "告警阈值", "queue_depth", "node_status", "partition"],
  },
  {
    id: "rmq-mo-3",
    chapter: "rmq-monitoring-ops",
    level: 2,
    question: "如何配置RabbitMQ的TLS安全通信和用户权限管理？",
    answer: "TLS安全配置步骤：①生成证书——使用OpenSSL生成CA证书（ca.key + ca.crt）、服务器证书（server.key + server.csr + server.crt），客户端证书同理。②配置rabbitmq.conf——设置listeners.ssl.default=5671（TLS端口），ssl_options.cacertfile指定CA证书路径，ssl_options.certfile指定服务器证书路径，ssl_options.keyfile指定服务器密钥路径。③双向认证——ssl_options.verify=verify_peer验证客户端证书，ssl_options.fail_if_no_peer_cert=true拒绝无证书的连接。④客户端配置——客户端连接时指定CA证书和客户端证书/密钥。用户权限管理：①创建用户——rabbitmqctl add_user admin password。②设置角色——rabbitmqctl set_user_tags admin administrator（administrator/management/policymaker/monitoring四种角色）。③VHost隔离——rabbitmqctl add_vhost production创建独立VHost。④设置权限——rabbitmqctl set_permissions -p production app-user configure write read，三个正则分别控制：configure（允许声明/删除Exchange/Queue/Binding的正则）、write（允许发消息到Exchange的正则）、read（允许从Queue消费的正则）。生产环境必须：启用TLS、禁用guest用户、按业务线隔离VHost、最小权限原则分配权限。",
    tags: ["TLS", "SSL", "用户权限", "VHost", "安全配置"],
  },
  {
    id: "rmq-mo-4",
    chapter: "rmq-monitoring-ops",
    level: 3,
    question: "RabbitMQ的备份与恢复策略是什么？定义导出和消息备份有什么区别？",
    answer: "备份与恢复分两部分：①定义导出/导入——rabbitmqctl export_definitions definitions.json导出Exchange/Queue/Binding/用户/权限等元数据定义到JSON文件。恢复时rabbitmqctl import_definitions definitions.json导入。也可通过HTTP API：GET /api/definitions导出，POST /api/definitions导入。定义导出只包含元数据（资源定义），不包含消息数据。建议定期导出（如每天），配置变更后立即导出。②消息备份——三种方式：a) Lazy Queue + 磁盘快照——Lazy Queue消息直接写磁盘，定期对磁盘做快照备份。b) Shovel同步——实时将消息从主集群Shovel搬运到灾备集群，保持热备份。c) 应用层重放——生产者同时写消息日志（如Kafka），恢复时从日志重放消息到RabbitMQ。灾备恢复流程：①导入definitions.json恢复Exchange/Queue/Binding定义和用户权限。②启动消费者准备消费。③如果有Shovel备份，从灾备集群拉取消息恢复。④验证消息完整性和业务连续性。关键区别：定义导出是元数据备份（恢复资源定义，不恢复消息），消息备份是数据备份（恢复队列中的消息）。生产环境两者都需要：定期定义导出+消息Shovel同步或磁盘快照。",
    tags: ["备份恢复", "定义导出", "消息备份", "Shovel", "definitions"],
  },
];
