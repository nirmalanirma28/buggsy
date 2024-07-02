"use client";

import { useState } from "react";

const NewTicketForm = () => {
  const [priority, setPriority] = useState("high");
  const [subject, setSubject] = useState("");
  const [assignee, setAssignee] = useState("");
  const [customer, setCustomer] = useState("");
  const [status, setStatus] = useState("new");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the current date in YYYY-MM-DD format
    const dateOpened = new Date().toISOString().split("T")[0];

    try {
      const res = await fetch("/api/newticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priority,
          dateOpened,
          subject,
          assignee,
          customer,
          status,
        }),
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      setMessage("Ticket created successfully!");
      setPriority("high");
      setSubject("");
      setAssignee("");
      setCustomer("");
      setStatus("new");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to create ticket.");
    }
  };

  return (
    <div className=" w-96 mx-auto mt-10 p-4 border border-gray-300 rounded shadow  bg-gray-200">
      <h2 className="text-2xl mb-4 flex justify-center">Create New Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="priority" className="block text-gray-700">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-gray-700">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="assignee" className="block text-gray-700">
            Assignee
          </label>
          <input
            type="text"
            id="assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="customer" className="block text-gray-700">
            Customer
          </label>
          <input
            type="text"
            id="customer"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          >
            <option value="new">New</option>
            <option value="in progress">In Progress</option>
            <option value="waiting">Waiting</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Create Ticket
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default NewTicketForm;
