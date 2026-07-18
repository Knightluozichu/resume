import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { format } from "prettier";
import ts from "typescript";

const projectRoot = process.cwd();
const contentRoot = path.join(projectRoot, "content");
const componentMapPath = path.join(
  projectRoot,
  "src/components/mdx/mdx-components.tsx",
);
const outputPath = path.join(
  projectRoot,
  "src/components/mdx/chapter-component-registry.ts",
);
const checkOnly = process.argv.includes("--check");

function getMdxComponentKeys() {
  const source = fs.readFileSync(componentMapPath, "utf8");
  const sourceFile = ts.createSourceFile(
    componentMapPath,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const keys = new Set();

  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      node.name.getText(sourceFile) === "mdxComponents" &&
      node.initializer &&
      ts.isObjectLiteralExpression(node.initializer)
    ) {
      for (const property of node.initializer.properties) {
        if (ts.isShorthandPropertyAssignment(property)) {
          keys.add(property.name.text);
        } else if (ts.isPropertyAssignment(property)) {
          const name = property.name;
          if (ts.isIdentifier(name) || ts.isStringLiteral(name)) {
            keys.add(name.text);
          }
        }
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return keys;
}

function listMdxFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...listMdxFiles(entryPath));
    else if (entry.name.endsWith(".mdx")) files.push(entryPath);
  }
  return files;
}

function parseComponentImports(source, filePath) {
  const imports = [];
  let cursor = 0;
  let importSource = "";

  while (cursor < source.length) {
    const whitespace = /^\s*/.exec(source.slice(cursor))?.[0].length ?? 0;
    cursor += whitespace;
    if (!/^import\b/.test(source.slice(cursor))) break;
    const end = source.indexOf(";", cursor);
    if (end < 0) throw new Error(`${filePath}: unterminated component import`);
    importSource += `${source.slice(cursor, end + 1)}\n`;
    cursor = end + 1;
  }

  if (!importSource) return imports;
  const sourceFile = ts.createSourceFile(
    filePath,
    importSource,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

  for (const statement of sourceFile.statements) {
    if (!ts.isImportDeclaration(statement)) {
      throw new Error(`${filePath}: unsupported statement in MDX import block`);
    }
    if (!ts.isStringLiteral(statement.moduleSpecifier)) {
      throw new Error(
        `${filePath}: component import needs a string module path`,
      );
    }
    const importClause = statement.importClause;
    if (!importClause || importClause.isTypeOnly) continue;
    const names = [];

    if (importClause.name) {
      names.push({ exported: "default", local: importClause.name.text });
    }
    if (importClause.namedBindings) {
      if (ts.isNamespaceImport(importClause.namedBindings)) {
        throw new Error(
          `${filePath}: namespace component imports are not supported`,
        );
      }
      for (const element of importClause.namedBindings.elements) {
        if (element.isTypeOnly) continue;
        names.push({
          exported: element.propertyName?.text ?? element.name.text,
          local: element.name.text,
        });
      }
    }

    imports.push({ modulePath: statement.moduleSpecifier.text, names });
  }

  return imports;
}

function moduleExists(modulePath, filePath) {
  if (!modulePath.startsWith("@/")) {
    throw new Error(
      `${filePath}: unsupported component module \`${modulePath}\``,
    );
  }

  const absoluteBase = path.join(projectRoot, "src", modulePath.slice(2));
  const candidates = [
    absoluteBase,
    `${absoluteBase}.ts`,
    `${absoluteBase}.tsx`,
    path.join(absoluteBase, "index.ts"),
    path.join(absoluteBase, "index.tsx"),
  ];
  return candidates.some((candidate) => fs.existsSync(candidate));
}

function collectRouteComponents() {
  const globalComponents = getMdxComponentKeys();
  const routes = [];
  const missingModules = [];

  for (const filePath of listMdxFiles(contentRoot).sort()) {
    const source = matter(fs.readFileSync(filePath, "utf8")).content;
    const imports = parseComponentImports(source, filePath);
    const modules = [];
    const localNames = new Set();

    for (const imported of imports) {
      const names = imported.names.filter(
        ({ local }) => !globalComponents.has(local),
      );
      if (names.length === 0) continue;
      if (!moduleExists(imported.modulePath, filePath)) {
        missingModules.push(`${filePath}: ${imported.modulePath}`);
        continue;
      }

      for (const { local } of names) {
        if (localNames.has(local)) {
          throw new Error(
            `${filePath}: duplicate component import \`${local}\``,
          );
        }
        localNames.add(local);
      }
      modules.push({ modulePath: imported.modulePath, names });
    }

    if (modules.length === 0) continue;
    const route = path
      .relative(contentRoot, filePath)
      .replace(/\\/g, "/")
      .replace(/\.mdx$/, "");
    routes.push({ route, modules });
  }

  if (missingModules.length > 0) {
    throw new Error(
      `component modules not found (${missingModules.length}):\n${missingModules.join("\n")}`,
    );
  }

  return routes;
}

function renderRegistry(routes) {
  const lines = [
    "// Generated by scripts/generate-chapter-component-registry.mjs.",
    "// MDX imports are declarations only; next-mdx-remote removes them at runtime.",
    'import type { MDXRemoteProps } from "next-mdx-remote/rsc";',
    "",
    'type ChapterMdxComponents = NonNullable<MDXRemoteProps["components"]>;',
    "type ChapterComponentLoader = () => Promise<ChapterMdxComponents>;",
    "",
    "const chapterComponentLoaders: Record<string, ChapterComponentLoader> = {",
  ];

  for (const { route, modules } of routes) {
    lines.push(`  ${JSON.stringify(route)}: async () => {`);
    if (modules.length === 1) {
      lines.push(
        `    const module0 = await import(${JSON.stringify(modules[0].modulePath)});`,
      );
    } else {
      lines.push("    const modules = await Promise.all([");
      for (const imported of modules) {
        lines.push(`      import(${JSON.stringify(imported.modulePath)}),`);
      }
      lines.push("    ]);");
    }
    lines.push("    return {");
    modules.forEach((imported, moduleIndex) => {
      const moduleName =
        modules.length === 1 ? "module0" : `modules[${moduleIndex}]`;
      for (const { exported, local } of imported.names) {
        lines.push(
          `      ${JSON.stringify(local)}: ${moduleName}.${exported},`,
        );
      }
    });
    lines.push("    } as ChapterMdxComponents;", "  },");
  }

  lines.push(
    "};",
    "",
    "export async function getChapterMdxComponents(",
    "  bookSlug: string,",
    "  sectionSlug: string,",
    "  chapterSlug: string,",
    "): Promise<ChapterMdxComponents> {",
    "  const route = `${bookSlug}/${sectionSlug}/${chapterSlug}`;",
    "  return chapterComponentLoaders[route]?.() ?? {};",
    "}",
    "",
  );

  return lines.join("\n");
}

const routes = collectRouteComponents();
const output = await format(renderRegistry(routes), { parser: "typescript" });
const current = fs.existsSync(outputPath)
  ? fs.readFileSync(outputPath, "utf8")
  : "";

if (checkOnly) {
  if (current !== output) {
    console.error(
      "[chapter-components] registry is stale; run `npm run components:generate`.",
    );
    process.exit(1);
  }
} else if (current !== output) {
  fs.writeFileSync(outputPath, output);
}

const moduleCount = new Set(
  routes.flatMap(({ modules }) => modules.map(({ modulePath }) => modulePath)),
).size;
console.log(
  `[chapter-components] ${routes.length} routes, ${moduleCount} lazy modules${checkOnly ? " verified" : " generated"}.`,
);
