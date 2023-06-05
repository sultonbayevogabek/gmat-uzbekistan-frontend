export interface IUser {
   id?: string;
   googleId?: string;
   name?: string;
   phone?: string;
   email?: string;
   role?: 'user' | 'premium-user' | 'admin';
   avatar?: string;
   isDeleted?: boolean;
   token?: string;
}
