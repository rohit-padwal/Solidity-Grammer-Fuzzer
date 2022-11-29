import json

solgram_mitigations = json.load(open('linter_warnings.json', 'r'))


def parse_output(output, file_list_name):
    string_output = output.decode()
    arr = string_output.split("\n")
    output_dict = dict()
    output_dict["response"] = list()
    current_key = ""
    new_dict = dict()
    for line in arr:
        line = line.strip()
        found = False
        if not line == "":
            if ".sol" in line:
                if line in file_list_name:
                    file_list_name.remove(line)
                if current_key is not "":
                    output_dict["response"].append(new_dict)
                current_key = line
                new_dict = dict()
                new_dict["contractName"] = current_key
                new_dict["errorResponse"] = list()
            else:
                for key in solgram_mitigations.keys():
                    if key in line:
                        new_dict["errorResponse"].append(line + ". " + solgram_mitigations[key])
                        found = True
                        break
                if not found:
                    new_dict["errorResponse"].append(line)
    output_dict["response"].append(new_dict)
    print(file_list_name)
    for file in file_list_name:
        new_dict = dict()
        new_dict["contractName"] = file
        new_dict["errorResponse"] = ["No vulnerabilities found"]
        output_dict["response"].append(new_dict)
    return output_dict
