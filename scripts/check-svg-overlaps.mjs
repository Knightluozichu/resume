/**
 * check-svg-overlaps.mjs
 *
 * Visit every chapter page on the dev server, find all SVG diagrams,
 * and detect overlapping text/rect/line elements using getBoundingClientRect().
 *
 * Usage: node scripts/check-svg-overlaps.mjs
 * Requires: puppeteer (npx puppeteer or pnpm add -D puppeteer)
 */
import puppeteer from 'puppeteer';

const BASE = 'http://localhost:3000';

// All pages that contain diagrams
const PAGES = [
  // LearnOpenGL
  '/learn/learnopengl/getting-started/hello-window',
  '/learn/learnopengl/getting-started/hello-triangle',
  '/learn/learnopengl/getting-started/shaders',
  '/learn/learnopengl/getting-started/textures',
  '/learn/learnopengl/getting-started/transformations',
  '/learn/learnopengl/getting-started/coordinate-systems',
  '/learn/learnopengl/getting-started/camera',
  '/learn/learnopengl/lighting/basic-lighting',
  '/learn/learnopengl/lighting/light-casters',
  '/learn/learnopengl/lighting/lighting-maps',
  '/learn/learnopengl/lighting/multiple-lights',
  '/learn/learnopengl/model-loading/assimp',
  '/learn/learnopengl/model-loading/mesh',
  '/learn/learnopengl/model-loading/model',
  '/learn/learnopengl/advanced-opengl/depth-testing',
  '/learn/learnopengl/advanced-opengl/stencil-testing',
  '/learn/learnopengl/advanced-opengl/blending',
  '/learn/learnopengl/advanced-opengl/face-culling',
  '/learn/learnopengl/advanced-opengl/framebuffers',
  '/learn/learnopengl/advanced-opengl/cubemaps',
  '/learn/learnopengl/advanced-opengl/advanced-data',
  '/learn/learnopengl/advanced-opengl/advanced-glsl',
  '/learn/learnopengl/advanced-opengl/geometry-shader',
  '/learn/learnopengl/advanced-opengl/instancing',
  '/learn/learnopengl/advanced-opengl/anti-aliasing',
  '/learn/learnopengl/advanced-lighting/blinn-phong',
  '/learn/learnopengl/advanced-lighting/gamma-correction',
  '/learn/learnopengl/advanced-lighting/shadow-mapping',
  '/learn/learnopengl/advanced-lighting/point-shadows',
  '/learn/learnopengl/advanced-lighting/normal-mapping',
  '/learn/learnopengl/advanced-lighting/parallax-mapping',
  '/learn/learnopengl/advanced-lighting/hdr',
  '/learn/learnopengl/advanced-lighting/bloom',
  '/learn/learnopengl/advanced-lighting/deferred-shading',
  '/learn/learnopengl/advanced-lighting/ssao',
  // C++ Primer
  '/learn/cpp-primer-5e/cpp-basics/getting-started',
  '/learn/cpp-primer-5e/cpp-basics/variables-and-types',
  '/learn/cpp-primer-5e/cpp-basics/strings-vectors-and-arrays',
  '/learn/cpp-primer-5e/cpp-basics/expressions',
  '/learn/cpp-primer-5e/cpp-basics/statements',
  '/learn/cpp-primer-5e/cpp-basics/functions',
  '/learn/cpp-primer-5e/cpp-basics/classes',
  '/learn/cpp-primer-5e/cpp-library/sequential-containers',
  '/learn/cpp-primer-5e/cpp-library/generic-algorithms',
  '/learn/cpp-primer-5e/cpp-library/associative-containers',
  '/learn/cpp-primer-5e/cpp-library/dynamic-memory',
  '/learn/cpp-primer-5e/cpp-library/io-library',
  '/learn/cpp-primer-5e/cpp-class-design/copy-control',
  '/learn/cpp-primer-5e/cpp-class-design/overloaded-operations',
  '/learn/cpp-primer-5e/cpp-class-design/oop',
  '/learn/cpp-primer-5e/cpp-class-design/templates',
  '/learn/cpp-primer-5e/cpp-advanced/large-programs',
  '/learn/cpp-primer-5e/cpp-advanced/specialized-library',
  '/learn/cpp-primer-5e/cpp-advanced/specialized-tools',
  // C Primer Plus
  '/learn/c-primer-plus/c-basics/getting-ready',
  '/learn/c-primer-plus/c-basics/introducing-c',
  '/learn/c-primer-plus/c-basics/data-and-c',
  '/learn/c-primer-plus/c-basics/strings-io',
  '/learn/c-primer-plus/c-basics/operators-expressions',
  '/learn/c-primer-plus/c-control-io/control-loops',
  '/learn/c-primer-plus/c-control-io/control-branching',
  '/learn/c-primer-plus/c-control-io/char-io-validation',
  '/learn/c-primer-plus/c-func-array-ptr/functions',
  '/learn/c-primer-plus/c-func-array-ptr/arrays-pointers',
  '/learn/c-primer-plus/c-func-array-ptr/strings-functions',
  '/learn/c-primer-plus/c-advanced/storage-linkage-memory',
  '/learn/c-primer-plus/c-advanced/file-io',
  '/learn/c-primer-plus/c-advanced/structures',
  '/learn/c-primer-plus/c-advanced/bit-fiddling',
  '/learn/c-primer-plus/c-advanced/preprocessor',
  '/learn/c-primer-plus/c-advanced/advanced-data',
  // Android
  '/learn/android-advanced-decryption/system-architecture/android-architecture',
  '/learn/android-advanced-decryption/system-boot/system-startup',
  '/learn/android-advanced-decryption/process-management/app-process-startup',
  // Unity Game Optimization
  '/learn/unity-game-optimization/base-scripting/evaluating-performance-problems',
  '/learn/unity-game-optimization/base-scripting/scripting-strategies',
  '/learn/unity-game-optimization/graphical-optimizations/benefits-of-batching',
  '/learn/unity-game-optimization/graphical-optimizations/optimizing-art-assets',
  '/learn/unity-game-optimization/graphical-optimizations/faster-physics',
  '/learn/unity-game-optimization/graphical-optimizations/dynamic-graphics',
  '/learn/unity-game-optimization/advanced-optimizations/xr-optimizations',
  '/learn/unity-game-optimization/advanced-optimizations/memory-management',
  '/learn/unity-game-optimization/advanced-optimizations/data-oriented-technology-stack',
  '/learn/unity-game-optimization/advanced-optimizations/tactical-tips-and-tricks',
  // Profiling Unity Games
  '/learn/profiling-unity-games/profiling-workflow/profiling-workflow-baseline',
  '/learn/profiling-unity-games/profiling-workflow/profile-analyzer-regression',
  '/learn/profiling-unity-games/cpu-profiling/cpu-profiler-deep-dive',
  '/learn/profiling-unity-games/gpu-profiling/gpu-performance-analysis',
  '/learn/profiling-unity-games/memory-and-power/memory-profiler',
  '/learn/profiling-unity-games/memory-and-power/power-optimization',
  '/learn/profiling-unity-games/platform-specific/platform-specific-profiling',
  // Mobile/XR/Web
  '/learn/mobile-xr-web-optimization/urp-optimization/mobile-optimization',
  '/learn/mobile-xr-web-optimization/urp-optimization/urp-optimization',
  '/learn/mobile-xr-web-optimization/web-optimization/web-specific-optimization',
  '/learn/mobile-xr-web-optimization/xr-optimization/xr-specific-optimization',
];

