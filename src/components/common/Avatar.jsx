import React from 'react';
import { User } from 'lucide-react';

// Default avatar path
const DEFAULT_AVATAR = '/images/default-user.svg';

/**
 * Avatar component that handles profile pictures with fallback options
 * 
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text for the image
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.size - Size in pixels
 * @param {boolean} props.square - If true, renders a square avatar instead of round
 * @returns {JSX.Element} Avatar component
 */
const Avatar = ({ 
  src, 
  alt = "User", 
  className = "", 
  size = 40, 
  square = false,
  ...props 
}) => {
  // Add cache-busting parameter to force image refresh if it's a URL
  const imgSrc = src && typeof src === 'string' && src.includes('http') 
    ? `${src}?t=${new Date().getTime()}` 
    : src;
  
  // Function to handle image loading error
  const handleError = (e) => {
    e.target.onerror = null; // Prevent infinite fallback loop
    e.target.src = DEFAULT_AVATAR;
  };

  return (
    <div 
      className={`flex items-center justify-center overflow-hidden ${square ? 'rounded-md' : 'rounded-full'} ${className}`}
      style={{ width: `${size}px`, height: `${size}px`, minWidth: `${size}px`, minHeight: `${size}px` }}
      {...props}
    >
      {src ? (
        <img
          src={imgSrc}
          alt={alt}
          className="w-full h-full object-cover"
          onError={handleError}
        />
      ) : (
        <img
          src={DEFAULT_AVATAR}
          alt={alt}
          className="w-full h-full object-contain"
        />
      )}
    </div>
  );
};

export default Avatar; 