"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "learning-map",
  title:
    "《Android Programming: The Big Nerd Ranch Guide（第4版）》权威学习地图",
  task: "把 GeoQuiz、CriminalIntent、BeatBox、PhotoGallery、NerdLauncher 与 DragAndDraw 串成 32 章可重放路线",
  owner: "每个示例应用的明确状态所有者",
  state: "构建、界面、持久化、后台与外部合同",
  event: "从第一章构建到最终独立项目的里程碑提交",
  invariant: "每章都有章专属结果、反例、恢复路径和版本边界",
  fault: "只按类名打卡 32 章，却没有保存六个项目的状态轨迹和失败证据",
  evidence: "项目提交、设备指纹、状态快照、失败测试和迁移差异",
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
        "记录每个示例应用的明确状态所有者的初始构建、界面、持久化、后台与外部合同",
      evidence:
        "项目提交、设备指纹、状态快照、失败测试和迁移差异中的“第1章 Your First Android Application”轨迹",
    },
    {
      action: "触发事件：第8章 UI Fragments and the Fragment Manager",
      state:
        "以“从第一章构建到最终独立项目的里程碑提交”改变构建、界面、持久化、后台与外部合同",
      evidence:
        "项目提交、设备指纹、状态快照、失败测试和迁移差异中的“第8章 UI Fragments and the Fragment Manager”轨迹",
    },
    {
      action: "提交状态：第16章 Taking Pictures with Intents",
      state: "只由每个示例应用的明确状态所有者提交新状态",
      evidence:
        "项目提交、设备指纹、状态快照、失败测试和迁移差异中的“第16章 Taking Pictures with Intents”轨迹",
    },
    {
      action: "重建边界：第24章 HTTP and Background Tasks",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "项目提交、设备指纹、状态快照、失败测试和迁移差异中的“第24章 HTTP and Background Tasks”轨迹",
    },
    {
      action: "核对交付：第32章 Afterword",
      state: "以“每章都有章专属结果、反例、恢复路径和版本边界”判断通过",
      evidence: "项目提交、设备指纹、状态快照、失败测试和迁移差异",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“从第一章构建到最终独立项目的里程碑提交”",
      expected:
        "由每个示例应用的明确状态所有者提交构建、界面、持久化、后台与外部合同，并持续满足“每章都有章专属结果、反例、恢复路径和版本边界”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“只按类名打卡 32 章，却没有保存六个项目的状态轨迹和失败证据”",
      expected:
        "找到首个状态分岔，撤销后以项目提交、设备指纹、状态快照、失败测试和迁移差异证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function Bnr4OfficialLearningMapContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function Bnr4OfficialLearningMapLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function Bnr4OfficialLearningMapFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
