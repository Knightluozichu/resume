import type { ReviewQuestion } from "../review-questions";

export const isnOfficialQuestions: ReviewQuestion[] = [
  {
    id: "isn-official-q1",
    chapter: "isn-official-learning-map",
    level: 1,
    question: "“2015年首版权威学习地图”的设计主链和正式节点分母是什么？",
    answer:
      "主链是把第0章和5个设计章、171个正式目录节点还原为从需求到运行的服务器端网络基础设计闭环；本页完整覆盖6个目录或复习节点，全部固定2015年首版。",
    tags: ["2015年首版权威学习地图", "基础设计"],
  },
  {
    id: "isn-official-q2",
    chapter: "isn-official-learning-map",
    level: 1,
    question: "“2015年首版权威学习地图”的最小设计不变量是什么？",
    answer:
      "任一设计决定都能回溯到需求、OSI责任层、容量上限、冗余路径、管理证据和恢复步骤",
    tags: ["2015年首版权威学习地图", "物理设计"],
  },
  {
    id: "isn-official-q3",
    chapter: "isn-official-learning-map",
    level: 2,
    question: "怎样为“2015年首版权威学习地图”构造单变量故障实验？",
    answer:
      "固定需求和正常业务流，只改变一条链路、一台设备、一个表项或一个管理依赖；重点反证：把本书改写成Nginx、CDN、微服务和Service Mesh专题，会遗漏线缆、机架、VLAN、路由、NAT、STP、FHRP及管理设计这些原书主干。",
    tags: ["2015年首版权威学习地图", "逻辑设计"],
  },
  {
    id: "isn-official-q4",
    chapter: "isn-official-learning-map",
    level: 2,
    question: "为什么“2015年首版权威学习地图”不能只靠拓扑图或ping验收？",
    answer:
      "拓扑和ping只是结果切片，不能证明正反向应用流、容量、状态同步、告警和恢复；必须保存接口、协议表项、业务结果与单故障证据。",
    tags: ["2015年首版权威学习地图", "高可用性"],
  },
  {
    id: "isn-official-q5",
    chapter: "isn-official-learning-map",
    level: 3,
    question: "如何验证“2015年首版权威学习地图”没有混入后续版本？",
    answer:
      "核对图灵官方2015年首版元数据、CIP和试读目录；排除2024年第2版、云原生网络、Service Mesh和现代API网关，后续差异只能独立标注。",
    tags: ["2015年首版权威学习地图", "版次门"],
  },
  {
    id: "isn-official-q6",
    chapter: "isn-official-learning-map",
    level: 3,
    question: "“2015年首版权威学习地图”独立交接必须包含什么？",
    answer:
      "需要需求追溯、拓扑、端口/VLAN/IP/路由/NAT/策略、管理设计、容量、单故障、监控日志、恢复、偏差、责任人与复核人。",
    tags: ["2015年首版权威学习地图", "管理设计"],
  },
  {
    id: "isn-official-q7",
    chapter: "isn-00-book-usage",
    level: 1,
    question: "“第0章 本书的用法”的设计主链和正式节点分母是什么？",
    answer:
      "主链是掌握网络架构六阶段，并把基础设计拆成物理、逻辑、安全与负载均衡、高可用和管理五类交付物；本页完整覆盖14个目录或复习节点，全部固定2015年首版。",
    tags: ["第0章 本书的用法", "需求定义"],
  },
  {
    id: "isn-official-q8",
    chapter: "isn-00-book-usage",
    level: 1,
    question: "“第0章 本书的用法”的最小设计不变量是什么？",
    answer:
      "每个基础设计决定都能找到需求来源、详细设计承接项、测试方法和运行责任人",
    tags: ["第0章 本书的用法", "基础设计"],
  },
  {
    id: "isn-official-q9",
    chapter: "isn-00-book-usage",
    level: 2,
    question: "怎样为“第0章 本书的用法”构造单变量故障实验？",
    answer:
      "固定需求和正常业务流，只改变一条链路、一台设备、一个表项或一个管理依赖；重点反证：直接采购设备或复制既有配置再补文档，会让容量、通信、安全与恢复假设无法验证。",
    tags: ["第0章 本书的用法", "详细设计"],
  },
  {
    id: "isn-official-q10",
    chapter: "isn-00-book-usage",
    level: 2,
    question: "为什么“第0章 本书的用法”不能只靠拓扑图或ping验收？",
    answer:
      "拓扑和ping只是结果切片，不能证明正反向应用流、容量、状态同步、告警和恢复；必须保存接口、协议表项、业务结果与单故障证据。",
    tags: ["第0章 本书的用法", "测试"],
  },
  {
    id: "isn-official-q11",
    chapter: "isn-00-book-usage",
    level: 3,
    question: "如何验证“第0章 本书的用法”没有混入后续版本？",
    answer:
      "核对图灵官方2015年首版元数据、CIP和试读目录；排除2024年第2版、云原生网络、Service Mesh和现代API网关，后续差异只能独立标注。",
    tags: ["第0章 本书的用法", "版次门"],
  },
  {
    id: "isn-official-q12",
    chapter: "isn-00-book-usage",
    level: 3,
    question: "“第0章 本书的用法”独立交接必须包含什么？",
    answer:
      "需要需求追溯、拓扑、端口/VLAN/IP/路由/NAT/策略、运行、容量、单故障、监控日志、恢复、偏差、责任人与复核人。",
    tags: ["第0章 本书的用法", "运行"],
  },
  {
    id: "isn-official-q13",
    chapter: "isn-01-physical-design",
    level: 1,
    question: "“第1章 物理设计”的设计主链和正式节点分母是什么？",
    answer:
      "主链是从物理层规格、串联/单路并联拓扑、设备容量、OS、线缆、端口、机架、电源和承重完成可施工设计；本页完整覆盖27个目录或复习节点，全部固定2015年首版。",
    tags: ["第1章 物理设计", "双绞线电缆"],
  },
  {
    id: "isn-official-q14",
    chapter: "isn-01-physical-design",
    level: 1,
    question: "“第1章 物理设计”的最小设计不变量是什么？",
    answer:
      "端到端链路的介质、速率、双工、距离、连接器、端口、供电、散热和承重均在规格范围内且留有容量余量",
    tags: ["第1章 物理设计", "光纤光缆"],
  },
  {
    id: "isn-official-q15",
    chapter: "isn-01-physical-design",
    level: 2,
    question: "怎样为“第1章 物理设计”构造单变量故障实验？",
    answer:
      "固定需求和正常业务流，只改变一条链路、一台设备、一个表项或一个管理依赖；重点反证：只比较设备标称吞吐或只画逻辑拓扑，会在连接峰值、线缆距离、端口模式、气流、电源或机架承重处失败。",
    tags: ["第1章 物理设计", "吞吐率"],
  },
  {
    id: "isn-official-q16",
    chapter: "isn-01-physical-design",
    level: 2,
    question: "为什么“第1章 物理设计”不能只靠拓扑图或ping验收？",
    answer:
      "拓扑和ping只是结果切片，不能证明正反向应用流、容量、状态同步、告警和恢复；必须保存接口、协议表项、业务结果与单故障证据。",
    tags: ["第1章 物理设计", "并发连接数"],
  },
  {
    id: "isn-official-q17",
    chapter: "isn-01-physical-design",
    level: 3,
    question: "如何验证“第1章 物理设计”没有混入后续版本？",
    answer:
      "核对图灵官方2015年首版元数据、CIP和试读目录；排除2024年第2版、云原生网络、Service Mesh和现代API网关，后续差异只能独立标注。",
    tags: ["第1章 物理设计", "版次门"],
  },
  {
    id: "isn-official-q18",
    chapter: "isn-01-physical-design",
    level: 3,
    question: "“第1章 物理设计”独立交接必须包含什么？",
    answer:
      "需要需求追溯、拓扑、端口/VLAN/IP/路由/NAT/策略、单路并联式结构、容量、单故障、监控日志、恢复、偏差、责任人与复核人。",
    tags: ["第1章 物理设计", "单路并联式结构"],
  },
  {
    id: "isn-official-q19",
    chapter: "isn-02-logical-design",
    level: 1,
    question: "“第2章 逻辑设计”的设计主链和正式节点分母是什么？",
    answer:
      "主链是贯通以太网成帧、MAC交换、VLAN、ARP、IPv4、路由、NAT、DHCP、ICMP并形成可汇总的VLAN与地址设计；本页完整覆盖45个目录或复习节点，全部固定2015年首版。",
    tags: ["第2章 逻辑设计", "VLAN"],
  },
  {
    id: "isn-official-q20",
    chapter: "isn-02-logical-design",
    level: 1,
    question: "“第2章 逻辑设计”的最小设计不变量是什么？",
    answer:
      "每个广播域、IP网段、默认网关、路由与NAT方向都有唯一责任，正反向通信流均能由表项和报文证据解释",
    tags: ["第2章 逻辑设计", "ARP"],
  },
  {
    id: "isn-official-q21",
    chapter: "isn-02-logical-design",
    level: 2,
    question: "怎样为“第2章 逻辑设计”构造单变量故障实验？",
    answer:
      "固定需求和正常业务流，只改变一条链路、一台设备、一个表项或一个管理依赖；重点反证：把VLAN、IP网段和安全区随意混用，或只验证去程不验证回程，会产生广播泄漏、地址冲突、非对称路由和NAT故障。",
    tags: ["第2章 逻辑设计", "路由表"],
  },
  {
    id: "isn-official-q22",
    chapter: "isn-02-logical-design",
    level: 2,
    question: "为什么“第2章 逻辑设计”不能只靠拓扑图或ping验收？",
    answer:
      "拓扑和ping只是结果切片，不能证明正反向应用流、容量、状态同步、告警和恢复；必须保存接口、协议表项、业务结果与单故障证据。",
    tags: ["第2章 逻辑设计", "NAT"],
  },
  {
    id: "isn-official-q23",
    chapter: "isn-02-logical-design",
    level: 3,
    question: "如何验证“第2章 逻辑设计”没有混入后续版本？",
    answer:
      "核对图灵官方2015年首版元数据、CIP和试读目录；排除2024年第2版、云原生网络、Service Mesh和现代API网关，后续差异只能独立标注。",
    tags: ["第2章 逻辑设计", "版次门"],
  },
  {
    id: "isn-official-q24",
    chapter: "isn-02-logical-design",
    level: 3,
    question: "“第2章 逻辑设计”独立交接必须包含什么？",
    answer:
      "需要需求追溯、拓扑、端口/VLAN/IP/路由/NAT/策略、DHCP、容量、单故障、监控日志、恢复、偏差、责任人与复核人。",
    tags: ["第2章 逻辑设计", "DHCP"],
  },
  {
    id: "isn-official-q25",
    chapter: "isn-03-security-load-balancing",
    level: 1,
    question:
      "“第3章 数据安全设计和负载均衡设计”的设计主链和正式节点分母是什么？",
    answer:
      "主链是从TCP/UDP与端口进入防火墙、目的NAT和健康检查，再用HTTP、SSL、FTP、DNS理解应用通信并完成纵深防御与负载均衡设计；本页完整覆盖39个目录或复习节点，全部固定2015年首版。",
    tags: ["第3章 数据安全设计和负载均衡设计", "五元组"],
  },
  {
    id: "isn-official-q26",
    chapter: "isn-03-security-load-balancing",
    level: 1,
    question: "“第3章 数据安全设计和负载均衡设计”的最小设计不变量是什么？",
    answer:
      "每条允许流和负载均衡虚拟服务都写明五元组、连接状态、地址转换、应用协议、健康判据、返回路径与最小权限",
    tags: ["第3章 数据安全设计和负载均衡设计", "状态检测"],
  },
  {
    id: "isn-official-q27",
    chapter: "isn-03-security-load-balancing",
    level: 2,
    question: "怎样为“第3章 数据安全设计和负载均衡设计”构造单变量故障实验？",
    answer:
      "固定需求和正常业务流，只改变一条链路、一台设备、一个表项或一个管理依赖；重点反证：只开一个宽泛端口或只看负载均衡VIP可达，会遗漏动态端口、SSL处理、DNS TCP/UDP差异、健康检查与回程NAT状态。",
    tags: ["第3章 数据安全设计和负载均衡设计", "目的NAT"],
  },
  {
    id: "isn-official-q28",
    chapter: "isn-03-security-load-balancing",
    level: 2,
    question:
      "为什么“第3章 数据安全设计和负载均衡设计”不能只靠拓扑图或ping验收？",
    answer:
      "拓扑和ping只是结果切片，不能证明正反向应用流、容量、状态同步、告警和恢复；必须保存接口、协议表项、业务结果与单故障证据。",
    tags: ["第3章 数据安全设计和负载均衡设计", "健康检查"],
  },
  {
    id: "isn-official-q29",
    chapter: "isn-03-security-load-balancing",
    level: 3,
    question: "如何验证“第3章 数据安全设计和负载均衡设计”没有混入后续版本？",
    answer:
      "核对图灵官方2015年首版元数据、CIP和试读目录；排除2024年第2版、云原生网络、Service Mesh和现代API网关，后续差异只能独立标注。",
    tags: ["第3章 数据安全设计和负载均衡设计", "版次门"],
  },
  {
    id: "isn-official-q30",
    chapter: "isn-03-security-load-balancing",
    level: 3,
    question: "“第3章 数据安全设计和负载均衡设计”独立交接必须包含什么？",
    answer:
      "需要需求追溯、拓扑、端口/VLAN/IP/路由/NAT/策略、纵深防御、容量、单故障、监控日志、恢复、偏差、责任人与复核人。",
    tags: ["第3章 数据安全设计和负载均衡设计", "纵深防御"],
  },
  {
    id: "isn-official-q31",
    chapter: "isn-04-high-availability",
    level: 1,
    question: "“第4章 高可用性设计”的设计主链和正式节点分母是什么？",
    answer:
      "主链是按物理、数据链路、网络、传输到应用层配置链路聚合、网卡绑定、设备虚拟化、STP、FHRP及防火墙/负载均衡冗余并理清通信流；本页完整覆盖24个目录或复习节点，全部固定2015年首版。",
    tags: ["第4章 高可用性设计", "链路聚合"],
  },
  {
    id: "isn-official-q32",
    chapter: "isn-04-high-availability",
    level: 1,
    question: "“第4章 高可用性设计”的最小设计不变量是什么？",
    answer:
      "任一链路或单台设备故障后，剩余路径无环、状态一致、容量足够，正反向流量按设计恢复且管理面能观察到切换",
    tags: ["第4章 高可用性设计", "STP"],
  },
  {
    id: "isn-official-q33",
    chapter: "isn-04-high-availability",
    level: 2,
    question: "怎样为“第4章 高可用性设计”构造单变量故障实验？",
    answer:
      "固定需求和正常业务流，只改变一条链路、一台设备、一个表项或一个管理依赖；重点反证：设备成双不等于高可用；若忽略STP阻塞、FHRP网关、状态同步、回程路径和故障后容量，切换会形成环路、黑洞或连接中断。",
    tags: ["第4章 高可用性设计", "BPDU"],
  },
  {
    id: "isn-official-q34",
    chapter: "isn-04-high-availability",
    level: 2,
    question: "为什么“第4章 高可用性设计”不能只靠拓扑图或ping验收？",
    answer:
      "拓扑和ping只是结果切片，不能证明正反向应用流、容量、状态同步、告警和恢复；必须保存接口、协议表项、业务结果与单故障证据。",
    tags: ["第4章 高可用性设计", "FHRP"],
  },
  {
    id: "isn-official-q35",
    chapter: "isn-04-high-availability",
    level: 3,
    question: "如何验证“第4章 高可用性设计”没有混入后续版本？",
    answer:
      "核对图灵官方2015年首版元数据、CIP和试读目录；排除2024年第2版、云原生网络、Service Mesh和现代API网关，后续差异只能独立标注。",
    tags: ["第4章 高可用性设计", "版次门"],
  },
  {
    id: "isn-official-q36",
    chapter: "isn-04-high-availability",
    level: 3,
    question: "“第4章 高可用性设计”独立交接必须包含什么？",
    answer:
      "需要需求追溯、拓扑、端口/VLAN/IP/路由/NAT/策略、状态同步、容量、单故障、监控日志、恢复、偏差、责任人与复核人。",
    tags: ["第4章 高可用性设计", "状态同步"],
  },
  {
    id: "isn-official-q37",
    chapter: "isn-05-management-design",
    level: 1,
    question: "“第5章 管理设计”的设计主链和正式节点分母是什么？",
    answer:
      "主链是用NTP、SNMP、Syslog、CDP/LLDP、主机名、标签、密码和配置备份/恢复把网络变成可观察、可识别、可恢复的系统；本页完整覆盖22个目录或复习节点，全部固定2015年首版。",
    tags: ["第5章 管理设计", "NTP"],
  },
  {
    id: "isn-official-q38",
    chapter: "isn-05-management-design",
    level: 1,
    question: "“第5章 管理设计”的最小设计不变量是什么？",
    answer:
      "告警、日志、拓扑、设备、端口和配置都能用一致时间与唯一标识关联，并能在隔离环境按备份独立恢复",
    tags: ["第5章 管理设计", "SNMP"],
  },
  {
    id: "isn-official-q39",
    chapter: "isn-05-management-design",
    level: 2,
    question: "怎样为“第5章 管理设计”构造单变量故障实验？",
    answer:
      "固定需求和正常业务流，只改变一条链路、一台设备、一个表项或一个管理依赖；重点反证：只保存配置文件而没有时间同步、日志来源、标签、凭据流程和恢复演练，故障时仍无法定位正确设备或确认恢复点。",
    tags: ["第5章 管理设计", "Syslog"],
  },
  {
    id: "isn-official-q40",
    chapter: "isn-05-management-design",
    level: 2,
    question: "为什么“第5章 管理设计”不能只靠拓扑图或ping验收？",
    answer:
      "拓扑和ping只是结果切片，不能证明正反向应用流、容量、状态同步、告警和恢复；必须保存接口、协议表项、业务结果与单故障证据。",
    tags: ["第5章 管理设计", "LLDP"],
  },
  {
    id: "isn-official-q41",
    chapter: "isn-05-management-design",
    level: 3,
    question: "如何验证“第5章 管理设计”没有混入后续版本？",
    answer:
      "核对图灵官方2015年首版元数据、CIP和试读目录；排除2024年第2版、云原生网络、Service Mesh和现代API网关，后续差异只能独立标注。",
    tags: ["第5章 管理设计", "版次门"],
  },
  {
    id: "isn-official-q42",
    chapter: "isn-05-management-design",
    level: 3,
    question: "“第5章 管理设计”独立交接必须包含什么？",
    answer:
      "需要需求追溯、拓扑、端口/VLAN/IP/路由/NAT/策略、配置备份、容量、单故障、监控日志、恢复、偏差、责任人与复核人。",
    tags: ["第5章 管理设计", "配置备份"],
  },
  {
    id: "isn-official-q43",
    chapter: "isn-official-final-review",
    level: 1,
    question:
      "“2015年首版总复习与网络设计评审”的设计主链和正式节点分母是什么？",
    answer:
      "主链是把6个正式单元、171个目录节点收束为需求、通信流、容量、故障与运营五道独立评审门；本页完整覆盖6个目录或复习节点，全部固定2015年首版。",
    tags: ["2015年首版总复习与网络设计评审", "需求追溯"],
  },
  {
    id: "isn-official-q44",
    chapter: "isn-official-final-review",
    level: 1,
    question: "“2015年首版总复习与网络设计评审”的最小设计不变量是什么？",
    answer:
      "另一位工程师无需口头信息即可按图表实施、验证单故障、定位告警并从备份恢复",
    tags: ["2015年首版总复习与网络设计评审", "通信矩阵"],
  },
  {
    id: "isn-official-q45",
    chapter: "isn-official-final-review",
    level: 2,
    question: "怎样为“2015年首版总复习与网络设计评审”构造单变量故障实验？",
    answer:
      "固定需求和正常业务流，只改变一条链路、一台设备、一个表项或一个管理依赖；重点反证：只展示一张漂亮拓扑和设备清单，不足以证明地址、允许流、回程、冗余容量、状态同步和恢复操作正确。",
    tags: ["2015年首版总复习与网络设计评审", "容量余量"],
  },
  {
    id: "isn-official-q46",
    chapter: "isn-official-final-review",
    level: 2,
    question:
      "为什么“2015年首版总复习与网络设计评审”不能只靠拓扑图或ping验收？",
    answer:
      "拓扑和ping只是结果切片，不能证明正反向应用流、容量、状态同步、告警和恢复；必须保存接口、协议表项、业务结果与单故障证据。",
    tags: ["2015年首版总复习与网络设计评审", "故障域"],
  },
  {
    id: "isn-official-q47",
    chapter: "isn-official-final-review",
    level: 3,
    question: "如何验证“2015年首版总复习与网络设计评审”没有混入后续版本？",
    answer:
      "核对图灵官方2015年首版元数据、CIP和试读目录；排除2024年第2版、云原生网络、Service Mesh和现代API网关，后续差异只能独立标注。",
    tags: ["2015年首版总复习与网络设计评审", "版次门"],
  },
  {
    id: "isn-official-q48",
    chapter: "isn-official-final-review",
    level: 3,
    question: "“2015年首版总复习与网络设计评审”独立交接必须包含什么？",
    answer:
      "需要需求追溯、拓扑、端口/VLAN/IP/路由/NAT/策略、恢复演练、容量、单故障、监控日志、恢复、偏差、责任人与复核人。",
    tags: ["2015年首版总复习与网络设计评审", "恢复演练"],
  },
];
