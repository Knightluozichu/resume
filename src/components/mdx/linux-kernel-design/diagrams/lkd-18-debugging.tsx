import { OfficialLinuxKernelDesignLab } from "./official-linux-kernel-design-lab";

const data = {
  title: "第18章 调试",
  label: "设备 · 调试与工程",
  color: "#be123c",
  soft: "#ffe4e6",
  chain: [
    "冻结故障输入",
    "提高可观察性",
    "捕获oops与符号",
    "缩小探测范围",
    "二分定位提交",
    "整理证据求助",
  ],
  concepts: [
    "第18章 调试",
    "18.1 准备开始",
    "18.2 内核中的bug",
    "18.3 通过打印来调试",
    "18.3.1 健壮性",
    "18.3.2 日志等级",
    "18.3.3 记录缓冲区",
    "18.3.4 syslogd和klogd",
    "18.3.5 从printf()到printk()的转换",
    "18.4 oops",
    "18.4.1 ksymoops",
    "18.4.2 kallsyms",
    "18.5 内核调试配置选项",
    "18.6 引发bug并打印信息",
    "18.7 神奇的系统请求键",
    "18.8 内核调试器的传奇",
    "18.8.1 gdb",
    "18.8.2 kgdb",
    "18.9 探测系统",
    "18.9.1 用UID作为选择条件",
    "18.9.2 使用条件变量",
    "18.9.3 使用统计量",
    "18.9.4 重复频率限制",
    "18.10 用二分查找法找出引发罪恶的变更",
    "18.11 使用Git进行二分搜索",
    "18.12 当所有的努力都失败时：社区",
    "18.13 小结",
  ],
} as const;

export function Lkd18DebuggingMapLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="map" />;
}

export function Lkd18DebuggingExperimentLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="experiment" />;
}

export function Lkd18DebuggingEvidenceLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="evidence" />;
}
