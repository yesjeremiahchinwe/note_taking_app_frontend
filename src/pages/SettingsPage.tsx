import Header from "@/components/Header"
import SettingsOptions from "@/components/SettingsOptions"
import { Outlet } from "react-router-dom"
import useTitle from "@/hooks/useTitle";
import { useState } from "react";

const SettingsPage = () => {
  useTitle("Settings")
  const [searchQuery, setSearchQuery] = useState("")
  
  return (
    <section className="flex flex-col min-h-screen w-full rounded-t-md lg:rounded-t-none">
    <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

    <article className="flex rounded-t-[1.25rem] lg:rounded-t-none bg-background flex-col lg:flex-row min-h-screen items-start justify-between lg:pr-[2rem] lg:pl-6 w-full">
     <SettingsOptions />

      <div className="basis-full w-full pb-5 lg:max-w-[50%] mr-auto px-4 lg:px-6 lg:p-[2rem]">
        <Outlet />
      </div>

    </article>
  </section>
  )
}

export default SettingsPage