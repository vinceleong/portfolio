import * as THREE from "three";

export const getStars = (starsCount) =>
  Array(starsCount)
    .fill()
    .map(() => {
      const geometry = new THREE.SphereGeometry(0.25);
      const material = new THREE.MeshBasicMaterial({
        color: "gainsboro",
      });
      const star = new THREE.Mesh(geometry, material);

      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));

      star.position.set(x, y, z);

      return star;
    });

export const animateStars = (stars) => {
  stars.forEach((star) => {
    const starMoveSpeed = -0.01;

    star.translateX(starMoveSpeed);
    star.translateY(starMoveSpeed);

    const { x, y } = star.position;

    if (x <= -50 && y <= -50) {
      star.position.set(x + 100, y + 100);
    }
  });
};
