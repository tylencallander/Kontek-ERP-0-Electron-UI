import sys
import os
import time

if len(sys.argv) < 2:
    print("Error: No output folder provided.")
    sys.exit(1)

output_folder = sys.argv[1]

print(f"Saving files to: {output_folder}")

time.sleep(1)
output_file = os.path.join(output_folder, "output.json")
with open(output_file, "w") as f:
    f.write('{"status": "success"}')

print(f"File saved: {output_file}")
