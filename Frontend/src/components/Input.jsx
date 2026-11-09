function Input({ icon: Icon, ...props }) {
  return (
    <div className="relative mb-5">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="h-5 w-5 text-purple-300" />
      </div>

      <input
        {...props}
        className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-10 pr-4 text-white placeholder-white/40 outline-none transition duration-200 focus:border-purple-400/60 focus:bg-white/5 focus:ring-2 focus:ring-purple-500/20"
      />
    </div>
  );
}

export default Input;