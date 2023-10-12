import Image from "next/image";

export const Cover = ({ children, background }) => {
  return (
    <div className="h-screen bg-slate-800 relative min-h-[400px] flex justify-center items-center text-white">
      <Image
        alt="Cover"
        src={background}
        fill
        className="mix-blend-soft-light object-cover"
        priority
      />
      <div className="max-w-5xl z-10">{children}</div>
    </div>
  );
};
