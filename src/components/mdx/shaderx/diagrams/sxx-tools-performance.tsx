import { ShaderXSeriesLab, type ShaderXSnapshot } from "./official-series-lab";

const SNAPSHOTS=[
  {
    "label": "身份",
    "stage": "原篇身份与问题",
    "action": "固定8册中的卷号、篇名和19篇唯一归属",
    "evidence": "authorized PDF / official TOC + article id",
    "warning": "根据源代码行数猜成本，没有查看生成指令、寄存器、占用率和实际GPU捕获。"
  },
  {
    "label": "模型",
    "stage": "编译证据",
    "action": "提取输入、输出、公式、数据依赖和精度",
    "evidence": "invariant + producer-consumer graph",
    "warning": "现代实现必须明确保持、近似或放弃了哪条关系。"
  },
  {
    "label": "迁移",
    "stage": "可控变量",
    "action": "建立历史载体、CPU参考和现代GPU双路径",
    "evidence": "reference + translated implementation",
    "warning": "API名称相似不代表数据顺序、精度和同步等价。"
  },
  {
    "label": "捕获",
    "stage": "最小重放",
    "action": "保存中间缓冲、图像、数值和GPU事件",
    "evidence": "buffers + diff + GPU capture",
    "warning": "单张最终截图无法定位错误来自哪一个阶段。"
  },
  {
    "label": "验收",
    "stage": "性能证书",
    "action": "重放正常、边界、失败和性能条件",
    "evidence": "failure replay + target-device metrics",
    "warning": "微基准变快就宣布成功，完整帧因带宽、同步或CPU提交反而更慢。"
  }
] as const satisfies ReadonlyArray<ShaderXSnapshot>;

export function SxxToolsPerformanceMapLab(){return <ShaderXSeriesLab title="工具链、调试与性能工程：19篇复现" mode="map" snapshots={SNAPSHOTS} initial={0}/>;}
export function SxxToolsPerformanceExperimentLab(){return <ShaderXSeriesLab title="工具链、调试与性能工程：19篇复现" mode="experiment" snapshots={SNAPSHOTS} initial={2}/>;}
export function SxxToolsPerformanceEvidenceLab(){return <ShaderXSeriesLab title="工具链、调试与性能工程：19篇复现" mode="evidence" snapshots={SNAPSHOTS} initial={4}/>;}
