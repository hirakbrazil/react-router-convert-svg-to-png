
import { useEffect, useState } from "react"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")

  useEffect(() => {
    const detectTheme = () => {
      const root = document.documentElement
      const isDark = root.classList.contains("dark")
      const isLight = root.classList.contains("light")
      
      if (isDark) {
        setTheme("dark")
      } else if (isLight) {
        setTheme("light")
      } else {
        // Handle system theme
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        setTheme(systemTheme)
      }
    }

    // Initial detection
    detectTheme()

    // Watch for theme changes by observing class changes on document element
    const observer = new MutationObserver(detectTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    // Listen for system theme changes
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)")
    const handleSystemThemeChange = () => {
      const root = document.documentElement
      // Only update if no explicit theme is set
      if (!root.classList.contains("light") && !root.classList.contains("dark")) {
        detectTheme()
      }
    }

    darkThemeMq.addEventListener("change", handleSystemThemeChange)

    return () => {
      observer.disconnect()
      darkThemeMq.removeEventListener("change", handleSystemThemeChange)
    }
  }, [])

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          error: "group toast group-[.toaster]:bg-destructive group-[.toaster]:text-destructive-foreground group-[.toaster]:border-destructive",
          success: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border",
          info: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground dark:group-[.toaster]:text-blue-200 group-[.toaster]:border-border",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
