import { OfficialKubernetesActionLab } from "./official-kubernetes-action-lab";
const meta = {
  unitTitle: "第17章 开发应用的最佳实践",
  focus: "整合资源清单、Pod生命周期、优雅启停、镜像标签、日志、开发测试与CI/CD",
  invariant:
    "Pod随时可重建，启动和终止窗口不丢客户端请求，制品与清单按版本联合发布和回退",
  artifact:
    "资源包、生命周期钩子、优雅终止、镜像策略、日志契约、开发与持续交付演练",
  nodes: [
    "17.1 集中一切资源",
    "17.2 了解 pod 的生命周期",
    "17.2.1 应用必须预料到会被杀死或者重新调度",
    "17.2.2 重新调度死亡的或者部分死亡的 pod",
    "17.2.3 以固定顺序启动 pod",
    "17.2.4 增加生命周期钩子",
    "17.2.5 了解 pod 的关闭",
    "17.3 确保所有的客户端请求都得到了妥善处理",
    "17.3.1 在 pod 启动时避免客户端连接断开",
    "17.3.2 在 pod 关闭时避免客户端连接断开",
    "17.4 让应用在 Kubernetes 中方便运行和管理",
    "17.4.1 构建可管理的容器镜像",
    "17.4.2 合理地给镜像打标签，正确地使用 ImagePullPolicy",
    "17.4.3 使用多维度而不是单维度的标签",
    "17.4.4 通过注解描述每个资源",
    "17.4.5 给进程终止提供更多的信息",
    "17.4.6 处理应用日志",
    "17.5 开发和测试的最佳实践",
    "17.5.1 开发过程中在 Kubernetes 之外运行应用",
    "17.5.2 在开发过程中使用 Minikube",
    "17.5.3 发布版本和自动部署资源清单",
    "17.5.4 使用 Ksonnet 作为编写 YAML/JSON manifest 文件的额外选择",
    "17.5.5 利用持续集成和持续交付",
    "17.6 本章小结",
  ],
} as const;
export function K8s17BestPracticesObjectLab() {
  return <OfficialKubernetesActionLab mode="object" {...meta} />;
}
export function K8s17BestPracticesReconcileLab() {
  return <OfficialKubernetesActionLab mode="reconcile" {...meta} />;
}
export function K8s17BestPracticesEvidenceLab() {
  return <OfficialKubernetesActionLab mode="evidence" {...meta} />;
}
