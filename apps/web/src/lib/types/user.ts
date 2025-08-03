import type { BaseType, PaginationData } from '.';

// TODO: Add or remove fields as needed
export type User = BaseType & {
  email: string;
  name: string;
  telephone: string;
  profilePicture: string | null;
  accountStatus: 'ACTIVE' | 'INACTIVE' | 'DEACTIVATED';
  activationCode?: string;
  expirationToken: string;
  role: 'SUPER_ADMIN' | 'COMPANY_ADMIN';
};

export type UserData = PaginationData<'data', User>;
