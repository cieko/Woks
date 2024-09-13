import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuthActions } from "@convex-dev/auth/react";

// ICONS
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from 'react-icons/fc'

import { SignInFlow } from "../types";
import { TriangleAlert } from "lucide-react";

interface SignInCardProps {
  setState: React.Dispatch<React.SetStateAction<SignInFlow>>;
}

const SignInCard = ({ setState }: SignInCardProps) => {

  const { signIn } = useAuthActions();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handlePasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true)
    signIn("password", { email, password, flow: "signIn" })
        .catch(() => {
          setError("Invalid email or password")
        })
        .finally(() => {
          setIsLoading(false)
        })
  }

  const handleProviderSignIn = (value: "github" | "google" | "linkedin") => {
    setIsLoading(true)
    signIn(value).finally(() => { setIsLoading(false) })
  }
  
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>

        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>

      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}

      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5" onSubmit={handlePasswordSignIn}>
          <Input
            disabled={isLoading}
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            placeholder="Email"
            type="email"
            required
            style={{
              outline: "none",
              boxShadow: "none",
            }}
          />
          <Input
            disabled={isLoading}
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            placeholder="Password"
            type="password"
            required
            style={{
              outline: "none",
              boxShadow: "none",
            }}
          />

          <Button
            variant={"default"}
            type="submit"
            className="w-full text-white"
            size={"lg"}
            disabled={isLoading}
            style={{
              outline: "none",
              boxShadow: "none",
            }}
          >
            Continue
          </Button>
        </form>

        <Separator />

        <div className="flex flex-row gap-x-2.5">

          <Button
            disabled={isLoading}
            onClick={() => handleProviderSignIn("google")}
            variant={'outline'}
            size={'lg'}
            className="w-full flex items-center justify-center"
          >
            <FcGoogle className="size-5" />
            {/* Continue with Google */}
          </Button>

          <Button
            disabled={isLoading}
            onClick={() => handleProviderSignIn("github")}
            variant={'outline'}
            size={'lg'}
            className="w-full flex items-center justify-center"
          >
            <FaGithub className="size-5" />
            {/* Continue with Github */}
          </Button>

          <Button
            disabled={isLoading}
            onClick={() => handleProviderSignIn("linkedin")}
            variant={'outline'}
            size={'lg'}
            className="w-full flex items-center justify-center"
          >
            <FaLinkedin className="size-5 text-blue-700" />
            {/* Continue with Github */}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account? <span className="hover:underline cursor-pointer text-primary" onClick={() => { setState("signUp") }}>Sign up</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignInCard;
