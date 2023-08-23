export default function useValidationRules() {

  const emailPattern = /^(?=[a-zA-Z0-9@.%+-]{6,254}$)[a-zA-Z0-9.%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  const usernamePattern = /^[a-zA-Z0-9_.]+$/;

  const rules = {
    email: (val) => emailPattern.test(val) || 'Please enter a valid email address',
    required: (val) => !!val || 'Field is required',
    validUsername: (val) => usernamePattern.test(val) || 'Username cannot contain space or sepecial chars',
    password: (val) => val.length > 5 || 'Password must be at least 6 characters long',
    min5: (val) => val.length >= 5 || 'Must be at least 5 characters long',
    min24: (val) => val.length >= 24 || 'Must be at least 24 characters long',
    number: (val) => !isNaN(val) || 'Must be number',
    gt0: (val) => parseInt(val) > 0 || 'Must be more than 0',
  };

  return {
    rules,
  };
}
