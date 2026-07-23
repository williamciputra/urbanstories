type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({
  children,
}: ContainerProps) {
  return (
    <div className="mx-auto w-full max-w-[1128px] px-4 lg:px-0">
      {children}
    </div>
  );
}