/**
* @author mrdoob / http://mrdoob.com/
*/

import {
  DefaultLoadingManager,
  FileLoader,
  Group,
  BufferGeometry,
  BufferAttribute,
  LineBasicMaterial,
  MeshPhongMaterial,
  Mesh,
  LineSegments,
} from 'three';

// o object_name | g group_name
const object_pattern = /^[og]\s*(.+)?/; //eslint-disable-line
// mtllib file_reference
const material_library_pattern = /^mtllib /; //eslint-disable-line
// usemtl material_name
const material_use_pattern = /^usemtl /; //eslint-disable-line

const ParserState = () => {
  let state = {
    objects: [],
    object: {},

    vertices: [],
    normals: [],
    uvs: [],

    materialLibraries: [],

    startObject: function(name, fromDeclaration) {
      // If the current object (initial from reset) is not from a g/o declaration in the parsed
      // file. We need to use it for the first parsed g/o to keep things in sync.
      if (this.object && this.object.fromDeclaration === false) {
        this.object.name = name;
        this.object.fromDeclaration = (fromDeclaration !== false);
        return;
      }

      let previousMaterial = (this.object && typeof this.object.currentMaterial === 'function'
        ? this.object.currentMaterial()
        : undefined);

      if (this.object && typeof this.object._finalize === 'function') {
        this.object._finalize(true);
      }

      this.object = {
        name: name || '',
        fromDeclaration: (fromDeclaration !== false),

        geometry: {
          vertices: [],
          normals: [],
          uvs: [],
        },
        materials: [],
        smooth: true,

        startMaterial: function(name, libraries) {
          let previous = this._finalize(false);

          // New usemtl declaration overwrites an inherited material, except if faces were declared
          // after the material, then it must be preserved for proper MultiMaterial continuation.
          if (previous && (previous.inherited || previous.groupCount <= 0)) {
            this.materials.splice(previous.index, 1);
          }

          let material = {
            index: this.materials.length,
            name: name || '',
            mtllib: (Array.isArray(libraries) && libraries.length > 0
              ? libraries[libraries.length - 1]
              : ''),
            smooth: (previous !== undefined
              ? previous.smooth
              : this.smooth),
            groupStart: (previous !== undefined
              ? previous.groupEnd
              : 0),
            groupEnd: -1,
            groupCount: -1,
            inherited: false,

            clone: function(index) {
              let cloned = {
                index: (typeof index === 'number'
                  ? index
                  : this.index),
                name: this.name,
                mtllib: this.mtllib,
                smooth: this.smooth,
                groupStart: 0,
                groupEnd: -1,
                groupCount: -1,
                inherited: false,
              };
              cloned.clone = this.clone.bind(cloned);
              return cloned;
            },
          };

          this.materials.push(material);

          return material;
        },

        currentMaterial: function() {
          if (this.materials.length > 0) {
            return this.materials[this.materials.length - 1];
          }

          return undefined;
        },

        _finalize: function(end) {
          let lastMultiMaterial = this.currentMaterial();
          if (lastMultiMaterial && lastMultiMaterial.groupEnd === -1) {
            lastMultiMaterial.groupEnd = this.geometry.vertices.length / 3;
            lastMultiMaterial.groupCount = lastMultiMaterial.groupEnd - lastMultiMaterial.groupStart; //eslint-disable-line
            lastMultiMaterial.inherited = false;
          }

          // Ignore objects tail materials if no face
          // declarations followed them before a new o/g started.
          if (end && this.materials.length > 1) {
            for (let mi = this.materials.length - 1; mi >= 0; mi--) {
              if (this.materials[mi].groupCount <= 0) {
                this.materials.splice(mi, 1);
              }
            }
          }

          // Guarantee at least one empty material,
          // this makes the creation later more straight forward.
          if (end && this.materials.length === 0) {
            this.materials.push({ name: '', smooth: this.smooth });
          }

          return lastMultiMaterial;
        },
      };

      // Inherit previous objects material.
      // Spec tells us that a declared material must be set to all objects until
      // a new material is declared.
      // If a usemtl declaration is encountered while this new object is being parsed, it will
      // overwrite the inherited material. Exception being that there was already face declarations
      // to the inherited material, then it will be preserved for proper MultiMaterial continuation.

      if (previousMaterial && previousMaterial.name
          && typeof previousMaterial.clone === 'function') {
        let declared = previousMaterial.clone(0);
        declared.inherited = true;
        this.object.materials.push(declared);
      }

      this.objects.push(this.object);
    },

    finalize: function() {
      if (this.object && typeof this.object._finalize === 'function') {
        this.object._finalize(true);
      }
    },

    parseVertexIndex: function(value, len) {
      let index = parseInt(value, 10);
      return (index >= 0
        ? index - 1
        : index + len / 3) * 3;
    },

    parseNormalIndex: function(value, len) {
      let index = parseInt(value, 10);
      return (index >= 0
        ? index - 1
        : index + len / 3) * 3;
    },

    parseUVIndex: function(value, len) {
      let index = parseInt(value, 10);
      return (index >= 0
        ? index - 1
        : index + len / 2) * 2;
    },

    addVertex: function(a, b, c) {
      let src = this.vertices;
      let dst = this.object.geometry.vertices;

      dst.push(src[a + 0], src[a + 1], src[a + 2]);
      dst.push(src[b + 0], src[b + 1], src[b + 2]);
      dst.push(src[c + 0], src[c + 1], src[c + 2]);
    },

    addVertexLine: function(a) {
      let src = this.vertices;
      let dst = this.object.geometry.vertices;

      dst.push(src[a + 0], src[a + 1], src[a + 2]);
    },

    addNormal: function(a, b, c) {
      let src = this.normals;
      let dst = this.object.geometry.normals;

      dst.push(src[a + 0], src[a + 1], src[a + 2]);
      dst.push(src[b + 0], src[b + 1], src[b + 2]);
      dst.push(src[c + 0], src[c + 1], src[c + 2]);
    },

    addUV: function(a, b, c) {
      let src = this.uvs;
      let dst = this.object.geometry.uvs;

      dst.push(src[a + 0], src[a + 1]);
      dst.push(src[b + 0], src[b + 1]);
      dst.push(src[c + 0], src[c + 1]);
    },

    addUVLine: function(a) {
      let src = this.uvs;
      let dst = this.object.geometry.uvs;

      dst.push(src[a + 0], src[a + 1]);
    },

    addFace: function(a, b, c, ua, ub, uc, na, nb, nc) {
      let vLen = this.vertices.length;

      let ia = this.parseVertexIndex(a, vLen);
      let ib = this.parseVertexIndex(b, vLen);
      let ic = this.parseVertexIndex(c, vLen);

      this.addVertex(ia, ib, ic);

      if (ua !== undefined) {
        let uvLen = this.uvs.length;

        ia = this.parseUVIndex(ua, uvLen);
        ib = this.parseUVIndex(ub, uvLen);
        ic = this.parseUVIndex(uc, uvLen);

        this.addUV(ia, ib, ic);
      }

      if (na !== undefined) {
        // Normals are many times the same. If so, skip function call and parseInt.
        let nLen = this.normals.length;
        ia = this.parseNormalIndex(na, nLen);

        ib = na === nb
          ? ia
          : this.parseNormalIndex(nb, nLen);
        ic = na === nc
          ? ia
          : this.parseNormalIndex(nc, nLen);

        this.addNormal(ia, ib, ic);
      }
    },

    addLineGeometry: function(vertices, uvs) {
      this.object.geometry.type = 'Line';

      let vLen = this.vertices.length;
      let uvLen = this.uvs.length;

      for (let vi = 0, l = vertices.length; vi < l; vi++) {
        this.addVertexLine(this.parseVertexIndex(vertices[vi], vLen));
      }

      for (let uvi = 0, l = uvs.length; uvi < l; uvi++) {
        this.addUVLine(this.parseUVIndex(uvs[uvi], uvLen));
      }
    },
  };

  state.startObject('', false);

  return state;
};

