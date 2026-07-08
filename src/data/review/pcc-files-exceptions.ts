import type { ReviewQuestion } from "./types";

/** Python编程：从入门到实践 · 文件与异常复习题 */
export const pccFilesExceptionsQuestions: ReviewQuestion[] = [
  {
    id: "pcc-files-exceptions-1",
    chapter: "pcc-files-exceptions",
    level: 1,
    question: "为什么推荐用 with 语句操作文件，而不是 open + close？",
    answer:
      "with 语句在离开代码块时（无论是正常退出还是异常退出）自动调用 `f.close()`，保证文件一定会被关闭。\n\n传统方式的问题：`f = open(...); content = f.read(); result = process(content); f.close()`——如果 process(content) 抛出异常，f.close() 不会执行，文件不会被关闭，可能导致资源泄漏或数据丢失。\n\nwith 方式：\n```python\nwith open(\"data.txt\", \"r\") as f:\n    content = f.read()\n    result = process(content)  # 即使异常，with 也自动关闭\n```\n\nwith 是上下文管理器协议的语法糖——进入时调用 __enter__，离开时调用 __exit__（即 close）。推荐所有文件操作都用 with。",
    tags: ["with语句", "文件操作", "资源管理"],
  },
  {
    id: "pcc-files-exceptions-2",
    chapter: "pcc-files-exceptions",
    level: 2,
    question: "解释 try-except-else-finally 中各块的作用和执行顺序。",
    answer:
      "- **try**：放可能抛出异常的代码\n- **except**：捕获并处理特定异常。可以有多个，从具体到一般匹配\n- **else**：try 块没有抛出任何异常时执行。适合放依赖 try 成功的后续逻辑\n- **finally**：无论是否抛出异常都会执行。适合放清理逻辑（关闭文件、释放锁）\n\n执行顺序：\n- 无异常：try → else → finally\n- 有异常被捕获：try（异常处中断）→ except → finally\n- 有异常未捕获：try（异常处中断）→ finally → 异常继续向上传播\n\nfinally 总是最后执行，即使 try/except 中有 return 语句，finally 也会在 return 之前执行。",
    tags: ["try-except", "else", "finally"],
  },
  {
    id: "pcc-files-exceptions-3",
    chapter: "pcc-files-exceptions",
    level: 3,
    question: "以下代码有什么问题？如何修复？\n```python\nf = open(\"data.txt\", \"r\")\ncontent = f.read()\nresult = process(content)\nf.close()\n```",
    answer:
      "问题：如果 `process(content)` 抛出异常，`f.close()` 不会执行，文件不会被关闭，可能导致资源泄漏或数据损坏。\n\n修复——使用 with 语句：\n```python\nwith open(\"data.txt\", \"r\") as f:\n    content = f.read()\n    result = process(content)\n```\n\nwith 语句在离开代码块时（无论正常退出还是异常退出）自动调用 f.close()，保证文件一定被关闭。这是 Python 管理资源的推荐方式。\n\n如果必须手动管理（极少数情况），应该用 try-finally：\n```python\nf = open(\"data.txt\", \"r\")\ntry:\n    content = f.read()\n    result = process(content)\nfinally:\n    f.close()\n```\n但 with 是更简洁的等价写法。",
    tags: ["文件操作", "with语句", "异常安全"],
  },
  {
    id: "pcc-files-exceptions-4",
    chapter: "pcc-files-exceptions",
    level: 4,
    question: "为什么不能用裸 except（except:）捕获所有异常？正确的异常处理方式是什么？",
    answer:
      "裸 `except:` 会捕获所有异常，包括 KeyboardInterrupt（Ctrl+C）和 SystemExit——这会让程序无法正常中断。此外它还会隐藏真正的 bug，让调试变得困难。\n\n正确的异常处理方式：\n1. **捕获具体异常**：`except ValueError:`、`except FileNotFoundError:`。精确处理已知错误。\n2. **从具体到一般**：先 except 具体异常，最后可以 `except Exception as e:` 兜底（排除 KeyboardInterrupt 和 SystemExit）。\n3. **记录异常信息**：`except Exception as e: print(f\"错误: {e}\")` 或用 logging 模块记录。\n4. **不要吞掉异常**：except 块不能只 pass——至少要记录日志或向上重新抛出。\n\n```python\ntry:\n    ...\nexcept ValueError as e:\n    print(f\"值错误: {e}\")\nexcept FileNotFoundError:\n    print(\"文件不存在\")\nexcept Exception as e:\n    logging.error(f\"未知错误: {e}\", exc_info=True)\n    raise  # 重新抛出，让上层处理\n```",
    tags: ["裸except", "异常捕获", "最佳实践"],
  },
];
