import { OfficialKubernetesActionLab } from "./official-kubernetes-action-lab";
const meta = {
  unitTitle: "第7章 ConfigMap 和 Secret ：配置应用程序",
  focus:
    "用参数、环境变量、ConfigMap和Secret解耦镜像与配置并验证更新和敏感数据边界",
  invariant:
    "同一镜像按声明获得正确配置，Secret不出现在不必要的日志与清单中，更新传播行为可测",
  artifact:
    "配置来源矩阵、ConfigMap注入、卷更新轨迹、Secret创建挂载和泄漏负向测试",
  nodes: [
    "7.1 配置容器化应用程序",
    "7.2 向容器传递命令行参数",
    "7.2.1 在 Docker 中定义命令与参数",
    "7.2.2 在 Kubernetes 中覆盖命令和参数",
    "7.3 为容器设置环境变量",
    "7.3.1 在容器定义中指定环境变量",
    "7.3.2 在环境变量值中引用其他环境变量",
    "7.3.3 了解硬编码环境变量的不足之处",
    "7.4 利用 ConfigMap 解耦配置",
    "7.4.1 ConfigMap 介绍",
    "7.4.2 创建 ConfigMap",
    "7.4.3 给容器传递 ConfigMap 条目作为环境变量",
    "7.4.4 一次性传递 ConfigMap 的所有条目作为环境变量",
    "7.4.5 传递 ConfigMap 条目作为命令行参数",
    "7.4.6 使用 configMap 卷将条目暴露为文件",
    "7.4.7 更新应用配置且不重启应用程序",
    "7.5 使用 Secret 给容器传递敏感数据",
    "7.5.1 介绍 Secret",
    "7.5.2 默认令牌 Secret 介绍",
    "7.5.3 创建 Secret",
    "7.5.4 对比 ConfigMap 与 Secret",
    "7.5.5 在 pod 中使用 Secret",
    "7.6 本章小结",
  ],
} as const;
export function K8s07ConfigmapsSecretsObjectLab() {
  return <OfficialKubernetesActionLab mode="object" {...meta} />;
}
export function K8s07ConfigmapsSecretsReconcileLab() {
  return <OfficialKubernetesActionLab mode="reconcile" {...meta} />;
}
export function K8s07ConfigmapsSecretsEvidenceLab() {
  return <OfficialKubernetesActionLab mode="evidence" {...meta} />;
}
