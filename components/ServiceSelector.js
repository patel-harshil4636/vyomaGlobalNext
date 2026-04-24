"use client"

import { motion } from "framer-motion"

export default function ServiceSelector({ active, setActive }){

return(

<div className="flex justify-center gap-6 mb-16">

<motion.button
whileTap={{scale:.95}}
onClick={()=>setActive("socialMedia")}
className={`px-8 py-3 rounded-lg border transition
${active==="socialMedia"
? "bg-indigo-500 border-indigo-500"
: "border-white/20 hover:border-indigo-400"}
`}
>
Social Media
</motion.button>

<motion.button
whileTap={{scale:.95}}
onClick={()=>setActive("website")}
className={`px-8 py-3 rounded-lg border transition
${active==="website"
? "bg-indigo-500 border-indigo-500"
: "border-white/20 hover:border-indigo-400"}
`}
>
Website
</motion.button>

</div>

)

}