import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: "Pantalla de inicio de sesión - portafolio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
