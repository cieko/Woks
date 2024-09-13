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

// ICONS
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from 'react-icons/fc'

import { SignInFlow } from "../types";

interface SignInCardProps {
  setState: React.Dispatch<React.SetStateAction<SignInFlow>>;
}

const SignInCard = ({ setState }: SignInCardProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>

        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 px-0 pb-0">
        <form action="" className="space-y-2.5">
          <Input
            disabled={false}
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
            disabled={false}
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
            disabled={false}
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
            disabled={false}
            onClick={() => {}}
            variant={'outline'}
            size={'lg'}
            className="w-full flex items-center justify-center"
          >
            <FcGoogle className="size-5" />
            {/* Continue with Google */}
          </Button>

          <Button
            disabled={false}
            onClick={() => {}}
            variant={'outline'}
            size={'lg'}
            className="w-full flex items-center justify-center"
          >
            <FaGithub className="size-5" />
            {/* Continue with Github */}
          </Button>

          <Button
            disabled={false}
            onClick={() => {}}
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
