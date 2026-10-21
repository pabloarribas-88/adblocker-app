#!/bin/bash
set -e
cd "$(dirname "$0")/../assets/icons"

names=(e317d 3a325 f25d3 9d93d 06bbd ed745 40a88 c7a0a 1b122 ee810 a5d8b 21da4 2bba4 bb644)
urls=(
  "https://www.figma.com/api/mcp/asset/cf307325-af93-4ac5-89a9-4e71ba446ec5/e317d.svg"
  "https://www.figma.com/api/mcp/asset/cf307325-af93-4ac5-89a9-4e71ba446ec5/3a325.svg"
  "https://www.figma.com/api/mcp/asset/cf307325-af93-4ac5-89a9-4e71ba446ec5/f25d3.svg"
  "https://www.figma.com/api/mcp/asset/cf307325-af93-4ac5-89a9-4e71ba446ec5/9d93d.svg"
  "https://www.figma.com/api/mcp/asset/cf307325-af93-4ac5-89a9-4e71ba446ec5/06bbd.svg"
  "https://www.figma.com/api/mcp/asset/cf307325-af93-4ac5-89a9-4e71ba446ec5/ed745.svg"
  "https://www.figma.com/api/mcp/asset/cf307325-af93-4ac5-89a9-4e71ba446ec5/40a88.svg"
  "https://www.figma.com/api/mcp/asset/cf307325-af93-4ac5-89a9-4e71ba446ec5/c7a0a.svg"
  "https://www.figma.com/api/mcp/asset/93fb8fc1-e890-4bbb-933d-fa75f739e933/1b122.svg"
  "https://www.figma.com/api/mcp/asset/93fb8fc1-e890-4bbb-933d-fa75f739e933/ee810.svg"
  "https://www.figma.com/api/mcp/asset/93fb8fc1-e890-4bbb-933d-fa75f739e933/a5d8b.svg"
  "https://www.figma.com/api/mcp/asset/93fb8fc1-e890-4bbb-933d-fa75f739e933/21da4.svg"
  "https://www.figma.com/api/mcp/asset/d86d158b-2e5b-45fb-ae30-900f28931374/2bba4.svg"
  "https://www.figma.com/api/mcp/asset/d86d158b-2e5b-45fb-ae30-900f28931374/bb644.svg"
)

for i in "${!names[@]}"; do
  curl -sL -o "${names[$i]}.svg" "${urls[$i]}" &
done
wait
echo "done"
