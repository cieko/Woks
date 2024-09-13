import React, { useDeferredValue, useEffect, useState } from "react";
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
import { TriangleAlert } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { zxcvbnAsync, ZxcvbnResult } from "@zxcvbn-ts/core";

// ICONS
import { FaGithub, FaLinkedin, FaCheckCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { HiMiniArrowLongLeft } from "react-icons/hi2";

import { SignInFlow } from "../types";

interface SignInCardProps {
  setState: React.Dispatch<React.SetStateAction<SignInFlow>>;
}

const usePasswordStrength = (password: string) => {
  const [result, setResult] = useState<ZxcvbnResult | null>(null);
  // NOTE: useDeferredValue is React v18 only, for v17 or lower use debouncing
  const deferredPassword = useDeferredValue(password);

  useEffect(() => {
    zxcvbnAsync(deferredPassword).then((response) => setResult(response));
  }, [deferredPassword]);

  return result;
};

const SignUpCard = ({ setState }: SignInCardProps) => {
  const { signIn } = useAuthActions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [usernameTabActive, setUsernameTabActive] = useState(false);
  const [username, setUsername] = useState("");

  const [passwordStrengthMeasure, setPasswordStrengthMeasure] = useState<
    "weak" | "average" | "good" | "excellent"
  >("weak");
  const passwordStrength = Number(usePasswordStrength(password)?.score) || 0;

  const handlePasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (
      !(
        /[A-Z]/.test(password) &&
        /\d/.test(password) &&
        /[^a-zA-Z0-9]/.test(password)
      )
    ) {
      setError("Improper Password");
      return;
    } else {
      setUsernameTabActive(true);
    }

    if (!username) {
      setError("Please Provide a username");
      return;
    }

    setIsLoading(true);
    signIn("password", { name: username, email, password, flow: "signUp" })
      .catch(() => {
        setError("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleProviderSignUp = (value: "github" | "google") => {
    setIsLoading(true);
    signIn(value).finally(() => {
      setIsLoading(false);
    });
  };

  const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    if (passwordStrength > 0) {
      switch (String(passwordStrength)) {
        case "1":
          {
            setPasswordStrengthMeasure("weak");
          }
          break;

        case "2":
          {
            setPasswordStrengthMeasure("average");
          }
          break;

        case "3":
          {
            setPasswordStrengthMeasure("good");
          }
          break;

        case "4":
          {
            setPasswordStrengthMeasure("excellent");
          }
          break;

        default:
          setPasswordStrengthMeasure("weak");
      }
    }
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to continue</CardTitle>

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
        <form onSubmit={handlePasswordSignUp} className="space-y-2.5">
          {usernameTabActive ? (
            <React.Fragment>
              <p className="flex flex-row gap-2 items-center">
                <HiMiniArrowLongLeft
                  className="size-4 cursor-pointer text-gray-500"
                  onClick={() => setUsernameTabActive(false)}
                />
                <span>What should we call you ?</span>
              </p>

              <Input
                disabled={isLoading}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="Username"
                type="text"
                required
                style={{
                  outline: "none",
                  boxShadow: "none",
                }}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Input
                disabled={isLoading}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
                type="email"
                required
                style={{
                  outline: "none",
                  boxShadow: "none",
                }}
              />

              <div className="flex flex-col gap-3">
                <div className="mt-2 inline-block">
                  <p className="text-xs text-gray-500">
                    Password Requirements :
                  </p>
                  <ul className="text-sm text-gray-500">
                    <li className="flex flex-row items-start gap-2 mt-3">
                      {password.length >= 9 ? (
                        <FaCheckCircle className="size-5 text-green-600" />
                      ) : (
                        <span className="w-5 h-5 border-[2px] border-yellow-600/80 rounded-full shrink-0"></span>
                      )}
                      <span
                        className={`${password.length >= 9 ? "text-green-600" : ""}`}
                      >
                        Must be 9 characters or more
                      </span>
                    </li>
                    <li className="flex flex-row items-start gap-2 mt-3">
                      {/[A-Z]/.test(password) &&
                      /\d/.test(password) &&
                      /[^a-zA-Z0-9]/.test(password) ? (
                        <FaCheckCircle className="size-5 text-green-600 w-5 h-5 shrink-0" />
                      ) : (
                        <span className="w-5 h-5 border-[2px] border-yellow-600/80 rounded-full shrink-0"></span>
                      )}
                      <span>
                        <span
                          className={`${/[A-Z]/.test(password) ? "text-green-600" : ""}`}
                        >
                          Must have a Capital letter
                        </span>
                        <span
                          className={`${/\d/.test(password) ? "text-green-600" : ""}`}
                        >
                          , a Number
                        </span>
                        <span
                          className={`${/[^a-zA-Z0-9]/.test(password) ? "text-green-600" : ""}`}
                        >
                          {" "}
                          and a special character (@, !, $)
                        </span>
                      </span>
                    </li>
                    {password.length > 2 ? (
                      <li className="mt-2 flex flex-row items-center gap-5">
                        <span
                          className={`h-1 w-20 ${passwordStrengthMeasure === "weak" ? "bg-yellow-600/80" : passwordStrengthMeasure === "average" ? "bg-amber-600" : passwordStrengthMeasure === "good" ? "bg-emerald-700" : "bg-green-600"} rounded-md`}
                        ></span>
                        <span className="">
                          {passwordStrengthMeasure === "weak"
                            ? "Weak"
                            : passwordStrengthMeasure === "average"
                              ? "Average"
                              : passwordStrengthMeasure === "good"
                                ? "Good"
                                : "Excellent"}
                        </span>
                      </li>
                    ) : null}
                  </ul>
                </div>

                <Input
                  disabled={isLoading}
                  value={password}
                  onChange={handleSetPassword}
                  placeholder="Password"
                  type="password"
                  required
                  style={{
                    outline: "none",
                    boxShadow: "none",
                  }}
                />
                <Input
                  disabled={isLoading}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  placeholder="Confirm password"
                  type="password"
                  required
                  style={{
                    outline: "none",
                    boxShadow: "none",
                  }}
                />
              </div>
            </React.Fragment>
          )}

          <Button
            variant={"default"}
            type={"submit"}
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
            onClick={() => handleProviderSignUp("google")}
            variant={"outline"}
            size={"lg"}
            className="w-full flex items-center justify-center"
          >
            <FcGoogle className="size-5" />
            {/* Continue with Google */}
          </Button>

          <Button
            disabled={isLoading}
            onClick={() => handleProviderSignUp("github")}
            variant={"outline"}
            size={"lg"}
            className="w-full flex items-center justify-center"
          >
            <FaGithub className="size-5" />
            {/* Continue with Github */}
          </Button>

          <Button
            disabled={isLoading}
            onClick={() => {}}
            variant={"outline"}
            size={"lg"}
            className="w-full flex items-center justify-center"
          >
            <FaLinkedin className="size-5 text-blue-700" />
            {/* Continue with Github */}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <span
            className="hover:underline cursor-pointer text-primary"
            onClick={() => {
              setState("signIn");
            }}
          >
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
