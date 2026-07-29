"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "http-background",
  title: "HTTP与后台任务",
  task: "用 Retrofit 获取 Flickr JSON，在配置重建与取消中只提交当前响应",
  owner: "PhotoGallery Repository、网络 call 与界面状态所有者",
  state: "查询、请求 ID、加载状态、结果页、错误与取消",
  event: "发起请求、旋转、断网、重试、分页与快速切换查询",
  invariant: "旧请求不能覆盖新查询，离线和解析错误都有可恢复状态",
  fault: "查询 B 已显示后，较慢的查询 A 回调覆盖当前列表",
  evidence: "请求 ID、URL、HTTP 状态、解析错误、取消日志和列表断言",
  concepts: [
    "24. HTTP and Background Tasks",
    "Creating PhotoGallery",
    "Networking Basics with Retrofit",
    "Fetching JSON from Flickr",
    "Networking Across Configuration Changes",
    "Displaying Results in RecyclerView",
    "For the More Curious: Alternate Parsers and Data Formats",
    "For the More Curious: Canceling Requests",
    "For the More Curious: Managing Dependencies",
    "Challenge: Adding a Custom Gson Deserializer",
    "Challenge: Paging",
    "Challenge: Dynamically Adjusting the Number of Columns",
  ],
  transitions: [
    {
      action: "冻结入口：24. HTTP and Background Tasks",
      state:
        "记录PhotoGallery Repository、网络 call 与界面状态所有者的初始查询、请求 ID、加载状态、结果页、错误与取消",
      evidence:
        "请求 ID、URL、HTTP 状态、解析错误、取消日志和列表断言中的“24. HTTP and Background Tasks”轨迹",
    },
    {
      action: "触发事件：Fetching JSON from Flickr",
      state:
        "以“发起请求、旋转、断网、重试、分页与快速切换查询”改变查询、请求 ID、加载状态、结果页、错误与取消",
      evidence:
        "请求 ID、URL、HTTP 状态、解析错误、取消日志和列表断言中的“Fetching JSON from Flickr”轨迹",
    },
    {
      action: "提交状态：Displaying Results in RecyclerView",
      state:
        "只由PhotoGallery Repository、网络 call 与界面状态所有者提交新状态",
      evidence:
        "请求 ID、URL、HTTP 状态、解析错误、取消日志和列表断言中的“Displaying Results in RecyclerView”轨迹",
    },
    {
      action: "重建边界：For the More Curious: Managing Dependencies",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "请求 ID、URL、HTTP 状态、解析错误、取消日志和列表断言中的“For the More Curious: Managing Dependencies”轨迹",
    },
    {
      action:
        "核对交付：Challenge: Dynamically Adjusting the Number of Columns",
      state: "以“旧请求不能覆盖新查询，离线和解析错误都有可恢复状态”判断通过",
      evidence: "请求 ID、URL、HTTP 状态、解析错误、取消日志和列表断言",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“发起请求、旋转、断网、重试、分页与快速切换查询”",
      expected:
        "由PhotoGallery Repository、网络 call 与界面状态所有者提交查询、请求 ID、加载状态、结果页、错误与取消，并持续满足“旧请求不能覆盖新查询，离线和解析错误都有可恢复状态”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“查询 B 已显示后，较慢的查询 A 回调覆盖当前列表”",
      expected:
        "找到首个状态分岔，撤销后以请求 ID、URL、HTTP 状态、解析错误、取消日志和列表断言证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function HttpBackgroundContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function HttpBackgroundLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function HttpBackgroundFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
