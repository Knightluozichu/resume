#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "deep-android-volumes";
const BOOK_DIR = path.join(ROOT, "content", BOOK);
const COMPONENT_DIR = path.join(
  ROOT,
  "src/components/mdx/deep-android-volumes/diagrams",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/deep-android-volumes-v2-profiles.json",
);

const SOURCES = {
  volume1: "https://hzbook-group.iteye.com/group/wiki/3128-Android-internals",
  volume2: "https://www.sanmin.com.tw/product/index/003084876",
  volume3: "https://discx.libtop.com/book/7031561197875",
  volume3Retail: "https://www.yami.com/zh/p/android-3/3118023101",
  buildTags: "https://source.android.com/docs/setup/reference/build-numbers",
  manifest: "https://android.googlesource.com/platform/manifest",
  currentArchitecture: "https://source.android.com/docs/core/architecture",
  currentBinder:
    "https://source.android.com/docs/core/architecture/ipc/binder-overview",
};

const EDITIONS = {
  v1: {
    workTitle:
      "邓凡平《深入理解Android：卷I》（机械工业出版社，2011，Android 2.2）",
    recordUrl: SOURCES.volume1,
    sourceBasis: "authorized-sample",
    tag: "android-2.2_r1",
    label: "卷I / Android 2.2 / API 8",
  },
  v2: {
    workTitle:
      "邓凡平《深入理解Android：卷II》（机械工业出版社，2012，Android 4.0.1）",
    recordUrl: SOURCES.volume2,
    sourceBasis: "outline-only",
    tag: "android-4.0.1_r1",
    label: "卷II / Android 4.0.1 / API 14",
  },
  v3: {
    workTitle:
      "张大伟《深入理解Android：卷III》（机械工业出版社，2015，Android 4.2.2）",
    recordUrl: SOURCES.volume3,
    sourceBasis: "outline-only",
    tag: "android-4.2.2_r1",
    label: "卷III / Android 4.2.2 / API 17",
  },
  series: {
    workTitle: "《深入理解Android》Framework三卷首版",
    recordUrl: SOURCES.volume1,
    sourceBasis: "outline-only",
    tag: "android-2.2_r1 / android-4.0.1_r1 / android-4.2.2_r1",
    label: "三卷独立历史基线",
  },
};

const PRACTICE_MODES = {
  "dav-series-official-learning-map": "design",
  "dav-v1-01-preparation": "code",
  "dav-v1-02-jni": "diagnosis",
  "dav-v1-03-init": "diagnosis",
  "dav-v1-04-zygote": "simulation",
  "dav-v1-05-common-classes": "diagnosis",
  "dav-v1-06-binder-native": "diagnosis",
  "dav-v1-07-audio-native": "simulation",
  "dav-v1-08-surface": "simulation",
  "dav-v1-09-vold-rild": "diagnosis",
  "dav-v1-10-media-scanner": "diagnosis",
  "dav-v2-01-source-environment": "code",
  "dav-v2-02-java-binder-messagequeue": "diagnosis",
  "dav-v2-03-system-server": "design",
  "dav-v2-04-package-manager-service": "diagnosis",
  "dav-v2-05-power-manager-service": "simulation",
  "dav-v2-06-activity-manager-service": "diagnosis",
  "dav-v2-07-content-provider": "diagnosis",
  "dav-v2-08-content-account-sync": "simulation",
  "dav-v3-01-development-environment": "code",
  "dav-v3-02-java-binder-messagequeue": "diagnosis",
  "dav-v3-03-audio-service": "simulation",
  "dav-v3-04-window-manager-service": "simulation",
  "dav-v3-05-input-system": "diagnosis",
  "dav-v3-06-view-system": "simulation",
  "dav-v3-07-system-ui": "diagnosis",
  "dav-v3-08-wallpaper": "simulation",
  "dav-series-official-final-review": "diagnosis",
};

const STAGES = {
  code: [
    "锁定工具链",
    "定位源码入口",
    "运行最小切片",
    "保存构建诊断",
    "回归重放",
  ],
  diagnosis: [
    "锁定历史基线",
    "复现正常轨迹",
    "注入单一故障",
    "定位首个分叉",
    "恢复同输入重放",
  ],
  simulation: [
    "固定输入与所有者",
    "触发系统请求",
    "推进状态机",
    "观察反馈与释放",
    "复位后再次执行",
  ],
  design: [
    "界定卷册范围",
    "画出责任边界",
    "声明机制不变量",
    "用反例挑战",
    "记录迁移决策",
  ],
};

const TERMS = {
  code: [
    "源码标签",
    "构建目标",
    "符号入口",
    "运行产物",
    "错误日志",
    "复现脚本",
  ],
  diagnosis: [
    "版本基线",
    "正常轨迹",
    "首错断点",
    "对象所有权",
    "恢复条件",
    "回归证据",
  ],
  simulation: [
    "初始输入",
    "调用入口",
    "状态迁移",
    "可见反馈",
    "故障注入",
    "复位重放",
  ],
  design: [
    "卷册边界",
    "目录分母",
    "事实来源",
    "机制不变量",
    "迁移坐标",
    "验收台账",
  ],
};

