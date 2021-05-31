const GlobalObjects = require('./GlobalObjects');
var globalObjects = new GlobalObjects();
module.exports = globalObjects;

// GRPC SETUP
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + '/proto/ubc.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
const ubc_package = grpc.loadPackageDefinition(packageDefinition).ubc_package;
// GRPC SETUP

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bindAddMatch(call, callback) {
  await sleep(50);
  console.log('\n⚪  AddMatch:: ', JSON.stringify(call.request));
  let r = await globalObjects.controller.guardAddMatch(call.request);
  await sleep(50);
  console.log('🟢  AddMatch:: ', JSON.stringify(r));
  callback(null, r);
}

async function bindUpdateMatch(call, callback) {
  await sleep(50);
  console.log('\n⚪  UpdateMatch:: ', JSON.stringify(call.request));
  let r = await globalObjects.controller.guardUpdateMatch(call.request);
  await sleep(50);
  console.log('🟢  UpdateMatch:: ', JSON.stringify(r));
  callback(null, r);
}

async function bindRemoveMatch(call, callback) {
  await sleep(50);
  console.log('\n⚪  RemoveMatch:: ', JSON.stringify(call.request));
  let r = await globalObjects.controller.guardRemoveMatch(call.request);
  await sleep(50);
  console.log('🟢  RemoveMatch:: ', JSON.stringify(r));
  callback(null, r);
}

async function bindRemoveMatchesOfBoxer(call, callback) {
  await sleep(50);
  console.log('\n⚪  RemoveMatchesOfBoxer ', JSON.stringify(call.request));
  let r = await globalObjects.controller.guardRemoveMatchesOfBoxer(call.request);
  await sleep(50);
  console.log('🟢  RemoveMatchesOfBoxer ', JSON.stringify(r));
  callback(null, r);
}

async function bindGetAllMatches(call, callback) {
  await sleep(50);
  console.log('\n⚪  GetAllMatches:: ', JSON.stringify(call.request));
  let r = await globalObjects.controller.guardGetAllMatches(call.request);
  await sleep(50);
  console.log('🟢  GetAllMatches:: ', JSON.stringify(r));
  callback(null, r);
}

async function bindGetMatchesOfBoxer(call, callback) {
  await sleep(50);
  console.log('\n⚪  GetMatchesOfBoxer:: ', JSON.stringify(call.request));
  let r = await globalObjects.controller.guardGetMatchesOfBoxer(call.request);
  await sleep(50);
  console.log('🟢  GetMatchesOfBoxer:: ', JSON.stringify(r));
  callback(null, r);
}


async function bindMock(call, callback) {
  await globalObjects.controller.mock();
  callback(null, null);
}

async function bindSetupAddAdmin(call, callback) {
  await globalObjects.controller.mediator.authServiceGateway.setupAddAdmin(call.request.boxers);
  callback(null, {code: 200});
}

async function bindSetupAddBoxers(call, callback) {
  await globalObjects.controller.mediator.boxerServiceGateway.SetupAddBoxers(call.request.boxers);
  callback(null, {code: 200});
}

async function bindSetupAddMatches(call, callback) {
  await globalObjects.controller.mediator.matchRepository.SetupAddMatches(call.request.matches);
  callback(null, {code: 200});
}

async function bindSetupCleanUp(call, callback) {
  await globalObjects.cleanUp();
  callback(null, {code: 200});
}

function main() {
  console.log('Server running...');
  server = new grpc.Server();
  server.addService(ubc_package.MatchService.service, {
    AddMatch: bindAddMatch,
    GetAllMatches: bindGetAllMatches,
    GetMatchesOfBoxer: bindGetMatchesOfBoxer,
    Mock: bindMock,
    RemoveMatch: bindRemoveMatch,
    RemoveMatchesOfBoxer: bindRemoveMatchesOfBoxer,
    SetupAddAdmin: bindSetupAddAdmin,
    SetupAddBoxers: bindSetupAddBoxers,
    SetupAddMatches: bindSetupAddMatches,
    UpdateMatch: bindUpdateMatch,
    SetupCleanUp: bindSetupCleanUp
  });

  server.bind('0.0.0.0:50053', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
