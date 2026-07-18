import { ShaderXSeriesLab, type ShaderXSnapshot } from "./official-series-lab";

const SNAPSHOTS=[
  {
    "label": "身份",
    "stage": "原篇身份与问题",
    "action": "固定8册中的卷号、篇名和28篇唯一归属",
    "evidence": "authorized PDF / official TOC + article id",
    "warning": "把整体变亮当作间接光正确，没有检查漏光、遮挡和能量来源。"
  },
  {
    "label": "模型",
    "stage": "光输运状态",
    "action": "提取输入、输出、公式、数据依赖和精度",
    "evidence": "invariant + producer-consumer graph",
    "warning": "现代实现必须明确保持、近似或放弃了哪条关系。"
  },
  {
    "label": "迁移",
    "stage": "基函数投影",
    "action": "建立历史载体、CPU参考和现代GPU双路径",
    "evidence": "reference + translated implementation",
    "warning": "API名称相似不代表数据顺序、精度和同步等价。"
  },
  {
    "label": "捕获",
    "stage": "漏光边界",
    "action": "保存中间缓冲、图像、数值和GPU事件",
    "evidence": "buffers + diff + GPU capture",
    "warning": "单张最终截图无法定位错误来自哪一个阶段。"
  },
  {
    "label": "验收",
    "stage": "光输运证书",
    "action": "重放正常、边界、失败和性能条件",
    "evidence": "failure replay + target-device metrics",
    "warning": "只在静态截图比较AO或GI，没有检查相机运动和动态物体的时间稳定性。"
  }
] as const satisfies ReadonlyArray<ShaderXSnapshot>;

export function SxxLightingGiMapLab(){return <ShaderXSeriesLab title="直接光照、全局光照与环境遮蔽：28篇复现" mode="map" snapshots={SNAPSHOTS} initial={0}/>;}
export function SxxLightingGiExperimentLab(){return <ShaderXSeriesLab title="直接光照、全局光照与环境遮蔽：28篇复现" mode="experiment" snapshots={SNAPSHOTS} initial={2}/>;}
export function SxxLightingGiEvidenceLab(){return <ShaderXSeriesLab title="直接光照、全局光照与环境遮蔽：28篇复现" mode="evidence" snapshots={SNAPSHOTS} initial={4}/>;}
