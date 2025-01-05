import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CustomButtonProps {
    className?: string,
    buttonText?: string,
    icon?: string,
    href?: string,
    onClick?: () => void,
    type?: string,
    props?: ButtonProps
}

const CustomButton = ({ className, buttonText, icon, href, type, ...props}: CustomButtonProps) => (
    <Button {...props} className={cn("py-6 rounded-lg bg-skyBlue text-white dark:text-white hover:bg-[#3357e9] w-full", className)} size="lg"><img src={icon} alt="Plus Icon" /> {buttonText}</Button>
  )

export default CustomButton