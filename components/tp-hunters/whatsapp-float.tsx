"use client"

import Link from "next/link"

export function WhatsAppFloat() {
  return (
    <Link
      href="#"
      title="WhatsApp Us"
      className="fixed bottom-7 right-7 z-[500] w-14 h-14 rounded-full bg-[#25D366] text-white text-2xl flex items-center justify-center shadow-[0_4px_24px_rgba(37,211,102,0.4)] animate-[waPulse_2s_infinite] hover:scale-110 transition-transform"
    >
      💬
    </Link>
  )
}