/**
* OBJLoader class
* @type {Loader}
*/
export default class OBJLoader {
  /**
* @param  {THREE.DefaultLoadingManager} manager
*/
  constructor(manager) {
    this.manager = (manager !== undefined)
      ? manager
      : DefaultLoadingManager;

    this.materials = null;
  }

  /**
* @param  {String} url
* @param  {Function} onLoad
* @param  {Function} onProgress
* @param  {Function} onError
*/
  load(url, onLoad, onProgress, onError) {
    let scope = this;

    let loader = new FileLoader(scope.manager);
    loader.setPath(this.path);
    loader.load(url, function(text) {
      onLoad(scope.parse(text));
    }, onProgress, onError);
  }

  /**
* @param {String} value
*/
  setPath(value) {
    this.path = value;
  }

  /**
* @param {Object} materials
* @return {OBJLoader} this
*/
  setMaterials(materials) {
    this.materials = materials;

    return this;
  }

  /**
* @param  {String} text
* @return {String}
*/
  parse(text) {
    console.time('OBJLoader'); //eslint-disable-line

    let state = new ParserState();

    if (text.indexOf('\r\n') !== - 1) {
      // This is faster than String.split with regex that splits on both
      text = text.replace(/\r\n/g, '\n');
    }

    if (text.indexOf('\\\n') !== - 1) {
      // join lines separated by a line continuation character (\)
      text = text.replace(/\\\n/g, '');
    }

    let lines = text.split('\n');
    let line = '';
    let lineFirstChar = '';
    let lineLength = 0;
    let result = [];

    // Faster to just trim left side of the line. Use if available.
    let trimLeft = (typeof ''.trimLeft === 'function');

    for (let i = 0, l = lines.length; i < l; i++) {
      line = lines[i];

      line = trimLeft
        ? line.trimLeft()
        : line.trim();

      lineLength = line.length;

      if (lineLength === 0) {
        continue;
      }

      lineFirstChar = line.charAt(0);

      // @todo invoke passed in handler if any
      if (lineFirstChar === '#') {
        continue;
      }

      if (lineFirstChar === 'v') {
        let data = line.split(/\s+/);

        switch (data[0]) {
          case 'v':
            state.vertices.push(parseFloat(data[1]), parseFloat(data[2]), parseFloat(data[3]));
            break;
          case 'vn':
            state.normals.push(parseFloat(data[1]), parseFloat(data[2]), parseFloat(data[3]));
            break;
          case 'vt':
            state.uvs.push(parseFloat(data[1]), parseFloat(data[2]));
            break;
        }
      } else if (lineFirstChar === 'f') {
        let lineData = line.substr(1).trim();
        let vertexData = lineData.split(/\s+/);
        let faceVertices = [];

        // Parse the face vertex data into an easy to work with format

        for (let j = 0, jl = vertexData.length; j < jl; j++) {
          let vertex = vertexData[j];

          if (vertex.length > 0) {
            let vertexParts = vertex.split('/');
            faceVertices.push(vertexParts);
          }
        }

        // Draw an edge between the first vertex and all subsequent vertices to form an n-gon

        let v1 = faceVertices[0];

        for (let j = 1, jl = faceVertices.length - 1; j < jl; j++) {
          let v2 = faceVertices[j];
          let v3 = faceVertices[j + 1];

          state.addFace(v1[0], v2[0], v3[0], v1[1], v2[1], v3[1], v1[2], v2[2], v3[2]);
        }
      } else if (lineFirstChar === 'l') {
        let lineParts = line.substring(1).trim().split(' ');
        let lineVertices = [];
        let lineUVs = [];

        if (line.indexOf('/') === - 1) {
          lineVertices = lineParts;
        } else {
          for (let li = 0, llen = lineParts.length; li < llen; li++) {
            let parts = lineParts[li].split('/');

            if (parts[0] !== '') {
              lineVertices.push(parts[0]);
            }
            if (parts[1] !== '') {
              lineUVs.push(parts[1]);
            }
          }
        }
        state.addLineGeometry(lineVertices, lineUVs);
      } else if ((result = object_pattern.exec(line)) !== null) {
        // o object_name
        // or
        // g group_name

        // WORKAROUND: https://bugs.chromium.org/p/v8/issues/detail?id=2869
        // var name = result[ 0 ].substr( 1 ).trim();
        let name = (' ' + result[0].substr(1).trim()).substr(1);

        state.startObject(name);
      } else if (material_use_pattern.test(line)) {
        // material

        state.object.startMaterial(line.substring(7).trim(), state.materialLibraries);
      } else if (material_library_pattern.test(line)) {
        // mtl file

        state.materialLibraries.push(line.substring(7).trim());
      } else if (lineFirstChar === 's') {
        result = line.split(' ');

        // smooth shading

        // @todo Handle files that have varying smooth values for a set of faces
        // inside one geometry, but does not define a usemtl for each face set.
        // This should be detected and a dummy material created
        // (later MultiMaterial and geometry groups).
        // This requires some care to not create extra material on each smooth
        //  value for "normal" obj files.
        // where explicit usemtl defines geometry groups.
        // Example asset: examples/models/obj/cerberus/Cerberus.obj

        /*
* http://paulbourke.net/dataformats/obj/
* or
* http://www.cs.utah.edu/~boulos/cs3505/obj_spec.pdf
*
* From chapter "Grouping" Syntax explanation "s group_number":
* "group_number is the smoothing group number. To turn off smoothing
*  groups, use a value of 0 or off.
* Polygonal elements use group numbers to put elements in different
*  smoothing groups. For free-form
* surfaces, smoothing groups are either turned on or off; there is no
*  difference between values greater
* than 0."
*/
        if (result.length > 1) {
          let value = result[1].trim().toLowerCase();
          state.object.smooth = (value !== '0' && value !== 'off');
        } else {
          // ZBrush can produce "s" lines #11707
          state.object.smooth = true;
        }
        let material = state.object.currentMaterial();
        if (material) {
          material.smooth = state.object.smooth;
        } else {
          // Handle null terminated files without exception
          if (line === '\0') {
            continue;
          }

          throw new Error('Unexpected line: \'' + line + '\'');
        }
      }

      state.finalize();

      let container = new Group();
      container.materialLibraries = [].concat(state.materialLibraries);

      for (let i = 0, l = state.objects.length; i < l; i++) {
        let object = state.objects[i];
        let geometry = object.geometry;
        let materials = object.materials;
        let isLine = (geometry.type === 'Line');

        // Skip o/g line declarations that did not follow with any faces
        if (geometry.vertices.length === 0) {
          continue;
        }

        let buffergeometry = new BufferGeometry();

        buffergeometry.addAttribute('position',
          new BufferAttribute(new Float32Array(geometry.vertices), 3));

        if (geometry.normals.length > 0) {
          buffergeometry.addAttribute('normal',
            new BufferAttribute(new Float32Array(geometry.normals), 3));
        } else {
          buffergeometry.computeVertexNormals();
        }

        if (geometry.uvs.length > 0) {
          buffergeometry.addAttribute('uv', new BufferAttribute(new Float32Array(geometry.uvs), 2));
        }

        // Create materials

        let createdMaterials = [];

        for (let mi = 0, miLen = materials.length; mi < miLen; mi++) {
          let sourceMaterial = materials[mi];
          let material = undefined;

          if (this.materials !== null) {
            material = this.materials.create(sourceMaterial.name);

            // mtl etc. loaders probably can't create line materials correctly, 
            // copy properties to a line material.
            if (isLine && material && !(material instanceof LineBasicMaterial)) {
              let materialLine = new LineBasicMaterial();
              materialLine.copy(material);
              material = materialLine;
            }
          }

          if (!material) {
            material = (!isLine
              ? new MeshPhongMaterial()
              : new LineBasicMaterial());
            material.name = sourceMaterial.name;
          }

          material.flatShading = sourceMaterial.smooth
            ? false
            : true;

          createdMaterials.push(material);
        }

        // Create mesh

        let mesh;

        if (createdMaterials.length > 1) {
          for (let mi = 0, miLen = materials.length; mi < miLen; mi++) {
            let sourceMaterial = materials[mi];
            buffergeometry.addGroup(sourceMaterial.groupStart, sourceMaterial.groupCount, mi);
          }

          mesh = (!isLine
            ? new Mesh(buffergeometry, createdMaterials)
            : new LineSegments(buffergeometry, createdMaterials));
        } else {
          mesh = (!isLine
            ? new Mesh(buffergeometry, createdMaterials[0])
            : new LineSegments(buffergeometry, createdMaterials[0]));
        }

        mesh.name = object.name;

        container.add(mesh);
      }

      console.timeEnd('OBJLoader'); //eslint-disable-line

      return container;
    }
  }
}
