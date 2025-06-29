export const FROYO_TRACKER_ADDRESS = "0x004c027Dd605121582EAF0f382C7Cf073EC27D3c";
export const FROYO_TRACKER_ABI = [
  {
    type: "function",
    name: "INITIAL_TOKEN_SUPPLY",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "REPORTER_REWARD",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "deactivateRestaurant",
    inputs: [
      { name: "_restaurantId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getLatestPrice",
    inputs: [
      { name: "_restaurantId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "", type: "string", internalType: "string" },
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPriceReports",
    inputs: [
      { name: "_restaurantId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct FroyoTracker.PriceReport[]",
        components: [
          { name: "reporter", type: "address", internalType: "address" },
          { name: "price", type: "uint256", internalType: "uint256" },
          { name: "timestamp", type: "uint256", internalType: "uint256" },
          { name: "priceType", type: "string", internalType: "string" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRestaurant",
    inputs: [
      { name: "_restaurantId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct FroyoTracker.Restaurant",
        components: [
          { name: "name", type: "string", internalType: "string" },
          { name: "location", type: "string", internalType: "string" },
          { name: "poster", type: "address", internalType: "address" },
          { name: "timestamp", type: "uint256", internalType: "uint256" },
          { name: "active", type: "bool", internalType: "bool" },
          { name: "tokenAddress", type: "address", internalType: "address" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "postRestaurant",
    inputs: [
      { name: "_name", type: "string", internalType: "string" },
      { name: "_location", type: "string", internalType: "string" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "priceReports",
    inputs: [
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "reporter", type: "address", internalType: "address" },
      { name: "price", type: "uint256", internalType: "uint256" },
      { name: "timestamp", type: "uint256", internalType: "uint256" },
      { name: "priceType", type: "string", internalType: "string" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "reportPrice",
    inputs: [
      { name: "_restaurantId", type: "uint256", internalType: "uint256" },
      { name: "_price", type: "uint256", internalType: "uint256" },
      { name: "_priceType", type: "string", internalType: "string" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "restaurantCount",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "restaurants",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [
      { name: "name", type: "string", internalType: "string" },
      { name: "location", type: "string", internalType: "string" },
      { name: "poster", type: "address", internalType: "address" },
      { name: "timestamp", type: "uint256", internalType: "uint256" },
      { name: "active", type: "bool", internalType: "bool" },
      { name: "tokenAddress", type: "address", internalType: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "PriceReported",
    inputs: [
      {
        name: "restaurantId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "price",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "priceType",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "reporter",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RestaurantPosted",
    inputs: [
      {
        name: "restaurantId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      { name: "name", type: "string", indexed: false, internalType: "string" },
      {
        name: "location",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "poster",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "tokenAddress",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
]as const;