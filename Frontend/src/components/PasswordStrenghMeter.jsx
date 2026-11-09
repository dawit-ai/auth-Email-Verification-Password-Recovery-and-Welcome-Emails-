
function PasswordStrenghMeter({ password }) {
  const getPasswordStrength = (password) => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  const strength = getPasswordStrength(password);

  const getStrengthText = () => {
    switch (strength) {
      case 1:
        return "Weak password";
      case 2:
        return "Fair password";
      case 3:
        return "Good password";
      case 4:
        return "Strong password";
      default:
        return "";
    }
  };

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              level <= strength
                ? "bg-purple-500"
                : "bg-white/10"
            }`}
          />
        ))}
      </div>

      {password && (
        <>
          <p className="mt-2 text-xs text-white/60">
            {getStrengthText()}
          </p>

          {/* Password requirements */}
          <div className="mt-3 space-y-1">
            <p
              className={`text-xs ${
                password.length >= 8
                  ? "text-green-400"
                  : "text-white/50"
              }`}
            >
              {password.length >= 8 ? "✓" : "○"} At least 8 characters
            </p>

            <p
              className={`text-xs ${
                /[A-Z]/.test(password)
                  ? "text-green-400"
                  : "text-white/50"
              }`}
            >
              {/[A-Z]/.test(password) ? "✓" : "○"} One uppercase letter
            </p>

            <p
              className={`text-xs ${
                /[0-9]/.test(password)
                  ? "text-green-400"
                  : "text-white/50"
              }`}
            >
              {/[0-9]/.test(password) ? "✓" : "○"} One number
            </p>

            <p
              className={`text-xs ${
                /[^A-Za-z0-9]/.test(password)
                  ? "text-green-400"
                  : "text-white/50"
              }`}
            >
              {/[^A-Za-z0-9]/.test(password)
                ? "✓"
                : "○"}{" "}
              One special character
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default PasswordStrenghMeter;
