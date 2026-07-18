import {
  HfjReferenceMapLab,
  HfjExecutionExperimentLab,
  HfjEvidenceLab,
} from "./official-hfj-lab";

const stages = ["声明合同", "预测结果", "编译运行", "注入边界", "解释证据"];

export function Hfj3e16SerializationIoMapLab() {
  return (
    <HfjReferenceMapLab
      title="第16章 保存对象与文本：序列化和文件 I/O · 对象/执行图"
      focus="在对象快照、文本协议与 NIO.2 路径操作之间选择，并用 try-with-resources 保证资源生命周期"
      stages={stages}
    />
  );
}

export function Hfj3e16SerializationIoExperimentLab() {
  return (
    <HfjExecutionExperimentLab
      title="第16章 保存对象与文本：序列化和文件 I/O · 执行实验"
      focus="持久化格式合同、往返测试与损坏输入恢复记录"
      stages={stages}
    />
  );
}

export function Hfj3e16SerializationIoEvidenceLab() {
  return (
    <HfjEvidenceLab
      title="第16章 保存对象与文本：序列化和文件 I/O · 失败证据"
      focus="把 Java 原生序列化当长期稳定协议，或关闭顺序错误造成资源泄漏和数据截断"
      stages={stages}
    />
  );
}
