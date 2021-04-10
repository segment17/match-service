const REQUEST_STATUSES = {
  BOXER_NOT_FOUND: 'boxer_not_found',
  BAD_REQUEST: 'bad_request',
  CREATED: 'created',
  DELETED: 'deleted',
  FORBIDDEN: 'forbidden',
  SUCCESS: 'success',
  UPDATED: 'updated',
}
const TOKENS = {
  VALID: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QtYWRtaW4ifQ.Ie8nanpMvN_aNxqEDDL6_2nvcDzbh0yBL2p_VrSY4r0',
  INVALID: 'not_valid_token'
}
const NOT_VALID_BOXER_ID = -1;
const testAdmin = {
  username: "test-admin-other",
  password_hash: "13019e4c76dbb79db5c2562ad0572f74"
};
const testBoxer = {
  id: 1,
  fullName: "Mike Tyson",
  birthDate: 127419968,
  height: 178,
  weight: 100,
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
const testStandingOfTestBoxer = {
  boxer: testBoxer,
  winCount: 1,
  lossCount: 1,
  score: 0.5
};
const testStandings = [
  testStandingOfTestBoxer,
  {
    boxer: {
      id: 4,
      fullName: "Connor McGregor",
      birthDate: 127419968,
      height: 175,
      weight: 80,
    },
    winCount: 1,
    lossCount: 1,
    score: 0.5
  },
  {
    boxer: {
      id: 6,
      fullName: "Logan Paul",
      birthDate: 127419968,
      height: 195,
      weight: 120,
    },
    winCount: 0,
    lossCount: 1,
    score: 0
  },
  {
    boxer: {
      id: 8,
      fullName: 'Dwayne "The Rock" Johnson',
      birthDate: 127419968,
      height: 196,
      weight: 118,
    },
    winCount: 1,
    lossCount: 0,
    score: 1
  }
];
const testMatch = {
  id: 1,
  homeBoxer: testBoxers[0], // 1
  awayBoxer: testBoxers[1], // 4
  matchTime: 157419968, // Timestamp,
  isFinished: false,
};
const testMatch2 = {
  id: 2,
  homeBoxer: testBoxers[2], // 6
  awayBoxer: testBoxers[3], // 8
  matchTime: 157419968, // Timestamp,
  isFinished: false,
};
const testMatch3 = {
  id: 3,
  awayBoxer: {
    id: 1,
    fullName: "Mike Tyson",
    birthDate: 127419968, // Timestamp
    height: 178,
    weight: 100,
  },
  homeBoxer: {
    id: 8,
    fullName: 'Dwayne "The Rock" Johnson',
    birthDate: 127419968, // Timestamp
    height: 196,
    weight: 118,
  },
  matchTime: 129419968,
  isFinished: false,
}
const testMatch4 = {
  id: 4,
  awayBoxer: {
    id: 4,
    fullName: "Connor McGregor",
    birthDate: 127419968, // Timestamp
    height: 175,
    weight: 80,
  },
  homeBoxer: {
    id: 8,
    fullName: 'Dwayne "The Rock" Johnson',
    birthDate: 127419968, // Timestamp
    height: 196,
    weight: 118,
  },
  matchTime: 129419968,
  isFinished: true,
  winnerBoxer: {
    id: 8,
    fullName: 'Dwayne "The Rock" Johnson',
    birthDate: 127419968, // Timestamp
    height: 196,
    weight: 118,
  }
};
const testMatches = [
  testMatch,
  testMatch2,
  testMatch3,
  testMatch4,
];
const emptyBoxer = { id: 0, fullName: '', birthDate: '0', height: 0, weight: 0 };
const emptyStanding = { boxer: null, winCount: 0, lossCount: 0, score: 0 };
const testMatchesIncludingFirstBoxer = [
  testMatch,
  testMatch3
];
/* UNIT MATCH SERVICE GATEWAY SUCCESS SCENARIOS */

// Get boxer from Boxer Service Gateway
var Unit_BoxerServiceGateway_Scenario1 = {
  boxers: testBoxers,
  boxer_id: 1,
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

/* UNIT MATCH SERVICE GATEWAY FAIL SCENARIOS */

// GetMatchesOfBoxer Fail
var Unit_BoxerServiceGateway_Scenario3_Fail1 = {
  boxers: testBoxers,
  matches: testMatches,
  boxer_id: 2,
  expected_data: {
    code: 404,
    message: "not_found",
    boxer: emptyBoxer,
    matches: [],
  },
};

/* COMPONENT SUCCESS SCENARIOS */

// GetAllMatches
const H1_Scenario1_Variation1 = {
  matches: testMatches,
  expected_response: {
    code: 200,
    message: REQUEST_STATUSES.SUCCESS,
    matches: testMatches,
  },
};

// GetAllStandings
const H2_Scenario1_Variation1 = {
  boxers: testBoxers,
  matches: testMatches,
  expected_response: {
    code: 200,
    message: REQUEST_STATUSES.SUCCESS,
    standings: testStandings,
  },
};

// GetMatchesOfBoxer
const B1_Scenario1_Variation1 = {
  boxers: testBoxers,
  matches: testMatches,
  request_body: {
    boxerId: testBoxers[0].id,
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
    boxerId: testMatches[0].id,
    token: TOKENS.VALID,
  },
  expected_response: {
    code: 200,
    message: REQUEST_STATUSES.DELETED,
    matches: testMatchesIncludingFirstBoxer
  },
};

/* COMPONENT FAIL SCENARIOS */

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
    boxerId: testMatches[0].id,
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
    code: 404,
    message: REQUEST_STATUSES.BOXER_NOT_FOUND,
  },
};

