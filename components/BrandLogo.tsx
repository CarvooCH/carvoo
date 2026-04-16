type BrandLogoProps = {
  variant?: "header" | "footer";
  className?: string;
};

export default function BrandLogo({
  variant = "header",
  className = "",
}: BrandLogoProps) {
  const textSize =
    variant === "header"
      ? "text-4xl sm:text-5xl"
      : "text-3xl sm:text-4xl";

  return (
    <div className={`relative inline-flex flex-col ${className}`}>
      <span className="mb-1 h-1.5 w-[88%] rounded-full bg-gradient-to-r from-[#2f24d8] via-[#6729de] to-[#b734e6]" />
      <span
        className={`${textSize} bg-gradient-to-r from-[#2f24d8] via-[#6729de] to-[#b734e6] bg-clip-text font-black lowercase leading-none tracking-tight text-transparent`}
      >
        carvoo
      </span>
    </div>
  );
}
