import React, { useContext, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Context } from "../../../Context/ContextProvider";
import ViewReunion from "./ViewReunion";

const Calendar = () => {
  const { Reunions, setReunions, successMsg } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [showReunion, setShowReunion] = useState(false);
  const [selectedReunion, setSelectedReunion] = useState(null);

  useEffect(() => {
    const fetchReunions = async () => {
      setLoading(true);
      try {
        const events = [
          {
            id: 1,
            title: "Réunion équipe dev",
            description: "Planning sprint",
            start: "2025-01-15T10:30",
            end: "2025-01-15T12:00",
            membres: [1, 3, 5],
            statut: "enAttente",
            type: "Présentiel",
          },
          {
            id: 2,
            title: "Meeting client",
            description: "Présentation du projet",
            start: "2025-01-16T14:00",
            end: "2025-01-16T15:30",
            membres: [2, 4],
            statut: "terminee",
            type: "Online",
          },
          {
            id: 3,
            title: "Brainstorming",
            description: "Nouvelles idées",
            start: "2025-01-18T09:00",
            end: "2025-01-18T10:30",
            membres: [1, 2, 3, 6],
            statut: "annulee",
            type: "Présentiel",
          },
        ];
        await new Promise((res) => setTimeout(res, 500));
        setReunions(events);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReunions();
  }, []);

  const getEventColorBystatut = (statut) => {
    switch (statut) {
      case "terminee":
        return "#16a34a";
      case "annulee":
        return "#dc2626";
      case "enAttente":
        return "#facc15";
      default:
        return "#2563eb";
    }
  };

  const handleEventClick = (info) => {
    setSelectedReunion(info.event);
    setShowReunion(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center bg-gray-50 p-2 sm:p-4">
      {successMsg && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-fadeIn z-50">
          {successMsg}
        </div>
      )}

      <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
          My Calendar
        </h2>

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={Reunions}
          eventClick={handleEventClick}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          timeZone="local"
          height="auto"
          eventDisplay="block"
          dayMaxEvents={true}
          eventMouseEnter={(info) => {
            info.el.style.transform = "scale(1.05)";
            info.el.style.transition = "transform 0.2s";
          }}
          eventMouseLeave={(info) => {
            info.el.style.transform = "scale(1)";
          }}
          eventDidMount={(info) => {
            const statut = info.event.extendedProps.statut;
            const color = getEventColorBystatut(statut);

            info.el.style.backgroundColor = color;
            info.el.style.color = "#fff";
          }}
          eventContent={(arg) => {
            const { title, start, end } = arg.event;
            const statut = arg.event.extendedProps.statut;
            const color = getEventColorBystatut(statut);

            const startDate = start ? new Date(start).toLocaleDateString() : "";
            const startTime = start
              ? new Date(start).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "";
            const endTime = end
              ? new Date(end).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "";

            return {
              html: `
                <div style="background-color: ${color}; color: #fff; padding: 4px; border-radius: 4px; font-size: 12px;">
                  <strong>${title}</strong><br>
                  <span>${startDate} - ${startTime} ${
                endTime ? "→ " + endTime : ""
              }</span><br>
                  <span>statut: ${statut || "N/A"}</span>
                </div>
              `,
            };
          }}
        />
      </div>

      {showReunion && selectedReunion && (
        <ViewReunion
          selectedReunion={selectedReunion}
          onClose={() => setShowReunion(false)}
        />
      )}
    </div>
  );
};

export default Calendar;
