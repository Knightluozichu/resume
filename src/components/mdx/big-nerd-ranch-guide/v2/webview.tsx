"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "webview",
  title: "网页浏览",
  task: "比较隐式 Intent、Custom Tabs 与 WebView 的导航、信任和生命周期边界",
  owner: "WebView、Activity 返回栈与受信任 URL 策略",
  state: "当前 URL、历史、加载状态、Cookie、脚本与返回行为",
  event: "打开页面、跳转、Back、旋转、离线与外部 scheme",
  invariant: "只加载允许来源，Back 优先级和配置恢复不吞掉安全错误",
  fault: "无白名单启用 JavaScript bridge，让不可信页面调用本地对象",
  evidence: "URL 链、WebView 历史、SSL/加载错误、配置轨迹和安全断言",
  concepts: [
    "29. Browsing the Web and WebView",
    "One Last Bit of Flickr Data",
    "The Easy Way: Implicit Intents",
    "The Harder Way: WebView",
    "Proper Rotation with WebView",
    "WebView vs a Custom UI",
    "For the More Curious: Injecting JavaScript Objects",
    "For the More Curious: WebView Updates",
    "For the More Curious: Chrome Custom Tabs (Another Easy Way)",
    "Challenge: Using the Back Button for Browser History",
  ],
  transitions: [
    {
      action: "冻结入口：29. Browsing the Web and WebView",
      state:
        "记录WebView、Activity 返回栈与受信任 URL 策略的初始当前 URL、历史、加载状态、Cookie、脚本与返回行为",
      evidence:
        "URL 链、WebView 历史、SSL/加载错误、配置轨迹和安全断言中的“29. Browsing the Web and WebView”轨迹",
    },
    {
      action: "触发事件：The Easy Way: Implicit Intents",
      state:
        "以“打开页面、跳转、Back、旋转、离线与外部 scheme”改变当前 URL、历史、加载状态、Cookie、脚本与返回行为",
      evidence:
        "URL 链、WebView 历史、SSL/加载错误、配置轨迹和安全断言中的“The Easy Way: Implicit Intents”轨迹",
    },
    {
      action: "提交状态：Proper Rotation with WebView",
      state: "只由WebView、Activity 返回栈与受信任 URL 策略提交新状态",
      evidence:
        "URL 链、WebView 历史、SSL/加载错误、配置轨迹和安全断言中的“Proper Rotation with WebView”轨迹",
    },
    {
      action: "重建边界：For the More Curious: WebView Updates",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "URL 链、WebView 历史、SSL/加载错误、配置轨迹和安全断言中的“For the More Curious: WebView Updates”轨迹",
    },
    {
      action: "核对交付：Challenge: Using the Back Button for Browser History",
      state: "以“只加载允许来源，Back 优先级和配置恢复不吞掉安全错误”判断通过",
      evidence: "URL 链、WebView 历史、SSL/加载错误、配置轨迹和安全断言",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“打开页面、跳转、Back、旋转、离线与外部 scheme”",
      expected:
        "由WebView、Activity 返回栈与受信任 URL 策略提交当前 URL、历史、加载状态、Cookie、脚本与返回行为，并持续满足“只加载允许来源，Back 优先级和配置恢复不吞掉安全错误”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“无白名单启用 JavaScript bridge，让不可信页面调用本地对象”",
      expected:
        "找到首个状态分岔，撤销后以URL 链、WebView 历史、SSL/加载错误、配置轨迹和安全断言证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function WebviewContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function WebviewLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function WebviewFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
