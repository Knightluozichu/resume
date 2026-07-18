"use client";

import { AndroidAdvancedDecodeLab } from "./official-android-advanced-decode-lab";

const config = {
  unitTitle: "第16章 绘制优化",
  focus:
    "先用绘制原理、Profile GPU Rendering、Systrace和Traceview定位瓶颈，再以布局工具、层级简化和过度绘制治理完成优化",
  nodes: [
    "16.1 绘制性能分析",
    "16.1.1 绘制原理",
    "16.1.2 Profile GPU Rendering",
    "16.1.3 Systrace",
    "16.1.4 Traceview",
    "16.2 布局优化",
    "16.2.1 布局优化工具",
    "16.2.2 布局优化方法",
    "16.2.3 避免GPU过度绘制",
    "16.3 本章小结",
  ],
  invariant:
    "优化前后使用同设备、同构建、同场景与同帧窗口，既报告CPU/UI线程阶段，也验证GPU柱状、层级和过度绘制改善且画面不变",
  failure:
    "凭主观顺滑或只看平均帧耗时会掩盖长尾卡顿；盲目减少View数量也可能增加measure复杂度、缓存失效或渲染错误",
  links: [
    {
      label: "帧模型",
      mechanism: "分解measure/layout/draw与合成",
      evidence: "单帧阶段时间",
    },
    {
      label: "GPU柱状",
      mechanism: "定位超过预算的连续帧",
      evidence: "分段柱状与场景",
    },
    {
      label: "系统追踪",
      mechanism: "关联UI、RenderThread和调度",
      evidence: "slice、阻塞和唤醒",
    },
    {
      label: "布局治理",
      mechanism: "减少无效层级与重复像素",
      evidence: "层级、区域和视觉回归",
    },
  ],
  gates: [
    "出版社目录与Android 8.0版本",
    "源码文件、符号与调用者",
    "进程、线程、Binder/JNI/加载边界",
    "状态转移、返回码与完成回调",
    "单变量失败、恢复与资源释放",
    "停止、回退、责任人与复核人",
  ],
} as const;

export function Aad816RenderingOptimizationTraceLab() {
  return (
    <AndroidAdvancedDecodeLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="trace"
    />
  );
}

export function Aad816RenderingOptimizationFaultLab() {
  return (
    <AndroidAdvancedDecodeLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="fault"
    />
  );
}

export function Aad816RenderingOptimizationEvidenceLab() {
  return (
    <AndroidAdvancedDecodeLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
