module.exports.validateRegisterInput = (
  fullName,
  email,
  username,
  password,
  confirmPassword
) => {
  const errors = {};

  const nameRegex = /^[a-zA-Z ',.-]{2,40}$/;
  const usernameRegex = /^[A-Za-z][A-Za-z0-9_]{3,20}$/;
  const emailRegex = /^[\w-\.]+@(ufl\.edu|sfcollege\.edu)$/;
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,32}$/;

  if (fullName.trim() === "") {
    errors.fullName = "Name must not be empty";
  } else {
    if (!fullName.match(nameRegex)) {
      errors.fullName = "Name must be a valid name";
    }
  }
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  } else {
    if (!username.match(usernameRegex)) {
      errors.username = "Username must be a valid username";
    }
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    if (!email.match(emailRegex)) {
      errors.email = "Email must be a valid email address";
    }
  }
  if (password === "") {
    errors.password = "Password must not empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  } else if (!password.match(passwordRegex)) {
    errors.password =
      "Password must have at least 1 uppercase character, 1 lowercase character, 1 digit, 1 special character, and 8-32 characters in length";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (email, password) => {
  const errors = {};

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateForgotPasswordInput = (email) => {
  const errors = {};

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateResetPasswordInput = (password, confirmPassword) => {
  const errors = {};

  const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,32}$/;

  if (password === "") {
    errors.password = "Password must not empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  } else if (!password.match(passwordRegex)) {
    errors.password =
      "Password must have at least 1 uppercase character, 1 lowercase character, 1 digit, 1 special character, and 8-32 characters in length";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};