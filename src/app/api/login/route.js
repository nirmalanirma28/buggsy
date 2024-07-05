import { readFile } from 'fs/promises';
import path from 'path';
import jwt from 'jsonwebtoken';

const usersFilePath = path.join(process.cwd(), 'public/data/users.json');

export async function POST(req, res) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ message: 'Method not allowed' }), { status: 405 });
    }

    const { email, password } = await req.json();

    try {
        const users = JSON.parse(await readFile(usersFilePath, 'utf-8'));
        const user = users.find((u) => u.email === email && u.password === password);

        if (!user) {
            return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401 });
        }

        const token = jwt.sign({ email: user.email }, 'your-secret-key', { expiresIn: '1h' });
        return new Response(JSON.stringify({ message: 'success', token }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
    }
}