import { useEffect } from "react";
import EventCard from "./EventCard";
import { fetchEvents } from "@/store/slices/eventSlice";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "lucide-react";
import { EventFormPopup } from "./EventFormPopup";

const EventsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { events, loading, error, currentPage, totalPages } = useSelector(
    (state: RootState) => state.events
  );

  useEffect(() => {
    dispatch(fetchEvents({ page: currentPage }));
  }, [dispatch, currentPage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // Handle error object properly
  if (error) {
    const errorMessage =
      typeof error === "object"
        ? error.description || error.message || "An error occurred"
        : error.toString();

    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {errorMessage}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        No events found
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold mb-8">Events List</h1>
        <EventFormPopup />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => dispatch(fetchEvents({ page: index + 1 }))}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsList;
