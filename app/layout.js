export const metadata = {
  title: 'Belajar Tentang Hujan - Untuk Anak TK',
  description: 'Aplikasi pembelajaran interaktif tentang proses terjadinya hujan',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
