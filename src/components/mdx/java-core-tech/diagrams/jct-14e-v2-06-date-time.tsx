import { JctContractMapLab, JctCapacityExperimentLab, JctFailureEvidenceLab } from "./official-jct-lab";

const stages = ["声明合同", "建立模型", "运行探针", "注入失败", "交接证据"];

export function Jct14eV206DateTimeMapLab() { return <JctContractMapLab title="卷II 第6章 日期与时间 API · 合同图" focus="区分时间线、本地日期、本地时间、时区、格式化与旧 API 互操作" stages={stages} />; }
export function Jct14eV206DateTimeExperimentLab() { return <JctCapacityExperimentLab title="卷II 第6章 日期与时间 API · 容量实验" focus="时间语义表、DST 边界测试、格式/解析往返与旧 API 迁移记录" stages={stages} />; }
export function Jct14eV206DateTimeEvidenceLab() { return <JctFailureEvidenceLab title="卷II 第6章 日期与时间 API · 失败证据" focus="用 LocalDateTime 表示全球瞬时事件，或假设每天固定 24 小时" stages={stages} />; }
