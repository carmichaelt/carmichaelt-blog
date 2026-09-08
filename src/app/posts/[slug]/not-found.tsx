import { BackLink } from "@/components/site/back-link";
import { Container } from "@/components/site/container";

export default function PostNotFound() {
  return (
    <Container className="py-16">
      <BackLink href="/posts" label="Writing" />
      <h1 className="text-3xl font-bold tracking-tight">Post not found</h1>
      <p className="mt-4 text-zinc-400">That piece is not in this repo.</p>
    </Container>
  );
}
