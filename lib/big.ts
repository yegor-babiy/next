import Big from "big.js";

Big.DP = 2; // Set the decimal places to 2 for currency calculations
Big.RM = Big.roundHalfEven; // Set the rounding mode to round half even (bankers rounding)

export const MyBig = Big;
