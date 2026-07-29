"use client";

import {
  OfficialDavSeriesLab,
  type DavCausalModel,
  type DavCoverageNode,
} from "./official-dav-series-lab";

const unitTitle = "《深入理解Android》Framework三卷总复习";
const focus =
  "用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接";
const nodes = [
  {
    label: "卷I 第1章 阅读前的准备工作",
    stage: "锁定历史基线",
    mechanism:
      "卷I 第1章 阅读前的准备工作在“用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接”中的责任要沿代理、事务数据、驱动或服务端线程追踪一次请求。记录调用方与接收方身份、同步语义、句柄或对象引用，并用死亡或错误事务验证回收。",
    probe:
      "使用版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练检查卷I 第1章 阅读前的准备工作的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "卷I 第2章 深入理解JNI",
    stage: "复现正常轨迹",
    mechanism:
      "卷I 第2章 深入理解JNI在“用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接”中的责任要沿代理、事务数据、驱动或服务端线程追踪一次请求。记录调用方与接收方身份、同步语义、句柄或对象引用，并用死亡或错误事务验证回收。",
    probe:
      "使用版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练检查卷I 第2章 深入理解JNI的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "卷I 第3章 深入理解init",
    stage: "注入单一故障",
    mechanism:
      "卷I 第3章 深入理解init在“用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接”中的责任必须落到创建者、触发条件和服务状态。用同一配置分别触发成功与重启路径，核对PID、属性、退出码和父子关系，防止把声明文件误当顺序脚本。",
    probe:
      "使用版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练检查卷I 第3章 深入理解init的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "卷I 第4章 深入理解zygote",
    stage: "定位首个分叉",
    mechanism:
      "卷I 第4章 深入理解zygote在“用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接”中的责任处在预加载、进程分裂或系统服务启动边界。比较fork前后PID、共享页与分支职责，并在子进程失败时确认父进程和system_server状态没有被静默污染。",
    probe:
      "使用版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练检查卷I 第4章 深入理解zygote的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "卷I 第5章 深入理解常见类",
    stage: "恢复同输入重放",
    mechanism:
      "卷I 第5章 深入理解常见类在“用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接”中的责任要沿代理、事务数据、驱动或服务端线程追踪一次请求。记录调用方与接收方身份、同步语义、句柄或对象引用，并用死亡或错误事务验证回收。",
    probe:
      "使用版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练检查卷I 第5章 深入理解常见类的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "卷I 第6章 深入理解Binder",
    stage: "锁定历史基线",
    mechanism:
      "卷I 第6章 深入理解Binder在“用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接”中的责任要沿代理、事务数据、驱动或服务端线程追踪一次请求。记录调用方与接收方身份、同步语义、句柄或对象引用，并用死亡或错误事务验证回收。",
    probe:
      "使用版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练检查卷I 第6章 深入理解Binder的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "卷I 第7章 深入理解Audio系统",
    stage: "复现正常轨迹",
    mechanism:
      "卷I 第7章 深入理解Audio系统在“用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练检查卷I 第7章 深入理解Audio系统的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "卷I 第8章 深入理解Surface系统",
    stage: "注入单一故障",
    mechanism:
      "卷I 第8章 深入理解Surface系统在“用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练检查卷I 第8章 深入理解Surface系统的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "卷I 第9章 深入理解Vold和Rild",
    stage: "定位首个分叉",
    mechanism:
      "卷I 第9章 深入理解Vold和Rild在“用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接”中的责任必须分清内核事件、守护进程状态机和异步基带协议。给事件或请求编号，保存状态迁移、回调线程、超时和恢复，禁止因两个守护进程并列就假定相同语义。",
    probe:
      "使用版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练检查卷I 第9章 深入理解Vold和Rild的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "卷I 第10章 深入理解MediaScanner",
    stage: "恢复同输入重放",
    mechanism:
      "卷I 第10章 深入理解MediaScanner在“用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练检查卷I 第10章 深入理解MediaScanner的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "卷II 第1章 搭建Android源码工作环境",
    stage: "锁定历史基线",
    mechanism:
      "卷II 第1章 搭建Android源码工作环境在“用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接”中的责任是把源码标签、主机工具链、产品目标和运行映像绑定成可复现坐标。产物、符号与设备指纹必须都指向android-2.2_r1 / android-4.0.1_r1 / android-4.2.2_r1，否则立即停止比较。",
    probe:
      "使用版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练检查卷II 第1章 搭建Android源码工作环境的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "卷II 第2章 深入理解Java Binder和MessageQueue",
    stage: "复现正常轨迹",
    mechanism:
      "卷II 第2章 深入理解Java Binder和MessageQueue在“用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接”中的责任要沿代理、事务数据、驱动或服务端线程追踪一次请求。记录调用方与接收方身份、同步语义、句柄或对象引用，并用死亡或错误事务验证回收。",
    probe:
      "使用版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练检查卷II 第2章 深入理解Java Binder和MessageQueue的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "卷II 第3章 深入理解SystemServer",
    stage: "注入单一故障",
    mechanism:
      "卷II 第3章 深入理解SystemServer在“用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接”中的责任处在预加载、进程分裂或系统服务启动边界。比较fork前后PID、共享页与分支职责，并在子进程失败时确认父进程和system_server状态没有被静默污染。",
    probe:
      "使用版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练检查卷II 第3章 深入理解SystemServer的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "卷II 第4章 深入理解PackageManagerService",
    stage: "定位首个分叉",
    mechanism:
      "卷II 第4章 深入理解PackageManagerService在“用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接”中的责任属于包扫描、身份验证或持久状态的一环。保留扫描次序、证书、UID、候选集和packages状态，使用升级或冲突样本证明失败不会留下半安装数据。",
    probe:
      "使用版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练检查卷II 第4章 深入理解PackageManagerService的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "卷II 第5章 深入理解PowerManagerService",
    stage: "恢复同输入重放",
    mechanism:
      "卷II 第5章 深入理解PowerManagerService在“用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接”中的责任由电源状态、持有者、超时和UID归因共同约束。只改变一个WakeLock或用户活动输入，比较屏幕、CPU、计时和释放记录，避免把“亮屏”当作唯一结果。",
    probe:
      "使用版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练检查卷II 第5章 深入理解PowerManagerService的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "卷II 第6章 深入理解ActivityManagerService",
    stage: "锁定历史基线",
    mechanism:
      "卷II 第6章 深入理解ActivityManagerService在“用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接”中的责任要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。",
    probe:
      "使用版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练检查卷II 第6章 深入理解ActivityManagerService的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "卷II 第7章 深入理解ContentProvider",
    stage: "复现正常轨迹",
    mechanism:
      "卷II 第7章 深入理解ContentProvider在“用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练检查卷II 第7章 深入理解ContentProvider的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "卷II 第8章 深入理解ContentService和AccountManagerService",
    stage: "注入单一故障",
    mechanism:
      "卷II 第8章 深入理解ContentService和AccountManagerService在“用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练检查卷II 第8章 深入理解ContentService和AccountManagerService的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "卷III 第1章 开发环境部署",
    stage: "定位首个分叉",
    mechanism:
      "卷III 第1章 开发环境部署在“用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接”中的责任是把源码标签、主机工具链、产品目标和运行映像绑定成可复现坐标。产物、符号与设备指纹必须都指向android-2.2_r1 / android-4.0.1_r1 / android-4.2.2_r1，否则立即停止比较。",
    probe:
      "使用版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练检查卷III 第1章 开发环境部署的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "卷III 第2章 深入理解Java Binder和MessageQueue",
    stage: "恢复同输入重放",
    mechanism:
      "卷III 第2章 深入理解Java Binder和MessageQueue在“用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接”中的责任要沿代理、事务数据、驱动或服务端线程追踪一次请求。记录调用方与接收方身份、同步语义、句柄或对象引用，并用死亡或错误事务验证回收。",
    probe:
      "使用版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练检查卷III 第2章 深入理解Java Binder和MessageQueue的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "卷III 第3章 深入理解AudioService",
    stage: "锁定历史基线",
    mechanism:
      "卷III 第3章 深入理解AudioService在“用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接”中的责任要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。",
    probe:
      "使用版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练检查卷III 第3章 深入理解AudioService的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "卷III 第4章 深入理解WindowManagerService",
    stage: "复现正常轨迹",
    mechanism:
      "卷III 第4章 深入理解WindowManagerService在“用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接”中的责任横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。",
    probe:
      "使用版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练检查卷III 第4章 深入理解WindowManagerService的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "卷III 第5章 深入理解Android输入系统",
    stage: "注入单一故障",
    mechanism:
      "卷III 第5章 深入理解Android输入系统在“用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接”中的责任要沿代理、事务数据、驱动或服务端线程追踪一次请求。记录调用方与接收方身份、同步语义、句柄或对象引用，并用死亡或错误事务验证回收。",
    probe:
      "使用版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练检查卷III 第5章 深入理解Android输入系统的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "卷III 第6章 深入理解控件系统",
    stage: "定位首个分叉",
    mechanism:
      "卷III 第6章 深入理解控件系统在“用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接”中的责任必须放回窗口会话、遍历调度和渲染后端。以同一View树对比测量、布局、绘制和输入消费，检查脏区、DisplayList与焦点变化是否形成闭环。",
    probe:
      "使用版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练检查卷III 第6章 深入理解控件系统的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "卷III 第7章 深入理解SystemUI",
    stage: "恢复同输入重放",
    mechanism:
      "卷III 第7章 深入理解SystemUI在“用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接”中的责任连接系统服务状态、SystemUI进程和系统窗口。记录图标或disable位的发送者、Binder回调、窗口变化与重启恢复，不能按普通Activity页面解释。",
    probe:
      "使用版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练检查卷III 第7章 深入理解SystemUI的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "卷III 第8章 深入理解Android壁纸",
    stage: "锁定历史基线",
    mechanism:
      "卷III 第8章 深入理解Android壁纸在“用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接”中的责任涉及服务绑定、Engine Surface和WMS特殊窗口策略。切换静态或动态壁纸后记录可见性、偏移、Z序和资源释放，确认旧Engine不再提交帧。",
    probe:
      "使用版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练检查卷III 第8章 深入理解Android壁纸的输入、状态变化、错误出口和释放结果",
  },
] satisfies DavCoverageNode[];
const versions = [
  "卷I / Android 2.2 / API 8",
  "卷II / Android 4.0.1 / API 14",
  "卷III / Android 4.2.2 / API 17",
];
const stages = [
  "锁定历史基线",
  "复现正常轨迹",
  "注入单一故障",
  "定位首个分叉",
  "恢复同输入重放",
];
const model = {
  sourceTag: "android-2.2_r1 / android-4.0.1_r1 / android-4.2.2_r1",
  sourcePath: "platform/frameworks/base @ android-2.2_r1",
  invariant:
    "在android-2.2_r1 / android-4.0.1_r1 / android-4.2.2_r1固定输入下，用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接的入口身份、状态拥有者、成功结果、错误返回和资源释放均可重复观察",
  fault: "只记类名和历史实现，不验证每卷版本边界以及跨卷互补关系",
  evidence:
    "版本差异表、调用图、进程线程、对象所有权、失败样本、现代迁移与回退演练",
  boundary:
    "用同一启动、Binder、音频、窗口与输入案例跨越2.2、4.0.1和4.2.2完成证据交接的第一个线程、进程、Binder、JNI或持久状态边界",
} satisfies DavCausalModel;
const props = { unitTitle, focus, nodes, versions, stages, model };

export function DavSeriesPipelineLab() {
  return <OfficialDavSeriesLab mode="pipeline" {...props} />;
}

export function DavSeriesExperimentLab() {
  return <OfficialDavSeriesLab mode="experiment" {...props} />;
}

export function DavSeriesEvidenceLab() {
  return <OfficialDavSeriesLab mode="evidence" {...props} />;
}
