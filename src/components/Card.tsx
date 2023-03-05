export const Card = ({ children }: any) => {
  return (
    <div className="flex-auto items-center flex flex-col rounded-2xl p-7 backdrop-blur-sm bg-white/20">
      {children}
    </div>
  );
};
