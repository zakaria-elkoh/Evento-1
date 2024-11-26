import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectLanguage = () => {
  return (
    <Select value="en">
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Lang" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ar">
          <div className="flex gap-4 items-center justify-between">
            <p>AR</p>
            <img height={20} width={20} src="countries-icons/ar.svg" alt="" />
          </div>
        </SelectItem>
        <SelectItem value="en">
          {" "}
          <div className="flex gap-4 items-center justify-between">
            <p>EN</p>
            <img height={20} width={20} src="countries-icons/uk.svg" alt="" />
          </div>
        </SelectItem>
        <SelectItem value="es">
          {" "}
          <div className="flex gap-4 items-center justify-between">
            <p>ES</p>
            <img
              height={20}
              width={20}
              src="countries-icons/spain.svg"
              alt=""
            />
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectLanguage;
