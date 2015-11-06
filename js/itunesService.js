var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in. 
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here
    this.getArtist = function(artist) {
    	var deferred = $q.defer();
    	$http({
    		method: 'JSONP',
    		url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
    	}).then(function(res) {
	    	var resultArray = res.data.results;
	    	var songArray = [];
	    	for (var i = 0; i < resultArray.length; i++) {
	    		var songObj = {
	    			Play: resultArray[i].previewUrl,
	    			Artist: resultArray[i].artistName,
	    			Collection: resultArray[i].collectionName,
	    			AlbumArt: resultArray[i].artworkUrl100,
	    			Type: resultArray[i].kind,
	    			CollectionPrice: resultArray[i].collectionPrice,
	    			TrackName: resultArray[i].TrackName
	    		};
	    		songArray.push(songObj);
	    	}
	    	deferred.resolve(songArray);
	     });
	    return deferred.promise;
	}
});	
/*
var newObj = {
  name: 'jason',
  age: 28,
  getName: function() {
    return 'jason';
  },
};

function returnObj () {
  return newObj;
};

var objCopy = returnObj();
objCopy.getName();

returnObj().getName();

*/