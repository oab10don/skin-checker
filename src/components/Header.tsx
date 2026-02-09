import Link from "next/link";

type HeaderProps = {
  showBack?: boolean;
};

export default function Header({ showBack = false }: HeaderProps) {
  return (
    <nav className="mb-8 flex items-center justify-between">
      <Link
        href="/"
        className="font-serif text-lg tracking-wide text-ink transition-colors hover:text-sage-dark"
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
