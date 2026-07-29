"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "search",
  title: "搜索",
  task: "把 SearchView 输入、提交、防抖、SharedPreferences 与网络结果竞争分开",
  owner: "查询状态所有者、偏好存储与 PhotoGallery Repository",
  state: "编辑文本、已提交查询、持久偏好、请求 ID 和结果",
  event: "输入、提交、清空、旋转、冷启动和旧响应返回",
  invariant: "轻量偏好只保存已确认查询，当前结果对应最新有效请求",
  fault: "每个字符都立即写偏好并发请求，旧响应覆盖新输入",
  evidence: "输入事件、提交时刻、preference 值、请求 ID 和结果断言",
  concepts: [
    "26. SearchView and SharedPreferences",
    "Searching Flickr",
    "Using SearchView",
    "Simple Persistence with SharedPreferences",
    "Polishing Your App",
    "Editing SharedPreferences with Android KTX",
    "Challenge: Polishing Your App Some More",
  ],
  transitions: [
    {
      action: "冻结入口：26. SearchView and SharedPreferences",
      state:
        "记录查询状态所有者、偏好存储与 PhotoGallery Repository的初始编辑文本、已提交查询、持久偏好、请求 ID 和结果",
      evidence:
        "输入事件、提交时刻、preference 值、请求 ID 和结果断言中的“26. SearchView and SharedPreferences”轨迹",
    },
    {
      action: "触发事件：Searching Flickr",
      state:
        "以“输入、提交、清空、旋转、冷启动和旧响应返回”改变编辑文本、已提交查询、持久偏好、请求 ID 和结果",
      evidence:
        "输入事件、提交时刻、preference 值、请求 ID 和结果断言中的“Searching Flickr”轨迹",
    },
    {
      action: "提交状态：Simple Persistence with SharedPreferences",
      state: "只由查询状态所有者、偏好存储与 PhotoGallery Repository提交新状态",
      evidence:
        "输入事件、提交时刻、preference 值、请求 ID 和结果断言中的“Simple Persistence with SharedPreferences”轨迹",
    },
    {
      action: "重建边界：Polishing Your App",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "输入事件、提交时刻、preference 值、请求 ID 和结果断言中的“Polishing Your App”轨迹",
    },
    {
      action: "核对交付：Challenge: Polishing Your App Some More",
      state: "以“轻量偏好只保存已确认查询，当前结果对应最新有效请求”判断通过",
      evidence: "输入事件、提交时刻、preference 值、请求 ID 和结果断言",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“输入、提交、清空、旋转、冷启动和旧响应返回”",
      expected:
        "由查询状态所有者、偏好存储与 PhotoGallery Repository提交编辑文本、已提交查询、持久偏好、请求 ID 和结果，并持续满足“轻量偏好只保存已确认查询，当前结果对应最新有效请求”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“每个字符都立即写偏好并发请求，旧响应覆盖新输入”",
      expected:
        "找到首个状态分岔，撤销后以输入事件、提交时刻、preference 值、请求 ID 和结果断言证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function SearchContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function SearchLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function SearchFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
