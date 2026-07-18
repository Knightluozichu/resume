import {
  HfjReferenceMapLab,
  HfjExecutionExperimentLab,
  HfjEvidenceLab,
} from "./official-hfj-lab";

const stages = ["声明合同", "预测结果", "编译运行", "注入边界", "解释证据"];

export function Hfj3eAppendixAFinalCodeKitchenMapLab() {
  return (
    <HfjReferenceMapLab
      title="附录A 最终代码厨房 · 对象/执行图"
      focus="把 GUI、事件、网络、线程与持久化整合为可复现 BeatBox 客户端/服务器，并验证关闭路径"
      stages={stages}
    />
  );
}

export function Hfj3eAppendixAFinalCodeKitchenExperimentLab() {
  return (
    <HfjExecutionExperimentLab
      title="附录A 最终代码厨房 · 执行实验"
      focus="最终客户端、服务器、启动说明与端到端验收"
      stages={stages}
    />
  );
}

export function Hfj3eAppendixAFinalCodeKitchenEvidenceLab() {
  return (
    <HfjEvidenceLab
      title="附录A 最终代码厨房 · 失败证据"
      focus="只提交能演示的 happy path，缺少断线、重复消息、资源释放和重启测试"
      stages={stages}
    />
  );
}
