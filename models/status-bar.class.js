/**
 * Represents a status bar in the game, such as a health bar.
 * Extends the `DrawableObject` class.
 */
class StatusBar extends DrawableObject {

   /** @type {number} - The x-coordinate of the status bar. */
   x = 20;
   
   /** @type {number} - The y-coordinate of the status bar. */
   y = 0;
   
   /** @type {number} - The height of the status bar. */
   height = 60;
   
   /** @type {number} - The width of the status bar. */
   width = 200;
   
   /** @type {number} - The current percentage (e.g., health) displayed by the status bar. */
   percentage = 100;

   /** @type {Array<string>} - Image paths for different health levels in the status bar. */
   Images_Health = [
      'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
   ];
   
   /**
    * Initializes a new instance of a StatusBar.
    * Loads the images for the health levels and sets the default percentage to 100.
    */
   constructor() {
      super();
      this.loadImages(this.Images_Health);
      this.setPercentage(100, this.Images_Health);
   }

   /**
    * Updates the status bar's percentage and sets the appropriate image based on the value.
    * @param {number} percentage - The current percentage to be displayed.
    * @param {Array<string>} images - An array of image paths corresponding to the percentage levels.
    */
   setPercentage(percentage, images) {
      this.percentage = percentage;
      const imageIndex = this.resolveImageIndex(this.percentage);
      const path = images[imageIndex];
  
      if(this.img !== this.imageCache[path]) {
          this.img = this.imageCache[path];
      }
   }
  
   /**
    * Resolves the index of the image in the array based on the percentage value.
    * @param {number} stat - The current percentage to determine the image index.
    * @returns {number} The index of the image corresponding to the percentage level.
    */
   resolveImageIndex(stat) {
      return Math.min(5, Math.floor(stat / 20));
   }  
}