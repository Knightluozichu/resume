"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "android-mvc",
  title: "Android与MVC设计模式",
  task: "让 GeoQuiz 的题目事实、界面表示和用户事件分别由 model、view 与 controller 承担",
  owner: "QuizViewModel 与 Activity controller",
  state: "当前题号、答案事实、按钮可用性和反馈文本",
  event: "用户选择答案或切换上一题与下一题",
  invariant: "旋转和重复点击不能让题目事实与界面显示分叉",
  fault: "把答案和题号只存进 TextView，View 重建后 model 状态丢失",
  evidence: "用户事件序列、题目索引、model 快照与界面断言",
  concepts: [
    "2. Android and Model-View-Controller",
    "Creating a New Class",
    "Model-View-Controller and Android",
    "Updating the View Layer",
    "Updating the Controller Layer",
    "Adding an Icon",
    "Screen Pixel Densities",
    "Running on a Device",
    "Challenge: Add a Listener to the TextView",
    "Challenge: Add a Previous Button",
    "Challenge: From Button to ImageButton",
  ],
  transitions: [
    {
      action: "冻结入口：2. Android and Model-View-Controller",
      state:
        "记录QuizViewModel 与 Activity controller的初始当前题号、答案事实、按钮可用性和反馈文本",
      evidence:
        "用户事件序列、题目索引、model 快照与界面断言中的“2. Android and Model-View-Controller”轨迹",
    },
    {
      action: "触发事件：Model-View-Controller and Android",
      state:
        "以“用户选择答案或切换上一题与下一题”改变当前题号、答案事实、按钮可用性和反馈文本",
      evidence:
        "用户事件序列、题目索引、model 快照与界面断言中的“Model-View-Controller and Android”轨迹",
    },
    {
      action: "提交状态：Adding an Icon",
      state: "只由QuizViewModel 与 Activity controller提交新状态",
      evidence:
        "用户事件序列、题目索引、model 快照与界面断言中的“Adding an Icon”轨迹",
    },
    {
      action: "重建边界：Running on a Device",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "用户事件序列、题目索引、model 快照与界面断言中的“Running on a Device”轨迹",
    },
    {
      action: "核对交付：Challenge: From Button to ImageButton",
      state: "以“旋转和重复点击不能让题目事实与界面显示分叉”判断通过",
      evidence: "用户事件序列、题目索引、model 快照与界面断言",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“用户选择答案或切换上一题与下一题”",
      expected:
        "由QuizViewModel 与 Activity controller提交当前题号、答案事实、按钮可用性和反馈文本，并持续满足“旋转和重复点击不能让题目事实与界面显示分叉”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“把答案和题号只存进 TextView，View 重建后 model 状态丢失”",
      expected:
        "找到首个状态分岔，撤销后以用户事件序列、题目索引、model 快照与界面断言证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function AndroidMvcContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function AndroidMvcLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function AndroidMvcFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
