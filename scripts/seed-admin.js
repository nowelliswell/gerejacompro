const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

async function seedAdmin() {
  const usersPath = path.join(__dirname, '../data/users.json');
  
  // Read existing users
  const data = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
  const users = data.users || [];

  // Check if admin already exists
  const adminExists = users.some((u) => u.username === 'admin');

  if (adminExists) {
    console.log('Admin user already exists!');
    return;
  }

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const adminUser = {
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
  
  // Write back to file
  fs.writeFileSync(usersPath, JSON.stringify({ users }, null, 2));
  
  console.log('✅ Default admin user created successfully!');
  console.log('');
  console.log('Login credentials:');
  console.log('  Username: admin');
  console.log('  Password: admin123');
  console.log('');
  console.log('⚠️  Please change the password after first login!');
}

seedAdmin().catch(console.error);
