import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { createParticipant } from "@/store/slices/participntSlice";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FormErrors {
  name?: string;
  cni?: string;
  general?: string;
}

const ParticipantFormPopup = ({
  currentEventId,
}: {
  currentEventId: string;
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [cni, setCni] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();

  const resetForm = () => {
    setName("");
    setCni("");
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!cni.trim()) {
      newErrors.cni = "CNI is required";
    } else if (cni.trim().length < 4) {
      newErrors.cni = "CNI must be at least 4 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await dispatch(
        createParticipant({
          name: name.trim(),
          cni: cni.trim(),
          event: currentEventId,
        })
      ).unwrap();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to add participant";
    } finally {
      toast({
        title: "Added with success",
      });
      resetForm();
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="px-8 py-3 text-black" variant="outline">
            Add Participant
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enter Participant Details</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            {errors.general && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.general}</AlertDescription>
              </Alert>
            )}

            <div className="grid gap-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <div className="col-span-3">
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={errors.name ? "border-red-500" : ""}
                    disabled={isLoading}
                    required
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cni" className="text-right">
                  CNI
                </Label>
                <div className="col-span-3">
                  <Input
                    id="cni"
                    value={cni}
                    onChange={(e) => setCni(e.target.value)}
                    className={errors.cni ? "border-red-500" : ""}
                    disabled={isLoading}
                    required
                  />
                  {errors.cni && (
                    <p className="text-red-500 text-sm mt-1">{errors.cni}</p>
                  )}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="ml-auto"
              disabled={isLoading}
              variant="default"
            >
              {isLoading ? "Adding..." : "Submit"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
};

export default ParticipantFormPopup;
