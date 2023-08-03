import { forwardRef, useEffect, useRef } from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const HScroll = forwardRef<HTMLInputElement, InputProps>(
  ({ children, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
      if (!containerRef.current) return
      const scrollElement = containerRef.current
      scrollElement.addEventListener("wheel", (e: WheelEvent) => {
        if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
        e.preventDefault();
        scrollElement.scrollLeft += e.deltaY;
      });
    })
  
    return (
      <div ref={containerRef} {...props}>
        {children}
      </div>
    )
  }
)

HScroll.displayName = "HScroll"
