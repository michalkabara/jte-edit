// React Imports

export enum FieldType {
  Name = 0,
  Surname = 1,
  Email = 2,
  PhoneNumber = 3,
  Ticket = 4,
  PromoCode = 5,
  Invoice = 6,
  PersonalDataProcessPermission = 7,
  Newsletter = 8,

  // Additional
  Text = 10,
  TextRequired = 11,
  TextArea = 12,
  TextAreaRequired = 13,
  Date = 14,
  Radio = 15,
  Checkbox = 16,
  CheckboxRequired = 17,
  Select = 18,
  SelectRequired = 19,
  SelectMultiple = 20,
  SelectMultipleRequired = 21,
  Module = 22,
  File = 23,
  AdditionalPersons = 25,
  VoluntaryDonation = 26,
  Nip = 27,
  CurrencySelection = 28,
  ExternallyValidatedField = 29,

  ReferenceId = 95,
  UserIntId = 98,
  Separator = 99,
  InvitedBy = 100,
  InvoiceRequest = 101,
  InvoiceForPersonalUse = 102,
  InvoiceEmailRecipient = 103,
  Captcha = 104,
}

export const FieldTypeLabelMapping = {
  0: "Imię",
  1: "Nazwisko",
  2: "Email",
  3: "Numer telefonu",
  4: "Bilety",
  5: "Kod promocyjny",
  6: "Dane do faktury",
  8: "Newsletter",

  10: "Pole tekstowe",
  11: "Pole tekstowe obowiązkowe",
  12: "Duże pole tekstowe",
  13: "Duże pole tekstowe obowiązkowe",
  14: "Data",
  15: "Przycisk typu radio",
  16: "Przycisk typu checkbox",
  17: "Przycisk typu checkbox, obowiązkowy",
  18: "Pole rozwijalne",
  19: "Pole rozwijalne obowiązkowe",
  20: "Pole wielokrotnego wyboru",
  21: "Pole wielokrotnego wyboru obowiązkowe",
  22: "Moduł",
  23: "Plik",
  25: "Dodatkowe osoby",
  26: "Dowolna wpłata",
  27: "NIP",
  28: "Wybór waluty",
  29: "Pole z dodatkową walidacją",
  30: "Ilość dodatkowych osób",

  95: "ID z integracji",
  99: "Separator",

  101: "Chce fakture",
  102: "Faktura dla osoby prywatnej",
  103: "Adres email do faktury (jeżeli inny niz email)",
  104: "Captcha",
};

export interface ModalRef {
  open: () => void;
  close: () => void;
}
