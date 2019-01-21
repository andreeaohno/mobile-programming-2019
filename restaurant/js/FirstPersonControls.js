/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author paulirish / http://paulirish.com/
 */
var nrdepasi;
var auxij=1;
var auxiliar;
var px , pz ;
var inaltime = 0;


THREE.FirstPersonControls = function ( object, domElement ) {

	this.object = object;
	this.target = new THREE.Vector3( 0, 0, 0 );

	this.domElement = ( domElement !== undefined ) ? domElement : document;

	this.enabled = true;

	this.movementSpeed = 1.0;
	this.lookSpeed = 0.05;

	this.lookVertical = true;
	this.autoForward = false;

	this.activeLook = true;

	this.heightSpeed = false;
	this.heightCoef = 1.0;
	this.heightMin = 0.0;
	this.heightMax = 1.0;

	this.constrainVertical = false;
	this.verticalMin = 0;
	this.verticalMax = Math.PI;

	this.autoSpeedFactor = 0.0;

	this.mouseX = 0;
	this.mouseY = 0;

	this.lat = 0;
	this.lon = 0;
	this.phi = 0;
	this.theta = 0;

	this.moveForward = false;
	this.moveBackward = false;
	this.moveLeft = false;
	this.moveRight = false;

	this.mouseDragOn = false;

	this.viewHalfX = 0;
	this.viewHalfY = 0;
		

	if ( this.domElement !== document ) {

		this.domElement.setAttribute( 'tabindex', - 1 );

	}

	//

	this.handleResize = function () {

		if ( this.domElement === document ) {

			this.viewHalfX = window.innerWidth / 2;
			this.viewHalfY = window.innerHeight / 2;

		} else {

			this.viewHalfX = this.domElement.offsetWidth / 2;
			this.viewHalfY = this.domElement.offsetHeight / 2;

		}

	};

	this.onMouseDown = function ( event ) {

		if ( this.domElement !== document ) {

			this.domElement.focus();

		}

		event.preventDefault();
		event.stopPropagation();

		if ( this.activeLook ) {

			
			switch ( event.button ) {
				
				case 0: //this.moveForward = true; break;
				case 2: //this.moveBackward = true; break;

			}
				
		}

		this.mouseDragOn = true;

	};

	this.onMouseUp = function ( event ) {

		event.preventDefault();
		event.stopPropagation();

		if ( this.activeLook ) {
			
			switch ( event.button ) {

				case 0: this.moveForward = false; break;
				case 2: this.moveBackward = false; break;

			} 

		}

		this.mouseDragOn = false;

	};

	this.onMouseMove = function ( event ) {

		/* nrdepasi = document.getElementById("nrpasi").innerHTML ;
		*/
		//	this.moveForward = false;

	/*	if ( this.domElement === document ) {

			this.mouseX = event.pageX - this.viewHalfX;
			this.mouseY = event.pageY - this.viewHalfY;

		} else {

			this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
			this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;

		}
		*/

	/*	orientare = document.getElementById("busol").innerHTML;

            if(orientare = "NORD")
        {
            this.lon = 180;
            this.lat = 0;
        }
            if(orientare = "SUD")
        {
            this.lon = 0;
            this.lat = 0;
        }
            if(orientare = "VEST")
        {
            this.lon = -90;
            this.lat = 0;
        }
            if(orientare = "EST")
        {
            this.lon = 90;
            this.lat = 0;
        }
		setTimeout(setCamControls, 1000);
		
		*/
		
	};

	this.onKeyDown = function ( event ) {

		//event.preventDefault();

		switch ( event.keyCode ) {

			case 38: /*up*/
			case 87: /*W*/ this.moveForward = true; break;

			case 37: /*left*/
			case 65: /*A*/ this.moveLeft = true; break;

			case 40: /*down*/
			case 83: /*S*/ this.moveBackward = true; break;

			case 39: /*right*/
			case 68: /*D*/ this.moveRight = true; break;

			case 82: /*R*/ this.moveUp = true; break;
			case 70: /*F*/ this.moveDown = true; break;

		}

	};

	this.onKeyUp = function ( event ) {

		switch ( event.keyCode ) {

			case 38: /*up*/
			case 87: /*W*/ this.moveForward = false; break;

			case 37: /*left*/
			case 65: /*A*/ this.moveLeft = false; break;

			case 40: /*down*/
			case 83: /*S*/ this.moveBackward = false; break;

			case 39: /*right*/
			case 68: /*D*/ this.moveRight = false; break;

			case 82: /*R*/ this.moveUp = false; break;
			case 70: /*F*/ this.moveDown = false; break;

		}

	};

	this.update = function ( delta ) {

		if ( this.enabled === false ) return;

		if ( this.heightSpeed ) {

			var y = THREE.Math.clamp( this.object.position.y, this.heightMin, this.heightMax );
			var heightDelta = y - this.heightMin;

			this.autoSpeedFactor = delta * ( heightDelta * this.heightCoef );

		} else {

			this.autoSpeedFactor = 0.0;

		}

		var actualMoveSpeed = delta * this.movementSpeed;

		if ( this.moveForward || ( this.autoForward && ! this.moveBackward ) ) this.object.translateZ( - ( actualMoveSpeed + this.autoSpeedFactor ) );
		if ( this.moveBackward ) this.object.translateZ( actualMoveSpeed );

		if ( this.moveLeft ) this.object.translateX( - actualMoveSpeed );
		if ( this.moveRight ) this.object.translateX( actualMoveSpeed );

		if ( this.moveUp ) this.object.translateY( actualMoveSpeed );
		if ( this.moveDown ) this.object.translateY( - actualMoveSpeed );

		var actualLookSpeed = delta * this.lookSpeed;

		if ( ! this.activeLook ) {

			actualLookSpeed = 0;

		}

		var verticalLookRatio = 1;

		if ( this.constrainVertical ) {

			verticalLookRatio = Math.PI / ( this.verticalMax - this.verticalMin );

		}

		


		
		
		this.lon += this.mouseX * actualLookSpeed;
		if ( this.lookVertical ) this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;

		this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
		
		this.phi = THREE.Math.degToRad( 90 - this.lat );

		this.theta = THREE.Math.degToRad( this.lon );

		if ( this.constrainVertical ) {

			this.phi = THREE.Math.mapLinear( this.phi, 0, Math.PI, this.verticalMin, this.verticalMax );

		}
		nrdepsi = document.getElementById("nrpasi").innerHTML;
			if(pas == auxij)
			{
				this.moveForward = true;
				this.object.translateZ(-2);
				auxij=auxij+1;
			}
			this.moveForward = false;

			
		var targetPosition = this.target,
			position = this.object.position;

		
		
		document.getElementById("grade").innerHTML = cf;


		if((cf < 360) && (cf >= 315))
		{	px = 360 - cf;
			targetPosition.x = position.x - 45 ;
			targetPosition.y = 5;
			targetPosition.z = position.z - px;
		}
		
		if((cf < 315) && (cf >= 270))
		{	px = 360 - cf - 45;
			targetPosition.x = position.x - 45 + px;
			targetPosition.y = 5;
			targetPosition.z = position.z - 45; 
		}

		if((cf < 270) && (cf >= 225))
		{
			px = 360 - cf - 90;
			targetPosition.x = position.x + px;
			targetPosition.y = 5;
			targetPosition.z = position.z - 45;
		}

		if((cf < 225) && (cf >= 180))
		{
			px = 360 - cf - 135;
			targetPosition.x = position.x + 45;
			targetPosition.y = 5;
			targetPosition.z = position.z - 45 + px;
		}

		if((cf < 180) && (cf >= 135))
		{
			px = 360 - cf - 180;
			targetPosition.x = position.x + 45;
			targetPosition.y = 5;
			targetPosition.z = position.z + px;
		}

		if((cf < 135) && (cf >= 90))
		{
			px = 360 - cf - 225;
			targetPosition.x = position.x + 45 - px;
			targetPosition.y = 5 + inaltime;
			targetPosition.z = position.z + 45;
		}

		if((cf < 90) && (cf >= 45))
		{
			px = 360 - cf - 270;
			targetPosition.x = position.x - px;
			targetPosition.y = 5;
			targetPosition.z = position.z + 45;
		}

		if((cf < 45) && (cf >= 0))
		{
			px = 360 - cf - 315;
			targetPosition.x = position.x - 45;
			targetPosition.y = 5;
			targetPosition.z = position.z + 45 - px;
		}

		this.object.lookAt( targetPosition );

	};

	function contextmenu( event ) {

		event.preventDefault();

	}

	this.dispose = function () {

		this.domElement.removeEventListener( 'contextmenu', contextmenu, false );
		this.domElement.removeEventListener( 'mousedown', _onMouseDown, false );
		this.domElement.removeEventListener( 'mousemove', _onMouseMove, false );
		this.domElement.removeEventListener( 'mouseup', _onMouseUp, false );

		window.removeEventListener( 'keydown', _onKeyDown, false );
		window.removeEventListener( 'keyup', _onKeyUp, false );

	};

	var _onMouseMove = bind( this, this.onMouseMove );
	var _onMouseDown = bind( this, this.onMouseDown );
	var _onMouseUp = bind( this, this.onMouseUp );
	var _onKeyDown = bind( this, this.onKeyDown );
	var _onKeyUp = bind( this, this.onKeyUp );

	this.domElement.addEventListener( 'contextmenu', contextmenu, false );
	this.domElement.addEventListener( 'mousemove', _onMouseMove, false );
	this.domElement.addEventListener( 'mousedown', _onMouseDown, false );
	this.domElement.addEventListener( 'mouseup', _onMouseUp, false );

	window.addEventListener( 'keydown', _onKeyDown, false );
	window.addEventListener( 'keyup', _onKeyUp, false );

	function bind( scope, fn ) {

		return function () {

			fn.apply( scope, arguments );

		};

	}

	this.handleResize();

};
