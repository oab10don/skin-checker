import Link from "next/link";

type HeaderProps = {
  showBack?: boolean;
};

export default function Header({ showBack = false }: HeaderProps) {
  return (
    <nav className="mb-10 flex items-center justify-between">
      <Link
        href="/"
        className="font-display py-1 text-[10px] font-medium tracking-[0.16em] text-ink/60 transition-colors hover:text-ink sm:text-[11px]"
      >
        MARIKO SHIMODOZONO
      </Link>
      {showBack && (
        <Link
          href="/"
          className="text-sm text-muted transition-colors hover:text-ink"
        >
          トップへ戻る
        </Link>
      )}
    </nav>
  );
}
