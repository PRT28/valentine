import "./globals.css";

export const metadata = {
  title: "A Little Valentine Reply 💌",
  description: "A cute, animated valentine response site built in Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-display overflow-x-hidden">{children}</body>
    </html>
  );
}
