from flask import Flask, request
from solidity_parser import parser
import urllib, json
import parse_ast

app = Flask(__name__)

def parse_tree(input_ast):
    return parse_ast.parse_syntax_tree(input_ast)

@app.route('/fetchSourceCode', methods = ['POST'])
def fetch_source_code():
    request_json = request.get_json(force=True)
    contract_addr = request_json['address']
    input = get_src_code(contract_addr)
    return input

def get_src_code(contract_addr):
    url = "https://api.etherscan.io/api?module=contract&action=getsourcecode&address={}&apikey=E5KM3HIGE2PV4RR763IQSXGZIV6UV638P2".format(contract_addr)
    response = urllib.request.urlopen(url)
    response_data = response.read()
    response_dict = json.loads(response_data)
    result = response_dict['result']
    if (result == 'Invalid Address format'):
        return result
    input = result[0]['SourceCode']
    if (input == ''):
        return "Source code not found"
    return input

def parse_code(input):
    input_ast = parser.parse(input, loc=False)
    parsed_output = parse_tree(input_ast)
    return parsed_output

@app.route('/parseSourceCode', methods = ['POST'])
def parse_source_code():
    request_json = request.get_json(force=True)
    input = request_json['SourceCode']
    return parse_code(input)

@app.route('/parseFile', methods = ['POST'])
def parse_file():
    file_input = request.files['file']
    if file_input:
        file_name = file_input.filename
        return parse_files(file_name)
    return "Error Parsing File"

def parse_files(file_input):
    try:
        input_ast = parser.parse_file("contracts/"+file_input, loc=False)
        parsed_output = parse_tree(input_ast)
    except Exception as e:
        print(e)
    return parsed_output