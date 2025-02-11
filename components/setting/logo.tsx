import Image from "next/image";
import Link from "next/link";

export function Logo() {
    return (
        <Link href="/">
            {/* <h3 className="text-2xl font-bold text-white bg-indigo-600 px-2 py-1 rounded-lg shadow-md tracking-wide">
            Repwrap
        </h3> */}
        <h3>
        <span className="font-semibold text-white   text-xl group-data-[collapsible=icon]:hidden"><Image 
                                                                                                              src="/repwrap_logo.png"
                                                                                                              alt=""
                                                                                                              height={35}
                                                                                                              width={150}
                                                                                                            /> </span>
                                                                                                            </h3>
        
        </Link>
    )
}

