"use client";
import { useEffect, useState } from "react";
import ArrowDown from "../../../public/icons/ArrowDown";
import ArrowUp from "../../../public/icons/ArrowUp";
import SearchTicket from "@/components/SearchTicket";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "ticketID",
    direction: "asc",
  });

  const [TicketInput, setTicketInput] = useState("");

  const fetchTickets = async () => {
    const data = await fetch("/data/tickets.json");
    const tickets = await data.json();
    console.log("tickets", tickets);
    // return tickets;
    setTickets(tickets);
  };

  useEffect(() => {
    const ticketData = fetchTickets();
    // if (TicketInput) {
    //   console.log("llllllllllll");
    //   setTickets(ticketData.filter((ticket) => ticket.subject === TicketInput));
    // } else {
    //   setTickets(ticketData);
    // }
  }, []);

  const sortedTickets = [...tickets].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = sortedTickets.slice(
    indexOfFirstTicket,
    indexOfLastTicket
  );
  // Handle pagination
  const totalPages = Math.ceil(tickets.length / ticketsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSeverityClass = (severity) => {
    if (severity === "high") {
      return "text-red-800 bg-red-400 bg-opacity-20 rounded px-2 py-1";
    } else if (severity === "medium") {
      return "text-yellow-700 bg-yellow-400 bg-opacity-20 rounded px-2 py-1";
    } else {
      return "text-blue-700 bg-blue-400 bg-opacity-20 rounded px-2 py-1";
    }
  };

  const handleTicketSelect = (ticket) => {
    setTicketInput(ticket);
  };

  return (
    <div className="container mx-40 p-4">
      {/* <div>
        <SearchTicket onSelectTicket={handleTicketSelect} />
      </div> */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="text-slate-500 bg-slate-100">
            <th
              className="py-2 px-4 border border-gray-300 text-center cursor-pointer"
              onClick={() => requestSort("ticketID")}
            >
              <div className="flex gap-2 items-center">
                <p>Ticket ID</p>
                {sortConfig.key === "ticketID" &&
                  (sortConfig.direction === "asc" ? (
                    <ArrowDown />
                  ) : (
                    <ArrowUp />
                  ))}
              </div>
            </th>
            <th className="py-2 px-4 border border-gray-300 text-center">
              Date Opened
            </th>
            <th className="py-2 px-4 border border-gray-300 text-center">
              Subject
            </th>
            <th className="py-2 px-4 border border-gray-300 text-center">
              Severity
            </th>
            <th className="py-2 px-4 border border-gray-300 text-center">
              Assignee
            </th>
            <th className="py-2 px-4 border border-gray-300 text-center">
              Customer
            </th>
            <th className="py-2 px-4 border border-gray-300 text-center">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {currentTickets.map((ticket) => (
            <tr key={ticket.ticketID} className="text-slate-500">
              <td className="py-2 px-4 border border-gray-300 text-center">
                {ticket.ticketID}
              </td>
              <td className="py-2 px-4 border border-gray-300 text-center">
                {ticket.dateOpened}
              </td>
              <td className="py-2 px-4 border border-gray-300 text-center">
                {ticket.subject}
              </td>
              <td className="py-2 px-4 border border-gray-300 text-center">
                <span className={getSeverityClass(ticket.priority)}>
                  {ticket.priority}
                </span>
              </td>
              <td className="py-2 px-4 border border-gray-300 text-center">
                {ticket.assignee}
              </td>
              <td className="py-2 px-4 border border-gray-300 text-center">
                {ticket.customer.name}
              </td>
              <td className="py-2 px-4 border border-gray-300 text-center">
                {ticket.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
