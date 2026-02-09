import Link from "next/link";

type HeaderProps = {
  showBack?: boolean;
};

export default function Header({ showBack = false }: HeaderProps) {
  return (
    <nav className="mb-10 flex items-center justify-between">
      <Link
        href="/"
        className="text-[13px] tracking-[0.12em] text-ink/80 transition-colors hover:text-ink"
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
