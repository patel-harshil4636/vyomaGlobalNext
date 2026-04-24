"use client"

import { motion } from "framer-motion"

export default function GrowthCard({ program }) {

return(

<motion.div
whileHover={{ y:-12 }}
transition={{ duration:.3 }}
className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-indigo-400 hover:shadow-[0_0_50px_rgba(99,102,241,0.3)] transition"
>

{program.popular && (
<div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 text-xs rounded-full bg-indigo-500">
Most Popular
</div>
)}

<h3 className="text-2xl font-semibold">
{program.title}
</h3>

<p className="text-gray-400 mt-2">
{program.tag}
</p>

<p className="text-3xl font-bold text-indigo-400 mt-6">
{program.price}
</p>

<ul className="mt-6 space-y-3 text-gray-300">

{program.features.map((feature,i)=>(
<li key={i} className="flex gap-2 items-center">
<span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
{feature}
</li>
))}

</ul>

<button className="mt-8 w-full rounded-lg bg-indigo-500 py-3 hover:bg-indigo-600 transition">
Start Consultation
</button>

</motion.div>

)

}