function walkMdx(directory) {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? walkMdx(path.join(directory, entry.name))
        : [path.join(directory, entry.name)],
    )
    .filter((filePath) => filePath.endsWith(".mdx"))
    .sort();
}

function cleanSentence(value) {
  return String(value ?? "")
    .trim()
    .replace(/[。！]+$/, "");
}

function firstMatch(source, pattern, fallback) {
  return cleanSentence(source.match(pattern)?.[1] ?? fallback);
}

function volumeFor(chapterSlug) {
  if (chapterSlug.startsWith("dav-v1-")) return "v1";
  if (chapterSlug.startsWith("dav-v2-")) return "v2";
  if (chapterSlug.startsWith("dav-v3-")) return "v3";
  return "series";
}

function sectionName(sectionSlug) {
  const number = Number(sectionSlug.slice(0, 2));
  if (number === 0) return "深入Android三卷 · 学习地图";
  if (number >= 1 && number <= 6) return "深入Android三卷 · 卷I Native基础";
  if (number >= 7 && number <= 10) return "深入Android三卷 · 卷I 媒体与设备";
  if (number >= 11 && number <= 13) return "深入Android三卷 · 卷II Java基础";
  if (number >= 14 && number <= 18) return "深入Android三卷 · 卷II 核心服务";
  if (number >= 19 && number <= 20) return "深入Android三卷 · 卷III UI基础";
  if (number >= 21 && number <= 26) return "深入Android三卷 · 卷III UI系统";
  return "深入Android三卷 · 全书验收";
}

function technicalSourceFor(chapterSlug, tag) {
  let repo = "platform/frameworks/base";
  if (
    /preparation|source-environment|development-environment/.test(chapterSlug)
  )
    repo = "platform/manifest";
  else if (/init|vold-rild/.test(chapterSlug)) repo = "platform/system/core";
  const url = `https://android.googlesource.com/${repo}/+/${tag}/`;
  return {
    id: `${volumeFor(chapterSlug)}-${repo.split("/").at(-1)}`,
    repo,
    url,
    sourcePath: `${repo} @ ${tag}`,
  };
}

function snippetFor(profile) {
  if (profile.volume === "series") {
    return {
      language: "bash",
      code: `while read -r directory tag; do
  mkdir -p "$directory"
  (
    cd "$directory"
    repo init -u https://android.googlesource.com/platform/manifest -b "$tag"
    repo sync -c
  )
done <<'AOSP_TAGS'
aosp-2.2 android-2.2_r1
aosp-4.0.1 android-4.0.1_r1
aosp-4.2.2 android-4.2.2_r1
AOSP_TAGS`,
    };
  }
  const commands = {
    "dav-v1-01-preparation":
      "adb shell ps\nadb shell getprop ro.build.fingerprint",
    "dav-v1-02-jni": "adb logcat -d -s MediaScannerJNI\nadb shell ps",
    "dav-v1-03-init": "adb shell getprop init.svc.zygote\nadb shell ps",
    "dav-v1-04-zygote": "adb shell ps\nadb logcat -d -s Zygote SystemServer",
    "dav-v1-05-common-classes": "adb shell ps\nadb logcat -d -v threadtime",
    "dav-v1-06-binder-native":
      "adb shell service list\nadb shell ls -l /dev/binder",
    "dav-v1-07-audio-native":
      "adb shell dumpsys media.audio_flinger\nadb logcat -d -s AudioFlinger AudioPolicyManager",
    "dav-v1-08-surface":
      "adb shell dumpsys SurfaceFlinger\nadb logcat -d -s SurfaceFlinger",
    "dav-v1-09-vold-rild": "adb logcat -d -b radio\nadb logcat -d -s vold",
    "dav-v1-10-media-scanner":
      "adb logcat -d -s MediaScanner MediaProvider\nadb shell dumpsys activity services",
    "dav-v2-01-source-environment":
      "adb shell getprop ro.build.fingerprint\nadb shell ps",
    "dav-v2-02-java-binder-messagequeue":
      "adb shell service list\nadb shell dumpsys activity",
    "dav-v2-03-system-server": "adb shell ps\nadb shell service list",
    "dav-v2-04-package-manager-service":
      "adb shell dumpsys package\nadb logcat -d -s PackageManager",
    "dav-v2-05-power-manager-service":
      "adb shell dumpsys power\nadb logcat -d -s PowerManagerService",
    "dav-v2-06-activity-manager-service":
      "adb shell dumpsys activity\nadb logcat -d -s ActivityManager",
    "dav-v2-07-content-provider":
      "adb shell dumpsys activity providers\nadb logcat -d -s ActivityManager SQLiteDatabase",
    "dav-v2-08-content-account-sync":
      "adb shell dumpsys content\nadb shell dumpsys account",
    "dav-v3-01-development-environment":
      "adb shell getprop ro.build.fingerprint\nadb shell ps",
    "dav-v3-02-java-binder-messagequeue":
      "adb shell service list\nadb shell dumpsys activity",
    "dav-v3-03-audio-service":
      "adb shell dumpsys audio\nadb logcat -d -s AudioService",
    "dav-v3-04-window-manager-service":
      "adb shell dumpsys window\nadb shell dumpsys SurfaceFlinger",
    "dav-v3-05-input-system": "adb shell getevent\nadb shell dumpsys input",
    "dav-v3-06-view-system":
      "adb shell dumpsys gfxinfo\nadb shell dumpsys window",
    "dav-v3-07-system-ui":
      "adb shell dumpsys statusbar\nadb logcat -d -s SystemUI",
    "dav-v3-08-wallpaper":
      "adb shell dumpsys wallpaper\nadb shell dumpsys window",
  };
  return {
    language: "bash",
    code: `mkdir -p aosp-${profile.edition.tag}
cd aosp-${profile.edition.tag}
repo init -u https://android.googlesource.com/platform/manifest -b ${profile.edition.tag}
repo sync -c

# 只在可恢复的同版本模拟器或测试机采集
${commands[profile.chapterSlug] ?? "adb shell getprop ro.build.fingerprint"}`,
  };
}

