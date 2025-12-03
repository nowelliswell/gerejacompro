import bcrypt from 'bcryptjs';
import { readData, writeData } from '@/lib/utils/db';
import { User } from '@/lib/types/user';

export async function seedAdminUser() {
  const data = await readData<{ users: User[] }>('users.json');
  const users = data.users || [];

  // Check if admin already exists
  const adminExists = users.some((u) => u.username === 'admin');

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const adminUser: User = {
      id: 'admin-' + Date.now(),
      username: 'admin',
      email: 'admin@gereja.com',
      password: hashedPassword,
      role: 'super_admin',
      nama: 'Super Administrator',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(adminUser);
    await writeData('users.json', { users });
    
    console.log('Default admin user created:');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('Please change the password after first login!');
  }
}
