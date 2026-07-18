import { JctContractMapLab, JctCapacityExperimentLab, JctFailureEvidenceLab } from "./official-jct-lab";

const stages = ["声明合同", "建立模型", "运行探针", "注入失败", "交接证据"];

export function Jct14eV204NetworkingMapLab() { return <JctContractMapLab title="卷II 第4章 网络 · 合同图" focus="设计客户端/服务器、HTTP 客户端和内置服务器的超时、协议、并发与关闭合同" stages={stages} />; }
export function Jct14eV204NetworkingExperimentLab() { return <JctCapacityExperimentLab title="卷II 第4章 网络 · 容量实验" focus="协议状态机、超时预算、HTTP 证据与服务端压力/关闭测试" stages={stages} />; }
export function Jct14eV204NetworkingEvidenceLab() { return <JctFailureEvidenceLab title="卷II 第4章 网络 · 失败证据" focus="把一次读取当完整消息，或没有连接、请求、空闲超时与响应大小上限" stages={stages} />; }
