/**
 * Represents a cloud in the game, inheriting from `MovableObject`.
 * Clouds move continuously to the left to create a scrolling background effect.
 */
class Cloud extends MovableObject {

  /** @type {number} - Y-coordinate position of the cloud. */
  y = 20;

  /** @type {number} - Width of the cloud image. */
  width = 500;

  /** @type {number} - Height of the cloud image. */
  height = 250;

  /**
   * Initializes a new instance of the `Cloud` class.
   * Sets a random X-coordinate for initial positioning and starts animation.
   */
  constructor() {
      super().loadImage('img/5_background/layers/4_clouds/1.png');
      this.x = Math.random() * 700;
      this.animate();
  }

  /**
   * Initiates the continuous leftward movement of the cloud to simulate scrolling.
   */
  animate() {
      this.moveLeft();
  }
}