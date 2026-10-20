#!/bin/bash
set -e
cd "$(dirname "$0")/../assets/icons"

names=(3b83a 94bce 7fd83 3d880 e6e26 e7a42 0e6e5 9e2b9 21aa5 8c1ac d3eb3 43d46 e0221 7b000 72885 e5ee7 43a44 8affb 75924 a20a6 03cd7 61cdd 3ff2a 41e41 60c86 324eb f51f5 251e4 82601 87214 5b6b0 b79a2 a25ab c0509 79245 b26b3 78313)

urls=(
"https://www.figma.com/api/mcp/asset/7f51a99a-078f-44fe-b0b5-1005eea1baf9/3b83a.svg"
"https://www.figma.com/api/mcp/asset/c8292597-36da-4d04-8bf1-5be2287b52dd/94bce.svg"
"https://www.figma.com/api/mcp/asset/c8292597-36da-4d04-8bf1-5be2287b52dd/7fd83.svg"
"https://www.figma.com/api/mcp/asset/c8292597-36da-4d04-8bf1-5be2287b52dd/3d880.svg"
"https://www.figma.com/api/mcp/asset/c8292597-36da-4d04-8bf1-5be2287b52dd/e6e26.svg"
"https://www.figma.com/api/mcp/asset/c8292597-36da-4d04-8bf1-5be2287b52dd/e7a42.svg"
"https://www.figma.com/api/mcp/asset/c8292597-36da-4d04-8bf1-5be2287b52dd/0e6e5.svg"
"https://www.figma.com/api/mcp/asset/d5d7cced-2490-429d-a5a6-fc4b5a65ecd3/9e2b9.svg"
"https://www.figma.com/api/mcp/asset/d5d7cced-2490-429d-a5a6-fc4b5a65ecd3/21aa5.svg"
"https://www.figma.com/api/mcp/asset/74dcef9b-6b94-4e75-bc51-487ebe946732/8c1ac.svg"
"https://www.figma.com/api/mcp/asset/9631c333-f823-4b2d-809a-dbd8692340ed/d3eb3.svg"
"https://www.figma.com/api/mcp/asset/9631c333-f823-4b2d-809a-dbd8692340ed/43d46.svg"
"https://www.figma.com/api/mcp/asset/9631c333-f823-4b2d-809a-dbd8692340ed/e0221.svg"
"https://www.figma.com/api/mcp/asset/9631c333-f823-4b2d-809a-dbd8692340ed/7b000.svg"
"https://www.figma.com/api/mcp/asset/9631c333-f823-4b2d-809a-dbd8692340ed/72885.svg"
"https://www.figma.com/api/mcp/asset/9631c333-f823-4b2d-809a-dbd8692340ed/e5ee7.svg"
"https://www.figma.com/api/mcp/asset/9631c333-f823-4b2d-809a-dbd8692340ed/43a44.svg"
"https://www.figma.com/api/mcp/asset/9631c333-f823-4b2d-809a-dbd8692340ed/8affb.svg"
"https://www.figma.com/api/mcp/asset/19465ec9-69d4-4d33-aa00-b2f867ff73c1/75924.svg"
"https://www.figma.com/api/mcp/asset/30065e69-0250-4c11-bb52-f616569b2077/a20a6.svg"
"https://www.figma.com/api/mcp/asset/30065e69-0250-4c11-bb52-f616569b2077/03cd7.svg"
"https://www.figma.com/api/mcp/asset/36d1a7e5-09d6-4a25-aabc-003393240c22/61cdd.svg"
"https://www.figma.com/api/mcp/asset/bebf6a60-cdf9-426b-810e-b3880851de9e/3ff2a.svg"
"https://www.figma.com/api/mcp/asset/bebf6a60-cdf9-426b-810e-b3880851de9e/41e41.svg"
"https://www.figma.com/api/mcp/asset/bebf6a60-cdf9-426b-810e-b3880851de9e/60c86.svg"
"https://www.figma.com/api/mcp/asset/bebf6a60-cdf9-426b-810e-b3880851de9e/324eb.svg"
"https://www.figma.com/api/mcp/asset/2cff4eb6-360b-4a61-a3b9-a17dbae63dc3/f51f5.svg"
"https://www.figma.com/api/mcp/asset/2cff4eb6-360b-4a61-a3b9-a17dbae63dc3/251e4.svg"
"https://www.figma.com/api/mcp/asset/2cff4eb6-360b-4a61-a3b9-a17dbae63dc3/82601.svg"
"https://www.figma.com/api/mcp/asset/2cff4eb6-360b-4a61-a3b9-a17dbae63dc3/87214.svg"
"https://www.figma.com/api/mcp/asset/2cff4eb6-360b-4a61-a3b9-a17dbae63dc3/5b6b0.svg"
"https://www.figma.com/api/mcp/asset/2cff4eb6-360b-4a61-a3b9-a17dbae63dc3/b79a2.svg"
"https://www.figma.com/api/mcp/asset/2cff4eb6-360b-4a61-a3b9-a17dbae63dc3/a25ab.svg"
"https://www.figma.com/api/mcp/asset/a75d4397-6a9b-4848-9537-a67b24d88cb1/c0509.svg"
"https://www.figma.com/api/mcp/asset/a75d4397-6a9b-4848-9537-a67b24d88cb1/79245.svg"
"https://www.figma.com/api/mcp/asset/e0222727-b7e6-46c2-aa89-6434958f2000/b26b3.svg"
"https://www.figma.com/api/mcp/asset/e0222727-b7e6-46c2-aa89-6434958f2000/78313.svg"
)

for i in "${!names[@]}"; do
  curl -sL -o "${names[$i]}.svg" "${urls[$i]}" &
done
wait
echo "downloaded ${#names[@]} assets"
