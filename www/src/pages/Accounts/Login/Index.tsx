"use client";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from '@inertiajs/react';
import { AlertCircleIcon } from "lucide-react";
import { use, useEffect } from "react";
import { toast } from "sonner";

export default function Index({message}: { message?: string }) {
  // Hook do Inertia.js para gerenciar formulários
  const { data, setData, post, processing, errors, reset } = useForm({
    username: '',
    password: '',
    error_message: ''
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Envia os dados para o backend
    post('', {
      onSuccess: () => {
        reset('password'); // Limpa apenas a senha após sucesso
      },
      onError: () => {
        reset('password'); // Limpa a senha se houver erro
        toast("Erro, Tente novamente", {
          description: "Verifique suas credenciais e tente novamente.",
          style: { backgroundColor: '#1e293b', color: '#fff' },
          icon: <AlertCircleIcon className="h-4 w-4 text-red-500" />,
          duration: 3000,
        });
      }
    });
  }

  // Monitora erros de validação do backend
  useEffect(() => {
    if (errors.username || errors.password) {
      toast("Erro de Login", {
        description: "Verifique suas credenciais e tente novamente.",
        style: { backgroundColor: '#dc2626', color: '#fff' },
        icon: <AlertCircleIcon className="h-4 w-4 text-white" />,
        duration: 4000,
      });
    }
  }, [errors]);

  useEffect(() => {
    if (message) {
      toast(message, {
        style: { backgroundColor: '#1e293b', color: '#fff' },
        icon: <AlertCircleIcon className="h-4 w-4 text-red-500" />,
        duration: 3000,
      });
    }
  }, [message]);

  return (
    <main className="flex items-center justify-center h-screen w-screen bg-black">
      <div>
        <form onSubmit={handleSubmit}>
          <Card className="w-96 px-4">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
              <CardAction>
                <Button variant="link" type="button">Sign Up</Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    value={data.username}
                    onChange={(e) => setData('username', e.target.value)}
                    required
                  />
                  {errors.username && (
                    <p className="text-sm text-red-500">{errors.username}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input 
                    id="password" 
                    name="password"
                    type="password" 
                    placeholder="Enter your password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    required 
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>
  
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button 
                type="submit" 
                className="w-full"
                disabled={processing}
              >
                {processing ? 'Logging in...' : 'Login'}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </main>
  );
}