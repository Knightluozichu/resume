import { OfficialSiaLab } from "./official-sia6-lab";

const props = {
  "unitId": "sia-6e-official-final-review",
  "title": "《Spring in Action（第6版）》全书总复习",
  "concepts": [
    "Part 1. Foundational Spring",
    "1 Getting started with Spring",
    "2 Developing web applications",
    "3 Working with data",
    "4 Working with nonrelational data",
    "5 Securing Spring",
    "6 Working with configuration properties",
    "Part 2. Integrated Spring",
    "7 Creating REST services",
    "8 Securing REST",
    "9 Sending messages asynchronously",
    "10 Integrating Spring",
    "Part 3. Reactive Spring",
    "11 Introducing Reactor",
    "12 Developing reactive APIs",
    "13 Persisting data reactively",
    "14 Working with RSocket",
    "Part 4. Deployed Spring",
    "15 Working with Spring Boot Actuator",
    "16 Administering Spring",
    "17 Monitoring Spring with JMX",
    "18 Deploying Spring",
    "Appendix. Bootstrapping Spring applications"
  ],
  "chain": [
    "冻结输入与版本",
    "解释容器决策",
    "执行边界合同",
    "注入失败与恢复",
    "保存发布证据"
  ],
  "model": {
    "studio": "全书故障答辩台",
    "boundary": "request/message → Spring boundary → state → operations → release",
    "axisA": {
      "label": "故障域",
      "levels": [
        "身份/配置",
        "数据/消息",
        "响应式/部署"
      ]
    },
    "axisB": {
      "label": "证据层",
      "levels": [
        "合同",
        "故障",
        "恢复"
      ]
    },
    "fault": "只展示最终演示，不保存第一处边界偏离和回滚证据",
    "invariant": "23个正式单元能沿同一业务旅程重放，任何失败都可定位并恢复",
    "signal": "全书证据包与发布判定",
    "practiceMode": "diagnosis",
    "metric": "全书故障答辩台合同命中率",
    "risk": "证据层暴露风险",
    "task": "用一次可部署订单系统答辩串联255个目录节点，并以故障注入证明边界；仅改变一项条件并保存初始、变化、故障、恢复和复位证据。",
    "artifact": "全书答辩包、故障时间线、版本迁移差异、复现脚本与整改记录"
  }
} as const;

export function Sia6OfficialFinalReviewMapLab() { return <OfficialSiaLab {...props} view="map" />; }
export function Sia6OfficialFinalReviewExperimentLab() { return <OfficialSiaLab {...props} view="experiment" />; }
export function Sia6OfficialFinalReviewEvidenceLab() { return <OfficialSiaLab {...props} view="evidence" />; }
