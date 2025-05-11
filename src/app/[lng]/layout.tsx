import { dir } from 'i18next'
import '../globals.css'

export const runtime = 'edge';

export default function RootLayout({
  children,
  params: {
    lng
  }
}: Readonly<{
  children: React.ReactNode
  params: {
    lng:string
  }
}>) {
	return (
		<html lang={lng} dir={dir(lng)}>
			<body>{children}</body>
		</html>
	)
}
