import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const notificationsPath = path.join(process.cwd(), 'data', 'notifications.json');

export async function GET() {
  try {
    const data = await readFile(notificationsPath, 'utf-8');
    const notifications = JSON.parse(data);
    
    return NextResponse.json(notifications);
  } catch (error) {
    console.error('Error reading notifications:', error);
    return NextResponse.json(
      { notifications: [] },
      { status: 200 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newNotification = await request.json();
    
    // Read existing notifications
    let notifications: { notifications: any[] } = { notifications: [] };
    try {
      const data = await readFile(notificationsPath, 'utf-8');
      notifications = JSON.parse(data);
    } catch (error) {
      // File doesn't exist or is empty, use default
    }
    
    // Add new notification
    const notification = {
      id: Date.now().toString(),
      ...newNotification,
      isRead: false,
      time: new Date().toISOString(),
    };
    
    notifications.notifications.unshift(notification);
    
    // Keep only last 50 notifications
    if (notifications.notifications.length > 50) {
      notifications.notifications = notifications.notifications.slice(0, 50);
    }
    
    // Save to file
    await writeFile(notificationsPath, JSON.stringify(notifications, null, 2));
    
    return NextResponse.json(notification, { status: 201 });
  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json(
      { error: 'Failed to create notification' },
      { status: 500 }
    );
  }
}
