"use client"

import { useState } from "react"
import { SignInFlow } from "../types"

export const AuthScreen = () => {

  const [state, setState] = useState<SignInFlow>("signIn")
  return (
    <div className="h-full w-full flex items-center justify-center bg-[#715caa]">
      Auth Screen 1
    </div>
  )
}