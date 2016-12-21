/* <copyright>
 Copyright (c) 2012, Motorola Mobility LLC.
 All Rights Reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 * Redistributions in binary form must reproduce the above copyright notice,
 this list of conditions and the following disclaimer in the documentation
 and/or other materials provided with the distribution.

 * Neither the name of Motorola Mobility LLC nor the names of its
 contributors may be used to endorse or promote products derived from this
 software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 POSSIBILITY OF SUCH DAMAGE.
 </copyright> */
/**
 @module "montage/ui/menuPanel.reel"
 @requires montage
 @requires montage/ui/component
 */
var Montage = require("montage").Montage,
Color = require("ui/core/color").Color,
Component = require("montage/ui/component").Component;
exports.ColorPicker = Montage.create(Component, /** @lends module:"montage/ui/stage.reel".Stage# */ {
	view: { value: null, writable:true },
	handleColorOkAction : {
		 value: function() {
		  	document.getElementById("htmlcolorPalette").style.display="none";
			if(colorPickerFlag==2)
			{
			  document.getElementById("customColor").style.background=document.getElementById('hexBox').value;
				if(this.view)
				{
					if(this.view.oldPickedObject != null)
					{
						if(this.view.pickType == 2)
						{
							var mat = this.view.oldPickedObject.material;
							var  new_color = Color.create();
							//new_color.hex = this.customColor;
							new_color.hex = document.getElementById('hexBox').value;
							var diffuse = [new_color.red/255,new_color.green/255,new_color.blue/255];
							//var diffuse = mat._parameters.diffuse !== undefined ? mat._parameters.diffuse : [0.8,0.8,0.0] ;
							var ambient = mat._parameters.ambient !== undefined ? mat._parameters.ambient : [0.0,0.0,0.0] ;
							var emission = mat._parameters.emission !== undefined ? mat._parameters.emission : [0.0,0.0,0.0] ;
							var specular = mat._parameters.specular !== undefined ? mat._parameters.specular : [0.0,0.0,0.0] ;
							var shininess = mat._parameters.shininess !== undefined ? mat._parameters.shininess : 100.0 ;
							var reflectivity = mat._parameters.reflectivity !== undefined ? mat._parameters.reflectivity : 0.0 ;
							var transparency = mat._parameters.transparency !== undefined ? mat._parameters.transparency : 1.0 ;
							
												
							var tempMaterial = Object.create(Material).init("pick_mat");
							tempMaterial.name = "pick_mat";
							tempMaterial.parameters =  {diffuse:diffuse,ambient:ambient,emission:emission,specular:specular,shininess:shininess,reflectivity:reflectivity,transparency:transparency};
							tempMaterial.technique = mat.technique;
												
							var old_object_index = this.view.oldPickedObject.index; 
							var old_primitives = this.view.pickResults[old_object_index].mesh.primitives;
							for(var i = 0 ;i<old_primitives.length;i++)
							{
								old_primitives[i].material = tempMaterial;
							}
							this.view.oldPickedObject = null;
							this.view.pickResults = [];	
							var rootnode= this.view.scene.rootNode;
							rootnode.isMaterialSet = false;
						}
					}
				}
		    }
			else if(colorPickerFlag==1)
			{
				document.getElementById("htmlColorPicker").style.background=document.getElementById('hexBox').value;
			}
		}
	},
	 willDraw: {
        value: function() {
		
			//fixGradientImg();
			//currentColor = Colors.ColorFromRGB(0,168,255);
			//new dragObject("arrows", "hueBarDiv", arrowsLowBounds, arrowsUpBounds, arrowsDown, arrowsMoved, endMovement);
			//new dragObject("circle", "gradientBox", circleLowBounds, circleUpBounds, circleDown, circleMoved, endMovement);
			//colorChanged('box'); 
			document.getElementById("CustomDiv").style.display="block";
        }
		
    },
	handleColorCancelAction : {
		value: function() {
		//alert("Color Cancel");
			document.getElementById("htmlcolorPalette").style.display="none";
		}
	},
	handleRestartAction: {
        value: function () {
            this.dispatchEventNamed("reload");
        }
    }
	
});
