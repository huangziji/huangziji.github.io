function loadShader(source) {
   const fs = gl.createShader(gl.FRAGMENT_SHADER)
   gl.shaderSource(fs, source)
   gl.compileShader(fs)
   if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      const message = gl.getShaderInfoLog(fs)
      console.error("fail to compile fragment shader. ", message)
   }

   const vsSource = `#version 300 es
   precision mediump float;
   void main() {
      vec2 UV = vec2(gl_VertexID&1, gl_VertexID/2);
      gl_Position = vec4(UV*2.-1., 0, 1);
   }
   `

   const vs = gl.createShader(gl.VERTEX_SHADER)
   gl.shaderSource(vs, vsSource)
   gl.compileShader(vs)
   if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      const message = gl.getShaderInfoLog(vs)
      console.error("fail to compile vertex shader. ", message)
   }
   
   for (const s of gl.getAttachedShaders(prog)) {
      gl.detachShader(prog, s)
      gl.deleteShader(s)
   }
   gl.attachShader(prog, vs)
   gl.attachShader(prog, fs)
   gl.linkProgram(prog)
   gl.validateProgram(prog)
}

const myTextArea = document.getElementById('myTextArea')
const canvas = document.querySelector('canvas')
canvas.width  = 640
canvas.height = 360

const gl = canvas.getContext('webgl2')
const prog = gl.createProgram()

myTextArea.value = `#version 300 es
precision mediump float;
layout (std140) uniform Input {
   vec4 iResolution;
   float iTime;
};
out vec4 fragColor;
void main()
{
   vec2 uv = (2.0*gl_FragCoord.xy-iResolution.xy)/iResolution.y;
   fragColor = vec4(uv,sin(iTime)*.5+.5,1);
}
`

loadShader(myTextArea.value)

const ubo = gl.createBuffer()
gl.bindBuffer(gl.UNIFORM_BUFFER, ubo)
gl.bufferData(gl.UNIFORM_BUFFER, 16*4, gl.DYNAMIC_DRAW)
gl.bindBufferBase(gl.UNIFORM_BUFFER, 0, ubo)

function render() {
   const time = performance.now()/1000.
   const data = [
      canvas.width,canvas.height,1,1,
      time,1.2,0,0,
      1,1,1,1,
      1,1,1,1,
   ]
   gl.bufferSubData(gl.UNIFORM_BUFFER, 0, new Float32Array(data))

   gl.clearColor(0,0,0,1)
   gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT)
   gl.useProgram(prog)
   gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
   window.requestAnimationFrame(render)
}

render();

document.addEventListener('keydown', function(event) {
   if ((event.altKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      loadShader(myTextArea.value)
      console.log("Alt + Enter pressed. run program");
   }
});