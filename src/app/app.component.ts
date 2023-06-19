import { Component } from '@angular/core';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: [ './app.component.scss' ]
})

export class AppComponent {
   ngOnInit(): void {
      window.addEventListener('contextmenu', (e) => {
         e.preventDefault();
      });

      window.addEventListener('keydown', e => {
         if (e.key === 'F12') {
            e.preventDefault()
         }
      })
   }
}
