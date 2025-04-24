export const checkPasswordStrength = (password: string) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*]/.test(password),
    };
  };
  
  export const isPasswordStrong = (password: string) => {
    const checks = checkPasswordStrength(password);
    return Object.values(checks).every(Boolean);
  };
  