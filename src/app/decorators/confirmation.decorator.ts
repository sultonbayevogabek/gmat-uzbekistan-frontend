/* eslint-disable */
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
import { firstValueFrom } from 'rxjs';
import {
   FuseConfirmationConfig,
   FuseConfirmationModule,
   FuseConfirmationService
} from '../../@fuse/services/confirmation';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function Confirmable(options?: FuseConfirmationConfig): any {
   // eslint-disable-next-line @typescript-eslint/ban-types
   return (target: Object, propertyKey: string, descriptor: PropertyDescriptor): any => {
      const originalMethod = descriptor.value;
      const config: FuseConfirmationConfig = {
         title: 'attention',
         message: 'Are you sure you want to confirm this action?',
         icon: {
            show: true,
            name: 'heroicons_outline:exclamation',
            color: 'warn',
         },
         actions: {
            confirm: {
               show: true,
               label: 'Tasdiqlash',
               color: 'primary',
            },
            cancel: {
               show: true,
               label: 'Bekor qilish',
            },
         },
         dismissible: false,
      };

      if (options) {
         Object.keys(options).forEach((x) => (config[x] = options[x]));
      }

      descriptor.value = async function (...args): Promise<any> {
         const res: any = await firstValueFrom(
            FuseConfirmationModule.injector.get(FuseConfirmationService).open(config).afterClosed(),
         );
         if (res === 'confirmed') {
            return originalMethod.apply(this, args);
         }
      };
      return descriptor;
   };
}
