import { JctContractMapLab, JctCapacityExperimentLab, JctFailureEvidenceLab } from "./official-jct-lab";

const stages = ["声明合同", "建立模型", "运行探针", "注入失败", "交接证据"];

export function Jct14eV106InterfacesLambdasInnerMapLab() { return <JctContractMapLab title="卷I 第6章 接口、Lambda 与内部类 · 合同图" focus="用接口表达能力，用 Lambda 传递行为，并理解内部类捕获、服务加载与动态代理" stages={stages} />; }
export function Jct14eV106InterfacesLambdasInnerExperimentLab() { return <JctCapacityExperimentLab title="卷I 第6章 接口、Lambda 与内部类 · 容量实验" focus="接口演化矩阵、捕获变量轨迹、ServiceLoader 与代理调用日志" stages={stages} />; }
export function Jct14eV106InterfacesLambdasInnerEvidenceLab() { return <JctFailureEvidenceLab title="卷I 第6章 接口、Lambda 与内部类 · 失败证据" focus="把 Lambda 当作匿名语法糖而忽略目标类型和捕获生命周期，或让代理吞掉异常" stages={stages} />; }
