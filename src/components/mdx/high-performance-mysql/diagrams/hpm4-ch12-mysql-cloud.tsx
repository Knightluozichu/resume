import { OfficialHighPerformanceMysqlLab } from "./official-high-performance-mysql-lab";

export function Hpm4Ch12MysqlCloudSloLab() {
  return (
    <OfficialHighPerformanceMysqlLab
      mode="slo"
      unitTitle="第12章 云端的MySQL"
      focus="比较托管服务、Aurora、Cloud SQL与自管虚拟机的责任、限制和成本"
      invariant="SLO、备份、故障切换、版本、参数与数据出口责任都有明确所有者和验证方法"
      artifact="云责任矩阵、产品能力对照、成本模型和区域故障演练"
      nodes={[
        "12.1 托管MySQL",
        "12.1.1 Amazon Aurora for MySQL",
        "12.1.2 GCP Cloud SQL",
        "12.2 虚拟机上的MySQL",
        "12.2.1 云上机器类型",
        "12.2.2 选择正确的机器类型",
        "12.2.3 选择正确的磁盘类型",
        "12.2.4 额外建议",
        "12.3 小结",
      ]}
    />
  );
}

export function Hpm4Ch12MysqlCloudCapacityLab() {
  return (
    <OfficialHighPerformanceMysqlLab
      mode="capacity"
      unitTitle="第12章 云端的MySQL"
      focus="比较托管服务、Aurora、Cloud SQL与自管虚拟机的责任、限制和成本"
      invariant="SLO、备份、故障切换、版本、参数与数据出口责任都有明确所有者和验证方法"
      artifact="云责任矩阵、产品能力对照、成本模型和区域故障演练"
      nodes={[
        "12.1 托管MySQL",
        "12.1.1 Amazon Aurora for MySQL",
        "12.1.2 GCP Cloud SQL",
        "12.2 虚拟机上的MySQL",
        "12.2.1 云上机器类型",
        "12.2.2 选择正确的机器类型",
        "12.2.3 选择正确的磁盘类型",
        "12.2.4 额外建议",
        "12.3 小结",
      ]}
    />
  );
}

export function Hpm4Ch12MysqlCloudEvidenceLab() {
  return (
    <OfficialHighPerformanceMysqlLab
      mode="evidence"
      unitTitle="第12章 云端的MySQL"
      focus="比较托管服务、Aurora、Cloud SQL与自管虚拟机的责任、限制和成本"
      invariant="SLO、备份、故障切换、版本、参数与数据出口责任都有明确所有者和验证方法"
      artifact="云责任矩阵、产品能力对照、成本模型和区域故障演练"
      nodes={[
        "12.1 托管MySQL",
        "12.1.1 Amazon Aurora for MySQL",
        "12.1.2 GCP Cloud SQL",
        "12.2 虚拟机上的MySQL",
        "12.2.1 云上机器类型",
        "12.2.2 选择正确的机器类型",
        "12.2.3 选择正确的磁盘类型",
        "12.2.4 额外建议",
        "12.3 小结",
      ]}
    />
  );
}
