from django.db import models

# Create your models here.

class MoveList(models.Model):
    moves = models.CharField(max_length=100)
    
    def update_opening(self, opening):
        self.moves = opening

    def __str__(self):
        return self.moves

""" 
record = MoveList(moves = "e4 c5 Nf3 Nc6 g3 g6 Bg2 Bg7")
record.save()
print(record.moves)
record.update_opening('e4 c5 Nf3 Nc6 g3 g6 Bg2 g4')
record.save()
print(record.moves)

"""