import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const { fullName, email, password } = await req.json();

    const filePath = path.join(process.cwd(), 'public', 'data', 'users.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(fileContents);

    const newUser = {
      userId: users.length ? users[users.length - 1].userId + 1 : 1,
      fullName,
      email,
      password
    };

    users.push(newUser);

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error saving user' }), { status: 500 });
  }
}
