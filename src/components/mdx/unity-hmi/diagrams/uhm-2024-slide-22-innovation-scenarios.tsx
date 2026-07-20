import { OfficialUnityHmiLab } from "./official-unity-hmi-lab";

const props = {
  "unitId": "uhm-2024-slide-22-innovation-scenarios",
  "title": "第22页 六大HMI创新场景",
  "concepts": [
    "3D车模",
    "转场特效",
    "车模调节",
    "车辆设置",
    "个性化涂装",
    "车轮状态展示",
    "车辆异常预警",
    "充电状态展示",
    "驾驶模式切换",
    "配置自动适配",
    "3D座舱",
    "一镜到底",
    "香氛特效",
    "按摩特效",
    "座椅维度控制",
    "空调特效展示",
    "车辆健康展示",
    "车窗状态展示",
    "灯光状态展示",
    "电动出风口调节",
    "地图导航",
    "节日运营",
    "POI定制",
    "组队出行",
    "3D地图定制",
    "环境数字孪生",
    "定制导航界面",
    "无极日夜切换",
    "无极天气切换",
    "目的地信息三维展示",
    "智能驾驶",
    "还原世界",
    "行车可视化",
    "泊车可视化",
    "决策透明化",
    "图像语义分割",
    "空间音频警示",
    "领航辅助驾驶",
    "ADAS模拟仿真",
    "ADAS宣传视频",
    "OS Innovation",
    "创新架构",
    "智能控件",
    "4D动态壁纸",
    "3D动态开场",
    "智能虚拟形象",
    "数字艺术模式",
    "3D音乐可视化",
    "跨应用一镜到底",
    "跨引擎一镜到底",
    "跨域创新",
    "AR HUD",
    "UI即内饰",
    "3D天际线",
    "座舱元宇宙",
    "手机即车机",
    "XR座舱体验",
    "3D情境交互",
    "沉浸视听体验",
    "游戏座舱体验"
  ],
  "chain": [
    "锁定原页",
    "拆分主张",
    "配置目标",
    "执行反例",
    "归档决定"
  ],
  "model": {
    "studio": "六类场景风险分级台",
    "boundary": "用户意图/车辆信号 → 场景逻辑 → 视觉音频 → 显示设备 → 安全兜底",
    "axisA": {
      "label": "场景族",
      "levels": [
        "车模/座舱",
        "地图/智驾",
        "OS/跨域"
      ]
    },
    "axisB": {
      "label": "驾驶风险",
      "levels": [
        "驻车",
        "行驶非关键",
        "行驶关键"
      ]
    },
    "fault": "用炫酷动效遮挡或延迟关键驾驶信息",
    "invariant": "60个场景逐项标注数据源、交互条件、显示设备、风险等级和失效表现",
    "probe": "scenario: intent+signals+display\nrisk: parked+noncritical+critical\nfaults: stale+missing+late",
    "signal": "信号时效、视觉优先级与降级效果",
    "artifact": "60场景安全验收矩阵",
    "trap": "创新清单表达可能性，不等于驾驶中可用或符合安全要求",
    "practiceMode": "design"
  }
} as const;

export function Uhm2024Slide22InnovationScenariosScopeLab() { return <OfficialUnityHmiLab {...props} view="scope" />; }
export function Uhm2024Slide22InnovationScenariosDecisionLab() { return <OfficialUnityHmiLab {...props} view="decision" />; }
export function Uhm2024Slide22InnovationScenariosRecoveryLab() { return <OfficialUnityHmiLab {...props} view="recovery" />; }

// 兼容整改前由全局MDX组件表公开的名称；v2正文不再使用这些模糊别名。
export const Uhm24Slide22InnovationScenariosMapLab = Uhm2024Slide22InnovationScenariosScopeLab;
export const Uhm24Slide22InnovationScenariosExperimentLab = Uhm2024Slide22InnovationScenariosDecisionLab;
export const Uhm24Slide22InnovationScenariosEvidenceLab = Uhm2024Slide22InnovationScenariosRecoveryLab;
