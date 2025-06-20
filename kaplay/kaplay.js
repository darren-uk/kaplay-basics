"use strict";
var kaplay = (() => {
	var yr = Object.defineProperty;
	var nu = Object.getOwnPropertyDescriptor;
	var ru = Object.getOwnPropertyNames;
	var ou = Object.prototype.hasOwnProperty;
	var su = (t, e) => {
			for (var n in e) yr(t, n, { get: e[n], enumerable: !0 });
		},
		iu = (t, e, n, r) => {
			if ((e && typeof e == "object") || typeof e == "function")
				for (let o of ru(e))
					!ou.call(t, o) &&
						o !== n &&
						yr(t, o, {
							get: () => e[o],
							enumerable: !(r = nu(e, o)) || r.enumerable,
						});
			return t;
		};
	var au = (t) => iu(yr({}, "__esModule", { value: !0 }), t);
	var Oo = (() => {
		for (var t = new Uint8Array(128), e = 0; e < 64; e++)
			t[e < 26 ? e + 65 : e < 52 ? e + 71 : e < 62 ? e - 4 : e * 4 - 205] = e;
		return (n) => {
			for (
				var r = n.length,
					o = new Uint8Array(
						(((r - (n[r - 1] == "=") - (n[r - 2] == "=")) * 3) / 4) | 0
					),
					s = 0,
					i = 0;
				s < r;

			) {
				var m = t[n.charCodeAt(s++)],
					u = t[n.charCodeAt(s++)],
					c = t[n.charCodeAt(s++)],
					p = t[n.charCodeAt(s++)];
				(o[i++] = (m << 2) | (u >> 4)),
					(o[i++] = (u << 4) | (c >> 2)),
					(o[i++] = (c << 6) | p);
			}
			return o;
		};
	})();
	var hc = {};
	su(hc, { _k: () => a, default: () => fc, kaplay: () => Qa });
	var Ao = {
		name: "kaplay",
		description:
			"KAPLAY is a JavaScript & TypeScript game library that helps you make games fast and fun!",
		version: "3001.0.16",
		license: "MIT",
		homepage: "https://kaplayjs.com/",
		bugs: { url: "https://github.com/kaplayjs/kaplay/issues" },
		funding: {
			type: "opencollective",
			url: "https://opencollective.com/kaplay",
		},
		repository: {
			type: "git",
			url: "git+https://github.com/kaplayjs/kaplay.git",
		},
		type: "module",
		main: "./dist/kaplay.cjs",
		module: "./dist/kaplay.mjs",
		types: "./dist/doc.d.ts",
		readme: "./README.md",
		exports: {
			".": {
				import: { types: "./dist/doc.d.ts", default: "./dist/kaplay.mjs" },
				require: { types: "./dist/doc.d.ts", default: "./dist/kaplay.cjs" },
			},
			"./global": "./dist/declaration/global.js",
		},
		typesVersions: { "*": { global: ["./dist/declaration/global.d.ts"] } },
		keywords: [
			"game development",
			"javascript",
			"typescript",
			"game engine",
			"2d games",
			"physics engine",
			"webgl",
			"canvas",
			"game library",
			"kaplay",
		],
		files: ["dist/", "kaplay.webp", "CHANGELOG.md"],
		scripts: {
			dev: "NODE_ENV=development node scripts/dev.js",
			"win:dev": "set NODE_ENV=development && node scripts/dev.js",
			build:
				"node scripts/generateIndex.js && node scripts/build.js && npm run doc-dts",
			check: "tsc",
			fmt: "dprint fmt",
			test: "node scripts/test.js",
			"doc-dts": "dts-bundle-generator -o dist/doc.d.ts src/index.ts",
			"test:vite": "vitest --typecheck",
			desktop: "tauri dev",
			prepare: "npm run build",
			"publish:next": "npm publish --tag next",
		},
		devDependencies: {
			"@kaplayjs/dprint-config": "^1.2.0",
			"@types/jest": "^29.5.14",
			dprint: "^0.49.1",
			"dts-bundle-generator": "^9.5.1",
			ejs: "^3.1.10",
			esbuild: "^0.25.2",
			express: "^5.1.0",
			puppeteer: "^22.15.0",
			"tar-fs": "3.0.8",
			typescript: "5.6.3",
			vite: "5.4.16",
			vitest: "^3.1.1",
			"vitest-environment-puppeteer": "^11.0.3",
			"vitest-puppeteer": "^11.0.3",
		},
		engines: { node: ">=20.0.0" },
		packageManager:
			"pnpm@9.9.0+sha512.60c18acd138bff695d339be6ad13f7e936eea6745660d4cc4a776d5247c540d0edee1a563695c183a66eb917ef88f2b4feb1fc25f32a7adcadc7aaf3438e99c1",
	};
	function Te(t, e, n) {
		return e > n ? Te(t, n, e) : Math.min(Math.max(t, e), n);
	}
	var j = class t {
		r = 255;
		g = 255;
		b = 255;
		constructor(e, n, r) {
			(this.r = Te(e, 0, 255)),
				(this.g = Te(n, 0, 255)),
				(this.b = Te(r, 0, 255));
		}
		static fromArray(e) {
			return new t(e[0], e[1], e[2]);
		}
		static fromHex(e) {
			if (typeof e == "number")
				return new t((e >> 16) & 255, (e >> 8) & 255, (e >> 0) & 255);
			if (typeof e == "string") {
				let n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
				if (!n) throw new Error("Invalid hex color format");
				return new t(
					parseInt(n[1], 16),
					parseInt(n[2], 16),
					parseInt(n[3], 16)
				);
			} else throw new Error("Invalid hex color format");
		}
		static fromHSL(e, n, r) {
			if (n == 0) return new t(255 * r, 255 * r, 255 * r);
			let o = (p, b, l) => (
					l < 0 && (l += 1),
					l > 1 && (l -= 1),
					l < 1 / 6
						? p + (b - p) * 6 * l
						: l < 1 / 2
						? b
						: l < 2 / 3
						? p + (b - p) * (2 / 3 - l) * 6
						: p
				),
				s = r < 0.5 ? r * (1 + n) : r + n - r * n,
				i = 2 * r - s,
				m = o(i, s, e + 1 / 3),
				u = o(i, s, e),
				c = o(i, s, e - 1 / 3);
			return new t(
				Math.round(m * 255),
				Math.round(u * 255),
				Math.round(c * 255)
			);
		}
		static RED = new t(255, 0, 0);
		static GREEN = new t(0, 255, 0);
		static BLUE = new t(0, 0, 255);
		static YELLOW = new t(255, 255, 0);
		static MAGENTA = new t(255, 0, 255);
		static CYAN = new t(0, 255, 255);
		static WHITE = new t(255, 255, 255);
		static BLACK = new t(0, 0, 0);
		clone() {
			return new t(this.r, this.g, this.b);
		}
		lighten(e) {
			return new t(this.r + e, this.g + e, this.b + e);
		}
		darken(e) {
			return this.lighten(-e);
		}
		invert() {
			return new t(255 - this.r, 255 - this.g, 255 - this.b);
		}
		mult(e) {
			return new t(
				(this.r * e.r) / 255,
				(this.g * e.g) / 255,
				(this.b * e.b) / 255
			);
		}
		lerp(e, n) {
			return new t(de(this.r, e.r, n), de(this.g, e.g, n), de(this.b, e.b, n));
		}
		toHSL() {
			let e = this.r / 255,
				n = this.g / 255,
				r = this.b / 255,
				o = Math.max(e, n, r),
				s = Math.min(e, n, r),
				i = (o + s) / 2,
				m = i,
				u = i;
			if (o == s) i = m = 0;
			else {
				let c = o - s;
				switch (((m = u > 0.5 ? c / (2 - o - s) : c / (o + s)), o)) {
					case e:
						i = (n - r) / c + (n < r ? 6 : 0);
						break;
					case n:
						i = (r - e) / c + 2;
						break;
					case r:
						i = (e - n) / c + 4;
						break;
				}
				i /= 6;
			}
			return [i, m, u];
		}
		eq(e) {
			return this.r === e.r && this.g === e.g && this.b === e.b;
		}
		toString() {
			return `rgb(${this.r}, ${this.g}, ${this.b})`;
		}
		toHex() {
			return (
				"#" +
				((1 << 24) + (this.r << 16) + (this.g << 8) + this.b)
					.toString(16)
					.slice(1)
			);
		}
		toArray() {
			return [this.r, this.g, this.b];
		}
	};
	function I(...t) {
		if (t.length === 0) return new j(255, 255, 255);
		if (t.length === 1) {
			if (t[0] instanceof j) return t[0].clone();
			if (typeof t[0] == "string") return j.fromHex(t[0]);
			if (Array.isArray(t[0]) && t[0].length === 3) return j.fromArray(t[0]);
		} else if (t.length === 2) {
			if (t[0] instanceof j) return t[0].clone();
		} else if (t.length === 3 || t.length === 4) return new j(t[0], t[1], t[2]);
		throw new Error("Invalid color arguments");
	}
	var So = (t, e, n) => j.fromHSL(t, e, n);
	function ae(t) {
		return (t * Math.PI) / 180;
	}
	function ct(t) {
		return (t * 180) / Math.PI;
	}
	function de(t, e, n) {
		if (typeof t == "number" && typeof e == "number") return t + (e - t) * n;
		if (t instanceof E && e instanceof E) return t.lerp(e, n);
		if (t instanceof j && e instanceof j) return t.lerp(e, n);
		throw new Error(
			`Bad value for lerp(): ${t}, ${e}. Only number, Vec2 and Color is supported.`
		);
	}
	function Se(t, e, n, r, o) {
		return r + ((t - e) / (n - e)) * (o - r);
	}
	function Po(t, e, n, r, o) {
		return Te(Se(t, e, n, r, o), r, o);
	}
	var E = class t {
		x = 0;
		y = 0;
		constructor(e = 0, n = e) {
			(this.x = e), (this.y = n);
		}
		static fromAngle(e) {
			let n = ae(e);
			return new t(Math.cos(n), Math.sin(n));
		}
		static fromArray(e) {
			return new t(e[0], e[1]);
		}
		static ZERO = new t(0, 0);
		static ONE = new t(1, 1);
		static LEFT = new t(-1, 0);
		static RIGHT = new t(1, 0);
		static UP = new t(0, -1);
		static DOWN = new t(0, 1);
		clone() {
			return new t(this.x, this.y);
		}
		add(...e) {
			let n = v(...e);
			return new t(this.x + n.x, this.y + n.y);
		}
		sub(...e) {
			let n = v(...e);
			return new t(this.x - n.x, this.y - n.y);
		}
		scale(...e) {
			let n = v(...e);
			return new t(this.x * n.x, this.y * n.y);
		}
		dist(...e) {
			let n = v(...e);
			return this.sub(n).len();
		}
		sdist(...e) {
			let n = v(...e);
			return this.sub(n).slen();
		}
		static sdist(e, n) {
			let r = e.x - n.x,
				o = e.y - n.y;
			return r * r + o * o;
		}
		len() {
			return Math.sqrt(this.dot(this));
		}
		slen() {
			return this.dot(this);
		}
		unit() {
			let e = this.len();
			return e === 0 ? new t(0) : this.scale(1 / e);
		}
		normal() {
			return new t(this.y, -this.x);
		}
		reflect(e) {
			return this.sub(e.scale(2 * this.dot(e)));
		}
		project(e) {
			return e.scale(e.dot(this) / e.len());
		}
		reject(e) {
			return this.sub(this.project(e));
		}
		dot(e) {
			return this.x * e.x + this.y * e.y;
		}
		static dot(e, n) {
			return e.x * n.x + e.y * n.y;
		}
		cross(e) {
			return this.x * e.y - this.y * e.x;
		}
		static cross(e, n) {
			return e.x * n.y - e.y * n.x;
		}
		angle(...e) {
			let n = v(...e);
			return ct(Math.atan2(this.y - n.y, this.x - n.x));
		}
		angleBetween(...e) {
			let n = v(...e);
			return ct(Math.atan2(this.cross(n), this.dot(n)));
		}
		lerp(e, n) {
			return new t(de(this.x, e.x, n), de(this.y, e.y, n));
		}
		slerp(e, n) {
			let r = this.dot(e),
				o = this.cross(e),
				s = Math.atan2(o, r);
			return this.scale(Math.sin((1 - n) * s))
				.add(e.scale(Math.sin(n * s)))
				.scale(1 / o);
		}
		isZero() {
			return this.x === 0 && this.y === 0;
		}
		toFixed(e) {
			return new t(Number(this.x.toFixed(e)), Number(this.y.toFixed(e)));
		}
		transform(e) {
			return e.multVec2(this);
		}
		eq(e) {
			return this.x === e.x && this.y === e.y;
		}
		bbox() {
			return new W(this, 0, 0);
		}
		toString() {
			return `vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
		}
		toArray() {
			return [this.x, this.y];
		}
	};
	function v(...t) {
		if (t.length === 1) {
			if (t[0] instanceof E) return new E(t[0].x, t[0].y);
			if (Array.isArray(t[0]) && t[0].length === 2) return new E(...t[0]);
		}
		return new E(...t);
	}
	var q = class t {
		x = 0;
		y = 0;
		w = 1;
		h = 1;
		constructor(e, n, r, o) {
			(this.x = e), (this.y = n), (this.w = r), (this.h = o);
		}
		scale(e) {
			return new t(
				this.x + this.w * e.x,
				this.y + this.h * e.y,
				this.w * e.w,
				this.h * e.h
			);
		}
		pos() {
			return new E(this.x, this.y);
		}
		clone() {
			return new t(this.x, this.y, this.w, this.h);
		}
		eq(e) {
			return (
				this.x === e.x && this.y === e.y && this.w === e.w && this.h === e.h
			);
		}
		toString() {
			return `quad(${this.x}, ${this.y}, ${this.w}, ${this.h})`;
		}
	};
	function le(t, e, n, r) {
		return new q(t, e, n, r);
	}
	var Rt = class t {
		a;
		b;
		c;
		d;
		constructor(e, n, r, o) {
			(this.a = e), (this.b = n), (this.c = r), (this.d = o);
		}
		mul(e) {
			return new t(
				this.a * e.a + this.b * e.c,
				this.a * e.b + this.b * e.d,
				this.c * e.a + this.d * e.c,
				this.c * e.b + this.d * e.d
			);
		}
		transform(e) {
			return v(this.a * e.x + this.b * e.y, this.c * e.x + this.d * e.y);
		}
		get inverse() {
			let e = this.det;
			return new t(this.d / e, -this.b / e, -this.c / e, this.a / e);
		}
		get transpose() {
			return new t(this.a, this.c, this.b, this.d);
		}
		get eigenvalues() {
			let e = this.trace / 2,
				n = this.det,
				r = e + Math.sqrt(e * e - n),
				o = e - Math.sqrt(e * e - n);
			return [r, o];
		}
		eigenvectors(e, n) {
			return this.c != 0
				? [
						[e - this.d, this.c],
						[n - this.d, this.c],
				  ]
				: this.b != 0
				? [
						[this.b, e - this.a],
						[this.b, n - this.a],
				  ]
				: Math.abs(this.transform(v(1, 0)).x - e) < Number.EPSILON
				? [
						[1, 0],
						[0, 1],
				  ]
				: [
						[0, 1],
						[1, 0],
				  ];
		}
		get det() {
			return this.a * this.d - this.b * this.c;
		}
		get trace() {
			return this.a + this.d;
		}
		static rotation(e) {
			let n = Math.cos(e),
				r = Math.sin(e);
			return new t(n, r, -r, n);
		}
		static scale(e, n) {
			return new t(e, 0, 0, n);
		}
	};
	var gt = class t {
			m11;
			m12;
			m13;
			m21;
			m22;
			m23;
			m31;
			m32;
			m33;
			constructor(e, n, r, o, s, i, m, u, c) {
				(this.m11 = e),
					(this.m12 = n),
					(this.m13 = r),
					(this.m21 = o),
					(this.m22 = s),
					(this.m23 = i),
					(this.m31 = m),
					(this.m32 = u),
					(this.m33 = c);
			}
			static fromMat2(e) {
				return new t(e.a, e.b, 0, e.c, e.d, 0, 0, 0, 1);
			}
			toMat2() {
				return new Rt(this.m11, this.m12, this.m21, this.m22);
			}
			mul(e) {
				return new t(
					this.m11 * e.m11 + this.m12 * e.m21 + this.m13 * e.m31,
					this.m11 * e.m12 + this.m12 * e.m22 + this.m13 * e.m32,
					this.m11 * e.m13 + this.m12 * e.m23 + this.m13 * e.m33,
					this.m21 * e.m11 + this.m22 * e.m21 + this.m23 * e.m31,
					this.m21 * e.m12 + this.m22 * e.m22 + this.m23 * e.m32,
					this.m21 * e.m13 + this.m22 * e.m23 + this.m23 * e.m33,
					this.m31 * e.m11 + this.m32 * e.m21 + this.m33 * e.m31,
					this.m31 * e.m12 + this.m32 * e.m22 + this.m33 * e.m32,
					this.m31 * e.m13 + this.m32 * e.m23 + this.m33 * e.m33
				);
			}
			get det() {
				return (
					this.m11 * this.m22 * this.m33 +
					this.m12 * this.m23 * this.m31 +
					this.m13 * this.m21 * this.m32 -
					this.m13 * this.m22 * this.m31 -
					this.m12 * this.m21 * this.m33 -
					this.m11 * this.m23 * this.m32
				);
			}
			rotate(e) {
				let n = Math.cos(e),
					r = Math.sin(e),
					o = this.m11,
					s = this.m12;
				return (
					(this.m11 = n * this.m11 + r * this.m21),
					(this.m12 = n * this.m12 + r * this.m22),
					(this.m21 = n * this.m21 - r * o),
					(this.m22 = n * this.m22 - r * s),
					this
				);
			}
			scale(e, n) {
				return (
					(this.m11 *= e),
					(this.m12 *= e),
					(this.m21 *= n),
					(this.m22 *= n),
					this
				);
			}
			get inverse() {
				let e = this.det;
				return new t(
					(this.m22 * this.m33 - this.m23 * this.m32) / e,
					(this.m13 * this.m32 - this.m12 * this.m33) / e,
					(this.m12 * this.m23 - this.m13 * this.m22) / e,
					(this.m23 * this.m31 - this.m21 * this.m33) / e,
					(this.m11 * this.m33 - this.m13 * this.m31) / e,
					(this.m13 * this.m21 - this.m11 * this.m23) / e,
					(this.m21 * this.m32 - this.m22 * this.m31) / e,
					(this.m12 * this.m31 - this.m11 * this.m32) / e,
					(this.m11 * this.m22 - this.m12 * this.m21) / e
				);
			}
			get transpose() {
				return new t(
					this.m11,
					this.m21,
					this.m31,
					this.m12,
					this.m22,
					this.m32,
					this.m13,
					this.m23,
					this.m33
				);
			}
		},
		fe = class t {
			m = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
			constructor(e) {
				e && (this.m = e);
			}
			static translate(e) {
				return new t([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, e.x, e.y, 0, 1]);
			}
			static scale(e) {
				return new t([e.x, 0, 0, 0, 0, e.y, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
			}
			static rotateX(e) {
				e = ae(-e);
				let n = Math.cos(e),
					r = Math.sin(e);
				return new t([1, 0, 0, 0, 0, n, -r, 0, 0, r, n, 0, 0, 0, 0, 1]);
			}
			static rotateY(e) {
				e = ae(-e);
				let n = Math.cos(e),
					r = Math.sin(e);
				return new t([n, 0, r, 0, 0, 1, 0, 0, -r, 0, n, 0, 0, 0, 0, 1]);
			}
			static rotateZ(e) {
				e = ae(-e);
				let n = Math.cos(e),
					r = Math.sin(e);
				return new t([n, -r, 0, 0, r, n, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
			}
			translate(e) {
				return (
					(this.m[12] += this.m[0] * e.x + this.m[4] * e.y),
					(this.m[13] += this.m[1] * e.x + this.m[5] * e.y),
					(this.m[14] += this.m[2] * e.x + this.m[6] * e.y),
					(this.m[15] += this.m[3] * e.x + this.m[7] * e.y),
					this
				);
			}
			scale(e) {
				return (
					(this.m[0] *= e.x),
					(this.m[4] *= e.y),
					(this.m[1] *= e.x),
					(this.m[5] *= e.y),
					(this.m[2] *= e.x),
					(this.m[6] *= e.y),
					(this.m[3] *= e.x),
					(this.m[7] *= e.y),
					this
				);
			}
			rotate(e) {
				e = ae(-e);
				let n = Math.cos(e),
					r = Math.sin(e),
					o = this.m[0],
					s = this.m[1],
					i = this.m[4],
					m = this.m[5];
				return (
					(this.m[0] = o * n + s * r),
					(this.m[1] = -o * r + s * n),
					(this.m[4] = i * n + m * r),
					(this.m[5] = -i * r + m * n),
					this
				);
			}
			mult(e) {
				let n = [];
				for (let r = 0; r < 4; r++)
					for (let o = 0; o < 4; o++)
						n[r * 4 + o] =
							this.m[0 * 4 + o] * e.m[r * 4 + 0] +
							this.m[1 * 4 + o] * e.m[r * 4 + 1] +
							this.m[2 * 4 + o] * e.m[r * 4 + 2] +
							this.m[3 * 4 + o] * e.m[r * 4 + 3];
				return new t(n);
			}
			multVec2(e) {
				return new E(
					e.x * this.m[0] + e.y * this.m[4] + this.m[12],
					e.x * this.m[1] + e.y * this.m[5] + this.m[13]
				);
			}
			getTranslation() {
				return new E(this.m[12], this.m[13]);
			}
			getScale() {
				if (this.m[0] != 0 || this.m[1] != 0) {
					let e = this.m[0] * this.m[5] - this.m[1] * this.m[4],
						n = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
					return new E(n, e / n);
				} else if (this.m[4] != 0 || this.m[5] != 0) {
					let e = this.m[0] * this.m[5] - this.m[1] * this.m[4],
						n = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
					return new E(e / n, n);
				} else return new E(0, 0);
			}
			getRotation() {
				if (this.m[0] != 0 || this.m[1] != 0) {
					let e = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
					return ct(
						this.m[1] > 0 ? Math.acos(this.m[0] / e) : -Math.acos(this.m[0] / e)
					);
				} else if (this.m[4] != 0 || this.m[5] != 0) {
					let e = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
					return ct(
						Math.PI / 2 -
							(this.m[5] > 0
								? Math.acos(-this.m[4] / e)
								: -Math.acos(this.m[4] / e))
					);
				} else return 0;
			}
			getSkew() {
				if (this.m[0] != 0 || this.m[1] != 0) {
					let e = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
					return new E(
						Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (e * e),
						0
					);
				} else if (this.m[4] != 0 || this.m[5] != 0) {
					let e = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
					return new E(
						0,
						Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (e * e)
					);
				} else return new E(0, 0);
			}
			invert() {
				let e = [],
					n = this.m[10] * this.m[15] - this.m[14] * this.m[11],
					r = this.m[9] * this.m[15] - this.m[13] * this.m[11],
					o = this.m[9] * this.m[14] - this.m[13] * this.m[10],
					s = this.m[8] * this.m[15] - this.m[12] * this.m[11],
					i = this.m[8] * this.m[14] - this.m[12] * this.m[10],
					m = this.m[8] * this.m[13] - this.m[12] * this.m[9],
					u = this.m[6] * this.m[15] - this.m[14] * this.m[7],
					c = this.m[5] * this.m[15] - this.m[13] * this.m[7],
					p = this.m[5] * this.m[14] - this.m[13] * this.m[6],
					b = this.m[4] * this.m[15] - this.m[12] * this.m[7],
					l = this.m[4] * this.m[14] - this.m[12] * this.m[6],
					h = this.m[5] * this.m[15] - this.m[13] * this.m[7],
					d = this.m[4] * this.m[13] - this.m[12] * this.m[5],
					C = this.m[6] * this.m[11] - this.m[10] * this.m[7],
					g = this.m[5] * this.m[11] - this.m[9] * this.m[7],
					y = this.m[5] * this.m[10] - this.m[9] * this.m[6],
					O = this.m[4] * this.m[11] - this.m[8] * this.m[7],
					A = this.m[4] * this.m[10] - this.m[8] * this.m[6],
					R = this.m[4] * this.m[9] - this.m[8] * this.m[5];
				(e[0] = this.m[5] * n - this.m[6] * r + this.m[7] * o),
					(e[4] = -(this.m[4] * n - this.m[6] * s + this.m[7] * i)),
					(e[8] = this.m[4] * r - this.m[5] * s + this.m[7] * m),
					(e[12] = -(this.m[4] * o - this.m[5] * i + this.m[6] * m)),
					(e[1] = -(this.m[1] * n - this.m[2] * r + this.m[3] * o)),
					(e[5] = this.m[0] * n - this.m[2] * s + this.m[3] * i),
					(e[9] = -(this.m[0] * r - this.m[1] * s + this.m[3] * m)),
					(e[13] = this.m[0] * o - this.m[1] * i + this.m[2] * m),
					(e[2] = this.m[1] * u - this.m[2] * c + this.m[3] * p),
					(e[6] = -(this.m[0] * u - this.m[2] * b + this.m[3] * l)),
					(e[10] = this.m[0] * h - this.m[1] * b + this.m[3] * d),
					(e[14] = -(this.m[0] * p - this.m[1] * l + this.m[2] * d)),
					(e[3] = -(this.m[1] * C - this.m[2] * g + this.m[3] * y)),
					(e[7] = this.m[0] * C - this.m[2] * O + this.m[3] * A),
					(e[11] = -(this.m[0] * g - this.m[1] * O + this.m[3] * R)),
					(e[15] = this.m[0] * y - this.m[1] * A + this.m[2] * R);
				let V =
					this.m[0] * e[0] +
					this.m[1] * e[4] +
					this.m[2] * e[8] +
					this.m[3] * e[12];
				for (let x = 0; x < 4; x++)
					for (let w = 0; w < 4; w++) e[x * 4 + w] *= 1 / V;
				return new t(e);
			}
			clone() {
				return new t([...this.m]);
			}
			toString() {
				return this.m.toString();
			}
		};
	function On(t, e, n, r = (o) => -Math.cos(o)) {
		return t + ((r(n) + 1) / 2) * (e - t);
	}
	var cu = 1103515245,
		lu = 12345,
		Vo = 2147483648,
		$t = class {
			seed;
			constructor(e) {
				this.seed = e;
			}
			gen() {
				return (this.seed = (cu * this.seed + lu) % Vo), this.seed / Vo;
			}
			genNumber(e, n) {
				return e + this.gen() * (n - e);
			}
			genVec2(e, n) {
				return new E(this.genNumber(e.x, n.x), this.genNumber(e.y, n.y));
			}
			genColor(e, n) {
				return new j(
					this.genNumber(e.r, n.r),
					this.genNumber(e.g, n.g),
					this.genNumber(e.b, n.b)
				);
			}
			genAny(...e) {
				if (e.length === 0) return this.gen();
				if (e.length === 1) {
					if (typeof e[0] == "number") return this.genNumber(0, e[0]);
					if (e[0] instanceof E) return this.genVec2(v(0, 0), e[0]);
					if (e[0] instanceof j) return this.genColor(I(0, 0, 0), e[0]);
				} else if (e.length === 2) {
					if (typeof e[0] == "number" && typeof e[1] == "number")
						return this.genNumber(e[0], e[1]);
					if (e[0] instanceof E && e[1] instanceof E)
						return this.genVec2(e[0], e[1]);
					if (e[0] instanceof j && e[1] instanceof j)
						return this.genColor(e[0], e[1]);
				}
				throw new Error("More than 2 arguments not supported");
			}
		},
		wr = new $t(Date.now());
	function Go(t) {
		return t != null && (wr.seed = t), wr.seed;
	}
	function he(...t) {
		return wr.genAny(...t);
	}
	function Cr(...t) {
		return Math.floor(he(...(t.length > 0 ? t : [2])));
	}
	function Mo(t) {
		return he() <= t;
	}
	function Er(t) {
		for (let e = t.length - 1; e > 0; e--) {
			let n = Math.floor(Math.random() * (e + 1));
			[t[e], t[n]] = [t[n], t[e]];
		}
		return t;
	}
	function Ro(t, e) {
		return t.length <= e ? t.slice() : Er(t.slice()).slice(0, e);
	}
	function Do(t) {
		return t[Cr(t.length)];
	}
	function Tr(t, e) {
		return (
			t.pos.x + t.width > e.pos.x &&
			t.pos.x < e.pos.x + e.width &&
			t.pos.y + t.height > e.pos.y &&
			t.pos.y < e.pos.y + e.height
		);
	}
	function mu(t, e) {
		if (
			(t.p1.x === t.p2.x && t.p1.y === t.p2.y) ||
			(e.p1.x === e.p2.x && e.p1.y === e.p2.y)
		)
			return null;
		let n =
			(e.p2.y - e.p1.y) * (t.p2.x - t.p1.x) -
			(e.p2.x - e.p1.x) * (t.p2.y - t.p1.y);
		if (n === 0) return null;
		let r =
				((e.p2.x - e.p1.x) * (t.p1.y - e.p1.y) -
					(e.p2.y - e.p1.y) * (t.p1.x - e.p1.x)) /
				n,
			o =
				((t.p2.x - t.p1.x) * (t.p1.y - e.p1.y) -
					(t.p2.y - t.p1.y) * (t.p1.x - e.p1.x)) /
				n;
		return r < 0 || r > 1 || o < 0 || o > 1 ? null : r;
	}
	function An(t, e) {
		let n = mu(t, e);
		return n
			? v(t.p1.x + n * (t.p2.x - t.p1.x), t.p1.y + n * (t.p2.y - t.p1.y))
			: null;
	}
	function Sn(t, e) {
		let n = e.p2.sub(e.p1),
			r = Number.NEGATIVE_INFINITY,
			o = Number.POSITIVE_INFINITY;
		if (n.x != 0) {
			let s = (t.pos.x - e.p1.x) / n.x,
				i = (t.pos.x + t.width - e.p1.x) / n.x;
			(r = Math.max(r, Math.min(s, i))), (o = Math.min(o, Math.max(s, i)));
		}
		if (n.y != 0) {
			let s = (t.pos.y - e.p1.y) / n.y,
				i = (t.pos.y + t.height - e.p1.y) / n.y;
			(r = Math.max(r, Math.min(s, i))), (o = Math.min(o, Math.max(s, i)));
		}
		return o >= r && o >= 0 && r <= 1;
	}
	function Dt(t, e) {
		return (
			e.x > t.pos.x &&
			e.x < t.pos.x + t.width &&
			e.y > t.pos.y &&
			e.y < t.pos.y + t.height
		);
	}
	function Bo(t, e) {
		let n = Math.max(t.pos.x, Math.min(e.center.x, t.pos.x + t.width)),
			r = Math.max(t.pos.y, Math.min(e.center.y, t.pos.y + t.height));
		return v(n, r).sdist(e.center) <= e.radius * e.radius;
	}
	function Fo(t, e) {
		return Lo(e, new be(t.points()));
	}
	function Vn(t, e) {
		let n = e.sub(t.p1),
			r = t.p2.sub(t.p1);
		if (Math.abs(n.cross(r)) > Number.EPSILON) return !1;
		let o = n.dot(r) / r.dot(r);
		return o >= 0 && o <= 1;
	}
	function Bt(t, e) {
		let n = t.p2.sub(t.p1),
			r = n.dot(n),
			o = t.p1.sub(e.center),
			s = 2 * n.dot(o),
			i = o.dot(o) - e.radius * e.radius,
			m = s * s - 4 * r * i;
		if (r <= Number.EPSILON || m < 0) return !1;
		if (m == 0) {
			let u = -s / (2 * r);
			if (u >= 0 && u <= 1) return !0;
		} else {
			let u = (-s + Math.sqrt(m)) / (2 * r),
				c = (-s - Math.sqrt(m)) / (2 * r);
			if ((u >= 0 && u <= 1) || (c >= 0 && c <= 1)) return !0;
		}
		return Pn(e, t.p1);
	}
	function Or(t, e) {
		if (Ze(e, t.p1) || Ze(e, t.p2)) return !0;
		for (let n = 0; n < e.pts.length; n++) {
			let r = e.pts[n],
				o = e.pts[(n + 1) % e.pts.length];
			if (An(t, new Oe(r, o))) return !0;
		}
		return !1;
	}
	function Pn(t, e) {
		return t.center.sdist(e) < t.radius * t.radius;
	}
	function pu(t, e) {
		return (
			t.center.sdist(e.center) < (t.radius + e.radius) * (t.radius + e.radius)
		);
	}
	function Xt(t, e) {
		let n = e.pts[e.pts.length - 1];
		for (let r of e.pts) {
			if (Bt(new Oe(n, r), t)) return !0;
			n = r;
		}
		return Pn(t, e.pts[0]) ? !0 : Ze(e, t.center);
	}
	function Lo(t, e) {
		for (let n = 0; n < t.pts.length; n++)
			if (Or(new Oe(t.pts[n], t.pts[(n + 1) % t.pts.length]), e)) return !0;
		return !!(t.pts.some((n) => Ze(e, n)) || e.pts.some((n) => Ze(t, n)));
	}
	function Ze(t, e) {
		let n = !1,
			r = t.pts;
		for (let o = 0, s = r.length - 1; o < r.length; s = o++)
			r[o].y > e.y != r[s].y > e.y &&
				e.x <
					((r[s].x - r[o].x) * (e.y - r[o].y)) / (r[s].y - r[o].y) + r[o].x &&
				(n = !n);
		return n;
	}
	function Ar(t, e) {
		e = e.sub(t.center);
		let n = ae(t.angle),
			r = Math.cos(n),
			o = Math.sin(n),
			s = e.x * r + e.y * o,
			i = -e.x * o + e.y * r;
		return (
			(s * s) / (t.radiusX * t.radiusX) + (i * i) / (t.radiusY * t.radiusY) < 1
		);
	}
	function En(t, e) {
		let n = e.center.sub(t.center),
			r = ae(t.angle),
			o = Math.cos(r),
			s = Math.sin(r),
			i = n.x * o + n.y * s,
			m = -n.x * s + n.y * o;
		return Ar(
			new Ke(v(), t.radiusX + e.radius, t.radiusY + e.radius, 0),
			v(i, m)
		);
	}
	function jo(t, e) {
		let n = t.toMat2().inverse;
		return (
			(e = new Oe(
				n.transform(e.p1.sub(t.center)),
				n.transform(e.p2.sub(t.center))
			)),
			Bt(e, new we(v(), 1))
		);
	}
	function du(t, e) {
		if (t.radiusX === t.radiusY) return En(e, new we(t.center, t.radiusX));
		if (e.radiusX === e.radiusY) return En(t, new we(e.center, e.radiusX));
		let n = new gt(
				1 / t.radiusX ** 2,
				0,
				0,
				0,
				1 / t.radiusY ** 2,
				0,
				0,
				0,
				-1
			),
			r = new gt(1 / e.radiusX ** 2, 0, 0, 0, 1 / e.radiusY ** 2, 0, 0, 0, -1),
			o = t.center.x,
			s = t.center.y,
			i = e.center.x,
			m = e.center.y,
			u = ae(t.angle),
			c = ae(e.angle),
			p = new gt(
				Math.cos(u),
				-Math.sin(u),
				o,
				Math.sin(u),
				Math.cos(u),
				s,
				0,
				0,
				1
			),
			b = new gt(
				Math.cos(c),
				-Math.sin(c),
				i,
				Math.sin(c),
				Math.cos(c),
				m,
				0,
				0,
				1
			),
			l = p.inverse,
			h = b.inverse,
			d = l.transpose.mul(n).mul(l),
			C = h.transpose.mul(r).mul(h),
			g = d.m11,
			y = d.m12,
			O = d.m13,
			A = d.m21,
			R = d.m22,
			V = d.m23,
			x = d.m31,
			w = d.m32,
			S = d.m33,
			G = C.m11,
			M = C.m12,
			D = C.m13,
			L = C.m21,
			U = C.m22,
			H = C.m23,
			Y = C.m31,
			_ = C.m32,
			K = C.m33,
			J = g * R * S - g * V * w - y * A * S + y * V * x + O * A * w - O * R * x,
			$ =
				(g * R * K -
					g * V * _ -
					g * w * H +
					g * S * U -
					y * A * K +
					y * V * Y +
					y * x * H -
					y * S * L +
					O * A * _ -
					O * R * Y -
					O * x * U +
					O * w * L +
					A * w * D -
					A * S * M -
					R * x * D +
					R * S * G +
					V * x * M -
					V * w * G) /
				J,
			Z =
				(g * U * K -
					g * H * _ -
					y * L * K +
					y * H * Y +
					O * L * _ -
					O * U * Y -
					A * M * K +
					A * D * _ +
					R * G * K -
					R * D * Y -
					V * G * _ +
					V * M * Y +
					x * M * H -
					x * D * U -
					w * G * H +
					w * D * L +
					S * G * U -
					S * M * L) /
				J,
			Ee =
				(G * U * K -
					G * H * _ -
					M * L * K +
					M * H * Y +
					D * L * _ -
					D * U * Y) /
				J;
		if ($ >= 0) {
			let k = -3 * Z + $ ** 2,
				ht = 3 * $ * Ee + Z * $ ** 2 - 4 * Z ** 2,
				Pt =
					-27 * Ee ** 2 +
					18 * Ee * $ * Z +
					$ ** 2 * Z ** 2 -
					4 * $ ** 3 * Ee -
					4 * Z ** 3;
			return !(k > 0 && ht < 0 && Pt > 0);
		} else {
			let k = -3 * Z + $ ** 2,
				ht =
					-27 * Ee ** 2 +
					18 * Ee * $ * Z +
					$ ** 2 * Z ** 2 -
					4 * $ ** 3 * Ee -
					4 * Z ** 3;
			return !(k > 0 && ht > 0);
		}
	}
	function Io(t, e) {
		return Sr(t, new be(e.points()));
	}
	function Sr(t, e) {
		let n = t.toMat2().inverse;
		return (
			(e = new be(e.pts.map((r) => n.transform(r.sub(t.center))))),
			Xt(new we(v(), 1), e)
		);
	}
	function fu(t, e) {
		return t.x === e.x && t.y === e.y;
	}
	function hu(t, e) {
		return e instanceof E
			? fu(e, t.pt)
			: e instanceof we
			? Pn(e, t.pt)
			: e instanceof Oe
			? Vn(e, t.pt)
			: e instanceof W
			? Dt(e, t.pt)
			: e instanceof be
			? Ze(e, t.pt)
			: e instanceof Ke
			? Ar(e, t.pt)
			: !1;
	}
	function gu(t, e) {
		return e instanceof E
			? Vn(t, e)
			: e instanceof we
			? Bt(t, e)
			: e instanceof Oe
			? An(t, e) != null
			: e instanceof W
			? Sn(e, t)
			: e instanceof be
			? Or(t, e)
			: e instanceof Ke
			? jo(e, t)
			: !1;
	}
	function bu(t, e) {
		return e instanceof E
			? Pn(t, e)
			: e instanceof we
			? pu(t, e)
			: e instanceof Oe
			? Bt(e, t)
			: e instanceof W
			? Bo(e, t)
			: e instanceof be
			? Xt(t, e)
			: e instanceof Ke
			? En(e, t)
			: !1;
	}
	function yu(t, e) {
		return e instanceof E
			? Dt(t, e)
			: e instanceof we
			? Bo(t, e)
			: e instanceof Oe
			? Sn(t, e)
			: e instanceof W
			? Tr(t, e)
			: e instanceof be
			? Fo(t, e)
			: e instanceof Ke
			? Io(e, t)
			: !1;
	}
	function xu(t, e) {
		return e instanceof E
			? Ze(t, e)
			: e instanceof we
			? Xt(e, t)
			: e instanceof Oe
			? Or(e, t)
			: e instanceof W
			? Fo(e, t)
			: e instanceof be
			? Lo(e, t)
			: e instanceof Ke
			? Sr(e, t)
			: !1;
	}
	function vu(t, e) {
		return e instanceof E
			? Ar(t, e)
			: e instanceof we
			? En(t, e)
			: e instanceof Oe
			? jo(t, e)
			: e instanceof W
			? Io(t, e)
			: e instanceof be
			? Sr(t, e)
			: e instanceof Ke
			? du(e, t)
			: !1;
	}
	function Ko(t, e, n) {
		let r = t,
			o = n.p1,
			s = n.p2,
			i = e,
			m = s.sub(o),
			u = i.cross(m);
		if (Math.abs(u) < Number.EPSILON) return null;
		let c = o.sub(r),
			p = c.cross(m) / u;
		if (p <= 0 || p >= 1) return null;
		let b = c.cross(i) / u;
		if (b <= 0 || b >= 1) return null;
		let l = m.normal().unit();
		return (
			e.dot(l) > 0 && ((l.x *= -1), (l.y *= -1)),
			{ point: r.add(i.scale(p)), normal: l, fraction: p }
		);
	}
	function wu(t, e, n) {
		let r = Number.NEGATIVE_INFINITY,
			o = Number.POSITIVE_INFINITY,
			s;
		if (t.x != 0) {
			let i = (n.pos.x - t.x) / e.x,
				m = (n.pos.x + n.width - t.x) / e.x;
			(s = v(-Math.sign(e.x), 0)),
				(r = Math.max(r, Math.min(i, m))),
				(o = Math.min(o, Math.max(i, m)));
		}
		if (t.y != 0) {
			let i = (n.pos.y - t.y) / e.y,
				m = (n.pos.y + n.height - t.y) / e.y;
			Math.min(i, m) > r && (s = v(0, -Math.sign(e.y))),
				(r = Math.max(r, Math.min(i, m))),
				(o = Math.min(o, Math.max(i, m)));
		}
		return o >= r && r >= 0 && r <= 1
			? { point: t.add(e.scale(r)), normal: s, fraction: r }
			: null;
	}
	function ko(t, e, n) {
		let r = t,
			o = n.center,
			s = e,
			i = s.dot(s),
			m = r.sub(o),
			u = 2 * s.dot(m),
			c = m.dot(m) - n.radius * n.radius,
			p = u * u - 4 * i * c;
		if (i <= Number.EPSILON || p < 0) return null;
		if (p == 0) {
			let b = -u / (2 * i);
			if (b >= 0 && b <= 1) {
				let l = r.add(s.scale(b));
				return { point: l, normal: l.sub(o), fraction: b };
			}
		} else {
			let b = (-u + Math.sqrt(p)) / (2 * i),
				l = (-u - Math.sqrt(p)) / (2 * i),
				h = null;
			if (
				(b >= 0 && b <= 1 && (h = b),
				l >= 0 && l <= 1 && (h = Math.min(l, h ?? l)),
				h != null)
			) {
				let d = r.add(s.scale(h));
				return { point: d, normal: d.sub(o).unit(), fraction: h };
			}
		}
		return null;
	}
	function Cu(t, e, n) {
		let r = n.pts,
			o = null,
			s = r[r.length - 1];
		for (let i = 0; i < r.length; i++) {
			let m = r[i],
				u = Ko(t, e, new Oe(s, m));
			u && (!o || o.fraction > u.fraction) && (o = u), (s = m);
		}
		return o;
	}
	function Eu(t, e, n) {
		let r = n.toMat2(),
			o = r.inverse,
			s = o.transform(t.sub(n.center)),
			i = o.transform(e),
			m = ko(s, i, new we(v(), 1));
		if (m) {
			let u = Rt.rotation(ae(-n.angle)),
				p = Rt.scale(n.radiusX, n.radiusY).transform(m.point),
				b = r.transform(m.point).add(n.center),
				l = b.dist(t) / e.len();
			return {
				point: b,
				normal: u
					.transform(v(n.radiusY ** 2 * p.x, n.radiusX ** 2 * p.y))
					.unit(),
				fraction: l,
			};
		}
		return m;
	}
	function _o(t, e, n, r = 64) {
		let o = t,
			s = e.len(),
			i = e.scale(1 / s),
			m = 0,
			u = v(Math.floor(t.x), Math.floor(t.y)),
			c = v(i.x > 0 ? 1 : -1, i.y > 0 ? 1 : -1),
			p = v(Math.abs(1 / i.x), Math.abs(1 / i.y)),
			b = v(
				c.x > 0 ? u.x + 1 - t.x : t.x - u.x,
				c.y > 0 ? u.y + 1 - t.y : t.y - u.y
			),
			l = v(p.x < 1 / 0 ? p.x * b.x : 1 / 0, p.y < 1 / 0 ? p.y * b.y : 1 / 0),
			h = -1;
		for (; m <= r; ) {
			let d = n(u);
			if (d === !0)
				return {
					point: o.add(i.scale(m)),
					normal: v(h === 0 ? -c.x : 0, h === 1 ? -c.y : 0),
					fraction: m / s,
					gridPos: u,
				};
			if (d) return d;
			l.x < l.y
				? ((u.x += c.x), (m = l.x), (l.x += p.x), (h = 0))
				: ((u.y += c.y), (m = l.y), (l.y += p.y), (h = 1));
		}
		return null;
	}
	var Tn = class t {
			pt;
			constructor(e) {
				this.pt = e.clone();
			}
			transform(e) {
				return new t(e.multVec2(this.pt));
			}
			bbox() {
				return new W(this.pt, 0, 0);
			}
			area() {
				return 0;
			}
			clone() {
				return new t(this.pt);
			}
			collides(e) {
				return hu(this, e);
			}
			contains(e) {
				return this.pt.eq(e);
			}
			raycast(e, n) {
				return null;
			}
			random() {
				return this.pt.clone();
			}
		},
		Oe = class t {
			p1;
			p2;
			constructor(e, n) {
				(this.p1 = e.clone()), (this.p2 = n.clone());
			}
			transform(e) {
				return new t(e.multVec2(this.p1), e.multVec2(this.p2));
			}
			bbox() {
				return W.fromPoints(this.p1, this.p2);
			}
			area() {
				return this.p1.dist(this.p2);
			}
			clone() {
				return new t(this.p1, this.p2);
			}
			collides(e) {
				return gu(this, e);
			}
			contains(e) {
				return this.collides(e);
			}
			raycast(e, n) {
				return Ko(e, n, this);
			}
			random() {
				return this.p1.add(this.p2.sub(this.p1).scale(he(1)));
			}
		},
		W = class t {
			pos;
			width;
			height;
			constructor(e, n, r) {
				(this.pos = e.clone()), (this.width = n), (this.height = r);
			}
			static fromPoints(e, n) {
				return new t(e.clone(), n.x - e.x, n.y - e.y);
			}
			center() {
				return new E(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
			}
			points() {
				return [
					this.pos,
					this.pos.add(this.width, 0),
					this.pos.add(this.width, this.height),
					this.pos.add(0, this.height),
				];
			}
			transform(e) {
				return new be(this.points().map((n) => e.multVec2(n)));
			}
			bbox() {
				return this.clone();
			}
			area() {
				return this.width * this.height;
			}
			clone() {
				return new t(this.pos.clone(), this.width, this.height);
			}
			distToPoint(e) {
				return Math.sqrt(this.sdistToPoint(e));
			}
			sdistToPoint(e) {
				let n = this.pos,
					r = this.pos.add(this.width, this.height),
					o = Math.max(n.x - e.x, 0, e.x - r.x),
					s = Math.max(n.y - e.y, 0, e.y - r.y);
				return o * o + s * s;
			}
			collides(e) {
				return yu(this, e);
			}
			contains(e) {
				return this.collides(e);
			}
			raycast(e, n) {
				return wu(e, n, this);
			}
			random() {
				return this.pos.add(he(this.width), he(this.height));
			}
		},
		we = class t {
			center;
			radius;
			constructor(e, n) {
				(this.center = e.clone()), (this.radius = n);
			}
			transform(e) {
				return new Ke(this.center, this.radius, this.radius).transform(e);
			}
			bbox() {
				return W.fromPoints(
					this.center.sub(v(this.radius)),
					this.center.add(v(this.radius))
				);
			}
			area() {
				return this.radius * this.radius * Math.PI;
			}
			clone() {
				return new t(this.center, this.radius);
			}
			collides(e) {
				return bu(this, e);
			}
			contains(e) {
				return this.collides(e);
			}
			raycast(e, n) {
				return ko(e, n, this);
			}
			random() {
				return this.center.add(E.fromAngle(he(360)).scale(he(this.radius)));
			}
		},
		Ke = class t {
			center;
			radiusX;
			radiusY;
			angle;
			constructor(e, n, r, o = 0) {
				(this.center = e.clone()),
					(this.radiusX = n),
					(this.radiusY = r),
					(this.angle = o);
			}
			static fromMat2(e) {
				let n = e.inverse,
					r = n.transpose.mul(n),
					[o, s] = r.eigenvalues,
					[i, m] = r.eigenvectors(o, s),
					[u, c] = [1 / Math.sqrt(o), 1 / Math.sqrt(s)];
				return u > c
					? new t(v(), u, c, ct(Math.atan2(-i[1], i[0])))
					: new t(v(), c, u, ct(Math.atan2(-m[1], m[0])));
			}
			toMat2() {
				let e = ae(this.angle),
					n = Math.cos(e),
					r = Math.sin(e);
				return new Rt(
					n * this.radiusX,
					-r * this.radiusY,
					r * this.radiusX,
					n * this.radiusY
				);
			}
			transform(e) {
				if (this.angle == 0 && e.getRotation() == 0)
					return new t(
						e.multVec2(this.center),
						e.m[0] * this.radiusX,
						e.m[5] * this.radiusY
					);
				{
					let n = this.toMat2(),
						r = e.getRotation(),
						o = e.getScale();
					n = gt.fromMat2(n).scale(o.x, o.y).rotate(r).toMat2();
					let i = t.fromMat2(n);
					return (i.center = e.multVec2(this.center)), i;
				}
			}
			bbox() {
				if (this.angle == 0)
					return W.fromPoints(
						this.center.sub(v(this.radiusX, this.radiusY)),
						this.center.add(v(this.radiusX, this.radiusY))
					);
				{
					let e = ae(this.angle),
						n = Math.cos(e),
						r = Math.sin(e),
						o = this.radiusX * n,
						s = this.radiusX * r,
						i = this.radiusY * r,
						m = this.radiusY * n,
						u = Math.sqrt(o * o + i * i),
						c = Math.sqrt(s * s + m * m);
					return W.fromPoints(
						this.center.sub(v(u, c)),
						this.center.add(v(u, c))
					);
				}
			}
			area() {
				return this.radiusX * this.radiusY * Math.PI;
			}
			clone() {
				return new t(this.center, this.radiusX, this.radiusY, this.angle);
			}
			collides(e) {
				return vu(this, e);
			}
			contains(e) {
				e = e.sub(this.center);
				let n = ae(this.angle),
					r = Math.cos(n),
					o = Math.sin(n),
					s = e.x * r + e.y * o,
					i = -e.x * o + e.y * r;
				return (
					(s * s) / (this.radiusX * this.radiusX) +
						(i * i) / (this.radiusY * this.radiusY) <
					1
				);
			}
			raycast(e, n) {
				return Eu(e, n, this);
			}
			random() {
				return this.center;
			}
		};
	function Tu(t, e, n, r) {
		let o = e.sub(t),
			s = r.sub(n),
			i = o.cross(s);
		return (i < 1e-5 && i > -1e-5) ||
			((i = n.sub(t).cross(s) / i), i < 0 || i > 1)
			? null
			: t.add(o.scale(i));
	}
	var be = class t {
		pts;
		constructor(e) {
			if (e.length < 3)
				throw new Error("Polygons should have at least 3 vertices");
			this.pts = e;
		}
		transform(e) {
			return new t(this.pts.map((n) => e.multVec2(n)));
		}
		bbox() {
			let e = v(Number.MAX_VALUE),
				n = v(-Number.MAX_VALUE);
			for (let r of this.pts)
				(e.x = Math.min(e.x, r.x)),
					(n.x = Math.max(n.x, r.x)),
					(e.y = Math.min(e.y, r.y)),
					(n.y = Math.max(n.y, r.y));
			return W.fromPoints(e, n);
		}
		area() {
			let e = 0,
				n = this.pts.length;
			for (let r = 0; r < n; r++) {
				let o = this.pts[r],
					s = this.pts[(r + 1) % n];
				(e += o.x * s.y * 0.5), (e -= s.x * o.y * 0.5);
			}
			return Math.abs(e);
		}
		clone() {
			return new t(this.pts.map((e) => e.clone()));
		}
		collides(e) {
			return xu(this, e);
		}
		contains(e) {
			return this.collides(e);
		}
		raycast(e, n) {
			return Cu(e, n, this);
		}
		random() {
			return v();
		}
		cut(e, n) {
			let r = new Oe(e, n),
				o = [],
				s = [],
				i = n.sub(e),
				m = this.pts[this.pts.length - 1],
				u = m.sub(e),
				c = i.cross(u) > 0;
			return (
				this.pts.forEach((p) => {
					u = p.sub(e);
					let b = i.cross(u) > 0;
					if (c != b) {
						let l = Tu(m, p, e, n);
						o.push(l), s.push(l), (c = b);
					}
					(b ? o : s).push(p), (m = p);
				}),
				[o.length ? new t(o) : null, s.length ? new t(s) : null]
			);
		}
	};
	function No(t, e, n, r) {
		let o = r * r,
			s = 1 - r,
			i = s * s;
		return t
			.scale(i)
			.add(e.scale(2 * s * r))
			.add(n.scale(o));
	}
	function Uo(t, e, n, r) {
		let o = 1 - r;
		return e
			.sub(t)
			.scale(2 * o)
			.add(n.sub(e).scale(2 * r));
	}
	function Ho(t, e, n, r) {
		return n.sub(e.scale(2)).add(t).scale(2);
	}
	function Qt(t, e, n, r, o) {
		let s = o * o,
			i = s * o,
			m = 1 - o,
			u = m * m,
			c = u * m;
		return t
			.scale(c)
			.add(e.scale(3 * u * o))
			.add(n.scale(3 * m * s))
			.add(r.scale(i));
	}
	function qo(t, e, n, r, o) {
		let s = o * o,
			i = 1 - o,
			m = i * i;
		return e
			.sub(t)
			.scale(3 * m)
			.add(n.sub(e).scale(6 * i * o))
			.add(r.sub(n).scale(3 * s));
	}
	function zo(t, e, n, r, o) {
		let s = 1 - o;
		return n
			.sub(e.scale(2))
			.add(t)
			.scale(6 * s)
			.add(
				r
					.sub(n.scale(2))
					.add(e)
					.scale(6 * o)
			);
	}
	function Wo(t, e, n, r, o) {
		let s = 0.5 * (((-o + 2) * o - 1) * o),
			i = 0.5 * ((3 * o - 5) * o * o + 2),
			m = 0.5 * (((-3 * o + 4) * o + 1) * o),
			u = 0.5 * ((o - 1) * o * o);
		return t.scale(s).add(e.scale(i)).add(n.scale(m)).add(r.scale(u));
	}
	function Yo(t, e, n, r, o) {
		let s = 0.5 * ((-3 * o + 4) * o - 1),
			i = 0.5 * ((9 * o - 10) * o),
			m = 0.5 * ((-9 * o + 8) * o + 1),
			u = 0.5 * ((3 * o - 2) * o);
		return t.scale(s).add(e.scale(i)).add(n.scale(m)).add(r.scale(u));
	}
	function $o(t) {
		let e = Vr(t),
			n = e(1);
		return (r) => {
			let o = r * n,
				s = e(o, !0);
			return t(s);
		};
	}
	function Vr(t, e = 10, n = 10) {
		let r = [0],
			o = [0],
			i = 1 / (e - 1) / n,
			m = 0,
			u = t(0),
			c = 0;
		for (let p = 1; p < e; p++) {
			for (let b = 0; b < n; b++) {
				c += i;
				let l = t(c),
					h = l.dist(u);
				(m += h), (u = l);
			}
			(r[p] = m), (o[p] = c);
		}
		return (
			(o[e - 1] = 1),
			(p, b = !1) => {
				if (b) {
					let l = p;
					if (l <= 0) return 0;
					if (l >= m) return 1;
					let h = 0;
					for (; r[h + 1] < l; ) h++;
					let d = o[h],
						C = o[h + 1],
						g = r[h],
						y = r[h + 1],
						O = (l - g) / (y - g);
					return d + (C - d) * O;
				} else {
					if (p <= 0) return 0;
					if (p >= 1) return r[e - 1];
					let l = 0;
					for (; o[l + 1] < p; ) l++;
					let h = o[l],
						d = o[l + 1],
						C = r[l],
						g = r[l + 1],
						y = (p - h) / (d - h);
					return C + (g - C) * y;
				}
			}
		);
	}
	function Ft(t, e, n, r) {
		let o = 2 * t + e - 2 * r + n,
			s = -3 * t + 3 * r - 2 * e - n,
			i = e,
			m = t;
		return (u) => {
			let c = u * u,
				p = c * u;
			return o * p + s * c + i * u + m;
		};
	}
	function Pr(t, e, n, r, o, s = Ft) {
		let i = s(e.x, (1 - o) * (n.x - t.x), (1 - o) * (r.x - e.x), n.x),
			m = s(e.y, (1 - o) * (n.y - t.y), (1 - o) * (r.y - e.y), n.y);
		return (u) => new E(i(u), m(u));
	}
	function Lt(t, e, n, r, o = Ft) {
		return Pr(t, e, n, r, 0.5, o);
	}
	function Xo(t, e, n, r, o = Ft) {
		return Lt(r.add(t.sub(e).scale(6)), t, r, t.add(r.sub(n).scale(6)), o);
	}
	function Qo(t, e, n, r, o, s, i, m = Ft) {
		let u = m(
				e.x,
				0.5 * (1 - o) * (1 + i) * (1 + s) * (e.x - t.x) +
					0.5 * (1 - o) * (1 - i) * (1 - s) * (n.x - e.x),
				0.5 * (1 - o) * (1 + i) * (1 - s) * (n.x - e.x) +
					0.5 * (1 - o) * (1 - i) * (1 + s) * (r.x - n.x),
				n.x
			),
			c = m(
				e.y,
				0.5 * (1 - o) * (1 + i) * (1 + s) * (e.y - t.y) +
					0.5 * (1 - o) * (1 - i) * (1 - s) * (n.y - e.y),
				0.5 * (1 - o) * (1 + i) * (1 - s) * (n.y - e.y) +
					0.5 * (1 - o) * (1 - i) * (1 + s) * (r.y - n.y),
				n.y
			);
		return (p) => new E(u(p), c(p));
	}
	function Jo(t, e, n, r) {
		let o = 2 * t + e - 2 * r + n,
			s = -3 * t + 3 * r - 2 * e + n,
			i = e;
		return (m) => {
			let u = m * m;
			return 3 * o * u + 2 * s * m + i;
		};
	}
	function Wt(t) {
		return 0 <= t && t <= 1;
	}
	function xr(t, e) {
		return Math.abs(t - e) <= Number.EPSILON;
	}
	function Yt(t) {
		return t < 0 ? -Math.pow(-t, 1 / 3) : Math.pow(t, 1 / 3);
	}
	function Ou(t, e, n, r) {
		let o = 3 * t - 6 * e + 3 * n,
			s = -3 * t + 3 * e,
			i = t,
			m = -t + 3 * e - 3 * n + r;
		if (xr(m, 0)) {
			if (xr(o, 0)) return xr(s, 0) ? [] : [-i / s].filter(Wt);
			let y = Math.sqrt(s * s - 4 * o * i),
				O = 2 * o;
			return [(y - s) / O, (-s - y) / O].filter(Wt);
		}
		(o /= m), (s /= m), (i /= m);
		let u = (3 * s - o * o) / 3,
			c = u / 3,
			p = (2 * o * o * o - 9 * o * s + 27 * i) / 27,
			b = p / 2,
			l = b * b + c * c * c;
		if (l < 0) {
			let y = -u / 3,
				O = y * y * y,
				A = Math.sqrt(O),
				R = -p / (2 * A),
				V = R < -1 ? -1 : R > 1 ? 1 : R,
				x = Math.acos(V),
				S = 2 * Yt(A),
				G = S * Math.cos(x / 3) - o / 3,
				M = S * Math.cos((x + 2 * Math.PI) / 3) - o / 3,
				D = S * Math.cos((x + 4 * Math.PI) / 3) - o / 3;
			return [G, M, D].filter(Wt);
		}
		if (l === 0) {
			let y = b < 0 ? Yt(-b) : -Yt(b),
				O = 2 * y - o / 3,
				A = -y - o / 3;
			return [O, A].filter(Wt);
		}
		let h = Math.sqrt(l),
			d = Yt(h - b),
			C = Yt(h + b);
		return [d - C - o / 3].filter(Wt);
	}
	function Au(t, e, n, r, o) {
		let s = Ou(t.x - o, e.x - o, n.x - o, r.x - o);
		return s.length > 0 ? Qt(t, e, n, r, s[0]).y : NaN;
	}
	function Zo(t) {
		if (!t || t.length == 0)
			throw new Error("Need at least one point for easingLinear.");
		let e = t.length;
		return (n) => {
			if (n <= 0 || t.length == 1 || n <= t[0].x) return t[0].y;
			for (let r = 0; r < e; r++)
				if (t[r].x >= n) return Se(n, t[r - 1].x, t[r].x, t[r - 1].y, t[r].y);
			return t[t.length - 1].y;
		};
	}
	function es(t, e) {
		return (n) => Au(v(0, 0), t, e, v(1, 1), n);
	}
	function ts(t, e = "jump-end") {
		let n = 1 / t,
			r = e == "jump-start" || e == "jump-both",
			o = e == "jump-end" || e == "jump-both",
			s = 1 / (t + (o ? 1 : 0)),
			i = r ? s : 0;
		return (m) => {
			let u = Math.floor(m / n);
			return i + u * s;
		};
	}
	function ns(t, e) {
		let n = Number.MAX_VALUE,
			r = { normal: v(0), distance: 0 };
		for (let o of [t, e])
			for (let s = 0; s < o.pts.length; s++) {
				let i = o.pts[s],
					u = o.pts[(s + 1) % o.pts.length].sub(i).normal().unit(),
					c = Number.MAX_VALUE,
					p = -Number.MAX_VALUE;
				for (let d = 0; d < t.pts.length; d++) {
					let C = t.pts[d].dot(u);
					(c = Math.min(c, C)), (p = Math.max(p, C));
				}
				let b = Number.MAX_VALUE,
					l = -Number.MAX_VALUE;
				for (let d = 0; d < e.pts.length; d++) {
					let C = e.pts[d].dot(u);
					(b = Math.min(b, C)), (l = Math.max(l, C));
				}
				let h = Math.min(p, l) - Math.max(c, b);
				if (h < 0) return null;
				if (h < Math.abs(n)) {
					let d = l - c,
						C = b - p;
					(n = Math.abs(d) < Math.abs(C) ? d : C),
						(r.normal = u),
						(r.distance = n);
				}
			}
		return r;
	}
	function rs(t, e, n) {
		return (e.x - t.x) * (n.y - t.y) - (e.y - t.y) * (n.x - t.x) >= 0;
	}
	function Su(t) {
		let e = 0,
			n = t[t.length - 1];
		for (let r = 0; r < t.length; r++)
			(e += (t[r].x - n.x) * (t[r].y + n.y)), (n = t[r]);
		return e < 0;
	}
	function vr(t, e, n, r) {
		let o = r.x - n.x,
			s = r.y - n.y,
			i = o * (t.y - n.y) - s * (t.x - n.x),
			m = o * (e.y - n.y) - s * (e.x - n.x);
		return i * m >= 0;
	}
	function Vu(t, e, n, r) {
		return vr(t, e, n, r) && vr(t, n, e, r) && vr(t, r, e, n);
	}
	function Pu(t, e, n, r) {
		for (let o of t)
			if (o !== e && o !== n && o !== r && Vu(o, e, n, r)) return !0;
		return !1;
	}
	function Gu(t, e, n, r) {
		return rs(t, e, n) && !Pu(r, t, e, n);
	}
	function Gn(t) {
		if (t.length < 3) return [];
		if (t.length == 3) return [t];
		let e = [],
			n = [],
			r = 0;
		for (let b = 0; b < t.length; b++) {
			let l = t[r],
				h = t[b];
			(h.x < l.x || (h.x == l.x && h.y < l.y)) && (r = r),
				(e[b] = b + 1),
				(n[b] = b - 1);
		}
		(e[e.length - 1] = 0), (n[0] = n.length - 1), Su(t) || ([e, n] = [n, e]);
		let o = [];
		for (let b = 0; b < t.length; ++b)
			rs(t[n[b]], t[b], t[e[b]]) || o.push(t[b]);
		let s = [],
			i = t.length,
			m = 1,
			u = 0,
			c,
			p;
		for (; i > 3; ) {
			(c = e[m]), (p = n[m]);
			let b = t[p],
				l = t[m],
				h = t[c];
			if (Gu(b, l, h, o))
				s.push([b, l, h]),
					(e[p] = c),
					(n[c] = p),
					o.splice(o.indexOf(l), 1),
					--i,
					(u = 0);
			else if (++u > i) return [];
			m = c;
		}
		return (c = e[m]), (p = n[m]), s.push([t[p], t[m], t[c]]), s;
	}
	function os(t) {
		if (t.length < 3) return !1;
		let e = t.length - 2,
			n = t.length - 1,
			r = 0,
			o = t[n].sub(t[e]),
			s = t[r].sub(t[n]),
			i = o.cross(s);
		for (; r + 1 < t.length; )
			if (
				((e = n),
				(n = r),
				r++,
				(o = t[n].sub(t[e])),
				(s = t[r].sub(t[n])),
				o.cross(s) * i < 0)
			)
				return !1;
		return !0;
	}
	var Mn =
			" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
		lt = "topleft";
	var ss = "monospace",
		bt = "monospace";
	var Jt = "linear";
	var Zt = [
			{ name: "a_pos", size: 2 },
			{ name: "a_uv", size: 2 },
			{ name: "a_color", size: 4 },
		],
		Mu = Zt.reduce((t, e) => t + e.size, 0),
		is = 2048,
		as = is * 4 * Mu,
		us = is * 6,
		cs = `
attribute vec2 a_pos;
attribute vec2 a_uv;
attribute vec4 a_color;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

vec4 def_vert() {
	return vec4(a_pos, 0.0, 1.0);
}

{{user}}

void main() {
	vec4 pos = vert(a_pos, a_uv, a_color);
	v_pos = a_pos;
	v_uv = a_uv;
	v_color = a_color;
	gl_Position = pos;
}
`,
		ls = `
precision mediump float;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

uniform sampler2D u_tex;

vec4 def_frag() {
	vec4 texColor = texture2D(u_tex, v_uv);
	return vec4((v_color.rgb * texColor.rgb), texColor.a) * v_color.a;
}

{{user}}

void main() {
	gl_FragColor = frag(v_pos, v_uv, v_color, u_tex);
	if (gl_FragColor.a == 0.0) {
		discard;
	}
}
`,
		en = `
vec4 vert(vec2 pos, vec2 uv, vec4 color) {
	return def_vert();
}
`,
		tn = `
vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
	return def_frag();
}
`,
		ms = new Set(["id", "require"]),
		ps = new Set([
			"add",
			"fixedUpdate",
			"update",
			"draw",
			"destroy",
			"inspect",
			"drawInspect",
		]),
		Gr = 200,
		ds = 640,
		fs = 65536,
		Rn = Symbol.for("kaplay.cancel");
	var nn = class extends Map {
			lastID = 0;
			push(e) {
				let n = this.lastID;
				return this.set(n, e), this.lastID++, n;
			}
			pushd(e) {
				let n = this.push(e);
				return () => this.delete(n);
			}
		},
		ke = class t {
			paused = !1;
			cancel;
			constructor(e) {
				this.cancel = e;
			}
			static join(e) {
				let n = new t(() => e.forEach((r) => r.cancel()));
				return (
					Object.defineProperty(n, "paused", {
						get: () => e[0].paused,
						set: (r) => e.forEach((o) => (o.paused = r)),
					}),
					(n.paused = !1),
					n
				);
			}
			static replace(e, n) {
				return (
					(e.cancel = () => n.cancel()),
					(n.paused = e.paused),
					Object.defineProperty(e, "paused", {
						get: () => n.paused,
						set: (r) => (n.paused = r),
					}),
					e
				);
			}
		},
		re = class {
			cancellers = new WeakMap();
			handlers = new nn();
			add(e) {
				function n(...s) {
					if (!o.paused) return e(...s);
				}
				let r = this.handlers.pushd(n),
					o = new ke(r);
				return this.cancellers.set(n, r), o;
			}
			addOnce(e) {
				let n = this.add((...r) => {
					n.cancel(), e(...r);
				});
				return n;
			}
			next() {
				return new Promise((e) => this.addOnce(e));
			}
			trigger(...e) {
				this.handlers.forEach((n) => {
					let r = n(...e),
						o;
					r === Rn && (o = this.cancellers.get(n)) && o();
				});
			}
			numListeners() {
				return this.handlers.size;
			}
			clear() {
				this.handlers.clear();
			}
		},
		ze = class {
			handlers = {};
			registers = {};
			on(e, n) {
				return (
					this.handlers[e] || (this.handlers[e] = new re()),
					this.handlers[e].add(n)
				);
			}
			onOnce(e, n) {
				let r = this.on(e, (...o) => {
					r.cancel(), n(...o);
				});
				return r;
			}
			next(e) {
				return new Promise((n) => {
					this.onOnce(e, (...r) => n(r[0]));
				});
			}
			trigger(e, ...n) {
				this.handlers[e] && this.handlers[e].trigger(...n);
			}
			remove(e) {
				delete this.handlers[e];
			}
			clear() {
				this.handlers = {};
			}
			numListeners(e) {
				return this.handlers[e]?.numListeners() ?? 0;
			}
		};
	var hs = (t) => t[0] instanceof j,
		gs = (t) => t[0] instanceof E,
		bs = (t) => typeof t[0] == "number";
	var jt = class {
		_items;
		_compareFn;
		constructor(e = (n, r) => n < r) {
			(this._compareFn = e), (this._items = []);
		}
		insert(e) {
			this._items.push(e), this.moveUp(this._items.length - 1);
		}
		remove() {
			if (this._items.length === 0) return null;
			let e = this._items[0],
				n = this._items.pop();
			return (
				this._items.length !== 0 && ((this._items[0] = n), this.moveDown(0)), e
			);
		}
		clear() {
			this._items.splice(0, this._items.length);
		}
		moveUp(e) {
			for (; e > 0; ) {
				let n = Math.floor((e - 1) / 2);
				if (
					!this._compareFn(this._items[e], this._items[n]) &&
					this._items[e] >= this._items[n]
				)
					break;
				this.swap(e, n), (e = n);
			}
		}
		moveDown(e) {
			for (; e < Math.floor(this._items.length / 2); ) {
				let n = 2 * e + 1;
				if (
					(n < this._items.length - 1 &&
						!this._compareFn(this._items[n], this._items[n + 1]) &&
						++n,
					this._compareFn(this._items[e], this._items[n]))
				)
					break;
				this.swap(e, n), (e = n);
			}
		}
		swap(e, n) {
			[this._items[e], this._items[n]] = [this._items[n], this._items[e]];
		}
		get length() {
			return this._items.length;
		}
	};
	function Ru(t) {
		let e = window.atob(t),
			n = e.length,
			r = new Uint8Array(n);
		for (let o = 0; o < n; o++) r[o] = e.charCodeAt(o);
		return r.buffer;
	}
	function ys(t) {
		return Ru(t.split(",")[1]);
	}
	function Dn(t, e) {
		let n = document.createElement("a");
		(n.href = e), (n.download = t), n.click();
	}
	function Mr(t, e) {
		Dn(t, "data:text/plain;charset=utf-8," + e);
	}
	function xs(t, e) {
		Mr(t, JSON.stringify(e));
	}
	function Rr(t, e) {
		let n = URL.createObjectURL(e);
		Dn(t, n), URL.revokeObjectURL(n);
	}
	var Bn = (t) => t.match(/^data:\w+\/\w+;base64,.+/);
	var vs = (t) => t.split(".").slice(0, -1).join(".");
	function Fn(t, e) {
		if (t === e) return !0;
		let n = typeof t,
			r = typeof e;
		if (n !== r) return !1;
		if (n === "object" && r === "object" && t !== null && e !== null) {
			if (Array.isArray(t) !== Array.isArray(e)) return !1;
			let o = Object.keys(t),
				s = Object.keys(e);
			if (o.length !== s.length) return !1;
			for (let i of o) {
				let m = t[i],
					u = e[i];
				if (!Fn(m, u)) return !1;
			}
			return !0;
		}
		return !1;
	}
	var ws = new Set(),
		Cs = (t) => (t instanceof Error ? t.message : String(t));
	function Du(t) {
		ws.has(t) || (ws.add(t), console.warn(t));
	}
	function et(t, e) {
		Du(`${t} is deprecated. Use ${e} instead.`);
	}
	function rn(t, e) {
		return Number(t.toFixed(e));
	}
	function ne(t, e) {
		return (...n) => {
			let r = n.length;
			if (r === t.length) return t(...n);
			if (r === e.length) return e(...n);
		};
	}
	var Bu = Object.freeze([
		776, 2359, 2367, 2984, 3007, 3021, 3633, 3635, 3648, 3657, 4352, 4449, 4520,
	]);
	function Ts(t) {
		if (typeof t != "string")
			throw new TypeError("string cannot be undefined or null");
		let e = [],
			n = 0,
			r = 0;
		for (; n < t.length; ) {
			if (
				((r += Fu(n + r, t)),
				Nu(t[n + r]) && r++,
				Ku(t[n + r]) && r++,
				ku(t[n + r]) && r++,
				Uu(t[n + r]))
			) {
				r++;
				continue;
			}
			e.push(t.substring(n, n + r)), (n += r), (r = 0);
		}
		return e;
	}
	function Fu(t, e) {
		let n = e[t];
		if (!Lu(n) || t === e.length - 1) return 1;
		let r = n + e[t + 1],
			o = e.substring(t + 2, t + 5);
		return Es(r) && Es(o)
			? 4
			: ju(r) && _u(o)
			? e.slice(t).indexOf(String.fromCodePoint(917631)) + 2
			: Iu(o)
			? 4
			: 2;
	}
	function Lu(t) {
		return t && yt(t[0].charCodeAt(0), 55296, 56319);
	}
	function Es(t) {
		return yt(Dr(t), 127462, 127487);
	}
	function ju(t) {
		return yt(Dr(t), 127988, 127988);
	}
	function Iu(t) {
		return yt(Dr(t), 127995, 127999);
	}
	function Ku(t) {
		return typeof t == "string" && yt(t.charCodeAt(0), 65024, 65039);
	}
	function ku(t) {
		return typeof t == "string" && yt(t.charCodeAt(0), 8400, 8447);
	}
	function _u(t) {
		let e = t.codePointAt(0);
		return (
			typeof t == "string" && typeof e == "number" && yt(e, 917504, 917631)
		);
	}
	function Nu(t) {
		return typeof t == "string" && Bu.includes(t.charCodeAt(0));
	}
	function Uu(t) {
		return typeof t == "string" && t.charCodeAt(0) === 8205;
	}
	function Dr(t) {
		let e = t.charCodeAt(0) - 55296,
			n = t.charCodeAt(1) - 56320;
		return (e << 10) + n + 65536;
	}
	function yt(t, e, n) {
		return t >= e && t <= n;
	}
	var De = (t, e) => (Array.isArray(t) ? t?.includes(e) : t === e),
		We = (t, e) => (Array.isArray(e) ? e.some((n) => t.has(n)) : t.has(e)),
		on = (t, e, n) => {
			t.has(e) ? t.get(e)?.push(n) : t.set(e, [n]);
		};
	var Os = (() => {
		let t = 0;
		return () => t++;
	})();
	var As = {
		"Joy-Con L+R (STANDARD GAMEPAD Vendor: 057e Product: 200e)": {
			buttons: {
				0: "south",
				1: "east",
				2: "west",
				3: "north",
				4: "lshoulder",
				5: "rshoulder",
				6: "ltrigger",
				7: "rtrigger",
				8: "select",
				9: "start",
				10: "lstick",
				11: "rstick",
				12: "dpad-up",
				13: "dpad-down",
				14: "dpad-left",
				15: "dpad-right",
				16: "home",
				17: "capture",
			},
			sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } },
		},
		"Joy-Con (L) (STANDARD GAMEPAD Vendor: 057e Product: 2006)": {
			buttons: {
				0: "south",
				1: "east",
				2: "west",
				3: "north",
				4: "lshoulder",
				5: "rshoulder",
				9: "select",
				10: "lstick",
				16: "start",
			},
			sticks: { left: { x: 0, y: 1 } },
		},
		"Joy-Con (R) (STANDARD GAMEPAD Vendor: 057e Product: 2007)": {
			buttons: {
				0: "south",
				1: "east",
				2: "west",
				3: "north",
				4: "lshoulder",
				5: "rshoulder",
				9: "start",
				10: "lstick",
				16: "select",
			},
			sticks: { left: { x: 0, y: 1 } },
		},
		"Pro Controller (STANDARD GAMEPAD Vendor: 057e Product: 2009)": {
			buttons: {
				0: "south",
				1: "east",
				2: "west",
				3: "north",
				4: "lshoulder",
				5: "rshoulder",
				6: "ltrigger",
				7: "rtrigger",
				8: "select",
				9: "start",
				10: "lstick",
				11: "rstick",
				12: "dpad-up",
				13: "dpad-down",
				14: "dpad-left",
				15: "dpad-right",
				16: "home",
				17: "capture",
			},
			sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } },
		},
		default: {
			buttons: {
				0: "south",
				1: "east",
				2: "west",
				3: "north",
				4: "lshoulder",
				5: "rshoulder",
				6: "ltrigger",
				7: "rtrigger",
				8: "select",
				9: "start",
				10: "lstick",
				11: "rstick",
				12: "dpad-up",
				13: "dpad-down",
				14: "dpad-left",
				15: "dpad-right",
				16: "home",
			},
			sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } },
		},
	};
	function Ln() {
		let t = a.globalOpt.pixelDensity ?? 1,
			e = a.globalOpt.width,
			n = a.globalOpt.height,
			r = a.gfx.ggl.gl.drawingBufferWidth,
			o = a.gfx.ggl.gl.drawingBufferHeight,
			s = r / t,
			i = o / t,
			m = 0,
			u = 0,
			c = s,
			p = i;
		if (a.globalOpt.letterbox) {
			if (!e || !n)
				throw new Error("Letterboxing requires width and height defined.");
			let b = s / i,
				l = e / n;
			if (b > l) {
				let h = i * l;
				(m = (s - h) / 2), (c = h);
			} else {
				let h = s / l;
				(p = h), (u = (i - h) / 2);
			}
		}
		if (a.globalOpt.stretch && (!a.globalOpt.width || !a.globalOpt.height))
			throw new Error("Stretching requires width and height defined.");
		a.gfx.viewport = {
			x: m,
			y: u,
			width: c,
			height: p,
			scale:
				(a.gfx.viewport.width + a.gfx.viewport.height) /
				(a.gfx.width + a.gfx.height),
		};
	}
	function Ss(t) {
		return new E(
			(t.x * a.gfx.viewport.width) / a.gfx.width,
			(t.y * a.gfx.viewport.height) / a.gfx.height
		);
	}
	function Vs(t) {
		return new E(
			((t.x - a.gfx.viewport.x) * a.gfx.width) / a.gfx.viewport.width,
			((t.y - a.gfx.viewport.y) * a.gfx.height) / a.gfx.viewport.height
		);
	}
	var Ps = () => mt.lastInputDevice,
		Gs = () => {
			let t = mt.buttons;
			for (let e in t) {
				let n = t[e].keyboard && [t[e].keyboard].flat(),
					r = t[e].keyboardCode && [t[e].keyboardCode].flat(),
					o = t[e].gamepad && [t[e].gamepad].flat(),
					s = t[e].mouse && [t[e].mouse].flat();
				n &&
					n.forEach((i) => {
						on(mt.buttonsByKey, i, e);
					}),
					r &&
						r.forEach((i) => {
							on(mt.buttonsByKeyCode, i, e);
						}),
					o &&
						o.forEach((i) => {
							on(mt.buttonsByGamepad, i, e);
						}),
					s &&
						s.forEach((i) => {
							on(mt.buttonsByMouse, i, e);
						});
			}
		};
	var xt = class {
			pressed = new Set([]);
			pressedRepeat = new Set([]);
			released = new Set([]);
			down = new Set([]);
			update() {
				this.pressed.clear(), this.released.clear(), this.pressedRepeat.clear();
			}
			press(e) {
				this.pressed.add(e), this.pressedRepeat.add(e), this.down.add(e);
			}
			pressRepeat(e) {
				this.pressedRepeat.add(e);
			}
			release(e) {
				this.down.delete(e), this.pressed.delete(e), this.released.add(e);
			}
		},
		Br = class {
			buttonState = new xt();
			stickState = new Map();
		},
		Fr = class {
			dts = [];
			timer = 0;
			fps = 0;
			tick(e) {
				this.dts.push(e),
					(this.timer += e),
					this.timer >= 1 &&
						((this.timer = 0),
						(this.fps = Math.round(
							1 / (this.dts.reduce((n, r) => n + r) / this.dts.length)
						)),
						(this.dts = []));
			}
		},
		mt,
		Ms = As,
		qu = (t) => {
			let e = t.buttons ?? {};
			return {
				canvas: t.canvas,
				buttons: e,
				buttonsByKey: new Map(),
				buttonsByMouse: new Map(),
				buttonsByGamepad: new Map(),
				buttonsByKeyCode: new Map(),
				loopID: null,
				stopped: !1,
				dt: 0,
				fixedDt: 1 / 50,
				restDt: 0,
				time: 0,
				realTime: 0,
				fpsCounter: new Fr(),
				timeScale: 1,
				skipTime: !1,
				isHidden: !1,
				numFrames: 0,
				mousePos: new E(0),
				mouseDeltaPos: new E(0),
				keyState: new xt(),
				mouseState: new xt(),
				mergedGamepadState: new Br(),
				gamepadStates: new Map(),
				lastInputDevice: null,
				buttonState: new xt(),
				gamepads: [],
				charInputted: [],
				isMouseMoved: !1,
				lastWidth: t.canvas.offsetWidth,
				lastHeight: t.canvas.offsetHeight,
				events: new ze(),
			};
		},
		Rs = (t) => {
			if (!t.canvas) throw new Error("Please provide a canvas");
			let e = qu(t);
			(mt = e), Gs();
			function n() {
				return e.dt * e.timeScale;
			}
			function r() {
				return e.fixedDt * e.timeScale;
			}
			function o() {
				return e.restDt * e.timeScale;
			}
			function s() {
				return e.isHidden;
			}
			function i() {
				return e.time;
			}
			function m() {
				return e.fpsCounter.fps;
			}
			function u() {
				return e.numFrames;
			}
			function c() {
				return e.canvas.toDataURL();
			}
			function p(f) {
				e.canvas.style.cursor = f;
			}
			function b() {
				return e.canvas.style.cursor;
			}
			function l(f) {
				if (f)
					try {
						let T = e.canvas.requestPointerLock();
						T?.catch && T.catch((P) => console.error(P));
					} catch (T) {
						console.error(T);
					}
				else document.exitPointerLock();
			}
			function h() {
				return !!document.pointerLockElement;
			}
			function d(f) {
				f.requestFullscreen
					? f.requestFullscreen()
					: f.webkitRequestFullscreen && f.webkitRequestFullscreen();
			}
			function C() {
				document.exitFullscreen
					? document.exitFullscreen()
					: document.webkitExitFullScreen && document.webkitExitFullScreen();
			}
			function g(f = !0) {
				f ? d(e.canvas) : C();
			}
			function y() {
				return (
					document.fullscreenElement === e.canvas ||
					document.webkitFullscreenElement === e.canvas
				);
			}
			function O() {
				e.stopped = !0;
				let f = Object.entries(Me),
					T = Object.entries(gr),
					P = Object.entries(Cn);
				for (let [B, te] of f) e.canvas.removeEventListener(B, te);
				for (let [B, te] of T) document.removeEventListener(B, te);
				for (let [B, te] of P) window.removeEventListener(B, te);
				To.disconnect();
			}
			function A(f, T) {
				e.loopID !== null && cancelAnimationFrame(e.loopID);
				let P = 0,
					B = 0,
					te = (Ae) => {
						if (e.stopped) return;
						if (document.visibilityState !== "visible") {
							e.loopID = requestAnimationFrame(te);
							return;
						}
						let se = Ae / 1e3,
							Je = Math.min(se - e.realTime, 0.25),
							Mt = t.maxFPS ? 1 / t.maxFPS : 0;
						if (((e.realTime = se), (B += Je), B > Mt)) {
							if (!e.skipTime) {
								for (P += B, e.dt = e.fixedDt, e.restDt = 0; P > e.fixedDt; )
									(P -= e.fixedDt), P < e.fixedDt && (e.restDt = P), f();
								(e.restDt = P),
									(e.dt = B),
									(e.time += n()),
									e.fpsCounter.tick(e.dt);
							}
							(B = 0), (e.skipTime = !1), e.numFrames++, T(wn, Ja);
						}
						e.loopID = requestAnimationFrame(te);
					};
				te(0);
			}
			function R() {
				return "ontouchstart" in window || navigator.maxTouchPoints > 0;
			}
			function V() {
				return e.mousePos.clone();
			}
			function x() {
				return e.mouseDeltaPos.clone();
			}
			function w(f = "left") {
				return e.mouseState.pressed.has(f);
			}
			function S(f = "left") {
				return e.mouseState.down.has(f);
			}
			function G(f = "left") {
				return e.mouseState.released.has(f);
			}
			function M() {
				return e.isMouseMoved;
			}
			function D(f) {
				return f === void 0
					? e.keyState.pressed.size > 0
					: We(e.keyState.pressed, f);
			}
			function L(f) {
				return f === void 0
					? e.keyState.pressedRepeat.size > 0
					: We(e.keyState.pressedRepeat, f);
			}
			function U(f) {
				return f === void 0 ? e.keyState.down.size > 0 : We(e.keyState.down, f);
			}
			function H(f) {
				return f === void 0
					? e.keyState.released.size > 0
					: We(e.keyState.released, f);
			}
			function Y(f) {
				return f === void 0
					? e.mergedGamepadState.buttonState.pressed.size > 0
					: We(e.mergedGamepadState.buttonState.pressed, f);
			}
			function _(f) {
				return f === void 0
					? e.mergedGamepadState.buttonState.down.size > 0
					: We(e.mergedGamepadState.buttonState.down, f);
			}
			function K(f) {
				return f === void 0
					? e.mergedGamepadState.buttonState.released.size > 0
					: We(e.mergedGamepadState.buttonState.released, f);
			}
			function J(f) {
				return f === void 0
					? e.buttonState.pressed.size > 0
					: We(e.buttonState.pressed, f);
			}
			function $(f) {
				return f === void 0
					? e.buttonState.down.size > 0
					: We(e.buttonState.down, f);
			}
			function Z(f) {
				return f === void 0
					? e.buttonState.released.size > 0
					: We(e.buttonState.released, f);
			}
			function Ee(f) {
				return e.buttons?.[f];
			}
			function k(f, T) {
				e.buttons[f] = { ...e.buttons[f], ...T };
			}
			function ht(f) {
				e.buttonState.press(f), e.events.trigger("buttonPress", f);
			}
			function Pt(f) {
				e.buttonState.release(f), e.events.trigger("buttonRelease", f);
			}
			function Ut(f) {
				return e.events.on("resize", f);
			}
			let bn = ne(
					(f) => e.events.on("keyDown", f),
					(f, T) => e.events.on("keyDown", (P) => De(f, P) && T(P))
				),
				yn = ne(
					(f) => e.events.on("keyPress", (T) => f(T)),
					(f, T) => e.events.on("keyPress", (P) => De(f, P) && T(P))
				),
				lr = ne(
					(f) => e.events.on("keyPressRepeat", f),
					(f, T) => e.events.on("keyPressRepeat", (P) => De(f, P) && T(P))
				),
				mr = ne(
					(f) => e.events.on("keyRelease", f),
					(f, T) => e.events.on("keyRelease", (P) => De(f, P) && T(P))
				),
				Gt = ne(
					(f) => e.events.on("mouseDown", (T) => f(T)),
					(f, T) => e.events.on("mouseDown", (P) => De(f, P) && T(P))
				),
				$e = ne(
					(f) => e.events.on("mousePress", (T) => f(T)),
					(f, T) => e.events.on("mousePress", (P) => De(f, P) && T(P))
				),
				xn = ne(
					(f) => e.events.on("mouseRelease", (T) => f(T)),
					(f, T) => e.events.on("mouseRelease", (P) => P === f && T(P))
				);
			function F(f) {
				return e.events.on("mouseMove", () => f(V(), x()));
			}
			function N(f) {
				return e.events.on("charInput", f);
			}
			function z(f) {
				return e.events.on("touchStart", f);
			}
			function oe(f) {
				return e.events.on("touchMove", f);
			}
			function ye(f) {
				return e.events.on("touchEnd", f);
			}
			function Q(f) {
				return e.events.on("scroll", f);
			}
			function ve(f) {
				return e.events.on("hide", f);
			}
			function Ht(f) {
				return e.events.on("show", f);
			}
			let at = ne(
					(f) => e.events.on("gamepadButtonPress", (T, P) => f(T, P)),
					(f, T) =>
						e.events.on("gamepadButtonPress", (P, B) => De(f, P) && T(P, B))
				),
				pr = ne(
					(f) => e.events.on("gamepadButtonDown", (T, P) => f(T, P)),
					(f, T) =>
						e.events.on("gamepadButtonDown", (P, B) => De(f, P) && T(P, B))
				),
				dr = ne(
					(f) => e.events.on("gamepadButtonRelease", (T, P) => f(T, P)),
					(f, T) =>
						e.events.on("gamepadButtonRelease", (P, B) => De(f, P) && T(P, B))
				);
			function fr(f, T) {
				return e.events.on("gamepadStick", (P, B, te) => P === f && T(B, te));
			}
			function hr(f) {
				e.events.on("gamepadConnect", f);
			}
			function vn(f) {
				e.events.on("gamepadDisconnect", f);
			}
			function Xe(f) {
				return e.mergedGamepadState.stickState.get(f) || new E(0);
			}
			function ut() {
				return [...e.charInputted];
			}
			function qt() {
				return [...e.gamepads];
			}
			let Ie = ne(
					(f) => e.events.on("buttonPress", (T) => f(T)),
					(f, T) => e.events.on("buttonPress", (P) => De(f, P) && T(P))
				),
				zt = ne(
					(f) => e.events.on("buttonDown", (T) => f(T)),
					(f, T) => e.events.on("buttonDown", (P) => De(f, P) && T(P))
				),
				Qe = ne(
					(f) => e.events.on("buttonRelease", (T) => f(T)),
					(f, T) => e.events.on("buttonRelease", (P) => De(f, P) && T(P))
				);
			function wn() {
				e.events.trigger("input"),
					e.keyState.down.forEach((f) => e.events.trigger("keyDown", f)),
					e.mouseState.down.forEach((f) => e.events.trigger("mouseDown", f)),
					e.buttonState.down.forEach((f) => {
						e.events.trigger("buttonDown", f);
					}),
					eu();
			}
			function Ja() {
				e.keyState.update(),
					e.mouseState.update(),
					e.buttonState.update(),
					e.mergedGamepadState.buttonState.update(),
					e.mergedGamepadState.stickState.forEach((f, T) => {
						e.mergedGamepadState.stickState.set(T, new E(0));
					}),
					(e.charInputted = []),
					(e.isMouseMoved = !1),
					(e.mouseDeltaPos = new E(0)),
					e.gamepadStates.forEach((f) => {
						f.buttonState.update(),
							f.stickState.forEach((T, P) => {
								f.stickState.set(P, new E(0));
							});
					});
			}
			function vo(f) {
				let T = {
					index: f.index,
					isPressed: (P) =>
						e.gamepadStates.get(f.index)?.buttonState.pressed.has(P) || !1,
					isDown: (P) =>
						e.gamepadStates.get(f.index)?.buttonState.down.has(P) || !1,
					isReleased: (P) =>
						e.gamepadStates.get(f.index)?.buttonState.released.has(P) || !1,
					getStick: (P) =>
						e.gamepadStates.get(f.index)?.stickState.get(P) || v(),
				};
				return (
					e.gamepads.push(T),
					e.gamepadStates.set(f.index, {
						buttonState: new xt(),
						stickState: new Map([
							["left", new E(0)],
							["right", new E(0)],
						]),
					}),
					T
				);
			}
			function Za(f) {
				(e.gamepads = e.gamepads.filter((T) => T.index !== f.index)),
					e.gamepadStates.delete(f.index);
			}
			function eu() {
				for (let f of navigator.getGamepads())
					f && !e.gamepadStates.has(f.index) && vo(f);
				for (let f of e.gamepads) {
					let T = navigator.getGamepads()[f.index];
					if (!T) continue;
					let B = (t.gamepads ?? {})[T.id] || Ms[T.id] || Ms.default,
						te = e.gamepadStates.get(f.index);
					if (te) {
						for (let Ae = 0; Ae < T.buttons.length; Ae++) {
							let se = B.buttons[Ae],
								Je = T.buttons[Ae],
								Mt = e.buttonsByGamepad.has(se);
							if (Je.pressed) {
								if (te.buttonState.down.has(se)) {
									e.events.trigger("gamepadButtonDown", se, f);
									continue;
								}
								(e.lastInputDevice = "gamepad"),
									Mt &&
										e.buttonsByGamepad.get(se)?.forEach((Re) => {
											e.buttonState.press(Re),
												e.events.trigger("buttonPress", Re);
										}),
									e.mergedGamepadState.buttonState.press(se),
									te.buttonState.press(se),
									e.events.trigger("gamepadButtonPress", se, f);
							} else
								te.buttonState.down.has(se) &&
									(Mt &&
										e.buttonsByGamepad.get(se)?.forEach((Re) => {
											e.buttonState.release(Re),
												e.events.trigger("buttonRelease", Re);
										}),
									e.mergedGamepadState.buttonState.release(se),
									te.buttonState.release(se),
									e.events.trigger("gamepadButtonRelease", se, f));
						}
						for (let Ae in B.sticks) {
							let se = B.sticks[Ae];
							if (!se) continue;
							let Je = new E(T.axes[se.x], T.axes[se.y]);
							te.stickState.set(Ae, Je),
								e.mergedGamepadState.stickState.set(Ae, Je),
								e.events.trigger("gamepadStick", Ae, Je, f);
						}
					}
				}
			}
			let Me = {},
				gr = {},
				Cn = {},
				wo = t.pixelDensity || 1;
			Me.mousemove = (f) => {
				let T = Vs(new E(f.offsetX, f.offsetY)),
					P = new E(f.movementX, f.movementY);
				if (y()) {
					let B = e.canvas.width / wo,
						te = e.canvas.height / wo,
						Ae = window.innerWidth,
						se = window.innerHeight,
						Je = Ae / se,
						Mt = B / te;
					if (Je > Mt) {
						let Re = se / te,
							br = (Ae - B * Re) / 2;
						(T.x = Se(f.offsetX - br, 0, B * Re, 0, B)),
							(T.y = Se(f.offsetY, 0, te * Re, 0, te));
					} else {
						let Re = Ae / B,
							br = (se - te * Re) / 2;
						(T.x = Se(f.offsetX, 0, B * Re, 0, B)),
							(T.y = Se(f.offsetY - br, 0, te * Re, 0, te));
					}
				}
				e.events.onOnce("input", () => {
					(e.isMouseMoved = !0),
						(e.mousePos = T),
						(e.mouseDeltaPos = P),
						e.events.trigger("mouseMove");
				});
			};
			let Co = ["left", "middle", "right", "back", "forward"];
			(Me.mousedown = (f) => {
				e.events.onOnce("input", () => {
					let T = Co[f.button];
					T &&
						((e.lastInputDevice = "mouse"),
						e.buttonsByMouse.has(T) &&
							e.buttonsByMouse.get(T)?.forEach((P) => {
								e.buttonState.press(P), e.events.trigger("buttonPress", P);
							}),
						e.mouseState.press(T),
						e.events.trigger("mousePress", T));
				});
			}),
				(Me.mouseup = (f) => {
					e.events.onOnce("input", () => {
						let T = Co[f.button];
						T &&
							(e.buttonsByMouse.has(T) &&
								e.buttonsByMouse.get(T)?.forEach((P) => {
									e.buttonState.release(P),
										e.events.trigger("buttonRelease", P);
								}),
							e.mouseState.release(T),
							e.events.trigger("mouseRelease", T));
					});
				});
			let tu = new Set([
					" ",
					"ArrowLeft",
					"ArrowRight",
					"ArrowUp",
					"ArrowDown",
					"Tab",
				]),
				Eo = {
					ArrowLeft: "left",
					ArrowRight: "right",
					ArrowUp: "up",
					ArrowDown: "down",
					" ": "space",
				};
			(Me.keydown = (f) => {
				tu.has(f.key) && f.preventDefault(),
					e.events.onOnce("input", () => {
						let T = Eo[f.key] || f.key.toLowerCase(),
							P = f.code;
						if (T === void 0) throw new Error(`Unknown key: ${f.key}`);
						T.length === 1
							? (e.events.trigger("charInput", T), e.charInputted.push(T))
							: T === "space" &&
							  (e.events.trigger("charInput", " "), e.charInputted.push(" ")),
							f.repeat
								? (e.keyState.pressRepeat(T),
								  e.events.trigger("keyPressRepeat", T))
								: ((e.lastInputDevice = "keyboard"),
								  e.buttonsByKey.has(T) &&
										e.buttonsByKey.get(T)?.forEach((B) => {
											e.buttonState.press(B),
												e.events.trigger("buttonPress", B);
										}),
								  e.buttonsByKeyCode.has(P) &&
										e.buttonsByKeyCode.get(P)?.forEach((B) => {
											e.buttonState.press(B),
												e.events.trigger("buttonPress", B);
										}),
								  e.keyState.press(T),
								  e.events.trigger("keyPressRepeat", T),
								  e.events.trigger("keyPress", T));
					});
			}),
				(Me.keyup = (f) => {
					e.events.onOnce("input", () => {
						let T = Eo[f.key] || f.key.toLowerCase(),
							P = f.code;
						e.buttonsByKey.has(T) &&
							e.buttonsByKey.get(T)?.forEach((B) => {
								e.buttonState.release(B), e.events.trigger("buttonRelease", B);
							}),
							e.buttonsByKeyCode.has(P) &&
								e.buttonsByKeyCode.get(P)?.forEach((B) => {
									e.buttonState.release(B),
										e.events.trigger("buttonRelease", B);
								}),
							e.keyState.release(T),
							e.events.trigger("keyRelease", T);
					});
				}),
				(Me.touchstart = (f) => {
					f.preventDefault(),
						e.events.onOnce("input", () => {
							let T = [...f.changedTouches],
								P = e.canvas.getBoundingClientRect();
							t.touchToMouse !== !1 &&
								((e.mousePos = new E(T[0].clientX - P.x, T[0].clientY - P.y)),
								(e.lastInputDevice = "mouse"),
								e.buttonsByMouse.has("left") &&
									e.buttonsByMouse.get("left")?.forEach((B) => {
										e.buttonState.press(B), e.events.trigger("buttonPress", B);
									}),
								e.mouseState.press("left"),
								e.events.trigger("mousePress", "left")),
								T.forEach((B) => {
									e.events.trigger(
										"touchStart",
										new E(B.clientX - P.x, B.clientY - P.y),
										B
									);
								});
						});
				}),
				(Me.touchmove = (f) => {
					f.preventDefault(),
						e.events.onOnce("input", () => {
							let T = [...f.changedTouches],
								P = e.canvas.getBoundingClientRect();
							if (t.touchToMouse !== !1) {
								let B = e.mousePos;
								(e.mousePos = new E(T[0].clientX - P.x, T[0].clientY - P.y)),
									(e.mouseDeltaPos = e.mousePos.sub(B)),
									e.events.trigger("mouseMove");
							}
							T.forEach((B) => {
								e.events.trigger(
									"touchMove",
									new E(B.clientX - P.x, B.clientY - P.y),
									B
								);
							});
						});
				}),
				(Me.touchend = (f) => {
					e.events.onOnce("input", () => {
						let T = [...f.changedTouches],
							P = e.canvas.getBoundingClientRect();
						t.touchToMouse !== !1 &&
							((e.mousePos = new E(T[0].clientX - P.x, T[0].clientY - P.y)),
							(e.mouseDeltaPos = new E(0, 0)),
							e.buttonsByMouse.has("left") &&
								e.buttonsByMouse.get("left")?.forEach((B) => {
									e.buttonState.release(B),
										e.events.trigger("buttonRelease", B);
								}),
							e.mouseState.release("left"),
							e.events.trigger("mouseRelease", "left")),
							T.forEach((B) => {
								e.events.trigger(
									"touchEnd",
									new E(B.clientX - P.x, B.clientY - P.y),
									B
								);
							});
					});
				}),
				(Me.touchcancel = (f) => {
					e.events.onOnce("input", () => {
						let T = [...f.changedTouches],
							P = e.canvas.getBoundingClientRect();
						t.touchToMouse !== !1 &&
							((e.mousePos = new E(T[0].clientX - P.x, T[0].clientY - P.y)),
							e.mouseState.release("left"),
							e.events.trigger("mouseRelease", "left")),
							T.forEach((B) => {
								e.events.trigger(
									"touchEnd",
									new E(B.clientX - P.x, B.clientY - P.y),
									B
								);
							});
					});
				}),
				(Me.wheel = (f) => {
					f.preventDefault(),
						e.events.onOnce("input", () => {
							e.events.trigger("scroll", new E(f.deltaX, f.deltaY));
						});
				}),
				(Me.contextmenu = (f) => f.preventDefault()),
				(gr.visibilitychange = () => {
					document.visibilityState === "visible"
						? ((e.skipTime = !0), (e.isHidden = !1), e.events.trigger("show"))
						: ((e.isHidden = !0), e.events.trigger("hide"));
				}),
				(Cn.gamepadconnected = (f) => {
					let T = vo(f.gamepad);
					e.events.onOnce("input", () => {
						e.events.trigger("gamepadConnect", T);
					});
				}),
				(Cn.gamepaddisconnected = (f) => {
					let T = qt().filter((P) => P.index === f.gamepad.index)[0];
					Za(f.gamepad),
						e.events.onOnce("input", () => {
							e.events.trigger("gamepadDisconnect", T);
						});
				});
			for (let [f, T] of Object.entries(Me)) e.canvas.addEventListener(f, T);
			for (let [f, T] of Object.entries(gr)) document.addEventListener(f, T);
			for (let [f, T] of Object.entries(Cn)) window.addEventListener(f, T);
			let To = new ResizeObserver((f) => {
				for (let T of f)
					if (T.target === e.canvas) {
						if (
							e.lastWidth === e.canvas.offsetWidth &&
							e.lastHeight === e.canvas.offsetHeight
						)
							return;
						(e.lastWidth = e.canvas.offsetWidth),
							(e.lastHeight = e.canvas.offsetHeight),
							e.events.onOnce("input", () => {
								e.events.trigger("resize");
							});
					}
			});
			return (
				To.observe(e.canvas),
				{
					state: e,
					dt: n,
					fixedDt: r,
					restDt: o,
					time: i,
					run: A,
					canvas: e.canvas,
					fps: m,
					numFrames: u,
					quit: O,
					isHidden: s,
					setFullscreen: g,
					isFullscreen: y,
					setCursor: p,
					screenshot: c,
					getGamepads: qt,
					getCursor: b,
					setCursorLocked: l,
					isCursorLocked: h,
					isTouchscreen: R,
					mousePos: V,
					mouseDeltaPos: x,
					isKeyDown: U,
					isKeyPressed: D,
					isKeyPressedRepeat: L,
					isKeyReleased: H,
					isMouseDown: S,
					isMousePressed: w,
					isMouseReleased: G,
					isMouseMoved: M,
					isGamepadButtonPressed: Y,
					isGamepadButtonDown: _,
					isGamepadButtonReleased: K,
					getGamepadStick: Xe,
					isButtonPressed: J,
					isButtonDown: $,
					isButtonReleased: Z,
					setButton: k,
					getButton: Ee,
					pressButton: ht,
					releaseButton: Pt,
					charInputted: ut,
					onResize: Ut,
					onKeyDown: bn,
					onKeyPress: yn,
					onKeyPressRepeat: lr,
					onKeyRelease: mr,
					onMouseDown: Gt,
					onMousePress: $e,
					onMouseRelease: xn,
					onMouseMove: F,
					onCharInput: N,
					onTouchStart: z,
					onTouchMove: oe,
					onTouchEnd: ye,
					onScroll: Q,
					onHide: ve,
					onShow: Ht,
					onGamepadButtonDown: pr,
					onGamepadButtonPress: at,
					onGamepadButtonRelease: dr,
					onGamepadStick: fr,
					onGamepadConnect: hr,
					onGamepadDisconnect: vn,
					onButtonPress: Ie,
					onButtonDown: zt,
					onButtonRelease: Qe,
					getLastInputDeviceType: Ps,
					events: e.events,
				}
			);
		};
	function ee() {
		return a.app.dt();
	}
	function sn() {
		return a.app.fixedDt();
	}
	function an() {
		return a.app.restDt();
	}
	var zu = new E(-1, -1),
		Wu = new E(0, -1),
		Yu = new E(1, -1),
		$u = new E(-1, 0),
		Xu = new E(0, 0),
		Qu = new E(1, 0),
		Ju = new E(-1, 1),
		Zu = new E(0, 1),
		ec = new E(1, 1);
	function _e(t) {
		switch (t) {
			case "topleft":
				return zu;
			case "top":
				return Wu;
			case "topright":
				return Yu;
			case "left":
				return $u;
			case "center":
				return Xu;
			case "right":
				return Qu;
			case "botleft":
				return Ju;
			case "bot":
				return Zu;
			case "botright":
				return ec;
			default:
				return t;
		}
	}
	function Ds(t) {
		switch (t) {
			case "left":
				return 0;
			case "center":
				return 0.5;
			case "right":
				return 1;
			default:
				return 0;
		}
	}
	function Bs(t) {
		return t.createBuffer(1, 1, 44100);
	}
	var jn = 2.5949095,
		Fs = 1.70158 + 1,
		Ls = (2 * Math.PI) / 3,
		js = (2 * Math.PI) / 4.5,
		In = {
			linear: (t) => t,
			easeInSine: (t) => 1 - Math.cos((t * Math.PI) / 2),
			easeOutSine: (t) => Math.sin((t * Math.PI) / 2),
			easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
			easeInQuad: (t) => t * t,
			easeOutQuad: (t) => 1 - (1 - t) * (1 - t),
			easeInOutQuad: (t) =>
				t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
			easeInCubic: (t) => t * t * t,
			easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
			easeInOutCubic: (t) =>
				t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
			easeInQuart: (t) => t * t * t * t,
			easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
			easeInOutQuart: (t) =>
				t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
			easeInQuint: (t) => t * t * t * t * t,
			easeOutQuint: (t) => 1 - Math.pow(1 - t, 5),
			easeInOutQuint: (t) =>
				t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2,
			easeInExpo: (t) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10)),
			easeOutExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
			easeInOutExpo: (t) =>
				t === 0
					? 0
					: t === 1
					? 1
					: t < 0.5
					? Math.pow(2, 20 * t - 10) / 2
					: (2 - Math.pow(2, -20 * t + 10)) / 2,
			easeInCirc: (t) => 1 - Math.sqrt(1 - Math.pow(t, 2)),
			easeOutCirc: (t) => Math.sqrt(1 - Math.pow(t - 1, 2)),
			easeInOutCirc: (t) =>
				t < 0.5
					? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
					: (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2,
			easeInBack: (t) => Fs * t * t * t - 1.70158 * t * t,
			easeOutBack: (t) =>
				1 + Fs * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2),
			easeInOutBack: (t) =>
				t < 0.5
					? (Math.pow(2 * t, 2) * ((jn + 1) * 2 * t - jn)) / 2
					: (Math.pow(2 * t - 2, 2) * ((jn + 1) * (t * 2 - 2) + jn) + 2) / 2,
			easeInElastic: (t) =>
				t === 0
					? 0
					: t === 1
					? 1
					: -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * Ls),
			easeOutElastic: (t) =>
				t === 0
					? 0
					: t === 1
					? 1
					: Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * Ls) + 1,
			easeInOutElastic: (t) =>
				t === 0
					? 0
					: t === 1
					? 1
					: t < 0.5
					? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * js)) / 2
					: (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * js)) / 2 +
					  1,
			easeInBounce: (t) => 1 - In.easeOutBounce(1 - t),
			easeOutBounce: (t) =>
				t < 1 / 2.75
					? 7.5625 * t * t
					: t < 2 / 2.75
					? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
					: t < 2.5 / 2.75
					? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
					: 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375,
			easeInOutBounce: (t) =>
				t < 0.5
					? (1 - In.easeOutBounce(1 - 2 * t)) / 2
					: (1 + In.easeOutBounce(2 * t - 1)) / 2,
		},
		tt = In;
	function tc(t, e, n) {
		let r = [],
			o = e;
		for (r.push(o); o !== t; ) {
			if (((o = n.get(o)), o == null)) return null;
			r.push(o);
		}
		return r.reverse();
	}
	function Lr(t, e, n) {
		let r = new jt((i, m) => i.cost < m.cost);
		r.insert({ cost: 0, node: e });
		let o = new Map();
		o.set(e, e);
		let s = new Map();
		for (s.set(e, 0); r.length !== 0; ) {
			let i = r.remove()?.node;
			if (i === n) break;
			let m = t.getNeighbours(i);
			for (let u of m) {
				let c = (s.get(i) || 0) + t.getCost(i, u) + t.getHeuristic(u, n);
				(!s.has(u) || c < s.get(u)) &&
					(s.set(u, c), r.insert({ cost: c, node: u }), o.set(u, i));
			}
		}
		return tc(e, n, o);
	}
	var jr = class {
			a;
			b;
			polygon;
			constructor(e, n, r) {
				(this.a = e), (this.b = n), (this.polygon = new WeakRef(r));
			}
			isLeft(e, n) {
				return (
					(this.b.x - this.a.x) * (n - this.a.y) -
					(e - this.a.x) * (this.b.y - this.a.y)
				);
			}
			get middle() {
				return this.a.add(this.b).scale(0.5);
			}
		},
		Ir = class {
			_edges;
			_centroid;
			_id;
			constructor(e) {
				this._id = e;
			}
			get id() {
				return this._id;
			}
			set edges(e) {
				this._edges = e;
				let n = 0,
					r = 0,
					o = 0;
				for (let s of this._edges) {
					s.polygon = new WeakRef(this);
					let i = s.a.x * s.b.y - s.a.y * s.b.x;
					(n += (s.a.x + s.b.x) * i), (r += (s.a.y + s.b.y) * i), (o += i);
				}
				(o /= 2), (this._centroid = v(n / (6 * o), r / (6 * o)));
			}
			get edges() {
				return this._edges;
			}
			get centroid() {
				return this._centroid;
			}
			contains(e) {
				let n = !1;
				for (let r of this.edges)
					r.b.y > e.y != r.a.y > e.y &&
						e.x < ((r.a.x - r.b.x) * (e.y - r.b.y)) / (r.a.y - r.b.y) + r.b.x &&
						(n = !n);
				return n;
			}
		},
		Kn = class {
			_polygons;
			_pointCache;
			_edgeCache;
			constructor() {
				(this._polygons = []), (this._pointCache = {}), (this._edgeCache = {});
			}
			_addPoint(e) {
				let n = this._pointCache[`${e.x}_${e.y}`];
				return (
					n || ((n = e.clone()), (this._pointCache[`${e.x}_${e.y}`] = n), n)
				);
			}
			_addEdge(e) {
				let n = `${e.a.x}_${e.a.y}-${e.b.x}_${e.b.y}`;
				return (this._edgeCache[n] = e), e;
			}
			_findEdge(e, n) {
				let r = `${e.x}_${e.y}-${n.x}_${n.y}`;
				return this._edgeCache[r];
			}
			_findCommonEdge(e, n) {
				for (let r of e.edges) {
					let o = this._findEdge(r.b, r.a);
					if (o && o.polygon.deref().id === n.id) return o;
				}
				return null;
			}
			addPolygon(e) {
				let n = new Ir(this._polygons.length),
					r = e.map((o, s) => new jr(o, e[(s + 1) % e.length], n));
				(n.edges = r), this._polygons.push(n);
				for (let o of n.edges) this._addEdge(o);
				return n;
			}
			addRect(e, n) {
				let r = this._addPoint(e),
					o = this._addPoint(e.add(n.x, 0)),
					s = this._addPoint(e.add(n)),
					i = this._addPoint(e.add(0, n.y));
				return this.addPolygon([r, o, s, i]);
			}
			_getLocation(e) {
				for (let n of this._polygons) if (n.contains(e)) return n;
				return null;
			}
			getNeighbours(e) {
				let n = [];
				for (let r of this._polygons[e].edges) {
					let o = this._findEdge(r.b, r.a);
					if (o) {
						let s = o.polygon.deref();
						s && n.push(s.id);
					}
				}
				return n;
			}
			getCost(e, n) {
				return 1;
			}
			getHeuristic(e, n) {
				let r = this._polygons[e],
					o = this._polygons[n],
					s = r.centroid.x - o.centroid.x,
					i = r.centroid.y - o.centroid.y;
				return Math.sqrt(s * s + i * i);
			}
			getPath(e, n) {
				return e === void 0 || n === void 0
					? []
					: e === n
					? [e, n]
					: Lr(this, e, n);
			}
			getWaypointPath(e, n, r) {
				let o = r?.type || "centroids",
					s = this._getLocation(e),
					i = this._getLocation(n);
				if (s === void 0 || i === void 0) return [];
				let m = this.getPath(s.id, i.id);
				if (!m) return [];
				if (o === "edges") {
					let u = [];
					for (let c = 1; c < m.length; c++) {
						let p = this._polygons[m[c - 1]],
							b = this._polygons[m[c]],
							l = this._findCommonEdge(p, b);
						u.push(l.middle.add(b.centroid.sub(l.middle).unit().scale(4)));
					}
					return [e, ...u, n];
				} else
					return [
						e,
						...m.slice(1, -1).map((u) => this._polygons[u].centroid),
						n,
					];
			}
		};
	function pt(t) {
		let e = new fe();
		return (
			t.pos && e.translate(t.pos),
			t.scale && e.scale(t.scale),
			t.angle && e.rotate(t.angle),
			t.parent ? e.mult(t.parent.transform) : e
		);
	}
	function Is(t) {
		return new E((t.x / ie()) * 2 - 1, (-t.y / ue()) * 2 + 1);
	}
	function vt(t, e, n, r, o, s = 1) {
		(r = ae(r % 360)), (o = ae(o % 360)), o <= r && (o += Math.PI * 2);
		let i = [],
			m = Math.ceil(((o - r) / ae(8)) * s),
			u = (o - r) / m,
			c = v(Math.cos(r), Math.sin(r)),
			p = v(Math.cos(u), Math.sin(u));
		for (let b = 0; b <= m; b++)
			i.push(t.add(e * c.x, n * c.y)),
				(c = v(c.x * p.x - c.y * p.y, c.x * p.y + c.y * p.x));
		return i;
	}
	function Ks(...t) {
		let e = I(...t),
			n = t[3] ?? 1;
		(a.gfx.bgColor = e),
			(a.gfx.bgAlpha = n),
			a.gfx.ggl.gl.clearColor(e.r / 255, e.g / 255, e.b / 255, n);
	}
	function ks() {
		return a.gfx.bgColor?.clone?.() ?? null;
	}
	function X(...t) {
		if (t[0] === void 0) return;
		let e = v(...t);
		(e.x === 0 && e.y === 0) || a.gfx.transform.translate(e);
	}
	function ge() {
		a.gfx.transformStack.push(a.gfx.transform.clone());
	}
	function _s(t) {
		a.gfx.transform = t.clone();
	}
	function nt(...t) {
		if (t[0] === void 0) return;
		let e = v(...t);
		(e.x === 1 && e.y === 1) || a.gfx.transform.scale(e);
	}
	function Ye(t) {
		t && a.gfx.transform.rotate(t);
	}
	function me() {
		a.gfx.transformStack.length > 0 &&
			(a.gfx.transform = a.gfx.transformStack.pop());
	}
	function Ce() {
		a.gfx.renderer.flush();
	}
	function ie() {
		return a.gfx.width;
	}
	function ue() {
		return a.gfx.height;
	}
	function kn() {
		return (
			(a.gfx.viewport.width + a.gfx.viewport.height) /
			(a.gfx.width + a.gfx.height)
		);
	}
	function wt() {
		return v(ie() / 2, ue() / 2);
	}
	var _n = class {
		lastTextureId = 0;
		textures = [];
		bigTextures = [];
		texturesPosition = new Map();
		canvas;
		c2d;
		x = 0;
		y = 0;
		curHeight = 0;
		gfx;
		padding;
		constructor(e, n, r, o) {
			(this.gfx = e),
				(this.canvas = document.createElement("canvas")),
				(this.canvas.width = n),
				(this.canvas.height = r),
				(this.textures = [Ve.fromImage(e, this.canvas)]),
				(this.bigTextures = []),
				(this.padding = o);
			let s = this.canvas.getContext("2d");
			if (!s) throw new Error("Failed to get 2d context");
			this.c2d = s;
		}
		add_single(e) {
			let n = Ve.fromImage(this.gfx, e);
			return this.bigTextures.push(n), [n, new q(0, 0, 1, 1), 0];
		}
		add(e) {
			let n = e.width + this.padding * 2,
				r = e.height + this.padding * 2;
			(n > this.canvas.width || r > this.canvas.height) && this.add_single(e),
				this.x + n > this.canvas.width &&
					((this.x = 0), (this.y += this.curHeight), (this.curHeight = 0)),
				this.y + r > this.canvas.height &&
					(this.c2d.clearRect(0, 0, this.canvas.width, this.canvas.height),
					this.textures.push(Ve.fromImage(this.gfx, this.canvas)),
					(this.x = 0),
					(this.y = 0),
					(this.curHeight = 0));
			let o = this.textures[this.textures.length - 1],
				s = new E(this.x + this.padding, this.y + this.padding);
			return (
				(this.x += n),
				r > this.curHeight && (this.curHeight = r),
				e instanceof ImageData
					? this.c2d.putImageData(e, s.x, s.y)
					: this.c2d.drawImage(e, s.x, s.y),
				o.update(this.canvas),
				this.texturesPosition.set(this.lastTextureId, {
					position: s,
					size: new E(e.width, e.height),
					texture: o,
				}),
				this.lastTextureId++,
				[
					o,
					new q(
						s.x / this.canvas.width,
						s.y / this.canvas.height,
						e.width / this.canvas.width,
						e.height / this.canvas.height
					),
					this.lastTextureId - 1,
				]
			);
		}
		free() {
			for (let e of this.textures) e.free();
			for (let e of this.bigTextures) e.free();
		}
	};
	function pe(t) {
		return typeof t != "string" || Bn(t) ? t : a.assets.urlPrefix + t;
	}
	var ce = class t {
			loaded = !1;
			data = null;
			error = null;
			onLoadEvents = new re();
			onErrorEvents = new re();
			onFinishEvents = new re();
			constructor(e) {
				e.then((n) => {
					(this.loaded = !0), (this.data = n), this.onLoadEvents.trigger(n);
				})
					.catch((n) => {
						if (((this.error = n), this.onErrorEvents.numListeners() > 0))
							this.onErrorEvents.trigger(n);
						else throw n;
					})
					.finally(() => {
						this.onFinishEvents.trigger(), (this.loaded = !0);
					});
			}
			static loaded(e) {
				let n = new t(Promise.resolve(e));
				return (n.data = e), (n.loaded = !0), n;
			}
			onLoad(e) {
				return (
					this.loaded && this.data ? e(this.data) : this.onLoadEvents.add(e),
					this
				);
			}
			onError(e) {
				return (
					this.loaded && this.error ? e(this.error) : this.onErrorEvents.add(e),
					this
				);
			}
			onFinish(e) {
				return this.loaded ? e() : this.onFinishEvents.add(e), this;
			}
			then(e) {
				return this.onLoad(e);
			}
			catch(e) {
				return this.onError(e);
			}
			finally(e) {
				return this.onFinish(e);
			}
		},
		dt = class {
			assets = new Map();
			lastUID = 0;
			add(e, n) {
				let r = e ?? this.lastUID++ + "",
					o = new ce(n);
				return this.assets.set(r, o), o;
			}
			addLoaded(e, n) {
				let r = e ?? this.lastUID++ + "",
					o = ce.loaded(n);
				return this.assets.set(r, o), o;
			}
			get(e) {
				return this.assets.get(e);
			}
			progress() {
				if (this.assets.size === 0) return 1;
				let e = 0;
				return (
					this.assets.forEach((n) => {
						n.loaded && e++;
					}),
					e / this.assets.size
				);
			}
			getFailedAssets() {
				return Array.from(this.assets.keys())
					.filter((e) => this.assets.get(e).error !== null)
					.map((e) => [e, this.assets.get(e)]);
			}
		};
	function _r(t) {
		return fetch(t).then((e) => {
			if (!e.ok) throw new Error(`Failed to fetch "${t}"`);
			return e;
		});
	}
	function Ct(t) {
		return _r(t).then((e) => e.json());
	}
	function Ns(t) {
		return _r(t).then((e) => e.text());
	}
	function Us(t) {
		return _r(t).then((e) => e.arrayBuffer());
	}
	function Hs(t) {
		return t !== void 0 && (a.assets.urlPrefix = t), a.assets.urlPrefix;
	}
	function qs(t, e) {
		return a.assets.custom.add(t, Ct(pe(e)));
	}
	function Et(t) {
		let e = new Image();
		return (
			(e.crossOrigin = "anonymous"),
			(e.src = t),
			new Promise((n, r) => {
				(e.onload = () => n(e)),
					(e.onerror = () => r(new Error(`Failed to load image from "${t}"`)));
			})
		);
	}
	function Be() {
		let t = [
			a.assets.sprites,
			a.assets.sounds,
			a.assets.shaders,
			a.assets.fonts,
			a.assets.bitmapFonts,
			a.assets.custom,
		];
		return t.reduce((e, n) => e + n.progress(), 0) / t.length;
	}
	function Nn() {
		return [
			a.assets.sprites,
			a.assets.sounds,
			a.assets.shaders,
			a.assets.fonts,
			a.assets.bitmapFonts,
			a.assets.custom,
		].reduce((e, n) => e.concat(n.getFailedAssets()), []);
	}
	function zs(t) {
		return a.assets.custom.get(t) ?? null;
	}
	function un(t) {
		return a.assets.custom.add(null, t);
	}
	var Ws = (t, e) => ({
		urlPrefix: "",
		sprites: new dt(),
		fonts: new dt(),
		bitmapFonts: new dt(),
		sounds: new dt(),
		shaders: new dt(),
		custom: new dt(),
		music: {},
		packer: new _n(t, 2048, 2048, e),
		loaded: !1,
	});
	var Ys =
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA1CAYAAADyMeOEAAAAAXNSR0IArs4c6QAAAoVJREFUaIHdm7txwkAQhheGAqACiCHzOKQDQrqgILpwSAeEDBnEUAF0gCMxZ7G72qce/mec2Lpf9+3unaS78wgSNZ8uX5729+d1FNWXUuGmXlBOUUEIMckEpeQJgBu6C+BSFngztBR2vd+ovY+7g+p6LbgaWgJrAeUkDYIUXgXdBBwNi6kpABJwMTQH3AZsXRR8GHTfgEth8E3gjdAUcNewpbTgY85sCMCUuOokozE0YM0YRzM9NGAAXd8+omAF5h4lnmBRvpSnZHyLoLEbaN+aKB9KWv/KWw0tAbbANnlG+UvB2dm77NxxdwgBpjrF/d7rW9cbmpvio2A5z8iAYpVU8pGZlo6/2+MSco2lHfd3rv9jAP038e1xef9o2mjvYb2OqpqKE81028/jeietlSEVO5FRWsxWsJit1G3aFpW8iWe5RwpiCZAk25QvV6nz6fIlynRGuTd5WqpJ4guAlDfVKBK87hXljflgv1ON6fV+4+5gVlA17SfeG0heKqQd4l4jI/wrmaA9N9R4ar+wpHJDZyrrfcH0nB66PqAzPi76pn+faSyJk/vzOorYhGurQrzj/P68jtBMawHaHBIR9xoD5O34dy0qQOSYHvqExq2TpT2nf76+w7y251OYF0CRaU+J920TwLUa6inx6OxE6g80lu2ux7Y2eJLF/rCXE6zEPdnenk9o+4ih9AEdnW2q81HXl5LuU6OTl2fXUhqganbXAGq3g6jJOWV/OnoesO6YqqEB/GdNsjf7uHtwj2DzmRNpp7iOZfm6D9oAxB6Yi1gC4oIYeo4MIPdopEQRB+cAko5J1tW386HpB2Kz1eop4Epdwls/kgZ1sh8gZsEjdcWkr//D8Qu3Z3l5Nl1NtAAAAABJRU5ErkJggg==";
	var Fe = class t {
		tex;
		frames = [new q(0, 0, 1, 1)];
		anims = {};
		slice9 = null;
		constructor(e, n, r = {}, o = null) {
			(this.tex = e),
				n && (this.frames = n),
				(this.anims = r),
				(this.slice9 = o);
		}
		get width() {
			return this.tex.width * this.frames[0].w;
		}
		get height() {
			return this.tex.height * this.frames[0].h;
		}
		static from(e, n = {}) {
			return typeof e == "string"
				? t.fromURL(e, n)
				: Promise.resolve(t.fromImage(e, n));
		}
		static fromImage(e, n = {}) {
			let [r, o] = n.singular
					? a.assets.packer.add_single(e)
					: a.assets.packer.add(e),
				s = n.frames
					? n.frames.map(
							(i) =>
								new q(o.x + i.x * o.w, o.y + i.y * o.h, i.w * o.w, i.h * o.h)
					  )
					: Ur(n.sliceX || 1, n.sliceY || 1, o.x, o.y, o.w, o.h);
			return new t(r, s, n.anims, n.slice9);
		}
		static fromURL(e, n = {}) {
			return Et(e).then((r) => t.fromImage(r, n));
		}
	};
	function It(t) {
		if (typeof t == "string") {
			let e = Nr(t);
			if (e) return e;
			if (Be() < 1) return null;
			throw new Error(`Sprite not found: ${t}`);
		} else {
			if (t instanceof Fe) return ce.loaded(t);
			if (t instanceof ce) return t;
			throw new Error(`Invalid sprite: ${t}`);
		}
	}
	function Nr(t) {
		return a.assets.sprites.get(t) ?? null;
	}
	function Tt(t, e, n = { sliceX: 1, sliceY: 1, anims: {} }) {
		return (
			(e = pe(e)),
			Array.isArray(e)
				? e.some((r) => typeof r == "string")
					? a.assets.sprites.add(
							t,
							Promise.all(
								e.map((r) =>
									typeof r == "string" ? Et(r) : Promise.resolve(r)
								)
							).then((r) => $s(r, n))
					  )
					: a.assets.sprites.addLoaded(t, $s(e, n))
				: typeof e == "string"
				? a.assets.sprites.add(t, Fe.from(e, n))
				: a.assets.sprites.addLoaded(t, Fe.fromImage(e, n))
		);
	}
	function Ur(t = 1, e = 1, n = 0, r = 0, o = 1, s = 1) {
		let i = [],
			m = o / t,
			u = s / e;
		for (let c = 0; c < e; c++)
			for (let p = 0; p < t; p++) i.push(new q(n + p * m, r + c * u, m, u));
		return i;
	}
	function $s(t, e = {}) {
		let n = document.createElement("canvas"),
			r = t[0].width,
			o = t[0].height;
		(n.width = r * t.length), (n.height = o);
		let s = n.getContext("2d");
		if (!s) throw new Error("Failed to create canvas context");
		t.forEach((m, u) => {
			m instanceof ImageData
				? s.putImageData(m, u * r, 0)
				: s.drawImage(m, u * r, 0);
		});
		let i = s.getImageData(0, 0, t.length * r, o);
		return Fe.fromImage(i, { ...e, sliceX: t.length, sliceY: 1 });
	}
	function Xs(t = "bean") {
		return Tt(t, Ys);
	}
	function Qs(t, e, n) {
		(e = pe(e)),
			(n = pe(n)),
			typeof e == "string" && !n && (n = vs(e) + ".json");
		let r = typeof n == "string" ? Ct(n) : Promise.resolve(n);
		return a.assets.sprites.add(
			t,
			r.then((o) => {
				let s = o.meta.size,
					i = o.frames.map(
						(u) =>
							new q(
								u.frame.x / s.w,
								u.frame.y / s.h,
								u.frame.w / s.w,
								u.frame.h / s.h
							)
					),
					m = {};
				for (let u of o.meta.frameTags)
					u.from === u.to
						? (m[u.name] = u.from)
						: (m[u.name] = {
								from: u.from,
								to: u.to,
								speed: 10,
								loop: !0,
								pingpong: u.direction === "pingpong",
						  });
				return Fe.from(e, { frames: i, anims: m });
			})
		);
	}
	var Ot = class {
		fontface;
		filter = Jt;
		outline = null;
		size = 64;
		constructor(e, n = {}) {
			if (
				((this.fontface = e),
				(this.filter = n.filter ?? Jt),
				(this.size = n.size ?? 64),
				this.size > 256)
			)
				throw new Error(`Max font size: ${256}`);
			n.outline &&
				((this.outline = { width: 1, color: I(0, 0, 0) }),
				typeof n.outline == "number"
					? (this.outline.width = n.outline)
					: typeof n.outline == "object" &&
					  (n.outline.width && (this.outline.width = n.outline.width),
					  n.outline.color && (this.outline.color = n.outline.color)));
		}
	};
	function Hr(t) {
		if (!t) return Hr(a.globalOpt.font ?? ss);
		if (typeof t == "string") {
			let e = Un(t),
				n = qr(t);
			if (e) return e.data ?? e;
			if (n) return n.data ?? n;
			if (document.fonts.check(`${64}px ${t}`)) return t;
			if (Be() < 1) return null;
			throw new Error(`Font not found: ${t}`);
		} else if (t instanceof ce) return t.data ? t.data : t;
		return t;
	}
	function qr(t) {
		return a.assets.fonts.get(t) ?? null;
	}
	function Js(t, e, n = {}) {
		let r = pe(e),
			o = new FontFace(t, typeof e == "string" ? `url(${r})` : r);
		return (
			document.fonts.add(o),
			a.assets.fonts.add(
				t,
				o
					.load()
					.catch((s) => {
						throw new Error(`Failed to load font from "${r}": ${s}`);
					})
					.then((s) => new Ot(s, n))
			)
		);
	}
	function Zs(t, e, n, r) {
		let o = t.width / e,
			s = {},
			i = r.split("").entries();
		for (let [m, u] of i)
			s[u] = new q((m % o) * e, Math.floor(m / o) * n, e, n);
		return { tex: t, map: s, size: n };
	}
	function Un(t) {
		return a.assets.bitmapFonts.get(t) ?? null;
	}
	function ei(t, e, n, r, o = {}) {
		let s = pe(e);
		return a.assets.bitmapFonts.add(
			t,
			Et(s).then((i) => Zs(Ve.fromImage(a.gfx.ggl, i, o), n, r, o.chars ?? Mn))
		);
	}
	function ti(t, e) {
		return (
			(e = pe(e)),
			a.assets.sprites.add(
				t,
				new Promise(async (n) => {
					let r = typeof e == "string" ? await Ct(e) : e,
						o = await Promise.all(r.frames.map(Et)),
						s = document.createElement("canvas");
					(s.width = r.width), (s.height = r.height * r.frames.length);
					let i = s.getContext("2d");
					if (!i) throw new Error("Failed to create canvas context");
					o.forEach((u, c) => {
						i.drawImage(u, 0, c * r.height);
					});
					let m = await Tt(null, s, {
						sliceY: r.frames.length,
						anims: r.anims,
					});
					n(m);
				})
			)
		);
	}
	var zr = class {
		ctx;
		glProgram;
		constructor(e, n, r, o) {
			(this.ctx = e), e.onDestroy(() => this.free());
			let s = e.gl,
				i = s.createShader(s.VERTEX_SHADER),
				m = s.createShader(s.FRAGMENT_SHADER);
			if (!i || !m) throw new Error("Failed to create shader");
			s.shaderSource(i, n),
				s.shaderSource(m, r),
				s.compileShader(i),
				s.compileShader(m);
			let u = s.createProgram();
			if (
				((this.glProgram = u),
				s.attachShader(u, i),
				s.attachShader(u, m),
				o.forEach((c, p) => s.bindAttribLocation(u, p, c)),
				s.linkProgram(u),
				!s.getProgramParameter(u, s.LINK_STATUS))
			) {
				let c = s.getShaderInfoLog(i);
				if (c) throw new Error("VERTEX SHADER " + c);
				let p = s.getShaderInfoLog(m);
				if (p) throw new Error("FRAGMENT SHADER " + p);
			}
			s.deleteShader(i), s.deleteShader(m);
		}
		bind() {
			this.ctx.pushProgram(this.glProgram);
		}
		unbind() {
			this.ctx.popProgram();
		}
		send(e) {
			let n = this.ctx.gl;
			for (let r in e) {
				let o = e[r],
					s = n.getUniformLocation(this.glProgram, r);
				if (typeof o == "number") n.uniform1f(s, o);
				else if (o instanceof fe)
					n.uniformMatrix4fv(s, !1, new Float32Array(o.m));
				else if (o instanceof j) n.uniform3f(s, o.r, o.g, o.b);
				else if (o instanceof E) n.uniform2f(s, o.x, o.y);
				else if (Array.isArray(o)) {
					let i = o[0];
					bs(o)
						? n.uniform1fv(s, o)
						: gs(o)
						? n.uniform2fv(s, o.map((m) => [m.x, m.y]).flat())
						: hs(o) && n.uniform3fv(s, o.map((m) => [m.r, m.g, m.b]).flat());
				} else throw new Error("Unsupported uniform data type");
			}
		}
		free() {
			this.ctx.gl.deleteProgram(this.glProgram);
		}
	};
	function Hn(t, e = en, n = tn) {
		let r = cs.replace("{{user}}", e ?? en),
			o = ls.replace("{{user}}", n ?? tn);
		try {
			return new zr(
				t,
				r,
				o,
				Zt.map((s) => s.name)
			);
		} catch (s) {
			let m = /(?<type>^\w+) SHADER ERROR: 0:(?<line>\d+): (?<msg>.+)/,
				u = Cs(s).match(m);
			if (!u?.groups) throw s;
			let c = Number(u.groups.line) - 14,
				p = u.groups.msg.trim(),
				b = u.groups.type.toLowerCase();
			throw new Error(`${b} shader line ${c}: ${p}`);
		}
	}
	function ni(t) {
		if (!t) return a.gfx.defShader;
		if (typeof t == "string") {
			let e = Wr(t);
			if (e) return e.data ?? e;
			if (Be() < 1) return null;
			throw new Error(`Shader not found: ${t}`);
		} else if (t instanceof ce) return t.data ? t.data : t;
		return t;
	}
	function Wr(t) {
		return a.assets.shaders.get(t) ?? null;
	}
	function ri(t, e, n) {
		return a.assets.shaders.addLoaded(t, Hn(a.gfx.ggl, e, n));
	}
	function oi(t, e, n) {
		(e = pe(e)), (n = pe(n));
		let r = (s) => (s ? Ns(s) : Promise.resolve(null)),
			o = Promise.all([r(e), r(n)]).then(([s, i]) => Hn(a.gfx.ggl, s, i));
		return a.assets.shaders.add(t, o);
	}
	var rt = class t {
		buf;
		constructor(e) {
			this.buf = e;
		}
		static fromArrayBuffer(e) {
			return new Promise((n, r) => a.audio.ctx.decodeAudioData(e, n, r)).then(
				(n) => new t(n)
			);
		}
		static fromURL(e) {
			return Bn(e)
				? t.fromArrayBuffer(ys(e))
				: Us(e).then((n) => t.fromArrayBuffer(n));
		}
	};
	function si(t) {
		if (typeof t == "string") {
			let e = Yr(t);
			if (e) return e;
			if (Be() < 1) return null;
			throw new Error(`Sound not found: ${t}`);
		} else {
			if (t instanceof rt) return ce.loaded(t);
			if (t instanceof ce) return t;
			throw new Error(`Invalid sound: ${t}`);
		}
	}
	function Yr(t) {
		return a.assets.sounds.get(t) ?? null;
	}
	function ii(t, e) {
		return (
			(e = pe(e)),
			a.assets.sounds.add(
				t,
				typeof e == "string" ? rt.fromURL(e) : rt.fromArrayBuffer(e)
			)
		);
	}
	function ai(t, e) {
		let n = pe(e),
			r = new Audio(n);
		return (r.preload = "auto"), (a.assets.music[t] = n);
	}
	function $r(t, e) {
		return (
			(t = pe(t)),
			typeof e == "string"
				? un(
						new Promise((n, r) => {
							Ct(e).then((o) => {
								$r(t, o).then(n).catch(r);
							});
						})
				  )
				: un(
						Fe.from(t).then((n) => {
							let r = {};
							for (let o in e) {
								let s = e[o],
									i = n.frames[0],
									m = 2048 * i.w,
									u = 2048 * i.h,
									c = s.frames
										? s.frames.map(
												(b) =>
													new q(
														i.x + ((s.x + b.x) / m) * i.w,
														i.y + ((s.y + b.y) / u) * i.h,
														(b.w / m) * i.w,
														(b.h / u) * i.h
													)
										  )
										: Ur(
												s.sliceX || 1,
												s.sliceY || 1,
												i.x + (s.x / m) * i.w,
												i.y + (s.y / u) * i.h,
												(s.width / m) * i.w,
												(s.height / u) * i.h
										  ),
									p = new Fe(n.tex, c, s.anims);
								a.assets.sprites.addLoaded(o, p), (r[o] = p);
							}
							return r;
						})
				  )
		);
	}
	function Le(t, e, n = !1, r, o, s = {}) {
		let i = r ?? a.gfx.defTex,
			m = o ?? a.gfx.defShader,
			u = ni(m);
		if (!u || u instanceof ce) return;
		let c =
				a.gfx.fixed || n
					? a.gfx.transform
					: a.game.cam.transform.mult(a.gfx.transform),
			p = [];
		for (let b of t) {
			let l = Is(c.multVec2(b.pos));
			p.push(
				l.x,
				l.y,
				b.uv.x,
				b.uv.y,
				b.color.r / 255,
				b.color.g / 255,
				b.color.b / 255,
				b.opacity
			);
		}
		a.gfx.renderer.push(a.gfx.ggl.gl.TRIANGLES, p, e, u, i, s);
	}
	function Pe(t) {
		if (!t.pts) throw new Error('drawPolygon() requires property "pts".');
		let e = t.pts.length;
		if (!(e < 3)) {
			if (
				(ge(), X(t.pos), nt(t.scale), Ye(t.angle), X(t.offset), t.fill !== !1)
			) {
				let n = t.color ?? j.WHITE,
					r = t.pts.map((s, i) => ({
						pos: new E(s.x, s.y),
						uv: t.uv ? t.uv[i] : new E(0, 0),
						color: t.colors && t.colors[i] ? t.colors[i].mult(n) : n,
						opacity: t.opacity ?? 1,
					})),
					o;
				t.triangulate
					? (o = Gn(t.pts)
							.map((i) => i.map((m) => t.pts.indexOf(m)))
							.flat())
					: (o = [...Array(e - 2).keys()].map((s) => [0, s + 1, s + 2]).flat()),
					Le(
						r,
						t.indices ?? o,
						t.fixed,
						t.uv ? t.tex : a.gfx.defTex,
						t.shader,
						t.uniform ?? void 0
					);
			}
			t.outline &&
				Kt({
					pts: [...t.pts, t.pts[0]],
					radius: t.radius,
					width: t.outline.width,
					color: t.outline.color,
					join: t.outline.join,
					uniform: t.uniform,
					fixed: t.fixed,
					opacity: t.opacity ?? t.outline.opacity,
				}),
				me();
		}
	}
	function qn(t) {
		if (t.radiusX === void 0 || t.radiusY === void 0)
			throw new Error(
				'drawEllipse() requires properties "radiusX" and "radiusY".'
			);
		if (t.radiusX === 0 || t.radiusY === 0) return;
		let e = t.start ?? 0,
			n = t.end ?? 360,
			r = _e(t.anchor ?? "center").scale(new E(-t.radiusX, -t.radiusY)),
			o = vt(r, t.radiusX, t.radiusY, e, n, t.resolution);
		o.unshift(r);
		let s = Object.assign({}, t, {
			pts: o,
			radius: 0,
			...(t.gradient
				? {
						colors: [t.gradient[0], ...Array(o.length - 1).fill(t.gradient[1])],
				  }
				: {}),
		});
		if (n - e >= 360 && t.outline) {
			t.fill !== !1 && Pe(Object.assign({}, s, { outline: null })),
				Pe(Object.assign({}, s, { pts: o.slice(1), fill: !1 }));
			return;
		}
		Pe(s);
	}
	function Ne(t) {
		if (typeof t.radius != "number")
			throw new Error('drawCircle() requires property "radius".');
		t.radius !== 0 &&
			qn(
				Object.assign({}, t, { radiusX: t.radius, radiusY: t.radius, angle: 0 })
			);
	}
	function kt(t) {
		let { p1: e, p2: n } = t;
		if (!e || !n)
			throw new Error('drawLine() requires properties "p1" and "p2".');
		let r = t.width || 1,
			o = n
				.sub(e)
				.unit()
				.normal()
				.scale(r * 0.5),
			s = [e.sub(o), e.add(o), n.add(o), n.sub(o)].map((i) => ({
				pos: new E(i.x, i.y),
				uv: new E(0),
				color: t.color ?? j.WHITE,
				opacity: t.opacity ?? 1,
			}));
		Le(
			s,
			[0, 1, 3, 1, 2, 3],
			t.fixed,
			a.gfx.defTex,
			t.shader,
			t.uniform ?? void 0
		);
	}
	function rc(t) {
		let e = t.pts,
			n = [],
			r = (t.width || 1) * 0.5,
			o = e[0] === e[e.length - 1] || e[0].eq(e[e.length - 1]),
			s = t.pos || v(0, 0),
			i;
		o ? (i = e[0].sub(e[e.length - 2])) : (i = e[1].sub(e[0]));
		let m = i.len(),
			u = i.normal().scale(-r / m),
			c,
			p = e[0];
		if (!o)
			switch (t.cap) {
				case "square": {
					let d = i.scale(-r / m);
					n.push(p.add(d).add(u)), n.push(p.add(d).sub(u));
					break;
				}
				case "round": {
					let d = Math.max(r, 10),
						C = Math.PI / d,
						g = u.scale(-1),
						y = Math.cos(C),
						O = Math.sin(C);
					for (let A = 0; A < d; A++)
						n.push(p),
							n.push(p.sub(g)),
							(g = v(g.x * y - g.y * O, g.x * O + g.y * y));
				}
			}
		for (let d = 1; d < e.length; d++) {
			if (p === e[d] || p.eq(e[d])) continue;
			(c = p), (p = e[d]);
			let C = p.sub(c),
				g = C.len(),
				y = C.normal().scale(-r / g),
				O = i.cross(C);
			if (Math.abs(O) / (m * g) < 0.05) {
				n.push(c.add(u)),
					n.push(c.sub(u)),
					i.dot(C) < 0 && (n.push(c.sub(u)), n.push(c.add(u))),
					(i = C),
					(m = g),
					(u = y);
				continue;
			}
			let A = y.sub(u).cross(C) / O,
				R = u.add(i.scale(A));
			O > 0
				? (n.push(c.add(R)),
				  n.push(c.sub(u)),
				  n.push(c.add(R)),
				  n.push(c.sub(y)))
				: (n.push(c.add(u)),
				  n.push(c.sub(R)),
				  n.push(c.add(y)),
				  n.push(c.sub(R))),
				(i = C),
				(m = g),
				(u = y);
		}
		if (!o)
			switch ((n.push(p.add(u)), n.push(p.sub(u)), t.cap)) {
				case "square": {
					let d = i.scale(r / m);
					n.push(p.add(d).add(u)), n.push(p.add(d).sub(u));
					break;
				}
				case "round": {
					let d = Math.max(r, 10),
						C = Math.PI / d,
						g = u.scale(1),
						y = Math.cos(C),
						O = Math.sin(C);
					for (let A = 0; A < d; A++)
						(g = v(g.x * y - g.y * O, g.x * O + g.y * y)),
							n.push(p),
							n.push(p.sub(g));
				}
			}
		if (n.length < 4) return;
		let b = n.map((d) => ({
				pos: s.add(d),
				uv: v(),
				color: t.color || j.WHITE,
				opacity: t.opacity ?? 1,
			})),
			l = [],
			h = 0;
		for (let d = 0; d < n.length - 2; d += 2)
			(l[h++] = d + 1),
				(l[h++] = d),
				(l[h++] = d + 2),
				(l[h++] = d + 2),
				(l[h++] = d + 3),
				(l[h++] = d + 1);
		o &&
			((l[h++] = n.length - 1),
			(l[h++] = n.length - 2),
			(l[h++] = 0),
			(l[h++] = 0),
			(l[h++] = 1),
			(l[h++] = n.length - 1)),
			Le(b, l, t.fixed, a.gfx.defTex, t.shader, t.uniform ?? void 0);
	}
	function oc(t) {
		let e = t.pts,
			n = [],
			r = (t.width || 1) * 0.5,
			o = e[0] === e[e.length - 1] || e[0].eq(e[e.length - 1]),
			s = t.pos || v(0, 0),
			i;
		o ? (i = e[0].sub(e[e.length - 2])) : (i = e[1].sub(e[0]));
		let m = i.len(),
			u = i.normal().scale(-r / m),
			c,
			p = e[0];
		if (!o)
			switch (t.cap) {
				case "square": {
					let d = i.scale(-r / m);
					n.push(p.add(d).add(u)), n.push(p.add(d).sub(u));
					break;
				}
				case "round": {
					let d = Math.max(r, 10),
						C = Math.PI / d,
						g = u.scale(-1),
						y = Math.cos(C),
						O = Math.sin(C);
					for (let A = 0; A < d; A++)
						n.push(p),
							n.push(p.sub(g)),
							(g = v(g.x * y - g.y * O, g.x * O + g.y * y));
				}
			}
		for (let d = 1; d < e.length; d++) {
			if (p === e[d] || p.eq(e[d])) continue;
			(c = p), (p = e[d]);
			let C = p.sub(c),
				g = C.len(),
				y = C.normal().scale(-r / g),
				O = i.cross(C);
			if (Math.abs(O) / (m * g) < 0.05) {
				n.push(c.add(u)),
					n.push(c.sub(u)),
					i.dot(C) < 0 && (n.push(c.sub(u)), n.push(c.add(u))),
					(i = C),
					(m = g),
					(u = y);
				continue;
			}
			let A = y.sub(u).cross(C) / O,
				R = u.add(i.scale(A));
			if (O > 0) {
				let V = c.add(R),
					x = Math.max(r, 10),
					w = ae(u.angleBetween(y) / x),
					S = u,
					G = Math.cos(w),
					M = Math.sin(w);
				for (let D = 0; D < x; D++)
					n.push(V),
						n.push(c.sub(S)),
						(S = v(S.x * G - S.y * M, S.x * M + S.y * G));
			} else {
				let V = c.sub(R),
					x = Math.max(r, 10),
					w = ae(u.angleBetween(y) / x),
					S = u,
					G = Math.cos(w),
					M = Math.sin(w);
				for (let D = 0; D < x; D++)
					n.push(c.add(S)),
						n.push(V),
						(S = v(S.x * G - S.y * M, S.x * M + S.y * G));
			}
			(i = C), (m = g), (u = y);
		}
		if (!o)
			switch ((n.push(p.add(u)), n.push(p.sub(u)), t.cap)) {
				case "square": {
					let d = i.scale(r / m);
					n.push(p.add(d).add(u)), n.push(p.add(d).sub(u));
					break;
				}
				case "round": {
					let d = Math.max(r, 10),
						C = Math.PI / d,
						g = u.scale(1),
						y = Math.cos(C),
						O = Math.sin(C);
					for (let A = 0; A < d; A++)
						(g = v(g.x * y - g.y * O, g.x * O + g.y * y)),
							n.push(p),
							n.push(p.sub(g));
				}
			}
		if (n.length < 4) return;
		let b = n.map((d) => ({
				pos: s.add(d),
				uv: v(),
				color: t.color || j.WHITE,
				opacity: t.opacity ?? 1,
			})),
			l = [],
			h = 0;
		for (let d = 0; d < n.length - 2; d += 2)
			(l[h++] = d + 1),
				(l[h++] = d),
				(l[h++] = d + 2),
				(l[h++] = d + 2),
				(l[h++] = d + 3),
				(l[h++] = d + 1);
		o &&
			((l[h++] = n.length - 1),
			(l[h++] = n.length - 2),
			(l[h++] = 0),
			(l[h++] = 0),
			(l[h++] = 1),
			(l[h++] = n.length - 1)),
			Le(b, l, t.fixed, a.gfx.defTex, t.shader, t.uniform ?? void 0);
	}
	function sc(t) {
		let e = t.pts,
			n = [],
			r = (t.width || 1) * 0.5,
			o = e[0] === e[e.length - 1] || e[0].eq(e[e.length - 1]),
			s = t.pos || v(0, 0),
			i;
		o ? (i = e[0].sub(e[e.length - 2])) : (i = e[1].sub(e[0]));
		let m = i.len(),
			u = i.normal().scale(-r / m),
			c,
			p = e[0];
		if (!o)
			switch (t.cap) {
				case "square": {
					let d = i.scale(-r / m);
					n.push(p.add(d).add(u)), n.push(p.add(d).sub(u));
					break;
				}
				case "round": {
					let d = Math.max(r, 10),
						C = Math.PI / d,
						g = u.scale(-1),
						y = Math.cos(C),
						O = Math.sin(C);
					for (let A = 0; A < d; A++)
						n.push(p),
							n.push(p.sub(g)),
							(g = v(g.x * y - g.y * O, g.x * O + g.y * y));
				}
			}
		for (let d = 1; d < e.length; d++) {
			if (p === e[d] || p.eq(e[d])) continue;
			(c = p), (p = e[d]);
			let C = p.sub(c),
				g = C.len(),
				y = C.normal().scale(-r / g),
				O = i.cross(C);
			if (Math.abs(O) / (m * g) < 0.05) {
				n.push(c.add(u)),
					n.push(c.sub(u)),
					i.dot(C) < 0 && (n.push(c.sub(u)), n.push(c.add(u))),
					(i = C),
					(m = g),
					(u = y);
				continue;
			}
			let A = y.sub(u).cross(C) / O,
				R = u.add(i.scale(A));
			n.push(c.add(R)), n.push(c.sub(R)), (i = C), (m = g), (u = y);
		}
		if (!o)
			switch ((n.push(p.add(u)), n.push(p.sub(u)), t.cap)) {
				case "square": {
					let d = i.scale(r / m);
					n.push(p.add(d).add(u)), n.push(p.add(d).sub(u));
					break;
				}
				case "round": {
					let d = Math.max(r, 10),
						C = Math.PI / d,
						g = u.scale(1),
						y = Math.cos(C),
						O = Math.sin(C);
					for (let A = 0; A < d; A++)
						(g = v(g.x * y - g.y * O, g.x * O + g.y * y)),
							n.push(p),
							n.push(p.sub(g));
				}
			}
		if (n.length < 4) return;
		let b = n.map((d) => ({
				pos: s.add(d),
				uv: v(),
				color: t.color || j.WHITE,
				opacity: t.opacity ?? 1,
			})),
			l = [],
			h = 0;
		for (let d = 0; d < n.length - 2; d += 2)
			(l[h++] = d + 1),
				(l[h++] = d),
				(l[h++] = d + 2),
				(l[h++] = d + 2),
				(l[h++] = d + 3),
				(l[h++] = d + 1);
		o &&
			((l[h++] = n.length - 1),
			(l[h++] = n.length - 2),
			(l[h++] = 0),
			(l[h++] = 0),
			(l[h++] = 1),
			(l[h++] = n.length - 1)),
			Le(b, l, t.fixed, a.gfx.defTex, t.shader, t.uniform ?? void 0);
	}
	function Kt(t) {
		let e = t.pts,
			n = t.width ?? 1;
		if (!e) throw new Error('drawLines() requires property "pts".');
		if (!(e.length < 2)) {
			if (e.length > 2)
				switch (t.join) {
					case "bevel":
						return rc(t);
					case "round":
						return oc(t);
					case "miter":
						return sc(t);
				}
			if (t.radius && e.length >= 3) {
				kt(Object.assign({}, t, { p1: e[0], p2: e[1] }));
				for (let r = 1; r < e.length - 2; r++) {
					let o = e[r],
						s = e[r + 1];
					kt(Object.assign({}, t, { p1: o, p2: s }));
				}
				kt(Object.assign({}, t, { p1: e[e.length - 2], p2: e[e.length - 1] }));
			} else
				for (let r = 0; r < e.length - 1; r++)
					kt(Object.assign({}, t, { p1: e[r], p2: e[r + 1] })),
						t.join !== "none" &&
							Ne(Object.assign({}, t, { pos: e[r], radius: n / 2 }));
		}
	}
	function zn(t, e) {
		let n = e.segments ?? 16,
			r = [];
		for (let o = 0; o <= n; o++) r.push(t(o / n));
		Kt({
			pts: r,
			width: e.width || 1,
			pos: e.pos,
			color: e.color,
			opacity: e.opacity,
		});
	}
	function ui(t) {
		zn((e) => Qt(t.pt1, t.pt2, t.pt3, t.pt4, e), t);
	}
	var Ve = class t {
			ctx;
			src = null;
			glTex;
			width;
			height;
			constructor(e, n, r, o = {}) {
				this.ctx = e;
				let s = e.gl,
					i = e.gl.createTexture();
				if (!i) throw new Error("Failed to create texture");
				(this.glTex = i),
					e.onDestroy(() => this.free()),
					(this.width = n),
					(this.height = r);
				let m = { linear: s.LINEAR, nearest: s.NEAREST }[
						o.filter ?? e.opts.texFilter ?? "nearest"
					],
					u = { repeat: s.REPEAT, clampToEdge: s.CLAMP_TO_EDGE }[
						o.wrap ?? "clampToEdge"
					];
				this.bind(),
					n &&
						r &&
						s.texImage2D(
							s.TEXTURE_2D,
							0,
							s.RGBA,
							n,
							r,
							0,
							s.RGBA,
							s.UNSIGNED_BYTE,
							null
						),
					s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MIN_FILTER, m),
					s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MAG_FILTER, m),
					s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_S, u),
					s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_T, u),
					s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0),
					this.unbind();
			}
			static fromImage(e, n, r = {}) {
				let o = new t(e, n.width, n.height, r);
				return o.update(n), (o.src = n), o;
			}
			update(e, n = 0, r = 0) {
				let o = this.ctx.gl;
				this.bind(),
					o.texSubImage2D(o.TEXTURE_2D, 0, n, r, o.RGBA, o.UNSIGNED_BYTE, e),
					this.unbind();
			}
			bind() {
				this.ctx.pushTexture2D(this.glTex);
			}
			unbind() {
				this.ctx.popTexture2D();
			}
			free() {
				this.ctx.gl.deleteTexture(this.glTex);
			}
		},
		ot = class {
			ctx;
			tex;
			glFramebuffer;
			glRenderbuffer;
			constructor(e, n, r, o = {}) {
				this.ctx = e;
				let s = e.gl;
				e.onDestroy(() => this.free()), (this.tex = new Ve(e, n, r, o));
				let i = s.createFramebuffer(),
					m = s.createRenderbuffer();
				if (!i || !m) throw new Error("Failed to create framebuffer");
				(this.glFramebuffer = i),
					(this.glRenderbuffer = m),
					this.bind(),
					s.renderbufferStorage(s.RENDERBUFFER, s.DEPTH_STENCIL, n, r),
					s.framebufferTexture2D(
						s.FRAMEBUFFER,
						s.COLOR_ATTACHMENT0,
						s.TEXTURE_2D,
						this.tex.glTex,
						0
					),
					s.framebufferRenderbuffer(
						s.FRAMEBUFFER,
						s.DEPTH_STENCIL_ATTACHMENT,
						s.RENDERBUFFER,
						this.glRenderbuffer
					),
					this.unbind();
			}
			get width() {
				return this.tex.width;
			}
			get height() {
				return this.tex.height;
			}
			toImageData() {
				let e = this.ctx.gl,
					n = new Uint8ClampedArray(this.width * this.height * 4);
				this.bind(),
					e.readPixels(
						0,
						0,
						this.width,
						this.height,
						e.RGBA,
						e.UNSIGNED_BYTE,
						n
					),
					this.unbind();
				let r = this.width * 4,
					o = new Uint8Array(r);
				for (let s = 0; s < ((this.height / 2) | 0); s++) {
					let i = s * r,
						m = (this.height - s - 1) * r;
					o.set(n.subarray(i, i + r)), n.copyWithin(i, m, m + r), n.set(o, m);
				}
				return new ImageData(n, this.width, this.height);
			}
			toDataURL() {
				let e = document.createElement("canvas"),
					n = e.getContext("2d");
				if (((e.width = this.width), (e.height = this.height), !n))
					throw new Error("Failed to get 2d context");
				return n.putImageData(this.toImageData(), 0, 0), e.toDataURL();
			}
			clear() {
				let e = this.ctx.gl;
				e.clear(e.COLOR_BUFFER_BIT);
			}
			draw(e) {
				this.bind(), e(), this.unbind();
			}
			bind() {
				this.ctx.pushFramebuffer(this.glFramebuffer),
					this.ctx.pushRenderbuffer(this.glRenderbuffer),
					this.ctx.pushViewport({ x: 0, y: 0, w: this.width, h: this.height });
			}
			unbind() {
				this.ctx.popFramebuffer(),
					this.ctx.popRenderbuffer(),
					this.ctx.popViewport();
			}
			free() {
				let e = this.ctx.gl;
				e.deleteFramebuffer(this.glFramebuffer),
					e.deleteRenderbuffer(this.glRenderbuffer),
					this.tex.free();
			}
		},
		Wn = class {
			ctx;
			glVBuf;
			glIBuf;
			vqueue = [];
			iqueue = [];
			stride;
			maxVertices;
			maxIndices;
			vertexFormat;
			numDraws = 0;
			curPrimitive = null;
			curTex = null;
			curShader = null;
			curUniform = {};
			constructor(e, n, r, o) {
				let s = e.gl;
				(this.vertexFormat = n),
					(this.ctx = e),
					(this.stride = n.reduce((m, u) => m + u.size, 0)),
					(this.maxVertices = r),
					(this.maxIndices = o);
				let i = s.createBuffer();
				if (!i) throw new Error("Failed to create vertex buffer");
				(this.glVBuf = i),
					e.pushArrayBuffer(this.glVBuf),
					s.bufferData(s.ARRAY_BUFFER, r * 4, s.DYNAMIC_DRAW),
					e.popArrayBuffer(),
					(this.glIBuf = s.createBuffer()),
					e.pushElementArrayBuffer(this.glIBuf),
					s.bufferData(s.ELEMENT_ARRAY_BUFFER, o * 4, s.DYNAMIC_DRAW),
					e.popElementArrayBuffer();
			}
			push(e, n, r, o, s = null, i = {}) {
				(e !== this.curPrimitive ||
					s !== this.curTex ||
					o !== this.curShader ||
					!Fn(this.curUniform, i) ||
					this.vqueue.length + n.length * this.stride > this.maxVertices ||
					this.iqueue.length + r.length > this.maxIndices) &&
					this.flush();
				let m = this.vqueue.length / this.stride;
				for (let u of n) this.vqueue.push(u);
				for (let u of r) this.iqueue.push(u + m);
				(this.curPrimitive = e),
					(this.curShader = o),
					(this.curTex = s),
					(this.curUniform = i);
			}
			flush() {
				if (
					!this.curPrimitive ||
					!this.curShader ||
					this.vqueue.length === 0 ||
					this.iqueue.length === 0
				)
					return;
				let e = this.ctx.gl;
				this.ctx.pushArrayBuffer(this.glVBuf),
					e.bufferSubData(e.ARRAY_BUFFER, 0, new Float32Array(this.vqueue)),
					this.ctx.pushElementArrayBuffer(this.glIBuf),
					e.bufferSubData(
						e.ELEMENT_ARRAY_BUFFER,
						0,
						new Uint16Array(this.iqueue)
					),
					this.ctx.setVertexFormat(this.vertexFormat),
					this.curShader.bind(),
					this.curShader.send(this.curUniform),
					this.curTex?.bind(),
					e.drawElements(
						this.curPrimitive,
						this.iqueue.length,
						e.UNSIGNED_SHORT,
						0
					),
					this.curTex?.unbind(),
					this.curShader.unbind(),
					this.ctx.popArrayBuffer(),
					this.ctx.popElementArrayBuffer(),
					(this.vqueue = []),
					(this.iqueue = []),
					this.numDraws++;
			}
			free() {
				let e = this.ctx.gl;
				e.deleteBuffer(this.glVBuf), e.deleteBuffer(this.glIBuf);
			}
		};
	function At(t) {
		let e = [],
			n = (s) => {
				e.push(s), t(s);
			},
			r = () => {
				e.pop(), t(o() ?? null);
			},
			o = () => e[e.length - 1];
		return [n, r, o];
	}
	function ci(t, e = {}) {
		let n = [];
		function r(V) {
			n.push(V);
		}
		function o() {
			n.forEach((x) => x());
			let V = t.getExtension("WEBGL_lose_context");
			V && V.loseContext();
		}
		let s = null;
		function i(V) {
			if (Fn(V, s)) return;
			s = V;
			let x = V.reduce((w, S) => w + S.size, 0);
			V.reduce(
				(w, S, G) => (
					t.vertexAttribPointer(G, S.size, t.FLOAT, !1, x * 4, w),
					t.enableVertexAttribArray(G),
					w + S.size * 4
				),
				0
			);
		}
		let [m, u] = At((V) => t.bindTexture(t.TEXTURE_2D, V)),
			[c, p] = At((V) => t.bindBuffer(t.ARRAY_BUFFER, V)),
			[b, l] = At((V) => t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, V)),
			[h, d] = At((V) => t.bindFramebuffer(t.FRAMEBUFFER, V)),
			[C, g] = At((V) => t.bindRenderbuffer(t.RENDERBUFFER, V)),
			[y, O] = At((V) => {
				if (!V) return;
				let { x, y: w, w: S, h: G } = V;
				t.viewport(x, w, S, G);
			}),
			[A, R] = At((V) => t.useProgram(V));
		return (
			y({ x: 0, y: 0, w: t.drawingBufferWidth, h: t.drawingBufferHeight }),
			{
				gl: t,
				opts: e,
				onDestroy: r,
				destroy: o,
				pushTexture2D: m,
				popTexture2D: u,
				pushArrayBuffer: c,
				popArrayBuffer: p,
				pushElementArrayBuffer: b,
				popElementArrayBuffer: l,
				pushFramebuffer: h,
				popFramebuffer: d,
				pushRenderbuffer: C,
				popRenderbuffer: g,
				pushViewport: y,
				popViewport: O,
				pushProgram: A,
				popProgram: R,
				setVertexFormat: i,
			}
		);
	}
	var Xr = {};
	function pi(t, e) {
		if (e.override) {
			Object.assign(t, e);
			return;
		}
		e.pos && (t.pos = t.pos.add(e.pos)),
			e.scale && (t.scale = t.scale.scale(v(e.scale))),
			e.angle && (t.angle += e.angle),
			e.color && t.ch.length === 1 && (t.color = t.color.mult(e.color)),
			e.opacity != null && (t.opacity *= e.opacity);
	}
	function Yn(t) {
		let e = {},
			n = "",
			r = [],
			o = String(t),
			s = (i) => {
				r.length > 0 && (e[n.length] = r.slice()), (n += i);
			};
		for (; o !== ""; ) {
			if (o[0] === "\\") {
				if (o.length === 1)
					throw new Error("Styled text error: \\ at end of string");
				s(o[1]), (o = o.slice(2));
				continue;
			}
			if (o[0] === "[") {
				let i = /^\[(\/)?(\w+?)\]/.exec(o);
				if (!i) {
					s(o[0]), (o = o.slice(1));
					continue;
				}
				let [m, u, c] = i;
				if (u !== void 0) {
					let p = r.pop();
					if (p !== c)
						throw p !== void 0
							? new Error(
									`Styled text error: mismatched tags. Expected [/${p}], got [/${c}]`
							  )
							: new Error(`Styled text error: stray end tag [/${c}]`);
				} else r.push(c);
				o = o.slice(m.length);
				continue;
			}
			s(o[0]), (o = o.slice(1));
		}
		if (r.length > 0) throw new Error(`Styled text error: unclosed tags ${r}`);
		return { charStyleMap: e, text: n };
	}
	function Ue(t) {
		if (t.text === void 0)
			throw new Error('formatText() requires property "text".');
		let e = Hr(t.font);
		if (!t.text || t.text === "" || e instanceof ce || !e)
			return { width: 0, height: 0, chars: [], opt: t, renderedText: "" };
		let { charStyleMap: n, text: r } = Yn(t.text + ""),
			o = Ts(r);
		if (e instanceof Ot || typeof e == "string") {
			let A = e instanceof Ot ? e.fontface.family : e,
				R =
					e instanceof Ot
						? { outline: e.outline, filter: e.filter }
						: { outline: null, filter: Jt },
				V = Xr[A] ?? {
					font: {
						tex: new Ve(a.gfx.ggl, 2048, 2048, { filter: R.filter }),
						map: {},
						size: 64,
					},
					cursor: new E(0),
					maxHeight: 0,
					outline: R.outline,
				};
			Xr[A] || (Xr[A] = V), (e = V.font);
			for (let x of o)
				if (!V.font.map[x]) {
					let w = a.fontCacheC2d;
					if (!w) throw new Error("fontCacheC2d is not defined.");
					if (!a.fontCacheCanvas)
						throw new Error("fontCacheCanvas is not defined.");
					w.clearRect(0, 0, a.fontCacheCanvas.width, a.fontCacheCanvas.height),
						(w.font = `${e.size}px ${A}`),
						(w.textBaseline = "top"),
						(w.textAlign = "left"),
						(w.fillStyle = "#ffffff");
					let S = w.measureText(x),
						G = Math.ceil(S.width);
					if (!G) continue;
					let M =
						Math.ceil(Math.abs(S.actualBoundingBoxAscent)) +
						Math.ceil(Math.abs(S.actualBoundingBoxDescent));
					V.outline &&
						V.outline.width &&
						V.outline.color &&
						((w.lineJoin = "round"),
						(w.lineWidth = V.outline.width * 2),
						(w.strokeStyle = V.outline.color.toHex()),
						w.strokeText(x, V.outline.width, V.outline.width),
						(G += V.outline.width * 2),
						(M += V.outline.width * 3)),
						w.fillText(x, V.outline?.width ?? 0, V.outline?.width ?? 0);
					let D = w.getImageData(0, 0, G, M);
					if (
						V.cursor.x + G > 2048 &&
						((V.cursor.x = 0),
						(V.cursor.y += V.maxHeight),
						(V.maxHeight = 0),
						V.cursor.y > 2048)
					)
						throw new Error("Font atlas exceeds character limit");
					e.tex.update(D, V.cursor.x, V.cursor.y),
						(e.map[x] = new q(V.cursor.x, V.cursor.y, G, M)),
						(V.cursor.x += G + 1),
						(V.maxHeight = Math.max(V.maxHeight, M));
				}
		}
		let s = t.size || e.size,
			i = v(t.scale ?? 1).scale(s / e.size),
			m = t.lineSpacing ?? 0,
			u = t.letterSpacing ?? 0,
			c = 0,
			p = 0,
			b = 0,
			l = [],
			h = [],
			d = 0,
			C = null,
			g = 0,
			y;
		for (; d < o.length; ) {
			let A = o[d];
			if (
				A ===
				`
`
			)
				(b += s + m),
					l.push({ width: c - u, chars: h }),
					(C = null),
					(g = 0),
					(c = 0),
					(h = []),
					(y = void 0);
			else {
				let R = e.map[A];
				if (R) {
					let V = R.w * i.x;
					t.width &&
						c + V > t.width &&
						((b += s + m),
						C != null &&
							((d -= h.length - C),
							(A = o[d]),
							(R = e.map[A]),
							(V = R.w * i.x),
							(h = h.slice(0, C - 1)),
							(c = g)),
						(C = null),
						(g = 0),
						l.push({ width: c - u, chars: h }),
						(c = y ?? 0),
						(h = [])),
						h.push({
							tex: e.tex,
							width: R.w,
							height: R.h,
							quad: new q(
								R.x / e.tex.width,
								R.y / e.tex.height,
								R.w / e.tex.width,
								R.h / e.tex.height
							),
							ch: A,
							pos: new E(c, b),
							opacity: t.opacity ?? 1,
							color: t.color ?? j.WHITE,
							scale: v(i),
							angle: 0,
						}),
						A === " " && ((C = h.length), (g = c)),
						t.indentAll && y === void 0 && /\S/.test(A) && (y = c),
						(c += V),
						(p = Math.max(p, c)),
						(c += u);
				}
			}
			d++;
		}
		l.push({ width: c - u, chars: h }), (b += s), t.width && (p = t.width);
		let O = [];
		for (let A = 0; A < l.length; A++) {
			let R = (p - l[A].width) * Ds(t.align ?? "left");
			for (let V of l[A].chars) {
				let x = e.map[V.ch],
					w = O.length + A;
				if (
					((V.pos = V.pos.add(R, 0).add(x.w * i.x * 0.5, x.h * i.y * 0.5)),
					t.transform)
				) {
					let S =
						typeof t.transform == "function"
							? t.transform(w, V.ch)
							: t.transform;
					S && pi(V, S);
				}
				if (n[w]) {
					let S = n[w];
					for (let G of S) {
						let M = t.styles?.[G],
							D = typeof M == "function" ? M(w, V.ch) : M;
						D && pi(V, D);
					}
				}
				O.push(V);
			}
		}
		return { width: p, height: b, chars: O, opt: t, renderedText: r };
	}
	function st(t) {
		if (t.width === void 0 || t.height === void 0)
			throw new Error('drawUVQuad() requires property "width" and "height".');
		if (t.width <= 0 || t.height <= 0) return;
		let e = t.width,
			n = t.height,
			o = _e(t.anchor || lt).scale(new E(e, n).scale(-0.5)),
			s = t.quad || new q(0, 0, 1, 1),
			i = t.color || I(255, 255, 255),
			m = t.opacity ?? 1,
			u = t.tex ? 0.1 / t.tex.width : 0,
			c = t.tex ? 0.1 / t.tex.height : 0,
			p = s.x + u,
			b = s.y + c,
			l = s.w - u * 2,
			h = s.h - c * 2;
		ge(),
			X(t.pos),
			Ye(t.angle),
			nt(t.scale),
			X(o),
			Le(
				[
					{
						pos: new E(-e / 2, n / 2),
						uv: new E(t.flipX ? p + l : p, t.flipY ? b : b + h),
						color: i,
						opacity: m,
					},
					{
						pos: new E(-e / 2, -n / 2),
						uv: new E(t.flipX ? p + l : p, t.flipY ? b + h : b),
						color: i,
						opacity: m,
					},
					{
						pos: new E(e / 2, -n / 2),
						uv: new E(t.flipX ? p : p + l, t.flipY ? b + h : b),
						color: i,
						opacity: m,
					},
					{
						pos: new E(e / 2, n / 2),
						uv: new E(t.flipX ? p : p + l, t.flipY ? b : b + h),
						color: i,
						opacity: m,
					},
				],
				[0, 1, 3, 1, 2, 3],
				t.fixed,
				t.tex,
				t.shader,
				t.uniform ?? void 0
			),
			me();
	}
	function He(t) {
		ge(),
			X(t.opt.pos),
			Ye(t.opt.angle),
			X(
				_e(t.opt.anchor ?? "topleft")
					.add(1, 1)
					.scale(t.width, t.height)
					.scale(-0.5)
			),
			t.chars.forEach((e) => {
				st({
					tex: e.tex,
					width: e.width,
					height: e.height,
					pos: e.pos,
					scale: e.scale,
					angle: e.angle,
					color: e.color,
					opacity: e.opacity,
					quad: e.quad,
					anchor: "center",
					uniform: t.opt.uniform,
					shader: t.opt.shader,
					fixed: t.opt.fixed,
				});
			}),
			me();
	}
	function xe(t) {
		if (t.width === void 0 || t.height === void 0)
			throw new Error('drawRect() requires property "width" and "height".');
		if (t.width <= 0 || t.height <= 0) return;
		let e = t.width,
			n = t.height,
			o = _e(t.anchor || lt)
				.add(1, 1)
				.scale(new E(e, n).scale(-0.5)),
			s = [new E(0, 0), new E(e, 0), new E(e, n), new E(0, n)];
		if (t.radius) {
			let i = Math.min(e, n) / 2,
				m = Array.isArray(t.radius)
					? t.radius.map((u) => Math.min(i, u))
					: new Array(4).fill(Math.min(i, t.radius));
			s = [
				new E(m[0], 0),
				...(m[1] ? vt(new E(e - m[1], m[1]), m[1], m[1], 270, 360) : [v(e, 0)]),
				...(m[2]
					? vt(new E(e - m[2], n - m[2]), m[2], m[2], 0, 90)
					: [v(e, n)]),
				...(m[3] ? vt(new E(m[3], n - m[3]), m[3], m[3], 90, 180) : [v(0, n)]),
				...(m[0] ? vt(new E(m[0], m[0]), m[0], m[0], 180, 270) : []),
			];
		}
		Pe(
			Object.assign({}, t, {
				offset: o,
				pts: s,
				...(t.gradient
					? {
							colors: t.horizontal
								? [t.gradient[0], t.gradient[1], t.gradient[1], t.gradient[0]]
								: [t.gradient[0], t.gradient[0], t.gradient[1], t.gradient[1]],
					  }
					: {}),
			})
		);
	}
	function qe(t) {
		Ce();
		let e = a.gfx.width,
			n = a.gfx.height;
		(a.gfx.width = a.gfx.viewport.width),
			(a.gfx.height = a.gfx.viewport.height),
			t(),
			Ce(),
			(a.gfx.width = e),
			(a.gfx.height = n);
	}
	function Qr(t, e) {
		qe(() => {
			let n = v(8);
			ge(), X(t);
			let r = Ue({
					text: e,
					font: bt,
					size: 16,
					pos: n,
					color: I(255, 255, 255),
					fixed: !0,
				}),
				o = r.width + n.x * 2,
				s = r.height + n.x * 2;
			t.x + o >= ie() && X(v(-o, 0)),
				t.y + s >= ue() && X(v(0, -s)),
				xe({
					width: o,
					height: s,
					color: I(0, 0, 0),
					radius: 4,
					opacity: 0.8,
					fixed: !0,
				}),
				He(r),
				me();
		});
	}
	function $n(t) {
		if (!t.p1 || !t.p2 || !t.p3)
			throw new Error(
				'drawTriangle() requires properties "p1", "p2" and "p3".'
			);
		return Pe(Object.assign({}, t, { pts: [t.p1, t.p2, t.p3] }));
	}
	function fi() {
		if (a.debug.inspect) {
			let t = null;
			for (let e of a.game.root.get("*", { recursive: !0 }))
				if (e.has("area") && e.isHovering()) {
					t = e;
					break;
				}
			if ((a.game.root.drawInspect(), t)) {
				let e = [],
					n = t.inspect();
				for (let r in n) n[r] ? e.push(`${n[r]}`) : e.push(`${r}`);
				Qr(
					Ss(a.k.mousePos()),
					e.join(`
`)
				);
			}
			Qr(v(8), `FPS: ${a.debug.fps()}`);
		}
		a.debug.paused &&
			qe(() => {
				ge(), X(ie(), 0), X(-8, 8);
				let t = 32;
				xe({
					width: t,
					height: t,
					anchor: "topright",
					color: I(0, 0, 0),
					opacity: 0.8,
					radius: 4,
					fixed: !0,
				});
				for (let e = 1; e <= 2; e++)
					xe({
						width: 4,
						height: t * 0.6,
						anchor: "center",
						pos: v((-t / 3) * e, t * 0.5),
						color: I(255, 255, 255),
						radius: 2,
						fixed: !0,
					});
				me();
			}),
			a.debug.timeScale !== 1 &&
				qe(() => {
					ge(), X(ie(), ue()), X(-8, -8);
					let t = 8,
						e = Ue({
							text: a.debug.timeScale.toFixed(1),
							font: bt,
							size: 16,
							color: I(255, 255, 255),
							pos: v(-t),
							anchor: "botright",
							fixed: !0,
						});
					xe({
						width: e.width + t * 2 + t * 4,
						height: e.height + t * 2,
						anchor: "botright",
						color: I(0, 0, 0),
						opacity: 0.8,
						radius: 4,
						fixed: !0,
					});
					for (let n = 0; n < 2; n++) {
						let r = a.debug.timeScale < 1;
						$n({
							p1: v(-e.width - t * (r ? 2 : 3.5), -t),
							p2: v(-e.width - t * (r ? 2 : 3.5), -t - e.height),
							p3: v(-e.width - t * (r ? 3.5 : 2), -t - e.height / 2),
							pos: v(-n * t * 1 + (r ? -t * 0.5 : 0), 0),
							color: I(255, 255, 255),
							fixed: !0,
						});
					}
					He(e), me();
				}),
			a.debug.curRecording &&
				qe(() => {
					ge(),
						X(0, ue()),
						X(24, -24),
						Ne({
							radius: 12,
							color: I(255, 0, 0),
							opacity: On(0, 1, a.app.time() * 4),
							fixed: !0,
						}),
						me();
				}),
			a.debug.showLog &&
				a.game.logs.length > 0 &&
				qe(() => {
					ge(), X(0, ue()), X(8, -8);
					let t = 8,
						e = [];
					for (let r of a.game.logs) {
						let o = "",
							s = r.msg instanceof Error ? "error" : "info";
						(o += `[time]${r.time.toFixed(2)}[/time]`),
							(o += " "),
							(o += `[${s}]${Jr(r.msg)}[/${s}]`),
							e.push(o);
					}
					a.game.logs = a.game.logs.filter(
						(r) => a.app.time() - r.time < (a.globalOpt.logTime || 4)
					);
					let n = Ue({
						text: e.join(`
`),
						font: bt,
						pos: v(t, -t),
						anchor: "botleft",
						size: 16,
						width: ie() * 0.6,
						lineSpacing: t / 2,
						fixed: !0,
						styles: {
							time: { color: I(127, 127, 127) },
							info: { color: I(255, 255, 255) },
							error: { color: I(255, 0, 127) },
						},
					});
					xe({
						width: n.width + t * 2,
						height: n.height + t * 2,
						anchor: "botleft",
						color: I(0, 0, 0),
						radius: 4,
						opacity: 0.8,
						fixed: !0,
					}),
						He(n),
						me();
				});
	}
	function Jr(t, e = !1, n = new Set()) {
		if (n.has(t)) return "<recursive>";
		var r = "",
			o;
		return (
			e && typeof t == "string" && (t = JSON.stringify(t)),
			Array.isArray(t) &&
				((r = [
					"[",
					t.map((s) => Jr(s, !0, n.union(new Set([t])))).join(", "),
					"]",
				].join("")),
				(t = r)),
			t === null
				? "null"
				: (typeof t == "object" &&
						t.toString === Object.prototype.toString &&
						(t.constructor !== Object && (r += t.constructor.name + " "),
						(r += [
							"{",
							(o = Object.getOwnPropertyNames(t)
								.map(
									(s) =>
										`${/^\w+$/.test(s) ? s : JSON.stringify(s)}: ${Jr(
											t[s],
											!0,
											n.union(new Set([t]))
										)}`
								)
								.join(", "))
								? ` ${o} `
								: "",
							"}",
						].join("")),
						(t = r)),
				  String(t).replaceAll(/(?<!\\)\[/g, "\\["))
		);
	}
	function hi() {
		let t = a.game.cam,
			e = E.fromAngle(he(0, 360)).scale(t.shake);
		(t.shake = de(t.shake, 0, 5 * ee())),
			(t.transform = new fe()
				.translate(wt())
				.scale(t.scale)
				.rotate(t.angle)
				.translate((t.pos ?? wt()).scale(-1).add(e))),
			a.game.root.draw(),
			Ce();
	}
	function gi() {
		let t = Be();
		a.game.events.numListeners("loading") > 0
			? a.game.events.trigger("loading", t)
			: qe(() => {
					let e = ie() / 2,
						n = 24,
						r = v(ie() / 2, ue() / 2).sub(v(e / 2, n / 2));
					xe({ pos: v(0), width: ie(), height: ue(), color: I(0, 0, 0) }),
						xe({
							pos: r,
							width: e,
							height: n,
							fill: !1,
							outline: { width: 4 },
						}),
						xe({ pos: r, width: e * t, height: n });
			  });
	}
	function Xn(t, e, n) {
		let r = a.gfx.ggl.gl;
		Ce(),
			r.clear(r.STENCIL_BUFFER_BIT),
			r.enable(r.STENCIL_TEST),
			r.stencilFunc(r.NEVER, 1, 255),
			r.stencilOp(r.REPLACE, r.REPLACE, r.REPLACE),
			e(),
			Ce(),
			r.stencilFunc(n, 1, 255),
			r.stencilOp(r.KEEP, r.KEEP, r.KEEP),
			t(),
			Ce(),
			r.disable(r.STENCIL_TEST);
	}
	function bi(t, e) {
		let n = a.gfx.ggl.gl;
		Xn(t, e, n.EQUAL);
	}
	function St(t) {
		if (!t.tex) throw new Error('drawTexture() requires property "tex".');
		let e = t.quad ?? new q(0, 0, 1, 1),
			n = t.tex.width * e.w,
			r = t.tex.height * e.h,
			o = new E(1);
		if (t.tiled) {
			let s = _e(t.anchor || lt),
				i = (t.pos?.x || 0) - (s.x + 1) * 0.5 * (t.width || n),
				m = (t.pos?.y || 0) - (s.y + 1) * 0.5 * (t.height || r),
				u = (t.width || n) / n,
				c = (t.height || r) / r,
				p = Math.floor(u),
				b = Math.floor(c),
				l = u - p,
				h = c - b,
				d = (p + l ? 1 : 0) * (b + h ? 1 : 0),
				C = new Array(d * 6),
				g = new Array(d * 4),
				y = 0,
				O = (A, R, V, x, w) => {
					(C[y * 6 + 0] = y * 4 + 0),
						(C[y * 6 + 1] = y * 4 + 1),
						(C[y * 6 + 2] = y * 4 + 3),
						(C[y * 6 + 3] = y * 4 + 1),
						(C[y * 6 + 4] = y * 4 + 2),
						(C[y * 6 + 5] = y * 4 + 3),
						(g[y * 4 + 0] = {
							pos: new E(A - s.x, R - s.y),
							uv: new E(w.x, w.y),
							color: t.color || j.WHITE,
							opacity: t.opacity || 1,
						}),
						(g[y * 4 + 1] = {
							pos: new E(A + V - s.x, R - s.y),
							uv: new E(w.x + w.w, w.y),
							color: t.color || j.WHITE,
							opacity: t.opacity || 1,
						}),
						(g[y * 4 + 2] = {
							pos: new E(A + V - s.x, R + x - s.y),
							uv: new E(w.x + w.w, w.y + w.h),
							color: t.color || j.WHITE,
							opacity: t.opacity || 1,
						}),
						(g[y * 4 + 3] = {
							pos: new E(A - s.x, R + x - s.y),
							uv: new E(w.x, w.y + w.h),
							color: t.color || j.WHITE,
							opacity: t.opacity || 1,
						}),
						y++;
				};
			for (let A = 0; A < b; A++) {
				for (let R = 0; R < p; R++) O(R * n, A * r, n, r, e);
				l && O(p * n, A * r, n * l, r, new q(e.x, e.y, e.w * l, e.h));
			}
			if (h) {
				for (let A = 0; A < p; A++)
					O(A * n, b * r, n, r * h, new q(e.x, e.y, e.w, e.h * h));
				l && O(p * n, b * r, n * l, r * h, new q(e.x, e.y, e.w * l, e.h * h));
			}
			Le(g, C, t.fixed, t.tex, t.shader, t.uniform ?? void 0);
		} else
			t.width && t.height
				? ((o.x = t.width / n), (o.y = t.height / r))
				: t.width
				? ((o.x = t.width / n), (o.y = o.x))
				: t.height && ((o.y = t.height / r), (o.x = o.y)),
				st(
					Object.assign({}, t, {
						scale: o.scale(t.scale || new E(1)),
						tex: t.tex,
						quad: e,
						width: n,
						height: r,
					})
				);
	}
	function yi(t) {
		if (!t.sprite) throw new Error('drawSprite() requires property "sprite"');
		let e = It(t.sprite);
		if (!e || !e.data) return;
		let n = e.data.frames[t.frame ?? 0];
		if (!n) throw new Error(`Frame not found: ${t.frame ?? 0}`);
		St(
			Object.assign({}, t, {
				tex: e.data.tex,
				quad: n.scale(t.quad ?? new q(0, 0, 1, 1)),
			})
		);
	}
	function xi(t, e) {
		let n = a.gfx.ggl.gl;
		Xn(t, e, n.NOTEQUAL);
	}
	function Zr(t) {
		He(Ue(t));
	}
	var vi = (t, e) => {
		let n = Hn(e, en, tn),
			r = t.pixelDensity ?? 1,
			o = t.scale ?? 1,
			{ gl: s } = e,
			i = Ve.fromImage(
				e,
				new ImageData(new Uint8ClampedArray([255, 255, 255, 255]), 1, 1)
			),
			m =
				t.width && t.height
					? new ot(e, t.width * r * o, t.height * r * o)
					: new ot(e, s.drawingBufferWidth, s.drawingBufferHeight),
			u = null,
			c = 1;
		t.background &&
			(typeof t.background == "string"
				? (u = I(t.background))
				: ((u = I(...t.background)), (c = t.background[3] ?? 1)),
			s.clearColor(u.r / 255, u.g / 255, u.b / 255, c ?? 1)),
			s.enable(s.BLEND),
			s.blendFuncSeparate(
				s.ONE,
				s.ONE_MINUS_SRC_ALPHA,
				s.ONE,
				s.ONE_MINUS_SRC_ALPHA
			);
		let p = new Wn(e, Zt, as, us),
			b = Ve.fromImage(
				e,
				new ImageData(
					new Uint8ClampedArray([
						128, 128, 128, 255, 190, 190, 190, 255, 190, 190, 190, 255, 128,
						128, 128, 255,
					]),
					2,
					2
				),
				{ wrap: "repeat", filter: "nearest" }
			);
		return {
			lastDrawCalls: 0,
			ggl: e,
			defShader: n,
			defTex: i,
			frameBuffer: m,
			postShader: null,
			postShaderUniform: null,
			renderer: p,
			transform: new fe(),
			transformStack: [],
			bgTex: b,
			bgColor: u,
			bgAlpha: c,
			width: t.width ?? s.drawingBufferWidth / r / o,
			height: t.height ?? s.drawingBufferHeight / r / o,
			viewport: {
				x: 0,
				y: 0,
				width: s.drawingBufferWidth,
				height: s.drawingBufferHeight,
				scale: 1,
			},
			fixed: !1,
		};
	};
	function it(t) {
		return t.fixed ? !0 : t.parent ? it(t.parent) : !1;
	}
	function je(t) {
		return {
			color: t.color,
			opacity: t.opacity,
			anchor: t.anchor,
			outline: t.outline,
			shader: t.shader,
			uniform: t.uniform,
		};
	}
	function wi(t, e = {}) {
		return {
			id: "circle",
			radius: t,
			draw() {
				Ne(Object.assign(je(this), { radius: this.radius, fill: e.fill }));
			},
			renderArea() {
				return new W(
					new E(this.anchor ? 0 : -this.radius),
					this.radius * 2,
					this.radius * 2
				);
			},
			inspect() {
				return `radius: ${Math.ceil(this.radius)}`;
			},
		};
	}
	function Qn(...t) {
		return {
			id: "color",
			color: I(...t),
			inspect() {
				return `color: ${this.color.toString()}`;
			},
		};
	}
	function Ci(t) {
		return {
			add() {
				this.canvas = t;
			},
		};
	}
	function Ei(t = 1) {
		let e,
			n = 0,
			r = !1;
		return {
			require: ["opacity"],
			add() {
				(e = this.opacity), (this.opacity = 0);
			},
			update() {
				r ||
					((n += ee()),
					(this.opacity = Se(n, 0, t, 0, e)),
					n >= t && ((this.opacity = e), (r = !0)));
			},
		};
	}
	function Ti(t = "intersect") {
		return { id: "mask", mask: t };
	}
	function Jn(t) {
		return {
			id: "opacity",
			opacity: t ?? 1,
			fadeIn(e = 1, n = a.k.easings.linear) {
				return a.game.root.tween(
					0,
					this.opacity,
					e,
					(r) => (this.opacity = r),
					n
				);
			},
			fadeOut(e = 1, n = a.k.easings.linear) {
				return a.game.root.tween(
					this.opacity,
					0,
					e,
					(r) => (this.opacity = r),
					n
				);
			},
			inspect() {
				return `opacity: ${rn(this.opacity, 1)}`;
			},
		};
	}
	function Oi(t = 1, e = I(0, 0, 0), n = 1, r = "miter", o = 10, s = "butt") {
		return {
			id: "outline",
			outline: {
				width: t,
				color: e,
				opacity: n,
				join: r,
				miterLimit: o,
				cap: s,
			},
			inspect() {
				return `outline: ${this.outline.width}px, ${this.outline.color}`;
			},
		};
	}
	var eo = class {
		pos = v(0);
		vel = v(0);
		acc = v(0);
		angle = 0;
		angularVelocity = 0;
		damping = 0;
		t;
		lt = null;
		gc;
		constructor() {
			(this.t = 0), (this.gc = !0);
		}
		get progress() {
			return this.lt ? this.t / this.lt : this.t;
		}
	};
	function Ai(t, e) {
		let n = e.lifetime,
			r = [],
			o = t.colors || [j.WHITE],
			s = t.opacities || [1],
			i = t.quads || [new q(0, 0, 1, 1)],
			m = t.scales || [1],
			u = t.lifeTime,
			c = e.direction,
			p = e.spread,
			b = t.speed || [0, 0],
			l = t.angle || [0, 0],
			h = t.angularVelocity || [0, 0],
			d = t.acceleration || [v(0), v(0)],
			C = t.damping || [0, 0],
			g = [],
			y = new Array(t.max),
			O = 0,
			A = 0;
		for (let x = 0; x < t.max; x++) {
			(g[x * 6 + 0] = x * 4 + 0),
				(g[x * 6 + 1] = x * 4 + 1),
				(g[x * 6 + 2] = x * 4 + 3),
				(g[x * 6 + 3] = x * 4 + 1),
				(g[x * 6 + 4] = x * 4 + 2),
				(g[x * 6 + 5] = x * 4 + 3);
			for (let w = 0; w < 4; w++)
				y[x * 4 + w] = {
					pos: new E(0, 0),
					uv: new E(0, 0),
					color: I(255, 255, 255),
					opacity: 1,
				};
			r[x] = new eo();
		}
		let R = new re();
		function V(x = 0) {
			for (; x < t.max; ) {
				if (r[x].gc) return x;
				x++;
			}
			return null;
		}
		return {
			id: "particles",
			emit(x) {
				let w = 0;
				for (let S = 0; S < x; S++) {
					if (((w = V(w)), w == null)) return;
					let G = he(c - p, c + p),
						M = E.fromAngle(G).scale(he(b[0], b[1])),
						D = he(l[0], l[1]),
						L = he(h[0], h[1]),
						U = v(he(d[0].x, d[1].x), he(d[0].y, d[1].y)),
						H = he(C[0], C[1]),
						Y = u ? he(u[0], u[1]) : null,
						_ = e.shape ? e.shape.random() : v(),
						K = r[w];
					(K.lt = Y),
						(K.pos = _),
						(K.vel = M),
						(K.acc = U),
						(K.angle = D),
						(K.angularVelocity = L),
						(K.damping = H),
						(K.angularVelocity = L),
						(K.gc = !1);
				}
				O += x;
			},
			update() {
				if (n !== void 0 && n <= 0) return;
				let x = ee();
				for (let w of r)
					if (!w.gc) {
						if (((w.t += x), w.lt && w.t >= w.lt)) {
							(w.gc = !0), O--;
							continue;
						}
						(w.vel = w.vel.add(w.acc.scale(x)).scale(1 - w.damping * x)),
							(w.pos = w.pos.add(w.vel.scale(x))),
							(w.angle += w.angularVelocity * x);
					}
				for (
					n !== void 0 && ((n -= x), n <= 0 && R.trigger()), A += x;
					O < t.max && e.rate && A > e.rate;

				)
					this.emit(1), O++, (A -= e.rate);
			},
			draw() {
				if (!(n !== void 0 && n <= 0)) {
					for (let x = 0; x < r.length; x++) {
						let w = r[x];
						if (w.gc) continue;
						let S = w.progress,
							G = Math.floor(w.progress * o.length),
							M =
								G < o.length - 1
									? de(
											o[G],
											o[G + 1],
											Se(S, G / o.length, (G + 1) / o.length, 0, 1)
									  )
									: o[G],
							D = Math.floor(w.progress * s.length),
							L =
								D < s.length - 1
									? de(
											s[D],
											s[D + 1],
											Se(S, D / s.length, (D + 1) / s.length, 0, 1)
									  )
									: s[D],
							U = Math.floor(w.progress * i.length),
							H = i[U],
							Y = Math.floor(w.progress * m.length),
							_ = m[Y],
							K = Math.cos((w.angle * Math.PI) / 180),
							J = Math.sin((w.angle * Math.PI) / 180),
							$ = ((t.texture ? t.texture.width : 10) * H.w) / 2,
							Z = ((t.texture ? t.texture.height : 10) * H.h) / 2,
							Ee = x * 4,
							k = y[Ee];
						(k.pos.x = w.pos.x + -$ * _ * K - -Z * _ * J),
							(k.pos.y = w.pos.y + -$ * _ * J + -Z * _ * K),
							(k.uv.x = H.x),
							(k.uv.y = H.y),
							(k.color.r = M.r),
							(k.color.g = M.g),
							(k.color.b = M.b),
							(k.opacity = L),
							(k = y[Ee + 1]),
							(k.pos.x = w.pos.x + $ * _ * K - -Z * _ * J),
							(k.pos.y = w.pos.y + $ * _ * J + -Z * _ * K),
							(k.uv.x = H.x + H.w),
							(k.uv.y = H.y),
							(k.color.r = M.r),
							(k.color.g = M.g),
							(k.color.b = M.b),
							(k.opacity = L),
							(k = y[Ee + 2]),
							(k.pos.x = w.pos.x + $ * _ * K - Z * _ * J),
							(k.pos.y = w.pos.y + $ * _ * J + Z * _ * K),
							(k.uv.x = H.x + H.w),
							(k.uv.y = H.y + H.h),
							(k.color.r = M.r),
							(k.color.g = M.g),
							(k.color.b = M.b),
							(k.opacity = L),
							(k = y[Ee + 3]),
							(k.pos.x = w.pos.x + -$ * _ * K - Z * _ * J),
							(k.pos.y = w.pos.y + -$ * _ * J + Z * _ * K),
							(k.uv.x = H.x),
							(k.uv.y = H.y + H.h),
							(k.color.r = M.r),
							(k.color.g = M.g),
							(k.color.b = M.b),
							(k.opacity = L);
					}
					Le(y, g, this.fixed, t.texture, this.shader, this.uniform);
				}
			},
			onEnd(x) {
				return R.add(x);
			},
			inspect() {
				return `count: ${O}/${t.max}`;
			},
		};
	}
	function Si(t, e = {}) {
		if (t.length < 3)
			throw new Error(
				`Polygon's need more than two points, ${t.length} points provided`
			);
		return {
			id: "polygon",
			pts: t,
			colors: e.colors,
			uv: e.uv,
			tex: e.tex,
			radius: e.radius,
			draw() {
				Pe(
					Object.assign(je(this), {
						pts: this.pts,
						colors: this.colors,
						uv: this.uv,
						tex: this.tex,
						radius: this.radius,
						fill: e.fill,
						triangulate: e.triangulate,
					})
				);
			},
			renderArea() {
				return new be(this.pts);
			},
			inspect() {
				return `polygon: ${this.pts.map((n) => `[${n.x},${n.y}]`).join(",")}`;
			},
		};
	}
	function Zn(t, e, n) {
		let r;
		return (
			a.game.root.get("area").forEach((s) => {
				if (n && n.some((u) => s.is(u))) return;
				let m = s.worldArea().raycast(t, e);
				m &&
					(r
						? m.fraction < r.fraction && ((r = m), (r.object = s))
						: ((r = m), (r.object = s)));
			}),
			r
		);
	}
	function er(t, e, n = {}) {
		return {
			id: "rect",
			width: t,
			height: e,
			radius: n.radius || 0,
			draw() {
				xe(
					Object.assign(je(this), {
						width: this.width,
						height: this.height,
						radius: this.radius,
						fill: n.fill,
					})
				);
			},
			renderArea() {
				return new W(v(0), this.width, this.height);
			},
			inspect() {
				return `rect: (${Math.ceil(this.width)}w, ${Math.ceil(this.height)}h)`;
			},
		};
	}
	function Vi(t, e) {
		return {
			id: "shader",
			shader: t,
			...(typeof e == "function"
				? {
						uniform: e(),
						update() {
							this.uniform = e();
						},
				  }
				: { uniform: e }),
			inspect() {
				return `shader: ${t}`;
			},
		};
	}
	function Pi(t, e) {
		if (!e.tileWidth || !e.tileHeight)
			throw new Error("Must provide tileWidth and tileHeight.");
		let n = a.game.root.add([Vt(e.pos ?? v(0))]),
			r = t.length,
			o = 0,
			s = null,
			i = null,
			m = null,
			u = null,
			c = (x) => x.x + x.y * o,
			p = (x) => v(Math.floor(x % o), Math.floor(x / o)),
			b = () => {
				s = [];
				for (let x of n.children) l(x);
			},
			l = (x) => {
				let w = c(x.tilePos);
				s[w] ? s[w].push(x) : (s[w] = [x]);
			},
			h = (x) => {
				let w = c(x.tilePos);
				if (s[w]) {
					let S = s[w].indexOf(x);
					S >= 0 && s[w].splice(S, 1);
				}
			},
			d = () => {
				let x = !1;
				for (let w of n.children) {
					let S = n.pos2Tile(w.pos);
					(w.tilePos.x != S.x || w.tilePos.y != S.y) &&
						((x = !0), h(w), (w.tilePos.x = S.x), (w.tilePos.y = S.y), l(w));
				}
				x && n.trigger("spatialMapChanged");
			},
			C = () => {
				let x = n.getSpatialMap(),
					w = n.numRows() * n.numColumns();
				i ? (i.length = w) : (i = new Array(w)), i.fill(1, 0, w);
				for (let S = 0; S < x.length; S++) {
					let G = x[S];
					if (G) {
						let M = 0;
						for (let D of G)
							if (D.isObstacle) {
								M = 1 / 0;
								break;
							} else M += D.cost;
						i[S] = M || 1;
					}
				}
			},
			g = () => {
				let x = n.getSpatialMap(),
					w = n.numRows() * n.numColumns();
				m ? (m.length = w) : (m = new Array(w)), m.fill(15, 0, w);
				for (let S = 0; S < x.length; S++) {
					let G = x[S];
					if (G) {
						let M = G.length,
							D = 15;
						for (let L = 0; L < M; L++) D |= G[L].edgeMask;
						m[S] = D;
					}
				}
			},
			y = () => {
				let x = n.numRows() * n.numColumns(),
					w = (G, M) => {
						let D = [];
						for (D.push(G); D.length > 0; ) {
							let L = D.pop();
							R(L).forEach((U) => {
								u[U] < 0 && ((u[U] = M), D.push(U));
							});
						}
					};
				u ? (u.length = x) : (u = new Array(x)), u.fill(-1, 0, x);
				let S = 0;
				for (let G = 0; G < i.length; G++) {
					if (u[G] >= 0) {
						S++;
						continue;
					}
					w(G, S), S++;
				}
			},
			O = (x, w) => i[w],
			A = (x, w) => {
				let S = p(x),
					G = p(w);
				return S.dist(G);
			},
			R = (x, w) => {
				let S = [],
					G = Math.floor(x % o),
					M = G > 0 && m[x] & 1 && i[x - 1] !== 1 / 0,
					D = x >= o && m[x] & 2 && i[x - o] !== 1 / 0,
					L = G < o - 1 && m[x] & 4 && i[x + 1] !== 1 / 0,
					U = x < o * r - o - 1 && m[x] & 8 && i[x + o] !== 1 / 0;
				return (
					w
						? (M &&
								(D && S.push(x - o - 1), S.push(x - 1), U && S.push(x + o - 1)),
						  D && S.push(x - o),
						  L &&
								(D && S.push(x - o + 1), S.push(x + 1), U && S.push(x + o + 1)),
						  U && S.push(x + o))
						: (M && S.push(x - 1),
						  D && S.push(x - o),
						  L && S.push(x + 1),
						  U && S.push(x + o)),
					S
				);
			},
			V = {
				id: "level",
				tileWidth() {
					return e.tileWidth;
				},
				tileHeight() {
					return e.tileHeight;
				},
				spawn(x, ...w) {
					let S = v(...w),
						G = (() => {
							if (typeof x == "string") {
								if (e.tiles[x]) {
									if (typeof e.tiles[x] != "function")
										throw new Error(
											"Level symbol def must be a function returning a component list"
										);
									return e.tiles[x](S);
								} else if (e.wildcardTile) return e.wildcardTile(x, S);
							} else {
								if (Array.isArray(x)) return x;
								throw new Error("Expected a symbol or a component list");
							}
						})();
					if (!G) return null;
					let M = !1,
						D = !1;
					for (let U of G)
						U.id === "tile" && (D = !0), U.id === "pos" && (M = !0);
					M || G.push(Vt(this.tile2Pos(S))), D || G.push(tr());
					let L = n.add(G);
					return (
						M && (L.tilePosOffset = L.pos.clone()),
						(L.tilePos = S),
						(L.transform = pt(L)),
						s &&
							(l(L),
							this.trigger("spatialMapChanged"),
							this.trigger("navigationMapInvalid")),
						L
					);
				},
				numColumns() {
					return o;
				},
				numRows() {
					return r;
				},
				levelWidth() {
					return o * this.tileWidth();
				},
				levelHeight() {
					return r * this.tileHeight();
				},
				tile2Pos(...x) {
					return v(...x).scale(this.tileWidth(), this.tileHeight());
				},
				pos2Tile(...x) {
					let w = v(...x);
					return v(
						Math.floor(w.x / this.tileWidth()),
						Math.floor(w.y / this.tileHeight())
					);
				},
				getSpatialMap() {
					return s || b(), s;
				},
				removeFromSpatialMap: h,
				insertIntoSpatialMap: l,
				onSpatialMapChanged(x) {
					return this.on("spatialMapChanged", x);
				},
				onNavigationMapInvalid(x) {
					return this.on("navigationMapInvalid", x);
				},
				getAt(x) {
					s || b();
					let w = c(x);
					return s[w] || [];
				},
				raycast(x, w) {
					let S = this.toWorld(x),
						G = this.toWorld(x.add(w)).sub(S),
						M = 1 / this.tileWidth(),
						D = x.scale(M),
						L = _o(
							D,
							w,
							(U) => {
								let H = this.getAt(U);
								if (H.some((_) => _.isObstacle)) return !0;
								let Y = null;
								for (let _ of H)
									if (_.has("area")) {
										let J = _.worldArea().raycast(S, G);
										J &&
											(Y
												? J.fraction < Y.fraction && ((Y = J), (Y.object = _))
												: ((Y = J), (Y.object = _)));
									}
								return (
									Y && (Y.point = this.fromWorld(Y.point).scale(M)), Y || !1
								);
							},
							64
						);
					return L && (L.point = L.point.scale(this.tileWidth())), L;
				},
				update() {
					s && d();
				},
				invalidateNavigationMap() {
					(i = null), (m = null), (u = null);
				},
				onNavigationMapChanged(x) {
					return this.on("navigationMapChanged", x);
				},
				getTilePath(x, w, S = {}) {
					if (
						(i || C(),
						m || g(),
						u || y(),
						x.x < 0 ||
							x.x >= o ||
							x.y < 0 ||
							x.y >= r ||
							w.x < 0 ||
							w.x >= o ||
							w.y < 0 ||
							w.y >= r)
					)
						return null;
					let G = c(x),
						M = c(w);
					if (i[M] === 1 / 0) return null;
					if (G === M) return [];
					if (u[G] != -1 && u[G] !== u[M]) return null;
					let D = new jt((K, J) => K.cost < J.cost);
					D.insert({ cost: 0, node: G });
					let L = new Map();
					L.set(G, G);
					let U = new Map();
					for (U.set(G, 0); D.length !== 0; ) {
						let K = D.remove()?.node;
						if (K === M) break;
						let J = R(K, S.allowDiagonals);
						for (let $ of J) {
							let Z = (U.get(K) || 0) + O(K, $) + A($, M);
							(!U.has($) || Z < U.get($)) &&
								(U.set($, Z), D.insert({ cost: Z, node: $ }), L.set($, K));
						}
					}
					let H = [],
						Y = M,
						_ = p(Y);
					for (H.push(_); Y !== G; ) {
						let K = L.get(Y);
						if (K === void 0) throw new Error("Bug in pathfinding algorithm");
						Y = K;
						let J = p(Y);
						H.push(J);
					}
					return H.reverse();
				},
				getPath(x, w, S = {}) {
					let G = this.tileWidth(),
						M = this.tileHeight(),
						D = this.getTilePath(this.pos2Tile(x), this.pos2Tile(w), S);
					return D
						? [
								x,
								...D.slice(1, -1).map((L) => L.scale(G, M).add(G / 2, M / 2)),
								w,
						  ]
						: null;
				},
			};
		return (
			n.use(V),
			n.onNavigationMapInvalid(() => {
				n.invalidateNavigationMap(), n.trigger("navigationMapChanged");
			}),
			t.forEach((x, w) => {
				let S = x.split("");
				(o = Math.max(S.length, o)),
					S.forEach((G, M) => {
						n.spawn(G, v(M, w));
					});
			}),
			n
		);
	}
	function Ge(t, e, n) {
		return (
			a.game.objEvents.registers[t] ||
				(a.game.objEvents.registers[t] = new nn()),
			a.game.objEvents.on(t, (r, ...o) => {
				r.is(e) && n(r, ...o);
			})
		);
	}
	var Gi = (t, e, ...n) => {
			for (let r of a.game.root.children) r.is(e) && r.trigger(t, n);
		},
		Mi = ne(
			(t) => {
				let e = a.game.root.add([{ fixedUpdate: t }]);
				return {
					get paused() {
						return e.paused;
					},
					set paused(n) {
						e.paused = n;
					},
					cancel: () => e.destroy(),
				};
			},
			(t, e) => Ge("fixedUpdate", t, e)
		),
		nr = ne(
			(t) => {
				let e = a.game.root.add([{ update: t }]);
				return {
					get paused() {
						return e.paused;
					},
					set paused(n) {
						e.paused = n;
					},
					cancel: () => e.destroy(),
				};
			},
			(t, e) => Ge("update", t, e)
		),
		Ri = ne(
			(t) => {
				let e = a.game.root.add([{ draw: t }]);
				return {
					get paused() {
						return e.hidden;
					},
					set paused(n) {
						e.hidden = n;
					},
					cancel: () => e.destroy(),
				};
			},
			(t, e) => Ge("draw", t, e)
		),
		to = ne(
			(t) => a.game.events.on("add", t),
			(t, e) => Ge("add", t, e)
		),
		Di = ne(
			(t) => a.game.events.on("destroy", t),
			(t, e) => Ge("destroy", t, e)
		),
		Bi = ne(
			(t) => a.game.events.on("use", t),
			(t, e) => Ge("use", t, e)
		),
		Fi = ne(
			(t) => a.game.events.on("unuse", t),
			(t, e) => Ge("unuse", t, e)
		),
		no = ne(
			(t) => a.game.events.on("tag", t),
			(t, e) => Ge("tag", t, e)
		),
		Li = ne(
			(t) => a.game.events.on("untag", t),
			(t, e) => Ge("untag", t, e)
		);
	function ji(t, e, n) {
		return Ge("collide", t, (r, o, s) => o.is(e) && n(r, o, s));
	}
	function Ii(t, e, n) {
		return Ge("collideUpdate", t, (r, o, s) => o.is(e) && n(r, o, s));
	}
	function Ki(t, e, n) {
		return Ge("collideEnd", t, (r, o, s) => o.is(e) && n(r, o, s));
	}
	function rr(t, e) {
		a.game.root.get(t, { recursive: !0 }).forEach(e),
			to(t, e),
			no((n, r) => {
				r === t && e(n);
			});
	}
	var ki = ne(
		(t) => a.app.onMousePress(t),
		(t, e) => {
			let n = [];
			return (
				rr(t, (r) => {
					if (!r.area)
						throw new Error(
							"onClick() requires the object to have area() component"
						);
					n.push(r.onClick(() => e(r)));
				}),
				ke.join(n)
			);
		}
	);
	function _i(t, e) {
		let n = [];
		return (
			rr(t, (r) => {
				if (!r.area)
					throw new Error(
						"onHover() requires the object to have area() component"
					);
				n.push(r.onHover(() => e(r)));
			}),
			ke.join(n)
		);
	}
	function Ni(t, e) {
		let n = [];
		return (
			rr(t, (r) => {
				if (!r.area)
					throw new Error(
						"onHoverUpdate() requires the object to have area() component"
					);
				n.push(r.onHoverUpdate(() => e(r)));
			}),
			ke.join(n)
		);
	}
	function Ui(t, e) {
		let n = [];
		return (
			rr(t, (r) => {
				if (!r.area)
					throw new Error(
						"onHoverEnd() requires the object to have area() component"
					);
				n.push(r.onHoverEnd(() => e(r)));
			}),
			ke.join(n)
		);
	}
	function Hi(t) {
		a.game.events.on("loading", t);
	}
	function qi(t) {
		a.app.onResize(t);
	}
	function zi(t) {
		a.game.events.on("error", t);
	}
	function _t(t) {
		a.assets.loaded ? t() : a.game.events.on("load", t);
	}
	function Wi(t) {
		if (a.assets.loaded) Nn().forEach((e) => t(...e));
		else return a.game.events.on("loadError", t);
	}
	function ro(...t) {
		a.game.cam.pos = v(...t);
	}
	function oo() {
		return a.game.cam.pos ? a.game.cam.pos.clone() : wt();
	}
	function so(...t) {
		a.game.cam.scale = v(...t);
	}
	function io() {
		return a.game.cam.scale.clone();
	}
	function ao(t) {
		a.game.cam.angle = t;
	}
	function uo() {
		return a.game.cam.angle;
	}
	function Yi() {
		return a.game.cam.transform.clone();
	}
	function co(t = I(255, 255, 255), e = 1) {
		let n = a.game.root.add([er(ie(), ue()), Qn(t), Jn(1), ir()]),
			r = n.fadeOut(e);
		return r.onEnd(() => sr(n)), r;
	}
	function $i() {
		return a.game.cam.transform.clone();
	}
	function Xi(t = 12) {
		a.game.cam.shake += t;
	}
	function mn(t) {
		return a.game.cam.transform.multVec2(t);
	}
	function or(t) {
		return a.game.cam.transform.invert().multVec2(t);
	}
	function Qi(...t) {
		return (
			et("camPos", "setCamPos / getCamPos"), t.length > 0 && ro(...t), oo()
		);
	}
	function Ji(...t) {
		return (
			et("camScale", "setCamScale / getCamScale"),
			t.length > 0 && so(...t),
			io()
		);
	}
	function Zi(t) {
		return et("camRot", "setCamRot / getCamRot"), t !== void 0 && ao(t), uo();
	}
	function ea(t = I(255, 255, 255), e = 1) {
		return et("camFlash", "flash"), co(t, e);
	}
	function pn(t = []) {
		let e = new Map(),
			n = [],
			r = {},
			o = new ze(),
			s = [],
			i = new Set("*"),
			m = a.globalOpt.tagsAsComponents,
			u = null,
			c = !1,
			p = {
				id: Os(),
				hidden: !1,
				transform: new fe(),
				children: [],
				parent: null,
				set paused(l) {
					if (l !== c) {
						c = l;
						for (let h of s) h.paused = l;
					}
				},
				get paused() {
					return c;
				},
				get tags() {
					return Array.from(i);
				},
				add(l) {
					let h = Array.isArray(l) ? pn(l) : l;
					if (h.parent)
						throw new Error("Cannot add a game obj that already has a parent.");
					return (
						(h.parent = this),
						(h.transform = pt(h)),
						this.children.push(h),
						h.trigger("add", h),
						a.game.events.trigger("add", h),
						h
					);
				},
				readd(l) {
					let h = this.children.indexOf(l);
					return (
						h !== -1 && (this.children.splice(h, 1), this.children.push(l)), l
					);
				},
				remove(l) {
					let h = this.children.indexOf(l);
					if (h !== -1) {
						(l.parent = null), this.children.splice(h, 1);
						let d = (C) => {
							C.trigger("destroy"),
								a.game.events.trigger("destroy", C),
								C.children.forEach((g) => d(g));
						};
						d(l);
					}
				},
				removeAll(l) {
					if (l) this.get(l).forEach((h) => this.remove(h));
					else for (let h of [...this.children]) this.remove(h);
				},
				fixedUpdate() {
					this.paused ||
						(this.children.forEach((l) => l.fixedUpdate()),
						this.trigger("fixedUpdate"));
				},
				update() {
					this.paused ||
						(this.children.forEach((l) => l.update()), this.trigger("update"));
				},
				draw() {
					if (this.hidden) return;
					this.canvas && (Ce(), this.canvas.bind());
					let l = a.gfx.fixed;
					this.fixed && (a.gfx.fixed = !0),
						ge(),
						X(this.pos),
						nt(this.scale),
						Ye(this.angle);
					let h = this.children.sort((d, C) => {
						let g = d.layerIndex ?? a.game.defaultLayerIndex,
							y = C.layerIndex ?? a.game.defaultLayerIndex;
						return g - y || (d.z ?? 0) - (C.z ?? 0);
					});
					if (this.mask) {
						let d = { intersect: a.k.drawMasked, subtract: a.k.drawSubtracted }[
							this.mask
						];
						if (!d) throw new Error(`Invalid mask func: "${this.mask}"`);
						d(
							() => {
								h.forEach((C) => C.draw());
							},
							() => {
								this.trigger("draw");
							}
						);
					} else this.trigger("draw"), h.forEach((d) => d.draw());
					me(), (a.gfx.fixed = l), this.canvas && (Ce(), this.canvas.unbind());
				},
				drawInspect() {
					this.hidden ||
						(ge(),
						X(this.pos),
						nt(this.scale),
						Ye(this.angle),
						this.children.forEach((l) => l.drawInspect()),
						this.trigger("drawInspect"),
						me());
				},
				use(l) {
					if (typeof l == "string") return i.add(l);
					if (!l || typeof l != "object")
						throw new Error(
							`You can only pass a component or a string to .use(), you passed a "${typeof l}"`
						);
					let h = [];
					l.id
						? (this.unuse(l.id),
						  (r[l.id] = []),
						  (h = r[l.id]),
						  e.set(l.id, l),
						  m && i.add(l.id))
						: n.push(l);
					for (let C in l) {
						if (ms.has(C)) continue;
						let g = Object.getOwnPropertyDescriptor(l, C);
						if (g)
							if (
								(typeof g.value == "function" && (l[C] = l[C].bind(this)),
								g.set && Object.defineProperty(l, C, { set: g.set.bind(this) }),
								g.get && Object.defineProperty(l, C, { get: g.get.bind(this) }),
								ps.has(C))
							) {
								let y =
									C === "add"
										? () => {
												(u = (O) => h.push(O)), l[C]?.(), (u = null);
										  }
										: l[C];
								h.push(this.on(C, y).cancel);
							} else if (this[C] === void 0)
								Object.defineProperty(this, C, {
									get: () => l[C],
									set: (y) => (l[C] = y),
									configurable: !0,
									enumerable: !0,
								}),
									h.push(() => delete this[C]);
							else {
								let y = e.values().find((O) => O[C] !== void 0)?.id;
								throw new Error(
									`Duplicate component property: "${C}" while adding component "${l.id}"` +
										(y ? ` (originally added by "${y}")` : "")
								);
							}
					}
					let d = () => {
						if (l.require) {
							for (let C of l.require)
								if (!this.c(C))
									throw new Error(
										`Component "${l.id}" requires component "${C}"`
									);
						}
					};
					l.destroy && h.push(l.destroy.bind(this)),
						this.exists()
							? (d(),
							  l.add && ((u = (C) => h.push(C)), l.add.call(this), (u = null)),
							  l.id &&
									(this.trigger("use", l.id),
									a.game.events.trigger("use", this, l.id)))
							: l.require && h.push(this.on("add", d).cancel);
				},
				unuse(l) {
					if (e.has(l)) {
						for (let h of e.values())
							if (h.require && h.require.includes(l))
								throw new Error(
									`Can't unuse. Component "${h.id}" requires component "${l}"`
								);
						e.delete(l),
							this.trigger("unuse", l),
							a.game.events.trigger("unuse", this, l);
					} else m && i.has(l) && i.delete(l);
					r[l] && (r[l].forEach((h) => h()), delete r[l]);
				},
				c(l) {
					return e.get(l) ?? null;
				},
				get(l, h = {}) {
					let d = (g, y) =>
							h.only === "comps"
								? g.has(y)
								: h.only === "tags"
								? g.is(y)
								: g.is(y) || g.has(y),
						C = h.recursive
							? this.children.flatMap(function g(y) {
									return [y, ...y.children.flatMap(g)];
							  })
							: this.children;
					if (((C = C.filter((g) => (l ? d(g, l) : !0))), h.liveUpdate)) {
						let g = (O) =>
								h.recursive ? this.isAncestorOf(O) : O.parent === this,
							y = [];
						y.push(
							a.k.onAdd((O) => {
								g(O) && d(O, l) && C.push(O);
							})
						),
							y.push(
								a.k.onDestroy((O) => {
									if (g(O) && d(O, l)) {
										let A = C.findIndex((R) => R.id === O.id);
										A !== -1 && C.splice(A, 1);
									}
								})
							),
							this.onDestroy(() => {
								for (let O of y) O.cancel();
							});
					}
					return C;
				},
				query(l) {
					let h = l.hierarchy || "children",
						d = l.include,
						C = l.exclude,
						g = [];
					switch (h) {
						case "children":
							g = this.children;
							break;
						case "siblings":
							g = this.parent
								? this.parent.children.filter((O) => O !== this)
								: [];
							break;
						case "ancestors":
							let y = this.parent;
							for (; y; ) g.push(y), (y = y.parent);
							break;
						case "descendants":
							g = this.children.flatMap(function O(A) {
								return [A, ...A.children.flatMap(O)];
							});
							break;
					}
					if (
						(d &&
							((l.includeOp || "and") === "and" || !Array.isArray(l.include)
								? (g = g.filter((O) => O.is(d)))
								: (g = g.filter((O) => l.include.some((A) => O.is(A))))),
						C &&
							((l.includeOp || "and") === "and" || !Array.isArray(l.include)
								? (g = g.filter((O) => !O.is(C)))
								: (g = g.filter((O) => !l.exclude.some((A) => O.is(A))))),
						l.visible === !0 && (g = g.filter((y) => y.visible)),
						l.distance)
					) {
						if (!this.pos)
							throw Error(
								"Can't do a distance query from an object without pos"
							);
						let y = l.distanceOp || "near",
							O = l.distance * l.distance;
						y === "near"
							? (g = g.filter((A) => A.pos && this.pos.sdist(A.pos) <= O))
							: (g = g.filter((A) => A.pos && this.pos.sdist(A.pos) > O));
					}
					return l.name && (g = g.filter((y) => y.name === l.name)), g;
				},
				isAncestorOf(l) {
					return l.parent
						? l.parent === this || this.isAncestorOf(l.parent)
						: !1;
				},
				exists() {
					return a.game.root.isAncestorOf(this);
				},
				is(l, h = "and") {
					return Array.isArray(l)
						? h === "and"
							? l.every((d) => i.has(d))
							: l.some((d) => i.has(d))
						: i.has(l);
				},
				tag(l) {
					if (Array.isArray(l))
						for (let h of l)
							i.add(h),
								this.trigger("tag", h),
								a.game.events.trigger("tag", this, h);
					else
						i.add(l),
							this.trigger("tag", l),
							a.game.events.trigger("tag", this, l);
				},
				untag(l) {
					if (Array.isArray(l))
						for (let h of l)
							i.delete(h),
								this.trigger("untag", h),
								a.game.events.trigger("untag", this, h);
					else
						i.delete(l),
							this.trigger("untag", l),
							a.game.events.trigger("untag", this, l);
				},
				has(l, h = "and") {
					return Array.isArray(l)
						? h === "and"
							? l.every((d) => e.has(d))
							: l.some((d) => e.has(d))
						: e.has(l);
				},
				on(l, h) {
					let d = o.on(l, h.bind(this));
					return u && u(() => d.cancel()), d;
				},
				trigger(l, ...h) {
					o.trigger(l, ...h), a.game.objEvents.trigger(l, this, ...h);
				},
				destroy() {
					this.parent && this.parent.remove(this);
				},
				inspect() {
					let l = {};
					for (let [h, d] of e) l[h] = d.inspect?.() ?? null;
					for (let [h, d] of n.entries()) {
						if (d.inspect) {
							l[h] = d.inspect();
							continue;
						}
						for (let [C, g] of Object.entries(d))
							typeof g != "function" && (l[C] = `${C}: ${g}`);
					}
					return l;
				},
				onAdd(l) {
					return this.on("add", l);
				},
				onFixedUpdate(l) {
					return this.on("fixedUpdate", l);
				},
				onUpdate(l) {
					return this.on("update", l);
				},
				onDraw(l) {
					return this.on("draw", l);
				},
				onDestroy(l) {
					return this.on("destroy", l);
				},
				onUse(l) {
					return this.on("use", l);
				},
				onUnuse(l) {
					return this.on("unuse", l);
				},
				clearEvents() {
					o.clear();
				},
			},
			b = [
				"onKeyPress",
				"onKeyPressRepeat",
				"onKeyDown",
				"onKeyRelease",
				"onMousePress",
				"onMouseDown",
				"onMouseRelease",
				"onMouseMove",
				"onCharInput",
				"onMouseMove",
				"onTouchStart",
				"onTouchMove",
				"onTouchEnd",
				"onScroll",
				"onGamepadButtonPress",
				"onGamepadButtonDown",
				"onGamepadButtonRelease",
				"onGamepadStick",
				"onButtonPress",
				"onButtonDown",
				"onButtonRelease",
			];
		for (let l of b)
			p[l] = (...h) => {
				let d = a.app[l]?.(...h);
				return (
					s.push(d),
					p.onDestroy(() => d.cancel()),
					p.on("sceneEnter", () => {
						s.splice(s.indexOf(d), 1);
						let C = a.app[l]?.(...h);
						ke.replace(d, C), s.push(d);
					}),
					d
				);
			};
		for (let l of t) p.use(l);
		return p;
	}
	var ta = () => ({
		events: new ze(),
		objEvents: new ze(),
		root: pn([]),
		gravity: null,
		scenes: {},
		currentScene: null,
		layers: null,
		defaultLayerIndex: 0,
		logs: [],
		cam: {
			pos: null,
			scale: new E(1),
			angle: 0,
			shake: 0,
			transform: new fe(),
		},
	});
	function na(t) {
		a.game.gravity = t ? (a.game.gravity || v(0, 1)).unit().scale(t) : null;
	}
	function ra() {
		return a.game.gravity ? a.game.gravity.len() : 0;
	}
	function oa(t) {
		a.game.gravity = t.unit().scale(a.game.gravity ? a.game.gravity.len() : 1);
	}
	function ft() {
		return a.game.gravity ? a.game.gravity.unit() : v(0, 1);
	}
	var sa = Oo(
		"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"
	);
	var ia = () =>
		(() => {
			let e = new (window.AudioContext || window.webkitAudioContext)(),
				n = e.createGain();
			n.connect(e.destination);
			let r = new rt(Bs(e));
			return (
				e
					.decodeAudioData(sa.buffer.slice(0))
					.then((o) => {
						r.buf = o;
					})
					.catch((o) => {
						console.error("Failed to load burp: ", o);
					}),
				{ ctx: e, masterNode: n, burpSnd: r }
			);
		})();
	function aa(t, e = {}) {
		let n = new re(),
			r = new Audio(t);
		(r.crossOrigin = "anonymous"),
			(r.loop = !!e.loop),
			a.audio.ctx.createMediaElementSource(r).connect(a.audio.masterNode);
		function s() {
			a.debug.paused ||
				(a.app.isHidden() && !a.globalOpt.backgroundAudio) ||
				a.audio.ctx.resume();
		}
		function i() {
			s(), r.play();
		}
		return (
			e.paused || i(),
			(r.onended = () => n.trigger()),
			{
				play() {
					i();
				},
				seek(m) {
					r.currentTime = m;
				},
				stop() {
					r.pause(), this.seek(0);
				},
				set loop(m) {
					r.loop = m;
				},
				get loop() {
					return r.loop;
				},
				set paused(m) {
					m ? r.pause() : i();
				},
				get paused() {
					return r.paused;
				},
				time() {
					return r.currentTime;
				},
				duration() {
					return r.duration;
				},
				set volume(m) {
					r.volume = Te(m, 0, 1);
				},
				get volume() {
					return r.volume;
				},
				set speed(m) {
					r.playbackRate = Math.max(m, 0);
				},
				get speed() {
					return r.playbackRate;
				},
				set detune(m) {},
				get detune() {
					return 0;
				},
				onEnd(m) {
					return n.add(m);
				},
				then(m) {
					return this.onEnd(m);
				},
			}
		);
	}
	function ua(t, e = {}) {
		if (typeof t == "string" && a.assets.music[t])
			return aa(a.assets.music[t], e);
		let n = a.audio.ctx,
			r = e.paused ?? !1,
			o = n.createBufferSource(),
			s = new re(),
			i = n.createGain(),
			m = n.createStereoPanner(),
			u = e.seek ?? 0,
			c = 0,
			p = 0,
			b = !1;
		(o.loop = !!e.loop),
			(o.detune.value = e.detune ?? 0),
			(o.playbackRate.value = e.speed ?? 1),
			o.connect(m),
			(o.onended = () => {
				d() >= (o.buffer?.duration ?? Number.POSITIVE_INFINITY) && s.trigger();
			}),
			(m.pan.value = e.pan ?? 0),
			m.connect(i),
			i.connect(a.audio.masterNode),
			(i.gain.value = e.volume ?? 1);
		let l = (g) => {
				(o.buffer = g.buf), r || ((c = n.currentTime), o.start(0, u), (b = !0));
			},
			h = si(t);
		h instanceof ce && h.onLoad(l);
		let d = () => {
				if (!o.buffer) return 0;
				let g = r ? p - c : n.currentTime - c,
					y = o.buffer.duration;
				return o.loop ? g % y : Math.min(g, y);
			},
			C = (g) => {
				let y = n.createBufferSource();
				return (
					(y.buffer = g.buffer),
					(y.loop = g.loop),
					(y.playbackRate.value = g.playbackRate.value),
					(y.detune.value = g.detune.value),
					(y.onended = g.onended),
					y.connect(m),
					y
				);
			};
		return {
			stop() {
				(this.paused = !0), this.seek(0);
			},
			set paused(g) {
				if (r !== g)
					if (((r = g), g)) b && (o.stop(), (b = !1)), (p = n.currentTime);
					else {
						o = C(o);
						let y = p - c;
						o.start(0, y), (b = !0), (c = n.currentTime - y), (p = 0);
					}
			},
			get paused() {
				return r;
			},
			play(g = 0) {
				this.seek(g), (this.paused = !1);
			},
			seek(g) {
				o.buffer?.duration &&
					(g > o.buffer.duration ||
						(r
							? ((o = C(o)), (c = p - g))
							: (o.stop(),
							  (o = C(o)),
							  (c = n.currentTime - g),
							  o.start(0, g),
							  (b = !0),
							  (p = 0))));
			},
			set speed(g) {
				o.playbackRate.value = g;
			},
			get speed() {
				return o.playbackRate.value;
			},
			set detune(g) {
				o.detune.value = g;
			},
			get detune() {
				return o.detune.value;
			},
			set volume(g) {
				i.gain.value = Math.max(g, 0);
			},
			get volume() {
				return i.gain.value;
			},
			set pan(g) {
				m.pan.value = g;
			},
			get pan() {
				return m.pan.value;
			},
			set loop(g) {
				o.loop = g;
			},
			get loop() {
				return o.loop;
			},
			duration() {
				return o.buffer?.duration ?? 0;
			},
			time() {
				return d() % this.duration();
			},
			onEnd(g) {
				return s.add(g);
			},
			then(g) {
				return this.onEnd(g);
			},
		};
	}
	function ar(t) {
		return a.k.play(a.audio.burpSnd, t);
	}
	function lo(t) {
		a.audio.masterNode.gain.value = t;
	}
	function mo() {
		return a.audio.masterNode.gain.value;
	}
	function ca(t) {
		return et("volume", "setVolume / getVolume"), t !== void 0 && lo(t), mo();
	}
	function ur() {
		a.app.onHide(() => {
			a.globalOpt.backgroundAudio || a.audio.ctx.suspend();
		}),
			a.app.onShow(() => {
				!a.globalOpt.backgroundAudio && !a.debug.paused && a.audio.ctx.resume();
			}),
			a.app.onResize(() => {
				if (a.app.isFullscreen()) return;
				let t = a.globalOpt.width && a.globalOpt.height;
				(t && !a.globalOpt.stretch && !a.globalOpt.letterbox) ||
					((a.canvas.width = a.canvas.offsetWidth * a.pixelDensity),
					(a.canvas.height = a.canvas.offsetHeight * a.pixelDensity),
					Ln(),
					t ||
						(a.gfx.frameBuffer.free(),
						(a.gfx.frameBuffer = new ot(
							a.gfx.ggl,
							a.gfx.ggl.gl.drawingBufferWidth,
							a.gfx.ggl.gl.drawingBufferHeight
						)),
						(a.gfx.width =
							a.gfx.ggl.gl.drawingBufferWidth / a.pixelDensity / a.gscale),
						(a.gfx.height =
							a.gfx.ggl.gl.drawingBufferHeight / a.pixelDensity / a.gscale)));
			}),
			a.globalOpt.debug !== !1 &&
				(a.app.onKeyPress(
					a.globalOpt.debugKey ?? "f1",
					() => (a.debug.inspect = !a.debug.inspect)
				),
				a.app.onKeyPress("f2", () => a.debug.clearLog()),
				a.app.onKeyPress("f8", () => (a.debug.paused = !a.debug.paused)),
				a.app.onKeyPress("f7", () => {
					a.debug.timeScale = rn(Te(a.debug.timeScale - 0.2, 0, 2), 1);
				}),
				a.app.onKeyPress("f9", () => {
					a.debug.timeScale = rn(Te(a.debug.timeScale + 0.2, 0, 2), 1);
				}),
				a.app.onKeyPress("f10", () => a.debug.stepFrame())),
			a.globalOpt.burp && a.app.onKeyPress("b", () => ar());
	}
	function la(t, e = {}) {
		let n = a.game.root.add([Vt(t), cr()]),
			r = (e.speed || 1) * 5,
			o = e.scale || 1;
		n.add([
			dn(a.boomSprite),
			Nt(0),
			fn("center"),
			po(r, o),
			...(e.comps ?? []),
		]);
		let s = n.add([
			dn(a.kaSprite),
			Nt(0),
			fn("center"),
			hn(),
			...(e.comps ?? []),
		]);
		return (
			s.wait(0.4 / r, () => s.use(po(r, o))), s.onDestroy(() => n.destroy()), n
		);
	}
	function fo(t, e) {
		if (a.game.layers) throw Error("Layers can only be assigned once.");
		let n = t.indexOf(e);
		if (n == -1)
			throw Error(
				"The default layer name should be present in the layers list."
			);
		(a.game.layers = t), (a.game.defaultLayerIndex = n);
	}
	function ma() {
		return a.game.layers;
	}
	function pa() {
		return a.game.layers?.[a.game.defaultLayerIndex] ?? null;
	}
	function da(t, e) {
		et("layers", "setLayers"), fo(t, e);
	}
	function sr(t) {
		t.destroy();
	}
	function fa() {
		return a.game.root;
	}
	function ha(t, e) {
		a.game.scenes[t] = e;
	}
	function ga(t, ...e) {
		if (!a.game.scenes[t]) throw new Error(`Scene not found: ${t}`);
		a.game.events.onOnce("frameEnd", () => {
			a.game.events.trigger("sceneLeave", t),
				a.app.events.clear(),
				a.game.events.clear(),
				a.game.objEvents.clear(),
				[...a.game.root.children].forEach((n) => {
					!n.stay || (n.scenesToStay && !n.scenesToStay.includes(t))
						? a.game.root.remove(n)
						: n.trigger("sceneEnter", t);
				}),
				a.game.root.clearEvents(),
				ur(),
				(a.game.cam = {
					pos: null,
					scale: v(1),
					angle: 0,
					shake: 0,
					transform: new fe(),
				}),
				a.game.scenes[t](...e);
		}),
			(a.game.currentScene = t);
	}
	function ba(t) {
		return a.game.events.on("sceneLeave", t);
	}
	function ya() {
		return a.game.currentScene;
	}
	function dn(t, e = {}) {
		let n = null,
			r = null,
			o = null,
			s = new re();
		if (!t)
			throw new Error("Please pass the resource name or data to sprite()");
		let i = (c, p, b, l) => {
				let h = v(1, 1);
				return (
					b && l
						? ((h.x = b / (c.width * p.w)), (h.y = l / (c.height * p.h)))
						: b
						? ((h.x = b / (c.width * p.w)), (h.y = h.x))
						: l && ((h.y = l / (c.height * p.h)), (h.x = h.y)),
					h
				);
			},
			m = (c, p) => {
				if (!p) return;
				let b = p.frames[0].clone();
				e.quad && (b = b.scale(e.quad));
				let l = i(p.tex, b, e.width, e.height);
				if (
					((c.width = p.tex.width * b.w * l.x),
					(c.height = p.tex.height * b.h * l.y),
					p.anims)
				)
					for (let h in p.anims) {
						let d = p.anims[h];
						typeof d != "number" && (d.frames = u(d));
					}
				(n = p), s.trigger(n), e.anim && c.play(e.anim);
			},
			u = (c) => {
				if (c.frames) return c.frames;
				let p = [];
				if (c.from === void 0 || c.to === void 0)
					throw new Error(
						"Sprite anim 'from' and 'to' must be defined if 'frames' is not defined"
					);
				let b = Math.abs(c.to - c.from) + 1;
				for (let l = 0; l < b; l++)
					p.push(c.from + l * Math.sign(c.to - c.from));
				if (c.pingpong) for (let l = b - 2; l > 0; l--) p.push(p[l]);
				return p;
			};
		return {
			id: "sprite",
			width: 0,
			height: 0,
			frame: e.frame || 0,
			quad: e.quad || new q(0, 0, 1, 1),
			animSpeed: e.animSpeed ?? 1,
			flipX: e.flipX ?? !1,
			flipY: e.flipY ?? !1,
			get sprite() {
				return t.toString();
			},
			set sprite(c) {
				let p = It(c);
				p && p.onLoad((b) => m(this, b));
			},
			get animFrame() {
				if (!n || !r || o === null) return this.frame;
				let c = n.anims[r.name];
				return typeof c == "number"
					? c
					: c.from === void 0 || c.to === void 0
					? r.frameIndex
					: this.frame - Math.min(c.from, c.to);
			},
			draw() {
				if (!n) return;
				let c = n.frames[this.frame ?? 0];
				if (!c) throw new Error(`Frame not found: ${this.frame ?? 0}`);
				if (n.slice9) {
					let { left: p, right: b, top: l, bottom: h } = n.slice9,
						d = n.tex.width * c.w,
						C = n.tex.height * c.h,
						g = this.width - p - b,
						y = this.height - l - h,
						O = p / d,
						A = b / d,
						R = 1 - O - A,
						V = l / C,
						x = h / C,
						w = 1 - V - x,
						S = [
							le(0, 0, O, V),
							le(O, 0, R, V),
							le(O + R, 0, A, V),
							le(0, V, O, w),
							le(O, V, R, w),
							le(O + R, V, A, w),
							le(0, V + w, O, x),
							le(O, V + w, R, x),
							le(O + R, V + w, A, x),
							le(0, 0, p, l),
							le(p, 0, g, l),
							le(p + g, 0, b, l),
							le(0, l, p, y),
							le(p, l, g, y),
							le(p + g, l, b, y),
							le(0, l + y, p, h),
							le(p, l + y, g, h),
							le(p + g, l + y, b, h),
						];
					for (let G = 0; G < 9; G++) {
						let M = S[G],
							D = S[G + 9];
						St(
							Object.assign(je(this), {
								pos: D.pos(),
								tex: n.tex,
								quad: c.scale(M),
								flipX: this.flipX,
								flipY: this.flipY,
								tiled: e.tiled,
								width: D.w,
								height: D.h,
							})
						);
					}
				} else
					St(
						Object.assign(je(this), {
							tex: n.tex,
							quad: c.scale(this.quad ?? new q(0, 0, 1, 1)),
							flipX: this.flipX,
							flipY: this.flipY,
							tiled: e.tiled,
							width: this.width,
							height: this.height,
						})
					);
			},
			add() {
				let c = It(t);
				c ? c.onLoad((p) => m(this, p)) : _t(() => m(this, It(t).data));
			},
			update() {
				if (!n || !r || o === null) return;
				let c = n.anims[r.name];
				if (typeof c == "number") {
					this.frame = c;
					return;
				}
				if (c.speed === 0) throw new Error("Sprite anim speed cannot be 0");
				if (((r.timer += ee() * this.animSpeed), r.timer >= 1 / r.speed)) {
					(r.timer = 0), (r.frameIndex += o);
					let p = c.frames;
					if (r.frameIndex >= p.length)
						if (r.pingpong && !c.pingpong)
							(o = -1), (r.frameIndex = p.length - 2);
						else if (r.loop) r.frameIndex = 0;
						else {
							(this.frame = p.at(-1)), r.onEnd(), this.stop();
							return;
						}
					else if (r.frameIndex < 0)
						if (r.pingpong && r.loop) (o = 1), (r.frameIndex = 1);
						else if (r.loop) r.frameIndex = p.length - 1;
						else {
							(this.frame = p[0]), r.onEnd(), this.stop();
							return;
						}
					this.frame = p[r.frameIndex];
				}
			},
			play(c, p = {}) {
				if (!n) {
					s.add(() => this.play(c, p));
					return;
				}
				let b = n.anims[c];
				if (b === void 0) throw new Error(`Anim not found: ${c}`);
				r && this.stop(),
					(r =
						typeof b == "number"
							? {
									name: c,
									timer: 0,
									loop: !1,
									pingpong: !1,
									speed: 0,
									frameIndex: 0,
									onEnd: () => {},
							  }
							: {
									name: c,
									timer: 0,
									loop: p.loop ?? b.loop ?? !1,
									pingpong: p.pingpong ?? b.pingpong ?? !1,
									speed: p.speed ?? b.speed ?? 10,
									frameIndex: 0,
									onEnd: p.onEnd ?? (() => {}),
							  }),
					(o = typeof b == "number" ? null : 1),
					(this.frame = typeof b == "number" ? b : b.frames[0]),
					this.trigger("animStart", c);
			},
			stop() {
				if (!r) return;
				let c = r.name;
				(r = null), this.trigger("animEnd", c);
			},
			numFrames() {
				return n?.frames.length ?? 0;
			},
			getCurAnim() {
				return r;
			},
			curAnim() {
				return r?.name;
			},
			getAnim(c) {
				return n?.anims[c] ?? null;
			},
			hasAnim(c) {
				return !!this.getAnim(c);
			},
			onAnimEnd(c) {
				return this.on("animEnd", c);
			},
			onAnimStart(c) {
				return this.on("animStart", c);
			},
			renderArea() {
				return new W(v(0), this.width, this.height);
			},
			inspect() {
				return typeof t == "string" ? `sprite: "${t}"` : null;
			},
		};
	}
	function xa(t, e = {}) {
		function n(o) {
			let s = Ue(
				Object.assign(je(o), {
					text: o.text + "",
					size: o.textSize,
					font: o.font,
					width: e.width && o.width,
					align: o.align,
					letterSpacing: o.letterSpacing,
					lineSpacing: o.lineSpacing,
					transform: o.textTransform,
					styles: o.textStyles,
					indentAll: e.indentAll,
				})
			);
			return (
				e.width || (o.width = s.width / (o.scale?.x || 1)),
				(o.height = s.height / (o.scale?.y || 1)),
				s
			);
		}
		let r = {
			id: "text",
			set text(o) {
				(t = o), n(this), (this.renderedText = Yn(t).text);
			},
			get text() {
				return t;
			},
			textSize: e.size ?? 36,
			font: e.font,
			width: e.width ?? 0,
			height: 0,
			align: e.align,
			lineSpacing: e.lineSpacing,
			letterSpacing: e.letterSpacing,
			textTransform: e.transform,
			textStyles: e.styles,
			renderedText: t ? Yn(t).text : "",
			add() {
				_t(() => n(this));
			},
			draw() {
				He(n(this));
			},
			renderArea() {
				return new W(v(0), this.width, this.height);
			},
		};
		return n(r), r;
	}
	function va(t, e) {
		return {
			id: "rect",
			width: t,
			height: e,
			draw() {
				st(Object.assign(je(this), { width: this.width, height: this.height }));
			},
			renderArea() {
				return new W(v(0), this.width, this.height);
			},
			inspect() {
				return `uvquad: (${Math.ceil(this.width)}w, ${Math.ceil(
					this.height
				)})h`;
			},
		};
	}
	function wa(t = {}) {
		let e = null,
			n = null,
			r = null,
			o = null;
		return {
			id: "agent",
			require: ["pos", "tile"],
			agentSpeed: t.speed ?? 100,
			allowDiagonals: t.allowDiagonals ?? !0,
			getDistanceToTarget() {
				return e ? this.pos.dist(e) : 0;
			},
			getNextLocation() {
				return n && r ? n[r] : null;
			},
			getPath() {
				return n ? n.slice() : null;
			},
			getTarget() {
				return e;
			},
			isNavigationFinished() {
				return n ? r === null : !0;
			},
			isTargetReachable() {
				return n !== null;
			},
			isTargetReached() {
				return e ? this.pos.eq(e) : !0;
			},
			setTarget(s) {
				(e = s),
					(n = this.getLevel().getPath(this.pos, e, {
						allowDiagonals: this.allowDiagonals,
					})),
					(r = n ? 0 : null),
					n && r !== null
						? (o ||
								((o = this.getLevel().onNavigationMapChanged(() => {
									e &&
										n &&
										r !== null &&
										((n = this.getLevel().getPath(this.pos, e, {
											allowDiagonals: this.allowDiagonals,
										})),
										n
											? ((r = 0), this.trigger("navigationNext", this, n[r]))
											: ((r = null), this.trigger("navigationEnded", this)));
								})),
								this.onDestroy(() => o?.cancel())),
						  this.trigger("navigationStarted", this),
						  this.trigger("navigationNext", this, n[r]))
						: this.trigger("navigationEnded", this);
			},
			update() {
				if (e && n && r !== null) {
					if (this.pos.sdist(n[r]) < 2)
						if (r === n.length - 1) {
							(this.pos = e.clone()),
								(r = null),
								this.trigger("navigationEnded", this),
								this.trigger("targetReached", this);
							return;
						} else r++, this.trigger("navigationNext", this, n[r]);
					this.moveTo(n[r], this.agentSpeed);
				}
			},
			onNavigationStarted(s) {
				return this.on("navigationStarted", s);
			},
			onNavigationNext(s) {
				return this.on("navigationNext", s);
			},
			onNavigationEnded(s) {
				return this.on("navigationEnded", s);
			},
			onTargetReached(s) {
				return this.on("targetReached", s);
			},
			inspect() {
				return (
					"agent: " +
					JSON.stringify({ target: JSON.stringify(e), path: JSON.stringify(n) })
				);
			},
		};
	}
	function Ca(t) {
		let e = t.graph;
		return {
			id: "pathfinder",
			require: ["pos"],
			navigateTo(n) {
				return this.graph?.getWaypointPath(this.pos, n, t.navigationOpt);
			},
			get graph() {
				if (e) return e;
				let n = this.parent;
				for (; n; ) {
					if (n.has("pathfinderMap")) return n.graph;
					n = n.parent;
				}
			},
			set graph(n) {
				e = n;
			},
		};
	}
	function Ea(t = {}) {
		let e = t.waypoints,
			n = t.speed || 100,
			r = t.endBehavior || "stop",
			o = 0,
			s = e != null;
		return {
			id: "patrol",
			require: ["pos"],
			get patrolSpeed() {
				return n;
			},
			set patrolSpeed(i) {
				n = i;
			},
			get waypoints() {
				return e;
			},
			set waypoints(i) {
				(e = i), (o = 0), (s = !1);
			},
			get nextLocation() {
				return e ? e[o] : void 0;
			},
			update() {
				let i = this.nextLocation;
				if (!(!e || !i || s) && (this.moveTo(i, n), this.pos.sdist(i) < 9))
					switch (r) {
						case "loop":
							o = (o + 1) % e.length;
							break;
						case "ping-pong":
							(o = o + 1), o == e.length && (e.reverse(), (o = 0));
							break;
						case "stop":
							(o = Math.min(o + 1, e.length - 1)),
								o == e.length - 1 && ((s = !0), this.trigger("patrolFinished"));
							break;
					}
			},
			onPatrolFinished(i) {
				return this.on("patrolFinished", i);
			},
		};
	}
	function Ta(t, e = {}) {
		let n = typeof t == "function" ? t : () => a.game.root.query(t),
			r = e.checkFrequency || 1,
			o =
				typeof e.direction == "number" ? E.fromAngle(e.direction) : e.direction,
			s = 0;
		return {
			id: "sentry",
			require: ["pos"],
			direction:
				typeof e.direction == "number" ? E.fromAngle(e.direction) : e.direction,
			spotted: [],
			set directionAngle(i) {
				this.direction = i !== void 0 ? E.fromAngle(i) : void 0;
			},
			get directionAngle() {
				return this.direction ? this.direction.angle() : void 0;
			},
			fieldOfView: e.fieldOfView || 200,
			isWithinFieldOfView(i, m, u) {
				let c = (typeof m == "number" ? E.fromAngle(m) : m) || o,
					p = u || e.fieldOfView;
				if (!c || !p || p >= 360) return !0;
				let b = p / 2;
				return i.pos && c.angleBetween(i.pos.sub(this.pos)) <= b;
			},
			hasLineOfSight(i) {
				let m = Zn(this.pos, i.pos.sub(this.pos), e.raycastExclude);
				return m != null && m.object === i;
			},
			update() {
				if (((s += ee()), s > r)) {
					s -= r;
					let i = n();
					if (i.length && o && this.fieldOfView && this.fieldOfView < 360) {
						let m = this.fieldOfView / 2;
						i = i.filter(
							(u) => u.pos && o.angleBetween(u.pos.sub(this.pos)) <= m
						);
					}
					i.length &&
						e.lineOfSight &&
						(i = i.filter((m) => m.pos && this.hasLineOfSight(m))),
						i.length > 0 &&
							((this.spotted = i), this.trigger("objectSpotted", i));
				}
			},
			onObjectsSpotted(i) {
				return this.on("objectSpotted", i);
			},
		};
	}
	function tr(t = {}) {
		let e = v(0),
			n = t.isObstacle ?? !1,
			r = t.cost ?? 0,
			o = t.edges ?? [],
			s = () => {
				let m = { left: 1, top: 2, right: 4, bottom: 8 };
				return o.map((u) => m[u] || 0).reduce((u, c) => u | c, 0);
			},
			i = s();
		return {
			id: "tile",
			tilePosOffset: t.offset ?? v(0),
			set tilePos(m) {
				let u = this.getLevel();
				(e = m.clone()),
					(this.pos = v(
						this.tilePos.x * u.tileWidth(),
						this.tilePos.y * u.tileHeight()
					).add(this.tilePosOffset));
			},
			get tilePos() {
				return e;
			},
			set isObstacle(m) {
				n !== m && ((n = m), this.getLevel().invalidateNavigationMap());
			},
			get isObstacle() {
				return n;
			},
			set cost(m) {
				r !== m && ((r = m), this.getLevel().invalidateNavigationMap());
			},
			get cost() {
				return r;
			},
			set edges(m) {
				(o = m), (i = s()), this.getLevel().invalidateNavigationMap();
			},
			get edges() {
				return o;
			},
			get edgeMask() {
				return i;
			},
			getLevel() {
				return this.parent;
			},
			tileMove(m) {
				let u = this.getLevel();
				u.removeFromSpatialMap(this),
					(this.tilePos = this.tilePos.add(m)),
					u.insertIntoSpatialMap(this),
					u.trigger("spatialMapChanged");
			},
			moveLeft() {
				this.tileMove(v(-1, 0));
			},
			moveRight() {
				this.tileMove(v(1, 0));
			},
			moveUp() {
				this.tileMove(v(0, -1));
			},
			moveDown() {
				this.tileMove(v(0, 1));
			},
		};
	}
	var gn = class {
		name;
		duration;
		loops;
		direction;
		easing;
		interpolation;
		isFinished;
		timing;
		easings;
		relative;
		constructor(e, n, r) {
			(this.name = e),
				(this.duration = n.duration),
				(this.loops = n.loops || 0),
				(this.direction = n.direction || "forward"),
				(this.easing = n.easing || tt.linear),
				(this.interpolation = n.interpolation || "linear"),
				(this.isFinished = !1),
				(this.timing = n.timing),
				(this.easings = n.easings),
				(this.relative = r);
		}
		update(e, n) {
			return !0;
		}
		getLowerKeyIndexAndRelativeTime(e, n, r) {
			let o = n - 1,
				s = e / this.duration;
			if (this.loops !== 0 && s >= this.loops) return [o, 0, !0];
			let i = Math.trunc(s);
			if (
				((s -= i),
				(this.direction == "reverse" ||
					(this.direction == "ping-pong" && i & 1)) &&
					(s = 1 - s),
				r)
			) {
				let m = 0;
				for (; r[m + 1] !== void 0 && r[m + 1] < s; ) m++;
				return m >= o ? [o, 0, !0] : [m, (s - r[m]) / (r[m + 1] - r[m]), !1];
			} else {
				let m = Math.floor((n - 1) * s);
				return [m, (s - m / o) * o, !1];
			}
		}
		setValue(e, n, r) {
			if (this.relative)
				switch (n) {
					case "pos":
						e.pos = e.base.pos.add(r);
						break;
					case "angle":
						e.angle = e.base.angle + r;
						break;
					case "scale":
						e.scale = e.base.scale.scale(r);
						break;
					case "opacity":
						e.opacity = e.base.opacity * r;
						break;
					default:
						e[n] = r;
				}
			else e[n] = r;
		}
		serialize() {
			let e = { duration: this.duration, keys: [] };
			return (
				this.loops && (e.loops = this.loops),
				this.direction !== "forward" && (e.direction = this.direction),
				this.easing != tt.linear && (e.easing = this.easing.name),
				this.interpolation !== "linear" &&
					(e.interpolation = this.interpolation),
				this.timing && (e.timing = this.timing),
				this.easings && (e.easings = this.easings.map((n) => this.easing.name)),
				e
			);
		}
	};
	function Oa(t, e) {
		return e.add(e.sub(t));
	}
	var ho = class extends gn {
			keys;
			constructor(e, n, r, o) {
				super(e, r, o), (this.keys = n);
			}
			update(e, n) {
				let [r, o, s] = this.getLowerKeyIndexAndRelativeTime(
					n,
					this.keys.length,
					this.timing
				);
				if (o == 0 || this.interpolation === "none")
					this.setValue(e, this.name, this.keys[r]);
				else {
					let i = this.easings ? this.easings[r] : this.easing;
					this.setValue(e, this.name, de(this.keys[r], this.keys[r + 1], i(o)));
				}
				return s;
			}
			serialize() {
				return Object.assign(super.serialize(), { keys: this.keys });
			}
		},
		go = class extends gn {
			keys;
			curves;
			dcurves;
			constructor(e, n, r, o, s) {
				if (
					(super(e, r, o), (this.keys = n), this.interpolation === "spline")
				) {
					(this.curves = []), s && (this.dcurves = []);
					for (let i = 0; i < this.keys.length - 1; i++) {
						let m = this.keys[i],
							u = i + 1,
							c = this.keys[u],
							p = i > 0 ? this.keys[i - 1] : Oa(c, m),
							b = u < this.keys.length - 1 ? this.keys[u + 1] : Oa(m, c);
						this.curves.push(Lt(p, m, c, b)),
							s && this.dcurves?.push(Lt(p, m, c, b, Jo));
					}
				}
			}
			update(e, n) {
				let [r, o, s] = this.getLowerKeyIndexAndRelativeTime(
					n,
					this.keys.length,
					this.timing
				);
				if (o == 0 || this.interpolation === "none")
					this.setValue(e, this.name, this.keys[r]);
				else {
					let i = this.easings ? this.easings[r] : this.easing;
					switch (this.interpolation) {
						case "linear":
							this.setValue(
								e,
								this.name,
								this.keys[r].lerp(this.keys[r + 1], i(o))
							);
							break;
						case "slerp":
							this.setValue(
								e,
								this.name,
								this.keys[r].slerp(this.keys[r + 1], i(o))
							);
							break;
						case "spline":
							if (this.curves) {
								this.setValue(e, this.name, this.curves[r](i(o))),
									this.dcurves &&
										this.setValue(e, "angle", this.dcurves[r](i(o)).angle());
								break;
							}
					}
				}
				return s;
			}
			serialize() {
				return Object.assign(super.serialize(), {
					keys: this.keys.map((e) => [e.x, e.y]),
				});
			}
		},
		bo = class extends gn {
			keys;
			constructor(e, n, r, o) {
				super(e, r, o), (this.keys = n);
			}
			update(e, n) {
				let [r, o, s] = this.getLowerKeyIndexAndRelativeTime(
					n,
					this.keys.length,
					this.timing
				);
				if (o == 0 || this.interpolation == "none")
					this.setValue(e, this.name, this.keys[r]);
				else {
					let i = this.easings ? this.easings[r] : this.easing;
					this.setValue(
						e,
						this.name,
						this.keys[r].lerp(this.keys[r + 1], i(o))
					);
				}
				return s;
			}
			serialize() {
				return Object.assign(super.serialize(), { keys: this.keys });
			}
		};
	function Aa(t = {}) {
		let e = [],
			n = 0,
			r = !1;
		return {
			id: "animate",
			require: t.followMotion ? ["rotate"] : void 0,
			base: { pos: v(0, 0), angle: 0, scale: v(1, 1), opacity: 1 },
			animation: {
				paused: !1,
				seek(o) {
					(n = Te(o, 0, this.duration)),
						e.forEach((s) => {
							s.isFinished = !1;
						}),
						(r = !1);
				},
				get duration() {
					return e.reduce((o, s) => Math.max(s.duration, o), 0);
				},
			},
			add() {
				t.relative &&
					(this.has("pos") && (this.base.pos = this.pos.clone()),
					this.has("rotate") && (this.base.angle = this.angle),
					this.has("scale") && (this.base.scale = this.scale),
					this.has("opacity") && (this.base.opacity = this.opacity));
			},
			update() {
				if (this.animation.paused) return;
				let o = !0,
					s;
				n += ee();
				for (let i of e)
					(s = i.update(this, n)),
						s &&
							!i.isFinished &&
							((i.isFinished = !0),
							this.trigger("animateChannelFinished", i.name)),
						(o &&= s);
				o && !r && ((r = !0), this.trigger("animateFinished"));
			},
			animate(o, s, i) {
				(r = !1),
					this.unanimate(o),
					typeof s[0] == "number"
						? e.push(new ho(o, s, i, t.relative || !1))
						: s[0] instanceof E
						? e.push(
								new go(
									o,
									s,
									i,
									t.relative || !1,
									o === "pos" && (t.followMotion || !1)
								)
						  )
						: s[0] instanceof j && e.push(new bo(o, s, i, t.relative || !1));
			},
			unanimate(o) {
				let s = e.findIndex((i) => i.name === o);
				s >= 0 && e.splice(s, 1);
			},
			unanimateAll() {
				e.splice(0, e.length);
			},
			onAnimateFinished(o) {
				return this.on("animateFinished", o);
			},
			onAnimateChannelFinished(o) {
				return this.on("animateChannelFinished", o);
			},
			serializeAnimationChannels() {
				return e.reduce((o, s) => ((o[s.name] = s.serialize()), o), {});
			},
			serializeAnimationOptions() {
				let o = {};
				return (
					t.followMotion && (o.followMotion = !0),
					t.relative && (o.relative = !0),
					o
				);
			},
		};
	}
	function yo(t, e) {
		let n = { name: t.name };
		return (
			t.has("animate") &&
				((n.channels = t.serializeAnimationChannels()),
				Object.assign(n, t.serializeAnimationOptions())),
			t.children.length > 0 &&
				(n.children = t.children
					.filter((r) => r.has("named"))
					.map((r) => yo(r, r.name))),
			n
		);
	}
	function po(t = 2, e = 1) {
		let n = 0;
		return {
			require: ["scale"],
			update() {
				let r = Math.sin(n * t) * e;
				r < 0 && this.destroy(), (this.scale = v(r)), (n += ee());
			},
		};
	}
	function Sa(t, e) {
		if (t == null)
			throw new Error("health() requires the initial amount of hp");
		return {
			id: "health",
			hurt(n = 1) {
				this.setHP(t - n), this.trigger("hurt", n);
			},
			heal(n = 1) {
				let r = t;
				this.setHP(t + n), this.trigger("heal", t - r);
			},
			hp() {
				return t;
			},
			maxHP() {
				return e ?? null;
			},
			setMaxHP(n) {
				e = n;
			},
			setHP(n) {
				(t = e ? Math.min(e, n) : n), t <= 0 && this.trigger("death");
			},
			onHurt(n) {
				return this.on("hurt", n);
			},
			onHeal(n) {
				return this.on("heal", n);
			},
			onDeath(n) {
				return this.on("death", n);
			},
			inspect() {
				return `health: ${t}`;
			},
		};
	}
	function Va(t, e = {}) {
		if (t == null) throw new Error("lifespan() requires time");
		let n = e.fade ?? 0;
		return {
			id: "lifespan",
			require: ["opacity"],
			add() {
				a.game.root.wait(t, () => {
					(this.opacity = this.opacity ?? 1),
						n > 0
							? a.game.root
									.tween(
										this.opacity,
										0,
										n,
										(r) => (this.opacity = r),
										tt.linear
									)
									.onEnd(() => {
										this.destroy();
									})
							: this.destroy();
				});
			},
		};
	}
	function Pa(t) {
		return { id: "named", name: t };
	}
	function Ga(t, e, n) {
		if (!t) throw new Error("state() requires an initial state");
		let r = {};
		function o(u) {
			r[u] ||
				(r[u] = {
					enter: new re(),
					end: new re(),
					update: new re(),
					draw: new re(),
				});
		}
		function s(u, c, p) {
			return o(c), r[c][u].add(p);
		}
		function i(u, c, ...p) {
			o(c), r[c][u].trigger(...p);
		}
		let m = !1;
		return {
			id: "state",
			state: t,
			enterState(u, ...c) {
				if (((m = !0), e && !e.includes(u)))
					throw new Error(`State not found: ${u}`);
				let p = this.state;
				if (n) {
					if (!n?.[p]) return;
					let b = typeof n[p] == "string" ? [n[p]] : n[p];
					if (!b.includes(u))
						throw new Error(
							`Cannot transition state from "${p}" to "${u}". Available transitions: ${b
								.map((l) => `"${l}"`)
								.join(", ")}`
						);
				}
				i("end", p, ...c),
					(this.state = u),
					i("enter", u, ...c),
					i("enter", `${p} -> ${u}`, ...c);
			},
			onStateTransition(u, c, p) {
				return s("enter", `${u} -> ${c}`, p);
			},
			onStateEnter(u, c) {
				return s("enter", u, c);
			},
			onStateUpdate(u, c) {
				return s("update", u, c);
			},
			onStateDraw(u, c) {
				return s("draw", u, c);
			},
			onStateEnd(u, c) {
				return s("end", u, c);
			},
			update() {
				m || (i("enter", t), (m = !0)), i("update", this.state);
			},
			draw() {
				i("draw", this.state);
			},
			inspect() {
				return `state: ${this.state}`;
			},
		};
	}
	function cr(t) {
		return { id: "stay", stay: !0, scenesToStay: t };
	}
	function Ma(t = !0, e) {
		let n, r;
		return {
			id: "textInput",
			hasFocus: t,
			require: ["text"],
			typedText: "",
			add() {
				let o = () => {
					this.text = this.typedText.replace(/([\[\\])/g, "\\$1");
				};
				(n = a.k.onCharInput((s) => {
					this.hasFocus &&
						(!e || this.typedText.length < e) &&
						(a.k.isKeyDown("shift")
							? (this.typedText += s.toUpperCase())
							: (this.typedText += s),
						o());
				})),
					(r = a.k.onKeyPressRepeat("backspace", () => {
						this.hasFocus && (this.typedText = this.typedText.slice(0, -1)),
							o();
					}));
			},
			destroy() {
				n.cancel(), r.cancel();
			},
		};
	}
	function hn(t = 1e3) {
		return {
			id: "timer",
			maxLoopsPerFrame: t,
			loop(e, n, r = 1 / 0, o = !1) {
				let s = o ? 0 : e,
					i = new re(),
					m = this.onUpdate(() => {
						s += a.app.state.dt;
						for (let u = 0; s >= e && u < this.maxLoopsPerFrame; u++)
							if ((r--, n(), (s -= e), r <= 0)) {
								m.cancel(), i.trigger();
								return;
							}
					});
				return {
					get paused() {
						return m.paused;
					},
					set paused(u) {
						m.paused = u;
					},
					cancel: m.cancel,
					onEnd(u) {
						i.add(u);
					},
					then(u) {
						return i.add(u), this;
					},
				};
			},
			wait(e, n) {
				return this.loop(e, n ?? (() => {}), 1, !0);
			},
			tween(e, n, r, o, s = tt.linear) {
				let i = 0,
					m = [],
					u = this.onUpdate(() => {
						i += a.app.state.dt;
						let c = Math.min(i / r, 1);
						o(de(e, n, s(c))),
							c === 1 && (u.cancel(), o(n), m.forEach((p) => p()));
					});
				return {
					get paused() {
						return u.paused;
					},
					set paused(c) {
						u.paused = c;
					},
					onEnd(c) {
						m.push(c);
					},
					then(c) {
						return this.onEnd(c), this;
					},
					cancel() {
						u.cancel();
					},
					finish() {
						u.cancel(), o(n), m.forEach((c) => c());
					},
				};
			},
		};
	}
	var xo = 0;
	function Ra() {
		return xo > 0;
	}
	function Da(t = {}) {
		let e = {},
			n = new Set(),
			r = [];
		return {
			id: "area",
			collisionIgnore: t.collisionIgnore ?? [],
			add() {
				xo++,
					this.area.cursor &&
						r.push(this.onHover(() => a.app.setCursor(this.area.cursor))),
					r.push(
						this.onCollideUpdate((o, s) => {
							if (!o.id)
								throw new Error("area() requires the object to have an id");
							e[o.id] || this.trigger("collide", o, s),
								s && ((e[o.id] = s), n.add(o.id));
						})
					);
			},
			destroy() {
				xo--;
				for (let o of r) o.cancel();
			},
			fixedUpdate() {
				for (let o in e)
					n.has(Number(o)) ||
						(this.trigger("collideEnd", e[o].target), delete e[o]);
				n.clear();
			},
			drawInspect() {
				let o = this.localArea();
				ge(), X(this.area.offset);
				let s = {
					outline: { width: 4 / kn(), color: I(0, 0, 255) },
					anchor: this.anchor,
					fill: !1,
					fixed: it(this),
				};
				o instanceof W
					? xe({
							...s,
							pos: o.pos,
							width: o.width * this.area.scale.x,
							height: o.height * this.area.scale.y,
					  })
					: o instanceof be
					? Pe({ ...s, pts: o.pts, scale: this.area.scale })
					: o instanceof we && Ne({ ...s, pos: o.center, radius: o.radius }),
					me();
			},
			area: {
				shape: t.shape ?? null,
				scale: t.scale ? v(t.scale) : v(1),
				offset: t.offset ?? v(0),
				cursor: t.cursor ?? null,
			},
			isClicked() {
				return a.app.isMousePressed() && this.isHovering();
			},
			isHovering() {
				let o = it(this) ? a.k.mousePos() : a.k.toWorld(a.k.mousePos());
				return this.hasPoint(o);
			},
			checkCollision(o) {
				if (!o.id)
					throw new Error("checkCollision() requires the object to have an id");
				return e[o.id] ?? null;
			},
			getCollisions() {
				return Object.values(e);
			},
			isColliding(o) {
				if (!o.id)
					throw new Error("isColliding() requires the object to have an id");
				return !!e[o.id];
			},
			isOverlapping(o) {
				if (!o.id)
					throw new Error("isOverlapping() requires the object to have an id");
				let s = e[o.id];
				return s && s.hasOverlap();
			},
			onClick(o, s = "left") {
				let i = a.app.onMousePress(s, () => {
					this.isHovering() && o();
				});
				return r.push(i), i;
			},
			onHover(o) {
				let s = !1;
				return this.onUpdate(() => {
					s ? (s = this.isHovering()) : this.isHovering() && ((s = !0), o());
				});
			},
			onHoverUpdate(o) {
				return this.onUpdate(() => {
					this.isHovering() && o();
				});
			},
			onHoverEnd(o) {
				let s = !1;
				return this.onUpdate(() => {
					s ? this.isHovering() || ((s = !1), o()) : (s = this.isHovering());
				});
			},
			onCollide(o, s) {
				if (typeof o == "function" && s === void 0)
					return this.on("collide", o);
				if (typeof o == "string")
					return this.onCollide((i, m) => {
						i.is(o) && s?.(i, m);
					});
				throw new Error("onCollide() requires either a function or a tag");
			},
			onCollideUpdate(o, s) {
				if (typeof o == "function" && s === void 0)
					return this.on("collideUpdate", o);
				if (typeof o == "string")
					return this.on("collideUpdate", (i, m) => i.is(o) && s?.(i, m));
				throw new Error(
					"onCollideUpdate() requires either a function or a tag"
				);
			},
			onCollideEnd(o, s) {
				if (typeof o == "function" && s === void 0)
					return this.on("collideEnd", o);
				if (typeof o == "string")
					return this.on("collideEnd", (i) => i.is(o) && s?.(i));
				throw new Error("onCollideEnd() requires either a function or a tag");
			},
			hasPoint(o) {
				return Ze(this.worldArea(), o);
			},
			resolveCollision(o) {
				let s = this.checkCollision(o);
				s &&
					!s.resolved &&
					((this.pos = this.pos.add(s.displacement)), (s.resolved = !0));
			},
			localArea() {
				return this.area.shape ? this.area.shape : this.renderArea();
			},
			worldArea() {
				let o = this.localArea();
				if (!(o instanceof be || o instanceof W))
					throw new Error("Only support polygon and rect shapes for now");
				let s = this.transform
					.clone()
					.translate(this.area.offset)
					.scale(v(this.area.scale ?? 1));
				if (o instanceof W) {
					let i = _e(this.anchor || lt)
						.add(1, 1)
						.scale(-0.5)
						.scale(o.width, o.height);
					s.translate(i);
				}
				return o.transform(s);
			},
			screenArea() {
				let o = this.worldArea();
				return it(this) ? o : o.transform(a.game.cam.transform);
			},
			inspect() {
				return this.area.scale?.x == this.area.scale?.y
					? `area: ${this.area.scale?.x?.toFixed(1)}x`
					: `area: (${this.area.scale?.x?.toFixed(
							1
					  )}x, ${this.area.scale.y?.toFixed(1)}y)`;
			},
		};
	}
	function Ba(t = {}) {
		let e = null,
			n = null,
			r = !1,
			o = v(0),
			s = null,
			i = null,
			m;
		return {
			id: "body",
			require: ["pos"],
			vel: v(0),
			drag: t.drag ?? 0,
			jumpForce: t.jumpForce ?? ds,
			gravityScale: t.gravityScale ?? 1,
			isStatic: t.isStatic ?? !1,
			mass: t.mass ?? 1,
			add() {
				if (
					((s = this.pos.clone()),
					(i = this.pos.clone()),
					(m = this.pos.clone()),
					this.mass === 0)
				)
					throw new Error("Can't set body mass to 0");
				this.has("area") &&
					(this.onCollideUpdate((u, c) => {
						if (!c || !u.has("body") || c.resolved) return;
						this.trigger("beforePhysicsResolve", c);
						let p = c.reverse();
						if (
							(u.trigger("beforePhysicsResolve", p),
							!(c.resolved || p.resolved) && !(this.isStatic && u.isStatic))
						) {
							if (!this.isStatic && !u.isStatic) {
								let b = this.mass + u.mass;
								(this.pos = this.pos.add(c.displacement.scale(u.mass / b))),
									(u.pos = u.pos.add(c.displacement.scale(-this.mass / b))),
									(this.transform = pt(this)),
									(u.transform = pt(u));
							} else {
								let b = !this.isStatic && u.isStatic ? c : c.reverse();
								(b.source.pos = b.source.pos.add(b.displacement)),
									(b.source.transform = pt(b.source));
							}
							(c.resolved = !0),
								this.trigger("physicsResolve", c),
								u.trigger("physicsResolve", c.reverse());
						}
					}),
					this.onPhysicsResolve((u) => {
						if (a.game.gravity)
							if (u.isBottom() && this.isFalling()) {
								this.vel = this.vel.reject(a.game.gravity.unit());
								let c = e;
								(e = u.target),
									c != e && (n = u.target.pos),
									r
										? (r = !1)
										: c ||
										  (this.trigger("ground", e),
										  u.target.trigger("land", this));
							} else
								u.isTop() &&
									this.isJumping() &&
									((this.vel = this.vel.reject(a.game.gravity.unit())),
									this.trigger("headbutt", u.target),
									u.target.trigger("headbutted", this));
					}));
			},
			update() {
				e &&
					this.isColliding(e) &&
					e.exists() &&
					e.has("body") &&
					(n &&
						!e.pos.eq(n) &&
						t.stickToPlatform !== !1 &&
						this.moveBy(e.pos.sub(n)),
					(n = e.pos));
				let u = an();
				u &&
					(this.pos.x == m.x &&
						((this.pos.x = de(s.x, i.x, u / sn())), (m.x = this.pos.x)),
					this.pos.y == m.y &&
						((this.pos.y = de(s.y, i.y, u / sn())), (m.y = this.pos.y)));
			},
			fixedUpdate() {
				if (
					(s &&
						(this.pos.x == m.x && (this.pos.x = s.x),
						this.pos.y == m.y && (this.pos.y = s.y),
						(s = null)),
					a.game.gravity && !this.isStatic)
				) {
					r && ((e = null), (n = null), this.trigger("fallOff"), (r = !1)),
						e &&
							(!this.isColliding(e) || !e.exists() || !e.has("body")) &&
							(r = !0);
					let c = this.vel.clone();
					this.vel = this.vel.add(
						a.game.gravity.scale(this.gravityScale * ee())
					);
					let p = t.maxVelocity ?? fs;
					this.vel.slen() > p * p && (this.vel = this.vel.unit().scale(p)),
						c.dot(a.game.gravity) < 0 &&
							this.vel.dot(a.game.gravity) >= 0 &&
							this.trigger("fall");
				}
				if (
					((this.vel.x += o.x * ee()),
					(this.vel.y += o.y * ee()),
					(this.vel.x *= 1 - this.drag * ee()),
					(this.vel.y *= 1 - this.drag * ee()),
					this.move(this.vel),
					an())
				) {
					s = this.pos.clone();
					let c = this.vel.add(o.scale(ee()));
					(i = this.pos.add(c.scale(ee()))), (m = this.pos.clone());
				}
				(o.x = 0), (o.y = 0);
			},
			onPhysicsResolve(u) {
				return this.on("physicsResolve", u);
			},
			onBeforePhysicsResolve(u) {
				return this.on("beforePhysicsResolve", u);
			},
			curPlatform() {
				return e;
			},
			isGrounded() {
				return e !== null;
			},
			isFalling() {
				return this.vel.dot(ft()) > 0;
			},
			isJumping() {
				return this.vel.dot(ft()) < 0;
			},
			applyImpulse(u) {
				this.isStatic || (this.vel = this.vel.add(u));
			},
			addForce(u) {
				this.isStatic || ((o.x += u.x / this.mass), (o.y += u.y / this.mass));
			},
			jump(u) {
				this.isStatic ||
					((e = null),
					(n = null),
					(this.vel = ft().scale(-u || -this.jumpForce)));
			},
			onGround(u) {
				return this.on("ground", u);
			},
			onFall(u) {
				return this.on("fall", u);
			},
			onFallOff(u) {
				return this.on("fallOff", u);
			},
			onHeadbutt(u) {
				return this.on("headbutt", u);
			},
			onLand(u) {
				return this.on("land", u);
			},
			onHeadbutted(u) {
				return this.on("headbutted", u);
			},
			inspect() {
				return `gravityScale: ${this.gravityScale}x`;
			},
		};
	}
	function Fa(t = 2) {
		let e = t;
		return {
			id: "doubleJump",
			require: ["body"],
			numJumps: t,
			add() {
				this.onGround(() => {
					e = this.numJumps;
				});
			},
			doubleJump(n) {
				e <= 0 ||
					(e < this.numJumps && this.trigger("doubleJump"), e--, this.jump(n));
			},
			onDoubleJump(n) {
				return this.on("doubleJump", n);
			},
			inspect() {
				return `jumpsLeft: ${e}`;
			},
		};
	}
	function La(t) {
		return {
			id: "surfaceEffector",
			require: ["area"],
			speed: t.speed,
			speedVariation: t.speedVariation ?? 0,
			forceScale: t.speedVariation ?? 0.9,
			add() {
				this.onCollideUpdate("body", (e, n) => {
					let r = n?.normal.normal(),
						o = e.vel.project(r),
						i = r?.scale(this.speed)?.sub(o);
					e.addForce(i?.scale(e.mass * this.forceScale));
				});
			},
		};
	}
	function ja(t) {
		return {
			id: "areaEffector",
			require: ["area"],
			useGlobalAngle: t.useGlobalAngle || !1,
			forceAngle: t.forceAngle,
			forceMagnitude: t.forceMagnitude,
			forceVariation: t.forceVariation ?? 0,
			linearDrag: t.linearDrag ?? 0,
			add() {
				this.onCollideUpdate("body", (e, n) => {
					if (!e.has("body")) return;
					let o = E.fromAngle(this.forceAngle).scale(this.forceMagnitude);
					e.addForce(o),
						this.linearDrag && e.addForce(e.vel.scale(-this.linearDrag));
				});
			},
		};
	}
	function Ia(t) {
		return {
			id: "pointEffector",
			require: ["area", "pos"],
			forceMagnitude: t.forceMagnitude,
			forceVariation: t.forceVariation ?? 0,
			distanceScale: t.distanceScale ?? 1,
			forceMode: t.forceMode || "inverseLinear",
			linearDrag: t.linearDrag ?? 0,
			add() {
				this.onCollideUpdate("body", (e, n) => {
					let r = this.pos.sub(e.pos),
						o = r.len(),
						s = (o * this.distanceScale) / 10,
						i =
							this.forceMode === "constant"
								? 1
								: this.forceMode === "inverseLinear"
								? 1 / s
								: 1 / s ** 2,
						m = r.scale((this.forceMagnitude * i) / o);
					e.addForce(m),
						this.linearDrag && e.addForce(e.vel.scale(-this.linearDrag));
				});
			},
		};
	}
	function Ka(t) {
		return {
			id: "constantForce",
			require: ["body"],
			force: t.force,
			update() {
				this.force && this.addForce(this.force);
			},
		};
	}
	function ka(t) {
		return {
			id: "platformEffector",
			require: ["area", "body"],
			surfaceArc: t.surfaceArc ?? 180,
			useOneWay: t.useOneWay ?? !1,
			add() {
				this.onBeforePhysicsResolve((e) => {
					let n = e.target.vel,
						o = ft().scale(-1).angleBetween(n);
					Math.abs(o) > this.surfaceArc / 2 && e.preventResolution();
				});
			},
		};
	}
	function _a(t) {
		return {
			id: "buoyancyEffector",
			require: ["area"],
			surfaceLevel: t.surfaceLevel,
			density: t.density ?? 1,
			linearDrag: t.linearDrag ?? 1,
			angularDrag: t.angularDrag ?? 0.2,
			flowAngle: t.flowAngle ?? 0,
			flowMagnitude: t.flowMagnitude ?? 0,
			flowVariation: t.flowVariation ?? 0,
			add() {
				this.onCollideUpdate("body", (e, n) => {
					let r = e,
						o = r.worldArea(),
						[s, i] = o.cut(
							v(-100, this.surfaceLevel),
							v(100, this.surfaceLevel)
						);
					s && (this.applyBuoyancy(r, s), this.applyDrag(r, s)),
						this.flowMagnitude &&
							r.addForce(E.fromAngle(this.flowAngle).scale(this.flowMagnitude));
				});
			},
			applyBuoyancy(e, n) {
				let r = this.density * n.area(),
					o = v(0, 1).scale(-r);
				e.addForce(o);
			},
			applyDrag(e, n) {
				let r = e.vel,
					o = this.density * this.linearDrag,
					s = r.scale(-o);
				e.addForce(s);
			},
		};
	}
	function fn(t) {
		if (!t) throw new Error("Please define an anchor");
		return {
			id: "anchor",
			anchor: t,
			inspect() {
				return typeof this.anchor == "string"
					? "anchor: " + this.anchor
					: "anchor: " + this.anchor.toString();
			},
		};
	}
	function ir() {
		return { id: "fixed", fixed: !0 };
	}
	function Na(t, e) {
		return {
			id: "follow",
			require: ["pos"],
			follow: { obj: t, offset: e ?? v(0) },
			add() {
				t.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
			},
			update() {
				t.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
			},
		};
	}
	function Ua(t) {
		let e = a.game.layers?.indexOf(t);
		return {
			id: "layer",
			get layerIndex() {
				return e ?? null;
			},
			get layer() {
				return e ? a.game.layers?.[e] ?? null : null;
			},
			set layer(n) {
				if (((e = a.game.layers?.indexOf(n)), e == -1))
					throw Error("Invalid layer name");
			},
			inspect() {
				return `layer: ${this.layer}`;
			},
		};
	}
	function Ha(t, e) {
		let n = typeof t == "number" ? E.fromAngle(t) : t.unit();
		return {
			id: "move",
			require: ["pos"],
			update() {
				this.move(n.scale(e));
			},
		};
	}
	function qa(t = {}) {
		let e = !1,
			n = new W(v(0), ie(), ue()),
			r = new W(v(0), 0, 0),
			o = (s) => {
				s.isOffScreen()
					? (e || (s.trigger("exitView"), (e = !0)),
					  t.hide && (s.hidden = !0),
					  t.pause && (s.paused = !0),
					  t.destroy && s.destroy())
					: (e && (s.trigger("enterView"), (e = !1)),
					  t.hide && (s.hidden = !1),
					  t.pause && (s.paused = !1));
			};
		return {
			id: "offscreen",
			require: ["pos"],
			offscreenDistance: t.distance ?? Gr,
			isOffScreen() {
				let s = this.screenPos();
				if (!s) return !1;
				if (
					((n.width = ie()),
					(n.height = ue()),
					!this.offscreenDistance && this.width && this.height)
				)
					return (
						(r.width = this.width),
						(r.height = this.height),
						(r.pos = this.pos),
						r.collides(n)
					);
				let i = this.offscreenDistance ? this.offscreenDistance : Gr;
				return !Dt(n, s) && n.sdistToPoint(s) > i * i;
			},
			onExitScreen(s) {
				return this.on("exitView", s);
			},
			onEnterScreen(s) {
				return this.on("enterView", s);
			},
			add() {
				t.pause && t.unpause ? nr(() => o(this)) : this.onUpdate(() => o(this));
			},
		};
	}
	function Vt(...t) {
		return {
			id: "pos",
			pos: v(...t),
			moveBy(...e) {
				this.pos = this.pos.add(v(...e));
			},
			move(...e) {
				this.moveBy(v(...e).scale(ee()));
			},
			moveTo(...e) {
				if (typeof e[0] == "number" && typeof e[1] == "number")
					return this.moveTo(v(e[0], e[1]), e[2]);
				let n = e[0],
					r = e[1];
				if (r === void 0) {
					this.pos = v(n);
					return;
				}
				let o = n.sub(this.pos);
				if (o.len() <= r * ee()) {
					this.pos = v(n);
					return;
				}
				this.move(o.unit().scale(r));
			},
			worldPos(e = null) {
				return e
					? ((this.pos = this.pos.add(this.fromWorld(e))), null)
					: this.parent
					? this.parent.transform.multVec2(this.pos)
					: this.pos;
			},
			toWorld(e) {
				return this.parent
					? this.parent.transform.multVec2(this.pos.add(e))
					: this.pos.add(e);
			},
			fromWorld(e) {
				return this.parent
					? this.parent.transform.invert().multVec2(e).sub(this.pos)
					: e.sub(this.pos);
			},
			screenPos(e = null) {
				if (e) return (this.pos = this.pos.add(this.fromScreen(e))), null;
				{
					let n = this.worldPos();
					return n ? (it(this) ? n : mn(n)) : null;
				}
			},
			toScreen(e) {
				let n = this.toWorld(e);
				return it(this) ? n : mn(n);
			},
			fromScreen(e) {
				return it(this) ? this.fromWorld(e) : this.fromWorld(or(e));
			},
			toOther(e, n) {
				return e.fromWorld(this.toWorld(n));
			},
			fromOther(e, n) {
				return e.toOther(this, n);
			},
			inspect() {
				return `pos: (${Math.round(this.pos.x)}x, ${Math.round(this.pos.y)}y)`;
			},
			drawInspect() {
				Ne({ color: I(255, 0, 0), radius: 4 / kn() });
			},
		};
	}
	function za(t) {
		return {
			id: "rotate",
			angle: t ?? 0,
			rotateBy(e) {
				this.angle += e;
			},
			rotateTo(e) {
				this.angle = e;
			},
			inspect() {
				return `angle: ${Math.round(this.angle)}`;
			},
		};
	}
	function Nt(...t) {
		if (t.length === 0) return Nt(1);
		let e = v(...t);
		return {
			id: "scale",
			set scale(n) {
				if (!(n instanceof E))
					throw Error(
						"The scale property on scale is a vector. Use scaleTo or scaleBy to set the scale with a number."
					);
				e = v(n);
			},
			get scale() {
				return e;
			},
			scaleTo(...n) {
				e = v(...n);
			},
			scaleBy(...n) {
				e = e.scale(v(...n));
			},
			inspect() {
				return e.x == e.y
					? `scale: ${e.x.toFixed(1)}x`
					: `scale: (${e.x.toFixed(1)}x, ${e.y.toFixed(1)}y)`;
			},
		};
	}
	function Wa(t) {
		return {
			id: "z",
			z: t,
			inspect() {
				return `z: ${this.z}`;
			},
		};
	}
	var Ya =
		"data:image/png;base64,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";
	var $a =
		"data:image/png;base64,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";
	var dc = Ao.version,
		a = {
			k: null,
			globalOpt: null,
			gfx: null,
			game: null,
			app: null,
			assets: null,
			fontCacheCanvas: null,
			fontCacheC2d: null,
			debug: null,
			audio: null,
			pixelDensity: null,
			canvas: null,
			gscale: null,
			kaSprite: null,
			boomSprite: null,
		},
		Qa = (t = { tagsAsComponents: !0 }) => {
			a.k &&
				(console.warn(
					"KAPLAY already initialized, you are calling kaplay() multiple times, it may lead bugs!"
				),
				a.k.quit()),
				(a.globalOpt = t);
			let e = t.root ?? document.body;
			e === document.body &&
				((document.body.style.width = "100%"),
				(document.body.style.height = "100%"),
				(document.body.style.margin = "0px"),
				(document.documentElement.style.width = "100%"),
				(document.documentElement.style.height = "100%"));
			let n = t.canvas ?? e.appendChild(document.createElement("canvas"));
			a.canvas = n;
			let r = t.scale ?? 1;
			a.gscale = r;
			let o = t.width && t.height && !t.stretch && !t.letterbox;
			o
				? ((n.width = t.width * r), (n.height = t.height * r))
				: ((n.width = n.parentElement.offsetWidth),
				  (n.height = n.parentElement.offsetHeight));
			let s = ["outline: none", "cursor: default"];
			if (o) {
				let F = n.width,
					N = n.height;
				s.push(`width: ${F}px`), s.push(`height: ${N}px`);
			} else s.push("width: 100%"), s.push("height: 100%");
			t.crisp &&
				(s.push("image-rendering: pixelated"),
				s.push("image-rendering: crisp-edges")),
				(n.style.cssText = s.join(";"));
			let i = t.pixelDensity || 1;
			(a.pixelDensity = i), (n.width *= i), (n.height *= i), (n.tabIndex = 0);
			let m = document.createElement("canvas");
			(m.width = 256), (m.height = 256), (a.fontCacheCanvas = m);
			let u = m.getContext("2d", { willReadFrequently: !0 });
			a.fontCacheC2d = u;
			let c = Rs({
				canvas: n,
				touchToMouse: t.touchToMouse,
				gamepads: t.gamepads,
				pixelDensity: t.pixelDensity,
				maxFPS: t.maxFPS,
				buttons: t.buttons,
			});
			a.app = c;
			let p = [],
				b = c.canvas.getContext("webgl", {
					antialias: !0,
					depth: !0,
					stencil: !0,
					alpha: !0,
					preserveDrawingBuffer: !0,
				});
			if (!b) throw new Error("WebGL not supported");
			let l = b,
				h = ci(l, { texFilter: t.texFilter }),
				d = vi(t, h);
			a.gfx = d;
			let C = ia();
			a.audio = C;
			let g = Ws(h, t.spriteAtlasPadding ?? 0);
			a.assets = g;
			let y = ta();
			(a.game = y), y.root.use(hn());
			function O(F, N) {
				let z = new ot(h, F, N);
				return {
					clear: () => z.clear(),
					free: () => z.free(),
					toDataURL: () => z.toDataURL(),
					toImageData: () => z.toImageData(),
					width: z.width,
					height: z.height,
					draw: (oe) => {
						Ce(), z.bind(), oe(), Ce(), z.unbind();
					},
					get fb() {
						return z;
					},
				};
			}
			function A() {
				l.clear(l.COLOR_BUFFER_BIT),
					d.frameBuffer.bind(),
					l.clear(l.COLOR_BUFFER_BIT),
					d.bgColor ||
						qe(() => {
							st({
								width: ie(),
								height: ue(),
								quad: new q(0, 0, ie() / 64, ue() / 64),
								tex: d.bgTex,
								fixed: !0,
							});
						}),
					(d.renderer.numDraws = 0),
					(d.fixed = !1),
					(d.transformStack.length = 0),
					(d.transform = new fe());
			}
			function R(F, N) {
				(d.postShader = F), (d.postShaderUniform = N ?? null);
			}
			function V() {
				Ce(),
					(d.lastDrawCalls = d.renderer.numDraws),
					d.frameBuffer.unbind(),
					l.viewport(0, 0, l.drawingBufferWidth, l.drawingBufferHeight);
				let F = d.width,
					N = d.height;
				(d.width = l.drawingBufferWidth / i),
					(d.height = l.drawingBufferHeight / i),
					St({
						flipY: !0,
						tex: d.frameBuffer.tex,
						pos: new E(d.viewport.x, d.viewport.y),
						width: d.viewport.width,
						height: d.viewport.height,
						shader: d.postShader,
						uniform:
							typeof d.postShaderUniform == "function"
								? d.postShaderUniform()
								: d.postShaderUniform,
						fixed: !0,
					}),
					Ce(),
					(d.width = F),
					(d.height = N);
			}
			let x = !1,
				w = {
					inspect: !1,
					set timeScale(F) {
						a.app.state.timeScale = F;
					},
					get timeScale() {
						return a.app.state.timeScale;
					},
					showLog: !0,
					fps: () => c.fps(),
					numFrames: () => c.numFrames(),
					stepFrame: Pt,
					drawCalls: () => d.lastDrawCalls,
					clearLog: () => (y.logs = []),
					log: (...F) => {
						let N = t.logMax ?? 8,
							z = F.length > 1 ? F.concat(" ").join(" ") : F[0];
						y.logs.unshift({ msg: z, time: c.time() }),
							y.logs.length > N && (y.logs = y.logs.slice(0, N));
					},
					error: (F) => w.log(new Error(F.toString ? F.toString() : F)),
					curRecording: null,
					numObjects: () => _("*", { recursive: !0 }).length,
					get paused() {
						return x;
					},
					set paused(F) {
						(x = F), F ? C.ctx.suspend() : C.ctx.resume();
					},
				};
			a.debug = w;
			function S(F, N) {
				try {
					return JSON.parse(window.localStorage[F]);
				} catch {
					return N ? (G(F, N), N) : null;
				}
			}
			function G(F, N) {
				window.localStorage[F] = JSON.stringify(N);
			}
			function M(F, ...N) {
				let z = F($e),
					oe;
				typeof z == "function" ? (oe = z(...N)($e)) : (oe = z);
				for (let ye in oe)
					($e[ye] = oe[ye]), t.global !== !1 && (window[ye] = oe[ye]);
				return $e;
			}
			function D(F) {
				let N = c.canvas.captureStream(F),
					z = C.ctx.createMediaStreamDestination();
				C.masterNode.connect(z);
				let oe = new MediaRecorder(N),
					ye = [];
				return (
					(oe.ondataavailable = (Q) => {
						Q.data.size > 0 && ye.push(Q.data);
					}),
					(oe.onerror = () => {
						C.masterNode.disconnect(z), N.getTracks().forEach((Q) => Q.stop());
					}),
					oe.start(),
					{
						resume() {
							oe.resume();
						},
						pause() {
							oe.pause();
						},
						stop() {
							return (
								oe.stop(),
								C.masterNode.disconnect(z),
								N.getTracks().forEach((Q) => Q.stop()),
								new Promise((Q) => {
									oe.onstop = () => {
										Q(new Blob(ye, { type: "video/mp4" }));
									};
								})
							);
						},
						download(Q = "kaboom.mp4") {
							this.stop().then((ve) => Rr(Q, ve));
						},
					}
				);
			}
			function L() {
				return document.activeElement === c.canvas;
			}
			let U = y.root.add.bind(y.root),
				H = y.root.readd.bind(y.root),
				Y = y.root.removeAll.bind(y.root),
				_ = y.root.get.bind(y.root),
				K = y.root.wait.bind(y.root),
				J = y.root.loop.bind(y.root),
				$ = y.root.query.bind(y.root),
				Z = y.root.tween.bind(y.root),
				Ee = Tt(null, $a),
				k = Tt(null, Ya);
			(a.kaSprite = Ee), (a.boomSprite = k);
			function ht() {
				y.root.fixedUpdate();
			}
			function Pt() {
				y.root.update();
			}
			class Ut {
				source;
				target;
				normal;
				distance;
				resolved = !1;
				constructor(N, z, oe, ye, Q = !1) {
					(this.source = N),
						(this.target = z),
						(this.normal = oe),
						(this.distance = ye),
						(this.resolved = Q);
				}
				get displacement() {
					return this.normal.scale(this.distance);
				}
				reverse() {
					return new Ut(
						this.target,
						this.source,
						this.normal.scale(-1),
						this.distance,
						this.resolved
					);
				}
				hasOverlap() {
					return !this.displacement.isZero();
				}
				isLeft() {
					return this.displacement.cross(y.gravity || v(0, 1)) > 0;
				}
				isRight() {
					return this.displacement.cross(y.gravity || v(0, 1)) < 0;
				}
				isTop() {
					return this.displacement.dot(y.gravity || v(0, 1)) > 0;
				}
				isBottom() {
					return this.displacement.dot(y.gravity || v(0, 1)) < 0;
				}
				preventResolution() {
					this.resolved = !0;
				}
			}
			function bn() {
				if (!Ra()) return;
				let F = {},
					N = t.hashGridSize || 64,
					z = new fe(),
					oe = [];
				function ye(Q) {
					if (
						(oe.push(z.clone()),
						Q.pos && z.translate(Q.pos),
						Q.scale && z.scale(Q.scale),
						Q.angle && z.rotate(Q.angle),
						(Q.transform = z.clone()),
						Q.c("area") && !Q.paused)
					) {
						let ve = Q,
							at = ve.worldArea().bbox(),
							pr = Math.floor(at.pos.x / N),
							dr = Math.floor(at.pos.y / N),
							fr = Math.ceil((at.pos.x + at.width) / N),
							hr = Math.ceil((at.pos.y + at.height) / N),
							vn = new Set();
						for (let Xe = pr; Xe <= fr; Xe++)
							for (let ut = dr; ut <= hr; ut++)
								if (!F[Xe]) (F[Xe] = {}), (F[Xe][ut] = [ve]);
								else if (!F[Xe][ut]) F[Xe][ut] = [ve];
								else {
									let qt = F[Xe][ut];
									e: for (let Ie of qt) {
										if (Ie.paused || !Ie.exists() || vn.has(Ie.id)) continue;
										for (let Qe of ve.collisionIgnore)
											if (Ie.is(Qe)) continue e;
										for (let Qe of Ie.collisionIgnore)
											if (ve.is(Qe)) continue e;
										let zt = ns(ve.worldArea(), Ie.worldArea());
										if (zt) {
											let Qe = new Ut(ve, Ie, zt.normal, zt.distance);
											ve.trigger("collideUpdate", Ie, Qe);
											let wn = Qe.reverse();
											(wn.resolved = Qe.resolved),
												Ie.trigger("collideUpdate", ve, wn);
										}
										vn.add(Ie.id);
									}
									qt.push(ve);
								}
					}
					Q.children.forEach(ye), (z = oe.pop());
				}
				ye(y.root);
			}
			function yn(F) {
				console.error(F), C.ctx.suspend();
				let N =
					F.message ??
					String(F) ??
					"Unknown error, check console for more info";
				c.run(
					() => {},
					() => {
						A(),
							qe(() => {
								let ye = ie(),
									Q = ue(),
									ve = {
										size: 36,
										width: ye - 32 * 2,
										letterSpacing: 4,
										lineSpacing: 4,
										font: bt,
										fixed: !0,
									};
								xe({ width: ye, height: Q, color: I(0, 0, 255), fixed: !0 });
								let Ht = Ue({
									...ve,
									text: "Error",
									pos: v(32),
									color: I(255, 128, 0),
									fixed: !0,
								});
								He(Ht),
									Zr({
										...ve,
										text: N,
										pos: v(32, 32 + Ht.height + 16),
										fixed: !0,
									}),
									me(),
									y.events.trigger("error", F);
							}),
							V();
					}
				);
			}
			function lr(F) {
				p.push(F);
			}
			function mr() {
				y.events.onOnce("frameEnd", () => {
					c.quit(),
						l.clear(
							l.COLOR_BUFFER_BIT | l.DEPTH_BUFFER_BIT | l.STENCIL_BUFFER_BIT
						);
					let F = l.getParameter(l.MAX_TEXTURE_IMAGE_UNITS);
					for (let N = 0; N < F; N++)
						l.activeTexture(l.TEXTURE0 + N),
							l.bindTexture(l.TEXTURE_2D, null),
							l.bindTexture(l.TEXTURE_CUBE_MAP, null);
					l.bindBuffer(l.ARRAY_BUFFER, null),
						l.bindBuffer(l.ELEMENT_ARRAY_BUFFER, null),
						l.bindRenderbuffer(l.RENDERBUFFER, null),
						l.bindFramebuffer(l.FRAMEBUFFER, null),
						h.destroy(),
						p.forEach((N) => N());
				});
			}
			let Gt = !0;
			c.run(
				() => {
					try {
						g.loaded && (w.paused || ht(), bn());
					} catch (F) {
						yn(F);
					}
				},
				(F, N) => {
					try {
						F(),
							g.loaded ||
								(Be() === 1 &&
									!Gt &&
									((g.loaded = !0),
									Nn().forEach((z) => y.events.trigger("loadError", ...z)),
									y.events.trigger("load"))),
							(!g.loaded && t.loadingScreen !== !1) || Gt
								? (A(), gi(), V())
								: (w.paused || Pt(),
								  bn(),
								  A(),
								  hi(),
								  t.debug !== !1 && fi(),
								  V()),
							Gt && (Gt = !1),
							y.events.trigger("frameEnd"),
							N();
					} catch (z) {
						yn(z);
					}
				}
			),
				Ln(),
				ur();
			let $e = {
				_k: a,
				VERSION: dc,
				loadRoot: Hs,
				loadProgress: Be,
				loadSprite: Tt,
				loadSpriteAtlas: $r,
				loadSound: ii,
				loadMusic: ai,
				loadBitmapFont: ei,
				loadFont: Js,
				loadShader: ri,
				loadShaderURL: oi,
				loadAseprite: Qs,
				loadPedit: ti,
				loadBean: Xs,
				loadJSON: qs,
				load: un,
				getSound: Yr,
				getFont: qr,
				getBitmapFont: Un,
				getSprite: Nr,
				getShader: Wr,
				getAsset: zs,
				Asset: ce,
				SpriteData: Fe,
				SoundData: rt,
				width: ie,
				height: ue,
				center: wt,
				dt: ee,
				fixedDt: sn,
				restDt: an,
				time: c.time,
				screenshot: c.screenshot,
				record: D,
				isFocused: L,
				setCursor: c.setCursor,
				getCursor: c.getCursor,
				setCursorLocked: c.setCursorLocked,
				isCursorLocked: c.isCursorLocked,
				setFullscreen: c.setFullscreen,
				isFullscreen: c.isFullscreen,
				isTouchscreen: c.isTouchscreen,
				onLoad: _t,
				onLoadError: Wi,
				onLoading: Hi,
				onResize: qi,
				onGamepadConnect: c.onGamepadConnect,
				onGamepadDisconnect: c.onGamepadDisconnect,
				onError: zi,
				onCleanup: lr,
				flash: co,
				setCamPos: ro,
				getCamPos: oo,
				setCamRot: ao,
				getCamRot: uo,
				setCamScale: so,
				getCamScale: io,
				getCamTransform: Yi,
				camPos: Qi,
				camScale: Ji,
				camFlash: ea,
				camRot: Zi,
				camTransform: $i,
				shake: Xi,
				toScreen: mn,
				toWorld: or,
				setGravity: na,
				getGravity: ra,
				setGravityDirection: oa,
				getGravityDirection: ft,
				setBackground: Ks,
				getBackground: ks,
				getGamepads: c.getGamepads,
				getTreeRoot: fa,
				add: U,
				make: pn,
				destroy: sr,
				destroyAll: Y,
				get: _,
				query: $,
				readd: H,
				pos: Vt,
				scale: Nt,
				rotate: za,
				color: Qn,
				opacity: Jn,
				anchor: fn,
				area: Da,
				sprite: dn,
				text: xa,
				polygon: Si,
				rect: er,
				circle: wi,
				uvquad: va,
				outline: Oi,
				particles: Ai,
				body: Ba,
				platformEffector: ka,
				surfaceEffector: La,
				areaEffector: ja,
				pointEffector: Ia,
				buoyancyEffector: _a,
				constantForce: Ka,
				doubleJump: Fa,
				shader: Vi,
				textInput: Ma,
				timer: hn,
				fixed: ir,
				stay: cr,
				health: Sa,
				lifespan: Va,
				named: Pa,
				state: Ga,
				z: Wa,
				layer: Ua,
				move: Ha,
				offscreen: qa,
				follow: Na,
				fadeIn: Ei,
				mask: Ti,
				drawon: Ci,
				raycast: Zn,
				tile: tr,
				animate: Aa,
				serializeAnimation: yo,
				agent: wa,
				sentry: Ta,
				patrol: Ea,
				pathfinder: Ca,
				trigger: Gi,
				on: Ge,
				onFixedUpdate: Mi,
				onUpdate: nr,
				onDraw: Ri,
				onAdd: to,
				onDestroy: Di,
				onTag: no,
				onUntag: Li,
				onUse: Bi,
				onUnuse: Fi,
				onClick: ki,
				onCollide: ji,
				onCollideUpdate: Ii,
				onCollideEnd: Ki,
				onHover: _i,
				onHoverUpdate: Ni,
				onHoverEnd: Ui,
				onKeyDown: c.onKeyDown,
				onKeyPress: c.onKeyPress,
				onKeyPressRepeat: c.onKeyPressRepeat,
				onKeyRelease: c.onKeyRelease,
				onMouseDown: c.onMouseDown,
				onMousePress: c.onMousePress,
				onMouseRelease: c.onMouseRelease,
				onMouseMove: c.onMouseMove,
				onCharInput: c.onCharInput,
				onTouchStart: c.onTouchStart,
				onTouchMove: c.onTouchMove,
				onTouchEnd: c.onTouchEnd,
				onScroll: c.onScroll,
				onHide: c.onHide,
				onShow: c.onShow,
				onGamepadButtonDown: c.onGamepadButtonDown,
				onGamepadButtonPress: c.onGamepadButtonPress,
				onGamepadButtonRelease: c.onGamepadButtonRelease,
				onGamepadStick: c.onGamepadStick,
				onButtonPress: c.onButtonPress,
				onButtonDown: c.onButtonDown,
				onButtonRelease: c.onButtonRelease,
				mousePos: c.mousePos,
				mouseDeltaPos: c.mouseDeltaPos,
				isKeyDown: c.isKeyDown,
				isKeyPressed: c.isKeyPressed,
				isKeyPressedRepeat: c.isKeyPressedRepeat,
				isKeyReleased: c.isKeyReleased,
				isMouseDown: c.isMouseDown,
				isMousePressed: c.isMousePressed,
				isMouseReleased: c.isMouseReleased,
				isMouseMoved: c.isMouseMoved,
				isGamepadButtonPressed: c.isGamepadButtonPressed,
				isGamepadButtonDown: c.isGamepadButtonDown,
				isGamepadButtonReleased: c.isGamepadButtonReleased,
				getGamepadStick: c.getGamepadStick,
				isButtonPressed: c.isButtonPressed,
				isButtonDown: c.isButtonDown,
				isButtonReleased: c.isButtonReleased,
				setButton: c.setButton,
				getButton: c.getButton,
				pressButton: c.pressButton,
				releaseButton: c.releaseButton,
				getLastInputDeviceType: c.getLastInputDeviceType,
				charInputted: c.charInputted,
				loop: J,
				wait: K,
				play: ua,
				setVolume: lo,
				getVolume: mo,
				volume: ca,
				burp: ar,
				audioCtx: C.ctx,
				Line: Oe,
				Rect: W,
				Circle: we,
				Ellipse: Ke,
				Point: Tn,
				Polygon: be,
				Vec2: E,
				Color: j,
				Mat4: fe,
				Quad: q,
				RNG: $t,
				rand: he,
				randi: Cr,
				randSeed: Go,
				vec2: v,
				rgb: I,
				hsl2rgb: So,
				quad: le,
				choose: Do,
				chooseMultiple: Ro,
				shuffle: Er,
				chance: Mo,
				lerp: de,
				tween: Z,
				easings: tt,
				map: Se,
				mapc: Po,
				wave: On,
				deg2rad: ae,
				rad2deg: ct,
				clamp: Te,
				evaluateQuadratic: No,
				evaluateQuadraticFirstDerivative: Uo,
				evaluateQuadraticSecondDerivative: Ho,
				evaluateBezier: Qt,
				evaluateBezierFirstDerivative: qo,
				evaluateBezierSecondDerivative: zo,
				evaluateCatmullRom: Wo,
				evaluateCatmullRomFirstDerivative: Yo,
				curveLengthApproximation: Vr,
				normalizedCurve: $o,
				hermite: Ft,
				cardinal: Pr,
				catmullRom: Lt,
				bezier: Xo,
				kochanekBartels: Qo,
				easingSteps: ts,
				easingLinear: Zo,
				easingCubicBezier: es,
				testLineLine: An,
				testRectRect: Tr,
				testRectLine: Sn,
				testRectPoint: Dt,
				testCirclePolygon: Xt,
				testLinePoint: Vn,
				testLineCircle: Bt,
				isConvex: os,
				triangulate: Gn,
				NavMesh: Kn,
				drawSprite: yi,
				drawText: Zr,
				formatText: Ue,
				drawRect: xe,
				drawLine: kt,
				drawLines: Kt,
				drawTriangle: $n,
				drawCircle: Ne,
				drawEllipse: qn,
				drawUVQuad: st,
				drawPolygon: Pe,
				drawCurve: zn,
				drawBezier: ui,
				drawFormattedText: He,
				drawMasked: bi,
				drawSubtracted: xi,
				pushTransform: ge,
				popTransform: me,
				pushTranslate: X,
				pushScale: nt,
				pushRotate: Ye,
				pushMatrix: _s,
				usePostEffect: R,
				makeCanvas: O,
				debug: w,
				scene: ha,
				getSceneName: ya,
				go: ga,
				onSceneLeave: ba,
				layers: da,
				getLayers: ma,
				setLayers: fo,
				getDefaultLayer: pa,
				addLevel: Pi,
				getData: S,
				setData: G,
				download: Dn,
				downloadJSON: xs,
				downloadText: Mr,
				downloadBlob: Rr,
				plug: M,
				ASCII_CHARS: Mn,
				canvas: c.canvas,
				addKaboom: la,
				LEFT: E.LEFT,
				RIGHT: E.RIGHT,
				UP: E.UP,
				DOWN: E.DOWN,
				RED: j.RED,
				GREEN: j.GREEN,
				BLUE: j.BLUE,
				YELLOW: j.YELLOW,
				MAGENTA: j.MAGENTA,
				CYAN: j.CYAN,
				WHITE: j.WHITE,
				BLACK: j.BLACK,
				quit: mr,
				KEvent: re,
				KEventHandler: ze,
				KEventController: ke,
				cancel: () => Rn,
			};
			a.k = $e;
			let xn = t.plugins;
			if ((xn && xn.forEach(M), t.global !== !1))
				for (let F in $e) window[F] = $e[F];
			return t.focus !== !1 && c.canvas.focus(), $e;
		};
	var fc = Qa;
	return au(hc);
})();
window.kaboom = kaplay.default;
window.kaplay = kaplay.default;
//# sourceMappingURL=kaplay.js.map
