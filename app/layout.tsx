"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./_componets/Sidebar";
import { store } from "./store";
import { Provider } from "react-redux";
import  debounce  from "debounce";
import { saveState } from "./browser-storage";

const inter = Inter({ subsets: ["latin"] });


store.subscribe(
  // we use debounce to save the state once each 800ms
  // for better performances in case multiple changes occur in a short time
  debounce(() => {
    saveState(store.getState());
  }, 800)
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
<Provider store={store}>
      <div className="grid  overflow-x-hidden">
        <div className="col-span-1 w-[15%] fixed 
        left-0 top-0 h-full z-10 " >
   <Sidebar/>  
        </div>
        
        <div className="col-span-1      overflow-x-hidden pl-52">
        {/* Main content area */}
        {children}
      </div>
      
      </div>
      </Provider>
      
        </body>
    </html>
  );
}
