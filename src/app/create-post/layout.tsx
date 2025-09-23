import Container from '@/app/_components/container';

export default function CreatePostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <div className="py-8">
        {children}
      </div>
    </Container>
  );
}
