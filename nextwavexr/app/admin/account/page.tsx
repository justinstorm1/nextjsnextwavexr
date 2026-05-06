"use client"

import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { UnauthenticatedScreen } from "../create/page";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from '@/components/ui/button';
import { api } from "@/convex/_generated/api";
import AdminProviers from "@/components/AdminProviders";

export default function Page() {

    const user = useQuery(api.user.getUser);

    const { signIn, signOut } = useAuthActions();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = async () => {
        try {
            await signOut();
            await signIn("password", { email, password, flow: "signUp" });
        } catch (error) {
            console.error(error);
        }
    }

    const createDisabled = (!email) || !password || !confirmPassword || (password != confirmPassword);

    return (
        <div className='flex flex-1 items-center justify-center p-5'>
            <Card className='w-full max-w-[400px]'>
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                        Enter an email and password below to create an account
                    </CardDescription>
                    <CardDescription>
                        Currently logged in as {user?.email}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form 
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSignUp();
                        }}
                    >
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor='email'>Email</FieldLabel>
                                <InputGroup>
                                    <InputGroupAddon align={'inline-start'}>
                                        <Mail />
                                    </InputGroupAddon>
                                    <InputGroupInput 
                                        id='email'
                                        type='email'
                                        placeholder='email@example.com'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </InputGroup>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor='password'>Password</FieldLabel>
                                <InputGroup>
                                    <InputGroupAddon align={'inline-start'}>
                                        <Lock />
                                    </InputGroupAddon>
                                    <InputGroupInput 
                                        id='password'
                                        type={passwordVisible ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <InputGroupAddon align={'inline-end'}>
                                        <InputGroupButton onClick={() => setPasswordVisible((prev) => !prev)}>
                                            {passwordVisible ? <EyeOff /> : <Eye />}
                                        </InputGroupButton>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor='confirm-password'>Confirm Password</FieldLabel>
                                <InputGroup>
                                    <InputGroupAddon align={'inline-start'}>
                                        <Lock />
                                    </InputGroupAddon>
                                    <InputGroupInput 
                                        id='confirm-password'
                                        type={passwordVisible ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <InputGroupAddon align={'inline-end'}>
                                        <InputGroupButton onClick={() => setPasswordVisible((prev) => !prev)}>
                                            {passwordVisible ? <EyeOff /> : <Eye />}
                                        </InputGroupButton>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Field>
                            <Field>
                                <Button type='submit' disabled={createDisabled}>Create Account</Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}