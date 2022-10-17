import sys
import pprint
from flask import Flask, request
from solidity_parser import parser
import urllib, json

app = Flask(__name__)

@app.route('/fetchSourceCode', methods = ['POST'])
def fetchSourceCode():
    request_json = request.get_json(force=True)
    contract_addr = request_json['address']
    url = "https://api.etherscan.io/api?module=contract&action=getsourcecode&address={}&apikey=E5KM3HIGE2PV4RR763IQSXGZIV6UV638P2".format(contract_addr)
    response = urllib.request.urlopen(url)
    response_data = response.read()
    print(response_data)
    response_dict = json.loads(response_data)
    input = response_dict['result'][0]['SourceCode']
    return response_data

def parseSourceCode(input):
    sourceUnit = parser.parse(input, loc=False)
    return sourceUnit

@app.route('/parseCode', methods = ['POST'])
def parseCode():
    request_json = request.get_json(force=True)
    input = request_json['sourceCode']
    return parseSourceCode(input)