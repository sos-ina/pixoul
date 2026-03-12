export const Input = ({ label, type = "text", ...props }) => (
  <div className="flex flex-col space-y-1 w-full">
    <label className="text-[10px] font-bold dark:text-gray-400 text-gray-600 tracking-wider uppercase">
      {label} <span className="text-red-500">*</span>
    </label>
    <input 
      type={type} 
      className="dark:bg-[#121212] bg-white border dark:border-white/10 border-black/10 dark:text-white text-black p-3 text-sm focus:outline-none focus:border-[#38C2D9] transition-colors placeholder:text-gray-700"
      {...props}
    />
  </div>
);