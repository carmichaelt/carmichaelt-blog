import { BackLink } from "@/components/site/back-link";
import { Container } from "@/components/site/container";

export default function NotFound() {
  return (
    <Container className="py-16">
      <BackLink />
      <h1 className="text-3xl font-bold tracking-tight">Not found</h1>
      <p className="mt-4 text-zinc-400">That page does not exist.</p>
    </Container>
  );
}
