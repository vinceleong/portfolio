import * as THREE from "three";

export const getAstronaut = () => {
  const astronautTexture = new THREE.TextureLoader().load(
    "/images/astronaut.png"
  );

  const geometry = new THREE.PlaneGeometry(5, 8);
  const material = new THREE.MeshBasicMaterial({
    transparent: true,
    map: astronautTexture,
  });
  const astronaut = new THREE.Mesh(geometry, material);

  astronaut.position.set(0, -10);

  return astronaut;
};

export const animateAstronaut = (astronaut) => {
  const axis = new THREE.Vector4(0, 0, 1, 0);
  astronaut.rotateOnAxis(axis, -0.005);
  astronaut.position.x -= 0.01;

  const { x, y } = astronaut.position;

  if (x <= -50) {
    astronaut.position.set(x + 100, y);
  }
};
