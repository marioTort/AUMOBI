import valid from "card-validator";

export default function validateInfo(values) {
  let errors = {};
  let creditCard = valid.number(values.cardNumber);

  creditCard.expirationDate = valid.expirationDate(values.cardExpiration);
  creditCard.cvv = valid.cvv(values.cardSecurityCode);
  creditCard.cardholderName = valid.cardholderName(values.cardName);

  errors.show = true;
  errors.variant = "danger";
  errors.message = "Errore sconosciuto."
  errors.cname = false;
  errors.cnumber = false;
  errors.ctype = false;
  errors.cexp = false;
  errors.ccvv = false;
  errors.cpostal = false;


  //Card CVV expiration
  if (values.cardSecurityCode === null || !values.cardSecurityCode.trim()) {
    errors.message = " CVV incompleto";
  } else if (creditCard.cvv.isValid) {
    errors.ccvv = true;
  } else {
    errors.message = " CVV non valido";
  }

  //Card Expiration Verification
  if (values.cardExpiration === null || !values.cardExpiration.trim()) {
    errors.message = "Data di scadenza incompleta";
  } else if (creditCard.expirationDate.isValid) {
    errors.cexp = true;
  } else {
    errors.message = "Data di scadenza non valida";
  }

  //Card Number Verification
  if (values.cardNumber === null || !values.cardNumber.trim()) {
    errors.message = "Numero carta incompleto";
  } else if (creditCard.isValid) {
    errors.cnumber = true;
  } else {
    errors.message = "Numero carta non valido";
  }

  //Cardholder Name Verification
  if (values.cardName === null || !values.cardName.trim()) {
    errors.message = "Intestatario incompleto";
  } else if (creditCard.cardholderName.isValid) {
    errors.cname = true;
  } else {
    errors.message = "Intestatario non valido";
  }

  if (
    errors.ctype &&
    errors.cname &&
    errors.cnumber &&
    errors.cexp &&
    errors.cpostal &&
    errors.ccvv
  ) {
    errors.variant = "success";
    errors.message = "Carta di credito valida";
  }

  return errors;
}