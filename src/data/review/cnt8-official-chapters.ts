import type { ReviewQuestion } from "../review-questions";

export const cnt8OfficialQuestions: ReviewQuestion[] = [
  {
    id: "cnt8-official-q1",
    chapter: "cnt8-official-learning-map",
    level: 1,
    question: "“原书第8版权威学习地图”的端到端主链和节点分母是什么？",
    answer:
      "主链是沿应用层、运输层、网络层数据平面、网络层控制平面、链路层、无线移动与安全自顶向下追踪一条端到端通信；本页覆盖10个学习组织节点，全书正式分母固定为8章218个章/节/小节节点。",
    tags: ["原书第8版权威学习地图", "协议"],
  },
  {
    id: "cnt8-official-q2",
    chapter: "cnt8-official-learning-map",
    level: 1,
    question: "“原书第8版权威学习地图”的最小协议不变量是什么？",
    answer:
      "任一网络结论都能定位到层、协议实体、报文或状态、性能边界、失败路径以及可复现证据",
    tags: ["原书第8版权威学习地图", "服务模型"],
  },
  {
    id: "cnt8-official-q3",
    chapter: "cnt8-official-learning-map",
    level: 2,
    question: "怎样为“原书第8版权威学习地图”构造单变量网络实验？",
    answer:
      "固定应用、路径和其他协议状态，只改变一个报文、表项、定时器、链路或信任条件；重点反证：按设备名或零散协议背诵会切断跨层因果，也会把第7版退役内容或第9版新增内容误当成第8版正文。",
    tags: ["原书第8版权威学习地图", "封装"],
  },
  {
    id: "cnt8-official-q4",
    chapter: "cnt8-official-learning-map",
    level: 2,
    question: "为什么“原书第8版权威学习地图”不能只靠ping或最终状态验收？",
    answer:
      "ping或最终状态只是局部结果，不能证明名称解析、双向运输、逐跳转发、链路交付、安全身份和恢复路径；必须保存逐层时间线。",
    tags: ["原书第8版权威学习地图", "数据平面"],
  },
  {
    id: "cnt8-official-q5",
    chapter: "cnt8-official-learning-map",
    level: 3,
    question: "如何验证“原书第8版权威学习地图”没有混入其他版次？",
    answer:
      "核对机械工业出版社中文第8版目录、Pearson第8版书目和作者官方第8版目录；第7版退役材料和第9版变更只能独立标注。",
    tags: ["原书第8版权威学习地图", "版次门"],
  },
  {
    id: "cnt8-official-q6",
    chapter: "cnt8-official-learning-map",
    level: 3,
    question: "“原书第8版权威学习地图”独立交接必须包含什么？",
    answer:
      "需要第8版节点、正常与失败报文时间线、地址端口、协议状态、表项、控制平面、性能、告警、恢复、偏差、责任人与复核人。",
    tags: ["原书第8版权威学习地图", "控制平面"],
  },
  {
    id: "cnt8-official-q7",
    chapter: "cnt8-01-internet",
    level: 1,
    question: "“第1章 计算机网络和因特网”的端到端主链和节点分母是什么？",
    answer:
      "主链是从具体构成与服务定义因特网，建立网络边缘、网络核心、分组交换性能、协议分层、安全威胁和历史演化的总模型；本页覆盖28个原书正式节点，全书正式分母固定为8章218个章/节/小节节点。",
    tags: ["第1章 计算机网络和因特网", "分组交换"],
  },
  {
    id: "cnt8-official-q8",
    chapter: "cnt8-01-internet",
    level: 1,
    question: "“第1章 计算机网络和因特网”的最小协议不变量是什么？",
    answer:
      "每次端到端交付都能解释接入链路、核心交换、发送与传播边界、排队与丢包、吞吐瓶颈和逐层封装",
    tags: ["第1章 计算机网络和因特网", "排队时延"],
  },
  {
    id: "cnt8-official-q9",
    chapter: "cnt8-01-internet",
    level: 2,
    question: "怎样为“第1章 计算机网络和因特网”构造单变量网络实验？",
    answer:
      "固定应用、路径和其他协议状态，只改变一个报文、表项、定时器、链路或信任条件；重点反证：把带宽当作传输速度或忽略排队、协议开销与瓶颈链路，会让时延和吞吐预测在负载变化时失效。",
    tags: ["第1章 计算机网络和因特网", "吞吐量"],
  },
  {
    id: "cnt8-official-q10",
    chapter: "cnt8-01-internet",
    level: 2,
    question: "为什么“第1章 计算机网络和因特网”不能只靠ping或最终状态验收？",
    answer:
      "ping或最终状态只是局部结果，不能证明名称解析、双向运输、逐跳转发、链路交付、安全身份和恢复路径；必须保存逐层时间线。",
    tags: ["第1章 计算机网络和因特网", "协议栈"],
  },
  {
    id: "cnt8-official-q11",
    chapter: "cnt8-01-internet",
    level: 3,
    question: "如何验证“第1章 计算机网络和因特网”没有混入其他版次？",
    answer:
      "核对机械工业出版社中文第8版目录、Pearson第8版书目和作者官方第8版目录；第7版退役材料和第9版变更只能独立标注。",
    tags: ["第1章 计算机网络和因特网", "版次门"],
  },
  {
    id: "cnt8-official-q12",
    chapter: "cnt8-01-internet",
    level: 3,
    question: "“第1章 计算机网络和因特网”独立交接必须包含什么？",
    answer:
      "需要第8版节点、正常与失败报文时间线、地址端口、协议状态、表项、封装、性能、告警、恢复、偏差、责任人与复核人。",
    tags: ["第1章 计算机网络和因特网", "封装"],
  },
  {
    id: "cnt8-official-q13",
    chapter: "cnt8-02-application",
    level: 1,
    question: "“第2章 应用层”的端到端主链和节点分母是什么？",
    answer:
      "主链是从进程通信与运输服务需求进入HTTP、电子邮件、DNS、P2P、视频/CDN和UDP/TCP套接字编程；本页覆盖33个原书正式节点，全书正式分母固定为8章218个章/节/小节节点。",
    tags: ["第2章 应用层", "套接字"],
  },
  {
    id: "cnt8-official-q14",
    chapter: "cnt8-02-application",
    level: 1,
    question: "“第2章 应用层”的最小协议不变量是什么？",
    answer:
      "每个应用协议都能说明通信进程、寻址、报文格式与次序、运输服务、状态位置、缓存或复制策略以及失败语义",
    tags: ["第2章 应用层", "HTTP"],
  },
  {
    id: "cnt8-official-q15",
    chapter: "cnt8-02-application",
    level: 2,
    question: "怎样为“第2章 应用层”构造单变量网络实验？",
    answer:
      "固定应用、路径和其他协议状态，只改变一个报文、表项、定时器、链路或信任条件；重点反证：只记端口号而不区分应用状态、运输连接、缓存一致性和命名依赖，会在代理、CDN、DNS或并发连接处误判。",
    tags: ["第2章 应用层", "DNS"],
  },
  {
    id: "cnt8-official-q16",
    chapter: "cnt8-02-application",
    level: 2,
    question: "为什么“第2章 应用层”不能只靠ping或最终状态验收？",
    answer:
      "ping或最终状态只是局部结果，不能证明名称解析、双向运输、逐跳转发、链路交付、安全身份和恢复路径；必须保存逐层时间线。",
    tags: ["第2章 应用层", "CDN"],
  },
  {
    id: "cnt8-official-q17",
    chapter: "cnt8-02-application",
    level: 3,
    question: "如何验证“第2章 应用层”没有混入其他版次？",
    answer:
      "核对机械工业出版社中文第8版目录、Pearson第8版书目和作者官方第8版目录；第7版退役材料和第9版变更只能独立标注。",
    tags: ["第2章 应用层", "版次门"],
  },
  {
    id: "cnt8-official-q18",
    chapter: "cnt8-02-application",
    level: 3,
    question: "“第2章 应用层”独立交接必须包含什么？",
    answer:
      "需要第8版节点、正常与失败报文时间线、地址端口、协议状态、表项、P2P、性能、告警、恢复、偏差、责任人与复核人。",
    tags: ["第2章 应用层", "P2P"],
  },
  {
    id: "cnt8-official-q19",
    chapter: "cnt8-03-transport",
    level: 1,
    question: "“第3章 运输层”的端到端主链和节点分母是什么？",
    answer:
      "主链是解释端到端复用、UDP、可靠数据传输、TCP连接与流量控制、拥塞原因以及经典和现代拥塞控制演化；本页覆盖29个原书正式节点，全书正式分母固定为8章218个章/节/小节节点。",
    tags: ["第3章 运输层", "多路分解"],
  },
  {
    id: "cnt8-official-q20",
    chapter: "cnt8-03-transport",
    level: 1,
    question: "“第3章 运输层”的最小协议不变量是什么？",
    answer:
      "可靠性、流量控制与拥塞控制分别对应链路错误、接收方容量和网络容量，状态机与序号空间能解释每次发送、确认、超时和窗口变化",
    tags: ["第3章 运输层", "可靠数据传输"],
  },
  {
    id: "cnt8-official-q21",
    chapter: "cnt8-03-transport",
    level: 2,
    question: "怎样为“第3章 运输层”构造单变量网络实验？",
    answer:
      "固定应用、路径和其他协议状态，只改变一个报文、表项、定时器、链路或信任条件；重点反证：把接收窗口当拥塞窗口、把一次超时当单一原因或忽略重传歧义，会得到错误的吞吐与恢复结论。",
    tags: ["第3章 运输层", "接收窗口"],
  },
  {
    id: "cnt8-official-q22",
    chapter: "cnt8-03-transport",
    level: 2,
    question: "为什么“第3章 运输层”不能只靠ping或最终状态验收？",
    answer:
      "ping或最终状态只是局部结果，不能证明名称解析、双向运输、逐跳转发、链路交付、安全身份和恢复路径；必须保存逐层时间线。",
    tags: ["第3章 运输层", "拥塞窗口"],
  },
  {
    id: "cnt8-official-q23",
    chapter: "cnt8-03-transport",
    level: 3,
    question: "如何验证“第3章 运输层”没有混入其他版次？",
    answer:
      "核对机械工业出版社中文第8版目录、Pearson第8版书目和作者官方第8版目录；第7版退役材料和第9版变更只能独立标注。",
    tags: ["第3章 运输层", "版次门"],
  },
  {
    id: "cnt8-official-q24",
    chapter: "cnt8-03-transport",
    level: 3,
    question: "“第3章 运输层”独立交接必须包含什么？",
    answer:
      "需要第8版节点、正常与失败报文时间线、地址端口、协议状态、表项、RTT、性能、告警、恢复、偏差、责任人与复核人。",
    tags: ["第3章 运输层", "RTT"],
  },
  {
    id: "cnt8-official-q25",
    chapter: "cnt8-04-data-plane",
    level: 1,
    question: "“第4章 网络层：数据平面”的端到端主链和节点分母是什么？",
    answer:
      "主链是分离转发与路由，剖析路由器输入、交换、输出、排队和调度，并掌握IPv4编址、NAT、IPv6、泛化转发、SDN与中间盒；本页覆盖21个原书正式节点，全书正式分母固定为8章218个章/节/小节节点。",
    tags: ["第4章 网络层：数据平面", "转发"],
  },
  {
    id: "cnt8-official-q26",
    chapter: "cnt8-04-data-plane",
    level: 1,
    question: "“第4章 网络层：数据平面”的最小协议不变量是什么？",
    answer:
      "任一分组的本地处理都能由匹配字段、转发表项、队列和调度动作解释，地址转换与返回路径保持可逆状态",
    tags: ["第4章 网络层：数据平面", "最长前缀匹配"],
  },
  {
    id: "cnt8-official-q27",
    chapter: "cnt8-04-data-plane",
    level: 2,
    question: "怎样为“第4章 网络层：数据平面”构造单变量网络实验？",
    answer:
      "固定应用、路径和其他协议状态，只改变一个报文、表项、定时器、链路或信任条件；重点反证：只查看路由表而忽略输入匹配、交换能力、输出队列、ACL/NAT和中间盒状态，会把数据平面丢包错误归因于路由协议。",
    tags: ["第4章 网络层：数据平面", "NAT"],
  },
  {
    id: "cnt8-official-q28",
    chapter: "cnt8-04-data-plane",
    level: 2,
    question: "为什么“第4章 网络层：数据平面”不能只靠ping或最终状态验收？",
    answer:
      "ping或最终状态只是局部结果，不能证明名称解析、双向运输、逐跳转发、链路交付、安全身份和恢复路径；必须保存逐层时间线。",
    tags: ["第4章 网络层：数据平面", "泛化转发"],
  },
  {
    id: "cnt8-official-q29",
    chapter: "cnt8-04-data-plane",
    level: 3,
    question: "如何验证“第4章 网络层：数据平面”没有混入其他版次？",
    answer:
      "核对机械工业出版社中文第8版目录、Pearson第8版书目和作者官方第8版目录；第7版退役材料和第9版变更只能独立标注。",
    tags: ["第4章 网络层：数据平面", "版次门"],
  },
  {
    id: "cnt8-official-q30",
    chapter: "cnt8-04-data-plane",
    level: 3,
    question: "“第4章 网络层：数据平面”独立交接必须包含什么？",
    answer:
      "需要第8版节点、正常与失败报文时间线、地址端口、协议状态、表项、中间盒、性能、告警、恢复、偏差、责任人与复核人。",
    tags: ["第4章 网络层：数据平面", "中间盒"],
  },
  {
    id: "cnt8-official-q31",
    chapter: "cnt8-05-control-plane",
    level: 1,
    question: "“第5章 网络层：控制平面”的端到端主链和节点分母是什么？",
    answer:
      "主链是从链路状态与距离向量算法进入OSPF、BGP、SDN控制器、ICMP以及SNMP和NETCONF/YANG网络管理；本页覆盖24个原书正式节点，全书正式分母固定为8章218个章/节/小节节点。",
    tags: ["第5章 网络层：控制平面", "链路状态"],
  },
  {
    id: "cnt8-official-q32",
    chapter: "cnt8-05-control-plane",
    level: 1,
    question: "“第5章 网络层：控制平面”的最小协议不变量是什么？",
    answer:
      "每条转发规则都有可追溯的拓扑或策略输入、算法选择、控制消息、收敛状态、管理配置和故障证据",
    tags: ["第5章 网络层：控制平面", "距离向量"],
  },
  {
    id: "cnt8-official-q33",
    chapter: "cnt8-05-control-plane",
    level: 2,
    question: "怎样为“第5章 网络层：控制平面”构造单变量网络实验？",
    answer:
      "固定应用、路径和其他协议状态，只改变一个报文、表项、定时器、链路或信任条件；重点反证：把最短路径等同于域间最佳路由，或只看控制邻居不验证数据平面，会忽略BGP策略、收敛瞬态和配置漂移。",
    tags: ["第5章 网络层：控制平面", "OSPF"],
  },
  {
    id: "cnt8-official-q34",
    chapter: "cnt8-05-control-plane",
    level: 2,
    question: "为什么“第5章 网络层：控制平面”不能只靠ping或最终状态验收？",
    answer:
      "ping或最终状态只是局部结果，不能证明名称解析、双向运输、逐跳转发、链路交付、安全身份和恢复路径；必须保存逐层时间线。",
    tags: ["第5章 网络层：控制平面", "BGP"],
  },
  {
    id: "cnt8-official-q35",
    chapter: "cnt8-05-control-plane",
    level: 3,
    question: "如何验证“第5章 网络层：控制平面”没有混入其他版次？",
    answer:
      "核对机械工业出版社中文第8版目录、Pearson第8版书目和作者官方第8版目录；第7版退役材料和第9版变更只能独立标注。",
    tags: ["第5章 网络层：控制平面", "版次门"],
  },
  {
    id: "cnt8-official-q36",
    chapter: "cnt8-05-control-plane",
    level: 3,
    question: "“第5章 网络层：控制平面”独立交接必须包含什么？",
    answer:
      "需要第8版节点、正常与失败报文时间线、地址端口、协议状态、表项、YANG、性能、告警、恢复、偏差、责任人与复核人。",
    tags: ["第5章 网络层：控制平面", "YANG"],
  },
  {
    id: "cnt8-official-q37",
    chapter: "cnt8-06-link-lans",
    level: 1,
    question: "“第6章 链路层和局域网”的端到端主链和节点分母是什么？",
    answer:
      "主链是掌握链路层服务、差错检测、共享信道协议、ARP与以太网交换、VLAN、链路虚拟化、数据中心网络和完整Web请求回顾；本页覆盖28个原书正式节点，全书正式分母固定为8章218个章/节/小节节点。",
    tags: ["第6章 链路层和局域网", "CRC"],
  },
  {
    id: "cnt8-official-q38",
    chapter: "cnt8-06-link-lans",
    level: 1,
    question: "“第6章 链路层和局域网”的最小协议不变量是什么？",
    answer:
      "同一链路上的帧交付能由成帧、差错检测、介质访问、MAC学习、VLAN边界和下一跳解析共同解释",
    tags: ["第6章 链路层和局域网", "多路访问协议"],
  },
  {
    id: "cnt8-official-q39",
    chapter: "cnt8-06-link-lans",
    level: 2,
    question: "怎样为“第6章 链路层和局域网”构造单变量网络实验？",
    answer:
      "固定应用、路径和其他协议状态，只改变一个报文、表项、定时器、链路或信任条件；重点反证：把IP子网、VLAN、广播域和交换表混成同一概念，会在ARP、Trunk、环路和未知单播处产生错误设计。",
    tags: ["第6章 链路层和局域网", "MAC地址"],
  },
  {
    id: "cnt8-official-q40",
    chapter: "cnt8-06-link-lans",
    level: 2,
    question: "为什么“第6章 链路层和局域网”不能只靠ping或最终状态验收？",
    answer:
      "ping或最终状态只是局部结果，不能证明名称解析、双向运输、逐跳转发、链路交付、安全身份和恢复路径；必须保存逐层时间线。",
    tags: ["第6章 链路层和局域网", "ARP"],
  },
  {
    id: "cnt8-official-q41",
    chapter: "cnt8-06-link-lans",
    level: 3,
    question: "如何验证“第6章 链路层和局域网”没有混入其他版次？",
    answer:
      "核对机械工业出版社中文第8版目录、Pearson第8版书目和作者官方第8版目录；第7版退役材料和第9版变更只能独立标注。",
    tags: ["第6章 链路层和局域网", "版次门"],
  },
  {
    id: "cnt8-official-q42",
    chapter: "cnt8-06-link-lans",
    level: 3,
    question: "“第6章 链路层和局域网”独立交接必须包含什么？",
    answer:
      "需要第8版节点、正常与失败报文时间线、地址端口、协议状态、表项、VLAN、性能、告警、恢复、偏差、责任人与复核人。",
    tags: ["第6章 链路层和局域网", "VLAN"],
  },
  {
    id: "cnt8-official-q43",
    chapter: "cnt8-07-wireless-mobile",
    level: 1,
    question: "“第7章 无线网络和移动网络”的端到端主链和节点分母是什么？",
    answer:
      "主链是从无线链路特征进入802.11、蓝牙、4G LTE、5G、移动性管理、漫游与高层协议影响；本页覆盖26个原书正式节点，全书正式分母固定为8章218个章/节/小节节点。",
    tags: ["第7章 无线网络和移动网络", "CSMA/CA"],
  },
  {
    id: "cnt8-official-q44",
    chapter: "cnt8-07-wireless-mobile",
    level: 1,
    question: "“第7章 无线网络和移动网络”的最小协议不变量是什么？",
    answer:
      "接入、鉴别、无线资源、核心网隧道、位置状态与切换过程能共同解释移动设备在变化链路上的会话连续性",
    tags: ["第7章 无线网络和移动网络", "隐藏终端"],
  },
  {
    id: "cnt8-official-q45",
    chapter: "cnt8-07-wireless-mobile",
    level: 2,
    question: "怎样为“第7章 无线网络和移动网络”构造单变量网络实验？",
    answer:
      "固定应用、路径和其他协议状态，只改变一个报文、表项、定时器、链路或信任条件；重点反证：用有线碰撞模型解释隐藏终端，或只看信号强度不看关联、调度、核心网状态和切换，会误判无线故障。",
    tags: ["第7章 无线网络和移动网络", "基站"],
  },
  {
    id: "cnt8-official-q46",
    chapter: "cnt8-07-wireless-mobile",
    level: 2,
    question: "为什么“第7章 无线网络和移动网络”不能只靠ping或最终状态验收？",
    answer:
      "ping或最终状态只是局部结果，不能证明名称解析、双向运输、逐跳转发、链路交付、安全身份和恢复路径；必须保存逐层时间线。",
    tags: ["第7章 无线网络和移动网络", "切换"],
  },
  {
    id: "cnt8-official-q47",
    chapter: "cnt8-07-wireless-mobile",
    level: 3,
    question: "如何验证“第7章 无线网络和移动网络”没有混入其他版次？",
    answer:
      "核对机械工业出版社中文第8版目录、Pearson第8版书目和作者官方第8版目录；第7版退役材料和第9版变更只能独立标注。",
    tags: ["第7章 无线网络和移动网络", "版次门"],
  },
  {
    id: "cnt8-official-q48",
    chapter: "cnt8-07-wireless-mobile",
    level: 3,
    question: "“第7章 无线网络和移动网络”独立交接必须包含什么？",
    answer:
      "需要第8版节点、正常与失败报文时间线、地址端口、协议状态、表项、漫游、性能、告警、恢复、偏差、责任人与复核人。",
    tags: ["第7章 无线网络和移动网络", "漫游"],
  },
  {
    id: "cnt8-official-q49",
    chapter: "cnt8-08-security",
    level: 1,
    question: "“第8章 计算机网络中的安全”的端到端主链和节点分母是什么？",
    answer:
      "主链是从威胁模型和密码学原理建立完整性、签名、端点鉴别、邮件、TLS、IPsec、无线/蜂窝鉴别、防火墙与入侵检测；本页覆盖29个原书正式节点，全书正式分母固定为8章218个章/节/小节节点。",
    tags: ["第8章 计算机网络中的安全", "机密性"],
  },
  {
    id: "cnt8-official-q50",
    chapter: "cnt8-08-security",
    level: 1,
    question: "“第8章 计算机网络中的安全”的最小协议不变量是什么？",
    answer:
      "每项安全结论都明确保护目标、信任根、密钥归属、握手新鲜性、保护范围、失败模式和可审计证据",
    tags: ["第8章 计算机网络中的安全", "报文鉴别码"],
  },
  {
    id: "cnt8-official-q51",
    chapter: "cnt8-08-security",
    level: 2,
    question: "怎样为“第8章 计算机网络中的安全”构造单变量网络实验？",
    answer:
      "固定应用、路径和其他协议状态，只改变一个报文、表项、定时器、链路或信任条件；重点反证：把加密等同于完整安全，或不验证证书身份、随机数、密钥方向和策略边界，会留下重放、中间人和错误放行。",
    tags: ["第8章 计算机网络中的安全", "数字签名"],
  },
  {
    id: "cnt8-official-q52",
    chapter: "cnt8-08-security",
    level: 2,
    question: "为什么“第8章 计算机网络中的安全”不能只靠ping或最终状态验收？",
    answer:
      "ping或最终状态只是局部结果，不能证明名称解析、双向运输、逐跳转发、链路交付、安全身份和恢复路径；必须保存逐层时间线。",
    tags: ["第8章 计算机网络中的安全", "TLS"],
  },
  {
    id: "cnt8-official-q53",
    chapter: "cnt8-08-security",
    level: 3,
    question: "如何验证“第8章 计算机网络中的安全”没有混入其他版次？",
    answer:
      "核对机械工业出版社中文第8版目录、Pearson第8版书目和作者官方第8版目录；第7版退役材料和第9版变更只能独立标注。",
    tags: ["第8章 计算机网络中的安全", "版次门"],
  },
  {
    id: "cnt8-official-q54",
    chapter: "cnt8-08-security",
    level: 3,
    question: "“第8章 计算机网络中的安全”独立交接必须包含什么？",
    answer:
      "需要第8版节点、正常与失败报文时间线、地址端口、协议状态、表项、IPsec、性能、告警、恢复、偏差、责任人与复核人。",
    tags: ["第8章 计算机网络中的安全", "IPsec"],
  },
  {
    id: "cnt8-official-q55",
    chapter: "cnt8-official-final-review",
    level: 1,
    question: "“原书第8版总复习与端到端诊断”的端到端主链和节点分母是什么？",
    answer:
      "主链是把218个正式节点压缩为从应用意图、运输状态、转发与路由、局部链路、无线移动到多层安全的可复现诊断闭环；本页覆盖10个学习组织节点，全书正式分母固定为8章218个章/节/小节节点。",
    tags: ["原书第8版总复习与端到端诊断", "端到端路径"],
  },
  {
    id: "cnt8-official-q56",
    chapter: "cnt8-official-final-review",
    level: 1,
    question: "“原书第8版总复习与端到端诊断”的最小协议不变量是什么？",
    answer:
      "面对任一正常或失败场景，都能先预测逐层状态与报文，再用单变量实验定位首个偏离模型的层和责任实体",
    tags: ["原书第8版总复习与端到端诊断", "首个偏差"],
  },
  {
    id: "cnt8-official-q57",
    chapter: "cnt8-official-final-review",
    level: 2,
    question: "怎样为“原书第8版总复习与端到端诊断”构造单变量网络实验？",
    answer:
      "固定应用、路径和其他协议状态，只改变一个报文、表项、定时器、链路或信任条件；重点反证：从日志中挑一个异常直接归因会混淆根因与连锁反应，尤其会把应用超时误判为DNS、TCP、路由或无线中的任意一项。",
    tags: ["原书第8版总复习与端到端诊断", "单变量实验"],
  },
  {
    id: "cnt8-official-q58",
    chapter: "cnt8-official-final-review",
    level: 2,
    question: "为什么“原书第8版总复习与端到端诊断”不能只靠ping或最终状态验收？",
    answer:
      "ping或最终状态只是局部结果，不能证明名称解析、双向运输、逐跳转发、链路交付、安全身份和恢复路径；必须保存逐层时间线。",
    tags: ["原书第8版总复习与端到端诊断", "证据链"],
  },
  {
    id: "cnt8-official-q59",
    chapter: "cnt8-official-final-review",
    level: 3,
    question: "如何验证“原书第8版总复习与端到端诊断”没有混入其他版次？",
    answer:
      "核对机械工业出版社中文第8版目录、Pearson第8版书目和作者官方第8版目录；第7版退役材料和第9版变更只能独立标注。",
    tags: ["原书第8版总复习与端到端诊断", "版次门"],
  },
  {
    id: "cnt8-official-q60",
    chapter: "cnt8-official-final-review",
    level: 3,
    question: "“原书第8版总复习与端到端诊断”独立交接必须包含什么？",
    answer:
      "需要第8版节点、正常与失败报文时间线、地址端口、协议状态、表项、版次门、性能、告警、恢复、偏差、责任人与复核人。",
    tags: ["原书第8版总复习与端到端诊断", "版次门"],
  },
];
