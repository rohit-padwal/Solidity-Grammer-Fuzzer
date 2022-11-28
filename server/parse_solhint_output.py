import json

solgram_mitigations = json.load(open('linter_warnings.json', 'r'))


def parse_output(output):
    string_output = output.decode()
    arr = string_output.split("\n")
    output_dict = dict()
    current_key = ""
    for line in arr:
        line = line.strip()
        found = False
        if not line == "":
            if ".sol" in line:
                current_key = line
                output_dict[line] = list()
            else:
                for key in solgram_mitigations.keys():
                    if key in line:
                        output_dict[current_key].append(line + ". " + solgram_mitigations[key])
                        found = True
                        break
                if not found:
                    output_dict[current_key].append(line)
    return output_dict
