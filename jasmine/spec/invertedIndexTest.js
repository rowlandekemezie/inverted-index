"use strict";
describe("IndexFile", function() {
  var indexInstance = new Index();

  describe("Read book data", function(filePath) {
    var jsonBook = indexInstance.readDoc('books.json');
    it("should not be empty", function() {
      expect(jsonBook).not.toBe([]);
      expect(jsonBook.length).not.toBe(0);
    });
    it("should return a string", function(){

    });
  });
  describe("Populate Index", function(){
    var tokens = indexInstance.getIndex('books.json');
    it("should return the index of the files ", function(){

    });
    it("should return truthy", function(){

    });
    it("should return truthy", function(){

    });
    it("should test that the terms matches with the right keys", function(){

    });
  });

  describe("Search index", function(){
    it("", function(){


    });
  });
});
