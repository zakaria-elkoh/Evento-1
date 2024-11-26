import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { reSendOTP, verifyOtp } from "@/store/slices/authSlice";

const FormSchema = z.object({
  otp: z.string().min(4, {
    message: "Your one-time password must be 6 characters.",
  }),
  userId: z.string(),
});

const OTP = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
      userId: user._id,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await dispatch(verifyOtp(data));
    console.log("data", data);
  }

  const handleResend = async () => {
    await dispatch(reSendOTP("670d243cda5551f9d6a628c2"));
  };

  return (
    <div className="h-full flex justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex flex-col border border-white/25 bg-white justify-center shadow-md mt-20 rounded-lg p-6 min-w-72 dark:bg-black"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verify it is your account</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="w-10 h-10 text-2xl" />
                      <InputOTPSlot index={1} className="w-10 h-10 text-2xl" />
                      <InputOTPSlot index={2} className="w-10 h-10 text-2xl" />
                      <InputOTPSlot index={3} className="w-10 h-10 text-2xl" />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the OTP password sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-red-400">{error?.error}</p>
          <Button
            disabled={loading}
            type="submit"
            className={`flex gap-1 ${loading ? "cursor-not-allowed" : ""}`}
          >
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Submitting..." : "Submit"}
          </Button>
          <button onClick={handleResend} className="hover:underline ml-auto">
            Resend
          </button>
        </form>
      </Form>
    </div>
  );
};

export default OTP;
