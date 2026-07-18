import { OfficialDdiaLab } from "./official-ddia-lab";

const config = {
  unitTitle: "第8章 分布式系统的麻烦",
  focus:
    "承认网络、时钟和进程只能提供不完整信息，用超时、仲裁与隔离令牌管理不确定性",
  invariant:
    "节点不把本地时间、沉默或单方观察误当全局事实，过期参与者不能破坏资源",
  artifact: "故障时间线、延迟分布、时钟误差、进程暂停实验与隔离验证",
  nodes: [
    "故障与部分失效",
    "云计算与超级计算",
    "不可靠的网络",
    "实践中的网络故障",
    "检测故障",
    "超时与无界延迟",
    "同步网络与异步网络",
    "不可靠的时钟",
    "单调时钟与时刻时钟",
    "时钟同步与准确性",
    "依赖同步时钟",
    "进程暂停",
    "知识、真相与谎言",
    "真相由多数定义",
    "拜占庭故障",
    "系统模型与现实",
    "小结",
  ],
};

export function Ddi08TroubleDistributedSystemsArchitectureLab() {
  return <OfficialDdiaLab {...config} mode="architecture" />;
}

export function Ddi08TroubleDistributedSystemsFailureLab() {
  return <OfficialDdiaLab {...config} mode="failure" />;
}

export function Ddi08TroubleDistributedSystemsEvidenceLab() {
  return <OfficialDdiaLab {...config} mode="evidence" />;
}
