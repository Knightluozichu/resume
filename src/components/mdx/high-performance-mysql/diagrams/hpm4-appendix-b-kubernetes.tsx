import { OfficialHighPerformanceMysqlLab } from "./official-high-performance-mysql-lab";

export function Hpm4AppendixBKubernetesSloLab() {
  return (
    <OfficialHighPerformanceMysqlLab
      mode="slo"
      unitTitle="附录B Kubernetes上的MySQL"
      focus="评估Kubernetes为MySQL提供资源、控制平面和自动化是否值得新增故障复杂度"
      invariant="数据卷生命周期独立于Pod，资源与节点隔离明确，备份、恢复、升级和控制平面故障均有答案"
      artifact="责任边界、Operator能力矩阵、Pod与卷故障演练和退出方案"
      nodes={[
        "B.1 用Kubernetes供应资源",
        "B.2 仔细限定目标",
        "B.3 选择控制平面",
        "B.4 状态服务的细节",
        "B.5 小结",
      ]}
    />
  );
}

export function Hpm4AppendixBKubernetesCapacityLab() {
  return (
    <OfficialHighPerformanceMysqlLab
      mode="capacity"
      unitTitle="附录B Kubernetes上的MySQL"
      focus="评估Kubernetes为MySQL提供资源、控制平面和自动化是否值得新增故障复杂度"
      invariant="数据卷生命周期独立于Pod，资源与节点隔离明确，备份、恢复、升级和控制平面故障均有答案"
      artifact="责任边界、Operator能力矩阵、Pod与卷故障演练和退出方案"
      nodes={[
        "B.1 用Kubernetes供应资源",
        "B.2 仔细限定目标",
        "B.3 选择控制平面",
        "B.4 状态服务的细节",
        "B.5 小结",
      ]}
    />
  );
}

export function Hpm4AppendixBKubernetesEvidenceLab() {
  return (
    <OfficialHighPerformanceMysqlLab
      mode="evidence"
      unitTitle="附录B Kubernetes上的MySQL"
      focus="评估Kubernetes为MySQL提供资源、控制平面和自动化是否值得新增故障复杂度"
      invariant="数据卷生命周期独立于Pod，资源与节点隔离明确，备份、恢复、升级和控制平面故障均有答案"
      artifact="责任边界、Operator能力矩阵、Pod与卷故障演练和退出方案"
      nodes={[
        "B.1 用Kubernetes供应资源",
        "B.2 仔细限定目标",
        "B.3 选择控制平面",
        "B.4 状态服务的细节",
        "B.5 小结",
      ]}
    />
  );
}
