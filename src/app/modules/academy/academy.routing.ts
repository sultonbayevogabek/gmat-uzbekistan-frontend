import { Route } from '@angular/router';
import { AcademyComponent } from 'app/modules/academy/academy.component';
import { AcademyListComponent } from 'app/modules/academy/list/list.component';

export const academyRoutes: Route[] = [
    {
        path     : '',
        component: AcademyComponent,
        children : [
            {
                path     : '',
                pathMatch: 'full',
                component: AcademyListComponent
            }
        ]
    }
];
