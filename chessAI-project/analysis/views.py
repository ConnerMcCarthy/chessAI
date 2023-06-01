from django.http import JsonResponse
import openai

openai.api_key = ''

# TODO gpt-3.5 kinda bad at chess. 
# assume legal moves
# give it a fen if more than 5 or so moves
# try to force positional analysis not calculation
def get_analysis(request):
    opening = request.GET.get('opening', None)
    custom = request.GET.get('custom', None)

    if custom is not None:
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You analize chess positions."},
                    {"role": "user", "content": f"Given the chess board position in PGN notation: {custom}"}
                ]
            )
            analysis = response.choices[0]['message']['content'].strip()
            #print(f"analysis:\n {analysis}")
            return JsonResponse({"analysis": analysis})
    
    # Error handling
        except Exception as e:
            print(f"error: {repr(e)}")
            return JsonResponse({"error": str(e)})

    else:
        return JsonResponse({"error": "No PGN string provided"})