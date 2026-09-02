"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../../lib/supabase";

export default function AuthCallbackPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"checking" | "success" | "error">(
    "checking"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyAccount = async () => {
      const supabase = createClient();
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        setStatus("error");
        setMessage("Doğrulama bağlantısı geçersiz veya eksik.");
        return;
      }

      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        setStatus("error");
        setMessage(
          "Doğrulama bağlantısı geçersiz veya süresi dolmuş."
        );
        return;
      }

      setStatus("success");
    };

    verifyAccount();
  }, []);

  const resendVerification = async () => {
    if (!email) {
      setMessage("Lütfen e-posta adresinizi yazın.");
      return;
    }

    setMessage("Yeni doğrulama bağlantısı gönderiliyor...");

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo:
            "https://lumorix-comics.vercel.app/auth/callback",
        },
      });

      if (error) throw error;

      setMessage(
        "Yeni doğrulama bağlantısı e-posta adresinize gönderildi."
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Doğrulama bağlantısı gönderilemedi."
      );
    }
  };

  if (status === "checking") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <div className="text-center">
          <div className="text-5xl">⏳</div>
          <p className="mt-5 text-white/60">
            Hesabınız doğrulanıyor...
          </p>
        </div>
      </main>
    );
  }

  if (status === "success") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl">
          <div className="text-6xl">🎉</div>

          <div className="mt-5 text-xs font-semibold tracking-[0.3em] text-white/40">
            LUMORIX COMICS
          </div>

          <h1 className="mt-4 text-3xl font-black">
            Hoş geldiniz!
          </h1>

          <p className="mt-4 text-lg text-white/70">
            Hesabınız başarıyla aktifleştirildi.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl">
        <div className="text-5xl">✉️</div>

        <div className="mt-5 text-xs font-semibold tracking-[0.3em] text-white/40">
          LUMORIX COMICS
        </div>

        <h1 className="mt-4 text-2xl font-black">
          Doğrulama bağlantısı
        </h1>

        <p className="mt-4 text-sm text-white/60">
          {message}
        </p>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="E-posta adresiniz"
          className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/30"
        />

        <button
          onClick={resendVerification}
          className="mt-3 w-full rounded-xl bg-white py-3 font-bold text-black transition hover:bg-white/90"
        >
          Doğrulama Linkini Tekrar Gönder
        </button>
      </div>
    </main>
  );
}