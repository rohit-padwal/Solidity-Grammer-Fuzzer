import json

solhint_dict = json.load(open('linter_warnings.json', 'r'))

def parse_output(output):
    string_output = output.decode()
    arr = string_output.split("\n")
    output_dict = dict()
    current_key = ""
    for line in arr:
        found = False
        if not line == "":
            if ".sol" in line:
                current_key = line
                output_dict[line] = list()
            else:
                for key in solhint_dict.keys():
                    if key in line:
                        output_dict[current_key].append(line + ". " + solhint_dict[key])
                        found = True
                        break
                if not found:
                    output_dict[current_key].append(line)
    return output_dict
