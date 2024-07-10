"use client";

import { useEffect, useState } from "react";
import ArrowDown from "../../../public/icons/ArrowDown";
import ArrowUp from "../../../public/icons/ArrowUp";
import SearchTicket from "@/components/SearchTicket";
import FilterTicket from "@/components/FilterTicket";
import withAuth from "@/components/withAuth";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "ticketID",
    direction: "asc",
  });
  const [ticketInput, setTicketInput] = useState("");
  const [filters, setFilters] = useState({ severity: [], status: [] });

  const fetchTickets = async () => {
    const data = await fetch("/data/tickets.json");
    const ticketData = await data.json();
    setTickets(ticketData);
    setFilteredTickets(ticketData);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    let filtered = tickets;

    if (ticketInput) {
      filtered = filtered.filter((ticket) =>
        ticket.subject.toLowerCase().includes(ticketInput.toLowerCase())
      );
    }

    if (filters.severity.length > 0) {
      filtered = filtered.filter((ticket) =>
        filters.severity.includes(ticket.priority.toLowerCase())
      );
    }

    if (filters.status.length > 0) {
      filtered = filtered.filter((ticket) =>
        filters.status.includes(ticket.status.toLowerCase())
      );
    }

    setFilteredTickets(filtered);
    setCurrentPage(1);
  }, [ticketInput, filters, tickets]);

  const sortedTickets = [...filteredTickets].sort((a, b) => {
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
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

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
    <div className="min-h-screen mx-40 p-4">
      <div className="flex justify-between">
        <SearchTicket onSelectTicket={handleTicketSelect} />
        <FilterTicket onSelectFilters={setFilters} />
      </div>
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
            <th className="py-2 px-4 border border-gray-300 text-center hidden md:table-cell">
              Date Opened
            </th>
            <th className="py-2 px-4 border border-gray-300 text-center">
              Subject
            </th>
            <th className="py-2 px-4 border border-gray-300 text-center">
              Severity
            </th>
            <th className="py-2 px-4 border border-gray-300 text-center hidden md:table-cell">
              Assignee
            </th>
            <th className="py-2 px-4 border border-gray-300 text-center hidden md:table-cell">
              Customer
            </th>
            <th className="py-2 px-4 border border-gray-300 text-center hidden md:table-cell">
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
              <td className="py-2 px-4 border border-gray-300 text-center hidden md:table-cell">
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
              <td className="py-2 px-4 border border-gray-300 text-center hidden md:table-cell">
                {ticket.assignee}
              </td>
              <td className="py-2 px-4 border border-gray-300 text-center hidden md:table-cell">
                {ticket.customer}
              </td>
              <td className="py-2 px-4 border border-gray-300 text-center hidden md:table-cell">
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
};

export default withAuth(Tickets);
