"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "first-app",
  title: "Android开发初体验",
  task: "从源码、资源、清单和 Gradle 配置生成可安装并可重复启动的 GeoQuiz 首帧",
  owner: "Gradle variant 与 MainActivity",
  state: "资源 ID、组件声明、安装包和首帧 View 树",
  event: "点击 Run 后执行编译、打包、安装与 Activity 创建",
  invariant: "同一提交和依赖锁定后，干净构建产生同身份 APK 与同首帧断言",
  fault: "布局 XML 语法错误让 R 类生成失败，却继续使用旧 APK 截图验收",
  evidence: "构建日志、APK 哈希、安装记录、资源映射与首帧断言",
  concepts: [
    "1. Your First Android Application",
    "App Basics",
    "Creating an Android Project",
    "Navigating in Android Studio",
    "Laying Out the UI",
    "From Layout XML to View Objects",
    "Wiring Up Widgets",
    "Making Toasts",
    "Running on the Emulator",
    "For the More Curious: The Android Build Process",
    "Challenges",
    "Challenge: Customizing the Toast",
  ],
  transitions: [
    {
      action: "冻结入口：1. Your First Android Application",
      state:
        "记录Gradle variant 与 MainActivity的初始资源 ID、组件声明、安装包和首帧 View 树",
      evidence:
        "构建日志、APK 哈希、安装记录、资源映射与首帧断言中的“1. Your First Android Application”轨迹",
    },
    {
      action: "触发事件：Navigating in Android Studio",
      state:
        "以“点击 Run 后执行编译、打包、安装与 Activity 创建”改变资源 ID、组件声明、安装包和首帧 View 树",
      evidence:
        "构建日志、APK 哈希、安装记录、资源映射与首帧断言中的“Navigating in Android Studio”轨迹",
    },
    {
      action: "提交状态：From Layout XML to View Objects",
      state: "只由Gradle variant 与 MainActivity提交新状态",
      evidence:
        "构建日志、APK 哈希、安装记录、资源映射与首帧断言中的“From Layout XML to View Objects”轨迹",
    },
    {
      action: "重建边界：Running on the Emulator",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "构建日志、APK 哈希、安装记录、资源映射与首帧断言中的“Running on the Emulator”轨迹",
    },
    {
      action: "核对交付：Challenge: Customizing the Toast",
      state:
        "以“同一提交和依赖锁定后，干净构建产生同身份 APK 与同首帧断言”判断通过",
      evidence: "构建日志、APK 哈希、安装记录、资源映射与首帧断言",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“点击 Run 后执行编译、打包、安装与 Activity 创建”",
      expected:
        "由Gradle variant 与 MainActivity提交资源 ID、组件声明、安装包和首帧 View 树，并持续满足“同一提交和依赖锁定后，干净构建产生同身份 APK 与同首帧断言”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“布局 XML 语法错误让 R 类生成失败，却继续使用旧 APK 截图验收”",
      expected:
        "找到首个状态分岔，撤销后以构建日志、APK 哈希、安装记录、资源映射与首帧断言证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function FirstAppContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function FirstAppLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function FirstAppFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
