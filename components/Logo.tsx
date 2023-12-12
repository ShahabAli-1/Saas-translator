import logoimage from "@logos/chatlogo.png"
import blacklogo from "@logos/blacklogo.png"
import Link from "next/link"
import { AspectRatio } from "./ui/aspect-ratio"
import Image from "next/image"
const Logo = () => {
  return (
    <div>
        <Link href="/" prefetch={false} className="overflow-hidden">
            <div className="flex items-center w-32 h-14">
                <AspectRatio ratio={16/9}
                className="flex items-center justify-center">
                  <Image priority
                  src={blacklogo}
                  alt="logo"
                  className="dark:filter dark:invert"/>
                </AspectRatio>
            </div>
        </Link>
    </div>
  )
}

export default Logo