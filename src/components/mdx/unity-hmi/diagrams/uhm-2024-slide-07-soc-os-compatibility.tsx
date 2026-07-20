import { OfficialUnityHmiLab } from "./official-unity-hmi-lab";

const props = {
  "unitId": "uhm-2024-slide-07-soc-os-compatibility",
  "title": "第7页 主流SoC与操作系统适配",
  "concepts": [
    "高通SA820A、SA8155、SA8195、SA8255与SA8295",
    "芯驰X9系列",
    "恩智浦i.MX8、i.MX8.5与i.MX10",
    "英伟达Parker、Xavier、Jetson、Orin与Thor",
    "英特尔NUC、A39与Tegra系列",
    "芯擎、联发科与瑞萨等芯片平台",
    "Linux信息娱乐与仪表",
    "QNX信息娱乐与仪表",
    "Android车载信息娱乐",
    "AliOS",
    "MBOS",
    "FlymeOS",
    "主流SoC与操作系统组合验收"
  ],
  "chain": [
    "锁定原页",
    "拆分主张",
    "配置目标",
    "执行反例",
    "归档决定"
  ],
  "model": {
    "studio": "SoC—OS组合验收台",
    "boundary": "SoC步进 → BSP/驱动 → OS镜像 → 图形API → Unity运行时",
    "axisA": {
      "label": "平台组合",
      "levels": [
        "单SoC",
        "同SoC多OS",
        "跨SoC迁移"
      ]
    },
    "axisB": {
      "label": "测试阶段",
      "levels": [
        "启动",
        "压力",
        "恢复"
      ]
    },
    "fault": "只看到芯片名和OS名都在列表中就宣称组合受支持",
    "invariant": "每个组合使用供应商确认的版本坐标，并完成启动、显示、输入、压力和恢复",
    "probe": "platform_id: soc-revision+bsp+driver+os-image\ngraphics_api: GLES-or-Vulkan\nvalidation: boot+render+input+suspend",
    "signal": "组合通过率与首个失败层",
    "artifact": "平台兼容矩阵",
    "trap": "两个分别受支持的名词不自动组成受支持配置",
    "practiceMode": "diagnosis"
  }
} as const;

export function Uhm2024Slide07SocOsCompatibilityScopeLab() { return <OfficialUnityHmiLab {...props} view="scope" />; }
export function Uhm2024Slide07SocOsCompatibilityDecisionLab() { return <OfficialUnityHmiLab {...props} view="decision" />; }
export function Uhm2024Slide07SocOsCompatibilityRecoveryLab() { return <OfficialUnityHmiLab {...props} view="recovery" />; }

// 兼容整改前由全局MDX组件表公开的名称；v2正文不再使用这些模糊别名。
export const Uhm24Slide07SocOsCompatibilityMapLab = Uhm2024Slide07SocOsCompatibilityScopeLab;
export const Uhm24Slide07SocOsCompatibilityExperimentLab = Uhm2024Slide07SocOsCompatibilityDecisionLab;
export const Uhm24Slide07SocOsCompatibilityEvidenceLab = Uhm2024Slide07SocOsCompatibilityRecoveryLab;
