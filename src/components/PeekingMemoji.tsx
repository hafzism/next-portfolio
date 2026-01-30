import React from "react";
import Image from "next/image";

const PeekingMemoji = () => {
    return (
        <div className="absolute -bottom-2 -right-16 w-32 h-32 md:w-60 md:h-60 pointer-events-none">
            {/* Container for the bobbing animation */}
            <div className="relative w-full h-full origin-bottom">
                {/* Passive Image (Default) */}
                <div className="absolute inset-0 transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0">
                    <Image
                        src="/memoji-passive.png"
                        alt="Hafeez peeking"
                        fill
                        className="object-contain object-bottom"
                        priority
                    />
                </div>
                {/* Active Image (Hover) */}
                <div className="absolute inset-0 transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                    <Image
                        src="/memoji-active.png"
                        alt="Hafeez winking"
                        fill
                        className="object-contain object-bottom"
                        priority
                    />
                </div>
            </div>
        </div>
    );
};

export default PeekingMemoji;
