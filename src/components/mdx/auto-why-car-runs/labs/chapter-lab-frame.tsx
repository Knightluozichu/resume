"use client";

import { type ComponentType, useState } from "react";

/**
 * 给章级汽车实验提供统一、真实的复位能力。通过更换 key 重新挂载实验，
 * 因而定时器、答案、滑块和模式都会回到该实验声明的初始状态。
 */
export function withChapterReset<Props extends object>(
  Lab: ComponentType<Props>,
) {
  function ResettableChapterLab(props: Props) {
    const [revision, setRevision] = useState(0);

    return (
      <div className="not-prose">
        <Lab key={revision} {...props} />
        <div className="-mt-5 mb-8 flex justify-end px-4">
          <button
            type="button"
            onClick={() => setRevision((value) => value + 1)}
            className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            重置实验
          </button>
        </div>
      </div>
    );
  }

  ResettableChapterLab.displayName = `Resettable${Lab.displayName ?? Lab.name ?? "AutoLab"}`;
  return ResettableChapterLab;
}
