def parse_syntax_tree(ast_json):
    parsed_output = dict()
    initialize(parsed_output)
    children = ast_json["children"]
    if children:
        for dict_item in children:
            parse(dict_item, parsed_output)
            sub_nodes = dict_item.get("subNodes")
            if sub_nodes:
                for dict_node in sub_nodes:
                    parse(dict_node, parsed_output)
    return parsed_output

def initialize(parsed_output):
    parsed_output["import_count"] = 0
    parsed_output["contract_count"] = 0
    parsed_output["function_count"] = 0
    parsed_output["interface_count"] = 0
    parsed_output["library_count"] = 0
    parsed_output["event_count"] = 0
    parsed_output["payable_count"] = 0
    parsed_output["modifier_count"] = 0
    parsed_output["mapping_count"] = 0
    parsed_output["address_count"] = 0

def parse(dict_item, parsed_output):
    if (dict_item.get("name") == "solidity" and dict_item.get("type") == "PragmaDirective"):
        parsed_output["solidity_version"] = dict_item["value"]
    if dict_item.get("type") == "ImportDirective":
        parsed_output["import_count"] = parsed_output.get("import_count", 0) + 1
    elif dict_item.get("type") == "ContractDefinition":
        parsed_output["contract_count"] = parsed_output.get("contract_count", 0) + 1
    elif dict_item.get("type") == "FunctionDefinition":
        parsed_output["function_count"] = parsed_output.get("function_count", 0) + 1
    elif dict_item.get("type") == "EventDefinition":
        parsed_output["event_count"] = parsed_output.get("event_count", 0) + 1
    elif dict_item.get("type") == "ModifierDefinition":
        parsed_output["modifier_count"] = parsed_output.get("modifier_count", 0) + 1
    elif dict_item.get("type") == "mapping":
        parsed_output["mapping_count"] = parsed_output.get("mapping_count", 0) + 1
    elif dict_item.get("type") ==  "ElementaryTypeName" and dict_item.get("name") == "address":
        parsed_output["address_count"] = parsed_output.get("address_count", 0) + 1
    if dict_item.get("stateMutability") == "payable":
        parsed_output["payable_count"] = parsed_output.get("payable_count", 0) + 1
    if (dict_item.get("kind") == "library"):    
        parsed_output["library_count"] = parsed_output.get("library_count", 0) + 1
    elif dict_item.get("kind") == "interface":
        parsed_output["interface_count"] = parsed_output.get("interface_count", 0) + 1
    