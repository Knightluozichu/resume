import { OfficialKubernetesActionLab } from "./official-kubernetes-action-lab";
const meta = {
  unitTitle: "第6章 卷 ：将磁盘挂载到容器",
  focus:
    "比较emptyDir、gitRepo、hostPath、网络卷、PV、PVC和StorageClass的生命周期与供应边界",
  invariant:
    "Pod、容器、节点和存储后端生命周期分别标注，PVC重建与Pod重调度后数据存续符合声明",
  artifact: "卷生命周期矩阵、共享卷实验、PV/PVC绑定轨迹、动态供应和回收验证",
  nodes: [
    "6.1 介绍卷",
    "6.1.1 卷的应用示例",
    "6.1.2 介绍可用的卷类型",
    "6.2 通过卷在容器之间共享数据",
    "6.2.1 使用 emptyDir 卷",
    "6.2.2 使用 Git 仓库作为存储卷",
    "6.3 访问工作节点文件系统上的文件",
    "6.3.1 介绍 hostPath 卷",
    "6.3.2 检查使用 hostPath 卷的系统 pod",
    "6.4 使用持久化存储",
    "6.4.1 使用 GCE 持久磁盘作为 pod 存储卷",
    "6.4.2 通过底层持久化存储使用其他类型的卷",
    "6.5 从底层存储技术解耦 pod",
    "6.5.1 介绍持久卷和持久卷声明",
    "6.5.2 创建持久卷",
    "6.5.3 通过创建持久卷声明来获取持久卷",
    "6.5.4 在 pod 中使用持久卷声明",
    "6.5.5 了解使用持久卷和持久卷声明的好处",
    "6.5.6 回收持久卷",
    "6.6 持久卷的动态卷配置",
    "6.6.1 通过 StorageClass 资源定义可用存储类型",
    "6.6.2 请求持久卷声明中的存储类",
    "6.6.3 不指定存储类的动态配置",
    "6.7 本章小结",
  ],
} as const;
export function K8s06VolumesObjectLab() {
  return <OfficialKubernetesActionLab mode="object" {...meta} />;
}
export function K8s06VolumesReconcileLab() {
  return <OfficialKubernetesActionLab mode="reconcile" {...meta} />;
}
export function K8s06VolumesEvidenceLab() {
  return <OfficialKubernetesActionLab mode="evidence" {...meta} />;
}
