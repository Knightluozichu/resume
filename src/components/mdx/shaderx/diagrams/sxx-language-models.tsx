import { ShaderXSeriesLab, type ShaderXSnapshot } from "./official-series-lab";

const SNAPSHOTS=[
  {
    "label": "身份",
    "stage": "原篇身份与问题",
    "action": "固定8册中的卷号、篇名和15篇唯一归属",
    "evidence": "authorized PDF / official TOC + article id",
    "warning": "只把旧汇编逐行翻译成HLSL，未核对插值、精度、常量布局和隐式状态。"
  },
  {
    "label": "模型",
    "stage": "阶段契约",
    "action": "提取输入、输出、公式、数据依赖和精度",
    "evidence": "invariant + producer-consumer graph",
    "warning": "现代实现必须明确保持、近似或放弃了哪条关系。"
  },
  {
    "label": "迁移",
    "stage": "语义映射",
    "action": "建立历史载体、CPU参考和现代GPU双路径",
    "evidence": "reference + translated implementation",
    "warning": "API名称相似不代表数据顺序、精度和同步等价。"
  },
  {
    "label": "捕获",
    "stage": "参考着色器",
    "action": "保存中间缓冲、图像、数值和GPU事件",
    "evidence": "buffers + diff + GPU capture",
    "warning": "单张最终截图无法定位错误来自哪一个阶段。"
  },
  {
    "label": "验收",
    "stage": "语言迁移证书",
    "action": "重放正常、边界、失败和性能条件",
    "evidence": "failure replay + target-device metrics",
    "warning": "用Shader Model版本推断设备能力，没有查看编译目标、扩展和生成指令。"
  }
] as const satisfies ReadonlyArray<ShaderXSnapshot>;

export function SxxLanguageModelsMapLab(){return <ShaderXSeriesLab title="语言、Shader Model 与可编程管线：15篇复现" mode="map" snapshots={SNAPSHOTS} initial={0}/>;}
export function SxxLanguageModelsExperimentLab(){return <ShaderXSeriesLab title="语言、Shader Model 与可编程管线：15篇复现" mode="experiment" snapshots={SNAPSHOTS} initial={2}/>;}
export function SxxLanguageModelsEvidenceLab(){return <ShaderXSeriesLab title="语言、Shader Model 与可编程管线：15篇复现" mode="evidence" snapshots={SNAPSHOTS} initial={4}/>;}
