// the invertedIndex Class Constructor
function Index(){
  this.readDoc = readDoc;
  this.getIndex = getIndex;
  this.createIndex = createIndex;
  this.searchIndex = searchIndex;
}

// read the Json document
function readDoc(filePath){
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
  return bookContent;
}

// method to create  and map index..
function createIndex(filePath){
  var objIndex = {};
  var jsonContent = this.readDoc(filePath);

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
  return objIndex;
}

// method to get index from the Json object
function getIndex(filePath){
  return this.createIndex(filePath);
}

// method to search index for terms
function searchIndex (terms){
  var searchResult = [];
  var bookIndex = this.getIndex('books.json');
  for (var i in arguments){
    for (var j in bookIndex){
      if(arguments[i] === j){
        searchResult.push(bookIndex[j]);
      }
      // else{
      //   return "Not in the document";
      // }
    }
  }
  return searchResult;
}
