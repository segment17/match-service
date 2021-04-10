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
const testMatchesWithTestBoxer = [
  {
    id: 1,
    homeBoxer: {
      id: 1,
      fullName: "Mike Tyson",
      birthDate: 127419968, // Timestamp
      height: 178,
      weight: 100,
    },
    awayBoxer: {
      id: 4,
      fullName: "Connor McGregor",
      birthDate: 127419968, // Timestamp
      height: 175,
      weight: 80,
    },
    matchTime: 127419968,
    isFinished: true,
    winnerBoxer: {
      id: 4,
      fullName: "Connor McGregor",
      birthDate: 127419968, // Timestamp
      height: 175,
      weight: 80,
    },
  },
  {
    id: 1,
    awayBoxer: {
      id: 1,
      fullName: "Mike Tyson",
      birthDate: 127419968, // Timestamp
      height: 178,
      weight: 100,
    },
    homeBoxer: {
      id: 6,
      fullName: "Logan Paul",
      birthDate: 127419968, // Timestamp
      height: 195,
      weight: 120,
    },
    matchTime: 127419968,
    isFinished: true,
    winnerBoxer: {
      id: 1,
      fullName: "Mike Tyson",
      birthDate: 127419968, // Timestamp
      height: 178,
      weight: 100,
    },
  },
  {
    id: 1,
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
  },
];
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
    message: "success",
    boxer: testBoxers[0]
  }
};

// Get boxer from Boxer Service Gateway - faulty
var Unit_BoxerServiceGateway_Scenario1_Fail = {
  boxers: [],
  boxer_id: 1,
  expected_data: {
    code: 404,
    message: "boxer_not_found",
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
    message: "success",
    matches: testMatches,
  },
};

// GetAllStandings
const H2_Scenario1_Variation1 = {
  boxers: testBoxers,
  matches: testMatches,
  expected_response: {
    code: 200,
    message: "success",
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
    message: "success",
    boxer: testBoxers[0],
    matches: testMatchesIncludingFirstBoxer,
  },
};

const B4_Scenario1_Variation1 = {
  matches: testMatches,
  boxers: testBoxers,
  request_body: {
    boxerId: testMatches[0].id,
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QtYWRtaW4ifQ.Ie8nanpMvN_aNxqEDDL6_2nvcDzbh0yBL2p_VrSY4r0",
  },
  expected_response: {
    code: 200,
    message: "deleted",
    matches: testMatchesIncludingFirstBoxer
  },
};

/* COMPONENT FAIL SCENARIOS */

// GetStandingAndMatchesOfBoxer Fail
const B1_Scenario2_Fail1 = {
  boxer: testBoxer,
  matches: testMatches,
  request_body: {
    boxerId: 2,
  },
  expected_response: {
    code: 404,
    message: "not_found",
    boxer: emptyBoxer,
    standingAndMatches: {
      standing: emptyStanding,
      matches: []
    }
  },
};

const M1_Scenario1_Variation1 = {
  boxers: testBoxers,
  admin: testAdmin,
  request_body: {
    homeBoxerId: 1,
    awayBoxerId: 4,
    matchTime: 157419968, // Timestamp,
    isFinished: false,
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QtYWRtaW4ifQ.Ie8nanpMvN_aNxqEDDL6_2nvcDzbh0yBL2p_VrSY4r0",
  },
  expected_response: {
    code: 201,
    message: 'created',
    match: testMatch
  }
}

const M2_Scenario1_Variation1 = {
  matches: testMatches,
  admin: testAdmin,
  request_body: {
    id: testMatches[0].id,
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QtYWRtaW4ifQ.Ie8nanpMvN_aNxqEDDL6_2nvcDzbh0yBL2p_VrSY4r0",
  },
  expected_response: {
    code: 200,
    message: 'deleted',
    match: testMatches[0]
  }
}

const M3_Scenario1_Variation1 = {
  matches: testMatches,
  admin: testAdmin,
  request_body: {
    ...testMatches[0],
    matchTime: 129419968,
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QtYWRtaW4ifQ.Ie8nanpMvN_aNxqEDDL6_2nvcDzbh0yBL2p_VrSY4r0",
  },
  expected_response: {
    code: 200,
    message: 'updated',
    match: {
      ...testMatches[0],
      matchTime: 129419968
    }
  }
}

// UNIT AUTH SERVICE GATEWAY SUCCESS SCENARIOS

const Unit_AuthServiceGateway_Scenario1 = {
  admin: testAdmin,
  data_chunk: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QtYWRtaW4ifQ.Ie8nanpMvN_aNxqEDDL6_2nvcDzbh0yBL2p_VrSY4r0",
  expected_data: {
    code: 200,
    message: "success"
  }
}

// UNIT AUTH SERVICE GATEWAY FAIL SCENARIOS

const Unit_AuthServiceGateway_Scenario2_Fail1 = {
  admin: testAdmin,
  data_chunk: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QtYWRtaW4ifQ.Ie8nanpMvN_aNxqEDDL6_2nvcDzbh0yBL2p_VrSY4r0",
  expected_data: {
    code: 403,
    message: "forbidden"
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

const Unit_Repository_Scenario7 = {
  existing_match: [testMatch],
  data_chunk: testMatch2,
  new_match: testMatch2,
}

const Unit_Repository_Scenario8 = {
  match: testMatch,
  match_id: 1,
  expected_data: testMatch,
}

const Unit_Repository_Scenario9 = {
  matches: testMatches,
  match_id: testMatches[0].id,
  expected_data: testMatches[0]
}

const Unit_Repository_Scenario10 = {
  matches: testMatches,
  boxer_id: testMatches[0].id,
  expected_data: testMatchesIncludingFirstBoxer
}

const Unit_Repository_Scenario11 = {
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
  B1_Scenario2_Fail1,
  B4_Scenario1_Variation1,
  H1_Scenario1_Variation1,
  H2_Scenario1_Variation1,
  M1_Scenario1_Variation1,
  M2_Scenario1_Variation1,
  M3_Scenario1_Variation1,
  Unit_AuthServiceGateway_Scenario1,
  Unit_AuthServiceGateway_Scenario2_Fail1,
  Unit_BoxerServiceGateway_Scenario1,
  Unit_BoxerServiceGateway_Scenario1_Fail,
  Unit_BoxerServiceGateway_Scenario3_Fail1,
  Unit_Repository_Scenario1,
  Unit_Repository_Scenario2,
  Unit_Repository_Scenario7,
  Unit_Repository_Scenario8,
  Unit_Repository_Scenario9,
  Unit_Repository_Scenario10,
  Unit_Repository_Scenario11,
};
