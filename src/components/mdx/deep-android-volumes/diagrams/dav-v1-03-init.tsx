"use client";

import {
  OfficialDavSeriesLab,
  type DavCausalModel,
  type DavCoverageNode,
} from "./official-dav-series-lab";

const unitTitle = "卷I 第3章 深入理解init";
const focus = "从PID 1解析init.rc、启动service并建立属性服务";
const nodes = [
  {
    label: "第3章 深入理解init",
    stage: "锁定历史基线",
    mechanism:
      "第3章 深入理解init在“从PID 1解析init.rc、启动service并建立属性服务”中的责任必须落到创建者、触发条件和服务状态。用同一配置分别触发成功与重启路径，核对PID、属性、退出码和父子关系，防止把声明文件误当顺序脚本。",
    probe:
      "使用action/service解析表、进程父子关系、property socket请求、重启策略与失败日志检查第3章 深入理解init的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.1 概述",
    stage: "复现正常轨迹",
    mechanism:
      "3.1 概述在“从PID 1解析init.rc、启动service并建立属性服务”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用action/service解析表、进程父子关系、property socket请求、重启策略与失败日志排除只凭类名或流程图得出的结论。",
    probe:
      "使用action/service解析表、进程父子关系、property socket请求、重启策略与失败日志检查3.1 概述的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.2 init分析",
    stage: "注入单一故障",
    mechanism:
      "3.2 init分析在“从PID 1解析init.rc、启动service并建立属性服务”中的责任必须落到创建者、触发条件和服务状态。用同一配置分别触发成功与重启路径，核对PID、属性、退出码和父子关系，防止把声明文件误当顺序脚本。",
    probe:
      "使用action/service解析表、进程父子关系、property socket请求、重启策略与失败日志检查3.2 init分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.2.1 解析配置文件",
    stage: "定位首个分叉",
    mechanism:
      "3.2.1 解析配置文件在“从PID 1解析init.rc、启动service并建立属性服务”中的责任必须落到创建者、触发条件和服务状态。用同一配置分别触发成功与重启路径，核对PID、属性、退出码和父子关系，防止把声明文件误当顺序脚本。",
    probe:
      "使用action/service解析表、进程父子关系、property socket请求、重启策略与失败日志检查3.2.1 解析配置文件的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.2.2 解析service",
    stage: "恢复同输入重放",
    mechanism:
      "3.2.2 解析service在“从PID 1解析init.rc、启动service并建立属性服务”中的责任必须落到创建者、触发条件和服务状态。用同一配置分别触发成功与重启路径，核对PID、属性、退出码和父子关系，防止把声明文件误当顺序脚本。",
    probe:
      "使用action/service解析表、进程父子关系、property socket请求、重启策略与失败日志检查3.2.2 解析service的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.2.3 init控制service",
    stage: "锁定历史基线",
    mechanism:
      "3.2.3 init控制service在“从PID 1解析init.rc、启动service并建立属性服务”中的责任必须落到创建者、触发条件和服务状态。用同一配置分别触发成功与重启路径，核对PID、属性、退出码和父子关系，防止把声明文件误当顺序脚本。",
    probe:
      "使用action/service解析表、进程父子关系、property socket请求、重启策略与失败日志检查3.2.3 init控制service的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.2.4 属性服务",
    stage: "复现正常轨迹",
    mechanism:
      "3.2.4 属性服务在“从PID 1解析init.rc、启动service并建立属性服务”中的责任必须落到创建者、触发条件和服务状态。用同一配置分别触发成功与重启路径，核对PID、属性、退出码和父子关系，防止把声明文件误当顺序脚本。",
    probe:
      "使用action/service解析表、进程父子关系、property socket请求、重启策略与失败日志检查3.2.4 属性服务的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "3.3 本章小结",
    stage: "注入单一故障",
    mechanism:
      "3.3 本章小结在“从PID 1解析init.rc、启动service并建立属性服务”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用action/service解析表、进程父子关系、property socket请求、重启策略与失败日志排除只凭类名或流程图得出的结论。",
    probe:
      "使用action/service解析表、进程父子关系、property socket请求、重启策略与失败日志检查3.3 本章小结的输入、状态变化、错误出口和释放结果",
  },
] satisfies DavCoverageNode[];
const versions = ["卷I / Android 2.2 / API 8"];
const stages = [
  "锁定历史基线",
  "复现正常轨迹",
  "注入单一故障",
  "定位首个分叉",
  "恢复同输入重放",
];
const model = {
  sourceTag: "android-2.2_r1",
  sourcePath: "platform/system/core @ android-2.2_r1",
  invariant:
    "在android-2.2_r1固定输入下，从PID 1解析init.rc、启动service并建立属性服务的入口身份、状态拥有者、成功结果、错误返回和资源释放均可重复观察",
  fault: "把init.rc当静态脚本，忽略事件队列、服务状态和属性权限",
  evidence:
    "action/service解析表、进程父子关系、property socket请求、重启策略与失败日志",
  boundary:
    "从PID 1解析init.rc、启动service并建立属性服务的第一个线程、进程、Binder、JNI或持久状态边界",
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
