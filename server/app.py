from flask import Flask, request
from solidity_parser import parser
import urllib, json

app = Flask(__name__)

@app.route('/fetchSourceCode', methods = ['POST'])
def fetch_source_code():
    request_json = request.get_json(force=True)
    contract_addr = request_json['address']
    url = "https://api.etherscan.io/api?module=contract&action=getsourcecode&address={}&apikey=E5KM3HIGE2PV4RR763IQSXGZIV6UV638P2".format(contract_addr)
    response = urllib.request.urlopen(url)
    response_data = response.read()
    response_dict = json.loads(response_data)
    input = response_dict['result'][0]['SourceCode']
    return parse_code(input)

def parse_response(response_data):
    
    return True

def parse_code(input):
    parsed_output = parser.parse(input, loc=False)
    return parsed_output

@app.route('/parseSourceCode', methods = ['POST'])
def parse_source_code():
    request_json = request.get_json(force=True)
    input = request_json['sourceCode']
    return parse_code(input)

def parse_files(file_path):
    parsed_output = parser.parse_file(file_path, loc=False)
    return parsed_output
