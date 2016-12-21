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
	Component = require("montage/ui/component").Component,
	Color = require("ui/core/color").Color;
var RangeController = require("montage/core/range-controller").RangeController;
var isMenuDisplayed=0;
exports.MenuPanel = Montage.create(Component, /** @lends module:"montage/ui/stage.reel".Stage# */ {

	constructor: {
        value: function KBE () {
            this.super();
          
			this.viewController = new RangeController().initWithContent([]);
            this.defineBinding("setCapture" ,{"<-": "viewController.selection.0"});
			
			//this.pickController = new RangeController().initWithContent([]);
           // this.pickController.selectAddedContent = true;
            //this.defineBinding("model" ,{"<-": "pickController.selection.0"});
		 }
    },

    handleRestartAction: {
        value: function () {
            this.dispatchEventNamed("reload");
        }
    },
	handleEnv1Action: { 
    	value: function(event) {
    		alert("Env1 called");
    	}
    },
	handleEnv2Action: { 
    	value: function(event) {
    		alert("Env2 called");
    	}
    },
	handleEnvDefaultAction: { 
    	value: function(event) {
    		alert("Env-default called");
    	}
    },
	handleMenuPanelVisibilityAction: { 
    	value: function(event) {
    		if(isMenuDisplayed==0)
			{
				document.getElementById('settingMenuDiv').style.display="block";
				isMenuDisplayed=1;
			}
			else
			{
				document.getElementById('settingMenuDiv').style.display="none";
				isMenuDisplayed=0;
			}
    	}
    },
	showReflection: {
        value: false
    },

    showBBOX: {
        value: false
    },
	bodyColorController: {value: null, writable:true },
	bodyColor: {value: null, writable:true },
	bodyColor_options: {
        distinct: true,
           value: [Color.create().initWithNameAndRGB("Cavern Grey",  52,60,68),
				Color.create().initWithNameAndRGB("Porcelain White",  240,234,220),
                Color.create().initWithNameAndRGB("Starlight Blue",  115,141,156),
				Color.create().initWithNameAndRGB("Spanish Tan",  82,50,32),
				Color.create().initWithNameAndRGB("Burgundy Royale",  0,28,120),
                Color.create().initWithNameAndRGB("Mint White",  227,227,225),
                Color.create().initWithNameAndRGB("Neo Orange", 230,51,0),
                Color.create().initWithNameAndRGB("Arctic Silver",  135,137,139),
                Color.create().initWithNameAndRGB("Infinity Black",  17,11,14),
                Color.create().initWithNameAndRGB("Brilliant Blue",  0,62,103),
                Color.create().initWithNameAndRGB("Spice Red",  108,15,25),
                Color.create().initWithNameAndRGB("Summer Sparkle",  230,142,0),
				Color.create().initWithNameAndRGB("Apple Green",  126,126,33),
				Color.create().initWithNameAndRGB("After Glow",  144,142,135),
				]
				
	},
	_shininess :  { value: 5, writable: true },

    shininess: {
        set: function(value) {
			this._shininess = value;
		 }, 
        get: function(value) {
            return this._shininess;
        }
	},	
	handlePerspectiveAction: {
        value: function () {
			var projectionType = 0; 
			this.view.cameraProjection(projectionType);
        }
    },
	handleOrthographicAction: {
        value: function () {
			var projectionType = 1;
			this.view.cameraProjection(projectionType);
        }
    },
	handleFitallAction: {
        value: function () {
			this.view.cameraController.fitall();
        }
    },
	handleTurnAction: {
        value: function () {
			alert("Turn on");
        }
    },
	handleDriverVisionAction: {
        value: function () {
		
        }
    },
	enablePick: { value: false, writable:true },
	disablePick: { value: true, writable:true },
	handleEnablePick1Action: {
        value: function () {
		 this.enablePick = true;
		 this.disablePick = false;
		 
        }
    },
	handleDisablePick1Action: {
        value: function () {
		 this.enablePick = false;
		 this.disablePick = true;
        }
    },
	handleSetdefaultpropertiesAction: {
        value: function () {
		
        }
    },
	//PMI show/hide handle
	_showPMI: {value: true},
	handleShowPMIAction: {

        value: function () {
			if(this._showPMI == true)
			{
				this.view.showPMI = true;
				this.view.renderPMI();
				this._showPMI = false;
			}
			else
			{
				this.view.showPMI = false;
				this.view.renderPMI();
				this._showPMI = true;
			}
		}

    },
	viewController: {value: null, writable:true },
	handlePmiViewAction: {
        value: function () {
			
			var rot = vec4.createFrom(  0, -1, 0, 0);
			var eye = vec3.createFrom( 418.636, 423.57, 0);
			var target = vec3.createFrom(  418.636, -568.338, 0);
			var up = vec3.createFrom(this.view.cameraController.viewPoint.glTFElement.transform.matrix[8], this.view.cameraController.viewPoint.glTFElement.transform.matrix[9], this.view.cameraController.viewPoint.glTFElement.transform.matrix[10]);
			var re = this.setCaputeView(eye, target, up);
			var xAxis = vec3.createFrom(re[0], re[4], re[8]);
			var yAxis = vec3.createFrom(re[1], re[5], re[9]);
			var zAxis = vec3.createFrom(re[3], re[6], re[10]);
			re[12] = 1*vec3.dot(xAxis, eye);
			re[13] = 1*vec3.dot(yAxis, eye);
			re[14] = 1*vec3.dot(zAxis, eye);
			//this.view.cameraController.viewPoint.glTFElement.transform.translation = eye;
			this.view.cameraController.viewPoint.glTFElement.transform.matrix = re;
			this.view.cameraController.viewPoint.glTFElement.transform._dirty = true;
			
		}
    },
	handlePmiView1Action: {
        value: function () {
			
			var eye = vec3.createFrom(443.592, 137.963, 497.534);
			var target = vec3.createFrom(443.592, -503.51, 146.649);
			//var rot = vec4.createFrom(0, -0.877325, -0.479896, 270);
			var _comMatrix = this.view.cameraController.viewPoint.glTFElement.transform.matrix;
			var up = vec3.createFrom(_comMatrix[8], _comMatrix[9], _comMatrix[10]);
			
			var re = this.setCaputeView(eye, target, up);
			
			var xAxis = vec3.createFrom(re[0], re[4], re[8]);
			var yAxis = vec3.createFrom(re[1], re[5], re[9]);
			var zAxis = vec3.createFrom(re[3], re[6], re[10]);
			/* re[12] = -1*vec3.dot(xAxis, eye);
			re[13] = -1*vec3.dot(yAxis, eye);
			re[14] = -1*vec3.dot(zAxis, eye); */
			
			var resultMatrix = mat4.create();
			mat4.inverse(_comMatrix);
			mat4.multiply(_comMatrix, re, resultMatrix);
						
			this.view.cameraController.viewPoint.glTFElement.transform.matrix = resultMatrix;
			this.view.cameraController.viewPoint.glTFElement.transform._dirty = true;
		}
    },
	handleInitialBtnAction: {
        value: function () {
		
        }
    },
	handlePlayBtnAction: {
        value: function () {
		
        }
    },
	handleStepUpBtnAction: {
        value: function () {
		
        }
    },
	handleApplyExteriorColorAction: {
        value: function () {
		//alert("sadalsjd");
        }
    },
	handleHtmlColorPickerAction: {
        value: function () {
		//alert("sadalsjd");
		document.getElementById('htmlcolorPalette').style.display="block";
		colorPickerFlag=1;
        }
    },
	handleCustomColorAction: {
        value: function () {
		//alert("sadalsjd");
		document.getElementById('htmlcolorPalette').style.display="block";
		colorPickerFlag=2;
        }
    },
	willDraw: {
        value: function() {
			var computedStyle = window.getComputedStyle(this.element, null);
			document.getElementById('preloader').style.left = "-"+((window.innerWidth) /2)+ "px";
			document.getElementById('preloader').style.top = ((window.innerHeight)/2) + "px";
			fixGradientImg();
			currentColor = Colors.ColorFromRGB(0,168,255);
			new dragObject("arrows", "hueBarDiv", arrowsLowBounds, arrowsUpBounds, arrowsDown, arrowsMoved, endMovement);
			new dragObject("circle", "gradientBox", circleLowBounds, circleUpBounds, circleDown, circleMoved, endMovement);
			colorChanged('box'); 
			var EnvironmentMenu = new Spry.Widget.CollapsiblePanel("EnvironmentMenu",{contentIsOpen:true,duration:150});
			var exteriorColorOption = new Spry.Widget.CollapsiblePanel("exteriorColorOption",{contentIsOpen:true,duration:150});
			var renderingOption = new Spry.Widget.CollapsiblePanel("renderingOption",{contentIsOpen:true,duration:150});
			var cameraOptions = new Spry.Widget.CollapsiblePanel("cameraOptions",{contentIsOpen:true,duration:150});
			var driverVisionBtn = new Spry.Widget.CollapsiblePanel("driverVisionBtn",{contentIsOpen:true,duration:150});
			var pickOption = new Spry.Widget.CollapsiblePanel("pickOption",{contentIsOpen:true,duration:150});
			var PMI = new Spry.Widget.CollapsiblePanel("PMI",{contentIsOpen:false,duration:150});
			var caeflowLineControlMenu = new Spry.Widget.CollapsiblePanel("caeflowLineControlMenu",{contentIsOpen:false,duration:150});
			this.viewController.content = [
                    { "name": "Front"}, 
                    { "name": "Back"}, 
                    { "name": "left Side"}, 
                    { "name": "Right Side"}, 
                    { "name": "Top"}, 
                    { "name": "Bottom"}, 
                    { "name": "Axonometric"}, 
                ];
				
				/* this.pickController.content = [
                    { "name": "Hidden"}, 
                    { "name": "Color Change"}, 
                    { "name": "Hide selected"}, 
                    { "name": "Show selected"}, 
                ]; */
			this.bodyColorController =  new RangeController().initWithContent(this.bodyColor_options);
			this.defineBinding("bodyColor" ,{"<-": "bodyColorController.selection.0"});
			
			this.viewController = new RangeController().initWithContent(this.viewController.content);
            this.defineBinding("setCaptures" ,{"<-": "viewController.selection.0"});
			
			/* Object.defineBinding(this.bodyColorController, "selectedObjects.0", {
                boundObject: this,
                boundObjectPropertyPath: "bodyColor"
            }); */
			//this.bodyColorController.selectedObjects = [this.bodyColor];
			// this.bodyColorController.selectedObjects = [this.bodyColor];
			 //alert(this.bodyColorController.selectedObjects);
		}
    },
	//Adding text Support /mbd
	createText: {
		value : function() {
		
			var text = "GLTF TEXT",

			height = 0,
			size = 5,
			hover = 1,

			curveSegments = 4,

			bevelThickness = 1,
			bevelSize = 2,
			bevelSegments = 3,
			bevelEnabled = false,

			font = "helvetiker", // helvetiker, optimer, gentilis, droid sans, droid serif
			weight = "normal", // normal bold
			style = "normal"; // normal italic
			
			this.view.lineDrawArray = [];
			//var checkCnt = 0;
			for(var l=0;l<pmiNameArray.length;l++)
			{
				var pmiArray = [];
				textShapeArray = []; //Defined in three.min.js.. Empty this array before getting filled from three.min.js.. It hold the number of characters in a word
				var textGeo = new THREE.TextGeometry( pmiNameArray[l], {

				size: size,
				height: height,
				curveSegments: curveSegments,

				font: font,
				weight: weight,
				style: style,

				bevelThickness: bevelThickness,
				bevelSize: bevelSize,
				bevelEnabled: bevelEnabled,

				material: 0,
				extrudeMaterial: 0

				});
				var inc =0;
				var fillArray = new Array();
				for(var i = 0;i<textGeo.vertices.length;i++)
				{
					var pointVec = vec4.createFrom(textGeo.vertices[i].x, textGeo.vertices[i].y, textGeo.vertices[i].z,1.0);
					var modelMatrix = mat4.createFrom(	pmiPositionArray[l][0], pmiPositionArray[l][1], pmiPositionArray[l][2], 0,
														pmiPositionArray[l][3], pmiPositionArray[l][4], pmiPositionArray[l][5], 0,
														pmiPositionArray[l][6], pmiPositionArray[l][7], pmiPositionArray[l][8], 0,
														0, 0, 0, 1);
					
					var result = vec4.create();;
					mat4.multiply(modelMatrix,pointVec,result);
					fillArray[inc++] = result[0] + parseFloat(pmiPositionArray[l][9]);
					fillArray[inc++] = result[1] + parseFloat(pmiPositionArray[l][10]);
					fillArray[inc++] = result[2] + parseFloat(pmiPositionArray[l][11]);
				} 
				
				var cnt = 0;
				for(var t=0;t<textShapeArray.length;t++)
				{
					var tempCnt =  textShapeArray[t];
					var tempArr = [];
					for(var y=0;y<(tempCnt)*3;y++)
					{
						tempArr[y] = fillArray[cnt];
						cnt++;
					}
					pmiArray.push((tempCnt)*3);
					pmiArray.push(tempArr);
				}
				this.view.lineDrawArray.push(pmiArray);
			}
			callmyfunc(this.view.lineDrawArray); //calling function from index.html for lineDrawArray in txt file...
		}
	},
	setCaputeView :{
		value : function(eye, target, up){
			var te = mat4.identity();
			
			var x = vec3.create();
			var y = vec3.create();
			var z = vec3.create();
			
			vec3.subtract( eye, target, z );
			vec3.normalize(z);
			
			if ( vec3.length(z) === 0 ) {
				z[2] = 1;
			}
			vec3.cross( up, z , x);
			vec3.normalize(x);
			
			if ( vec3.length(x) === 0 ) {
				z[0] += 0.0001;
				vec3.cross( up, z,x );
				vec3.normalize(x);
			}
			vec3.cross( z, x, y );
			
			te[0] = x[0]; te[4] = y[0]; te[8] = z[0];
			te[1] = x[1]; te[5] = y[1]; te[9] = z[1];
			te[2] = x[2]; te[6] = y[2]; te[10] = z[2];
			
			return te;
		}
	}
	
});
