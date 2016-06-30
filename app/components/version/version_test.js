'use strict';

describe('monopofree.version module', function() {
  beforeEach(module('monopofree.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
