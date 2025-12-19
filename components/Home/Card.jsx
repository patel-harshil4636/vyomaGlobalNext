"use client";
import Image from "next/image"

export const HomeCard = ({ title, desc, img }) => {
  // Convert relative paths to absolute paths
  const getValidImagePath = (path) => {
    if (!path) return "/fallback-image.jpg";
    
    // Remove ../ or ./ prefixes and add leading slash
    if (path.startsWith('../') || path.startsWith('./')) {
      return '/' + path.replace(/^\.\.?\//, '');
    }
    
    // Ensure it starts with slash
    if (!path.startsWith('/') && !path.startsWith('http')) {
      return '/' + path;
    }
    
    return path;
  };
  
  const imageSrc = getValidImagePath(img);
  
  return (
    <div className="grid bg-[#F2F5F6] items-center p-5 gap-3">
      <div className="relative w-full h-48">
        <Image 
          src={imageSrc} 
          alt={title || "Card image"} 
          width={300}
          height={200}
          className="object-cover w-full h-full"
        />
      </div>
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p>{desc}</p>
    </div>
  )
}