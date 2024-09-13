"use client"

import { useState } from "react"
import { SignInFlow } from "../types"
import { Button } from "@/components/ui/button"

export const AuthScreen = () => {

  const [state, setState] = useState<SignInFlow>("signIn")
  return (
    <div className="h-full w-full flex items-center justify-center bg-secondary">
      
    </div>
  )
}