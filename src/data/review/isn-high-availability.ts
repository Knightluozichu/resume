import type { ReviewQuestion } from "./types";

export const isnHighAvailabilityQuestions: ReviewQuestion[] = [
  {
    id: "isn-ha-1",
    chapter: "isn-high-availability",
    level: 1,
    question: "高可用的核心思想是什么？可用性等级怎么划分？",
    answer: "高可用的核心思想是消除单点故障（SPOF）——关键组件至少部署两份，一台挂了另一台顶上，用户无感知。可用性等级：2个9（99%，年停机3.65天，内部系统）、3个9（99.9%，年停机8.76小时，一般业务）、4个9（99.99%，年停机52.6分钟，核心业务）、5个9（99.999%，年停机5.26分钟，金融/电信）。",
    tags: ["高可用", "SPOF", "可用性等级"],
  },
  {
    id: "isn-ha-2",
    chapter: "isn-high-availability",
    level: 2,
    question: "主备、双活、多活三种冗余模式有什么区别？双活一定比主备好吗？",
    answer: "三种冗余模式区别：①主备——一台工作一台待命，故障时切换，资源利用率50%，切换秒级，复杂度低 ②双活——两台同时工作互为备份，资源利用率100%，无需切换，复杂度中 ③多活——多机房同时服务，资源利用率100%，无需切换，复杂度高。双活不一定比主备好：双活资源利用率高但要求两台服务器状态完全同步，数据库双活写冲突和一致性保证非常复杂。主备虽然浪费资源但简单可靠——很多场景（如数据库主从）主备仍是首选。",
    tags: ["主备", "双活", "多活", "冗余模式"],
  },
  {
    id: "isn-ha-3",
    chapter: "isn-high-availability",
    level: 3,
    question: "VIP漂移的原理是什么？VRRP故障转移的完整流程是什么？",
    answer: "VIP漂移原理：VIP是不绑定特定网卡的虚拟IP。正常时VIP指向Master节点，Master故障时VIP自动漂移到Backup节点。客户端始终连VIP而非真实IP，故障转移对客户端透明。VRRP故障转移流程：①Master每1秒发VRRP广告包宣告存活 ②Backup连续3秒未收到广告包判定Master故障 ③Backup提升自己为Master并抢占VIP ④ARP广播告诉交换机VIP现在在自己这里 ⑤客户端流量自动切到新Master（VIP地址不变）。Keepalived是Linux下最常用的VRRP实现。",
    tags: ["VIP漂移", "VRRP", "故障转移", "Keepalived"],
  },
  {
    id: "isn-ha-4",
    chapter: "isn-high-availability",
    level: 4,
    question: "什么是脑裂问题？三种防御策略的原理和优劣是什么？",
    answer: "脑裂是高可用系统中两台服务器因网络分区互相认为对方故障，同时抢占VIP成为Master的致命问题，导致两台同时写入数据冲突。三种防御策略：①仲裁节点（Quorum）——奇数节点投票，多数派才能成为Master。优点是原理简单通用，缺点是需要至少3个节点，增加了部署复杂度。②Fencing（共享存储锁）——抢占共享存储锁，抢不到的强制关机（STONITH）。优点是物理隔离最彻底，缺点是需要共享存储或远程电源管理硬件。③多条心跳线——主网+备用网+串口线，全断才算真挂。优点是降低误判概率，缺点是成本高且无法100%消除脑裂。生产环境通常组合使用：多心跳线+仲裁节点。",
    tags: ["脑裂", "Quorum", "Fencing", "心跳线"],
  },
];