function extractLegacyProfile(filePath, parsed, order) {
  const chapterSlug = path.basename(filePath, ".mdx");
  const sectionSlug = path.basename(path.dirname(filePath));
  const source = parsed.content;
  const focus = firstMatch(
    source,
    /本单元主线是([^。！？\n]*)/,
    parsed.data.description,
  );
  const trap = firstMatch(
    source,
    /\*\*核心陷阱。\*\*\s*([^。！\n]+[。！]?)/,
    `只识别${parsed.data.title}的类名而无法复现运行边界`,
  );
  const evidence = firstMatch(
    source,
    /并用([^\n。]+)完成验收/,
    `${parsed.data.title}的版本卡、调用时间线、状态快照与恢复结果`,
  );
  const practiceMode = PRACTICE_MODES[chapterSlug];
  if (!practiceMode) throw new Error(`缺少实践模式：${chapterSlug}`);
  const volume = volumeFor(chapterSlug);
  const edition = EDITIONS[volume];
  return {
    title: String(parsed.data.title),
    description: String(parsed.data.description),
    order,
    sectionSlug,
    chapterSlug,
    relativePath: path.relative(ROOT, filePath).replaceAll(path.sep, "/"),
    volume,
    practiceMode,
    focus,
    trap,
    evidence,
    edition,
    stages: STAGES[practiceMode],
    terms: TERMS[practiceMode],
    invariant: `在${edition.tag}固定输入下，${focus}的入口身份、状态拥有者、成功结果、错误返回和资源释放均可重复观察`,
  };
}

