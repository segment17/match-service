const REQUEST_STATUSES = {
  BOXER_NOT_FOUND: 'not_found',
  BAD_REQUEST: 'bad_request',
  CREATED: 'created',
  DELETED: 'deleted',
  FORBIDDEN: 'forbidden',
  MATCH_NOT_FOUND: 'match_not_found',
  SUCCESS: 'success',
  UPDATED: 'updated',
}
const TOKENS = {
  VALID: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QtYWRtaW4ifQ.Ie8nanpMvN_aNxqEDDL6_2nvcDzbh0yBL2p_VrSY4r0',
  INVALID: 'not_valid_token'
}
const NOT_VALID_BOXER_ID = -1;
const NOT_VALID_MATCH_ID = -1;
const testAdmin = {
  username: "test-admin-other",
  password_hash: "13019e4c76dbb79db5c2562ad0572f74"
};
const testBoxers = [
  {
    id: 1,
    fullName: "Mike Tyson",
    birthDate: 127419968,
    height: 178,
    weight: 100,
  },
  {
    id: 4,
    fullName: "Connor McGregor",
    birthDate: 127419968,
    height: 175,
    weight: 80,
  },
  {
    id: 6,
    fullName: "Logan Paul",
    birthDate: 127419968,
    height: 195,
    weight: 120,
  },
  {
    id: 8,
    fullName: 'Dwayne "The Rock" Johnson',
    birthDate: 127419968,
    height: 196,
    weight: 118,
  }
];
const testBoxerIDs = testBoxers.map(boxer => boxer.id);
const testMatch = {
  id: 1,
  homeBoxerId: testBoxerIDs[0], // 1
  awayBoxerId: testBoxerIDs[1], // 4
  matchTime: 157419968,
  isFinished: false,
};
const testMatch2 = {
  id: 2,
  homeBoxerId: testBoxerIDs[2], // 6
  awayBoxerId: testBoxerIDs[3], // 8
  matchTime: 157419968,
  isFinished: false,
};
const testMatch3 = {
  id: 3,
  awayBoxerId: 1,
  homeBoxerId: 8,
  matchTime: 129419968,
  isFinished: false,
}
const testMatch4 = {
  id: 4,
  awayBoxerId: 4,
  homeBoxerId: 8,
  matchTime: 129419968,
  isFinished: true,
};
const testMatches = [
  testMatch,
  testMatch2,
  testMatch3,
  testMatch4,
];

const testMatchesIncludingFirstBoxer = [
  testMatch,
  testMatch3
];

// GetAllMatches
const H1_Scenario1_Variation1 = {
  matches: testMatches,
  expected_response: {
    code: 200,
    message: REQUEST_STATUSES.SUCCESS,
    matches: testMatches,
  },
};

// GetMatchesOfBoxer
const B1_Scenario1_Variation1 = {
  boxers: testBoxers,
  matches: testMatches,
  request_body: {
    boxerId: testBoxerIDs[0],
  },
  expected_response: {
    code: 200,
    message: REQUEST_STATUSES.SUCCESS,
    boxer: testBoxers[0],
    matches: testMatchesIncludingFirstBoxer,
  },
};

// Remova matches of a boxer
const B4_Scenario1_Variation1 = {
  matches: testMatches,
  boxers: testBoxers,
  request_body: {
    boxerId: testBoxerIDs[0],
    token: TOKENS.VALID,
  },
  expected_response: {
    code: 200,
    message: REQUEST_STATUSES.DELETED,
  },
};

// GetMatchesOfBoxer Fail - not valid boxer id
const B1_Scenario1_Fail2 = {
  boxers: testBoxers,
  matches: testMatches,
  request_body: {
    boxerId: 99999,
  },
  expected_response: {
    code: 404,
    message: REQUEST_STATUSES.BOXER_NOT_FOUND,
  },
};

// RemoveMatchesOfBoxer Fail - not valid admin token
const B4_Scenario1_Fail1 = {
  matches: testMatches,
  boxers: testBoxers,
  request_body: {
    boxerId: testBoxerIDs[0],
    token: TOKENS.INVALID,
  },
  expected_response: {
    code: 403,
    message: REQUEST_STATUSES.FORBIDDEN,
  },
};