// AddMatch Fail - not valid admin token
const M1_Scenario1_Fail1 = {
  boxers: testBoxers,
  admin: testAdmin,
  request_body: {
    homeBoxerId: 1,
    awayBoxerId: 4,
    matchTime: 157419968, // Timestamp,
    isFinished: false,
    token: TOKENS.INVALID,
  },
  expected_response: {
    code: 403,
    message: REQUEST_STATUSES.FORBIDDEN,
  }
}

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
}

// AddMatch Fail - not valid boxer id in one of the matches
const M1_Scenario1_Fail3 = {
  boxers: testBoxers,
  admin: testAdmin,
  request_body: {
    homeBoxerId: NOT_VALID_BOXER_ID,
    awayBoxerId: 4,
    matchTime: 157419968, // Timestamp,
    isFinished: false,
    token: TOKENS.VALID,
  },
  expected_response: {
    code: 404,
    message: REQUEST_STATUSES.BOXER_NOT_FOUND,
  }
}

// AddMatch
const M1_Scenario1_Variation1 = {
  boxers: testBoxers,
  admin: testAdmin,
  request_body: {
    homeBoxerId: 1,
    awayBoxerId: 4,
    matchTime: 157419968, // Timestamp,
    isFinished: false,
    token: TOKENS.VALID,
  },
  expected_response: {
    code: 201,
    message: REQUEST_STATUSES.CREATED,
    match: testMatch
  }
}

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
}

const M3_Scenario1_Variation1 = {
  matches: testMatches,
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
}

// UNIT AUTH SERVICE GATEWAY SUCCESS SCENARIOS

const Unit_AuthServiceGateway_Scenario1 = {
  admin: testAdmin,
  data_chunk: TOKENS.VALID,
  expected_data: {
    code: 200,
    message: REQUEST_STATUSES.SUCCESS
  }
}

// UNIT AUTH SERVICE GATEWAY FAIL SCENARIOS

const Unit_AuthServiceGateway_Scenario2_Fail1 = {
  admin: testAdmin,
  data_chunk: TOKENS.VALID,
  expected_data: {
    code: 403,
    message: REQUEST_STATUSES.FORBIDDEN
  }
}

const Unit_Repository_Scenario1 = {
  matches: testMatches,
  expected_data: testMatches,
}

// GetMatchesOfBoxer
const Unit_Repository_Scenario2 = {
  matches: testMatches,
  boxer_id: testBoxers[0].id,
  expected_data: testMatchesIncludingFirstBoxer,
};

const Unit_Repository_Scenario3 = {
  existing_match: [testMatch],
  data_chunk: testMatch2,
  new_match: testMatch2,
}

const Unit_Repository_Scenario4 = {
  match: testMatch,
  match_id: 1,
  expected_data: testMatch,
}

const Unit_Repository_Scenario5 = {
  matches: testMatches,
  match_id: testMatches[0].id,
  expected_data: testMatches[0]
}

const Unit_Repository_Scenario6 = {
  matches: testMatches,
  boxer_id: testMatches[0].id,
  expected_data: testMatchesIncludingFirstBoxer
}

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
}

module.exports = {
  B1_Scenario1_Variation1,
  B1_Scenario1_Fail2,
  B4_Scenario1_Variation1,
  B4_Scenario1_Fail1,
  B4_Scenario1_Fail2,
  H1_Scenario1_Variation1,
  H2_Scenario1_Variation1,
  M1_Scenario1_Variation1,
  M1_Scenario1_Fail1,
  M1_Scenario1_Fail2,
  M1_Scenario1_Fail3,
  M2_Scenario1_Variation1,
  M3_Scenario1_Variation1,
  Unit_AuthServiceGateway_Scenario1,
  Unit_AuthServiceGateway_Scenario2_Fail1,
  Unit_BoxerServiceGateway_Scenario1,
  Unit_BoxerServiceGateway_Scenario1_Fail,
  Unit_BoxerServiceGateway_Scenario3_Fail1,
  Unit_Repository_Scenario1,
  Unit_Repository_Scenario2,
  Unit_Repository_Scenario3,
  Unit_Repository_Scenario4,
  Unit_Repository_Scenario5,
  Unit_Repository_Scenario6,
  Unit_Repository_Scenario7,
};
