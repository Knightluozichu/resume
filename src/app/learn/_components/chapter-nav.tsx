import Link from "next/link";

/**
 * 左侧章节树（Server Component）
 * 占位章节：路由将在后续章节任务中落地（M3 起），当前点击为 404 属预期。
 */
const gettingStarted = [
  { href: "/learn/hello-window", title: "你好，窗口" },
  { href: "/learn/hello-triangle", title: "你好，三角形" },
  { href: "/learn/shaders", title: "着色器" },
];

export function ChapterNav() {
  return (
    <nav aria-label="章节目录">
      <h2 className="px-2 text-xs font-medium text-secondary">入门</h2>
      <ul className="mt-2 flex flex-col gap-1">
        {gettingStarted.map((chapter) => (
          <li key={chapter.href}>
            <Link
              href={chapter.href}
              className="block rounded-control px-2 py-1 text-secondary transition-colors duration-(--duration-hover) ease-standard hover:text-primary"
            >
              {chapter.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
