import { useState } from "react";
import MagnifyingGlass from "../../public/icons/MagnifyingGlass";

const SearchTicket = ({ onSelectTicket }) => {
  const [ticketInput, setTicketInput] = useState("");

  const handleInputChange = (event) => {
    setTicketInput(event.target.value);
    onSelectTicket(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      return handleInputChange;
    }
  };

  return (
    <div className="flex items-center mb-2">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for tickets"
          className="px-4 py-2 rounded-md border-gray-300 border focus:outline-none focus:border-blue-500  bg-slate-100"
          value={ticketInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <div className="absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlass />
        </div>
      </div>
    </div>
  );
};

export default SearchTicket;
