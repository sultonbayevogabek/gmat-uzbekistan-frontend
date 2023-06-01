export interface IUser {
   id?: string;
   name?: string;
   phone?: string;
   role?: 'user' | 'premium-user' | 'admin';
   avatar?: string;
   isDeleted?: boolean;
   token?: string;
}
