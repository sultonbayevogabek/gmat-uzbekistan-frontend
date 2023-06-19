import { Component, Input } from '@angular/core';

@Component({
   selector: 'video-player',
   templateUrl: './video-player.component.html'
})

export class VideoPlayerComponent {
   @Input('videoUrl') videoUrl: string;
}
