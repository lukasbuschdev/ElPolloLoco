class StatusBar extends DrawableObject {

   x = 20;
   y = 0;
   height = 60;
   width = 200;
   percentage = 100;

   Images_Health = [
      'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
   ];
   
   constructor() {
      super();
      this.loadImages(this.Images_Health);
      this.setPercentage(100, this.Images_Health);
   }

   setPercentage(percentage, images) {
      this.percentage = percentage;
      const imageIndex = this.resolveImageIndex(this.percentage);
      const path = images[imageIndex];
  
      if(this.img !== this.imageCache[path]) {
          this.img = this.imageCache[path];
      }
  }
  
  resolveImageIndex(stat) {
      return Math.min(5, Math.floor(stat / 20));
  }  
}