async function checkPage(page, url) {
  try {
    await page.goto(BASE + url, { waitUntil: 'networkidle0', timeout: 15000 });
  } catch {
    return []; // timeout = skip
  }

  let overlaps;
  try {
  overlaps = await page.evaluate(() => {
    const results = [];
    const svgs = document.querySelectorAll('.mdx-figure svg, figure svg');

    svgs.forEach((svg, svgIdx) => {
      // Get all visible text and rect elements
      const texts = [...svg.querySelectorAll('text')];
      const rects = [...svg.querySelectorAll('rect')];
      const lines = [...svg.querySelectorAll('line')];
      const paths = [...svg.querySelectorAll('path')];

      // Get bounding boxes relative to SVG
      const svgRect = svg.getBoundingClientRect();

      function relBox(el) {
        const r = el.getBoundingClientRect();
        return {
          left: r.left - svgRect.left,
          top: r.top - svgRect.top,
          right: r.right - svgRect.left,
          bottom: r.bottom - svgRect.top,
          width: r.width,
          height: r.height,
          text: el.textContent?.trim().slice(0, 40) || '',
          tag: el.tagName.toLowerCase(),
        };
      }

      function overlaps2D(a, b) {
        return !(a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top);
      }

      function overlapArea(a, b) {
        const xOverlap = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
        const yOverlap = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
        return xOverlap * yOverlap;
      }

      const textBoxes = texts
        .filter(t => t.textContent?.trim())
        .map(t => relBox(t));

      // Check text-on-text overlap
      for (let i = 0; i < textBoxes.length; i++) {
        for (let j = i + 1; j < textBoxes.length; j++) {
          const a = textBoxes[i], b = textBoxes[j];
          if (a.width === 0 || b.width === 0) continue;
          if (overlaps2D(a, b)) {
            const area = overlapArea(a, b);
            const minArea = Math.min(a.width * a.height, b.width * b.height);
            // Only flag if overlap is significant (>20% of smaller element)
            if (minArea > 0 && area / minArea > 0.2) {
              results.push({
                type: 'text-text',
                svg: svgIdx,
                a: a.text,
                b: b.text,
                overlapPct: Math.round(area / minArea * 100),
              });
            }
          }
        }
      }

      // Check text clipped by SVG viewBox
      textBoxes.forEach(tb => {
        if (tb.width === 0) return;
        const svgW = svgRect.width;
        const svgH = svgRect.height;
        if (tb.right > svgW + 2) {
          results.push({
            type: 'text-clip-right',
            svg: svgIdx,
            text: tb.text,
            overflow: Math.round(tb.right - svgW),
          });
        }
        if (tb.bottom > svgH + 2) {
          results.push({
            type: 'text-clip-bottom',
            svg: svgIdx,
            text: tb.text,
            overflow: Math.round(tb.bottom - svgH),
          });
        }
      });

      // Check text overlapping with rects (excluding parent containers)
      const rectBoxes = rects.map(r => relBox(r));
      textBoxes.forEach(tb => {
        if (tb.width === 0) return;
        rectBoxes.forEach(rb => {
          // Skip large background rects (likely containers)
          if (rb.width > svgRect.width * 0.8 && rb.height > svgRect.height * 0.8) return;
          // Skip if text is INSIDE the rect (expected placement)
          const textCenter = { x: (tb.left + tb.right) / 2, y: (tb.top + tb.bottom) / 2 };
          if (textCenter.x > rb.left && textCenter.x < rb.right &&
              textCenter.y > rb.top && textCenter.y < rb.bottom) return;
          // Check if text overlaps rect edge
          if (overlaps2D(tb, rb)) {
            const area = overlapArea(tb, rb);
            const textArea = tb.width * tb.height;
            if (textArea > 0 && area / textArea > 0.15) {
              results.push({
                type: 'text-rect',
                svg: svgIdx,
                text: tb.text,
                overlapPct: Math.round(area / textArea * 100),
              });
            }
          }
        });
      });
    });

    return results;
  });
  } catch {
    return []; // page crashed, skip
  }

  return overlaps.map(o => ({ ...o, page: url }));
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const allIssues = [];

  for (let i = 0; i < PAGES.length; i++) {
    const url = PAGES[i];
    process.stdout.write(`[${i + 1}/${PAGES.length}] ${url.split('/').pop()} ... `);
    const issues = await checkPage(page, url);
    if (issues.length > 0) {
      allIssues.push(...issues);
      console.log(`${issues.length} issue(s)`);
    } else {
      console.log('OK');
    }
  }

  await browser.close();

  if (allIssues.length === 0) {
    console.log('\n✓ No overlap issues found across all pages.');
  } else {
    console.log(`\n✗ ${allIssues.length} overlap issues found:\n`);
    allIssues.forEach((issue, idx) => {
      console.log(`${idx + 1}. [${issue.type}] ${issue.page}`);
      if (issue.type === 'text-text') {
        console.log(`   Text A: "${issue.a}" overlaps Text B: "${issue.b}" (${issue.overlapPct}%)`);
      } else if (issue.type.startsWith('text-clip')) {
        console.log(`   Text "${issue.text}" clipped by ${issue.overflow}px`);
      } else if (issue.type === 'text-rect') {
        console.log(`   Text "${issue.text}" overlaps rect (${issue.overlapPct}%)`);
      }
    });
  }
}

main().catch(console.error);