// RemoveMatchesOfBoxer Fail - not valid boxer id
const B4_Scenario1_Fail2 = {
  matches: testMatches,
  boxers: testBoxers,
  request_body: {
    boxerId: NOT_VALID_BOXER_ID,
    token: TOKENS.VALID,
  },
  expected_response: {
    code: 400,
    message: REQUEST_STATUSES.BAD_REQUEST,
  },
};

// AddMatch Fail - not valid admin token
const M1_Scenario1_Fail1 = {
  boxers: testBoxers,
  admin: testAdmin,
  request_body: {
    homeBoxerId: 1,
    awayBoxerId: 4,
    matchTime: 157419968,
    isFinished: false,
    token: TOKENS.INVALID,
  },
  expected_response: {
    code: 403,
    message: REQUEST_STATUSES.FORBIDDEN,
  }
};

// AddMatch Fail - not valid match data
const M1_Scenario1_Fail2 = {
  boxers: testBoxers,
  admin: testAdmin,
  request_body: {
    homeBoxerId: 1,
    awayBoxerId: 4,
    // Commenting intentionally to make it fail
    // matchTime: 157419968,
    // isFinished: false,
    token: TOKENS.VALID,
  },
  expected_response: {
    code: 400,
    message: REQUEST_STATUSES.BAD_REQUEST,
  }
};

// AddMatch Fail - not valid boxer id in home boxer
const M1_Scenario1_Fail3 = {
  boxers: testBoxers,
  admin: testAdmin,
  request_body: {
    homeBoxerId: 9999,
    awayBoxerId: 4,
    matchTime: 157419968,
    isFinished: false,
    token: TOKENS.VALID,
  },
  expected_response: {
    code: 404,
    message: REQUEST_STATUSES.BOXER_NOT_FOUND,
  }
};

// AddMatch Fail - not valid boxer id away boxer
const M1_Scenario1_Fail4 = {
  boxers: testBoxers,
  admin: testAdmin,
  request_body: {
    homeBoxerId: 1,
    awayBoxerId: 9999,
    matchTime: 157419968,
    isFinished: false,
    token: TOKENS.VALID,
  },
  expected_response: {
    code: 404,
    message: REQUEST_STATUSES.BOXER_NOT_FOUND,
  }
};

// RemoveMatch Fail - not valid admin token
const M2_Scenario1_Fail1 = {
  matches: testMatches,
  admin: testAdmin,
  request_body: {
    id: testMatches[0].id,
    token: TOKENS.INVALID,
  },
  expected_response: {
    code: 403,
    message: REQUEST_STATUSES.FORBIDDEN,
  }
};

// RemoveMatch Fail - not valid match id
const M2_Scenario1_Fail2 = {
  matches: testMatches,
  admin: testAdmin,
  request_body: {
    id: NOT_VALID_MATCH_ID,
    token: TOKENS.VALID,
  },
  expected_response: {
    code: 404,
    message: REQUEST_STATUSES.MATCH_NOT_FOUND,
  }
};

// UpdateMatch Fail - not valid admin token
const M3_Scenario1_Fail1 = {
  matches: testMatches,
  boxers: testBoxers,
  admin: testAdmin,
  request_body: {
    ...testMatches[0],
    matchTime: 129419968,
    token: TOKENS.INVALID,
  },
  expected_response: {
    code: 403,
    message: REQUEST_STATUSES.FORBIDDEN,
  }
};

// UpdateMatch Fail - not valid match
const M3_Scenario1_Fail2 = {
  matches: testMatches,
  boxers: testBoxers,
  admin: testAdmin,
  request_body: {
    matchTime: 129419968,
    token: TOKENS.VALID,
  },
  expected_response: {
    code: 400,
    message: REQUEST_STATUSES.BAD_REQUEST,
  }
};

