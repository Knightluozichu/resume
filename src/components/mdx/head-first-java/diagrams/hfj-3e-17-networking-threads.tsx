import {
  HfjReferenceMapLab,
  HfjExecutionExperimentLab,
  HfjEvidenceLab,
} from "./official-hfj-lab";

const stages = ["声明合同", "预测结果", "编译运行", "注入边界", "解释证据"];

export function Hfj3e17NetworkingThreadsMapLab() {
  return (
    <HfjReferenceMapLab
      title="第17章 建立连接：网络与线程 · 对象/执行图"
      focus="用 Socket 文本协议连接客户端/服务器，以 Runnable 和执行器管理任务、线程池与关闭过程"
      stages={stages}
    />
  );
}

export function Hfj3e17NetworkingThreadsExperimentLab() {
  return (
    <HfjExecutionExperimentLab
      title="第17章 建立连接：网络与线程 · 执行实验"
      focus="聊天协议、双端时序图与线程池生命周期测试"
      stages={stages}
    />
  );
}

export function Hfj3e17NetworkingThreadsEvidenceLab() {
  return (
    <HfjEvidenceLab
      title="第17章 建立连接：网络与线程 · 失败证据"
      focus="把一次 read 当成完整消息，或直接创建无限线程且没有超时、背压和关闭合同"
      stages={stages}
    />
  );
}
