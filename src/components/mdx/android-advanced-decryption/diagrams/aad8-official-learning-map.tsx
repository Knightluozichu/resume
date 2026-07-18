"use client";

import { AndroidAdvancedDecodeLab } from "./official-android-advanced-decode-lab";

const config = {
  unitTitle: "Android 8.0源码权威学习地图",
  focus:
    "把17章、251个正式目录节点连成系统启动、运行时/动态技术和应用修复/优化三条互相依赖的源码追踪路线",
  nodes: [
    "路线一：Android系统源码（第1至8章）",
    "第1章 Android系统架构",
    "第2章 Android系统启动",
    "第3章 应用程序进程启动过程",
    "第4章 四大组件的工作过程",
    "第5章 理解上下文Context",
    "第6章 理解ActivityManagerService",
    "第7章 理解WindowManager",
    "第8章 理解WindowManagerService",
    "路线二：JNI、虚拟机、加载、热修复与Hook（第9至14章）",
    "第9章 JNI原理",
    "第10章 Java虚拟机",
    "第11章 Dalvik和ART",
    "第12章 理解ClassLoader",
    "第13章 热修复原理",
    "第14章 Hook技术",
    "路线三：插件化与性能优化（第15至17章）",
    "第15章 插件化原理",
    "第16章 绘制优化",
    "第17章 内存优化",
  ],
  invariant:
    "所有251个正式节点均可定位，任何结论都带Android 8.0版本、源码入口、进程/线程、状态轨迹、失败反例和复现证据",
  failure:
    "把Android 10以后ATMS、现代ART、Perfetto或隐藏API限制倒灌进来，会改变类、工具和Hook/插件化成立条件，失去原书版本忠实度",
  links: [
    {
      label: "系统源码",
      mechanism: "第1至8章建立启动、组件与窗口链",
      evidence: "进程/Binder/状态轨迹",
    },
    {
      label: "运行时技术",
      mechanism: "第9至14章连接JNI、VM、加载、修复与Hook",
      evidence: "注册、加载和代理证据",
    },
    {
      label: "插件与优化",
      mechanism: "第15至17章综合组件、资源、渲染与内存",
      evidence: "端到端实验",
    },
    {
      label: "版本门",
      mechanism: "固定Android 8.0与出版仓库",
      evidence: "官方目录和提交3860d9e",
    },
  ],
  gates: [
    "出版社目录与Android 8.0版本",
    "源码文件、符号与调用者",
    "进程、线程、Binder/JNI/加载边界",
    "状态转移、返回码与完成回调",
    "单变量失败、恢复与资源释放",
    "停止、回退、责任人与复核人",
  ],
} as const;

export function Aad8OfficialLearningMapTraceLab() {
  return (
    <AndroidAdvancedDecodeLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="trace"
    />
  );
}

export function Aad8OfficialLearningMapFaultLab() {
  return (
    <AndroidAdvancedDecodeLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="fault"
    />
  );
}

export function Aad8OfficialLearningMapEvidenceLab() {
  return (
    <AndroidAdvancedDecodeLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
