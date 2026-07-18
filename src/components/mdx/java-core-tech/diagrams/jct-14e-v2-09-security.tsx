import { JctContractMapLab, JctCapacityExperimentLab, JctFailureEvidenceLab } from "./official-jct-lab";

const stages = ["声明合同", "建立模型", "运行探针", "注入失败", "交接证据"];

export function Jct14eV209SecurityMapLab() { return <JctContractMapLab title="卷II 第9章 安全 · 合同图" focus="理解类加载、身份认证、数字签名和加密的信任边界与密钥生命周期" stages={stages} />; }
export function Jct14eV209SecurityExperimentLab() { return <JctCapacityExperimentLab title="卷II 第9章 安全 · 容量实验" focus="威胁模型、信任库清单、签名验证与密钥轮换演练" stages={stages} />; }
export function Jct14eV209SecurityEvidenceLab() { return <JctFailureEvidenceLab title="卷II 第9章 安全 · 失败证据" focus="自制密码算法、把加密等同于认证，或泄露密钥和敏感错误上下文" stages={stages} />; }
