# ERP 0: KONTEK Script Hub

## Requirements

- **Node.js**
- **Electron** (Installed as a dependency)
- **Libraries In Script Files**

## How to use

#### 1. **Download and Extract the Project**
- Download the provided project ZIP file and extract locally into your project directory

#### 2. **Install Dependencies**
- Navigate to the extracted project directory:
- Install dependencies: "npm install"

#### 3. **Running the Program**
- Run in development mode: "npx electron ."

## Notes

Aside from still needing to update every single ERP script I've made so far, I just have to figure out saving script execution progress when navigating across pages and settings. I've started implementing this already but It's a bit buggy across pages, and I'll fix this next.

I started with editing the ERP1 code just to see how I wanted to do it for the others, but since I'm not actually in person, the vpn is very slow with parsing the project files from the network, and would probably take multiple hours to complete one run, so I haven't actually been able to verify that the output is correct for erp1. It should be though since the logic is all the same. 

To make sure the save output to location functionality actually works though I've been testing it using the test.py script I have listed along with the other erp scripts, and everything looks good.

This is very far from 100% complete but I'll be home soon so I can get back to the grind and make some good progress before 2nd semester.

- Tylen

2024-12-14
