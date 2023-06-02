import {Route} from '@angular/router';
import {AuthGuard} from 'app/core/auth/guards/auth.guard';
import {LayoutComponent} from 'app/layout/layout.component';
import {InitialDataResolver} from 'app/app.resolvers';

export const appRoutes: Route[] = [
    {path: '', pathMatch: 'full', redirectTo: 'dashboards/project'},

    {path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboards/project'},

    // Auth routes for guests
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'sign-in',
                loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)
            },
            {
                path: 'sign-up',
                loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)
            }
        ]
    },
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'home',
                loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)
            },
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'apps', children: [
                    {
                        path: 'academy',
                        loadChildren: () => import('app/modules/admin/apps/academy/academy.module').then(m => m.AcademyModule)
                    },
                    {
                        path: 'chat',
                        loadChildren: () => import('app/modules/admin/apps/chat/chat.module').then(m => m.ChatModule)
                    },
                    {
                        path: 'contacts',
                        loadChildren: () => import('app/modules/admin/apps/contacts/contacts.module').then(m => m.ContactsModule)
                    }
                ]
            },

            // Pages
            {
                path: 'pages', children: [

                    // Activities
                    {
                        path: 'activities',
                        loadChildren: () => import('app/modules/admin/pages/activities/activities.module').then(m => m.ActivitiesModule)
                    },

                    // Authentication
                    {
                        path: 'authentication',
                        loadChildren: () => import('app/modules/admin/pages/authentication/authentication.module').then(m => m.AuthenticationModule)
                    },

                    // Coming Soon
                    {
                        path: 'coming-soon',
                        loadChildren: () => import('app/modules/admin/pages/coming-soon/coming-soon.module').then(m => m.ComingSoonModule)
                    },

                    // Error
                    {
                        path: 'error', children: [
                            {
                                path: '404',
                                loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module)
                            },
                            {
                                path: '500',
                                loadChildren: () => import('app/modules/admin/pages/error/error-500/error-500.module').then(m => m.Error500Module)
                            }
                        ]
                    },

                    // Invoice
                    {
                        path: 'invoice', children: [
                            {
                                path: 'printable', children: [
                                    {
                                        path: 'compact',
                                        loadChildren: () => import('app/modules/admin/pages/invoice/printable/compact/compact.module').then(m => m.CompactModule)
                                    },
                                    {
                                        path: 'modern',
                                        loadChildren: () => import('app/modules/admin/pages/invoice/printable/modern/modern.module').then(m => m.ModernModule)
                                    }
                                ]
                            }
                        ]
                    },

                    // Maintenance
                    {
                        path: 'maintenance',
                        loadChildren: () => import('app/modules/admin/pages/maintenance/maintenance.module').then(m => m.MaintenanceModule)
                    },

                    // Pricing
                    {
                        path: 'pricing', children: [
                            {
                                path: 'modern',
                                loadChildren: () => import('app/modules/admin/pages/pricing/modern/modern.module').then(m => m.PricingModernModule)
                            },
                            {
                                path: 'simple',
                                loadChildren: () => import('app/modules/admin/pages/pricing/simple/simple.module').then(m => m.PricingSimpleModule)
                            },
                            {
                                path: 'single',
                                loadChildren: () => import('app/modules/admin/pages/pricing/single/single.module').then(m => m.PricingSingleModule)
                            },
                            {
                                path: 'table',
                                loadChildren: () => import('app/modules/admin/pages/pricing/table/table.module').then(m => m.PricingTableModule)
                            }
                        ]
                    },

                    // Profile
                    {
                        path: 'profile',
                        loadChildren: () => import('app/modules/admin/pages/profile/profile.module').then(m => m.ProfileModule)
                    },

                    // Settings
                    {
                        path: 'settings',
                        loadChildren: () => import('app/modules/admin/pages/settings/settings.module').then(m => m.SettingsModule)
                    },
                ]
            },

            // User Interface
            {
                path: 'ui', children: [

                    // Material Components
                    {
                        path: 'material-components',
                        loadChildren: () => import('app/modules/admin/ui/material-components/material-components.module').then(m => m.MaterialComponentsModule)
                    },

                    // Fuse Components
                    {
                        path: 'fuse-components',
                        loadChildren: () => import('app/modules/admin/ui/fuse-components/fuse-components.module').then(m => m.FuseComponentsModule)
                    },

                    // Other Components
                    {
                        path: 'other-components',
                        loadChildren: () => import('app/modules/admin/ui/other-components/other-components.module').then(m => m.OtherComponentsModule)
                    },

                    // TailwindCSS
                    {
                        path: 'tailwindcss',
                        loadChildren: () => import('app/modules/admin/ui/tailwindcss/tailwindcss.module').then(m => m.TailwindCSSModule)
                    },

                    // Advanced Search
                    {
                        path: 'advanced-search',
                        loadChildren: () => import('app/modules/admin/ui/advanced-search/advanced-search.module').then(m => m.AdvancedSearchModule)
                    },

                    // Animations
                    {
                        path: 'animations',
                        loadChildren: () => import('app/modules/admin/ui/animations/animations.module').then(m => m.AnimationsModule)
                    },

                    // Cards
                    {
                        path: 'cards',
                        loadChildren: () => import('app/modules/admin/ui/cards/cards.module').then(m => m.CardsModule)
                    },

                    // Colors
                    {
                        path: 'colors',
                        loadChildren: () => import('app/modules/admin/ui/colors/colors.module').then(m => m.ColorsModule)
                    },

                    // Confirmation Dialog
                    {
                        path: 'confirmation-dialog',
                        loadChildren: () => import('app/modules/admin/ui/confirmation-dialog/confirmation-dialog.module').then(m => m.ConfirmationDialogModule)
                    },

                    // Datatable
                    {
                        path: 'datatable',
                        loadChildren: () => import('app/modules/admin/ui/datatable/datatable.module').then(m => m.DatatableModule)
                    },

                    // Forms
                    {
                        path: 'forms', children: [
                            {
                                path: 'fields',
                                loadChildren: () => import('app/modules/admin/ui/forms/fields/fields.module').then(m => m.FormsFieldsModule)
                            },
                            {
                                path: 'layouts',
                                loadChildren: () => import('app/modules/admin/ui/forms/layouts/layouts.module').then(m => m.FormsLayoutsModule)
                            },
                            {
                                path: 'wizards',
                                loadChildren: () => import('app/modules/admin/ui/forms/wizards/wizards.module').then(m => m.FormsWizardsModule)
                            }
                        ]
                    },

                    // Icons
                    {
                        path: 'icons',
                        loadChildren: () => import('app/modules/admin/ui/icons/icons.module').then(m => m.IconsModule)
                    },

                    // Page Layouts
                    {
                        path: 'page-layouts',
                        loadChildren: () => import('app/modules/admin/ui/page-layouts/page-layouts.module').then(m => m.PageLayoutsModule)
                    },

                    // Typography
                    {
                        path: 'typography',
                        loadChildren: () => import('app/modules/admin/ui/typography/typography.module').then(m => m.TypographyModule)
                    }
                ]
            },

            // Documentation
            {
                path: 'docs', children: [

                    // Changelog
                    {
                        path: 'changelog',
                        loadChildren: () => import('app/modules/admin/docs/changelog/changelog.module').then(m => m.ChangelogModule)
                    },

                    // Guides
                    {
                        path: 'guides',
                        loadChildren: () => import('app/modules/admin/docs/guides/guides.module').then(m => m.GuidesModule)
                    }
                ]
            },

            // 404 & Catch all
            {
                path: '404-not-found',
                pathMatch: 'full',
                loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module)
            },
            {path: '**', redirectTo: '404-not-found'}
        ]
    }
];
