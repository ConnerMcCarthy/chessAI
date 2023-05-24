from django import template
register = template.Library()

opening_string = "e4 d6 d4 Nf6 Nc3 g6 Nf3 Bg7"

@register.simple_tag
def openingString():
    return opening_string
