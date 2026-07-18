import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "ForwardBase",
    "action": "固定Unity版本、场景、材质和资源",
    "evidence": "保存资源哈希与参数",
    "warning": "在ForwardAdd里重复环境光或不设加法混合，灯越多画面越发白且无法从最终图判断是哪一Pass出错。"
  },
  {
    "label": "结构",
    "stage": "ForwardAdd",
    "action": "检查SubShader、Pass、标签和空间",
    "evidence": "显示阶段输入与中间值",
    "warning": "先确认实际执行路径，再解释最终颜色。"
  },
  {
    "label": "计算",
    "stage": "衰减",
    "action": "逐项打开本章公式或效果",
    "evidence": "保存正常图与差分图",
    "warning": "所有方向、深度和颜色都要标注空间与范围。"
  },
  {
    "label": "状态",
    "stage": "多Pass累积",
    "action": "核对深度、模板、混合和目标",
    "evidence": "保存Frame Debugger与GPU事件",
    "warning": "Shader代码不能独自决定全部渲染状态。"
  },
  {
    "label": "验收",
    "stage": "像素灯预算",
    "action": "重放正确例、边界例和失败例",
    "evidence": "记录CPU/GPU时间与画质",
    "warning": "在ForwardAdd里重复环境光或不设加法混合，灯越多画面越发白且无法从最终图判断是哪一Pass出错。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Usl07ForwardPathPipelineLab(){return <UnityShaderLab title="第7章 Forward渲染路径：执行链" mode="lighting" snapshots={SNAPSHOTS} initial={0}/>;}
export function Usl07ForwardPathCompareLab(){return <UnityShaderLab title="第7章 Forward渲染路径：对照实验" mode="lighting" snapshots={SNAPSHOTS} initial={2}/>;}
export function Usl07ForwardPathEvidenceLab(){return <UnityShaderLab title="第7章 Forward渲染路径：验收证书" mode="lighting" snapshots={SNAPSHOTS} initial={4}/>;}
