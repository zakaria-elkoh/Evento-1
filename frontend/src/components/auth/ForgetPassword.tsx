import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { forgetPassword } from "../../http/auth";

const ForgetPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const forgetPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
  });

  const form = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof forgetPasswordSchema>) {
    setIsSubmitting(true);
    console.log(values);
    setTimeout(() => {}, 2000);
    forgetPassword(values).then(() => {
      setIsSubmitting(false);
    });
  }

  return (
    <div className="mt-28 w-full flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl">Forget Password</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 flex gap-1"
              >
                {isSubmitting && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isSubmitting ? "Sending..." : "Send Reset Email"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-end gap-3">
          <Link to={"/login"} className="hover:underline">
            Back to log in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgetPassword;
