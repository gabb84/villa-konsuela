import { isAdmin } from "@/lib/adminAuth";
import { readAll, readProof } from "@/lib/bookingStore";

const TYPES: Record<string, string> = {
  jpg: "image/jpeg", png: "image/png", webp: "image/webp",
};

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) return new Response("Not logged in.", { status: 401 });
  const { id } = await ctx.params;
  const b = (await readAll()).find((x) => x.id === id);
  if (!b) return new Response("Not found.", { status: 404 });
  const data = await readProof(b);
  return new Response(new Uint8Array(data), {
    headers: {
      "Content-Type": TYPES[b.proofFile.split(".").pop() ?? ""] ?? "application/octet-stream",
      "Cache-Control": "private, no-store",
    },
  });
}
