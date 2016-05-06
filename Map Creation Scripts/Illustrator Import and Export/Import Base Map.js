// Import Folder's Files as Layers - Illustrator CS3 script
// Description: Imports a series of images (from the designated folder) as named layers into a new document
// Author: Nathaniel V. KELSO (nathaniel@kelsocartography.com)
// Version: 1.0.0 on 10/March/2009

// Global script setting
var placement9pointAlignment = "mm";

function getFolder() {
	return Folder.selectDialog('Select Map Root Folder:', Folder('~'));
}

function getZoom() {
    return Number(prompt ("Zoom Level", 100, title)); 
}

function getX() {
    return Number(prompt ("Enter Starting X Tile", 100, title)); 
}

function getY() {
    return Number(prompt ("Enter Starting Y Tile", 100, title)); 
}

function unitsPt(mm) {
    return new UnitValue(mm, "mm").as("pt");
}

function resizeMM(object, sSize) {
    //    doc = app.activeDocument;
    //var sSize = prompt("Resize to how many millimeters?", "3", "Square size?");
    var _s = (parseInt(sSize) == 'NaN') ? 0 : sSize;
    var _w = unitsPt(_s);
    var _h = unitsPt(_s);

    var x = Number((_w*100)/object.width);
    var y = Number((_h*100)/object.height);
    object.resize(x,y,true,true,true,true, 100, Transformation.CENTER);
    
}

var getSlippyTileLayerPoints = function (lat_deg, lng_deg, zoom) {
            var x = (Math.floor((lng_deg + 180) / 360 * Math.pow(2, zoom)));
            var y = (Math.floor((1 - Math.log(Math.tan(lat_deg * Math.PI / 180) + 1 / Math.cos(lat_deg * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom)));

            var layerPoint = {
                x: x,
                y: y
            };

            return layerPoint;
        };

function importFolderAsLayers(selectedFolder) {	
	// if a folder was selected continue with action, otherwise quit
	var myDocument;

	if (selectedFolder) {
		myDocument = app.documents.add();
		
        var tileScale = 16; //getZoom();
        var lat = 48.208945353813256;
        var lng = 16.37027263641357;
        // calculate tiles
        
        var y = startY;
        var widthX = 10;
        var widthY = 10;
        
        var tile = getSlippyTileLayerPoints(lat, lng, tileScale);
        
        var startX = tile.x - Math.floor(widthX / 2);//getX();
        var startY = tile.y - Math.floor(widthY / 2);//getY();
        
        
        
        var squareSize = 90;
        var squarePoints = unitsPt(squareSize );
        
		var firstImageLayer = true;
		var thisPlacedItem;
			  
		// create document list from files in selected folder
		//var imageList = selectedFolder.getFiles();
	   
        var mapLayer = myDocument.layers[0];
        mapLayer.name = "mapTiles";
        
        var sliceLayer = myDocument.layers.add();
        sliceLayer.name = "sliceLayer";
        
        // setup slices
        myDocument.defaultFilled = false;
        //myDocument.defaultStroked = false;
        
        
		for (var x = 0; x < widthX; x++) {
            for (var y = 0; y < widthY; y++) {
			// open each document in file list
			//if (imageList[i] instanceof File) {
				// get the file name
				var fName = (selectedFolder.fsName + '//' + tileScale + '//' + (x + startX) + '//' + (y + startY) + '.png').toLowerCase();
				// check for supported file formats
				//if( (fName.indexOf(".eps") == -1) ) {
				//if( (fName.indexOf(".gif") == -1) && (fName.indexOf(".jpg") == -1) && (fName.indexOf(".png") == -1) && //(fName.indexOf(".bmp") == -1) && (fName.indexOf(".tif") == -1) ) {
					// skip unsupported formats
				//	continue;
				//} else {
					
                    //else {
					//	newLayer = myDocument.layers.add();
					//}
				   // Give the layer the name of the image file
				   //newLayer.name = fName.substring(0, fName.indexOf(".") );
				   
				   // Place the image on the artboard
				   var thisPlacedItem = mapLayer.placedItems.add()
				   thisPlacedItem.file = File(fName);
                   thisPlacedItem.name = fName.substring(0, fName.indexOf(".") );
				   
                    // resize tile
                   resizeMM(thisPlacedItem, squareSize );
            
                   // place item
                   thisPlacedItem.top = myDocument.height - (y * squarePoints);
                   thisPlacedItem.left = 0 + (x * squarePoints) ;
                
                    // create slice 
                        
                    var slice = sliceLayer.pathItems.rectangle( thisPlacedItem.top, thisPlacedItem.left, squarePoints, squarePoints );
                   // slice.sliced = true;
                    slice.name = tileScale + '/' + (x + startX) + '/' + (y + startY);

                
            
				//}
			//}
            }
		}        
 
	
	} else {
		// alert("The action has been cancelled.");
		// display error message if no supported documents were found in the designated folder
		alert("Rerun the script and choose a folder with images.");
		//importFolderAsLayers(getFolder());
	}
}

// Start the script off
//importFolderAsLayers( getFolder() );
importFolderAsLayers( Folder("/users/josh/google drive/art/2015/tactical space lab/server/maps root (mq early 2015)/maptiles"));
