'use strict';

angular.module('monopofree.version', [
  'monopofree.version.interpolate-filter',
  'monopofree.version.version-directive'
])

.value('version', '0.1');
