precision highp float;
varying vec3 v_normal;
varying vec2 v_texcoord0;
uniform sampler2D u_diffuse;
uniform float u_shininess;
void main(void) {
float u_shininess1 = u_shininess;
vec3 normal = normalize(v_normal);
float lambert = 0.;
if( gl_FrontFacing )
	lambert = dot(normal,vec3(1.,1.,1.));
else
	lambert = dot(normal,vec3(-1.,-1.,-1.));
if(lambert <0.0)
	lambert = -1.0*lambert;

vec4 color = vec4(0., 0., 0., 0.);
float intensity=1.0;
color = color + texture2D(u_diffuse, v_texcoord0) * vec4(1,1,1,1.5);
gl_FragColor = vec4(color.rgb * color.a, color.a);

}