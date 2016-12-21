precision highp float;
varying vec3 v_position;
uniform vec3 u_color0;
uniform vec3 u_color1;
uniform float u_shininess;
void main(void) {
	float intensity = (v_position.y / 2.) + 0.5;
	float u_shininess1 = u_shininess;
	vec3 color = vec3(0.6,0.6,0.6);

	gl_FragColor = vec4(color,.7); 
}
