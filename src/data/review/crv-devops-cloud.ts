import type { ReviewQuestion } from "./types";

export const crvDevopsCloudQuestions: ReviewQuestion[] = [
  {
    id: "crv-devops-cloud-01",
    chapter: "crv-devops-cloud",
    level: 1,
    question: "CI/CD 流水线的五个阶段是什么？每个阶段做什么？",
    answer: "CI/CD 五个阶段：① 代码提交——开发者将代码 push 到版本库（Git），触发流水线；② 构建——自动编译打包源码，生成可部署产物（如 JAR/镜像）；③ 测试——自动化运行单元测试、集成测试、端到端测试，确保代码质量；④ 部署——将通过测试的产物发布到预发布或生产环境（如推送镜像到 K8s）；⑤ 监控运维——收集日志和指标、设置告警、自动扩缩容、故障自愈。整个流程形成闭环：代码变更自动触发全链路交付。",
    tags: ["CI/CD", "流水线", "自动化", "DevOps"],
  },
  {
    id: "crv-devops-cloud-02",
    chapter: "crv-devops-cloud",
    level: 2,
    question: "SaaS、PaaS、IaaS 的区别是什么？各适用于什么场景？",
    answer: "三者区别在于用户掌控的层级不同：① SaaS（软件即服务）——用户只管用，软件由云厂商完全托管，如 Gmail/钉钉/CRM。适用于非技术用户或标准化业务需求。② PaaS（平台即服务）——用户管代码，运行时环境由云厂商托管，如 App Engine/容器平台。适用于开发者专注业务代码、不想管服务器的场景。③ IaaS（基础设施即服务）——用户管操作系统及以上，云厂商提供虚拟机/网络/存储，如 EC2/ECS。适用于需要完全控制运行环境的场景。从 SaaS 到 IaaS：灵活性递增，运维负担递增，用户掌控层级递增。",
    tags: ["云计算", "SaaS", "PaaS", "IaaS", "服务模型"],
  },
  {
    id: "crv-devops-cloud-03",
    chapter: "crv-devops-cloud",
    level: 2,
    question: "Docker 和 Kubernetes 分别解决什么问题？",
    answer: "Docker 解决「环境一致性」问题：将应用及其依赖环境打包为镜像，实现「一次构建到处运行」。镜像分层构建，容器轻量级隔离（比虚拟机启动快、资源占用少）。解决「在我机器上能跑」的经典难题。Kubernetes 解决「容器编排调度」问题：当容器数量从几个增长到几百上千个时，手动管理不可行。K8s 提供：自动扩缩容（根据负载增减容器副本）、滚动更新/回滚（零停机部署）、服务发现和负载均衡（自动路由请求到健康容器）、自愈（自动重启失败容器）、配置管理。Docker 是打包工具，K8s 是管理平台。",
    tags: ["Docker", "Kubernetes", "容器化", "编排"],
  },
  {
    id: "crv-devops-cloud-04",
    chapter: "crv-devops-cloud",
    level: 3,
    question: "DevOps 不仅仅是工具，它的文化内核是什么？",
    answer: "DevOps 文化内核：① 开发+运维一体化——打破开发和运维之间的部门墙，双方共同为软件交付的全流程负责，而非「开发扔过墙给运维」；② 自动化一切可自动化之事——从构建、测试、部署到监控，消除手动操作瓶颈，减少人为错误；③ 基础设施即代码——用代码定义和管理环境配置，使环境可版本化、可复现、可审计；④ 持续反馈改进——通过监控数据和用户反馈驱动流程优化，形成「构建-测量-学习」闭环；⑤ 共担责任——开发和运维共同对系统的稳定性和交付速度负责。工具（CI/CD 平台、容器、监控系统）是手段，文化和思维转变才是 DevOps 的本质。",
    tags: ["DevOps", "文化", "自动化", "基础设施即代码", "持续改进"],
  },
];
