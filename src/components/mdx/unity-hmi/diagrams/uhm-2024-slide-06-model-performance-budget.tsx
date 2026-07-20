import { OfficialUnityHmiLab } from "./official-unity-hmi-lab";

const props = {
  "unitId": "uhm-2024-slide-06-model-performance-budget",
  "title": "第6页 模型预算与性能优化",
  "concepts": [
    "8155与30帧基线",
    "中控15.6英寸2K屏",
    "仪表12.3英寸720P",
    "HUD、后排屏、换肤、扶手屏与吸顶屏",
    "宣传与高精素材：内饰60至120万、外饰60至100万三角面",
    "中控内外切换：内饰18至20万、外饰8至15万三角面",
    "中控外饰车型：内饰1至2万、外饰8至10万三角面",
    "ADAS可视化、SR与EID：内饰1至2万、外饰4至6万三角面",
    "仪表或中控车控：内饰3至5千、外饰1.3至1.5万三角面",
    "仪表、中控或HUD图标：内饰0至1千、外饰1至3千三角面",
    "自动化减面工具",
    "贴图绘制与模型减面",
    "无3D要求时评估2D贴图",
    "CPU性能分析工具",
    "GPU性能分析工具",
    "性能龙头与瓶颈定位",
    "渲染流程分析",
    "选择正确的渲染管线URP",
    "先优化思路再优化代码",
    "先熟悉模型与程序具体实现",
    "先优化部分实现再优化整体结构",
    "先优化小细节再优化大结构",
    "先优化浅表问题再优化深层问题",
    "先优化资源设置再优化代码实现",
    "先优化逻辑再优化算法",
    "64类优化点"
  ],
  "chain": [
    "锁定原页",
    "拆分主张",
    "配置目标",
    "执行反例",
    "归档决定"
  ],
  "model": {
    "studio": "8155场景预算台",
    "boundary": "屏幕与场景 → 模型/材质 → CPU/GPU/带宽 → P95/P99帧时",
    "axisA": {
      "label": "场景复杂度",
      "levels": [
        "图标",
        "车控模型",
        "高精展示"
      ]
    },
    "axisB": {
      "label": "验证设备",
      "levels": [
        "编辑器",
        "开发板",
        "目标车"
      ]
    },
    "fault": "只改三角面数量，用平均FPS宣布优化完成",
    "invariant": "固定8155示例配置与视觉验收后，CPU、GPU、内存、带宽和长尾同时不过界",
    "probe": "target_fps: 30\nframe_budget_ms: 33.3\ncapture: target-player-profiler+frame-debugger\npercentiles: [p50,p95,p99]",
    "signal": "主/渲染线程、GPU、峰值内存与画质差异",
    "artifact": "目标机预算与捕获包",
    "trap": "演讲的三角面建议是起点，不是脱离分辨率与材质的通用阈值",
    "practiceMode": "simulation"
  }
} as const;

export function Uhm2024Slide06ModelPerformanceBudgetScopeLab() { return <OfficialUnityHmiLab {...props} view="scope" />; }
export function Uhm2024Slide06ModelPerformanceBudgetDecisionLab() { return <OfficialUnityHmiLab {...props} view="decision" />; }
export function Uhm2024Slide06ModelPerformanceBudgetRecoveryLab() { return <OfficialUnityHmiLab {...props} view="recovery" />; }

// 兼容整改前由全局MDX组件表公开的名称；v2正文不再使用这些模糊别名。
export const Uhm24Slide06ModelPerformanceBudgetMapLab = Uhm2024Slide06ModelPerformanceBudgetScopeLab;
export const Uhm24Slide06ModelPerformanceBudgetExperimentLab = Uhm2024Slide06ModelPerformanceBudgetDecisionLab;
export const Uhm24Slide06ModelPerformanceBudgetEvidenceLab = Uhm2024Slide06ModelPerformanceBudgetRecoveryLab;
