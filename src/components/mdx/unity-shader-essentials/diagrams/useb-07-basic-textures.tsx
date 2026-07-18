import { UnityShaderBookLab, type ShaderSnapshot } from "./official-lab";

const SNAPSHOTS = [
  {
    "label": "输入",
    "stage": "纹理坐标",
    "action": "固定场景、网格、材质、相机、光照与平台",
    "evidence": "保存版本和参数快照",
    "warning": "把法线纹理按普通颜色纹理以sRGB读取，解码后的方向产生系统性偏差。"
  },
  {
    "label": "顶点",
    "stage": "采样器",
    "action": "检查属性、坐标空间和插值器",
    "evidence": "输出位置、法线或UV调试视图",
    "warning": "所有向量必须标注空间与归一化状态。"
  },
  {
    "label": "片元",
    "stage": "高度纹理",
    "action": "计算纹理、光照或屏幕效果",
    "evidence": "逐项关闭贡献并比较参考图",
    "warning": "候选颜色仍可能被后续测试拒绝。"
  },
  {
    "label": "合并",
    "stage": "切线空间法线",
    "action": "核对Pass、队列、深度与混合",
    "evidence": "保存Frame Debugger事件",
    "warning": "渲染状态错误常伪装成公式错误。"
  },
  {
    "label": "验收",
    "stage": "遮罩纹理",
    "action": "比较画面、状态、数值和性能",
    "evidence": "保存A/B图、GPU捕获和反例",
    "warning": "把法线纹理按普通颜色纹理以sRGB读取，解码后的方向产生系统性偏差。"
  }
] as const satisfies ReadonlyArray<ShaderSnapshot>;

export function UsebBasicTexturesPipelineLab() { return <UnityShaderBookLab title="第7章 基础纹理：数据流" caption="从输入属性追踪到帧缓冲，明确每个阶段和空间。" mode="texture" snapshots={SNAPSHOTS} initial={0} />; }
export function UsebBasicTexturesCompareLab() { return <UnityShaderBookLab title="第7章 基础纹理：A/B实验" caption="调整参数并逐项打开贡献，观察画面和状态变化。" mode="texture" snapshots={SNAPSHOTS} initial={2} />; }
export function UsebBasicTexturesEvidenceLab() { return <UnityShaderBookLab title="第7章 基础纹理：验收证书" caption="保存参考图、Pass、缓冲与性能，重放失败样例。" mode="texture" snapshots={SNAPSHOTS} initial={4} />; }
