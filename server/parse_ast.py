version = dict()
lines = dict()
events = dict()
imports = dict()
functions = dict()
interfaces = dict()
libraries = dict()
contracts = dict()


def parse_syntax_tree(ast_json):
    parsed_output = dict()
    initialize()
    children = ast_json["children"]
    if children:
        for dict_item in children:
            parse(dict_item)
            sub_nodes = dict_item.get("subNodes")
            if sub_nodes:
                for dict_node in sub_nodes:
                    parse(dict_node)

    parsed_output["response"] = update_response()
    return parsed_output


def initialize():
    version["parameter"] = "solidity_version"
    version["value"] = ""
    imports["parameter"] = "import_count"
    imports["value"] = 0
    contracts["parameter"] = "contract_count"
    contracts["value"] = 0
    functions["parameter"] = "function_count"
    functions["value"] = 0
    events["parameter"] = "event_count"
    events["value"] = 0
    libraries["parameter"] = "library_count"
    libraries["value"] = 0
    interfaces["parameter"] = "interface_count"
    interfaces["value"] = 0


def update_response():
    list_of_metrics = list()
    list_of_metrics.append(lines)
    list_of_metrics.append(contracts)
    list_of_metrics.append(version)
    list_of_metrics.append(libraries)
    list_of_metrics.append(imports)
    list_of_metrics.append(interfaces)
    list_of_metrics.append(functions)
    list_of_metrics.append(events)
    return list_of_metrics


def parse(dict_item):
    if dict_item.get("name") == "solidity" and dict_item.get("type") == "PragmaDirective":
        version["value"] = dict_item["value"]
    if dict_item.get("type") == "ImportDirective":
        imports["value"] = version.get("value", 0) + 1
    elif dict_item.get("type") == "ContractDefinition":
        contracts["value"] = contracts.get("value", 0) + 1
    elif dict_item.get("type") == "FunctionDefinition":
        functions["value"] = functions.get("value", 0) + 1
    elif dict_item.get("type") == "EventDefinition":
        events["value"] = events.get("value", 0) + 1
    if dict_item.get("kind") == "library":
        libraries["value"] = libraries.get("value", 0) + 1
    elif dict_item.get("kind") == "interface":
        interfaces["value"] = interfaces.get("value", 0) + 1
    if "loc" in dict_item:
        loc = dict_item.get("loc")
        end = loc.get("end")
        lines["parameter"] = "lines"
        lines["value"] = end.get("line")
