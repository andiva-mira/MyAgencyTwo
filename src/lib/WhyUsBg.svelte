<script>
	import { onMount } from "svelte";
	import { browser } from "$app/environment";
	import * as THREE from "three";

	let canvas;
	let animId;

	onMount(() => {
		if (!browser) return;

		const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(30, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
		camera.position.z = 9;

		// ── Shared materials ─────────────────────────────────────────
		const atomMat = new THREE.MeshBasicMaterial({
			color: new THREE.Color("#2968a3"),
			transparent: true,
			opacity: 0.35,
		});
		const bondMat = new THREE.LineBasicMaterial({
			color: new THREE.Color("#2968a3"),
			transparent: true,
			opacity: 0.2,
		});
		const atomGeo = new THREE.SphereGeometry(0.045, 8, 6);

		const disposables = [];

		// ── Helpers ──────────────────────────────────────────────────
		function bond(a, b) {
			const geo = new THREE.BufferGeometry().setFromPoints([
				new THREE.Vector3(...a),
				new THREE.Vector3(...b),
			]);
			disposables.push(geo);
			return new THREE.Line(geo, bondMat);
		}

		function atom(x, y, z) {
			const m = new THREE.Mesh(atomGeo, atomMat);
			m.position.set(x, y, z);
			return m;
		}

		// ── Molecule builder ─────────────────────────────────────────
		// Each molecule is a group of atoms + bonds
		function makeMolecule(layout) {
			// layout: array of [x,y,z] atom positions
			// bonds: connect each to next (and optionally back to first for rings)
			const g = new THREE.Group();
			layout.atoms.forEach(([x, y, z]) => g.add(atom(x, y, z)));
			layout.bonds.forEach(([a, b]) => g.add(bond(layout.atoms[a], layout.atoms[b])));
			return g;
		}

		// ── Molecule definitions ─────────────────────────────────────
		const molecules = [
			// Water-like (bent, 3 atoms)
			makeMolecule({
				atoms: [[0,0,0], [-0.28, -0.22, 0], [0.28, -0.22, 0]],
				bonds: [[0,1],[0,2]],
			}),
			// Linear (CO2-like, 3 atoms)
			makeMolecule({
				atoms: [[0,0,0], [-0.35, 0, 0], [0.35, 0, 0]],
				bonds: [[0,1],[0,2]],
			}),
			// Tetrahedral (methane-like, 5 atoms)
			makeMolecule({
				atoms: [
					[0, 0, 0],
					[ 0.28,  0.28,  0.28],
					[-0.28, -0.28,  0.28],
					[ 0.28, -0.28, -0.28],
					[-0.28,  0.28, -0.28],
				],
				bonds: [[0,1],[0,2],[0,3],[0,4]],
			}),
			// Ring (benzene-like, 6 atoms)
			makeMolecule({
				atoms: Array.from({ length: 6 }, (_, i) => {
					const a = (i / 6) * Math.PI * 2;
					return [Math.cos(a) * 0.3, Math.sin(a) * 0.3, 0];
				}),
				bonds: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]],
			}),
			// Ethane-like (2 carbons + 3 hydrogens each)
			makeMolecule({
				atoms: [
					[ 0.18, 0, 0], [-0.18, 0, 0],
					[ 0.38,  0.22,  0.15], [ 0.38, -0.22,  0.15], [ 0.38,  0,   -0.22],
					[-0.38,  0.22,  0.15], [-0.38, -0.22,  0.15], [-0.38,  0,   -0.22],
				],
				bonds: [[0,1],[0,2],[0,3],[0,4],[1,5],[1,6],[1,7]],
			}),
		];

		// ── Scatter molecules around the scene ───────────────────────
		const floaters = [
			{ mol: molecules[0], pos: [-2.8,  1.2, -1.0], spd: [0.21, 0.17, 0.13], amp: [0.4, 0.3, 0.2], rspd: [0.14, 0.09, 0.11] },
			{ mol: molecules[1], pos: [-1.2, -1.6, -0.5], spd: [0.18, 0.23, 0.15], amp: [0.3, 0.4, 0.2], rspd: [0.10, 0.13, 0.08] },
			{ mol: molecules[2], pos: [ 0.4,  1.8, -1.2], spd: [0.16, 0.19, 0.12], amp: [0.35,0.25,0.2], rspd: [0.08, 0.11, 0.07] },
			{ mol: molecules[3], pos: [-2.2, -0.4, -0.8], spd: [0.22, 0.14, 0.18], amp: [0.3, 0.35,0.2], rspd: [0.12, 0.07, 0.10] },
			{ mol: molecules[4], pos: [ 1.2, -1.4, -1.0], spd: [0.19, 0.21, 0.16], amp: [0.4, 0.3, 0.25],rspd: [0.09, 0.12, 0.09] },
		];

		//floaters.forEach(({ mol }) => scene.add(mol));

		// ── Main glass sphere ─────────────────────────────────────────
		const group = new THREE.Group();

		const glassMat = new THREE.ShaderMaterial({
			uniforms: {
				uColor:   { value: new THREE.Color("#1f4e7a") },
				uRimColor:{ value: new THREE.Color("#245b8f") },
				uRimPow:  { value: 3.2 },
				uRimStr:  { value: 0.85 },
				uAlpha:   { value: 0.14 },
			},
			vertexShader: /* glsl */`
				varying vec3 vNormal;
				varying vec3 vViewDir;
				void main() {
					vec4 worldPos = modelMatrix * vec4(position, 1.0);
					vViewDir  = normalize(cameraPosition - worldPos.xyz);
					vNormal   = normalize(normalMatrix * normal);
					gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
				}
			`,
			fragmentShader: /* glsl */`
				uniform vec3  uColor;
				uniform vec3  uRimColor;
				uniform float uRimPow;
				uniform float uRimStr;
				uniform float uAlpha;
				varying vec3 vNormal;
				varying vec3 vViewDir;
				void main() {
					float fresnel = pow(1.0 - clamp(dot(vNormal, vViewDir), 0.0, 1.0), uRimPow);
					vec3  col     = mix(uColor, uRimColor, fresnel * uRimStr);
					float alpha   = uAlpha + fresnel * 0.55;
					gl_FragColor  = vec4(col, alpha);
				}
			`,
			transparent: true,
			depthWrite: false,
			side: THREE.FrontSide,
		});

		const geoGlass = new THREE.SphereGeometry(1.3, 64, 48);
		group.add(new THREE.Mesh(geoGlass, glassMat));

		const geoWf = new THREE.SphereGeometry(1.3, 32, 24);
		const matWf = new THREE.MeshBasicMaterial({
			color: new THREE.Color("#2968a3"),
			wireframe: true,
			transparent: true,
			opacity: 0.04,
		});
		group.add(new THREE.Mesh(geoWf, matWf));

		group.position.set(2.6, 0.4, -0.5);
		scene.add(group);

		// Resize
		const onResize = () => {
			const w = canvas.offsetWidth;
			const h = canvas.offsetHeight;
			renderer.setSize(w, h);
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
		};
		window.addEventListener("resize", onResize);

		// Animate
		const clock = new THREE.Clock();
		const animate = () => {
			animId = requestAnimationFrame(animate);
			const t = clock.getElapsedTime();

			// Float each molecule
			floaters.forEach(({ mol, pos, spd, amp, rspd }, i) => {
				const o = i * 1.3; // phase offset per molecule
				mol.position.x = pos[0] + Math.sin(t * spd[0] + o) * amp[0];
				mol.position.y = pos[1] + Math.cos(t * spd[1] + o) * amp[1];
				mol.position.z = pos[2] + Math.sin(t * spd[2] + o) * amp[2];
				mol.rotation.x += rspd[0] * 0.01;
				mol.rotation.y += rspd[1] * 0.01;
				mol.rotation.z += rspd[2] * 0.01;
			});

			// Main sphere float
			group.position.x = 2.6 + Math.cos(t * 0.25) * 0.5;
			group.position.y = 0.4 + Math.sin(t * 0.18) * 0.4;
			group.rotation.x = -t * 0.11;
			group.rotation.y =  t * 0.08;

			renderer.render(scene, camera);
		};
		animate();

		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener("resize", onResize);
			renderer.dispose();
			geoGlass.dispose(); geoWf.dispose(); atomGeo.dispose();
			glassMat.dispose(); matWf.dispose(); atomMat.dispose(); bondMat.dispose();
			disposables.forEach(g => g.dispose());
		};
	});
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
</style>
