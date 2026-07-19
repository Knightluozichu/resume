import { OfficialSiaLab } from "./official-sia6-lab";

const props = {
  "unitId": "sia-6e-part-1-foundational-spring",
  "title": "Part 1 基础Spring",
  "concepts": [
    "Part 1. Foundational Spring",
    "Part 1 基础Spring：受控失败边界",
    "Part 1 基础Spring：恢复与发布证据"
  ],
  "chain": [
    "冻结输入与版本",
    "解释容器决策",
    "执行边界合同",
    "注入失败与恢复",
    "保存发布证据"
  ],
  "model": {
    "studio": "同步应用垂直切片台",
    "boundary": "HTTP → MVC/Security → Domain → Data",
    "axisA": {
      "label": "上下文范围",
      "levels": [
        "纯对象",
        "MVC切片",
        "完整应用"
      ]
    },
    "axisB": {
      "label": "依赖状态",
      "levels": [
        "正常",
        "慢响应",
        "不可用"
      ]
    },
    "fault": "扩大测试上下文却没有增加任何可观察合同",
    "invariant": "同步请求在一次受控提交内产生唯一、可授权且可回滚的领域结果",
    "signal": "请求关联ID与事务结果",
    "practiceMode": "design",
    "metric": "同步应用垂直切片台合同命中率",
    "risk": "依赖状态暴露风险",
    "task": "用一个持续演化的Taco Cloud应用建立容器、Web、数据、安全与配置的共同模型；仅改变一项条件并保存初始、变化、故障、恢复和复位证据。",
    "artifact": "基础应用上下文图、切片测试矩阵与配置优先级记录"
  }
} as const;

export function Sia6Part1FoundationalSpringMapLab() { return <OfficialSiaLab {...props} view="map" />; }
export function Sia6Part1FoundationalSpringExperimentLab() { return <OfficialSiaLab {...props} view="experiment" />; }
export function Sia6Part1FoundationalSpringEvidenceLab() { return <OfficialSiaLab {...props} view="evidence" />; }
