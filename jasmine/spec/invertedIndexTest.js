//"use strict";
describe("IndexFile", function() {
  var indexInstance = new Index();

  describe("Read book data", function(filePath) {
    var jsonBook = indexInstance.readDoc('books.json');
    it("should not be empty", function() {
      expect(jsonBook).not.toBe([]);
      expect(jsonBook.length).not.toBe(0);
    });
    it("should return a string", function(){
      expect(jsonBook).toEqual(jasmine.any(Object));
        for(var i = 0; i < jsonBook.length; i++){
          for(var j in arguments[i]){
            expect(jsonBook[j]).toEqual(jasmine.any(String));
          }
       }
    });
  });
  describe("Populate Index", function(){
    var getIndex = indexInstance.getIndex('books.json');

    it("should return truthy", function(){
        expect(getIndex).not.toBeUndefined();
        expect(getIndex.length).not.toBe(0);
        expect(getIndex).toBeDefined();
    });

    it("should return the index of the correct objects in the JSON array", function(){
        expect(getIndex.elf).toEqual([1]);
        expect(getIndex.alice).toEqual([0]);
        expect(getIndex.a).toEqual([0, 1]);
        expect(getIndex.of).toEqual([0, 1]);
        expect(getIndex.alliance).toEqual([1]);
    });
  });

  describe("Search index", function(){
    it("should return truthy", function(){
     expect(indexInstance.searchIndex).toEqual(jasmine.any(Function));
    });

    it("should return the correct results when searched.", function(){
      expect(indexInstance.searchIndex('alice')).toEqual([[0]]);
      expect(indexInstance.searchIndex('wonderland')).toEqual([[0]]);
      expect(indexInstance.searchIndex('ring')).toEqual([[1]]);
    });

    it("should handle a varied number of search terms as arguments", function(){
      expect(indexInstance.searchIndex('lord', 'rabbit', 'man', 'dwarf')).toEqual([[1], [0], [1], [1]]);
      expect(indexInstance.searchIndex('a', 'of', 'elf')).toEqual([[0, 1], [0, 1], [1]]);
    });
  });
});
