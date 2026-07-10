import type { ReviewQuestion } from "./types";

export const lopNetworkConfigQuestions: ReviewQuestion[] = [
  {
    id: "lop-network-config-1",
    chapter: "lop-network-config",
    level: 2,
    question: `\`ip addr show\` 和 \`ifconfig\` 的区别是什么？为什么推荐用 ip 命令？`,
    answer:
      `\`ifconfig\` 来自 net-tools 包，是传统工具，已被标记为废弃（deprecated），在较新的发行版中默认不安装。\`ip\` 命令来自 iproute2 包，是现代替代品，功能更强大：\`ip addr show\` 查看 IP 地址，\`ip link show\` 查看网卡，\`ip route show\` 查看路由表，\`ip neigh\` 查看 ARP 表。推荐用 ip 的原因：①ifconfig 不支持某些新特性（如多个 IP 在同一接口）；②iproute2 是内核 netlink 接口的直接封装，信息更准确；③ifconfig 配置不持久化重启丢失，ip 命令也是如此但配合 netplan 可持久化。`,
    tags: ["ip", "ifconfig"],
  },
  {
    id: "lop-network-config-2",
    chapter: "lop-network-config",
    level: 2,
    question: `什么是默认网关？路由表如何决定数据包的走向？`,
    answer:
      `默认网关（default gateway）是当目标 IP 不在本机任何子网内时，数据包发送的下一跳地址。路由表查找规则：内核收到数据包后，按路由表从最具体到最通用匹配目标地址——先查是否有匹配目标子网的路由（如 192.168.1.0/24），有则直接发给该子网；都不匹配则走默认路由（default via 192.168.1.1），把包发给网关由其转发。用 \`ip route show\` 查看路由表，典型输出 \`default via 192.168.1.1 dev eth0\` 表示默认网关是 192.168.1.1，经 eth0 接口发出。`,
    tags: ["网关", "路由表"],
  },
  {
    id: "lop-network-config-3",
    chapter: "lop-network-config",
    level: 3,
    question: `netplan 相比传统网络配置方式有什么优势？配置后如何生效？`,
    answer:
      `netplan 是 Ubuntu 17.10+ 的网络配置抽象层，用 YAML 声明式描述网络配置。优势：①声明式——描述「想要什么」而非「怎么做」，配置清晰可读；②持久化——\`netplan apply\` 后配置永久生效，重启不丢；③统一后端——同一份配置可生成 NetworkManager 或 systemd-networkd 的后端配置。传统方式 \`ip addr add\` 是临时的，重启即丢；\`/etc/network/interfaces\` 虽持久但语法繁琐。netplan 配置文件在 \`/etc/netplan/*.yaml\`，修改后 \`sudo netplan apply\` 生效，\`netplan try\` 可试应用（120秒后自动回滚，防止 SSH 断连锁死）。`,
    tags: ["netplan", "持久化"],
  },
  {
    id: "lop-network-config-4",
    chapter: "lop-network-config",
    level: 3,
    question: `DNS 解析在 Linux 中是如何工作的？\`/etc/resolv.conf\` 的作用是什么？`,
    answer:
      `DNS 解析流程：应用程序调用 \`getaddrinfo()\` → 读取 \`/etc/resolv.conf\` 获取 DNS 服务器地址 → 向 DNS 服务器发送 UDP 查询（端口 53）→ 服务器返回域名对应的 IP → 应用程序用该 IP 建立连接。\`/etc/resolv.conf\` 配置 DNS 服务器，关键字段 \`nameserver 8.8.8.8\` 指定 DNS 服务器地址（可多行指定多个，按序尝试）。在现代 Ubuntu 中 resolv.conf 常由 systemd-resolved 或 netplan 自动生成，手动修改会被覆盖。\`nslookup domain\` 或 \`dig domain\` 可测试 DNS 解析是否正常。\`/etc/hosts\` 优先级高于 DNS，可做本地域名映射。`,
    tags: ["DNS", "resolv.conf"],
  },
];
