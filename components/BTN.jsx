export const UiButton = ({ title, theme, children, className }) => {
    return (
        <>
            <button className={`
                urbanist-regular cursor-pointer rounded-3xl
                transition-all duration-300 ease-in-out
                hover:scale-105 active:scale-95
                ${theme === 'HOME' 
                    ? 'text-white bg-cyan-950 hover:bg-cyan-900 active:bg-cyan-800' 
                    : ''
                }
                /* Mobile First */
                w-full sm:w-auto
                px-6 py-3 
                text-base font-medium
                /* Tablet */
                md:px-5 md:py-2.5
                /* Desktop */
                lg:px-4 lg:py-1.5 lg:text-sm
                ${className ? className : ''}
            `}>
                {children}
            </button>
        </>
    )
}

export const SimpleButton = ({ children, className }) => {
    return (
        <button className={`
            urbanist-regular cursor-pointer rounded-3xl
            transition-all duration-300 ease-in-out
            hover:scale-105 active:scale-95
            text-black bg-gray-300 hover:bg-gray-400 active:bg-gray-500
            /* Mobile First */
            w-full sm:w-auto
            px-6 py-3 
            text-base font-medium
            /* Tablet */
            md:px-5 md:py-2.5
            /* Desktop */
            lg:px-4 lg:py-1.5 lg:text-sm
            ${className ? className : ''}
        `}>
            {children}
        </button>
    )
}