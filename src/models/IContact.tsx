export interface IContact {
  clientId: number,
  clientName: string,
  'TRN/PPSN': number,
  yearEnd: string,
  ARD: string,
  companyNumber: number,
  email: string,
  phoneNumber: string,
  companyAdress: string,
}

export type ContactWithoutId = Omit<IContact, 'clientId'>;
