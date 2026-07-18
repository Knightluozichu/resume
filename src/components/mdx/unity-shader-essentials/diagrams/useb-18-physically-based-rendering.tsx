import { UnityShaderBookLab, type ShaderSnapshot } from "./official-lab";

const SNAPSHOTS = [
  {
    "label": "输入",
    "stage": "基于物理的着色",
    "action": "固定场景、网格、材质、相机、光照与平台",
    "evidence": "保存版本和参数快照",
    "warning": "在伽马空间中直接做光照与混合，再通过调材质数值弥补，换环境后外观立刻崩坏。"
  },
  {
    "label": "顶点",
    "stage": "微表面模型",
    "action": "检查属性、坐标空间和插值器",
    "evidence": "输出位置、法线或UV调试视图",
    "warning": "所有向量必须标注空间与归一化状态。"
  },
  {
    "label": "片元",
    "stage": "金属度",
    "action": "计算纹理、光照或屏幕效果",
    "evidence": "逐项关闭贡献并比较参考图",
    "warning": "候选颜色仍可能被后续测试拒绝。"
  },
  {
    "label": "合并",
    "stage": "粗糙度",
    "action": "核对Pass、队列、深度与混合",
    "evidence": "保存Frame Debugger事件",
    "warning": "渲染状态错误常伪装成公式错误。"
  },
  {
    "label": "验收",
    "stage": "线性空间",
    "action": "比较画面、状态、数值和性能",
    "evidence": "保存A/B图、GPU捕获和反例",
    "warning": "在伽马空间中直接做光照与混合，再通过调材质数值弥补，换环境后外观立刻崩坏。"
  }
] as const satisfies ReadonlyArray<ShaderSnapshot>;

export function UsebPhysicallyBasedRenderingPipelineLab() { return <UnityShaderBookLab title="第18章 基于物理的渲染：数据流" caption="从输入属性追踪到帧缓冲，明确每个阶段和空间。" mode="pbr" snapshots={SNAPSHOTS} initial={0} />; }
export function UsebPhysicallyBasedRenderingCompareLab() { return <UnityShaderBookLab title="第18章 基于物理的渲染：A/B实验" caption="调整参数并逐项打开贡献，观察画面和状态变化。" mode="pbr" snapshots={SNAPSHOTS} initial={2} />; }
export function UsebPhysicallyBasedRenderingEvidenceLab() { return <UnityShaderBookLab title="第18章 基于物理的渲染：验收证书" caption="保存参考图、Pass、缓冲与性能，重放失败样例。" mode="pbr" snapshots={SNAPSHOTS} initial={4} />; }
