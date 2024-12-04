import { useEffect } from "react";
import EventCard from "./EventCard";
import { fetchEvents, deleteEvent } from "@/store/slices/eventSlice";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { Loader, MoreVertical } from "lucide-react";
import { EventFormPopup } from "./EventFormPopup";
import { EventUpdatePopup } from "./EventUpdatePopup";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { toast } from "sonner";

const EventsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { events, loading, error, currentPage, totalPages } = useSelector(
    (state: RootState) => state.events
  );

  useEffect(() => {
    dispatch(fetchEvents({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handleDelete = async (eventId: string) => {
    try {
      await dispatch(deleteEvent(eventId)).unwrap();
      toast.success("Event deleted successfully");
    } catch (error) {
      toast.error("Failed to delete event");
    }
  };

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
          <div key={event.id} className="relative">
            <div className="absolute top-4 right-4 z-10">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* <DropdownMenuItem> */}
                  <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                    <EventUpdatePopup event={event} />
                  </div>
                  {/* </DropdownMenuItem> */}
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    onClick={() => handleDelete(event._id)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <EventCard event={event} />
          </div>
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
