"use client"

import { Button } from "@/components/ui/button"
import { Sun, Moon, Languages } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

interface HeaderProps {
  user?: {
    name: string
    role: string
  }
  showAuth?: boolean
}

export function Header({ user, showAuth = false }: HeaderProps) {
  const [isDark, setIsDark] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="relative mr-3">
              <div className="w-8 h-8 border-2 border-blue-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
            <div>
              <div className="font-bold text-lg text-black">BRIDGE</div>
              <div className="text-sm text-blue-500 font-medium">Technologies</div>
              <div className="text-xs text-gray-500">Solutions</div>
            </div>
          </div>
        </Link>

        {!showAuth && (
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-500 font-medium">
              Accueil
            </Link>
            <Link href="/contacts" className="text-gray-700 hover:text-blue-500 font-medium">
              Contacts
            </Link>
            <Link href="/entreprise" className="text-gray-700 hover:text-blue-500 font-medium">
              L'entreprise
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-blue-500 font-medium">
              Services
            </Link>
          </nav>
        )}

        <div className="flex items-center space-x-4">
          {user && <span className="text-sm font-medium text-gray-700">Accueil</span>}

          <Button variant="outline" size="icon" className="bg-black text-white border-black">
            <Languages className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" onClick={() => setIsDark(!isDark)}>
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  )
}
