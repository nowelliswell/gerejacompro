interface StatusBadgeProps {
  status: string;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
}

const variantClasses = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
  default: 'bg-gray-100 text-gray-800',
};

const statusVariantMap: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'default'> = {
  // General statuses
  active: 'success',
  inactive: 'default',
  pending: 'warning',
  approved: 'success',
  rejected: 'danger',
  completed: 'success',
  'in-progress': 'info',
  
  // Donation statuses
  verified: 'success',
  
  // Article statuses
  draft: 'default',
  published: 'success',
};

export default function StatusBadge({ status, variant }: StatusBadgeProps) {
  const statusLower = status.toLowerCase();
  const badgeVariant = variant || statusVariantMap[statusLower] || 'default';
  
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[badgeVariant]}`}
    >
      {status}
    </span>
  );
}
