"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "looper-handler",
  title: "Looper、Handler和HandlerThread",
  task: "用 Looper、Handler 与 HandlerThread 串行下载缩略图并安全回传主线程",
  owner: "ThumbnailDownloader、工作 Looper 与 viewLifecycleOwner",
  state: "请求队列、token、目标 holder、bitmap 和取消状态",
  event: "入队、后台下载、主线程回传、滚动复用与 View 销毁",
  invariant: "回调只更新仍绑定同一请求的可见 View，销毁后队列可取消",
  fault: "Holder 已复用给新 URL，旧下载回调把错误图片写入当前行",
  evidence: "post/execute 线程、token、URL、holder ID、取消与绑定日志",
  concepts: [
    "25. Loopers, Handlers, and HandlerThread",
    "Preparing RecyclerView to Display Images",
    "Preparing to Download Bytes from a URL",
    "Downloading Lots of Small Things",
    "Assembling a Background Thread",
    "Messages and Message Handlers",
    "Listening to the View Lifecycle",
    "Retained Fragments",
    "For the More Curious: Solving the Image Downloading Problem",
    "For the More Curious: StrictMode",
    "Challenge: Observing View LifecycleOwner LiveData",
    "Challenge: Improving ThumbnailDownloader's Lifecycle Awareness",
    "Challenge: Preloading and Caching",
  ],
  transitions: [
    {
      action: "冻结入口：25. Loopers, Handlers, and HandlerThread",
      state:
        "记录ThumbnailDownloader、工作 Looper 与 viewLifecycleOwner的初始请求队列、token、目标 holder、bitmap 和取消状态",
      evidence:
        "post/execute 线程、token、URL、holder ID、取消与绑定日志中的“25. Loopers, Handlers, and HandlerThread”轨迹",
    },
    {
      action: "触发事件：Downloading Lots of Small Things",
      state:
        "以“入队、后台下载、主线程回传、滚动复用与 View 销毁”改变请求队列、token、目标 holder、bitmap 和取消状态",
      evidence:
        "post/execute 线程、token、URL、holder ID、取消与绑定日志中的“Downloading Lots of Small Things”轨迹",
    },
    {
      action: "提交状态：Listening to the View Lifecycle",
      state:
        "只由ThumbnailDownloader、工作 Looper 与 viewLifecycleOwner提交新状态",
      evidence:
        "post/execute 线程、token、URL、holder ID、取消与绑定日志中的“Listening to the View Lifecycle”轨迹",
    },
    {
      action: "重建边界：For the More Curious: StrictMode",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "post/execute 线程、token、URL、holder ID、取消与绑定日志中的“For the More Curious: StrictMode”轨迹",
    },
    {
      action: "核对交付：Challenge: Preloading and Caching",
      state:
        "以“回调只更新仍绑定同一请求的可见 View，销毁后队列可取消”判断通过",
      evidence: "post/execute 线程、token、URL、holder ID、取消与绑定日志",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“入队、后台下载、主线程回传、滚动复用与 View 销毁”",
      expected:
        "由ThumbnailDownloader、工作 Looper 与 viewLifecycleOwner提交请求队列、token、目标 holder、bitmap 和取消状态，并持续满足“回调只更新仍绑定同一请求的可见 View，销毁后队列可取消”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“Holder 已复用给新 URL，旧下载回调把错误图片写入当前行”",
      expected:
        "找到首个状态分岔，撤销后以post/execute 线程、token、URL、holder ID、取消与绑定日志证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function LooperHandlerContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function LooperHandlerLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function LooperHandlerFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
