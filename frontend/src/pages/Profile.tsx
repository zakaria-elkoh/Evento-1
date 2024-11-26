import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RootState } from "@reduxjs/toolkit/query";
import { Phone, Mail, Globe, Edit } from "lucide-react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state: RootState) => state?.auth?.user);
  const { firstName = "", lastName = "", email = "" } = user || {};

  return (
    <Card className="relative overflow-hidden max-w-7xl mx-auto mt-6">
      <div className="h-[150px] bg-gray-100">
        <img
          alt="Background"
          className="w-full h-full object-cover"
          height="150"
          src="https://adglegal.com/wp-content/uploads/iStock-670968628-1500x1042.jpg"
          style={{
            aspectRatio: "1024/150",
            objectFit: "cover",
          }}
          width="1024"
        />
        <div className="absolute top-4 right-4">
          <Button size="icon" variant="outline">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="absolute top-16 left-10">
        <Avatar className="w-48 h-48 border-4 border-white cursor-pointer">
          <AvatarImage
            alt="Profile picture"
            src="https://www.corporatephotographerslondon.com/wp-content/uploads/2021/06/non-smiling-LinkedIn-profile-photo.jpg"
          />
        </Avatar>
      </div>
      <CardContent className="pt-20 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold capitalize">
              {firstName} {lastName}
            </h2>
            <p className="text-gray-500">Lawyer</p>
            <p className="text-sm text-gray-500">
              Marrakesh, Marrakesh-Safi, Morocco •{" "}
              <button className="text-blue-500">Contact info</button>
            </p>
            <div className="flex space-x-2 mt-2">
              <Button size="sm" variant="outline">
                Open to
              </Button>
              <Button size="sm" variant="outline">
                Add profile section
              </Button>
              <Button size="sm" variant="outline">
                Enhance profile
              </Button>
              <Button size="sm" variant="outline">
                Resources
              </Button>
            </div>
          </div>
          <div className="text-right">
            <div className="flex flex-col items-end space-y-1">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+212 70507-4846</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>{email}</span>
              </div>
              {/* <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                <span>elkoh.me</span>
              </div> */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
