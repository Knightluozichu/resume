"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "audio-unit-testing",
  title: "音频播放与单元测试",
  task: "把 SoundPool 加载、播放、释放与可测试回调分离",
  owner: "BeatBox、SoundPool 与测试替身",
  state: "sound ID、加载完成、播放请求、生命周期和释放状态",
  event: "加载资产、点击播放、旋转、重复点击与退出",
  invariant: "未加载完成不播放，释放后不再接收回调，同一事件不重复发声",
  fault: "旋转后两个 SoundPool 同时存活，同一次点击播放两遍",
  evidence: "单元测试、load 回调、stream ID、实例计数和释放日志",
  concepts: [
    "20. Unit Testing and Audio Playback",
    "Creating a SoundPool",
    "Accessing Assets",
    "Loading Sounds",
    "Playing Sounds",
    "Test Dependencies",
    "Creating a Test Class",
    "Setting Up Your Test",
    "Writing Tests",
    "Data Binding Callbacks",
    "Unloading Sounds",
    "For the More Curious: Integration Testing",
    "For the More Curious: Mocks and Testing",
    "Challenge: Playback Speed Control",
    "Challenge: Play Sound Across Rotation",
  ],
  transitions: [
    {
      action: "冻结入口：20. Unit Testing and Audio Playback",
      state:
        "记录BeatBox、SoundPool 与测试替身的初始sound ID、加载完成、播放请求、生命周期和释放状态",
      evidence:
        "单元测试、load 回调、stream ID、实例计数和释放日志中的“20. Unit Testing and Audio Playback”轨迹",
    },
    {
      action: "触发事件：Loading Sounds",
      state:
        "以“加载资产、点击播放、旋转、重复点击与退出”改变sound ID、加载完成、播放请求、生命周期和释放状态",
      evidence:
        "单元测试、load 回调、stream ID、实例计数和释放日志中的“Loading Sounds”轨迹",
    },
    {
      action: "提交状态：Setting Up Your Test",
      state: "只由BeatBox、SoundPool 与测试替身提交新状态",
      evidence:
        "单元测试、load 回调、stream ID、实例计数和释放日志中的“Setting Up Your Test”轨迹",
    },
    {
      action: "重建边界：Unloading Sounds",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "单元测试、load 回调、stream ID、实例计数和释放日志中的“Unloading Sounds”轨迹",
    },
    {
      action: "核对交付：Challenge: Play Sound Across Rotation",
      state:
        "以“未加载完成不播放，释放后不再接收回调，同一事件不重复发声”判断通过",
      evidence: "单元测试、load 回调、stream ID、实例计数和释放日志",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“加载资产、点击播放、旋转、重复点击与退出”",
      expected:
        "由BeatBox、SoundPool 与测试替身提交sound ID、加载完成、播放请求、生命周期和释放状态，并持续满足“未加载完成不播放，释放后不再接收回调，同一事件不重复发声”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“旋转后两个 SoundPool 同时存活，同一次点击播放两遍”",
      expected:
        "找到首个状态分岔，撤销后以单元测试、load 回调、stream ID、实例计数和释放日志证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function AudioUnitTestingContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function AudioUnitTestingLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function AudioUnitTestingFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
