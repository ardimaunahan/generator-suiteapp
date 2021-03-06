"use strict";
const Generator = require("yeoman-generator");

const clientscriptGenerator = class extends Generator {
  writing() {
    const { prefix, name, version, filename, componentname, scriptversion } = this.options;
    const templates = {
      clientscript: "_cs.ts",
      usecase: "_usecase.ts",
      gateway: "_gateway.ts",
      file_prefix: prefix === undefined ? "" : prefix,
      scriptversion : scriptversion === undefined ? "2.x" : scriptversion,
      gatewayname : componentname === undefined ? "gateway" : componentname + "gateway",
      usecasename : componentname === undefined ? "CSUsecase" : componentname + "CSUsecase"
    };

    this.fs.copyTpl(
      this.templatePath(`${templates.clientscript}`),
      this.destinationPath(
        name +
          "/src/" +
          componentname +
          "/main/" +
          templates.file_prefix +
          'CS_' + componentname + ".ts"
      ),
      {
        name: name,
        version: version,
        prefix: prefix,
        filename: filename,
        usecasename : templates.usecasename,
        gatewayname: templates.gatewayname,
        scriptversion : scriptversion
      }
    );

    this.fs.copyTpl(
      this.templatePath(`${templates.gateway}`),
      this.destinationPath(
        name +
          "/src/" +
          componentname +
          "/gateway/" +
          templates.file_prefix +
          templates.gatewayname +
          ".ts"
      ),
      {
        name: name,
        version: version,
        prefix: prefix,
        filename: filename,
        gatewayname: templates.gatewayname
      }
    );

    this.fs.copyTpl(
      this.templatePath(`${templates.usecase}`),
      this.destinationPath(
        name +
          "/src/" +
          componentname +
          "/usecase/" +
          templates.file_prefix +
          templates.usecasename +
          ".ts"
      ),
      {
        name: name,
        version: version,
        prefix: prefix,
        filename: filename,
        gatewayname: templates.gatewayname,
        usecasename: templates.usecasename
      }
    );
  }
};

module.exports = clientscriptGenerator;
