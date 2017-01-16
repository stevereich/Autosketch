component output="false" {
    public imageHandler function init(){
        return this;
    }

    public string function remote2base64(required string imageUrl){
        var httpService = new http();
        httpService.setMethod("GET");
        httpService.setCharset("utf-8");
        httpService.setUrl(arguments.imageUrl);
        var result = httpService.send().getPrefix();
        return binaryEncode(result.filecontent,'Base64');
    }


}