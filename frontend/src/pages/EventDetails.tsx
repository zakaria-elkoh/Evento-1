import { AppDispatch, RootState } from "@/store";
import { fetchEventById } from "@/store/slices/EventSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader, MapPin, Calendar } from "lucide-react";
import ParticipantFormPopup from "@/components/ParticipantFormPopup";
import Participants from "@/components/Participants";
import { fetchParticipants } from "@/store/slices/participntSlice";

const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { currentEvent, loading, error } = useSelector(
    (state: RootState) => state.events
  );
  const [participants, setParticipants] = useState([]);

  console.log("currentEvent", currentEvent);
  useEffect(() => {
    if (!eventId) return;

    const fetchEventData = async () => {
      try {
        await dispatch(fetchEventById(eventId));
        const participantsResult = (await dispatch(
          fetchParticipants(eventId)
        )) as {
          payload: Participant[];
        };

        if (participantsResult?.payload) {
          setParticipants(participantsResult.payload);
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, [dispatch, eventId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    const errorMessage =
      typeof error === "object" && error !== null
        ? (error as { message?: string }).message || "An error occurred"
        : String(error);

    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {errorMessage}
      </div>
    );
  }

  if (!currentEvent) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Event not found
      </div>
    );
  }

  // const formattedDate = new Date(currentEvent.date).toLocaleDateString(
  //   "en-US",
  //   {
  //     weekday: "long",
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   }
  // );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-[360px]">
          <img
            src={currentEvent.imgUrl || "https://via.placeholder.com/800x400"}
            alt={currentEvent.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full text-sm font-medium">
            {currentEvent.totalPlaces - currentEvent.totalReservation} spots
            left
          </div>
        </div>

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">{currentEvent.title}</h1>

          <div className="prose max-w-none mb-8">
            <p className="text-gray-700 whitespace-pre-wrap">
              {currentEvent.description}
            </p>
          </div>
          <h2 className="text-2xl font-semibold mb-4">About this event</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span>{currentEvent?.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 capitalize">
              <MapPin className="w-5 h-5" />
              <span>{currentEvent.location}</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Reservation Status</h2>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{
                  width: `${
                    (currentEvent.totalReservation / currentEvent.totalPlaces) *
                    100
                  }%`,
                }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{currentEvent.totalReservation} reserved</span>
              <span>{currentEvent.totalPlaces} total places</span>
            </div>
          </div>

          <button
            className={`${
              currentEvent.totalReservation >= currentEvent.totalPlaces
                ? "bg-red-500 py-3 px-6"
                : "bg-blue-500"
            } bg-blue-500 text-white  rounded-lg mx-auto block font-semibold  transition-colors`}
            disabled={currentEvent.totalReservation >= currentEvent.totalPlaces}
          >
            {currentEvent.totalReservation >= currentEvent.totalPlaces ? (
              "Event Fully Booked"
            ) : (
              <ParticipantFormPopup currentEventId={currentEvent._id} />
            )}
          </button>
          <Participants participants={participants} />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
