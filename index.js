'use strict'

class SetCycle {
  constructor (serverless, options) {
    this.hooks = {
      // this is where we declare the hook we want our code to run
      'before:package:finalize': function () { addBinaryContentHandlingStrategy(serverless) }
    }
  }
}

function addBinaryContentHandlingStrategy (serverless) {
  // shorten the name of the "Resources" section of the template
  let rsrc = serverless.service.provider.compiledCloudFormationTemplate.Resources

  //AWS::ApiGatewayV2::Integration
  for (let key in rsrc) {
    if (rsrc[key].Type === 'AWS::ApiGatewayV2::Integration') {
      // this is the real feature: where we change all the LogGroup resources
      rsrc[key].Properties.ContentHandlingStrategy = 'CONVERT_TO_BINARY'
    }
  }
}

// now we need to make our plugin object available to the framework to execute
module.exports = SetCycle