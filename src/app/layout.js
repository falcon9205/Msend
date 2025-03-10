import "./globals.css";
import Login from "@/component/Login-Popup/login-popup.js";
import { Quicksand } from "next/font/google";
import SessionProviderWrapper from "@/component/SessionProviderWrapper"; // Import the wrapper
import Header from "@/component/Header/header";
import Footer from "@/component/Footer/footer";

const font = Quicksand({
  subsets: ["latin"],
  weight: "600",
});

export const metadata = {
  title: "Msend",
  description: "Simplifying Email‚ Amplifying Impact.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <SessionProviderWrapper>
          <Login />
          <Header/>
          {children}
          <Footer/>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
