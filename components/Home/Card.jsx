export const HomeCard=({title,desc,img})=>{
        return(
            <>
                    <div className="grid bg-[#F2F5F6] items-center p-5 gap-3">
                        <img src={img} alt="" />
                        <h3 className="text-2xl font-semibold">
                            {title}
                        </h3>
                        <p>
                            {desc}
                        </p>
                    </div>
            </>
        )
}