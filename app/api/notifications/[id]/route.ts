import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const notificationsPath = path.join(process.cwd(), 'data', 'notifications.json');

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { isRead } = await request.json();
    const { id } = await params;
    
    // Read existing notifications
    const data = await readFile(notificationsPath, 'utf-8');
    const notifications = JSON.parse(data);
    
    // Find and update notification
    const notificationIndex = notifications.notifications.findIndex(
      (n: any) => n.id === id
    );
    
    if (notificationIndex === -1) {
      return NextResponse.json(
        { error: 'Notification not found' },
        { status: 404 }
      );
    }
    
    notifications.notifications[notificationIndex].isRead = isRead;
    
    // Save to file
    await writeFile(notificationsPath, JSON.stringify(notifications, null, 2));
    
    return NextResponse.json(notifications.notifications[notificationIndex]);
  } catch (error) {
    console.error('Error updating notification:', error);
    return NextResponse.json(
      { error: 'Failed to update notification' },
      { status: 500 }
    );
  }
}
