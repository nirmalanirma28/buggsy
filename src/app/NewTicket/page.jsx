"use client";
import NewTicketForm from "@/components/NewTicketForm";
import withAuth from "@/components/withAuth";
const NewTicket = () => {
  return (
    <div>
      <NewTicketForm />
    </div>
  );
};

export default withAuth(NewTicket);
