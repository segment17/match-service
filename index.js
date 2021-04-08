const GlobalObjects = require('./GlobalObjects');
var globalObjects = new GlobalObjects();
module.exports = globalObjects;

// GRPC SETUP
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + '/proto/matchservice.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
const matchservice_package = grpc.loadPackageDefinition(packageDefinition).matchservice_package;
// GRPC SETUP

async function bindAddMatch(call, callback) {
  let r = await globalObjects.controller.guardAddMatch(call.request);
  callback(null, r);
}

async function bindUpdateMatch(call, callback) {
  let r = await globalObjects.controller.guardUpdateMatch(call.request);
  callback(null, r);
}

async function bindRemoveMatch(call, callback) {
  let r = await globalObjects.controller.guardRemoveMatch(call.request);
  callback(null, r);
}

async function bindRemoveMatchesOfBoxer(call, callback) {
  let r = await globalObjects.controller.guardRemoveMatchesOfBoxer(call.request);
  callback(null, r);
}

async function bindGetAllMatches(call, callback) {
  let r = await globalObjects.controller.guardGetAllMatches(call.request);
  callback(null, r);
}

async function bindGetMatchesOfBoxer(call, callback) {
  let r = await globalObjects.controller.guardGetMatchesOfBoxer(call.request);
  callback(null, r);
}


async function bindMock(call, callback) {
  await globalObjects.controller.mock();
  callback(null, null);
}

/* async function bindSetupAddBoxer(call, callback) {
  await globalObjects.controller.mediator.boxerServiceGateway.SetupAddBoxer(call.request.boxer);
  callback(null, {code: 200});
} */

async function bindSetupAddBoxers(call, callback) {
  await globalObjects.controller.mediator.boxerServiceGateway.SetupAddBoxers(call.request.boxers);
  callback(null, {code: 200});
}

async function bindSetupAddMatches(call, callback) {
  await globalObjects.controller.mediator.matchRepository.SetupAddMatches(call.request.matches);
  callback(null, {code: 200});
}

function main() {
  console.log("Server running...");
  server = new grpc.Server();
  server.addService(matchservice_package.MatchService.service, {
    AddMatch: bindAddMatch,
    RemoveMatch: bindRemoveMatch,
    UpdateMatch: bindUpdateMatch,
    RemoveMatchesOfBoxer: bindRemoveMatchesOfBoxer,
    GetAllMatches: bindGetAllMatches,
    GetMatchesOfBoxer: bindGetMatchesOfBoxer,
    Mock: bindMock,
    SetupAddBoxers: bindSetupAddBoxers,
    // SetupAddBoxer: bindSetupAddBoxer,
    SetupAddMatches: bindSetupAddMatches
  });

  if (process.env.MATCH_SERVICE_SERVICE_PORT != undefined) {
    server.bind("0.0.0.0" + ":" + process.env.MATCH_SERVICE_SERVICE_PORT, grpc.ServerCredentials.createInsecure());
  } else {
    server.bind("localhost:50001", grpc.ServerCredentials.createInsecure());
  }
  server.start();
}

main();
