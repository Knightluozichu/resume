import { OfficialDuj3Lab } from "./official-duj3-lab";

const props = {
  "unitId": "duj3-part-1-approaching-java",
  "title": "第一部分 走近Java",
  "concepts": [
    "第一部分 走近Java",
    "第一部分 走近Java：失败边界",
    "第一部分 走近Java：恢复证据"
  ],
  "chain": [
    "冻结JDK与输入",
    "区分规范和实现",
    "执行章专属探针",
    "注入失败并恢复",
    "保存原始发布证据"
  ],
  "model": {
    "studio": "Java体系与源码入口台",
    "boundary": "Java SE规范 → OpenJDK源码 → HotSpot构建 → 镜像",
    "axisA": {
      "label": "事实层次",
      "levels": [
        "规范",
        "源码",
        "产品"
      ]
    },
    "axisB": {
      "label": "时间边界",
      "levels": [
        "JDK 12",
        "JDK 13预览",
        "JDK 25复核"
      ]
    },
    "fault": "用今天的默认行为改写2019年证据",
    "invariant": "源码提交、boot JDK、构建参数与镜像校验可重放",
    "probe": "git rev-parse HEAD\nbash configure --with-debug-level=slowdebug\nmake images",
    "signal": "configure摘要与镜像java -version",
    "practiceMode": "design",
    "task": "建立Java技术体系、虚拟机家族与OpenJDK构建的历史坐标，理解规范、实现和发行版不是同一层次；执行下面探针，保存基线、变体、故障、恢复与复位证据。",
    "artifact": "技术体系分层图、虚拟机谱系、JDK构建环境指纹与源码调试入口"
  }
} as const;

export function Duj3Part1ApproachingJavaStructureLab() { return <OfficialDuj3Lab {...props} view="structure" />; }
export function Duj3Part1ApproachingJavaExecutionLab() { return <OfficialDuj3Lab {...props} view="execution" />; }
export function Duj3Part1ApproachingJavaEvidenceLab() { return <OfficialDuj3Lab {...props} view="evidence" />; }
