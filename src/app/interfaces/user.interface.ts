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
   payments?: IPayment[]
}

export interface IPayment {
   id: string;
   paymentUserId: string;
   paymentScreenshot: string;
   seenTime: string;
   createdAt: string;
   updatedAt: string;
}