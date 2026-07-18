import {
  HfjReferenceMapLab,
  HfjExecutionExperimentLab,
  HfjEvidenceLab,
} from "./official-hfj-lab";

const stages = ["声明合同", "预测结果", "编译运行", "注入边界", "解释证据"];

export function Hfj3e15SwingMapLab() {
  return (
    <HfjReferenceMapLab
      title="第15章 练好 Swing：使用 Swing · 对象/执行图"
      focus="用组件树和布局管理器表达自适应约束，组合 BeatBox 界面而不依赖脆弱绝对坐标"
      stages={stages}
    />
  );
}

export function Hfj3e15SwingExperimentLab() {
  return (
    <HfjExecutionExperimentLab
      title="第15章 练好 Swing：使用 Swing · 执行实验"
      focus="组件树、三大布局对照与窗口缩放验收"
      stages={stages}
    />
  );
}

export function Hfj3e15SwingEvidenceLab() {
  return (
    <HfjEvidenceLab
      title="第15章 练好 Swing：使用 Swing · 失败证据"
      focus="使用 null layout 固定像素位置，或忽略嵌套容器对尺寸协商的影响"
      stages={stages}
    />
  );
}
