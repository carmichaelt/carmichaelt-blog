"use client";

import Link from "next/link";

interface TechItemProps {
  tech: {
    name: string;
    icon: string;
    url: string;
    category: 'frontend' | 'backend' | 'database' | 'tools' | 'deployment' | 'design';
    size: 'small' | 'medium' | 'large' | 'xlarge';
  };
  className?: string;
}

const categoryColors = {
  frontend: 'from-blue-500 to-cyan-500',
  backend: 'from-green-500 to-emerald-500',
  database: 'from-purple-500 to-violet-500',
  tools: 'from-orange-500 to-amber-500',
  deployment: 'from-pink-500 to-rose-500',
  design: 'from-indigo-500 to-blue-500',
};

const sizeClasses = {
  small: 'text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5',
  medium: 'text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2',
  large: 'text-base sm:text-lg px-4 sm:px-5 py-2 sm:py-3',
  xlarge: 'text-lg sm:text-xl px-5 sm:px-6 py-2.5 sm:py-4',
};

export function TechItem({ tech, className = "" }: TechItemProps) {
  return (
    <Link
      href={tech.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex
        items-center
        justify-center
        ${sizeClasses[tech.size]}
        bg-white dark:bg-gray-800
        rounded-full
        shadow-lg
        hover:shadow-xl
        transition-all
        duration-300
        hover:scale-105
        hover:-translate-y-1
        border
        border-gray-200
        dark:border-gray-700
        group
        relative
        overflow-hidden
        ${className}
      `}
    >
      {/* Gradient background based on category */}
      <div className={`absolute inset-0 bg-gradient-to-r ${categoryColors[tech.category]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
      
      {/* Content */}
      <div className="relative flex items-center space-x-1 sm:space-x-2">
        <span className="text-sm sm:text-lg group-hover:scale-110 transition-transform duration-300">
          {tech.icon}
        </span>
        <span className="font-medium text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300 truncate">
          {tech.name}
        </span>
      </div>
      
      {/* Hover effect indicator */}
      <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-gray-300 dark:group-hover:border-gray-600 transition-colors duration-300"></div>
    </Link>
  );
}