"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "final-review",
  title: "《Android Programming: The Big Nerd Ranch Guide（第4版）》全书总复习",
  task: "从六个项目重放组件、状态、线程、存储、外部合同与现代目标 SDK 迁移",
  owner: "六个应用各自的事实源与生命周期所有者",
  state: "32 章工件、正常轨迹、失败轨迹、恢复和迁移差异",
  event: "干净构建六个项目并逐项注入章专属反例",
  invariant:
    "每个项目能在同一输入下重放基线、故障和恢复且不混淆第四版与当前政策",
  fault: "只保留成功 APK 和截图，删除构建指纹、进程重建与失败测试",
  evidence: "六项目提交、设备矩阵、状态轨迹、故障包、迁移记录和签核",
  concepts: [
    "第1章 Your First Android Application",
    "第2章 Android and Model-View-Controller",
    "第3章 The Activity Lifecycle",
    "第4章 Persisting UI State",
    "第5章 Debugging Android Apps",
    "第6章 Your Second Activity",
    "第7章 Android SDK Versions and Compatibility",
    "第8章 UI Fragments and the Fragment Manager",
    "第9章 Displaying Lists with RecyclerView",
    "第10章 Creating User Interfaces with Layouts and Widgets",
    "第11章 Databases and the Room Library",
    "第12章 Fragment Navigation",
    "第13章 Dialogs",
    "第14章 The App Bar",
    "第15章 Implicit Intents",
    "第16章 Taking Pictures with Intents",
    "第17章 Localization",
    "第18章 Accessibility",
    "第19章 Data Binding and MVVM",
    "第20章 Unit Testing and Audio Playback",
    "第21章 Styles and Themes",
    "第22章 XML Drawables",
    "第23章 More About Intents and Tasks",
    "第24章 HTTP and Background Tasks",
    "第25章 Loopers, Handlers, and HandlerThread",
    "第26章 SearchView and SharedPreferences",
    "第27章 WorkManager",
    "第28章 Broadcast Intents",
    "第29章 Browsing the Web and WebView",
    "第30章 Custom Views and Touch Events",
    "第31章 Property Animation",
    "第32章 Afterword",
  ],
  transitions: [
    {
      action: "冻结入口：第1章 Your First Android Application",
      state:
        "记录六个应用各自的事实源与生命周期所有者的初始32 章工件、正常轨迹、失败轨迹、恢复和迁移差异",
      evidence:
        "六项目提交、设备矩阵、状态轨迹、故障包、迁移记录和签核中的“第1章 Your First Android Application”轨迹",
    },
    {
      action: "触发事件：第8章 UI Fragments and the Fragment Manager",
      state:
        "以“干净构建六个项目并逐项注入章专属反例”改变32 章工件、正常轨迹、失败轨迹、恢复和迁移差异",
      evidence:
        "六项目提交、设备矩阵、状态轨迹、故障包、迁移记录和签核中的“第8章 UI Fragments and the Fragment Manager”轨迹",
    },
    {
      action: "提交状态：第16章 Taking Pictures with Intents",
      state: "只由六个应用各自的事实源与生命周期所有者提交新状态",
      evidence:
        "六项目提交、设备矩阵、状态轨迹、故障包、迁移记录和签核中的“第16章 Taking Pictures with Intents”轨迹",
    },
    {
      action: "重建边界：第24章 HTTP and Background Tasks",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "六项目提交、设备矩阵、状态轨迹、故障包、迁移记录和签核中的“第24章 HTTP and Background Tasks”轨迹",
    },
    {
      action: "核对交付：第32章 Afterword",
      state:
        "以“每个项目能在同一输入下重放基线、故障和恢复且不混淆第四版与当前政策”判断通过",
      evidence: "六项目提交、设备矩阵、状态轨迹、故障包、迁移记录和签核",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“干净构建六个项目并逐项注入章专属反例”",
      expected:
        "由六个应用各自的事实源与生命周期所有者提交32 章工件、正常轨迹、失败轨迹、恢复和迁移差异，并持续满足“每个项目能在同一输入下重放基线、故障和恢复且不混淆第四版与当前政策”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“只保留成功 APK 和截图，删除构建指纹、进程重建与失败测试”",
      expected:
        "找到首个状态分岔，撤销后以六项目提交、设备矩阵、状态轨迹、故障包、迁移记录和签核证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function Bnr4OfficialFinalReviewContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function Bnr4OfficialFinalReviewLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function Bnr4OfficialFinalReviewFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
