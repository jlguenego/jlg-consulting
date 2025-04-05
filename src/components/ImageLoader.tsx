import React, { useEffect, useState } from "react";

type Props = {
  lowSrc: string; // URL de l’image basse résolution
  src: string; // URL de l’image haute résolution
  alt: string;
  className?: string;
};

const ImageLoader: React.FC<Props> = ({ lowSrc, src, alt, className = "" }) => {
  const [isLowLoaded, setIsLowLoaded] = useState(false);
  const [isHighLoaded, setIsHighLoaded] = useState(false);

  useEffect(() => {
    const lowImg = new window.Image();
    lowImg.src = lowSrc;
    lowImg.onload = async () => {
      setIsLowLoaded(true);

      const highImg = new window.Image();
      highImg.src = src;
      highImg.onload = async () => {
        setIsHighLoaded(true);
      };
    };
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder gris */}
      <div
        className={`absolute top-0 left-0 h-full w-full transition-opacity duration-500 ${isLowLoaded ? "opacity-0" : "opacity-100"}`}
      />

      {/* Image floutée (low-res) */}
      {isLowLoaded && (
        <img
          src={lowSrc}
          alt=""
          className={`absolute top-0 left-0 h-auto w-full transition-all duration-700 ${isHighLoaded ? "scale-105 opacity-0" : "scale-100 opacity-100 blur-md"}`}
        />
      )}

      {/* Image nette (high-res) */}
      {isHighLoaded && (
        <img
          src={src}
          alt={alt}
          className="relative z-10 h-auto w-full opacity-100 transition-opacity duration-700"
        />
      )}
    </div>
  );
};

export default ImageLoader;
