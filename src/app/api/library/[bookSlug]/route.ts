import { getChapterTree } from "@/lib/content";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getChapterTree().map((book) => ({ bookSlug: book.bookSlug }));
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ bookSlug: string }> },
) {
  const { bookSlug } = await context.params;
  const book = getChapterTree().find((item) => item.bookSlug === bookSlug);
  if (!book) return new Response("Not found", { status: 404 });

  return Response.json(book, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