function insightFor(concept, profile) {
  const value = concept.toLocaleLowerCase();
  const subject = `${concept}在“${profile.focus}”中的责任`;
  if (/概述|小结|总结|初识|你彻底明白|拓展思考/.test(value))
    return `${subject}是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用${profile.evidence}排除只凭类名或流程图得出的结论。`;
  if (
    /环境|源码|下载|编译|工具|eclipse|source insight|busybox|部署/.test(value)
  )
    return `${subject}是把源码标签、主机工具链、产品目标和运行映像绑定成可复现坐标。产物、符号与设备指纹必须都指向${profile.edition.tag}，否则立即停止比较。`;
  if (
    /binder|aidl|parcel|service manager|servicemanager|ipc|跨进程/.test(value)
  )
    return `${subject}要沿代理、事务数据、驱动或服务端线程追踪一次请求。记录调用方与接收方身份、同步语义、句柄或对象引用，并用死亡或错误事务验证回收。`;
  if (/message|looper|handler|thread|线程|队列|epoll|poll/.test(value))
    return `${subject}由队列头时间、消费线程和唤醒源共同决定。固定消息与时钟后延迟一次消费，比较入队、唤醒、执行和释放四个时间点，不能把容器结构当调度语义。`;
  if (/zygote|systemserver|system server|fork|watchdog|虚拟机/.test(value))
    return `${subject}处在预加载、进程分裂或系统服务启动边界。比较fork前后PID、共享页与分支职责，并在子进程失败时确认父进程和system_server状态没有被静默污染。`;
  if (/audio|声音|音量|焦点|alsa|采样|混音|路由/.test(value))
    return `${subject}要区分控制策略与音频数据平面。保存流、设备、缓冲区指针、处理线程和回调结果，注入欠载或路由变化后检查声音之外的状态恢复。`;
  if (/surface|window|窗口|layer|动画|布局|绘制|buffer|display/.test(value))
    return `${subject}横跨窗口身份、缓冲区所有权与合成时序。以同一帧记录生产、提交、层级、消费和移除，改变Z序或所有者后检查旧Surface是否仍可见或占用资源。`;
  if (/vold|volume|存储|rild|ril|射频|uevent|netlink/.test(value))
    return `${subject}必须分清内核事件、守护进程状态机和异步基带协议。给事件或请求编号，保存状态迁移、回调线程、超时和恢复，禁止因两个守护进程并列就假定相同语义。`;
  if (
    /scanner|媒体|provider|sqlite|cursor|content|account|sync|observer/.test(
      value,
    )
  )
    return `${subject}要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。`;
  if (/package|apk|intent|安装|installd|uid|证书/.test(value))
    return `${subject}属于包扫描、身份验证或持久状态的一环。保留扫描次序、证书、UID、候选集和packages状态，使用升级或冲突样本证明失败不会留下半安装数据。`;
  if (/power|wake|电源|电池|亮度/.test(value))
    return `${subject}由电源状态、持有者、超时和UID归因共同约束。只改变一个WakeLock或用户活动输入，比较屏幕、CPU、计时和释放记录，避免把“亮屏”当作唯一结果。`;
  if (/activity|broadcast|service|process|进程|anr|crash/.test(value))
    return `${subject}要连接system_server记录、调度队列和目标进程回调。保存记录对象与进程身份，制造超时或死亡后检查队列推进、死亡清理和后续请求是否恢复。`;
  if (/input|eventhub|reader|dispatcher|channel|触摸|按键/.test(value))
    return `${subject}从设备事件进入读取、策略、派发与完成反馈。给同一输入事件绑定序号，核对焦点窗口、通道、finish信号和ANR计时，丢失反馈即不能宣称处理完成。`;
  if (/view|控件|measure|draw|phonewindow|viewroot/.test(value))
    return `${subject}必须放回窗口会话、遍历调度和渲染后端。以同一View树对比测量、布局、绘制和输入消费，检查脏区、DisplayList与焦点变化是否形成闭环。`;
  if (/systemui|状态栏|导航栏|通知|visibility|disable/.test(value))
    return `${subject}连接系统服务状态、SystemUI进程和系统窗口。记录图标或disable位的发送者、Binder回调、窗口变化与重启恢复，不能按普通Activity页面解释。`;
  if (/wallpaper|壁纸|engine|imagewallpaper/.test(value))
    return `${subject}涉及服务绑定、Engine Surface和WMS特殊窗口策略。切换静态或动态壁纸后记录可见性、偏移、Z序和资源释放，确认旧Engine不再提交帧。`;
  if (/init|property|service|启动|服务/.test(value))
    return `${subject}必须落到创建者、触发条件和服务状态。用同一配置分别触发成功与重启路径，核对PID、属性、退出码和父子关系，防止把声明文件误当顺序脚本。`;
  return `${subject}要翻译成一个可推翻的运行合同：明确入口、线程或进程、状态拥有者、正常结果和首个错误返回，再由${profile.evidence}复核。`;
}

function nodeSection(concept, index, profile) {
  const stage = profile.stages[index % profile.stages.length];
  const next = profile.stages[(index + 1) % profile.stages.length];
  return `### ${concept}

${insightFor(concept, profile)}

处理 ${concept} 时先执行“${stage}”：在 ${profile.edition.tag} 中定位真实入口，把PID/TID、对象身份和输入写入记录。进入“${next}”后仅改变一个条件，观察${profile.evidence}中哪一项先偏离。

该节点的四级证据是：保留 ${concept} 这一目录坐标；解释它如何参与${profile.focus}；在全节点机制图中选中它并操作阶段反馈；最后在练习中凭${profile.evidence}恢复同输入结果。`;
}

function termDefinition(term, profile, index) {
  const roles = [
    `锁定${profile.edition.tag}的事实坐标与允许输入`,
    `标出${profile.focus}由谁创建、修改与释放状态`,
    `保存能复现正常路径的对象身份和时序`,
    `暴露${profile.trap}发生的第一个边界`,
    `声明故障后重新接收请求所需的恢复条件`,
    `让独立读者凭${profile.evidence}得到同一结论`,
  ];
  return `${term}在本页用于${roles[index % roles.length]}。`;
}

