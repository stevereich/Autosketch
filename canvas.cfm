<cfscript>
    local.i = 'https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=19&size=640x480&maptype=hybrid&scale=2&key=AIzaSyDFuKArOohwKDMngRpLzI75p50y8BFI5xo';
    local.imageHandler = createobject('component','assets.cfc.imageHandler').init();
    local.bImage = "data:image/png;base64," & local.imageHandler.remote2base64(local.i);
</cfscript>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="content" style="color:#FFF;height:960px;width:1280px;background-image:url('<cfoutput>#local.bImage#</cfoutput>')">Yo Steve!</div>
<!---<canvas id="canvas" style="border:2px solid black" width="1280" height="960"></canvas>--->
    <!---<canvas id="staticMap" width="1280" height="960" style="color:#FFF;border:1px #F00 solid;background-image:url(<cfoutput>#local.bImage#</cfoutput>)">--->
        <!---Hi Steve--->
    <!---</canvas>--->
<script>
    //window.open('<cfoutput>#local.bImage#</cfoutput>')

//    function encodeImageFileAsURL(cb) {
//        return function(){
//            var file = new Image();
//            file.src = '/assets/img/staticmap_demo.png';
//            var reader  = new FileReader();
//            reader.onloadend = function () {
//                cb(reader.result);
//            }
//            reader.readAsDataURL(file);
//        }
//    }
//
//function encodeLocalImage(image2encode, callback){
//    var xhr = new XMLHttpRequest();
//    xhr.open("GET", image2encode, true);
//    xhr.responseType = "blob";
//    xhr.onload = function (e) {
//        //console.log(this.response);
//        var reader = new FileReader();
//        reader.onload = function(event) {
//            var res = event.target.result;
//            // console.log(res)
//            if(typeof callback === 'function'){
//                callback(res);
//            }
//        }
//        var file = this.response;
//        reader.readAsDataURL(file);
//    };
//    xhr.send();
//}

function getDataUri(url, callback) {
    var image = new Image();

    image.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        canvas.getContext("2d").drawImage(image, 0, 0);

        // Get raw image data
        // callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

        // ... or get as Data URI
        callback(canvas.toDataURL());
    };

    image.src = url;
}

function convertImageToCanvas(image) {
    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext("2d").drawImage(image, 0, 0);

    return canvas;
}

// Usage
<!---getDataUri('<cfoutput>#local.bImage#</cfoutput>', function(dataUri) {--->
    <!---window.open(dataUri);--->
<!---});--->

//function getDataURI(source){
//    var canvas = document.createElement('canvas');
//    canvas.id = "staticMap";
//    canvas.width = 1280;
//    canvas.height = 960;
//    var i = new Image();
//    i.src = source;
//    i.style.width = "1280px";
//    i.style.height = "960px";
//    i.width = 1280;
//    i.height = 960;
//    canvas.appendChild(i);
////    document.body.appendChild(canvas);
//    return document.getElementById('staticMap').toDataURL();
//
//}
//    //var blb = getDataURI("https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=19&size=640x480&maptype=hybrid&scale=2&key=AIzaSyDFuKArOohwKDMngRpLzI75p50y8BFI5xo");
//window.open(document.getElementById('staticMap').toDataURL());

        var bg = '<cfoutput>#local.bImage#</cfoutput>';
        //var canvas = document.getElementById('canvas');
        //var ctx = canvas.getContext('2d');

        var data = '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="960">' +
            '<foreignObject width="100%" height="100%">' +
            '<div xmlns="http://www.w3.org/1999/xhtml">' +
            document.getElementById('content').outerHTML +
            '</div>' +
            '</foreignObject>' +
            '</svg>';

        var DOMURL = window.URL || window.webkitURL || window;

        var img = new Image();
        var svg = new Blob([data], {type: 'image/svg+xml'});
        var url = DOMURL.createObjectURL(svg);

//        window.open(url);
//
        img.onload = function () {
//            ctx.drawImage(img, 0, 0);
//            DOMURL.revokeObjectURL(url);
            document.body.appendChild(img);
        }
//
        img.src = document.getElementById('content').toDataURL();


</script>
</body>
</html>