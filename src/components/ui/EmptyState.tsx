import React from 'react';
import { LucideIcon, Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="bg-[#F4F5F7] rounded-2xl p-4 mb-4">
        <Icon className="w-7 h-7 text-[#8A9099]" />
      </div>
      <h3 className="text-sm font-medium text-[#1E1E1E] mb-1">{title}</h3>
      {description && (
        <p className="text-xs text-[#6B7078] max-w-xs">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 px-4 h-9 text-xs font-medium text-white bg-[#FF3D3D] rounded-full hover:bg-[#078A22] transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
