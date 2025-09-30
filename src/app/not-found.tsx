"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 4000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <section className="not-found">
      <Logo />
      <h1>this page not found</h1>
    </section>
  );
}
