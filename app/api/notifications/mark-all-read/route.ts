import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const notificationsPath = path.join(process.cwd(), 'data', 'notifications.json');

export async function PUT() {
  try {
    // Read existing notifications
    const data = await readFile(notificationsPath, 'utf-8');
    const notifications = JSON.parse(data);
    
    // Mark all as read
    notifications.notifications = notifications.notifications.map((n: any) => ({
      ...n,
      isRead: true,
    }));
    
    // Save to file
    await writeFile(notificationsPath, JSON.stringify(notifications, null, 2));
    
    return NextResponse.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    return NextResponse.json(
      { error: 'Failed to mark all notifications as read' },
      { status: 500 }
    );
  }
}