// UpdateMatch Fail - not valid home boxer
const M3_Scenario1_Fail3 = {
  matches: testMatches,
  boxers: testBoxers,
  admin: testAdmin,
  request_body: {
    id: 1,
    homeBoxerId: 9999,
    token: TOKENS.VALID,
  },
  expected_response: {
    code: 404,
    message: REQUEST_STATUSES.BOXER_NOT_FOUND,
  }
};

// UpdateMatch Fail - not valid away boxer
const M3_Scenario1_Fail4 = {
  matches: testMatches,
  boxers: testBoxers,
  admin: testAdmin,
  request_body: {
    id: 1,
    awayBoxerId: 9999,
    token: TOKENS.VALID,
  },
  expected_response: {
    code: 404,
    message: REQUEST_STATUSES.BOXER_NOT_FOUND,
  }
};


// AddMatch
const M1_Scenario1_Variation1 = {
  boxers: testBoxers,
  admin: testAdmin,
  request_body: {
    homeBoxerId: 1,
    awayBoxerId: 4,
    matchTime: 157419968,
    isFinished: false,
    token: TOKENS.VALID,
  },
  expected_response: {
    code: 201,
    message: REQUEST_STATUSES.CREATED,
    affectedRows: 1
  }
};

const M2_Scenario1_Variation1 = {
  matches: testMatches,
  admin: testAdmin,
  request_body: {
    id: testMatches[0].id,
    token: TOKENS.VALID,
  },
  expected_response: {
    code: 200,
    message: REQUEST_STATUSES.DELETED,
    match: testMatches[0]
  }
};

const M3_Scenario1_Variation1 = {
  matches: testMatches,
  boxers: testBoxers,
  admin: testAdmin,
  request_body: {
    ...testMatches[0],
    matchTime: 129419968,
    token: TOKENS.VALID,
  },
  expected_response: {
    code: 200,
    message: REQUEST_STATUSES.UPDATED,
    match: {
      ...testMatches[0],
      matchTime: 129419968
    }
  }
};

const Unit_AuthServiceGateway_Scenario1 = {
  admin: testAdmin,
  data_chunk: TOKENS.VALID,
  expected_data: {
    code: 200,
    message: REQUEST_STATUSES.SUCCESS
  }
};

const Unit_AuthServiceGateway_Scenario2_Fail1 = {
  admin: testAdmin,
  data_chunk: TOKENS.INVALID,
  expected_data: {
    code: 403,
    message: REQUEST_STATUSES.FORBIDDEN
  }
};

// Get boxer from Boxer Service Gateway
var Unit_BoxerServiceGateway_Scenario1 = {
  boxers: testBoxers,
  boxer_id: testBoxerIDs[0],
  expected_data: {
    code: 200,
    message: REQUEST_STATUSES.SUCCESS,
    boxer: testBoxers[0]
  }
};

// Get boxer from Boxer Service Gateway - faulty
var Unit_BoxerServiceGateway_Scenario1_Fail = {
  boxers: [],
  boxer_id: 1,
  expected_data: {
    code: 404,
    message: REQUEST_STATUSES.BOXER_NOT_FOUND,
  },
};

const Unit_Repository_Scenario1 = {
  matches: testMatches,
  expected_data: testMatches,
};

// GetMatchesOfBoxer
const Unit_Repository_Scenario2 = {
  matches: testMatches,
  boxer_id: testBoxerIDs[0],
  expected_data: testMatchesIncludingFirstBoxer,
};

// GetMatchesOfBoxer Fail - no boxer id
const Unit_Repository_Scenario2_Fail1 = {
  matches: testMatches,
  boxer_id: null,
  expected_data: {
    name: 'InvalidArgument',
    message: 'boxerId cannot be empty',
  },
};

const Unit_Repository_Scenario3 = {
  existing_match: [testMatch],
  data_chunk: testMatch2,
  new_match: testMatch2,
};

// AddMatch Fail - no match data
const Unit_Repository_Scenario3_Fail1 = {
  matches: testMatches,
  data_chunk: null,
  expected_data: {
    name: 'InvalidArgument',
    message: 'matchData cannot be empty',
  },
};


const Unit_Repository_Scenario4 = {
  match: testMatch,
  match_id: 1,
  expected_data: testMatch,
};

