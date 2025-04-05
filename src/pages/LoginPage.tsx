
import { useState } from "react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, LogIn, User, Mail, Phone, Hospital } from "lucide-react";
import { toast } from "sonner";

// Login form schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

// Register form schema
const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
  userType: z.enum(["patient", "doctor"]),
  specialty: z.string().optional(),
  phone: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
}).refine(
  data => data.userType !== "doctor" || (data.specialty && data.specialty.length > 0),
  {
    message: "Specialty is required for doctors",
    path: ["specialty"],
  }
);

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  
  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  // Register form
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "patient",
      specialty: "",
      phone: "",
    },
  });
  
  const userType = registerForm.watch("userType");
  
  const onLoginSubmit = (data: z.infer<typeof loginSchema>) => {
    console.log("Login data:", data);
    toast.success("Login successful! Redirecting...");
    // In a real app, you would handle authentication here
  };
  
  const onRegisterSubmit = (data: z.infer<typeof registerSchema>) => {
    console.log("Register data:", data);
    toast.success("Registration successful! Please check your email to verify your account.");
    // In a real app, you would handle registration here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-radial from-secondary/20 to-background py-12 px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-10 w-10 text-primary" />
            <span className="font-bold text-2xl font-montserrat">MedAI Nexus</span>
          </Link>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="text-sm text-right">
                      <a href="#" className="text-primary hover:underline">
                        Forgot Password?
                      </a>
                    </div>
                    <Button type="submit" className="w-full">
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <button 
                    className="text-primary hover:underline" 
                    onClick={() => setActiveTab("register")}
                  >
                    Register Now
                  </button>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>
                  Sign up to access MedAI Nexus services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="userType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Type</FormLabel>
                          <div className="flex gap-4">
                            <Button
                              type="button"
                              variant={field.value === "patient" ? "default" : "outline"}
                              className="flex-1"
                              onClick={() => registerForm.setValue("userType", "patient")}
                            >
                              <User className="mr-2 h-4 w-4" />
                              Patient
                            </Button>
                            <Button
                              type="button"
                              variant={field.value === "doctor" ? "default" : "outline"}
                              className="flex-1"
                              onClick={() => registerForm.setValue("userType", "doctor")}
                            >
                              <Hospital className="mr-2 h-4 w-4" />
                              Doctor
                            </Button>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {userType === "doctor" && (
                      <>
                        <FormField
                          control={registerForm.control}
                          name="specialty"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Medical Specialty</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Cardiology, Neurology" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Office Phone</FormLabel>
                              <FormControl>
                                <Input placeholder="(123) 456-7890" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                    
                    <Button type="submit" className="w-full">
                      Register Account
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <button 
                    className="text-primary hover:underline" 
                    onClick={() => setActiveTab("login")}
                  >
                    Login Instead
                  </button>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
