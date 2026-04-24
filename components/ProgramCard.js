"use client"

import { motion } from "framer-motion"

export default function ProgramCard({ program }){

return(

<motion.div
whileHover={{y:-10}}
className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-indigo-400 transition"
>

{program.popular && (
<div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 px-4 py-1 text-xs rounded-full">
Recommended
</div>
)}

<h3 className="text-2xl font-semibold">
{program.title}
</h3>

<p className="text-gray-400 mt-2">
{program.tag}
</p>

<div className="mt-6">

<span className="text-3xl font-bold text-indigo-400">
{program.price}
</span>

{program.actualPrice && (
<span className="ml-3 text-gray-500 line-through">
{program.actualPrice}
</span>
)}

</div>

<ul className="mt-6 space-y-3 text-gray-300">

{program.features?.map((f,i)=>(
<li key={i} className="flex gap-2">
<span className="w-2 h-2 bg-indigo-400 rounded-full mt-2"/>
{f}
</li>
))}

</ul>

{program.longTerm && (
<div className="mt-6 p-3 rounded-lg bg-indigo-500/10 text-sm text-indigo-300">
{program.longTerm}
</div>
)}

<button className="mt-8 w-full py-3 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition">
Get Started
</button>

</motion.div>

)

}