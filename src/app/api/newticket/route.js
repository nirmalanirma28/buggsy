import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const { priority, dateOpened, subject, assignee, customer, status } = await req.json();

    const filePath = path.join(process.cwd(), 'public', 'data', 'tickets.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const tickets = JSON.parse(fileContents);

    const newTicket = {
      ticketID: tickets.length ? tickets[tickets.length - 1].ticketID + 1 : 1,
      priority,
      dateOpened,
      subject,
      assignee,
      customer,
      status,
    };

    tickets.push(newTicket);

    fs.writeFileSync(filePath, JSON.stringify(tickets, null, 2));

    return new Response(JSON.stringify(newTicket), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error creating ticket' }), { status: 500 });
  }
}