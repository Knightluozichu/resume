"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从一条可证伪的调用链开始",
    mechanism:
      "先预测：只用“Dalvik JIT、ART AOT”二分会遗漏Android 7/8的混合编译、配置文件和不同GC策略，也无法从日志诊断停顿。把预测写成入口、对象身份、进程/线程、状态和完成回调五列，再去读源码。若结果与预测不同，先修正模型，不要选择性截取调用栈。",
    failure:
      "若只背诵「从一条可证伪的调用链开始」的类名而不固定 Android 8.0 源码、进程线程、对象身份和完成回调，跨 Binder、JNI 或加载边界后就会把请求误判为结果。",
    evidence:
      "在固定 AOSP 8.0 标签上追踪「从一条可证伪的调用链开始」的入口与状态对象，用 PID/TID、源码符号、正常/单变量失败日志和最终系统状态交叉核对。",
  },
  {
    label: "核心词汇与版本门",
    mechanism:
      "以上词汇都固定在Android 8.0语义。在《第11章 Dalvik和ART》中，Android 7.0只在原书明确比较AMS家族时出现；Android 9以后反射/隐藏API限制、Android 10的ActivityTaskManager、现代Profiler/Perfetto等只能写进迁移备注，不能改写本页正式链路。",
    failure:
      "若只背诵「核心词汇与版本门」的类名而不固定 Android 8.0 源码、进程线程、对象身份和完成回调，跨 Binder、JNI 或加载边界后就会把请求误判为结果。",
    evidence:
      "在固定 AOSP 8.0 标签上追踪「核心词汇与版本门」的入口与状态对象，用 PID/TID、源码符号、正常/单变量失败日志和最终系统状态交叉核对。",
  },
  {
    label: "原书目录核对清单",
    mechanism:
      "本节把「原书目录核对清单」放回《第11章 Dalvik和ART》的输入、状态变化与输出路径中理解。",
    failure:
      "若只背诵「原书目录核对清单」的类名而不固定 Android 8.0 源码、进程线程、对象身份和完成回调，跨 Binder、JNI 或加载边界后就会把请求误判为结果。",
    evidence:
      "在固定 AOSP 8.0 标签上追踪「原书目录核对清单」的入口与状态对象，用 PID/TID、源码符号、正常/单变量失败日志和最终系统状态交叉核对。",
  },
];

export function Aad811DalvikArtDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第11章 Dalvik和ART：机制与证据"
      prompt="切换《第11章 Dalvik和ART》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第11章 Dalvik和ART》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function Aad811DalvikArtMechanismMap() {
  return (
    <ChapterMechanismMap title="第11章 Dalvik和ART：机制路径" stages={STAGES} />
  );
}

export function Aad811DalvikArtFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第11章 Dalvik和ART：失效与核验"
      stages={STAGES}
    />
  );
}
