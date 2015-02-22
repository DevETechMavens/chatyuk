describe("LinkFinder", function() {

  describe('find', function() {
    var linkifySpy;
    var remapTypeSpy;

    beforeEach(function() {
      linkifySpy = spyOn(linkify, 'find').and.returnValue('fakeValue');
      remapTypeSpy = spyOn(LinkFinder, 'remapTypes').and.returnValue('remapped values');
    });

    it('delegates the call to linkify.find', function() {
      var results = LinkFinder.find('me no have links');
      expect(linkifySpy).toHaveBeenCalledWith('me no have links');
    });

    describe('when linkify.find finds links',function() {
      it('remaps the types by passing the results to remapType and returns it', function() {
        var results = LinkFinder.find('me no have links');
        expect(remapTypeSpy).toHaveBeenCalledWith('fakeValue');
        expect(results).toEqual('remapped values');
      });
    });

  });

  describe('remapTypes', function() {

    it('remaps an array of links', function() {
      var links = [{
          href: "http://google.com",
          type: "url",
          value: "google.com"
        },
        { href: "http://google.com/image.png",
          type: "url",
          value: "google.com/image.png"
        }];

      var remapLinks = LinkFinder.remapTypes(links);
      expect(remapLinks[0].type).toEqual('url');
      expect(remapLinks[1].type).toEqual('image');

    });
  });

  describe('isImage', function(){
    describe('when the passed in url that ends with an image file extenstion', function() {
      it('returns true', function() {
        var imageTypes = ['png', 'jpg', 'gif'];
        imageTypes.forEach(function(ext) {
          expect(LinkFinder.isImageExt('fake_file.'+ext)).toEqual(true);
        });
      });
    });

    describe('when not an image type',function() {
      it('returns false', function() {
        expect(LinkFinder.isImageExt('fake_file.txt')).toEqual(false);
      });
    });
  });

});
