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
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toggleTwoStepVerification } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

const FormSchema = z.object({
  twoStepVerification: z.boolean().default(false).optional(),
});

const Security = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      twoStepVerification: user.twoStepVerification,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    await dispatch(toggleTwoStepVerification(data.twoStepVerification));
  }

  return (
    <div className="mt-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="twoStepVerification"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border py-2 px-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="capitalize">
                        two step verification
                      </FormLabel>
                      <FormDescription>
                        This extra step helps protect your account, even if
                        someone knows your password.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Security;
