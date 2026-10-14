/**
 * LoadingSpinner - reusable animated spinner
 * @param {'sm' | 'md' | 'lg' | 'xl'} size
 * @param {string} className
 */
const sizeMap = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-4",
  xl: "w-16 h-16 border-4",
};

const LoadingSpinner = ({ size = "md", className = "" }) => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`${sizeMap[size]} rounded-full border-dark-600 border-t-brand-500 animate-spin ${className}`}
    />
  );
};

export default LoadingSpinner;
