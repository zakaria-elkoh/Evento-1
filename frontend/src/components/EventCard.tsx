import { Armchair } from "lucide-react";
import "./EventCard.css";
import { Link } from "react-router-dom";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imgUrl: string;
  organizer: string;
  totalReservation: number;
  totalPlaces: number;
}

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const { title, description, imgUrl, totalPlaces, totalReservation } = event;
  const placesLeft = totalPlaces - totalReservation;

  return (
    <Link to={`/events/${event._id}`}>
      <div className="center cursor-pointer">
        <div className="article-card relative">
          <div
            className={`absolute top-4 right-4 text-xl flex items-center gap-2 ${
              placesLeft > 0 ? "bg-white/60" : "bg-red-500 text-white"
            } px-2 py-1 rounded-lg`}
          >
            {placesLeft > 0 ? (
              <>{placesLeft} Spots Left</>
            ) : (
              <p className="">Sold Out</p>
            )}
          </div>
          <div className="content">
            <p className="date">Jan 1, 2022</p>
            <p className="title">{title}</p>
            <p className="date">{description}</p>
          </div>
          <img src={imgUrl} alt="article-cover" />
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
