import { OfficialDuj3Lab } from "./official-duj3-lab";

const props = {
  "unitId": "duj3-appendix-a-build-openjdk6",
  "title": "附录A 在Windows系统下编译OpenJDK 6",
  "concepts": [
    "附录A 在Windows系统下编译OpenJDK 6",
    "附录A 在Windows系统下编译OpenJDK 6：失败边界",
    "附录A 在Windows系统下编译OpenJDK 6：恢复证据"
  ],
  "chain": [
    "冻结JDK与输入",
    "区分规范和实现",
    "执行章专属探针",
    "注入失败并恢复",
    "保存原始发布证据"
  ],
  "model": {
    "studio": "历史OpenJDK 6构建台",
    "boundary": "archived source → historical toolchain → isolated build → checksum",
    "axisA": {
      "label": "构建目标",
      "levels": [
        "源码获取",
        "依赖冻结",
        "镜像验证"
      ]
    },
    "axisB": {
      "label": "隔离级别",
      "levels": [
        "宿主",
        "容器",
        "离线VM"
      ]
    },
    "fault": "为复现旧构建降低宿主安全配置或污染当前工具链",
    "invariant": "历史构建只在隔离环境运行，输入归档、输出校验和清理可审计",
    "probe": "sha256sum source-archive.tar.gz\nbash configure\nmake images",
    "signal": "归档哈希、工具链清单与镜像输出",
    "practiceMode": "diagnosis",
    "task": "保留旧版Windows构建OpenJDK 6的历史方法，借此识别工具链、平台和版本依赖；执行下面探针，保存基线、变体、故障、恢复与复位证据。",
    "artifact": "历史工具链清单、隔离环境、构建日志、与第1章OpenJDK 12流程的差异"
  }
} as const;

export function Duj3AppendixABuildOpenjdk6StructureLab() { return <OfficialDuj3Lab {...props} view="structure" />; }
export function Duj3AppendixABuildOpenjdk6ExecutionLab() { return <OfficialDuj3Lab {...props} view="execution" />; }
export function Duj3AppendixABuildOpenjdk6EvidenceLab() { return <OfficialDuj3Lab {...props} view="evidence" />; }
