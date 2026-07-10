import type { ReviewQuestion } from "./types";

export const aupHistoryCultureQuestions: ReviewQuestion[] = [
  {
    id: "aup-history-culture-01",
    chapter: "aup-history-culture",
    level: 1,
    question: `UNIX 历史可以划分为哪四个主要时代？`,
    answer: `四个主要时代：① 起源时代（1969）——Thompson 和 Ritchie 在 Bell Labs 创造 UNIX，C 语言诞生，管道机制发明，奠定设计基因；② 分裂时代（1977-1984）——BSD 与 System V 分裂，商业化与标准化并行，POSIX 标准诞生，GNU 项目启动；③ 开源时代（1991-2000）——Linux 内核发布，开源运动兴起，Apache/Perl/Python 生态繁荣，互联网爆发；④ 融合时代（2000+）——macOS 基于 Darwin，容器化 Docker，云原生 Kubernetes，DevOps 文化，UNIX 哲学在现代持续延续。`,
    tags: ["历史脉络", "时代划分", "UNIX起源"],
  },
  {
    id: "aup-history-culture-02",
    chapter: "aup-history-culture",
    level: 1,
    question: `UNIX 文化的核心特征有哪些？`,
    answer: `UNIX 文化的四大核心特征：① 源码共享——早期学术共享传统，开源运动的基石，「足够好就发布」的迭代精神；② 工具文化——偏好小而锋利的工具，优于大型集成环境，工具可组合可替换；③ 去中心化——无单一权威控制，分布式的协作模式，通过标准达成共识；④ 传承迭代——站在巨人的肩膀上，复用优于重写，渐进式演化。这些特征使 UNIX 文化跨越半个世纪仍保持生命力。`,
    tags: ["UNIX文化", "开源精神", "工具文化"],
  },
  {
    id: "aup-history-culture-03",
    chapter: "aup-history-culture",
    level: 2,
    question: `BSD 与 System V 的分裂对 UNIX 发展有什么影响？`,
    answer: `分裂的影响：① 负面——标准不统一导致软件移植困难，开发者需要处理不同变体的差异，市场碎片化削弱了 UNIX 对抗 Windows 的竞争力；② 正面——竞争推动了创新，BSD 贡献了 vi、TCP/IP、虚拟内存等重要特性，System V 贡献了 IPC、STREAMS 等机制；③ 长期——分裂催生了 POSIX 标准化运动，让跨平台兼容成为可能，为后来的 Linux 统一开源生态奠定了标准基础。这段历史教训说明：标准比实现更重要，共识比权威更持久。`,
    tags: ["BSD", "System V", "标准化", "POSIX"],
  },
  {
    id: "aup-history-culture-04",
    chapter: "aup-history-culture",
    level: 3,
    question: `UNIX 哲学如何影响现代软件工程（云原生、DevOps、容器化）？`,
    answer: `UNIX 哲学在现代的延续：① 云原生——微服务架构就是「一个程序只做一件事并做好」的服务级实践，API 网关是管道机制的分布式版本，容器是进程隔离的延伸；② DevOps——CI/CD 流水线是管道组合的自动化版本，基础设施即代码延续了文本配置的传统，可观测性优先体现了透明性原则；③ 容器化——Docker 容器是 UNIX 进程模型的封装，Kubernetes 编排是进程管理的集群级扩展，声明式配置延续了文本优先理念；④ 函数式编程——纯函数（无副作用）和不可变数据让函数可像 UNIX 工具一样自由组合，map/filter/reduce 就是管道模式。核心结论：UNIX 哲学不是历史遗物，而是持续演进的活态设计哲学。`,
    tags: ["现代影响", "云原生", "DevOps", "哲学延续"],
  },
];
