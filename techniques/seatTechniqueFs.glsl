precision highp float;
varying vec3 v_normal;
uniform vec3 u_diffuse;
uniform float u_shininess;
void main(void) {
float u_shininess1 = u_shininess;
vec3 normal = normalize(v_normal);
float lambert = 0.;
if( gl_FrontFacing )
	lambert = dot(normal,vec3(0.,0.,1.));
else
	lambert = dot(normal,vec3(0.,0.,-1.));
if(lambert <0.0)
	lambert = -1.0*lambert;
vec4 color = vec4(0., 0., 0., 0.);
float intensity=2.0;
color = color + vec4(u_diffuse,1.) * vec4(lambert*intensity,lambert*intensity,lambert*intensity,1.);
gl_FragColor = vec4(color.rgb * color.a, color.a);
}