// the invertedIndex Class Constructor
// you could also use prototype to add methods to your Index class
function Index(){
  this.readDoc = readDoc;
  this.getIndex = getIndex;
  this.createIndex = createIndex;
  this.searchIndex = searchIndex;
}

// read the Json document
function readDoc (filePath){
var bookContent;
 $.ajax({
   // allow for synchronous reading of the json file
   'async': false,
   'url': filePath,
   'dataType': "json",
   'success': function(data){
   bookContent = data;
   }
 });
 this.bookContent = bookContent;
}

// method to create and map index
function createIndex(filePath){
  this.readDoc(filePath);
  var objIndex = {};
  var jsonContent = this.bookContent;

  // loop through the object array
  for(var i = 0; i < jsonContent.length; i++){
    // loop through the each object in the array
    for(var prop in jsonContent[i]){
      // convert object to array of strings
      var splitToken = (jsonContent[i][prop]).split(' ');

      // normalize each item and replace special characters
      for(var k = 0; k < splitToken.length; k++){
        var normalizeToken = splitToken[k].toLowerCase().replace(/[.,:]/g,"");

         // check if the token already exist in a book
         if(objIndex.hasOwnProperty(normalizeToken)){
           var objKey = objIndex[normalizeToken];
           if(objKey.indexOf(i) < 0){
             objKey.push(i);
           }
         }
         else{
           objIndex[normalizeToken] = [i];
         }
      }
    }
  }
  this.objIndex = objIndex;
}

// method to get index from the Json object
function getIndex(filePath){
  this.createIndex(filePath);
  return this.objIndex;
}

// method to search index for terms
function searchIndex (terms){
  var bookIndex = this.objIndex;
  var searchResult = [];
  for (var i in arguments){

    // check that the item does exist
    if(bookIndex.hasOwnProperty(arguments[i])){
      for (var term in bookIndex){
        if(arguments[i] === term){
          searchResult.push(bookIndex[term]);
        }
      }
    }
    else{
      searchResult.push('Word not found');
    }
  }
return searchResult;
}
