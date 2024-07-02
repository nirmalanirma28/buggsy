import { readFile } from 'fs/promises';
import path from 'path';
import jwt from 'jsonwebtoken';

const usersFilePath = path.join(process.cwd(), 'public/data/users.json');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, password } = req.body;

    try {
        const users = JSON.parse(await readFile(usersFilePath, 'utf-8'));
        const user = users.find((u) => u.email === email && u.password === password);

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ email: user.email }, 'your-secret-key', { expiresIn: '1h' });
        res.status(200).json({ message: 'success', token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
