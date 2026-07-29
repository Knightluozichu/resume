"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "sdk-compatibility",
  title: "SDK版本与兼容性",
  task: "把 compileSdk、targetSdk、minSdk 与运行设备 API 的责任分开验证",
  owner: "构建配置、兼容库与运行时版本分支",
  state: "可编译 API、可安装范围、行为政策和回退路径",
  event: "在两个 API 级别安装并触发同一作弊提示",
  invariant: "版本判断围绕真实行为差异，不用编译成功代替运行兼容",
  fault: "调用高版本 API 却只检查 compileSdk，低版本设备启动即崩溃",
  evidence: "Gradle 配置、设备 API、分支日志、兼容测试和回退截图",
  concepts: [
    "7. Android SDK Versions and Compatibility",
    "Android SDK Versions",
    "Compatibility and Android Programming",
    "Using the Android Developer Documentation",
    "Challenge: Reporting the Device's Android Version",
    "Challenge: Limited Cheats",
  ],
  transitions: [
    {
      action: "冻结入口：7. Android SDK Versions and Compatibility",
      state:
        "记录构建配置、兼容库与运行时版本分支的初始可编译 API、可安装范围、行为政策和回退路径",
      evidence:
        "Gradle 配置、设备 API、分支日志、兼容测试和回退截图中的“7. Android SDK Versions and Compatibility”轨迹",
    },
    {
      action: "触发事件：Android SDK Versions",
      state:
        "以“在两个 API 级别安装并触发同一作弊提示”改变可编译 API、可安装范围、行为政策和回退路径",
      evidence:
        "Gradle 配置、设备 API、分支日志、兼容测试和回退截图中的“Android SDK Versions”轨迹",
    },
    {
      action: "提交状态：Compatibility and Android Programming",
      state: "只由构建配置、兼容库与运行时版本分支提交新状态",
      evidence:
        "Gradle 配置、设备 API、分支日志、兼容测试和回退截图中的“Compatibility and Android Programming”轨迹",
    },
    {
      action: "重建边界：Challenge: Reporting the Device's Android Version",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "Gradle 配置、设备 API、分支日志、兼容测试和回退截图中的“Challenge: Reporting the Device's Android Version”轨迹",
    },
    {
      action: "核对交付：Challenge: Limited Cheats",
      state: "以“版本判断围绕真实行为差异，不用编译成功代替运行兼容”判断通过",
      evidence: "Gradle 配置、设备 API、分支日志、兼容测试和回退截图",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“在两个 API 级别安装并触发同一作弊提示”",
      expected:
        "由构建配置、兼容库与运行时版本分支提交可编译 API、可安装范围、行为政策和回退路径，并持续满足“版本判断围绕真实行为差异，不用编译成功代替运行兼容”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“调用高版本 API 却只检查 compileSdk，低版本设备启动即崩溃”",
      expected:
        "找到首个状态分岔，撤销后以Gradle 配置、设备 API、分支日志、兼容测试和回退截图证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function SdkCompatibilityContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function SdkCompatibilityLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function SdkCompatibilityFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
