from django.test import TestCase
from django.urls import reverse

class HomeTest(TestCase):
    
    def test_home_loads(self):
        url = reverse('home')
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Chess AI: Chessle')

    def test_chess_board_loads(self):
        url = reverse('home')
        response = self.client.get(url)
        self.assertContains(response, 'board1')

# Create your tests here.


