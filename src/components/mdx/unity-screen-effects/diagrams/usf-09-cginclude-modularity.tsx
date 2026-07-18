import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "CgInclude",
    "action": "固定Unity版本、场景、材质和资源",
    "evidence": "资源哈希与参数",
    "warning": "包含文件直接读取调用方未声明的全局变量，某些Shader碰巧可编译，另一些因命名或顺序失败。"
  },
  {
    "label": "结构",
    "stage": "内置包含文件",
    "action": "核对属性、空间、Pass和脚本绑定",
    "evidence": "中间值调试图",
    "warning": "先确认实际执行链，再解释最终颜色。"
  },
  {
    "label": "计算",
    "stage": "自定义光照库",
    "action": "逐项打开公式与效果并保存A/B图",
    "evidence": "源图与候选图",
    "warning": "先确认实际执行链，再解释最终颜色。"
  },
  {
    "label": "状态",
    "stage": "宏开关",
    "action": "核对深度、混合、目标和执行顺序",
    "evidence": "Frame Debugger与GPU事件",
    "warning": "先确认实际执行链，再解释最终颜色。"
  },
  {
    "label": "验收",
    "stage": "依赖契约",
    "action": "重放正常例、边界例和失败例",
    "evidence": "CPU/GPU时间与画质差分",
    "warning": "包含文件直接读取调用方未声明的全局变量，某些Shader碰巧可编译，另一些因命名或顺序失败。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Usf09CgincludeModularityPipelineLab(){return <UnityShaderLab title="第9章 使用CgInclude文件让着色器模块化：执行链" mode="pipeline" snapshots={SNAPSHOTS} initial={0}/>;}
export function Usf09CgincludeModularityCompareLab(){return <UnityShaderLab title="第9章 使用CgInclude文件让着色器模块化：对照实验" mode="pipeline" snapshots={SNAPSHOTS} initial={2}/>;}
export function Usf09CgincludeModularityEvidenceLab(){return <UnityShaderLab title="第9章 使用CgInclude文件让着色器模块化：验收证书" mode="pipeline" snapshots={SNAPSHOTS} initial={4}/>;}
