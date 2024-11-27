import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Security from "./Security";
import { SettingsIcon } from "lucide-react";

const Settings = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="fixed top-28 left-0 z-50 border-gray-400 rounded-l-none border-l-0">
        <Button variant="outline">
          <SettingsIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Security</SheetTitle>
          <SheetDescription>
            Make changes here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        {/* <Security /> */}
      </SheetContent>
    </Sheet>
  );
};

export default Settings;