function wrapperSource(profile, concepts) {
  const technical = technicalSourceFor(
    profile.chapterSlug,
    profile.edition.tag.split(" / ")[0],
  );
  const nodes = concepts.map((concept, index) => ({
    label: concept,
    stage: profile.stages[index % profile.stages.length],
    mechanism: insightFor(concept, profile),
    probe: `使用${profile.evidence}检查${concept}的输入、状态变化、错误出口和释放结果`,
  }));
  const model = {
    sourceTag: profile.edition.tag,
    sourcePath: technical.sourcePath,
    invariant: profile.invariant,
    fault: profile.trap,
    evidence: profile.evidence,
    boundary: `${profile.focus}的第一个线程、进程、Binder、JNI或持久状态边界`,
  };
  const versions =
    profile.volume === "series"
      ? [EDITIONS.v1.label, EDITIONS.v2.label, EDITIONS.v3.label]
      : [profile.edition.label];
  return `"use client";

import {
  OfficialDavSeriesLab,
  type DavCausalModel,
  type DavCoverageNode,
} from "./official-dav-series-lab";

const unitTitle = ${JSON.stringify(profile.title)};
const focus = ${JSON.stringify(profile.focus)};
const nodes = ${JSON.stringify(nodes, null, 2)} satisfies DavCoverageNode[];
const versions = ${JSON.stringify(versions, null, 2)};
const stages = ${JSON.stringify(profile.stages, null, 2)};
const model = ${JSON.stringify(model, null, 2)} satisfies DavCausalModel;
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
`;
}

