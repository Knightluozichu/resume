import { UnityShaderBookLab, type ShaderSnapshot } from "./official-lab";

const SNAPSHOTS = [
  {
    "label": "输入",
    "stage": "立方体纹理",
    "action": "固定场景、网格、材质、相机、光照与平台",
    "evidence": "保存版本和参数快照",
    "warning": "把环境立方体纹理当真实镜面反射，近处物体没有视差却仍声称结果物理正确。"
  },
  {
    "label": "顶点",
    "stage": "环境映射",
    "action": "检查属性、坐标空间和插值器",
    "evidence": "输出位置、法线或UV调试视图",
    "warning": "所有向量必须标注空间与归一化状态。"
  },
  {
    "label": "片元",
    "stage": "菲涅尔项",
    "action": "计算纹理、光照或屏幕效果",
    "evidence": "逐项关闭贡献并比较参考图",
    "warning": "候选颜色仍可能被后续测试拒绝。"
  },
  {
    "label": "合并",
    "stage": "渲染纹理",
    "action": "核对Pass、队列、深度与混合",
    "evidence": "保存Frame Debugger事件",
    "warning": "渲染状态错误常伪装成公式错误。"
  },
  {
    "label": "验收",
    "stage": "程序纹理",
    "action": "比较画面、状态、数值和性能",
    "evidence": "保存A/B图、GPU捕获和反例",
    "warning": "把环境立方体纹理当真实镜面反射，近处物体没有视差却仍声称结果物理正确。"
  }
] as const satisfies ReadonlyArray<ShaderSnapshot>;

export function UsebAdvancedTexturesPipelineLab() { return <UnityShaderBookLab title="第10章 高级纹理：数据流" caption="从输入属性追踪到帧缓冲，明确每个阶段和空间。" mode="texture" snapshots={SNAPSHOTS} initial={0} />; }
export function UsebAdvancedTexturesCompareLab() { return <UnityShaderBookLab title="第10章 高级纹理：A/B实验" caption="调整参数并逐项打开贡献，观察画面和状态变化。" mode="texture" snapshots={SNAPSHOTS} initial={2} />; }
export function UsebAdvancedTexturesEvidenceLab() { return <UnityShaderBookLab title="第10章 高级纹理：验收证书" caption="保存参考图、Pass、缓冲与性能，重放失败样例。" mode="texture" snapshots={SNAPSHOTS} initial={4} />; }
