export default async function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
