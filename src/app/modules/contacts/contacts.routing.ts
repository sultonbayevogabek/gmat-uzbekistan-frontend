import { Route } from '@angular/router';
import { ContactsComponent } from 'app/modules/contacts/contacts.component';
import { ContactsListComponent } from 'app/modules/contacts/list/list.component';

export const contactsRoutes: Route[] = [
    {
        path     : '',
        component: ContactsComponent,
        children : [
            {
                path     : '',
                component: ContactsListComponent
            }
        ]
    }
];