function contentFor(entry, previous, next) {
  const { profile, concepts } = entry;
  const edition = profile.edition;
  const technical = technicalSourceFor(
    profile.chapterSlug,
    edition.tag.split(" / ")[0],
  );
  const snippet = snippetFor(profile);
  const deepDive = concepts
    .map((concept, index) => nodeSection(concept, index, profile))
    .join("\n\n");
  const termLine = profile.terms
    .map(
      (term, index) =>
        `<Term def=${JSON.stringify(termDefinition(term, profile, index))}>${term}</Term>`,
    )
    .join("、");
  const glossary = profile.terms
    .map(
      (term, index) =>
        `<GlossaryItem term=${JSON.stringify(term)}>\n    ${termDefinition(term, profile, index)}\n  </GlossaryItem>`,
    )
    .join("\n  ");
  const practiceRows = concepts
    .map((concept, index) => {
      const label = concept.includes("performLayoutAndPlaceSurfacesLockedInner")
        ? `<strong className="break-words [overflow-wrap:anywhere]">${concept}</strong>`
        : `**${concept}**`;
      return `  - ${label}：在“${profile.stages[index % profile.stages.length]}”保存入口与状态，注入${profile.trap}后恢复，并以${profile.evidence}重放。`;
    })
    .join("\n");
  const navigation = [
    previous
      ? `[← 上一页：${previous.profile.title}](/learn/${BOOK}/${previous.profile.sectionSlug}/${previous.profile.chapterSlug})`
      : null,
    next
      ? `[下一页：${next.profile.title} →](/learn/${BOOK}/${next.profile.sectionSlug}/${next.profile.chapterSlug})`
      : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const sourceScope =
    profile.volume === "v1"
      ? `${profile.title}以[卷I出版社合法公开样章](${SOURCES.volume1})核定可见正文、目录与Android 2.2范围；样章以外不宣称复现原书正文。`
      : profile.volume === "v2"
        ? `${profile.title}只以[卷II公开书目与详细目录](${SOURCES.volume2})界定Android 4.0.1学习范围；未取得原书正文，以下机制解释不沿用原作表述。`
        : profile.volume === "v3"
          ? `${profile.title}以[卷III图书馆书目](${SOURCES.volume3})和[零售书目](${SOURCES.volume3Retail})交叉核对Android 4.2.2目录；未取得原书正文，不作忠实性宣称。`
          : `${profile.title}用三卷公开书目核对26章与525个正式目录节点；卷I只有合法公开样章，卷II、III只有目录或书目，因此整套课程统一按独立教学重写披露。`;
  const historicalSource =
    profile.volume === "series"
      ? `[android-2.2_r1源码树](https://android.googlesource.com/platform/frameworks/base/+/android-2.2_r1/)、[android-4.0.1_r1源码树](https://android.googlesource.com/platform/frameworks/base/+/android-4.0.1_r1/)与[android-4.2.2_r1源码树](https://android.googlesource.com/platform/frameworks/base/+/android-4.2.2_r1/)分别提供三卷历史机制的一手坐标`
      : `[${edition.tag}源码树](${technical.url})提供本页历史机制的一手坐标`;
  const versionContract =
    profile.volume === "series"
      ? "三个相互隔离的历史标签"
      : `${edition.tag}单一历史标签`;

  return `import { DavSeriesPipelineLab, DavSeriesExperimentLab, DavSeriesEvidenceLab } from "@/components/mdx/deep-android-volumes/diagrams/${profile.chapterSlug}";
import {
  Objectives,
  Callout,
  Glossary,
  GlossaryItem,
  Term,
  Exercises,
  Answer,
  Stepper,
  Step,
  Attribution,
} from "@/components/mdx/mdx-components";

<Objectives>

- 能在${versionContract}内解释${profile.focus}，不跨卷拼接文件与接口身份。
- 能操作全节点机制图，让本页 ${concepts.length} 个坐标都具备出现、解释、实验和练习四级证据。
- 能使用章专属诊断切片保存入口、PID/TID、对象或状态、正常结果、错误返回与资源释放。
- 能主动制造“${profile.trap}”，再凭${profile.evidence}定位、恢复、复位并以同输入重放。

</Objectives>

{/* DEEP_ANDROID_VOLUMES_QUALITY_V2 */}

## 从一个可失败的问题开始

${profile.title}不是类名清单，而是在${edition.tag}中回答：${profile.focus}。先预测请求经过的线程、进程与对象所有者，再运行正常样本；如果${profile.evidence}不能指出首个变化，本页结论仍不可交接。

本章不变量是${profile.invariant}。将“${profile.trap}”作为反例，必须在同一版本、同一输入下看到确定的错误或状态分叉，并能恢复到基线。

## 来源范围、历史标签与当前迁移

${sourceScope}

[AOSP版本与构建号表](${SOURCES.buildTags})用于核对2.2/API 8、4.0.1/API 14、4.2.2/API 17及正式源码标签；${historicalSource}。当前[Android架构文档](${SOURCES.currentArchitecture})只用于迁移对照，ART、Treble、稳定AIDL、模块化系统服务和现代构建工具不得倒填为三卷历史实现。

## 六个机制检查点

${termLine}。这六项把${profile.focus}落到${profile.evidence}，防止目录词出现却没有运行解释。

## 先预测，再操作三个专属实验

预测本页哪一个对象最先改变、故障应在哪个边界暴露、恢复后哪份证据必须回到原值；然后按全节点、版本因果、故障恢复的顺序操作。

<Stepper>
  <Step title="1. 全节点机制与可执行探针">
    选择任一目录节点与处理阶段，比较章专属机制说明和探针；列表完整保留，不截断节点。

    <DavSeriesPipelineLab />

  </Step>
  <Step title="2. 同输入版本与故障边界">
    保持输入不变，只切换正常、标签错配、所有者死亡或线程停滞，解释可见结果为何变化。

    <DavSeriesExperimentLab />

  </Step>
  <Step title="3. 基线、首错、恢复与复位">
    保存首个分叉后恢复历史合同，以同输入重放；点击重置，确认状态和输出都回到初始值。

    <DavSeriesEvidenceLab />

  </Step>
</Stepper>

## 正式目录逐项深读

${deepDive}

## 章专属复现实验

\`\`\`${snippet.language}
${snippet.code}
\`\`\`

运行前保存主机工具链、manifest与产品目标；这些历史分支通常需要隔离的旧工具链环境。诊断命令只在可恢复模拟器或测试机执行，账号、媒体与设备标识使用隔离样本；现代设备输出不得冒充${edition.tag}结果。

<Callout type="trap" title="本章核心陷阱">
  ${profile.trap}。先恢复${edition.tag}的真实入口、对象身份和失败返回，再讨论当前Android迁移。
</Callout>

<Callout type="trap" title="跨卷同名不等于同一实现">
  ${profile.title}只在自己的历史标签中成立；Binder、MessageQueue、SystemServer、Audio或窗口机制跨卷复用名称时，必须分别核对文件路径、线程责任和错误语义。
</Callout>

<Callout type="warning" title="系统实验安全边界">
  刷机、Root、系统映像、gdb、getevent与输入注入仅用于可恢复测试环境。先备份，再记录回滚条件；任何真实用户数据都不得进入截图、日志或练习答案。
</Callout>

## 练习、答案与四级证据

<Exercises>

**问题 1：历史边界。** 怎样证明本页没有把当前Android实现倒灌到 ${edition.tag}？

<Answer>
  从[官方标签表](${SOURCES.buildTags})锁定版本，只引用[该标签源码](${technical.url})解释历史文件与接口；当前架构另列迁移记录。若同名对象路径、职责或返回语义改变，就保留差异而不是拼接流程。
</Answer>

**问题 2：逐节点证据。** 本页 ${concepts.length} 个正式坐标如何通过出现、解释、实验与练习四级验收？

<Answer>
${practiceRows}
</Answer>

**问题 3：故障恢复。** 面对${profile.trap}，如何确认修复而不是掩盖症状？

<Answer>
  先保存${profile.evidence}中的正常基线，再只注入一个错误条件并记录首个分叉。恢复真实标签、状态所有者或消费路径后，以完全相同输入重放；只有${profile.invariant}重新成立且实验可重置，才算通过。
</Answer>

</Exercises>

## 术语复核与本章回顾

<Glossary>
  ${glossary}
</Glossary>

完成${profile.title}意味着：能解释${profile.focus}，能操作全节点图与诊断切片，能制造${profile.trap}，还能凭${profile.evidence}恢复、复位和交接，而不是只在目录中找到关键词。

## 阅读导航

${navigation}

<Attribution
  mode="independent-rewrite"
  sourceBasis=${JSON.stringify(edition.sourceBasis)}
  workTitle=${JSON.stringify(edition.workTitle)}
  adaptedUrl=${JSON.stringify(edition.recordUrl)}
/>
`;
}

const manifestRoot = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = manifestRoot.books[BOOK];
if (!manifest) throw new Error(`缺少 ${BOOK} manifest`);
const formalNodes = manifest.units.reduce(
  (sum, unit) => sum + unit.concepts.length,
  0,
);
if (manifest.units.length !== 26 || formalNodes !== 525)
  throw new Error(
    `Android三卷分母异常：${manifest.units.length}/${formalNodes}`,
  );

const rawEntries = walkMdx(BOOK_DIR).map((filePath, order) => ({
  filePath,
  parsed: matter(fs.readFileSync(filePath, "utf8")),
  order,
}));
if (rawEntries.length !== 28)
  throw new Error(`Android三卷页面分母异常：${rawEntries.length}`);

let profileRoot;
if (fs.existsSync(PROFILE_PATH)) {
  profileRoot = JSON.parse(fs.readFileSync(PROFILE_PATH, "utf8"));
} else {
  profileRoot = {
    version: 2,
    bookSlug: BOOK,
    sourceAccess:
      "卷I为authorized-sample；卷II与卷III为outline-only；全书统一independent-rewrite",
    sourceMode: "independent-rewrite",
    scope: { formalUnits: 26, outlineNodes: 525, pages: 28 },
    profiles: rawEntries.map(({ filePath, parsed, order }) =>
      extractLegacyProfile(filePath, parsed, order),
    ),
  };
}

const profiles = new Map(
  profileRoot.profiles.map((profile) => [profile.chapterSlug, profile]),
);
const sectionOrders = new Map();
const entries = rawEntries.map(({ filePath, parsed }) => {
  const chapterSlug = path.basename(filePath, ".mdx");
  const sectionSlug = path.basename(path.dirname(filePath));
  const profile = profiles.get(chapterSlug);
  if (!profile) throw new Error(`缺少 Android 三卷 profile：${chapterSlug}`);
  const section = sectionName(sectionSlug);
  const sectionOrder = (sectionOrders.get(section) ?? 0) + 1;
  sectionOrders.set(section, sectionOrder);
  const unit = manifest.units.find((item) => item.id === chapterSlug);
  const concepts =
    profile.volume === "series"
      ? manifest.units.map((item) => item.title)
      : (unit?.concepts.map((alternatives) => alternatives[0]) ?? []);
  if (concepts.length === 0) throw new Error(`页面未映射节点：${filePath}`);
  return {
    filePath,
    parsed,
    profile: {
      ...profile,
      sectionSlug,
      edition: EDITIONS[profile.volume],
      stages: STAGES[profile.practiceMode],
      terms: TERMS[profile.practiceMode],
    },
    section,
    sectionOrder,
    unit,
    concepts,
  };
});

for (const [index, entry] of entries.entries()) {
  const content = contentFor(
    entry,
    entries[index - 1] ?? null,
    entries[index + 1] ?? null,
  );
  const data = {
    ...entry.parsed.data,
    description: `${entry.profile.title}：${entry.profile.focus}，以${entry.profile.edition.tag}源码、全节点机制图和故障恢复证据完成验收。`,
    section: entry.section,
    order: entry.sectionOrder,
    sourceUrl: entry.profile.edition.recordUrl,
    qualityVersion: 2,
    practiceMode: entry.profile.practiceMode,
    sourceMode: "independent-rewrite",
  };
  fs.writeFileSync(entry.filePath, matter.stringify(content, data));
  fs.writeFileSync(
    path.join(COMPONENT_DIR, `${entry.profile.chapterSlug}.tsx`),
    wrapperSource(entry.profile, entry.concepts),
  );
}

manifest.version = 2;
manifest.sourceAccess = "authorized-sample";
manifest.sourceMode = "independent-rewrite";
manifest.defaultSourceMode = "independent-rewrite";
manifest.sourceKind =
  "volume-1-authorized-publisher-sample-volumes-2-3-outline-bibliographic-records-and-tagged-aosp-primary-sources";
manifest.status = "verified-mixed-scope-independent-rewrite";
manifest.verifiedAt = "2026-07-19";
manifest.disclosureNote =
  "三卷共26章、525个章/节/小节节点，另设学习地图与总复习，共28页。卷I出版社合法样章可核定可见正文、10章目录与Android 2.2范围；卷II、卷III仅以公开书目和详细目录界定Android 4.0.1、4.2.2范围，不宣称复现未取得的原书正文。技术事实按对应AOSP正式标签独立核验，当前Android文档只作迁移对照。";
manifest.factSourcePolicy =
  "每个节点必须具备出现、独立机制解释、章专属交互和练习验证。历史结论只引用android-2.2_r1、android-4.0.1_r1或android-4.2.2_r1对应源码；当前架构资料不得倒灌。";
manifest.coverage = { formalUnits: 26, outlineNodes: 525, pages: 28 };
manifest.factSources = {
  publisherVolume1: {
    kind: "authorized-publisher-sample",
    label: "卷I出版社合法公开样章与目录",
    url: SOURCES.volume1,
  },
  bibliographyVolume2: {
    kind: "bibliographic-outline-record",
    label: "卷II公开书目与详细目录",
    url: SOURCES.volume2,
  },
  bibliographyVolume3: {
    kind: "library-outline-record",
    label: "卷III图书馆书目与详细目录",
    url: SOURCES.volume3,
  },
  retailerVolume3: {
    kind: "retailer-bibliographic-record",
    label: "卷III零售书目交叉核对",
    url: SOURCES.volume3Retail,
  },
  aospBuildTags: {
    kind: "official-version-reference",
    label: "AOSP版本、API级别与正式标签表",
    url: SOURCES.buildTags,
  },
  aospManifest: {
    kind: "official-source-repository",
    label: "AOSP manifest源码仓库",
    url: SOURCES.manifest,
  },
  froyoFrameworks: {
    kind: "official-tagged-source",
    label: "AOSP frameworks/base android-2.2_r1",
    url: "https://android.googlesource.com/platform/frameworks/base/+/android-2.2_r1/",
  },
  froyoSystemCore: {
    kind: "official-tagged-source",
    label: "AOSP system/core android-2.2_r1",
    url: "https://android.googlesource.com/platform/system/core/+/android-2.2_r1/",
  },
  icsFrameworks: {
    kind: "official-tagged-source",
    label: "AOSP frameworks/base android-4.0.1_r1",
    url: "https://android.googlesource.com/platform/frameworks/base/+/android-4.0.1_r1/",
  },
  jellyBeanFrameworks: {
    kind: "official-tagged-source",
    label: "AOSP frameworks/base android-4.2.2_r1",
    url: "https://android.googlesource.com/platform/frameworks/base/+/android-4.2.2_r1/",
  },
  currentArchitecture: {
    kind: "official-current-migration-documentation",
    label: "当前Android平台架构文档（仅迁移对照）",
    url: SOURCES.currentArchitecture,
  },
  currentBinder: {
    kind: "official-current-migration-documentation",
    label: "当前Binder概览（仅迁移对照）",
    url: SOURCES.currentBinder,
  },
};
manifest.secondarySourceUrls = [
  SOURCES.volume2,
  SOURCES.volume3,
  SOURCES.volume3Retail,
  SOURCES.buildTags,
  SOURCES.manifest,
  SOURCES.currentArchitecture,
  SOURCES.currentBinder,
];

for (const unit of manifest.units) {
  const entry = entries.find((candidate) => candidate.unit?.id === unit.id);
  if (!entry) throw new Error(`manifest 单元无页面映射：${unit.id}`);
  const volume = entry.profile.volume;
  unit.sourceUnitId = unit.id;
  unit.chapterPath = `${entry.profile.sectionSlug}/${entry.profile.chapterSlug}`;
  unit.sourceAccess = EDITIONS[volume].sourceBasis;
  unit.sourceMode = "independent-rewrite";
  unit.factSourceIds = [
    volume === "v1"
      ? "publisherVolume1"
      : volume === "v2"
        ? "bibliographyVolume2"
        : "bibliographyVolume3",
    ...(volume === "v3" ? ["retailerVolume3"] : []),
    "aospBuildTags",
    volume === "v1"
      ? /init|vold-rild/.test(unit.id)
        ? "froyoSystemCore"
        : "froyoFrameworks"
      : volume === "v2"
        ? "icsFrameworks"
        : "jellyBeanFrameworks",
    "currentArchitecture",
  ];
}

profileRoot.profiles = profileRoot.profiles.map((profile) => {
  const entry = entries.find(
    (candidate) => candidate.profile.chapterSlug === profile.chapterSlug,
  );
  const edition = EDITIONS[profile.volume];
  const technical = technicalSourceFor(
    profile.chapterSlug,
    edition.tag.split(" / ")[0],
  );
  return {
    ...profile,
    sectionSlug: entry.profile.sectionSlug,
    relativePath: path.relative(ROOT, entry.filePath).replaceAll(path.sep, "/"),
    sourceUrl: edition.recordUrl,
    sourceBasis: edition.sourceBasis,
    sourceTag: edition.tag,
    technicalSourceUrl: technical.url,
    formalNodeCount: entry.concepts.length,
  };
});

fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifestRoot, null, 2)}\n`);
fs.writeFileSync(PROFILE_PATH, `${JSON.stringify(profileRoot, null, 2)}\n`);

console.log(
  JSON.stringify(
    {
      book: BOOK,
      pages: entries.length,
      formalUnits: manifest.units.length,
      outlineNodes: formalNodes,
      sourceMode: manifest.sourceMode,
      sourceAccess: "volume-1 authorized-sample; volumes-2-3 outline-only",
    },
    null,
    2,
  ),
);
