import { useState, useEffect, useRef } from "react";

const FilterTicket = ({ onSelectFilters }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    severity: [],
    status: [],
  });
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleCheckboxChange = (type, value) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev };
      if (updatedFilters[type].includes(value)) {
        updatedFilters[type] = updatedFilters[type].filter(
          (item) => item !== value
        );
      } else {
        updatedFilters[type].push(value);
      }
      onSelectFilters(updatedFilters);
      return updatedFilters;
    });
  };

  useEffect(() => {
    onSelectFilters(selectedFilters);
  }, [selectedFilters]);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left m-2">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={handleButtonClick}
        >
          Filter
        </button>
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <p className="block px-4 py-2 text-sm text-gray-700">Severity</p>
            {["high", "medium", "low"].map((severity) => (
              <div key={severity} className="px-4 py-2 flex items-center">
                <input
                  type="checkbox"
                  id={`severity-${severity}`}
                  className="mr-2"
                  checked={selectedFilters.severity.includes(severity)}
                  onChange={() => handleCheckboxChange("severity", severity)}
                />
                <label
                  htmlFor={`severity-${severity}`}
                  className="text-sm text-gray-700"
                >
                  {severity.charAt(0).toUpperCase() + severity.slice(1)}
                </label>
              </div>
            ))}
            <p className="block px-4 py-2 text-sm text-gray-700">Status</p>
            {["new", "in progress", "waiting"].map((status) => (
              <div key={status} className="px-4 py-2 flex items-center">
                <input
                  type="checkbox"
                  id={`status-${status}`}
                  className="mr-2"
                  checked={selectedFilters.status.includes(status)}
                  onChange={() => handleCheckboxChange("status", status)}
                />
                <label
                  htmlFor={`status-${status}`}
                  className="text-sm text-gray-700"
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterTicket;
