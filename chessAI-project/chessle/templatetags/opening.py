from django import template
import re
import openai

register = template.Library()

opening_string = "e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 h4 h6 Nf3 e6 Be2 Nf6"


# returns text in betweeen curly braces {}
def parse_opening(text):
    # Matches chess move openings
    pattern = r'\b\d+\.\s*([^\s]+)\s*([^\s]*)'
    matches = re.findall(pattern, text.strip())
    # Flattens and removes empty strings
    moves = [move for match in matches for move in match if move]
    return ' '.join(moves)

# Call openai and get the response
@register.simple_tag
def requestOpening(prompt="A chess opening that starts with d4."):
    api_path = "./chessle/templatetags/secret.txt"
    openai.api_key = read_api_key(api_path)
    
    response =  response = openai.ChatCompletion.create(
        model = 'gpt-3.5-turbo',
        messages=[
            {"role": "system", "content": "You are a chess opening assistant."},
            {"role": "system", "content": "Always output chess openings in PGN format."},
            {"role": "system", "content": "Output at least 5 moves."},
            {"role": "user", "content": prompt}
        ]
    )
    save_response(response['choices'][0]['message']['content'])
    opening_string = parse_opening(response['choices'][0]['message']['content'])
    print(opening_string)
    return opening_string

# Template used in home.html to set up the board
def openingString():
    return opening_string

# ---- file helper fucntions ----

def read_api_key(api_path):
    with open(api_path, 'r') as file:
        api_key = file.read().strip()
    file.close()
    return api_key

def save_response(response):
    try:
        with open('./chessle/templatetags/response.txt', 'w') as file:
            file.write(response)
            return True
    except IOError:
        print("File Error")
        return False


