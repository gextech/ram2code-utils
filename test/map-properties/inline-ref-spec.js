'use strict';
var Glob = require("glob");
var chai = require('chai');
var _ = require('lodash');
var should = chai.should();
var expect = require('chai').expect;
var path = require('path');

var util = require("./test-utils");
var globOptions = {};
var fixtures = path.join(__dirname, '../../node_modules/raml2code-fixtures/');
var testSchemas = fixtures + "**/*schema.json";

describe('inline ref ', function () {

  it("ref without title should be inner classes", function (done) {
    var test = function (err, schemas, done) {
      var data = util.handleData(schemas);
      var inline = _.find(data, function (parsed) {
        return parsed.className === "WidgetInlineProperty";
      });

      var compositeType = _.find(inline.classMembers, function (it) {
        return it.name === "composite"
      });

      var composite = _.find(inline.innerClasses, function (it) {
       return it.className === 'Composite';
      });
      expect(compositeType.classType).to.be.equal("Composite");
      expect(composite.classMembers.length).to.be.at.least(1);
      done();
    };
    new Glob(testSchemas, globOptions, util.runTest(test, done));
  });


});
