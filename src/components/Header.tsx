import Link from "next/link";

export default function Header() {
  return (
    <nav className="mb-10 flex items-center justify-center">
      <Link
        href="/"
        className="font-display py-1 text-[10px] font-medium tracking-[0.16em] text-ink/60 transition-colors hover:text-ink sm:text-[11px]"
      >
        MARIKO SHIMODOZONO
      </Link>
    </nav>
  );
}
