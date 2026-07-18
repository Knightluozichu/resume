import {
  HfjReferenceMapLab,
  HfjExecutionExperimentLab,
  HfjEvidenceLab,
} from "./official-hfj-lab";

const stages = ["声明合同", "预测结果", "编译运行", "注入边界", "解释证据"];

export function Hfj3e18ConcurrencyIssuesMapLab() {
  return (
    <HfjReferenceMapLab
      title="第18章 处理并发问题：竞态与不可变数据 · 对象/执行图"
      focus="识别复合操作的竞态，用正确锁、原子变量、不可变对象和线程安全集合建立 happens-before 证据"
      stages={stages}
    />
  );
}

export function Hfj3e18ConcurrencyIssuesExperimentLab() {
  return (
    <HfjExecutionExperimentLab
      title="第18章 处理并发问题：竞态与不可变数据 · 执行实验"
      focus="竞态时间线、锁对象清单与并发压力/死锁检测"
      stages={stages}
    />
  );
}

export function Hfj3e18ConcurrencyIssuesEvidenceLab() {
  return (
    <HfjEvidenceLab
      title="第18章 处理并发问题：竞态与不可变数据 · 失败证据"
      focus="只因一次运行正确就宣称线程安全，或给错误对象加锁造成检查与更新仍可穿插"
      stages={stages}
    />
  );
}
