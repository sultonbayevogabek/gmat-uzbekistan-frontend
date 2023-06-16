import { Component, Input } from '@angular/core';

@Component({
   selector: 'video-player',
   templateUrl: './video-player.component.html',
   styleUrls: [ './video-player.component.scss' ]
})

export class VideoPlayerComponent {
   @Input('videoUrl') videoUrl: string;
}