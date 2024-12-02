import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CustomButtonProps {
    className?: string,
    buttonText?: string,
    icon?: string,
    href?: string
}

const CustomButton = ({ className, buttonText, icon, href}: CustomButtonProps) => (
    <Button className={cn("bg-[#335CFF] py-6 rounded-lg bg-[#335CFF] hover:bg-[#3357e9] w-full", className)} size="lg"><img src={icon} alt="Plus Icon" /> {buttonText}</Button>
  )

export default CustomButton