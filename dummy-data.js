function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = function() {
  var faker = require('faker');
  var _ = require('lodash');

  return {
    files: _.times(1000, function(n) {
      var fileExt = faker.system.commonFileExt();
      return {
        id: n,
        name: faker.system.commonFileName(fileExt),
        ext: fileExt,
        desc: faker.lorem.sentence(),
        created: faker.date.past(),
        size: getRandomInt(122000, 8000000000),
      }
    })
  }
}
