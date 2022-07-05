export const isValidEmail = stringEmail =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(stringEmail);
export const isValidPassword = stringPassword => stringPassword.length >= 6;
