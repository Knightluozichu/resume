import { OfficialSiaLab } from "./official-sia6-lab";

const props = {
  "unitId": "sia-6e-17-monitoring-with-jmx",
  "title": "第17章 使用JMX监控Spring",
  "concepts": [
    "17 Monitoring Spring with JMX",
    "17.1 Working with Actuator MBeans",
    "17.2 Creating your own MBeans",
    "17.3 Sending notifications",
    "Summary"
  ],
  "chain": [
    "冻结输入与版本",
    "解释容器决策",
    "执行边界合同",
    "注入失败与恢复",
    "保存发布证据"
  ],
  "model": {
    "studio": "MBean属性与通知台",
    "boundary": "managed resource → MBeanServer → client/notification",
    "axisA": {
      "label": "管理操作",
      "levels": [
        "读取",
        "写入",
        "调用"
      ]
    },
    "axisB": {
      "label": "监听状态",
      "levels": [
        "连接",
        "断开",
        "重连"
      ]
    },
    "fault": "把危险业务操作暴露为无权限MBean，或通知重连后重复注册",
    "invariant": "管理接口最小化且受保护，属性、操作和通知能够审计与去重",
    "signal": "ObjectName、通知序号与权限结果",
    "practiceMode": "code",
    "metric": "MBean属性与通知台合同命中率",
    "risk": "监听状态暴露风险",
    "task": "区分Actuator MBean、自定义管理操作、属性和通知，并控制远程JMX攻击面；仅改变一项条件并保存初始、变化、故障、恢复和复位证据。",
    "artifact": "MBean对象模型、操作权限表、通知丢失实验和远程连接安全清单"
  }
} as const;

export function Sia617MonitoringWithJmxMapLab() { return <OfficialSiaLab {...props} view="map" />; }
export function Sia617MonitoringWithJmxExperimentLab() { return <OfficialSiaLab {...props} view="experiment" />; }
export function Sia617MonitoringWithJmxEvidenceLab() { return <OfficialSiaLab {...props} view="evidence" />; }
