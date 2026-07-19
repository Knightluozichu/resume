import { OfficialJct25Studio } from "./official-jct-lab";

const props = {
  "unitId": "jct-14e-v2-12-advanced-swing-graphics",
  "title": "卷II 第12章 高级 Swing 与图形",
  "concepts": [
    "Chapter 12: Advanced Swing and Graphics",
    "12.1 Tables",
    "12.2 Working with Rows and Columns",
    "12.3 Cell Rendering and Editing",
    "12.4 Trees",
    "12.5 Advanced AWT",
    "12.6 Raster Images",
    "12.7 Printing"
  ],
  "stages": [
    "准备模型",
    "布局行列",
    "渲染编辑",
    "处理图像",
    "分页打印"
  ],
  "focuses": [
    "TableModel",
    "RowSorter",
    "Renderer",
    "TreeModel",
    "Raster",
    "Printable"
  ],
  "model": {
    "studio": "表格树与打印管线台",
    "axisA": {
      "label": "数据规模",
      "levels": [
        "百行",
        "万行",
        "百万像素"
      ]
    },
    "axisB": {
      "label": "渲染策略",
      "levels": [
        "每格分配",
        "复用Renderer",
        "虚拟化与缓存"
      ]
    },
    "outcomes": {
      "success": "渲染一致率",
      "risk": "内存与坐标风险",
      "evidence": "可重放证据"
    },
    "fault": "在renderer保存业务状态，或把视图行号直接当模型行号写回",
    "task": "排序表格后编辑选中行，并验证视图—模型索引、渲染复用和打印坐标",
    "invariant": "模型身份不随排序、渲染复用或打印坐标变化",
    "probe": "convertRowIndexToModel(viewRow)",
    "practiceMode": "simulation",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jct14eV212AdvancedSwingGraphicsMapLab() {
  return <OfficialJct25Studio {...props} mode="map" />;
}

export function Jct14eV212AdvancedSwingGraphicsExperimentLab() {
  return <OfficialJct25Studio {...props} mode="experiment" />;
}

export function Jct14eV212AdvancedSwingGraphicsEvidenceLab() {
  return <OfficialJct25Studio {...props} mode="evidence" />;
}
