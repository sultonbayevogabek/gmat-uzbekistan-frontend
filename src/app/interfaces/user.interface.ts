export interface IUser {
   id?: string;
   createdAt?: string;
   googleId?: string;
   name?: string;
   phone?: string;
   email?: string;
   role?: 'user' | 'premium-user' | 'admin';
   avatar?: string;
   isDeleted?: boolean;
   password?: string;
}
