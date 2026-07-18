import { JctContractMapLab, JctCapacityExperimentLab, JctFailureEvidenceLab } from "./official-jct-lab";

const stages = ["声明合同", "建立模型", "运行探针", "注入失败", "交接证据"];

export function Jct14eV212AdvancedSwingGraphicsMapLab() { return <JctContractMapLab title="卷II 第12章 高级 Swing 与图形 · 合同图" focus="掌握表格、行列、单元渲染编辑、树、AWT、位图与打印的模型和渲染管线" stages={stages} />; }
export function Jct14eV212AdvancedSwingGraphicsExperimentLab() { return <JctCapacityExperimentLab title="卷II 第12章 高级 Swing 与图形 · 容量实验" focus="表格/树模型合同、渲染状态矩阵、图像内存预算与打印预览测试" stages={stages} />; }
export function Jct14eV212AdvancedSwingGraphicsEvidenceLab() { return <JctFailureEvidenceLab title="卷II 第12章 高级 Swing 与图形 · 失败证据" focus="在 renderer 中保存可变业务状态，或按屏幕像素假设直接打印而忽略坐标变换" stages={stages} />; }
