"use client";

import { useState } from "react";

type Panel =
  | "home"
  | "explore"
  | "series"
  | "login"
  | "genre"
  | "detail"
  | "reader";

const comics = [
  {
    id: 1,
    title: "LUMORIX: GÖLGE",
    genre: "Aksiyon",
    rating: "9.6",
    chapter: 24,
    description:
      "Karanlık sırların, güçlü karakterlerin ve büyük bir intikam hikâyesinin başlangıcı.",
  },
  {
    id: 2,
    title: "KAYIP DÜNYA",
    genre: "Fantastik",
    rating: "9.3",
    chapter: 18,
    description:
      "Gizemli bir dünyanın kapıları açılıyor. Hiçbir şey göründüğü gibi değil.",
  },
  {
    id: 3,
    title: "SON PERDE",
    genre: "Dram",
    rating: "9.1",
    chapter: 12,
    description:
      "Geçmişin sırlarıyla yüzleşmek zorunda kalan iki insanın hikâyesi.",
  },
  {
    id: 4,
    title: "GECE AVCISI",
    genre: "Gerilim",
    rating: "9.0",
    chapter: 9,
    description:
      "Şehrin karanlığında başlayan gizemli olayların peşindeki yalnız bir avcı.",
  },
];

const genres = [
  "Aksiyon",
  "Romantik",
  "Fantastik",
  "Macera",
  "Dram",
  "Komedi",
  "Gerilim",
  "Bilim Kurgu",
];

