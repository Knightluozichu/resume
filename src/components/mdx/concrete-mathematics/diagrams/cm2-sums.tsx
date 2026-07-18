import { ConcreteMathOfficialLab, type ConcreteSnapshot } from "./official-lab";
const snapshots:ConcreteSnapshot[]=[
  {
    "label": "求和记号",
    "object": "把索引集合、被加项和边界显式分离，空和约定为零。",
    "transform": "改变n并观察求和记号的结构",
    "certificate": "用小规模枚举与公式重算求和记号",
    "warning": "变量换元后仍沿用旧上下界，公式主体正确但边界差一项。"
  },
  {
    "label": "扰动法",
    "object": "平移索引或参数后将两个和相减，使大部分项消去。",
    "transform": "改变n并观察扰动法的结构",
    "certificate": "用小规模枚举与公式重算扰动法",
    "warning": "无条件交换无限求和顺序，忽略绝对收敛等前提。"
  },
  {
    "label": "多重求和",
    "object": "通过改变求和顺序、区域或计数对象化简嵌套求和。",
    "transform": "令S_n为零到n之和，把顺序与逆序逐项相加得到每对都是n，共n加1对，因此二S_n=n(n+1)。有限微积分则用二项式基让差分像幂函数求导一样降阶。",
    "certificate": "用小规模枚举与公式重算多重求和",
    "warning": "变量换元后仍沿用旧上下界，公式主体正确但边界差一项。"
  },
  {
    "label": "有限微积分",
    "object": "差分与不定和对应微分与积分，可系统构造求和公式。",
    "transform": "改变n并观察有限微积分的结构",
    "certificate": "用小规模枚举与公式重算有限微积分",
    "warning": "无条件交换无限求和顺序，忽略绝对收敛等前提。"
  },
  {
    "label": "机械求和",
    "object": "超几何项可用Gosper-Zeilberger思想寻找证书与递推。",
    "transform": "改变n并观察机械求和的结构",
    "certificate": "分析循环总成本时先写精确索引域，再交换求和或构造望远镜项；报告保留边界项，不能只给大O掩盖偏一错误。",
    "warning": "变量换元后仍沿用旧上下界，公式主体正确但边界差一项。"
  }
];
export function Cm2SumsObjectLab(){return <ConcreteMathOfficialLab title="第2章 求和 · 对象" caption="改变规模，先观察离散对象与边界。" mode="sums" snapshots={snapshots}/>}
export function Cm2SumsDerivationLab(){return <ConcreteMathOfficialLab title="第2章 求和 · 推导" caption="推进变换，保留索引、初值与边界项。" mode="sums" snapshots={snapshots} initial={1}/>}
export function Cm2SumsEvidenceLab(){return <ConcreteMathOfficialLab title="第2章 求和 · 证书" caption="用反例、误差和重放完成验收。" mode="sums" snapshots={snapshots} initial={2}/>}