const Unit_Repository_Scenario4_Fail1 = {
  match: testMatch,
  match_id: null,
  expected_data: {
    name: 'InvalidArgument',
    message: 'matchId cannot be empty',
  },
};

const Unit_Repository_Scenario5 = {
  matches: testMatches,
  match_id: testMatches[0].id,
  expected_data: { affectedRows: 1 }
};

const Unit_Repository_Scenario5_Fail1 = {
  matches: testMatches,
  match_id: null,
  expected_data: {
    name: 'InvalidArgument',
    message: 'matchId cannot be empty',
  },
};

const Unit_Repository_Scenario5_Fail2 = {
  matches: [],
  match_id: 1,
  expected_data: {
    name: 'NotFound',
    message: 'match_not_found',
  },
};

const Unit_Repository_Scenario6 = {
  matches: testMatches,
  boxer_id: testMatches[0].id,
  expected_data: { affectedRows: 2 }
};

const Unit_Repository_Scenario6_Fail1 = {
  matches: testMatches,
  boxer_id: null,
  expected_data: {
    name: 'InvalidArgument',
    message: 'boxerId cannot be empty',
  },
};

// UpdateMatch
const Unit_Repository_Scenario7 = {
  matches: testMatches,
  match: {
    ...testMatches[0],
    matchTime: 129419968
  },
  expected_data: {
    ...testMatches[0],
    matchTime: 129419968
  }
};

// UpdateMatch Faulty - no match
const Unit_Repository_Scenario7_Fail1 = {
  matches: testMatches,
  match: null,
  expected_data: {
    name: 'InvalidArgument',
    message: 'match cannot be empty',
  },
};

// UpdateMatch Faulty - no match id
const Unit_Repository_Scenario7_Fail2 = {
  matches: testMatches,
  match: {
    matchTime: 129419968
  },
  expected_data: {
    name: 'InvalidArgument',
    message: 'match.id cannot be empty',
  },
};

// UpdateMatch Faulty - match with given id not found
const Unit_Repository_Scenario7_Fail3 = {
  matches: testMatches,
  match: {
    id: 15,
    matchTime: 129419968,
  },
  expected_data: {
    name: 'NotFound',
    message: 'match_not_found',
  },
};

module.exports = {
  B1_Scenario1_Variation1,
  B1_Scenario1_Fail2,
  B4_Scenario1_Variation1,
  B4_Scenario1_Fail1,
  B4_Scenario1_Fail2,
  H1_Scenario1_Variation1,
  M1_Scenario1_Variation1,
  M1_Scenario1_Fail1,
  M1_Scenario1_Fail2,
  M1_Scenario1_Fail3,
  M1_Scenario1_Fail4,
  M2_Scenario1_Variation1,
  M2_Scenario1_Fail1,
  M2_Scenario1_Fail2,
  M3_Scenario1_Variation1,
  M3_Scenario1_Fail1,
  M3_Scenario1_Fail2,
  M3_Scenario1_Fail3,
  M3_Scenario1_Fail4,
  Unit_AuthServiceGateway_Scenario1,
  Unit_AuthServiceGateway_Scenario2_Fail1,
  Unit_BoxerServiceGateway_Scenario1,
  Unit_BoxerServiceGateway_Scenario1_Fail,
  Unit_Repository_Scenario1,
  Unit_Repository_Scenario2,
  Unit_Repository_Scenario2_Fail1,
  Unit_Repository_Scenario3,
  Unit_Repository_Scenario3_Fail1,
  Unit_Repository_Scenario4,
  Unit_Repository_Scenario4_Fail1,
  Unit_Repository_Scenario5,
  Unit_Repository_Scenario5_Fail1,
  Unit_Repository_Scenario5_Fail2,
  Unit_Repository_Scenario6,
  Unit_Repository_Scenario6_Fail1,
  Unit_Repository_Scenario7,
  Unit_Repository_Scenario7_Fail1,
  Unit_Repository_Scenario7_Fail2,
  Unit_Repository_Scenario7_Fail3,
};
