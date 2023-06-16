import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
   templateUrl: './youtube-player.component.html',
   selector: 'app-video',
})

export class YoutubePlayer implements OnInit, AfterViewInit {
   @ViewChild('youTubePlayer') youTubePlayer: ElementRef<HTMLDivElement>;

   videoHeight: number | undefined;
   videoWidth: number | undefined;

   @Input('videoID') videoID: string;

   constructor(
      private _changeDetectorRef: ChangeDetectorRef
   ) {
   }

   ngOnInit() {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
   }

   ngAfterViewInit(): void {
      this.onResize();
      window.addEventListener('resize', this.onResize.bind(this));
   }

   onResize(): void {
      this.videoWidth = Math.min(
         this.youTubePlayer.nativeElement.clientWidth,
         1200
      );

      this.videoHeight = this.videoWidth * 9 / 16;
      this._changeDetectorRef.detectChanges();
   }
}