export default function Home() {
  const [panel, setPanel] = useState<Panel>("home");
  const [selectedComic, setSelectedComic] = useState(comics[0]);
  const [selectedGenre, setSelectedGenre] = useState("");

  const openComic = (comic: (typeof comics)[number]) => {
    setSelectedComic(comic);
    setPanel("detail");
  };

  const openGenre = (genre: string) => {
    setSelectedGenre(genre);
    setPanel("genre");
  };

  return (
    <main className="min-h-screen bg-[#07070a] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07070a]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
          <button
            onClick={() => setPanel("home")}
            className="text-left"
          >
            <div className="text-2xl font-black tracking-[0.3em]">
              LUMORIX
            </div>
            <div className="text-[9px] tracking-[0.55em] text-white/40">
              COMICS
            </div>
          </button>

          <nav className="hidden gap-2 md:flex">
            <NavButton
              active={panel === "home"}
              onClick={() => setPanel("home")}
            >
              Ana Sayfa
            </NavButton>

            <NavButton
              active={panel === "explore"}
              onClick={() => setPanel("explore")}
            >
              Keşfet
            </NavButton>

            <NavButton
              active={panel === "series"}
              onClick={() => setPanel("series")}
            >
              Seriler
            </NavButton>
          </nav>

          <button
            onClick={() => setPanel("login")}
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/10"
          >
            Giriş / Kayıt
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8">
        {panel === "home" && (
          <>
            <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#18131f] via-[#101016] to-[#08080b]">
              <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/[0.06] blur-3xl" />

              <div className="relative grid min-h-[540px] items-center gap-10 p-8 md:grid-cols-2 md:p-14">
                <div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.25em] text-white/50">
                    LUMORIX ORIGINAL
                  </span>

                  <h1 className="mt-7 text-5xl font-black leading-[0.9] md:text-7xl">
                    HİKÂYELERİN
                    <br />
                    <span className="text-white/35">
                      DİJİTAL DÜNYASI.
                    </span>
                  </h1>

                  <p className="mt-7 max-w-xl text-lg leading-8 text-white/55">
                    Yeni nesil dijital çizgi roman ve webtoon deneyimini
                    keşfet. Hikâyeni seç, dünyaya adım at.
                  </p>

                  <div className="mt-9 flex flex-wrap gap-3">
                    <button
                      onClick={() => setPanel("reader")}
                      className="rounded-full bg-white px-7 py-3.5 font-bold text-black transition hover:scale-105"
                    >
                      Şimdi Oku
                    </button>

                    <button
                      onClick={() => openComic(comics[0])}
                      className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 font-semibold transition hover:bg-white/10"
                    >
                      Detayları Gör
                    </button>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => openComic(comics[0])}
                    className="group relative h-[390px] w-[260px] rotate-[-4deg] overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-white/20 via-white/5 to-black shadow-2xl transition duration-500 hover:rotate-0 hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-white/10" />

                    <div className="absolute bottom-8 left-6 right-6 text-left">
                      <div className="text-xs tracking-[0.35em] text-white/40">
                        DIGITAL COMIC
                      </div>
                      <div className="mt-2 text-4xl font-black">
                        GÖLGE
                      </div>
                      <div className="mt-2 text-sm text-white/40">
                        BÖLÜM 24
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </section>

            <ComicSection
              title="Popüler Seriler"
              comics={comics}
              onSelect={openComic}
            />

            <ComicSection
              title="Yeni Bölümler"
              comics={[...comics].reverse()}
              onSelect={openComic}
            />

            <section className="py-14">
              <div className="mb-7">
                <div className="text-xs tracking-[0.3em] text-white/30">
                  KEŞFET
                </div>
                <h2 className="mt-2 text-3xl font-black">
                  Türler
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => openGenre(genre)}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left font-semibold transition hover:-translate-y-1 hover:bg-white/[0.08]"
                  >
                    {genre}
                    <span className="mt-2 block text-xs text-white/30">
                      Keşfet →
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {panel === "explore" && (
          <PanelShell
            title="Keşfet"
            subtitle="Yeni dünyalar ve yeni hikâyeler."
            onBack={() => setPanel("home")}
          >
            <input
              placeholder="Çizgi roman ara..."
              className="mb-8 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none placeholder:text-white/25"
            />

            <ComicGrid comics={comics} onSelect={openComic} />
          </PanelShell>
        )}

        {panel === "series" && (
          <PanelShell
            title="Seriler"
            subtitle="Lumorix Comics serilerini keşfet."
            onBack={() => setPanel("home")}
          >
            <ComicGrid comics={comics} onSelect={openComic} />
          </PanelShell>
        )}

        {panel === "login" && (
          <PanelShell
            title="Giriş / Kayıt"
            subtitle="Lumorix Comics hesabına giriş yap."
            onBack={() => setPanel("home")}
          >
            <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <input
                type="email"
                placeholder="E-posta"
                className="mb-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
              />

              <input
                type="password"
                placeholder="Şifre"
                className="mb-5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
              />

              <button className="w-full rounded-xl bg-white py-3 font-bold text-black">
                Giriş Yap
              </button>

              <button className="mt-3 w-full rounded-xl border border-white/10 py-3 text-sm text-white/60 hover:bg-white/5">
                Yeni Hesap Oluştur
              </button>
            </div>
          </PanelShell>
        )}

        {panel === "genre" && (
          <PanelShell
            title={selectedGenre}
            subtitle={`${selectedGenre} türündeki hikâyeler.`}
            onBack={() => setPanel("home")}
          >
            <ComicGrid comics={comics} onSelect={openComic} />
          </PanelShell>
        )}

        {panel === "detail" && (
          <PanelShell
            title={selectedComic.title}
            subtitle={`${selectedComic.genre} • ⭐ ${selectedComic.rating}`}
            onBack={() => setPanel("home")}
          >
            <div className="grid gap-8 md:grid-cols-[280px_1fr]">
              <div className="flex h-[400px] items-end rounded-3xl border border-white/10 bg-gradient-to-br from-white/20 via-white/5 to-black p-7">
                <div>
                  <div className="text-xs tracking-[0.3em] text-white/30">
                    DIGITAL COMIC
                  </div>
                  <div className="mt-2 text-3xl font-black">
                    {selectedComic.title}
                  </div>
                </div>
              </div>

              <div>
                <p className="max-w-2xl text-lg leading-8 text-white/55">
                  {selectedComic.description}
                </p>

                <div className="mt-7 flex gap-3">
                  <button
                    onClick={() => setPanel("reader")}
                    className="rounded-full bg-white px-7 py-3 font-bold text-black"
                  >
                    Bölüm 1'i Oku
                  </button>
                </div>

                <h3 className="mt-10 mb-4 text-xl font-bold">
                  Bölümler
                </h3>

                <div className="space-y-2">
                  {Array.from({
                    length: Math.min(selectedComic.chapter, 6),
                  }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setPanel("reader")}
                      className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.08]"
                    >
                      <span>Bölüm {index + 1}</span>
                      <span className="text-white/35">
                        Oku →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </PanelShell>
        )}

        {panel === "reader" && (
          <PanelShell
            title={`${selectedComic.title} — Bölüm 1`}
            subtitle="Lumorix Comics okuyucu"
            onBack={() => setPanel("detail")}
          >
            <div className="mx-auto max-w-3xl space-y-4">
              {[1, 2, 3, 4].map((page) => (
                <div
                  key={page}
                  className="flex min-h-[600px] items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.02]"
                >
                  <div className="text-center">
                    <div className="text-xs tracking-[0.3em] text-white/25">
                      SAYFA {page}
                    </div>
                    <div className="mt-4 text-3xl font-black text-white/25">
                      ÇİZGİ ROMAN SAYFASI
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PanelShell>
        )}
      </div>

      <footer className="border-t border-white/10 py-12 text-center text-sm text-white/25">
        © 2026 LUMORIX COMICS
      </footer>
    </main>
  );
}

function NavButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-5 py-2.5 text-sm transition ${
        active
          ? "bg-white text-black"
          : "text-white/60 hover:bg-white/10 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

type Comic = {
  id: number;
  title: string;
  genre: string;
  rating: string;
  chapter: number;
  description: string;
};

function ComicSection({
  title,
  comics,
  onSelect,
}: {
  title: string;
  comics: Comic[];
  onSelect: (comic: Comic) => void;
}) {
  return (
    <section className="py-14">
      <div className="mb-7">
        <div className="text-xs tracking-[0.3em] text-white/30">
          LUMORIX
        </div>
        <h2 className="mt-2 text-3xl font-black">{title}</h2>
      </div>

      <ComicGrid comics={comics} onSelect={onSelect} />
    </section>
  );
}

function ComicGrid({
  comics,
  onSelect,
}: {
  comics: Comic[];
  onSelect: (comic: Comic) => void;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {comics.map((comic) => (
        <button
          key={comic.id}
          onClick={() => onSelect(comic)}
          className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] text-left transition duration-300 hover:-translate-y-2 hover:bg-white/[0.07]"
        >
          <div className="flex h-72 items-end bg-gradient-to-br from-white/20 via-white/5 to-black p-5">
            <div>
              <div className="text-[10px] tracking-[0.3em] text-white/30">
                DIGITAL COMIC
              </div>
              <div className="mt-2 text-2xl font-black">
                {comic.title}
              </div>
            </div>
          </div>

          <div className="p-5">
            <div className="flex justify-between">
              <span className="text-sm text-white/45">
                {comic.genre}
              </span>
              <span className="text-sm font-bold">
                ⭐ {comic.rating}
              </span>
            </div>

            <div className="mt-4 text-xs text-white/35">
              {comic.chapter} bölüm • İncele →
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

function PanelShell({
  title,
  subtitle,
  onBack,
  children,
}: {
  title: string;
  subtitle: string;
  onBack: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-[calc(100vh-170px)]">
      <button
        onClick={onBack}
        className="mb-8 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
      >
        ← Geri
      </button>

      <div className="mb-10">
        <div className="text-xs tracking-[0.3em] text-white/30">
          LUMORIX COMICS
        </div>
        <h1 className="mt-2 text-5xl font-black">{title}</h1>
        <p className="mt-3 text-white/40">{subtitle}</p>
      </div>

      {children}
    </section>
  );
}
