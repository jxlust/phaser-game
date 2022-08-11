## ShaderMaterial 
+ 自定义着色器材质
+ three.js 库中功能最为丰富、也是最为复杂的一种高级材质。
+ GLSL 着色器语言
+ vertexShader：它会在几何体的每一个顶点上执行。可以用这个着色器通过改变顶点的位置来对几何体进行变换；
+ fragmentShader：它会在几何体的每一个像素上执行。在 vertexShader 里，我们会返回这个特定像素应该显示的颜色；
+ fragmentShader（网站 http://glslsandbox.com/ 提供了很多着色器）