"use client"

import { useState } from "react"
import { programs } from "@/lib/programs"
import ServiceSelector from "@/components/ServiceSelector"
import ProgramCard from "@/components/ProgramCard"

export default function GrowthPrograms(){

const [active,setActive] = useState("socialMedia")

return(

<main className="bg-black text-white min-h-screen px-6 py-24">

<h1 className="text-5xl text-center font-bold mb-16
bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">

Vyoma Global Growth Programs

</h1>

<ServiceSelector active={active} setActive={setActive} />

<div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

{programs[active].map((p,i)=>(
<ProgramCard key={i} program={p}/>
))}

</div>

</main>

)

}